import { brushPath, ensoLine, type Pt } from './ammo';
import { DIFFICULTY_LABEL, MAX_RIVALS, type Difficulty } from './combat';

const STORE = 'cirquimia.match';
const OLD_STORE = 'cirquimia.dev'; // where the gear panel kept these before they moved to the HUD
const LEVELS = Object.keys(DIFFICULTY_LABEL) as Difficulty[];
const STEP = 0.7;

/** What the HUD needs from the game: the current match and a way to restart it. */
export interface MatchControls {
  readonly rivals: number;
  readonly difficulty: Difficulty;
  setRivals(count: number): void;
  setDifficulty(level: Difficulty): void;
}

interface Saved {
  rivals?: number;
  difficulty?: Difficulty;
}

function load(): Saved {
  try {
    const own = JSON.parse(localStorage.getItem(STORE) ?? 'null') as Saved | null;
    if (own) return own;
    const old = JSON.parse(localStorage.getItem(OLD_STORE) ?? '{}') as Saved;
    return { rivals: old.rivals, difficulty: old.difficulty };
  } catch {
    return {};
  }
}

function save(s: Saved) {
  try {
    localStorage.setItem(STORE, JSON.stringify(s));
  } catch {
    // Private mode or blocked storage: the match just won't persist.
  }
}

function random() {
  let seed = (Math.random() * 2 ** 31) | 0;
  return () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
}

function arc(cx: number, cy: number, r: number, from: number, to: number): Pt[] {
  const line: Pt[] = [];
  const n = Math.ceil((r * Math.abs(to - from)) / STEP);
  for (let i = 0; i <= n; i++) {
    const a = from + ((to - from) * i) / n;
    line.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return line;
}

function segment(a: Pt, b: Pt): Pt[] {
  const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / STEP);
  return Array.from({ length: n + 1 }, (_, i): Pt => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
}

/** A little figure in two strokes: head loop and shoulders. */
function person(cx: number, s: number, cls: string, rand: () => number) {
  const head = brushPath(arc(cx, 24 - 8 * s, 5 * s, -2 + rand(), -2 + rand() + Math.PI * 2.1), 3.4 * s, rand);
  const body = brushPath(arc(cx, 24 + 12 * s, 9.5 * s, Math.PI * 1.02, Math.PI * 1.98), 4.4 * s, rand);
  return { ink: `<path class="${cls}" d="${head.ink}${body.ink}"/>`, dry: head.dry + body.dry };
}

let svgId = 0;
function svg(parts: Array<{ ink: string; dry: string }>, rand: () => number) {
  const ring = brushPath(ensoLine(rand), 2.2, rand);
  const id = `hudbrush${++svgId}`;
  const dry = parts.map((p) => p.dry).join('') + ring.dry;
  return (
    `<svg viewBox="0 0 48 48" aria-hidden="true">` +
    `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">` +
    `<rect width="48" height="48" fill="#fff"/><path d="${dry}" fill="#000"/></mask>` +
    `<g mask="url(#${id})"><path class="ring" d="${ring.ink}"/>${parts.map((p) => p.ink).join('')}</g></svg>`
  );
}

/** One figure per rival in its coat's ink; a faint one when nobody is sparring. */
function rivalsIcon(count: number) {
  const rand = random();
  if (count === 0) return svg([person(24, 1, 'faint', rand)], rand);
  if (count === 1) return svg([person(24, 1, 'red', rand)], rand);
  return svg([person(18, 0.8, 'red', rand), person(30.5, 0.8, 'green', rand)], rand);
}

/** Three brush bars, inked up to the difficulty level, like a signal meter. */
function levelIcon(level: Difficulty) {
  const rand = random();
  const filled = LEVELS.indexOf(level) + 1;
  const bars = [0, 1, 2].map((i) => {
    const x = 15 + i * 9 + (rand() - 0.5) * 0.8;
    const top = 27 - i * 6.5;
    const b = brushPath(segment([x, 36], [x + (rand() - 0.5), top]), 5, rand);
    return { ink: `<path class="${i < filled ? 'glyph' : 'faint'}" d="${b.ink}"/>`, dry: b.dry };
  });
  return svg(bars, rand);
}

/**
 * Player-facing match controls, top left (the gear on the right is for developers):
 * how many rivals to spar with and how hard they play. Each tap cycles the value and restarts the match.
 */
export function mountMatchControls(match: MatchControls) {
  const saved = load();
  if (saved.difficulty && LEVELS.includes(saved.difficulty)) match.setDifficulty(saved.difficulty);
  if (saved.rivals !== undefined) match.setRivals(saved.rivals);

  const box = document.createElement('div');
  box.id = 'match';
  box.setAttribute('role', 'toolbar');
  box.setAttribute('aria-label', 'Partida');

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
    rivalsBtn.querySelector('.cap')!.innerHTML = `<b>${n}</b> ${n === 1 ? 'rival' : 'rivales'}`;
    rivalsBtn.setAttribute('aria-label', `Rivales: ${n}. Toca para cambiar y reiniciar la partida`);
    levelBtn.querySelector('.disc')!.innerHTML = levelIcon(level);
    levelBtn.querySelector('.cap')!.textContent = DIFFICULTY_LABEL[level];
    levelBtn.setAttribute('aria-label', `Dificultad: ${DIFFICULTY_LABEL[level]}. Toca para cambiar y reiniciar la partida`);
    save({ rivals: n, difficulty: level });
  };

  let toastTimer = 0;
  const restarted = (b: HTMLElement) => {
    render();
    b.animate([{ transform: 'scale(.86)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
    const n = match.rivals;
    toast.textContent = `Nueva partida · ${n === 0 ? 'sin rivales' : n === 1 ? '1 rival' : `${n} rivales`} · ${DIFFICULTY_LABEL[match.difficulty]}`;
    toast.classList.remove('show');
    void toast.offsetWidth; // restart the fade when tapping quickly
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1600);
  };

  rivalsBtn.addEventListener('click', () => {
    match.setRivals((match.rivals + 1) % (MAX_RIVALS + 1));
    restarted(rivalsBtn);
  });
  levelBtn.addEventListener('click', () => {
    match.setDifficulty(LEVELS[(LEVELS.indexOf(match.difficulty) + 1) % LEVELS.length]);
    restarted(levelBtn);
  });

  render();
}
