/** GET /s/<id> (the share page) and /s/<id>.jpg (its card); see src/leaderboard/shares.ts. */
import { guard, type Ctx } from '../../src/leaderboard/server';
import { serveShare } from '../../src/leaderboard/shares';

export const onRequestGet = (ctx: Ctx & { params: { id: string } }) => guard(() => serveShare(ctx, String(ctx.params.id)));
export const onRequestHead = onRequestGet;
