/**
 * The challenger's match as it travels in a share link's redirect to the game: `?reto=<rivals>.<level>.<seed>`.
 * The seed is left out for scores saved before it was recorded. Read by src/challenge.ts.
 */
import type { Difficulty } from '../combat';
import { MAX_RIVALS, MIN_RIVALS, isDifficulty } from './score';

export const CHALLENGE_PARAM = 'reto';
/** Meadow seeds are short base-36 strings (generator.ts randomSeed); anything else is not worth replaying. */
export const SEED_PATTERN = /^[0-9a-z]{1,16}$/i;

export interface Challenge {
  rivals: number;
  difficulty: Difficulty;
  /** The challenger's meadow; null on old links. */
  seed: string | null;
}

export const validSeed = (seed: unknown): seed is string => typeof seed === 'string' && SEED_PATTERN.test(seed);

export function challengeValue(rivals: number, difficulty: string, seed: string | null) {
  return [rivals, difficulty, ...(validSeed(seed) ? [seed] : [])].join('.');
}

export function parseChallenge(value: string | null): Challenge | null {
  if (!value) return null;
  const [count, difficulty, seed] = value.split('.');
  const rivals = Number(count);
  if (!Number.isInteger(rivals) || rivals < MIN_RIVALS || rivals > MAX_RIVALS || !isDifficulty(difficulty)) return null;
  return { rivals, difficulty, seed: validSeed(seed) ? seed : null };
}
