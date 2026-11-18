import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const hud = () => import('./stories/hud');
const notices = () => import('./stories/notices');

export default {
  title: 'Moléculas',
  parameters: { docs: { description: { component: 'Átomos juntos con un solo trabajo: una nota, un aviso, los controles de movimiento.' } } },
} satisfies Meta;

export const Popover: StoryObj = {
  name: 'Popover',
  ...scene(notices, 'popover', {
    doc: 'La nota de grimorio con la que enseñan el tutorial y el entrenamiento, arriba o abajo de lo que señala.',
    source: 'src/popover.ts',
    backdrop: true,
  }),
};

export const Missing: StoryObj = {
  name: 'Símbolo rechazado',
  ...scene(notices, 'missing', {
    doc: 'Fuego o agua sin fuente cerca, o un muro dentro de un círculo de runas.',
    source: 'src/missing.ts',
    backdrop: true,
  }),
};

export const Spot: StoryObj = {
  name: 'Píldoras destacadas',
  ...scene(hud, 'hud-spot', {
    doc: 'Tras la primera victoria, la siguiente partida señala las píldoras de rivales y dificultad durante 5 s.',
    source: 'src/match.ts',
    backdrop: true,
  }),
};

export const Move: StoryObj = {
  name: 'Teclas y stick',
  ...scene(hud, 'hud-move', {
    doc: 'Escritorio: teclas WASD/flechas abajo a la izquierda. Táctil: el stick (activa «Táctil» en la barra).',
    source: 'src/keysHint.ts, pad.ts',
    backdrop: true,
    args: { keys: 'wasd' },
    argTypes: { keys: { name: 'Teclas', control: { type: 'inline-radio', labels: { wasd: 'WASD', arrows: 'Flechas' } }, options: ['wasd', 'arrows'] } },
  }),
};

export const Device: StoryObj = {
  name: 'También en tu móvil',
  ...scene(notices, 'device', {
    doc: 'Aviso de escritorio, una vez por visita.',
    source: 'src/deviceHint.ts',
    backdrop: true,
  }),
};

export const Gpu: StoryObj = {
  name: 'Aviso de GPU',
  ...scene(notices, 'gpu', {
    doc: 'Sin aceleración por hardware (software) o sin WebGL.',
    source: 'src/gpu.ts',
    args: { kind: 'software' },
    argTypes: { kind: { name: 'Caso', control: { type: 'inline-radio', labels: { software: 'Por software', none: 'Sin WebGL' } }, options: ['software', 'none'] } },
    backdrop: true,
  }),
};
