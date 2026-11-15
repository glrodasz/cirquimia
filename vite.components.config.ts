import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { gameVersion } from './vite.config';

/**
 * The component catalogue (components/), served at /components: its own pages and bundle, built after the game
 * into dist/components. Nothing here is imported by the game, so the game's bundle stays byte for byte the same.
 *
 * Dev: `npm run components`. Build: part of `npm run build`.
 */

/** The game keeps its whole stylesheet inline in index.html; the canvas page reuses that exact block. */
function gameStyles(): Plugin {
  const css = () => {
    const html = readFileSync(resolve(import.meta.dirname, 'index.html'), 'utf8');
    const match = html.match(/<style>([\s\S]*?)<\/style>/);
    if (!match) throw new Error('components: no <style> block in index.html');
    return match[1];
  };
  return {
    name: 'game-styles',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--game-styles-->', () => `<style>${css()}</style>`),
    },
    configureServer(server) {
      server.watcher.add(resolve(import.meta.dirname, 'index.html'));
    },
  };
}

export default defineConfig({
  root: resolve(import.meta.dirname, 'components'),
  base: './',
  publicDir: false,
  define: { __GAME_VERSION__: JSON.stringify(gameVersion()) },
  server: { host: true, fs: { allow: [import.meta.dirname] } },
  build: {
    target: 'es2022',
    outDir: resolve(import.meta.dirname, 'dist/components'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'components/index.html'),
        frame: resolve(import.meta.dirname, 'components/frame.html'),
      },
    },
  },
  plugins: [gameStyles()],
});
