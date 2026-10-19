# Cirquimia: prototype 01 (pradera)

A low-poly meadow that fills the screen. Tap or click anywhere and the alchemist walks there.

Draw a circle, a triangle (pointing up or down), a square, a rhombus or a five-point star (pentagram) in one stroke (tracing over it again before lifting the finger still counts) to make a transmutation circle; it is stored at the bottom of the screen (up to 6). Tap a stored circle, then tap the map to use it (for now it only shows an impact ring and spends the circle).

## Play

- Latest `main`: https://cirquimia.pages.dev
- Every pull request gets its own preview URL (see the PR's "Deployments" / "View deployment" link). Branch `foo/bar` is also served at `https://foo-bar.cirquimia.pages.dev`.

Deploys run from `.github/workflows/deploy.yml` (Cloudflare Pages via Wrangler). They need the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; without them the workflow only builds.

## Run

```bash
npm install
npm run dev            # http://localhost:5173 (also on your LAN, to test on a phone)
npm run build          # production build in dist/
npm run build:single   # dist/cirquimia-single.html, one self-contained file
```

## Stack

- **Three.js** (WebGL) for rendering, **Vite** for dev/build, **TypeScript**.
- Mobile later: wrap the same build with **Capacitor** (iOS/Android WebView app). No engine change needed.

## Where things live

| File | What it does |
| --- | --- |
| `src/main.ts` | Renderer, camera framing, lights, input, game loop |
| `src/generator.ts` | Procedural meadow (type 1): from a seed, picks and places features per material (roca, tierra, agua, fuego, magia, restos) plus a trail. Pure data, plus the generator parameters |
| `src/features.ts` | Builds each feature (menhir ring, wall, boulders, mound, turned earth, pond, campfire, crater, crystals, rune circle, palisade, cart, logs, banner), batched into a few InstancedMeshes |
| `src/world.ts` | Generates/rebuilds the meadow, checks walkability (flood fill from the spawn) and drops the most blocking feature until enough is walkable |
| `src/devtools.ts` | Gear button (top right) with the development panel |
| `src/meadow.ts` | Terrain, trees, rocks, grass, flowers, mushrooms (all instanced) |
| `src/character.ts` | The alchemist: build, walk animation, obstacle sliding |
| `src/tiltShift.ts` | Miniature (tilt-shift) post effect |
| `src/marker.ts` | Ring shown where you tap (also the impact ring) |
| `src/gestures.ts` | Single-stroke shape recognizer (circle, triangles, square, rhombus, pentagram) (geometry, no templates) |
| `src/ink.ts` | 2D overlay for the stroke and the circle flash |
| `src/ammo.ts` | Stored circles bar: add, select, spend |
| `src/noise.ts` | Seeded random + terrain height function |

## Tuning knobs

- Meadow generation: the gear (top right) opens the dev panel: new meadow, seed, material counts, densities, minimum walkable %, max animated elements. `?seed=texto` in the URL reproduces a meadow. Defaults in `DEFAULT_PARAMS` (`src/generator.ts`); playable area in `PLAY_AREA` (portrait only: everything is placed inside the vertical phone frame).

- Camera angle and zoom: `ELEVATION`, `AZIMUTH`, `FOV`, `VIEW_HEIGHT_LANDSCAPE`, `VIEW_WIDTH_PORTRAIT` in `src/main.ts`.
- Walk speed: `SPEED` in `src/character.ts`.
- Drawing vs tapping: `DRAW_THRESHOLD` in `src/main.ts`. Recognizer tolerances at the top of `src/gestures.ts`.
- Miniature blur: `band` and `strength` uniforms in `src/tiltShift.ts`.

## Performance choices

- Every repeated prop is one `InstancedMesh` (about 15 draw calls for the whole meadow).
- Flat-shaded Lambert materials, one shadow-casting light. The shadow box is fitted to the ground the screen shows and the map sized to keep the same texel size (48/1024 units on touch, 48/2048 on desktop), so shadows look the same at a fraction of the map.
- The camera never moves: instances farther than `VISIBLE_RADIUS` (`src/world.ts`) are dropped after generation.
- Scene is drawn once into a 4x MSAA half-float target (no canvas MSAA); horizontal blur, then vertical blur straight to the canvas, which also tone maps (no separate output pass). Inside the focus band the blur reads one texel.
- Pixel ratio capped at 2; the tilt-shift pass can be toggled off from the dev panel.
