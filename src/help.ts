import { shapeIcon } from './ammo';
import type { ShapeKind } from './gestures';
import { hasKeyboard } from './keys';
import { padEnabled } from './pad';
import { LANG, langLink, t } from './i18n';
import { LANGUAGE_NAMES } from './i18n/locale';
import { bookIcon, circleTabIcon, dropIcon, flameIcon, quillTabIcon } from './icons';
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

/** What training asks the player to try: every symbol (the attacks on the scarecrow), and any attack from a rune circle. */
export type Drill = 'circle' | 'square' | 'pentagram' | 'triangle' | 'triangleDown' | 'rhombus' | 'spiral' | 'hourglass' | 'fireStar' | 'waterStar' | 'rune';
export const DRILLS: Drill[] = ['circle', 'square', 'pentagram', 'triangle', 'triangleDown', 'rhombus', 'spiral', 'hourglass', 'fireStar', 'waterStar', 'rune'];
/** The drills tried in this training session, shown ticked in the symbols book; null outside training. */
let practice: ReadonlySet<Drill> | null = null;
export function showPractice(done: ReadonlySet<Drill> | null) {
  practice = done;
}
const drillClass = (id: Drill) => (practice ? ` class="${practice.has(id) ? 'tried' : 'todo'}"` : '');

const fig = (cls: string, inner: string) => `<span class="fig ${cls}">${inner}</span>`;


type Section = 'symbols' | 'guide';

/**
 * An alchemist's book: one sheet of grimoire paper with a red title and one page per section, stacked on top
 * of each other so the book keeps one size whichever section is open. Under it, a foot strip: the two
 * sections of the book (symbols, how to play) and the language. The × , Esc or a tap outside close it.
 */
function bookCard() {
  const sections: Array<[Section, string, string]> = [
    ['symbols', symbols(), t.help.shapesTitle],
    ['guide', guide(), t.help.title],
  ];
  const pages = sections.map(([sec, page, label]) => `<section class="page ${sec}" data-sec="${sec}" aria-label="${label}">${page}</section>`).join('');
  return (
    `<div class="book" tabindex="-1"><button type="button" class="x" aria-label="${t.help.close}">×</button>` +
    `<h2 id="help-title"></h2>` +
    `<div class="pages">${pages}</div>` +
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
  return rules;
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
  return index;
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
  let section: ((to: Section) => void) | null = null;
  const show = (page: Section) => {
    if (!open) {
      opener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
      overlay.innerHTML = bookCard(); // fresh brush jitter and training ticks each time
      overlay.querySelector('.x')!.addEventListener('click', hide);
      section = wireBook();
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

  /** The tabs in the foot switch section in place: same book, the other page, a new title. */
  function wireBook(): (to: Section) => void {
    const all = [...overlay.querySelectorAll<HTMLElement>('.page')];
    const title = overlay.querySelector<HTMLElement>('h2')!;
    const tabs = [...overlay.querySelectorAll<HTMLButtonElement>('.tab')];
    let current: Section = 'symbols';

    const switchTo = (to: Section) => {
      current = to;
      overlay.querySelector('.book')!.setAttribute('data-sec', to);
      title.textContent = to === 'guide' ? t.help.title : t.help.shapesTitle;
      for (const tab of tabs) {
        if (tab.dataset.to === to) tab.setAttribute('aria-current', 'page');
        else tab.removeAttribute('aria-current');
      }
      for (const page of all) {
        page.classList.toggle('on', page.dataset.sec === to);
        page.inert = page.dataset.sec !== to;
      }
    };
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

    return switchTo;
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
