# Component catalogue (`/components`)

A Storybook-style catalogue of every UI element and 3D piece of the game, served at
[`/components`](https://cirquimia.pages.dev/components/) (and on every PR preview).

- **Run it locally:** `npm run components` (Vite dev server for `components/`).
- **Build:** part of `npm run build`; it is a second Vite build (`vite.components.config.ts`) into `dist/components`.

## Why not Storybook itself

The UI is vanilla DOM built by `mount*()` functions and Three.js classes, with the whole stylesheet inline in
`index.html`. A small Vite page reuses exactly that: no new dependencies (Storybook would add hundreds of packages and
pin us to its Vite support), and every story calls the game's real code, so the catalogue cannot drift from the game.

## Zero cost for the game

- Nothing in `src/` imports `components/`; the game's bundle is built exactly as before.
- The catalogue reads the game's `<style>` block from `index.html` at build time (`gameStyles()` plugin).
- `/components` is excluded from the Pages Functions (`public/_routes.json`) and from the language redirect
  (`EXEMPT_PATHS` in `src/i18n/locale.ts`).

## How it works

- `components/index.html` + `shell.ts`: the sidebar, the toolbar (screen size, theme, language, touch) and an iframe.
- `components/frame.html` + `frame.ts`: one story per page, so each gets a clean game page (fixed HUD, ids, listeners).
  Its query is `?story=id&locale=es|en&theme=light|dark&touch=1` (not `?lang=`, which the game redirects).
- The canvas never touches the player's data: `localStorage`/`sessionStorage` live in memory and every `/api` call is
  answered with sample data (`components/kit/mocks.ts`).
- `components/kit/viewer.ts`: the 3D turntable, with the game's Bruma light, shadows and tone mapping, orbit controls,
  the game's own camera on demand, and draw calls / triangles on screen.

## Adding a story

1. Add an entry to `components/catalog.ts` (`id`, `group`, `title`, `module`, `doc`, `source`).
2. Export a function with that `id` from `components/stories/<module>.ts`. It mounts the real module, as `src/main.ts`
   does, and may add controls with `Panel` (`components/kit/panel.ts`).
3. Check it: `npm run build`, serve `dist/` and open `/components/#story=<id>`.
