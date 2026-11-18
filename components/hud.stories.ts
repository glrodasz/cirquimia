import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/hud');

export default {
  title: 'Organismos/HUD',
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
      rivals: { name: 'Rivales', control: { type: 'inline-radio' }, options: [1, 2, 3, 4] },
      level: { name: 'Nivel', control: { type: 'select', labels: { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil', experto: 'Muy difícil', hardcore: 'Hardcore' } }, options: ['facil', 'normal', 'dificil', 'experto', 'hardcore'] },
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

