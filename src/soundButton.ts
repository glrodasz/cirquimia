import { sound } from './audio';
import { t } from './i18n';
import { soundIcon } from './icons';

/** The speaker in the HUD, left of the ranking: turns music and effects on or off, remembered between visits. */
export function mountSoundButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'sound-btn';
  const render = () => {
    button.innerHTML = soundIcon(sound.enabled);
    button.setAttribute('aria-label', sound.enabled ? t.sound.mute : t.sound.unmute);
    button.setAttribute('aria-pressed', String(!sound.enabled));
  };
  button.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    render();
  });
  render();
  document.body.append(button);
  return button;
}
