import { mountLeaderboard } from '../../src/leaderboard/ui';
import { api } from '../kit/mocks';
import { Panel } from '../kit/panel';
import { settle, type StoryFn } from '../kit/story';

const board =
  (mode: 'duel' | 'horde', state: typeof api.mode = 'ok'): StoryFn =>
  async () => {
    api.mode = state;
    localStorage.setItem('cirquimia.myscores', JSON.stringify([103]));
    const lb = mountLeaderboard();
    await settle(50);
    lb.show('week', mode);
    const panel = new Panel();
    panel.choice('Datos', [['ok', 'Con puntuaciones'], ['empty', 'Vacío'], ['offline', 'Sin conexión']], state, (v) => {
      api.mode = v;
      lb.show('week', mode);
    });
  };

export const stories: Record<string, StoryFn> = {
  'rank-duel': board('duel'),
  'rank-horde': board('horde'),
  'rank-empty': board('duel', 'empty'),
  'rank-offline': board('duel', 'offline'),
};
