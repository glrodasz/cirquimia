/** itch.io serves HTML5 games from html-classic.itch.zone (and older uploads from *.hwcdn.net); the pages are on itch.io. */
const ALLOWED = /^https:\/\/([a-z0-9-]+\.)*(itch\.zone|itch\.io|hwcdn\.net)$/i;

export const allowedOrigin = (origin: string | null): origin is string => !!origin && ALLOWED.test(origin);

/** The CORS headers for a request from `origin`, or null when that origin may not call the API. */
export function corsHeaders(origin: string | null): Record<string, string> | null {
  if (!allowedOrigin(origin)) return null;
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}
