import * as THREE from 'three';
import { dentBase, heightAt, mulberry32 } from './noise';
import type { Obstacle } from './meadow';
import type { Feature, Kind, Layout } from './generator';
import { GLADE, leafTint, stoneTint } from './look';

const dummy = new THREE.Object3D();
const color = new THREE.Color();

function lambert(params: THREE.MeshLambertMaterialParameters = {}) {
  return new THREE.MeshLambertMaterial({ flatShading: true, ...params });
}

/** Collects instances of one geometry, then becomes a single InstancedMesh (one draw call). */
class Batch {
  private readonly matrices: THREE.Matrix4[] = [];
  private readonly colors: THREE.Color[] = [];
  constructor(
    private readonly geo: THREE.BufferGeometry,
    private readonly mat: THREE.Material,
    /** Lets the look recolour a batch (stone, leaves); the default keeps every tint. */
    private readonly recolor: (tint: THREE.ColorRepresentation) => THREE.ColorRepresentation = (tint) => tint,
  ) {}
  add(tint: THREE.ColorRepresentation) {
    dummy.updateMatrix();
    this.matrices.push(dummy.matrix.clone());
    this.colors.push(new THREE.Color(this.recolor(tint)));
  }
  build(cast = true, receive = true): THREE.InstancedMesh | null {
    if (!this.matrices.length) {
      this.geo.dispose();
      this.mat.dispose();
      return null;
    }
    const mesh = new THREE.InstancedMesh(this.geo, this.mat, this.matrices.length);
    this.matrices.forEach((m, i) => {
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, this.colors[i]);
    });
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    return mesh;
  }
}

function place(x: number, z: number, lift = 0) {
  dummy.position.set(x, heightAt(x, z) + lift, z);
}

interface Mote {
  x: number;
  z: number;
  y: number;
  phase: number;
  speed: number;
  rise: number;
  color: THREE.Color;
}

/** Everything the feature builders share: one batch per kind of geometry, no matter how many features. */
interface Ctx {
  rand: () => number;
  obstacles: Obstacle[];
  group: THREE.Group;
  stones: Batch;
  wood: Batch;
  planks: Batch;
  metal: Batch;
  crystals: Batch;
  embers: Batch;
  bushes: Batch;
  rubble: Batch;
  reeds: Batch;
  pads: Batch;
  ribbons: number[];
  motes: Mote[];
  flames: Array<{ x: number; y: number; z: number; s: number; phase: number; animated: boolean }>;
  animators: Array<(time: number) => void>;
}

/** World point at local (lx, lz) of a feature, rotated by its heading. */
function at(f: Feature, lx: number, lz: number): [number, number] {
  const c = Math.cos(f.rot);
  const s = Math.sin(f.rot);
  return [f.x + lx * c - lz * s, f.z + lx * s + lz * c];
}

function block(c: Ctx, stone: string) {
  return color.set(stone).offsetHSL(0, (c.rand() - 0.5) * 0.04, (c.rand() - 0.5) * 0.1).getHex();
}

/** Bushes and pebbles that tie a set piece into the grass. */
function dress(c: Ctx, f: Feature, r: number, n: number) {
  for (let k = 0; k < n; k++) {
    const a = c.rand() * Math.PI * 2;
    const d = r * (0.8 + c.rand() * 0.4);
    const x = f.x + Math.cos(a) * d;
    const z = f.z + Math.sin(a) * d;
    const s = 0.25 + c.rand() * 0.25;
    place(x, z, s * 0.25);
    dummy.rotation.set(0, c.rand() * 3, 0);
    dummy.scale.set(s, s * 0.75, s);
    c.bushes.add(color.set('#5f7a6a').offsetHSL((c.rand() - 0.5) * 0.04, 0, (c.rand() - 0.5) * 0.1).getHex());
  }
}

function addMotes(c: Ctx, f: Feature, n: number, spread: number, hex: string, rise: number) {
  for (let i = 0; i < n; i++) {
    const a = c.rand() * Math.PI * 2;
    const r = Math.sqrt(c.rand()) * spread;
    const x = f.x + Math.cos(a) * r;
    const z = f.z + Math.sin(a) * r;
    c.motes.push({ x, z, y: heightAt(x, z), phase: c.rand(), speed: 0.5 + c.rand(), rise, color: new THREE.Color(hex) });
  }
}

/** Glowing marks left by old transmutation circles, laid onto the terrain as thin ribbons. */
function ribbon(c: Ctx, path: Array<[number, number]>, width: number) {
  for (let i = 0; i < path.length - 1; i++) {
    if (c.rand() < 0.16) continue; // gaps make them read as half-erased
    const [ax, az] = path[i];
    const [bx, bz] = path[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    if (len < 1e-6) continue;
    const nx = (-(bz - az) / len) * width;
    const nz = ((bx - ax) / len) * width;
    const quad = [
      [ax - nx, az - nz],
      [bx - nx, bz - nz],
      [bx + nx, bz + nz],
      [ax - nx, az - nz],
      [bx + nx, bz + nz],
      [ax + nx, az + nz],
    ];
    for (const [x, z] of quad) c.ribbons.push(x, heightAt(x, z) + 0.1, z);
  }
}

function circlePath(cx: number, cz: number, r: number, n: number) {
  return Array.from({ length: n + 1 }, (_, i): [number, number] => {
    const a = (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * r, cz + Math.sin(a) * r];
  });
}

function polygonPath(cx: number, cz: number, r: number, sides: number, turn: number, steps: number) {
  const pts: Array<[number, number]> = [];
  for (let s = 0; s < sides; s++) {
    const a0 = turn + (s / sides) * Math.PI * 2;
    const a1 = turn + ((s + 1) / sides) * Math.PI * 2;
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      pts.push([cx + (Math.cos(a0) * (1 - t) + Math.cos(a1) * t) * r, cz + (Math.sin(a0) * (1 - t) + Math.sin(a1) * t) * r]);
    }
  }
  return pts;
}

// ---------------------------------------------------------------- Roca

/** An old ring of menhirs, a couple fallen, one pair still carrying its lintel. */
function menhires(f: Feature, c: Ctx) {
  const { rand } = c;
  const ring = 1.75 * f.size;
  const count = 8;
  const gap = Math.floor(rand() * count);
  const fallenA = (gap + 2 + Math.floor(rand() * 2)) % count;
  const fallenB = (gap + 5 + Math.floor(rand() * 2)) % count;
  const lintel = (gap + 1) % count;
  for (let i = 0; i < count; i++) {
    if (i === gap) continue;
    const a = (i / count) * Math.PI * 2 + f.rot;
    const x = f.x + Math.cos(a) * ring;
    const z = f.z + Math.sin(a) * ring;
    const fallen = i === fallenA || i === fallenB;
    const h = 0.9 + rand() * 0.5;
    if (fallen) {
      place(x, z, 0.12);
      dummy.rotation.set(Math.PI / 2 - 0.08, 0, a + (rand() - 0.5) * 0.6);
      dummy.scale.set(0.42, h, 0.28);
    } else {
      place(x, z, h / 2 - 0.08);
      dummy.rotation.set((rand() - 0.5) * 0.16, -a, (rand() - 0.5) * 0.16);
      dummy.scale.set(0.42, h, 0.3);
    }
    c.stones.add(block(c, '#8a9294'));
    c.obstacles.push({ x, z, r: 0.3 });
    for (let k = 0; k < 2; k++) {
      place(x + (rand() - 0.5) * 0.7, z + (rand() - 0.5) * 0.7, 0.02);
      dummy.rotation.set(rand(), rand() * 3, rand());
      dummy.scale.setScalar(0.1 + rand() * 0.1);
      c.rubble.add(block(c, '#848c8e'));
    }
  }
  if (lintel !== gap && (lintel + 1) % count !== gap && lintel !== fallenA && lintel !== fallenB) {
    const a0 = (lintel / count) * Math.PI * 2 + f.rot;
    const a1 = a0 + Math.PI / 4;
    const mx = f.x + Math.cos((a0 + a1) / 2) * ring * 0.96;
    const mz = f.z + Math.sin((a0 + a1) / 2) * ring * 0.96;
    place(mx, mz, 1.35);
    dummy.rotation.set(0, -(a0 + a1) / 2 + Math.PI / 2, 0.06);
    dummy.scale.set(1.55 * f.size, 0.22, 0.32);
    c.stones.add(block(c, '#8a9294'));
  }
  place(f.x, f.z, 0.12);
  dummy.rotation.set(0, f.rot, 0);
  dummy.scale.set(0.7, 0.28, 0.5);
  c.stones.add(block(c, '#7c8587'));
  c.obstacles.push({ x: f.x, z: f.z, r: 0.4 });
  dress(c, f, ring + 0.6, 7);
}

/** A broken dry-stone wall: cover to hide behind. */
function muro(f: Feature, c: Ctx) {
  const { rand } = c;
  const n = 5 + Math.round(f.size * 2);
  const breach = 1 + Math.floor(rand() * (n - 2));
  for (let i = 0; i < n; i++) {
    const t = (i - (n - 1) / 2) * 0.5;
    const layers = i === breach ? 0 : i === breach + 2 ? 1 : 2 + Math.floor(rand() * 2);
    const [x, z] = at(f, t, 0);
    for (let l = 0; l < layers; l++) {
      place(x + (rand() - 0.5) * 0.05, z + (rand() - 0.5) * 0.05, 0.13 + l * 0.25);
      dummy.rotation.set(0, -f.rot + (rand() - 0.5) * 0.12, 0);
      dummy.scale.set(0.47, 0.24, 0.34);
      c.stones.add(block(c, '#959b98'));
    }
    if (layers > 0) c.obstacles.push({ x, z, r: 0.28 });
    else {
      for (let k = 0; k < 3; k++) {
        const [bx, bz] = at(f, t + (rand() - 0.5) * 0.8, 0.3 + rand() * 0.5);
        place(bx, bz, 0.1);
        dummy.rotation.set((rand() - 0.5) * 0.5, rand() * 3, (rand() - 0.5) * 0.5);
        dummy.scale.set(0.42, 0.22, 0.3);
        c.stones.add(block(c, '#8e9491'));
      }
    }
  }
  dress(c, f, 1.3 * f.size, 5);
}

/** An outcrop: a few big boulders with smaller ones at their feet. */
function penascos(f: Feature, c: Ctx) {
  const { rand } = c;
  const big = 2 + Math.floor(rand() * 3);
  for (let i = 0; i < big; i++) {
    const a = (i / big) * Math.PI * 2 + rand() * 0.8 + f.rot;
    const d = i === 0 ? 0 : 0.45 * f.size + rand() * 0.25;
    const x = f.x + Math.cos(a) * d;
    const z = f.z + Math.sin(a) * d;
    const s = (i === 0 ? 1.15 : 0.6 + rand() * 0.4) * f.size;
    place(x, z, 0.12 * s);
    dummy.rotation.set(rand() * 0.6, rand() * Math.PI, rand() * 0.6);
    dummy.scale.set(s * (0.9 + rand() * 0.4), s * (0.6 + rand() * 0.35), s * (0.9 + rand() * 0.4));
    c.rubble.add(block(c, '#8c9496'));
    c.obstacles.push({ x, z, r: 0.42 * s });
  }
  for (let k = 0; k < 8; k++) {
    const a = rand() * Math.PI * 2;
    const d = (0.7 + rand() * 0.5) * f.size;
    place(f.x + Math.cos(a) * d, f.z + Math.sin(a) * d, 0.02);
    dummy.rotation.set(rand(), rand() * 3, rand());
    dummy.scale.setScalar(0.12 + rand() * 0.16);
    c.rubble.add(block(c, '#879092'));
  }
  dress(c, f, 0.95 * f.size, 4);
}

// ---------------------------------------------------------------- Tierra

/** A low grassy hill with bare earth on top; it changes the ground but never blocks the walk. */
function monticulo(f: Feature, c: Ctx) {
  const { rand } = c;
  for (let k = 0; k < 10; k++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * f.r * 0.45;
    place(f.x + Math.cos(a) * d, f.z + Math.sin(a) * d, 0.02);
    dummy.rotation.set(rand(), rand() * 3, rand());
    dummy.scale.setScalar(0.07 + rand() * 0.12);
    c.rubble.add(block(c, rand() < 0.5 ? '#8f8672' : '#9a9a90'));
  }
  if (rand() < 0.6) {
    const [x, z] = at(f, 0.2, -0.1);
    place(x, z, 0.1);
    dummy.rotation.set(0, rand() * 3, 0);
    dummy.scale.set(0.36, 0.26, 0.36);
    c.wood.add('#75614f');
    c.obstacles.push({ x, z, r: 0.2 });
  }
}

/** Freshly turned earth: clods and pebbles, as if something had been digging. */
function tierraSuelta(f: Feature, c: Ctx) {
  const { rand } = c;
  for (let k = 0; k < 18; k++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * f.r * 0.75;
    place(f.x + Math.cos(a) * d, f.z + Math.sin(a) * d, 0.02);
    dummy.rotation.set(rand(), rand() * 3, rand());
    const s = 0.08 + rand() * 0.14;
    dummy.scale.set(s * 1.3, s * 0.6, s);
    c.rubble.add(color.set(rand() < 0.7 ? '#7f7360' : '#958b74').offsetHSL(0, 0, (rand() - 0.5) * 0.08).getHex());
  }
}

// ---------------------------------------------------------------- Agua

/** A still pond in its own hollow, with reeds, lily pads and shore stones. The water itself is not walkable. */
function estanque(f: Feature, c: Ctx) {
  const { rand } = c;
  const R = f.r * 0.85; // matches the dent carved in dentsFor()
  const level = dentBase({ x: f.x, z: f.z, r: R, depth: -0.5, rim: 0.04 }) - 0.1;
  const geo = new THREE.CircleGeometry(R * 0.92, 14);
  const pos = geo.attributes.position;
  for (let i = 1; i < pos.count; i++) pos.setXY(i, pos.getX(i) * (0.92 + rand() * 0.12), pos.getY(i) * (0.92 + rand() * 0.12));
  geo.rotateX(-Math.PI / 2);
  const water = new THREE.Mesh(
    geo,
    // Clear lagoon blue rather than murky green, so it reads as open water you can draw from.
    GLADE
      ? new THREE.MeshLambertMaterial({ color: '#79b7b0', emissive: '#2f7a7c', emissiveIntensity: 0.4, transparent: true, opacity: 0.86 })
      : new THREE.MeshLambertMaterial({ color: '#8fc4d2', emissive: '#4b8ea2', emissiveIntensity: 0.45, transparent: true, opacity: 0.84 }),
  );
  water.position.set(f.x, level, f.z);
  water.receiveShadow = true;
  c.group.add(water);
  // Deeper middle and a pale band of shallows along the edge.
  const deep = new THREE.Mesh(
    new THREE.CircleGeometry(R * 0.5, 12).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: '#4f8fa6', transparent: true, opacity: 0.35, depthWrite: false }),
  );
  deep.position.set(f.x, level + 0.003, f.z);
  const shallows = new THREE.Mesh(
    new THREE.RingGeometry(R * 0.78, R * 0.9, 20).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: '#dcedee', transparent: true, opacity: 0.4, depthWrite: false }),
  );
  shallows.position.set(f.x, level + 0.004, f.z);
  c.group.add(deep, shallows);
  c.obstacles.push({ x: f.x, z: f.z, r: R * 0.7 });

  for (let k = 0; k < 2; k++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * R * 0.55;
    dummy.position.set(f.x + Math.cos(a) * d, level + 0.005, f.z + Math.sin(a) * d);
    dummy.rotation.set(0, rand() * 3, 0);
    dummy.scale.setScalar(0.8 + rand() * 0.6);
    c.pads.add(color.set('#5d7d63').offsetHSL(0, 0, (rand() - 0.5) * 0.08).getHex());
  }
  // One small clump of reeds on the shore; more made it read as a marsh.
  for (let clump = 0; clump < 1; clump++) {
    const a0 = rand() * Math.PI * 2;
    for (let k = 0; k < 6; k++) {
      const a = a0 + (rand() - 0.5) * 0.6;
      const d = R * (0.72 + rand() * 0.18);
      const x = f.x + Math.cos(a) * d;
      const z = f.z + Math.sin(a) * d;
      dummy.position.set(x, Math.max(level, heightAt(x, z)) - 0.02, z);
      dummy.rotation.set((rand() - 0.5) * 0.3, rand() * 3, (rand() - 0.5) * 0.3);
      dummy.scale.set(1, 0.7 + rand() * 0.7, 1);
      c.reeds.add(color.set('#6f7f5c').offsetHSL(0, 0, (rand() - 0.5) * 0.1).getHex());
    }
  }
  for (let k = 0; k < 7; k++) {
    const a = rand() * Math.PI * 2;
    const d = R * (0.82 + rand() * 0.2);
    place(f.x + Math.cos(a) * d, f.z + Math.sin(a) * d, 0.03);
    dummy.rotation.set(rand(), rand() * 3, rand());
    dummy.scale.set(0.2 + rand() * 0.2, 0.12 + rand() * 0.08, 0.2 + rand() * 0.15);
    c.rubble.add(block(c, '#7f8a8a'));
  }
}

// ---------------------------------------------------------------- Fuego

/** A campfire sized to the alchemist (knee-high flames): stone ring, crossed logs, a log to sit on. */
const FIRE = 0.5;

function fogata(f: Feature, c: Ctx) {
  const { rand } = c;
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 + rand() * 0.2;
    place(f.x + Math.cos(a) * 0.32 * FIRE, f.z + Math.sin(a) * 0.32 * FIRE, 0.04 * FIRE);
    dummy.rotation.set(rand(), rand() * 3, rand());
    dummy.scale.set(0.16 * FIRE, 0.12 * FIRE, 0.14 * FIRE);
    c.rubble.add(block(c, '#6d7272'));
  }
  for (let k = 0; k < 3; k++) {
    place(f.x, f.z, 0.07 * FIRE);
    dummy.rotation.set(0, f.rot + (k / 3) * Math.PI, Math.PI / 2 - 0.35);
    dummy.scale.set(0.08 * FIRE, 0.5 * FIRE, 0.08 * FIRE);
    c.wood.add('#5e4c3f');
  }
  for (let k = 0; k < 4; k++) {
    place(f.x + (rand() - 0.5) * 0.25 * FIRE, f.z + (rand() - 0.5) * 0.25 * FIRE, 0.03 * FIRE);
    dummy.rotation.set(rand(), rand() * 3, rand());
    dummy.scale.setScalar((0.06 + rand() * 0.05) * FIRE);
    c.embers.add(rand() < 0.5 ? '#ff8a3d' : '#d9542b');
  }
  const y = heightAt(f.x, f.z);
  for (let k = 0; k < 3; k++) {
    c.flames.push({ x: f.x + (rand() - 0.5) * 0.12 * FIRE, y: y + 0.05 * FIRE, z: f.z + (rand() - 0.5) * 0.12 * FIRE, s: (1 - k * 0.22) * FIRE, phase: rand() * 10, animated: f.animated });
  }
  c.obstacles.push({ x: f.x, z: f.z, r: 0.42 * FIRE });
  const [lx, lz] = at(f, 0, 0.85 * FIRE + 0.1);
  place(lx, lz, 0.12 * FIRE);
  dummy.rotation.set(0, f.rot, Math.PI / 2);
  dummy.scale.set(0.24 * FIRE, 0.9 * FIRE, 0.24 * FIRE);
  c.wood.add('#6b5a4c');
  c.obstacles.push({ x: lx, z: lz, r: 0.3 * FIRE });
  if (f.animated) addMotes(c, f, 10, 0.15 * FIRE, '#ffb36b', 0.7);
}

/** An old blast crater: scorched ground, smouldering embers, weapons left around the rim. Walkable. */
function crater(f: Feature, c: Ctx) {
  const { rand } = c;
  const R = f.r / 1.15;
  for (let k = 0; k < 16; k++) {
    const a = rand() * Math.PI * 2;
    const r = R * (0.85 + rand() * 0.45);
    place(f.x + Math.cos(a) * r, f.z + Math.sin(a) * r, 0.03);
    dummy.rotation.set(rand(), rand() * 3, rand());
    dummy.scale.set(0.2 + rand() * 0.25, 0.12 + rand() * 0.12, 0.2 + rand() * 0.2);
    c.rubble.add(block(c, rand() < 0.5 ? '#5d6261' : '#7d8586'));
  }
  for (let k = 0; k < 7; k++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * R * 0.6;
    place(f.x + Math.cos(a) * r, f.z + Math.sin(a) * r, 0.02);
    dummy.rotation.set(rand(), rand() * 3, rand());
    dummy.scale.setScalar(0.05 + rand() * 0.06);
    c.embers.add(rand() < 0.5 ? '#e0703a' : '#b84a2a');
  }
  for (let k = 0; k < 6; k++) {
    const a = f.rot + k * 0.42 + (rand() - 0.5) * 0.2;
    const r = R * (1.05 + rand() * 0.3);
    const x = f.x + Math.cos(a) * r;
    const z = f.z + Math.sin(a) * r;
    const tiltX = (rand() - 0.5) * 0.7;
    const tiltZ = (rand() - 0.5) * 0.7;
    if (k % 2 === 0) {
      place(x, z, 0.2);
      dummy.rotation.set(tiltX, rand() * 3, tiltZ);
      dummy.scale.set(0.05, 0.45, 0.015);
      c.metal.add('#b3bcbd');
      dummy.translateY(0.24);
      dummy.scale.set(0.18, 0.03, 0.04);
      c.metal.add('#6f6450');
      dummy.translateY(0.06);
      dummy.scale.set(0.035, 0.1, 0.035);
      c.metal.add('#4f4337');
    } else {
      place(x, z, 0.4);
      dummy.rotation.set(tiltX, 0, tiltZ);
      dummy.scale.set(0.03, 0.9, 0.03);
      c.wood.add('#6a5a4a');
      dummy.translateY(0.5);
      dummy.scale.set(0.06, 0.14, 0.02);
      c.metal.add('#a9b2b3');
    }
    c.obstacles.push({ x, z, r: 0.08 });
  }
}

// ---------------------------------------------------------------- Magia

/** Crystals grown out of the ground, ringed by a faint old circle; motes drift up if animated. */
function cristales(f: Feature, c: Ctx) {
  const { rand } = c;
  const clusters = 2 + Math.floor(rand() * 2);
  for (let i = 0; i < clusters; i++) {
    const a = f.rot + (i / clusters) * Math.PI * 2;
    const d = i === 0 && clusters === 2 ? 0.15 : 0.4 * f.size;
    const x = f.x + Math.cos(a) * d;
    const z = f.z + Math.sin(a) * d;
    const n = 3 + Math.floor(rand() * 3);
    for (let k = 0; k < n; k++) {
      const s = (k === 0 ? 0.55 : 0.2 + rand() * 0.3) * f.size;
      place(x + (rand() - 0.5) * 0.4, z + (rand() - 0.5) * 0.4, s * 0.55);
      dummy.rotation.set((rand() - 0.5) * 0.9, rand() * Math.PI, (rand() - 0.5) * 0.9);
      dummy.scale.set(s * 0.45, s * 1.5, s * 0.45);
      c.crystals.add(color.set('#7fc7bb').offsetHSL((rand() - 0.5) * 0.06, 0, (rand() - 0.5) * 0.12).getHex());
    }
    c.obstacles.push({ x, z, r: 0.3 * f.size });
  }
  ribbon(c, circlePath(f.x, f.z, f.r * 0.85, 32), 0.03);
  if (f.animated) addMotes(c, f, 16, f.r * 0.7, '#d6fff4', 1.6);
}

/** A transmutation circle burnt into the grass, with four small marker stones. Walkable. */
function runas(f: Feature, c: Ctx) {
  const { rand } = c;
  const R = f.r * 0.85;
  ribbon(c, circlePath(f.x, f.z, R, 36), 0.035);
  ribbon(c, circlePath(f.x, f.z, R * 0.74, 30), 0.022);
  const sides = rand() < 0.5 ? 3 : 4;
  ribbon(c, polygonPath(f.x, f.z, R * 0.7, sides, f.rot, 5), 0.025);
  for (let k = 0; k < 4; k++) {
    const a = f.rot + (k / 4) * Math.PI * 2 + Math.PI / 4;
    const x = f.x + Math.cos(a) * (R + 0.25);
    const z = f.z + Math.sin(a) * (R + 0.25);
    place(x, z, 0.12);
    dummy.rotation.set((rand() - 0.5) * 0.2, -a, (rand() - 0.5) * 0.2);
    dummy.scale.set(0.16, 0.32, 0.12);
    c.stones.add(block(c, '#7f8a8c'));
    c.obstacles.push({ x, z, r: 0.12 });
  }
  if (f.animated) addMotes(c, f, 12, R * 0.8, '#d6fff4', 1.1);
}

// ---------------------------------------------------------------- Restos

/** A wooden palisade, half torn down. */
function empalizada(f: Feature, c: Ctx) {
  const { rand } = c;
  const n = 7 + Math.round(f.size * 2);
  for (let i = 0; i < n; i++) {
    const t = (i - (n - 1) / 2) * 0.32;
    const [x, z] = at(f, t, 0);
    const down = rand() < 0.3;
    const h = 0.75 + rand() * 0.35;
    if (down) {
      const [dx, dz] = at(f, t + 0.1, 0.3);
      place(dx, dz, 0.07);
      dummy.rotation.set(Math.PI / 2, 0, -f.rot + (rand() - 0.5));
      dummy.scale.set(0.12, h, 0.12);
    } else {
      place(x, z, h / 2 - 0.05);
      dummy.rotation.set((rand() - 0.5) * 0.25, 0, (rand() - 0.5) * 0.25);
      dummy.scale.set(0.13, h, 0.13);
      c.obstacles.push({ x, z, r: 0.12 });
    }
    c.wood.add(color.set('#7a6656').offsetHSL(0, 0, (rand() - 0.5) * 0.08).getHex());
    if (!down) {
      dummy.translateY(0.5 + 0.06 / h);
      dummy.scale.set(0.09, 0.12, 0.09);
      c.wood.add('#8d7966');
    }
  }
  const [rx, rz] = at(f, -0.6, 0);
  place(rx, rz, 0.45);
  dummy.rotation.set(0, -f.rot, Math.PI / 2 + 0.05);
  dummy.scale.set(0.07, 1.3, 0.07);
  c.wood.add('#6b584a');
  dress(c, f, 1.2 * f.size, 5);
}

/** An abandoned supply cart: broken wheel, scattered planks, a crate. */
function carreta(f: Feature, c: Ctx) {
  const { rand } = c;
  for (let k = 0; k < 5; k++) {
    const [x, z] = at(f, (rand() - 0.5) * 1.1, (rand() - 0.5) * 0.8);
    place(x, z, 0.05);
    dummy.rotation.set((rand() - 0.5) * 0.2, rand() * Math.PI, (rand() - 0.5) * 0.2);
    dummy.scale.set(0.9 + rand() * 0.3, 0.05, 0.18);
    c.planks.add(color.set('#857160').offsetHSL(0, 0, (rand() - 0.5) * 0.1).getHex());
  }
  const [bx, bz] = at(f, 0.3, -0.25);
  place(bx, bz, 0.17);
  dummy.rotation.set(0, 0.6 + f.rot, 0);
  dummy.scale.setScalar(0.34);
  c.planks.add('#8a7562');
  const [sx, sz] = at(f, 0.55, 0.05);
  place(sx, sz, 0.12);
  dummy.rotation.set(0.15, 1.1, 0.1);
  dummy.scale.setScalar(0.24);
  c.planks.add('#7a6655');
  const [ox, oz] = at(f, 0.4, -0.1);
  c.obstacles.push({ x: ox, z: oz, r: 0.3 });

  const wheel = new THREE.Group();
  const rimMat = lambert({ color: '#6f5c4c' });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 4, 10), rimMat);
  rim.castShadow = true;
  wheel.add(rim);
  const spokeGeo = new THREE.BoxGeometry(0.03, 0.62, 0.03);
  for (let k = 0; k < 4; k++) {
    const spoke = new THREE.Mesh(spokeGeo, rimMat);
    spoke.rotation.z = (k / 4) * Math.PI;
    wheel.add(spoke);
  }
  const [wx, wz] = at(f, -0.45, 0.2);
  wheel.position.set(wx, heightAt(wx, wz) + 0.14, wz);
  wheel.rotation.set(-Math.PI / 2 + 0.35, 0, 0.7 + f.rot);
  c.group.add(wheel);
  dress(c, f, 1.1, 5);
}

/** A fallen log and a couple of stumps. */
function troncos(f: Feature, c: Ctx) {
  const { rand } = c;
  place(f.x, f.z, 0.14);
  dummy.rotation.set(0, f.rot, Math.PI / 2);
  dummy.scale.set(0.3, 1.5, 0.3);
  c.wood.add('#6b5a4c');
  c.obstacles.push({ x: f.x, z: f.z, r: 0.45 });
  const stumps = 1 + Math.floor(rand() * 2);
  for (let k = 0; k < stumps; k++) {
    const [x, z] = at(f, (rand() - 0.5) * 1.4, 0.55 + rand() * 0.3);
    place(x, z, 0.1);
    dummy.rotation.set(0, rand() * 3, 0);
    dummy.scale.set(0.36, 0.26, 0.36);
    c.wood.add('#75614f');
    c.obstacles.push({ x, z, r: 0.2 });
  }
}

const cloth = (() => {
  const geo = new THREE.PlaneGeometry(0.42, 0.62, 2, 3).translate(0.21, -0.31, 0);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) if (p.getY(i) < -0.6) p.setY(i, -0.62 + (i % 2 ? 0.14 : 0));
  return geo;
})();

/** A tattered banner on a lone pole; it waves only if the animation budget allows. */
function estandarte(f: Feature, c: Ctx) {
  const { rand } = c;
  const hex = ['#8f4b3f', '#4d5a8a', '#6b7a4a'][Math.floor(rand() * 3)];
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 1.7, 5), lambert({ color: '#5d4d40' }));
  pole.position.set(f.x, heightAt(f.x, f.z) + 0.82, f.z);
  pole.rotation.z = (rand() - 0.5) * 0.15;
  pole.castShadow = true;
  const flag = new THREE.Group();
  flag.position.y = 0.78;
  flag.rotation.y = f.rot;
  const mesh = new THREE.Mesh(cloth, lambert({ color: hex, side: THREE.DoubleSide }));
  mesh.castShadow = true;
  flag.add(mesh);
  pole.add(flag);
  c.group.add(pole);
  c.obstacles.push({ x: f.x, z: f.z, r: 0.1 });
  if (f.animated) {
    const phase = rand() * 6;
    c.animators.push((time) => {
      flag.rotation.y = f.rot + Math.sin(time * 1.3 + phase) * 0.35 + 0.3;
      flag.rotation.x = Math.sin(time * 2.1 + phase) * 0.05;
    });
  }
}

const BUILDERS: Record<Kind, (f: Feature, c: Ctx) => void> = {
  menhires,
  muro,
  penascos,
  monticulo,
  tierraSuelta,
  estanque,
  fogata,
  crater,
  cristales,
  runas,
  empalizada,
  carreta,
  troncos,
  estandarte,
};

export interface BuiltFeatures {
  group: THREE.Group;
  /** Obstacle area each feature added, used to decide what to drop if the meadow gets too blocked. */
  blockedArea: number[];
  update(dt: number): void;
}

export function buildFeatures(layout: Layout, obstacles: Obstacle[]): BuiltFeatures {
  const group = new THREE.Group();
  const c: Ctx = {
    rand: Math.random,
    obstacles,
    group,
    stones: new Batch(new THREE.BoxGeometry(1, 1, 1), lambert(), stoneTint),
    wood: new Batch(new THREE.CylinderGeometry(0.5, 0.5, 1, 6), lambert()),
    planks: new Batch(new THREE.BoxGeometry(1, 1, 1), lambert()),
    metal: new Batch(new THREE.BoxGeometry(1, 1, 1), lambert()),
    crystals: new Batch(new THREE.OctahedronGeometry(0.5, 0), lambert({ emissive: '#2c6f68', emissiveIntensity: 0.9 })),
    embers: new Batch(new THREE.DodecahedronGeometry(0.5, 0), lambert({ emissive: '#c4421c', emissiveIntensity: 0.9 })),
    bushes: GLADE
      ? new Batch(new THREE.IcosahedronGeometry(0.5, 1), lambert({ flatShading: false }), leafTint)
      : new Batch(new THREE.IcosahedronGeometry(0.5, 0), lambert()),
    rubble: new Batch(new THREE.DodecahedronGeometry(0.5, 0), lambert(), stoneTint),
    reeds: new Batch(new THREE.ConeGeometry(0.025, 0.55, 3).translate(0, 0.27, 0), lambert()),
    pads: new Batch(new THREE.CylinderGeometry(0.11, 0.11, 0.01, 6), lambert()),
    ribbons: [],
    motes: [],
    flames: [],
    animators: [],
  };

  const blockedArea: number[] = [];
  for (const f of layout.features) {
    c.rand = mulberry32(f.seed);
    const before = obstacles.length;
    BUILDERS[f.kind](f, c);
    blockedArea.push(obstacles.slice(before).reduce((sum, o) => sum + Math.PI * o.r * o.r, 0));
  }

  // Loose pebbles across the playable area tie everything together.
  c.rand = mulberry32(layout.seedNum ^ 0x51ed);
  for (let k = 0; k < 50; k++) {
    const x = (c.rand() - 0.5) * 14;
    const z = (c.rand() - 0.5) * 16;
    place(x, z, 0.01);
    dummy.rotation.set(c.rand(), c.rand() * 3, c.rand());
    dummy.scale.setScalar(0.06 + c.rand() * 0.1);
    c.rubble.add(block(c, '#8f9799'));
  }

  const meshes = [
    c.stones.build(),
    c.wood.build(),
    c.planks.build(),
    c.metal.build(true, false),
    c.crystals.build(true, false),
    c.embers.build(false, false),
    c.bushes.build(true, true),
    c.rubble.build(true, true),
    c.reeds.build(false, false),
    c.pads.build(false, true),
  ];
  for (const m of meshes) if (m) group.add(m);

  if (c.ribbons.length) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(c.ribbons, 3));
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color: '#b9efe2',
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      }),
    );
    mesh.renderOrder = 1;
    group.add(mesh);
  }

  // Flames: a few unlit cones in one draw call; they only flicker when their fire is animated.
  if (c.flames.length) {
    const flames = new THREE.InstancedMesh(
      new THREE.ConeGeometry(0.12, 0.42, 5).translate(0, 0.21, 0),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthWrite: false }),
      c.flames.length,
    );
    const tints = ['#ff9a45', '#ffc46b', '#fff0b0'];
    c.flames.forEach((_, i) => flames.setColorAt(i, color.set(tints[i % 3])));
    const pose = (time: number) => {
      c.flames.forEach((fl, i) => {
        const k = fl.animated ? 1 + Math.sin(time * 11 + fl.phase) * 0.12 + Math.sin(time * 17 + fl.phase * 2) * 0.08 : 1;
        dummy.position.set(fl.x, fl.y, fl.z);
        dummy.rotation.set(fl.animated ? Math.sin(time * 5 + fl.phase) * 0.12 : 0, fl.phase, 0);
        dummy.scale.set(fl.s, fl.s * k, fl.s);
        dummy.updateMatrix();
        flames.setMatrixAt(i, dummy.matrix);
      });
      flames.instanceMatrix.needsUpdate = true;
    };
    pose(0);
    group.add(flames);
    if (c.flames.some((fl) => fl.animated)) c.animators.push(pose);
  }

  // Motes (sparks, magic dust): one Points draw call for every animated source.
  if (c.motes.length) {
    const n = c.motes.length;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    c.motes.forEach((m, i) => m.color.toArray(col, i * 3));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    points.frustumCulled = false;
    group.add(points);
    c.animators.push((time) => {
      c.motes.forEach((m, i) => {
        const t = (m.phase + time * 0.12 * m.speed * (1.6 / m.rise)) % 1;
        pos[i * 3] = m.x + Math.sin(time * m.speed + m.phase * 9) * 0.15;
        pos[i * 3 + 1] = m.y + 0.1 + t * m.rise;
        pos[i * 3 + 2] = m.z + Math.cos(time * m.speed + m.phase * 7) * 0.15;
      });
      geo.attributes.position.needsUpdate = true;
    });
  }

  let time = 0;
  return {
    group,
    blockedArea,
    update(dt: number) {
      time += dt;
      for (const animate of c.animators) animate(time);
    },
  };
}
