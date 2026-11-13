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

## Setup

The database binding lives in `wrangler.toml` (D1 `cirquimia` bound as `DB` for production and every
preview), so Pages picks it up on each deploy and the dashboard's bindings are read-only. To recreate it:

1. `npx wrangler d1 create cirquimia` and put the printed `database_id` in `wrangler.toml`.
2. Optional: `npx wrangler pages secret put SCORE_SALT --project-name cirquimia` (any random text).
3. Deploy (push or re-run the Deploy workflow).

Without the binding the game still works and the victory card says the leaderboard is unavailable.

## Moderation

D1 → cirquimia → Console: `DELETE FROM scores WHERE id = 123;` (or `WHERE initials = 'XXXX'`).

## Local test

```sh
npm run build
npx wrangler pages dev dist --d1 DB=local-cirquimia
```

## Share links

A share link belongs to a saved score. Saving a score gives it a random `share_id` (8 readable characters, not the
row id, so links cannot be walked through), and the link is `/s/<share_id>`, built from that score row. Right after
saving, the game uploads a 1200×630 JPEG of the card (`POST /api/shares` with the run id as proof,
`src/leaderboard/shares.ts`), kept in D1's `share_images` table (~100 KB each) as the link's `og:image`.

Sharing asks for the initials first: tapping a share button (or the card) before saving shows "Add your initials to
share your card" and turns Save into "Save and share"; saving then opens the network's composer with the link
(X, Bluesky, Threads, Mastodon) or points at the button to tap again (Discord, save image, the card).

Only link-preview robots (by user agent) get the page with the tags; people who open the link are redirected
straight to the game (302), and an in-app browser that looks like a robot is sent on by the page's instant
redirect. A score whose card never arrived still has a link, with the game's own picture as preview.
Matches without a ranking (offline, no run) share the plain site link.

Cards are pruned on every upload (`pruneCards`): the cards of the all-time top 100 and of today's (UTC) top 100
stay for good, every other card is deleted once it is 7 days old. So the table holds at most 200 kept cards plus a
week of uploads. A pruned link still works (the score row stays, so it still replays the match); its preview falls
back to the game's own picture (`/og/<locale>.jpg`), and `/s/<id>.jpg` redirects there. If storage ever grows
anyway, `share_images` can move to an R2 bucket without changing the URLs.
