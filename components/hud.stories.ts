import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/hud');

export default {
  title: 'HUD',
  parameters: { docs: { description: { component: 'Lo que se ve encima del prado durante una partida.' } } },
} satisfies Meta;

export const Duel: StoryObj = {
  name: 'Duelo',
  ...scene(load, 'hud-duel', {
    doc: 'El HUD de una partida: Entrenar, Nuevo juego, sonido, ranking, libro y el tiempo. En móvil las píldoras pasan a solo iconos.',
    source: 'src/match.ts, help.ts, soundButton.ts, leaderboard/ui.ts, matchTimer.ts',
    backdrop: true,
    args: { rivals: 2, level: 'normal' },
    argTypes: {
      rivals: { name: 'Rivales', control: { type: 'inline-radio' }, options: [1, 2, 3] },
      level: { name: 'Nivel', control: { type: 'select', labels: { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil', experto: 'Muy difícil' } }, options: ['facil', 'normal', 'dificil', 'experto'] },
    },
  }),
};

export const Training: StoryObj = {
  name: 'Entrenamiento',
  ...scene(load, 'hud-training', {
    doc: 'Entrenando, Nuevo juego se oculta y aparece "Ir al combate" con la última batalla elegida.',
    source: 'src/match.ts',
    backdrop: true,
    args: { battle: 'duel' },
    argTypes: { battle: { name: 'Última batalla', control: { type: 'inline-radio', labels: { duel: 'Duelo', horde: 'Horda' } }, options: ['duel', 'horde'] } },
  }),
};

export const Horde: StoryObj = {
  name: 'Horda',
  ...scene(load, 'hud-horde', {
    doc: 'La horda: el aviso de oleada y el toast de inicio.',
    source: 'src/match.ts, matchTimer.ts',
    backdrop: true,
  }),
};

export const Spot: StoryObj = {
  name: 'Píldoras destacadas',
  ...scene(load, 'hud-spot', {
    doc: 'Tras la primera victoria, la siguiente partida señala las píldoras de rivales y dificultad durante 5 s.',
    source: 'src/match.ts',
    backdrop: true,
  }),
};

export const Sound: StoryObj = {
  name: 'Botón de sonido',
  ...scene(load, 'hud-sound', {
    doc: 'Apagado por defecto (late) y encendido.',
    source: 'src/soundButton.ts',
    backdrop: true,
    args: { chosen: false },
    argTypes: { chosen: { name: 'Ya elegido', description: 'Apagado, el botón late hasta que el jugador lo toca la primera vez.', control: 'boolean' } },
  }),
};

export const Move: StoryObj = {
  name: 'Teclas y stick',
  ...scene(load, 'hud-move', {
    doc: 'Escritorio: teclas WASD/flechas abajo a la izquierda. Táctil: el stick (se ve con un viewport táctil).',
    source: 'src/keysHint.ts, pad.ts',
    backdrop: true,
    args: { keys: 'wasd' },
    argTypes: { keys: { name: 'Teclas', control: { type: 'inline-radio', labels: { wasd: 'WASD', arrows: 'Flechas' } }, options: ['wasd', 'arrows'] } },
  }),
};

export const Version: StoryObj = {
  name: 'Versión (?dev)',
  ...scene(load, 'hud-version', {
    doc: 'La etiqueta de versión que solo se ve con ?dev.',
    source: 'src/version.ts',
    backdrop: true,
  }),
};
