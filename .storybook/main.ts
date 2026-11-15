import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/html-vite';

const root = resolve(import.meta.dirname, '..');

/** The game keeps its whole stylesheet inline in index.html; every story's canvas gets that exact block. */
function gameStyles() {
  const html = readFileSync(resolve(root, 'index.html'), 'utf8');
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!match) throw new Error('storybook: no <style> block in index.html');
  return `<style id="game-styles">${match[1]}</style>`;
}

/**
 * Storybook for Cirquimia, served at /components. A dev tool only: nothing in src/ imports it, so the game's
 * bundle stays the same. Dev: `npm run storybook`. Build: part of `npm run build` (into dist/components).
 */
const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
    // Not the game's vite.config.ts: that one bundles everything into one file and writes the localized pages.
    options: { builder: { viteConfigPath: resolve(import.meta.dirname, 'vite.config.ts') } },
  },
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  // The game paints its own background and has its own light/dark theme (the "Tema" toolbar item), so Storybook's
  // backgrounds switcher would be a second, confusing light/dark control that the game ignores.
  features: { backgrounds: false },
  previewHead: (head) => `${head}${gameStyles()}`,
};

export default config;
