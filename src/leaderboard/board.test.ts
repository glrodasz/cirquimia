import { describe, expect, it } from 'vitest';
import { hordeScore } from '../horde';
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
              rivals INTEGER, difficulty TEXT, category TEXT, day TEXT, created_at INTEGER,
              mode TEXT NOT NULL DEFAULT 'duel', wave INTEGER NOT NULL DEFAULT 0, kills INTEGER);`);
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
    db.raw.prepare('INSERT INTO scores (id, initials, score, duration_ms, damage, rivals, difficulty, category, day, created_at) VALUES (?, ?, ?, 60000, 100, 1, ?, ?, ?, ?)').run(n, 'AB', 1000 - n, 'normal', 'mobile', day, now - n);
  }
  return db;
}

async function get(db: D1Database, query: string) {
  const res = await listScores({ request: new Request(`https://cirquimia.pages.dev/api/scores?${query}`), env: { DB: db } } as never);
  return (await res.json()) as { entries: { id: number; kills: number | null }[]; me: { rank: number; entry: { id: number } } | null };
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

  it('keeps the horde on its own boards', async () => {
    const db = board();
    const now = Date.now();
    const day = new Date(now).toISOString().slice(0, 10);
    // Horde scores are far above any duel score; they must never push the duel's board down, nor mix with it.
    // 101 was saved before the golems were counted: no kills.
    for (const [id, wave, seconds, kills] of [[101, 5, 300, null], [102, 7, 900, 33], [103, 7, 600, 34]]) {
      db.raw
        .prepare("INSERT INTO scores (id, initials, score, duration_ms, damage, rivals, difficulty, category, day, created_at, mode, wave, kills) VALUES (?, 'HH', ?, ?, 0, 0, 'normal', 'desktop', ?, ?, 'horde', ?, ?)")
        .run(id, hordeScore(wave!, seconds! * 1000), seconds! * 1000, day, now, wave, kills);
    }
    const duel = await get(db, 'period=today');
    expect(duel.entries[0].id).toBe(1);
    expect(duel.entries.some((e) => e.id > 100)).toBe(false);
    const horde = await get(db, 'period=today&mode=horde');
    // Highest wave first; on the same wave, the quicker one.
    expect(horde.entries.map((e) => e.id)).toEqual([103, 102, 101]);
    expect(horde.entries.map((e) => e.kills)).toEqual([34, 33, null]);
  });

  it('filters by device: phones and tablets as mobile, computers as desktop', async () => {
    const db = board();
    db.raw.prepare("UPDATE scores SET category = 'desktop' WHERE id IN (2, 4)").run();
    db.raw.prepare("UPDATE scores SET category = 'tablet' WHERE id = 3").run();
    const desktop = await get(db, 'period=all&device=desktop');
    expect(desktop.entries.map((e) => e.id)).toEqual([2, 4]);
    const mobile = await get(db, 'period=all&device=mobile');
    expect(mobile.entries.slice(0, 3).map((e) => e.id)).toEqual([1, 3, 5]);
    // Unknown or `all` keeps everyone; the player's place counts only the filtered board.
    expect((await get(db, 'period=all&device=all')).entries[1].id).toBe(2);
    expect((await get(db, 'period=all&device=tv')).entries[1].id).toBe(2);
    expect((await get(db, 'period=all&device=mobile&mine=49')).me).toMatchObject({ rank: 47, entry: { id: 49 } });
  });

  it('reads only whole positive ids', () => {
    expect(parseMine('3,x,-1,3,1.5,8')).toEqual([3, 8]);
    expect(parseMine(null)).toEqual([]);
  });
});
