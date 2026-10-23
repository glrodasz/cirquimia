import { DEFAULT_PARAMS, KIND_LABEL, MATERIAL_LABEL, PARAM_SPECS, randomSeed, type GenParams, type Material } from './generator';
import type { World } from './world';
import { DIFFICULTY_LABEL, MAX_RIVALS, type Difficulty } from './combat';

const STORE = 'cirquimia.dev';

interface Saved {
  params?: Partial<GenParams>;
  seed?: string;
  open?: boolean;
  debug?: boolean;
  fps?: boolean;
  rivals?: number;
  difficulty?: Difficulty;
}

/** Sparring options shown in the panel; the game owns the actual rivals. */
export interface CombatControls {
  readonly rivals: number;
  readonly difficulty: Difficulty;
  setRivals(count: number): void;
  setDifficulty(level: Difficulty): void;
  respawn(): void;
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

const GEAR = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.4 7.4 0 0 0 1.7-1l2.4 1 2-3.4z"/><circle cx="12" cy="12" r="3"/></svg>`;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, text = '') {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text) node.textContent = text;
  return node;
}

/**
 * Floating gear (top right) that opens every development option: regenerate the meadow,
 * tweak the generator, see what it produced and what it costs.
 * The miniature toggle (#tilt) moves into the panel; the fps counter (#fps) floats top left when its toggle is on.
 */
export function mountDevTools(world: World, onGenerated: () => void, combat?: CombatControls) {
  const saved = load();
  world.params = { ...DEFAULT_PARAMS, ...saved.params };

  const gear = el('button', { id: 'dev-gear', type: 'button', 'aria-label': 'Herramientas de desarrollo', 'aria-expanded': 'false' });
  gear.innerHTML = GEAR;
  const panel = el('aside', { id: 'dev-panel', 'aria-label': 'Herramientas de desarrollo' });
  panel.hidden = true;

  const head = el('header');
  head.append(el('strong', {}, 'Herramientas de desarrollo'));
  const close = el('button', { type: 'button', class: 'dev-close', 'aria-label': 'Cerrar' }, '×');
  head.append(close);

  // Meadow
  const meadow = el('section');
  meadow.append(el('h3', {}, 'Pradera'));
  const regen = el('button', { type: 'button', class: 'dev-primary' }, 'Generar nueva pradera');
  const seedRow = el('div', { class: 'dev-row' });
  const seedInput = el('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', 'aria-label': 'Semilla' }) as HTMLInputElement;
  const seedApply = el('button', { type: 'button' }, 'Usar semilla');
  seedRow.append(el('label', {}, 'Semilla'), seedInput, seedApply);
  const statsBox = el('dl', { class: 'dev-stats' });
  const contents = el('div', { class: 'dev-contents' });
  meadow.append(regen, seedRow, statsBox, contents);

  // Generator parameters
  const paramsSection = el('section');
  paramsSection.append(el('h3', {}, 'Parámetros del generador'));
  const inputs = new Map<keyof GenParams, { input: HTMLInputElement; show: () => void }>();
  let group = '';
  for (const spec of PARAM_SPECS) {
    if (spec.group !== group) {
      group = spec.group;
      paramsSection.append(el('h4', {}, group));
    }
    const row = el('label', { class: 'dev-slider' });
    const input = el('input', { type: 'range', min: String(spec.min), max: String(spec.max), step: String(spec.step) }) as HTMLInputElement;
    const out = el('output') as HTMLOutputElement;
    row.append(el('span', {}, spec.label), input, out);
    paramsSection.append(row);
    const show = () => {
      const v = Number(input.value);
      out.textContent = spec.key === 'sendero' ? (v ? 'sí' : 'no') : spec.unit === '×' ? `${v.toFixed(1)}×` : `${v}${spec.unit ?? ''}`;
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
  const reset = el('button', { type: 'button' }, 'Restablecer valores');
  paramsSection.append(reset);

  // View and performance
  const view = el('section');
  view.append(el('h3', {}, 'Vista y rendimiento'));
  const tilt = document.getElementById('tilt');
  const fps = document.getElementById('fps');
  const fpsRow = el('label', { class: 'dev-check' });
  const fpsBox = el('input', { type: 'checkbox' }) as HTMLInputElement;
  fpsRow.append(fpsBox, el('span', {}, 'Mostrar FPS'));
  const debugRow = el('label', { class: 'dev-check' });
  const debugBox = el('input', { type: 'checkbox' }) as HTMLInputElement;
  debugRow.append(debugBox, el('span', {}, 'Mostrar obstáculos y zonas bloqueadas'));
  const viewRow = el('div', { class: 'dev-row' });
  if (tilt) viewRow.append(tilt);
  const perfBox = el('dl', { class: 'dev-stats' });
  view.append(viewRow, fpsRow, debugRow, perfBox);

  // Sparring rivals
  const fight = el('section');
  if (combat) {
    fight.append(el('h3', {}, 'Combate'));
    const rivalsRow = el('div', { class: 'dev-row' });
    rivalsRow.append(el('label', {}, 'Rivales'));
    const rivalButtons: HTMLButtonElement[] = [];
    for (let n = 0; n <= MAX_RIVALS; n++) {
      const b = el('button', { type: 'button', class: 'dev-toggle', 'aria-pressed': 'false' }, String(n)) as HTMLButtonElement;
      b.addEventListener('click', () => {
        combat.setRivals(n);
        save({ rivals: n });
        syncCombat();
      });
      rivalButtons.push(b);
      rivalsRow.append(b);
    }
    const levelRow = el('div', { class: 'dev-row' });
    levelRow.append(el('label', {}, 'Dificultad'));
    const levelButtons = new Map<Difficulty, HTMLButtonElement>();
    for (const level of Object.keys(DIFFICULTY_LABEL) as Difficulty[]) {
      const b = el('button', { type: 'button', class: 'dev-toggle', 'aria-pressed': 'false' }, DIFFICULTY_LABEL[level]) as HTMLButtonElement;
      b.addEventListener('click', () => {
        combat.setDifficulty(level);
        save({ difficulty: level });
        syncCombat();
      });
      levelButtons.set(level, b);
      levelRow.append(b);
    }
    const again = el('button', { type: 'button' }, 'Reiniciar combate');
    again.addEventListener('click', () => combat.respawn());
    fight.append(
      rivalsRow,
      levelRow,
      again,
      el('p', { class: 'dev-note' }, 'Daño: cuadrado 20, fuego 35, agua 35. Nadie muere: a 0 la vida se recupera.'),
    );
    const syncCombat = () => {
      rivalButtons.forEach((b, n) => b.setAttribute('aria-pressed', String(n === combat.rivals)));
      for (const [level, b] of levelButtons) b.setAttribute('aria-pressed', String(level === combat.difficulty));
    };
    if (saved.difficulty && saved.difficulty in DIFFICULTY_LABEL) combat.setDifficulty(saved.difficulty);
    if (saved.rivals !== undefined) combat.setRivals(saved.rivals);
    syncCombat();
  }

  panel.append(head, meadow, ...(combat ? [fight] : []), paramsSection, view);
  document.body.append(gear, panel);

  const stop = (e: Event) => e.stopPropagation();
  for (const node of [gear, panel]) {
    node.addEventListener('pointerdown', stop);
    node.addEventListener('pointerup', stop);
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
      ['Caminable', `${s.walk.reachable.toFixed(0)} %`, ok ? 'dev-ok' : 'dev-warn'],
      ['Bloqueado', `${s.walk.blocked.toFixed(0)} %`],
      ['Obstáculos', String(s.obstacles)],
      ['Generada en', `${s.ms.toFixed(0)} ms`],
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
      li.append(el('b', { class: 'dev-mat dev-tierra' }, 'Tierra'), document.createTextNode('Sendero'));
      list.append(li);
    }
    contents.replaceChildren(list);
    if (world.layout.skipped.length) contents.append(el('p', { class: 'dev-note' }, `Descartado: ${world.layout.skipped.join(', ')}`));
    contents.append(el('p', { class: 'dev-note' }, '✦ animado'));
    stat(perfBox, [
      ['Mallas (draw calls)', String(s.meshes)],
      ['Instancias', s.instances.toLocaleString('es')],
      ['Triángulos', s.triangles.toLocaleString('es')],
      ['Animados', `${s.animated} / ${world.params.animadosMax}`],
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

  function setOpen(open: boolean) {
    panel.hidden = !open;
    gear.setAttribute('aria-expanded', String(open));
    gear.classList.toggle('open', open);
    save({ open });
  }

  gear.addEventListener('click', () => setOpen(!gear.classList.contains('open')));
  close.addEventListener('click', () => setOpen(false));
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
  setOpen(!!saved.open);
}
