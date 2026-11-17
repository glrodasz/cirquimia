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

## Organisation: atomic design

The sidebar goes from the smallest piece to the whole game:

| Group | What goes there | File |
|---|---|---|
| **Tokens** | Colours and type as design tokens, plus the colours still hardcoded | `tokens.stories.ts` |
| **Átomos** | One element: icons, symbols, buttons, labels | `atoms.stories.ts` |
| **Moléculas** | A few atoms with one job: popover, notices, keys and stick | `molecules.stories.ts` |
| **Organismos** | A whole section of the UI: HUD, book, match cards, ranking, share card | `hud`, `book`, `match`, `ranking`, `share.stories.ts` |
| **Pantallas** | The game at one moment: combat, training, tutorial | `scenes.stories.ts` |
| **3D** | Characters, meadow and spells, large | `characters`, `meadow`, `spells.stories.ts` |

A new piece goes in the smallest group that describes it. Each group's Docs page (`.storybook/docs-page.ts`) is an
index of cards that open each story, with only the first story drawn and only on a wide screen, so it stays light on a
phone (a page of 14 WebGL frames was not). Storybook opens in the light grimoire theme; dark is in the toolbar.

## Design tokens

The game's colours and the grimoire font are Quantum Design tokens in three levels,
`tokens/global.json` → `tokens/system-light.json` / `system-dark.json` → `tokens/components.json` (the `Site.*`
entries are the game's own).

- **The UI only reads component tokens** (`var(--components-tokens--site--…)`). `index.html` keeps its short names
  (`--hud-bg`, `--g-paper`, `--leather`…) as bridge aliases to them, so no rule had to change.
- `npm run tokens` builds `src/styles/design-tokens.css` (`scripts/tokens.mjs`, on top of the kit's
  `scripts/quantum-tokens.mjs`) with **only** the component tokens that `index.html` and `src/` use and what they
  resolve through: ~3.4 KB, ~0.4 KB gzip. The full kit would be ~77 KB. Never edit the generated file.
- `npm run build` fails if that file is out of date (`--check`). The `designTokens()` plugin in `vite.config.ts`
  inlines it before the game's `<style>`, and Storybook's `previewHead` does the same.
- Dark mode follows the game's own switch: `data-theme` on `<html>`, or the system's dark mode unless
  `data-theme="light"`. The grimoire's paper and ink are `Colors.Fixed`: the same in both themes.
- `npm run tokens:audit -- --scan src` lists the colours still written by hand (also shown in **Tokens › Colores aún
  sin token**). Move them to tokens a component at a time, smallest pieces first.
- To change a colour: edit the JSON, `npm run tokens`, check both themes in Storybook.

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
2. Add the story to the group's file (see the table above): `export const X: StoryObj = { name: '…', ...scene(load, 'id', { doc, source }) }`.
   Variants that need a remount are `args` + `argTypes`; option lists are literals there (a stories file must not
   import game code, which would read the language too early).
3. Check it: `npm run storybook`, or `npm run build` and serve `dist/`.
