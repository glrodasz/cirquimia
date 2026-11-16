import * as THREE from 'three';
import { heightAt } from './noise';

const UP = new THREE.Vector3(0, 1, 0);

/** The terrain's up direction at (x, z), averaged over a footprint of radius `r` so a bump smaller than it doesn't tip it. */
export function groundNormal(x: number, z: number, r: number, out = new THREE.Vector3()) {
  const e = Math.max(r, 0.05);
  return out.set(heightAt(x - e, z) - heightAt(x + e, z), 2 * e, heightAt(x, z - e) - heightAt(x, z + e)).normalize();
}

/**
 * How deep a base of radius `r`, lying on the plane through (x, ground, z) with that normal, must sink
 * so no edge of it floats where the ground curves away below the plane.
 */
export function seatDepth(x: number, z: number, r: number, normal: THREE.Vector3) {
  const y = heightAt(x, z);
  let deepest = 0;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const dx = Math.sin(a) * r;
    const dz = Math.cos(a) * r;
    const plane = y - (normal.x * dx + normal.z * dz) / normal.y;
    deepest = Math.max(deepest, plane - heightAt(x + dx, z + dz));
  }
  return deepest * normal.y;
}

/** Turns `obj` so its +Y points along the terrain's normal at its foot. */
export function alignToGround(obj: THREE.Object3D, normal: THREE.Vector3) {
  obj.quaternion.setFromUnitVectors(UP, normal);
}
