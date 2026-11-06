import { describe, expect, it } from 'vitest';
import { chargedInHand, recognize, type ShapeKind } from '../src/gestures';
import { circle, regular, rng, squareCorners, trace, type Sloppy } from './strokes';

/** Draws `count` random strokes and tallies what they read as. */
function tally(count: number, seed: number, draw: (r: () => number) => ReturnType<typeof trace>) {
  const r = rng(seed);
  const out: Partial<Record<ShapeKind | 'none', number>> = {};
  for (let i = 0; i < count; i++) {
    const kind = recognize(draw(r))?.kind ?? 'none';
    out[kind] = (out[kind] ?? 0) + 1;
  }
  return out;
}

const sloppy = (r: () => number, max: Required<Pick<Sloppy, 'jitter' | 'over' | 'lead' | 'tail'>>): Sloppy => ({
  start: r(),
  clockwise: r() < 0.5,
  jitter: r() * max.jitter,
  over: r() * max.over,
  lead: r() * max.lead,
  tail: r() * max.tail,
});

describe('clean shapes', () => {
  const r = rng(1);
  it.each([
    ['square', squareCorners(120)],
    ['triangle', regular(3, 80)],
    ['triangleDown', regular(3, 80, Math.PI / 2)],
    ['rhombus', regular(4, 80)],
  ] as const)('%s', (kind, corners) => {
    expect(recognize(trace(corners, {}, r))?.kind).toBe(kind);
  });

  it('circle', () => {
    expect(recognize(circle(70, {}, r))?.kind).toBe('circle');
  });

  it('a tiny scribble is no shape', () => {
    expect(recognize(trace(squareCorners(30), {}, r))).toBeNull();
  });
});

describe('squares drawn in a hurry (moving, on a phone)', () => {
  it('reads nearly every everyday square as a square, wherever the finger lands', () => {
    const t = tally(400, 7, (r) =>
      trace(squareCorners(70 + r() * 130, (r() - 0.5) * 0.35, r() * 12), sloppy(r, { jitter: 5, over: 0.15, lead: 15, tail: 12 }), r),
    );
    expect(t.square ?? 0).toBeGreaterThanOrEqual(396);
  });

  it('a shaky small square does not become a wall (circle)', () => {
    const t = tally(400, 11, (r) =>
      trace(squareCorners(60 + r() * 60, (r() - 0.5) * 0.35, r() * 15), sloppy(r, { jitter: 8, over: 0.25, lead: 24, tail: 20 }), r),
    );
    // Before the second, smoothed reading 26 of these (6.5%) cast a wall by mistake; now 11.
    expect(t.circle ?? 0).toBeLessThanOrEqual(14);
    expect(t.square ?? 0).toBeGreaterThanOrEqual(386);
  });

  it('starting the square with a hook where the finger lands still reads as a square', () => {
    const r = rng(3);
    for (const start of [0, 0.1, 0.25, 0.4, 0.6, 0.9]) {
      expect(recognize(trace(squareCorners(110), { start, lead: 20, tail: 15 }, r))?.kind).toBe('square');
    }
  });
});

describe('circles stay circles', () => {
  it('wobbly circles never turn into squares', () => {
    const t = tally(400, 5, (r) => circle(35 + r() * 80, { start: r(), jitter: r() * 10, over: r() * 0.2, clockwise: r() < 0.5 }, r));
    expect(t.circle).toBe(400);
  });
});

describe('chargedInHand', () => {
  it('merges fire and water, in either order, into the hourglass', () => {
    expect(chargedInHand('triangle', 'triangleDown')).toBe('hourglass');
    expect(chargedInHand('triangleDown', 'triangle')).toBe('hourglass');
  });

  it('just replaces anything else in hand', () => {
    expect(chargedInHand(null, 'triangle')).toBe('triangle');
    expect(chargedInHand('triangle', 'triangle')).toBe('triangle');
    expect(chargedInHand('square', 'triangleDown')).toBe('triangleDown');
    expect(chargedInHand('hourglass', 'triangle')).toBe('triangle');
  });
});
