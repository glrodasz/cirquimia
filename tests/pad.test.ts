import { describe, expect, it } from 'vitest';
import { FLICK_MAX, FLICK_REACH, HOLD_MS, LONG_EXTRA_MS, padAxes, padClaims, PressTrack, STILL_MS } from '../src/pad';
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
  const rest = { held: 0, travelled: 0, path: 0, total: 0, still: 0, reach: 0.2 };
  it('leaves a quick tap alone so it can walk or cast', () => {
    expect(padClaims({ ...rest, held: HOLD_MS - 40, travelled: 2, still: HOLD_MS - 40 })).toBe(false);
  });
  it('takes a finger that rests on the ring', () => {
    expect(padClaims({ ...rest, held: HOLD_MS, travelled: 3, still: HOLD_MS })).toBe(true);
  });
  it('takes a straight flick that then rests, short or long, if it ends near the ring', () => {
    const flick = { ...rest, held: 300, travelled: 40, path: 45, total: 45, reach: 0.9 };
    expect(padClaims({ ...flick, still: 20 })).toBe(false);
    expect(padClaims({ ...flick, still: STILL_MS })).toBe(true);
    const long = { ...rest, held: 500, travelled: 200, path: 220, total: 220, reach: 3 };
    expect(padClaims({ ...long, still: STILL_MS })).toBe(false);
    expect(padClaims({ ...long, still: STILL_MS + LONG_EXTRA_MS })).toBe(true);
  });
  it('never takes a drawing: too long, curved like a shape, or ending far away', () => {
    const late = { ...rest, held: 900, still: 500 };
    expect(padClaims({ ...late, travelled: 200, path: 200, total: FLICK_MAX + 1, reach: 1 })).toBe(false);
    expect(padClaims({ ...late, travelled: 40, path: 150, total: 150, reach: 1 })).toBe(false);
    expect(padClaims({ ...late, travelled: 60, path: 60, total: 60, reach: FLICK_REACH + 0.1 })).toBe(false);
  });
  it('waits while a stroke keeps moving', () => {
    expect(padClaims({ ...rest, held: 400, travelled: DRAW_THRESHOLD + 10, path: 60, total: 60, still: 16 })).toBe(false);
  });
});

describe('PressTrack', () => {
  /** Feeds a polyline at `speed` px/ms, one sample every 8 ms, starting at t = 0. Returns the time of the last point. */
  function drive(track: PressTrack, pts: [number, number][], speed = 0.6) {
    let t = 0;
    for (let i = 1; i < pts.length; i++) {
      const [ax, ay] = pts[i - 1];
      const [bx, by] = pts[i];
      const n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / (speed * 8)));
      for (let k = 1; k <= n; k++) {
        t += 8;
        track.add(ax + ((bx - ax) * k) / n, ay + ((by - ay) * k) / n, t);
      }
    }
    return t;
  }
  const claims = (track: PressTrack, now: number) => padClaims(track.state(now, 0, 0, 58));

  it('steers after a line out of the ring that eases back a little and rests', () => {
    const track = new PressTrack(1, 0, 0, 0);
    const t = drive(track, [[0, 0], [0, -90], [0, -75]]);
    expect(claims(track, t + 10)).toBe(false);
    expect(claims(track, t + STILL_MS + LONG_EXTRA_MS)).toBe(true);
  });
  it('still counts a thumb that drifts a few px while resting', () => {
    const track = new PressTrack(1, 0, 0, 0);
    let t = drive(track, [[0, 0], [40, -30]]);
    for (let i = 1; i <= 12; i++) track.add(40 + (i % 3), -30 + (i % 2) * 2, (t += 8));
    expect(claims(track, t)).toBe(true);
  });
  it('does not take a circle drawn from the ring, even if the finger stops at the end', () => {
    const track = new PressTrack(1, 0, 0, 0);
    const pts: [number, number][] = [];
    for (let i = 0; i <= 24; i++) pts.push([60 * Math.sin((i / 24) * Math.PI * 2), -60 + 60 * Math.cos((i / 24) * Math.PI * 2)]);
    const t = drive(track, [[0, 0], ...pts]);
    expect(claims(track, t + 400)).toBe(false);
  });
  it('does not take a triangle paused at its second corner', () => {
    const track = new PressTrack(1, 0, 0, 0);
    const t = drive(track, [[0, 0], [90, 0], [45, -80]]);
    expect(claims(track, t + 300)).toBe(false);
  });
});
