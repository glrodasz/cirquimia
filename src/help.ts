import { brushPath, shapeIcon, type Pt } from './ammo';
import { random, segment } from './match';
import type { ShapeKind } from './gestures';
import { hasKeyboard } from './keys';
import { padEnabled } from './pad';
import { LANG, langLink, t } from './i18n';
import { LANGUAGE_NAMES } from './i18n/locale';
import { bookIcon, dropIcon, flameIcon, turnArrowIcon } from './icons';
import moveShot from './assets/help/move.webp';
import drawShot from './assets/help/draw.webp';
import useShot from './assets/help/use.webp';
import runeShot from './assets/help/rune.webp';

function poly(points: Pt[]): Pt[] {
  return points.slice(1).flatMap((p, i) => segment(points[i], p).slice(i ? 1 : 0));
}

/** A pointing hand like the 👆 emoji, fingertip at the origin: index up, three folded knuckles, thumb out to the left. */
const HAND =
  'M-2.6 2.6A2.6 2.6 0 0 1 2.6 2.6V9.6C2.6 7.6 6.4 7.6 6.4 9.8C6.4 8.2 9.8 8.2 9.8 10.4C9.8 9.2 12.9 9.4 12.9 11.6V17' +
  'C12.9 21.2 10.4 24 6.4 24H3.2C0.8 24-0.8 23-2.2 21.4L-6.9 15.8C-7.9 14.5-6.4 12.8-4.9 13.8L-2.6 15.4Z';
const KNUCKLES = 'M6.4 9.8V12.6M9.8 10.4V13';

/** The hand with a clean outline, plus the ripple a tap leaves around its fingertip. */
export function hand(x: number, y: number, s: number, tap = true) {
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
];
const SHOTS = [moveShot, drawShot, useShot];

/**
 * The walk page split along its diagonal into the two ways to move. Top right: the screenshot as it is, a hand
 * tapping (or clicking) the map. Bottom left: the same meadow closer in, the alchemist walking off up and to the
 * right, driven by the stick's ring with its knob pushed that way, or by the arrow keys on a keyboard.
 */
function splitMove(rand: () => number, keys: boolean) {
  const zoom = 1.5;
  const hero: Pt = [182, 118]; // the alchemist's feet in the move screenshot
  const at: Pt = [128, 168]; // where they land in the close-up half
  const x = at[0] - hero[0] * zoom;
  const y = at[1] - hero[1] * zoom;
  const cap = (cx: number, cy: number, label: string, lit = false) =>
    `<g class="key${lit ? ' lit' : ''}"><rect x="${cx - 11}" y="${cy - 11}" width="22" height="22"/><text x="${cx}" y="${cy + 4.5}">${label}</text></g>`;
  const steer = keys
    ? cap(48, 174, 'W', true) + cap(24, 198, 'A') + cap(48, 198, 'S') + cap(72, 198, 'D', true)
    : `<g class="pad"><circle cx="50" cy="190" r="30"/><circle class="knob" cx="62" cy="178" r="12"/></g>`;
  return (
    `<defs><clipPath id="move-near"><polygon points="0,0 312,234 0,234"/></clipPath></defs>` +
    `<image href="${moveShot}" x="${x}" y="${y}" width="${312 * zoom}" height="${234 * zoom}" clip-path="url(#move-near)" preserveAspectRatio="none"/>` +
    `<path class="split" d="M-4 -3L316 237"/>` +
    OVERLAYS[0](rand) +
    `<path class="arrow" d="${arrowLine([[at[0] + 16, at[1] - 8], [at[0] + 52, at[1] - 16]], 3, rand)}"/>` +
    steer
  );
}

/** A teardrop: the tip, down one side, round the belly and back up. */

/** Every shape in the order of the index; fire and water ones show where they get charged. No numbers: players find out how hard each one hits. */
const SHAPES: Array<{ kind: ShapeKind; source?: 'fire' | 'water' }> = [
  { kind: 'circle' },
  { kind: 'square' },
  { kind: 'triangle', source: 'fire' },
  { kind: 'triangleDown', source: 'water' },
  { kind: 'rhombus' },
  { kind: 'pentagram' },
  { kind: 'spiral' },
];

/** What training asks the player to try on the scarecrow: each attack, and any of them from a rune circle. */
export type Drill = 'square' | 'pentagram' | 'triangle' | 'triangleDown' | 'spiral' | 'hourglass' | 'fireStar' | 'waterStar' | 'rune';
export const DRILLS: Drill[] = ['square', 'pentagram', 'triangle', 'triangleDown', 'spiral', 'hourglass', 'fireStar', 'waterStar', 'rune'];
/** The drills tried in this training session, shown ticked in the symbols book; null outside training. */
let practice: ReadonlySet<Drill> | null = null;
export function showPractice(done: ReadonlySet<Drill> | null) {
  practice = done;
}
const drillClass = (id: Drill) => (practice ? ` class="${practice.has(id) ? 'tried' : 'todo'}"` : '');

const fig = (cls: string, inner: string) => `<span class="fig ${cls}">${inner}</span>`;


type Section = 'symbols' | 'guide';

/**
 * An alchemist's book: one sheet of grimoire paper with a red title, the pages of both sections stacked on
 * top of each other (so the book keeps one size whichever section is open) and two big page-turn buttons
 * along the bottom edge, with the page number between them. Under those, a foot strip: the two sections of
 * the book (symbols, how to play) and the language.
 */
function bookCard() {
  const sections: Array<[Section, string[], (n: number, total: number) => string]> = [
    ['symbols', symbols(), t.help.pageOf],
    ['guide', guide(), t.help.slideOf],
  ];
  const pages = sections
    .map(([sec, list, label]) =>
      list.map((page, i) => `<section class="page ${sec}" data-sec="${sec}" aria-label="${label(i + 1, list.length)}">${page}</section>`).join(''),
    )
    .join('');
  return (
    `<div class="book" tabindex="-1"><button type="button" class="x" aria-label="${t.help.close}">×</button>` +
    `<h2 id="help-title"></h2>` +
    `<div class="pages">${pages}</div>` +
    `<div class="turn"><button type="button" class="back">${turnArrowIcon()}<span class="cap"></span></button>` +
    `<span class="folio" aria-live="polite"><span aria-hidden="true"></span><span class="sr"></span></span>` +
    `<button type="button" class="go"><span class="cap"></span>${turnArrowIcon()}</button></div>` +
    `<div class="foot"><div class="tabs">` +
    `<button type="button" class="tab" data-to="symbols">${t.help.symbolsButton}</button>` +
    `<button type="button" class="tab" data-to="guide">${t.help.howTo}</button>` +
    `</div><div class="langs" role="group" aria-label="${t.help.language}"></div></div></div>`
  );
}

/**
 * How to play: move, draw, cast, one illustrated page each. The rest (walls, fire and water) is taught in the
 * first match, and every symbol is in the book.
 */
function guide() {
  const rand = random();
  const keys = hasKeyboard();
  // Two ways to walk: point at the map, or the stick on touch screens / the keys on a keyboard.
  const ways = keys ? [t.help.moveWays.click, t.help.moveWays.keys] : padEnabled() ? [t.help.moveWays.tap, t.help.moveWays.stick] : null;
  return t.help.slides.map(([title, text], i) => {
    const split = i === 0 && ways;
    const body = split
      ? ways.map(([head, line]) => `<p class="way"><b>${head}</b><span>${line}</span></p>`).join('')
      : (keys && i > 0 ? t.help.desk[i - 1] : text)
          .split('|')
          .map((step, n, all) => (all.length > 1 ? `<p class="way step"><span><i>${n + 1}.</i> ${step}</span></p>` : `<p>${step}</p>`))
          .join('');
    return (
      `<figure class="shot"><img src="${SHOTS[i]}" alt="" draggable="false">` +
      `<svg viewBox="0 0 312 234" aria-hidden="true">${split ? splitMove(rand, keys) : OVERLAYS[i](rand)}</svg></figure>` +
      `<h3><span class="num">${i + 1}</span>${title}</h3>${body}`
    );
  });
}

/**
 * The symbols manual: an index of every shape and what it does, with the combinations under a rule in the
 * same index; then where fire and water get charged, runes, and how combining works.
 */
function symbols() {
  // An index, like the contents of an old grimoire: numeral, the symbol in a fine nib, what it does.
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const shapes = SHAPES.map(
    (s, i) =>
      `<li${DRILLS.includes(s.kind as Drill) ? drillClass(s.kind as Drill) : ''}><span class="rn">${ROMAN[i]}</span>${fig(s.kind, shapeIcon(s.kind, true))}<b>${t.help.roles[s.kind]}</b>` +
      (s.source ? `<span class="src">${s.source === 'fire' ? flameIcon() : dropIcon()}</span>` : '') +
      `</li>`,
  ).join('');
  // Two symbols merged in hand, drawn as the strokes that make them: fire + water = the blast, the star + fire or water = a fire or water star.
  const combos = (
    [
      ['triangle', 'triangleDown', 'hourglass'],
      ['pentagram', 'triangle', 'fireStar'],
      ['pentagram', 'triangleDown', 'waterStar'],
    ] as const
  )
    .map(
      ([a, b, out], i) =>
        `<li${drillClass(out)}><span class="rn">${ROMAN[SHAPES.length + i]}</span>` +
        `<span class="recipe">${fig(a, shapeIcon(a, true))}<i>+</i>${fig(b, shapeIcon(b, true))}<i>=</i>${fig(out, shapeIcon(out, true))}</span>` +
        `<b>${t.help.roles[out]}</b></li>`,
    )
    .join('');
  const tried = practice ? DRILLS.filter((d) => practice!.has(d)).length : 0;
  const progress = practice
    ? `<p class="training">${tried === DRILLS.length ? t.practice.allDone : t.practice.progress(tried, DRILLS.length)}</p>`
    : '';
  const index =
    `${progress}<ol class="shapes">${shapes}</ol>` +
    `<h4 class="sep">${t.help.comboTitle}</h4><ol class="shapes combos">${combos}</ol>` +
    `<ul class="notes rune-note"><li${drillClass('rune')}><img class="rune-shot" src="${runeShot}" alt="" draggable="false"><span>${t.help.runesNote}</span></li></ul>`;
  const notes =
    `<h3>${t.help.sourcesTitle}</h3><ul class="notes">` +
    `<li><span class="src">${flameIcon()}</span><span>${t.help.fireNote}</span></li>` +
    `<li><span class="src">${dropIcon()}</span><span>${t.help.waterNote}</span></li></ul>` +
    `<h3>${t.help.comboTitle}</h3><p class="combo-note">${t.help.comboNote}</p>`;
  return [index, notes];
}

/** Set before switching language, so the book opens again on the same section once the page reloads. */
const REOPEN = 'cirquimia.reopen';

/**
 * One book behind one button next to the gear: it opens on the symbols, and its foot strip turns to how to
 * play and switches the language, inside the same book. The game holds still while it is open.
 */
export function mountHelp() {
  const book = document.createElement('button');
  book.type = 'button';
  book.id = 'book-btn';
  book.setAttribute('aria-label', t.help.bookButton);
  book.innerHTML = bookIcon();

  const overlay = document.createElement('div');
  overlay.id = 'help';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'help-title');
  for (const node of [book, overlay]) for (const type of ['pointerdown', 'pointerup', 'pointermove']) node.addEventListener(type, (e) => e.stopPropagation());
  document.body.append(book, overlay);

  // Mobile browsers can lay fixed elements out under their own toolbars; size the card to what is actually visible.
  const fit = () => overlay.style.setProperty('--seen', `${Math.round(visualViewport?.height ?? innerHeight)}px`);
  visualViewport?.addEventListener('resize', fit);
  addEventListener('resize', fit);
  fit();

  let open = false;
  let opener: HTMLElement | null = null;
  let turn: ((dir: number) => void) | null = null;
  let section: ((to: Section) => void) | null = null;
  const show = (page: Section) => {
    if (!open) {
      opener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
      overlay.innerHTML = bookCard(); // fresh brush jitter and training ticks each time
      overlay.querySelector('.x')!.addEventListener('click', hide);
      [turn, section] = wireBook();
    }
    section!(page);
    if (open) return;
    overlay.hidden = false;
    open = true;
    void overlay.offsetWidth; // let the fade-in start from hidden
    overlay.classList.add('show');
    // Focus the book itself so screen readers start at its title, without a focus ring on a button nobody chose yet.
    overlay.querySelector<HTMLElement>('.book')!.focus({ preventScroll: true });
  };

  /**
   * Turns the pages of the open section: the next/back buttons, a sideways swipe across the page, or a tap
   * near its outer edges. The page being left lifts off the spine and flips away; going back flips the
   * previous page back down on top. The last page's button closes the book. The tabs in the foot switch
   * section in place: same book, its first page of the other section, a new title.
   */
  function wireBook(): [(dir: number) => void, (to: Section) => void] {
    const all = [...overlay.querySelectorAll<HTMLElement>('.page')];
    const shelf = overlay.querySelector<HTMLElement>('.pages')!;
    const title = overlay.querySelector<HTMLElement>('h2')!;
    const back = overlay.querySelector<HTMLButtonElement>('.back')!;
    const next = overlay.querySelector<HTMLButtonElement>('.go')!;
    const tabs = [...overlay.querySelectorAll<HTMLButtonElement>('.tab')];
    const [folio, spoken] = overlay.querySelectorAll<HTMLElement>('.folio span');
    let current: Section = 'symbols';
    let leaves: HTMLElement[] = [];
    let at = 0;
    let busy = 0;

    const mark = () => {
      const last = leaves.length - 1;
      all.forEach((l) => (l.inert = l !== leaves[at]));
      leaves.forEach((l, i) => l.classList.toggle('more', i < last));
      folio.textContent = `${at + 1} / ${leaves.length}`;
      spoken.textContent = leaves[at].getAttribute('aria-label')!;
      const ahead = at < last;
      next.classList.toggle('seal', !ahead);
      next.querySelector('.cap')!.textContent = ahead ? t.help.next : current === 'guide' ? t.help.go : t.help.ok;
      back.querySelector('.cap')!.textContent = t.help.back;
      back.classList.toggle('hide', at === 0);
    };

    const go = (to: number) => {
      if (busy || to < 0 || to >= leaves.length || to === at) return;
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

    const switchTo = (to: Section) => {
      clearTimeout(busy);
      busy = 0;
      current = to;
      overlay.querySelector('.book')!.setAttribute('data-sec', to);
      title.textContent = to === 'guide' ? t.help.title : t.help.shapesTitle;
      for (const tab of tabs) {
        if (tab.dataset.to === to) tab.setAttribute('aria-current', 'page');
        else tab.removeAttribute('aria-current');
      }
      for (const l of all) l.classList.remove('on', 'under', 'leaf-in', 'leaf-out');
      leaves = all.filter((l) => l.dataset.sec === to);
      at = 0;
      leaves[0].classList.add('on');
      mark();
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
    back.addEventListener('click', () => go(at - 1));
    next.addEventListener('click', () => (at === leaves.length - 1 ? hide() : go(at + 1)));
    for (const tab of tabs) tab.addEventListener('click', () => tab.dataset.to !== current && switchTo(tab.dataset.to as Section));

    const langs = overlay.querySelector('.langs')!;
    for (const lang of ['es', 'en'] as const) {
      const link = langLink(lang, 'lang', lang.toUpperCase());
      if (lang === LANG) {
        link.removeAttribute('aria-label');
        link.title = LANGUAGE_NAMES[lang];
        link.addEventListener('click', (e) => e.preventDefault());
      } else {
        link.title = link.getAttribute('aria-label')!;
        // Stay in the book across the reload, on this same section.
        link.addEventListener('click', () => {
          try { sessionStorage.setItem(REOPEN, current); } catch { /* private mode: the book just stays closed */ }
        });
      }
      langs.append(link);
    }

    return [(dir: number) => go(at + dir), switchTo];
  }

  function hide() {
    if (!open) return;
    open = false;
    overlay.classList.remove('show');
    setTimeout(() => {
      if (!open) overlay.hidden = true;
    }, 300);
    // Hand keyboard focus back to the button that opened the book; otherwise leave the game unfocused.
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    else (document.activeElement as HTMLElement | null)?.blur();
  }

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
  // No guide on the first visit: the first match teaches by playing, and the guide waits inside the book.
  let reopen: string | null = null;
  try {
    reopen = sessionStorage.getItem(REOPEN);
    sessionStorage.removeItem(REOPEN);
  } catch { /* no storage */ }
  if (reopen === 'guide' || reopen === 'symbols') show(reopen);

  return {
    get open() {
      return open;
    },
  };
}
