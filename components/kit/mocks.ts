/**
 * The canvas page runs the game's real modules on the game's own origin, so it must never touch the player's saved
 * state or the real ranking: storage lives in memory here, and every /api call is answered with sample data.
 */
import type { Entry } from '../../src/leaderboard/client';

class MemoryStorage implements Storage {
  private readonly map = new Map<string, string>();
  get length() {
    return this.map.size;
  }
  clear() {
    this.map.clear();
  }
  getItem(key: string) {
    return this.map.has(key) ? this.map.get(key)! : null;
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null;
  }
  removeItem(key: string) {
    this.map.delete(key);
  }
  setItem(key: string, value: string) {
    this.map.set(key, String(value));
  }
}

export const storage = new MemoryStorage();

export function isolateStorage(seed: Record<string, string> = {}) {
  for (const [k, v] of Object.entries(seed)) storage.setItem(k, v);
  for (const name of ['localStorage', 'sessionStorage'] as const) {
    Object.defineProperty(window, name, { value: name === 'localStorage' ? storage : new MemoryStorage(), configurable: true });
  }
  // The language link remembers its choice in a cookie; nothing here should.
  Object.defineProperty(document, 'cookie', { get: () => '', set: () => {}, configurable: true });
}

const NAMES = ['GLR', 'ANA', 'MAX', 'SOL', 'LUZ', 'KAI', 'EVA', 'TEO', 'IRA', 'NOA', 'ANON', 'RIO'];
const LEVELS = ['experto', 'dificil', 'normal', 'facil'] as const;

function entries(mode: 'duel' | 'horde', n: number): Entry[] {
  return Array.from({ length: n }, (_, i) => ({
    id: 100 + i,
    initials: NAMES[i % NAMES.length],
    score: mode === 'horde' ? (14 - i) * 100_000 + 50_000 - i * 1700 : 98_400 - i * 6150,
    durationMs: 48_000 + i * 9_300,
    damage: 180 + ((i * 37) % 160),
    rivals: 3 - (i % 3),
    difficulty: LEVELS[Math.min(3, Math.floor(i / 3))],
    category: (['phone', 'desktop', 'tablet'] as const)[i % 3] as Entry['category'],
    at: Date.now() - i * 3_600_000,
    mode,
    wave: mode === 'horde' ? 14 - i : 0,
  }));
}

export type ApiMode = 'ok' | 'empty' | 'offline';
export const api = { mode: 'ok' as ApiMode };

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export function mockApi() {
  const real = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, location.href);
    if (!url.pathname.includes('/api/')) return real(input, init);
    await new Promise((r) => setTimeout(r, 250));
    if (api.mode === 'offline') return new Response('offline', { status: 503 });
    const method = (init?.method ?? 'GET').toUpperCase();
    if (url.pathname.endsWith('/runs')) return json({ id: 'run-demo' });
    if (url.pathname.endsWith('/shares')) return json({ ok: true });
    if (url.pathname.endsWith('/scores') && method === 'POST') {
      const body = JSON.parse(String(init?.body ?? '{}'));
      const horde = body.wave !== undefined;
      return json({
        id: 999, initials: body.initials ?? 'ANON', anonymous: !body.initials, score: horde ? 6 * 100_000 + 41_000 : 71_250,
        durationMs: body.durationMs, damage: body.damage, rivals: 2, difficulty: 'normal', category: 'desktop',
        mode: horde ? 'horde' : 'duel', wave: body.wave ?? 0,
        rank: { today: 3, week: 7, month: 12, all: 41 }, total: { today: 18, week: 96, month: 310, all: 2207 },
        share: `${location.origin}/s/demo`,
      });
    }
    if (url.pathname.endsWith('/scores') && method === 'PATCH') return json({ initials: JSON.parse(String(init?.body ?? '{}')).initials });
    if (url.pathname.endsWith('/scores')) {
      const mode = url.searchParams.get('mode') === 'horde' ? 'horde' : 'duel';
      const list = api.mode === 'empty' ? [] : entries(mode, 10);
      const me = api.mode === 'empty' ? null : { rank: 23, entry: { ...entries(mode, 23)[22], id: 999, initials: 'YOU' } };
      return json({ period: url.searchParams.get('period') ?? 'today', day: new Date().toISOString().slice(0, 10), entries: list, me });
    }
    return json({ error: 'not mocked' }, 404);
  };
}
