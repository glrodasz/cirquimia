import * as THREE from 'three';
import { heightAt } from './noise';

const UP = new THREE.Vector3(0, 1, 0);

/**
 * The ground as it is drawn: a grid of jittered vertices sampled from heightAt, split into flat triangles.
 * Between vertices the drawn ground can sit well above or below the smooth height field (most on pond banks
 * and hill crests), so anything that must look planted on it samples this instead.
 */
let surface: { pos: ArrayLike<number>; segments: number; size: number } | null = null;

/** Registers the drawn ground: the vertex positions of a rotated PlaneGeometry(size, size, segments, segments). */
export function setGroundSurface(pos: ArrayLike<number>, segments: number, size: number) {
  surface = { pos: Float32Array.from(pos), segments, size };
}

/** Forgets the drawn ground (tests, or before a new meadow is built): surfaceAt falls back to heightAt. */
export function clearGroundSurface() {
  surface = null;
}

/** Height of the drawn ground at (x, z): the flat triangle under the point, or heightAt off the grid. */
export function surfaceAt(x: number, z: number): number {
  if (!surface) return heightAt(x, z);
  const { pos, segments, size } = surface;
  const step = size / segments;
  const half = size / 2;
  const row = segments + 1;
  const cx = Math.floor((x + half) / step);
  const cz = Math.floor((z + half) / step);
  // Jittered vertices can push a point into a neighbouring cell's triangles, so look one cell around.
  for (let dz = 0; dz <= 2; dz++) {
    for (let dx = 0; dx <= 2; dx++) {
      const ix = cx + (dx === 0 ? 0 : dx === 1 ? -1 : 1);
      const iz = cz + (dz === 0 ? 0 : dz === 1 ? -1 : 1);
      if (ix < 0 || iz < 0 || ix >= segments || iz >= segments) continue;
      const a = ix + row * iz;
      const b = ix + row * (iz + 1);
      const c = ix + 1 + row * (iz + 1);
      const d = ix + 1 + row * iz;
      const y = inTriangle(pos, a, b, d, x, z) ?? inTriangle(pos, b, c, d, x, z);
      if (y !== null) return y;
    }
  }
  return heightAt(x, z);
}

function inTriangle(pos: ArrayLike<number>, a: number, b: number, c: number, x: number, z: number): number | null {
  const ax = pos[a * 3], ay = pos[a * 3 + 1], az = pos[a * 3 + 2];
  const bx = pos[b * 3], by = pos[b * 3 + 1], bz = pos[b * 3 + 2];
  const cx = pos[c * 3], cy = pos[c * 3 + 1], cz = pos[c * 3 + 2];
  const det = (bz - cz) * (ax - cx) + (cx - bx) * (az - cz);
  if (det === 0) return null;
  const u = ((bz - cz) * (x - cx) + (cx - bx) * (z - cz)) / det;
  const v = ((cz - az) * (x - cx) + (ax - cx) * (z - cz)) / det;
  const w = 1 - u - v;
  const eps = -1e-6;
  if (u < eps || v < eps || w < eps) return null;
  return u * ay + v * by + w * cy;
}

/** The drawn ground's up direction at (x, z), averaged over a footprint of radius `r` so a bump smaller than it doesn't tip it. */
export function groundNormal(x: number, z: number, r: number, out = new THREE.Vector3()) {
  const e = Math.max(r, 0.05);
  return out.set(surfaceAt(x - e, z) - surfaceAt(x + e, z), 2 * e, surfaceAt(x, z - e) - surfaceAt(x, z + e)).normalize();
}

/**
 * How deep a base of radius `r`, lying on the plane through (x, ground, z) with that normal, must sink
 * so no edge of it floats where the ground curves away below the plane.
 */
export function seatDepth(x: number, z: number, r: number, normal: THREE.Vector3) {
  const y = surfaceAt(x, z);
  let deepest = 0;
  // Two rings, so a crease between ground triangles inside the base is caught too.
  for (const k of [0.5, 1]) {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const dx = Math.sin(a) * r * k;
      const dz = Math.cos(a) * r * k;
      const plane = y - (normal.x * dx + normal.z * dz) / normal.y;
      deepest = Math.max(deepest, plane - surfaceAt(x + dx, z + dz));
    }
  }
  return deepest * normal.y;
}

/** Turns `obj` so its +Y points along the terrain's normal at its foot. */
export function alignToGround(obj: THREE.Object3D, normal: THREE.Vector3) {
  obj.quaternion.setFromUnitVectors(UP, normal);
}
