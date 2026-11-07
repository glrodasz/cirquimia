# Global leaderboard

Won matches against rivals (not Training, not the tutorial, not `?dev`) can enter a global board with
up to four initials, no account. The board has two tabs: **Today** (UTC day) and **All time**.

## Score

`points = damage dealt × difficulty × 600 / (seconds + 30)`, with Easy ×1, Normal ×1.5, Hard ×2, Very hard ×3.
Damage is the health the alchemist's own strikes took off the rivals: rivals knocking each other down
score nothing for the player. Seconds are play time (the game holds still while a card is open). Rules live in `src/leaderboard/score.ts`,
shared by the game and the server.

## Backend

Cloudflare Pages Functions (`functions/api/runs.ts`, `functions/api/scores.ts`, logic in
`src/leaderboard/server.ts`) on a D1 database bound as `DB`. Tables create themselves on first use.

- `POST /api/runs {rivals, difficulty}` opens a run when a ranked match starts.
- `POST /api/scores {runId, initials, durationMs, damage, hints}` stores a won match; the server recomputes the
  score with the run's own difficulty, refuses impossible numbers (under 4 s or over 30 min, more than 40 damage
  a second or 300 per rival, a duration longer than the real time since the run opened), accepts one score per run and limits submissions per address.
- `GET /api/scores?period=today|all` returns the top 50.

The board shows only Mobile / Tablet / Desktop; each row also stores OS, device (iPhone, iPad, Android
phone/tablet, Mac, PC…), browser, model and OS version where the browser offers them, screen, language,
country and the user agent. Addresses are stored only as a salted hash (`SCORE_SALT`, optional).

## Setup (once, in the Cloudflare dashboard)

1. **Storage & Databases → D1 → Create database**, name `cirquimia`.
2. **Workers & Pages → cirquimia → Settings → Bindings → Add → D1 database**: variable name `DB`,
   database `cirquimia`. Do it for **Production** and **Preview**.
3. Optional: **Settings → Variables and secrets → Add** `SCORE_SALT` (any random text), as a secret.
4. Redeploy (push to the branch or re-run the Deploy workflow); bindings apply to new deployments.

Without the binding the game still works and the victory card says the leaderboard is unavailable.

## Moderation

D1 → cirquimia → Console: `DELETE FROM scores WHERE id = 123;` (or `WHERE initials = 'XXXX'`).

## Local test

```sh
npm run build
npx wrangler pages dev dist --d1 DB=local-cirquimia
```
