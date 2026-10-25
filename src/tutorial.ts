import type * as THREE from 'three';
import { brushPath, type Pt } from './ammo';
import { arc, segment } from './match';
import type { ShapeKind } from './gestures';
import { t } from './i18n';

const STORE = 'cirquimia.tutorial'; // 'square' once the attack lesson is done, 'done' after the wall one too
const START_DELAY = 0.6; // s after the help card closes before the first lesson shows
const HIT_PAUSE = 0.7; // s after the first hit taken, so the damage number reads before the wall lesson
const WATCH_SQUARE = 1.4; // s to watch the guaranteed strike land
const PROVOKE_AFTER = 0.35; // s after the wall rises before the rival strikes into it
const WATCH_WALL = 1.6;
const DEMO_DRAW = 1.7; // s the demo hand takes to draw the shape
const DEMO_HOLD = 0.8;

type Lesson = 'square' | 'circle';
type Step = 'draw' | 'pick' | 'aim' | 'watch';

const TEXT: Record<Lesson, Record<Exclude<Step, 'watch'>, [string, string]> & { watch: string; done: string }> = t.tutorial;
const WRONG: Record<Lesson, string> = t.tutorial.wrong;

/** What the lessons need from the game. */
export interface TutorialHost {
  /** Whether another card (the help guide, a finished match) is in front of the game. */
  covered(): boolean;
  /** The first standing rival, or null when there is nobody to spar with. */
  foe(): THREE.Vector3 | null;
  /** Screen pixels of a world point, roughly at head height. */
  toScreen(p: THREE.Vector3, lift: number): { x: number; y: number };
  /** The bar slot holding a shape of this kind, if any. */
  slot(kind: ShapeKind): HTMLElement | null;
  /** The shape currently picked in the bar. */
  selected(): ShapeKind | null;
  deselect(): void;
  /** Freezes or frees the rivals while a cast plays out. */
  hold(on: boolean): void;
  /** The rival strikes the alchemist right away. */
  provoke(): void;
}

function load(): '' | Lesson | 'done' {
  try {
    if (new URLSearchParams(location.search).has('tutorial')) localStorage.removeItem(STORE); // ?tutorial replays it
    const v = localStorage.getItem(STORE);
    return v === 'square' ? 'square' : v === 'done' ? 'done' : '';
  } catch {
    return '';
  }
}

function save(v: 'square' | 'done') {
  try {
    localStorage.setItem(STORE, v);
  } catch {
    // Blocked storage: the lessons show again next visit.
  }
}

function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
}

/** The demo stroke in a 48×48 box, the way a hand draws it: from a corner, round, a little past the start. */
function demoLine(kind: Lesson): Pt[] {
  if (kind === 'circle') return arc(24, 24, 15, -2.3, -2.3 + Math.PI * 2.12);
  const c: Pt[] = [[10, 10], [38, 10], [38, 38], [10, 38], [10, 10], [17, 10]];
  return c.slice(1).flatMap((p, i) => segment(c[i], p).slice(i ? 1 : 0));
}

/** A brush arrow pointing down. */
function arrowSvg() {
  const rand = seeded(7);
  const shaft = brushPath(segment([24, 4], [24, 40]), 4.6, rand);
  const head = brushPath([...segment([12, 27], [24, 41]), ...segment([24, 41], [36, 27]).slice(1)], 4.6, rand, [18]);
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="${shaft.ink}${head.ink}"/></svg>`;
}

/**
 * The first match, walked through: draw a square, find it in the bar, pick it, tap the rival (a sure hit).
 * The first time the alchemist is hit, the same for the circle, and the rival's next strike breaks on the wall.
 * The game holds still while a lesson waits on the player.
 */
export class Tutorial {
  private stage = load();
  private lesson: Lesson | null = null;
  private step: Step = 'draw';
  private timer = 0;
  private wait = START_DELAY;
  private hitWait = -1;
  /** The wall lesson, put off because no rival was left to show it on. */
  private pending: Lesson | null = null;
  private provoked = false;
  private demoTime = 0;

  private readonly root = document.createElement('div');
  private readonly dim = document.createElement('div');
  private readonly demo = document.createElement('div');
  private readonly arrow = document.createElement('div');
  private readonly card = document.createElement('div');
  private readonly title = document.createElement('b');
  private readonly body = document.createElement('span');
  private hintTimer = 0;

  constructor(private readonly host: TutorialHost) {
    this.root.id = 'tutorial';
    this.root.hidden = true;
    this.dim.className = 'dim';
    this.demo.className = 'demo';
    this.arrow.className = 'arrow';
    this.arrow.innerHTML = arrowSvg();
    this.card.className = 'tip';
    this.card.setAttribute('role', 'status');
    this.card.append(this.title, this.body);
    this.root.append(this.dim, this.demo, this.arrow, this.card);
    document.body.append(this.root);
  }

  /** True while a lesson waits on the player: the match holds still. */
  get paused() {
    return this.lesson !== null && this.step !== 'watch';
  }

  /** Whether a stroke on the map counts as drawing right now. */
  get canDraw() {
    return this.lesson === null || this.step === 'draw';
  }

  /** Whether a tap on the map does anything right now. */
  get canTap() {
    return this.lesson === null || this.step === 'aim';
  }

  /** A shape was recognized (or null, a scribble). False keeps it out of the bar: the lesson wants another one. */
  drawn(kind: ShapeKind | null) {
    if (!this.lesson || this.step !== 'draw') return true;
    if (kind === this.lesson) {
      this.go('pick');
      return true;
    }
    this.hint(WRONG[this.lesson]);
    return false;
  }

  /** Where a tap lands while aiming: always on the rival, so the first strike cannot miss. */
  aim(): THREE.Vector3 | null {
    return this.lesson && this.step === 'aim' ? this.host.foe() : null;
  }

  /** The lesson's shape was cast; watch it play out. */
  cast() {
    if (!this.lesson || this.step !== 'aim') return;
    this.host.hold(true);
    this.provoked = false;
    this.go('watch');
  }

  /** The alchemist took a hit: the first one opens the wall lesson. */
  hurt() {
    if (this.stage === 'square' && !this.lesson && !this.pending && this.hitWait < 0) this.hitWait = HIT_PAUSE;
  }

  /** A new match: a lesson under way starts over on the fresh meadow. */
  reset() {
    this.host.hold(false);
    this.hitWait = -1;
    if (this.lesson) this.begin(this.lesson);
  }

  update(dt: number) {
    const covered = this.host.covered();
    this.root.classList.toggle('covered', covered);
    if (covered) return;

    if (!this.lesson) {
      if (this.stage === '' && this.host.foe() && (this.wait -= dt) <= 0) this.begin('square');
      if (this.hitWait >= 0 && (this.hitWait -= dt) < 0) this.pending = 'circle';
      if (this.pending === 'circle' && this.host.foe()) this.begin('circle');
      return;
    }
    // Nobody left to spar with (e.g. switched to 0 rivals): shelve the lesson until a rival is back.
    if (!this.host.foe()) {
      this.shelve();
      return;
    }
    this.timer += dt;

    if (this.step === 'draw') this.animateDemo(dt);
    else if (this.step === 'pick') {
      const picked = this.host.selected();
      if (picked === this.lesson) this.go('aim');
      else if (picked) this.host.deselect();
      this.point(this.host.slot(this.lesson));
    } else if (this.step === 'aim') {
      if (this.host.selected() !== this.lesson) this.go('pick');
      else this.pointAtFoe();
    } else if (this.step === 'watch') {
      if (this.lesson === 'circle' && !this.provoked && this.timer >= PROVOKE_AFTER) {
        this.provoked = true;
        this.host.provoke();
      }
      if (this.timer >= (this.lesson === 'square' ? WATCH_SQUARE : WATCH_WALL)) this.finish();
    }
  }

  private begin(lesson: Lesson) {
    this.lesson = lesson;
    this.pending = null;
    this.root.hidden = false;
    this.root.dataset.lesson = lesson;
    void this.root.offsetWidth;
    this.root.classList.add('show');
    this.go('draw');
  }

  private go(step: Step) {
    this.step = step;
    this.timer = 0;
    this.demoTime = 0;
    this.root.dataset.step = step;
    const text = TEXT[this.lesson!];
    if (step === 'watch') this.say(text.watch, '');
    else this.say(...text[step]);
    if (step !== 'draw') this.demo.innerHTML = '';
  }

  private shelve() {
    this.host.hold(false);
    this.host.deselect();
    this.pending = this.lesson === 'circle' ? 'circle' : null;
    this.lesson = null;
    this.root.classList.remove('show');
    this.root.hidden = true;
  }

  private finish() {
    const lesson = this.lesson!;
    this.host.hold(false);
    this.lesson = null;
    this.stage = lesson === 'square' ? 'square' : 'done';
    save(this.stage);
    this.root.dataset.step = 'done';
    this.say(TEXT[lesson].done, '');
    clearTimeout(this.hintTimer);
    this.hintTimer = window.setTimeout(() => {
      if (this.lesson) return;
      this.root.classList.remove('show');
      setTimeout(() => {
        if (!this.lesson) this.root.hidden = true;
      }, 300);
    }, 2200);
  }

  private say(title: string, body: string) {
    this.title.textContent = title;
    this.body.textContent = body;
    this.body.hidden = !body;
    this.card.classList.remove('wrong');
    this.card.animate([{ transform: 'translate(-50%, -6px)', opacity: 0 }, { transform: 'translate(-50%, 0)', opacity: 1 }], { duration: 260, easing: 'ease-out' });
  }

  private hint(text: string) {
    this.body.textContent = text;
    this.body.hidden = false;
    this.card.classList.add('wrong');
    this.card.animate([0, -6, 6, -4, 4, 0].map((x) => ({ transform: `translate(calc(-50% + ${x}px), 0)` })), { duration: 300 });
  }

  /** The hand draws the shape over and over, slowly enough to follow, with a faint dashed guide underneath. */
  private animateDemo(dt: number) {
    this.demoTime = (this.demoTime + dt) % (DEMO_DRAW + DEMO_HOLD);
    const line = demoLine(this.lesson!);
    const t = Math.min(1, this.demoTime / DEMO_DRAW);
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    const n = Math.max(2, Math.round(line.length * eased));
    const drawn = line.slice(0, n);
    const ink = brushPath(drawn, 3.4, seeded(11), this.lesson === 'square' ? [0, 28, 56, 84, 112] : []);
    const [fx, fy] = drawn[drawn.length - 1];
    const fade = this.demoTime > DEMO_DRAW ? 1 - (this.demoTime - DEMO_DRAW) / DEMO_HOLD : 1;
    const guide = line.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
    this.demo.innerHTML =
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path class="guide" d="${guide}"/>` +
      `<g style="opacity:${fade.toFixed(2)}"><path class="stroke" d="${ink.ink}"/>` +
      (t < 1 ? `<circle class="finger" cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="3.2"/>` : '') +
      '</g></svg>';
    this.spot(innerWidth / 2, innerHeight * 0.42, 110);
  }

  private pointAtFoe() {
    const foe = this.host.foe();
    if (!foe) return;
    const head = this.host.toScreen(foe, 0.75);
    const feet = this.host.toScreen(foe, 0.3);
    this.placeArrow(head.x, head.y - 18);
    this.spot(feet.x, feet.y, 60);
  }

  /** Arrow over an element, and a pool of light on it. */
  private point(el: HTMLElement | null) {
    if (!el) return;
    const box = el.getBoundingClientRect();
    this.placeArrow(box.left + box.width / 2, box.top - 6);
    this.spot(box.left + box.width / 2, box.top + box.height / 2, box.width * 0.75);
  }

  private placeArrow(x: number, bottom: number) {
    this.arrow.style.transform = `translate(${x.toFixed(1)}px, ${bottom.toFixed(1)}px)`;
  }

  private spot(x: number, y: number, r: number) {
    this.dim.style.setProperty('--x', `${x.toFixed(1)}px`);
    this.dim.style.setProperty('--y', `${y.toFixed(1)}px`);
    this.dim.style.setProperty('--r', `${r.toFixed(1)}px`);
  }
}
