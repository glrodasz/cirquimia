/**
 * Touch stick for phones and tablets: a faint ring at the bottom left. It is no blind spot: the ring only shows where
 * the stick is, and every touch there first goes to the usual tap/draw logic. A quick tap still walks or casts, and a
 * stroke that starts moving right away is a drawing. Only a finger that stays put for HOLD_MS becomes the stick, and
 * from then on the alchemist walks toward it, relative to the screen like WASD, until it lifts.
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

/** Whether a press on the ring has become the stick: held long enough, without starting a drawing. */
export const padClaims = (heldMs: number, travelled: number, drawing: boolean) =>
  !drawing && heldMs >= HOLD_MS && travelled <= DRAW_THRESHOLD;

/** The screens that most likely have no keyboard: a finger drives them. */
export const isTouch = () => matchMedia('(pointer: coarse)').matches;

interface Press {
  id: number;
  x: number;
  y: number;
  t: number;
  /** Last known finger position. */
  lx: number;
  ly: number;
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
  update(now: number, drawing: (id: number) => boolean, claim: (id: number) => void): void;
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
      press = { id, x, y, t, lx: x, ly: y };
      return true;
    },
    move(id, x, y) {
      if (stick === id) {
        follow(x, y);
        return true;
      }
      if (press?.id === id) {
        press.lx = x;
        press.ly = y;
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
    update(now, drawing, claim) {
      if (!press) return;
      const p = press;
      if (drawing(p.id)) {
        press = null;
        return;
      }
      if (!padClaims(now - p.t, Math.hypot(p.lx - p.x, p.ly - p.y), false)) {
        if (Math.hypot(p.lx - p.x, p.ly - p.y) > DRAW_THRESHOLD) press = null;
        return;
      }
      press = null;
      stick = p.id;
      el.classList.add('on');
      follow(p.lx, p.ly);
      claim(p.id);
    },
  };
}
