import { t } from './i18n';
import { phoneIcon } from './icons';
import { devHooks } from './devtools';

/** How long the screen must have been free of other notes before the desktop note shows. */
const CLEAR_MS = 3000;

/**
 * A small note at the top on where else the game plays.
 * - Mouse-only screens: "Also on your phone", once per visit, only after the tutorial and the WASD hint are behind
 *   and nothing else is on screen (`clear`); it shows for 5 s and goes away by itself.
 * - Touch screens held sideways: "plays best in portrait", which fades back into a watermark and stays.
 * It never takes a click.
 */
export function mountDeviceHint(clear: () => boolean) {
  const touch = matchMedia('(any-pointer: coarse)');
  const landscape = matchMedia('(orientation: landscape)');
  const el = document.createElement('div');
  el.id = 'device-hint';
  el.setAttribute('role', 'status');
  el.hidden = true;
  document.body.append(el);
  // The brief note is over once it has faded out.
  el.addEventListener('animationend', (e) => {
    if (e.animationName.startsWith('device-brief')) el.hidden = true;
  });

  let shown: 'touch' | 'portrait' | null = null;
  let toldDesktop = false;
  let clearSince = 0;
  let waiting = 0;

  const show = (hint: 'touch' | 'portrait') => {
    // Held sideways, the phone turns upright a few times to show what to do, then rests upright.
    el.innerHTML = `${phoneIcon(hint === 'portrait' ? 'turn' : '')}<span></span>`;
    el.querySelector('span')!.textContent = t.device[hint];
    el.classList.toggle('brief', hint === 'touch');
    el.hidden = false;
    // Restart the animation so a new hint is read clearly.
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  };

  const waitForClear = () => {
    if (waiting) return;
    waiting = window.setInterval(() => {
      if (shown !== 'touch') return stopWaiting();
      const now = performance.now();
      if (!clear()) return void (clearSince = 0);
      if (!clearSince) clearSince = now;
      if (now - clearSince < CLEAR_MS) return;
      stopWaiting();
      toldDesktop = true;
      show('touch');
    }, 250);
  };
  const stopWaiting = () => {
    clearInterval(waiting);
    waiting = 0;
    clearSince = 0;
  };

  const update = () => {
    const isTouch = touch.matches || navigator.maxTouchPoints > 0;
    const hint = !isTouch ? 'touch' : landscape.matches ? 'portrait' : null;
    if (hint === shown) return;
    shown = hint;
    el.hidden = true;
    if (hint === 'portrait') show('portrait');
    else if (hint === 'touch' && !toldDesktop) waitForClear();
  };
  // The dev panel can queue the desktop note again, to test it without a new visit.
  devHooks.desktopNote = {
    state: () => (shown !== 'touch' ? null : waiting ? 'queued' : toldDesktop),
    replay() {
      toldDesktop = false;
      if (shown === 'touch') waitForClear();
    },
  };
  touch.addEventListener('change', update);
  landscape.addEventListener('change', update);
  update();
}
