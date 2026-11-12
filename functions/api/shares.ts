/** POST /api/shares: the victory card as a link with its own preview (see src/leaderboard/shares.ts). */
import { guard, type Ctx } from '../../src/leaderboard/server';
import { uploadCard } from '../../src/leaderboard/shares';

export const onRequestPost = (ctx: Ctx) => guard(() => uploadCard(ctx));
