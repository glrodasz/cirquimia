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
