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
  /** Horde: the wave in play and how many of its golems are still to fall; null in a duel. */
  readonly wave: { wave: number; left: number } | null;
}

/**
 * The time of the match in play: top centre, level with the HUD, where the row has room; bottom right on phones.
 * It stops when the match is decided, so it reads the same time the victory card shows. In the horde the same
 * plaque also carries the wave, and how many golems of it are left.
 */
export function mountMatchTimer(source: TimerSource) {
  const el = document.createElement('div');
  el.id = 'match-time';
  el.setAttribute('role', 'timer');
  el.setAttribute('aria-label', t.match.time);
  el.innerHTML = `<span class="wave" hidden><b></b><i></i></span>${hourglassIcon()}<span class="clock"></span>`;
  el.hidden = true;
  document.body.append(el);
  const text = el.querySelector<HTMLElement>('.clock')!;
  const wave = el.querySelector<HTMLElement>('.wave')!;
  const waveN = wave.querySelector('b')!;
  const waveLeft = wave.querySelector('i')!;
  let shown = '';
  let shownWave = '';

  return {
    update() {
      el.hidden = !source.timed;
      if (el.hidden) return;
      // Running, it ticks over on each whole second like a clock; stopped, it rounds exactly like the victory card.
      const ms = source.over ? source.elapsedMs : Math.floor(source.elapsedMs / 1000) * 1000;
      const now = formatTime(ms);
      if (now !== shown) text.textContent = shown = now;
      const w = source.wave;
      wave.hidden = !w;
      const label = w ? `${w.wave}|${w.left}` : '';
      if (w && label !== shownWave) {
        shownWave = label;
        waveN.textContent = t.match.wave(w.wave);
        waveLeft.textContent = t.match.waveLeft(w.left);
      }
    },
  };
}

/** The horde's wave, called out big in the middle of the meadow for a moment before it walks in. */
export function mountWaveBanner() {
  const el = document.createElement('div');
  el.id = 'wave-banner';
  el.setAttribute('aria-live', 'polite');
  el.hidden = true;
  document.body.append(el);
  let timer = 0;
  return {
    show(n: number) {
      el.textContent = t.match.wave(n);
      el.hidden = false;
      el.classList.remove('show');
      void el.offsetWidth;
      el.classList.add('show');
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        el.classList.remove('show');
        el.hidden = true;
      }, 2200);
    },
  };
}
