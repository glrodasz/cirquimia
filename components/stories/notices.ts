import { Popover } from '../../src/popover';
import { showMissingSource } from '../../src/missing';
import { HitMeLabel } from '../../src/dummy';
import { mountDeviceHint } from '../../src/deviceHint';
import { showGpuNotice } from '../../src/gpu';
import { mountHelp } from '../../src/help';
import { t } from '../../src/i18n';
import { Panel } from '../kit/panel';
import type { StoryFn } from '../kit/story';

/** A dot where the popover points, so the nub can be checked against it. */
function marker(x: number, y: number) {
  const dot = document.createElement('div');
  Object.assign(dot.style, { position: 'fixed', left: `${x - 6}px`, top: `${y - 6}px`, width: '12px', height: '12px', borderRadius: '50%', background: '#d9483b', boxShadow: '0 0 0 3px #fff', zIndex: '3' });
  document.body.append(dot);
  return dot;
}

const popover: StoryFn = () => {
  mountHelp(); // the note keeps clear of the HUD row, measured from the book button
  const [title, body] = t.tutorial.square.draw;
  const head = document.createElement('b');
  head.textContent = title;
  const text = document.createElement('span');
  text.textContent = body;
  const pop = new Popover(head, text);
  document.body.append(pop.el);
  let side: 'above' | 'below' = 'above';
  let at = { x: innerWidth / 2, y: innerHeight / 2 };
  let dot = marker(at.x, at.y);
  const place = () => {
    pop.snap();
    pop.place({ x: at.x, y: at.y, r: 24, side }, 0);
  };
  place();
  addEventListener('resize', () => {
    at = { x: innerWidth / 2, y: innerHeight / 2 };
    dot.remove();
    dot = marker(at.x, at.y);
    place();
  });
  const panel = new Panel();
  panel.choice('Lado', [['above', 'Arriba'], ['below', 'Abajo']], side, (v) => {
    side = v;
    place();
  });
  panel.choice('Punto', [['c', 'Centro'], ['l', 'Borde izq.'], ['t', 'Arriba']], 'c', (v) => {
    at = v === 'l' ? { x: 24, y: innerHeight / 2 } : v === 't' ? { x: innerWidth / 2, y: 90 } : { x: innerWidth / 2, y: innerHeight / 2 };
    dot.remove();
    dot = marker(at.x, at.y);
    place();
  });
  panel.toggle('Aviso de error (rojo)', false, (on) => pop.el.classList.toggle('wrong', on));
};

const missing: StoryFn = () => {
  const show = (element: 'fire' | 'water' | 'wall') => showMissingSource(element, innerWidth / 2, innerHeight / 2);
  show('fire');
  const panel = new Panel();
  panel.button('Fuego sin fogata', () => show('fire'));
  panel.button('Agua sin laguna', () => show('water'));
  panel.button('Muro en runas', () => show('wall'));
};

const hitme: StoryFn = () => {
  const label = new HitMeLabel(t.practice.hitMe);
  const place = () => label.place(innerWidth / 2, innerHeight / 2, true);
  place();
  addEventListener('resize', place);
  const panel = new Panel();
  panel.button('Golpe (se aparta)', () => label.dim());
};

const device: StoryFn = (ctx) => {
  mountDeviceHint(() => true);
  const panel = new Panel();
  panel.row(ctx.touch ? 'Táctil: gira el viewport a horizontal (iPad horizontal) para ver «mejor en vertical».' : 'Escritorio: aparece a los 3 s, una vez por visita.');
  panel.button('Repetir', () => location.reload());
};

const gpu: StoryFn = () => {
  const kind = new URLSearchParams(location.search).get('gpu') === 'none' ? 'none' : 'software';
  void showGpuNotice(kind);
  const panel = new Panel();
  panel.choice('Caso', [['software', 'Por software'], ['none', 'Sin WebGL']], kind, (v) => {
    const q = new URLSearchParams(location.search);
    q.set('gpu', v);
    location.search = q.toString();
  });
};

export const stories: Record<string, StoryFn> = { popover, missing, hitme, device, gpu };
