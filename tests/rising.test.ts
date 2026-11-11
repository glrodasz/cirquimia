import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { BODY_RADIUS, Character } from '../src/character';
import type { Obstacle } from '../src/meadow';

const DT = 1 / 60;

function walker(obstacles: Obstacle[]) {
  const c = new Character(obstacles);
  c.root.position.set(0, 0, 0);
  c.setTarget(new THREE.Vector3(3, 0, 0));
  return c;
}

describe('spell blockers rising under someone', () => {
  it('a pillar breaking out under a walking alchemist does not throw it aside', () => {
    const obstacles: Obstacle[] = [];
    const c = walker(obstacles);
    c.update(DT);
    const before = c.root.position.clone();
    // Struck just off-centre, so the old push-out would have shoved it sideways at once.
    obstacles.push({ x: before.x + 0.02, z: before.z + 0.05, r: 0.1, rises: true });
    let worst = 0;
    let last = before.clone();
    for (let i = 0; i < 60; i++) {
      c.update(DT);
      worst = Math.max(worst, c.root.position.distanceTo(last));
      last = c.root.position.clone();
    }
    // Never more than one walking step per frame, and it carries on along its way.
    expect(worst).toBeLessThan(0.05);
    expect(Math.abs(c.root.position.z)).toBeLessThan(0.02);
    expect(c.root.position.x).toBeGreaterThan(before.x + 0.3);
  });

  it('once clear of it, the pillar blocks again', () => {
    const obstacles: Obstacle[] = [];
    const c = walker(obstacles);
    c.update(DT);
    const p = c.root.position;
    const pillar: Obstacle = { x: p.x, z: p.z, r: 0.1, rises: true };
    obstacles.push(pillar);
    for (let i = 0; i < 60; i++) c.update(DT);
    // Walk back through where it stands: it has to be kept out now.
    c.setTarget(new THREE.Vector3(-3, 0, 0));
    for (let i = 0; i < 180; i++) {
      c.update(DT);
      expect(Math.hypot(c.root.position.x - pillar.x, c.root.position.z - pillar.z)).toBeGreaterThan(pillar.r + BODY_RADIUS - 1e-3);
    }
  });

  it('a pillar that rises elsewhere still blocks whoever walks into it', () => {
    const obstacles: Obstacle[] = [{ x: 1, z: 0, r: 0.1, rises: true }];
    const c = walker(obstacles);
    for (let i = 0; i < 240; i++) {
      c.update(DT);
      expect(Math.hypot(c.root.position.x - 1, c.root.position.z)).toBeGreaterThan(0.1 + BODY_RADIUS - 1e-3);
    }
  });
});
