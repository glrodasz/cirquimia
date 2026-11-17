import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const foundations = () => import('./stories/foundations');
const atoms = () => import('./stories/atoms');
const hud = () => import('./stories/hud');
const notices = () => import('./stories/notices');

export default {
  title: 'Átomos',
  parameters: { docs: { description: { component: 'Las piezas más pequeñas: iconos, símbolos, botones y etiquetas. Todo lo demás se arma con ellas.' } } },
} satisfies Meta;

export const Icons: StoryObj = {
  name: 'Iconos',
  ...scene(foundations, 'icons', {
    doc: 'Todos los iconos SVG del HUD, pestañas y redes.',
    source: 'src/icons.ts',
    page: true,
  }),
};

export const Symbols: StoryObj = {
  name: 'Símbolos',
  ...scene(foundations, 'symbols', {
    doc: 'Cada símbolo con trazo de pincel (mano) y de plumilla (libro, checklist).',
    source: 'src/ammo.ts (shapeIcon)',
    page: true,
  }),
};

export const Buttons: StoryObj = {
  name: 'Botones',
  ...scene(atoms, 'buttons', {
    doc: 'La píldora del HUD (con texto, ajustada, solo icono, destacada), los botones redondos y el reloj.',
    source: 'src/match.ts, help.ts, leaderboard/ui.ts, soundButton.ts, matchTimer.ts',
    page: true,
  }),
};

export const Sound: StoryObj = {
  name: 'Botón de sonido',
  ...scene(hud, 'hud-sound', {
    doc: 'Apagado por defecto (late) y encendido.',
    source: 'src/soundButton.ts',
    backdrop: true,
    args: { chosen: false },
    argTypes: { chosen: { name: 'Ya elegido', description: 'Apagado, el botón late hasta que el jugador lo toca la primera vez.', control: 'boolean' } },
  }),
};

export const Hitme: StoryObj = {
  name: '¡Golpéame!',
  ...scene(notices, 'hitme', {
    doc: 'La etiqueta sobre el espantapájaros en el entrenamiento.',
    source: 'src/dummy.ts',
    backdrop: true,
  }),
};

export const Version: StoryObj = {
  name: 'Versión (?dev)',
  ...scene(hud, 'hud-version', {
    doc: 'La etiqueta de versión que solo se ve con ?dev.',
    source: 'src/version.ts',
    backdrop: true,
  }),
};
