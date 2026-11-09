/** POST /api/runs: the game opens a run when a ranked match starts (see src/leaderboard/server.ts). */
import { guard, startRun, type Ctx } from '../../src/leaderboard/server';

export const onRequestPost = (ctx: Ctx) => guard(() => startRun(ctx));
