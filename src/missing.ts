import { brushPath, ensoLine, shapeIcon, type Pt } from './ammo';
import { arc, random, segment } from './match';

const SHOW = 1100; // ms

// The refused symbol is part of the meadow, not the book, so it keeps the brush look of the strokes drawn on it.

const stroke = (line: Pt[], width: number, cls: string, rand: () => number) => {
  const b = brushPath(line, width, rand);
  return { ink: `<path class="${cls}" d="${b.ink}"/>`, dry: b.dry };
};
const poly = (points: Pt[]): Pt[] => points.slice(1).flatMap((p, i) => segment(points[i], p).slice(i ? 1 : 0));

function drop(tipY: number, cls: string, rand: () => number) {
  const belly = arc(24, 29, 8, Math.PI + 0.45, -0.45);
  return stroke(poly([[24, tipY], belly[0]]).concat(belly, poly([belly[belly.length - 1], [24, tipY]])), 3.4, cls, rand);
}

let svgId = 0;
function svg(parts: Array<{ ink: string; dry: string }>, rand: () => number) {
  const ring = brushPath(ensoLine(rand), 2.2, rand);
  const id = `hudbrush${++svgId}`;
  const dry = parts.map((p) => p.dry).join('') + ring.dry;
  return (
    `<svg viewBox="0 0 48 48" aria-hidden="true">` +
    `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">` +
    `<rect width="48" height="48" fill="#fff"/><path d="${dry}" fill="#000"/></mask>` +
    `<g mask="url(#${id})"><path class="ring" d="${ring.ink}"/>${parts.map((p) => p.ink).join('')}</g></svg>`
  );
}


const flameIcon = (rand: () => number) =>
  svg([drop(10, 'fire', rand), stroke(poly([[24, 23], [21.5, 30], [24, 33.5], [26.5, 30], [24, 23]]), 2.4, 'fire', rand)], rand);
const waterIcon = (rand: () => number) =>
  svg([drop(12, 'water', rand), stroke(arc(24, 29, 4.5, Math.PI * 0.6, Math.PI * 0.95), 2, 'water', rand)], rand);

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
