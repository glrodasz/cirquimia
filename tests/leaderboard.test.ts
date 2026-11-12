import { describe, expect, it } from 'vitest';
import { cleanInitials, formatTime, plausible, scoreFor, validInitials } from '../src/leaderboard/score';
import { classifyDevice } from '../src/leaderboard/device';
import { composeUrl, mastodonHost } from '../src/leaderboard/share';

describe('score', () => {
  it('scores the damage the alchemist dealt, by difficulty and speed', () => {
    expect(scoreFor(100, 'facil', 30_000)).toBe(1000);
    expect(scoreFor(200, 'experto', 60_000)).toBe(4000);
    expect(scoreFor(200, 'experto', 30_000)).toBeGreaterThan(scoreFor(200, 'experto', 60_000));
    expect(scoreFor(100, 'dificil', 40_000)).toBeGreaterThan(scoreFor(100, 'normal', 40_000));
    // Three rivals that mostly knock each other out score less than one beaten alone.
    expect(scoreFor(60, 'normal', 40_000)).toBeLessThan(scoreFor(100, 'normal', 40_000));
  });

  it('refuses impossible matches', () => {
    expect(plausible(0, 'facil', 60_000, 100)).toBe(false); // training
    expect(plausible(4, 'facil', 60_000, 100)).toBe(false);
    expect(plausible(3, 'facil', 60_000, 100)).toBe(true);
    expect(plausible(1, 'imposible', 60_000, 100)).toBe(false);
    expect(plausible(1, 'normal', 60_000, 0)).toBe(false); // the rivals did it all
    expect(plausible(1, 'normal', 60_000, 301)).toBe(false); // more than one rival can lose
    expect(plausible(2, 'experto', 3_000, 100)).toBe(false); // too short
    expect(plausible(2, 'experto', 4_000, 200)).toBe(false); // 50 damage a second
    expect(plausible(2, 'experto', 5_000, 200)).toBe(true);
    expect(plausible(1, 'normal', 31 * 60_000, 100)).toBe(false);
  });

  it('keeps initials to four letters or digits', () => {
    expect(cleanInitials(' g.l-rz9 ')).toBe('GLRZ');
    expect(cleanInitials('ñu')).toBe('ÑU');
    expect(validInitials('AB1')).toBe(true);
    expect(validInitials('')).toBe(false);
    expect(validInitials('<b>')).toBe(false);
    expect(validInitials('ABCDE')).toBe(false);
  });

  it('formats times', () => {
    expect(formatTime(42_400)).toBe('0:42');
    expect(formatTime(125_000)).toBe('2:05');
    expect(formatTime(3_725_000)).toBe('1:02:05');
  });
});

describe('device', () => {
  const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
  const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
  const PIXEL = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36';
  const TAB = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
  const WIN = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0';

  it('tells phones, tablets and desktops apart', () => {
    expect(classifyDevice(IPHONE)).toMatchObject({ category: 'mobile', device: 'iphone', os: 'ios', browser: 'safari' });
    expect(classifyDevice(MAC, { touchPoints: 5 })).toMatchObject({ category: 'tablet', device: 'ipad' });
    expect(classifyDevice(MAC, { touchPoints: 0 })).toMatchObject({ category: 'desktop', device: 'mac' });
    expect(classifyDevice(PIXEL)).toMatchObject({ category: 'mobile', device: 'android-phone', browser: 'chrome' });
    expect(classifyDevice(TAB)).toMatchObject({ category: 'tablet', device: 'android-tablet' });
    expect(classifyDevice(WIN)).toMatchObject({ category: 'desktop', device: 'windows-pc', browser: 'edge' });
  });
});

describe('share', () => {
  it('reads a Mastodon server from what people type', () => {
    expect(mastodonHost('mastodon.social')).toBe('mastodon.social');
    expect(mastodonHost('https://Fosstodon.org/home')).toBe('fosstodon.org');
    expect(mastodonHost('@guille@hachyderm.io')).toBe('hachyderm.io');
    expect(mastodonHost('not a server')).toBeNull();
    expect(mastodonHost('')).toBeNull();
  });

  it('builds each network compose link with the text', () => {
    expect(composeUrl('x', 'hola & adiós')).toBe('https://x.com/intent/post?text=hola%20%26%20adi%C3%B3s');
    expect(composeUrl('bluesky', 'a')).toBe('https://bsky.app/intent/compose?text=a');
    expect(composeUrl('threads', 'a')).toBe('https://www.threads.net/intent/post?text=a');
    expect(composeUrl('mastodon', 'a', 'mas.to')).toBe('https://mas.to/share?text=a');
    expect(composeUrl('whatsapp', 'a https://x.y/s/1')).toBe('https://wa.me/?text=a%20https%3A%2F%2Fx.y%2Fs%2F1');
    expect(composeUrl('telegram', '⚗️ a https://x.y/s/1')).toBe('https://t.me/share/url?url=https%3A%2F%2Fx.y%2Fs%2F1&text=%E2%9A%97%EF%B8%8F%20a');
  });
});
