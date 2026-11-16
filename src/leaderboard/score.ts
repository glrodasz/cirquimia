/**
 * The global ranking's rules, shared by the game and the server (functions/api), so both agree on every score.
 * Only won matches against rivals count: training (no rivals) and the tutorial never reach the ranking.
 */
import type { Difficulty } from '../combat';
import { GOLEM_HP, MAX_WAVE, golemsThrough } from '../horde';
export { hordeScore, waveOf } from '../horde';

/** Each mode has its own boards: the duel's points, and the horde's wave reached and time. */
export type BoardMode = 'duel' | 'horde';
export const BOARD_MODES: BoardMode[] = ['duel', 'horde'];
export const isBoardMode = (v: unknown): v is BoardMode => v === 'duel' || v === 'horde';

/** The ranking's device filter: everyone, or only phones, tablets or computers (a score's `category`). */
export type DeviceFilter = 'all' | 'mobile' | 'tablet' | 'desktop';
export const DEVICE_FILTERS: DeviceFilter[] = ['all', 'mobile', 'tablet', 'desktop'];
export const isDeviceFilter = (v: unknown): v is DeviceFilter => (DEVICE_FILTERS as unknown[]).includes(v);

/** How much each difficulty multiplies the score. */
export const LEVEL_FACTOR: Record<Difficulty, number> = { facil: 1, normal: 1.5, dificil: 2, experto: 3, hardcore: 4 };
export const LEVELS = Object.keys(LEVEL_FACTOR) as Difficulty[];
export const MIN_RIVALS = 1;
export const MAX_RIVALS = 4;

/**
 * Points come from the damage the alchemist itself dealt, not from how many rivals fell: in a free-for-all
 * the rivals also knock each other down, and that should not score for the player.
 * 100 damage (one rival's health) on Easy in 30 s is 1 000 points; faster gives more, slower less.
 */
const PER_DAMAGE = 600;
/** Added to the seconds so a couple of seconds less never makes the score explode. */
const PAD_SECONDS = 30;

/** No won match is shorter than this. */
export const MIN_SECONDS = 4;
/** Nobody deals damage faster than this on average (a blast is 45 and every cast needs a drawing). */
export const MAX_DAMAGE_PER_SECOND = 40;
/** A rival has 100 health but can heal, so the alchemist may take off more than that; never this much. */
export const MAX_DAMAGE_PER_RIVAL = 300;
/** Hardcore rivals heal early and nearly always, so a long fight against one can take off far more. */
export const MAX_DAMAGE_PER_HARDCORE_RIVAL = 900;
/** A match longer than this is not a run worth ranking (and keeps durations sane). */
export const MAX_SECONDS = 30 * 60;

export function isDifficulty(v: unknown): v is Difficulty {
  return typeof v === 'string' && (LEVELS as string[]).includes(v);
}

/** points = damage dealt × difficulty × 600 / (seconds + 30), rounded. */
export function scoreFor(damage: number, difficulty: Difficulty, durationMs: number): number {
  const seconds = Math.max(0, durationMs) / 1000;
  return Math.round((Math.max(0, damage) * LEVEL_FACTOR[difficulty] * PER_DAMAGE) / (seconds + PAD_SECONDS));
}

/** Whether a won match could really have happened: rival count, level, a plausible duration and damage. */
export function plausible(rivals: unknown, difficulty: unknown, durationMs: unknown, damage: unknown): boolean {
  if (!Number.isInteger(rivals) || (rivals as number) < MIN_RIVALS || (rivals as number) > MAX_RIVALS) return false;
  if (!isDifficulty(difficulty)) return false;
  if (typeof durationMs !== 'number' || !Number.isFinite(durationMs)) return false;
  const perRival = difficulty === 'hardcore' ? MAX_DAMAGE_PER_HARDCORE_RIVAL : MAX_DAMAGE_PER_RIVAL;
  if (!Number.isInteger(damage) || (damage as number) < 1 || (damage as number) > (rivals as number) * perRival) return false;
  const seconds = durationMs / 1000;
  return seconds >= MIN_SECONDS && seconds <= MAX_SECONDS && (damage as number) <= seconds * MAX_DAMAGE_PER_SECOND;
}

/** A horde night can run long; the run itself expires after three hours. */
export const MAX_HORDE_SECONDS = 2.5 * 60 * 60;

/**
 * Whether a horde run could really have happened: wave `wave` reached (every wave before it cleared, so from 2 on)
 * after `durationMs` of play, with `damage` dealt by the alchemist. Golems never heal and never hurt each other,
 * so the damage is at least every cleared golem's health, and at most that plus the wave in play.
 * `kills` (golems brought down) is checked when sent; games from before it was counted leave it out.
 */
export function plausibleHorde(wave: unknown, durationMs: unknown, damage: unknown, kills?: unknown): boolean {
  if (!Number.isInteger(wave) || (wave as number) < 2 || (wave as number) > MAX_WAVE) return false;
  if (typeof durationMs !== 'number' || !Number.isFinite(durationMs)) return false;
  if (!Number.isInteger(damage)) return false;
  const cleared = golemsThrough((wave as number) - 1) * GOLEM_HP;
  const most = golemsThrough(wave as number) * GOLEM_HP;
  const seconds = durationMs / 1000;
  if (seconds < MIN_SECONDS || seconds > MAX_HORDE_SECONDS) return false;
  if ((damage as number) < cleared - 2 || (damage as number) > most + 2 || cleared > seconds * MAX_DAMAGE_PER_SECOND) return false;
  return kills === undefined || plausibleKills(wave as number, damage as number, kills);
}

/**
 * Golems brought down in a horde that reached wave `wave`: every golem of the cleared waves, plus some of the wave in
 * play (all of it only if the alchemist fell on the same frame as its last golem). Only the alchemist hurts golems and
 * they never heal, so each one down took GOLEM_HP of the damage dealt.
 */
export function plausibleKills(wave: number, damage: number, kills: unknown): boolean {
  if (!Number.isInteger(kills)) return false;
  const n = kills as number;
  return n >= golemsThrough(wave - 1) && n <= golemsThrough(wave) && n * GOLEM_HP <= damage + 2;
}

/** Letters (Ñ included) and digits, up to four, like an arcade cabinet. */
export const INITIALS_LENGTH = 4;
const INITIALS = /^[A-ZÑ0-9]{1,4}$/;

/** What a score nobody named is saved as; the row's anonymous flag tells it apart from a player called ANON. */
export const ANONYMOUS_INITIALS = 'ANON';

/** Upper-cases and strips anything that is not a letter or digit; the result may still be empty. */
export function cleanInitials(raw: string): string {
  return raw
    .normalize('NFC')
    .toUpperCase()
    .replace(/[^A-ZÑ0-9]/g, '')
    .slice(0, INITIALS_LENGTH);
}

export function validInitials(v: unknown): v is string {
  return typeof v === 'string' && INITIALS.test(v);
}

/** m:ss, or h:mm:ss past the hour. */
export function formatTime(durationMs: number): string {
  const total = Math.max(0, Math.round(durationMs / 1000));
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600);
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
}

/** The UTC day a score belongs to, for the "today" board. */
export function dayOf(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** When the UTC week holding `ms` began (Monday 00:00 UTC), for the "this week" board. */
export function weekStart(ms: number): number {
  const d = new Date(ms);
  const midnight = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return midnight - ((d.getUTCDay() + 6) % 7) * 24 * 60 * 60 * 1000;
}

/** When the UTC month holding `ms` began (the 1st, 00:00 UTC), for the "this month" board. */
export function monthStart(ms: number): number {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
}
