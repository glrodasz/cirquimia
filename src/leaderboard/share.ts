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
/** The link preview's card: the size X, Bluesky, Threads, Mastodon and chats show whole. */
export const WIDE = { w: 1200, h: 630 };
const FONT = "'EB Garamond Variable', Garamond, Georgia, serif";
const PAPER = '#f5efe0';
const INK = '#1f1a15';
const SOFT = '#6b6258';
const RED = '#a3271c';
/**
 * Where everything sits, square (the image itself) or wide (the link preview). The circle sits past the top
 * right corner, so the meadow reads as a glimpse; `y` values are text baselines.
 */
interface Layout {
  w: number;
  h: number;
  disc: { x: number; y: number; r: number };
  left: number;
  frame: number;
  name: { y: number; size: number };
  label: { y: number; size: number };
  score: { y: number; size: number; width: number; unit: number };
  stats: { y: number; size: number };
  rule: number;
  foot: { y: number; size: number };
}

const SQUARE: Layout = {
  w: CARD_SIZE,
  h: CARD_SIZE,
  disc: { x: 830, y: 270, r: 370 },
  left: 96,
  frame: 36,
  name: { y: 150, size: 54 },
  label: { y: 690, size: 36 },
  score: { y: 880, size: 250, width: 640, unit: 54 },
  stats: { y: 944, size: 40 },
  rule: 978,
  foot: { y: 1030, size: 36 },
};

const WIDE_LAYOUT: Layout = {
  w: WIDE.w,
  h: WIDE.h,
  disc: { x: 960, y: 205, r: 265 },
  left: 76,
  frame: 26,
  name: { y: 118, size: 46 },
  label: { y: 300, size: 30 },
  score: { y: 450, size: 190, width: 470, unit: 44 },
  stats: { y: 504, size: 32 },
  rule: 530,
  foot: { y: 576, size: 30 },
};
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
function paper(g: CanvasRenderingContext2D, W: number, H: number) {
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
function circle(g: CanvasRenderingContext2D, meadow: CanvasImageSource | null, disc: Layout['disc']) {
  const { x, y, r } = disc;
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
function inked(g: CanvasRenderingContext2D, text: string, x: number, y: number, halo = 14) {
  if (halo <= 0) return g.fillText(text, x, y);
  g.save();
  g.strokeStyle = '#eee5d2'; // the paper where the edges start to darken
  g.lineWidth = halo;
  g.lineJoin = 'round';
  g.strokeText(text, x, y);
  g.restore();
  g.fillText(text, x, y);
}

/** Two thin rules, the grimoire's frame around the page. */
function frame(g: CanvasRenderingContext2D, W: number, H: number, m: number) {
  g.strokeStyle = INK;
  g.lineWidth = 2;
  g.strokeRect(m, m, W - m * 2, H - m * 2);
  g.lineWidth = 1;
  g.globalAlpha = 0.5;
  g.strokeRect(m + 10, m + 10, W - m * 2 - 20, H - m * 2 - 20);
  g.globalAlpha = 1;
}

/**
 * The card as a PNG (square, to share as an image, with the meadow of the match) or, `wide`, as the JPEG the share
 * link shows as its preview, which the game always draws with the bundled meadow (`meadow` null).
 */
export async function renderShareCard(d: ShareData, meadow?: CanvasImageSource | null, wide = false): Promise<Blob> {
  try {
    await Promise.all([
      document.fonts.load(`500 64px ${FONT}`),
      document.fonts.load(`600 64px ${FONT}`),
      document.fonts.load(`italic 400 64px ${FONT}`),
    ]);
  } catch {
    // The fallback serif will do.
  }
  const L = wide ? WIDE_LAYOUT : SQUARE;
  const { w: W, h: H, left } = L;
  const scene = meadow ?? (await fallbackMeadow());
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  paper(g, W, H);
  frame(g, W, H, L.frame);
  circle(g, scene, L.disc);

  g.textAlign = 'left';
  g.textBaseline = 'alphabetic';

  // The name, in spaced small capitals.
  g.fillStyle = INK;
  g.font = `500 ${L.name.size}px ${FONT}`;
  g.letterSpacing = `${Math.round(L.name.size / 4)}px`;
  inked(g, 'CIRQUIMIA', left, L.name.y);
  g.letterSpacing = '0px';
  g.fillStyle = RED;
  g.fillRect(left, L.name.y + L.name.size / 2, L.name.size * 2.2, 3);

  // What happened, then the score in red ink.
  g.fillStyle = RED;
  g.font = `500 ${L.label.size}px ${FONT}`;
  g.letterSpacing = `${Math.round(L.label.size / 6)}px`;
  inked(g, `${t.match.victory.replace(/[¡!]/g, '')} · ${DIFFICULTY_LABEL[d.difficulty]}`.toUpperCase(), left, L.label.y);
  g.letterSpacing = '0px';

  const score = d.score.toLocaleString(LANG);
  fit(g, score, '500', L.score.size, L.score.width, 120);
  g.fillStyle = INK;
  inked(g, score, left - 8, L.score.y, wide ? 10 : 0);
  const scoreW = g.measureText(score).width;
  g.fillStyle = SOFT;
  g.font = `italic 400 ${L.score.unit}px ${FONT}`;
  inked(g, t.rank.points(d.score), left + scoreW + 10, L.score.y, wide ? 10 : 0);

  const stats = `${formatTime(d.durationMs)}  ·  ${t.rank.damage(d.damage)}  ·  ${t.rank.rivals(d.rivals)}`;
  fit(g, stats, 'italic 400', L.stats.size, wide ? L.disc.x - L.disc.r - left - 20 : W - left * 2);
  g.fillStyle = SOFT;
  inked(g, stats, left, L.stats.y, wide ? 10 : 0);

  // The foot: a double rule, the player and their place, and the dare.
  g.fillStyle = INK;
  g.fillRect(left, L.rule, W - left * 2, 2);
  g.fillRect(left, L.rule + 7, W - left * 2, 1);
  const who = d.initials ? `${d.initials}${d.rank ? `  ·  ${t.rank.placeToday(d.rank.today)}` : ''}` : '';
  g.font = `600 ${L.foot.size}px ${FONT}`;
  g.letterSpacing = '4px';
  inked(g, who, left, L.foot.y, wide ? 10 : 0);
  const whoW = who ? g.measureText(who).width + 40 : 0;
  g.letterSpacing = '0px';
  g.textAlign = 'right';
  g.fillStyle = RED;
  const dare = `${t.rank.beatMe}  ${SITE_URL.replace(/^https:\/\//, '')}`;
  fit(g, dare, 'italic 500', L.foot.size + 2, W - left * 2 - whoW);
  inked(g, dare, W - left, L.foot.y, wide ? 10 : 0);

  const type = wide ? 'image/jpeg' : 'image/png';
  return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob'))), type, 0.8));
}

/** The post's text; `link` is the card's own page (its preview shows the card), else the game. */
export function shareText(d: ShareData, link?: string | null) {
  return t.rank.shareText(d.score.toLocaleString(LANG), formatTime(d.durationMs), d.rivals, DIFFICULTY_LABEL[d.difficulty], link || shareUrl());
}

/**
 * The saved score's share link, ready once its card is uploaded. `peek` gives it without waiting (null while it
 * is still on its way or when there is none), for the share sheet, which must open inside the tap.
 */
export interface ShareLink {
  get(): Promise<string | null>;
  peek(): string | null;
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
 * Opens a network's composer with the text and the card's link, whose preview is the card (compose pages take
 * text only). Called straight from the tap so the new tab is not blocked: when the link is not ready yet, the tab
 * opens empty and is sent to the composer once the card is up, or with the bare game link if that fails.
 */
export function openComposer(target: 'x' | 'bluesky' | 'threads' | 'mastodon', d: ShareData, link: ShareLink, host?: string) {
  if (target === 'mastodon' && host) {
    try {
      localStorage.setItem(MASTODON_STORE, host);
    } catch {
      // Asked again next time.
    }
  }
  const ready = link.peek();
  if (ready) {
    window.open(composeUrl(target, shareText(d, ready), host), '_blank', 'noopener');
    return;
  }
  const tab = window.open('', '_blank');
  if (tab) {
    tab.opener = null;
    try {
      tab.document.title = 'Cirquimia';
      tab.document.body.style.cssText = 'margin:0;display:grid;place-items:center;height:100vh;background:#f5efe0;color:#6b6258;font:italic 22px Georgia,serif';
      tab.document.body.textContent = '…';
    } catch {
      // Just an empty tab for a moment.
    }
  }
  void link.get().then((url) => {
    const to = composeUrl(target, shareText(d, url), host);
    if (tab && !tab.closed) tab.location.href = to;
    else if (!tab) window.open(to, '_blank', 'noopener');
  });
}

/**
 * Discord: phones open the share sheet with the image (Discord is in it); elsewhere the image is copied
 * to paste into a channel, or saved if the browser cannot copy images.
 */
export async function shareDiscord(card: Promise<Blob>, d: ShareData, link: ShareLink): Promise<'shared' | 'copied' | 'saved' | 'cancelled'> {
  const blob = await card;
  const file = new File([blob], `cirquimia-${d.score}.png`, { type: 'image/png' });
  const touch = matchMedia('(pointer: coarse)').matches;
  if (touch && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: shareText(d, link.peek()) });
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

/** The preview's tap: the share sheet with the image on phones, a download elsewhere. */
export async function shareImage(card: Promise<Blob>, d: ShareData, link: ShareLink) {
  const blob = await card;
  const file = new File([blob], `cirquimia-${d.score}.png`, { type: 'image/png' });
  if (matchMedia('(pointer: coarse)').matches && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: shareText(d, link.peek()) });
      return;
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return;
    }
  }
  download(blob, file.name);
}
