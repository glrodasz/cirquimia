import { isStar, type Element } from './spells';

export type Fluid = 'fire' | 'water';
export type Difficulty = 'facil' | 'normal' | 'dificil' | 'experto';

export interface Tuning {
  speed: number;
  /** Seconds of rest after a finished attack (the last strike of a combination), min and max. */
  cooldown: [number, number];
  /** Seconds the ground warns before the rival's strike erupts: time for the player to step out or raise a wall. */
  warn: number;
  /** World units of random aim error. */
  aimError: number;
  /** How far ahead it aims along where the foe is heading: 0 aims where it stands, 1 where it will be. */
  lead: number;
  /** Chance of stepping out of an incoming strike, and how fast it reacts. */
  dodge: number;
  reaction: number;
  /** Chance of an attack drawing fire or water (35) from a source first, instead of using pillars (20). */
  elemental: number;
  /** Chance, planning fire or water, of fetching the other one too to merge them into the hourglass (blast, 45). */
  blast: number;
  /** Chance, planning fire or water, of drawing the star over it to merge them into a fire or water star (5×20). */
  star: number;
  /** Chance of healing instead of attacking when at half health or less (never with a symbol in hand). */
  heal: number;
  /** Chance of an earth attack being the pentagram's columns (10) instead of the square's pillars (20). */
  columns: number;
  /** Seconds spent drawing a spell's shape over its head before storing it, as the player has to draw too. */
  draw: number;
  /** Seconds kept between two rivals' strikes at the alchemist, so they do not land together. */
  stagger: number;
  /** Chance of raising a wall (circle) against an incoming strike instead of stepping out of it. */
  guard: number;
  /** Chance of opening an attack with a wall, to strike from inside it where nobody else's strikes reach. */
  fortress: number;
  /** Seconds between two walls of the same rival. */
  wallCooldown: number;
  /** Strikes right away from inside a fresh wall, while it protects its caster. */
  counter: boolean;
  /**
   * How restless it gets while the alchemist holds an attack aimed its way (it can read the symbol over its head):
   * 0 keeps wandering as usual, 1 changes direction every half second or so, so a strike has to be timed.
   */
  evade: number;
  /** Keeps moving the whole time it faces the alchemist, like a player on the stick, not only while threatened. */
  restless: boolean;
  /** Seconds a foe has to stand still before it notices and goes for it with the quickest sure strike. */
  punishAfter: number;
  /** Once it has noticed, at most this many seconds before it starts drawing that strike. */
  punishGap: number;
}

// The levels differ in skill, not in luck: harder rivals read a still target sooner, combine symbols more, defend
// more, move more and draw faster. Whatever the level, a rival commits to the attack it planned and casts it.
export const TUNING: Record<Difficulty, Tuning> = {
  facil: { speed: 0.9, cooldown: [4, 5.5], warn: 0.9, aimError: 0.35, lead: 0, dodge: 0.1, reaction: 0.25, elemental: 0, blast: 0, star: 0, heal: 0.15, columns: 0.4, draw: 1, stagger: 0, guard: 0.08, fortress: 0, wallCooldown: 12, counter: false, evade: 0, restless: false, punishAfter: 3, punishGap: 1.5 },
  normal: { speed: 1.4, cooldown: [2.8, 3.8], warn: 0.6, aimError: 0.12, lead: 0.3, dodge: 0.75, reaction: 0.14, elemental: 0.3, blast: 0.15, star: 0.15, heal: 0.35, columns: 0.25, draw: 0.85, stagger: 0, guard: 0.3, fortress: 0.08, wallCooldown: 9, counter: false, evade: 0.6, restless: true, punishAfter: 2, punishGap: 0.8 },
  // Hard but beatable: the warning outlasts a human reaction plus a step, and every spell is drawn in sight first.
  dificil: { speed: 1.55, cooldown: [2.6, 3.4], warn: 0.65, aimError: 0.08, lead: 0.6, dodge: 0.7, reaction: 0.12, elemental: 0.5, blast: 0.5, star: 0.3, heal: 0.35, columns: 0.15, draw: 0.7, stagger: 1, guard: 0.5, fortress: 0.3, wallCooldown: 6, counter: true, evade: 0.8, restless: true, punishAfter: 1.2, punishGap: 0.5 },
  // Hard pushed well further: relentless, sharp aim well ahead, dodges and walls most strikes, loves the blast;
  // the warning still leaves time to step out.
  experto: { speed: 1.6, cooldown: [1.8, 2.4], warn: 0.55, aimError: 0.04, lead: 0.9, dodge: 0.46, reaction: 0.1, elemental: 0.7, blast: 0.75, star: 0.4, heal: 0.5, columns: 0.1, draw: 0.5, stagger: 0.6, guard: 0.85, fortress: 0.45, wallCooldown: 3, counter: true, evade: 1, restless: true, punishAfter: 0.6, punishGap: 0.3 },
};

// A rival keeps its freshly drawn symbol this long before casting it, so everyone can read what is coming.
export const RIVAL_HOLD = 0.5;
// Seconds between two steps of one combination (fetching fire, then water, then casting the hourglass).
const STEP_GAP: [number, number] = [0.8, 1.4];
// A rival only opens with a wall when its foe is this close: far off, the wall is not worth the turn.
export const FORTRESS_RANGE = 2.6;

export type Plan = { kind: 'heal' } | { kind: 'wall' } | { kind: 'charge'; element: Fluid } | { kind: 'strike'; element: Element };

/** What the rival can see of the match when it decides. */
export interface MindView {
  hp: number;
  foeDistance: number;
  /** Seconds its foe has not moved at all. */
  foeStill: number;
  /** A wall could go up right now (its own cooldown is over, none standing, not on a rune circle). */
  canWall: boolean;
  /** A fire or water source is in play to draw from. */
  hasSource(element: Fluid): boolean;
  /** Books a strike landing in `delay` s, so two rivals never hit the alchemist together; false when it must wait. */
  book(plan: Plan, delay: number): boolean;
}

/** `draw`: it starts tracing the plan's symbol over its head; `act`: the symbol is cast now. */
export type MindAction = { kind: 'draw'; plan: Plan; seconds: number } | { kind: 'act'; plan: Plan };

const fluidStar = (f: Fluid): Element => (f === 'fire' ? 'fireStar' : 'waterStar');

/**
 * How a rival decides, free of the scene so it can be tested: it plans one attack at a time (a plain strike, or a
 * short combination such as fire, then water, then the hourglass), commits to it and casts it. A symbol in hand is
 * only ever spent by the attack it was fetched for, never drawn over by a wall or a heal. A foe that stands still
 * gets the quickest sure strike soon after, as a player would take the free hit.
 */
export class RivalMind {
  /** Fire or water already drawn from a source (or both, merged into the blast), held until the attack casts it. */
  charged: Fluid | 'blast' | null = null;
  private attackTimer: number;
  private drawing: Plan | null = null;
  private drawTimer = 0;
  /** The rest of the attack it committed to. */
  private combo: Plan[] = [];

  constructor(
    readonly tuning: Tuning,
    private readonly rng: () => number = Math.random,
  ) {
    this.attackTimer = this.between(1.5, 2.5);
  }

  /** In the middle of an attack: drawing, holding a symbol, or with steps of a combination still to go. */
  get busy() {
    return this.drawing !== null || this.charged !== null || this.combo.length > 0;
  }

  get isDrawing() {
    return this.drawing !== null;
  }

  private between(min: number, max: number) {
    return min + (max - min) * this.rng();
  }

  tick(dt: number, view: MindView): MindAction | null {
    if (this.drawing) {
      if ((this.drawTimer -= dt) > 0) return null;
      const plan = this.drawing;
      this.drawing = null;
      return this.complete(plan, view);
    }
    const tuning = this.tuning;
    const still = view.foeStill >= tuning.punishAfter;
    if (still) this.attackTimer = Math.min(this.attackTimer, tuning.punishGap);
    if ((this.attackTimer -= dt) > 0) return null;

    const plan = this.next(view, still);
    // Fire or water fetched earlier is already stored: no new shape to draw before casting it (unless a star is
    // drawn over it, to merge them).
    const drawn = !(plan.kind === 'strike' && this.charged && !isStar(plan.element));
    // A wall goes up the moment its circle is finished; every other symbol is held a moment first.
    const delay = drawn ? tuning.draw + (plan.kind === 'wall' ? 0 : RIVAL_HOLD) : 0;
    if (plan.kind === 'strike' && !view.book(plan, delay)) {
      // Another rival's strike lands on the alchemist then: same attack, a moment later.
      this.combo.unshift(plan);
      this.attackTimer = this.between(0.4, 0.8);
      return null;
    }
    if (delay <= 0) return this.complete(plan, view);
    this.drawing = plan;
    this.drawTimer = delay;
    return { kind: 'draw', plan, seconds: tuning.draw };
  }

  /** The next step: the rest of the committed attack, a fresh one, or the quickest strike at a foe standing still. */
  private next(view: MindView, still: boolean): Plan {
    if (still) {
      // A free hit: cast what is in hand, or a square, which lands right where it stands (a star would ring it, safe
      // in the middle). Fetching more or walling up would only give the target time to move.
      this.combo = [];
      return { kind: 'strike', element: this.charged ?? 'earth' };
    }
    // A wall it planned to open with is skipped once one is up already (or cannot be raised here).
    if (this.combo[0]?.kind === 'wall' && !view.canWall) this.combo.shift();
    if (this.combo.length === 0) this.combo = this.planAttack(view);
    return this.combo.shift()!;
  }

  private planAttack(view: MindView): Plan[] {
    // Something already in hand (a combination cut short): it is cast, never thrown away.
    if (this.charged) return [{ kind: 'strike', element: this.charged }];
    if (view.hp <= 50 && this.rng() < this.tuning.heal) return [{ kind: 'heal' }];
    const near = view.foeDistance < FORTRESS_RANGE;
    if (view.canWall && near && this.rng() < this.tuning.fortress) {
      // With counter it strikes right out of the fresh wall; otherwise it rests behind it.
      return this.tuning.counter ? [{ kind: 'wall' }, ...this.planStrike(view)] : [{ kind: 'wall' }];
    }
    return this.planStrike(view);
  }

  private planStrike(view: MindView): Plan[] {
    // Fire and water have to be drawn from a source on the map first, like the player does.
    if (this.rng() < this.tuning.elemental) {
      const order: Fluid[] = this.rng() < 0.5 ? ['fire', 'water'] : ['water', 'fire'];
      const first = order.find((e) => view.hasSource(e));
      if (first) {
        const other: Fluid = first === 'fire' ? 'water' : 'fire';
        // The two triangles merge into the hourglass, or the star drawn over one into a fire or water star.
        if (this.rng() < this.tuning.blast && view.hasSource(other)) {
          return [{ kind: 'charge', element: first }, { kind: 'charge', element: other }, { kind: 'strike', element: 'blast' }];
        }
        if (this.rng() < this.tuning.star) return [{ kind: 'charge', element: first }, { kind: 'strike', element: fluidStar(first) }];
        return [{ kind: 'charge', element: first }, { kind: 'strike', element: first }];
      }
    }
    return [{ kind: 'strike', element: this.rng() < this.tuning.columns ? 'columns' : 'earth' }];
  }

  /** The symbol is finished: cast it, unless the world changed under it (the source is gone, or it stands on runes). */
  private complete(plan: Plan, view: MindView): MindAction | null {
    if (plan.kind === 'charge' && !view.hasSource(plan.element)) {
      // Nothing to draw from any more: whatever it holds is cast as it is.
      this.combo = this.charged ? [{ kind: 'strike', element: this.charged }] : [];
      this.attackTimer = this.between(...STEP_GAP);
      return null;
    }
    if (plan.kind === 'wall' && !view.canWall) {
      // Refused (walked onto a rune circle while drawing it): it goes on with the attack.
      this.attackTimer = this.between(...STEP_GAP);
      return null;
    }
    if (plan.kind === 'charge') {
      const merged = this.charged !== null && this.charged !== 'blast' && this.charged !== plan.element;
      this.charged = merged ? 'blast' : plan.element;
    } else if (plan.kind === 'strike') {
      this.charged = null;
    }
    if (plan.kind === 'wall' && this.tuning.counter) this.attackTimer = 0.1;
    else if (this.combo.length > 0) this.attackTimer = this.between(...STEP_GAP);
    else this.attackTimer = this.between(...this.tuning.cooldown);
    return { kind: 'act', plan };
  }

  /**
   * A strike is coming down on it: raise a wall (hands free only, as a circle would replace a held symbol), step out
   * of it, or stay. Halfway through drawing it can only step out.
   */
  threatened(canWall: boolean): 'wall' | 'dodge' | null {
    if (!this.drawing && !this.charged && canWall && this.rng() < this.tuning.guard) {
      if (this.tuning.counter) this.attackTimer = Math.min(this.attackTimer, 0.1);
      return 'wall';
    }
    // Holding an attack it would not throw away, it steps out instead of walling as often as it would have walled.
    const dodge = this.charged ? Math.max(this.tuning.dodge, this.tuning.guard) : this.tuning.dodge;
    return this.rng() < dodge ? 'dodge' : null;
  }

  /** Drops a spell half drawn and the rest of the plan, as when the match ends or the tutorial freezes everyone. */
  cancel() {
    this.drawing = null;
    this.combo = [];
  }
}
