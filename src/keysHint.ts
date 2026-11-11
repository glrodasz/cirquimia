import { t } from './i18n';
import { hasKeyboard, type MoveKey } from './keys';

const STORE = 'cirquimia.keys';
const LABELS: Record<MoveKey, string> = { up: 'W', left: 'A', down: 'S', right: 'D' };

/**
 * Keycaps at the bottom of desktop screens that say the alchemist walks with WASD or the arrows. Clear until the
 * player has walked with them (then it settles into a faint watermark, also on later visits); the pressed key
 * lights up. Never takes a click. `settled` tells the notes that queue after it (the device hint) when it is done.
 */
export function mountKeysHint() {
  if (!hasKeyboard()) return { press: () => {}, settled: () => true };
  let used = false;
  let settled = false;
  try {
    used = localStorage.getItem(STORE) === '1';
  } catch {}
  const el = document.createElement('div');
  el.id = 'keys-hint';
  el.setAttribute('aria-hidden', 'true');
  if (used) el.classList.add('used');
  settled = used;
  // A player who only ever clicks has seen the keycaps long enough after a minute.
  if (!used) setTimeout(() => (settled = true), 60_000);
  const cap = (k: MoveKey) => `<kbd data-key="${k}">${LABELS[k]}</kbd>`;
  el.innerHTML =
    `<span class="caps"><span class="row">${cap('up')}</span><span class="row">${cap('left')}${cap('down')}${cap('right')}</span></span>` +
    `<span class="label"></span>`;
  el.querySelector('.label')!.textContent = t.keys.hint;
  document.body.append(el);

  return {
    press(key: MoveKey, down: boolean) {
      el.querySelector(`[data-key="${key}"]`)?.classList.toggle('on', down);
      if (!down || used) return;
      used = true;
      try {
        localStorage.setItem(STORE, '1');
      } catch {}
      // Stay readable a moment after the first step, then fade back.
      setTimeout(() => {
        el.classList.add('used');
        settled = true;
      }, 2500);
    },
    /** The keycaps have done their job (walked with, now a watermark): other notes may follow. */
    settled: () => settled,
  };
}
