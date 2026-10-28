import { defineConfig, type Plugin } from 'vite';
import { pageLocale, type Locale } from './src/i18n/locale';
import { seoFor } from './src/i18n/seo';

function render(html: string, locale: Locale) {
  const seo = seoFor(locale);
  return html.replace('{{lang}}', seo.lang).replace('<!--seo-->', seo.head).replace('{{noscript}}', seo.noscript).replace('{{manifest}}', seo.manifest);
}

/**
 * One page per language for crawlers and link previews: / (English) and /es (Spanish, built as es.html).
 * The game itself is the same bundle; it reads the language from the URL.
 */
function localizedPages(): Plugin {
  return {
    name: 'localized-pages',
    enforce: 'post',
    transformIndexHtml: {
      order: 'pre',
      handler: (html, ctx) => render(html, pageLocale(new URL(ctx.originalUrl ?? '/', 'http://localhost').pathname)),
    },
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (index?.type !== 'asset') return;
      const [en, es] = [seoFor('en'), seoFor('es')];
      let html = String(index.source);
      for (const [from, to] of [
        ['<html lang="en">', '<html lang="es">'],
        [en.head, es.head],
        [en.noscript, es.noscript],
        [`./${en.manifest}"`, `./${es.manifest}"`],
      ]) {
        if (!html.includes(from)) this.error(`localized-pages: "${from.slice(0, 60)}" not found in index.html`);
        html = html.replace(from, () => to);
      }
      this.emitFile({ type: 'asset', fileName: 'es.html', source: html });
    },
  };
}

export default defineConfig({
  base: './',
  build: { target: 'es2022', chunkSizeWarningLimit: 900 },
  plugins: [localizedPages()],
});
