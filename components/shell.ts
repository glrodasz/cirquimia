import '@fontsource-variable/eb-garamond/wght.css';
import { GROUPS, STORIES, type Story } from './catalog';

/**
 * The catalogue's shell: the story list, the view toolbar (screen size, theme, language, touch) and the canvas,
 * an iframe of frame.html so every story gets a whole game page of its own (fixed HUD, ids, body listeners).
 * The state lives in the hash (#story=…&vp=…), so a link opens the same view.
 */
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const nav = $<HTMLElement>('nav');
const frame = $<HTMLIFrameElement>('frame');
const device = $<HTMLDivElement>('device');
const stage = $<HTMLDivElement>('stage');
const vp = $<HTMLSelectElement>('vp');
const theme = $<HTMLSelectElement>('theme');
const lang = $<HTMLSelectElement>('lang');
const touch = $<HTMLInputElement>('touch');
const menu = $<HTMLButtonElement>('menu');

interface State {
  story: string;
  vp: string;
  theme: string;
  lang: string;
  touch: boolean;
}

function read(): State {
  const h = new URLSearchParams(location.hash.slice(1));
  return {
    story: STORIES.some((s) => s.id === h.get('story')) ? h.get('story')! : STORIES[0].id,
    vp: h.get('vp') ?? 'fill',
    theme: h.get('theme') ?? '',
    lang: h.get('lang') === 'en' ? 'en' : 'es',
    touch: h.get('touch') === '1',
  };
}

function write(s: State) {
  const h = new URLSearchParams({ story: s.story });
  if (s.vp !== 'fill') h.set('vp', s.vp);
  if (s.theme) h.set('theme', s.theme);
  if (s.lang !== 'es') h.set('lang', s.lang);
  if (s.touch) h.set('touch', '1');
  history.replaceState(null, '', `#${h}`);
}

nav.innerHTML = GROUPS.map(
  (g) => `<h2>${g}</h2>` + STORIES.filter((s) => s.group === g).map((s) => `<a href="#story=${s.id}" data-id="${s.id}">${s.title}</a>`).join(''),
).join('');

let state = read();
let loaded = '';

function frameUrl(s: State) {
  const q = new URLSearchParams({ story: s.story, locale: s.lang });
  if (s.theme) q.set('theme', s.theme);
  if (s.touch) q.set('touch', '1');
  return `./frame.html?${q}`;
}

function fit() {
  const fill = state.vp === 'fill';
  const [w, h] = fill ? [stage.clientWidth, stage.clientHeight] : state.vp.split('x').map(Number);
  const pad = fill ? 0 : 36;
  const scale = fill ? 1 : Math.min(1, (stage.clientWidth - pad) / w, (stage.clientHeight - pad) / h);
  device.classList.toggle('framed', !fill);
  device.style.width = `${w}px`;
  device.style.height = `${h}px`;
  device.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function render() {
  const story = STORIES.find((s) => s.id === state.story) as Story;
  for (const a of nav.querySelectorAll<HTMLAnchorElement>('a')) {
    if (a.dataset.id === story.id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  $('title').textContent = `${story.group} · ${story.title}`;
  $('doc').textContent = story.doc;
  $('source').textContent = story.source;
  document.title = `${story.title} · Cirquimia componentes`;
  vp.value = state.vp;
  theme.value = state.theme;
  lang.value = state.lang;
  touch.checked = state.touch;
  const url = frameUrl(state);
  ($('open') as HTMLAnchorElement).href = url;
  if (url !== loaded) {
    loaded = url;
    frame.src = url;
  }
  fit();
  write(state);
}

const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  render();
};

nav.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-id]');
  if (!a) return;
  e.preventDefault();
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  set({ story: a.dataset.id! });
});
vp.addEventListener('change', () => set({ vp: vp.value }));
theme.addEventListener('change', () => set({ theme: theme.value }));
lang.addEventListener('change', () => set({ lang: lang.value }));
touch.addEventListener('change', () => set({ touch: touch.checked }));
$('reload').addEventListener('click', () => {
  loaded = '';
  render();
});
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
addEventListener('hashchange', () => {
  state = read();
  render();
});
addEventListener('resize', fit);
// The book's language tab asks the shell to switch, instead of navigating the canvas away.
addEventListener('message', (e) => {
  if (e.source === frame.contentWindow && e.data?.type === 'lang') set({ lang: e.data.lang });
});
render();
