import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/characters');

export default {
  title: '3D/Personajes',
  parameters: { docs: { description: { component: 'Los personajes en grande, con cámara orbital.' } } },
} satisfies Meta;

export const Alchemist: StoryObj = {
  name: 'Alquimista',
  ...scene(load, 'alchemist', {
    doc: 'El alquimista del jugador. Prueba caminar, lanzar, golpe, caer y enredado.',
    source: 'src/character.ts',
  }),
};

export const Rivals: StoryObj = {
  name: 'Rivales',
  ...scene(load, 'rivals', {
    doc: 'Los tres rivales (rojo, verde, ciruela) junto al alquimista.',
    source: 'src/character.ts, combat.ts',
  }),
};

export const Golem: StoryObj = {
  name: 'Golem',
  ...scene(load, 'golem', {
    doc: 'El golem de la horda: geometría compartida, 5 draw calls.',
    source: 'src/character.ts',
  }),
};

export const Scarecrow: StoryObj = {
  name: 'Espantapájaros',
  ...scene(load, 'scarecrow', {
    doc: 'El blanco del entrenamiento: se balancea al recibir golpes y cae a cero.',
    source: 'src/dummy.ts',
  }),
};
