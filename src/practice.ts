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
    this.el.append(this.tip);
    document.body.append(this.el);
  }

  /** Shown during training, hidden in a real match. Every new training session starts with nothing ticked. */
  show(on: boolean) {
    if (on === this.shown) return;
    this.shown = on;
    this.el.hidden = !on;
    if (!on) return;
    this.done.clear();
    for (const li of this.el.querySelectorAll('li')) li.classList.remove('done');
    this.tipIndex = 0;
    this.tipTimer = 0;
    this.renderTip();
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
  }

  update(dt: number) {
    if (!this.shown || (this.tipTimer += dt) < TIP_TIME) return;
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
