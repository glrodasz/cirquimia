import * as THREE from 'three';
import { DEFAULT_PARAMS, KIND_LABEL, dentsFor, generateLayout, paintFor, randomSeed, type GenParams, type Kind } from '../../src/generator';
import { Trees, buildCover, type Obstacle } from '../../src/meadow';
import { buildFeatures } from '../../src/features';
import { World } from '../../src/world';
import { mulberry32, setTerrain } from '../../src/noise';
import { createViewer } from '../kit/viewer';
import type { StoryFn } from '../kit/story';

const query = () => new URLSearchParams(location.search);
const reload = (key: string, value: string) => {
  const q = query();
  q.set(key, value);
  location.search = q.toString();
};

const trees: StoryFn = () => {
  const v = createViewer({ title: 'Árboles' });
  const seed = Number(query().get('seed') ?? 7);
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
  v.panel.button('Otra variación', () => reload('seed', String(seed + 1)));
};

const KINDS = Object.keys(KIND_LABEL) as Kind[];
/** Nothing in the meadow but this one piece: every material off, no trail, the piece required. */
const ALONE: GenParams = { ...DEFAULT_PARAMS, roca: 0, tierra: 0, agua: 0, fuego: 0, magia: 0, restos: 0, sendero: 0, arboles: 0, rocas: 0, animadosMax: 1 };

const features: StoryFn = () => {
  const kind = (KINDS.includes(query().get('kind') as Kind) ? query().get('kind') : 'fogata') as Kind;
  const seed = query().get('seed') ?? 'pieza';
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
  v.panel.select('Pieza', KINDS.map((k) => [k, `${KIND_LABEL[k]}${k === 'crater' ? ' (no sale en el prado)' : ''}`]), kind, (k) => reload('kind', k));
  v.panel.button('Otra variación', () => reload('seed', randomSeed()));
};

const meadow: StoryFn = () => {
  const seed = query().get('seed') ?? 'cirquimia';
  const training = query().get('training') === '1';
  const v = createViewer({ ground: false, title: 'Pradera' });
  const world = new World(v.scene);
  if (training) {
    world.required = () => ['fogata', 'estanque'];
    world.requiredBy = () => 'training';
  }
  world.generate(seed);
  v.onFrame((dt) => world.update(dt));
  v.gameView(new THREE.Vector3(0, 0, 0.6), 13);
  v.panel.button('Nueva semilla', () => reload('seed', randomSeed()));
  v.panel.button(training ? 'Prado de duelo' : 'Prado de entrenamiento', () => reload('training', training ? '0' : '1'));
  v.panel.row(`Semilla: ${seed} · ${world.layout.features.map((f) => KIND_LABEL[f.kind]).join(', ')}`);
};

export const stories: Record<string, StoryFn> = { trees, features, meadow };
