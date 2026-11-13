import type { Pt } from './ammo';
import { DIFFICULTY_LABEL, MAX_RIVALS, type Difficulty, type Outcome } from './combat';
import { ending } from './audio';
import { t } from './i18n';
import { levelIcon, rivalsIcon } from './icons';
import { challenge } from './challenge';

const STORE = 'cirquimia.match';
const OLD_STORE = 'cirquimia.dev'; // where the gear panel kept these before they moved to the HUD
const LEVELS = Object.keys(DIFFICULTY_LABEL) as Difficulty[];
const STEP = 0.7;
/** A first-time player gets one easy rival to learn against; returning players keep their own choice. */
const FIRST_MATCH: Saved = { rivals: 1, difficulty: 'facil' };
/**
 * The rivals and difficulty pills are pointed out once, at the start of the match after the first victory
 * (on the end card they covered the score): 'next' after that victory, '1' once shown.
 */
const SPOT_STORE = 'cirquimia.hudspot';
const SPOT_MS = 5000;

function spotState(): string | null {
  try {
    return localStorage.getItem(SPOT_STORE);
  } catch {
    return '1'; // blocked storage: never nag on every win
  }
}

function setSpot(value: 'next' | '1') {
  try {
    localStorage.setItem(SPOT_STORE, value);
  } catch {
    // Blocked storage: nothing to remember it in.
  }
}

/** What the HUD needs from the game: the current match and a way to restart it. */
export interface MatchControls {
  readonly rivals: number;
  readonly difficulty: Difficulty;
  setRivals(count: number): void;
  setDifficulty(level: Difficulty): void;
  /** Starts a fresh match, on a new meadow, with the current settings. */
  restart(): void;
}

interface Saved {
  rivals?: number;
  difficulty?: Difficulty;
}

/** How many rivals the saved match has, before the HUD mounts (the first meadow depends on it). */
export function savedRivals(): number {
  return load().rivals ?? FIRST_MATCH.rivals!;
}

function load(): Saved {
  // A challenge link plays the challenger's match, and it becomes the player's own choice from then on.
  if (challenge) return { rivals: challenge.rivals, difficulty: challenge.difficulty };
  try {
    const own = JSON.parse(localStorage.getItem(STORE) ?? 'null') as Saved | null;
    if (own) return own;
    const old = JSON.parse(localStorage.getItem(OLD_STORE) ?? '{}') as Saved;
    return { rivals: old.rivals ?? FIRST_MATCH.rivals, difficulty: old.difficulty ?? FIRST_MATCH.difficulty };
  } catch {
    return FIRST_MATCH;
  }
}

function save(s: Saved) {
  try {
    localStorage.setItem(STORE, JSON.stringify(s));
  } catch {
    // Private mode or blocked storage: the match just won't persist.
  }
}

export function random() {
  let seed = (Math.random() * 2 ** 31) | 0;
  return () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
}

export function arc(cx: number, cy: number, r: number, from: number, to: number): Pt[] {
  const line: Pt[] = [];
  const n = Math.ceil((r * Math.abs(to - from)) / STEP);
  for (let i = 0; i <= n; i++) {
    const a = from + ((to - from) * i) / n;
    line.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return line;
}

export function segment(a: Pt, b: Pt): Pt[] {
  const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / STEP);
  return Array.from({ length: n + 1 }, (_, i): Pt => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
}




/**
 * Player-facing match controls, bottom left (the gear on the right is for developers):
 * how many rivals to spar with and how hard they play. Each tap cycles the value and restarts the match.
 */
export function mountMatchControls(match: MatchControls) {
  const saved = load();
  if (saved.difficulty && LEVELS.includes(saved.difficulty)) match.setDifficulty(saved.difficulty);
  if (saved.rivals !== undefined) match.setRivals(saved.rivals);

  const box = document.createElement('div');
  box.id = 'match';
  box.setAttribute('role', 'toolbar');
  box.setAttribute('aria-label', t.match.toolbar);

  const button = () => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'match-btn';
    b.innerHTML = '<span class="disc"></span><span class="cap"></span>';
    b.addEventListener('pointerdown', (e) => e.stopPropagation());
    b.addEventListener('pointerup', (e) => e.stopPropagation());
    box.append(b);
    return b;
  };
  const rivalsBtn = button();
  rivalsBtn.classList.add('rivals');
  const levelBtn = button();
  levelBtn.classList.add('level');

  const toast = document.createElement('div');
  toast.id = 'match-toast';
  toast.setAttribute('role', 'status');
  document.body.append(box, toast);

  const render = () => {
    const n = match.rivals;
    const level = match.difficulty;
    rivalsBtn.querySelector('.disc')!.innerHTML = rivalsIcon(n);
    rivalsBtn.querySelector('.cap')!.innerHTML = t.match.rivalsCap(n);
    rivalsBtn.setAttribute('aria-label', t.match.rivalsAria(n));
    levelBtn.querySelector('.disc')!.innerHTML = levelIcon(LEVELS.indexOf(level) + 1);
    levelBtn.querySelector('.cap')!.textContent = DIFFICULTY_LABEL[level];
    levelBtn.setAttribute('aria-label', t.match.levelAria(DIFFICULTY_LABEL[level]));
    // Training has no difficulty: the scarecrow never strikes back.
    levelBtn.hidden = n === 0;
    save({ rivals: n, difficulty: level });
    fit();
  };

  // Phones always show the pills as icons only (rivals' figures, level bars), whatever the values, so they never change width
  // when toggled. Wider screens (iPad, desktop) keep the words, giving up the ↻ hint first, then the words, only if the
  // pills would run under the buttons on the right.
  const phone = matchMedia('(max-width: 699.98px)');
  const fit = () => {
    box.classList.remove('snug', 'icons');
    if (phone.matches) {
      box.classList.add('icons');
      return;
    }
    const right = () => {
      const lefts = ['sound-btn', 'rank-btn', 'book-btn', 'dev-gear']
        .map((id) => document.getElementById(id)?.getBoundingClientRect().left ?? Infinity)
        .filter((x) => x > 0);
      return Math.min(innerWidth, ...lefts) - 8;
    };
    for (const step of ['snug', 'icons']) {
      if (box.getBoundingClientRect().right <= right()) return;
      box.classList.add(step);
    }
  };
  addEventListener('resize', fit);
  // The buttons on the right mount after the pills.
  requestAnimationFrame(fit);
  void document.fonts?.ready.then(fit);

  let toastTimer = 0;
  const restarted = (b: HTMLElement) => {
    render();
    b.animate([{ transform: 'scale(.86)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
    toast.textContent = t.match.restarted(match.rivals, DIFFICULTY_LABEL[match.difficulty]);
    toast.classList.remove('show');
    void toast.offsetWidth; // restart the fade when tapping quickly
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1600);
  };

  // The first victory lifts the pills over the end card's scrim, with a note that they change the next match.
  const spotTip = document.createElement('div');
  spotTip.id = 'match-spot';
  spotTip.setAttribute('role', 'note');
  spotTip.hidden = true;
  spotTip.innerHTML = `<b>${t.match.spotTitle}</b><span>${t.match.spotBody}</span>`;
  document.body.append(spotTip);
  let spotTimer = 0;
  const unspot = () => {
    clearTimeout(spotTimer);
    box.classList.remove('spot');
    spotTip.hidden = true;
  };
  /** A few seconds at the start of the next match, then it fades by itself. */
  const spotNext = () => {
    if (spotState() !== 'next') return;
    setSpot('1');
    box.classList.add('spot');
    spotTip.hidden = false;
    spotTimer = window.setTimeout(unspot, SPOT_MS);
  };
  const closeEnd = () => {
    end.hidden = true;
    end.classList.remove('show');
    unspot();
  };

  rivalsBtn.addEventListener('click', () => {
    closeEnd();
    match.setRivals((match.rivals + 1) % (MAX_RIVALS + 1));
    match.restart();
    restarted(rivalsBtn);
  });
  levelBtn.addEventListener('click', () => {
    closeEnd();
    match.setDifficulty(LEVELS[(LEVELS.indexOf(match.difficulty) + 1) % LEVELS.length]);
    match.restart();
    restarted(levelBtn);
  });

  render();

  // End of match: a card over a misty scrim, with the same brush look as the HUD, and one way out.
  const end = document.createElement('div');
  end.id = 'match-end';
  end.hidden = true;
  end.setAttribute('role', 'dialog');
  end.setAttribute('aria-modal', 'true');
  end.innerHTML =
    '<div class="card"><h2></h2><p></p><div class="scored" hidden></div>' +
    `<div class="ends"><button type="button" class="match-btn again"><span class="cap">${t.match.again}</span></button></div>` +
    '<section class="scored shared" hidden></section></div>';
  for (const type of ['pointerdown', 'pointerup', 'pointermove']) end.addEventListener(type, (e) => e.stopPropagation());
  document.body.append(end);
  const again = end.querySelector<HTMLButtonElement>('.again')!;
  const scored = end.querySelector<HTMLElement>('.scored')!;
  const ends = end.querySelector<HTMLElement>('.ends')!;
  const shared = end.querySelector<HTMLElement>('.shared')!;
  again.addEventListener('click', () => {
    closeEnd();
    match.restart();
    restarted(again);
    spotNext();
  });
  // A challenge link set this match up: say so once, where a restart would.
  if (challenge) {
    toast.textContent = t.match.challenge(match.rivals, DIFFICULTY_LABEL[match.difficulty]);
    window.setTimeout(() => {
      toast.classList.add('show');
      toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
    }, 900);
  }
  // Won and left before playing again: the next visit's first match shows it.
  if (spotState() === 'next') window.setTimeout(spotNext, 1200);

  return {
    /** The victory card's score, button row and share section, filled by the ranking for a match that counts. */
    endSlots: { score: scored, actions: ends, share: shared },
    showEnd(outcome: Outcome) {
      for (const slot of [scored, shared]) {
        slot.hidden = true;
        slot.innerHTML = '';
      }
      for (const extra of ends.querySelectorAll('.match-btn:not(.again)')) extra.remove();
      const n = match.rivals;
      const level = DIFFICULTY_LABEL[match.difficulty];
      const won = outcome === 'victory';
      ending(won);
      end.className = won ? 'victory' : 'defeat';
      end.querySelector('h2')!.textContent = won ? t.match.victory : t.match.defeat;
      end.querySelector('p')!.textContent = won
        ? t.match.won(n, level)
        : t.match.lost(level);
      end.setAttribute('aria-label', won ? t.match.victoryAria : t.match.defeat);
      end.hidden = false;
      void end.offsetWidth; // let the fade-in start from hidden
      end.classList.add('show');
      // Focused for the keyboard, without a ring on touch (focusVisible is ignored where unsupported).
      again.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
      if (won && spotState() === null) setSpot('next');
    },
  };
}
