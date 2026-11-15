import type { ArgTypes, StoryContext as SbContext, StoryObj } from '@storybook/html-vite';
import { addons } from 'storybook/preview-api';
import { UPDATE_GLOBALS, UPDATE_STORY_ARGS } from 'storybook/internal/core-events';
import meadowPhoto from '../../src/assets/share/meadow.jpg';
import { isolateStorage, mockApi } from './mocks';
import type { StoryArgs, StoryContext, StoryFn } from './story';

/**
 * How a story reaches the canvas. Every story mounts the game's real modules, and those own the whole page (fixed
 * HUD, ids, listeners on body and window, the language read once from the path), so a story never shares a page:
 * when Storybook asks for another story, other Controls or another language, the canvas reloads on it first.
 */

export type StoryModule = { stories: Record<string, StoryFn> };

export interface SceneOptions<A extends StoryArgs> {
  /** One or two lines on what it is and when the player sees it. */
  doc: string;
  /** Where its code lives in src/. */
  source: string;
  /** Long pages (palettes, galleries) scroll instead of filling a fixed game screen. */
  page?: boolean;
  /** The meadow photo behind it, so overlays read as they do in the game. */
  backdrop?: boolean;
  args?: A;
  argTypes?: Partial<ArgTypes<A>>;
}

let mounted: string | null = null;

/** Storybook's own URL for this story with these Controls and toolbar, so a reload opens exactly it. */
function urlFor(ctx: SbContext, args: StoryArgs) {
  const enc = (o: Record<string, unknown>) =>
    Object.entries(o)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `${k}:${typeof v === 'boolean' ? `!${v}` : v}`)
      .join(';');
  const url = new URL(location.href);
  url.searchParams.set('id', ctx.id);
  url.searchParams.set('viewMode', 'story');
  url.searchParams.set('args', enc(args));
  url.searchParams.set('globals', enc({ locale: ctx.globals.locale, touch: ctx.globals.touch, theme: ctx.globals.theme }));
  return url.toString();
}

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

function fail(name: string, err: unknown) {
  console.error(err);
  const box = document.createElement('pre');
  box.className = 'kit-error';
  box.textContent = `No se pudo montar «${name}»\n\n${err instanceof Error ? (err.stack ?? err.message) : String(err)}`;
  document.body.append(box);
}

async function start(load: () => Promise<StoryModule>, id: string, opts: SceneOptions<StoryArgs>, args: StoryArgs, sb: SbContext) {
  const lang = sb.globals.locale === 'en' ? 'en' : 'es';
  const touch = sb.globals.touch === true;
  const theme = sb.globals.theme;
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
  isolateStorage();
  mockApi();
  emulatePointer(touch);
  document.documentElement.classList.add('kit-story');
  if (opts.page) document.documentElement.classList.add('kit-doc');
  if (opts.backdrop) {
    const bg = document.createElement('div');
    bg.className = 'kit-backdrop';
    bg.style.backgroundImage = `url(${meadowPhoto})`;
    document.body.append(bg);
  }
  // The game reads its language once, from the path (/es/…), when src/i18n loads: load the story under that path.
  const own = location.pathname + location.search;
  if (lang === 'es') history.replaceState(history.state, '', `/es${location.pathname}${location.search}`);
  let mod: StoryModule;
  try {
    mod = await load();
  } finally {
    history.replaceState(history.state, '', own);
  }
  const run = mod.stories[id];
  if (!run) throw new Error(`no story "${id}" in its module`);
  const channel = addons.getChannel();
  const ctx: StoryContext = {
    lang,
    touch,
    args,
    setArgs: (next) => channel.emit(UPDATE_STORY_ARGS, { storyId: sb.id, updatedArgs: next }),
  };
  await run(ctx);
}

// Links (the book's language tab) never navigate the canvas: they switch the toolbar's language instead.
document.addEventListener(
  'click',
  (e) => {
    const a = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a || a.closest('.sb-wrapper, .docs-story')) return;
    e.preventDefault();
    if (a.hreflang) addons.getChannel().emit(UPDATE_GLOBALS, { globals: { locale: a.hreflang } });
  },
  true,
);

/** One story: Storybook's render hands over to the game's own modules, loaded only when the story opens. */
export function scene<A extends StoryArgs = StoryArgs>(load: () => Promise<StoryModule>, id: string, opts: SceneOptions<A>): StoryObj {
  return {
    args: opts.args,
    argTypes: opts.argTypes as ArgTypes,
    parameters: {
      layout: 'fullscreen',
      docs: { description: { story: `${opts.doc}\n\nCódigo: \`${opts.source}\`` } },
    },
    render: (args, sb) => {
      const root = document.createElement('div');
      const key = JSON.stringify([sb.id, args, sb.globals.locale, sb.globals.touch, sb.globals.theme]);
      if (mounted === key) return root; // the same story drawn again: what is on the page already is it
      if (mounted) {
        location.replace(urlFor(sb, args as StoryArgs));
        return root;
      }
      mounted = key;
      start(load, id, opts as SceneOptions<StoryArgs>, args as StoryArgs, sb).catch((err) => fail(id, err));
      return root;
    },
  };
}
