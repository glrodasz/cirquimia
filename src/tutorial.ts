import { downArrow } from './icons';
import type * as THREE from 'three';
import { brushPath, type Pt } from './ammo';
import { arc, segment } from './match';
import type { ShapeKind } from './gestures';
import { t } from './i18n';
import { hand } from './help';
import { hasKeyboard } from './keys';
import { padEnabled } from './pad';

// 'moved' once the walking lesson is done, 'square' after the attack lesson, 'done' after the wall one too
const STORE = 'cirquimia.tutorial';
const START_DELAY = 0.6; // s after the help card closes before the first lesson shows
const HIT_PAUSE = 0.7; // s after the first hit taken, so the damage number reads before the wall lesson
const WATCH_SQUARE = 1.4; // s to watch the guaranteed strike land
const PROVOKE_AFTER = 0.35; // s after the wall rises before the rival strikes into it
const WATCH_WALL = 1.6;
const DEMO_DRAW = 1.7; // s the demo hand takes to draw the shape
const DEMO_HOLD = 0.8;
const GOAL_REACH = 0.3; // world units from the mark that count as arrived
const AFTER_WALK = 1.4; // s from arriving at the mark to the attack lesson
const SHOW_ALT = 2.8; // s the walking lesson first shows the stick (or the keys) swaying side to side
const SHOW_TAP = 1.8; // s it then shows the hand tapping the mark, before the stick again
const STARTED = 0.12; // world units the alchemist has to move for the lesson to stop showing how

type Lesson = 'move' | 'square' | 'circle';
type Shape = Exclude<Lesson, 'move'>;
type Step = 'walk' | 'draw' | 'aim' | 'watch';
type Stage = '' | 'moved' | 'square' | 'done';
/** What the walking lesson shows right now: the tap, the other way (stick or keys), or nothing once the alchemist walks. */
type WalkShow = 'tap' | 'alt' | 'go';

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
  /** The rival goes for the alchemist as soon as it can, quick and true, until a strike lands. */
  ambush(): void;
  /** Where the alchemist stands. */
  hero(): THREE.Vector3;
  /** A clear spot on screen a short walk from the alchemist, for the walking lesson. */
  walkGoal(): THREE.Vector3 | null;
  /** The last lesson (the wall) is over. */
  finished(): void;
}

function load(): Stage {
  try {
    if (new URLSearchParams(location.search).has('tutorial')) localStorage.removeItem(STORE); // ?tutorial replays it
    const v = localStorage.getItem(STORE);
    return v === 'moved' || v === 'square' || v === 'done' ? v : '';
  } catch {
    return '';
  }
}

function save(v: Exclude<Stage, ''>) {
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
  const c: Pt[] = [[10, 10], [38, 10], [38, 38], [10, 38], [10, 10], [17, 10]];
  return c.slice(1).flatMap((p, i) => segment(c[i], p).slice(i ? 1 : 0));
}

/** A brush arrow pointing down. */

/**
 * The first match, walked through: walk to a mark (tap, the stick or the keys), then draw a square, which arrives in hand, then tap the rival (a sure hit).
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
  /** Whether this match's rival has been sent at the alchemist to open the wall lesson. */
  private ambushed = false;
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
    this.card.append(this.title, this.body);
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

  /** Both lessons are behind the player. */
  get done() {
    return this.stage === 'done';
  }

  /** True while a lesson waits on the player: the match holds still. */
  get paused() {
    return this.lesson !== null && this.step !== 'watch' && this.step !== 'walk';
  }

  /** Whether a stroke on the map counts as drawing right now. */
  get canDraw() {
    return this.lesson === null || this.step === 'draw';
  }

  /** Whether a tap on the map does anything right now. */
  get canTap() {
    return this.lesson === null || this.step === 'aim' || this.step === 'walk';
  }

  /** A shape was recognized (or null, a scribble). False refuses it: the lesson wants another one. */
  drawn(kind: ShapeKind | null) {
    if (!this.lesson || this.step !== 'draw' || this.lesson === 'move') return true;
    if (kind === this.lesson) {
      this.go('aim'); // the new shape arrives in hand
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

  /** A short note on the tutorial card that fades by itself, outside the lessons (e.g. fire charged). */
  note(title: string, body: string) {
    if (this.lesson) return;
    this.root.hidden = false;
    this.root.dataset.lesson = '';
    this.root.dataset.step = 'done';
    void this.root.offsetWidth;
    this.root.classList.add('show');
    this.say(title, body);
    this.fadeSoon(3000);
  }

  /** A new match: a lesson under way starts over on the fresh meadow. */
  reset() {
    this.host.hold(false);
    this.hitWait = -1;
    this.ambushed = false;
    if (this.lesson) this.begin(this.lesson);
  }

  update(dt: number) {
    const covered = this.host.covered();
    this.root.classList.toggle('covered', covered);
    if (covered) return;

    if (!this.lesson) {
      if (this.stage === '' && (this.wait -= dt) <= 0) this.begin('move');
      if (this.stage === 'moved' && this.host.foe() && (this.wait -= dt) <= 0) this.begin('square');
      // Between the lessons: the rival comes straight at the alchemist so the first hit, and the wall lesson, come early.
      if (this.stage === 'square' && !this.ambushed && this.hitWait < 0 && !this.pending && this.host.foe()) {
        this.ambushed = true;
        this.host.ambush();
      }
      if (this.hitWait >= 0 && (this.hitWait -= dt) < 0) this.pending = 'circle';
      if (this.pending === 'circle' && this.host.foe()) this.begin('circle');
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

    if (this.step === 'draw') this.animateDemo(dt);
    else if (this.step === 'aim') {
      if (this.host.selected() !== this.lesson) this.go('draw'); // dropped: draw it again
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
    this.shown++;
    this.lesson = lesson;
    this.pending = null;
    this.root.hidden = false;
    this.root.dataset.lesson = lesson;
    void this.root.offsetWidth;
    this.root.classList.add('show');
    if (lesson === 'move') {
      this.goal = this.host.walkGoal();
      if (!this.goal) {
        // Nowhere clear to walk to: skip straight to the attack lesson.
        this.lesson = null;
        this.stage = 'moved';
        save(this.stage);
        return;
      }
      this.host.hold(true); // the rival waits while the player learns to walk
      this.go('walk');
    } else this.go('draw');
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
    // The light glides from the mark to the stick and back rather than jumping.
    const k = this.lit ? 1 - Math.exp(-dt * 9) : 1;
    const lit = (this.lit ??= { ...spot });
    lit.x += (spot.x - lit.x) * k;
    lit.y += (spot.y - lit.y) * k;
    lit.r += (spot.r - lit.r) * k;
    this.spot(lit.x, lit.y, lit.r);
    if (Math.hypot(hero.x - goal.x, hero.z - goal.z) < GOAL_REACH) this.finish();
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
    const text = TEXT[this.lesson as Shape];
    if (step === 'watch') this.say(text.watch, '');
    else this.say(...text[step as 'draw' | 'aim']);
    if (step !== 'draw') this.demo.innerHTML = '';
  }

  private shelve() {
    this.host.hold(false);
    this.host.deselect();
    this.pending = this.lesson === 'circle' ? 'circle' : null;
    this.goal = null;
    this.unlight();
    this.lesson = null;
    this.root.classList.remove('show');
    this.root.hidden = true;
  }

  private finish() {
    const lesson = this.lesson!;
    this.host.hold(false);
    this.lesson = null;
    this.goal = null;
    this.unlight();
    this.root.dataset.walk = '';
    this.stage = lesson === 'move' ? 'moved' : lesson === 'square' ? 'square' : 'done';
    save(this.stage);
    this.root.dataset.step = 'done';
    this.say(lesson === 'move' ? t.tutorial.move.done : TEXT[lesson].done, '');
    if (lesson === 'move') this.wait = AFTER_WALK;
    this.fadeSoon(2200);
    if (lesson === 'circle') this.host.finished();
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
    const line = demoLine(this.lesson as Shape);
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
