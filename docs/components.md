# Component catalogue: Storybook (`/components`)

[Storybook](https://storybook.js.org/) with every UI element and 3D piece of the game, served at
[`/components`](https://cirquimia.pages.dev/components/) (and on every PR preview).

- **Run it locally:** `npm run storybook` (http://localhost:6006).
- **Build:** part of `npm run build`: `storybook build` into `dist/components`, after the game.
- **Stack:** Storybook 10 with `@storybook/html-vite` (the game is vanilla DOM + Three.js) and `@storybook/addon-docs`.

## Zero cost for the game

- Storybook is a dev dependency only. Nothing in `src/` imports `components/` or `.storybook/`, so the game's bundle is
  built exactly as before.
- Storybook uses its own Vite config (`.storybook/vite.config.ts`), not the game's: it only shares the version stamp.
- Every story's canvas gets the game's `<style>` block from `index.html` (`previewHead` in `.storybook/main.ts`).
- `/components` is excluded from the Pages Functions (`public/_routes.json`) and from the language redirect
  (`EXEMPT_PATHS` in `src/i18n/locale.ts`).

## How it works

- `components/*.stories.ts`: the stories in CSF, one file per sidebar group. Each story is
  `scene(load, id, { doc, source, args, argTypes })` (`components/kit/boot.ts`), and `load` imports the module in
  `components/stories/` that mounts the real game code, as `src/main.ts` does.
- **One story per page.** The game's modules own the whole page (fixed HUD, ids, listeners, the language read once from
  the path), so when Storybook asks for another story, other Controls or another toolbar value, `boot.ts` reloads the
  canvas on it. Docs pages show each story in its own frame (`docs.story.inline: false`).
- **Toolbar** (`.storybook/preview.ts`): language (ES/EN), touch emulation, theme, and the phone/tablet/desktop
  viewports. The book's own language tab switches the toolbar's language.
- **Controls:** the variants that need a fresh mount (rivals and level, the meadow seed, the spell, the GPU case…).
  Live actions (walk, cast, hit) stay in the small **Acciones** panel on the canvas (`components/kit/panel.ts`).
- The canvas never touches the player's data: `localStorage`/`sessionStorage` live in memory and every `/api` call is
  answered with sample data (`components/kit/mocks.ts`).
- `components/kit/viewer.ts`: the 3D turntable, with the game's Bruma light, shadows and tone mapping, orbit controls,
  the game's own camera on demand, and draw calls / triangles on screen.

## Adding a story

1. Export a function from `components/stories/<module>.ts` (in its `stories` record). It gets
   `{ lang, touch, args, setArgs }` and mounts the real module.
2. Add the story to `components/<module>.stories.ts`: `export const X: StoryObj = { name: '…', ...scene(load, 'id', { doc, source }) }`.
   Variants that need a remount are `args` + `argTypes`; option lists are literals there (a stories file must not
   import game code, which would read the language too early).
3. Check it: `npm run storybook`, or `npm run build` and serve `dist/`.
