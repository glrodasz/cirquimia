import { describe, expect, it } from 'vitest';
import { allowedOrigin, corsHeaders } from './cors';

describe('ranking CORS', () => {
  it('opens to itch.io hosts only', () => {
    for (const ok of ['https://html-classic.itch.zone', 'https://v6p9d9t4.ssl.hwcdn.net', 'https://guillermo.itch.io', 'https://itch.io'])
      expect(allowedOrigin(ok)).toBe(true);
    for (const no of [null, '', 'http://html-classic.itch.zone', 'https://itch.zone.evil.com', 'https://evilitch.io', 'https://example.com'])
      expect(allowedOrigin(no)).toBe(false);
  });

  it('echoes the allowed origin', () => {
    expect(corsHeaders('https://html-classic.itch.zone')?.['Access-Control-Allow-Origin']).toBe('https://html-classic.itch.zone');
    expect(corsHeaders('https://example.com')).toBeNull();
  });
});
