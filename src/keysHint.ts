import { hasKeyboard, type MoveKey } from './keys';

const STORE = 'cirquimia.keys';
const SET_STORE = 'cirquimia.keyset';
type KeySet = 'letters' | 'arrows';
const LABELS: Record<KeySet, Record<MoveKey, string>> = {
  letters: { up: 'W', left: 'A', down: 'S', right: 'D' },
  arrows: { up: '↑', left: '←', down: '↓', right: '→' },
};

/**
 * Bare keycaps at the bottom left of desktop screens (where the touch stick sits on phones) that say the alchemist
 * walks with WASD. They show whichever set the player last used: pressing an arrow turns them into arrows, WASD
 * turns them back. Clearer until the player has walked with them, then as faint as the stick; the pressed key
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
  let set: KeySet = 'letters';
  try {
    if (localStorage.getItem(SET_STORE) === 'arrows') set = 'arrows';
  } catch {}
  const cap = (k: MoveKey) => `<kbd data-key="${k}"></kbd>`;
  el.innerHTML = `<span class="row">${cap('up')}</span><span class="row">${cap('left')}${cap('down')}${cap('right')}</span>`;
  const label = (next: KeySet) => {
    set = next;
    el.dataset.set = next;
    el.querySelectorAll<HTMLElement>('kbd').forEach((k) => (k.textContent = LABELS[next][k.dataset.key as MoveKey]));
  };
  label(set);
  document.body.append(el);

  return {
    press(key: MoveKey, down: boolean, code = '') {
      const next: KeySet = code.startsWith('Arrow') ? 'arrows' : 'letters';
      if (down && next !== set) {
        label(next);
        try {
          localStorage.setItem(SET_STORE, next);
        } catch {}
      }
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
