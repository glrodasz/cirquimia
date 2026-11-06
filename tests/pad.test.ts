import { describe, expect, it } from 'vitest';
import { padAxes } from '../src/pad';

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
