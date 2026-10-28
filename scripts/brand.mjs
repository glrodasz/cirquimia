// Renders the favicon set, app icons and link preview cards from the SVG/HTML sources in scripts/brand/.
// Needs Playwright with Chromium (not a project dependency): node scripts/brand.mjs
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright');
const root = fileURLToPath(new URL('..', import.meta.url));
const pub = (file) => `${root}public/${file}`;
const brand = (file) => `${root}scripts/brand/${file}`;

const browser = await chromium.launch();
const page = await browser.newPage();

/** One square PNG of an SVG; `radius` (a fraction of the size) rounds the corners off to transparent. */
async function png(svgFile, size, radius = 0) {
  const svg = readFileSync(svgFile, 'utf8');
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}div{width:${size}px;height:${size}px;overflow:hidden;border-radius:${radius * size}px}svg{display:block;width:100%;height:100%}</style><div>${svg}</div>`,
  );
  return page.screenshot({ omitBackground: true });
}

/** A .ico holding PNG frames, which every current browser reads. */
function ico(frames) {
  const header = Buffer.alloc(6 + 16 * frames.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = header.length;
  frames.forEach(({ size, data }, i) => {
    const at = 6 + 16 * i;
    header.writeUInt8(size % 256, at);
    header.writeUInt8(size % 256, at + 1);
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(data.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...frames.map((f) => f.data)]);
}

const favicon = pub('icon.svg');
const full = brand('icon-full.svg');
const frames = [];
for (const size of [16, 32, 48]) frames.push({ size, data: await png(favicon, size) });
writeFileSync(pub('favicon.ico'), ico(frames));
writeFileSync(pub('favicon-32.png'), frames[1].data);
writeFileSync(pub('apple-touch-icon.png'), await png(full, 180)); // iOS rounds the corners itself
writeFileSync(pub('icon-192.png'), await png(full, 192, 0.22));
writeFileSync(pub('icon-512.png'), await png(full, 512, 0.22));
writeFileSync(pub('icon-maskable-512.png'), await png(full, 512)); // Android crops it to its own shape

mkdirSync(pub('og'), { recursive: true });
await page.setViewportSize({ width: 1200, height: 630 });
for (const lang of ['en', 'es']) {
  await page.goto(`${pathToFileURL(brand('og.html')).href}?lang=${lang}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: pub(`og/${lang}.jpg`), type: 'jpeg', quality: 88 });
}

await browser.close();
console.log('favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png, og/en.jpg, og/es.jpg');
