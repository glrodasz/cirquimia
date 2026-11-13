import { describe, expect, it } from 'vitest';
import type { D1Database, D1Statement } from './server';
import { CARD_TTL_MS, KEEP_TOP, pruneCards, serveShare } from './shares';

/** The bit of node:sqlite used here (the project has no Node types). */
interface DatabaseSync {
  exec(sql: string): void;
  prepare(sql: string): { get(...a: unknown[]): unknown; all(...a: unknown[]): unknown[]; run(...a: unknown[]): { changes: number | bigint } };
}
const sqlite = 'node:sqlite';
const { DatabaseSync } = (await import(/* @vite-ignore */ sqlite)) as { DatabaseSync: new (path: string) => DatabaseSync };

/** D1 over an in-memory SQLite, enough for these queries. */
function memoryD1(): D1Database & { raw: DatabaseSync } {
  const raw = new DatabaseSync(':memory:');
  raw.exec(`CREATE TABLE scores (share_id TEXT, score INTEGER, day TEXT, created_at INTEGER, locale TEXT,
              initials TEXT, duration_ms INTEGER, damage INTEGER, rivals INTEGER, difficulty TEXT, seed TEXT);
            CREATE TABLE share_images (share_id TEXT PRIMARY KEY, image BLOB NOT NULL, created_at INTEGER NOT NULL);`);
  const statement = (sql: string, args: unknown[] = []): D1Statement => ({
    bind: (...values) => statement(sql, values),
    first: async <T>() => (raw.prepare(sql).get(...(args as never[])) as T) ?? null,
    all: async <T>() => ({ results: raw.prepare(sql).all(...(args as never[])) as T[] }),
    run: async () => ({ meta: { changes: Number(raw.prepare(sql).run(...(args as never[])).changes) } }),
  });
  return { raw, prepare: (sql) => statement(sql), batch: async () => [] }; // the tables above stand in for the real schema
}

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 10, 13, 12);
const id = (n: number) => `id${String(n).padStart(6, '0').replace(/\d/g, (d) => 'abcdefghjk'[Number(d)])}`;

function seed(db: ReturnType<typeof memoryD1>, n: number, score: number, at: number) {
  const day = new Date(at).toISOString().slice(0, 10);
  db.raw.prepare('INSERT INTO scores (share_id, score, day, created_at, locale) VALUES (?, ?, ?, ?, ?)').run(id(n), score, day, at, 'es');
  db.raw.prepare('INSERT INTO share_images VALUES (?, ?, ?)').run(id(n), new Uint8Array([0xff, 0xd8, 0xff]), at);
}
const kept = (db: ReturnType<typeof memoryD1>) =>
  new Set((db.raw.prepare('SELECT share_id FROM share_images').all() as { share_id: string }[]).map((r) => r.share_id));

describe('share card pruning', () => {
  it('keeps the all-time top, today\'s top and fresh cards; drops the rest', async () => {
    const db = memoryD1();
    // 150 old high scores (all-time board), 150 low scores today, 50 low recent ones from 3 days ago, 50 low old ones.
    for (let i = 0; i < 150; i++) seed(db, i, 10_000 - i, NOW - 30 * DAY);
    for (let i = 0; i < 150; i++) seed(db, 1000 + i, 500 - i, NOW - 60_000);
    for (let i = 0; i < 50; i++) seed(db, 2000 + i, 100, NOW - 3 * DAY);
    for (let i = 0; i < 50; i++) seed(db, 3000 + i, 50, NOW - CARD_TTL_MS - DAY);

    await pruneCards(db, NOW);
    const left = kept(db);
    for (let i = 0; i < KEEP_TOP; i++) expect(left.has(id(i))).toBe(true);
    for (let i = KEEP_TOP; i < 150; i++) expect(left.has(id(i))).toBe(false);
    for (let i = 0; i < 150; i++) expect(left.has(id(1000 + i))).toBe(true); // today: top 100 + under the TTL
    for (let i = 0; i < 50; i++) expect(left.has(id(2000 + i))).toBe(true);
    for (let i = 0; i < 50; i++) expect(left.has(id(3000 + i))).toBe(false);

    // A week later, yesterday's daily list is just old cards: only the all-time top 100 remain.
    await pruneCards(db, NOW + CARD_TTL_MS + DAY);
    expect(kept(db).size).toBe(KEEP_TOP);
  });

  it('sends a pruned card to the game\'s own picture, and keeps the link', async () => {
    const db = memoryD1();
    seed(db, 1, 10, NOW - 30 * DAY);
    db.raw.exec('DELETE FROM share_images');
    const ctx = (path: string) => ({ request: new Request(`https://cirquimia.pages.dev${path}`), env: { DB: db } });
    const img = await serveShare(ctx(`/s/${id(1)}.jpg`) as never, `${id(1)}.jpg`);
    expect(img.status).toBe(302);
    expect(img.headers.get('Location')).toBe('https://cirquimia.pages.dev/og/es.jpg');
  });
});
