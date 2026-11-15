import { mountHelp } from '../../src/help';
import { mountSoundButton } from '../../src/soundButton';
import { mountMatchControls, type Mode } from '../../src/match';
import { mountMatchTimer } from '../../src/matchTimer';
import { mountLeaderboard } from '../../src/leaderboard/ui';
import type { Difficulty } from '../../src/combat';

/** A match the HUD can read and restart, without a game behind it. */
export class FakeMatch {
  mode: Mode = 'duel';
  rivals = 2;
  difficulty: Difficulty = 'normal';
  elapsedMs = 83_000;
  over = false;
  wave: { wave: number; left: number } | null = null;
  restarts = 0;

  set(mode: Mode, rivals?: number, difficulty?: Difficulty) {
    this.mode = mode;
    if (rivals) this.rivals = rivals;
    if (difficulty) this.difficulty = difficulty;
  }

  restart() {
    this.restarts++;
    this.elapsedMs = 0;
  }

  get timed() {
    return this.mode !== 'training';
  }
}

/** The whole HUD, mounted in the game's order (src/main.ts), so the buttons on the right lay out as they do there. */
export function mountHud(match: FakeMatch) {
  const help = mountHelp();
  const sound = mountSoundButton();
  const controls = mountMatchControls(match);
  const timer = mountMatchTimer(match);
  const board = mountLeaderboard();
  // The clock ticks, as in a match.
  let last = performance.now();
  const tick = (now: number) => {
    if (!match.over && match.timed) match.elapsedMs += now - last;
    last = now;
    timer.update();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  dispatchEvent(new Event('resize'));
  return { help, sound, controls, timer, board };
}

/** Saved state the HUD reads at mount: the mode, rivals and level (src/match.ts STORE). */
export function savedMatch(mode: Mode, rivals: number, difficulty: Difficulty, battle: 'duel' | 'horde' = mode === 'horde' ? 'horde' : 'duel') {
  localStorage.setItem('cirquimia.match', JSON.stringify({ mode, battle, rivals, difficulty }));
}
