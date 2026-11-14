import type * as THREE from 'three';
import { brushPath, shapeIcon, type Pt } from './ammo';
import type { Drill } from './help';
import { arc, segment } from './match';
import type { ShapeKind } from './gestures';
import { t, type GuideShape } from './i18n';
import { downArrow } from './icons';
import { hasKeyboard } from './keys';

type Fluid = 'fire' | 'water';
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
const NEXT_AFTER = 1.1; // s the "well done" line stays before the next step
const ALL_AFTER = 2.6; // s the "all done" line stays before the loop starts over
const DRAW = 2.2; // s the hand takes to trace the guide
const HOLD = 0.7; // s the traced ink stays before it fades
const REST = 3; // s with only the guide on the ground before the hand traces it again
const BOX = 150; // px of the guide's 48-unit box on the meadow (the tutorial's size)
const BOX_AT_SOURCE = 110; // px over a campfire or lagoon, sized to the source
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
 * and the water (an arrow points there while it is off screen); the combinations ask for their two strokes in turn.
 * Drawn (and, for what waits in hand, cast), a step is ticked on the line at the bottom right and the next one shows.
 * With every box ticked: "Great!", the boxes clear and the loop starts over. "Another shape" skips a step for later in
 * the lap; × hides the loop until training starts again.
 */
export class Guides {
  private index = 0;
  /** How many strokes of the step are already in hand (a combination has two). */
  private part = 0;
  private on = false;
  private hidden = false;
  /** The step's symbol is in hand, waiting to be cast. */
  private pending = false;
  /** Seconds left on the "well done" line before the next step. */
  private praise = 0;
  private readonly ticked = new Set<Drill>();
  private time = 0;
  /** Where the guide sits on screen, gliding after the alchemist rather than jumping. */
  private at: { x: number; y: number } | null = null;
  private side = 1;
  private shownKey = '';

  private readonly root = document.createElement('div');
  private readonly guide = document.createElement('div');
  private readonly arrow = document.createElement('div');
  private readonly card = document.createElement('div');
  private readonly title = document.createElement('b');
  private readonly body = document.createElement('span');
  /** One little symbol per step, ticked once done: the loop's checklist. */
  private readonly boxes = document.createElement('ol');

  constructor(private readonly host: GuidesHost) {
    this.root.id = 'guides';
    this.root.hidden = true;
    this.guide.className = 'guide';
    this.arrow.className = 'to-source';
    this.arrow.innerHTML = downArrow();
    this.card.className = 'tip';
    this.card.setAttribute('role', 'status');
    const text = document.createElement('div');
    text.className = 'text';
    this.boxes.className = 'boxes';
    this.boxes.setAttribute('aria-hidden', 'true');
    this.boxes.innerHTML = STEPS.map((s) => `<li data-id="${s.id}">${shapeIcon(s.result, true)}</li>`).join('');
    text.append(this.title, this.body);
    const next = this.button('next', t.guides.next, '<path d="M9 5l7 7-7 7"/>', () => this.advance());
    const close = this.button('close', t.guides.close, '<path d="M6 6l12 12M18 6 6 18"/>', () => {
      this.hidden = true;
      this.root.hidden = true;
    });
    const top = document.createElement('div');
    top.className = 'top';
    top.append(text, next, close);
    this.card.append(top, this.boxes);
    this.root.append(this.guide, this.arrow, this.card);
    document.body.append(this.root);
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
    if (!this.on || this.praise > 0) return;
    const step = this.step;
    if (kind === step.parts[this.part]) this.part++;
    else this.part = kind === step.parts[0] ? 1 : 0; // something else replaced the hand: start the step over
    if (this.part < step.parts.length) {
      this.pending = false;
      return;
    }
    if (INSTANT.has(step.result)) this.done();
    else if (held === step.result) this.pending = true;
    else this.part = 0;
  }

  /** The shape in hand was cast. */
  cast() {
    if (!this.on) return;
    if (this.pending) this.done();
    else this.part = 0; // a half-made combination thrown on its own
  }

  private done() {
    this.pending = false;
    this.part = 0;
    this.ticked.add(this.step.id);
    this.praise = this.ticked.size === STEPS.length ? ALL_AFTER : NEXT_AFTER;
    this.paint();
  }

  /** On to the next step (from "another shape" too); after a whole loop the boxes clear and it starts over. */
  private advance() {
    const lap = this.ticked.size === STEPS.length;
    this.pending = false;
    this.part = 0;
    this.praise = 0;
    this.time = 0;
    if (lap) {
      this.ticked.clear();
      this.index = 0;
    } else {
      // The next step not ticked yet, so a skipped one comes back later in the lap.
      for (let i = 1; i <= STEPS.length; i++) {
        const j = (this.index + i) % STEPS.length;
        if (!this.ticked.has(STEPS[j].id)) {
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
      li.classList.toggle('tick', this.ticked.has(id));
      li.classList.toggle('now', id === this.step.id && this.praise <= 0);
    }
  }

  update(dt: number) {
    const active = this.host.training();
    if (active !== this.on) {
      // Each time training starts the loop starts over, shown again even if it was hidden last time.
      if (active) {
        this.index = 0;
        this.part = 0;
        this.pending = false;
        this.praise = 0;
        this.ticked.clear();
        this.hidden = false;
        this.paint();
      }
      this.on = active;
    }
    this.root.hidden = !this.on || this.hidden || this.host.covered();
    if (this.root.hidden) return;
    this.arrow.hidden = true;

    if (this.praise > 0) {
      this.praise -= dt;
      const all = this.ticked.size === STEPS.length;
      this.say(all ? t.guides.allDone : t.guides.good, all ? t.guides.again : '');
      this.place(null);
      if (this.praise <= 0) this.advance();
      return;
    }
    const held = this.host.selected();
    if (this.pending && held !== this.step.result) this.pending = false; // dropped without casting
    if (!this.pending && this.part > 0 && held === null) this.part = 0; // half a combination dropped
    const step = this.step;
    const role = t.help.roles[step.result];
    const of = step.parts.length > 1 ? ` · ${t.guides.partOf(this.part + 1, step.parts.length)}` : '';
    if (this.pending) {
      this.say(hasKeyboard() ? t.guides.castMouse : t.guides.cast, role);
      this.place(null);
      return;
    }

    const shape = this.shape;
    const element = SOURCE[shape];
    if (element) {
      const src = this.host.source(element);
      const p = src && this.host.toScreen(src, 0);
      if (!p) {
        this.place(null);
        return;
      }
      if (p.x < 0 || p.y < 0 || p.x > innerWidth || p.y > innerHeight) {
        this.say(t.guides.goTo[element], role + of);
        this.pointAt(p);
        this.place(null);
        return;
      }
      this.say(t.guides.draw[shape], role + of);
      this.at = null; // pinned to the source
      this.place({ x: p.x, y: p.y - 6 }, BOX_AT_SOURCE, element, dt);
      return;
    }
    this.say(t.guides.draw[shape], role + of);
    this.place(this.besideHero(dt), BOX, null, dt);
  }

  /** A clear spot beside the alchemist, off the HUD at the top and the stick and this line at the bottom. */
  private besideHero(dt: number) {
    const h = this.host.toScreen(this.host.hero(), 0.35);
    const half = BOX / 2;
    const top = 96 + half;
    const bottom = innerHeight - 120 - half;
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

  /** The arrow at the edge of the screen, pointing towards an off-screen source. */
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

  private say(title: string, body: string) {
    if (this.title.textContent !== title) this.title.textContent = title;
    if (this.body.textContent !== body) this.body.textContent = body;
    this.body.hidden = !body;
  }
}
