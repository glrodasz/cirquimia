import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/meadow');

export default {
  title: '3D/Prado',
  parameters: { docs: { description: { component: 'Las piezas del prado, solas o en un prado completo.' } } },
} satisfies Meta;

export const Trees: StoryObj = {
  name: 'Árboles',
  ...scene(load, 'trees', {
    doc: 'Pino y árbol frondoso, como se instancian en el prado.',
    source: 'src/meadow.ts (Trees)',
    args: { seed: 7 },
    argTypes: { seed: { name: 'Semilla', control: { type: 'number', min: 1, step: 1 } } },
  }),
};

export const Features: StoryObj = {
  name: 'Elementos del prado',
  ...scene(load, 'features', {
    doc: 'Fogata, laguna, menhires, muro, peñascos, cristales, runas, carreta… cada pieza sobre su propio suelo.',
    source: 'src/features.ts',
    args: { kind: 'fogata', seed: 'pieza' },
    argTypes: {
      kind: { name: 'Pieza', control: 'select', options: ['menhires', 'muro', 'penascos', 'monticulo', 'tierraSuelta', 'estanque', 'fogata', 'crater', 'cristales', 'runas', 'empalizada', 'carreta', 'troncos', 'estandarte'] },
      seed: { name: 'Semilla', control: 'text' },
    },
  }),
};

export const Meadow: StoryObj = {
  name: 'Pradera completa',
  ...scene(load, 'meadow', {
    doc: 'Un prado generado por semilla, como en el juego.',
    source: 'src/world.ts',
    args: { seed: 'cirquimia', training: false },
    argTypes: {
      seed: { name: 'Semilla', control: 'text' },
      training: { name: 'Prado de entrenamiento', description: 'Siempre con fogata y laguna.', control: 'boolean' },
    },
  }),
};
