import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { DEFAULT_PARAMS, generateLayout } from '../src/generator';
import { WIDEST_ASPECT, frameCamera, playAreaFor, walkable } from '../src/playArea';

const SCREENS: Array<[number, number]> = [[1920, 1080], [2560, 1080], [1440, 900], [1024, 768], [390, 844], [375, 667]];

describe('play area', () => {
  it('stops at a 16:9 frame on wider screens', () => {
    const a = playAreaFor(WIDEST_ASPECT);
    const b = playAreaFor(2560 / 1080);
    expect(b.halfWidthAt(0)).toBeCloseTo(a.halfWidthAt(0), 5);
    expect(playAreaFor(4 / 3).halfWidthAt(0)).toBeLessThan(a.halfWidthAt(0));
    const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 200);
    frameCamera(camera, 21 / 9);
    // The ultrawide screen shows ground past the frame's side, but nobody may walk there.
    const side = new THREE.Vector3(a.halfWidthAt(0) + 0.5, 0, 0);
    const [x, z] = [side.x * Math.cos((24 * Math.PI) / 180), -side.x * Math.sin((24 * Math.PI) / 180)];
    const q = new THREE.Vector3(x, 0, z).project(camera);
    expect(Math.abs(q.x)).toBeLessThan(1);
    expect(walkable(q, 21 / 9)).toBe(false);
  });

  it('puts every pond, campfire and rune circle wholly where anyone can walk, on every screen', () => {
    for (const [w, h] of SCREENS) {
      const aspect = w / h;
      const camera = new THREE.PerspectiveCamera(32, aspect, 0.5, 200);
      frameCamera(camera, aspect);
      const area = playAreaFor(aspect);
      for (let i = 0; i < 120; i++) {
        const layout = generateLayout(`s${i}`, DEFAULT_PARAMS, [], area);
        const kinds = layout.features.map((f) => f.kind);
        expect(kinds, `${w}x${h} s${i}`).toContain('estanque');
        expect(kinds, `${w}x${h} s${i}`).toContain('fogata');
        for (const f of layout.features) {
          if (!['estanque', 'fogata', 'runas', 'cristales'].includes(f.kind)) continue;
          const edge = f.r * 0.78;
          for (let k = 0; k < 16; k++) {
            const a = (k / 16) * Math.PI * 2;
            const q = new THREE.Vector3(f.x + Math.cos(a) * edge, 0, f.z + Math.sin(a) * edge).project(camera);
            expect(walkable(q, aspect), `${f.kind} ${w}x${h} s${i}`).toBe(true);
          }
        }
      }
    }
  });
});
