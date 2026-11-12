/** The HUD pieces that dim while the player is busy in the meadow. */
const CONTROLS = ['#match', '#match-time', '#help-btn', '#book-btn', '#rank-btn', '#sound-btn', '#dev-gear'];
/** A control that is calling for attention (spotlight, training ring, freshly earned, panel open) stays fully lit. */
const CALLING = ['spot', 'train', 'got', 'open'];
/** How long a touched or hovered control keeps the HUD fully lit. */
const WAKE_MS = 5000;
/** A stroke this close to a control (in CSS px) makes it step further out of the way. */
const NEAR_PX = 64;
/** After the stroke leaves or ends, the control stays faded a moment so it does not flicker back mid-gesture. */
const NEAR_HOLD_MS = 400;

export interface HudFadeSource {
  /** A real game is on: tutorial behind, match not decided, no panel covering the meadow. */
  readonly playing: boolean;
}

/**
 * Full HUD at the start of a match; once the player walks or draws it fades to 40 % so the meadow reads through.
 * Touching or hovering any control lights it all up again for a few seconds, and a stroke that passes near a
 * control fades that one further so it does not sit in the way. Opacity only: every control stays clickable.
 */
export function mountHudFade(source: HudFadeSource) {
  let moved = false;
  let wakeUntil = 0;
  let hovered = 0;
  const nearUntil = new Map<Element, number>();
  const els = () => CONTROLS.map((s) => document.querySelector(s)).filter((e): e is HTMLElement => !!e);

  const wake = () => {
    wakeUntil = performance.now() + WAKE_MS;
  };
  const isControl = (t: EventTarget | null) => t instanceof Element && CONTROLS.some((s) => t.closest(s));
  addEventListener('pointerdown', (e) => isControl(e.target) && wake(), true);
  addEventListener('focusin', (e) => isControl(e.target) && wake());
  // The mouse resting on a control keeps it lit; the five seconds start once it leaves.
  addEventListener('pointerover', (e) => {
    if (e.pointerType === 'mouse' && isControl(e.target) && !isControl(e.relatedTarget)) hovered++;
  });
  addEventListener('pointerout', (e) => {
    if (e.pointerType === 'mouse' && isControl(e.target) && !isControl(e.relatedTarget)) {
      hovered = Math.max(0, hovered - 1);
      wake();
    }
  });

  return {
    /** The player walked, steered or drew: from now on the HUD may step back. */
    played() {
      if (source.playing) moved = true;
    },
    /** A new match: full HUD again until the player moves. */
    reset() {
      moved = false;
      nearUntil.clear();
    },
    /** A point of a stroke in progress, in client px. */
    stroke(x: number, y: number) {
      const now = performance.now();
      for (const el of els()) {
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        if (Math.hypot(dx, dy) < NEAR_PX) nearUntil.set(el, now + NEAR_HOLD_MS);
      }
    },
    update() {
      const now = performance.now();
      if (!source.playing) moved = false;
      const quiet = moved && source.playing && !hovered && now > wakeUntil;
      for (const el of els()) {
        const calling = CALLING.some((c) => el.classList.contains(c));
        const near = (nearUntil.get(el) ?? 0) > now && !calling;
        el.classList.toggle('hud-near', near);
        el.classList.toggle('hud-dim', quiet && !near && !calling);
      }
    },
  };
}
