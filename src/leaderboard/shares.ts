/**
 * Share links: a saved score as a link whose preview is its victory card, so a post on X, Bluesky, Threads,
 * Mastodon or a chat shows the card. Social networks only take text in their compose links, but every one of them
 * reads og:image from the link.
 *
 * Saving a score gives it a random share_id (src/leaderboard/server.ts), and the link is /s/<share_id>: the page
 * is built from that score row, so there is nothing else to register. The only extra is the card's image, drawn
 * by the game (it holds the meadow of the match), which the game uploads right after saving.
 *
 * POST /api/shares (multipart: runId, image) → {url}   The run's id proves the score is the sender's.
 * GET /s/<id>      → people go straight to the game; link-preview robots get the preview tags with the card.
 * GET /s/<id>.jpg  → the card.
 */
import { isLocale, localizePath, type Locale } from '../i18n/locale';
import { SITE_URL } from '../i18n/seo';
import type { Difficulty } from '../combat';
import { dayOf, monthStart, isDifficulty, validInitials, formatTime } from './score';
import { ensureSchema, fail, json, setup, type Ctx, type D1Database } from './server';
import { ID_PATTERN } from './shareId';
import { CHALLENGE_PARAM, challengeValue } from './challengeLink';

/** The card is a 1200×630 JPEG, usually 80–150 KB; anything far larger is not ours. */
export const MAX_IMAGE = 600 * 1024;
/** Cards are uploaded right after saving; past this, a score's card can no longer be replaced. */
const UPLOAD_TTL_MS = 60 * 60 * 1000;
/** Cards on the all-time, this month's and today's top (UTC) are kept while they are on it; every other card goes after CARD_TTL_MS. */
export const KEEP_TOP = 100;
/** Long enough for the preview of a fresh share; after it the link shows the game's own picture (/og/<locale>.jpg). */
export const CARD_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const isJpeg = (b: Uint8Array) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;

export async function uploadCard(ctx: Ctx): Promise<Response> {
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
  if (typeof runId !== 'string' || runId.length > 64 || !image || typeof image === 'string') return fail('bad-request', 400);
  const bytes = new Uint8Array(await (image as Blob).arrayBuffer());
  if (bytes.length > MAX_IMAGE) return fail('too-large', 413);
  if (!isJpeg(bytes)) return fail('bad-image', 415);

  const now = Date.now();
  const score = await s.db.prepare('SELECT share_id, created_at FROM scores WHERE run_id = ?').bind(runId).first<{ share_id: string | null; created_at: number }>();
  if (!score?.share_id || now - score.created_at > UPLOAD_TTL_MS) return fail('unknown-score', 409);
  await s.db
    .prepare('INSERT INTO share_images (share_id, image, created_at) VALUES (?, ?, ?) ON CONFLICT(share_id) DO UPDATE SET image = excluded.image')
    .bind(score.share_id, bytes, now)
    .run();
  await pruneCards(s.db, now).catch(() => {}); // storage housekeeping must never fail an upload
  return json({ url: `${new URL(ctx.request.url).origin}/s/${score.share_id}` }, 201);
}

/**
 * Keeps share_images small: at most KEEP_TOP all-time + KEEP_TOP this month + KEEP_TOP today (the lists overlap),
 * plus the cards younger than CARD_TTL_MS. The weekly board needs no rule: a week is never older than the TTL.
 * The score rows stay, so pruned links still work and still replay the match.
 */
export async function pruneCards(db: D1Database, now: number): Promise<number> {
  const res = await db
    .prepare(
      `DELETE FROM share_images WHERE created_at < ?1
       AND share_id NOT IN (SELECT share_id FROM scores WHERE share_id IS NOT NULL ORDER BY score DESC, created_at ASC LIMIT ?3)
       AND share_id NOT IN (SELECT share_id FROM scores WHERE day = ?2 AND share_id IS NOT NULL ORDER BY score DESC, created_at ASC LIMIT ?3)
       AND share_id NOT IN (SELECT share_id FROM scores WHERE created_at >= ?4 AND share_id IS NOT NULL ORDER BY score DESC, created_at ASC LIMIT ?3)`,
    )
    .bind(now - CARD_TTL_MS, dayOf(now), KEEP_TOP, monthStart(now))
    .run();
  return res.meta.changes;
}

export interface ShareRow {
  id: string;
  locale: string | null;
  /** When the card was uploaded, to bust caches; null when the score has no card, and the game's picture stands in. */
  card: number | null;
  initials: string | null;
  /** 1 when nobody named the score (saved as ANON): the preview then names nobody. */
  anonymous?: number | null;
  score: number;
  duration_ms: number;
  damage: number;
  rivals: number;
  difficulty: string;
  /** The match's meadow; null on scores saved before it was recorded. */
  seed: string | null;
}

/** Where the link sends people: the game, in the sharer's language, set up with the challenger's match (src/challenge.ts). */
export function challengeUrl(row: Pick<ShareRow, 'locale' | 'rivals' | 'difficulty' | 'seed'>, origin: string) {
  const locale: Locale = isLocale(row.locale) ? row.locale : 'en';
  const url = new URL(localizePath('/', locale), origin);
  if (isDifficulty(row.difficulty)) url.searchParams.set(CHALLENGE_PARAM, challengeValue(row.rivals, row.difficulty, row.seed));
  return url.href;
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
  const who = !row.anonymous && row.initials && validInitials(row.initials) ? row.initials : null;
  const title = c.title(who, score);
  const body = c.body(row.rivals, level, formatTime(row.duration_ms));
  const page = `${origin}/s/${row.id}`;
  const image = row.card ? `${origin}/s/${row.id}.jpg?v=${row.card}` : `${origin}/og/${locale}.jpg`;
  const play = challengeUrl(row, origin);
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
    const row = await db
      .prepare('SELECT i.image, s.locale FROM scores s LEFT JOIN share_images i ON i.share_id = s.share_id WHERE s.share_id = ?')
      .bind(id)
      .first<{ image: ArrayBuffer | number[] | null; locale: string | null }>();
    if (!row) return new Response('Not found', { status: 404 });
    // A pruned card (pruneCards): previews that ask for it again get the game's own picture.
    if (!row.image) return Response.redirect(`${origin}/og/${isLocale(row.locale) ? row.locale : 'en'}.jpg`, 302);
    return new Response(new Uint8Array(row.image as ArrayBuffer), {
      headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400' },
    });
  }
  const row = await db
    .prepare(
      `SELECT s.share_id AS id, s.locale, s.initials, s.anonymous, s.score, s.duration_ms, s.damage, s.rivals, s.difficulty, s.seed, i.created_at AS card
       FROM scores s LEFT JOIN share_images i ON i.share_id = s.share_id WHERE s.share_id = ?`,
    )
    .bind(id)
    .first<ShareRow>();
  if (!row) return notFound(origin);
  // The answer depends on who asks, so no shared cache may keep it.
  const vary = { 'Cache-Control': 'private, no-store', Vary: 'User-Agent' };
  if (!isPreviewBot(ctx.request.headers.get('User-Agent'))) {
    return new Response(null, { status: 302, headers: { Location: challengeUrl(row, origin), ...vary } });
  }
  return new Response(sharePage(row, origin), { headers: { 'Content-Type': 'text/html; charset=utf-8', ...vary } });
}
