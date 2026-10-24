import { brushPath, shapeIcon, type Pt } from './ammo';
import { arc, person, random, segment, svg } from './match';
import type { ShapeKind } from './gestures';

const STORE = 'cirquimia.help';

function seen() {
  try {
    return localStorage.getItem(STORE) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORE, '1');
  } catch {
    // Blocked storage: the guide simply shows again next time.
  }
}

/** One brush stroke along the points, inked with a class from the HUD palette. */
function stroke(line: Pt[], width: number, cls: string, rand: () => number) {
  const b = brushPath(line, width, rand);
  return { ink: `<path class="${cls}" d="${b.ink}"/>`, dry: b.dry };
}

function poly(points: Pt[]): Pt[] {
  return points.slice(1).flatMap((p, i) => segment(points[i], p).slice(i ? 1 : 0));
}

/** A fingertip and the ripple it leaves on the ground. */
function tapIcon(rand: () => number) {
  return svg([
    stroke(arc(24, 24, 2.2, 0, Math.PI * 2.2), 3.6, 'hero', rand),
    stroke(arc(24, 24, 9, -2.5, -0.65), 2.6, 'hero', rand),
    stroke(arc(24, 24, 9, 0.65, 2.5), 2.6, 'hero', rand),
  ], rand);
}

/** A loose freehand loop, the way a shape gets drawn on the map. */
function drawIcon(rand: () => number) {
  const line: Pt[] = [];
  for (let i = 0; i <= 120; i++) {
    const t = i / 120;
    const a = -2.4 + t * Math.PI * 2.15;
    const r = 11 - 3 * t;
    line.push([24 + Math.cos(a) * r, 24 + Math.sin(a) * r * 0.9]);
  }
  return svg([stroke(line, 3.6, 'hero', rand)], rand);
}

/** Crosshair on a rival. */
function targetIcon(rand: () => number) {
  return svg([
    stroke(arc(24, 24, 7.5, -1, -1 + Math.PI * 2.05), 2.8, 'red', rand),
    stroke(segment([24, 11], [24, 37]), 2.4, 'red', rand),
    stroke(segment([11, 24], [37, 24]), 2.4, 'red', rand),
  ], rand);
}

/** A teardrop: the tip, down one side, round the belly and back up. */
function drop(tipY: number, cls: string, rand: () => number) {
  const belly = arc(24, 29, 8, Math.PI + 0.45, -0.45);
  return stroke(poly([[24, tipY], belly[0]]).concat(belly, poly([belly[belly.length - 1], [24, tipY]])), 3.4, cls, rand);
}

function flameIcon(rand: () => number) {
  return svg([drop(10, 'fire', rand), stroke(poly([[24, 23], [21.5, 30], [24, 33.5], [26.5, 30], [24, 23]]), 2.4, 'fire', rand)], rand);
}

function waterIcon(rand: () => number) {
  return svg([drop(12, 'water', rand), stroke(arc(24, 29, 4.5, Math.PI * 0.6, Math.PI * 0.95), 2, 'water', rand)], rand);
}

/** The alchemist standing in a dashed rune ring. */
function runesIcon(rand: () => number) {
  const dashes = Array.from({ length: 6 }, (_, i) => stroke(arc(24, 24, 15, (i * Math.PI) / 3 + 0.15, (i * Math.PI) / 3 + 0.8), 2.4, 'glyph', rand));
  return svg([...dashes, person(24, 0.62, 'hero', rand)], rand);
}

function questionIcon(rand: () => number) {
  const hook = arc(24, 19, 6.5, Math.PI * 1.05, Math.PI * 2.3);
  return svg([
    stroke(hook.concat(segment(hook[hook.length - 1], [24, 29])), 3.6, 'glyph', rand),
    stroke(arc(24, 35.5, 0.8, 0, Math.PI * 2.2), 3.4, 'glyph', rand),
  ], rand);
}

const SHAPES: Array<{ kind: ShapeKind; name: string; value: string; source?: 'fire' | 'water' }> = [
  { kind: 'circle', name: 'Muro', value: 'bloquea' },
  { kind: 'square', name: 'Tierra', value: '20' },
  { kind: 'triangle', name: 'Fuego', value: '35', source: 'fire' },
  { kind: 'triangleDown', name: 'Agua', value: '35', source: 'water' },
  { kind: 'rhombus', name: 'Cura', value: '+25' },
  { kind: 'pentagram', name: 'Estrella', value: '5×10' },
];

const fig = (cls: string, inner: string) => `<span class="fig ${cls}">${inner}</span>`;
const arrow = '<span class="arrow" aria-hidden="true">→</span>';

function content() {
  const rand = random();
  const shapes = SHAPES.map(
    (s) =>
      `<li>${fig(s.kind, shapeIcon(s.kind))}<b>${s.name}</b><span class="val">${s.value}</span>` +
      (s.source ? `<span class="src">${s.source === 'fire' ? flameIcon(rand) : waterIcon(rand)}</span>` : '') +
      '</li>',
  ).join('');
  return (
    '<div class="card"><h2 id="help-title">Cómo jugar</h2>' +
    '<ol class="steps">' +
    `<li>${fig('', tapIcon(rand))}<span>Toca<br><small>camina</small></span></li>` +
    `<li>${fig('', drawIcon(rand))}<span>Dibuja<br><small>guarda</small></span></li>` +
    `<li><span class="pair">${fig('square', shapeIcon('square'))}${arrow}${fig('', targetIcon(rand))}</span><span>Elige<br><small>lanza</small></span></li>` +
    '</ol>' +
    `<ul class="shapes">${shapes}</ul>` +
    '<div class="flow" aria-label="Fuego y agua: toca el triángulo, luego la fogata o la laguna; vuelve a tocarlo y lanza">' +
    `${fig('triangle', shapeIcon('triangle'))}${arrow}${fig('', flameIcon(rand))}${arrow}` +
    `${fig('triangle charged', shapeIcon('triangle'))}${arrow}${fig('', targetIcon(rand))}</div>` +
    `<div class="runes">${fig('', runesIcon(rand))}<span>Sobre runas<br><b>+25%</b></span></div>` +
    '<button type="button" class="match-btn go"><span class="cap">¡A jugar!</span></button></div>'
  );
}

/**
 * How to play, as pictures: full screen on the first visit, then behind a "?" next to the gear.
 * The game holds still while it is open.
 */
export function mountHelp() {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'help-btn';
  button.setAttribute('aria-label', 'Cómo jugar');
  button.innerHTML = questionIcon(random());

  const overlay = document.createElement('div');
  overlay.id = 'help';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'help-title');
  for (const node of [button, overlay]) for (const type of ['pointerdown', 'pointerup', 'pointermove']) node.addEventListener(type, (e) => e.stopPropagation());
  document.body.append(button, overlay);

  let open = false;
  const show = () => {
    overlay.innerHTML = content(); // fresh brush jitter each time
    overlay.querySelector('.go')!.addEventListener('click', hide);
    overlay.hidden = false;
    open = true;
    void overlay.offsetWidth; // let the fade-in start from hidden
    overlay.classList.add('show');
    overlay.querySelector<HTMLButtonElement>('.go')!.focus({ preventScroll: true });
  };
  function hide() {
    if (!open) return;
    open = false;
    markSeen();
    overlay.classList.remove('show');
    setTimeout(() => {
      if (!open) overlay.hidden = true;
    }, 300);
    (document.activeElement as HTMLElement | null)?.blur();
  }

  button.addEventListener('click', show);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide();
  });
  addEventListener('keydown', (e) => {
    if (open && e.key === 'Escape') hide();
  });
  if (!seen()) show();

  return {
    get open() {
      return open;
    },
  };
}
