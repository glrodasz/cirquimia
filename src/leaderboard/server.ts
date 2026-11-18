/**
 * The global ranking's server side, run by Cloudflare Pages Functions (functions/api) against a D1 database
 * bound as DB. The tables create themselves on first use, so the database only needs to exist and be bound.
 *
 * Basic sanity, not a fortress: the server opens a run when a match starts and only accepts one score per run,
 * recomputes the score itself with the run's own difficulty, refuses durations and damage that are impossible
 * (or a duration longer than the real time since the run opened), and limits how often one address can play and submit.
 */
import { classifyDevice, type DeviceHints } from './device';
import { newShareId } from './shareId';
import { validSeed } from './challengeLink';
import { isDeviceFilter, ANONYMOUS_INITIALS, dayOf, monthStart, weekStart, hordeScore, isBoardMode, isDifficulty, plausible, plausibleHorde, scoreFor, validInitials, MIN_RIVALS, MAX_RIVALS, type BoardMode } from './score';

/** The slice of Cloudflare's D1 API used here. */
export interface D1Result<T> {
  results: T[];
}
export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<{ meta: { changes: number } }>;
}
export interface D1Database {
  prepare(query: string): D1Statement;
  batch(statements: D1Statement[]): Promise<unknown[]>;
}

export interface Env {
  DB?: D1Database;
  /** Optional secret mixed into the hashed addresses; any string works. */
  SCORE_SALT?: string;
}

export interface Ctx {
  request: Request;
  env: Env;
}

export const RUN_TTL_MS = 3 * 60 * 60 * 1000;
/** The real time since the run opened may fall this much short of the game time (the run opens a moment after the match starts). */
const CLOCK_SLACK_MS = 5000;
export const WINDOW_MS = 10 * 60 * 1000;
const MAX_RUNS_PER_WINDOW = 60;
// Every won match is saved, named or not, so a fast player can win many in a row.
const MAX_SCORES_PER_WINDOW = 20;
/** The initials of the score that has just been saved can be changed for this long (the victory card is open). */
export const RENAME_TTL_MS = 60 * 60 * 1000;
const MAX_BODY = 4096;
/** Rows on each board; the player's own best, when lower, is added below with its real place. */
export const BOARD_SIZE = 20;
/** At most this many of the player's own score ids are looked up (client.ts keeps the last 100). */
const MAX_MINE = 100;

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS runs (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    rivals INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE INDEX IF NOT EXISTS runs_ip ON runs (ip_hash, created_at)`,
  `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id TEXT NOT NULL UNIQUE,
    initials TEXT NOT NULL,
    score INTEGER NOT NULL,
    duration_ms INTEGER NOT NULL,
    damage INTEGER NOT NULL DEFAULT 0,
    rivals INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    category TEXT NOT NULL,
    os TEXT NOT NULL,
    device TEXT NOT NULL,
    browser TEXT NOT NULL,
    model TEXT,
    os_version TEXT,
    screen TEXT,
    locale TEXT,
    user_agent TEXT,
    country TEXT,
    ip_hash TEXT NOT NULL,
    day TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS scores_all ON scores (score DESC, created_at)`,
  `CREATE INDEX IF NOT EXISTS scores_day ON scores (day, score DESC, created_at)`,
  `CREATE INDEX IF NOT EXISTS scores_time ON scores (created_at)`,
  `CREATE INDEX IF NOT EXISTS scores_ip ON scores (ip_hash, created_at)`,
  // The share links' cards (src/leaderboard/shares.ts), one per saved score, by the score's share_id.
  `CREATE TABLE IF NOT EXISTS share_images (
    share_id TEXT PRIMARY KEY,
    image BLOB NOT NULL,
    created_at INTEGER NOT NULL
  )`,
];

/** Columns added after the first release, for databases created before them (fails harmlessly once present). */
const MIGRATIONS = [
  'ALTER TABLE scores ADD COLUMN damage INTEGER NOT NULL DEFAULT 0',
  // The public id of a score's share link (/s/<share_id>): random, so the links cannot be walked through.
  'ALTER TABLE scores ADD COLUMN share_id TEXT',
  'CREATE UNIQUE INDEX IF NOT EXISTS scores_share ON scores (share_id)',
  // The meadow of the match, so a share link can replay it (src/leaderboard/challengeLink.ts).
  'ALTER TABLE runs ADD COLUMN seed TEXT',
  'ALTER TABLE scores ADD COLUMN seed TEXT',
  // 1 when nobody named the score: it is saved as ANONYMOUS_INITIALS, unlike a player whose initials really are ANON.
  'ALTER TABLE scores ADD COLUMN anonymous INTEGER NOT NULL DEFAULT 0',
  // The horde has its own boards: its runs and scores say so, and a horde score keeps the wave it reached.
  "ALTER TABLE runs ADD COLUMN mode TEXT NOT NULL DEFAULT 'duel'",
  "ALTER TABLE scores ADD COLUMN mode TEXT NOT NULL DEFAULT 'duel'",
  'ALTER TABLE scores ADD COLUMN wave INTEGER NOT NULL DEFAULT 0',
  'CREATE INDEX IF NOT EXISTS scores_mode ON scores (mode, score DESC, created_at)',
  // Horde: golems the alchemist brought down (NULL for scores saved before it was counted, and for duels).
  'ALTER TABLE scores ADD COLUMN kills INTEGER',
];

let ready: Promise<unknown> | null = null;
export function ensureSchema(db: D1Database) {
  ready ??= db.batch(SCHEMA.map((q) => db.prepare(q))).then(async () => {
    for (const q of MIGRATIONS) await db.prepare(q).run().catch(() => {});
  }).catch((e) => {
    ready = null; // try again on the next request
    throw e;
  });
  return ready;
}

export function json(body: unknown, status = 200, cache = 'no-store') {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache },
  });
}

export const fail = (error: string, status: number) => json({ error }, status);

async function hashIp(request: Request, salt: string) {
  const ip = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ?? 'unknown';
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`));
  return [...new Uint8Array(bytes)].slice(0, 16).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const length = Number(request.headers.get('Content-Length') ?? 0);
  if (length > MAX_BODY) return null;
  const text = await request.text();
  if (text.length > MAX_BODY) return null;
  try {
    const body = JSON.parse(text);
    return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

const short = (v: unknown, max: number) => (typeof v === 'string' && v ? v.slice(0, max) : null);

export async function setup(ctx: Ctx) {
  const db = ctx.env.DB;
  if (!db) return null;
  await ensureSchema(db);
  return { db, ip: await hashIp(ctx.request, ctx.env.SCORE_SALT ?? 'cirquimia') };
}

/** POST /api/runs {rivals, difficulty} or {mode: 'horde'} → {id}: a duel against rivals, or a horde, has started. */
export async function startRun(ctx: Ctx): Promise<Response> {
  const s = await setup(ctx);
  if (!s) return fail('unavailable', 503);
  const body = await readBody(ctx.request);
  const mode: BoardMode = body?.mode === 'horde' ? 'horde' : 'duel';
  // The horde has no rivals to count nor a level to pick: it stores 0 and the default level.
  const rivals = mode === 'horde' ? 0 : body?.rivals;
  const difficulty = mode === 'horde' ? 'normal' : body?.difficulty;
  if (mode === 'duel' && (!Number.isInteger(rivals) || (rivals as number) < MIN_RIVALS || (rivals as number) > MAX_RIVALS || !isDifficulty(difficulty))) {
    return fail('bad-request', 400);
  }
  const now = Date.now();
  const recent = await s.db.prepare('SELECT COUNT(*) AS n FROM runs WHERE ip_hash = ? AND created_at > ?').bind(s.ip, now - WINDOW_MS).first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_RUNS_PER_WINDOW) return fail('too-many', 429);
  const id = crypto.randomUUID();
  const seed = validSeed(body?.seed) ? body.seed : null;
  await s.db.prepare('INSERT INTO runs (id, created_at, rivals, difficulty, ip_hash, seed, mode) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(id, now, rivals, difficulty, s.ip, seed, mode).run();
  // Now and then, forget runs nobody finished.
  if (Math.random() < 0.05) await s.db.prepare('DELETE FROM runs WHERE created_at < ?').bind(now - 24 * 60 * 60 * 1000).run();
  return json({ id }, 201);
}

interface Row {
  id: number;
  initials: string;
  score: number;
  duration_ms: number;
  damage: number;
  rivals: number;
  difficulty: string;
  category: string;
  created_at: number;
  mode: string;
  wave: number;
  kills: number | null;
}

const entry = (r: Row) => ({
  id: r.id,
  initials: r.initials,
  score: r.score,
  durationMs: r.duration_ms,
  damage: r.damage,
  rivals: r.rivals,
  difficulty: r.difficulty,
  category: r.category,
  at: r.created_at,
  mode: r.mode,
  wave: r.wave,
  kills: r.kills ?? null,
});

/**
 * POST /api/scores {runId, initials?, durationMs, damage, hints…} → {id, score, rank, total}. The game sends every
 * won match as it ends; without initials (the player never gave any) the score is saved as ANON, flagged anonymous.
 */
export async function submitScore(ctx: Ctx): Promise<Response> {
  const s = await setup(ctx);
  if (!s) return fail('unavailable', 503);
  const body = await readBody(ctx.request);
  if (!body) return fail('bad-request', 400);
  const { runId, initials, durationMs, damage, wave, kills } = body;
  if (typeof runId !== 'string' || runId.length > 64) return fail('bad-request', 400);
  const anonymous = initials === undefined || initials === null || initials === '';
  if (!anonymous && !validInitials(initials)) return fail('bad-initials', 400);
  const name = anonymous ? ANONYMOUS_INITIALS : (initials as string);

  const now = Date.now();
  const recent = await s.db.prepare('SELECT COUNT(*) AS n FROM scores WHERE ip_hash = ? AND created_at > ?').bind(s.ip, now - WINDOW_MS).first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_SCORES_PER_WINDOW) return fail('too-many', 429);

  const run = await s.db
    .prepare('SELECT created_at, rivals, difficulty, used, seed, mode FROM runs WHERE id = ?')
    .bind(runId)
    .first<{ created_at: number; rivals: number; difficulty: string; used: number; seed: string | null; mode: string | null }>();
  if (!run || run.used || now - run.created_at > RUN_TTL_MS) return fail('unknown-run', 409);
  const mode: BoardMode = isBoardMode(run.mode) ? run.mode : 'duel';
  if (!isDifficulty(run.difficulty)) return fail('implausible', 422);
  if (mode === 'horde' ? !plausibleHorde(wave, durationMs, damage, kills ?? undefined) : !plausible(run.rivals, run.difficulty, durationMs, damage)) return fail('implausible', 422);
  const duration = Math.round(durationMs as number);
  if (now - run.created_at + CLOCK_SLACK_MS < duration) return fail('implausible', 422);

  // Claim the run before writing, so two submissions racing each other cannot both count.
  const claimed = await s.db.prepare('UPDATE runs SET used = 1 WHERE id = ? AND used = 0').bind(runId).run();
  if (claimed.meta.changes !== 1) return fail('unknown-run', 409);

  const raw = (body.hints && typeof body.hints === 'object' ? body.hints : {}) as Record<string, unknown>;
  const hints: DeviceHints = {
    touchPoints: typeof raw.touchPoints === 'number' ? raw.touchPoints : undefined,
    mobile: typeof raw.mobile === 'boolean' ? raw.mobile : undefined,
    platform: short(raw.platform, 32) ?? undefined,
    shortSide: typeof raw.shortSide === 'number' ? raw.shortSide : undefined,
  };
  const ua = ctx.request.headers.get('User-Agent') ?? '';
  const device = classifyDevice(ua, hints);
  const dealt = damage as number;
  const reached = mode === 'horde' ? (wave as number) : 0;
  const downed = mode === 'horde' && Number.isInteger(kills) ? (kills as number) : null;
  const score = mode === 'horde' ? hordeScore(reached, duration) : scoreFor(dealt, run.difficulty, duration);
  const day = dayOf(now);
  const country = (ctx.request as Request & { cf?: { country?: string } }).cf?.country ?? null;
  const shareId = newShareId();

  const inserted = await s.db
    .prepare(
      `INSERT INTO scores (share_id, run_id, initials, anonymous, score, duration_ms, damage, rivals, difficulty, seed, category, os, device, browser, model, os_version, screen, locale, user_agent, country, ip_hash, day, created_at, mode, wave, kills)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    )
    .bind(
      shareId,
      runId,
      name,
      anonymous ? 1 : 0,
      score,
      duration,
      dealt,
      run.rivals,
      run.difficulty,
      run.seed ?? null,
      device.category,
      device.os,
      device.device,
      device.browser,
      short(raw.model, 60),
      short(raw.osVersion, 32),
      short(body.screen, 32),
      short(body.locale, 8),
      ua.slice(0, 400) || null,
      country,
      s.ip,
      day,
      now,
      mode,
      reached,
      downed,
    )
    .first<{ id: number }>();

  // Ties go to whoever got there first.
  const since = { week: weekStart(now), month: monthStart(now) };
  const [today, week, month, all] = await Promise.all([
    s.db
      .prepare('SELECT (SELECT COUNT(*) FROM scores WHERE mode = ?4 AND day = ?1 AND (score > ?2 OR (score = ?2 AND created_at < ?3))) + 1 AS rank, (SELECT COUNT(*) FROM scores WHERE mode = ?4 AND day = ?1) AS total')
      .bind(day, score, now, mode)
      .first<{ rank: number; total: number }>(),
    ...[since.week, since.month].map((from) =>
      s.db
        .prepare('SELECT (SELECT COUNT(*) FROM scores WHERE mode = ?4 AND created_at >= ?1 AND (score > ?2 OR (score = ?2 AND created_at < ?3))) + 1 AS rank, (SELECT COUNT(*) FROM scores WHERE mode = ?4 AND created_at >= ?1) AS total')
        .bind(from, score, now, mode)
        .first<{ rank: number; total: number }>(),
    ),
    s.db
      .prepare('SELECT (SELECT COUNT(*) FROM scores WHERE mode = ?3 AND (score > ?1 OR (score = ?1 AND created_at < ?2))) + 1 AS rank, (SELECT COUNT(*) FROM scores WHERE mode = ?3) AS total')
      .bind(score, now, mode)
      .first<{ rank: number; total: number }>(),
  ]);
  return json(
    {
      id: inserted?.id ?? null,
      initials: name,
      anonymous,
      score,
      durationMs: duration,
      damage: dealt,
      rivals: run.rivals,
      difficulty: run.difficulty,
      category: device.category,
      mode,
      wave: reached,
      kills: downed,
      rank: { today: today?.rank ?? 1, week: week?.rank ?? 1, month: month?.rank ?? 1, all: all?.rank ?? 1 },
      total: { today: today?.total ?? 1, week: week?.total ?? 1, month: month?.total ?? 1, all: all?.total ?? 1 },
      share: `${new URL(ctx.request.url).origin}/s/${shareId}`,
    },
    201,
  );
}

/**
 * PATCH /api/scores {runId, initials} → {initials}: the player changed the initials of the score just saved, on
 * its victory card. The run's id is the proof (only that game knows it), and it works only while the score is
 * fresh. One row written, and only when the name really changes.
 */
export async function renameScore(ctx: Ctx): Promise<Response> {
  const s = await setup(ctx);
  if (!s) return fail('unavailable', 503);
  const { db } = s;
  const body = await readBody(ctx.request);
  const runId = body?.runId;
  const initials = body?.initials;
  if (typeof runId !== 'string' || runId.length > 64) return fail('bad-request', 400);
  if (!validInitials(initials)) return fail('bad-initials', 400);
  const res = await db
    .prepare('UPDATE scores SET initials = ?1, anonymous = 0 WHERE run_id = ?2 AND created_at > ?3 AND (initials != ?1 OR anonymous != 0)')
    .bind(initials, runId, Date.now() - RENAME_TTL_MS)
    .run();
  if (res.meta.changes !== 1) {
    // Nothing changed: either it already had that name, or the score is unknown or too old.
    const row = await db.prepare('SELECT initials, anonymous, created_at FROM scores WHERE run_id = ?').bind(runId).first<{ initials: string; anonymous: number; created_at: number }>();
    if (!row || Date.now() - row.created_at > RENAME_TTL_MS || row.initials !== initials || row.anonymous) return fail('unknown-score', 409);
  }
  // The player's earlier wins left without a name take it too: only anonymous ones, among the ids this device
  // saved (`earlier`, client.ts myScores), and only from the same network, so nobody can sign someone else's.
  const earlier = parseMine(Array.isArray(body?.earlier) ? body.earlier.join(',') : null);
  if (earlier.length)
    await db
      .prepare(`UPDATE scores SET initials = ?1, anonymous = 0 WHERE anonymous = 1 AND ip_hash = ?2 AND id IN (${earlier.join(',')})`)
      .bind(initials, s.ip)
      .run();
  return json({ initials });
}

export const PERIODS = ['today', 'week', 'month', 'all'] as const;
export type Period = (typeof PERIODS)[number];

/** The player's own score ids, from `mine=1,2,3` (client.ts myScores). */
export function parseMine(raw: string | null): number[] {
  if (!raw) return [];
  const ids = raw.split(',').map(Number).filter((n) => Number.isSafeInteger(n) && n > 0);
  return [...new Set(ids)].slice(-MAX_MINE);
}

/**
 * GET /api/scores?period=today|week|month|all[&mode=duel|horde][&device=mobile|tablet|desktop][&mine=ids] → the top BOARD_SIZE of the board, plus `me`: the best of
 * the player's own scores on that board with its place, when it is below the top. Days, weeks (from Monday) and
 * months are UTC. Reads only, so the board costs no D1 writes.
 */
export async function listScores(ctx: Ctx): Promise<Response> {
  const s = ctx.env.DB;
  if (!s) return fail('unavailable', 503);
  await ensureSchema(s);
  const url = new URL(ctx.request.url);
  const asked = url.searchParams.get('period');
  const period: Period = (PERIODS as readonly string[]).includes(asked ?? '') ? (asked as Period) : 'today';
  const mine = parseMine(url.searchParams.get('mine'));
  const askedMode = url.searchParams.get('mode');
  const mode: BoardMode = isBoardMode(askedMode) ? askedMode : 'duel';
  const now = Date.now();
  const day = dayOf(now);
  const [when, whenArgs]: [string, unknown[]] =
    period === 'all'
      ? ['1 = 1', []]
      : period === 'today'
        ? ['day = ?', [day]]
        : ['created_at >= ?', [period === 'week' ? weekStart(now) : monthStart(now)]];
  // Only phones, tablets or computers; leaving `device` out (or `all`) keeps every score.
  const askedDevice = url.searchParams.get('device');
  const kind = isDeviceFilter(askedDevice) && askedDevice !== 'all' ? askedDevice : null;
  const where = `mode = ? AND ${when}${kind ? ' AND category = ?' : ''}`;
  const args = [mode, ...whenArgs, ...(kind ? [kind] : [])];
  const columns = 'id, initials, score, duration_ms, damage, rivals, difficulty, category, created_at, mode, wave, kills';
  const order = 'ORDER BY score DESC, created_at ASC LIMIT ?';
  const { results } = await s.prepare(`SELECT ${columns} FROM scores WHERE ${where} ${order}`).bind(...args, BOARD_SIZE).all<Row>();

  let me: { rank: number; entry: ReturnType<typeof entry> } | null = null;
  const shown = new Set(results.map((r) => r.id));
  if (mine.length && !mine.some((id) => shown.has(id)) && results.length === BOARD_SIZE) {
    const best = await s
      .prepare(`SELECT ${columns} FROM scores WHERE ${where} AND id IN (${mine.map(() => '?').join(',')}) ${order}`)
      .bind(...args, ...mine, 1)
      .first<Row>();
    if (best) {
      // Ties go to whoever got there first, as on the board.
      const above = await s
        .prepare(`SELECT COUNT(*) AS n FROM scores WHERE ${where} AND (score > ? OR (score = ? AND created_at < ?))`)
        .bind(...args, best.score, best.score, best.created_at)
        .first<{ n: number }>();
      me = { rank: (above?.n ?? 0) + 1, entry: entry(best) };
    }
  }
  return json({ period, mode, day, entries: results.map(entry), me }, 200, mine.length ? 'private, max-age=10' : 'public, max-age=10');
}

/** Any error becomes a plain 500 the game can show as "ranking unavailable". */
export async function guard(handler: () => Promise<Response>) {
  try {
    return await handler();
  } catch (e) {
    console.error('leaderboard', e);
    return fail('server', 500);
  }
}
