/**
 * The share card: a 1080×1080 PNG (whole in a feed, a chat and a story) on grimoire paper, with the meadow
 * the match was won in seen through a transmutation circle, the score in red ink and a challenge at the foot.
 * Phones open the system share sheet with the image; elsewhere the image is copied or downloaded.
 */
import { shapeIcon } from '../ammo';
import { DIFFICULTY_LABEL, type Difficulty } from '../combat';
import type { ShapeKind } from '../gestures';
import { LANG, t } from '../i18n';
import { SITE_URL } from '../i18n/seo';
import { localizePath } from '../i18n/locale';
import meadowFallback from '../assets/share/meadow.jpg';
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

export const CARD_SIZE = 1080;
const W = CARD_SIZE;
const H = CARD_SIZE;
const FONT = "'EB Garamond Variable', Garamond, Georgia, serif";
const PAPER = '#f5efe0';
const INK = '#1f1a15';
const SOFT = '#6b6258';
const RED = '#a3271c';
// The circle sits past the top right corner, as on the link preview, so the meadow reads as a glimpse.
const DISC = { x: 830, y: 270, r: 370 };
const SYMBOLS: ShapeKind[] = ['circle', 'square', 'triangle', 'triangleDown', 'rhombus', 'pentagram'];

export const shareUrl = () => new URL(localizePath('/', LANG), SITE_URL).href;

let fallback: Promise<HTMLImageElement | null> | null = null;
/** The bundled meadow, for when the frame of the match could not be read. */
function fallbackMeadow() {
  return (fallback ??= new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = meadowFallback;
  }));
}

/** The paper: warm cream, a little darker towards the edges, with a faint grain. */
function paper(g: CanvasRenderingContext2D) {
  g.fillStyle = PAPER;
  g.fillRect(0, 0, W, H);
  const edge = g.createRadialGradient(W * 0.35, H * 0.62, 200, W * 0.45, H * 0.55, W * 0.85);
  edge.addColorStop(0, 'rgba(120,90,50,0)');
  edge.addColorStop(1, 'rgba(120,90,50,.16)');
  g.fillStyle = edge;
  g.fillRect(0, 0, W, H);
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = rand() < 0.5 ? 'rgba(70,50,30,.05)' : 'rgba(255,255,255,.18)';
    g.fillRect(rand() * W, rand() * H, 1.5 + rand() * 1.5, 1.5 + rand() * 1.5);
  }
}

/** The meadow through the circle, with the rings, ticks and the six symbols of a transmutation circle around it. */
function circle(g: CanvasRenderingContext2D, meadow: CanvasImageSource | null) {
  const { x, y, r } = DISC;
  g.save();
  g.shadowColor = 'rgba(31,26,21,.35)';
  g.shadowBlur = 40;
  g.shadowOffsetX = -10;
  g.shadowOffsetY = 12;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fillStyle = '#7f9a90';
  g.fill();
  g.restore();
  if (meadow) {
    g.save();
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.clip();
    g.drawImage(meadow, x - r, y - r, r * 2, r * 2);
    // A breath of paper over the edge, so the scene sinks into the page rather than sitting on it.
    const veil = g.createRadialGradient(x, y, r * 0.7, x, y, r);
    veil.addColorStop(0, 'rgba(245,239,224,0)');
    veil.addColorStop(1, 'rgba(245,239,224,.28)');
    g.fillStyle = veil;
    g.fillRect(x - r, y - r, r * 2, r * 2);
    g.restore();
  }

  g.lineCap = 'round';
  const ring = (radius: number, width: number, color: string, dash: number[] = []) => {
    g.beginPath();
    g.setLineDash(dash);
    g.arc(x, y, radius, 0, Math.PI * 2);
    g.lineWidth = width;
    g.strokeStyle = color;
    g.stroke();
  };
  ring(r, 10, PAPER);
  ring(r + 22, 2, INK);
  ring(r + 96, 1.5, INK);
  ring(r + 108, 1.5, RED, [2, 12]);
  g.setLineDash([]);
  // Ticks between the inner and outer ring, like the graduations of an astrolabe.
  g.strokeStyle = INK;
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2;
    const long = i % 10 === 0;
    const r0 = r + 22;
    const r1 = r0 + (long ? 18 : 9);
    g.lineWidth = long ? 2 : 1;
    g.beginPath();
    g.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0);
    g.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1);
    g.stroke();
  }
  // The six symbols on the visible arc, fine nib like the book's index.
  const ringR = r + 62;
  const from = Math.PI * 0.52;
  const to = Math.PI * 1.0;
  SYMBOLS.forEach((kind, i) => {
    const a = from + ((to - from) * i) / (SYMBOLS.length - 1);
    const d = /d="([^"]+)"/.exec(shapeIcon(kind, true))?.[1];
    if (!d) return;
    const size = 48;
    g.save();
    g.translate(x + Math.cos(a) * ringR - size / 2, y + Math.sin(a) * ringR - size / 2);
    g.scale(size / 48, size / 48);
    g.fillStyle = i === 2 || i === 5 ? RED : INK;
    g.fill(new Path2D(d));
    g.restore();
  });
}

/** Text that shrinks until it fits `width`. */
function fit(g: CanvasRenderingContext2D, text: string, weight: string, size: number, width: number, min = 20) {
  do g.font = `${weight} ${size}px ${FONT}`;
  while (g.measureText(text).width > width && --size > min);
}

/** Text with a halo of paper, so the circle's rings pass behind the letters instead of through them. */
function inked(g: CanvasRenderingContext2D, text: string, x: number, y: number) {
  g.save();
  g.strokeStyle = '#eee5d2'; // the paper where the edges start to darken
  g.lineWidth = 14;
  g.lineJoin = 'round';
  g.strokeText(text, x, y);
  g.restore();
  g.fillText(text, x, y);
}

/** Two thin rules, the grimoire's frame around the page. */
function frame(g: CanvasRenderingContext2D) {
  g.strokeStyle = INK;
  g.lineWidth = 2;
  g.strokeRect(36, 36, W - 72, H - 72);
  g.lineWidth = 1;
  g.globalAlpha = 0.5;
  g.strokeRect(46, 46, W - 92, H - 92);
  g.globalAlpha = 1;
}

export async function renderShareCard(d: ShareData, meadow?: CanvasImageSource | null): Promise<Blob> {
  try {
    await Promise.all([
      document.fonts.load(`500 64px ${FONT}`),
      document.fonts.load(`600 64px ${FONT}`),
      document.fonts.load(`italic 400 64px ${FONT}`),
    ]);
  } catch {
    // The fallback serif will do.
  }
  const scene = meadow ?? (await fallbackMeadow());
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  paper(g);
  frame(g);
  circle(g, scene);

  const left = 96;
  g.textAlign = 'left';
  g.textBaseline = 'alphabetic';

  // The name, in spaced small capitals.
  g.fillStyle = INK;
  g.font = `500 54px ${FONT}`;
  g.letterSpacing = '14px';
  inked(g, 'CIRQUIMIA', left, 150);
  g.letterSpacing = '0px';
  g.fillStyle = RED;
  g.fillRect(left, 176, 120, 3);

  // What happened, then the score in red ink.
  g.fillStyle = RED;
  g.font = `500 36px ${FONT}`;
  g.letterSpacing = '6px';
  inked(g, `${t.match.victory.replace(/[¡!]/g, '')} · ${DIFFICULTY_LABEL[d.difficulty]}`.toUpperCase(), left, 690);
  g.letterSpacing = '0px';

  const score = d.score.toLocaleString(LANG);
  fit(g, score, '500', 250, 640, 120);
  g.fillStyle = INK;
  g.fillText(score, left - 8, 880);
  const scoreW = g.measureText(score).width;
  g.fillStyle = SOFT;
  g.font = `italic 400 54px ${FONT}`;
  g.fillText(t.rank.points(d.score), left + scoreW + 10, 880);

  const stats = `${formatTime(d.durationMs)}  ·  ${t.rank.damage(d.damage)}  ·  ${t.rank.rivals(d.rivals)}`;
  fit(g, stats, 'italic 400', 40, W - left * 2);
  g.fillStyle = SOFT;
  g.fillText(stats, left, 944);

  // The foot: a double rule, the player and their place, and the dare.
  g.fillStyle = INK;
  g.fillRect(left, 978, W - left * 2, 2);
  g.fillRect(left, 985, W - left * 2, 1);
  const who = d.initials ? `${d.initials}${d.rank ? `  ·  ${t.rank.placeToday(d.rank.today)}` : ''}` : '';
  g.font = `600 36px ${FONT}`;
  g.letterSpacing = '4px';
  g.fillText(who, left, 1030);
  const whoW = who ? g.measureText(who).width + 40 : 0;
  g.letterSpacing = '0px';
  g.textAlign = 'right';
  g.fillStyle = RED;
  const dare = `${t.rank.beatMe}  ${SITE_URL.replace(/^https:\/\//, '')}`;
  fit(g, dare, 'italic 500', 38, W - left * 2 - whoW);
  g.fillText(dare, W - left, 1030);

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

/**
 * The card on the clipboard, for pasting into the X composer on a computer (its compose page takes text only).
 * Started straight from the tap, before the composer's tab takes the focus; false when the browser refuses.
 */
export function copyImage(card: Promise<Blob>): Promise<boolean> {
  try {
    return navigator.clipboard.write([new ClipboardItem({ 'image/png': card })]).then(
      () => true,
      () => false,
    );
  } catch {
    return Promise.resolve(false);
  }
}

/** The preview's tap: the share sheet with the image on phones, a download elsewhere. */
export async function shareImage(card: Promise<Blob>, d: ShareData) {
  const blob = await card;
  const file = new File([blob], `cirquimia-${d.score}.png`, { type: 'image/png' });
  if (matchMedia('(pointer: coarse)').matches && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: shareText(d) });
      return;
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return;
    }
  }
  download(blob, file.name);
}
