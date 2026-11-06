/**
 * Touch stick for phones and tablets: a faint ring at the bottom left. Press and hold inside it and the alchemist
 * walks toward the finger, relative to the screen like WASD. Tapping the ground to walk still works; the stick is
 * just another way. It is its own element, so the canvas never sees these touches and they never become ink.
 */

/** Finger offset (px, screen y down) inside a ring of `radius` px → walk intent (x right, y up), unit length or zero. */
export function padAxes(dx: number, dy: number, radius: number, deadZone = 0.22) {
  const len = Math.hypot(dx, dy);
  if (!radius || len < radius * deadZone) return { x: 0, y: 0 };
  return { x: dx / len, y: -dy / len };
}

/** The screens that most likely have no keyboard: a finger drives them. */
export const isTouch = () => matchMedia('(pointer: coarse)').matches;

export function mountPad() {
  let a = { x: 0, y: 0 };
  if (!isTouch() || new URLSearchParams(location.search).get('pad') === '0') return { axes: () => a };

  const el = document.createElement('div');
  el.id = 'pad';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="knob"></span>';
  document.body.append(el);
  const knob = el.querySelector<HTMLElement>('.knob')!;
  let finger: number | null = null;

  const follow = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const radius = r.width / 2;
    let dx = e.clientX - (r.left + radius);
    let dy = e.clientY - (r.top + radius);
    a = padAxes(dx, dy, radius);
    // The knob stays inside the ring however far the finger slides.
    const len = Math.hypot(dx, dy);
    const reach = radius * 0.55;
    if (len > reach) {
      dx *= reach / len;
      dy *= reach / len;
    }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const end = (e: PointerEvent) => {
    if (e.pointerId !== finger) return;
    finger = null;
    a = { x: 0, y: 0 };
    knob.style.transform = '';
    el.classList.remove('on');
  };

  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (finger !== null) return;
    finger = e.pointerId;
    el.setPointerCapture(e.pointerId);
    el.classList.add('on');
    follow(e);
  });
  el.addEventListener('pointermove', (e) => e.pointerId === finger && follow(e));
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('lostpointercapture', end);
  el.addEventListener('touchstart', (e) => e.cancelable && e.preventDefault(), { passive: false });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    finger = null;
    a = { x: 0, y: 0 };
    knob.style.transform = '';
    el.classList.remove('on');
  });

  return { axes: () => a };
}
