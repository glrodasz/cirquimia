import { describe, expect, it } from 'vitest';
import { GOLEM_HP, MAX_WAVE_SIZE, golemsThrough, hordeScore, waveOf, waveSize } from '../src/horde';
import { golemTuning, TUNING } from '../src/rivalMind';
import { plausibleHorde } from '../src/leaderboard/score';

describe('horde waves', () => {
  it('grow like Fibonacci, capped', () => {
    expect([1, 2, 3, 4, 5, 6, 7].map(waveSize)).toEqual([1, 2, 3, 5, 8, 13, 21]);
    expect(waveSize(20)).toBe(MAX_WAVE_SIZE);
    expect(golemsThrough(4)).toBe(1 + 2 + 3 + 5);
  });

  it('golems only cast earth and keep the player\'s limits', () => {
    for (const n of [1, 5, 10, 30]) {
      const g = golemTuning(n);
      expect(g.elemental + g.blast + g.star + g.heal + g.columns + g.guard + g.fortress).toBe(0);
      // Never faster than the alchemist (1.6), and the warning always leaves time to step out.
      expect(g.speed).toBeLessThanOrEqual(TUNING.experto.speed);
      expect(g.warn).toBeGreaterThanOrEqual(0.7);
      expect(g.stagger).toBeGreaterThan(0);
    }
    expect(golemTuning(30)).toEqual(golemTuning(10));
  });

  it('ranks the higher wave first, then the quicker run', () => {
    expect(hordeScore(6, 3_600_000)).toBeGreaterThan(hordeScore(5, 10_000));
    expect(hordeScore(5, 100_000)).toBeGreaterThan(hordeScore(5, 200_000));
    expect(waveOf(hordeScore(7, 1_234_000))).toBe(7);
  });

  it('only believes runs that cleared the waves before', () => {
    const cleared = golemsThrough(4) * GOLEM_HP; // reached wave 5
    expect(plausibleHorde(5, 240_000, cleared)).toBe(true);
    expect(plausibleHorde(5, 240_000, cleared + 300)).toBe(true); // hits on wave 5 itself
    expect(plausibleHorde(5, 240_000, cleared - 100)).toBe(false);
    expect(plausibleHorde(1, 60_000, 0)).toBe(false); // nothing cleared yet
    expect(plausibleHorde(5, 5_000, cleared)).toBe(false); // too fast for that much health
    expect(plausibleHorde(5.5, 240_000, cleared)).toBe(false);
  });

  it('counts the golems brought down only when they fit the waves and the damage', () => {
    const cleared = golemsThrough(4); // 11 golems down to reach wave 5
    const damage = cleared * GOLEM_HP + 2 * GOLEM_HP; // and two more of wave 5
    expect(plausibleHorde(5, 240_000, damage, cleared + 2)).toBe(true);
    expect(plausibleHorde(5, 240_000, damage)).toBe(true); // older games send no count
    expect(plausibleHorde(5, 240_000, damage, cleared - 1)).toBe(false); // fewer than the cleared waves
    expect(plausibleHorde(5, 240_000, damage, cleared + 3)).toBe(false); // more than the damage could fell
    expect(plausibleHorde(5, 240_000, golemsThrough(5) * GOLEM_HP, golemsThrough(5))).toBe(true); // fell with the last one
    expect(plausibleHorde(5, 240_000, golemsThrough(5) * GOLEM_HP + 2, golemsThrough(5) + 1)).toBe(false); // past the wave
    expect(plausibleHorde(5, 240_000, damage, 12.5)).toBe(false);
  });
});
