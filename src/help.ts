import { brushPath, shapeIcon, type Pt } from './ammo';
import { arc, random, segment, svg } from './match';
import type { ShapeKind } from './gestures';
import { hasKeyboard } from './keys';
import { padEnabled } from './pad';
import { LANG, langLink, t } from './i18n';
import { bookIcon, questionIcon } from './hudIcons';
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
  // From the stroke to the symbol now held over the alchemist's head.
  (rand) => `<path class="arrow" d="${arrowLine([[114, 70], [150, 92], [170, 138]], 0, rand)}"/>` + hand(33, 10, 1.4, false),
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

/** The optional stick: the ring, darkened as while steering, its knob pushed up and to the right, and the alchemist walking that way. */
const padOverlay = (rand: () => number) =>
  `<g class="pad"><circle cx="58" cy="178" r="34"/><circle class="knob" cx="72" cy="164" r="13"/></g>` +
  `<path class="arrow" d="${arrowLine([[200, 118], [246, 103]], 3, rand)}"/>` +
  hand(72, 164, 1.3, false);

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

const SHAPES: Array<{ kind: ShapeKind; effect?: 'dmg' | 'heal'; value: string; source?: 'fire' | 'water' }> = [
  { kind: 'circle', value: t.help.defence },
  { kind: 'square', effect: 'dmg', value: '20' },
  { kind: 'triangle', effect: 'dmg', value: '35', source: 'fire' },
  { kind: 'triangleDown', effect: 'dmg', value: '35', source: 'water' },
  { kind: 'rhombus', effect: 'heal', value: '25' },
  { kind: 'pentagram', effect: 'dmg', value: '5×10' },
];
const EFFECT = { dmg: t.help.damage, heal: t.help.healing };

/** What training asks the player to try on the scarecrow: each attack, and any of them from a rune circle. */
export type Drill = 'square' | 'pentagram' | 'triangle' | 'triangleDown' | 'hourglass' | 'rune';
export const DRILLS: Drill[] = ['square', 'pentagram', 'triangle', 'triangleDown', 'hourglass', 'rune'];
/** The drills tried in this training session, shown ticked in the symbols book; null outside training. */
let practice: ReadonlySet<Drill> | null = null;
export function showPractice(done: ReadonlySet<Drill> | null) {
  practice = done;
}
const drillClass = (id: Drill) => (practice ? ` class="${practice.has(id) ? 'tried' : 'todo'}"` : '');

const fig = (cls: string, inner: string) => `<span class="fig ${cls}">${inner}</span>`;

/** A brush arrow pointing right, for the page-turn buttons; the back button mirrors it. */
function turnArrow(rand: () => number) {
  return `<svg class="arrow" viewBox="0 0 48 24" aria-hidden="true"><path d="${arrowLine([[6, 13], [24, 11], [41, 12]], 0, rand)}"/></svg>`;
}

/**
 * An alchemist's book: a gold title stamped on the leather, parchment pages stacked on top of each
 * other and two big page-turn buttons along the bottom edge, with the page number between them.
 */
function bookCard(cls: string, title: string, pages: string[], label: (n: number, total: number) => string) {
  const rand = random();
  return (
    `<div class="book ${cls}" tabindex="-1"><button type="button" class="x" aria-label="${t.help.close}">×</button>` +
    `<h2 id="help-title">${title}</h2>` +
    `<div class="pages">${pages.map((page, i) => `<section class="page" aria-label="${label(i + 1, pages.length)}">${page}</section>`).join('')}</div>` +
    `<div class="turn"><button type="button" class="back">${turnArrow(rand)}<span class="cap"></span></button>` +
    `<span class="folio" aria-live="polite"><span aria-hidden="true"></span><span class="sr"></span></span>` +
    `<button type="button" class="go"><span class="cap"></span>${turnArrow(rand)}</button></div></div>`
  );
}

/** How to play: one illustrated page per step. */
function guide() {
  const rand = random();
  const slides = t.help.slides.map(([title, text], i) => ({
    shot: SHOTS[i],
    overlay: OVERLAYS[i],
    title,
    text: i === 0 && hasKeyboard() ? t.keys.move : text,
  }));
  // Touch screens: right after walking, a page on the optional stick.
  if (padEnabled()) slides.splice(1, 0, { shot: moveShot, overlay: padOverlay, title: t.help.pad[0], text: t.help.pad[1] });
  const pages = slides.map(
    ({ shot, overlay, title, text }, i) =>
      `<figure class="shot"><img src="${shot}" alt="" draggable="false">` +
      `<svg viewBox="0 0 312 234" aria-hidden="true">${overlay(rand)}</svg></figure>` +
      `<h3><span class="num">${i + 1}</span>${title}</h3><p>${text}</p>`,
  );
  return bookCard('guide', t.help.title, pages, t.help.slideOf);
}

/** The symbols manual: every shape and what it does, then where fire and water get charged, then what they make together. */
function symbols() {
  const rand = random();
  // An index, like the contents of an old grimoire: numeral, the symbol in a fine nib, its name, a dotted leader, its value.
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  const shapes = SHAPES.map(
    (s, i) =>
      `<li${DRILLS.includes(s.kind as Drill) ? drillClass(s.kind as Drill) : ''}><span class="rn">${ROMAN[i]}</span>${fig(s.kind, shapeIcon(s.kind, true))}<b>${t.help.names[s.kind]}</b>` +
      (s.source ? `<span class="src">${s.source === 'fire' ? flameIcon(rand) : waterIcon(rand)}</span>` : '') +
      `<span class="lead"></span><span class="val${s.effect ? ` val-${s.effect}` : ' val-def'}">${s.effect === 'heal' ? '+' : ''}${s.value}</span></li>`,
  ).join('');
  const legend = `<p class="legend"><span class="val-dmg">${EFFECT.dmg}</span> · <span class="val-heal">${EFFECT.heal}</span></p>`;
  const notes =
    `<h3>${t.help.sourcesTitle}</h3><ul class="notes">` +
    `<li><span class="src">${flameIcon(rand)}</span><span>${t.help.fireNote}</span></li>` +
    `<li><span class="src">${waterIcon(rand)}</span><span>${t.help.waterNote}</span></li>` +
    `<li${drillClass('rune')}><span class="src rune">✦</span><span>${t.help.runesNote}</span></li></ul>`;
  const tried = practice ? DRILLS.filter((d) => practice!.has(d)).length : 0;
  const progress = practice
    ? `<p class="training">${tried === DRILLS.length ? t.practice.allDone : t.practice.progress(tried, DRILLS.length)}</p>`
    : '';
  // Fire + water = the hourglass: the two charged triangles merge in hand into the blast.
  const combo =
    `<h3>${t.help.comboTitle}</h3>` +
    `<div class="combo"${drillClass('hourglass')}>` +
    `${fig('triangle charged', shapeIcon('triangle', true))}<span class="op">+</span>${fig('triangleDown charged', shapeIcon('triangleDown', true))}<span class="op">=</span>` +
    `<span class="out">${fig('hourglass', shapeIcon('hourglass', true))}<b>${t.help.names.hourglass}</b>` +
    `<span class="val val-dmg"><small>${EFFECT.dmg}</small> 45</span></span></div>` +
    `<p class="combo-note">${t.help.comboNote}</p>`;
  return bookCard('manual', t.help.shapesTitle, [`${progress}<ol class="shapes">${shapes}</ol>${legend}`, notes, combo], t.help.pageOf);
}

/**
 * Two cards behind two buttons next to the gear: "?" swipes through how to play (also shown on the
 * first visit) and the book lists the symbols. The game holds still while either is open.
 */
export function mountHelp() {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'help-btn';
  button.setAttribute('aria-label', t.help.button);
  button.innerHTML = questionIcon();

  const book = document.createElement('button');
  book.type = 'button';
  book.id = 'book-btn';
  book.setAttribute('aria-label', t.help.symbolsButton);
  book.innerHTML = bookIcon();

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
  let opener: HTMLElement | null = null;
  let turn: ((dir: number) => void) | null = null;
  const show = (page: 'guide' | 'symbols') => {
    if (!open) opener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
    overlay.innerHTML = page === 'guide' ? guide() : symbols(); // fresh brush jitter each time
    overlay.append(langLink(LANG === 'es' ? 'en' : 'es', 'lang'));
    overlay.querySelector('.x')!.addEventListener('click', hide);
    turn = page === 'guide' ? wireBook(t.help.go) : wireBook(t.help.ok, t.help.howTo, () => show('guide'));
    overlay.hidden = false;
    open = true;
    void overlay.offsetWidth; // let the fade-in start from hidden
    overlay.classList.add('show');
    // Focus the book itself so screen readers start at its title, without a focus ring on a button nobody chose yet.
    overlay.querySelector<HTMLElement>('.book')!.focus({ preventScroll: true });
  };

  /**
   * Turns the pages: the next/back buttons, a sideways swipe across the page, or a tap near its outer
   * edges. The page being left lifts off the spine and flips away; going back flips the previous page
   * back down on top. The last page's button closes the book, and the first page's back button can
   * lead somewhere else.
   */
  function wireBook(done: string, before?: string, onBefore?: () => void) {
    const leaves = [...overlay.querySelectorAll<HTMLElement>('.page')];
    const shelf = overlay.querySelector<HTMLElement>('.pages')!;
    const back = overlay.querySelector<HTMLButtonElement>('.back')!;
    const next = overlay.querySelector<HTMLButtonElement>('.go')!;
    const [folio, spoken] = overlay.querySelectorAll<HTMLElement>('.folio span');
    const label = leaves.map((l) => l.getAttribute('aria-label')!);
    const last = leaves.length - 1;
    let at = 0;
    let busy = 0;

    const mark = () => {
      leaves.forEach((l, i) => {
        l.inert = i !== at;
        l.classList.toggle('more', i < last);
      });
      folio.textContent = `${at + 1} / ${leaves.length}`;
      spoken.textContent = label[at];
      const ahead = at < last;
      next.classList.toggle('seal', !ahead);
      next.querySelector('.cap')!.textContent = ahead ? t.help.next : done;
      back.querySelector('.cap')!.textContent = at === 0 && before ? before : t.help.back;
      back.classList.toggle('hide', at === 0 && !before);
    };

    const go = (to: number) => {
      if (busy || to < 0 || to > last || to === at) return;
      const from = leaves[at];
      const into = leaves[to];
      const forward = to > at;
      at = to;
      mark();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        from.classList.remove('on');
        into.classList.add('on');
        return;
      }
      // Forward: the open page flips away, revealing the next one already lying underneath.
      // Back: the previous page flips down over the open one.
      if (forward) {
        into.classList.add('under');
        from.classList.add('leaf-out');
      } else {
        from.classList.add('under');
        from.classList.remove('on');
        into.classList.add('on', 'leaf-in');
      }
      busy = window.setTimeout(() => {
        from.classList.remove('on', 'under', 'leaf-out');
        into.classList.remove('under', 'leaf-in');
        into.classList.add('on');
        busy = 0;
      }, 520);
    };

    let press: { x: number; y: number } | null = null;
    shelf.addEventListener('pointerdown', (e) => (press = { x: e.clientX, y: e.clientY }));
    shelf.addEventListener('pointercancel', () => (press = null));
    shelf.addEventListener('pointerup', (e) => {
      if (!press) return;
      const dx = e.clientX - press.x;
      const dy = e.clientY - press.y;
      press = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) go(at + (dx < 0 ? 1 : -1));
      else if (Math.hypot(dx, dy) < 10) {
        const box = shelf.getBoundingClientRect();
        const along = (e.clientX - box.left) / box.width;
        if (along > 0.72) go(at + 1);
        else if (along < 0.28) go(at - 1);
      }
    });
    back.addEventListener('click', () => (at === 0 ? onBefore?.() : go(at - 1)));
    next.addEventListener('click', () => (at === last ? hide() : go(at + 1)));

    leaves[0].classList.add('on');
    mark();
    return (dir: number) => go(at + dir);
  }

  function hide() {
    if (!open) return;
    open = false;
    markSeen();
    overlay.classList.remove('show');
    setTimeout(() => {
      if (!open) overlay.hidden = true;
    }, 300);
    // Hand keyboard focus back to the button that opened the book; otherwise leave the game unfocused.
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    else (document.activeElement as HTMLElement | null)?.blur();
  }

  button.addEventListener('click', () => show('guide'));
  book.addEventListener('click', () => show('symbols'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide();
  });
  addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') hide();
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') turn?.(e.key === 'ArrowRight' ? 1 : -1);
    else if (e.key === 'Tab') {
      // Keep focus inside the book while it is open.
      const stops = [...overlay.querySelectorAll<HTMLElement>('button:not(.hide), a')].filter((el) => !el.closest('[inert]'));
      const i = stops.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey ? i <= 0 : i === stops.length - 1) {
        e.preventDefault();
        stops[e.shiftKey ? stops.length - 1 : 0]?.focus();
      }
    }
  });
  if (!seen()) show('guide');

  return {
    get open() {
      return open;
    },
  };
}
