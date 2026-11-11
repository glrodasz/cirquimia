// Packs the itch.io build (vite build --mode itch → dist-itch/) into a zip with index.html at its root, which is
// what itch.io asks for an HTML5 game. Only what the game needs in the browser goes in: no Spanish page (the itch
// build reads ?lang= instead), no Pages routing file, no link-preview images.
import { execFileSync } from 'node:child_process';
import { rmSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist-itch/', import.meta.url).pathname;
for (const extra of ['es.html', '_routes.json', 'og', 'manifest.es.webmanifest']) rmSync(join(dist, extra), { recursive: true, force: true });
const zip = new URL('../cirquimia-itch.zip', import.meta.url).pathname;
if (existsSync(zip)) rmSync(zip);
execFileSync('zip', ['-r', '-q', '-X', zip, '.'], { cwd: dist, stdio: 'inherit' });
console.log('wrote cirquimia-itch.zip', (statSync(zip).size / 1024).toFixed(0) + ' KB');
