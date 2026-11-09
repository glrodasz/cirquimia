import { downArrow } from './icons';
import { DRILLS, showPractice, type Drill } from './help';
import type { Element } from './spells';
import { t } from './i18n';

const DRILL_OF: Record<Element, Drill> = { earth: 'square', columns: 'pentagram', fire: 'triangle', water: 'triangleDown', blast: 'hourglass' };


/**
 * Training progress, kept in the symbols book: the book wears a gold ring while there are attacks left to try,
 * ticks each one on its pages, and flashes green with a little "Earth!" note the first time each one lands.
 */
export class Practice {
  private readonly done = new Set<Drill>();
  private on = false;

  /** Training starts (or stops): a fresh session starts with nothing tried. */
  set(on: boolean) {
    if (on === this.on) return;
    this.on = on;
    this.done.clear();
    showPractice(on ? this.done : null);
    this.ring();
  }

  /** The alchemist's strike hit the scarecrow. */
  hit(element: Element, boosted: boolean) {
    if (!this.on) return;
    const fresh = [DRILL_OF[element], ...(boosted ? (['rune'] as Drill[]) : [])].filter((d) => !this.done.has(d));
    if (!fresh.length) return;
    for (const d of fresh) this.done.add(d);
    this.ring();
    this.celebrate(fresh[0] === 'rune' ? t.practice.rune : t.help.names[fresh[0] as Exclude<Drill, 'rune'>]);
  }

  private get book() {
    return document.getElementById('book-btn');
  }

  private ring() {
    const book = this.book;
    if (!book) return;
    const left = this.on && this.done.size < DRILLS.length;
    book.classList.toggle('train', left);
    if (this.on) book.setAttribute('aria-label', t.practice.bookAria);
    else book.setAttribute('aria-label', t.help.symbolsButton);
  }

  /** The book glows green and a note pops over it, with an arrow down into it: that attack is ticked in there. */
  private celebrate(name: string) {
    const book = this.book;
    if (!book) return;
    book.classList.remove('got');
    void book.offsetWidth;
    book.classList.add('got');
    book.addEventListener('animationend', () => book.classList.remove('got'), { once: true });
    const r = book.getBoundingClientRect();
    const note = document.createElement('div');
    note.className = 'book-got';
    note.setAttribute('role', 'status');
    const all = this.done.size === DRILLS.length;
    note.innerHTML = `<span>✓ ${all ? t.practice.allDone : t.practice.got(name)}</span>${downArrow()}`;
    // Kept on screen: right-aligned buttons would push a long note past the edge.
    note.style.left = `${Math.min(r.left + r.width / 2, innerWidth - 90)}px`;
    // Below the book, arrow up, when the HUD is at the top; above it otherwise.
    const below = r.top < innerHeight / 2;
    note.classList.toggle('below', below);
    note.style.top = `${below ? r.bottom + 4 : r.top - 4}px`;
    note.addEventListener('animationend', () => note.remove());
    document.body.append(note);
  }
}
