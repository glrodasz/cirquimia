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
import { dayOf, isDifficulty, plausible, scoreFor, validInitials, MIN_RIVALS, MAX_RIVALS } from './score';

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
const MAX_SCORES_PER_WINDOW = 12;
const MAX_BODY = 4096;
const BOARD_SIZE = 50;

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

/** POST /api/runs {rivals, difficulty} → {id}: a match against rivals has started. */
export async function startRun(ctx: Ctx): Promise<Response> {
  const s = await setup(ctx);
  if (!s) return fail('unavailable', 503);
  const body = await readBody(ctx.request);
  const rivals = body?.rivals;
  const difficulty = body?.difficulty;
  if (!Number.isInteger(rivals) || (rivals as number) < MIN_RIVALS || (rivals as number) > MAX_RIVALS || !isDifficulty(difficulty)) {
    return fail('bad-request', 400);
  }
  const now = Date.now();
  const recent = await s.db.prepare('SELECT COUNT(*) AS n FROM runs WHERE ip_hash = ? AND created_at > ?').bind(s.ip, now - WINDOW_MS).first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_RUNS_PER_WINDOW) return fail('too-many', 429);
  const id = crypto.randomUUID();
  await s.db.prepare('INSERT INTO runs (id, created_at, rivals, difficulty, ip_hash) VALUES (?, ?, ?, ?, ?)').bind(id, now, rivals, difficulty, s.ip).run();
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
});

/** POST /api/scores {runId, initials, durationMs, damage, hints…} → {id, score, rank, total}. */
export async function submitScore(ctx: Ctx): Promise<Response> {
  const s = await setup(ctx);
  if (!s) return fail('unavailable', 503);
  const body = await readBody(ctx.request);
  if (!body) return fail('bad-request', 400);
  const { runId, initials, durationMs, damage } = body;
  if (typeof runId !== 'string' || runId.length > 64) return fail('bad-request', 400);
  if (!validInitials(initials)) return fail('bad-initials', 400);

  const now = Date.now();
  const recent = await s.db.prepare('SELECT COUNT(*) AS n FROM scores WHERE ip_hash = ? AND created_at > ?').bind(s.ip, now - WINDOW_MS).first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_SCORES_PER_WINDOW) return fail('too-many', 429);

  const run = await s.db
    .prepare('SELECT created_at, rivals, difficulty, used FROM runs WHERE id = ?')
    .bind(runId)
    .first<{ created_at: number; rivals: number; difficulty: string; used: number }>();
  if (!run || run.used || now - run.created_at > RUN_TTL_MS) return fail('unknown-run', 409);
  if (!isDifficulty(run.difficulty) || !plausible(run.rivals, run.difficulty, durationMs, damage)) return fail('implausible', 422);
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
  const score = scoreFor(dealt, run.difficulty, duration);
  const day = dayOf(now);
  const country = (ctx.request as Request & { cf?: { country?: string } }).cf?.country ?? null;
  const shareId = newShareId();

  const inserted = await s.db
    .prepare(
      `INSERT INTO scores (share_id, run_id, initials, score, duration_ms, damage, rivals, difficulty, category, os, device, browser, model, os_version, screen, locale, user_agent, country, ip_hash, day, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    )
    .bind(
      shareId,
      runId,
      initials,
      score,
      duration,
      dealt,
      run.rivals,
      run.difficulty,
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
    )
    .first<{ id: number }>();

  // Ties go to whoever got there first.
  const [today, all] = await Promise.all([
    s.db
      .prepare('SELECT (SELECT COUNT(*) FROM scores WHERE day = ?1 AND (score > ?2 OR (score = ?2 AND created_at < ?3))) + 1 AS rank, (SELECT COUNT(*) FROM scores WHERE day = ?1) AS total')
      .bind(day, score, now)
      .first<{ rank: number; total: number }>(),
    s.db
      .prepare('SELECT (SELECT COUNT(*) FROM scores WHERE score > ?1 OR (score = ?1 AND created_at < ?2)) + 1 AS rank, (SELECT COUNT(*) FROM scores) AS total')
      .bind(score, now)
      .first<{ rank: number; total: number }>(),
  ]);
  return json(
    {
      id: inserted?.id ?? null,
      score,
      durationMs: duration,
      damage: dealt,
      rivals: run.rivals,
      difficulty: run.difficulty,
      category: device.category,
      rank: { today: today?.rank ?? 1, all: all?.rank ?? 1 },
      total: { today: today?.total ?? 1, all: all?.total ?? 1 },
      share: `${new URL(ctx.request.url).origin}/s/${shareId}`,
    },
    201,
  );
}

/** GET /api/scores?period=today|all → the top of the board. */
export async function listScores(ctx: Ctx): Promise<Response> {
  const s = ctx.env.DB;
  if (!s) return fail('unavailable', 503);
  await ensureSchema(s);
  const url = new URL(ctx.request.url);
  const period = url.searchParams.get('period') === 'all' ? 'all' : 'today';
  const day = dayOf(Date.now());
  const columns = 'id, initials, score, duration_ms, damage, rivals, difficulty, category, created_at';
  const query =
    period === 'all'
      ? s.prepare(`SELECT ${columns} FROM scores ORDER BY score DESC, created_at ASC LIMIT ?`).bind(BOARD_SIZE)
      : s.prepare(`SELECT ${columns} FROM scores WHERE day = ? ORDER BY score DESC, created_at ASC LIMIT ?`).bind(day, BOARD_SIZE);
  const { results } = await query.all<Row>();
  return json({ period, day, entries: results.map(entry) }, 200, 'public, max-age=10');
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
