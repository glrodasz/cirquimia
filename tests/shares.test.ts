import { describe, expect, it } from 'vitest';
import { ID_PATTERN, isPreviewBot, newShareId, sharePage, type ShareRow } from '../src/leaderboard/shares';
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
    expect(html).not.toContain('"><script>');
  });

  it('sends people to the game and shows the card only to link-preview robots', () => {
    for (const ua of [
      'Twitterbot/1.0',
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'Mozilla/5.0 (compatible; Bluesky Cardyb/1.1; +mailto:support@bsky.app)',
      'http.rb/5.2.0 (Mastodon/4.3.0; +https://mastodon.social/)',
      'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
      'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
      'TelegramBot (like TwitterBot)',
      'WhatsApp/2.23.20.0',
      'LinkedInBot/1.0',
    ])
      expect(isPreviewBot(ua), ua).toBe(true);
    for (const ua of [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36',
    ])
      expect(isPreviewBot(ua), ua).toBe(false);
    expect(isPreviewBot(null)).toBe(false);
    // Anyone who still lands on the page (an in-app browser that looks like a robot) is sent on at once.
    expect(sharePage(row, 'https://cirquimia.pages.dev')).toContain('<meta http-equiv="refresh" content="0; url=https://cirquimia.pages.dev/es">');
  });

  it('keeps share pages out of the language redirect', () => {
    expect(resolveLocaleRedirect({ pathname: '/s/abcDEF23', savedLocale: 'es', languages: ['es'] })).toBeNull();
  });
});
