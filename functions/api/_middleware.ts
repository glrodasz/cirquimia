/**
 * The ranking API answers the game's own pages, and also the itch.io build, which runs from itch's hosts inside an
 * iframe and so calls this API cross-origin. CORS is opened for those hosts only (see src/platform.ts).
 */
import { corsHeaders } from '../../src/leaderboard/cors';

interface Ctx {
  request: Request;
  next(): Promise<Response>;
}

export async function onRequest({ request, next }: Ctx) {
  const cors = corsHeaders(request.headers.get('Origin'));
  if (request.method === 'OPTIONS') return new Response(null, { status: cors ? 204 : 403, headers: cors ?? {} });
  const res = await next();
  if (!cors) return res;
  const out = new Response(res.body, res);
  for (const [key, value] of Object.entries(cors)) out.headers.set(key, value);
  out.headers.append('Vary', 'Origin');
  return out;
}
