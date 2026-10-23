import type { ShapeKind } from './gestures';

const MAX_SLOTS = 6;

const ICONS: Record<ShapeKind, string> = {
  circle: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="14"/></svg>',
  triangle: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6 34 31H6Z"/></svg>',
  triangleDown: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 34 34 9H6Z"/></svg>',
  square: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="8" width="24" height="24"/></svg>',
  rhombus: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 33 20 20 36 7 20Z"/></svg>',
  pentagram: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20.0 6.0 28.8 33.1 5.7 16.4 34.3 16.4 11.2 33.1Z"/></svg>',
};

const LABELS: Record<ShapeKind, string> = {
  circle: 'Círculo',
  triangle: 'Triángulo',
  triangleDown: 'Triángulo invertido',
  square: 'Cuadrado',
  rhombus: 'Rombo',
  pentagram: 'Pentagrama',
};

/**
 * Stored shapes along the bottom of the screen. Tap one, then tap the map to use it.
 * Triangles take two taps: first on a fire or water source to charge them, then on the target.
 */
export class AmmoBar {
  private readonly bar = document.createElement('div');
  private selected: HTMLButtonElement | null = null;

  constructor() {
    this.bar.id = 'ammo';
    this.bar.setAttribute('role', 'toolbar');
    this.bar.setAttribute('aria-label', 'Círculos de transmutación');
    document.body.append(this.bar);
  }

  get aiming() {
    return this.selected !== null;
  }

  /** Adds a slot; the icon flies in from where the shape was drawn. When full, the oldest slot drops out. */
  add(kind: ShapeKind, fromX: number, fromY: number) {
    const live = [...this.bar.querySelectorAll<HTMLButtonElement>('.slot:not(:disabled)')];
    if (live.length >= MAX_SLOTS) this.discard(live[0]);
    const slot = document.createElement('button');
    slot.type = 'button';
    slot.className = `slot ${kind}`;
    slot.dataset.kind = kind;
    slot.setAttribute('aria-label', LABELS[kind]);
    slot.innerHTML = ICONS[kind];
    slot.addEventListener('pointerdown', (e) => e.stopPropagation());
    slot.addEventListener('click', () => this.select(slot === this.selected ? null : slot));
    this.bar.append(slot);

    const box = slot.getBoundingClientRect();
    const dx = fromX - (box.left + box.width / 2);
    const dy = fromY - (box.top + box.height / 2);
    slot.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(1.8)`, opacity: 0.2 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ],
      { duration: 420, easing: 'cubic-bezier(.2,.8,.3,1)' },
    );
    return true;
  }

  private discard(slot: HTMLButtonElement) {
    if (slot === this.selected) this.select(null);
    slot.disabled = true;
    const out = slot.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'translateY(16px) scale(0.6)', opacity: 0 },
      ],
      { duration: 200, easing: 'ease-in' },
    );
    out.onfinish = () => slot.remove();
  }

  select(slot: HTMLButtonElement | null) {
    this.selected?.classList.remove('selected');
    this.selected = slot;
    slot?.classList.add('selected');
    document.body.classList.toggle('aiming', slot !== null);
  }

  /** The selected shape and whether it already carries fire or water, or null if nothing is selected. */
  selection(): { kind: ShapeKind; charged: boolean } | null {
    const slot = this.selected;
    return slot ? { kind: slot.dataset.kind as ShapeKind, charged: slot.classList.contains('charged') } : null;
  }

  /** Marks the selected slot as charged; it stays selected, ready for the second tap. */
  charge() {
    const slot = this.selected;
    if (!slot) return;
    slot.classList.add('charged');
    slot.animate([{ transform: 'translateY(-8px) scale(1.3)' }, { transform: 'translateY(-8px) scale(1.08)' }], { duration: 320, easing: 'cubic-bezier(.2,.8,.3,1)' });
  }

  /** Shakes the selected slot: it cannot be used where the player tapped. */
  reject() {
    this.selected?.animate(
      [0, -6, 6, -4, 4, 0].map((x) => ({ transform: `translate(${x}px, -8px) scale(1.08)` })),
      { duration: 300, easing: 'ease-out' },
    );
  }

  /** Uses up the selected slot. Returns its shape, or null if nothing was selected. */
  spend(): ShapeKind | null {
    const slot = this.selected;
    if (!slot) return null;
    this.select(null);
    const kind = slot.dataset.kind as ShapeKind;
    const out = slot.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'translateY(-24px) scale(0.4)', opacity: 0 },
      ],
      { duration: 220, easing: 'ease-in' },
    );
    out.onfinish = () => slot.remove();
    slot.disabled = true;
    return kind;
  }
}
