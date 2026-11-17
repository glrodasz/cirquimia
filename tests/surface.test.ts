import { afterAll, describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { heightAt, mulberry32, setTerrain } from '../src/noise';
import { clearGroundSurface, groundNormal, seatDepth, setGroundSurface, surfaceAt } from '../src/seat';

// Builds the ground the way the meadow does: a jittered grid sampled from heightAt, then flat triangles.
function drawnGround(size: number, segments: number) {
  const geo = new THREE.PlaneGeometry(size, size, segments, segments).rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const rand = mulberry32(42);
  const step = size / segments;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + (rand() - 0.5) * step * 0.45;
    const z = pos.getZ(i) + (rand() - 0.5) * step * 0.45;
    pos.setXYZ(i, x, heightAt(x, z), z);
  }
  setGroundSurface(pos.array, segments, size);
  return new THREE.Mesh(geo.toNonIndexed(), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
}

describe('strikes stand on the ground as drawn', () => {
  setTerrain(99, [{ x: 0, z: 0, r: 1.4, depth: -0.5, rim: 0.15 }], 1);
  const size = 16;
  const mesh = drawnGround(size, Math.round(size / (90 / 80)));
  mesh.updateMatrixWorld();
  const ray = new THREE.Raycaster();
  const drawnAt = (x: number, z: number) => {
    ray.set(new THREE.Vector3(x, 10, z), new THREE.Vector3(0, -1, 0));
    return ray.intersectObject(mesh)[0]?.point.y ?? NaN;
  };
  afterAll(clearGroundSurface);

  it('follows the drawn triangles, which stray from the smooth height field between vertices', () => {
    let stray = 0;
    for (let i = 0; i < 300; i++) {
      const x = ((i * 37) % 100) / 100 * 5 - 2.5;
      const z = ((i * 61) % 100) / 100 * 5 - 2.5;
      expect(surfaceAt(x, z)).toBeCloseTo(drawnAt(x, z), 5);
      stray = Math.max(stray, Math.abs(drawnAt(x, z) - heightAt(x, z)));
    }
    // Enough to bury a small pillar, which is why strikes can't just use heightAt.
    expect(stray).toBeGreaterThan(0.03);
  });

  it('beds every base so no edge floats over the drawn ground, even across a crease', () => {
    for (let i = 0; i < 300; i++) {
      const x = ((i * 53) % 100) / 100 * 5 - 2.5;
      const z = ((i * 29) % 100) / 100 * 5 - 2.5;
      const r = 0.12;
      const n = groundNormal(x, z, r);
      const base = new THREE.Vector3(x, surfaceAt(x, z), z).addScaledVector(n, -seatDepth(x, z, r, n));
      const u = new THREE.Vector3(1, 0, 0).projectOnPlane(n).normalize();
      const w = new THREE.Vector3().crossVectors(n, u);
      for (let k = 0; k < 16; k++) {
        const a = (k / 16) * Math.PI * 2;
        const p = base.clone().addScaledVector(u, Math.cos(a) * r).addScaledVector(w, Math.sin(a) * r);
        expect(p.y).toBeLessThanOrEqual(drawnAt(p.x, p.z) + 0.01);
      }
    }
  });
});
