import { describe, expect, it } from 'vitest';
import type { D1Database, D1Statement } from './server';
import { renameScore, startRun, submitScore } from './server';

interface DatabaseSync {
  exec(sql: string): void;
  prepare(sql: string): { get(...a: unknown[]): unknown; all(...a: unknown[]): unknown[]; run(...a: unknown[]): { changes: number | bigint } };
}
const sqlite = 'node:sqlite';
const { DatabaseSync } = (await import(/* @vite-ignore */ sqlite)) as { DatabaseSync: new (path: string) => DatabaseSync };

/** A D1 stand-in over node:sqlite that runs the real schema and migrations (server.ts ensureSchema). */
function memoryD1(): D1Database & { raw: DatabaseSync } {
  const raw = new DatabaseSync(':memory:');
  const statement = (sql: string, args: unknown[] = []): D1Statement => ({
    bind: (...values) => statement(sql, values),
    first: async <T>() => (raw.prepare(sql).get(...(args as never[])) as T) ?? null,
    all: async <T>() => ({ results: raw.prepare(sql).all(...(args as never[])) as T[] }),
    run: async () => ({ meta: { changes: Number(raw.prepare(sql).run(...(args as never[])).changes) } }),
  });
  return { raw, prepare: (sql) => statement(sql), batch: async (list) => Promise.all(list.map((s) => s.run())) };
}

const db = memoryD1();
const ctx = (method: string, path: string, body: unknown, ip = '1.2.3.4') =>
  ({
    request: new Request(`https://cirquimia.pages.dev/api/${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': ip },
      body: JSON.stringify(body),
    }),
    env: { DB: db },
  }) as never;

async function won(initials?: string) {
  const run = (await (await startRun(ctx('POST', 'runs', { rivals: 1, difficulty: 'normal' }))).json()) as { id: string };
  // Pretend the run opened a minute ago, so a 40 s match is plausible.
  db.raw.prepare('UPDATE runs SET created_at = ? WHERE id = ?').run(Date.now() - 60_000, run.id);
  const res = await submitScore(ctx('POST', 'scores', { runId: run.id, initials, durationMs: 40_000, damage: 100 }));
  return { runId: run.id, status: res.status, body: (await res.json()) as { id: number; initials: string; anonymous: boolean } };
}

const row = (id: number) => db.raw.prepare('SELECT initials, anonymous FROM scores WHERE id = ?').get(id) as { initials: string; anonymous: number };
const rename = async (runId: string, initials: string) => (await renameScore(ctx('PATCH', 'scores', { runId, initials }))).status;

describe('every won match is saved', () => {
  it('saves a nameless match as ANON, flagged anonymous', async () => {
    const { status, body } = await won();
    expect(status).toBe(201);
    expect(body).toMatchObject({ initials: 'ANON', anonymous: true });
    expect(row(body.id)).toEqual({ initials: 'ANON', anonymous: 1 });
  });

  it('keeps a player really called ANON apart from an anonymous score', async () => {
    const { body } = await won('ANON');
    expect(body.anonymous).toBe(false);
    expect(row(body.id)).toEqual({ initials: 'ANON', anonymous: 0 });
  });

  it('renames the score just saved, and clears the anonymous flag', async () => {
    const { runId, body } = await won();
    expect(await rename(runId, 'GLR')).toBe(200);
    expect(row(body.id)).toEqual({ initials: 'GLR', anonymous: 0 });
    // Same name again: nothing to write, still fine.
    expect(await rename(runId, 'GLR')).toBe(200);
  });

  it('names an anonymous score ANON for real', async () => {
    const { runId, body } = await won();
    expect(await rename(runId, 'ANON')).toBe(200);
    expect(row(body.id)).toEqual({ initials: 'ANON', anonymous: 0 });
  });

  it('refuses bad initials, unknown runs and old scores', async () => {
    const { runId, body } = await won('AB');
    expect(await rename(runId, 'no!')).toBe(400);
    expect(await rename('not-a-run', 'GLR')).toBe(409);
    db.raw.prepare('UPDATE scores SET created_at = ? WHERE id = ?').run(Date.now() - 2 * 60 * 60 * 1000, body.id);
    expect(await rename(runId, 'GLR')).toBe(409);
    expect(row(body.id).initials).toBe('AB');
  });
});
