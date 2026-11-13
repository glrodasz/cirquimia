import { downArrow } from './icons';
import type * as THREE from 'three';
import { brushPath, type Pt } from './ammo';
import { arc, segment } from './match';
import type { ShapeKind } from './gestures';
import { t } from './i18n';
import { hand } from './help';
import { hasKeyboard } from './keys';
import { padEnabled } from './pad';

// The last lesson behind the player: 'moved' after the walk, then each lesson's own name, 'done' once the duel begins.
const STORE = 'cirquimia.tutorial';
const START_DELAY = 0.6; // s after the help card closes before the first lesson shows
const PROVOKE_AFTER = 0.35; // s after the wall rises before the rival strikes into it
const DEMO_DRAW = 1.7; // s the demo hand takes to draw the shape
const DEMO_HOLD = 0.8;
const GOAL_REACH = 0.3; // world units from the mark that count as arrived
const SHOW_ALT = 2.8; // s the walking lesson first shows the stick (or the keys) swaying side to side
const SHOW_TAP = 1.8; // s it then shows the hand tapping the mark, before the stick again
const STARTED = 0.12; // world units the alchemist has to move for the lesson to stop showing how
const NO_SOURCE = 1.5; // s a fire or water lesson waits for its source to be on screen before it is skipped

type Shape = 'square' | 'circle' | 'triangle' | 'triangleDown';
type Lesson = 'move' | 'goal' | Shape | 'duel';
type Step = 'walk' | 'read' | 'draw' | 'aim' | 'watch';
type Stage = '' | 'moved' | Exclude<Lesson, 'move' | 'duel'> | 'done';
/** What the walking lesson shows right now: the tap, the other way (stick or keys), or nothing once the alchemist walks. */
type WalkShow = 'tap' | 'alt' | 'go';

/** The lessons in order. The rival stands still through all of them, and only fights once the duel card is accepted. */
const ORDER: Lesson[] = ['move', 'goal', 'square', 'circle', 'triangle', 'triangleDown', 'duel'];
const STAGES: Stage[] = ['moved', 'goal', 'square', 'circle', 'triangle', 'triangleDown', 'done'];
/** How long each lesson's closing line stays before the next lesson, in seconds. */
const AFTER: Record<Lesson, number> = { move: 1.4, goal: 0.4, square: 2, circle: 1.6, triangle: 2.4, triangleDown: 3.2, duel: 1.6 };
/** How long a cast plays out before its lesson closes. */
const WATCH: Record<Shape, number> = { square: 1.4, circle: 1.6, triangle: 1.5, triangleDown: 1.5 };
/** The source a triangle is drawn over. */
const SOURCE: Partial<Record<Shape, 'fire' | 'water'>> = { triangle: 'fire', triangleDown: 'water' };

const TEXT: Record<Shape, Record<'draw' | 'aim', [string, string]> & { watch: string; done: string }> = t.tutorial;
const WRONG: Record<Shape, string> = t.tutorial.wrong;

/** What the lessons need from the game. */
export interface TutorialHost {
  /** Whether another card (the help guide, a finished match) is in front of the game. */
  covered(): boolean;
  /** The first standing rival, or null when there is nobody to spar with. */
  foe(): THREE.Vector3 | null;
  /** Screen pixels of a world point, roughly at head height. */
  toScreen(p: THREE.Vector3, lift: number): { x: number; y: number };
  /** The shape currently in hand. */
  selected(): ShapeKind | null;
  /** Drops the shape in hand. */
  deselect(): void;
  /** Freezes or frees the rivals while a cast plays out. */
  hold(on: boolean): void;
  /** The rival strikes the alchemist right away. */
  provoke(): void;
  /** Where the alchemist stands. */
  hero(): THREE.Vector3;
  /** A clear spot on screen a short walk from the alchemist, for the walking lesson. */
  walkGoal(): THREE.Vector3 | null;
  /** The campfire (or lagoon) to draw over, when one is on screen. */
  source(element: 'fire' | 'water'): THREE.Vector3 | null;
  /** The duel card was accepted: everyone back to full health, and the rival starts fighting. */
  duel(): void;
}

function load(): Stage {
  try {
    if (new URLSearchParams(location.search).has('tutorial')) localStorage.removeItem(STORE); // ?tutorial replays it
    const v = localStorage.getItem(STORE) as Stage | null;
    return v && STAGES.includes(v) ? v : '';
  } catch {
    return '';
  }
}

function save(v: Stage) {
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
function demoLine(kind: Shape): Pt[] {
  if (kind === 'circle') return arc(24, 24, 15, -2.3, -2.3 + Math.PI * 2.12);
  const c: Pt[] =
    kind === 'square'
      ? [[10, 10], [38, 10], [38, 38], [10, 38], [10, 10], [17, 10]]
      : kind === 'triangle'
        ? [[24, 7], [42, 39], [6, 39], [24, 7], [28, 14]]
        : [[24, 41], [6, 9], [42, 9], [24, 41], [28, 34]];
  return c.slice(1).flatMap((p, i) => segment(c[i], p).slice(i ? 1 : 0));
}

const isShape = (l: Lesson | null): l is Shape => l === 'square' || l === 'circle' || l === 'triangle' || l === 'triangleDown';

/**
 * The first match, walked through at the player's pace while the rival stands still as a sparring partner: walk to a
 * mark, meet the rival and the goal (empty its health bar), draw a square and strike it, raise a wall against its
 * strike, charge fire over a campfire and water over a lagoon and cast them, and then a card asks whether to start the
 * duel. Only then does the rival move and fight, with everyone back at full health.
 */
export class Tutorial {
  private stage = load();
  private lesson: Lesson | null = null;
  private step: Step = 'draw';
  private timer = 0;
  private wait = START_DELAY;
  private provoked = false;
  private demoTime = 0;
  /** The walking lesson's mark on the ground. */
  private goal: THREE.Vector3 | null = null;
  /** Where the alchemist stood when the walking lesson began, to see when it starts walking. */
  private from: { x: number; z: number } | null = null;
  private walkShow: WalkShow = 'tap';
  /** The stick, or the keycaps on a desktop, that the walking lesson lights up after the tap. */
  private alt: HTMLElement | null = null;
  /** The spotlight as drawn, easing toward where it should be. */
  private lit: { x: number; y: number; r: number } | null = null;

  private readonly root = document.createElement('div');
  private readonly dim = document.createElement('div');
  private readonly demo = document.createElement('div');
  private readonly arrow = document.createElement('div');
  /** The walking lesson: a glowing mark on the ground with a hand tapping it, and a hand on the stick. */
  private readonly mark = document.createElement('div');
  private readonly padHand = document.createElement('div');
  private readonly card = document.createElement('div');
  private readonly title = document.createElement('b');
  private readonly body = document.createElement('span');
  /** Goes on from a lesson that is only read (the goal, the duel). */
  private readonly next = document.createElement('button');
  private hintTimer = 0;
  private shown = 0;

  constructor(private readonly host: TutorialHost) {
    this.root.id = 'tutorial';
    this.root.hidden = true;
    this.dim.className = 'dim';
    this.demo.className = 'demo';
    this.arrow.className = 'arrow';
    this.arrow.innerHTML = downArrow();
    this.card.className = 'tip';
    this.card.setAttribute('role', 'status');
    this.next.type = 'button';
    this.next.className = 'next';
    this.next.hidden = true;
    this.next.addEventListener('click', () => {
      if (this.step === 'read') this.finish();
    });
    this.card.append(this.title, this.body, this.next);
    this.mark.className = 'mark';
    this.mark.innerHTML = `<i></i><svg viewBox="-16 -8 40 40" aria-hidden="true">${hand(0, 0, 1, true)}</svg>`;
    this.padHand.className = 'pad-hand';
    this.padHand.innerHTML = `<svg viewBox="-16 -8 40 40" aria-hidden="true">${hand(0, 0, 1, false)}</svg>`;
    this.root.append(this.dim, this.mark, this.padHand, this.demo, this.arrow, this.card);
    document.body.append(this.root);
  }

  /** A lesson or a note is on screen. */
  get showing() {
    return !this.root.hidden && this.root.classList.contains('show');
  }

  /** Every lesson is behind the player and the duel has begun. */
  get done() {
    return this.stage === 'done';
  }

  /**
   * True while a lesson waits on the player: the match holds still. Not while charging fire or water, where the
   * alchemist may need to walk closer to the source (the rival stands still anyway).
   */
  get paused() {
    if (this.lesson === null || this.step === 'watch' || this.step === 'walk') return false;
    return !(this.step === 'draw' && this.fromSource);
  }

  /** Whether a stroke on the map counts as drawing right now. */
  get canDraw() {
    return this.lesson === null || this.step === 'draw';
  }

  /** Whether a tap on the map does anything right now. */
  get canTap() {
    return this.lesson === null || this.step === 'aim' || this.step === 'walk' || (this.step === 'draw' && this.fromSource);
  }

  /** The lesson under way is charging fire or water over its source. */
  private get fromSource() {
    return isShape(this.lesson) && SOURCE[this.lesson] !== undefined;
  }

  /** A shape was recognized (or null, a scribble). False refuses it: the lesson wants another one. */
  drawn(kind: ShapeKind | null) {
    if (!isShape(this.lesson) || this.step !== 'draw') return true;
    if (kind === this.lesson) {
      this.go('aim'); // the new shape arrives in hand (a triangle drawn away from its source is refused: draw again)
      return true;
    }
    this.hint(WRONG[this.lesson]);
    return false;
  }

  /** Where a tap lands while aiming: always on the rival, so the lesson's strike cannot miss. */
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

  /** A new match: a lesson under way starts over on the fresh meadow. */
  reset() {
    this.host.hold(false);
    if (this.lesson) this.begin(this.lesson);
  }

  update(dt: number) {
    const covered = this.host.covered();
    this.root.classList.toggle('covered', covered);
    if (covered) return;

    if (!this.lesson) {
      if (this.done || (this.wait -= dt) > 0) return;
      const next = ORDER[STAGES.indexOf(this.stage as Exclude<Stage, ''>) + 1] ?? 'move';
      if (next === 'move' || this.host.foe()) this.begin(next);
      return;
    }
    if (this.lesson === 'move') {
      this.walkLesson(dt);
      return;
    }
    // Nobody left to spar with (e.g. switched to 0 rivals): shelve the lesson until a rival is back.
    if (!this.host.foe()) {
      this.shelve();
      return;
    }
    this.timer += dt;

    if (this.step === 'read') this.pointAtFoe(this.lesson === 'goal');
    else if (this.step === 'draw') this.animateDemo(dt);
    else if (this.step === 'aim') {
      if (this.host.selected() !== this.lesson) this.go('draw'); // dropped, or drawn away from its source: draw it again
      else this.pointAtFoe(true);
    } else if (this.step === 'watch') {
      if (this.lesson === 'circle' && !this.provoked && this.timer >= PROVOKE_AFTER) {
        this.provoked = true;
        this.host.provoke();
      }
      if (this.timer >= WATCH[this.lesson as Shape]) this.finish();
    }
  }

  private begin(lesson: Lesson) {
    this.shown++;
    clearTimeout(this.hintTimer);
    this.lesson = lesson;
    this.root.hidden = false;
    this.root.dataset.lesson = lesson;
    void this.root.offsetWidth;
    this.root.classList.add('show');
    if (lesson === 'move') {
      this.goal = this.host.walkGoal();
      if (!this.goal) {
        // Nowhere clear to walk to: skip straight to the next lesson.
        this.skip();
        return;
      }
      this.go('walk');
    } else if (lesson === 'goal' || lesson === 'duel') this.go('read');
    else this.go('draw');
  }

  /** Passes over a lesson that cannot be shown here (no clear spot to walk to, no source on screen). */
  private skip() {
    const lesson = this.lesson!;
    this.lesson = null;
    this.stage = STAGES[ORDER.indexOf(lesson)];
    save(this.stage);
    this.wait = 0;
    this.root.classList.remove('show');
    this.root.hidden = true;
  }

  /**
   * Each frame of the walking lesson: keep the mark on the ground and finish once the alchemist stands on it. Until it
   * starts walking, the lesson shows one way at a time: the stick (or the keys) lit up and swaying side to side, then
   * the hand tapping the mark, and over again, so either one reads as enough.
   */
  private walkLesson(dt: number) {
    const goal = this.goal!;
    const at = this.host.toScreen(goal, 0);
    this.mark.style.transform = `translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px)`;
    const hero = this.host.hero();
    if (this.walkShow !== 'go' && this.from && Math.hypot(hero.x - this.from.x, hero.z - this.from.z) > STARTED) this.show('go');
    let spot = { x: at.x, y: at.y, r: 70 };
    if (this.walkShow !== 'go' && this.alt) {
      this.timer = (this.timer + dt) % (SHOW_ALT + SHOW_TAP);
      const next: WalkShow = this.timer < SHOW_ALT ? 'alt' : 'tap';
      if (next !== this.walkShow) this.show(next);
      if (next === 'alt') {
        const r = this.alt.getBoundingClientRect();
        spot = { x: r.left + r.width / 2, y: r.top + r.height / 2, r: Math.max(r.width, r.height) / 2 + 18 };
        this.padHand.style.transform = `translate(${spot.x.toFixed(1)}px, ${spot.y.toFixed(1)}px)`;
      }
    }
    this.glide(spot, dt);
    if (Math.hypot(hero.x - goal.x, hero.z - goal.z) < GOAL_REACH) this.finish();
  }

  /** The light glides from one spot to the next rather than jumping. */
  private glide(spot: { x: number; y: number; r: number }, dt: number) {
    const k = this.lit ? 1 - Math.exp(-dt * 9) : 1;
    const lit = (this.lit ??= { ...spot });
    lit.x += (spot.x - lit.x) * k;
    lit.y += (spot.y - lit.y) * k;
    lit.r += (spot.r - lit.r) * k;
    this.spot(lit.x, lit.y, lit.r);
  }

  /** The stick on touch screens, else the keycaps on a desktop wide enough to show them. */
  private altWay(): HTMLElement | null {
    const el = document.getElementById(padEnabled() ? 'pad' : hasKeyboard() ? 'keys-hint' : '');
    return el && el.getClientRects().length ? el : null;
  }

  /** Switches what the walking lesson shows, and its line on the card. */
  private show(what: WalkShow) {
    this.walkShow = what;
    this.root.dataset.walk = what;
    this.alt?.classList.toggle('lit', what === 'alt');
    if (what === 'go') return;
    const move = t.tutorial.move;
    const touch = !hasKeyboard();
    // The tap comes second ("Or tap…") when there is a stick or keys to show first.
    const tap = this.alt ? (touch ? move.orTap : move.orClick) : touch ? move.tap : move.click;
    this.say(move.title, what === 'tap' ? tap : padEnabled() ? move.pad : move.keys);
  }

  /** Ends the walking lesson's show: the stick or the keys go back to how they were. */
  private unlight() {
    this.alt?.classList.remove('lit');
    this.alt = null;
    this.from = null;
    this.lit = null;
  }

  private go(step: Step) {
    this.step = step;
    this.timer = 0;
    this.demoTime = 0;
    this.root.dataset.step = step;
    this.next.hidden = step !== 'read';
    if (this.lesson === 'move') {
      this.root.classList.toggle('with-pad', padEnabled());
      this.demo.innerHTML = '';
      this.unlight();
      this.alt = this.altWay();
      const hero = this.host.hero();
      this.from = { x: hero.x, z: hero.z };
      this.show(this.alt ? 'alt' : 'tap');
      return;
    }
    if (step === 'read') {
      const text = t.tutorial[this.lesson as 'goal' | 'duel'];
      this.demo.innerHTML = '';
      this.say(text.title, text.body);
      this.next.textContent = text.button;
      return;
    }
    const text = TEXT[this.lesson as Shape];
    if (step === 'watch') this.say(text.watch, '');
    else this.say(...text[step as 'draw' | 'aim']);
    if (step !== 'draw') this.demo.innerHTML = '';
    const element = SOURCE[this.lesson as Shape];
    this.demo.className = element && step === 'draw' ? `demo at-source ${element}` : 'demo';
    if (!element || step !== 'draw') this.demo.style.left = this.demo.style.top = '';
  }

  private shelve() {
    this.host.hold(false);
    this.host.deselect();
    this.goal = null;
    this.unlight();
    this.lesson = null;
    this.next.hidden = true;
    this.root.classList.remove('show');
    this.root.hidden = true;
  }

  private finish() {
    const lesson = this.lesson!;
    this.host.hold(false);
    this.lesson = null;
    this.goal = null;
    this.unlight();
    this.next.hidden = true;
    this.root.dataset.walk = '';
    this.stage = STAGES[ORDER.indexOf(lesson)];
    save(this.stage);
    this.root.dataset.step = 'done';
    this.wait = AFTER[lesson];
    if (lesson === 'duel') this.host.duel();
    const line = lesson === 'move' ? t.tutorial.move.done : lesson === 'duel' ? t.tutorial.duelGo : lesson === 'goal' ? '' : TEXT[lesson].done;
    if (line) {
      this.say(line, '');
      this.fadeSoon(this.wait * 1000);
    } else {
      this.root.classList.remove('show');
    }
  }

  private fadeSoon(ms: number) {
    clearTimeout(this.hintTimer);
    const shown = ++this.shown; // a newer card or note cancels this fade, even halfway through it
    this.hintTimer = window.setTimeout(() => {
      if (this.lesson || shown !== this.shown) return;
      this.root.classList.remove('show');
      setTimeout(() => {
        if (!this.lesson && shown === this.shown) this.root.hidden = true;
      }, 300);
    }, ms);
  }

  private say(title: string, body: string) {
    this.title.textContent = title;
    this.body.textContent = body;
    this.body.hidden = !body;
    this.card.classList.remove('wrong');
    this.card.animate([{ transform: 'translateY(6px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'ease-out' });
  }

  private hint(text: string) {
    this.body.textContent = text;
    this.body.hidden = false;
    this.card.classList.add('wrong');
    this.card.animate([0, -6, 6, -4, 4, 0].map((x) => ({ transform: `translateX(${x}px)` })), { duration: 300 });
  }

  /**
   * The hand draws the shape over and over, slowly enough to follow, with a faint dashed guide underneath: in the
   * middle of the screen, or right over the campfire (or lagoon) for fire and water.
   */
  private animateDemo(dt: number) {
    const kind = this.lesson as Shape;
    const element = SOURCE[kind];
    let spot = { x: innerWidth / 2, y: innerHeight * 0.42, r: 110 };
    if (element) {
      const at = this.host.source(element);
      if (!at) {
        // No source on screen to draw over: this lesson is passed over.
        if (this.timer > NO_SOURCE) this.skip();
        this.demo.innerHTML = '';
        return;
      }
      const p = this.host.toScreen(at, 0);
      this.demo.style.left = `${p.x.toFixed(1)}px`;
      this.demo.style.top = `${(p.y - 6).toFixed(1)}px`;
      spot = { x: p.x, y: p.y, r: 76 };
    }
    this.demoTime = (this.demoTime + dt) % (DEMO_DRAW + DEMO_HOLD);
    const line = demoLine(kind);
    const t = Math.min(1, this.demoTime / DEMO_DRAW);
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    const n = Math.max(2, Math.round(line.length * eased));
    const drawn = line.slice(0, n);
    const ink = brushPath(drawn, 3.4, seeded(11), kind === 'square' ? [0, 28, 56, 84, 112] : element ? [0] : []);
    const [fx, fy] = drawn[drawn.length - 1];
    const fade = this.demoTime > DEMO_DRAW ? 1 - (this.demoTime - DEMO_DRAW) / DEMO_HOLD : 1;
    const guide = line.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
    this.demo.innerHTML =
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path class="guide" d="${guide}"/>` +
      `<g style="opacity:${fade.toFixed(2)}"><path class="stroke" d="${ink.ink}"/>` +
      (t < 1 ? `<circle class="finger" cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="3.2"/>` : '') +
      '</g></svg>';
    this.glide(spot, dt);
  }

  /** Lights the rival (and its health bar), with the arrow over it when `arrow`. */
  private pointAtFoe(arrow: boolean) {
    const foe = this.host.foe();
    if (!foe) return;
    const head = this.host.toScreen(foe, 0.75);
    const feet = this.host.toScreen(foe, 0.3);
    this.arrow.hidden = !arrow;
    this.placeArrow(head.x, head.y - 18);
    this.lit = null;
    this.spot(feet.x, (feet.y + head.y) / 2, 70);
  }

  /** Places the arrow's tip at (x, y), pointing down from above. */
  private placeArrow(x: number, y: number) {
    this.arrow.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }

  private spot(x: number, y: number, r: number) {
    this.dim.style.setProperty('--x', `${x.toFixed(1)}px`);
    this.dim.style.setProperty('--y', `${y.toFixed(1)}px`);
    this.dim.style.setProperty('--r', `${r.toFixed(1)}px`);
  }
}
