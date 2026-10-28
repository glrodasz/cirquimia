/**
 * How drawn shapes are used (prototype, chosen with `?cast=` and remembered):
 * - 'barra': every shape goes to the bar; tap its slot, then the map (the classic flow).
 * - 'mano': the new shape is held in hand (its slot picked) and the next tap casts it.
 * - 'dibujo': like 'mano', but squares and stars strike right where they were drawn.
 * In both prototypes circles and rhombi go off as soon as they are drawn.
 */
export type CastMode = 'barra' | 'mano' | 'dibujo';

const STORE = 'cirquimia.cast';
const MODES: CastMode[] = ['barra', 'mano', 'dibujo'];
const isMode = (v: string | null): v is CastMode => MODES.includes(v as CastMode);

function load(): CastMode {
  const asked = new URLSearchParams(location.search).get('cast');
  try {
    if (isMode(asked)) localStorage.setItem(STORE, asked);
    const stored = localStorage.getItem(STORE);
    return isMode(stored) ? stored : 'barra';
  } catch {
    return isMode(asked) ? asked : 'barra';
  }
}

export const castMode = load();
