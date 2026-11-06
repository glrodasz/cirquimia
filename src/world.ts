import * as THREE from 'three';
import { heightAt, setTerrain } from './noise';
import { buildCover, buildSolids, type Obstacle } from './meadow';
import { buildFeatures } from './features';
import { t } from './i18n';
import {
  DEFAULT_PARAMS,
  KIND_LABEL,
  PLAY_AREA,
  dentsFor,
  generateLayout,
  paintFor,
  toWorld,
  type GenParams,
  type Layout,
} from './generator';

/** Same as the alchemist's body radius: a cell is walkable if the alchemist fits there. */
const BODY_RADIUS = 0.12;
const CELL = 0.25;
const MAX_DROPS = 4;
/**
 * The camera never moves, so props farther than this from the spawn are never on screen and never
 * shadow anything that is: the widest screens (about 3:1) see 17 units out and tall trees cast about 2.5.
 */
const VISIBLE_RADIUS = 20;

export interface Walkability {
  /** Share of the playable area reachable on foot from the spawn point, 0..100. */
  reachable: number;
  /** Share of the playable area covered by obstacles or water, 0..100. */
  blocked: number;
  /** Cells that are free but cut off from the spawn, in world coordinates. */
  islands: Array<[number, number]>;
  blockedCells: Array<[number, number]>;
}

export interface WorldStats {
  seed: string;
  ms: number;
  walk: Walkability;
  obstacles: number;
  drops: string[];
  meshes: number;
  instances: number;
  triangles: number;
  animated: number;
}

/** Grid over the playable area; flood fill from the spawn tells how much of it can be walked. */
export function measureWalkability(obstacles: Obstacle[]): Walkability {
  const cols = Math.round((PLAY_AREA.uMax - PLAY_AREA.uMin) / CELL);
  const rows = Math.round((PLAY_AREA.vMax - PLAY_AREA.vMin) / CELL);
  const free = new Uint8Array(cols * rows);
  const world: Array<[number, number]> = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const [x, z] = toWorld(PLAY_AREA.uMin + (i + 0.5) * CELL, PLAY_AREA.vMin + (j + 0.5) * CELL);
      world.push([x, z]);
      free[j * cols + i] = obstacles.every((o) => (o.x - x) ** 2 + (o.z - z) ** 2 > (o.r + BODY_RADIUS) ** 2) ? 1 : 0;
    }
  }
  // Start from the free cell nearest to the spawn point (0, 0).
  let start = -1;
  let best = Infinity;
  world.forEach(([x, z], k) => {
    const d = x * x + z * z;
    if (free[k] && d < best) {
      best = d;
      start = k;
    }
  });
  const seen = new Uint8Array(cols * rows);
  let reached = 0;
  if (start >= 0) {
    const stack = [start];
    seen[start] = 1;
    while (stack.length) {
      const k = stack.pop()!;
      reached++;
      const i = k % cols;
      const j = (k - i) / cols;
      const next = [i > 0 ? k - 1 : -1, i < cols - 1 ? k + 1 : -1, j > 0 ? k - cols : -1, j < rows - 1 ? k + cols : -1];
      for (const n of next) {
        if (n >= 0 && free[n] && !seen[n]) {
          seen[n] = 1;
          stack.push(n);
        }
      }
    }
  }
  const total = cols * rows;
  const islands: Array<[number, number]> = [];
  const blockedCells: Array<[number, number]> = [];
  let blocked = 0;
  for (let k = 0; k < total; k++) {
    if (!free[k]) {
      blocked++;
      blockedCells.push(world[k]);
    } else if (!seen[k]) islands.push(world[k]);
  }
  return { reachable: (reached / total) * 100, blocked: (blocked / total) * 100, islands, blockedCells };
}

function dispose(object: THREE.Object3D) {
  object.traverse((o) => {
    const mesh = o as THREE.Mesh;
    mesh.geometry?.dispose();
    const mat = mesh.material;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
    else mat?.dispose();
    if ((o as THREE.InstancedMesh).isInstancedMesh) (o as THREE.InstancedMesh).dispose();
  });
}

/** Drops instances nobody can see, so the GPU stops drawing and shadowing them every frame. */
function cullUnseen(root: THREE.Object3D) {
  const matrix = new THREE.Matrix4();
  const tint = new THREE.Color();
  root.traverse((o) => {
    const mesh = o as THREE.InstancedMesh;
    if (!mesh.isInstancedMesh) return;
    let kept = 0;
    for (let i = 0; i < mesh.count; i++) {
      mesh.getMatrixAt(i, matrix);
      const x = matrix.elements[12];
      const z = matrix.elements[14];
      if (x * x + z * z > VISIBLE_RADIUS * VISIBLE_RADIUS) continue;
      if (kept !== i) {
        mesh.setMatrixAt(kept, matrix);
        if (mesh.instanceColor) mesh.setColorAt(kept, mesh.getColorAt(i, tint));
      }
      kept++;
    }
    if (kept === mesh.count) return;
    mesh.count = kept;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.boundingSphere = null;
  });
}

/** Owns the current meadow: builds it from a seed, swaps it out, and reports what it made. */
export class World {
  /** Shared with the alchemist; refilled in place on every generation. */
  readonly obstacles: Obstacle[] = [];
  params: GenParams = { ...DEFAULT_PARAMS };
  /** True while meadows must come without rune circles (runes or crystals): the tutorial's, so its wall lesson always works. */
  noRunes: () => boolean = () => false;
  /** Grass and flower density from the graphics quality tier (src/quality.ts), on top of the generator's sliders. */
  cover = 1;
  layout!: Layout;
  stats!: WorldStats;
  private root = new THREE.Group();
  private coverGroup: THREE.Group | null = null;
  private debug: THREE.Group | null = null;
  private showDebug = false;
  private updateFeatures: (dt: number) => void = () => {};
  readonly listeners: Array<(world: World) => void> = [];

  constructor(private readonly scene: THREE.Scene) {
    scene.add(this.root);
  }

  generate(seed: string) {
    const t0 = performance.now();
    this.scene.remove(this.root);
    dispose(this.root);
    this.obstacles.length = 0;

    const layout = generateLayout(seed, this.noRunes() ? { ...this.params, magia: 0 } : this.params);
    const drops: string[] = [];
    let built: { features: ReturnType<typeof buildFeatures>; solids: THREE.Group; walk: Walkability };
    // Build what blocks the walk, check it, and drop the most blocking piece until enough is walkable.
    for (;;) {
      setTerrain(layout.seedNum, dentsFor(layout), this.params.relieve);
      const paint = paintFor(layout);
      const features = buildFeatures(layout, this.obstacles);
      const solids = buildSolids(layout, this.params, paint, this.obstacles);
      const walk = measureWalkability(this.obstacles);
      built = { features, solids, walk };
      if (walk.reachable >= this.params.caminableMin || drops.length >= MAX_DROPS || !layout.features.some((f) => f.solid)) break;
      let worst = -1;
      features.blockedArea.forEach((a, i) => {
        if (layout.features[i].solid && (worst < 0 || a > features.blockedArea[worst])) worst = i;
      });
      const [removed] = layout.features.splice(worst, 1);
      drops.push(`${KIND_LABEL[removed.kind]} (${t.dev.blockedPath})`);
      dispose(features.group);
      dispose(solids);
      this.obstacles.length = 0;
    }
    layout.skipped.push(...drops);

    const paint = paintFor(layout);
    this.root = new THREE.Group();
    const coverParams = { ...this.params, hierba: this.params.hierba * this.cover, flores: this.params.flores * this.cover };
    this.coverGroup = buildCover(layout, coverParams, paint, this.obstacles);
    this.root.add(this.coverGroup, built.solids, built.features.group);
    cullUnseen(this.root);
    this.scene.add(this.root);
    this.updateFeatures = built.features.update;
    this.layout = layout;

    let meshes = 0;
    let instances = 0;
    let triangles = 0;
    this.root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.geometry) return;
      const geo = mesh.geometry;
      const tris = (geo.index ? geo.index.count : geo.attributes.position.count) / 3;
      const n = (o as THREE.InstancedMesh).isInstancedMesh ? (o as THREE.InstancedMesh).count : 1;
      if (n === 0) return;
      meshes++;
      instances += n;
      triangles += (o as THREE.Points).isPoints ? 0 : tris * n;
    });
    this.stats = {
      seed,
      ms: performance.now() - t0,
      walk: built.walk,
      obstacles: this.obstacles.length,
      drops,
      meshes,
      instances,
      triangles: Math.round(triangles),
      animated: layout.features.filter((f) => f.animated).length,
    };
    this.rebuildDebug();
    for (const listener of this.listeners) listener(this);
  }

  update(dt: number) {
    this.updateFeatures(dt);
  }

  /**
   * Lowers the grass and flower density of the meadow on screen without rebuilding it (the match goes on), by
   * keeping an even spread of the grass blades. Flowers, and raising it, wait for the next meadow.
   */
  setCover(density: number) {
    const ratio = density / this.cover;
    this.cover = density;
    if (ratio >= 1 || !this.coverGroup) return;
    const matrix = new THREE.Matrix4();
    const tint = new THREE.Color();
    this.coverGroup.traverse((o) => {
      const mesh = o as THREE.InstancedMesh;
      // Grass only: flower stems and heads live in separate meshes and must stay paired, so they wait for the next meadow.
      if (!mesh.isInstancedMesh || !mesh.userData.thinnable) return;
      let kept = 0;
      for (let i = 0; i < mesh.count; i++) {
        if (Math.floor((i + 1) * ratio) === Math.floor(i * ratio)) continue;
        mesh.getMatrixAt(i, matrix);
        mesh.setMatrixAt(kept, matrix);
        if (mesh.instanceColor) mesh.setColorAt(kept, mesh.getColorAt(i, tint));
        kept++;
      }
      mesh.count = kept;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
  }

  setDebug(on: boolean) {
    this.showDebug = on;
    this.rebuildDebug();
  }

  /** Obstacle rings, blocked cells (red), cut-off cells (amber) and the playable area outline. */
  private rebuildDebug() {
    if (this.debug) {
      this.scene.remove(this.debug);
      dispose(this.debug);
      this.debug = null;
    }
    if (!this.showDebug || !this.stats) return;
    const group = new THREE.Group();
    // Drawn just above the ground without depth test, so it reads through grass and props.
    const y = (x: number, z: number) => heightAt(x, z) + 0.05;
    const ringPts: number[] = [];
    for (const o of this.obstacles) {
      const n = 12;
      for (let i = 0; i < n; i++) {
        const a0 = (i / n) * Math.PI * 2;
        const a1 = ((i + 1) / n) * Math.PI * 2;
        const ax = o.x + Math.cos(a0) * o.r;
        const az = o.z + Math.sin(a0) * o.r;
        const bx = o.x + Math.cos(a1) * o.r;
        const bz = o.z + Math.sin(a1) * o.r;
        ringPts.push(ax, y(ax, az), az, bx, y(bx, bz), bz);
      }
    }
    const corners = [
      toWorld(PLAY_AREA.uMin, PLAY_AREA.vMin),
      toWorld(PLAY_AREA.uMax, PLAY_AREA.vMin),
      toWorld(PLAY_AREA.uMax, PLAY_AREA.vMax),
      toWorld(PLAY_AREA.uMin, PLAY_AREA.vMax),
    ];
    corners.forEach(([x, z], i) => {
      const [nx, nz] = corners[(i + 1) % 4];
      ringPts.push(x, y(x, z), z, nx, y(nx, nz), nz);
    });
    const lines = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(ringPts, 3)),
      new THREE.LineBasicMaterial({ color: '#ff4d6d', depthTest: false, transparent: true }),
    );
    const cells = (list: Array<[number, number]>, hex: string) =>
      new THREE.Points(
        new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(list.flatMap(([x, z]) => [x, y(x, z), z]), 3)),
        new THREE.PointsMaterial({ color: hex, size: 4, sizeAttenuation: false, depthTest: false, transparent: true, opacity: 0.7 }),
      );
    group.add(lines, cells(this.stats.walk.blockedCells, '#ff4d6d'), cells(this.stats.walk.islands, '#ffb020'));
    group.traverse((o) => (o.renderOrder = 10));
    this.debug = group;
    this.scene.add(group);
  }
}
