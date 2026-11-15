import { mountHelp } from '../../src/help';
import { Panel } from '../kit/panel';
import { settle, type StoryFn } from '../kit/story';

/** Opens the real book from its HUD button, on the section asked for, the way a player would. */
async function openBook(section: 'symbols' | 'guide') {
  mountHelp();
  await settle(50);
  document.getElementById('book-btn')!.click();
  await settle(50);
  if (section === 'guide') document.querySelector<HTMLButtonElement>('#help .tab[data-to="guide"]')!.click();
  const panel = new Panel();
  panel.button('Abrir otra vez', () => document.getElementById('book-btn')!.click());
  panel.row('Cierra con ×, Esc o tocando fuera. La pestaña del globo cambia el idioma del catálogo.');
}

export const stories: Record<string, StoryFn> = {
  'book-symbols': () => openBook('symbols'),
  'book-guide': () => openBook('guide'),
};
