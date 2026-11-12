/**
 * The game's side of the global ranking: opens a run on the server when a ranked match starts,
 * sends the score when it is won, and reads the board. Everything fails soft: offline, in the
 * single-file build or before the database exists, the game just says the ranking is unavailable.
 */
import type { Difficulty } from '../combat';
import { LANG } from '../i18n';
import { API_BASE } from '../platform';
import { cleanInitials, validInitials } from './score';
import type { Category } from './device';

const API = API_BASE;
const INITIALS_STORE = 'cirquimia.initials';
const MINE_STORE = 'cirquimia.myscores';

export interface Entry {
  id: number;
  initials: string;
  score: number;
  durationMs: number;
  damage: number;
  rivals: number;
  difficulty: Difficulty;
  category: Category;
  at: number;
}

export interface Submitted {
  id: number | null;
  score: number;
  durationMs: number;
  damage: number;
  rivals: number;
  difficulty: Difficulty;
  category: Category;
  rank: { today: number; all: number };
  total: { today: number; all: number };
  /** The score's share link, whose preview is its card. */
  share?: string;
}

export type Period = 'today' | 'all';
export type Failure = 'unavailable' | 'too-many' | 'rejected';

async function call<T>(path: string, init?: RequestInit): Promise<T | Failure> {
  try {
    const res = await fetch(API + path, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } });
    if (res.status === 429) return 'too-many';
    if (res.status >= 400 && res.status < 500) return 'rejected';
    if (!res.ok || !(res.headers.get('Content-Type') ?? '').includes('json')) return 'unavailable';
    return (await res.json()) as T;
  } catch {
    return 'unavailable';
  }
}

export const failed = (v: unknown): v is Failure => typeof v === 'string';

/** Opens runs as matches start; only the latest one counts, and a burst of restarts opens just one. */
export class Runs {
  private pending: Promise<string | null> = Promise.resolve(null);
  private timer = 0;
  private match = 0;

  /** A match started; `ranked` says whether its victory may enter the ranking. */
  start(rivals: number, difficulty: Difficulty, ranked: boolean) {
    const match = ++this.match;
    clearTimeout(this.timer);
    if (!ranked) {
      this.pending = Promise.resolve(null);
      return;
    }
    let resolve: (id: string | null) => void = () => {};
    this.pending = new Promise((r) => (resolve = r));
    // Changing rivals and difficulty restarts the match more than once in a row: wait for it to settle.
    this.timer = window.setTimeout(async () => {
      const res = await call<{ id: string }>('/runs', { method: 'POST', body: JSON.stringify({ rivals, difficulty }) });
      resolve(match === this.match && !failed(res) ? res.id : null);
    }, 300);
  }

  /** The run of the match that just ended, or null when it does not count or could not be opened. */
  current() {
    return this.pending;
  }
}

/** What the browser says about the device, beyond the user agent the server reads itself. */
async function hints() {
  type UAData = { mobile?: boolean; platform?: string; getHighEntropyValues?(h: string[]): Promise<{ model?: string; platformVersion?: string }> };
  const data = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
  let extra: { model?: string; platformVersion?: string } = {};
  try {
    extra = (await data?.getHighEntropyValues?.(['model', 'platformVersion'])) ?? {};
  } catch {
    // Not offered: the user agent will have to do.
  }
  return {
    touchPoints: navigator.maxTouchPoints ?? 0,
    mobile: data?.mobile,
    platform: data?.platform,
    shortSide: Math.min(screen.width, screen.height),
    model: extra.model || undefined,
    osVersion: extra.platformVersion || undefined,
  };
}

export async function submitScore(runId: string, initials: string, durationMs: number, damage: number) {
  const body = {
    runId,
    initials,
    durationMs,
    damage,
    hints: await hints(),
    screen: `${screen.width}x${screen.height}@${Math.round(devicePixelRatio * 100) / 100}`,
    locale: LANG,
  };
  const res = await call<Submitted>('/scores', { method: 'POST', body: JSON.stringify(body) });
  if (!failed(res) && res.id !== null) rememberMine(res.id);
  return res;
}

export function fetchBoard(period: Period) {
  return call<{ period: Period; day: string; entries: Entry[] }>(`/scores?period=${period}`);
}

export function savedInitials(): string {
  try {
    const v = cleanInitials(localStorage.getItem(INITIALS_STORE) ?? '');
    return validInitials(v) ? v : '';
  } catch {
    return '';
  }
}

export function saveInitials(v: string) {
  try {
    localStorage.setItem(INITIALS_STORE, v);
  } catch {
    // Blocked storage: asked again next time.
  }
}

/** Ids of the scores sent from this device, to highlight them on the board. */
export function myScores(): Set<number> {
  try {
    const ids = JSON.parse(localStorage.getItem(MINE_STORE) ?? '[]');
    return new Set(Array.isArray(ids) ? ids.filter((n) => Number.isInteger(n)) : []);
  } catch {
    return new Set();
  }
}

function rememberMine(id: number) {
  try {
    const ids = [...myScores(), id].slice(-100);
    localStorage.setItem(MINE_STORE, JSON.stringify(ids));
  } catch {
    // Blocked storage: the row just won't be highlighted.
  }
}

/** Uploads the wide card of a saved score, the preview of its share link; false when the server refused. */
export async function uploadCard(runId: string, image: Blob): Promise<boolean> {
  const form = new FormData();
  form.set('runId', runId);
  form.set('image', image, 'card.jpg');
  try {
    return (await fetch(`${API}/shares`, { method: 'POST', body: form })).ok;
  } catch {
    return false;
  }
}
