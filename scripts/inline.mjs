// Inlines the built JS/CSS into dist/index.html so the game is one self-contained file.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
let html = readFileSync(join(dist, 'index.html'), 'utf8');
const assets = join(dist, 'assets');
for (const file of readdirSync(assets)) {
  const code = readFileSync(join(assets, file), 'utf8');
  if (file.endsWith('.js')) {
    html = html.replace(
      new RegExp(`<script type="module" crossorigin src="./assets/${file}"></script>`),
      () => `<script type="module">${code}</script>`,
    );
  } else if (file.endsWith('.css')) {
    html = html.replace(
      new RegExp(`<link rel="stylesheet" crossorigin href="./assets/${file}">`),
      () => `<style>${code}</style>`,
    );
  }
}
writeFileSync(join(dist, 'cirquimia-single.html'), html);
console.log('wrote dist/cirquimia-single.html', (html.length / 1024).toFixed(0) + ' KB');
