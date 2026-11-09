/**
 * Solid HUD icons in a 24×24 box: simplified silhouettes that read at a glance, inked in the grimoire's
 * black and red. They fill with currentColor (or a coat colour via the class) so the CSS picks the ink.
 */

const box = (inner: string, cls = '') => `<svg class="hud-icon${cls ? ` ${cls}` : ''}" viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;

/** One figure: round head and rounded shoulders, at (x, y) scaled by s from a 24-box figure. */
const figure = (x: number, s: number, cls: string) =>
  `<g class="${cls}" transform="translate(${x} ${24 - 24 * s}) scale(${s})"><circle cx="12" cy="7.2" r="3.9"/><path d="M4.2 21.5C4.2 16.4 7.6 12.8 12 12.8S19.8 16.4 19.8 21.5Z"/></g>`;

export function rivalsIcon(count: number) {
  if (count === 0)
    // The training scarecrow: head, crossbar and stake.
    return box('<g class="ink"><circle cx="12" cy="5.4" r="3.2"/><rect x="3.5" y="10" width="17" height="2.6"/><rect x="10.7" y="8" width="2.6" height="14"/></g>');
  if (count === 1) return box(figure(0, 1, 'red'));
  if (count === 2) return box(figure(-3.6, 0.82, 'red') + figure(7.9, 0.82, 'green'));
  return box(figure(-2.5, 0.6, 'red') + figure(4.8, 0.6, 'green') + figure(12.1, 0.6, 'plum'));
}

/** Four rising bars, solid up to the level, like a signal meter. */
export function levelIcon(filled: number) {
  return box(
    [0, 1, 2, 3]
      .map((i) => {
        const h = 6 + i * 4.3;
        return `<rect class="${i < filled ? 'ink' : 'faint'}" x="${2.6 + i * 5.1}" y="${21 - h}" width="3.6" height="${h}"/>`;
      })
      .join(''),
  );
}

/** An open book seen from above: two pages lifting from the spine. */
export function bookIcon() {
  return box(
    '<path class="ink" d="M11.1 6.3C8.6 4.8 5.6 4.4 2.4 5V18.8C5.6 18.2 8.6 18.6 11.1 20Z"/>' +
      '<path class="ink" d="M12.9 6.3C15.4 4.8 18.4 4.4 21.6 5V18.8C18.4 18.2 15.4 18.6 12.9 20Z"/>',
  );
}

export function questionIcon() {
  return box(
    '<path class="ink" fill-rule="evenodd" d="M6.6 8.6C6.6 5.4 9 3.2 12.2 3.2S17.6 5.2 17.6 8C17.6 10.1 16.4 11.2 15 12.2C13.9 13 13.6 13.5 13.6 14.6V15.4H10.3V14.3C10.3 12.4 11 11.4 12.6 10.2C13.7 9.4 14.2 8.9 14.2 8.1C14.2 7 13.4 6.3 12.1 6.3C10.8 6.3 9.9 7.2 9.9 8.6Z"/>' +
      '<rect class="ink" x="10.1" y="17.4" width="3.7" height="3.6"/>',
  );
}

/** The ranking cup: bowl with two handles on a stem and foot. */
export function trophyIcon() {
  return box(
    '<path class="ink" fill-rule="evenodd" d="M6.8 3H17.2V4.6H20.6V7.4C20.6 10 18.8 12 16.4 12.4C15.6 14 14.4 15 13 15.3V18H16V20H8V18H11V15.3C9.6 15 8.4 14 7.6 12.4C5.2 12 3.4 10 3.4 7.4V4.6H6.8ZM5.4 6.6V7.4C5.4 8.7 6.1 9.7 7.1 10.2C6.9 9.4 6.8 8.6 6.8 7.7V6.6ZM18.6 6.6H17.2V7.7C17.2 8.6 17.1 9.4 16.9 10.2C17.9 9.7 18.6 8.7 18.6 7.4Z"/>' +
      '<rect class="ink" x="6.5" y="20.6" width="11" height="1.6"/>',
  );
}
