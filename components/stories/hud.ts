import { FakeMatch, mountHud, savedMatch } from '../kit/hud';
import { Panel } from '../kit/panel';
import { settle, type StoryFn } from '../kit/story';
import { mountWaveBanner } from '../../src/matchTimer';
import { mountKeysHint } from '../../src/keysHint';
import { mountPad } from '../../src/pad';
import { mountVersionBadge } from '../../src/version';
import { mountSoundButton } from '../../src/soundButton';
import { DIFFICULTY_LABEL, type Difficulty } from '../../src/combat';

const LEVELS = Object.keys(DIFFICULTY_LABEL) as Difficulty[];

// Rivals and level are Controls: the HUD reads them once, when it mounts.
const duel: StoryFn = async ({ args }) => {
  const rivals = Number(args.rivals ?? 2);
  const level = (LEVELS.includes(args.level) ? args.level : 'normal') as Difficulty;
  savedMatch('duel', rivals, level);
  const match = new FakeMatch();
  const hud = mountHud(match);
  const panel = new Panel();
  panel.button('Toast de reinicio', () => hud.controls.say('Nueva partida: 2 rivales · Normal'));
  panel.toggle('Reloj parado', false, (on) => (match.over = on));
};

const training: StoryFn = async ({ args }) => {
  if (args.battle === 'horde') savedMatch('training', 2, 'normal', 'horde');
  else savedMatch('training', 2, 'normal');
  mountHud(new FakeMatch());
};

const horde: StoryFn = async () => {
  savedMatch('horde', 2, 'normal');
  const match = new FakeMatch();
  match.wave = { wave: 6, left: 5 };
  const hud = mountHud(match);
  const banner = mountWaveBanner();
  await settle(300);
  banner.show(6);
  const panel = new Panel();
  panel.button('Anunciar oleada', () => banner.show((match.wave = { wave: match.wave!.wave + 1, left: 8 }).wave));
  panel.button('Oleada superada (toast)', () => hud.controls.say('¡Oleada superada!', 1400));
};

const spot: StoryFn = async () => {
  savedMatch('duel', 2, 'dificil');
  localStorage.setItem('cirquimia.hudspot', 'next');
  mountHud(new FakeMatch());
};

const sound: StoryFn = ({ args }) => {
  if (args.chosen) localStorage.setItem('cirquimia.sound', '1');
  mountSoundButton();
};

const move: StoryFn = (ctx) => {
  if (ctx.args.keys === 'arrows') localStorage.setItem('cirquimia.keyset', 'arrows');
  const keys = mountKeysHint();
  mountPad();
  const panel = new Panel();
  if (ctx.touch) {
    panel.row('El stick: arrastra desde el círculo de abajo a la izquierda.');
    return;
  }
  panel.row('Activa «Táctil» arriba para ver el stick.');
  const press = (k: 'up' | 'down' | 'left' | 'right', code: string) => {
    keys.press(k, true, code);
    setTimeout(() => keys.press(k, false, code), 260);
  };
  panel.button('Pulsar W', () => press('up', 'KeyW'));
  panel.button('Pulsar →', () => press('right', 'ArrowRight'));
};

const version: StoryFn = () => {
  mountVersionBadge();
};

export const stories: Record<string, StoryFn> = {
  'hud-duel': duel,
  'hud-training': training,
  'hud-horde': horde,
  'hud-spot': spot,
  'hud-sound': sound,
  'hud-move': move,
  'hud-version': version,
};
