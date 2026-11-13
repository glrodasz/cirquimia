import { describe, expect, it } from 'vitest';
import { RivalMind, TUNING, type Difficulty, type MindAction, type MindView, type Plan } from '../src/rivalMind';
import { isStar } from '../src/spells';

const LEVELS: Difficulty[] = ['facil', 'normal', 'dificil', 'experto'];
const DT = 1 / 60;
const SEEDS = 150;

/** Small seeded generator, so every run of the suite plays the same matches. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Scene {
  hp?: number;
  /** Seconds the foe has stood still at time `t` (0 while it walks). */
  still?: (t: number) => number;
  near?: boolean;
  sources?: boolean;
  /** Seconds between strikes landing on the rival, which may wall or dodge them. */
  threatEvery?: number;
}

interface Log {
  t: number;
  action: MindAction;
  charged: RivalMind['charged'];
}

/** Plays one rival's decisions for `seconds` against a scripted foe; walls block it from walling again for a while. */
function play(level: Difficulty, seed: number, seconds: number, scene: Scene = {}) {
  const mind = new RivalMind(TUNING[level], rng(seed));
  const log: Log[] = [];
  const answers: Array<{ t: number; answer: ReturnType<RivalMind['threatened']>; charged: RivalMind['charged'] }> = [];
  let wallTimer = 0;
  let nextThreat = scene.threatEvery ?? Infinity;
  for (let t = 0; t < seconds; t += DT) {
    wallTimer -= DT;
    if (t >= nextThreat) {
      nextThreat += scene.threatEvery!;
      const answer = mind.threatened(wallTimer <= 0);
      answers.push({ t, answer, charged: mind.charged });
      if (answer === 'wall') wallTimer = TUNING[level].wallCooldown;
    }
    const view: MindView = {
      hp: scene.hp ?? 100,
      foeDistance: scene.near === false ? 4 : 1.8,
      foeStill: scene.still?.(t) ?? 0,
      canWall: wallTimer <= 0,
      hasSource: () => scene.sources ?? true,
      book: () => true,
    };
    const action = mind.tick(DT, view);
    if (action) {
      if (action.kind === 'act' && action.plan.kind === 'wall') wallTimer = TUNING[level].wallCooldown;
      log.push({ t, action, charged: mind.charged });
    }
  }
  return { log, answers };
}

const acts = (log: Log[]) => log.filter((l) => l.action.kind === 'act').map((l) => ({ t: l.t, plan: l.action.plan }));
const isStrike = (p: Plan) => p.kind === 'strike';
const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

describe('a rival commits to the symbol it draws', () => {
  it('casts every symbol it draws before drawing another one', () => {
    for (const level of LEVELS) {
      for (let seed = 0; seed < SEEDS; seed++) {
        const { log } = play(level, seed, 60, { threatEvery: 2.3 });
        let drawing: Plan | null = null;
        for (const { action } of log) {
          if (action.kind === 'draw') {
            expect(drawing, `${level} #${seed} drew over an unfinished symbol`).toBeNull();
            drawing = action.plan;
          } else if (drawing) {
            expect(action.plan).toEqual(drawing);
            drawing = null;
          }
        }
      }
    }
  });

  it('never throws away fire, water or the hourglass in hand for a wall or a heal', () => {
    for (const level of LEVELS) {
      for (let seed = 0; seed < SEEDS; seed++) {
        // Hurt (so it wants to heal), close (so it wants to wall) and under fire.
        const { log, answers } = play(level, seed, 60, { hp: 40, threatEvery: 1.7 });
        let held = false;
        for (const { action, charged } of log) {
          if (action.kind === 'draw' && held) {
            // The only symbols drawn over one in hand merge with it: the other triangle, or the star.
            const p = action.plan;
            const merges = p.kind === 'charge' || (p.kind === 'strike' && isStar(p.element) && p.element !== 'columns');
            expect(merges, `${level} #${seed} drew ${JSON.stringify(p)} over a held symbol`).toBe(true);
          }
          if (action.kind === 'act') held = charged !== null;
        }
        expect(answers.filter((a) => a.charged && a.answer === 'wall')).toHaveLength(0);
      }
    }
  });

  it('casts what it fetches: every charge ends in the strike it was fetched for', () => {
    for (const level of LEVELS) {
      for (let seed = 0; seed < SEEDS; seed++) {
        const done = acts(play(level, seed, 60, { hp: 40, threatEvery: 2.9 }).log);
        for (let i = 0; i < done.length; i++) {
          if (done[i].plan.kind !== 'charge') continue;
          const rest = done.slice(i + 1);
          if (rest.length === 0) continue; // the clock ran out mid-combination
          const spent = rest.findIndex(({ plan }) => plan.kind !== 'charge');
          if (spent < 0) continue; // still fetching the second one
          expect(rest[spent].plan.kind).toBe('strike');
        }
      }
    }
  });
});

describe('a foe standing still gets hit soon', () => {
  // From the moment the foe stops: the rival notices, draws a square, holds it a moment, the ground warns, it lands.
  const LIMIT: Record<Difficulty, number> = { facil: 7.2, normal: 5.8, dificil: 4, experto: 3 };

  const landings = (level: Difficulty, stopAt: number) => {
    const out: number[] = [];
    for (let seed = 0; seed < SEEDS; seed++) {
      const { log } = play(level, seed, stopAt + 10, { still: (t) => Math.max(0, t - stopAt) });
      const first = acts(log).find(({ t, plan }) => t >= stopAt && isStrike(plan));
      out.push(first ? first.t + TUNING[level].warn - stopAt : Infinity);
    }
    return out;
  };

  for (const level of LEVELS) {
    it(`${level}: the first strike lands within ${LIMIT[level]} s of the foe stopping, from any moment`, () => {
      for (const stopAt of [0, 3.3, 7.9]) {
        const times = landings(level, stopAt);
        expect(Math.max(...times), `stopped at ${stopAt} s`).toBeLessThanOrEqual(LIMIT[level]);
      }
    });
  }

  it('harder rivals take the free hit sooner', () => {
    const typical = LEVELS.map((level) => median(landings(level, 5)));
    for (let i = 1; i < typical.length; i++) expect(typical[i]).toBeLessThan(typical[i - 1]);
  });

  it('keeps striking a foe that stays still, with no fetching or walling in between', () => {
    for (const level of LEVELS) {
      for (let seed = 0; seed < SEEDS; seed++) {
        const { log } = play(level, seed, 40, { still: (t) => t });
        const later = acts(log).filter(({ t }) => t > TUNING[level].punishAfter + 3);
        expect(later.every(({ plan }) => plan.kind === 'strike' && !isStar(plan.element))).toBe(true);
        const times = later.map(({ t }) => t);
        const gaps = times.slice(1).map((t, i) => t - times[i]);
        expect(Math.max(...gaps)).toBeLessThanOrEqual(TUNING[level].punishGap + TUNING[level].draw + 0.5 + 0.05);
      }
    }
  });
});

describe('levels differ in skill', () => {
  const tally = (level: Difficulty) => {
    let strikes = 0;
    let combos = 0;
    let walls = 0;
    let seconds = 0;
    for (let seed = 0; seed < SEEDS; seed++) {
      const { log, answers } = play(level, seed, 60, { threatEvery: 3 });
      seconds += 60;
      for (const { plan } of acts(log)) {
        if (plan.kind === 'strike') {
          strikes++;
          if (plan.element === 'blast' || plan.element === 'fireStar' || plan.element === 'waterStar') combos++;
        }
        if (plan.kind === 'wall') walls++;
      }
      walls += answers.filter((a) => a.answer === 'wall').length;
    }
    return { strikesPerMinute: (strikes / seconds) * 60, comboShare: combos / strikes, wallsPerMinute: (walls / seconds) * 60 };
  };
  const all = LEVELS.map(tally);

  it('Fácil never combines symbols; each level up combines more', () => {
    expect(all[0].comboShare).toBe(0);
    for (let i = 1; i < all.length; i++) expect(all[i].comboShare).toBeGreaterThan(all[i - 1].comboShare);
  });

  it('each level up defends with more walls', () => {
    for (let i = 1; i < all.length; i++) expect(all[i].wallsPerMinute).toBeGreaterThan(all[i - 1].wallsPerMinute);
  });

  it('each level up attacks more often', () => {
    for (let i = 1; i < all.length; i++) expect(all[i].strikesPerMinute).toBeGreaterThan(all[i - 1].strikesPerMinute);
  });
});

describe('defending', () => {
  it('only steps out of a strike while drawing, never starts a wall over a half-drawn symbol', () => {
    for (let seed = 0; seed < SEEDS; seed++) {
      const mind = new RivalMind(TUNING.experto, rng(seed));
      const view: MindView = { hp: 100, foeDistance: 4, foeStill: 0, canWall: true, hasSource: () => false, book: () => true };
      let action: MindAction | null = null;
      for (let t = 0; t < 5 && action?.kind !== 'draw'; t += DT) action = mind.tick(DT, view);
      expect(mind.isDrawing).toBe(true);
      expect(mind.threatened(true)).not.toBe('wall');
    }
  });
});
