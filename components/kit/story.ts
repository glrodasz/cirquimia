export interface StoryContext {
  lang: 'es' | 'en';
  /** "Táctil" is on in the toolbar. */
  touch: boolean;
}

export type StoryFn = (ctx: StoryContext) => void | Promise<void>;

/** Waits for the layout to settle (fonts, the next frames) before a story clicks through the real UI. */
export const settle = (ms = 0) => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, ms))));
