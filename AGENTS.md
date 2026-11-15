# Agent guide

Rules for anyone (people or AI agents) committing to Cirquimia.

## Commits and PR titles: Conventional Commits

Every commit message and every PR title follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <short summary>
```

PRs are **squash-merged**, so the PR title becomes the commit on `main`. The `PR title` check fails until the title follows the format.

| Type | Use it for | Version bump |
|---|---|---|
| `feat` | Something new for the player: a mechanic, a transmutation circle, a combination, a mode, a screen | minor (0.**x**.0) |
| `fix` | A bug fix or a small polish of something that already exists | patch (0.0.**x**) |
| `perf` | Faster or lighter, same behaviour | patch |
| `refactor`, `style`, `docs`, `test`, `build`, `ci`, `chore` | Anything that does not change the game for the player | none |

Examples:

- `feat: spiral circle roots the rival in place`
- `feat(combos): fire + water merge into an hourglass blast`
- `fix: earth pillar no longer throws out whoever it spawns under`
- `fix(hud): timer overlaps the pills on iPhone SE`
- `perf: fewer draw calls for the meadow grass`
- `docs: explain the leaderboard API`
- `ci: deploy previews for every PR`

Keep the summary short, imperative and in English; put the details in the PR body.

## Versioning (0.x for now)

- [semantic-release](https://semantic-release.gitbook.io/) runs on every push to `main` (`.github/workflows/deploy.yml`, config in `.releaserc.json`). It reads the commits since the last tag, creates the `vX.Y.Z` tag and a GitHub release with notes. Nothing is committed back to `main`.
- The game stays in **0.x** until the owner declares 1.0 (playable without multiplayer). Breaking changes (`feat!:` or `BREAKING CHANGE:`) bump the **minor**, never the major. Going to 1.0 is a deliberate change to `.releaserc.json`, not a commit type.
- `package.json`'s `version` is not used; the git tag is the source of truth.

## Version in the game

- The build stamps the version from `git describe --tags` (`vite.config.ts`, `__GAME_VERSION__`): `0.3.0` on a release, `0.3.0-2-gabc1234` on later builds (previews, local). `GAME_VERSION=...` overrides it.
- Read it from `src/version.ts` (`VERSION`). On screen it only shows with `?dev`, as a small label at the bottom centre.

## Adding a new spell (circle or combination)

Every new spell ships complete in the same PR. Go through this list and say in the PR body which items applied:

1. **Recognition or merge** (`src/gestures.ts`): a new `ShapeKind`; a drawn shape gets a recognizer, a combination gets a row in `MERGES` (it is merged in hand, in either order).
2. **Effect and damage**: `Element`, `AREA_OF` and `WARNING` in `src/spells.ts` (plus its look in `PillarStrike`), `DAMAGE` and colours in `src/combat.ts`, the cast in `castShape` (`src/main.ts`).
3. **Aim reticle** (`src/aim.ts` `aimMarks`) for anything cast at a target.
4. **Icons**: the hand/book glyph in `src/ammo.ts` and the sketch over a fighter's head (`SKETCH_PATH` / `SKETCH_FOR` in `src/combat.ts`).
5. **Sound** (`src/audio.ts`, the `switch` on the element): reuse a clip or synth that fits.
6. **Book**: the Símbolos index in `src/help.ts` (a symbol in `SHAPES`, a combination in the combinations list), its name in `t.help.roles` / `t.help.names` for **both** languages (`src/i18n/index.ts`), and the `.fig` colour in `index.html`. The book never shows numbers.
7. **Training**: a step in the guide loop (`STEPS` in `src/guides.ts`, the strokes in drawing order) so it gets a box on the "Círculos disponibles" checklist; new single strokes also need a guide line and the `t.guides.draw` text.
8. **Rivals** (`src/rivalMind.ts`): a `Tuning` chance per level if rivals may cast it (Fácil never combines).
9. **Tests**: recognition or merge (`tests/gestures.test.ts`), the reticle (`tests/aim.test.ts`), and the rival tuning (`tests/rivalMind.test.ts`) when it applies.
10. **Catalogue** (`components/`): the effect plays in the Hechizos story (`components/stories/spells.ts`), and any new UI or 3D piece gets a story (see `docs/components.md`).
11. **Screenshots** of the effect on a phone and the book entry in the PR.

## Component catalogue

Every UI element and 3D piece has a story at `/components` (`components/`, built by `npm run build`, run with
`npm run components`). A PR that adds or changes UI, or a 3D piece, adds or updates its story. Stories call the game's
real code and nothing in `src/` imports `components/`, so the game's bundle never grows. See `docs/components.md`.
