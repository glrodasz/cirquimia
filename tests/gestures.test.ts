import { describe, expect, it } from 'vitest';
import { idealPath, mergedInHand, recognize, type ShapeKind } from '../src/gestures';
import { circle, regular, rng, spiral, squareCorners, trace, type Sloppy } from './strokes';

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

describe('mergedInHand', () => {
  it('merges fire and water, in either order, into the hourglass', () => {
    expect(mergedInHand('triangle', 'triangleDown')).toBe('hourglass');
    expect(mergedInHand('triangleDown', 'triangle')).toBe('hourglass');
  });

  it('merges the star with fire or water, in either order, into a fire or water star', () => {
    expect(mergedInHand('pentagram', 'triangle')).toBe('fireStar');
    expect(mergedInHand('triangle', 'pentagram')).toBe('fireStar');
    expect(mergedInHand('pentagram', 'triangleDown')).toBe('waterStar');
    expect(mergedInHand('triangleDown', 'pentagram')).toBe('waterStar');
  });

  it('just replaces anything else in hand', () => {
    expect(mergedInHand(null, 'triangle')).toBe('triangle');
    expect(mergedInHand(null, 'pentagram')).toBe('pentagram');
    expect(mergedInHand('triangle', 'triangle')).toBe('triangle');
    expect(mergedInHand('pentagram', 'pentagram')).toBe('pentagram');
    expect(mergedInHand('square', 'triangleDown')).toBe('triangleDown');
    expect(mergedInHand('hourglass', 'triangle')).toBe('triangle');
    expect(mergedInHand('hourglass', 'pentagram')).toBe('pentagram');
    expect(mergedInHand('fireStar', 'triangleDown')).toBe('triangleDown');
    expect(mergedInHand('waterStar', 'pentagram')).toBe('pentagram');
    expect(mergedInHand('triangle', 'square')).toBe('square');
  });
});

describe('spiral (vine)', () => {
  it('reads everyday spirals, either way round, inside out or outside in', () => {
    const t = tally(300, 21, (r) =>
      spiral(1.6 + r() * 1.6, 60 + r() * 80, {
        start: r(),
        clockwise: r() < 0.5,
        outsideIn: r() < 0.4,
        jitter: r() * 5,
        squash: 0.8 + r() * 0.35,
        inner: r() * 12,
      }, r),
    );
    expect(t.spiral ?? 0).toBeGreaterThanOrEqual(290);
  });

  it('a circle traced over twice, even drifting inward, stays a circle', () => {
    const t = tally(300, 23, (r) => {
      const pts = circle(50 + r() * 60, { start: r(), clockwise: r() < 0.5, jitter: r() * 5, over: 0.2 + r() * 0.9 }, r);
      // The hand drifts in a little as it goes round again.
      const drift = r() * 0.15;
      return pts.map((p, i) => {
        const k = 1 - (drift * i) / pts.length;
        return { x: 200 + (p.x - 200) * k, y: 300 + (p.y - 300) * k };
      });
    });
    expect(t.spiral ?? 0).toBe(0);
    expect(t.circle ?? 0).toBeGreaterThanOrEqual(290);
  });

  it('a single loose coil is not a spiral', () => {
    expect(recognize(spiral(1, 100, {}, rng(3)))?.kind).not.toBe('spiral');
  });

  it('squares and stars traced over twice never read as a spiral', () => {
    const r = rng(29);
    for (let i = 0; i < 100; i++) {
      expect(recognize(trace(squareCorners(80 + r() * 100), { start: r(), over: 1, jitter: 4 }, r))?.kind).not.toBe('spiral');
    }
  });

  it('snaps onto an open curve that starts and ends where the stroke does', () => {
    const stroke = spiral(2.5, 100, { jitter: 3 }, rng(5));
    const shape = recognize(stroke)!;
    expect(shape.kind).toBe('spiral');
    const ideal = idealPath(shape, stroke);
    const end = stroke[stroke.length - 1];
    const last = ideal[ideal.length - 1];
    expect(Math.hypot(end.x - last.x, end.y - last.y)).toBeLessThan(6);
  });
});
