import * as THREE from 'three';
import { mulberry32, type Dent } from './noise';

// The camera never moves, so the playable meadow is what the screen shows. Layouts are composed in
// screen-aligned coordinates (u to the right, v away from the camera) and converted to world x/z.
const AZIMUTH = THREE.MathUtils.degToRad(24);
const COS = Math.cos(AZIMUTH);
const SIN = Math.sin(AZIMUTH);
export function toWorld(u: number, v: number): [number, number] {
  return [u * COS - v * SIN, -u * SIN - v * COS];
}

/**
 * The game is portrait only. This is what a 9:16 to 9:21 phone shows around the spawn (the narrow
 * near edge is about 4.4 units wide); the alchemist can only walk where the screen shows.
 */
export const PLAY_AREA = { uMin: -2.2, uMax: 2.2, vMin: -4, vMax: 5.6 };
/** How far a feature may spill past the side edges (bushes, chips), in world units. */
const SIDE_SLACK = 0.1;
/** Half the visible width at depth v: the screen shows more ground further from the camera. */
function halfWidthAt(v: number): number {
  return 2.1 + (v - PLAY_AREA.vMin) * 0.08;
}
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

export const MATERIAL_LABEL: Record<Material, string> = {
  roca: 'Roca',
  tierra: 'Tierra',
  agua: 'Agua',
  fuego: 'Fuego',
  magia: 'Magia',
  restos: 'Restos',
};

export const KIND_LABEL: Record<Kind, string> = {
  menhires: 'Anillo de menhires',
  muro: 'Muro roto',
  penascos: 'Peñascos',
  monticulo: 'Montículo',
  tierraSuelta: 'Tierra removida',
  estanque: 'Estanque',
  fogata: 'Fogata',
  crater: 'Cráter quemado',
  cristales: 'Cristales',
  runas: 'Círculo rúnico',
  empalizada: 'Empalizada',
  carreta: 'Carreta abandonada',
  troncos: 'Troncos caídos',
  estandarte: 'Estandarte',
};

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
  estanque: { material: 'agua', weight: 1, radius: (s) => 1.6 * s, size: [0.55, 0.8], solid: true, animates: false },
  fogata: { material: 'fuego', weight: 1.3, radius: () => 0.7, size: [1, 1], solid: true, animates: true },
  crater: { material: 'fuego', weight: 1, radius: (s) => 2.4 * s, size: [0.6, 0.75], solid: false, animates: false },
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
  { key: 'roca', label: 'Roca', min: 0, max: 4, step: 1, group: 'Materiales' },
  { key: 'tierra', label: 'Tierra', min: 0, max: 3, step: 1, group: 'Materiales' },
  { key: 'agua', label: 'Agua', min: 0, max: 2, step: 1, group: 'Materiales' },
  { key: 'fuego', label: 'Fuego', min: 0, max: 2, step: 1, group: 'Materiales' },
  { key: 'magia', label: 'Magia', min: 0, max: 2, step: 1, group: 'Materiales' },
  { key: 'restos', label: 'Restos (madera, ruinas)', min: 0, max: 4, step: 1, group: 'Materiales' },
  { key: 'sendero', label: 'Sendero', min: 0, max: 1, step: 1, group: 'Materiales' },
  { key: 'arboles', label: 'Árboles', min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'rocas', label: 'Rocas sueltas', min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'hierba', label: 'Hierba', min: 0, max: 1.5, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'flores', label: 'Flores y setas', min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'relieve', label: 'Relieve', min: 0, max: 2, step: 0.1, group: 'Densidad', unit: '×' },
  { key: 'caminableMin', label: 'Caminable mínimo', min: 60, max: 95, step: 1, group: 'Límites', unit: '%' },
  { key: 'animadosMax', label: 'Elementos animados máx.', min: 0, max: 6, step: 1, group: 'Límites' },
];

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

/** Decides what goes where. Pure data: building meshes happens in meadow.ts / features.ts. */
export function generateLayout(seed: string, params: GenParams): Layout {
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
  // Big pieces first, so they still find room.
  wanted.sort((a, b) => KINDS[b.kind].radius(b.size) - KINDS[a.kind].radius(a.size));

  const features: Feature[] = [];
  const skipped: string[] = [];
  let animated = 0;
  for (const w of wanted) {
    const spec = KINDS[w.kind];
    const r = spec.radius(w.size);
    // Sideways the whole piece must stay on screen; up and down there is more room, so allow some overlap.
    const insetU = r * 0.85 - SIDE_SLACK;
    const insetV = r * 0.5;
    if (halfWidthAt(PLAY_AREA.vMax) < insetU) {
      skipped.push(`${KIND_LABEL[w.kind]} (no cabe en vertical)`);
      continue;
    }
    let placed: Feature | null = null;
    for (let attempt = 0; attempt < 80 && !placed; attempt++) {
      const v = THREE.MathUtils.lerp(PLAY_AREA.vMin + insetV, PLAY_AREA.vMax - insetV, rand());
      const room = halfWidthAt(v) - insetU;
      if (room < 0) continue;
      const u = (rand() * 2 - 1) * room;
      const [x, z] = toWorld(u, v);
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
      skipped.push(`${KIND_LABEL[w.kind]} (sin espacio)`);
      continue;
    }
    if (spec.animates && animated < params.animadosMax) {
      placed.animated = true;
      animated++;
    }
    features.push(placed);
  }
  return { seed, seedNum, features, skipped, trail };
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
