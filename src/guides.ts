import type * as THREE from 'three';
import { brushPath, shapeIcon, type Pt } from './ammo';
import { arc, segment } from './match';
import type { ShapeKind } from './gestures';
import { t, type GuideShape } from './i18n';
import { downArrow } from './icons';
import { hasKeyboard } from './keys';
import { Popover } from './popover';

type Fluid = 'fire' | 'water';
/** A step of the loop, named after what ends up in hand. */
type Drill = 'circle' | 'square' | 'triangle' | 'triangleDown' | 'rhombus' | 'pentagram' | 'spiral' | 'hourglass' | 'fireStar' | 'waterStar';
/** One step of the loop: the strokes to draw in order (two for a combination, merged in hand) and what ends up in hand. */
interface Step {
  id: Drill;
  parts: GuideShape[];
  result: ShapeKind;
}
/** The loop in the book's order: every symbol, then the combinations. Circle and diamond go off when drawn. */
const STEPS: Step[] = [
  { id: 'circle', parts: ['circle'], result: 'circle' },
  { id: 'square', parts: ['square'], result: 'square' },
  { id: 'triangle', parts: ['triangle'], result: 'triangle' },
  { id: 'triangleDown', parts: ['triangleDown'], result: 'triangleDown' },
  { id: 'rhombus', parts: ['rhombus'], result: 'rhombus' },
  { id: 'pentagram', parts: ['pentagram'], result: 'pentagram' },
  { id: 'spiral', parts: ['spiral'], result: 'spiral' },
  { id: 'hourglass', parts: ['triangle', 'triangleDown'], result: 'hourglass' },
  { id: 'fireStar', parts: ['pentagram', 'triangle'], result: 'fireStar' },
  { id: 'waterStar', parts: ['pentagram', 'triangleDown'], result: 'waterStar' },
];
/** Shapes that go off as soon as they are drawn; the rest wait in hand for a tap. */
const INSTANT = new Set<ShapeKind>(['circle', 'rhombus']);
const SOURCE: Partial<Record<GuideShape, Fluid>> = { triangle: 'fire', triangleDown: 'water' };
const NEXT_AFTER = 1.1; // s the "well done" bubble stays before the next step
const ALL_AFTER = 2.6; // s the "all done" bubble stays, the first time every box is ticked
const HOLD_SAY = 1.4; // s "hold it" stays over the alchemist after a combination's first stroke
const DRAW = 2.2; // s the hand takes to trace the guide
const HOLD = 0.7; // s the traced ink stays before it fades
const REST = 3; // s with only the guide on the ground before the hand traces it again
const BOX = 150; // px of the guide's 48-unit box on the meadow (the tutorial's size)
const BOX_AT_SOURCE = 110; // px over a campfire or lagoon, sized to the source
/** On a touch screen the guides are bigger: easier to follow with a finger, and the screen is there to use. */
const touch = () => matchMedia('(pointer: coarse)').matches;
const boxSize = () => (touch() ? Math.round(Math.max(BOX, Math.min(260, innerWidth * 0.6, innerHeight * 0.32))) : BOX);
const sourceSize = () => (touch() ? Math.round(BOX_AT_SOURCE * 1.45) : BOX_AT_SOURCE);
const EDGE = 44; // px from the screen edge for the arrow to an off-screen source

/** The ideal stroke in a 48×48 box, the way a hand draws it: from the dot, round, a little past the start. */
function guideLine(kind: GuideShape): Pt[] {
  if (kind === 'circle') return arc(24, 24, 15, -2.3, -2.3 + Math.PI * 2.12);
  if (kind === 'spiral') {
    // From the middle outward, a little over two laps, like the book's spiral.
    const line: Pt[] = [];
    const turns = 2.3;
    for (let a = 0; a < turns * Math.PI * 2; ) {
      const r = 1.5 + (16 * a) / (turns * Math.PI * 2);
      line.push([24 + Math.cos(a - Math.PI / 2) * r, 24 + Math.sin(a - Math.PI / 2) * r]);
      a += 0.7 / Math.max(r, 2.5);
    }
    return line;
  }
  const corners: Record<Exclude<GuideShape, 'circle' | 'spiral'>, Pt[]> = {
    square: [[10, 10], [38, 10], [38, 38], [10, 38], [10, 10], [17, 10]],
    triangle: [[24, 7], [42, 39], [6, 39], [24, 7], [28, 14]],
    triangleDown: [[24, 41], [6, 9], [42, 9], [24, 41], [28, 34]],
    rhombus: [[24, 5], [42, 24], [24, 43], [6, 24], [24, 5], [29, 10.3]],
    // One stroke, tip to tip: top, bottom right, left, right, bottom left, and back to the top.
    pentagram: [[24, 6], [34.6, 38.5], [6.8, 18.5], [41.2, 18.5], [13.4, 38.5], [24, 6], [26, 12]],
  };
  const c = corners[kind];
  return c.slice(1).flatMap((p, i) => segment(c[i], p).slice(i ? 1 : 0));
}

function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
}

/** What the guides need from the game. */
export interface GuidesHost {
  /** Training (no rivals) is on. */
  training(): boolean;
  /** Something (a lesson, the book, a finished match) is in front of the meadow. */
  covered(): boolean;
  /** Screen pixels of a world point, `lift` world units above it. */
  toScreen(p: THREE.Vector3, lift: number): { x: number; y: number };
  /** Where the alchemist stands. */
  hero(): THREE.Vector3;
  /** The scarecrow standing now, if any. */
  dummy(): THREE.Vector3 | null;
  /** Shows or hides the scarecrow's "Hit me!" (off during the guided round, which says it in its bubbles). */
  hitMe(on: boolean): void;
  /** The nearest campfire (or lagoon), on screen or not. */
  source(element: 'fire' | 'water'): THREE.Vector3 | null;
  /** The shape in hand. */
  selected(): ShapeKind | null;
  /** A stroke is being drawn right now. */
  drawing(): boolean;
}

/**
 * Training's shape loop: one symbol at a time lies on the meadow as a dashed outline with a dot where the stroke
 * starts and an arrowhead for the way to go, and a hand traces it now and then, so players learn the symbols by
 * following them. Circle, square, diamond, star and spiral sit beside the alchemist; the triangles over the campfire
 * and the water (an arrow points there while it is off screen); the combinations ask for their two strokes in turn
 * ("Step 1", "hold it", "Step 2", "throw it"). What to do is said in a speech bubble next to where to do it.
 * Drawn (and, for what waits in hand, cast), a step is ticked on the grimoire sheet at the bottom right and the next
 * one shows. Nothing resets: once every box is ticked ("Great!") the loop goes on and the counts keep growing.
 * "Another shape" skips a step for later; × hides the loop until training starts again.
 */
export class Guides {
  private index = 0;
  /** How many strokes of the step are already in hand (a combination has two). */
  private part = 0;
  private on = false;
  /** The sheet of circles folded down to its title (the guides go on). */
  private folded = false;
  /** The step's symbol is in hand, waiting to be cast. */
  private pending = false;
  /** Seconds left on the "well done" bubble before the next step. */
  private praise = 0;
  /** Seconds left on "hold it" after a combination's first stroke. */
  private holding = 0;
  /** "You did them all" was said (once per training). */
  private allSaid = false;
  /** The bubble on now is "you did them all". */
  private praiseAll = false;
  /** After the guided round: no guide or bubbles, the player practises their own attacks; the sheet keeps counting. */
  private free = false;
  /** How many times each symbol was used in this lap: ticked from 1, ×2 and up shown on its box. */
  private readonly counts = new Map<Drill, number>();
  private time = 0;
  /** Where the guide sits on screen, gliding after the alchemist rather than jumping. */
  private at: { x: number; y: number } | null = null;
  private side = 1;
  private shownKey = '';

  private readonly root = document.createElement('div');
  private readonly guide = document.createElement('div');
  private readonly arrow = document.createElement('div');
  private readonly card = document.createElement('div');
  private readonly reset: HTMLButtonElement;
  /** The speech bubble: what to do, next to where to do it. */
  private readonly bubbleText = document.createElement('span');
  private readonly pop = new Popover(this.bubbleText);
  private readonly bubble = this.pop.el;
  private bubbleKey = '';
  /** One little symbol per step, ticked once done: the loop's checklist. */
  private readonly boxes = document.createElement('ol');

  constructor(private readonly host: GuidesHost) {
    this.root.id = 'guides';
    this.root.hidden = true;
    this.guide.className = 'guide';
    this.arrow.className = 'to-source';
    this.arrow.innerHTML = downArrow();
    this.card.className = 'tip';
    this.bubble.classList.add('say');
    const title = document.createElement('b');
    title.textContent = t.guides.title;
    this.boxes.className = 'boxes';
    this.boxes.setAttribute('aria-hidden', 'true');
    this.boxes.innerHTML = STEPS.map((s) => `<li data-id="${s.id}">${shapeIcon(s.result, true)}</li>`).join('');
    const reset = this.button('reset', t.guides.reset, '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4 3.5V8h4.5"/>', () => this.restart());
    reset.hidden = true;
    this.reset = reset;
    const fold = this.button('fold', t.guides.fold, '<path d="M6 9l6 6 6-6"/>', () => {
      this.folded = !this.folded;
      this.card.classList.toggle('folded', this.folded);
      const label = this.folded ? t.guides.unfold : t.guides.fold;
      fold.setAttribute('aria-label', label);
      fold.title = label;
      fold.setAttribute('aria-expanded', String(!this.folded));
    });
    fold.setAttribute('aria-expanded', 'true');
    const top = document.createElement('div');
    top.className = 'top';
    top.append(title, reset, fold);
    this.card.append(top, this.boxes);
    this.root.append(this.guide, this.arrow, this.bubble, this.card);
    document.body.append(this.root);
  }

  /** Back to the guided round from the start, boxes cleared (the free practice's ↺). */
  private restart() {
    this.index = 0;
    this.part = 0;
    this.pending = false;
    this.praise = 0;
    this.holding = 0;
    this.allSaid = false;
    this.free = false;
    this.counts.clear();
    this.paint();
  }

  private button(cls: string, label: string, icon: string, act: () => void) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('aria-label', label);
    b.title = label;
    b.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>`;
    b.addEventListener('click', act);
    return b;
  }

  private get step() {
    return STEPS[this.index];
  }

  /** The stroke the guide shows now. */
  private get shape() {
    return this.step.parts[Math.min(this.part, this.step.parts.length - 1)];
  }

  /** A shape was drawn and kept (charged, merged, or gone off); `held` is what is in hand now. */
  drawn(kind: ShapeKind, held: ShapeKind | null) {
    if (!this.on) return;
    if (INSTANT.has(kind)) this.count(kind);
    if (this.praise > 0 || this.free) return;
    const step = this.step;
    if (kind === step.parts[this.part]) this.part++;
    else this.part = kind === step.parts[0] ? 1 : 0; // something else replaced the hand: start the step over
    if (this.part < step.parts.length) {
      this.pending = false;
      this.holding = this.part > 0 ? HOLD_SAY : 0;
      return;
    }
    this.holding = 0;
    if (INSTANT.has(step.result)) this.part = 0;
    else if (held === step.result) this.pending = true;
    else this.part = 0;
  }

  /** The shape in hand was cast. */
  cast(kind: ShapeKind) {
    if (!this.on) return;
    this.pending = false;
    this.part = 0; // done, or a half-made combination thrown on its own
    this.count(kind);
  }

  /**
   * Any symbol of the loop used, guided or not: ticked, and counted, so a repeat shows ×2, ×3… on its box. The one
   * the guide asks for moves the loop on.
   */
  private count(kind: ShapeKind) {
    const step = STEPS.find((s) => s.result === kind);
    if (!step) return;
    this.counts.set(step.id, (this.counts.get(step.id) ?? 0) + 1);
    if (this.free) {
      this.paint();
      return;
    }
    if (this.counts.size === STEPS.length && !this.allSaid) {
      this.allSaid = this.praiseAll = true;
      this.praise = ALL_AFTER;
    } else if (step === this.step && this.praise <= 0) {
      this.praiseAll = false;
      this.praise = NEXT_AFTER;
    }
    this.paint();
  }

  /** On to the next step not ticked yet, so a step left half-done comes back later in the round. */
  private advance() {
    const lap = this.counts.size === STEPS.length;
    this.pending = false;
    this.part = 0;
    this.praise = 0;
    this.holding = 0;
    this.time = 0;
    if (lap) {
      this.index = (this.index + 1) % STEPS.length;
    } else {
      // The next step not ticked yet, so a skipped one comes back later in the lap.
      for (let i = 1; i <= STEPS.length; i++) {
        const j = (this.index + i) % STEPS.length;
        if (!this.counts.has(STEPS[j].id)) {
          this.index = j;
          break;
        }
      }
    }
    this.paint();
  }

  /** The checklist: ticked steps, and the one under way. */
  private paint() {
    for (const li of this.boxes.children as HTMLCollectionOf<HTMLElement>) {
      const id = li.dataset.id as Drill;
      const n = this.counts.get(id) ?? 0;
      li.classList.toggle('tick', n > 0);
      if (n > 1) li.dataset.n = `×${n}`;
      else delete li.dataset.n;
      li.classList.toggle('now', id === this.step.id && this.praise <= 0 && !this.free);
    }
  }

  update(dt: number) {
    const active = this.host.training();
    if (active !== this.on) {
      // Each time training starts the loop starts over.
      if (active) this.restart();
      this.on = active;
    }
    this.host.hitMe(!this.on || this.free);
    this.reset.hidden = !this.free;
    this.root.hidden = !this.on || this.host.covered();
    if (this.root.hidden) return;
    this.arrow.hidden = true;
    if (this.free) {
      this.say('', null, dt);
      this.place(null);
      return;
    }
    const hero = this.host.toScreen(this.host.hero(), 1.9);

    if (this.praise > 0) {
      this.praise -= dt;
      this.say(this.praiseAll ? t.guides.allDone : t.guides.good, hero, dt);
      this.place(null);
      if (this.praise <= 0) {
        if (this.praiseAll) {
          // The guided round is done: from here on the player practises freely, the boxes keep counting.
          this.free = true;
          this.paint();
        } else this.advance();
      }
      return;
    }
    const held = this.host.selected();
    if (this.pending && held !== this.step.result) this.pending = false; // dropped without casting
    if (!this.pending && this.part > 0 && held === null) this.part = 0; // half a combination dropped
    const step = this.step;
    const combo = step.parts.length > 1;
    if (this.pending) {
      this.say(hasKeyboard() ? t.guides.castMouse : t.guides.cast, this.overScarecrow() ?? hero, dt);
      this.place(null);
      return;
    }
    if (this.holding > 0) {
      this.holding -= dt;
      this.say(t.guides.hold, hero, dt);
      this.place(null);
      return;
    }

    const shape = this.shape;
    const label = combo ? `${t.guides.step} ${this.part + 1}` : '';
    const element = SOURCE[shape];
    if (element) {
      const src = this.host.source(element);
      const p = src && this.host.toScreen(src, 0);
      if (!p) {
        this.say('', null, dt);
        this.place(null);
        return;
      }
      if (p.x < 0 || p.y < 0 || p.x > innerWidth || p.y > innerHeight) {
        const edge = this.pointAt(p);
        this.say(t.guides.goTo[element], edge, dt, label);
        this.place(null);
        return;
      }
      this.at = null; // pinned to the source
      const at = { x: p.x, y: p.y - 6 };
      const size = sourceSize();
      this.place(at, size, element, dt);
      this.say(t.guides.draw[shape], { x: at.x, y: at.y - size / 2 }, dt, label, at.y + size / 2);
      return;
    }
    const size = boxSize();
    const at = this.besideHero(dt, size);
    this.place(at, size, null, dt);
    this.say(t.guides.draw[shape], { x: at.x, y: at.y - size / 2 + 8 }, dt, label, at.y + size / 2 - 8);
  }

  /** Over the scarecrow's "Hit me!" label (or its head when the label is not up). */
  private overScarecrow() {
    const label = document.querySelector<HTMLElement>('.hitme:not([hidden]) span');
    const r = label?.getBoundingClientRect();
    if (r && r.width) return { x: r.left + r.width / 2, y: r.top - 2 };
    const d = this.host.dummy();
    return d ? this.host.toScreen(d, 1.25) : null;
  }

  /** A clear spot beside the alchemist, off the HUD at the top and the stick and this line at the bottom. */
  private besideHero(dt: number, size: number) {
    const h = this.host.toScreen(this.host.hero(), 0.35);
    const half = size / 2;
    const top = 96 + half;
    const bottom = innerHeight - (touch() ? 170 : 120) - half; // phones: clear of the sheet of circles too
    const fits = (x: number, y: number) => x - half > 8 && x + half < innerWidth - 8 && y > top && y < bottom;
    const gap = half + 46;
    const tries = [
      { x: h.x + gap * this.side, y: h.y - 20, side: this.side },
      { x: h.x - gap * this.side, y: h.y - 20, side: -this.side },
      { x: h.x, y: h.y - gap - 20, side: this.side },
      { x: h.x, y: h.y + gap, side: this.side },
    ];
    const spot = tries.find((s) => fits(s.x, s.y)) ?? { x: innerWidth / 2, y: innerHeight * 0.42, side: this.side };
    this.side = spot.side; // keeps to the same side while it fits, so it does not flip back and forth
    const k = this.at ? 1 - Math.exp(-dt * 6) : 1;
    const at = (this.at ??= { x: spot.x, y: spot.y });
    at.x += (spot.x - at.x) * k;
    at.y += (spot.y - at.y) * k;
    return at;
  }

  /** The arrow at the edge of the screen, pointing towards an off-screen source; returns where its bubble goes. */
  private pointAt(p: { x: number; y: number }) {
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    const dx = p.x - cx;
    const dy = p.y - cy;
    const s = Math.min((cx - EDGE) / Math.abs(dx || 1e-6), (cy - EDGE) / Math.abs(dy || 1e-6));
    const x = cx + dx * s;
    const y = cy + dy * s;
    const turn = Math.atan2(dy, dx) - Math.PI / 2;
    this.arrow.hidden = false;
    this.arrow.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${turn.toFixed(3)}rad)`;
    // The bubble sits a little inside the arrow, towards the middle of the screen.
    const len = Math.hypot(dx, dy) || 1;
    return { x: x - (dx / len) * 34, y: y - (dy / len) * 34 - (dy < 0 ? -40 : 0) };
  }

  /** Draws the guide centred at `at` (or hides it), with the hand tracing it now and then. */
  private place(at: { x: number; y: number } | null, size = BOX, element: Fluid | null = null, dt = 0) {
    if (at === null || !this.on) {
      if (this.guide.innerHTML) this.guide.innerHTML = '';
      this.shownKey = '';
      return;
    }
    this.guide.className = `guide${element ? ` at-source ${element}` : ''}`;
    this.guide.style.width = this.guide.style.height = `${size}px`;
    this.guide.style.transform = `translate(${(at.x - size / 2).toFixed(1)}px, ${(at.y - size / 2).toFixed(1)}px)`;

    const kind = this.shape;
    const line = guideLine(kind);
    const key = `${this.index}:${this.part}`;
    if (this.shownKey !== key) {
      this.shownKey = key;
      this.time = 0;
    }
    // The hand rests while the player draws: only the guide stays.
    this.time = this.host.drawing() ? DRAW + HOLD : (this.time + dt) % (DRAW + HOLD + REST);
    const tt = Math.min(1, this.time / DRAW);
    const eased = tt < 0.5 ? 2 * tt * tt : 1 - (-2 * tt + 2) ** 2 / 2;
    const tracing = this.time < DRAW + HOLD;
    const fade = this.time > DRAW ? Math.max(0, 1 - (this.time - DRAW) / HOLD) : 1;
    const guide = line.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
    const [sx, sy] = line[0];
    // A little arrowhead along the first side shows which way to go.
    const ahead = line[Math.min(line.length - 1, Math.round(line.length * (kind === 'spiral' ? 0.3 : 0.07)))];
    const back = line[Math.max(0, line.indexOf(ahead) - 3)];
    const dir = Math.atan2(ahead[1] - back[1], ahead[0] - back[0]);
    const head = [dir + 2.6, dir - 2.6].map((a) => `${(ahead[0] + Math.cos(a) * 2.4).toFixed(1)} ${(ahead[1] + Math.sin(a) * 2.4).toFixed(1)}`);
    let ink = '';
    if (tracing && fade > 0) {
      const n = Math.max(2, Math.round(line.length * eased));
      const drawn = line.slice(0, n);
      const brush = brushPath(drawn, 3.2, seeded(7), []);
      const [fx, fy] = drawn[drawn.length - 1];
      ink =
        `<g style="opacity:${fade.toFixed(2)}"><path class="stroke" d="${brush.ink}"/>` +
        (tt < 1 ? `<circle class="finger" cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="3.2"/>` : '') +
        '</g>';
    }
    this.guide.innerHTML =
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path class="path" d="${guide}"/>` +
      `<path class="head" d="M${head[0]}L${ahead[0].toFixed(1)} ${ahead[1].toFixed(1)}L${head[1]}"/>` +
      `<circle class="start" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="2.2"/>${ink}</svg>`;
  }

  /**
   * The speech bubble over `at` (its nub points down at it), or under `under` (default `at`) when there is no room
   * above; `label` is a combination's "Step 1"/"Step 2", in red before the text. It glides instead of jumping.
   */
  private say(text: string, at: { x: number; y: number } | null, dt: number, label = '', under = at?.y ?? 0) {
    if (!at || !text) {
      this.bubble.hidden = true;
      this.pop.snap();
      return;
    }
    this.bubble.hidden = false;
    const key = `${label}|${text}`;
    if (this.bubbleKey !== key) {
      this.bubbleKey = key;
      this.bubbleText.replaceChildren();
      if (label) {
        const em = document.createElement('em');
        em.textContent = label;
        this.bubbleText.append(em, ' ');
      }
      this.bubbleText.append(text);
      this.pop.snap(); // a new line pops in place
    }
    this.pop.place({ x: at.x, y: at.y, r: 0, side: 'above', below: under }, dt);
  }
}
