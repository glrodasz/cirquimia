import { describe, expect, it, vi } from 'vitest';

// The meadow's look reads the page URL; tests have none.
vi.hoisted(() => {
  const url = new URL('http://localhost/');
  Object.assign(globalThis, { location: url, localStorage: { getItem: () => null, setItem() {}, removeItem() {} } });
});
import * as THREE from 'three';
import { BODY_RADIUS, Character } from '../src/character';
import { buildFeatures } from '../src/features';
import type { Feature, Layout } from '../src/generator';
import type { Obstacle } from '../src/meadow';

const DT = 1 / 60;

function feature(kind: Feature['kind'], rot = 0.7, size = 0.8, r = 1.6 * 0.8): Feature {
  return { kind, material: kind === 'estanque' ? 'agua' : 'fuego', x: 0, z: 0, rot, size, r, solid: true, animated: false, seed: 1 } as Feature;
}

function blockersOf(f: Feature) {
  const obstacles: Obstacle[] = [];
  buildFeatures({ features: [f] } as unknown as Layout, obstacles);
  return obstacles;
}

/** Holds a direction (keys or stick) for `seconds` from `from`; returns where it ends. */
function hold(obstacles: Obstacle[], from: [number, number], dir: [number, number], seconds: number) {
  const c = new Character(obstacles);
  c.root.position.set(from[0], 0, from[1]);
  for (let t = 0; t < seconds; t += DT) {
    c.steer(dir[0], dir[1]);
    c.update(DT);
  }
  return c.root.position;
}

describe('walking against the meadow', () => {
  it("a pond stops the alchemist with its boots at the water's edge, not inside the water", () => {
    const pond = feature('estanque');
    const [water] = blockersOf(pond);
    const R = pond.r * 0.85;
    // The water's edge is at about R * 0.92 (it wobbles by a few per cent): the body ends right on it.
    expect(water.r + BODY_RADIUS).toBeGreaterThan(R * 0.92);
    expect(water.r).toBeLessThan(R * 0.92 * 0.96);
    const end = hold([water], [-3, 0], [1, 0], 3);
    expect(Math.hypot(end.x, end.z)).toBeGreaterThan(R * 0.92);
  });

  it('crossing past a campfire from any side never gets caught on it', () => {
    for (const rot of [0, 1, 2, 3, 4, 5]) {
      const obstacles = blockersOf(feature('fogata', rot, 1, 0.7));
      for (let a = 0; a < 360; a += 15) {
        for (const off of [-0.15, -0.05, 0.05, 0.15]) {
          const ar = (a * Math.PI) / 180;
          const dir: [number, number] = [-Math.cos(ar), -Math.sin(ar)];
          const from: [number, number] = [Math.cos(ar) * 1.2 - dir[1] * off, Math.sin(ar) * 1.2 + dir[0] * off];
          const end = hold(obstacles, from, dir, 2);
          // 2 s at full pace is 3.2: it has to come out well beyond the fire on the far side.
          const progress = (end.x - from[0]) * dir[0] + (end.z - from[1]) * dir[1];
          expect(progress, `rot ${rot}, from ${a}°, offset ${off}`).toBeGreaterThan(2);
        }
      }
    }
  });

  it('brushing a small prop keeps the full walking pace', () => {
    const post: Obstacle = { x: 0, z: 0, r: 0.12 };
    const end = hold([post], [-1, 0.1], [1, 0], 1);
    // 1.6 a second, minus a little for going round.
    expect(end.x).toBeGreaterThan(0.5);
  });

  it('walking straight into something big stops it there; it never wanders round on its own', () => {
    const boulder: Obstacle = { x: 0, z: 0, r: 0.8 };
    const end = hold([boulder], [-2, 0], [1, 0], 2);
    expect(end.x).toBeCloseTo(-(0.8 + BODY_RADIUS), 2);
    expect(Math.abs(end.z)).toBeLessThan(0.01);
  });

  it('wedged between two things it stays put instead of jittering', () => {
    // Two rocks too close to walk between, pushed into right where they meet.
    const rocks: Obstacle[] = [
      { x: 0, z: 0.25, r: 0.2 },
      { x: 0, z: -0.25, r: 0.2 },
    ];
    const c = new Character(rocks);
    c.root.position.set(-1, 0, 0);
    let last = c.root.position.clone();
    let settled = 0;
    for (let t = 0; t < 2; t += DT) {
      c.steer(1, 0);
      c.update(DT);
      for (const o of rocks) expect(Math.hypot(c.root.position.x - o.x, c.root.position.z - o.z)).toBeGreaterThan(o.r + BODY_RADIUS - 1e-3);
      if (t > 1) settled = Math.max(settled, c.root.position.distanceTo(last));
      last = c.root.position.clone();
    }
    expect(settled).toBeLessThan(1e-3);
  });

  it('rivals walk with the same body, so they slide past a campfire just the same', () => {
    // Rivals are Characters too (combat.ts): tap-to-walk routes round the fire and arrives.
    const obstacles = blockersOf(feature('fogata', 2, 1, 0.7));
    const c = new Character(obstacles);
    c.root.position.set(-1.2, 0, 0.05);
    c.setTarget(new THREE.Vector3(1.2, 0, 0.05));
    for (let i = 0; i < 180; i++) c.update(DT);
    expect(c.root.position.distanceTo(new THREE.Vector3(1.2, c.root.position.y, 0.05))).toBeLessThan(0.1);
  });
});
