import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/match');

export default {
  title: 'Organismos/Partida',
  parameters: { docs: { description: { component: 'Las hojas de inicio y fin de partida.' } } },
} satisfies Meta;

export const Newgame: StoryObj = {
  name: 'Nuevo juego',
  ...scene(load, 'newgame', {
    doc: 'La hoja de Nuevo juego: Duelo (rivales y dificultad) u Horda.',
    source: 'src/match.ts',
    backdrop: true,
  }),
};

export const EndVictory: StoryObj = {
  name: 'Victoria con puntuación',
  ...scene(load, 'end-victory', {
    doc: 'Tarjeta de victoria con puntos, iniciales, Ver ranking / Jugar de nuevo y Compartir (API simulada).',
    source: 'src/match.ts, leaderboard/ui.ts',
    backdrop: true,
  }),
};

export const EndDefeat: StoryObj = {
  name: 'Derrota',
  ...scene(load, 'end-defeat', {
    doc: 'Game over de una partida normal.',
    source: 'src/match.ts',
    backdrop: true,
  }),
};

export const EndDefeatTrain: StoryObj = {
  name: 'Derrota (sugiere entrenar)',
  ...scene(load, 'end-defeat-train', {
    doc: 'La primera partida real perdida también ofrece entrenar.',
    source: 'src/match.ts',
    backdrop: true,
  }),
};

export const EndHorde: StoryObj = {
  name: 'Fin de la horda',
  ...scene(load, 'end-horde', {
    doc: 'Oleada alcanzada y tiempo, guardado en el ranking de la horda.',
    source: 'src/match.ts, leaderboard/ui.ts',
    backdrop: true,
  }),
};
