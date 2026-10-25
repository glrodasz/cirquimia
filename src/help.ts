import { brushPath, shapeIcon, type Pt } from './ammo';
import { arc, person, random, segment, svg } from './match';
import type { ShapeKind } from './gestures';
import { t } from './i18n';

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

/** The alchemist standing in a rune circle on the ground, seen at the game's tilt, with a ring of power at the feet. */
function runesScene(rand: () => number) {
  const cx = 48;
  const cy = 50;
  const flat = (line: Pt[]): Pt[] => line.map(([x, y]) => [x, cy + (y - cy) * 0.42]);
  const tri = [0, 1, 2, 3].map((k): Pt => {
    const a = -Math.PI / 2 + (k * Math.PI * 2) / 3;
    return [cx + Math.cos(a) * 27, cy + Math.sin(a) * 27];
  });
  const parts = [
    stroke(flat(arc(cx, cy, 40, -2.9, -2.9 + Math.PI * 2.04)), 2.6, 'glyph', rand),
    stroke(flat(arc(cx, cy, 31, 0.4, 0.4 + Math.PI * 2.04)), 1.8, 'glyph', rand),
    stroke(flat(poly(tri)), 1.8, 'glyph', rand),
    ...[0.8, 2.35, 3.95, 5.5].map((a) => stroke(flat(arc(cx + Math.cos(a) * 45, cy + Math.sin(a) * 45, 1.2, 0, Math.PI * 2.2)), 3, 'glyph', rand)),
    stroke(flat(arc(cx, cy, 15, 0.2, 0.2 + Math.PI * 2.05)), 2.2, 'hero', rand),
    ...[-2.6, -Math.PI / 2, -0.54].map((a) => stroke(segment([cx + Math.cos(a) * 11, cy - 27 + Math.sin(a) * 11], [cx + Math.cos(a) * 16, cy - 27 + Math.sin(a) * 16]), 1.8, 'glyph', rand)),
  ];
  // The figure is drawn on the 48-unit HUD grid; scale it so its shoulders end on the circle's centre.
  const fig = person(24, 0.9, 'hero', rand);
  const place = `translate(${cx - 24 * 1.5} ${cy - 34.8 * 1.5}) scale(1.5)`;
  const id = `helprune${++sceneId}`;
  return (
    `<svg viewBox="0 0 96 72" aria-hidden="true">` +
    `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="72">` +
    `<rect width="96" height="72" fill="#fff"/><path d="${parts.map((p) => p.dry).join('')}" fill="#000"/><g transform="${place}"><path d="${fig.dry}" fill="#000"/></g></mask>` +
    `<g mask="url(#${id})">${parts.map((p) => p.ink).join('')}<g transform="${place}">${fig.ink}</g></g></svg>`
  );
}
let sceneId = 0;

function questionIcon(rand: () => number) {
  const hook = arc(24, 19, 6.5, Math.PI * 1.05, Math.PI * 2.3);
  return svg([
    stroke(hook.concat(segment(hook[hook.length - 1], [24, 29])), 3.6, 'glyph', rand),
    stroke(arc(24, 35.5, 0.8, 0, Math.PI * 2.2), 3.4, 'glyph', rand),
  ], rand);
}

const SHAPES: Array<{ kind: ShapeKind; effect?: 'dmg' | 'heal'; value: string; source?: 'fire' | 'water' }> = [
  { kind: 'circle', value: t.help.defence },
  { kind: 'square', effect: 'dmg', value: '20' },
  { kind: 'triangle', effect: 'dmg', value: '35', source: 'fire' },
  { kind: 'triangleDown', effect: 'dmg', value: '35', source: 'water' },
  { kind: 'rhombus', effect: 'heal', value: '25' },
  { kind: 'pentagram', effect: 'dmg', value: '5×10' },
];
const EFFECT = { dmg: t.help.damage, heal: t.help.healing };

const fig = (cls: string, inner: string) => `<span class="fig ${cls}">${inner}</span>`;
const arrow = '<span class="arrow" aria-hidden="true">→</span>';

function content() {
  const rand = random();
  const shapes = SHAPES.map(
    (s) =>
      `<li>${fig(s.kind, shapeIcon(s.kind))}<b>${t.help.names[s.kind]}</b><span class="val${s.effect ? ` val-${s.effect}` : ''}">${s.effect ? `<small>${EFFECT[s.effect]}</small> ` : ''}${s.value}</span>` +
      (s.source ? `<span class="src">${s.source === 'fire' ? flameIcon(rand) : waterIcon(rand)}</span>` : '') +
      '</li>',
  ).join('');
  return (
    `<div class="card"><h2 id="help-title">${t.help.title}</h2>` +
    '<ol class="steps">' +
    `<li><span class="pair">${fig('', tapIcon(rand))}</span><span>${t.help.move}</span></li>` +
    `<li><span class="pair">${fig('', drawIcon(rand))}${arrow}${fig('square', shapeIcon('square'))}</span><span>${t.help.draw}</span></li>` +
    `<li><span class="pair">${fig('square selected', shapeIcon('square'))}${arrow}${fig('', targetIcon(rand))}</span><span>${t.help.use}</span></li>` +
    '</ol>' +
    `<h3>${t.help.shapesTitle}</h3>` +
    `<ul class="shapes">${shapes}</ul>` +
    `<div class="flow" aria-label="${t.help.fireFlow}">` +
    `${fig('triangle', shapeIcon('triangle'))}${arrow}${fig('', flameIcon(rand))}${arrow}` +
    `${fig('triangle charged', shapeIcon('triangle'))}${arrow}${fig('', targetIcon(rand))}</div>` +
    `<p class="note">${t.help.fireNote}</p>` +
    `<div class="flow" aria-label="${t.help.waterFlow}">` +
    `${fig('triangleDown', shapeIcon('triangleDown'))}${arrow}${fig('', waterIcon(rand))}${arrow}` +
    `${fig('triangleDown charged', shapeIcon('triangleDown'))}${arrow}${fig('', targetIcon(rand))}</div>` +
    `<p class="note">${t.help.waterNote}</p>` +
    `<h3>${t.help.runesTitle}</h3>` +
    `<div class="runes"><span class="scene">${runesScene(rand)}</span>` +
    `<span>${t.help.runes}<br><small>${t.help.runesBonus} · <span class="val-heal">${t.help.runesHeal}</span></small></span></div>` +
    `<button type="button" class="match-btn go"><span class="cap">${t.help.go}</span></button></div>`
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
  button.setAttribute('aria-label', t.help.button);
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
