/**
 * The one popover the game teaches with (the tutorial's lessons and the training's speech bubbles): a grimoire note
 * that sits next to what it talks about, with a nub pointing at it. Its look lives in index.html (`.pop`).
 */

/** What a popover points at: a spot on screen and which side of it the note would rather sit on. */
export interface PopAnchor {
  x: number;
  y: number;
  /** Room to keep clear around the spot (0: point right at it). */
  r: number;
  side: 'above' | 'below';
  /** When the note sits below, the edge it hangs from (default y + r): e.g. the bottom of a guide drawn over the spot. */
  below?: number;
}

const PAD = 12; // px from the screen edges
const GAP = 12; // px between the spot and the note, room for the nub
const NUB_INSET = 16; // px the nub keeps from the note's corners

export class Popover {
  readonly el = document.createElement('div');
  private readonly nub = document.createElement('i');
  /** The note's top-left corner as drawn, easing toward where it should be (null: jump there next time). */
  private placed: { x: number; y: number } | null = null;

  constructor(...content: Node[]) {
    this.el.className = 'pop';
    this.el.setAttribute('role', 'status');
    this.nub.className = 'nub';
    this.el.append(this.nub, ...content);
  }

  /** The next placement jumps straight there (a new note pops in place instead of gliding from the last one). */
  snap() {
    this.placed = null;
  }

  /**
   * Puts the note next to `a`: on its preferred side when it fits, else the other one, inside the screen and under
   * the HUD row, with the nub toward the spot. It glides there rather than jumping. No anchor: bottom centre.
   */
  place(a: PopAnchor | null, dt: number) {
    const w = this.el.offsetWidth;
    const h = this.el.offsetHeight;
    const top = Math.max(PAD, (document.getElementById('book-btn')?.getBoundingClientRect().bottom ?? 52) + 10);
    const bottom = innerHeight - PAD;
    let x: number;
    let y: number;
    let side: PopAnchor['side'] | 'none' = 'none';
    if (a) {
      const below = (a.below ?? a.y + a.r) + GAP;
      const above = a.y - a.r - GAP - h;
      const fitsBelow = below + h <= bottom;
      const fitsAbove = above >= top;
      side = a.side === 'below' ? (fitsBelow || !fitsAbove ? 'below' : 'above') : fitsAbove || !fitsBelow ? 'above' : 'below';
      y = side === 'below' ? below : above;
      x = a.x - w / 2;
    } else {
      x = (innerWidth - w) / 2;
      y = bottom - h;
    }
    x = Math.min(Math.max(x, PAD), innerWidth - PAD - w);
    y = Math.min(Math.max(y, top), bottom - h);
    const k = this.placed ? 1 - Math.exp(-dt * 10) : 1;
    const placed = (this.placed ??= { x, y });
    placed.x += (x - placed.x) * k;
    placed.y += (y - placed.y) * k;
    this.el.style.transform = `translate(${placed.x.toFixed(1)}px, ${placed.y.toFixed(1)}px)`;
    this.el.dataset.side = side;
    if (a) this.nub.style.left = `${Math.min(Math.max(a.x - placed.x, NUB_INSET), w - NUB_INSET).toFixed(1)}px`;
  }
}
