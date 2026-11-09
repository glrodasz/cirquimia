/**
 * Mockups only: three directions for the game's UI (manual, ranking, victory card, HUD), drawn over a
 * still of the meadow. Nothing here ships with the game. Open /estilos/ui/?p=a|b|c&s=hud|manual|ranking|victoria.
 */
import { brushPath, type Pt } from '../../src/ammo';
import fondo from './fondo.png';

type Kind = 'circle' | 'square' | 'triangle' | 'triangleDown' | 'rhombus' | 'pentagram' | 'hourglass';

let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
const STEP = 0.5;

const OUTLINES: Record<Exclude<Kind, 'circle'>, Pt[]> = {
  triangle: [[24, 10], [37, 34], [11, 34]],
  triangleDown: [[24, 38], [37, 14], [11, 14]],
  square: [[13, 13], [35, 13], [35, 35], [13, 35]],
  rhombus: [[24, 8], [37, 24], [24, 40], [11, 24]],
  pentagram: [[24, 9], [32.8, 36.1], [9.7, 19.4], [38.3, 19.4], [15.2, 36.1]],
  hourglass: [[12, 10], [36, 10], [12, 38], [36, 38]],
};

const tremor = (l: number, k: number) => 0.3 * Math.sin(l * 0.21 + k) + 0.15 * Math.sin(l * 0.53 + k * 3);

function seg(a: Pt, b: Pt): Pt[] {
  const n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / STEP));
  return Array.from({ length: n + 1 }, (_, i): Pt => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
}

function arcPts(cx: number, cy: number, r: number, from: number, to: number): Pt[] {
  const n = Math.max(4, Math.ceil((r * Math.abs(to - from)) / STEP));
  return Array.from({ length: n + 1 }, (_, i): Pt => {
    const a = from + ((to - from) * i) / n;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
}

/** One closed shape, sampled like a hand drawing it: slight tremor, a small overlap where it closes. */
function shapeLine(kind: Kind): { line: Pt[]; corners: number[] } {
  const k = rand() * 6;
  if (kind === 'circle') {
    const a0 = -2.1 + rand() * 0.4;
    const sweep = Math.PI * 2 * 1.07;
    const line = arcPts(24, 24, 13.5, a0, a0 + sweep).map(([x, y], i, all): Pt => {
      const d = tremor(i * STEP, k) - 0.7 * (i / all.length);
      const a = Math.atan2(y - 24, x - 24);
      return [x + Math.cos(a) * d, y + Math.sin(a) * d];
    });
    return { line, corners: [] };
  }
  const poly = OUTLINES[kind];
  const pts = [...poly, poly[0]];
  const line: Pt[] = [];
  const corners: number[] = [];
  let l = 0;
  for (let s = 0; s < poly.length; s++) {
    const part = seg(pts[s], pts[s + 1]);
    const len = Math.hypot(pts[s + 1][0] - pts[s][0], pts[s + 1][1] - pts[s][1]);
    const nx = (pts[s][1] - pts[s + 1][1]) / len;
    const ny = (pts[s + 1][0] - pts[s][0]) / len;
    corners.push(l);
    part.slice(s ? 1 : 0).forEach(([x, y], i, all) => {
      const t = i / all.length;
      const bow = Math.sin(t * Math.PI) * tremor(l + t * len, k);
      line.push([x + nx * bow, y + ny * bow]);
    });
    l += len;
  }
  if (kind !== 'hourglass') line.push(...seg(pts[0], pts[1]).slice(1, 8));
  return { line, corners };
}

/** A thin nib: the game's brush, at a fraction of its width, so it reads as a pen-brush in a small notebook. */
function ink(line: Pt[], w: number, cls = '', corners: number[] = []) {
  const b = brushPath(line, w, rand, corners);
  return `<path class="${cls}" d="${b.ink}"/>`;
}

function glyph(kind: Kind, w = 1.5, cls = '') {
  const { line, corners } = shapeLine(kind);
  return `<svg class="glyph ${kind} ${cls}" viewBox="0 0 48 48" aria-hidden="true">${ink(line, w, 'g', corners)}</svg>`;
}

/** Teardrop pointing up; with a lick inside it is a flame, plain it is a drop. */
function drop(flame: boolean, w = 1.3) {
  const pts: Pt[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * Math.PI * 2;
    pts.push([24 + 9 * Math.sin(t) * Math.pow(Math.sin(t / 2), 1.6), 26 - 13 * Math.cos(t) + (flame ? 2 * Math.sin(t * 3) * Math.sin(t / 2) : 0)]);
  }
  const lick = flame ? ink(arcPts(25, 33, 4, -2.4, 0.3), w * 0.8) : ink(arcPts(24, 28, 5, 2.2, 3.1), w * 0.7);
  return `<svg class="mini ${flame ? 'fire' : 'water'}" viewBox="0 0 48 48" aria-hidden="true">${ink(pts, w)}${lick}</svg>`;
}

const icons = {
  person: (w = 1.4) => `<svg class="mini" viewBox="0 0 48 48">${ink(arcPts(24, 16, 6, -2, 4.4), w)}${ink(arcPts(24, 40, 12, Math.PI * 1.05, Math.PI * 1.95), w)}</svg>`,
  bars: (n: number, w = 1.6) =>
    `<svg class="mini" viewBox="0 0 48 48">${[0, 1, 2, 3].map((i) => ink(seg([12 + i * 8, 38], [12 + i * 8, 31 - i * 6]), w * 1.6, i < n ? '' : 'faint')).join('')}</svg>`,
  trophy: (w = 1.4) =>
    `<svg class="mini" viewBox="0 0 48 48">${ink([...seg([15, 10], [33, 10]), ...arcPts(24, 10, 9, 0, Math.PI)], w)}${ink(arcPts(14, 16, 4, 1.2, 4.6), w)}${ink(arcPts(34, 16, 4, -1.5, 1.9), w)}${ink(seg([24, 19.5], [24, 31]), w)}${ink(seg([16, 34], [32, 34]), w)}</svg>`,
  book: (w = 1.4) =>
    `<svg class="mini" viewBox="0 0 48 48">${ink([...seg([24, 14], [10, 11]), ...seg([10, 11], [10, 35]), ...seg([10, 35], [24, 38]), ...seg([24, 38], [24, 14])], w)}${ink([...seg([24, 14], [38, 11]), ...seg([38, 11], [38, 35]), ...seg([38, 35], [24, 38])], w)}</svg>`,
  question: (w = 1.5) => `<svg class="mini" viewBox="0 0 48 48">${ink([...arcPts(24, 17, 7.5, Math.PI * 1.1, Math.PI * 2.35), ...seg([26.5, 24], [24, 28.5])], w)}${ink(arcPts(24, 35, 1, 0, 6.4), w * 1.6)}</svg>`,
  clock: (w = 1.2) => `<svg class="mini" viewBox="0 0 48 48">${ink(arcPts(24, 26, 12, -1.3, 4.9), w)}${ink(seg([24, 26], [24, 18]), w)}${ink(seg([24, 26], [30, 29]), w)}${ink(seg([21, 9], [27, 9]), w)}</svg>`,
  strike: (w = 1.4) => `<svg class="mini" viewBox="0 0 48 48">${ink(seg([12, 36], [36, 12]), w)}${ink(seg([14, 14], [34, 34]), w)}</svg>`,
  rune: (w = 1.2) =>
    `<svg class="mini rune" viewBox="0 0 48 48">${ink(arcPts(24, 24, 15, 0, Math.PI * 2.05), w)}${ink(arcPts(24, 24, 10.5, 1, Math.PI * 2.1 + 1), w * 0.7)}${[0, 1, 2, 3, 4, 5].map((i) => ink(seg([24 + Math.cos(i) * 10.5, 24 + Math.sin(i) * 10.5], [24 + Math.cos(i) * 15, 24 + Math.sin(i) * 15]), w * 0.7)).join('')}</svg>`,
  share: (w = 1.4) => `<svg class="mini" viewBox="0 0 48 48">${ink(seg([14, 34], [32, 16]), w)}${ink([...seg([21, 15], [33, 15]), ...seg([33, 15], [33, 27])], w)}</svg>`,
  again: (w = 1.4) => `<svg class="mini" viewBox="0 0 48 48">${ink(arcPts(24, 25, 11, -0.6, 4.3), w)}${ink([...seg([31, 9], [33, 16]), ...seg([33, 16], [26, 17])], w)}</svg>`,
  close: (w = 1.3) => `<svg class="mini" viewBox="0 0 48 48">${ink(seg([15, 15], [33, 33]), w)}${ink(seg([33, 15], [15, 33]), w)}</svg>`,
  left: (w = 1.3) => `<svg class="mini" viewBox="0 0 48 48">${ink(seg([40, 24], [10, 24]), w)}${ink([...seg([17, 17], [9, 24]), ...seg([9, 24], [17, 31])], w)}</svg>`,
  right: (w = 1.3) => `<svg class="mini" viewBox="0 0 48 48">${ink(seg([8, 24], [38, 24]), w)}${ink([...seg([31, 17], [39, 24]), ...seg([39, 24], [31, 31])], w)}</svg>`,
  plus: (w = 1.3) => `<svg class="mini op" viewBox="0 0 48 48">${ink(seg([24, 14], [24, 34]), w)}${ink(seg([14, 24], [34, 24]), w)}</svg>`,
  eq: (w = 1.3) => `<svg class="mini op" viewBox="0 0 48 48">${ink(seg([14, 20], [34, 20]), w)}${ink(seg([14, 29], [34, 29]), w)}</svg>`,
  /** A loose hand-drawn ring for marking your own row in the ledger. */
  mark: (w = 1.3) => {
    const pts: Pt[] = [];
    for (let i = 0; i <= 120; i++) {
      const a = -2.6 + (i / 120) * Math.PI * 2.12;
      pts.push([100 + Math.cos(a) * (96 - i * 0.03), 20 + Math.sin(a) * (16 + Math.sin(i * 0.1))]);
    }
    return `<svg class="mark" viewBox="0 0 200 40" preserveAspectRatio="none">${ink(pts, w)}</svg>`;
  },
  underline: (w = 1.2, len = 120) => `<svg class="under" viewBox="0 0 ${len} 8" preserveAspectRatio="none">${ink(seg([2, 5], [len - 2, 3.5]), w)}</svg>`,
};

const SYMBOLS: Array<{ kind: Kind; name: string; val: string; type: 'dmg' | 'heal' | 'def'; src?: 'fire' | 'water'; num: string }> = [
  { kind: 'circle', name: 'Muro', val: 'bloquea', type: 'def', num: 'I' },
  { kind: 'square', name: 'Tierra', val: '20', type: 'dmg', num: 'II' },
  { kind: 'triangle', name: 'Fuego', val: '35', type: 'dmg', src: 'fire', num: 'III' },
  { kind: 'triangleDown', name: 'Agua', val: '35', type: 'dmg', src: 'water', num: 'IV' },
  { kind: 'rhombus', name: 'Cura', val: '+25', type: 'heal', num: 'V' },
  { kind: 'pentagram', name: 'Estrella', val: '5×10', type: 'dmg', num: 'VI' },
];

const ROWS = [
  { who: 'ÑAB1', pts: 8308, t: '0:09', riv: 2, lvl: 'Muy difícil' },
  { who: 'MEME', pts: 7940, t: '0:11', riv: 2, lvl: 'Muy difícil' },
  { who: 'LUZ', pts: 6120, t: '0:14', riv: 3, lvl: 'Difícil' },
  { who: 'DMG', pts: 5231, t: '0:09', riv: 3, lvl: 'Normal' },
  { who: 'GLR', pts: 4310, t: '0:18', riv: 2, lvl: 'Difícil', mine: true },
  { who: 'OSO', pts: 2980, t: '0:21', riv: 1, lvl: 'Normal' },
  { who: 'KIKI', pts: 1404, t: '0:33', riv: 1, lvl: 'Fácil' },
];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

/* ---------- shared pieces ---------- */

function hud() {
  return (
    `<div class="hud"><div class="hud-l">` +
    `<button class="chip"><span class="rival">${icons.person()}</span><span>1 rival</span></button>` +
    `<button class="chip">${icons.bars(1)}<span>Fácil</span></button></div>` +
    `<div class="hud-r"><button class="tile">${icons.trophy()}</button><button class="tile">${icons.book()}</button><button class="tile">${icons.question()}</button></div></div>`
  );
}

/* ---------- A · Cuaderno de campo ---------- */

const A = {
  manual: () =>
    `<div class="card nb"><div class="ribbon"></div>` +
    `<header><h2>Símbolos</h2>${icons.underline(1.1, 140)}<button class="x">${icons.close()}</button></header>` +
    `<ul class="sym">${SYMBOLS.map(
      (s) =>
        `<li class="${s.type}">${glyph(s.kind, 1.6)}` +
        `<div class="lbl"><i>${s.name}</i><b>${s.val}</b>${s.src ? `<span class="src">${drop(s.src === 'fire')}</span>` : ''}</div></li>`,
    ).join('')}</ul>` +
    `<div class="combo"><span class="c">${glyph('triangle', 1.15)}${icons.plus()}${glyph('triangleDown', 1.15)}${icons.eq()}${glyph('hourglass', 1.15)}</span><b class="dmg">45</b></div>` +
    `<div class="combo rune-row"><span class="c">${icons.rune()}</span><span class="note">+25% área · cura 33 · sin muros</span></div>` +
    `<footer><button>${icons.left()}</button><span class="folio">1</span><button>${icons.right()}</button></footer></div>`,
  ranking: () =>
    `<div class="card nb"><div class="ribbon"></div>` +
    `<header><h2>Ranking</h2>${icons.underline(1.1, 140)}<button class="x">${icons.close()}</button></header>` +
    `<nav class="tabs"><a class="on">Hoy</a><a>Siempre</a></nav>` +
    `<ol class="ledger">${ROWS.map(
      (r, i) =>
        `<li class="${r.mine ? 'mine' : ''}"><span class="n">${i + 1}</span><span class="who">${r.who}</span><span class="dots"></span><span class="pts">${r.pts}</span>` +
        `<small>${r.t} · ${r.riv} ${r.riv === 1 ? 'rival' : 'rivales'} · ${r.lvl}</small>${r.mine ? icons.mark() + '<em class="tu">tú</em>' : ''}</li>`,
    ).join('')}</ol>` +
    `<p class="foot">daño × dificultad × rapidez</p></div>`,
  victoria: () =>
    `<div class="card nb win"><div class="ribbon"></div>` +
    `<h2>Victoria</h2>${icons.underline(1.1, 140)}` +
    `<div class="score">8308</div>` +
    `<ul class="stats"><li>${icons.clock()}<b>0:09</b></li><li>${icons.strike()}<b>180</b></li><li>${icons.person()}<b>2</b></li><li>${icons.bars(4)}<b>Muy difícil</b></li></ul>` +
    `<p class="rank">nº <b>5</b> hoy · nº <b>12</b> global</p>` +
    `<div class="btns"><button>${icons.share()}Compartir</button><button>${icons.trophy()}Ranking</button></div>` +
    `<button class="primary">${icons.again()}Jugar de nuevo</button></div>`,
};

/* ---------- B · Grimorio rubricado ---------- */

const B = {
  manual: () =>
    `<div class="card gr"><i class="fl tl"></i><i class="fl tr"></i><i class="fl bl"></i><i class="fl br"></i>` +
    `<header><h2>Símbolos</h2><button class="x">${icons.close()}</button></header>` +
    `<ul class="index">${SYMBOLS.map(
      (s) =>
        `<li class="${s.type}"><span class="rn">${s.num}</span>${glyph(s.kind, 1.6)}<span class="nm">${s.name}</span>` +
        `${s.src ? `<span class="src">${drop(s.src === 'fire')}</span>` : ''}<span class="lead"></span><b>${s.val}</b></li>`,
    ).join('')}</ul>` +
    `<h3><span>Coniunctio</span></h3>` +
    `<div class="combo">${glyph('triangle', 1.2)}${icons.plus()}${glyph('triangleDown', 1.2)}${icons.eq()}${glyph('hourglass', 1.2)}<b class="dmg">45</b></div>` +
    `<div class="rune-row">${icons.rune()}<span>Sobre runa: <b>+25%</b> área</span></div>` +
    `<footer><button>${icons.left()}</button><span class="folio">— i —</span><button>${icons.right()}</button></footer></div>`,
  ranking: () =>
    `<div class="card gr"><i class="fl tl"></i><i class="fl tr"></i><i class="fl bl"></i><i class="fl br"></i>` +
    `<header><h2>Ranking</h2><button class="x">${icons.close()}</button></header>` +
    `<nav class="tabs"><a class="on">Hoy</a><span>·</span><a>Siempre</a></nav>` +
    `<table class="tbl"><tbody>${ROWS.map(
      (r, i) =>
        `<tr class="${r.mine ? 'mine' : ''}"><td class="rn">${ROMAN[i]}</td><td class="who">${r.who}${r.mine ? ' <em>tú</em>' : ''}<small>${r.t} · ${r.riv}${icons.person(1.6)} · ${r.lvl}</small></td><td class="pts">${r.pts}</td></tr>`,
    ).join('')}</tbody></table>` +
    `<p class="foot">daño × dificultad × rapidez</p></div>`,
  victoria: () =>
    `<div class="card gr win"><i class="fl tl"></i><i class="fl tr"></i><i class="fl bl"></i><i class="fl br"></i>` +
    `<h2 class="big"><span>Victoria</span></h2>` +
    `<div class="score">8308</div>` +
    `<p class="meta">${icons.clock()}0:09 &nbsp; ${icons.strike()}180 &nbsp; ${icons.person()}2 &nbsp; Muy difícil</p>` +
    `<p class="rank"><b>V</b> de hoy · <b>XII</b> global</p>` +
    `<div class="btns"><button>${icons.share()}Compartir</button><button>${icons.trophy()}Ranking</button></div>` +
    `<button class="primary">Jugar de nuevo</button></div>`,
};

/* ---------- C · Lámina nocturna ---------- */

const plate = (inner: string) => `<span class="plate"><svg class="guide" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="M24 2v44M2 24h44"/></svg>${inner}</span>`;

const C = {
  manual: () =>
    `<div class="card ln"><i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>` +
    `<header><span class="kicker">Lámina I</span><h2>Símbolos</h2><button class="x">${icons.close()}</button></header>` +
    `<ul class="grid">${SYMBOLS.map(
      (s) =>
        `<li class="${s.type}">${plate(glyph(s.kind, 1.5))}${s.src ? `<span class="src">${drop(s.src === 'fire')}</span>` : ''}` +
        `<span class="nm">${s.name}</span><b>${s.val}</b></li>`,
    ).join('')}</ul>` +
    `<div class="combo">${plate(glyph('triangle', 1.1))}${icons.plus()}${plate(glyph('triangleDown', 1.1))}${icons.eq()}${plate(glyph('hourglass', 1.1))}<b class="dmg">45</b></div>` +
    `<div class="rune-row">${icons.rune()}<span><b>+25%</b> área · cura 33</span></div>` +
    `<footer><button>${icons.left()}</button><span class="folio">I / III</span><button>${icons.right()}</button></footer></div>`,
  ranking: () =>
    `<div class="card ln"><i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>` +
    `<header><span class="kicker">Global</span><h2>Ranking</h2><button class="x">${icons.close()}</button></header>` +
    `<nav class="tabs"><a class="on">Hoy</a><a>Siempre</a></nav>` +
    `<ol class="list">${ROWS.map(
      (r, i) =>
        `<li class="${r.mine ? 'mine' : ''} ${i < 3 ? 'top' : ''}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="who">${r.who}</span>` +
        `<span class="pts">${r.pts}</span><small>${r.t} · ${r.riv} ${r.riv === 1 ? 'rival' : 'rivales'} · ${r.lvl}</small></li>`,
    ).join('')}</ol>` +
    `<p class="foot">daño × dificultad × rapidez</p></div>`,
  victoria: () =>
    `<div class="card ln win"><i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>` +
    `<span class="kicker">Muy difícil</span><h2>Victoria</h2>` +
    `<div class="score">8308</div>` +
    `<ul class="stats"><li><b>0:09</b><span>tiempo</span></li><li><b>180</b><span>daño</span></li><li><b>2</b><span>rivales</span></li></ul>` +
    `<p class="rank">nº 5 hoy · nº 12 global</p>` +
    `<div class="btns"><button>${icons.share()}Compartir</button><button>${icons.trophy()}Ranking</button></div>` +
    `<button class="primary">${icons.again()}Jugar de nuevo</button></div>`,
};

const STYLES = { a: A, b: B, c: C };

const q = new URLSearchParams(location.search);
const p = (q.get('p') ?? 'a') as keyof typeof STYLES;
const s = (q.get('s') ?? 'manual') as 'hud' | 'manual' | 'ranking' | 'victoria';
document.body.className = `p-${p} s-${s}`;
const app = document.getElementById('app')!;
app.innerHTML =
  `<img class="bg" src="${fondo}" alt="">${hud()}` + (s === 'hud' ? `<div class="held">${glyph('triangle', 1.4)}</div>` : `<div class="scrim"></div>${STYLES[p][s]()}`);
