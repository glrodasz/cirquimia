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

/* ---- Icons for the rest of the UI, in the same solid, simplified hand. ---- */

const solid = (d: string, cls = 'ink', view = '0 0 24 24') => `<svg viewBox="${view}" aria-hidden="true"><path class="${cls}" fill-rule="evenodd" d="${d}"/></svg>`;

/** A phone held upright: body with the screen cut out and a home dot. */
const PHONE = 'M8 2H16A1.5 1.5 0 0 1 17.5 3.5V20.5A1.5 1.5 0 0 1 16 22H8A1.5 1.5 0 0 1 6.5 20.5V3.5A1.5 1.5 0 0 1 8 2ZM8.5 4.5V17.5H15.5V4.5ZM12 18.9A.9.9 0 1 0 12 20.7A.9.9 0 1 0 12 18.9Z';
export const phoneIcon = (cls = '') => `<svg class="phone${cls ? ` ${cls}` : ''}" viewBox="0 0 24 24" aria-hidden="true"><path class="ink" fill-rule="evenodd" d="${PHONE}"/></svg>`;

export const flameIcon = () => solid('M12 2.2C12.7 5.6 18 8 18 13.8A6 6 0 0 1 6 13.8C6 11 7.5 9.2 8.8 8C9 9.8 9.8 11 11 11.5C10.4 7.9 11.2 4.9 12 2.2ZM12 13.2C10.6 14.6 10 15.6 10 16.6A2 2 0 0 0 14 16.6C14 15.6 13.4 14.6 12 13.2Z', 'fire');
export const dropIcon = () => solid('M12 2.4C15.2 6.8 18.2 10.2 18.2 14.2A6.2 6.2 0 0 1 5.8 14.2C5.8 10.2 8.8 6.8 12 2.4ZM8.6 14.4A3.4 3.4 0 0 0 11 17.6L11.4 16.3A2.1 2.1 0 0 1 9.9 14.4Z', 'water');
export const crossIcon = () => solid('M5.6 3.5 12 9.9 18.4 3.5 20.5 5.6 14.1 12 20.5 18.4 18.4 20.5 12 14.1 5.6 20.5 3.5 18.4 9.9 12 3.5 5.6Z', 'cross');
/** A rune circle: a ring around a four-pointed spark. */
export const runeIcon = () => solid('M12 2.8A9.2 9.2 0 1 1 12 21.2A9.2 9.2 0 1 1 12 2.8ZM12 5A7 7 0 1 0 12 19A7 7 0 1 0 12 5ZM12 7.6 13.2 10.8 16.4 12 13.2 13.2 12 16.4 10.8 13.2 7.6 12 10.8 10.8Z');
/** A blunt arrow pointing down, for "here" markers on the meadow and the HUD. */
export const downArrow = () => solid('M9.6 2H14.4V12.6H19.6L12 22 4.4 12.6H9.6Z', 'ink');
/** A long arrow pointing right, for the book's page-turn buttons (the back button mirrors it). */
export const turnArrowIcon = () => `<svg class="arrow" viewBox="0 0 40 20" aria-hidden="true"><path fill-rule="evenodd" d="M2 8.4H29.5V3L38 10 29.5 17V11.6H2Z"/></svg>`;
/** The alchemist standing (victory) or lying on the ground (defeat). */
export const standingIcon = () => box(figure(0, 1, 'hero'));
export const fallenIcon = () =>
  box('<g class="down"><circle cx="5.6" cy="14.6" r="3.3"/><path d="M10.4 11.6H19.2A3.4 3.4 0 0 1 19.2 18.4H10.4Z"/><rect class="faint" x="1.5" y="20" width="21" height="1.4"/></g>');
/** The transmutation seal on the graphics-card notice: a ring around a triangle with a circle cut in it. */
export const sealIcon = () =>
  `<svg class="gpu-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill-rule="evenodd" d="M24 4.5A19.5 19.5 0 1 1 24 43.5A19.5 19.5 0 1 1 24 4.5ZM24 7.2A16.8 16.8 0 1 0 24 40.8A16.8 16.8 0 1 0 24 7.2ZM24 11 37.2 34.4H10.8ZM24 20.2A5 5 0 1 0 24 30.2A5 5 0 1 0 24 20.2Z"/></svg>`;
/** A gear: toothed wheel with a hole. */
export const gearIcon = () =>
  solid('M19.4 13A7.6 7.6 0 0 0 19.4 11L21.4 9.4 19.4 6 17 7A7.4 7.4 0 0 0 15.3 6L15 3.5H11L10.6 6A7.4 7.4 0 0 0 8.9 7L6.5 6 4.5 9.4 6.5 11A7.6 7.6 0 0 0 6.5 13L4.5 14.6 6.5 18 8.9 17A7.4 7.4 0 0 0 10.6 18L11 20.5H15L15.4 18A7.4 7.4 0 0 0 17.1 17L19.5 18 21.5 14.6ZM12 9A3 3 0 1 0 12 15A3 3 0 1 0 12 9Z');
