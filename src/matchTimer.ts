import { formatTime } from './leaderboard/score';
import { hourglassIcon } from './icons';
import { t } from './i18n';

/** What the timer reads each frame: the match's own clock, the same one the score and share card use. */
export interface TimerSource {
  readonly elapsedMs: number;
  /** Training and the tutorial have no time to beat, so the timer stays out of the way there. */
  readonly timed: boolean;
  /** Decided: the clock has stopped. */
  readonly over: boolean;
}

/**
 * The time of the match in play, top centre: level with the HUD where the row has room, just under it on phones.
 * It stops when the match is decided, so it reads the same time the victory card shows.
 */
export function mountMatchTimer(source: TimerSource) {
  const el = document.createElement('div');
  el.id = 'match-time';
  el.setAttribute('role', 'timer');
  el.setAttribute('aria-label', t.match.time);
  el.innerHTML = `${hourglassIcon()}<span></span>`;
  el.hidden = true;
  document.body.append(el);
  const text = el.querySelector('span')!;
  let shown = '';

  return {
    update() {
      el.hidden = !source.timed;
      if (el.hidden) return;
      // Running, it ticks over on each whole second like a clock; stopped, it rounds exactly like the victory card.
      const ms = source.over ? source.elapsedMs : Math.floor(source.elapsedMs / 1000) * 1000;
      const now = formatTime(ms);
      if (now !== shown) text.textContent = shown = now;
    },
  };
}
