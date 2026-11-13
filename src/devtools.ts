import { flaskTabIcon, gearIcon, infoIcon, pageTabIcon, pineTabIcon } from './icons';
import { DEFAULT_PARAMS, KIND_LABEL, MATERIAL_LABEL, PARAM_SPECS, materialOf, randomSeed, type GenParams, type Material } from './generator';
import type { World } from './world';
import { LOOK, setLook } from './look';
import { formatNumber, langLink, t } from './i18n';
import { TIERS, parseTier, type Reason, type Tier } from './quality';
import { challenge } from './challenge';

const STORE = 'cirquimia.dev';

interface Saved {
  params?: Partial<GenParams>;
  seed?: string;
  debug?: boolean;
  fps?: boolean;
  /** Graphics tier forced from the panel; absent = automatic. */
  quality?: Tier;
  /** The panel's open tab and whether the generator's sliders are unfolded. */
  tab?: string;
  genOpen?: boolean;
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

/** Seed to start with: a challenge's meadow, ?seed= in the URL, then the last one used, then a fresh one. */
export function initialSeed(): string {
  if (challenge?.seed) return challenge.seed;
  try {
    const fromUrl = new URLSearchParams(location.search).get('seed');
    if (fromUrl) return fromUrl;
  } catch {
    // ignore
  }
  return load().seed ?? randomSeed();
}

/** The graphics tier forced from the panel in an earlier dev session, if any. */
export function savedQuality(): Tier | null {
  return DEV ? parseTier(load().quality) : null;
}

export interface QualityControl {
  readonly state: { tier: Tier; reason: Reason; auto: boolean; renderer: string; detected: Tier };
  set(tier: Tier | null): void;
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


function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, text = '') {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text) node.textContent = text;
  return node;
}

/** Hooks other modules fill in so the panel can show and replay what they remember only in memory. */
export const devHooks: {
  /** The desktop "also on your phone" note: null on touch screens, 'queued', or whether it showed this visit. */
  desktopNote?: { state(): boolean | 'queued' | null; replay(): void };
} = {};

type Tab = 'meadow' | 'data' | 'tests';
const TABS: Tab[] = ['meadow', 'data', 'tests'];
const TAB_ICONS: Record<Tab, () => string> = { meadow: pineTabIcon, data: pageTabIcon, tests: flaskTabIcon };

function stored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function forget(...keys: string[]) {
  try {
    for (const key of keys) localStorage.removeItem(key);
  } catch {
    // Blocked storage: nothing was kept anyway.
  }
}

/** Everything the game keeps in this browser, except the dev panel's own settings. */
function forgetAll() {
  for (const store of [localStorage, sessionStorage]) {
    try {
      for (const key of Object.keys(store)) if (key.startsWith('cirquimia.') && key !== STORE) store.removeItem(key);
    } catch {
      // Blocked storage.
    }
  }
}

interface Flag {
  label: string;
  state(): string;
  actions: Array<[string, () => void]>;
}

/** What the game remembers between visits, each with a way back to how a new player first sees it. */
function flags(): Array<[string, Flag[]]> {
  const s = t.dev.states;
  const reload = (...keys: string[]) => () => {
    forget(...keys);
    location.reload();
  };
  const raw = (key: string) => () => stored(key) ?? s.none;
  const restart = (...keys: string[]): [string, () => void] => [t.dev.restart, reload(...keys)];
  const known = (key: string, map: Record<string, string>) => () => {
    const v = stored(key);
    return v === null ? s.none : (map[v] ?? v);
  };
  const desktop = devHooks.desktopNote;
  return [
    [
      t.dev.firstTime,
      [
        {
          label: t.dev.flags.tutorial,
          state: known('cirquimia.tutorial', { moved: s.moved, square: s.square, done: s.done }),
          // The fire and water hints follow the tutorial, so replaying it replays them too (like ?tutorial).
          actions: [[t.dev.replay, reload('cirquimia.tutorial', 'cirquimia.sources')]],
        },
        {
          label: t.dev.flags.sources,
          state: () => {
            try {
              const left = JSON.parse(stored('cirquimia.sources') ?? 'null');
              return Array.isArray(left) ? (left.length ? s.pending(left.length) : s.done) : s.none;
            } catch {
              return s.none;
            }
          },
          actions: [[t.dev.replay, reload('cirquimia.sources')]],
        },
        {
          label: t.dev.flags.hudspot,
          state: known('cirquimia.hudspot', { next: s.next, '1': s.shown }),
          actions: [
            [
              t.dev.showNow,
              () => {
                try {
                  localStorage.setItem('cirquimia.hudspot', 'next');
                } catch {}
                location.reload();
              },
            ],
            restart('cirquimia.hudspot'),
          ],
        },
        {
          label: t.dev.flags.keys,
          state: known('cirquimia.keys', { '1': s.used }),
          actions: [restart('cirquimia.keys', 'cirquimia.keyset')],
        },
        {
          label: t.dev.flags.desktop,
          state: () => {
            const v = desktop?.state() ?? null;
            return v === null ? t.dev.onlyDesktop : v === 'queued' ? t.dev.queued : s.thisVisit(v);
          },
          actions: desktop?.state() === null || !desktop ? [] : [[t.dev.showAgain, () => desktop.replay()]],
        },
        { label: t.dev.flags.gpu, state: known('cirquimia.gpu', { software: s.software }), actions: [restart('cirquimia.gpu')] },
      ],
    ],
    [
      t.dev.prefs,
      [
        { label: t.dev.flags.sound, state: known('cirquimia.sound', { '1': s.on, '0': s.off }), actions: [restart('cirquimia.sound')] },
        {
          label: t.dev.flags.match,
          state: () => {
            try {
              const m = JSON.parse(stored('cirquimia.match') ?? 'null') as { rivals?: number; difficulty?: string } | null;
              return m ? `${m.rivals ?? '?'} · ${m.difficulty ?? '?'}` : s.none;
            } catch {
              return s.none;
            }
          },
          actions: [restart('cirquimia.match')],
        },
        { label: t.dev.flags.look, state: raw('cirquimia.look'), actions: [restart('cirquimia.look')] },
        { label: t.dev.flags.lang, state: raw('cirquimia.lang'), actions: [restart('cirquimia.lang')] },
      ],
    ],
    [
      t.dev.ranking,
      [
        { label: t.dev.flags.initials, state: raw('cirquimia.initials'), actions: [restart('cirquimia.initials')] },
        {
          label: t.dev.flags.myscores,
          state: () => {
            try {
              const ids = JSON.parse(stored('cirquimia.myscores') ?? 'null');
              return Array.isArray(ids) ? s.count(ids.length) : s.none;
            } catch {
              return s.none;
            }
          },
          actions: [restart('cirquimia.myscores')],
        },
        { label: t.dev.flags.mastodon, state: raw('cirquimia.mastodon'), actions: [restart('cirquimia.mastodon')] },
      ],
    ],
  ];
}

/**
 * Floating gear (top right, only with ?dev) that opens every development option in a grimoire sheet like the
 * book, split into tabs that hang from its bottom edge: the meadow (regenerate, seed, view and quality, and the
 * generator's sliders folded away), data on what was generated and what it costs, and tests (what the game
 * remembers, with a way to replay each first-time moment).
 * The miniature toggle (#tilt) moves into the panel; the fps counter (#fps) floats when its toggle is on.
 */
export function mountDevTools(world: World, onGenerated: () => void, quality: QualityControl) {
  // Without ?dev the tweaks saved by an earlier dev session are ignored, since nothing could turn them off.
  const saved: Saved = DEV ? load() : {};
  world.params = { ...DEFAULT_PARAMS, ...saved.params };

  const gear = el('button', { id: 'dev-gear', type: 'button', 'aria-label': t.dev.title, 'aria-expanded': 'false' });
  gear.innerHTML = gearIcon();
  // Modal: a scrim over the paused game, with the sheet in it.
  const modal = el('div', { id: 'dev-modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dev-title' });
  modal.hidden = true;
  const panel = el('aside', { id: 'dev-panel' });

  const head = el('h2', { id: 'dev-title', 'aria-label': t.dev.title }, t.dev.heading);
  const close = el('button', { type: 'button', class: 'dev-close', 'aria-label': t.dev.close }, '×');
  const body = el('div', { class: 'dev-body' });
  const pages = new Map<Tab, HTMLElement>();
  for (const tab of TABS) {
    const page = el('div', { class: 'dev-page', role: 'tabpanel', id: `dev-page-${tab}`, 'aria-labelledby': `dev-tab-${tab}` });
    pages.set(tab, page);
    body.append(page);
  }
  const foot = el('div', { class: 'dev-foot' });
  const tabList = el('div', { class: 'tabs', role: 'tablist' });
  const tabButtons = new Map<Tab, HTMLButtonElement>();
  for (const tab of TABS) {
    const button = el('button', { type: 'button', class: 'tab', role: 'tab', id: `dev-tab-${tab}`, 'aria-controls': `dev-page-${tab}` }) as HTMLButtonElement;
    button.innerHTML = TAB_ICONS[tab]();
    button.append(el('span', {}, t.dev.tabs[tab]));
    button.addEventListener('click', () => showTab(tab));
    tabButtons.set(tab, button);
    tabList.append(button);
  }
  foot.append(tabList);

  // Meadow: regenerate and seed first, then how it looks and runs, then the generator's sliders folded away.
  const meadowPage = pages.get('meadow')!;
  const regen = el('button', { type: 'button', class: 'dev-primary' }, t.dev.regenerate);
  const seedRow = el('div', { class: 'dev-row' });
  const seedInput = el('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', 'aria-label': t.dev.seed }) as HTMLInputElement;
  const seedApply = el('button', { type: 'button' }, t.dev.useSeed);
  seedRow.append(el('label', {}, t.dev.seed), seedInput, seedApply);

  const tilt = document.getElementById('tilt');
  const fps = document.getElementById('fps');
  const fpsRow = el('label', { class: 'dev-check' });
  const fpsBox = el('input', { type: 'checkbox' }) as HTMLInputElement;
  fpsRow.append(fpsBox, el('span', {}, t.dev.showFps));
  const debugRow = el('label', { class: 'dev-check' });
  const debugBox = el('input', { type: 'checkbox' }) as HTMLInputElement;
  debugRow.append(debugBox, el('span', {}, t.dev.showDebug));
  const viewRow = el('div', { class: 'dev-row' });
  // Without ?dev the panel is never mounted, so the toggle stays in the (hidden) HUD where main.ts finds it.
  if (DEV && tilt) viewRow.append(tilt);
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
  // Graphics quality: automatic (hardware + frame rate) or forced to a tier.
  const qualityRow = el('div', { class: 'dev-row' });
  qualityRow.append(el('label', {}, t.dev.quality));
  const qualityButtons = new Map<Tier | 'auto', HTMLButtonElement>();
  for (const choice of ['auto', ...TIERS] as const) {
    const button = el('button', { type: 'button', class: 'dev-toggle' }, choice === 'auto' ? t.dev.qualityAuto : t.dev.tiers[choice]);
    button.addEventListener('click', () => {
      const tier = choice === 'auto' ? null : choice;
      save({ quality: tier ?? undefined });
      quality.set(tier);
    });
    qualityButtons.set(choice, button);
    qualityRow.append(button);
  }
  const qualityNote = el('p', { class: 'dev-note' });
  const showQuality = () => {
    const q = quality.state;
    for (const [choice, button] of qualityButtons) button.setAttribute('aria-pressed', String(q.auto ? choice === 'auto' : choice === q.tier));
    qualityNote.textContent = `${t.dev.qualityNow(t.dev.tiers[q.tier], t.dev.qualityReasons[q.reason])} · GPU: ${q.renderer || '?'}`;
  };
  showQuality();

  const gen = el('details', { class: 'dev-fold' }) as HTMLDetailsElement;
  gen.append(el('summary', {}, t.dev.genControls));
  const inputs = new Map<keyof GenParams, { input: HTMLInputElement; show: () => void }>();
  // Pieces the meadow must have (training's lagoon and campfire) keep their material's slider off 0.
  const requiredNote = el('p', { class: 'dev-info' });
  const requiredText = el('span');
  requiredNote.innerHTML = infoIcon();
  requiredNote.append(requiredText);
  const floor = (key: keyof GenParams, min: number) => (world.required().some((k) => materialOf(k) === key) ? Math.max(min, 1) : min);
  let group = '';
  for (const spec of PARAM_SPECS) {
    if (spec.group !== group) {
      group = spec.group;
      gen.append(el('h4', {}, t.dev.groups[spec.group]));
      if (group === 'Materiales') gen.append(requiredNote);
    }
    const row = el('label', { class: 'dev-slider' });
    const input = el('input', { type: 'range', min: String(spec.min), max: String(spec.max), step: String(spec.step) }) as HTMLInputElement;
    const out = el('output') as HTMLOutputElement;
    row.append(el('span', {}, spec.label), input, out);
    gen.append(row);
    const show = () => {
      const v = Number(input.value);
      out.textContent = spec.key === 'sendero' ? (v ? t.dev.yes : t.dev.no) : spec.unit === '×' ? `${v.toFixed(1)}×` : `${v}${spec.unit ?? ''}`;
    };
    // The track keeps its full range and the handle stops at the floor, so 0 stays visible but out of reach.
    input.addEventListener('input', () => {
      const min = floor(spec.key, spec.min);
      if (Number(input.value) < min) input.value = String(min);
      show();
    });
    // Changing a parameter rebuilds the same seed, so you see exactly what that parameter does.
    input.addEventListener('change', () => {
      world.params[spec.key] = Number(input.value);
      save({ params: world.params });
      run(world.layout.seed);
    });
    inputs.set(spec.key, { input, show });
  }
  const reset = el('button', { type: 'button', class: 'dev-wide' }, t.dev.reset);
  gen.append(reset);
  gen.open = !!saved.genOpen;
  gen.addEventListener('toggle', () => save({ genOpen: gen.open }));

  const viewSection = el('section');
  viewSection.append(el('h3', {}, t.dev.view), qualityRow, qualityNote, lookRow, langRow, viewRow, fpsRow, debugRow);
  meadowPage.append(regen, seedRow, viewSection, gen);

  // Data: what the generator made and what it costs to draw.
  const statsBox = el('dl', { class: 'dev-stats' });
  const contents = el('div', { class: 'dev-contents' });
  const perfBox = el('dl', { class: 'dev-stats' });
  const madeSection = el('section');
  madeSection.append(el('h3', {}, t.dev.thisMeadow), statsBox, contents);
  const perfSection = el('section');
  perfSection.append(el('h3', {}, t.dev.performance), perfBox);
  pages.get('data')!.append(madeSection, perfSection);

  // Tests: rebuilt each time the tab opens, so the states are current.
  const testsPage = pages.get('tests')!;
  function renderTests() {
    const list: HTMLElement[] = [el('p', { class: 'dev-note' }, t.dev.testsNote)];
    for (const [title, items] of flags()) {
      const section = el('section');
      section.append(el('h3', {}, title));
      for (const flag of items) {
        const row = el('div', { class: 'dev-flag' });
        const text = el('span', { class: 'dev-flag-text' });
        text.append(el('span', {}, flag.label), el('i', {}, flag.state()));
        row.append(text);
        for (const [label, act] of flag.actions) {
          const button = el('button', { type: 'button' }, label);
          button.addEventListener('click', () => {
            act();
            renderTests();
          });
          row.append(button);
        }
        section.append(row);
      }
      list.push(section);
    }
    const fresh = el('button', { type: 'button', class: 'dev-primary' }, t.dev.newPlayer);
    fresh.addEventListener('click', () => {
      forgetAll();
      location.reload();
    });
    const freshSection = el('section');
    freshSection.append(fresh, el('p', { class: 'dev-note' }, t.dev.newPlayerNote));
    list.push(freshSection);
    testsPage.replaceChildren(...list);
  }

  let tab: Tab = TABS.includes(saved.tab as Tab) ? (saved.tab as Tab) : 'meadow';
  function showTab(next: Tab) {
    tab = next;
    save({ tab });
    for (const [name, page] of pages) page.hidden = name !== tab;
    for (const [name, button] of tabButtons) {
      button.setAttribute('aria-selected', String(name === tab));
      if (name === tab) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
      button.tabIndex = name === tab ? 0 : -1;
    }
    if (tab === 'tests') renderTests();
    body.scrollTop = 0;
  }

  panel.append(close, head, body, foot);
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
    for (const spec of PARAM_SPECS) {
      const { input, show } = inputs.get(spec.key)!;
      input.value = String(Math.max(floor(spec.key, spec.min), world.params[spec.key]));
      show();
    }
    const why = world.requiredBy();
    requiredNote.hidden = !why;
    requiredText.textContent = why ? t.dev.requiredNote[why] : '';
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
    syncInputs();
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
      showTab(tab);
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
    /** The tier changed (picked here, or stepped down for a low frame rate). */
    qualityChanged: showQuality,
    /** The game holds still while the panel is open. */
    get open() {
      return open;
    },
  };
}
