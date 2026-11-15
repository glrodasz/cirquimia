import { describe, expect, it } from 'vitest';
import { recognize, type Point } from '../src/gestures';
import { rng, trace } from './strokes';

/** The star as training's guide draws it, tip to tip from the top (src/guides.ts), 150 px across. */
const STAR: Point[] = [[24, 6], [34.6, 38.5], [6.8, 18.5], [41.2, 18.5], [13.4, 38.5]].map(([x, y]) => ({ x: x * 3.125, y: y * 3.125 }));

describe("training's star guide", () => {
  it('reads as a star even when the finger lands off the top tip (it used to read as a water triangle)', () => {
    const r = rng(3);
    for (let i = 0; i < 300; i++) {
      const stroke = trace(STAR, { jitter: r() * 8, over: r() * 0.1, lead: 5 + r() * 25, tail: r() * 15 }, r);
      expect(recognize(stroke)?.kind).toBe('pentagram');
    }
  });
});
