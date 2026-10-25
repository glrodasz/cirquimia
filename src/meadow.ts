import * as THREE from 'three';
import { heightAt, mulberry32, patchAt } from './noise';
import type { GenParams, GroundPaint, Layout } from './generator';
import { GLADE } from './look';

export interface Obstacle {
  x: number;
  z: number;
  r: number;
}

const WORLD_SIZE = 90;
const SCATTER_RADIUS = 34;

const dummy = new THREE.Object3D();
const color = new THREE.Color();

function lambert(params: THREE.MeshLambertMaterialParameters = {}) {
  return new THREE.MeshLambertMaterial({ flatShading: true, ...params });
}

/** Smooth-shaded Lambert for the soft, rounded shapes of the Glade look. */
function soft(params: THREE.MeshLambertMaterialParameters = {}) {
  return new THREE.MeshLambertMaterial({ flatShading: false, ...params });
}

/** Geometry whose vertex colours run from `base` at y0 to `tip` at y1: baked shade at the bottom, sunlit tops. */
function shadeByHeight(geo: THREE.BufferGeometry, y0: number, y1: number, base: number, tip: number) {
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp((pos.getY(i) - y0) / (y1 - y0), 0, 1);
    col.fill(base + (tip - base) * t * t * (3 - 2 * t), i * 3, i * 3 + 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

/**
 * Glade ground: smooth per-vertex colour in warm spring greens, darkened under and around every obstacle
 * (trees, rocks, set pieces) as baked ambient occlusion, so props sit in the grass instead of on it.
 */
function buildGladeGround(seed: number, paint: GroundPaint, obstacles: Obstacle[]): THREE.Mesh {
  const segments = 80;
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, segments, segments);
  geo.rotateX(-Math.PI / 2);
  const rand = mulberry32(seed ^ 7);
  const pos = geo.attributes.position;
  const step = WORLD_SIZE / segments;
  const colors = new Float32Array(pos.count * 3);
  const light = new THREE.Color('#74a04a');
  const dark = new THREE.Color('#386530');
  const dry = new THREE.Color('#a7a35e');
  const dirt = new THREE.Color('#a08d6a');
  const burnt = new THREE.Color('#544c3c');
  const wet = new THREE.Color('#4d7444');
  const shade = new THREE.Color('#22381f');
  // Colour noise has its own stream so the vertex jitter, and with it the terrain, matches Bruma exactly.
  const tone = mulberry32(seed ^ 0x70e);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + (rand() - 0.5) * step * 0.45;
    const z = pos.getZ(i) + (rand() - 0.5) * step * 0.45;
    pos.setXYZ(i, x, heightAt(x, z), z);
    const patch = patchAt(x, z);
    color.copy(dark).lerp(light, patch);
    if (patch > 0.75) color.lerp(dry, (patch - 0.75) * 2.2);
    color.lerp(wet, paint.wetAt(x, z) * 0.35);
    color.lerp(dirt, paint.dirtAt(x, z) * 0.9);
    color.lerp(burnt, paint.scorchAt(x, z) * 0.7);
    let occlusion = 0;
    for (const o of obstacles) {
      const d = Math.hypot(o.x - x, o.z - z) / (o.r * 2.4 + 0.25);
      if (d < 1) occlusion = Math.max(occlusion, (1 - d) * (1 - d));
    }
    color.lerp(shade, occlusion * 0.55);
    color.offsetHSL(0, 0, (tone() - 0.5) * 0.03);
    color.toArray(colors, i * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, soft({ vertexColors: true }));
  mesh.receiveShadow = true;
  return mesh;
}

function buildGround(seed: number, paint: GroundPaint): THREE.Mesh {
  const segments = 80;
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, segments, segments);
  geo.rotateX(-Math.PI / 2);
  const rand = mulberry32(seed ^ 7);
  const pos = geo.attributes.position;
  const step = WORLD_SIZE / segments;
  for (let i = 0; i < pos.count; i++) {
    // Jitter vertices a little so the triangles read as hand-made low-poly, not a grid.
    const x = pos.getX(i) + (rand() - 0.5) * step * 0.45;
    const z = pos.getZ(i) + (rand() - 0.5) * step * 0.45;
    pos.setXYZ(i, x, heightAt(x, z), z);
  }

  const flat = geo.toNonIndexed();
  geo.dispose();
  const p = flat.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const light = new THREE.Color('#93ab90');
  const dark = new THREE.Color('#5b7468');
  const dry = new THREE.Color('#aaad8c');
  const dirt = new THREE.Color('#a39c86');
  const burnt = new THREE.Color('#4a504c');
  const wet = new THREE.Color('#4f6a5f');
  for (let i = 0; i < p.count; i += 3) {
    const cx = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3;
    const cz = (p.getZ(i) + p.getZ(i + 1) + p.getZ(i + 2)) / 3;
    const patch = patchAt(cx, cz);
    color.copy(dark).lerp(light, patch);
    if (patch > 0.78) color.lerp(dry, (patch - 0.78) * 2.5);
    color.lerp(wet, paint.wetAt(cx, cz) * 0.3);
    color.lerp(dirt, paint.dirtAt(cx, cz) * 0.85);
    color.lerp(burnt, paint.scorchAt(cx, cz) * 0.7);
    color.offsetHSL(0, 0, (rand() - 0.5) * 0.04);
    for (let k = 0; k < 3; k++) color.toArray(colors, (i + k) * 3);
  }
  flat.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  flat.computeVertexNormals();

  const mesh = new THREE.Mesh(flat, lambert({ vertexColors: true }));
  mesh.receiveShadow = true;
  return mesh;
}

function scatter(
  rand: () => number,
  count: number,
  minDist: number,
  accept: (x: number, z: number) => boolean = () => true,
): Array<[number, number]> {
  const points: Array<[number, number]> = [];
  let guard = count * 40;
  while (points.length < count && guard-- > 0) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * SCATTER_RADIUS;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (!accept(x, z)) continue;
    if (minDist > 0 && points.some(([px, pz]) => (px - x) ** 2 + (pz - z) ** 2 < minDist * minDist)) continue;
    points.push([x, z]);
  }
  return points;
}

function instanced(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  count: number,
  shadows: { cast?: boolean; receive?: boolean } = {},
): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(geo, mat, Math.max(1, count));
  mesh.count = count;
  mesh.castShadow = !!shadows.cast;
  mesh.receiveShadow = !!shadows.receive;
  return mesh;
}

function setInstance(mesh: THREE.InstancedMesh, i: number, tint?: THREE.ColorRepresentation) {
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
  if (tint !== undefined) mesh.setColorAt(i, color.set(tint));
}

/** True if (x, z) sits on a set piece or the trail, with some padding. */
function onFeature(layout: Layout, paint: GroundPaint, x: number, z: number, pad: number) {
  return (
    paint.dirtAt(x, z) > 0.3 ||
    paint.waterAt(x, z) > 0 ||
    layout.features.some((f) => (f.x - x) ** 2 + (f.z - z) ** 2 < (f.r + pad) ** 2)
  );
}

/** Trees and big rocks: the scatter that blocks the walk, so it is built before checking walkability. */
export function buildSolids(layout: Layout, params: GenParams, paint: GroundPaint, obstacles: Obstacle[]): THREE.Group {
  const group = new THREE.Group();
  const rand = mulberry32(layout.seedNum ^ 0x7ee5);
  const clearOfSpawn = (x: number, z: number) => x * x + z * z > 9;
  const clearOfObstacles = (x: number, z: number, pad: number) =>
    obstacles.every((o) => (o.x - x) ** 2 + (o.z - z) ** 2 > (o.r + pad) ** 2);

  // Trees: a mix of pines (stacked cones) and round broadleaf crowns.
  const treeSpots = scatter(rand, Math.round(46 * params.arboles), 3.2, (x, z) => clearOfSpawn(x, z) && !onFeature(layout, paint, x, z, 0.6));
  const trunk = instanced(new THREE.CylinderGeometry(0.12, 0.18, 1, 5), lambert({ color: GLADE ? '#6b5038' : '#5c4f48' }), treeSpots.length, { cast: true });
  const pineLow = instanced(new THREE.ConeGeometry(0.9, 1.5, 6), lambert(), treeSpots.length, { cast: true });
  const pineHigh = instanced(new THREE.ConeGeometry(0.65, 1.2, 6), lambert(), treeSpots.length, { cast: true });
  const round = instanced(new THREE.IcosahedronGeometry(0.85, 0), lambert(), treeSpots.length, { cast: true });
  // Glade crowns: a cluster of smooth puffs, darker underneath, instead of one faceted ball.
  const PUFFS = 5;
  const puffs = GLADE
    ? instanced(shadeByHeight(new THREE.IcosahedronGeometry(0.5, 1), -0.5, 0.5, 0.55, 1.15), soft({ vertexColors: true }), treeSpots.length * PUFFS, { cast: true, receive: true })
    : null;
  const puffRand = mulberry32(layout.seedNum ^ 0x9a1d);
  let puffCount = 0;
  let pines = 0;
  let rounds = 0;
  treeSpots.forEach(([x, z], i) => {
    const y = heightAt(x, z);
    const s = 0.8 + rand() * 0.6;
    // Glade is mostly broadleaf; the draw stays the same so a seed keeps its layout in both looks.
    const isPine = rand() < (GLADE ? 0.15 : 0.5);
    const trunkH = isPine ? 0.7 : 1.1;
    dummy.position.set(x, y + (trunkH * s) / 2, z);
    dummy.rotation.set(0, rand() * Math.PI, 0);
    dummy.scale.set(s, trunkH * s, s);
    setInstance(trunk, i);
    dummy.scale.setScalar(s);
    if (isPine) {
      const green = color.set(GLADE ? '#476b3c' : '#3f5a57').offsetHSL((rand() - 0.5) * 0.03, 0, (rand() - 0.5) * 0.06).getHex();
      dummy.position.set(x, y + (trunkH + 0.6) * s, z);
      setInstance(pineLow, pines, green);
      dummy.position.set(x, y + (trunkH + 1.35) * s, z);
      setInstance(pineHigh, pines, green);
      pines++;
    } else if (puffs) {
      const hue = (rand() - 0.5) * 0.05;
      const lum = (rand() - 0.5) * 0.08;
      const cy = y + (trunkH + 0.6) * s;
      for (let k = 0; k < PUFFS; k++) {
        // One big central puff, the rest around and above it.
        const a = (k / PUFFS) * Math.PI * 2 + puffRand() * 0.8;
        const d = k === 0 ? 0 : (0.5 + puffRand() * 0.2) * s;
        const ps = (k === 0 ? 1.15 : 0.8 + puffRand() * 0.3) * s;
        dummy.position.set(x + Math.cos(a) * d, cy + (k === 0 ? 0.05 : (puffRand() - 0.3) * 0.45) * s, z + Math.sin(a) * d);
        dummy.rotation.set(puffRand() * 3, puffRand() * 3, 0);
        dummy.scale.set(ps, ps * 0.85, ps);
        setInstance(puffs, puffCount++, color.set('#6e9a42').offsetHSL(hue + (puffRand() - 0.5) * 0.03, 0, lum + (puffRand() - 0.5) * 0.1).getHex());
      }
    } else {
      dummy.position.set(x, y + (trunkH + 0.55) * s, z);
      dummy.scale.set(s * 1.05, s * 0.95, s * 1.05);
      setInstance(round, rounds++, color.set('#6f8c73').offsetHSL((rand() - 0.5) * 0.05, 0, (rand() - 0.5) * 0.08).getHex());
    }
    obstacles.push({ x, z, r: 0.45 * s });
  });
  pineLow.count = pineHigh.count = pines;
  round.count = rounds;
  group.add(trunk, pineLow, pineHigh, round);
  if (puffs) {
    puffs.count = puffCount;
    group.add(puffs);
  }

  // Loose rocks.
  const rockSpots = scatter(rand, Math.round(40 * params.rocas), 1.5, (x, z) => clearOfSpawn(x, z) && !onFeature(layout, paint, x, z, 0.3) && clearOfObstacles(x, z, 0.8));
  const rocks = instanced(new THREE.DodecahedronGeometry(0.4, 0), lambert(), rockSpots.length, { cast: true, receive: true });
  rockSpots.forEach(([x, z], i) => {
    const s = 0.5 + rand() * 1.0;
    dummy.position.set(x, heightAt(x, z) + 0.08 * s, z);
    dummy.rotation.set(rand() * 0.6, rand() * Math.PI, rand() * 0.6);
    dummy.scale.set(s * (0.9 + rand() * 0.5), s * (0.5 + rand() * 0.3), s * (0.9 + rand() * 0.5));
    setInstance(rocks, i, color.set(GLADE ? '#b8a888' : '#8c9496').offsetHSL(0, 0, (rand() - 0.5) * 0.12).getHex());
    if (s > 0.8) obstacles.push({ x, z, r: 0.35 * s });
  });
  group.add(rocks);
  return group;
}

/** Ground, grass, flowers and mushrooms: nothing here blocks the walk. */
export function buildCover(layout: Layout, params: GenParams, paint: GroundPaint, obstacles: Obstacle[]): THREE.Group {
  const group = new THREE.Group();
  const rand = mulberry32(layout.seedNum ^ 0xc0fe);
  const clearOfObstacles = (x: number, z: number, pad: number) =>
    obstacles.every((o) => (o.x - x) ** 2 + (o.z - z) ** 2 > (o.r + pad) ** 2);
  const bare = (x: number, z: number) => paint.dirtAt(x, z) * 0.9 + paint.scorchAt(x, z) * 0.85 + paint.waterAt(x, z);

  group.add(GLADE ? buildGladeGround(layout.seedNum, paint, obstacles) : buildGround(layout.seedNum, paint));
  if (GLADE) {
    buildGladeCover(group, layout, params, bare, paint);
    return group;
  }

  // Grass blades: three-sided cones, no shadows, the cheapest thing in the scene. Knee-high on the alchemist.
  const bladeSpots = [
    ...scatter(rand, Math.round(3200 * params.hierba), 0),
    ...scatter(rand, Math.round(2600 * params.hierba), 0).map(([x, z]): [number, number] => [x * 0.3, z * 0.3]),
  ].filter(([x, z]) => rand() > bare(x, z));
  const blades = instanced(new THREE.ConeGeometry(0.04, 0.2, 3).translate(0, 0.1, 0), lambert(), bladeSpots.length);
  bladeSpots.forEach(([x, z], i) => {
    dummy.position.set(x, heightAt(x, z) - 0.02, z);
    dummy.rotation.set((rand() - 0.5) * 0.5, rand() * Math.PI, (rand() - 0.5) * 0.5);
    dummy.scale.setScalar(0.7 + rand() * 0.8);
    const patch = patchAt(x, z);
    setInstance(blades, i, color.set('#557062').lerp(new THREE.Color('#a2b89c'), patch * 0.8 + rand() * 0.2).getHex());
  });
  group.add(blades);

  // Flowers: stem + head.
  const flowerSpots = scatter(rand, Math.round(420 * params.flores), 0, (x, z) => patchAt(x, z) > 0.35 && bare(x, z) < 0.2 && paint.wetAt(x, z) < 0.5);
  const stems = instanced(new THREE.CylinderGeometry(0.012, 0.012, 0.28, 3).translate(0, 0.14, 0), lambert({ color: '#557062' }), flowerSpots.length);
  const heads = instanced(new THREE.IcosahedronGeometry(0.06, 0), lambert(), flowerSpots.length);
  const palette = ['#eef0ea', '#d8c97a', '#c9a3b4', '#a3a9c9'];
  flowerSpots.forEach(([x, z], i) => {
    const y = heightAt(x, z);
    const s = (0.8 + rand() * 0.5) * 0.45; // ankle-high next to the alchemist
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(s);
    dummy.position.set(x, y, z);
    setInstance(stems, i);
    dummy.position.set(x, y + 0.28 * s, z);
    setInstance(heads, i, palette[Math.floor(rand() * palette.length)]);
  });
  group.add(stems, heads);

  // Mushrooms, for the alchemist.
  const shroomSpots = scatter(rand, Math.round(70 * params.flores), 0.6, (x, z) => clearOfObstacles(x, z, 0.3) && bare(x, z) < 0.1);
  const shroomStem = instanced(new THREE.CylinderGeometry(0.04, 0.05, 0.14, 5).translate(0, 0.07, 0), lambert({ color: '#f3ead8' }), shroomSpots.length);
  const shroomCap = instanced(new THREE.ConeGeometry(0.11, 0.09, 6).translate(0, 0.045, 0), lambert(), shroomSpots.length, { cast: true });
  shroomSpots.forEach(([x, z], i) => {
    const y = heightAt(x, z);
    const s = (0.8 + rand() * 0.9) * 0.45;
    dummy.rotation.set((rand() - 0.5) * 0.3, rand() * Math.PI, (rand() - 0.5) * 0.3);
    dummy.scale.setScalar(s);
    dummy.position.set(x, y, z);
    setInstance(shroomStem, i);
    dummy.position.set(x, y + 0.13 * s, z);
    setInstance(shroomCap, i, rand() < 0.75 ? '#a65a4c' : '#a8906a');
  });
  group.add(shroomStem, shroomCap);

  return group;
}

/** Glade cover: grass in lush tufts with dark roots and bright tips, and wildflowers in drifts of one kind. */
function buildGladeCover(
  group: THREE.Group,
  layout: Layout,
  params: GenParams,
  bare: (x: number, z: number) => number,
  paint: GroundPaint,
) {
  const rand = mulberry32(layout.seedNum ^ 0x61ade);

  // Tufts: a centre, then several taller blades leaning out of it. Most land near the play area.
  const tuftSpots = [
    ...scatter(rand, Math.round(700 * params.hierba), 0),
    ...scatter(rand, Math.round(2600 * params.hierba), 0).map(([x, z]): [number, number] => [x * 0.32, z * 0.32]),
  ].filter(([x, z]) => rand() > bare(x, z) * 1.2);
  const PER_TUFT = 9;
  const bladeGeo = shadeByHeight(new THREE.ConeGeometry(0.032, 0.26, 3, 1, true).translate(0, 0.13, 0), 0, 0.26, 0.35, 1.2);
  const blades = instanced(bladeGeo, soft({ vertexColors: true }), tuftSpots.length * PER_TUFT);
  const root = new THREE.Color('#386a2e');
  const tip = new THREE.Color('#8fb655');
  let n = 0;
  for (const [tx, tz] of tuftSpots) {
    const patch = patchAt(tx, tz);
    const big = 0.8 + rand() * 0.7;
    for (let k = 0; k < PER_TUFT; k++) {
      const a = rand() * Math.PI * 2;
      const d = rand() * 0.09 * big;
      const x = tx + Math.cos(a) * d;
      const z = tz + Math.sin(a) * d;
      dummy.position.set(x, heightAt(x, z) - 0.02, z);
      // Lean away from the tuft centre, like a clump that has fanned out.
      dummy.rotation.set(Math.sin(a) * (0.25 + rand() * 0.35), rand() * Math.PI, -Math.cos(a) * (0.25 + rand() * 0.35));
      dummy.scale.set(big, big * (0.7 + rand() * 0.6), big);
      setInstance(blades, n++, color.copy(root).lerp(tip, patch * 0.6 + rand() * 0.3).getHex());
    }
  }
  blades.count = n;
  group.add(blades);

  // Wildflowers in drifts: each drift is one kind, a few singles in between.
  type Bloom = { head: 'round' | 'spike' | 'cup'; colors: string[]; size: number; stem: number };
  const KINDS: Bloom[] = [
    { head: 'spike', colors: ['#7b5bc4', '#8d6bd6', '#6a4fb3'], size: 1, stem: 1.25 }, // lupins
    { head: 'round', colors: ['#f6f2e4', '#fffaf0'], size: 0.8, stem: 0.8 }, // daisies
    { head: 'cup', colors: ['#d8483a', '#e8603f'], size: 1, stem: 1 }, // poppies
    { head: 'round', colors: ['#f2c84b', '#f7d96a'], size: 0.7, stem: 0.7 }, // buttercups
    { head: 'round', colors: ['#5f86d9', '#7a9ae6'], size: 0.65, stem: 0.75 }, // cornflowers
    { head: 'round', colors: ['#e9a4c0', '#f0b8cf'], size: 0.75, stem: 0.8 }, // clover pink
  ];
  const grows = (x: number, z: number) => bare(x, z) < 0.15 && paint.wetAt(x, z) < 0.5;
  const blooms: Array<{ x: number; z: number; kind: Bloom }> = [];
  const drifts = [
    ...scatter(rand, Math.round(70 * params.flores), 1.2, grows),
    ...scatter(rand, Math.round(150 * params.flores), 0, grows).map(([x, z]): [number, number] => [x * 0.32, z * 0.32]),
  ];
  for (const [dx, dz] of drifts) {
    const kind = KINDS[Math.floor(rand() * KINDS.length)];
    const count = 10 + Math.floor(rand() * 18);
    const spread = 0.25 + rand() * 0.45;
    for (let k = 0; k < count; k++) {
      const a = rand() * Math.PI * 2;
      const d = Math.sqrt(rand()) * spread;
      const x = dx + Math.cos(a) * d;
      const z = dz + Math.sin(a) * d;
      if (grows(x, z)) blooms.push({ x, z, kind });
    }
  }
  for (const [x, z] of scatter(rand, Math.round(500 * params.flores), 0, grows)) blooms.push({ x, z, kind: KINDS[1 + Math.floor(rand() * 5)] });

  const stems = instanced(new THREE.CylinderGeometry(0.012, 0.014, 0.3, 3, 1, true).translate(0, 0.15, 0), lambert({ color: '#5c8a3a' }), blooms.length);
  const heads = {
    round: instanced(new THREE.IcosahedronGeometry(0.065, 0), soft(), blooms.length),
    cup: instanced(new THREE.CylinderGeometry(0.08, 0.03, 0.06, 6).translate(0, 0.03, 0), soft(), blooms.length),
    spike: instanced(new THREE.ConeGeometry(0.06, 0.32, 5, 1, true).translate(0, 0.16, 0), soft(), blooms.length, { cast: true }),
  };
  const used = { round: 0, cup: 0, spike: 0 };
  blooms.forEach(({ x, z, kind }, i) => {
    const y = heightAt(x, z);
    const s = (0.75 + rand() * 0.5) * 0.7 * kind.size;
    const h = 0.3 * kind.stem;
    dummy.rotation.set((rand() - 0.5) * 0.25, rand() * Math.PI, (rand() - 0.5) * 0.25);
    dummy.scale.set(s, s * kind.stem, s);
    dummy.position.set(x, y, z);
    setInstance(stems, i);
    dummy.scale.setScalar(s);
    dummy.position.set(x, y + h * s, z);
    setInstance(heads[kind.head], used[kind.head]++, kind.colors[Math.floor(rand() * kind.colors.length)]);
  });
  for (const key of ['round', 'cup', 'spike'] as const) heads[key].count = used[key];
  group.add(stems, heads.round, heads.cup, heads.spike);
}
