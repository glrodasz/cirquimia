// Tells taps from drawings, finger by finger. Pure logic (no DOM) so it can be tested; main.ts feeds it pointer
// events and acts on what it reports.

import type { Point } from './gestures';

/** px a finger must travel before the ink starts to follow it. */
export const DRAW_THRESHOLD = 12;
/**
 * px a press may wander and still be a tap. A fingertip rolls 15–30 px on glass while tapping; anything that stays
 * this close to where it landed is far too small to be a shape (they need a ~70 px box), so it was meant as a tap.
 */
export const TAP_SLOP = 40;
/** A touch held longer than this while another finger is down is a resting thumb or palm, not a tap. */
export const SECOND_TAP_MS = 350;
/** Two fingers: one draws, the other taps to walk. Any more are ignored. */
const MAX_FINGERS = 2;

export interface PointerInput {
  id: number;
  x: number;
  y: number;
  /** Milliseconds, any clock. */
  t: number;
  /** The first finger down when no other was touching (PointerEvent.isPrimary). */
  primary?: boolean;
}

export type GestureEvent =
  /**
   * `second` when another finger was touching the screen too (usually drawing): such a tap only walks, it never casts
   * or drops the symbol in hand, so a hurried tap cannot waste it.
   */
  | { type: 'tap'; x: number; y: number; second: boolean }
  | { type: 'drawStart'; points: Point[] }
  | { type: 'drawPoint'; point: Point }
  /** A finished drawing. `tapLike` when it never strayed past TAP_SLOP: a slipped tap if it reads as no shape. */
  | { type: 'drawEnd'; stroke: Point[]; tapLike: boolean }
  | { type: 'drawCancel' };

/** True when every point stays within `slop` of the first: a tap that slid, not a drawing. */
export function isTapLike(stroke: Point[], slop = TAP_SLOP) {
  const s = stroke[0];
  return stroke.every((p) => Math.hypot(p.x - s.x, p.y - s.y) < slop);
}

interface Finger {
  stroke: Point[];
  t: number;
  /** Strayed past TAP_SLOP: no longer a tap. */
  wandered: boolean;
  /** Another finger touched the screen during this press. */
  shared: boolean;
}

/**
 * Each finger starts as a possible tap. The first to travel past DRAW_THRESHOLD becomes the drawing; meanwhile a
 * quick tap with the other finger still walks the alchemist, so moving and drawing do not block each other (the old
 * one-finger-at-a-time rule dropped whichever touch came second, which is why tap-spamming left no room to draw).
 */
export class PointerRouter {
  private fingers = new Map<number, Finger>();
  private drawer: number | null = null;

  /** Whether a new stroke may start turning into ink (the tutorial can hold drawings back). */
  constructor(private canDraw: () => boolean = () => true) {}

  get busy() {
    return this.fingers.size > 0;
  }

  get isDrawing() {
    return this.drawer !== null;
  }

  /** Returns true when the pointer was taken, so the caller can capture it. */
  down(p: PointerInput, emit: (e: GestureEvent) => void): boolean {
    // A primary pointer means nothing else is touching: whatever we still track lost its pointerup (iOS can swallow
    // it when a system gesture steals the touch). Without this reset, every later touch would be ignored.
    if (p.primary) for (const id of [...this.fingers.keys()]) this.cancel(id, emit);
    if (this.fingers.size >= MAX_FINGERS) return false;
    const shared = this.fingers.size > 0;
    for (const f of this.fingers.values()) f.shared = true;
    this.fingers.set(p.id, { stroke: [{ x: p.x, y: p.y }], t: p.t, wandered: false, shared });
    return true;
  }

  move(p: PointerInput | PointerInput[], emit: (e: GestureEvent) => void) {
    const samples = Array.isArray(p) ? p : [p];
    if (!samples.length) return;
    const id = samples[0].id;
    const f = this.fingers.get(id);
    if (!f) return;
    const start = f.stroke[0];
    for (const q of samples) {
      const point = { x: q.x, y: q.y };
      f.stroke.push(point);
      if (Math.hypot(q.x - start.x, q.y - start.y) >= TAP_SLOP) f.wandered = true;
      if (this.drawer === id) emit({ type: 'drawPoint', point });
    }
    const last = samples[samples.length - 1];
    if (this.drawer === null && this.canDraw() && Math.hypot(last.x - start.x, last.y - start.y) > DRAW_THRESHOLD) {
      this.drawer = id;
      emit({ type: 'drawStart', points: f.stroke.slice() });
    }
  }

  up(p: PointerInput, emit: (e: GestureEvent) => void) {
    const f = this.fingers.get(p.id);
    if (!f) return;
    this.fingers.delete(p.id);
    if (this.drawer === p.id) {
      this.drawer = null;
      emit({ type: 'drawEnd', stroke: f.stroke, tapLike: isTapLike(f.stroke) });
      return;
    }
    if (f.wandered) return; // a slide that lost the race to become the drawing: neither tap nor shape
    const second = f.shared || this.fingers.size > 0;
    if (second && p.t - f.t > SECOND_TAP_MS) return;
    // A tap counts where the finger landed: a rolled fingertip lifts a few px away from what it aimed at.
    const start = f.stroke[0];
    emit({ type: 'tap', x: start.x, y: start.y, second });
  }

  cancel(id: number, emit: (e: GestureEvent) => void) {
    if (!this.fingers.delete(id)) return;
    if (this.drawer === id) {
      this.drawer = null;
      emit({ type: 'drawCancel' });
    }
  }
}
