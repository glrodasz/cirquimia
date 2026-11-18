import { FakeMatch, mountHud, savedMatch } from '../kit/hud';
import { Panel } from '../kit/panel';
import { settle, type StoryFn } from '../kit/story';
import { Runs } from '../../src/leaderboard/client';

const newgame: StoryFn = async () => {
  savedMatch('duel', 2, 'normal');
  mountHud(new FakeMatch());
  await settle(50);
  const open = () => document.querySelector<HTMLButtonElement>('#match .newgame')!.click();
  open();
  const panel = new Panel();
  panel.button('Abrir otra vez', open);
};

/** A run that counts, as when a ranked match starts (the API here is simulated). */
function rankedRun(mode: 'duel' | 'horde') {
  const runs = new Runs();
  runs.start(mode, 2, 'normal', 'demo-seed', true);
  return runs;
}

const victory: StoryFn = async () => {
  savedMatch('duel', 2, 'normal');
  const match = new FakeMatch();
  match.over = true;
  const hud = mountHud(match);
  await settle(50);
  const show = () => {
    hud.controls.showEnd('victory');
    hud.board.fillEnd(hud.controls.endSlots, rankedRun('duel'), { rivals: 2, difficulty: 'normal', durationMs: 83_000, damage: 214 }, Promise.resolve(null));
  };
  show();
  const panel = new Panel();
  panel.button('Mostrar otra vez', show);
  panel.button('Victoria sin ranking', () => hud.controls.showEnd('victory'));
};

const defeat =
  (suggest: boolean): StoryFn =>
  async () => {
    savedMatch('duel', 2, 'dificil');
    const match = new FakeMatch();
    match.difficulty = 'dificil';
    match.over = true;
    const hud = mountHud(match);
    await settle(50);
    hud.controls.showEnd('defeat', suggest);
    const panel = new Panel();
    panel.button('Mostrar otra vez', () => hud.controls.showEnd('defeat', suggest));
  };

const horde: StoryFn = async () => {
  savedMatch('horde', 2, 'normal');
  const match = new FakeMatch();
  match.over = true;
  const hud = mountHud(match);
  await settle(50);
  const result = { wave: 6, durationMs: 241_000, kills: 47 };
  const show = () => {
    hud.controls.showEnd('defeat', false, result);
    hud.board.fillHordeEnd(hud.controls.endSlots, rankedRun('horde'), { ...result, damage: 1240 });
  };
  show();
  const panel = new Panel();
  panel.button('Mostrar otra vez', show);
  panel.button('Sin pasar la 1.ª oleada', () => {
    hud.controls.showEnd('defeat', false, { wave: 1, durationMs: 21_000, kills: 2 });
    hud.controls.note('Supera la primera oleada para entrar en el ranking.');
  });
};

export const stories: Record<string, StoryFn> = {
  newgame,
  'end-victory': victory,
  'end-defeat': defeat(false),
  'end-defeat-train': defeat(true),
  'end-horde': horde,
};
