/** GET /api/scores: the global ranking. POST /api/scores: a won match's score (see src/leaderboard/server.ts). */
import { guard, listScores, submitScore, type Ctx } from '../../src/leaderboard/server';

export const onRequestGet = (ctx: Ctx) => guard(() => listScores(ctx));
export const onRequestPost = (ctx: Ctx) => guard(() => submitScore(ctx));
