import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/notices');

export default {
  title: 'Avisos',
  parameters: { docs: { description: { component: 'Notas y avisos que salen durante el juego.' } } },
} satisfies Meta;

export const Popover: StoryObj = {
  name: 'Popover',
  ...scene(load, 'popover', {
    doc: 'La nota de grimorio con la que enseñan el tutorial y el entrenamiento, arriba o abajo de lo que señala.',
    source: 'src/popover.ts',
    backdrop: true,
  }),
};

export const Missing: StoryObj = {
  name: 'Símbolo rechazado',
  ...scene(load, 'missing', {
    doc: 'Fuego o agua sin fuente cerca, o un muro dentro de un círculo de runas.',
    source: 'src/missing.ts',
    backdrop: true,
  }),
};

export const Hitme: StoryObj = {
  name: '¡Golpéame!',
  ...scene(load, 'hitme', {
    doc: 'La etiqueta sobre el espantapájaros en el entrenamiento.',
    source: 'src/dummy.ts',
    backdrop: true,
  }),
};

export const Device: StoryObj = {
  name: 'También en tu móvil',
  ...scene(load, 'device', {
    doc: 'Aviso de escritorio, una vez por visita.',
    source: 'src/deviceHint.ts',
    backdrop: true,
  }),
};

export const Gpu: StoryObj = {
  name: 'Aviso de GPU',
  ...scene(load, 'gpu', {
    doc: 'Sin aceleración por hardware (software) o sin WebGL.',
    source: 'src/gpu.ts',
    args: { kind: 'software' },
    argTypes: { kind: { name: 'Caso', control: { type: 'inline-radio', labels: { software: 'Por software', none: 'Sin WebGL' } }, options: ['software', 'none'] } },
    backdrop: true,
  }),
};
