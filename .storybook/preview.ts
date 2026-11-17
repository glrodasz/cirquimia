import '@fontsource-variable/eb-garamond/wght.css';
import '@fontsource-variable/eb-garamond/wght-italic.css';
import '../components/kit/kit.css';
import type { Preview } from '@storybook/html-vite';
import { grimoire } from './theme';
import { DocsPage } from './docs-page';

// Docs pages are Storybook's own pages: the game's stylesheet (a fixed page that never scrolls) stays off there.
// Each story on a Docs page is a frame of its own, with the game's styles.
if (new URLSearchParams(location.search).get('viewMode') === 'docs') {
  const game = document.getElementById('game-styles') as HTMLStyleElement | null;
  if (game) game.media = 'not all';
}

/** Phone and tablet sizes the game is tested on, in portrait and landscape. */
const viewports = {
  iphone13: { name: 'iPhone 13 · 390×844', styles: { width: '390px', height: '844px' }, type: 'mobile' },
  iphoneSE: { name: 'iPhone SE · 375×667', styles: { width: '375px', height: '667px' }, type: 'mobile' },
  iphone13land: { name: 'iPhone 13 horizontal · 844×390', styles: { width: '844px', height: '390px' }, type: 'mobile' },
  ipad: { name: 'iPad · 820×1180', styles: { width: '820px', height: '1180px' }, type: 'tablet' },
  ipadland: { name: 'iPad horizontal · 1180×820', styles: { width: '1180px', height: '820px' }, type: 'tablet' },
  desktop: { name: 'Escritorio · 1440×900', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
};

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    locale: {
      description: 'Idioma del juego',
      toolbar: { title: 'Idioma', icon: 'globe', items: [{ value: 'es', title: 'Español' }, { value: 'en', title: 'English' }], dynamicTitle: true },
    },
    touch: {
      description: 'Emula una pantalla táctil (stick, HUD táctil, guías grandes)',
      toolbar: { title: 'Táctil', icon: 'mobile', items: [{ value: false, title: 'Ratón y teclado' }, { value: true, title: 'Táctil' }], dynamicTitle: true },
    },
    theme: {
      description: 'Tema del sistema',
      toolbar: { title: 'Tema', icon: 'mirror', items: [{ value: '', title: 'Del sistema' }, { value: 'light', title: 'Claro' }, { value: 'dark', title: 'Oscuro' }], dynamicTitle: true },
    },
  },
  // Light by default: the grimoire look. Dark is one click away in the toolbar.
  initialGlobals: { locale: 'es', touch: false, theme: 'light' },
  parameters: {
    layout: 'fullscreen',
    viewport: { options: viewports },
    controls: { expanded: true },
    // Each story owns a whole game page: on a Docs page it is a frame of its own (see docs-page.ts).
    docs: { theme: grimoire, page: DocsPage, canvas: { sourceState: 'none' }, story: { inline: false, iframeHeight: 520 } },
    options: {
      storySort: { order: ['Introducción', 'Tokens', 'Átomos', 'Moléculas', 'Organismos', ['HUD', 'Libro', 'Partida', 'Ranking', 'Compartir'], 'Pantallas', '3D', ['Personajes', 'Prado', 'Hechizos']] },
    },
  },
};

export default preview;
