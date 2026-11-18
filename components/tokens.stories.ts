import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const tokens = () => import('./stories/tokens');
const foundations = () => import('./stories/foundations');

export default {
  title: 'Tokens',
  parameters: { docs: { description: { component: 'La base de todo lo demás: colores y tipografía como design tokens (Global → Sistema → Componente).' } } },
} satisfies Meta;

export const Colors: StoryObj = {
  name: 'Colores',
  ...scene(tokens, 'colors', {
    doc: 'Los tokens de componente que usa el juego, con la cadena hasta su valor en claro y en oscuro, los roles del sistema y las paletas globales.',
    source: 'tokens/*.json → src/styles/design-tokens.css (npm run tokens)',
    page: true,
  }),
};

export const Type: StoryObj = {
  name: 'Tipografía',
  ...scene(foundations, 'type', {
    doc: 'Las familias en uso: EB Garamond (grimorio), system-ui (HUD) y monoespaciada (iniciales).',
    source: 'index.html, src/boot.ts',
    page: true,
  }),
};

export const Inventory: StoryObj = {
  name: 'Colores aún sin token',
  ...scene(foundations, 'palette', {
    doc: 'Las variables y los colores escritos a mano que quedan en el CSS del juego: lo que falta por pasar a tokens.',
    source: 'index.html (<style>)',
    page: true,
  }),
};
