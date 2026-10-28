import { brushPath, shapeIcon, type Pt } from './ammo';
import { arc, random, segment, svg } from './match';
import type { ShapeKind } from './gestures';
import { t } from './i18n';
import moveShot from './assets/help/move.webp';
import drawShot from './assets/help/draw.webp';
import useShot from './assets/help/use.webp';
import chargeShot from './assets/help/charge.webp';
import runesShot from './assets/help/runes.webp';

const STORE = 'cirquimia.help';

function seen() {
  try {
    return localStorage.getItem(STORE) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORE, '1');
  } catch {
    // Blocked storage: the guide simply shows again next time.
  }
}

/** One brush stroke along the points, inked with a class from the HUD palette. */
function stroke(line: Pt[], width: number, cls: string, rand: () => number) {
  const b = brushPath(line, width, rand);
  return { ink: `<path class="${cls}" d="${b.ink}"/>`, dry: b.dry };
}

function poly(points: Pt[]): Pt[] {
  return points.slice(1).flatMap((p, i) => segment(points[i], p).slice(i ? 1 : 0));
}

/** A pointing hand like the 👆 emoji, fingertip at the origin: index up, three folded knuckles, thumb out to the left. */
const HAND =
  'M-2.6 2.6A2.6 2.6 0 0 1 2.6 2.6V9.6C2.6 7.6 6.4 7.6 6.4 9.8C6.4 8.2 9.8 8.2 9.8 10.4C9.8 9.2 12.9 9.4 12.9 11.6V17' +
  'C12.9 21.2 10.4 24 6.4 24H3.2C0.8 24-0.8 23-2.2 21.4L-6.9 15.8C-7.9 14.5-6.4 12.8-4.9 13.8L-2.6 15.4Z';
const KNUCKLES = 'M6.4 9.8V12.6M9.8 10.4V13';

/** The hand with a clean outline, plus the ripple a tap leaves around its fingertip. */
function hand(x: number, y: number, s: number, tap = true) {
  const r = 6.5 * s;
  const ripple = (a: number, b: number) =>
    `M${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}A${r} ${r} 0 0 1 ${(x + Math.cos(b) * r).toFixed(1)} ${(y + Math.sin(b) * r).toFixed(1)}`;
  return (
    (tap ? `<path class="tap" d="${ripple(-2.75, -1.95)}${ripple(-1.2, -0.4)}"/>` : '') +
    `<g class="hand" transform="translate(${x} ${y}) rotate(-12) scale(${s})"><path d="${HAND}"/><path class="knuckles" d="${KNUCKLES}"/></g>`
  );
}

/** A brush arrow with an open head, optionally broken into dashes like footsteps. */
function arrowLine(points: Pt[], dashes: number, rand: () => number) {
  const line = poly(points);
  const parts: Pt[][] = [];
  if (dashes) {
    const per = line.length / (dashes * 2 - 1);
    for (let i = 0; i < dashes; i++) parts.push(line.slice(Math.round(i * 2 * per), Math.round((i * 2 + 1) * per) + 1));
  } else parts.push(line);
  const [a, b] = points.slice(-2);
  const dir = Math.atan2(b[1] - a[1], b[0] - a[0]);
  for (const side of [-1, 1]) parts.push(segment(b, [b[0] - Math.cos(dir + side * 0.55) * 9, b[1] - Math.sin(dir + side * 0.55) * 9]));
  return parts.map((l) => brushPath(l, 3.4, rand).ink).join('');
}

/** Hands, arrows and strokes drawn over each screenshot, in the screenshot's own 312×234 frame. */
const OVERLAYS: Array<(rand: () => number) => string> = [
  (rand) => `<path class="arrow" d="${arrowLine([[200, 118], [246, 103]], 3, rand)}"/>` + hand(261, 99, 1.4),
  (rand) => `<path class="arrow" d="${arrowLine([[206, 112], [204, 84], [186, 64]], 0, rand)}"/>` + hand(121, 200, 1.4, false),
  () => hand(132, 112, 1.4),
  // The triangles drawn right over the campfire and the lagoon, the hand finishing each stroke.
  (rand) =>
    stroke(poly([[47, 158], [70, 199], [24, 199], [47, 158], [52, 166]]), 3.6, 'ink fire', rand).ink +
    hand(52, 166, 1.2, false) +
    stroke(poly([[232, 66], [282, 66], [257, 110], [232, 66], [240, 66]]), 3.6, 'ink water', rand).ink +
    hand(240, 66, 1.2, false),
  () => `<g class="badge"><rect x="140" y="160" width="64" height="26" rx="13"/><text x="172" y="178">+25%</text></g>`,
];
const SHOTS = [moveShot, drawShot, useShot, chargeShot, runesShot];

/** A teardrop: the tip, down one side, round the belly and back up. */
function drop(tipY: number, cls: string, rand: () => number) {
  const belly = arc(24, 29, 8, Math.PI + 0.45, -0.45);
  return stroke(poly([[24, tipY], belly[0]]).concat(belly, poly([belly[belly.length - 1], [24, tipY]])), 3.4, cls, rand);
}

export function flameIcon(rand: () => number) {
  return svg([drop(10, 'fire', rand), stroke(poly([[24, 23], [21.5, 30], [24, 33.5], [26.5, 30], [24, 23]]), 2.4, 'fire', rand)], rand);
}

export function waterIcon(rand: () => number) {
  return svg([drop(12, 'water', rand), stroke(arc(24, 29, 4.5, Math.PI * 0.6, Math.PI * 0.95), 2, 'water', rand)], rand);
}

function questionIcon(rand: () => number) {
  const hook = arc(24, 19, 6.5, Math.PI * 1.05, Math.PI * 2.3);
  return svg([
    stroke(hook.concat(segment(hook[hook.length - 1], [24, 29])), 3.6, 'glyph', rand),
    stroke(arc(24, 35.5, 0.8, 0, Math.PI * 2.2), 3.4, 'glyph', rand),
  ], rand);
}

/** An open book: two pages sagging from the spine. */
function bookIcon(rand: () => number) {
  const page = (side: number) => poly([[24, 33], [24 - side * 4, 31], [24 - side * 11, 31.5], [24 - side * 11, 16], [24 - side * 4, 15.5], [24, 17.5]]);
  return svg([
    stroke(page(1), 2.8, 'glyph', rand),
    stroke(page(-1), 2.8, 'glyph', rand),
    stroke(segment([24, 18], [24, 32.5]), 2.2, 'glyph', rand),
  ], rand);
}

const SHAPES: Array<{ kind: ShapeKind; effect?: 'dmg' | 'heal'; value: string; source?: 'fire' | 'water' }> = [
  { kind: 'circle', value: t.help.defence },
  { kind: 'square', effect: 'dmg', value: '20' },
  { kind: 'triangle', effect: 'dmg', value: '35', source: 'fire' },
  { kind: 'triangleDown', effect: 'dmg', value: '35', source: 'water' },
  { kind: 'rhombus', effect: 'heal', value: '25' },
  { kind: 'pentagram', effect: 'dmg', value: '5×10' },
];
const EFFECT = { dmg: t.help.damage, heal: t.help.healing };

const fig = (cls: string, inner: string) => `<span class="fig ${cls}">${inner}</span>`;
const closeButton = `<button type="button" class="x" aria-label="${t.help.close}">×</button>`;

/** How to play: one screenshot per step, swiped sideways. */
function guide() {
  const rand = random();
  const total = t.help.slides.length;
  const slides = t.help.slides
    .map(
      ([title, text], i) =>
        `<section class="slide" aria-label="${t.help.slideOf(i + 1, total)}">` +
        `<div class="shot"><img src="${SHOTS[i]}" alt="" draggable="false">` +
        `<svg viewBox="0 0 312 234" aria-hidden="true">${OVERLAYS[i](rand)}</svg></div>` +
        `<h3><span class="num">${i + 1}</span>${title}</h3><p>${text}</p></section>`,
    )
    .join('');
  const dots = t.help.slides.map((_, i) => `<button type="button" class="dot" aria-label="${t.help.slideOf(i + 1, total)}" data-i="${i}"></button>`).join('');
  return (
    `<div class="card guide">${closeButton}<h2 id="help-title">${t.help.title}</h2>` +
    `<div class="track">${slides}</div>` +
    `<div class="dots">${dots}</div>` +
    `<div class="nav"><button type="button" class="match-btn back"><span class="cap">${t.help.back}</span></button>` +
    `<button type="button" class="match-btn go"><span class="cap">${t.help.next}</span></button></div></div>`
  );
}

/** The symbols manual: every shape, what it does, and where fire and water get charged. */
function symbols() {
  const rand = random();
  const shapes = SHAPES.map(
    (s) =>
      `<li>${fig(s.kind, shapeIcon(s.kind))}<b>${t.help.names[s.kind]}</b><span class="val${s.effect ? ` val-${s.effect}` : ''}">${s.effect ? `<small>${EFFECT[s.effect]}</small> ` : ''}${s.value}</span>` +
      (s.source ? `<span class="src">${s.source === 'fire' ? flameIcon(rand) : waterIcon(rand)}</span>` : '') +
      '</li>',
  ).join('');
  return (
    `<div class="card manual">${closeButton}<h2 id="help-title">${t.help.shapesTitle}</h2>` +
    `<div class="scroll"><ul class="shapes">${shapes}</ul>` +
    `<ul class="notes"><li><span class="src">${flameIcon(rand)}</span>${t.help.fireNote}</li>` +
    `<li><span class="src">${waterIcon(rand)}</span>${t.help.waterNote}</li>` +
    `<li><span class="src rune">✦</span>${t.help.runesNote}</li></ul></div>` +
    `<div class="nav"><button type="button" class="match-btn back how"><span class="cap">${t.help.howTo}</span></button>` +
    `<button type="button" class="match-btn go"><span class="cap">${t.help.ok}</span></button></div></div>`
  );
}

/**
 * Two cards behind two buttons next to the gear: "?" swipes through how to play (also shown on the
 * first visit) and the book lists the symbols. The game holds still while either is open.
 */
export function mountHelp() {
  const rand = random();
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'help-btn';
  button.setAttribute('aria-label', t.help.button);
  button.innerHTML = questionIcon(rand);

  const book = document.createElement('button');
  book.type = 'button';
  book.id = 'book-btn';
  book.setAttribute('aria-label', t.help.symbolsButton);
  book.innerHTML = bookIcon(rand);

  const overlay = document.createElement('div');
  overlay.id = 'help';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'help-title');
  for (const node of [button, book, overlay]) for (const type of ['pointerdown', 'pointerup', 'pointermove']) node.addEventListener(type, (e) => e.stopPropagation());
  document.body.append(book, button, overlay);

  // Mobile browsers can lay fixed elements out under their own toolbars; size the card to what is actually visible.
  const fit = () => overlay.style.setProperty('--seen', `${Math.round(visualViewport?.height ?? innerHeight)}px`);
  visualViewport?.addEventListener('resize', fit);
  addEventListener('resize', fit);
  fit();

  let open = false;
  const show = (page: 'guide' | 'symbols') => {
    overlay.innerHTML = page === 'guide' ? guide() : symbols(); // fresh brush jitter each time
    overlay.querySelector('.x')!.addEventListener('click', hide);
    if (page === 'guide') wireSlides();
    else {
      overlay.querySelector('.go')!.addEventListener('click', hide);
      overlay.querySelector('.how')!.addEventListener('click', () => show('guide'));
    }
    overlay.hidden = false;
    open = true;
    void overlay.offsetWidth; // let the fade-in start from hidden
    overlay.classList.add('show');
    overlay.querySelector<HTMLButtonElement>('.go')!.focus({ preventScroll: true });
  };

  function wireSlides() {
    const track = overlay.querySelector<HTMLElement>('.track')!;
    const dots = [...overlay.querySelectorAll<HTMLButtonElement>('.dot')];
    const back = overlay.querySelector<HTMLButtonElement>('.back')!;
    const next = overlay.querySelector<HTMLButtonElement>('.go')!;
    const last = dots.length - 1;
    let at = 0;
    const go = (i: number) => track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    const mark = () => {
      at = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      dots.forEach((d, i) => d.classList.toggle('on', i === at));
      back.classList.toggle('hide', at === 0);
      next.querySelector('.cap')!.textContent = at === last ? t.help.go : t.help.next;
    };
    track.addEventListener('scroll', mark, { passive: true });
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    back.addEventListener('click', () => go(at - 1));
    next.addEventListener('click', () => (at === last ? hide() : go(at + 1)));
    mark();
  }

  function hide() {
    if (!open) return;
    open = false;
    markSeen();
    overlay.classList.remove('show');
    setTimeout(() => {
      if (!open) overlay.hidden = true;
    }, 300);
    (document.activeElement as HTMLElement | null)?.blur();
  }

  button.addEventListener('click', () => show('guide'));
  book.addEventListener('click', () => show('symbols'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide();
  });
  addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') hide();
    const track = overlay.querySelector<HTMLElement>('.track');
    if (track && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) track.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * track.clientWidth, behavior: 'smooth' });
  });
  if (!seen()) show('guide');

  return {
    get open() {
      return open;
    },
  };
}
