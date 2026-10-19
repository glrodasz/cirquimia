import * as THREE from 'three';
import { heightAt, mulberry32, patchAt } from './noise';
import { LOOK } from './looks';

const P = LOOK.palette;

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

function buildGround(): THREE.Mesh {
  const segments = 72;
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, segments, segments);
  geo.rotateX(-Math.PI / 2);
  const rand = mulberry32(7);
  const pos = geo.attributes.position;
  const step = WORLD_SIZE / segments;
  for (let i = 0; i < pos.count; i++) {
    // Jitter vertices a little so the triangles read as hand-made low-poly, not a grid.
    const x = pos.getX(i) + (rand() - 0.5) * step * 0.45;
    const z = pos.getZ(i) + (rand() - 0.5) * step * 0.45;
    pos.setXYZ(i, x, heightAt(x, z), z);
  }

  if (LOOK.smoothGround) {
    // Painted look: soft per-vertex colour blobs and smooth normals instead of visible facets.
    const colors = new Float32Array(pos.count * 3);
    const light = new THREE.Color(P.groundLight);
    const dark = new THREE.Color(P.groundDark);
    const dry = new THREE.Color(P.groundDry);
    const cool = new THREE.Color('#3d7a66');
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const n = patchAt(x, z) * 0.55 + patchAt(x * 3.1, z * 3.1) * 0.45;
      const patch = THREE.MathUtils.smoothstep(n, 0.32, 0.68);
      color.copy(dark).lerp(light, patch);
      if (patch > 0.7) color.lerp(dry, (patch - 0.7) * 2.2);
      // Hollows drift towards a cool blue-green, rises towards warm light: cheap painted depth.
      color.lerp(cool, THREE.MathUtils.clamp(-pos.getY(i) * 1.6, 0, 0.45));
      color.toArray(colors, i * 3);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
    mesh.receiveShadow = true;
    return mesh;
  }

  const flat = geo.toNonIndexed();
  geo.dispose();
  const p = flat.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const light = new THREE.Color(P.groundLight);
  const dark = new THREE.Color(P.groundDark);
  const dry = new THREE.Color(P.groundDry);
  for (let i = 0; i < p.count; i += 3) {
    const cx = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3;
    const cz = (p.getZ(i) + p.getZ(i + 1) + p.getZ(i + 2)) / 3;
    const patch = patchAt(cx, cz);
    color.copy(dark).lerp(light, patch);
    if (patch > 0.78) color.lerp(dry, (patch - 0.78) * 2.5);
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
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.castShadow = !!shadows.cast;
  mesh.receiveShadow = !!shadows.receive;
  return mesh;
}

function setInstance(mesh: THREE.InstancedMesh, i: number, tint?: THREE.ColorRepresentation) {
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
  if (tint !== undefined) mesh.setColorAt(i, color.set(tint));
}

export function buildMeadow(): { group: THREE.Group; obstacles: Obstacle[] } {
  const group = new THREE.Group();
  const rand = mulberry32(2024);
  const obstacles: Obstacle[] = [];
  const clearOfSpawn = (x: number, z: number) => x * x + z * z > 9;
  const clearOfObstacles = (x: number, z: number, pad: number) =>
    obstacles.every((o) => (o.x - x) ** 2 + (o.z - z) ** 2 > (o.r + pad) ** 2);

  group.add(buildGround());

  // Trees: a mix of pines (stacked cones) and round broadleaf crowns.
  const treeSpots = scatter(rand, 46, 3.2, clearOfSpawn);
  const trunk = instanced(new THREE.CylinderGeometry(0.12, 0.18, 1, 5), lambert({ color: P.trunk }), treeSpots.length, { cast: true });
  const pineLow = instanced(new THREE.ConeGeometry(0.9, 1.5, 6), lambert(), treeSpots.length, { cast: true });
  const pineHigh = instanced(new THREE.ConeGeometry(0.65, 1.2, 6), lambert(), treeSpots.length, { cast: true });
  const round = instanced(new THREE.IcosahedronGeometry(0.85, 0), lambert(), treeSpots.length, { cast: true });
  let pines = 0;
  let rounds = 0;
  treeSpots.forEach(([x, z], i) => {
    const y = heightAt(x, z);
    const s = 0.8 + rand() * 0.6;
    const isPine = rand() < 0.5;
    const trunkH = isPine ? 0.7 : 1.1;
    dummy.position.set(x, y + (trunkH * s) / 2, z);
    dummy.rotation.set(0, rand() * Math.PI, 0);
    dummy.scale.set(s, trunkH * s, s);
    setInstance(trunk, i);
    dummy.scale.setScalar(s);
    if (isPine) {
      const green = color.set(P.pine).offsetHSL((rand() - 0.5) * 0.03, 0, (rand() - 0.5) * 0.06).getHex();
      dummy.position.set(x, y + (trunkH + 0.6) * s, z);
      setInstance(pineLow, pines, green);
      dummy.position.set(x, y + (trunkH + 1.35) * s, z);
      setInstance(pineHigh, pines, green);
      pines++;
    } else {
      dummy.position.set(x, y + (trunkH + 0.55) * s, z);
      dummy.scale.set(s * 1.05, s * 0.95, s * 1.05);
      setInstance(round, rounds++, color.set(P.broadleaf).offsetHSL((rand() - 0.5) * 0.05, 0, (rand() - 0.5) * 0.08).getHex());
    }
    obstacles.push({ x, z, r: 0.45 * s });
  });
  pineLow.count = pineHigh.count = pines;
  round.count = rounds;
  group.add(trunk, pineLow, pineHigh, round);

  // Rocks.
  const rockSpots = scatter(rand, 40, 1.5, (x, z) => clearOfSpawn(x, z) && clearOfObstacles(x, z, 0.8));
  const rocks = instanced(new THREE.DodecahedronGeometry(0.4, 0), lambert(), rockSpots.length, { cast: true, receive: true });
  rockSpots.forEach(([x, z], i) => {
    const s = 0.5 + rand() * 1.0;
    dummy.position.set(x, heightAt(x, z) + 0.08 * s, z);
    dummy.rotation.set(rand() * 0.6, rand() * Math.PI, rand() * 0.6);
    dummy.scale.set(s * (0.9 + rand() * 0.5), s * (0.5 + rand() * 0.3), s * (0.9 + rand() * 0.5));
    setInstance(rocks, i, color.set(P.rock).offsetHSL(0, 0, (rand() - 0.5) * 0.12).getHex());
    if (s > 0.8) obstacles.push({ x, z, r: 0.35 * s });
  });
  group.add(rocks);

  // Grass blades: three-sided cones, no shadows, the cheapest thing in the scene.
  const bladeSpots = scatter(rand, 3200, 0);
  const blades = instanced(new THREE.ConeGeometry(0.05, 0.38, 3).translate(0, 0.19, 0), lambert(), bladeSpots.length);
  bladeSpots.forEach(([x, z], i) => {
    dummy.position.set(x, heightAt(x, z) - 0.02, z);
    dummy.rotation.set((rand() - 0.5) * 0.5, rand() * Math.PI, (rand() - 0.5) * 0.5);
    dummy.scale.setScalar(0.7 + rand() * 0.8);
    const patch = patchAt(x, z);
    setInstance(blades, i, color.set(P.grassDark).lerp(new THREE.Color(P.grassLight), patch * 0.8 + rand() * 0.2).getHex());
  });
  group.add(blades);

  // Flowers: stem + head.
  const flowerSpots = scatter(rand, 420, 0, (x, z) => patchAt(x, z) > 0.35);
  const stems = instanced(new THREE.CylinderGeometry(0.012, 0.012, 0.28, 3).translate(0, 0.14, 0), lambert({ color: P.stem ?? '#4c8a3a' }), flowerSpots.length);
  const heads = instanced(new THREE.IcosahedronGeometry(0.06, 0), lambert(), flowerSpots.length);
  const palette = P.flowers ?? ['#fff7e8', '#ffd84a', '#f59ac1', '#b9a3ff', '#ff8a5c'];
  flowerSpots.forEach(([x, z], i) => {
    const y = heightAt(x, z);
    const s = 0.8 + rand() * 0.5;
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(s);
    dummy.position.set(x, y, z);
    setInstance(stems, i);
    dummy.position.set(x, y + 0.28 * s, z);
    setInstance(heads, i, palette[Math.floor(rand() * palette.length)]);
  });
  group.add(stems, heads);

  // Mushrooms, for the alchemist.
  const shroomSpots = scatter(rand, 70, 0.6, (x, z) => clearOfObstacles(x, z, 0.3));
  const shroomStem = instanced(new THREE.CylinderGeometry(0.04, 0.05, 0.14, 5).translate(0, 0.07, 0), lambert({ color: '#f3ead8' }), shroomSpots.length);
  const shroomCap = instanced(new THREE.ConeGeometry(0.11, 0.09, 6).translate(0, 0.045, 0), lambert(), shroomSpots.length, { cast: true });
  shroomSpots.forEach(([x, z], i) => {
    const y = heightAt(x, z);
    const s = 0.8 + rand() * 0.9;
    dummy.rotation.set((rand() - 0.5) * 0.3, rand() * Math.PI, (rand() - 0.5) * 0.3);
    dummy.scale.setScalar(s);
    dummy.position.set(x, y, z);
    setInstance(shroomStem, i);
    dummy.position.set(x, y + 0.13 * s, z);
    setInstance(shroomCap, i, rand() < 0.75 ? (P.caps?.[0] ?? '#d9452f') : (P.caps?.[1] ?? '#c98a3c'));
  });
  group.add(shroomStem, shroomCap);

  return { group, obstacles };
}
