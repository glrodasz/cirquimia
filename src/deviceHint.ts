import { t } from './i18n';
import { phoneIcon } from './icons';

/**
 * A small watermark at the top that says where the game plays best: on a touch screen, held upright.
 * Mouse-only screens get the touch hint, touch screens held sideways the portrait one. Each appears clear,
 * then fades back and stays; it never takes a tap.
 */
export function mountDeviceHint() {
  const touch = matchMedia('(any-pointer: coarse)');
  const landscape = matchMedia('(orientation: landscape)');
  const el = document.createElement('div');
  el.id = 'device-hint';
  el.setAttribute('role', 'status');
  el.hidden = true;
  document.body.append(el);

  let shown: 'touch' | 'portrait' | null = null;
  const update = () => {
    const isTouch = touch.matches || navigator.maxTouchPoints > 0;
    const hint = !isTouch ? 'touch' : landscape.matches ? 'portrait' : null;
    if (hint === shown) return;
    shown = hint;
    el.hidden = !hint;
    if (!hint) return;
    // Held sideways, the phone turns upright a few times to show what to do, then rests upright.
    el.innerHTML = `${phoneIcon(hint === 'portrait' ? 'turn' : '')}<span></span>`;
    el.querySelector('span')!.textContent = t.device[hint];
    // Restart the fade so a new hint is read clearly before it settles into a watermark.
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  };
  touch.addEventListener('change', update);
  landscape.addEventListener('change', update);
  update();
}
