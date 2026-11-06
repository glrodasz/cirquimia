import { describe, expect, it } from 'vitest';
import { HOLD_MS, padAxes, padClaims } from '../src/pad';
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
  it('leaves a quick tap alone so it can walk or cast', () => {
    expect(padClaims(HOLD_MS - 40, 2, false)).toBe(false);
  });
  it('takes a finger that rests on the ring', () => {
    expect(padClaims(HOLD_MS, 3, false)).toBe(true);
  });
  it('never takes a drawing, or a finger that already slid away', () => {
    expect(padClaims(HOLD_MS * 3, 0, true)).toBe(false);
    expect(padClaims(HOLD_MS * 3, DRAW_THRESHOLD + 1, false)).toBe(false);
  });
});
