import { describe, expect, it } from 'vitest';
import { ID_PATTERN, newShareId, sharePage, type ShareRow } from '../src/leaderboard/shares';
import { resolveLocaleRedirect } from '../src/i18n/locale';

const row: ShareRow = {
  id: 'abcDEF23',
  locale: 'es',
  initials: 'LUIS',
  score: 2635,
  duration_ms: 118_000,
  damage: 325,
  rivals: 2,
  difficulty: 'dificil',
  updated_at: 1700000000000,
};

describe('share links', () => {
  it('makes short ids that are hard to guess and easy to read', () => {
    const ids = new Set(Array.from({ length: 200 }, newShareId));
    expect(ids.size).toBe(200);
    for (const id of ids) expect(id).toMatch(ID_PATTERN);
    expect(ID_PATTERN.test('abc')).toBe(false);
    expect(ID_PATTERN.test('../../etc')).toBe(false);
  });

  it('gives the page the card as its preview, in the language of the match', () => {
    const html = sharePage(row, 'https://cirquimia.pages.dev');
    expect(html).toContain('<html lang="es">');
    expect(html).toContain('<meta property="og:image" content="https://cirquimia.pages.dev/s/abcDEF23.jpg?v=1700000000000">');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(html).toContain('LUIS: 2635 puntos en Cirquimia');
    expect(html).toContain('Venció a 2 rivales en Difícil en 1:58');
    expect(html).toContain('href="https://cirquimia.pages.dev/es"');
  });

  it('works without initials and in English', () => {
    const html = sharePage({ ...row, locale: 'en', initials: null, rivals: 1 }, 'https://x.pages.dev');
    expect(html).toContain('<title>2,635 points in Cirquimia</title>');
    expect(html).toContain('Beat 1 rival on Hard');
    expect(html).toContain('href="https://x.pages.dev/"');
  });

  it('never lets stored text into the markup', () => {
    const html = sharePage({ ...row, initials: '<b>', locale: '"><script>' }, 'https://cirquimia.pages.dev');
    expect(html).not.toContain('<b>');
    expect(html).not.toContain('<script>');
  });

  it('keeps share pages out of the language redirect', () => {
    expect(resolveLocaleRedirect({ pathname: '/s/abcDEF23', savedLocale: 'es', languages: ['es'] })).toBeNull();
  });
});
