import type * as THREE from 'three';
import { brushPath, type Pt } from './ammo';
import { segment } from './match';

type Fluid = 'fire' | 'water';
const STORE = 'cirquimia.sources'; // the elements still to charge, as JSON; absent = never started
const DRAW = 1.6; // s the demo hand takes to trace the triangle
const HOLD = 0.8; // s it lingers before tracing again

/** The triangle traced over the source in a 48×48 box, from its apex round and a little past the start. */
function triangleLine(element: Fluid): Pt[] {
  const c: Pt[] = element === 'fire' ? [[24, 7], [42, 39], [6, 39], [24, 7], [28, 14]] : [[24, 41], [6, 9], [42, 9], [24, 41], [28, 34]];
  return c.slice(1).flatMap((p, i) => segment(c[i], p).slice(i ? 1 : 0));
}

function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
}

export interface SourceHintsHost {
  /** The source of that element the alchemist would draw from now, or null when none is on screen. */
  find(element: Fluid): THREE.Vector3 | null;
  toScreen(p: THREE.Vector3, lift: number): { x: number; y: number };
  /** A card, a lesson or a finished match covers the meadow. */
  covered(): boolean;
}

function load(): Fluid[] | null {
  try {
    if (new URLSearchParams(location.search).has('tutorial')) localStorage.removeItem(STORE); // ?tutorial replays these too
    const v = JSON.parse(localStorage.getItem(STORE) ?? 'null');
    return Array.isArray(v) ? v.filter((e): e is Fluid => e === 'fire' || e === 'water') : null;
  } catch {
    return null;
  }
}

function save(left: Fluid[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(left));
  } catch {
    // Blocked storage: the hints show again next visit.
  }
}

/**
 * After the first match's wall lesson, fire then water: a hand traces the triangle in a loop right over the nearest
 * campfire (then lagoon), the way the tutorial shows the square and the circle, without pausing the game. Once that
 * element is charged the next one is shown. It never blocks taps or strokes, and survives new matches.
 */
export class SourceHints {
  private left: Fluid[] = load() ?? [];
  private readonly demo = document.createElement('div');
  private time = 0;

  constructor(private readonly host: SourceHintsHost) {
    this.demo.className = 'src-demo';
    this.demo.setAttribute('aria-hidden', 'true');
    this.demo.hidden = true;
    document.body.append(this.demo);
  }

  /** Hints are still owed: the meadow must keep a campfire and a lagoon. */
  get active() {
    return this.left.length > 0;
  }

  /** The tutorial is over: fire first, then water. */
  start() {
    if (load() !== null) return; // already shown once (or finished) on this device
    this.left = ['fire', 'water'];
    this.time = 0;
    save(this.left);
  }

  /** The player charged this element. Returns whether it was the one being shown (so its note pops). */
  charged(element: Fluid): boolean {
    if (this.left[0] !== element) {
      // Charged the other one first: it still counts, but quietly.
      if (this.left.includes(element)) {
        this.left = this.left.filter((e) => e !== element);
        save(this.left);
      }
      return false;
    }
    this.left.shift();
    this.time = 0;
    save(this.left);
    return true;
  }

  update(dt: number) {
    const element = this.left[0];
    const at = element && !this.host.covered() ? this.host.find(element) : null;
    this.demo.hidden = !at;
    if (!at) return;
    const p = this.host.toScreen(at, 0);
    this.demo.className = `src-demo ${element}`;
    this.demo.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
    this.time = (this.time + dt) % (DRAW + HOLD);
    const line = triangleLine(element);
    const t = Math.min(1, this.time / DRAW);
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    const drawn = line.slice(0, Math.max(2, Math.round(line.length * eased)));
    const ink = brushPath(drawn, 3.4, seeded(7), [0]);
    const [fx, fy] = drawn[drawn.length - 1];
    const fade = this.time > DRAW ? 1 - (this.time - DRAW) / HOLD : 1;
    const guide = line.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join('');
    this.demo.innerHTML =
      `<svg viewBox="0 0 48 48"><path class="guide" d="${guide}"/>` +
      `<g style="opacity:${fade.toFixed(2)}"><path class="stroke" d="${ink.ink}"/>` +
      (t < 1 ? `<circle class="finger" cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="3.2"/>` : '') +
      '</g></svg>';
  }
}
