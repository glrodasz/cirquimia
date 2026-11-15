import '@fontsource-variable/eb-garamond/wght.css';
import '@fontsource-variable/eb-garamond/wght-italic.css';
import meadowPhoto from '../src/assets/share/meadow.jpg';
import { STORIES, type StoryModule } from './catalog';
import { isolateStorage, mockApi } from './kit/mocks';
import type { StoryContext, StoryFn } from './kit/story';

/**
 * The canvas: one story on a page of its own, styled by the game's real stylesheet and built by the game's real
 * modules, so nothing here can drift from what players see. Query: ?story=id&locale=es|en (not ?lang=, which the game itself redirects)&theme=light|dark&touch=1.
 */
const params = new URLSearchParams(location.search);
const story = STORIES.find((s) => s.id === params.get('story')) ?? STORIES[0];
const lang = params.get('locale') === 'en' ? 'en' : 'es';
const touch = params.get('touch') === '1';
const theme = params.get('theme');
if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
document.title = `${story.title} · Cirquimia`;

/** "Táctil" in the toolbar: the game asks matchMedia (and its stylesheet asks @media) whether the pointer is a finger. */
function emulatePointer(coarse: boolean) {
  const swap = (q: string) =>
    q
      .replace(/\(\s*pointer:\s*coarse\s*\)/g, coarse ? '(min-width: 0px)' : '(max-width: 0px)')
      .replace(/\(\s*pointer:\s*fine\s*\)/g, coarse ? '(max-width: 0px)' : '(min-width: 0px)')
      .replace(/\(\s*hover:\s*hover\s*\)/g, coarse ? '(max-width: 0px)' : '(min-width: 0px)')
      .replace(/\(\s*hover:\s*none\s*\)/g, coarse ? '(min-width: 0px)' : '(max-width: 0px)');
  const real = window.matchMedia.bind(window);
  window.matchMedia = (q: string) => real(swap(q));
  for (const style of document.querySelectorAll('style')) style.textContent = swap(style.textContent ?? '');
  if (coarse) Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, configurable: true });
}

const loaders: Record<StoryModule, () => Promise<{ stories: Record<string, StoryFn> }>> = {
  foundations: () => import('./stories/foundations'),
  hud: () => import('./stories/hud'),
  book: () => import('./stories/book'),
  match: () => import('./stories/match'),
  ranking: () => import('./stories/ranking'),
  notices: () => import('./stories/notices'),
  share: () => import('./stories/share'),
  characters: () => import('./stories/characters'),
  meadow: () => import('./stories/meadow'),
  spells: () => import('./stories/spells'),
  scenes: () => import('./stories/scenes'),
};

function fail(err: unknown) {
  console.error(err);
  const box = document.createElement('pre');
  box.className = 'sb-error';
  box.textContent = `No se pudo montar «${story.title}»\n\n${err instanceof Error ? err.stack ?? err.message : String(err)}`;
  document.body.append(box);
}

async function main() {
  isolateStorage();
  mockApi();
  emulatePointer(touch);
  if (story.doc_page) document.documentElement.classList.add('sb-doc');
  if (story.backdrop) {
    const bg = document.createElement('div');
    bg.className = 'sb-backdrop';
    bg.style.backgroundImage = `url(${meadowPhoto})`;
    document.body.append(bg);
  }
  // The game reads its language once, from the path (/es/…), when src/i18n loads: load the story under that path.
  const own = location.pathname + location.search;
  if (lang === 'es') history.replaceState(null, '', `/es${location.pathname}${location.search}`);
  let mod: { stories: Record<string, StoryFn> };
  try {
    mod = await loaders[story.module]();
  } finally {
    history.replaceState(null, '', own);
  }
  const run = mod.stories[story.id];
  if (!run) throw new Error(`stories/${story.module}.ts has no story "${story.id}"`);
  const ctx: StoryContext = { lang, touch };
  await run(ctx);
}

// Links (the book's language tab) never navigate the canvas: the shell switches language instead.
document.addEventListener(
  'click',
  (e) => {
    const a = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    e.preventDefault();
    if (a.hreflang) parent.postMessage({ type: 'lang', lang: a.hreflang }, location.origin);
  },
  true,
);

main().catch(fail);
