/**
 * The global ranking's rules, shared by the game and the server (functions/api), so both agree on every score.
 * Only won matches against rivals count: training (no rivals) and the tutorial never reach the ranking.
 */
import type { Difficulty } from '../combat';

/** How much each difficulty multiplies the score. */
export const LEVEL_FACTOR: Record<Difficulty, number> = { facil: 1, normal: 1.5, dificil: 2, experto: 3 };
export const LEVELS = Object.keys(LEVEL_FACTOR) as Difficulty[];
export const MIN_RIVALS = 1;
export const MAX_RIVALS = 3;

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
  if (!Number.isInteger(damage) || (damage as number) < 1 || (damage as number) > (rivals as number) * MAX_DAMAGE_PER_RIVAL) return false;
  const seconds = durationMs / 1000;
  return seconds >= MIN_SECONDS && seconds <= MAX_SECONDS && (damage as number) <= seconds * MAX_DAMAGE_PER_SECOND;
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
