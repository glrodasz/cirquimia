import * as THREE from 'three';
import { mulberry32, type Dent } from './noise';
import { t } from './i18n';

// The camera never moves, so the playable meadow is what the screen shows. Layouts are composed in
// screen-aligned coordinates (u to the right, v away from the camera) and converted to world x/z.
const AZIMUTH = THREE.MathUtils.degToRad(24);
const COS = Math.cos(AZIMUTH);
const SIN = Math.sin(AZIMUTH);
export function toWorld(u: number, v: number): [number, number] {
  return [u * COS - v * SIN, -u * SIN - v * COS];
}
/** The inverse of toWorld (the same rotation undoes itself): world x/z to screen-aligned u/v. */
export function toScreenAligned(x: number, z: number): [number, number] {
  return toWorld(x, z);
}

/** Where a meadow's pieces may go, in screen-aligned ground units: a trapezoid, as the screen shows more ground further away. */
export interface PlayArea {
  vMin: number;
  vMax: number;
  /** Half the walkable width at depth v. */
  halfWidthAt(v: number): number;
  /** Ring the sides and the back with a band of forest, so the edge of the arena reads as the edge of a clearing. */
  forest: boolean;
  /**
   * Training only: campfires and ponds keep out of the near right corner, where the shape-guide card sits, so the
   * triangles' guides over them are never under it.
   */
  clearCorner?: boolean;
}

/** Share of the walkable depth (from the near edge) and of the width (from the right) that `clearCorner` keeps free of sources. */
const CORNER_DEPTH = 0.3;
const CORNER_WIDTH = 0.65;
const SOURCE_KINDS: Kind[] = ['estanque', 'fogata'];

/**
 * What a 9:16 to 9:21 phone shows around the spawn (the narrow near edge is about 4.4 units wide): the default
 * when no screen is known (tests). The game asks src/playArea.ts for the screen it runs on.
 */
export const PORTRAIT_AREA: PlayArea = { vMin: -4, vMax: 5.6, halfWidthAt: (v) => 2.1 + (v + 4) * 0.08, forest: false };
/** Spacing of the ground mesh's vertices (meadow.ts: 90 units in 80 segments), which a pond's hollow must line up with. */
export const GROUND_CELL = 90 / 80;
/** How far a feature may spill past the side edges (bushes, chips), in world units. */
const SIDE_SLACK = 0.1;
/**
 * Water, fire and rune circles are places to draw from or stand in, so the whole of them stays inside the
 * walkable area (as far as their visible edge), never half off screen or under the HUD.
 */
const WHOLLY_INSIDE: Kind[] = ['estanque', 'fogata', 'runas', 'cristales'];
const SPAWN_CLEAR = 0.9;

export type Material = 'roca' | 'tierra' | 'agua' | 'fuego' | 'magia' | 'restos';

export type Kind =
  | 'menhires'
  | 'muro'
  | 'penascos'
  | 'monticulo'
  | 'tierraSuelta'
  | 'estanque'
  | 'fogata'
  | 'crater'
  | 'cristales'
  | 'runas'
  | 'empalizada'
  | 'carreta'
  | 'troncos'
  | 'estandarte';

export const MATERIAL_LABEL: Record<Material, string> = t.materials;

export const KIND_LABEL: Record<Kind, string> = t.kinds;

interface KindSpec {
  material: Material;
  weight: number;
  /** Footprint radius for a given size. */
  radius: (size: number) => number;
  size: [number, number];
  /** Blocks the walk (needs room around it and stays off the trail). */
  solid: boolean;
  /** Has something moving (flames, motes, cloth). Limited by the animation budget. */
  animates: boolean;
}

const KINDS: Record<Kind, KindSpec> = {
  menhires: { material: 'roca', weight: 1, radius: (s) => 2.2 * s, size: [0.55, 0.7], solid: true, animates: false },
  muro: { material: 'roca', weight: 1, radius: (s) => 1.9 * s, size: [0.7, 0.9], solid: true, animates: false },
  penascos: { material: 'roca', weight: 1.4, radius: (s) => 1.2 * s, size: [0.8, 1.2], solid: true, animates: false },
  monticulo: { material: 'tierra', weight: 1, radius: (s) => 1.5 * s, size: [0.8, 1.1], solid: false, animates: false },
  tierraSuelta: { material: 'tierra', weight: 1, radius: (s) => 1.2 * s, size: [0.8, 1.2], solid: false, animates: false },
  // A lagoon big enough to read as one (water about 1.7 to 2.1 units across), never a puddle.
  estanque: { material: 'agua', weight: 1, radius: (s) => 1.6 * s, size: [0.7, 0.85], solid: true, animates: false },
  fogata: { material: 'fuego', weight: 1.3, radius: () => 0.7, size: [1, 1], solid: true, animates: true },
  // Weight 0: a blast crater looks out of place in a meadow, so fire is always a campfire here (kept for other biomes).
  crater: { material: 'fuego', weight: 0, radius: (s) => 2.4 * s, size: [0.6, 0.75], solid: false, animates: false },
  cristales: { material: 'magia', weight: 1, radius: (s) => 1.2 * s, size: [0.8, 1.1], solid: true, animates: true },
  runas: { material: 'magia', weight: 1, radius: (s) => 1.4 * s, size: [0.85, 1.1], solid: false, animates: true },
  empalizada: { material: 'restos', weight: 1, radius: (s) => 1.6 * s, size: [0.7, 0.9], solid: true, animates: false },
  carreta: { material: 'restos', weight: 1, radius: () => 1.2, size: [1, 1], solid: true, animates: false },
  troncos: { material: 'restos', weight: 1.2, radius: () => 1, size: [1, 1], solid: true, animates: false },
  estandarte: { material: 'restos', weight: 0.8, radius: () => 0.5, size: [1, 1], solid: true, animates: true },
};

export interface Feature {
  kind: Kind;
  material: Material;
  x: number;
  z: number;
  rot: number;
  size: number;
  r: number;
  solid: boolean;
  animated: boolean;
  /** Each feature has its own random stream, so dropping one never reshuffles the others. */
  seed: number;
}

export interface Layout {
  seed: string;
  seedNum: number;
  features: Feature[];
  /** Requested but did not fit, or dropped to keep the meadow walkable. */
  skipped: string[];
  trail: Array<[number, number]> | null;
  /** The walkable area it was laid out in. */
  area: PlayArea;
}

export interface GenParams {
  roca: number;
  tierra: number;
  agua: number;
  fuego: number;
  magia: number;
  restos: number;
  sendero: number;
  arboles: number;
  rocas: number;
  hierba: number;
  flores: number;
  relieve: number;
  caminableMin: number;
  animadosMax: number;
}

export const DEFAULT_PARAMS: GenParams = {
  roca: 1,
  tierra: 1,
  agua: 1,
  fuego: 1,
  magia: 1,
  restos: 1,
  sendero: 1,
  arboles: 1,
  rocas: 1,
  hierba: 1,
  flores: 1,
  relieve: 1,
  caminableMin: 85,
  animadosMax: 3,
};

export interface ParamSpec {
  key: keyof GenParams;
  label: string;
  min: number;
  max: number;
  step: number;
  group: 'Materiales' | 'Densidad' | 'Límites';
  unit?: string;
}

export const PARAM_SPECS: ParamSpec[] = [
  { key: 'roca', label: t.dev.paramLabels.roca, min: 0, max: 4, step: 1, group: 'Materiales' },
  { key: 'tierra', label: t.dev.paramLabels.tierra, min: 0, max: 3, step: 1, group: 'Materiales' },
  { key: 'agua', label: t.dev.paramLabels.agua, min: 0, max: 2, step: 1, group: 'Materiales' },
  { key: 'fuego', label: t.dev.paramLabels.fuego, min: 0, max: 2, step: 1, group: 'Materiales' },
  { key: 'magia', label: t.dev.paramLabels.magia, min: 0, max: 2, step: 1, group: 'Materiales' },
  { key: 'restos', label: t.dev.paramLabels.restos, min: 0, max: 4, step: 1, group: 'Materiales' },
  { key: 'sendero', label: t.dev.paramLabels.sendero, min: 0, max: 1, step: 1, group: 'Materiales' },
  { key: 'arboles', label: t.dev.paramLabels.arboles, min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'rocas', label: t.dev.paramLabels.rocas, min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'hierba', label: t.dev.paramLabels.hierba, min: 0, max: 1.5, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'flores', label: t.dev.paramLabels.flores, min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'relieve', label: t.dev.paramLabels.relieve, min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'caminableMin', label: t.dev.paramLabels.caminableMin, min: 60, max: 95, step: 1, group: 'Límites', unit: '%' },
  { key: 'animadosMax', label: t.dev.paramLabels.animadosMax, min: 0, max: 6, step: 1, group: 'Límites' },
];

/** The material a kind of piece is made of (its generator slider). */
export const materialOf = (kind: Kind): Material => KINDS[kind].material;

/** FNV-1a: any text works as a seed (later, the date will be the daily seed). */
export function hashSeed(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function randomSeed(): string {
  return Math.floor(Math.random() * 36 ** 6)
    .toString(36)
    .padStart(6, '0');
}

function pickKind(rand: () => number, material: Material, used: Map<Kind, number>): Kind {
  const options = (Object.keys(KINDS) as Kind[]).filter((k) => KINDS[k].material === material);
  // Repeats are allowed but get rarer, so two of the same set piece is the exception.
  const weights = options.map((k) => KINDS[k].weight * 0.25 ** (used.get(k) ?? 0));
  let t = rand() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < options.length; i++) {
    t -= weights[i];
    if (t <= 0) return options[i];
  }
  return options[options.length - 1];
}

function distToSegment(x: number, z: number, [ax, az]: number[], [bx, bz]: number[]) {
  const dx = bx - ax;
  const dz = bz - az;
  const t = THREE.MathUtils.clamp(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz), 0, 1);
  return Math.hypot(x - ax - dx * t, z - az - dz * t);
}

export function distToPath(x: number, z: number, path: Array<[number, number]>): number {
  let d = Infinity;
  for (let i = 0; i < path.length - 1; i++) d = Math.min(d, distToSegment(x, z, path[i], path[i + 1]));
  return d;
}

/** A worn track that crosses the whole screen and passes close to where the alchemist starts. */
function makeTrail(rand: () => number): Array<[number, number]> {
  const angle = (rand() - 0.5) * 1.6; // mostly running up the screen, tilted either way
  const du = Math.sin(angle);
  const dv = Math.cos(angle);
  const offset = (rand() - 0.5) * 2.4;
  const points: Array<[number, number]> = [];
  let wobble = 0;
  for (let t = -11; t <= 11; t += 2.2) {
    wobble = wobble * 0.5 + (rand() - 0.5) * 1.4;
    points.push(toWorld(t * du + (offset + wobble) * dv, t * dv - (offset + wobble) * du));
  }
  return points;
}

/**
 * Decides what goes where. Pure data: building meshes happens in meadow.ts / features.ts.
 * `required` kinds are always asked for, placed first and given more tries, so they make it onto the screen.
 */
export function generateLayout(seed: string, params: GenParams, required: Kind[] = [], area: PlayArea = PORTRAIT_AREA): Layout {
  const seedNum = hashSeed(seed);
  const rand = mulberry32(seedNum);
  const trail = params.sendero >= 1 ? makeTrail(rand) : null;

  const wanted: Array<{ kind: Kind; size: number; rot: number; seed: number }> = [];
  const used = new Map<Kind, number>();
  const counts: Array<[Material, number]> = [
    ['agua', params.agua],
    ['magia', params.magia],
    ['roca', params.roca],
    ['fuego', params.fuego],
    ['tierra', params.tierra],
    ['restos', params.restos],
  ];
  for (const [material, n] of counts) {
    for (let i = 0; i < n; i++) {
      const kind = pickKind(rand, material, used);
      used.set(kind, (used.get(kind) ?? 0) + 1);
      const [lo, hi] = KINDS[kind].size;
      let rot = rand() * Math.PI * 2;
      // Walls and fences run roughly up the screen, so they fit the narrow portrait view.
      if (kind === 'muro' || kind === 'empalizada') rot = Math.atan2(-COS, -SIN) + (rot / Math.PI - 1) * 0.5;
      wanted.push({ kind, size: lo + rand() * (hi - lo), rot, seed: Math.floor(rand() * 2 ** 31) });
    }
  }
  for (const kind of required) {
    if (wanted.some((w) => w.kind === kind)) continue;
    const [lo, hi] = KINDS[kind].size;
    wanted.push({ kind, size: lo + rand() * (hi - lo), rot: rand() * Math.PI * 2, seed: Math.floor(rand() * 2 ** 31) });
  }
  // Required pieces first, then big ones, so they still find room.
  // Water (the hardest to fit, as it sits on the ground grid), fire and runes come next: without them half the
  // symbols have nothing to draw from, and the runes are a goal.
  const must = (k: Kind) => (required.includes(k) ? 3 : k === 'estanque' ? 2 : WHOLLY_INSIDE.includes(k) ? 1 : 0);
  wanted.sort((a, b) => must(b.kind) - must(a.kind) || KINDS[b.kind].radius(b.size) - KINDS[a.kind].radius(a.size));

  const features: Feature[] = [];
  const skipped: string[] = [];
  let animated = 0;
  for (const w of wanted) {
    const spec = KINDS[w.kind];
    const r = spec.radius(w.size);
    // Sideways the whole piece must stay on screen; up and down there is more room, so allow some overlap.
    // Sources and rune circles stay wholly inside either way.
    const whole = WHOLLY_INSIDE.includes(w.kind);
    const insetU = whole ? r * 0.85 : r * 0.85 - SIDE_SLACK;
    const insetV = whole ? r * 0.85 : r * 0.5;
    if (area.halfWidthAt(area.vMax) < insetU || area.vMax - area.vMin < insetV * 2) {
      skipped.push(`${KIND_LABEL[w.kind]} (${t.dev.noRoomPortrait})`);
      continue;
    }
    let placed: Feature | null = null;
    const tries = must(w.kind) ? 400 : 80;
    for (let attempt = 0; attempt < tries && !placed; attempt++) {
      let v = THREE.MathUtils.lerp(area.vMin + insetV, area.vMax - insetV, rand());
      // The near edge is the narrowest: a round piece must clear the side at its own nearest depth.
      const room = area.halfWidthAt(whole ? v - insetV : v) - insetU;
      if (room < 0) continue;
      let u = (rand() * 2 - 1) * room;
      let [x, z] = toWorld(u, v);
      if (w.kind === 'estanque') {
        // The ground mesh is a coarse grid: a pond between its vertices gets no hollow and the water sinks out of
        // sight. Centred on a vertex, the hollow always dips under the water line. Then it must still fit.
        x = Math.round(x / GROUND_CELL) * GROUND_CELL;
        z = Math.round(z / GROUND_CELL) * GROUND_CELL;
        [u, v] = toScreenAligned(x, z);
        if (v - insetV < area.vMin || v + insetV > area.vMax || Math.abs(u) > area.halfWidthAt(v - insetV) - insetU) continue;
      }
      if (area.clearCorner && SOURCE_KINDS.includes(w.kind)) {
        const half = area.halfWidthAt(v);
        const inDepth = v - r * 0.6 < area.vMin + (area.vMax - area.vMin) * CORNER_DEPTH;
        const inWidth = u + r * 0.85 > half * (1 - 2 * CORNER_WIDTH);
        if (inDepth && inWidth) continue;
      }
      const spawnGap = spec.solid ? r * 0.8 + SPAWN_CLEAR : r * 0.5 + SPAWN_CLEAR;
      if (x * x + z * z < spawnGap * spawnGap) continue;
      if (spec.solid && trail && distToPath(x, z, trail) < r * 0.35) continue; // the narrow screen leaves little room beside the trail
      const crowded = features.some((f) => {
        const gap = f.solid && spec.solid ? 0.4 : 0;
        return (f.x - x) ** 2 + (f.z - z) ** 2 < ((f.r + r) * 0.8 + gap) ** 2; // footprints include a soft margin
      });
      if (crowded) continue;
      placed = {
        kind: w.kind,
        material: spec.material,
        x,
        z,
        rot: w.rot,
        size: w.size,
        r,
        solid: spec.solid,
        animated: false,
        seed: w.seed,
      };
    }
    if (!placed) {
      skipped.push(`${KIND_LABEL[w.kind]} (${t.dev.noRoom})`);
      continue;
    }
    if (spec.animates && animated < params.animadosMax) {
      placed.animated = true;
      animated++;
    }
    features.push(placed);
  }
  return { seed, seedNum, features, skipped, trail, area };
}

/** Terrain carving each feature needs (ponds, craters, mounds). */
export function dentsFor(layout: Layout): Dent[] {
  const dents: Dent[] = [];
  for (const f of layout.features) {
    if (f.kind === 'estanque') dents.push({ x: f.x, z: f.z, r: f.r * 0.85, depth: -0.5, rim: 0.04, flatten: true });
    if (f.kind === 'crater') dents.push({ x: f.x, z: f.z, r: f.r / 1.15, depth: -0.42, rim: 0.14 });
    if (f.kind === 'monticulo') dents.push({ x: f.x, z: f.z, r: f.r, depth: 0.38 * f.size, rim: 0 });
  }
  return dents;
}

export interface GroundPaint {
  /** Bare earth: the trail, dug-up patches, mound tops, shores. */
  dirtAt(x: number, z: number): number;
  scorchAt(x: number, z: number): number;
  /** 1 under water. */
  waterAt(x: number, z: number): number;
  /** Damp, darker grass around water. */
  wetAt(x: number, z: number): number;
}

const smooth = THREE.MathUtils.smoothstep;

export function paintFor(layout: Layout): GroundPaint {
  const { trail, features } = layout;
  const near = (kinds: Kind[]) => features.filter((f) => kinds.includes(f.kind));
  const dirtSpots = near(['tierraSuelta', 'monticulo', 'fogata', 'menhires']);
  const scorchSpots = near(['crater', 'fogata']);
  const ponds = near(['estanque']);
  return {
    dirtAt(x, z) {
      let v = trail ? smooth(0.9 - distToPath(x, z, trail), 0, 0.5) : 0;
      for (const f of dirtSpots) {
        const d = Math.hypot(x - f.x, z - f.z) / f.r;
        const reach = f.kind === 'tierraSuelta' ? 0.85 : f.kind === 'monticulo' ? 0.45 : f.kind === 'fogata' ? 0.55 : 0.35;
        v = Math.max(v, smooth(reach - d, -0.05, 0.25) * (f.kind === 'menhires' ? 0.45 : 1));
      }
      for (const f of ponds) {
        const d = Math.hypot(x - f.x, z - f.z) / (f.r * 0.85);
        v = Math.max(v, smooth(0.95 - Math.abs(d - 0.82) * 4, 0, 0.6) * 0.8);
      }
      return v;
    },
    scorchAt(x, z) {
      let v = 0;
      for (const f of scorchSpots) {
        const d = Math.hypot(x - f.x, z - f.z) / (f.kind === 'crater' ? f.r / 1.15 : 0.3);
        v = Math.max(v, smooth(1.1 - d, 0, 0.5));
      }
      return v;
    },
    waterAt(x, z) {
      for (const f of ponds) if (Math.hypot(x - f.x, z - f.z) < f.r * 0.85 * 0.78) return 1;
      return 0;
    },
    wetAt(x, z) {
      let v = 0;
      for (const f of ponds) v = Math.max(v, smooth(1.5 - Math.hypot(x - f.x, z - f.z) / (f.r * 0.85), 0, 0.5));
      return v;
    },
  };
}
