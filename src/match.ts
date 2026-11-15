import type { Pt } from './ammo';
import { DIFFICULTY_LABEL, MAX_RIVALS, type Difficulty, type Outcome } from './combat';
import { ending } from './audio';
import { t } from './i18n';
import { hordeIcon, levelIcon, newGameIcon, rivalsIcon, skullIcon } from './icons';
import { formatTime } from './leaderboard/score';
import { challenge } from './challenge';

const STORE = 'cirquimia.match';
const OLD_STORE = 'cirquimia.dev'; // where the gear panel kept these before they moved to the HUD
const LEVELS = Object.keys(DIFFICULTY_LABEL) as Difficulty[];
const STEP = 0.7;
/** A first-time player gets one easy rival to learn against; returning players keep their own choice. */
const FIRST_MATCH: Saved = { mode: 'duel', rivals: 1, difficulty: 'facil' };
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

/** Training (the scarecrow), a duel against 1–4 rivals, or the horde's waves. */
export type Mode = 'training' | 'duel' | 'horde';

/** What the HUD needs from the game: the current match and a way to restart it. */
export interface MatchControls {
  readonly mode: Mode;
  /** Rivals in a duel (1–4); training and the horde keep it for the next duel. */
  readonly rivals: number;
  readonly difficulty: Difficulty;
  /** Sets the mode (and, for a duel, its rivals and level) without restarting. */
  set(mode: Mode, rivals?: number, difficulty?: Difficulty): void;
  /** Starts a fresh match, on a new meadow, with the current settings. */
  restart(): void;
}

/** A match against someone: what Go to battle starts again from training. */
type Battle = 'duel' | 'horde';

interface Saved {
  mode?: Mode;
  /** The last battle chosen (duel or horde), kept while training. */
  battle?: Battle;
  rivals?: number;
  difficulty?: Difficulty;
}

/** The saved mode, before the HUD mounts (the first meadow depends on it). */
export function savedMode(): Mode {
  return load().mode ?? 'duel';
}

function load(): Saved {
  // A challenge link plays the challenger's match, and it becomes the player's own choice from then on.
  if (challenge) return { mode: 'duel', battle: 'duel', rivals: challenge.rivals, difficulty: challenge.difficulty };
  try {
    const own = JSON.parse(localStorage.getItem(STORE) ?? 'null') as Saved | null;
    const old = own ?? (JSON.parse(localStorage.getItem(OLD_STORE) ?? '{}') as Saved);
    // Before the modes, training was a duel with 0 rivals.
    const mode = old.mode ?? (old.rivals === 0 ? 'training' : 'duel');
    const rivals = old.rivals && old.rivals >= 1 && old.rivals <= MAX_RIVALS ? old.rivals : FIRST_MATCH.rivals;
    const difficulty = old.difficulty && LEVELS.includes(old.difficulty) ? old.difficulty : FIRST_MATCH.difficulty;
    const battle: Battle = old.battle === 'horde' || old.battle === 'duel' ? old.battle : mode === 'horde' ? 'horde' : 'duel';
    return { mode, battle, rivals, difficulty };
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
 * The first real match (after the tutorial's own one) is remembered once it ends: lost, its end card suggests training.
 * Absent = not played yet; blocked storage reads as played, so the suggestion never repeats.
 */
const FIRST_STORE = 'cirquimia.firstmatch';

/** True only the first time a real match ends; from then on it is remembered. */
export function firstRealMatchEnded(): boolean {
  try {
    if (localStorage.getItem(FIRST_STORE)) return false;
    localStorage.setItem(FIRST_STORE, '1');
    return true;
  } catch {
    return false;
  }
}


/**
 * Player-facing match controls, top left (the gear on the right is for developers): Training, always one tap away,
 * and New game, which opens the picker: a Duel against the computer (rivals and difficulty) or the Horde.
 */
export function mountMatchControls(match: MatchControls) {
  const saved = load();
  match.set(saved.mode ?? 'duel', saved.rivals, saved.difficulty);

  const box = document.createElement('div');
  box.id = 'match';
  box.setAttribute('role', 'toolbar');
  box.setAttribute('aria-label', t.match.toolbar);

  const stopPointer = (el: HTMLElement) => {
    el.addEventListener('pointerdown', (e) => e.stopPropagation());
    el.addEventListener('pointerup', (e) => e.stopPropagation());
  };
  const button = (cls: string, icon: string, cap: string, aria: string) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `match-btn ${cls}`;
    b.innerHTML = `<span class="disc">${icon}</span><span class="cap">${cap}</span>`;
    b.setAttribute('aria-label', aria);
    stopPointer(b);
    box.append(b);
    return b;
  };
  const trainBtn = button('training', rivalsIcon(0), t.match.train, t.match.trainAria);
  const newBtn = button('newgame', newGameIcon(), t.match.newGame, t.match.newGameAria);
  newBtn.setAttribute('aria-haspopup', 'dialog');

  // Training has one clear way back: the last battle chosen (duel with its rivals and level, or the horde).
  // New game hides meanwhile, so the two do not compete.
  let battle: Battle = load().battle ?? 'duel';
  const battleBtn = document.createElement('button');
  battleBtn.type = 'button';
  battleBtn.id = 'battle-btn';
  battleBtn.hidden = true;
  stopPointer(battleBtn);
  battleBtn.addEventListener('click', () => start(battle, match.rivals, match.difficulty, battleBtn));

  const toast = document.createElement('div');
  toast.id = 'match-toast';
  toast.setAttribute('role', 'status');
  document.body.append(box, battleBtn, toast);

  const render = () => {
    const training = match.mode === 'training';
    trainBtn.classList.toggle('on', training);
    trainBtn.setAttribute('aria-pressed', String(training));
    if (!training) battle = match.mode as Battle;
    battleBtn.hidden = !training;
    newBtn.hidden = training;
    if (pickerOpen && training) closePicker(false);
    battleBtn.innerHTML = `${battle === 'horde' ? hordeIcon() : rivalsIcon(match.rivals)}<span class="cap">${t.match.toBattle}</span>`;
    save({ mode: match.mode, battle, rivals: match.rivals, difficulty: match.difficulty });
    fit();
  };

  // Phones always show the two buttons as icons only. Wider screens keep the words, unless the row would run under
  // the buttons on the right.
  const phone = matchMedia('(max-width: 699.98px)');
  const fit = () => {
    box.classList.remove('icons');
    if (phone.matches) {
      box.classList.add('icons');
      return;
    }
    const lefts = ['sound-btn', 'rank-btn', 'book-btn', 'dev-gear']
      .map((id) => document.getElementById(id)?.getBoundingClientRect().left ?? Infinity)
      .filter((x) => x > 0);
    if (box.getBoundingClientRect().right > Math.min(innerWidth, ...lefts) - 8) box.classList.add('icons');
  };
  addEventListener('resize', fit);
  // The buttons on the right mount after these.
  requestAnimationFrame(fit);
  void document.fonts?.ready.then(fit);

  let toastTimer = 0;
  const hideToast = () => {
    clearTimeout(toastTimer);
    toast.classList.remove('show');
  };
  const say = (text: string, ms = 1600) => {
    // The New game pointer already talks about the match; one note at a time.
    if (spotting) return;
    toast.textContent = text;
    toast.classList.remove('show');
    void toast.offsetWidth; // restart the fade when tapping quickly
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), ms);
  };
  const summary = () =>
    match.mode === 'training'
      ? t.match.restarted(0, '')
      : match.mode === 'horde'
        ? t.match.hordeStarted
        : t.match.restarted(match.rivals, DIFFICULTY_LABEL[match.difficulty]);
  const restarted = (b: HTMLElement) => {
    render();
    b.animate([{ transform: 'scale(.86)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
    say(summary());
  };
  /** Sets the mode, starts a fresh match on a new meadow and closes whatever card was open. */
  const start = (mode: Mode, rivals: number | undefined, level: Difficulty | undefined, from: HTMLElement) => {
    closeEnd();
    closePicker(false);
    match.set(mode, rivals, level);
    match.restart();
    restarted(from === pickerCard ? newBtn : from);
  };

  // The rivals and difficulty pointer once, at the start of the match after the first victory: now at New game.
  const spotTip = document.createElement('div');
  spotTip.id = 'match-spot';
  spotTip.setAttribute('role', 'note');
  spotTip.hidden = true;
  spotTip.innerHTML = `<b>${t.match.spotTitle}</b><span>${t.match.spotBody}</span>`;
  document.body.append(spotTip);
  let spotTimer = 0;
  let spotting = false;
  const unspot = () => {
    clearTimeout(spotTimer);
    spotting = false;
    box.classList.remove('spot');
    spotTip.hidden = true;
  };
  /** A few seconds at the start of the next match, then it fades by itself. */
  const spotNext = () => {
    if (spotState() !== 'next') return;
    setSpot('1');
    hideToast();
    spotting = true;
    box.classList.add('spot');
    spotTip.hidden = false;
    spotTimer = window.setTimeout(unspot, SPOT_MS);
  };
  const closeEnd = () => {
    end.hidden = true;
    end.classList.remove('show');
    unspot();
  };

  // ---- New game: a grimoire sheet with the two ways to play side by side (stacked on phones). ----
  const picker = document.createElement('div');
  picker.id = 'newgame';
  picker.hidden = true;
  picker.setAttribute('role', 'dialog');
  picker.setAttribute('aria-modal', 'true');
  picker.setAttribute('aria-labelledby', 'newgame-title');
  const p = t.match.picker;
  const choice = (name: string, value: string, inner: string, label: string) =>
    `<button type="button" class="opt" data-${name}="${value}" aria-label="${label}" aria-pressed="false">${inner}</button>`;
  picker.innerHTML =
    `<div class="card" tabindex="-1">` +
    `<button type="button" class="x" aria-label="${p.close}">×</button>` +
    `<h2 id="newgame-title">${p.title}</h2>` +
    `<div class="modes">` +
    `<section class="mode duel" aria-labelledby="newgame-duel"><div class="head"><span class="disc">${rivalsIcon(2)}</span><h3 id="newgame-duel">${p.duel}</h3></div>` +
    `<p>${p.duelBody}</p>` +
    `<div class="field"><span class="label">${p.rivals}</span><div class="opts" role="group" aria-label="${p.rivals}">` +
    [1, 2, 3, 4].map((n) => choice('rivals', String(n), `${rivalsIcon(n)}<span>${n}</span>`, t.rank.rivals(n))).join('') +
    `</div></div>` +
    `<div class="field"><span class="label">${p.level}</span><div class="opts levels" role="group" aria-label="${p.level}">` +
    LEVELS.map((l, i) => choice('level', l, `${l === 'hardcore' ? skullIcon() : levelIcon(i + 1)}<span>${DIFFICULTY_LABEL[l]}</span>`, DIFFICULTY_LABEL[l])).join('') +
    `</div></div>` +
    `<button type="button" class="play" data-play="duel">${p.playDuel}</button></section>` +
    `<section class="mode horde" aria-labelledby="newgame-horde"><div class="head"><span class="disc">${hordeIcon()}</span><h3 id="newgame-horde">${p.horde}</h3></div>` +
    `<p>${p.hordeBody}</p>` +
    `<p class="waves">${p.waves}</p>` +
    `<button type="button" class="play" data-play="horde">${p.playHorde}</button></section>` +
    `</div></div>`;
  for (const type of ['pointerdown', 'pointerup', 'pointermove']) picker.addEventListener(type, (e) => e.stopPropagation());
  document.body.append(picker);
  const pickerCard = picker.querySelector<HTMLElement>('.card')!;
  let pickRivals = match.rivals;
  let pickLevel = match.difficulty;
  const renderPicker = () => {
    for (const b of picker.querySelectorAll<HTMLButtonElement>('[data-rivals]')) b.setAttribute('aria-pressed', String(Number(b.dataset.rivals) === pickRivals));
    for (const b of picker.querySelectorAll<HTMLButtonElement>('[data-level]')) b.setAttribute('aria-pressed', String(b.dataset.level === pickLevel));
    picker.querySelector('.duel')!.classList.toggle('current', match.mode === 'duel');
    picker.querySelector('.horde')!.classList.toggle('current', match.mode === 'horde');
  };
  let pickerOpen = false;
  const openPicker = () => {
    closeEnd();
    pickRivals = match.rivals;
    pickLevel = match.difficulty;
    renderPicker();
    picker.hidden = false;
    pickerOpen = true;
    void picker.offsetWidth;
    picker.classList.add('show');
    newBtn.setAttribute('aria-expanded', 'true');
    pickerCard.focus({ preventScroll: true });
  };
  function closePicker(refocus = true) {
    if (!pickerOpen) return;
    pickerOpen = false;
    picker.classList.remove('show');
    picker.hidden = true;
    newBtn.setAttribute('aria-expanded', 'false');
    if (refocus) newBtn.focus({ preventScroll: true });
  }
  picker.querySelector('.x')!.addEventListener('click', () => closePicker());
  picker.addEventListener('click', (e) => e.target === picker && closePicker());
  picker.addEventListener('keydown', (e) => e.key === 'Escape' && closePicker());
  for (const b of picker.querySelectorAll<HTMLButtonElement>('[data-rivals]')) {
    b.addEventListener('click', () => {
      pickRivals = Number(b.dataset.rivals);
      renderPicker();
    });
  }
  for (const b of picker.querySelectorAll<HTMLButtonElement>('[data-level]')) {
    b.addEventListener('click', () => {
      pickLevel = b.dataset.level as Difficulty;
      renderPicker();
    });
  }
  for (const b of picker.querySelectorAll<HTMLButtonElement>('[data-play]')) {
    b.addEventListener('click', () => start(b.dataset.play as Mode, pickRivals, pickLevel, pickerCard));
  }

  trainBtn.addEventListener('click', () => start('training', undefined, undefined, trainBtn));
  newBtn.addEventListener('click', () => (pickerOpen ? closePicker() : openPicker()));

  render();

  // End of match: a card over a misty scrim, with the same brush look as the HUD, and one way out.
  const end = document.createElement('div');
  end.id = 'match-end';
  end.hidden = true;
  end.setAttribute('role', 'dialog');
  end.setAttribute('aria-modal', 'true');
  end.innerHTML =
    `<div class="card"><h2></h2><p></p><p class="train-tip" hidden>${t.match.trainTip}</p><div class="scored" hidden></div>` +
    `<div class="ends"><button type="button" class="match-btn again"><span class="cap">${t.match.again}</span></button></div>` +
    '<section class="scored shared" hidden></section></div>';
  for (const type of ['pointerdown', 'pointerup', 'pointermove']) end.addEventListener(type, (e) => e.stopPropagation());
  document.body.append(end);
  const again = end.querySelector<HTMLButtonElement>('.again')!;
  const scored = end.querySelector<HTMLElement>('.scored')!;
  const ends = end.querySelector<HTMLElement>('.ends')!;
  const shared = end.querySelector<HTMLElement>('.shared')!;
  const tip = end.querySelector<HTMLElement>('.train-tip')!;
  again.addEventListener('click', () => {
    closeEnd();
    match.restart();
    spotNext();
    restarted(again);
  });
  // A challenge link set this match up: say so once, where a restart would.
  if (challenge) {
    window.setTimeout(() => say(t.match.challenge(match.rivals, DIFFICULTY_LABEL[match.difficulty]), 3200), 900);
  }
  // Won and left before playing again: the next visit's first match shows it.
  if (spotState() === 'next') window.setTimeout(spotNext, 1200);

  return {
    /** The victory card's score, button row and share section, filled by the ranking for a match that counts. */
    endSlots: { score: scored, actions: ends, share: shared },
    /** The New game card is open (the game holds still meanwhile). */
    get picking() {
      return pickerOpen;
    },
    /** A short note in the toast spot (the horde's waves). */
    say,
    /** A line in the end card's score block (a horde that never cleared a wave cannot be ranked). */
    note(text: string) {
      scored.hidden = false;
      scored.innerHTML = `<p class="note">${text}</p>`;
    },
    /**
     * `suggestTraining`: a lost first real match also offers training (no rivals), beside playing again.
     * `horde`: the wave reached and how long it took, for the horde's own card.
     */
    showEnd(outcome: Outcome, suggestTraining = false, horde?: { wave: number; durationMs: number }) {
      for (const slot of [scored, shared]) {
        slot.hidden = true;
        slot.innerHTML = '';
      }
      for (const extra of ends.querySelectorAll('.match-btn:not(.again)')) extra.remove();
      const n = match.rivals;
      const level = DIFFICULTY_LABEL[match.difficulty];
      const won = outcome === 'victory';
      ending(won);
      end.className = horde ? 'defeat horde' : won ? 'victory' : 'defeat';
      end.querySelector('h2')!.textContent = horde ? t.match.hordeOver : won ? t.match.victory : t.match.defeat;
      const line = end.querySelector('p')!;
      if (horde) line.innerHTML = t.match.hordeReached(horde.wave, formatTime(horde.durationMs));
      else line.textContent = won ? t.match.won(n, level) : t.match.lost(level);
      end.setAttribute('aria-label', horde ? t.match.hordeOver : won ? t.match.victoryAria : t.match.defeat);
      tip.hidden = won || !suggestTraining;
      if (!tip.hidden) {
        const train = document.createElement('button');
        train.type = 'button';
        train.className = 'match-btn view train';
        train.innerHTML = `${rivalsIcon(0)}<span class="cap">${t.match.train}</span>`;
        train.addEventListener('click', () => start('training', undefined, undefined, trainBtn));
        ends.prepend(train);
      }
      end.hidden = false;
      void end.offsetWidth; // let the fade-in start from hidden
      end.classList.add('show');
      // Focused for the keyboard, without a ring on touch (focusVisible is ignored where unsupported).
      again.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
      if (won && spotState() === null) setSpot('next');
    },
  };
}
