/**
 * The global ranking's rules, shared by the game and the server (functions/api), so both agree on every score.
 * Only won matches against rivals count: training (no rivals) and the tutorial never reach the ranking.
 */
import type { Difficulty } from '../combat';

/** How much each difficulty multiplies the score. */
export const LEVEL_FACTOR: Record<Difficulty, number> = { facil: 1, normal: 1.5, dificil: 2, experto: 3 };
export const LEVELS = Object.keys(LEVEL_FACTOR) as Difficulty[];
export const MIN_RIVALS = 1;
export const MAX_RIVALS = 2;

/** Points for one rival on Easy beaten in 30 s; beating them faster gives more, slower gives less. */
const BASE = 60_000;
/** Added to the seconds so a couple of seconds less never makes the score explode. */
const PAD_SECONDS = 30;

/** Below this many seconds per rival nobody can have won: five strikes each take longer than that. */
export const MIN_SECONDS_PER_RIVAL = 4;
/** A match longer than this is not a run worth ranking (and keeps durations sane). */
export const MAX_SECONDS = 30 * 60;

export function isDifficulty(v: unknown): v is Difficulty {
  return typeof v === 'string' && (LEVELS as string[]).includes(v);
}

/** points = rivals × difficulty × 60 000 / (seconds + 30), rounded. */
export function scoreFor(rivals: number, difficulty: Difficulty, durationMs: number): number {
  const seconds = Math.max(0, durationMs) / 1000;
  return Math.round((rivals * LEVEL_FACTOR[difficulty] * BASE) / (seconds + PAD_SECONDS));
}

/** Whether a won match could really have happened: rival count, level and a plausible duration. */
export function plausible(rivals: unknown, difficulty: unknown, durationMs: unknown): boolean {
  if (!Number.isInteger(rivals) || (rivals as number) < MIN_RIVALS || (rivals as number) > MAX_RIVALS) return false;
  if (!isDifficulty(difficulty)) return false;
  if (typeof durationMs !== 'number' || !Number.isFinite(durationMs)) return false;
  return durationMs >= (rivals as number) * MIN_SECONDS_PER_RIVAL * 1000 && durationMs <= MAX_SECONDS * 1000;
}

/** Letters (Ñ included) and digits, up to four, like an arcade cabinet. */
export const INITIALS_LENGTH = 4;
const INITIALS = /^[A-ZÑ0-9]{1,4}$/;

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
