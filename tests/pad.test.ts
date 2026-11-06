import { describe, expect, it } from 'vitest';
import { FLICK_MAX, FLICK_REACH, HOLD_MS, LONG_EXTRA_MS, padAxes, padClaims, STILL_MS } from '../src/pad';
import { DRAW_THRESHOLD } from '../src/pointer';

describe('padAxes', () => {
  it('is zero inside the dead zone', () => {
    expect(padAxes(0, 0, 60)).toEqual({ x: 0, y: 0 });
    expect(padAxes(5, -5, 60)).toEqual({ x: 0, y: 0 });
  });
  it('points up the screen when the finger is above the centre', () => {
    const a = padAxes(0, -40, 60);
    expect(a.x).toBeCloseTo(0);
    expect(a.y).toBeCloseTo(1);
  });
  it('is unit length in any direction, however far the finger goes', () => {
    const a = padAxes(200, 200, 60);
    expect(Math.hypot(a.x, a.y)).toBeCloseTo(1);
    expect(a.x).toBeCloseTo(Math.SQRT1_2);
    expect(a.y).toBeCloseTo(-Math.SQRT1_2);
  });
});

describe('padClaims', () => {
  const rest = { held: 0, travelled: 0, path: 0, still: 0, reach: 0.2 };
  it('leaves a quick tap alone so it can walk or cast', () => {
    expect(padClaims({ ...rest, held: HOLD_MS - 40, travelled: 2, still: HOLD_MS - 40 })).toBe(false);
  });
  it('takes a finger that rests on the ring', () => {
    expect(padClaims({ ...rest, held: HOLD_MS, travelled: 3, still: HOLD_MS })).toBe(true);
  });
  it('takes a straight flick that then rests, short or long, if it ends near the ring', () => {
    const flick = { ...rest, held: 300, travelled: 40, path: 45, reach: 0.9 };
    expect(padClaims({ ...flick, still: 20 })).toBe(false);
    expect(padClaims({ ...flick, still: STILL_MS })).toBe(true);
    const long = { ...rest, held: 500, travelled: 150, path: 175, reach: 2 };
    expect(padClaims({ ...long, still: STILL_MS })).toBe(false);
    expect(padClaims({ ...long, still: STILL_MS + LONG_EXTRA_MS })).toBe(true);
  });
  it('never takes a drawing: too long, curved like a shape, or ending far away', () => {
    const long = { ...rest, held: 900, still: 500 };
    expect(padClaims({ ...long, travelled: 200, path: FLICK_MAX + 1, reach: 1 })).toBe(false);
    expect(padClaims({ ...long, travelled: 40, path: 150, reach: 1 })).toBe(false);
    expect(padClaims({ ...long, travelled: 60, path: 60, reach: FLICK_REACH + 0.1 })).toBe(false);
  });
  it('waits while a stroke keeps moving', () => {
    expect(padClaims({ ...rest, held: 400, travelled: DRAW_THRESHOLD + 10, path: 60, still: 16 })).toBe(false);
  });
});
