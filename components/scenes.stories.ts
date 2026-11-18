import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/scenes');

export default {
  title: 'Pantallas',
  parameters: { docs: { description: { component: 'Piezas del juego juntas, con la cámara del juego.' } } },
} satisfies Meta;

export const Combat: StoryObj = {
  name: 'Combate (barras y daño)',
  ...scene(load, 'combat', {
    doc: 'Barras de vida, boceto sobre la cabeza, números de daño y el triángulo "tú", con la cámara del juego.',
    source: 'src/combat.ts (Fighter)',
  }),
};

export const Training: StoryObj = {
  name: 'Entrenamiento guiado',
  ...scene(load, 'training', {
    doc: 'La guía de símbolos, burbujas Paso 1/2 y la hoja "Círculos disponibles".',
    source: 'src/guides.ts',
  }),
};

export const Tutorial: StoryObj = {
  name: 'Tutorial',
  ...scene(load, 'tutorial', {
    doc: 'La primera partida guiada, con el rival dormido.',
    source: 'src/tutorial.ts',
  }),
};
