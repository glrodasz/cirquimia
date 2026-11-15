/**
 * Horde: the alchemist alone against waves of stone golems that only strike with earth (the square).
 * The rules live here, free of the scene (and of any import), so the game, the server and the tests agree on them.
 * How a golem plays is golemTuning in rivalMind.ts.
 */

/** Wave sizes follow Fibonacci (1, 2, 3, 5, 8, 13…), up to this many golems in one wave. */
export const MAX_WAVE_SIZE = 34;
/**
 * At most this many golems on the meadow at once; the rest of the wave walks in as others fall. Keeps phones smooth
 * (every golem is a full character with its own bar) and keeps the crowd readable.
 */
export const MAX_ALIVE = 8;
/** Seconds between two golems walking in, so a wave arrives as a stream, not a wall. */
export const SPAWN_GAP = 0.7;
/** Seconds of calm before a wave: the banner shows and the alchemist catches its breath. */
export const WAVE_PAUSE = 2.6;
/** Health the alchemist gets back when a wave is cleared (never above full). */
export const WAVE_HEAL = 30;
/** A golem has the same health as any alchemist. */
export const GOLEM_HP = 100;
/** Highest wave the ranking believes (the sizes alone make anything past it a very long night). */
export const MAX_WAVE = 40;

/** How many golems wave `n` (from 1) brings: 1, 2, 3, 5, 8, 13… capped at MAX_WAVE_SIZE. */
export function waveSize(n: number): number {
  if (n < 1) return 0;
  let a = 1;
  let b = 2;
  for (let i = 1; i < n; i++) [a, b] = [b, a + b];
  return Math.min(a, MAX_WAVE_SIZE);
}

/** Golems the alchemist has to bring down to clear waves 1 to `n`. */
export function golemsThrough(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) total += waveSize(i);
  return total;
}

/**
 * The horde's ranking: the higher the wave reached, the better; on the same wave, the sooner the better.
 * Reaching wave `n` means clearing every wave before it, so a run counts from wave 2 on.
 * Stored as one number so the boards sort it like any score: wave × 100 000 − seconds it took.
 */
export const HORDE_WAVE_UNIT = 100_000;
export function hordeScore(wave: number, durationMs: number): number {
  const seconds = Math.min(HORDE_WAVE_UNIT - 1, Math.max(0, Math.round(durationMs / 1000)));
  return wave * HORDE_WAVE_UNIT - seconds;
}

/** The wave a horde score was reached on. */
export function waveOf(score: number): number {
  return Math.ceil(score / HORDE_WAVE_UNIT);
}
