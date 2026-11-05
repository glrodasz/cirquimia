import { describe, expect, it } from 'vitest';
import { DRAW_THRESHOLD, PointerRouter, SECOND_TAP_MS, TAP_SLOP, isTapLike, type GestureEvent } from '../src/pointer';

function setup(canDraw = true) {
  const events: GestureEvent[] = [];
  const router = new PointerRouter(() => canDraw);
  const emit = (e: GestureEvent) => events.push(e);
  let t = 0;
  const at = (id: number, x: number, y: number, primary = false) => ({ id, x, y, t: (t += 16), primary });
  return {
    events,
    router,
    types: () => events.filter((e) => e.type !== 'drawPoint').map((e) => e.type),
    down: (id: number, x: number, y: number, primary = id === 1) => router.down(at(id, x, y, primary), emit),
    move: (id: number, x: number, y: number) => router.move(at(id, x, y), emit),
    up: (id: number, x: number, y: number) => router.up(at(id, x, y), emit),
    wait: (ms: number) => (t += ms),
    cancel: (id: number) => router.cancel(id, emit),
  };
}

/** Drags pointer `id` along a straight line in `steps` moves. */
function drag(s: ReturnType<typeof setup>, id: number, from: [number, number], to: [number, number], steps = 10) {
  for (let i = 1; i <= steps; i++) s.move(id, from[0] + ((to[0] - from[0]) * i) / steps, from[1] + ((to[1] - from[1]) * i) / steps);
}

describe('one finger', () => {
  it('a still press is a tap where it landed', () => {
    const s = setup();
    s.down(1, 100, 100);
    s.move(1, 104, 103);
    s.up(1, 104, 103);
    expect(s.events).toEqual([{ type: 'tap', x: 100, y: 100, second: false }]);
  });

  it('past the threshold it becomes a drawing', () => {
    const s = setup();
    s.down(1, 100, 100);
    drag(s, 1, [100, 100], [100 + DRAW_THRESHOLD + 30, 100]);
    s.up(1, 142, 100);
    expect(s.types()).toEqual(['drawStart', 'drawEnd']);
    const end = s.events.at(-1) as Extract<GestureEvent, { type: 'drawEnd' }>;
    expect(end.tapLike).toBe(false);
    expect(end.stroke[0]).toEqual({ x: 100, y: 100 });
  });

  it('a fat-finger tap that slid a little is flagged tapLike, so it still walks', () => {
    const s = setup();
    s.down(1, 100, 100);
    drag(s, 1, [100, 100], [100 + TAP_SLOP - 10, 108], 4);
    s.up(1, 130, 108);
    const end = s.events.at(-1) as Extract<GestureEvent, { type: 'drawEnd' }>;
    expect(end.type).toBe('drawEnd');
    expect(end.tapLike).toBe(true);
  });

  it('no ink while drawing is held back (tutorial), and the press is still a tap', () => {
    const s = setup(false);
    s.down(1, 100, 100);
    s.move(1, 120, 100);
    s.up(1, 120, 100);
    expect(s.types()).toEqual(['tap']);
  });

  it('tap spam: every quick tap walks', () => {
    const s = setup();
    for (let i = 0; i < 6; i++) {
      s.down(1, 50 + i * 30, 200);
      s.up(1, 52 + i * 30, 201);
      s.wait(40);
    }
    expect(s.types()).toEqual(Array(6).fill('tap'));
  });

  it('a cancelled drawing clears the ink', () => {
    const s = setup();
    s.down(1, 0, 0);
    drag(s, 1, [0, 0], [80, 0]);
    s.cancel(1);
    expect(s.types()).toEqual(['drawStart', 'drawCancel']);
    expect(s.router.busy).toBe(false);
  });
});

describe('moving and drawing at once', () => {
  it('a second-finger tap while drawing walks, and the drawing carries on', () => {
    const s = setup();
    s.down(1, 100, 100);
    drag(s, 1, [100, 100], [200, 100]);
    expect(s.down(2, 300, 500)).toBe(true);
    s.up(2, 302, 501);
    drag(s, 1, [200, 100], [200, 200]);
    s.up(1, 200, 200);
    expect(s.types()).toEqual(['drawStart', 'tap', 'drawEnd']);
    expect(s.events.find((e) => e.type === 'tap')).toEqual({ type: 'tap', x: 300, y: 500, second: true });
  });

  it('drawing can start while a tap finger is still down (tap-spamming with the other hand)', () => {
    const s = setup();
    s.down(1, 300, 500); // tap finger lands first
    s.down(2, 100, 100); // drawing finger
    drag(s, 2, [100, 100], [200, 100]);
    s.up(1, 300, 500);
    drag(s, 2, [200, 100], [200, 200]);
    s.up(2, 200, 200);
    expect(s.types()).toEqual(['drawStart', 'tap', 'drawEnd']);
    expect(s.events.find((e) => e.type === 'tap')).toMatchObject({ second: true });
  });

  it('a thumb resting on the screen while drawing is not a tap', () => {
    const s = setup();
    s.down(1, 100, 100);
    drag(s, 1, [100, 100], [200, 100]);
    s.down(2, 300, 500);
    s.wait(SECOND_TAP_MS + 50);
    s.up(2, 300, 500);
    expect(s.types()).toEqual(['drawStart']);
  });

  it('a third finger is ignored', () => {
    const s = setup();
    s.down(1, 0, 0);
    s.down(2, 10, 10);
    expect(s.down(3, 20, 20)).toBe(false);
  });

  it('a lost pointerup does not lock input: the next first touch starts fresh', () => {
    const s = setup();
    s.down(1, 0, 0);
    drag(s, 1, [0, 0], [80, 0]); // ...and its pointerup never arrives
    s.down(7, 100, 100, true);
    s.up(7, 100, 100);
    expect(s.types()).toEqual(['drawStart', 'drawCancel', 'tap']);
    expect(s.events.at(-1)).toMatchObject({ second: false });
  });
});

describe('isTapLike', () => {
  it('measures from where the finger landed', () => {
    expect(isTapLike([{ x: 0, y: 0 }, { x: 20, y: 20 }])).toBe(true);
    expect(isTapLike([{ x: 0, y: 0 }, { x: TAP_SLOP, y: 0 }])).toBe(false);
  });
});
