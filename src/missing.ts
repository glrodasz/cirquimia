import { brushPath, shapeIcon } from './ammo';
import { random, segment } from './match';
import { flameIcon, waterIcon } from './help';

const SHOW = 1100; // ms

/**
 * A refused symbol, struck through where it was drawn: the fire or water a triangle drawn away from any campfire or
 * lagoon needed, or the wall a circle cannot raise inside a rune circle.
 */
export function showMissingSource(element: 'fire' | 'water' | 'wall', x: number, y: number) {
  const rand = random();
  const cross = [segment([12, 12], [36, 36]), segment([36, 12], [12, 36])].map((l) => brushPath(l, 4.2, rand).ink).join('');
  const el = document.createElement('div');
  el.className = `nosource ${element}`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.innerHTML = (element === 'wall' ? shapeIcon('circle') : element === 'fire' ? flameIcon(rand) : waterIcon(rand)) + `<svg viewBox="0 0 48 48" aria-hidden="true"><path class="cross" d="${cross}"/></svg>`;
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
