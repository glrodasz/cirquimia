/**
 * Where this build runs. The web build lives on cirquimia.pages.dev, with the language in the path (/es) and the
 * ranking API next to the page. The itch.io build (`npm run build:itch`) is a zip of files served from itch's own
 * host inside an iframe: no /es path and no /api there, so it reads the language from ?lang= and calls the API on
 * pages.dev, which opens CORS for itch's hosts only (functions/api/_middleware.ts).
 */
export const PORTAL = import.meta.env.MODE === 'itch';

/** The ranking API: next to the page on the web, on pages.dev from a portal build. */
export const API_BASE = PORTAL ? 'https://cirquimia.pages.dev/api' : '/api';
