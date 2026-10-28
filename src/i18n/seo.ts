/**
 * What crawlers and link previews read, per language. Vite writes it into index.html (English, /)
 * and es.html (Spanish, /es) at build time, since previews never run the game's JavaScript.
 */
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES, alternateLinks, localizePath, type Locale } from './locale';

export const SITE_URL = 'https://cirquimia.pages.dev';

const copy = {
  en: {
    title: 'Cirquimia · Draw symbols to cast alchemy spells',
    description: 'You are an alchemist in a miniature meadow: draw circles, triangles and stars with your finger to cast spells at your rivals. Free to play on your phone.',
    ogTitle: 'Cirquimia · Draw symbols to cast spells',
    ogDescription: 'Duel as an alchemist in a miniature meadow. Draw symbols with your finger to attack, defend and heal. Free to play in your phone’s browser.',
    ogImageAlt: 'The Cirquimia alchemist casting a spell in a low poly miniature meadow',
    jsonLd: 'Browser game: an alchemist draws symbols to cast spells in a miniature meadow.',
    genre: ['Action', 'Strategy'],
    platform: 'Web browser',
    noscript: 'Cirquimia is an alchemy game: draw symbols to cast spells in a miniature meadow. Turn on JavaScript to play.',
    manifest: 'manifest.webmanifest',
  },
  es: {
    title: 'Cirquimia · Dibuja símbolos y lanza hechizos de alquimia',
    description: 'Eres un alquimista en una pradera en miniatura: dibuja círculos, triángulos y estrellas con el dedo para lanzar hechizos contra tus rivales. Gratis en el móvil.',
    ogTitle: 'Cirquimia · Dibuja símbolos para lanzar hechizos',
    ogDescription: 'Eres un alquimista que se bate en duelo en una pradera en miniatura. Dibuja símbolos con el dedo para atacar, defenderte y curarte. Juega gratis desde el móvil.',
    ogImageAlt: 'El alquimista de Cirquimia lanzando un hechizo en una pradera low poly en miniatura',
    jsonLd: 'Juego de navegador: un alquimista dibuja símbolos para lanzar hechizos en una pradera en miniatura.',
    genre: ['Acción', 'Estrategia'],
    platform: 'Navegador web',
    noscript: 'Cirquimia es un juego de alquimia: dibuja símbolos para lanzar hechizos en una pradera en miniatura. Activa JavaScript para jugar.',
    manifest: 'manifest.es.webmanifest',
  },
} satisfies Record<Locale, unknown>;

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The language-specific part of <head>, plus the values the template fills in elsewhere. */
export function seoFor(locale: Locale) {
  const c = copy[locale];
  const url = new URL(localizePath('/', locale), SITE_URL).href;
  const image = `${SITE_URL}/og/${locale}.jpg`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Cirquimia',
    url,
    image,
    description: c.jsonLd,
    genre: c.genre,
    gamePlatform: c.platform,
    applicationCategory: 'Game',
    operatingSystem: 'Web',
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const meta = (attr: 'name' | 'property', key: string, value: string) => `<meta ${attr}="${key}" content="${escape(value)}" />`;
  const head = [
    `<title>${escape(c.title)}</title>`,
    meta('name', 'description', c.description),
    `<link rel="canonical" href="${url}" />`,
    ...alternateLinks('/', SITE_URL).map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${l.href}" />`),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', 'Cirquimia'),
    meta('property', 'og:url', url),
    meta('property', 'og:title', c.ogTitle),
    meta('property', 'og:description', c.ogDescription),
    meta('property', 'og:image', image),
    meta('property', 'og:image:type', 'image/jpeg'),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', c.ogImageAlt),
    meta('property', 'og:locale', OG_LOCALES[locale]),
    ...LOCALES.filter((l) => l !== locale).map((l) => meta('property', 'og:locale:alternate', OG_LOCALES[l])),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', c.ogTitle),
    meta('name', 'twitter:description', c.ogDescription),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', c.ogImageAlt),
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join('\n    ');
  return { lang: locale, head, noscript: escape(c.noscript), manifest: c.manifest, isDefault: locale === DEFAULT_LOCALE };
}
