/** GET /api/scores: the global ranking. POST /api/scores: a won match's score. PATCH /api/scores: new initials for it (see src/leaderboard/server.ts). */
import { guard, listScores, renameScore, submitScore, type Ctx } from '../../src/leaderboard/server';

export const onRequestGet = (ctx: Ctx) => guard(() => listScores(ctx));
export const onRequestPost = (ctx: Ctx) => guard(() => submitScore(ctx));
export const onRequestPatch = (ctx: Ctx) => guard(() => renameScore(ctx));
