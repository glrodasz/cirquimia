import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/share');

export default {
  title: 'Organismos/Compartir',
  parameters: { docs: { description: { component: 'La imagen que se comparte al ganar.' } } },
} satisfies Meta;

export const ShareCard: StoryObj = {
  name: 'Tarjeta para compartir',
  ...scene(load, 'share-card', {
    doc: 'La imagen que se comparte: cuadrada (1080) y ancha (1200×630, vista previa del enlace).',
    source: 'src/leaderboard/share.ts',
    page: true,
  }),
};
