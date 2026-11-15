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

/** Rivals and level as pills, re-mounted on change (they are read once, when the HUD mounts). */
function duelControls(panel: Panel, rivals: number, level: Difficulty) {
  panel.choice('Rivales', [['1', '1'], ['2', '2'], ['3', '3']], String(rivals), (v) => {
    savedMatch('duel', Number(v), level);
    reload({ rivals: v, level });
  });
  panel.choice('Nivel', LEVELS.map((l) => [l, DIFFICULTY_LABEL[l]] as [Difficulty, string]), level, (v) => {
    savedMatch('duel', rivals, v);
    reload({ rivals: String(rivals), level: v });
  });
}

function reload(extra: Record<string, string>) {
  const q = new URLSearchParams(location.search);
  for (const [k, v] of Object.entries(extra)) q.set(k, v);
  location.search = q.toString();
}

const query = () => new URLSearchParams(location.search);

const duel: StoryFn = async () => {
  const rivals = Number(query().get('rivals') ?? 2);
  const level = (query().get('level') ?? 'normal') as Difficulty;
  savedMatch('duel', rivals, level);
  const match = new FakeMatch();
  const hud = mountHud(match);
  const panel = new Panel();
  duelControls(panel, rivals, level);
  panel.button('Toast de reinicio', () => hud.controls.say('Nueva partida: 2 rivales · Normal'));
  panel.toggle('Reloj parado', false, (on) => (match.over = on));
};

const training: StoryFn = async () => {
  savedMatch('training', 2, 'normal');
  mountHud(new FakeMatch());
  const panel = new Panel();
  panel.choice('Última batalla', [['duel', 'Duelo'], ['horde', 'Horda']], query().get('battle') === 'horde' ? 'horde' : 'duel', (v) => reload({ battle: v }));
  if (query().get('battle') === 'horde') savedMatch('training', 2, 'normal', 'horde');
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

const sound: StoryFn = () => {
  if (query().get('chosen') === '1') localStorage.setItem('cirquimia.sound', '1');
  mountSoundButton();
  const panel = new Panel();
  panel.button('Primera visita (late)', () => reload({ chosen: '0' }));
  panel.button('Ya elegido', () => reload({ chosen: '1' }));
};

const move: StoryFn = (ctx) => {
  if (query().get('set') === 'arrows') localStorage.setItem('cirquimia.keyset', 'arrows');
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
