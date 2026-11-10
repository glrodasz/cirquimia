import type * as THREE from 'three';
import { shapeIcon } from './ammo';
import { downArrow } from './icons';
import { t } from './i18n';

type Fluid = 'fire' | 'water';
const STORE = 'cirquimia.sources'; // the elements still to charge, as JSON; absent = never started
const LIFT = 0.45; // world units above the source's centre where the arrow points
const TOP_CLEAR = 140; // px: a label this high would sit under the HUD, so it hangs below the source instead

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
 * After the first match's wall lesson: a note over the nearest campfire and lagoon ("draw ▲ here", "draw ▽ here")
 * until the player has charged each element once. It never blocks taps or strokes, and survives new matches.
 */
export class SourceHints {
  private left: Fluid[] = load() ?? [];
  private readonly labels: Record<Fluid, HTMLElement>;

  constructor(private readonly host: SourceHintsHost) {
    const label = (element: Fluid) => {
      const el = document.createElement('div');
      el.className = `src-hint ${element}`;
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = `<span>${shapeIcon(element === 'fire' ? 'triangle' : 'triangleDown', true)}${t.sources.drawHere}</span>${downArrow()}`;
      el.hidden = true;
      document.body.append(el);
      return el;
    };
    this.labels = { fire: label('fire'), water: label('water') };
  }

  /** Hints are still owed: the meadow must keep a campfire and a lagoon. */
  get active() {
    return this.left.length > 0;
  }

  /** The tutorial is over: point out both sources. */
  start() {
    if (load() !== null) return; // already shown once (or finished) on this device
    this.left = ['fire', 'water'];
    save(this.left);
  }

  /** The player charged this element. Returns whether that was a first time the hints were waiting for. */
  charged(element: Fluid): boolean {
    if (!this.left.includes(element)) return false;
    this.left = this.left.filter((e) => e !== element);
    save(this.left);
    this.labels[element].hidden = true;
    return true;
  }

  update() {
    const covered = this.host.covered();
    for (const element of ['fire', 'water'] as const) {
      const el = this.labels[element];
      const at = this.left.includes(element) && !covered ? this.host.find(element) : null;
      el.hidden = !at;
      if (!at) continue;
      let p = this.host.toScreen(at, LIFT);
      const below = p.y < TOP_CLEAR;
      if (below) p = this.host.toScreen(at, -0.15);
      el.classList.toggle('below', below);
      el.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
    }
  }
}
