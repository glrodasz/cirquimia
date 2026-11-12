/**
 * Share links: the victory card as a page of its own, so a post on X, Bluesky, Threads, Mastodon or a chat
 * shows the card itself as the link's preview. Social networks only take text in their compose links, but every
 * one of them reads og:image from the link, so the game uploads the card and posts /s/<id> instead of the bare site.
 *
 * POST /api/shares (multipart: runId, image, durationMs, damage, initials?, locale) → {id, url}
 *   One card per run: sharing again (after saving the initials, say) replaces the image and keeps the link.
 *   The run must be a real ranked match opened by the server in the last hours; the score is recomputed here.
 * GET /s/<id>      → people go straight to the game; link-preview robots get the preview tags with the card.
 * GET /s/<id>.jpg  → the card.
 *
 * The images live in D1 next to the ranking (about 100 KB each), so nothing else needs to be set up.
 */
import { isLocale, localizePath, type Locale } from '../i18n/locale';
import { SITE_URL } from '../i18n/seo';
import type { Difficulty } from '../combat';
import { isDifficulty, plausible, scoreFor, validInitials, formatTime } from './score';
import { ensureSchema, fail, json, RUN_TTL_MS, setup, WINDOW_MS, type Ctx } from './server';

/** The card is a 1200×630 JPEG, usually 80–150 KB; anything far larger is not ours. */
export const MAX_IMAGE = 600 * 1024;
const MAX_SHARES_PER_WINDOW = 20;
const ID_CHARS = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const ID_PATTERN = /^[a-km-zA-HJ-NP-Z2-9]{8}$/;

export function newShareId() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return [...bytes].map((b) => ID_CHARS[b % ID_CHARS.length]).join('');
}

const isJpeg = (b: Uint8Array) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;

export async function createShare(ctx: Ctx): Promise<Response> {
  const s = await setup(ctx);
  if (!s) return fail('unavailable', 503);
  const length = Number(ctx.request.headers.get('Content-Length') ?? 0);
  if (length > MAX_IMAGE + 8192) return fail('too-large', 413);
  let form: FormData;
  try {
    form = await ctx.request.formData();
  } catch {
    return fail('bad-request', 400);
  }
  const runId = form.get('runId');
  const image = form.get('image');
  const durationMs = Number(form.get('durationMs'));
  const damage = Number(form.get('damage'));
  const rawInitials = form.get('initials');
  const initials = typeof rawInitials === 'string' && validInitials(rawInitials) ? rawInitials : null;
  const rawLocale = form.get('locale');
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  if (typeof runId !== 'string' || runId.length > 64 || !image || typeof image === 'string') return fail('bad-request', 400);
  const bytes = new Uint8Array(await (image as Blob).arrayBuffer());
  if (bytes.length > MAX_IMAGE) return fail('too-large', 413);
  if (!isJpeg(bytes)) return fail('bad-image', 415);

  const now = Date.now();
  const run = await s.db
    .prepare('SELECT created_at, rivals, difficulty FROM runs WHERE id = ?')
    .bind(runId)
    .first<{ created_at: number; rivals: number; difficulty: string }>();
  if (!run || now - run.created_at > RUN_TTL_MS) return fail('unknown-run', 409);
  if (!isDifficulty(run.difficulty) || !plausible(run.rivals, run.difficulty, durationMs, damage)) return fail('implausible', 422);

  // A saved score is the truth; before saving, the same rules the server applies to scores.
  const saved = await s.db
    .prepare('SELECT initials, score, duration_ms, damage FROM scores WHERE run_id = ?')
    .bind(runId)
    .first<{ initials: string; score: number; duration_ms: number; damage: number }>();
  const duration = saved?.duration_ms ?? Math.round(durationMs);
  const dealt = saved?.damage ?? damage;
  const score = saved?.score ?? scoreFor(dealt, run.difficulty, duration);
  const who = saved?.initials ?? initials;

  const recent = await s.db
    .prepare('SELECT COUNT(*) AS n FROM shares WHERE ip_hash = ? AND updated_at > ?')
    .bind(s.ip, now - WINDOW_MS)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_SHARES_PER_WINDOW) return fail('too-many', 429);

  const row = await s.db
    .prepare(
      `INSERT INTO shares (id, run_id, locale, initials, score, duration_ms, damage, rivals, difficulty, image, ip_hash, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(run_id) DO UPDATE SET locale = excluded.locale, initials = excluded.initials, score = excluded.score,
         duration_ms = excluded.duration_ms, damage = excluded.damage, image = excluded.image, ip_hash = excluded.ip_hash, updated_at = excluded.updated_at
       RETURNING id, updated_at`,
    )
    .bind(newShareId(), runId, locale, who, score, duration, dealt, run.rivals, run.difficulty, bytes, s.ip, now, now)
    .first<{ id: string; updated_at: number }>();
  if (!row) return fail('server', 500);
  const origin = new URL(ctx.request.url).origin;
  return json({ id: row.id, url: `${origin}/s/${row.id}` }, 201);
}

export interface ShareRow {
  id: string;
  locale: string;
  initials: string | null;
  score: number;
  duration_ms: number;
  damage: number;
  rivals: number;
  difficulty: string;
  updated_at: number;
}

const COPY = {
  en: {
    level: { facil: 'Easy', normal: 'Normal', dificil: 'Hard', experto: 'Very hard' } as Record<Difficulty, string>,
    title: (who: string | null, score: string) => `${who ? `${who}: ` : ''}${score} points in Cirquimia`,
    body: (rivals: number, level: string, time: string) =>
      `Beat ${rivals === 1 ? '1 rival' : `${rivals} rivals`} on ${level} in ${time}. Can you beat it?`,
    play: 'Accept the challenge',
    alt: (score: string) => `Cirquimia victory card: ${score} points`,
  },
  es: {
    level: { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil', experto: 'Muy difícil' } as Record<Difficulty, string>,
    title: (who: string | null, score: string) => `${who ? `${who}: ` : ''}${score} puntos en Cirquimia`,
    body: (rivals: number, level: string, time: string) =>
      `Venció a ${rivals === 1 ? '1 rival' : `${rivals} rivales`} en ${level} en ${time}. ¿Lo superas?`,
    play: 'Acepta el reto',
    alt: (score: string) => `Tarjeta de victoria de Cirquimia: ${score} puntos`,
  },
} satisfies Record<Locale, unknown>;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * What link previews read: the card as og:image and the match in one line. People never stay here: they are sent
 * to the game at once (link-preview crawlers get this page, everyone else a redirect before it; see serveShare).
 */
export function sharePage(row: ShareRow, origin: string) {
  const locale: Locale = isLocale(row.locale) ? row.locale : 'en';
  const c = COPY[locale];
  const score = row.score.toLocaleString(locale);
  const level = isDifficulty(row.difficulty) ? c.level[row.difficulty] : row.difficulty;
  const who = row.initials && validInitials(row.initials) ? row.initials : null;
  const title = c.title(who, score);
  const body = c.body(row.rivals, level, formatTime(row.duration_ms));
  const page = `${origin}/s/${row.id}`;
  const image = `${origin}/s/${row.id}.jpg?v=${row.updated_at}`;
  const play = new URL(localizePath('/', locale), origin).href;
  const meta = (attr: 'name' | 'property', key: string, value: string) => `<meta ${attr}="${key}" content="${esc(value)}">`;
  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${meta('name', 'description', body)}
<link rel="canonical" href="${page}">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
${meta('name', 'robots', 'noindex')}
${meta('property', 'og:type', 'website')}
${meta('property', 'og:site_name', 'Cirquimia')}
${meta('property', 'og:url', page)}
${meta('property', 'og:title', title)}
${meta('property', 'og:description', body)}
${meta('property', 'og:image', image)}
${meta('property', 'og:image:type', 'image/jpeg')}
${meta('property', 'og:image:width', '1200')}
${meta('property', 'og:image:height', '630')}
${meta('property', 'og:image:alt', c.alt(score))}
${meta('name', 'twitter:card', 'summary_large_image')}
${meta('name', 'twitter:title', title)}
${meta('name', 'twitter:description', body)}
${meta('name', 'twitter:image', image)}
${meta('name', 'twitter:image:alt', c.alt(score))}
<meta http-equiv="refresh" content="0; url=${esc(play)}">
</head>
<body>
<script>location.replace(${JSON.stringify(play).replace(/</g, '\\u003c')})</script>
<a href="${esc(play)}">${esc(c.play)}</a>
</body>
</html>`;
}

const notFound = (origin: string) => Response.redirect(`${origin || SITE_URL}/`, 302);

/**
 * The robots that fetch link previews: X, Meta (Facebook, Threads, Instagram), Bluesky, Mastodon servers, Discord,
 * Slack, Telegram, WhatsApp, LinkedIn, iMessage, search engines and the usual unfurlers.
 */
const PREVIEW_BOT =
  /bot\b|bot\/|crawler|spider|facebookexternalhit|facebot|meta-externalagent|cardyb|mastodon|http\.rb|pleroma|misskey|whatsapp|telegram|slack|discord|linkedin|embedly|iframely|vkshare|skypeuripreview|redditbot|pinterest|tumblr|bitlybot|google-pagerenderer|applebot/i;

export const isPreviewBot = (ua: string | null) => !!ua && PREVIEW_BOT.test(ua);

/** GET /s/<id> and /s/<id>.jpg. Unknown links go to the game rather than to an error. */
export async function serveShare(ctx: Ctx, param: string): Promise<Response> {
  const origin = new URL(ctx.request.url).origin;
  const db = ctx.env.DB;
  const isImage = param.endsWith('.jpg');
  const id = isImage ? param.slice(0, -4) : param;
  if (!db || !ID_PATTERN.test(id)) return notFound(origin);
  await ensureSchema(db);
  if (isImage) {
    const row = await db.prepare('SELECT image FROM shares WHERE id = ?').bind(id).first<{ image: ArrayBuffer | number[] }>();
    if (!row) return new Response('Not found', { status: 404 });
    return new Response(new Uint8Array(row.image as ArrayBuffer), {
      headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400' },
    });
  }
  const row = await db
    .prepare('SELECT id, locale, initials, score, duration_ms, damage, rivals, difficulty, updated_at FROM shares WHERE id = ?')
    .bind(id)
    .first<ShareRow>();
  if (!row) return notFound(origin);
  // The answer depends on who asks, so no shared cache may keep it.
  const vary = { 'Cache-Control': 'private, no-store', Vary: 'User-Agent' };
  if (!isPreviewBot(ctx.request.headers.get('User-Agent'))) {
    const locale: Locale = isLocale(row.locale) ? row.locale : 'en';
    return new Response(null, { status: 302, headers: { Location: new URL(localizePath('/', locale), origin).href, ...vary } });
  }
  return new Response(sharePage(row, origin), { headers: { 'Content-Type': 'text/html; charset=utf-8', ...vary } });
}
