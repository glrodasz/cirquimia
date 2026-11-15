import * as icons from '../../src/icons';
import { shapeIcon } from '../../src/ammo';
import { t } from '../../src/i18n';
import type { ShapeKind } from '../../src/gestures';
import type { StoryFn } from '../kit/story';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const gameCss = () => [...document.querySelectorAll('style')].map((s) => s.textContent ?? '').join('\n');

/** Custom properties as the game declares them, with the selector that declares them. */
function variables(css: string) {
  const found = new Map<string, Array<{ scope: string; value: string }>>();
  for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const scope = rule[1].trim().replace(/\s+/g, ' ');
    for (const decl of rule[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) {
      const list = found.get(decl[1]) ?? [];
      list.push({ scope, value: decl[2].trim() });
      found.set(decl[1], list);
    }
  }
  return found;
}

/** Every literal colour in the stylesheet, most used first. */
function literals(css: string) {
  const counts = new Map<string, number>();
  for (const m of css.replace(/url\([^)]*\)/g, '').matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g)) {
    const key = m[0].toLowerCase().replace(/\s+/g, '');
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1]);
}

const isColor = (v: string) => /^(#|rgb|hsl)/.test(v);
const swatch = (v: string) => `<div class="kit-swatch"><i style="background:${esc(v)}"></i></div>`;

const palette: StoryFn = () => {
  const css = gameCss();
  const vars = variables(css);
  const colors = literals(css);
  const total = colors.reduce((n, [, c]) => n + c, 0);
  const varTiles = [...vars]
    .map(([name, decls]) => {
      const first = decls[0].value;
      return (
        `<div class="kit-tile">${isColor(first) ? swatch(first) : ''}<b>${name}</b>` +
        decls.map((d) => `<code>${esc(d.value)}</code><code style="opacity:.55">${esc(d.scope.slice(0, 80))}</code>`).join('') +
        `</div>`
      );
    })
    .join('');
  document.body.innerHTML =
    `<h2>Variables CSS (${vars.size})</h2>` +
    `<p class="kit-note">Las variables que ya existen en el estilo del juego. Las del HUD (--hud-*) cambian con el tema; las del grimorio (--g-*, --paper, --ink…) viven dentro de cada pantalla.</p>` +
    `<div class="kit-grid">${varTiles}</div>` +
    `<h2>Colores literales (${colors.length} distintos, ${total} usos)</h2>` +
    `<p class="kit-note">Colores escritos a mano en el CSS. Son el inventario para migrar a design tokens: cada uno debería acabar como un token de componente que apunte a un rol del sistema.</p>` +
    `<div class="kit-grid">${colors.map(([c, n]) => `<div class="kit-tile">${swatch(c)}<code>${esc(c)}</code><span>${n} ${n === 1 ? 'uso' : 'usos'}</span></div>`).join('')}</div>`;
};

const type: StoryFn = () => {
  const sample = t.match.victory;
  const fonts: Array<[string, string, string]> = [
    ["'EB Garamond Variable', Garamond, Georgia, serif", '700 30px/1.15', 'Grimorio: títulos del libro, ranking, hojas'],
    ["'EB Garamond Variable', Garamond, Georgia, serif", 'italic 400 18px/1.4', 'Grimorio: notas y popovers'],
    ['system-ui, -apple-system, sans-serif', '800 26px/1.1', 'Tarjetas de fin de partida'],
    ['system-ui, -apple-system, sans-serif', '600 13px/1', 'Píldoras del HUD, toasts'],
    ["'Alegreya Variable', Georgia, serif", '800 44px/1', 'Puntos de la tarjeta de victoria (cae en Georgia: Alegreya no se carga)'],
    ["ui-monospace, 'SF Mono', Menlo, monospace", '800 22px/1', 'Iniciales del ranking'],
  ];
  document.body.innerHTML =
    `<h2>Tipografía</h2><p class="kit-note">Las familias que usa el juego, con el peso y tamaño de su uso principal.</p>` +
    fonts.map(([family, font, use]) => `<div class="kit-type"><small>${esc(font)} · ${esc(family)}</small><div style="font:${font} ${family}">${esc(sample)} · Cirquimia 0123</div><small style="margin-top:6px">${use}</small></div>`).join('');
};

const icon: StoryFn = () => {
  const list: Array<[string, string]> = [
    ['rivalsIcon(0) · entrenar', icons.rivalsIcon(0)],
    ['rivalsIcon(1)', icons.rivalsIcon(1)],
    ['rivalsIcon(2)', icons.rivalsIcon(2)],
    ['rivalsIcon(3)', icons.rivalsIcon(3)],
    ['hordeIcon', icons.hordeIcon()],
    ['newGameIcon', icons.newGameIcon()],
    ...[1, 2, 3, 4].map((n): [string, string] => [`levelIcon(${n})`, icons.levelIcon(n)]),
    ['bookIcon', icons.bookIcon()],
    ['questionIcon', icons.questionIcon()],
    ['infoIcon', icons.infoIcon()],
    ['trophyIcon', icons.trophyIcon()],
    ['hourglassIcon', icons.hourglassIcon()],
    ['soundIcon(off)', icons.soundIcon(false)],
    ['soundIcon(on)', icons.soundIcon(true)],
    ['phoneIcon', icons.phoneIcon()],
    ['flameIcon', icons.flameIcon()],
    ['dropIcon', icons.dropIcon()],
    ['crossIcon', icons.crossIcon()],
    ['runeIcon', icons.runeIcon()],
    ['downChevrons', icons.downChevrons()],
    ['downArrow', icons.downArrow()],
    ['sealIcon', icons.sealIcon()],
    ['circleTabIcon', icons.circleTabIcon()],
    ['quillTabIcon', icons.quillTabIcon()],
    ['pineTabIcon', icons.pineTabIcon()],
    ['pageTabIcon', icons.pageTabIcon()],
    ['flaskTabIcon', icons.flaskTabIcon()],
    ['globeTabIcon', icons.globeTabIcon()],
    ['gearIcon', icons.gearIcon()],
    ['xLogo', icons.xLogo()],
    ['discordLogo', icons.discordLogo()],
    ['blueskyLogo', icons.blueskyLogo()],
    ['threadsLogo', icons.threadsLogo()],
    ['mastodonLogo', icons.mastodonLogo()],
    ['whatsappLogo', icons.whatsappLogo()],
    ['telegramLogo', icons.telegramLogo()],
    ['saveIcon', icons.saveIcon()],
  ];
  document.body.innerHTML =
    `<h2>Iconos (${list.length})</h2><p class="kit-note">src/icons.ts. Se pintan con currentColor y clases (.ink, .red, .green, .plum, .faint) que el CSS de cada sitio colorea.</p>` +
    `<div class="kit-grid">${list.map(([name, svg]) => `<div class="kit-tile"><div class="kit-icon">${svg}</div><code>${name}</code></div>`).join('')}</div>`;
  for (const svg of document.querySelectorAll<SVGElement>('.kit-icon svg')) if (!svg.getAttribute('fill')) svg.style.fill = 'currentColor';
};

const KINDS: ShapeKind[] = ['circle', 'square', 'triangle', 'triangleDown', 'rhombus', 'pentagram', 'spiral', 'hourglass', 'fireStar', 'waterStar', 'blastStar'];

const symbols: StoryFn = () => {
  document.body.innerHTML =
    `<h2>Símbolos (${KINDS.length})</h2><p class="kit-note">Cada símbolo como trazo de pincel dentro del enso (la mano) y con plumilla (el libro y el checklist). El trazo cambia un poco en cada render, como en el juego. Recarga para ver otra variación.</p>` +
    `<div class="kit-grid">${KINDS.map((k) => `<div class="kit-tile"><div class="kit-symbol">${shapeIcon(k)}${shapeIcon(k, true)}</div><b>${esc(t.help.roles[k] ?? k)}</b><code>${k}</code></div>`).join('')}</div>`;
};

export const stories: Record<string, StoryFn> = { palette, type, icons: icon, symbols };
