import * as THREE from 'three';
import { DEFAULT_PARAMS, KIND_LABEL, dentsFor, generateLayout, paintFor, randomSeed, type GenParams, type Kind } from '../../src/generator';
import { Trees, buildCover, type Obstacle } from '../../src/meadow';
import { buildFeatures } from '../../src/features';
import { World } from '../../src/world';
import { mulberry32, setTerrain } from '../../src/noise';
import { createViewer } from '../kit/viewer';
import type { StoryFn } from '../kit/story';

const trees: StoryFn = ({ args, setArgs }) => {
  const v = createViewer({ title: 'Árboles' });
  const seed = Number(args.seed ?? 7);
  const rand = mulberry32(seed);
  const spots: Array<[number, number, boolean]> = [
    [-1.1, 0, true],
    [1.1, 0, false],
    [-1.6, -2, true],
    [1.6, -2, false],
  ];
  const t = new Trees(spots.length, seed);
  spots.forEach(([x, z, pine], i) => t.add(x, z, i, rand, pine));
  const group = new THREE.Group().add(...t.finish());
  v.scene.add(group);
  v.frame(group, 1.1);
  v.panel.button('Otra variación', () => setArgs({ seed: seed + 1 }));
};

const KINDS = Object.keys(KIND_LABEL) as Kind[];
/** Nothing in the meadow but this one piece: every material off, no trail, the piece required. */
const ALONE: GenParams = { ...DEFAULT_PARAMS, roca: 0, tierra: 0, agua: 0, fuego: 0, magia: 0, restos: 0, sendero: 0, arboles: 0, rocas: 0, animadosMax: 1 };

const features: StoryFn = ({ args, setArgs }) => {
  const kind = (KINDS.includes(args.kind) ? args.kind : 'fogata') as Kind;
  const seed = String(args.seed || 'pieza');
  const v = createViewer({ ground: false, title: 'Elementos del prado' });
  const layout = generateLayout(seed, ALONE, [kind]);
  const piece = layout.features.find((f) => f.kind === kind);
  if (piece) {
    piece.x = 0;
    piece.z = 0;
    piece.animated = true;
    layout.features = [piece];
  }
  setTerrain(layout.seedNum, dentsFor(layout), 0.4);
  const obstacles: Obstacle[] = [];
  const paint = paintFor(layout);
  const cover = buildCover(layout, { ...ALONE, hierba: 0.5, flores: 0.6 }, paint, obstacles);
  const built = buildFeatures(layout, obstacles);
  v.scene.add(cover, built.group);
  v.onFrame((dt) => built.update(dt));
  const focus = new THREE.Mesh(new THREE.SphereGeometry(Math.max(0.6, (piece?.r ?? 1) * 0.9)));
  focus.position.y = 0.3;
  v.frame(focus, 1);
  v.panel.row(`${KIND_LABEL[kind]}${kind === 'crater' ? ' (no sale en el prado)' : ''}`);
  v.panel.button('Otra variación', () => setArgs({ seed: randomSeed() }));
};

const meadow: StoryFn = ({ args, setArgs }) => {
  const seed = String(args.seed || 'cirquimia');
  const training = args.training === true;
  const v = createViewer({ ground: false, title: 'Pradera' });
  const world = new World(v.scene);
  if (training) {
    world.required = () => ['fogata', 'estanque'];
    world.requiredBy = () => 'training';
  }
  world.generate(seed);
  v.onFrame((dt) => world.update(dt));
  v.gameView(new THREE.Vector3(0, 0, 0.6), 13);
  v.panel.button('Nueva semilla', () => setArgs({ seed: randomSeed() }));
  v.panel.row(`Semilla: ${seed} · ${world.layout.features.map((f) => KIND_LABEL[f.kind]).join(', ')}`);
};

export const stories: Record<string, StoryFn> = { trees, features, meadow };
