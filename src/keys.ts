/** Keyboard walking for desktop: WASD or the arrow keys, relative to the screen (W / ↑ walks up the screen). */

export type MoveKey = 'up' | 'down' | 'left' | 'right';

// Physical key positions (KeyboardEvent.code), so AZERTY players get ZQSD in the same place.
const CODES: Record<string, MoveKey> = {
  KeyW: 'up',
  ArrowUp: 'up',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
};

export const moveKey = (code: string): MoveKey | null => CODES[code] ?? null;

/** Screen-space intent from the held keys: x to the right, y up the screen. Unit length, or zero. */
export function axes(held: Iterable<MoveKey>) {
  let x = 0;
  let y = 0;
  for (const k of new Set(held)) {
    if (k === 'up') y += 1;
    else if (k === 'down') y -= 1;
    else if (k === 'right') x += 1;
    else x -= 1;
  }
  const len = Math.hypot(x, y);
  return len ? { x: x / len, y: y / len } : { x: 0, y: 0 };
}

/**
 * Turns screen intent into a ground direction, given where the camera looks along the ground (fx, fz).
 * Up the screen is the camera's forward; right of the screen is forward turned a quarter clockwise seen from above.
 */
export function groundDir(a: { x: number; y: number }, fx: number, fz: number) {
  const len = Math.hypot(fx, fz) || 1;
  const f = { x: fx / len, z: fz / len };
  const r = { x: -f.z, z: f.x };
  return { x: f.x * a.y + r.x * a.x, z: f.z * a.y + r.z * a.x };
}

/** The screens that most likely come with a keyboard: a mouse or trackpad drives them. */
export const hasKeyboard = () => matchMedia('(pointer: fine)').matches;

/** Which movement keys are down. Ignores typing in fields and shortcuts (Ctrl/⌘/Alt), and forgets all on blur. */
export class KeyboardMove {
  private readonly held = new Map<string, MoveKey>();
  /** Called with the changed key (and the physical key behind it) so a hint can light it up. */
  onChange?: (key: MoveKey, down: boolean, code: string) => void;

  press(code: string, opts: { typing?: boolean; modifier?: boolean } = {}) {
    const key = moveKey(code);
    if (!key || opts.typing || opts.modifier) return false;
    if (!this.held.has(code)) {
      const fresh = ![...this.held.values()].includes(key);
      this.held.set(code, key);
      if (fresh) this.onChange?.(key, true, code);
    }
    return true;
  }

  release(code: string) {
    const key = this.held.get(code);
    if (!key) return false;
    this.held.delete(code);
    if (![...this.held.values()].includes(key)) this.onChange?.(key, false, code);
    return true;
  }

  clear() {
    for (const code of [...this.held.keys()]) this.release(code);
  }

  axes() {
    return axes(this.held.values());
  }

  /** Wires the listeners on a window (or any event target). `blocked` says when the keys should do nothing. */
  listen(target: Window, blocked: () => boolean) {
    target.addEventListener('keydown', (e) => {
      const el = e.target;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;
      if (blocked() && !this.held.has(e.code)) return;
      // Arrow keys would otherwise scroll a page or nudge a focused button.
      if (this.press(e.code, { typing, modifier: e.ctrlKey || e.metaKey || e.altKey })) e.preventDefault();
    });
    target.addEventListener('keyup', (e) => this.release(e.code));
    target.addEventListener('blur', () => this.clear());
    document.addEventListener('visibilitychange', () => document.hidden && this.clear());
  }
}
