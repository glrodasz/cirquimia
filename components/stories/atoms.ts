import { FakeMatch, mountHud, savedMatch } from '../kit/hud';
import { settle, type StoryFn } from '../kit/story';

/**
 * The HUD's buttons one by one. The real HUD mounts (src/match.ts, help.ts, soundButton.ts, leaderboard/ui.ts), and each
 * button is shown as a copy next to its variants, so it reads as a part instead of a corner of the screen.
 */
const buttons: StoryFn = async () => {
  savedMatch('duel', 2, 'normal');
  mountHud(new FakeMatch());
  await settle(200);
  const take = (sel: string) => document.querySelector<HTMLElement>(sel);
  const match = take('#match');
  const pieces = ['#match', '#book-btn', '#rank-btn', '#sound-btn', '#match-time'].map(take);
  const copy = (el: HTMLElement | null, cls = '') => {
    if (!el) return '';
    const c = el.cloneNode(true) as HTMLElement;
    c.hidden = false;
    c.classList.remove('snug', 'icons', 'spot', 'hud-dim', 'hud-near');
    for (const x of cls.split(' ').filter(Boolean)) c.classList.add(x);
    return c.outerHTML;
  };
  const cell = (label: string, html: string, note = '') => `<figure class="kit-cell"><div class="kit-stage">${html}</div><figcaption><b>${label}</b>${note ? `<span>${note}</span>` : ''}</figcaption></figure>`;
  // The real HUD squeezes its pills to icons on a narrow screen; the copies show every size whatever the screen.
  const page = document.createElement('main');
  page.className = 'kit-gallery';
  page.innerHTML =
    `<h2>Píldora</h2><p class="kit-note">El botón con icono y texto del HUD (<code>.match-btn</code>). Cuando no cabe se ajusta, y en móvil queda solo el icono.</p>` +
    `<div class="kit-cells">` +
    cell('Con texto', copy(match), 'escritorio') +
    cell('Ajustada', copy(match, 'snug'), 'pantallas medianas') +
    cell('Solo icono', copy(match, 'icons'), 'móvil (&lt;700px)') +
    cell('Destacada', copy(match, 'spot'), 'tras la primera victoria') +
    `</div>` +
    `<h2>Botón redondo</h2><p class="kit-note">Libro, ranking y sonido: un icono de 40 px con el mismo marco de grimorio.</p>` +
    `<div class="kit-cells">` +
    cell('Libro', copy(pieces[1])) +
    cell('Ranking', copy(pieces[2])) +
    cell('Sonido', copy(pieces[3]), 'apagado, late hasta el primer toque') +
    `</div>` +
    (pieces[4] ? `<h2>Reloj</h2><div class="kit-cells">${cell('Tiempo de partida', copy(pieces[4]))}</div>` : '');
  // The live HUD stays mounted (it owns the listeners) but out of sight: the page shows the copies.
  for (const el of pieces) el?.classList.add('kit-away');
  document.documentElement.classList.add('kit-doc');
  document.body.append(page);
};

export const stories: Record<string, StoryFn> = { buttons };
