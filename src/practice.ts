import { shapeIcon } from './ammo';
import { DAMAGE } from './combat';
import type { ShapeKind } from './gestures';
import type { Element } from './spells';
import { t } from './i18n';

type Drill = 'square' | 'pentagram' | 'triangle' | 'triangleDown' | 'rune';
const DRILLS: Array<{ id: Drill; value: string }> = [
  { id: 'square', value: String(DAMAGE.earth) },
  { id: 'pentagram', value: `5×${DAMAGE.columns}` },
  { id: 'triangle', value: String(DAMAGE.fire) },
  { id: 'triangleDown', value: String(DAMAGE.water) },
  { id: 'rune', value: '+25%' },
];
const DRILL_OF: Record<Element, Drill> = { earth: 'square', columns: 'pentagram', fire: 'triangle', water: 'triangleDown' };
/** Seconds each tip stays before the next attack still to try. */
const TIP_TIME = 6;
/** Seconds the card stays fully opaque (after it appears, or after news) before it steps back to half. */
const QUIET_AFTER = 5;
/** Set once the player closes the card: the attacks are in the symbols book from then on. */
const STORE = 'cirquimia.practice';
const FLY_TIME = 650;
/** Seconds the well done stays up, once every attack has landed, before the card files itself into the book. */
const DONE_LINGER = 2.5;

function closedBefore() {
  try {
    return localStorage.getItem(STORE) === 'closed';
  } catch {
    return false;
  }
}

/**
 * Training card, bottom centre above the HUD: every attack with its damage, ticked once it lands on the scarecrow,
 * and a tip for one still to try. It never takes a touch, so drawing over it works as anywhere else.
 */
export class PracticeCard {
  private readonly el = document.createElement('div');
  private readonly tip = document.createElement('span');
  private readonly done = new Set<Drill>();
  private tipIndex = 0;
  private tipTimer = 0;
  private shown = false;
  private quietTimer = 0;
  private closed = closedBefore();

  constructor() {
    this.el.id = 'practice';
    this.el.setAttribute('role', 'status');
    this.el.hidden = true;
    const chips = DRILLS.map(
      (d) =>
        `<li data-drill="${d.id}"><span class="fig ${d.id}">${d.id === 'rune' ? '<i>✦</i>' : shapeIcon(d.id as ShapeKind)}</span>` +
        `<b>${d.id === 'rune' ? t.practice.rune : `-${d.value}`}</b></li>`,
    ).join('');
    this.el.innerHTML = `<p class="head"><b>${t.practice.title}</b> · ${t.practice.body}</p><ul>${chips}</ul>`;
    this.tip.className = 'tip-line';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'close';
    close.textContent = '×';
    close.setAttribute('aria-label', t.practice.close);
    for (const type of ['pointerdown', 'pointerup']) close.addEventListener(type, (e) => e.stopPropagation());
    close.addEventListener('click', () => this.close());
    this.el.append(this.tip, close);
    document.body.append(this.el);
  }

  /** Shown during training, hidden in a real match. Every new training session starts with nothing ticked. */
  show(on: boolean) {
    if (this.closed) return; // filed into the book for good (close() hides it once its flight lands)
    if (on === this.shown) return;
    this.shown = on;
    this.el.hidden = !on;
    if (!on) return;
    this.done.clear();
    for (const li of this.el.querySelectorAll('li')) li.classList.remove('done');
    this.tipIndex = 0;
    this.tipTimer = 0;
    this.renderTip();
    this.wake(QUIET_AFTER + 1.6); // it fades in after the restart toast
  }

  /**
   * Closed for good, by its X or once every attack has landed: the card flies into the symbols book, where every
   * attack is explained, and the book nods.
   */
  private close() {
    if (this.closed) return;
    this.closed = true;
    try {
      localStorage.setItem(STORE, 'closed');
    } catch {
      // Blocked storage: it shows again next visit.
    }
    clearTimeout(this.quietTimer);
    const book = document.getElementById('book-btn');
    const from = this.el.getBoundingClientRect();
    const to = book?.getBoundingClientRect();
    const dx = to ? to.left + to.width / 2 - (from.left + from.width / 2) : 0;
    const dy = to ? to.top + to.height / 2 - (from.top + from.height / 2) : 40;
    const fly = this.el.animate(
      [
        { transform: 'translateX(-50%)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * 0.6}px), ${dy * 0.5}px) scale(.45)`, opacity: 0.9, offset: 0.55 },
        { transform: `translate(calc(-50% + ${dx}px), ${dy}px) scale(.06)`, opacity: 0.2 },
      ],
      { duration: FLY_TIME, easing: 'cubic-bezier(.5,0,.75,.4)' },
    );
    fly.onfinish = () => {
      this.shown = false;
      this.el.hidden = true;
      book?.animate(
        [
          { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(224,162,60,.9)' },
          { transform: 'scale(1.3)', boxShadow: '0 0 0 8px rgba(224,162,60,.35)' },
          { transform: 'scale(1)', boxShadow: '0 0 0 14px rgba(224,162,60,0)' },
        ],
        { duration: 600, easing: 'ease-out' },
      );
    };
  }

  /** Back to full strength for a moment, then half again so the meadow shows through. */
  private wake(seconds = QUIET_AFTER) {
    this.el.classList.remove('quiet');
    clearTimeout(this.quietTimer);
    this.quietTimer = window.setTimeout(() => this.el.classList.add('quiet'), seconds * 1000);
  }

  /** The alchemist's strike hit the scarecrow. */
  hit(element: Element, boosted: boolean) {
    this.tick(DRILL_OF[element]);
    if (boosted) this.tick('rune');
  }

  /** The scarecrow went down: say a new one is coming, then go back to the tips. */
  knocked() {
    this.tip.textContent = t.practice.down;
    this.tipTimer = -TIP_TIME / 2;
    this.wake();
  }

  update(dt: number) {
    if (!this.shown) return;
    if ((this.tipTimer += dt) < TIP_TIME) return;
    this.tipTimer = 0;
    this.tipIndex++;
    this.renderTip();
  }

  private tick(drill: Drill) {
    if (this.done.has(drill)) return;
    this.done.add(drill);
    const li = this.el.querySelector(`li[data-drill="${drill}"]`);
    li?.classList.add('done');
    li?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 360, easing: 'ease-out' });
    this.wake();
    if (this.done.size === DRILLS.length) {
      this.tip.textContent = t.practice.allDone;
      this.tipTimer = -Infinity; // no more tips: the card is about to go
      window.setTimeout(() => this.shown && this.close(), DONE_LINGER * 1000);
      return;
    }
    if (this.tipTimer >= 0) {
      this.tipTimer = 0;
      this.renderTip();
    }
  }

  /** A tip for one of the attacks not landed yet, taking turns; a well done once they all have. */
  private renderTip() {
    const left = DRILLS.filter((d) => !this.done.has(d.id));
    this.tip.textContent = left.length ? t.practice.tips[left[this.tipIndex % left.length].id] : t.practice.allDone;
  }
}
