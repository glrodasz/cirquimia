import { shapeIcon } from './ammo';
import type { ShapeKind } from './gestures';
import { hasKeyboard } from './keys';
import { padEnabled } from './pad';
import { LANG, langLink, t } from './i18n';
import { LANGUAGE_NAMES } from './i18n/locale';
import { bookIcon, circleTabIcon, dropIcon, flameIcon, quillTabIcon, turnArrowIcon } from './icons';
import runeShot from './assets/help/rune.webp';

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

/** Every shape in the order of the index; fire and water ones say they need their source. No numbers: players find out how hard each one hits. */
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
    ['guide', guide(), () => t.help.title],
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
    `<button type="button" class="tab" data-to="symbols">${circleTabIcon()}<span>${t.help.symbolsButton}</span></button>` +
    `<button type="button" class="tab" data-to="guide">${quillTabIcon()}<span>${t.help.howTo}</span></button>` +
    `</div><div class="langs" role="group" aria-label="${t.help.language}"></div></div></div>`
  );
}

/**
 * How to play: one sheet of plain instructions, no pictures. Move, draw, cast, each a short heading over
 * two bulleted steps, worded for the way this player plays (click and keys, or tap and stick). The rest
 * (walls, fire and water) is taught in the first match, and every symbol is in the book.
 */
function guide() {
  const keys = hasKeyboard();
  // Two ways to walk: point at the map, or the stick on touch screens / the keys on a keyboard.
  const ways = keys ? [t.help.moveWays.click, t.help.moveWays.keys] : padEnabled() ? [t.help.moveWays.tap, t.help.moveWays.stick] : null;
  const rules = t.help.slides
    .map(([title, text], i) => {
      const steps = i === 0 && ways ? ways : (keys && i > 0 ? t.help.desk[i - 1] : text).split('|');
      return `<h3><span class="num">${i + 1}</span>${title}</h3><ul class="steps">${steps.map((step) => `<li>${step}</li>`).join('')}</ul>`;
    })
    .join('');
  return [rules];
}

/**
 * The symbols manual, one sheet: every shape and what it does, the combinations under a rule, and the rune
 * note at the foot. Fire and water show their source as an icon; the rest players find out by playing.
 */
function symbols() {
  // An index, like the contents of an old grimoire: the symbol in a fine nib and what it does.
  const shapes = SHAPES.map(
    (s) =>
      `<li${DRILLS.includes(s.kind as Drill) ? drillClass(s.kind as Drill) : ''}>${fig(s.kind, shapeIcon(s.kind, true))}<b>${t.help.roles[s.kind]}</b>` +
      (s.source ? `<span class="need">(${t.help.needs}<span class="src">${s.source === 'fire' ? flameIcon() : dropIcon()}</span>)</span>` : '') +
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
      ([a, b, out]) =>
        `<li${drillClass(out)}>` +
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
  return [index];
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
      folio.textContent = leaves.length > 1 ? `${at + 1} / ${leaves.length}` : '';
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
