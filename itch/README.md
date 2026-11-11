# Publishing Cirquimia on itch.io

Everything the itch.io page needs, next to the game build.

| File | Use |
| --- | --- |
| `../cirquimia-itch.zip` (from `npm run build:itch`) | The game. Upload it as the HTML5 file. |
| `cover.png` | Cover image, 630×500 (itch's recommended size). |
| `screenshots/*.png` | Screenshots (Spanish UI): four desktop at 1920×1080 and one phone capture. |
| `description.en.md`, `description.es.md` | Page text. Paste one into the description (itch's editor accepts the formatting when pasted from a rendered view; tables may need to become lists). |

## Upload

1. **Create new project** → Kind of project: **HTML**.
2. **Uploads:** upload `cirquimia-itch.zip` and tick **This file will be played in the browser**.
3. **Embed options:**
   - Viewport dimensions: **960 × 600** (the game fills any size).
   - **Mobile friendly** on, orientation **Portrait**.
   - **Fullscreen button** on.
   - **Automatically start on page load** off (a click to launch also unlocks sound).
   - **Enable scrollbars** off. SharedArrayBuffer support: off (not needed).
4. **Details:**
   - Short description: *Draw transmutation circles and duel rival alchemists in a tiny low-poly meadow.*
   - Classification: Games · Release status: **In development** · Pricing: **No payments** (free).
   - Genre: **Action**. Tags: `alchemy`, `drawing`, `gestures`, `low-poly`, `procedural-generation`, `touch`, `magic`, `3d`, `browser`.
   - Inputs: Mouse, Keyboard, Touchscreen. Languages: English, Spanish.
   - Accessibility: none to declare yet.
   - Links: play on phone at https://cirquimia.pages.dev, source at https://github.com/glrodasz/cirquimia.
5. **Visibility:** Draft first, open the page and play once (ranking included), then Public.

## How the itch build differs

- Language comes from `?lang=es`, then the last choice on itch, then the browser's languages (there is no `/es` page on itch).
- The ranking calls `https://cirquimia.pages.dev/api`, which allows CORS only from `*.itch.zone`, `*.itch.io` and `*.hwcdn.net`. The CORS change has to be deployed on pages.dev before the ranking works from itch.
- Share links point to cirquimia.pages.dev.
