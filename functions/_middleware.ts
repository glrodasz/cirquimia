/**
 * Cloudflare Pages runs this before serving a page: a first visit to / goes to /es when the saved
 * choice (the `locale` cookie) or the browser's languages ask for Spanish. Explicit /es links are
 * never redirected, and the redirect is temporary and uncached because it depends on who asks.
 */
import { LOCALE_COOKIE, isLocale, parseAcceptLanguage, readCookie, resolveLocaleRedirect, switchLocalePath, type Locale } from '../src/i18n/locale';

interface PagesContext {
  request: Request;
  next(): Promise<Response>;
}

function redirect(to: URL, remember?: Locale) {
  const headers = new Headers({ Location: to.href, 'Cache-Control': 'private, no-store', Vary: 'Cookie, Accept-Language' });
  if (remember) headers.append('Set-Cookie', `${LOCALE_COOKIE}=${remember}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`);
  return new Response(null, { status: 307, headers });
}

export async function onRequest({ request, next }: PagesContext) {
  const url = new URL(request.url);
  // Files (bundles, icons, manifests, preview images) are the same in every language.
  if ((request.method !== 'GET' && request.method !== 'HEAD') || /\.[a-z0-9]+$/i.test(url.pathname)) return next();

  // Links shared before the language lived in the path: ?lang=es becomes /es, and the choice is kept.
  const legacy = url.searchParams.get('lang');
  if (isLocale(legacy)) {
    url.searchParams.delete('lang');
    return redirect(new URL(switchLocalePath(url.pathname, legacy) + url.search, url), legacy);
  }

  const target = resolveLocaleRedirect({
    pathname: url.pathname,
    savedLocale: readCookie(request.headers.get('cookie'), LOCALE_COOKIE),
    languages: parseAcceptLanguage(request.headers.get('accept-language')),
  });
  return target ? redirect(new URL(target + url.search, url)) : next();
}
