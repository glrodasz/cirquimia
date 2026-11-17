import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/ranking');

export default {
  title: 'Organismos/Ranking',
  parameters: { docs: { description: { component: 'El ranking global, con la API simulada.' } } },
} satisfies Meta;

export const Duel: StoryObj = {
  name: 'Ranking de duelo',
  ...scene(load, 'rank-duel', {
    doc: 'El ranking global con datos de ejemplo y tu puesto resaltado.',
    source: 'src/leaderboard/ui.ts',
    backdrop: true,
  }),
};

export const Horde: StoryObj = {
  name: 'Ranking de horda',
  ...scene(load, 'rank-horde', {
    doc: 'La pestaña Horda.',
    source: 'src/leaderboard/ui.ts',
    backdrop: true,
  }),
};

export const Empty: StoryObj = {
  name: 'Vacío',
  ...scene(load, 'rank-empty', {
    doc: 'Sin puntuaciones en el periodo.',
    source: 'src/leaderboard/ui.ts',
    backdrop: true,
  }),
};

export const Offline: StoryObj = {
  name: 'Sin conexión',
  ...scene(load, 'rank-offline', {
    doc: 'El servidor no responde.',
    source: 'src/leaderboard/ui.ts',
    backdrop: true,
  }),
};
