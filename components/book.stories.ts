import type { Meta, StoryObj } from '@storybook/html-vite';
import { scene } from './kit/boot';

const load = () => import('./stories/book');

export default {
  title: 'Organismos/Libro',
  parameters: { docs: { description: { component: 'El grimorio: índice de símbolos y cómo jugar.' } } },
} satisfies Meta;

export const Symbols: StoryObj = {
  name: 'Símbolos',
  ...scene(load, 'book-symbols', {
    doc: 'El grimorio abierto en el índice de símbolos y combinaciones.',
    source: 'src/help.ts',
    backdrop: true,
  }),
};

export const Guide: StoryObj = {
  name: 'Cómo jugar',
  ...scene(load, 'book-guide', {
    doc: 'La hoja de cómo jugar (cambia según teclado o táctil).',
    source: 'src/help.ts',
    backdrop: true,
  }),
};
