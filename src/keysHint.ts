import { t } from './i18n';
import { hasKeyboard, type MoveKey } from './keys';

const STORE = 'cirquimia.keys';
const LABELS: Record<MoveKey, string> = { up: 'W', left: 'A', down: 'S', right: 'D' };

/**
 * Keycaps at the bottom of desktop screens that say the alchemist walks with WASD or the arrows. Clear until the
 * player has walked with them (then it settles into a faint watermark, also on later visits); the pressed key
 * lights up. Never takes a click.
 */
export function mountKeysHint() {
  if (!hasKeyboard()) return { press: () => {} };
  let used = false;
  try {
    used = localStorage.getItem(STORE) === '1';
  } catch {}
  const el = document.createElement('div');
  el.id = 'keys-hint';
  el.setAttribute('aria-hidden', 'true');
  if (used) el.classList.add('used');
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
      setTimeout(() => el.classList.add('used'), 2500);
    },
  };
}
