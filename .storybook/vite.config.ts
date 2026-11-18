import { defineConfig } from 'vite';
import { gameVersion } from '../vite.config';

/** What Storybook's Vite needs from the game: the version stamp. Everything else is Storybook's default. */
export default defineConfig({
  publicDir: false,
  define: { __GAME_VERSION__: JSON.stringify(gameVersion()) },
  build: { target: 'es2022', chunkSizeWarningLimit: 1500 },
});
