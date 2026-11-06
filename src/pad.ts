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

/** ms a short flick must then rest before it reads as pushing the stick. */
export const STILL_MS = 110;
/** Extra rest for a flick that ends outside the ring. */
export const LONG_EXTRA_MS = 60;
/** px a finger may jitter and still count as resting. */
export const STILL_PX = 5;
/** px of stroke beyond which a press is a drawing for good. */
export const FLICK_MAX = 220;
/** A flick must be a fairly straight line (distance from the start over path drawn): shapes turn corners. */
export const FLICK_STRAIGHT = 0.75;
/** How far from the ring's centre (in ring radii) a flick may end and still steer. */
export const FLICK_REACH = 2.5;

export interface PressState {
  /** ms since the finger landed. */
  held: number;
  /** px from where it landed. */
  travelled: number;
  /** px of path drawn so far. */
  path: number;
  /** ms since it last moved more than STILL_PX. */
  still: number;
  /** Distance from the ring's centre, in ring radii. */
  reach: number;
}

/** Whether a press on the ring has become the stick: a resting finger, or a straight flick from it that then rests. */
export function padClaims(p: PressState) {
  if (p.travelled <= DRAW_THRESHOLD) return p.reach <= 1 && p.held >= HOLD_MS;
  if (p.reach > FLICK_REACH || p.path > FLICK_MAX || p.travelled < p.path * FLICK_STRAIGHT) return false;
  // A line ending outside the ring could be a shape's first side with a pause at its corner: ask a little longer.
  return p.still >= (p.reach > 1 ? STILL_MS + LONG_EXTRA_MS : STILL_MS);
}

/** The screens that most likely have no keyboard: a finger drives them. */
export const isTouch = () => matchMedia('(pointer: coarse)').matches;

interface Press {
  id: number;
  x: number;
  y: number;
  t: number;
  /** Last known finger position, path length and when it last really moved. */
  lx: number;
  ly: number;
  path: number;
  movedAt: number;
}

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

export function mountPad(): Pad {
  if (!isTouch() || new URLSearchParams(location.search).get('pad') === '0') return NONE;

  const el = document.createElement('div');
  el.id = 'pad';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="knob"></span>';
  document.body.append(el);
  document.body.classList.add('has-pad');
  const knob = el.querySelector<HTMLElement>('.knob')!;

  let a = { x: 0, y: 0 };
  let press: Press | null = null;
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
      if (Math.hypot(x - cx, y - cy) > radius) return false;
      press = { id, x, y, t, lx: x, ly: y, path: 0, movedAt: t };
      return true;
    },
    move(id, x, y) {
      if (stick === id) {
        follow(x, y);
        return true;
      }
      const p = press;
      if (p?.id === id) {
        const step = Math.hypot(x - p.lx, y - p.ly);
        if (step > STILL_PX) {
          p.path += step;
          p.lx = x;
          p.ly = y;
          p.movedAt = performance.now();
        }
        if (p.path > FLICK_MAX) press = null;
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
      const state = {
        held: now - p.t,
        travelled: Math.hypot(p.lx - p.x, p.ly - p.y),
        path: p.path,
        still: now - p.movedAt,
        reach: Math.hypot(p.lx - cx, p.ly - cy) / radius,
      };
      if (!padClaims(state)) return;
      press = null;
      stick = p.id;
      el.classList.add('on');
      follow(p.lx, p.ly);
      claim(p.id);
    },
  };
}
