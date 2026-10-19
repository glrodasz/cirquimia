// Seeded helpers: the same seed always gives the same meadow.

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function valueNoise(x: number, z: number): number {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const xf = x - xi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi);
  const b = hash(xi + 1, zi);
  const c = hash(xi, zi + 1);
  const d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/**
 * A local change to the ground: a bowl (negative depth) or a hill (positive), with an optional rim.
 * `flatten` levels the surrounding ground first, so a pond's water line stays even.
 */
export interface Dent {
  x: number;
  z: number;
  r: number;
  depth: number;
  rim: number;
  flatten?: boolean;
}

interface Terrain {
  offX: number;
  offZ: number;
  relief: number;
  dents: Array<Dent & { baseY: number }>;
}

let terrain: Terrain = { offX: 0, offZ: 0, relief: 1, dents: [] };

function baseHeight(x: number, z: number): number {
  const nx = x + terrain.offX;
  const nz = z + terrain.offZ;
  return ((valueNoise(nx * 0.12, nz * 0.12) - 0.5) * 0.7 + (valueNoise(nx * 0.45, nz * 0.45) - 0.5) * 0.18) * terrain.relief;
}

/** Switches the height field to a new meadow. Call before building anything that stands on the ground. */
export function setTerrain(seed: number, dents: Dent[], relief = 1) {
  const rand = mulberry32(seed ^ 0x9e3779b9);
  terrain = { offX: (rand() - 0.5) * 2000, offZ: (rand() - 0.5) * 2000, relief, dents: [] };
  terrain.dents = dents.map((d) => ({ ...d, baseY: baseHeight(d.x, d.z) }));
}

/** Ground height of the dent's surroundings before it was carved (the water line reference for ponds). */
export function dentBase(d: Dent): number {
  return terrain.dents.find((t) => t.x === d.x && t.z === d.z)?.baseY ?? baseHeight(d.x, d.z);
}

/** Ground height in world units; shared by the terrain mesh and everything standing on it. */
export function heightAt(x: number, z: number): number {
  let h = baseHeight(x, z);
  for (const dent of terrain.dents) {
    const d = Math.hypot(x - dent.x, z - dent.z) / dent.r;
    if (d > 1.8) continue;
    if (dent.flatten) {
      const w = d < 1 ? 1 : d > 1.6 ? 0 : 1 - (d - 1) / 0.6;
      h += (dent.baseY - h) * w * w * (3 - 2 * w);
    }
    if (d < 1) h += dent.depth * (1 - d * d) ** 2;
    if (dent.rim) h += dent.rim * Math.exp(-(((d - 1) / 0.28) ** 2));
  }
  return h;
}

/** 0..1 field used to tint the grass in patches. */
export function patchAt(x: number, z: number): number {
  return valueNoise((x + terrain.offX) * 0.08 + 31.7, (z + terrain.offZ) * 0.08 - 12.3);
}
