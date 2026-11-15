import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import type { Obstacle } from '../src/meadow';
import { Spells, starTips, type StarCage } from '../src/spells';

// Steps the effects for `seconds`, recording the most blockers seen at once and the most pillars standing at once.
function run(spells: Spells, obstacles: Obstacle[], seconds: number) {
  let blockers = 0;
  let tips = 0;
  for (let t = 0; t < seconds; t += 1 / 60) {
    spells.update(1 / 60);
    blockers = Math.max(blockers, obstacles.length);
    let n = 0;
    spells.forEachStanding(() => n++);
    tips = Math.max(tips, n);
  }
  return { blockers, tips };
}

describe('rock pillars and star tips', () => {
  const from = new THREE.Vector3(-3, 0, 0);
  const at = new THREE.Vector3(0, 0, 0);

  it('never block anyone, and are reported while they stand so walking onto one strikes', () => {
    const obstacles: Obstacle[] = [];
    const spells = new Spells(obstacles);
    spells.pillars(from, at, 'earth');
    const square = run(spells, obstacles, 4);
    expect(square.blockers).toBe(0);
    expect(square.tips).toBe(1);

    for (const element of ['columns', 'fireStar', 'waterStar'] as const) {
      const cage: StarCage = { x: 0, z: 0, reach: 1, caster: null, element, standing: 0, tips: 0, erupted: 0, struck: new Set() };
      for (const tip of starTips(at, 1)) spells.pillars(from, tip.at, element, null, 0.5 + tip.delay, null, 1, cage);
      const seen = run(spells, obstacles, 5);
      expect(seen.blockers).toBe(0);
      expect(seen.tips).toBeGreaterThan(0);
    }
  });

  it('leave the wall solid', () => {
    const obstacles: Obstacle[] = [];
    const spells = new Spells(obstacles);
    spells.wall(at, from);
    expect(run(spells, obstacles, 2).blockers).toBeGreaterThan(0);
  });
});
