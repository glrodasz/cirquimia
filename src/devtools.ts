import { DEFAULT_PARAMS, KIND_LABEL, MATERIAL_LABEL, PARAM_SPECS, randomSeed, type GenParams, type Material } from './generator';
import type { World } from './world';
import { LOOK, setLook } from './look';
import { formatNumber, langLink, t } from './i18n';

const STORE = 'cirquimia.dev';

interface Saved {
  params?: Partial<GenParams>;
  seed?: string;
  debug?: boolean;
  fps?: boolean;
}

function load(): Saved {
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? '{}') as Saved;
  } catch {
    return {};
  }
}

function save(patch: Saved) {
  try {
    localStorage.setItem(STORE, JSON.stringify({ ...load(), ...patch }));
  } catch {
    // Private mode or blocked storage: settings just won't persist.
  }
}

/** Seed to start with: ?seed= in the URL, then the last one used, then a fresh one. */
export function initialSeed(): string {
  try {
    const fromUrl = new URLSearchParams(location.search).get('seed');
    if (fromUrl) return fromUrl;
  } catch {
    // ignore
  }
  return load().seed ?? randomSeed();
}

/** The gear is for developers only: it appears with ?dev or ?dev=true in the URL. */
export const DEV = (() => {
  try {
    const value = new URLSearchParams(location.search).get('dev');
    return value !== null && value !== 'false' && value !== '0';
  } catch {
    return false;
  }
})();

const GEAR = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.4 7.4 0 0 0 1.7-1l2.4 1 2-3.4z"/><circle cx="12" cy="12" r="3"/></svg>`;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, text = '') {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text) node.textContent = text;
  return node;
}

/**
 * Floating gear (bottom right, only with ?dev) that opens every development option: regenerate the meadow,
 * tweak the generator, see what it produced and what it costs.
 * The miniature toggle (#tilt) moves into the panel; the fps counter (#fps) floats bottom left, above the match controls, when its toggle is on.
 */
export function mountDevTools(world: World, onGenerated: () => void) {
  // Without ?dev the tweaks saved by an earlier dev session are ignored, since nothing could turn them off.
  const saved: Saved = DEV ? load() : {};
  world.params = { ...DEFAULT_PARAMS, ...saved.params };

  const gear = el('button', { id: 'dev-gear', type: 'button', 'aria-label': t.dev.title, 'aria-expanded': 'false' });
  gear.innerHTML = GEAR;
  // Modal: a scrim over the paused game, with the panel scrolling inside it.
  const modal = el('div', { id: 'dev-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': t.dev.title });
  modal.hidden = true;
  const panel = el('aside', { id: 'dev-panel' });

  const head = el('header');
  head.append(el('strong', {}, t.dev.title));
  const close = el('button', { type: 'button', class: 'dev-close', 'aria-label': t.dev.close }, '×');
  head.append(close);

  // Meadow
  const meadow = el('section');
  meadow.append(el('h3', {}, t.dev.meadow));
  const regen = el('button', { type: 'button', class: 'dev-primary' }, t.dev.regenerate);
  const seedRow = el('div', { class: 'dev-row' });
  const seedInput = el('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', 'aria-label': t.dev.seed }) as HTMLInputElement;
  const seedApply = el('button', { type: 'button' }, t.dev.useSeed);
  seedRow.append(el('label', {}, t.dev.seed), seedInput, seedApply);
  const statsBox = el('dl', { class: 'dev-stats' });
  const contents = el('div', { class: 'dev-contents' });
  meadow.append(regen, seedRow, statsBox, contents);

  // Generator parameters
  const paramsSection = el('section');
  paramsSection.append(el('h3', {}, t.dev.params));
  const inputs = new Map<keyof GenParams, { input: HTMLInputElement; show: () => void }>();
  let group = '';
  for (const spec of PARAM_SPECS) {
    if (spec.group !== group) {
      group = spec.group;
      paramsSection.append(el('h4', {}, t.dev.groups[spec.group]));
    }
    const row = el('label', { class: 'dev-slider' });
    const input = el('input', { type: 'range', min: String(spec.min), max: String(spec.max), step: String(spec.step) }) as HTMLInputElement;
    const out = el('output') as HTMLOutputElement;
    row.append(el('span', {}, spec.label), input, out);
    paramsSection.append(row);
    const show = () => {
      const v = Number(input.value);
      out.textContent = spec.key === 'sendero' ? (v ? t.dev.yes : t.dev.no) : spec.unit === '×' ? `${v.toFixed(1)}×` : `${v}${spec.unit ?? ''}`;
    };
    input.addEventListener('input', show);
    // Changing a parameter rebuilds the same seed, so you see exactly what that parameter does.
    input.addEventListener('change', () => {
      world.params[spec.key] = Number(input.value);
      save({ params: world.params });
      run(world.layout.seed);
    });
    inputs.set(spec.key, { input, show });
  }
  const reset = el('button', { type: 'button' }, t.dev.reset);
  paramsSection.append(reset);

  // View and performance
  const view = el('section');
  view.append(el('h3', {}, t.dev.view));
  const tilt = document.getElementById('tilt');
  const fps = document.getElementById('fps');
  const fpsRow = el('label', { class: 'dev-check' });
  const fpsBox = el('input', { type: 'checkbox' }) as HTMLInputElement;
  fpsRow.append(fpsBox, el('span', {}, t.dev.showFps));
  const debugRow = el('label', { class: 'dev-check' });
  const debugBox = el('input', { type: 'checkbox' }) as HTMLInputElement;
  debugRow.append(debugBox, el('span', {}, t.dev.showDebug));
  const viewRow = el('div', { class: 'dev-row' });
  if (tilt) viewRow.append(tilt);
  const perfBox = el('dl', { class: 'dev-stats' });
  // Visual style experiment: switching reloads with the other look.
  const lookRow = el('div', { class: 'dev-row' });
  lookRow.append(el('label', {}, t.dev.look));
  for (const [name, label] of [['bruma', 'Bruma'], ['glade', 'Glade']] as const) {
    const button = el('button', { type: 'button', class: 'dev-toggle', 'aria-pressed': String(LOOK === name) }, label);
    button.addEventListener('click', () => LOOK !== name && setLook(name));
    lookRow.append(button);
  }
  const langRow = el('div', { class: 'dev-row' });
  langRow.append(el('label', {}, t.dev.language));
  for (const lang of ['es', 'en'] as const) langRow.append(langLink(lang, 'dev-toggle'));
  view.append(lookRow, langRow, viewRow, fpsRow, debugRow, perfBox);

  panel.append(head, meadow, paramsSection, view);
  modal.append(panel);
  if (DEV) document.body.append(gear, modal);
  document.documentElement.classList.toggle('dev', DEV);

  const stop = (e: Event) => e.stopPropagation();
  for (const node of [gear, modal]) {
    node.addEventListener('pointerdown', stop);
    node.addEventListener('pointerup', stop);
    node.addEventListener('pointermove', stop);
  }

  function syncInputs() {
    for (const [key, { input, show }] of inputs) {
      input.value = String(world.params[key]);
      show();
    }
  }

  function stat(box: HTMLElement, rows: Array<[string, string, string?]>) {
    box.replaceChildren(
      ...rows.flatMap(([k, v, cls]) => {
        const dd = el('dd', cls ? { class: cls } : {}, v);
        return [el('dt', {}, k), dd];
      }),
    );
  }

  function render() {
    const s = world.stats;
    seedInput.value = s.seed;
    const ok = s.walk.reachable >= world.params.caminableMin;
    stat(statsBox, [
      [t.dev.walkable, `${s.walk.reachable.toFixed(0)} %`, ok ? 'dev-ok' : 'dev-warn'],
      [t.dev.blocked, `${s.walk.blocked.toFixed(0)} %`],
      [t.dev.obstacles, String(s.obstacles)],
      [t.dev.generatedIn, `${s.ms.toFixed(0)} ms`],
    ]);
    const byMaterial = new Map<Material, string[]>();
    for (const f of world.layout.features) {
      const list = byMaterial.get(f.material) ?? [];
      list.push(KIND_LABEL[f.kind] + (f.animated ? ' ✦' : ''));
      byMaterial.set(f.material, list);
    }
    const list = el('ul');
    for (const material of Object.keys(MATERIAL_LABEL) as Material[]) {
      const items = byMaterial.get(material);
      if (!items) continue;
      const li = el('li');
      li.append(el('b', { class: `dev-mat dev-${material}` }, MATERIAL_LABEL[material]), document.createTextNode(items.join(', ')));
      list.append(li);
    }
    if (world.layout.trail) {
      const li = el('li');
      li.append(el('b', { class: 'dev-mat dev-tierra' }, MATERIAL_LABEL.tierra), document.createTextNode(t.dev.trail));
      list.append(li);
    }
    contents.replaceChildren(list);
    if (world.layout.skipped.length) contents.append(el('p', { class: 'dev-note' }, `${t.dev.skipped}: ${world.layout.skipped.join(', ')}`));
    contents.append(el('p', { class: 'dev-note' }, t.dev.animatedNote));
    stat(perfBox, [
      [t.dev.meshes, String(s.meshes)],
      [t.dev.instances, formatNumber(s.instances)],
      [t.dev.triangles, formatNumber(s.triangles)],
      [t.dev.animated, `${s.animated} / ${world.params.animadosMax}`],
    ]);
  }
  world.listeners.push(render);

  function run(seed: string) {
    world.generate(seed);
    save({ seed });
    try {
      const url = new URL(location.href);
      url.searchParams.set('seed', seed);
      history.replaceState(null, '', url);
    } catch {
      // Sandboxed frames may refuse; the seed is still shown in the panel.
    }
    onGenerated();
  }

  let open = false;
  function setOpen(next: boolean) {
    if (next === open) return;
    open = next;
    modal.hidden = !open;
    gear.setAttribute('aria-expanded', String(open));
    gear.classList.toggle('open', open);
    if (open) {
      panel.scrollTop = 0;
      close.focus({ preventScroll: true });
    } else {
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }

  gear.addEventListener('click', () => setOpen(!open));
  close.addEventListener('click', () => setOpen(false));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) setOpen(false);
  });
  addEventListener('keydown', (e) => {
    if (open && e.key === 'Escape') setOpen(false);
  });
  regen.addEventListener('click', () => run(randomSeed()));
  seedApply.addEventListener('click', () => {
    if (seedInput.value.trim()) run(seedInput.value.trim());
  });
  seedInput.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (e.key === 'Enter' && seedInput.value.trim()) run(seedInput.value.trim());
  });
  reset.addEventListener('click', () => {
    world.params = { ...DEFAULT_PARAMS };
    save({ params: world.params });
    syncInputs();
    run(world.layout.seed);
  });
  const showFps = (on: boolean) => {
    if (fps) fps.hidden = !on;
  };
  fpsBox.addEventListener('change', () => {
    showFps(fpsBox.checked);
    save({ fps: fpsBox.checked });
  });
  debugBox.addEventListener('change', () => {
    world.setDebug(debugBox.checked);
    save({ debug: debugBox.checked });
  });

  syncInputs();
  fpsBox.checked = !!saved.fps;
  showFps(fpsBox.checked);
  if (fps) document.body.append(fps);
  debugBox.checked = !!saved.debug;
  world.setDebug(debugBox.checked);
  run(initialSeed());
  return {
    newMeadow: () => run(randomSeed()),
    /** The game holds still while the panel is open. */
    get open() {
      return open;
    },
  };
}
