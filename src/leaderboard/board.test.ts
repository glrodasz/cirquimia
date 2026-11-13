import { describe, expect, it } from 'vitest';
import type { D1Database, D1Statement } from './server';
import { BOARD_SIZE, listScores, parseMine } from './server';

interface DatabaseSync {
  exec(sql: string): void;
  prepare(sql: string): { get(...a: unknown[]): unknown; all(...a: unknown[]): unknown[]; run(...a: unknown[]): { changes: number | bigint } };
}
const sqlite = 'node:sqlite';
const { DatabaseSync } = (await import(/* @vite-ignore */ sqlite)) as { DatabaseSync: new (path: string) => DatabaseSync };

function memoryD1(): D1Database & { raw: DatabaseSync } {
  const raw = new DatabaseSync(':memory:');
  raw.exec(`CREATE TABLE scores (id INTEGER PRIMARY KEY, initials TEXT, score INTEGER, duration_ms INTEGER, damage INTEGER,
              rivals INTEGER, difficulty TEXT, category TEXT, day TEXT, created_at INTEGER);`);
  const statement = (sql: string, args: unknown[] = []): D1Statement => ({
    bind: (...values) => statement(sql, values),
    first: async <T>() => (raw.prepare(sql).get(...(args as never[])) as T) ?? null,
    all: async <T>() => ({ results: raw.prepare(sql).all(...(args as never[])) as T[] }),
    run: async () => ({ meta: { changes: Number(raw.prepare(sql).run(...(args as never[])).changes) } }),
  });
  return { raw, prepare: (sql) => statement(sql), batch: async () => [] };
}

/** 60 scores this moment: id n scores 1000 - n, so id 1 is first and id 49 is 49th. */
function board() {
  const db = memoryD1();
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  for (let n = 1; n <= 60; n++) {
    db.raw.prepare('INSERT INTO scores VALUES (?, ?, ?, 60000, 100, 1, ?, ?, ?, ?)').run(n, 'AB', 1000 - n, 'normal', 'mobile', day, now - n);
  }
  return db;
}

async function get(db: D1Database, query: string) {
  const res = await listScores({ request: new Request(`https://cirquimia.pages.dev/api/scores?${query}`), env: { DB: db } } as never);
  return (await res.json()) as { entries: { id: number }[]; me: { rank: number; entry: { id: number } } | null };
}

describe('board: top 20 plus the player', () => {
  it('shows the top 20 and the player\'s best place below it', async () => {
    const db = board();
    for (const period of ['today', 'week', 'month', 'all']) {
      const res = await get(db, `period=${period}&mine=55,49`);
      expect(res.entries.map((e) => e.id)).toEqual(Array.from({ length: BOARD_SIZE }, (_, i) => i + 1));
      expect(res.me).toMatchObject({ rank: 49, entry: { id: 49 } });
    }
  });

  it('adds nothing when the player is already on the top 20 or has no scores', async () => {
    const db = board();
    expect((await get(db, 'period=week&mine=7,49')).me).toBeNull();
    expect((await get(db, 'period=week')).me).toBeNull();
    expect((await get(db, 'period=week&mine=999')).me).toBeNull();
  });

  it('reads only whole positive ids', () => {
    expect(parseMine('3,x,-1,3,1.5,8')).toEqual([3, 8]);
    expect(parseMine(null)).toEqual([]);
  });
});
