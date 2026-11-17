import globalJson from '../../tokens/global.json';
import lightJson from '../../tokens/system-light.json';
import darkJson from '../../tokens/system-dark.json';
import componentsJson from '../../tokens/components.json';
import { sheet, type StoryFn } from '../kit/story';

/**
 * The design tokens straight from tokens/*.json: the three levels (Global → System → Component) and, for each
 * component token the game uses, the chain it resolves through in light and dark.
 */

type Tree = { [key: string]: Tree | string | number } & { $value?: string | number; $description?: string };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

function flatten(tree: Tree, prefix: string, out = new Map<string, Tree>()) {
  for (const [key, node] of Object.entries(tree)) {
    if (key.startsWith('$') || typeof node !== 'object') continue;
    const path = `${prefix}.${key}`;
    if ('$value' in node) out.set(path, node);
    else flatten(node, path, out);
  }
  return out;
}

const global = flatten(globalJson as unknown as Tree, 'global');
const light = flatten(lightJson as unknown as Tree, 'system');
const dark = flatten(darkJson as unknown as Tree, 'system');
const components = flatten(componentsJson as unknown as Tree, 'components');

const REF = /^\{(.+)\}$/;

/** Each step a token takes until a raw value: [path, value at that step]. */
function chain(path: string, system: Map<string, Tree>) {
  const steps: Array<[string, string]> = [];
  for (let p: string | null = path, guard = 0; p && guard < 8; guard++) {
    const node: Tree | undefined = p.startsWith('global.') ? global.get(p) : p.startsWith('system.') ? system.get(p) : components.get(p);
    if (!node) break;
    const value: string = String(node.$value);
    steps.push([p, value]);
    p = REF.exec(value)?.[1] ?? null;
  }
  return steps;
}

const cssVar = (path: string) => `--components-tokens--${path.replace(/^components\./, '').toLowerCase().replace(/[ .]+/g, '--')}`;
const raw = (steps: Array<[string, string]>) => steps[steps.length - 1]?.[1] ?? '';
const isColor = (v: string) => /^#|^rgb|^hsl/.test(v);
const swatch = (v: string, title = '') =>
  `<span class="kit-chip" title="${esc(title || v)}"><i style="background:${isColor(v) ? esc(v) : 'transparent'}"></i></span>`;
const short = (p: string) => p.replace(/^(components|system|global)\./, '');

/** The game's own tokens: the Site namespace, by component. */
const GAME = [...components.keys()].filter((p) => /^components\.Site\.(Meadow|Hud|Grimoire|Book)\./.test(p));

function group(paths: string[]) {
  const byPart = new Map<string, string[]>();
  for (const p of paths) {
    const part = p.split('.')[2];
    byPart.set(part, [...(byPart.get(part) ?? []), p]);
  }
  return byPart;
}

const PARTS: Record<string, string> = {
  Meadow: 'Prado: el cielo detrás del juego',
  Hud: 'HUD: píldoras, botones y avisos sobre el prado. Cambian con el tema.',
  Grimoire: 'Grimorio: libro, ranking, tarjetas y popovers. Papel y tinta en los dos temas.',
  Book: 'Tapa del libro: cuero y latón.',
};

function tokenCard(path: string) {
  const l = chain(path, light);
  const d = chain(path, dark);
  const vl = raw(l);
  const vd = raw(d);
  const color = isColor(vl);
  const steps = l
    .slice(1)
    .map(([p]) => `<li>${esc(short(p))}</li>`)
    .join('');
  return (
    `<article class="kit-token">` +
    (color ? `<div class="kit-pair">${swatch(vl, 'Claro ' + vl)}${swatch(vd, 'Oscuro ' + vd)}</div>` : `<div class="kit-font" style="font-family:${esc(vl)}">Aa</div>`) +
    `<div class="kit-token-body"><b>${esc(short(path).replace(/^Site\./, ''))}</b>` +
    `<code>var(${cssVar(path)})</code>` +
    `<ol class="kit-chain">${steps}</ol>` +
    `<small>${color ? `Claro <code>${esc(vl)}</code>${vd !== vl ? ` · Oscuro <code>${esc(vd)}</code>` : ' · igual en oscuro'}` : `<code>${esc(vl)}</code>`}</small>` +
    `</div></article>`
  );
}

function palette(prefix: string) {
  const entries = [...global].filter(([p]) => p.startsWith(prefix));
  return `<div class="kit-palette">${entries
    .map(([p, n]) => `<figure>${swatch(String(n.$value))}<figcaption><b>${esc(p.slice(prefix.length + 1))}</b><code>${esc(String(n.$value))}</code></figcaption></figure>`)
    .join('')}</div>`;
}

function roles(scope: string) {
  const paths = [...light.keys()].filter((p) => p.startsWith(scope));
  return `<div class="kit-palette">${paths
    .map((p) => {
      const vl = raw(chain(p, light));
      const vd = raw(chain(p, dark));
      return `<figure><div class="kit-pair">${swatch(vl, 'Claro ' + vl)}${swatch(vd, 'Oscuro ' + vd)}</div><figcaption><b>${esc(p.slice(scope.length + 1))}</b><code>${esc(String(light.get(p)?.$value ?? '').replace(/^\{global\.Colors\.Custom\.|\}$/g, ''))}</code></figcaption></figure>`;
    })
    .join('')}</div>`;
}

const colors: StoryFn = () => {
  const parts = group(GAME);
  sheet().innerHTML =
    `<h2>Design tokens</h2>` +
    `<p class="kit-note">Tres niveles en <code>tokens/*.json</code>. La UI solo usa los de <b>componente</b>; cada uno apunta a un <b>rol del sistema</b> (que cambia entre claro y oscuro), y el rol a un <b>valor global</b>. Para cambiar un color, se cambia el JSON y <code>npm run tokens</code>.</p>` +
    `<ol class="kit-levels"><li><b>Global</b><span>valores: paletas, fuentes</span></li><li><b>Sistema</b><span>roles: fondo, tinta, papel…</span></li><li><b>Componente</b><span>lo que usa la UI</span></li></ol>` +
    [...parts]
      .map(([part, paths]) => `<h3>${esc(PARTS[part] ?? part)}</h3><div class="kit-tokens">${paths.map(tokenCard).join('')}</div>`)
      .join('') +
    `<h2>Roles del sistema</h2><p class="kit-note">Cada muestra: claro a la izquierda, oscuro a la derecha.</p>` +
    `<h3>Fijos (iguales en los dos temas)</h3>${roles('system.Colors.Fixed')}` +
    `<h3>Fondos</h3>${roles('system.Colors.Backgrounds')}` +
    `<h2>Paletas globales</h2>` +
    `<h3>Grimorio</h3>${palette('global.Colors.Custom.Grimoire')}` +
    `<h3>Prado</h3>${palette('global.Colors.Custom.Meadow')}`;
};

export const stories: Record<string, StoryFn> = { colors };
