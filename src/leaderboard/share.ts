/**
 * The share card: a 1080×1350 PNG (fits a feed post, a chat and a story) in the game's brush look,
 * with the score, the time, the match and the place on the board. Phones open the system share sheet
 * with the image; elsewhere the image downloads and the text is copied.
 */
import '@fontsource-variable/alegreya/wght.css'; // the card's title face, whatever the rest of the UI loads
import { brushPath, ensoLine } from '../ammo';
import { DIFFICULTY_LABEL, type Difficulty } from '../combat';
import { LANG, t } from '../i18n';
import { SITE_URL } from '../i18n/seo';
import { localizePath } from '../i18n/locale';
import { arc, random, segment } from '../match';
import { formatTime } from './score';

export interface ShareData {
  score: number;
  durationMs: number;
  damage: number;
  rivals: number;
  difficulty: Difficulty;
  initials?: string;
  rank?: { today: number; all: number };
}

const W = 1080;
const H = 1350;
const FONT = "'Alegreya Variable', Georgia, serif";
const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const shareUrl = () => new URL(localizePath('/', LANG), SITE_URL).href;

/** The enso and the standing alchemist from the end card, drawn with the brush's dry gaps. */
function emblem(size: number) {
  const rand = random();
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.scale(size / 48, size / 48);
  const ring = brushPath(ensoLine(rand), 2.2, rand);
  const head = brushPath(arc(24, 16, 5, -2 + rand(), -2 + rand() + Math.PI * 2.1), 3.4, rand);
  const body = brushPath(arc(24, 36, 9.5, Math.PI * 1.02, Math.PI * 1.98), 4.4, rand);
  g.fillStyle = '#e0a23c';
  g.fill(new Path2D(ring.ink));
  g.fillStyle = '#3d7fd6';
  g.fill(new Path2D(head.ink + body.ink));
  g.globalCompositeOperation = 'destination-out';
  g.fill(new Path2D(ring.dry + head.dry + body.dry));
  return c;
}

/** A brush underline, like the HUD's strokes. */
function underline(g: CanvasRenderingContext2D, cx: number, y: number, width: number) {
  const rand = random();
  const k = width / 40;
  const b = brushPath(segment([0, 0], [40, 0.6]), 2.6, rand);
  g.save();
  g.translate(cx - width / 2, y);
  g.scale(k, k);
  g.fillStyle = '#e0a23c';
  g.fill(new Path2D(b.ink));
  g.restore();
}

export async function renderShareCard(d: ShareData): Promise<Blob> {
  try {
    await Promise.all([document.fonts.load(`700 64px ${FONT}`), document.fonts.load(`800 64px ${FONT}`)]);
  } catch {
    // The fallback serif will do.
  }
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;

  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#dfe6e3');
  sky.addColorStop(0.55, '#b9c9c3');
  sky.addColorStop(1, '#7f9a90');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);
  const glow = g.createRadialGradient(W / 2, 520, 60, W / 2, 520, 700);
  glow.addColorStop(0, 'rgba(255,255,255,.55)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = glow;
  g.fillRect(0, 0, W, H);

  g.textAlign = 'center';
  g.textBaseline = 'alphabetic';
  g.fillStyle = '#23322a';
  g.font = `700 64px ${FONT}`;
  g.letterSpacing = '12px';
  g.fillText('CIRQUIMIA', W / 2 + 6, 140);
  g.letterSpacing = '0px';

  g.drawImage(emblem(340), W / 2 - 170, 190);

  g.fillStyle = '#9a6418';
  g.font = `800 84px ${FONT}`;
  g.fillText(t.match.victory, W / 2, 640);

  g.fillStyle = '#23322a';
  g.font = `800 210px ${FONT}`;
  g.fillText(d.score.toLocaleString(LANG), W / 2, 850);
  underline(g, W / 2, 880, 420);
  g.font = `600 46px ${SANS}`;
  g.globalAlpha = 0.75;
  g.fillText(t.rank.points(d.score), W / 2, 950);
  g.globalAlpha = 1;

  const stats = `⏱ ${formatTime(d.durationMs)}  ·  ${t.rank.damage(d.damage)}  ·  ${t.rank.rivals(d.rivals)}  ·  ${DIFFICULTY_LABEL[d.difficulty]}`;
  let size = 44;
  do g.font = `600 ${size}px ${SANS}`;
  while (g.measureText(stats).width > W - 140 && --size > 28);
  g.fillText(stats, W / 2, 1060);

  if (d.initials) {
    g.font = `800 60px ${SANS}`;
    const rank = d.rank ? `   ·   ${t.rank.placeToday(d.rank.today)}` : '';
    g.fillText(`${d.initials}${rank}`, W / 2, 1160);
  }

  g.font = `600 38px ${SANS}`;
  g.globalAlpha = 0.85;
  g.fillText(t.rank.beatMe, W / 2, 1265);
  g.font = `700 38px ${SANS}`;
  g.fillText(SITE_URL.replace(/^https:\/\//, ''), W / 2, 1315);
  g.globalAlpha = 1;

  return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob'))), 'image/png'));
}

export function shareText(d: ShareData) {
  return t.rank.shareText(d.score.toLocaleString(LANG), formatTime(d.durationMs), d.rivals, DIFFICULTY_LABEL[d.difficulty], shareUrl());
}

export type Target = 'x' | 'discord' | 'bluesky' | 'threads' | 'mastodon' | 'image';

const MASTODON_STORE = 'cirquimia.mastodon';

/** The Mastodon server the player gave last time, if any. */
export function savedMastodon(): string {
  try {
    return localStorage.getItem(MASTODON_STORE) ?? '';
  } catch {
    return '';
  }
}

/** "@me@mastodon.social", "https://mastodon.social/" or "mastodon.social" → "mastodon.social"; null when it is not a host. */
export function mastodonHost(raw: string): string | null {
  const host = raw.trim().replace(/^https?:\/\//i, '').replace(/^@?[^@\s]*@/, '').split(/[/?#\s]/)[0].toLowerCase();
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) ? host : null;
}

const enc = encodeURIComponent;

/** Where each network takes a prepared post. Discord has no such page: it gets the image instead. */
export function composeUrl(target: 'x' | 'bluesky' | 'threads' | 'mastodon', text: string, host = 'mastodon.social') {
  switch (target) {
    case 'x':
      return `https://x.com/intent/post?text=${enc(text)}`;
    case 'bluesky':
      return `https://bsky.app/intent/compose?text=${enc(text)}`;
    case 'threads':
      return `https://www.threads.net/intent/post?text=${enc(text)}`;
    case 'mastodon':
      return `https://${host}/share?text=${enc(text)}`;
  }
}

function download(blob: Blob, name: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 10_000);
}

/**
 * Opens a network's composer with the text and link. Called straight from the tap so the new tab is not blocked;
 * the networks' compose pages take text only, so the image goes to Discord and "Save image".
 */
export function openComposer(target: 'x' | 'bluesky' | 'threads' | 'mastodon', d: ShareData, host?: string) {
  if (target === 'mastodon' && host) {
    try {
      localStorage.setItem(MASTODON_STORE, host);
    } catch {
      // Asked again next time.
    }
  }
  window.open(composeUrl(target, shareText(d), host), '_blank', 'noopener');
}

/**
 * Discord: phones open the share sheet with the image (Discord is in it); elsewhere the image is copied
 * to paste into a channel, or saved if the browser cannot copy images.
 */
export async function shareDiscord(card: Promise<Blob>, d: ShareData): Promise<'shared' | 'copied' | 'saved' | 'cancelled'> {
  const blob = await card;
  const file = new File([blob], `cirquimia-${d.score}.png`, { type: 'image/png' });
  const touch = matchMedia('(pointer: coarse)').matches;
  if (touch && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: shareText(d) });
      return 'shared';
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return 'cancelled';
    }
  }
  try {
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    return 'copied';
  } catch {
    download(blob, file.name);
    return 'saved';
  }
}

export async function saveImage(card: Promise<Blob>, d: ShareData) {
  download(await card, `cirquimia-${d.score}.png`);
}
