import { renderShareCard, type ShareData } from '../../src/leaderboard/share';
import meadowPhoto from '../../src/assets/share/meadow.jpg';
import { sheet, type StoryFn } from '../kit/story';

const DATA: ShareData = { score: 71_250, durationMs: 83_000, damage: 214, rivals: 2, difficulty: 'normal', initials: 'GLR', rank: { today: 3, all: 41 } };

function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const card: StoryFn = async () => {
  sheet().innerHTML = `<h2>Tarjeta para compartir</h2><p class="kit-note">Generada en un canvas por renderShareCard() con datos de ejemplo. Con prado: el frame de la partida; sin él, el fondo por defecto.</p><div class="kit-shots"></div>`;
  const shots = document.querySelector('.kit-shots')!;
  const meadow = await load(meadowPhoto);
  const cases: Array<[string, ShareData, boolean, CanvasImageSource | null]> = [
    ['Cuadrada 1080 · con prado', DATA, false, meadow],
    ['Cuadrada 1080 · sin frame de partida (fondo por defecto) ni iniciales', { ...DATA, initials: undefined, rank: undefined }, false, null],
    ['Ancha 1200×630 · vista previa del enlace', DATA, true, meadow],
  ];
  for (const [label, data, wide, bg] of cases) {
    const blob = await renderShareCard(data, bg, wide);
    const fig = document.createElement('figure');
    fig.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="" style="width:${wide ? 480 : 340}px"><figcaption>${label}</figcaption>`;
    shots.append(fig);
  }
};

export const stories: Record<string, StoryFn> = { 'share-card': card };
