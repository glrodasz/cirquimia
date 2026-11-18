import * as THREE from 'three';
import { Character, type CharacterLook } from '../../src/character';
import { Scarecrow } from '../../src/dummy';
import { createViewer, type Viewer } from '../kit/viewer';
import type { StoryFn } from '../kit/story';

// The coats the game gives its fighters (src/combat.ts RIVAL_LOOKS); the alchemist keeps the default slate blue.
const RIVALS: Array<[string, CharacterLook]> = [
  ['Rojo', { coat: '#6b3a3a', coatDark: '#4f2a2b' }],
  ['Verde', { coat: '#3f5e3c', coatDark: '#2e452c' }],
  ['Ciruela', { coat: '#55406b', coatDark: '#3e2f50' }],
  ['Ocre', { coat: '#7a6230', coatDark: '#5a4822' }],
];

/** Walks in a small circle (the keyboard's steering, turned a little each frame), so the gait can be watched in place. */
function walker(c: Character, center: THREE.Vector3, radius = 0.9) {
  let on = false;
  let angle = 0;
  return {
    set(walk: boolean) {
      on = walk;
      if (!walk) c.halt();
      else angle = Math.atan2(c.root.position.z - center.z, c.root.position.x - center.x);
    },
    update(dt: number) {
      if (!on) return;
      angle += (1.6 / radius) * dt;
      const goal = new THREE.Vector3(center.x + Math.cos(angle) * radius, 0, center.z + Math.sin(angle) * radius);
      const d = goal.sub(c.root.position);
      d.y = 0;
      if (d.lengthSq() > 1e-6) d.normalize();
      c.steer(d.x, d.z);
    },
  };
}

function actions(v: Viewer, people: Character[]) {
  const walkers = people.map((c) => walker(c, c.root.position.clone().add(new THREE.Vector3(0, 0, 0.9))));
  v.onFrame((dt) => {
    for (const w of walkers) w.update(dt);
    for (const c of people) c.update(dt);
  });
  const row = v.panel.row('Acción');
  v.panel.button('Caminar', () => walkers.forEach((w) => w.set(true)), row);
  v.panel.button('Parar', () => walkers.forEach((w) => w.set(false)), row);
  v.panel.button('Lanzar', () => people.forEach((c) => c.cast()), row);
  v.panel.button('Golpe', () => people.forEach((c) => c.flash()), row);
  const row2 = v.panel.row('');
  v.panel.button('Caer', () => people.forEach((c) => c.fall()), row2);
  v.panel.button('Levantarse', () => people.forEach((c) => c.rise()), row2);
  v.panel.button('Enredado 2 s', () => people.forEach((c) => c.entangle(2.2)), row2);
  v.panel.button('Mirar a cámara', () => people.forEach((c) => c.face(v.camera.position.clone().setY(0))), row2);
}

const single =
  (look: CharacterLook, title: string): StoryFn =>
  () => {
    const v = createViewer({ title });
    const c = new Character([], look);
    v.scene.add(c.root);
    c.face(new THREE.Vector3(2, 0, 6));
    c.update(0.016);
    v.frame(c.root, 0.9);
    actions(v, [c]);
  };

const rivals: StoryFn = () => {
  const v = createViewer({ title: 'Rivales' });
  const people = [new Character([], {}), ...RIVALS.map(([, look]) => new Character([], look))];
  const group = new THREE.Group();
  people.forEach((c, i) => {
    c.root.position.set((i - (people.length - 1) / 2) * 0.75, 0, 0);
    c.halt(); // a character walks to its target, the origin until told otherwise
    c.face(new THREE.Vector3(c.root.position.x + 1, 0, 6));
    group.add(c.root);
  });
  v.scene.add(group);
  for (const c of people) c.update(0.016);
  v.frame(group, 1.1);
  actions(v, people);
};

const scarecrow: StoryFn = () => {
  const v = createViewer({ title: 'Espantapájaros' });
  const s = new Scarecrow();
  v.scene.add(s.root);
  s.face(new THREE.Vector3(2, 0, 6));
  for (let i = 0; i < 60; i++) s.update(1 / 30); // it pops up out of the ground once placed
  v.frame(s.root, 0.9);
  v.onFrame((dt) => s.update(dt));
  const row = v.panel.row('Acción');
  v.panel.button('Golpe', () => s.flash(v.camera.position.clone().setY(0)), row);
  v.panel.button('Caer', () => s.fall(), row);
  v.panel.button('Levantarse', () => s.rise(), row);
  v.panel.button('Desvanecer', () => s.vanish(), row);
};

export const stories: Record<string, StoryFn> = {
  alchemist: single({}, 'Alquimista'),
  golem: single({ golem: true }, 'Golem'),
  rivals,
  scarecrow,
};
