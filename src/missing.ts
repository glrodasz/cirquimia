import { shapeIcon } from './ammo';
import { crossIcon, dropIcon, flameIcon } from './icons';

const SHOW = 1100; // ms

/**
 * A refused symbol, struck through where it was drawn: the fire or water a triangle drawn away from any campfire or
 * lagoon needed, or the wall a circle cannot raise inside a rune circle.
 */
export function showMissingSource(element: 'fire' | 'water' | 'wall', x: number, y: number) {
  const el = document.createElement('div');
  el.className = `nosource ${element}`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.innerHTML = (element === 'wall' ? shapeIcon('circle') : element === 'fire' ? flameIcon() : dropIcon()) + crossIcon();
  document.body.append(el);
  el.animate(
    [
      { transform: 'translate(-50%, -50%) scale(.6)', opacity: 0 },
      { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 1, offset: 0.15 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: 0.7 },
      { transform: 'translate(-50%, -60%) scale(1)', opacity: 0 },
    ],
    { duration: SHOW, easing: 'ease-out' },
  ).onfinish = () => el.remove();
}
