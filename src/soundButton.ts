import { sound } from './audio';
import { t } from './i18n';
import { soundIcon } from './icons';

/**
 * The speaker in the HUD, left of the ranking: sound starts off, and the speaker pulses until the player first
 * touches it, so they know the game has sound; the choice is remembered between visits.
 */
export function mountSoundButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'sound-btn';
  const render = () => {
    button.innerHTML = soundIcon(sound.enabled);
    button.setAttribute('aria-label', sound.enabled ? t.sound.mute : t.sound.unmute);
    button.setAttribute('aria-pressed', String(!sound.enabled));
  };
  button.classList.toggle('call', !sound.chosen);
  button.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    button.classList.remove('call');
    render();
  });
  render();
  document.body.append(button);
  return button;
}
