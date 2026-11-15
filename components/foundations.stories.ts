import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/foundations');

export default {
  title: 'Fundamentos',
  parameters: { docs: { description: { component: 'La base visual de la UI, leída del estilo real del juego.' } } },
} satisfies Meta;

export const Palette: StoryObj = {
  name: 'Paleta y variables',
  ...scene(load, 'palette', {
    doc: 'Los colores y variables CSS que usa la UI hoy, leídos del estilo real del juego: la base para los design tokens.',
    source: 'index.html (<style>)',
    page: true,
  }),
};

export const Type: StoryObj = {
  name: 'Tipografía',
  ...scene(load, 'type', {
    doc: 'Las familias en uso: EB Garamond (grimorio), system-ui (HUD) y monoespaciada (iniciales).',
    source: 'index.html, src/boot.ts',
    page: true,
  }),
};

export const Icons: StoryObj = {
  name: 'Iconos',
  ...scene(load, 'icons', {
    doc: 'Todos los iconos SVG del HUD, pestañas y redes.',
    source: 'src/icons.ts',
    page: true,
  }),
};

export const Symbols: StoryObj = {
  name: 'Símbolos',
  ...scene(load, 'symbols', {
    doc: 'Cada símbolo con trazo de pincel (mano) y de plumilla (libro, checklist).',
    source: 'src/ammo.ts (shapeIcon)',
    page: true,
  }),
};
