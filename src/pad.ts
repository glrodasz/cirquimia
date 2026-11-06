/**
 * Touch stick for phones and tablets: a faint ring at the bottom left. It is no blind spot: the ring only shows where
 * the stick is, and every touch there first goes to the usual tap/draw logic. A quick tap still walks or casts, and a
 * stroke that keeps moving is a drawing. A press becomes the stick when the finger stays put for HOLD_MS, or when it
 * flicks a fairly straight line out of the ring and then rests near it for STILL_MS (people press and push toward where they want to go;
 * drawings are longer and keep moving). The flick's ink is dropped and the alchemist walks toward the finger, relative
 * to the screen like WASD, until it lifts.
 */

import { DRAW_THRESHOLD } from './pointer';

/** ms a finger must rest on the ring before it steers. Longer than a tap, short enough not to feel laggy. */
export const HOLD_MS = 140;

/** Finger offset (px, screen y down) inside a ring of `radius` px → walk intent (x right, y up), unit length or zero. */
export function padAxes(dx: number, dy: number, radius: number, deadZone = 0.22) {
  const len = Math.hypot(dx, dy);
  if (!radius || len < radius * deadZone) return { x: 0, y: 0 };
  return { x: dx / len, y: -dy / len };
}

/** ms a flick must then rest before it reads as pushing the stick. */
export const STILL_MS = 70;
/** Extra rest for a flick that ends outside the ring. */
export const LONG_EXTRA_MS = 40;
/** px a resting thumb may drift or jitter and still count as resting. */
export const STILL_PX = 9;
/** px of stroke beyond which a press is a drawing for good. */
export const FLICK_MAX = 300;
/**
 * The line out to the farthest point must be fairly straight (distance over path drawn): shapes turn corners. What the
 * finger does after its farthest point (easing back, adjusting the aim) does not count against it.
 */
export const FLICK_STRAIGHT = 0.72;
/** How far from the ring's centre (in ring radii) a flick may end and still steer. */
export const FLICK_REACH = 3.2;
/** How far from the ring's centre (in ring radii) a press may land and still count as on it. */
export const LAND_REACH = 1.3;

export interface PressState {
  /** ms since the finger landed. */
  held: number;
  /** px from where it landed to the farthest point so far. */
  travelled: number;
  /** px of path drawn up to that farthest point. */
  path: number;
  /** px of path drawn in all. */
  total: number;
  /** ms the finger has stayed within STILL_PX of where it is now. */
  still: number;
  /** Distance from the ring's centre, in ring radii. */
  reach: number;
}

/** Whether a press on the ring has become the stick: a resting finger, or a straight flick from it that then rests. */
export function padClaims(p: PressState) {
  if (p.travelled <= DRAW_THRESHOLD) return p.reach <= LAND_REACH && p.held >= HOLD_MS;
  if (p.reach > FLICK_REACH || p.total > FLICK_MAX || p.travelled < p.path * FLICK_STRAIGHT) return false;
  // A line ending outside the ring could be a shape's first side with a pause at its corner: ask a little longer.
  return p.still >= (p.reach > 1 ? STILL_MS + LONG_EXTRA_MS : STILL_MS);
}

interface Sample {
  x: number;
  y: number;
  t: number;
}

/** A press followed point by point: how far and how straight it went, and how long it has been resting. */
export class PressTrack {
  private readonly samples: Sample[] = [];
  private total = 0;
  private far = 0;
  private pathAtFar = 0;

  constructor(readonly id: number, x: number, y: number, t: number) {
    this.samples.push({ x, y, t });
  }

  get start() {
    return this.samples[0];
  }

  /** px of path drawn in all. */
  get length() {
    return this.total;
  }

  get last() {
    return this.samples[this.samples.length - 1];
  }

  add(x: number, y: number, t: number) {
    const last = this.last;
    const step = Math.hypot(x - last.x, y - last.y);
    if (step < 1.5) return; // sub-pixel noise
    this.total += step;
    this.samples.push({ x, y, t });
    const d = Math.hypot(x - this.start.x, y - this.start.y);
    if (d > this.far) {
      this.far = d;
      this.pathAtFar = this.total;
    }
  }

  /** The state at `now`, with the ring centre and radius to measure reach. */
  state(now: number, cx: number, cy: number, radius: number): PressState {
    const last = this.last;
    // Walk back to the first sample of the current rest: every point since then stays within STILL_PX of here.
    let since = last.t;
    for (let i = this.samples.length - 1; i >= 0; i--) {
      const q = this.samples[i];
      if (Math.hypot(q.x - last.x, q.y - last.y) > STILL_PX) break;
      since = q.t;
    }
    return {
      held: now - this.start.t,
      travelled: this.far,
      path: this.pathAtFar,
      total: this.total,
      still: now - since,
      reach: Math.hypot(last.x - cx, last.y - cy) / radius,
    };
  }
}

/** The screens that most likely have no keyboard: a finger drives them. */
export const isTouch = () => matchMedia('(pointer: coarse)').matches;

export interface Pad {
  /** Walk intent while the stick is held: x right, y up, unit length or zero. */
  axes(): { x: number; y: number };
  /** A pointer went down at (x, y). Returns true when it landed on the ring and may become the stick. */
  down(id: number, x: number, y: number, t: number): boolean;
  /** Returns true when this pointer is the stick (so the caller keeps it away from drawing). */
  move(id: number, x: number, y: number): boolean;
  /** Ends the press. Returns true when it was the stick, so it was neither a tap nor a drawing. */
  up(id: number): boolean;
  /** Checks a resting press each frame; calls `claim` once with its id when it becomes the stick. */
  update(now: number, claim: (id: number) => void): void;
  owns(id: number): boolean;
}

const NONE: Pad = {
  axes: () => ({ x: 0, y: 0 }),
  down: () => false,
  move: () => false,
  up: () => false,
  update: () => {},
  owns: () => false,
};

/** Whether this screen gets the stick: touch screens, unless `?pad=0`. */
export const padEnabled = () => isTouch() && new URLSearchParams(location.search).get('pad') !== '0';

export function mountPad(): Pad {
  if (!padEnabled()) return NONE;

  const el = document.createElement('div');
  el.id = 'pad';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="knob"></span>';
  document.body.append(el);
  document.body.classList.add('has-pad');
  const knob = el.querySelector<HTMLElement>('.knob')!;

  let a = { x: 0, y: 0 };
  let press: PressTrack | null = null;
  let stick: number | null = null;

  const ring = () => {
    const r = el.getBoundingClientRect();
    const radius = r.width / 2;
    return { cx: r.left + radius, cy: r.top + radius, radius };
  };
  const follow = (x: number, y: number) => {
    const { cx, cy, radius } = ring();
    let dx = x - cx;
    let dy = y - cy;
    a = padAxes(dx, dy, radius);
    // The knob stays inside the ring however far the finger slides.
    const len = Math.hypot(dx, dy);
    const reach = radius * 0.55;
    if (len > reach) {
      dx *= reach / len;
      dy *= reach / len;
    }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const reset = () => {
    press = null;
    stick = null;
    a = { x: 0, y: 0 };
    knob.style.transform = '';
    el.classList.remove('on');
  };
  document.addEventListener('visibilitychange', () => document.hidden && reset());

  return {
    axes: () => a,
    owns: (id) => stick === id,
    down(id, x, y, t) {
      if (press || stick !== null) return false;
      const { cx, cy, radius } = ring();
      if (Math.hypot(x - cx, y - cy) > radius * LAND_REACH) return false;
      press = new PressTrack(id, x, y, t);
      return true;
    },
    move(id, x, y) {
      if (stick === id) {
        follow(x, y);
        return true;
      }
      if (press?.id === id) {
        press.add(x, y, performance.now());
        if (press.length > FLICK_MAX) press = null;
      }
      return false;
    },
    up(id) {
      if (stick === id) {
        reset();
        return true;
      }
      if (press?.id === id) press = null;
      return false;
    },
    update(now, claim) {
      if (!press) return;
      const p = press;
      const { cx, cy, radius } = ring();
      if (!padClaims(p.state(now, cx, cy, radius))) return;
      press = null;
      stick = p.id;
      el.classList.add('on');
      follow(p.last.x, p.last.y);
      claim(p.id);
    },
  };
}
