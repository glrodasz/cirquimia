import { t } from './i18n';

const PHONE = '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>';
const ROTATE = '<rect x="7" y="2.5" width="10" height="19" rx="2" transform="rotate(-90 12 12)" opacity=".4"/><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M19.5 5.5a8 8 0 0 1 1 4.5l-1.6-1.4"/>';

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
    el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${hint === 'touch' ? PHONE : ROTATE}</svg><span></span>`;
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
