import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/spells');

export default {
  title: '3D/Hechizos',
  parameters: { docs: { description: { component: 'Cada hechizo en bucle, lanzado por el alquimista sobre un rival. El panel del lienzo lo lanza otra vez, para el bucle o muestra la mira.' } } },
} satisfies Meta;

export const Wall: StoryObj = {
  name: 'Muro de defensa',
  ...scene(load, 'spells', { doc: 'Círculo: un muro de tierra en arco delante del alquimista.', source: 'src/spells.ts', args: { cast: 'wall' } }),
};

export const Earth: StoryObj = {
  name: 'Ataque de tierra',
  ...scene(load, 'spells', { doc: 'Cuadrado: un pilar de tierra sale bajo el blanco.', source: 'src/spells.ts', args: { cast: 'earth' } }),
};

export const Columns: StoryObj = {
  name: 'Ataque múltiple de tierra',
  ...scene(load, 'spells', { doc: 'Estrella: cinco columnas en anillo alrededor del blanco.', source: 'src/spells.ts', args: { cast: 'columns' } }),
};

export const Fire: StoryObj = {
  name: 'Ataque de fuego',
  ...scene(load, 'spells', { doc: 'Triángulo: necesita la fogata cerca.', source: 'src/spells.ts', args: { cast: 'fire' } }),
};

export const Water: StoryObj = {
  name: 'Ataque de agua',
  ...scene(load, 'spells', { doc: 'Triángulo invertido: necesita la laguna cerca.', source: 'src/spells.ts', args: { cast: 'water' } }),
};

export const Blast: StoryObj = {
  name: 'Explosión',
  ...scene(load, 'spells', { doc: 'Reloj de arena (fuego + agua).', source: 'src/spells.ts', args: { cast: 'blast' } }),
};

export const FireStar: StoryObj = {
  name: 'Estrella de fuego',
  ...scene(load, 'spells', { doc: 'Estrella + fuego: cinco columnas de fuego.', source: 'src/spells.ts', args: { cast: 'fireStar' } }),
};

export const WaterStar: StoryObj = {
  name: 'Estrella de agua',
  ...scene(load, 'spells', { doc: 'Estrella + agua: cinco columnas de agua.', source: 'src/spells.ts', args: { cast: 'waterStar' } }),
};

export const BlastStar: StoryObj = {
  name: 'Estrella explosiva',
  ...scene(load, 'spells', { doc: 'Reloj de arena + estrella: diez explosiones repartidas.', source: 'src/spells.ts', args: { cast: 'blastStar' } }),
};

export const Vine: StoryObj = {
  name: 'Enredadera que atrapa',
  ...scene(load, 'spells', { doc: 'Espiral: enreda al blanco y lo deja quieto.', source: 'src/spells.ts', args: { cast: 'vine' } }),
};

export const Heal: StoryObj = {
  name: 'Curación',
  ...scene(load, 'spells', { doc: 'Rombo: cura al alquimista.', source: 'src/spells.ts', args: { cast: 'heal' } }),
};

export const ChannelFire: StoryObj = {
  name: 'Cargar fuego',
  ...scene(load, 'spells', { doc: 'El fuego viaja de la fogata a la mano.', source: 'src/spells.ts', args: { cast: 'channelFire' } }),
};

export const ChannelWater: StoryObj = {
  name: 'Cargar agua',
  ...scene(load, 'spells', { doc: 'El agua viaja de la laguna a la mano.', source: 'src/spells.ts', args: { cast: 'channelWater' } }),
};

export const Denied: StoryObj = {
  name: 'Golpe parado',
  ...scene(load, 'spells', { doc: 'Un golpe que un muro detiene: la cruz.', source: 'src/spells.ts', args: { cast: 'denied' } }),
};
