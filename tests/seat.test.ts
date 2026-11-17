import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { heightAt, setTerrain } from '../src/noise';
import { groundNormal, seatDepth } from '../src/seat';

describe('strikes stand on the ground', () => {
  // A hilly meadow with a deep pond bowl, so there are real slopes and curves to stand on.
  setTerrain(1234, [{ x: 0, z: 0, r: 1.2, depth: -0.5, rim: 0.15 }], 2);

  it('point along the terrain normal: perpendicular to the slope, not straight up', () => {
    const n = groundNormal(1.1, 0.3, 0.1);
    const e = 0.1;
    // Both tangents across the footprint are (close to) perpendicular to the normal.
    const tx = new THREE.Vector3(2 * e, heightAt(1.1 + e, 0.3) - heightAt(1.1 - e, 0.3), 0).normalize();
    const tz = new THREE.Vector3(0, heightAt(1.1, 0.3 + e) - heightAt(1.1, 0.3 - e), 2 * e).normalize();
    expect(Math.abs(n.dot(tx))).toBeLessThan(1e-6);
    expect(Math.abs(n.dot(tz))).toBeLessThan(1e-6);
    expect(n.y).toBeLessThan(0.999); // really on a slope here
  });

  it('bed their base so no edge floats over the ground, wherever they land', () => {
    for (let i = 0; i < 400; i++) {
      const x = (i % 20) * 0.15 - 1.5;
      const z = Math.floor(i / 20) * 0.15 - 1.5;
      const r = 0.12;
      const n = groundNormal(x, z, r);
      const depth = seatDepth(x, z, r, n);
      expect(depth).toBeGreaterThanOrEqual(0);
      const base = new THREE.Vector3(x, heightAt(x, z), z).addScaledVector(n, -depth);
      // Every point on the rim of the base, in the plane perpendicular to the normal, is at or under the ground.
      const u = new THREE.Vector3(1, 0, 0).projectOnPlane(n).normalize();
      const w = new THREE.Vector3().crossVectors(n, u);
      for (let k = 0; k < 16; k++) {
        const a = (k / 16) * Math.PI * 2;
        const p = base.clone().addScaledVector(u, Math.cos(a) * r).addScaledVector(w, Math.sin(a) * r);
        expect(p.y).toBeLessThanOrEqual(heightAt(p.x, p.z) + 0.01);
      }
    }
  });
});
