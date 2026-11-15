export type StoryArgs = Record<string, string | number | boolean>;

export interface StoryContext<A extends StoryArgs = StoryArgs> {
  lang: 'es' | 'en';
  /** "Táctil" is on in the toolbar. */
  touch: boolean;
  /** The story's Controls in Storybook. */
  args: A;
  /** Changes Controls from the canvas (a panel button): Storybook stores them and the story mounts again with them. */
  setArgs: (next: Partial<A>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StoryFn = (ctx: StoryContext<any>) => void | Promise<void>;

/** Waits for the layout to settle (fonts, the next frames) before a story clicks through the real UI. */
export const settle = (ms = 0) => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, ms))));
