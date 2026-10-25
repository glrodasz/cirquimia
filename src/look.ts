import * as THREE from 'three';

/**
 * Visual style of the meadow. "Bruma" is the game's look; "Glade" is an experiment towards a warm,
 * painterly diorama (golden low sun, soft long shadows, lush grass tufts, wildflowers, fluffy crowns).
 * Picked with ?look=glade|bruma, then the last choice; switching reloads the page.
 */
export type LookName = 'bruma' | 'glade';

const STORE = 'cirquimia.look';

function pick(): LookName {
  const fromUrl = new URLSearchParams(location.search).get('look');
  if (fromUrl === 'glade' || fromUrl === 'bruma') return fromUrl;
  try {
    return localStorage.getItem(STORE) === 'glade' ? 'glade' : 'bruma';
  } catch {
    return 'bruma';
  }
}

export const LOOK: LookName = pick();
export const GLADE = LOOK === 'glade';

export function setLook(name: LookName) {
  try {
    localStorage.setItem(STORE, name);
  } catch {
    // Storage may be blocked; the URL below still carries the choice.
  }
  const url = new URL(location.href);
  url.searchParams.set('look', name);
  location.replace(url);
}

const color = new THREE.Color();
const hsl = { h: 0, s: 0, l: 0 };
const SRGB = THREE.SRGBColorSpace;

/** Grey stone and rubble tints shift to sun-baked sandstone in Glade; anything else passes through. */
export function stoneTint(hex: THREE.ColorRepresentation): THREE.ColorRepresentation {
  if (!GLADE) return hex;
  color.set(hex).getHSL(hsl, SRGB);
  // Only greys: warm wood, embers and crystals keep their colour.
  if (hsl.s > 0.15) return hex;
  return color.setHSL(0.11, 0.3, 0.68 + (hsl.l - 0.55) * 0.8, SRGB).getHex();
}

/** Cool sage foliage turns to sunlit spring green in Glade, keeping each tint's light/dark variation. */
export function leafTint(hex: THREE.ColorRepresentation): THREE.ColorRepresentation {
  if (!GLADE) return hex;
  color.set(hex).getHSL(hsl, SRGB);
  return color.setHSL(0.25 + (hsl.h - 0.4) * 0.3, 0.42, 0.42 + (hsl.l - 0.42) * 0.8, SRGB).getHex();
}
