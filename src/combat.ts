import * as THREE from 'three';
import { BODY_RADIUS, Character } from './character';
import type { Obstacle } from './meadow';
import { heightAt } from './noise';
import { PILLAR_AREA, PILLAR_WARN, STAR_REACH, STAR_STAGGER, WALL_UP, starTips, type Element, type Spells } from './spells';
import { t } from './i18n';

// Damage per strike: square (earth pillars) 20, each of the pentagram's five columns 10, fire and water triangles 35.
export const DAMAGE: Record<Element, number> = { earth: 20, columns: 10, fire: 35, water: 35 };
// Rhombus: heals the caster; 30% more when cast from inside a rune circle.
export const HEAL = 25;
const RUNE_HEAL_BOOST = 1.3;
const HEAL_COLOR = '#a8e6a1';
const MAX_HP = 100;
// After the last fall, the match waits this long (the body hits the ground) before showing the result.
const END_DELAY = 1.3;
// A strike hits anyone whose body overlaps the eruption.
const HIT_RADIUS = PILLAR_AREA + BODY_RADIUS;
const HEAD_HEIGHT = 0.72; // world units above the feet for the health bar
export const MAX_RIVALS = 2;
const RUNE_BOOST = 1.25;
const auraGeo = new THREE.RingGeometry(0.18, 0.24, 32).rotateX(-Math.PI / 2);

export type Fluid = 'fire' | 'water';
/** The nearest fire or water source the fighter at `from` could draw from, or null if there is none in play. */
export type SourceFinder = (element: Fluid, from: THREE.Vector3) => THREE.Vector3 | null;

export type Difficulty = 'facil' | 'normal' | 'dificil' | 'experto';
export const DIFFICULTY_LABEL: Record<Difficulty, string> = t.difficulty;

interface Tuning {
  speed: number;
  /** Seconds between attacks, min and max. */
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
  /** Chance of drawing fire or water (35) from a source before attacking, instead of using pillars (20). */
  elemental: number;
  /** Chance of healing instead of attacking when at half health or less. */
  heal: number;
  /** Chance of an earth attack being the pentagram's columns (10) instead of the square's pillars (20). */
  columns: number;
  /** Seconds spent drawing a spell's shape over its head before storing it, as the player has to draw too. */
  draw: number;
  /** Seconds kept between two rivals' strikes at the alchemist, so they do not land together. */
  stagger: number;
  /** Chance of raising a wall (circle) against an incoming strike instead of stepping out of it. */
  guard: number;
  /** Chance of opening an attack turn with a wall, to strike from inside it where nobody else's strikes reach. */
  fortress: number;
  /** Seconds between two walls of the same rival. */
  wallCooldown: number;
  /** Strikes right away from inside a fresh wall, while it protects its caster. */
  counter: boolean;
}

const TUNING: Record<Difficulty, Tuning> = {
  facil: { speed: 0.9, cooldown: [4, 5.5], warn: 0.9, aimError: 0.35, lead: 0, dodge: 0.1, reaction: 0.25, elemental: 0, heal: 0.15, columns: 0.4, draw: 1, stagger: 0, guard: 0.08, fortress: 0, wallCooldown: 12, counter: false },
  normal: { speed: 1.15, cooldown: [2.8, 3.8], warn: 0.6, aimError: 0.15, lead: 0, dodge: 0.4, reaction: 0.12, elemental: 0.3, heal: 0.35, columns: 0.25, draw: 0.85, stagger: 0, guard: 0.2, fortress: 0.08, wallCooldown: 9, counter: false },
  // Hard but beatable: the warning outlasts a human reaction plus a step, and every spell is drawn in sight first.
  dificil: { speed: 1.4, cooldown: [2.6, 3.4], warn: 0.65, aimError: 0.12, lead: 0.4, dodge: 0.5, reaction: 0.12, elemental: 0.5, heal: 0.35, columns: 0.15, draw: 0.7, stagger: 1, guard: 0.35, fortress: 0.3, wallCooldown: 6, counter: true },
  // Hard pushed further (quicker, sharper, readier to dodge) yet the warning still leaves time to step out.
  experto: { speed: 1.5, cooldown: [2.3, 3], warn: 0.58, aimError: 0.09, lead: 0.55, dodge: 0.6, reaction: 0.1, elemental: 0.55, heal: 0.4, columns: 0.15, draw: 0.6, stagger: 0.8, guard: 0.5, fortress: 0.4, wallCooldown: 4.5, counter: true },
};

// Each fighter has an ink colour: its health bar and the ink ring under its strikes, so you can tell who cast what.
const HERO_INK = '#3d7fd6';
// Rivals wear red and green coats so they read apart from the slate-blue alchemist.
const RIVAL_LOOKS = [
  { coat: '#6b3a3a', coatDark: '#4f2a2b', ink: '#d9483b' },
  { coat: '#3f5e3c', coatDark: '#2e452c', ink: '#3fae5a' },
];
const ELEMENT_COLOR: Record<Element, string> = { earth: '#e9e2cf', columns: '#e9e2cf', fire: '#ffb35c', water: '#9fd6e3' };

const projected = new THREE.Vector3();

// The alchemist's stored symbol is traced quickly over its head, as an echo of what the player just drew.
const HERO_SKETCH = 0.35;
// A rival keeps its freshly drawn symbol this long before casting it, so everyone can read what is coming.
const RIVAL_HOLD = 0.5;
// A rival's wall goes up as soon as its circle is drawn, as the player's does, so a planned one only needs drawing.
// One raised against a strike already on its way is drawn in a hurry and only echoed over its head, like the player's.
const WALL_SKETCH = 0.35;
// A rival only opens with a wall when its foe is this close: far off, the wall is not worth the turn.
const FORTRESS_RANGE = 2.6;
// The shapes drawn over a fighter's head when it stores a symbol, in a 40×40 box; every path starts where a hand would.
export type Sketch = 'circle' | 'square' | 'pentagram' | 'triangle' | 'triangleDown' | 'rhombus';
const SKETCH_PATH: Record<Sketch, string> = {
  circle: 'M20 5 A15 15 0 1 1 19.9 5',
  square: 'M9 9 H31 V31 H9 Z',
  pentagram: 'M20 4 L29.4 32.9 L4.8 15.1 H35.2 L10.6 32.9 Z',
  triangle: 'M20 6 L34 32 H6 Z',
  triangleDown: 'M20 34 L6 8 H34 Z',
  rhombus: 'M20 4 L34 20 L20 36 L6 20 Z',
};
const SVG_NS = 'http://www.w3.org/2000/svg';

/** Health bar floating over a character's head, and the damage numbers that pop out of it. */
class Fighter {
  hp = MAX_HP;
  private readonly bar = document.createElement('div');
  private readonly fill = document.createElement('div');
  /** The symbol it just stored, traced over its head in its ink so others can tell what it holds. */
  private readonly sketch = document.createElementNS(SVG_NS, 'svg');
  private readonly sketchPath = document.createElementNS(SVG_NS, 'path');
  /** Position on the previous frame, to tell where it is heading. */
  readonly prev = new THREE.Vector3();

  /** Ring at the feet in the fighter's ink, shown while standing in a rune circle (strikes are boosted). */
  private readonly aura: THREE.Mesh;
  private readonly auraMaterial: THREE.MeshBasicMaterial;
  private auraLevel = 0;
  private auraTime = 0;

  constructor(readonly body: Character, readonly ink: string) {
    this.auraMaterial = new THREE.MeshBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
    this.aura = new THREE.Mesh(auraGeo, this.auraMaterial);
    this.aura.position.y = 0.03;
    this.aura.renderOrder = 1;
    this.aura.visible = false;
    body.root.add(this.aura);
    this.bar.className = 'hp';
    this.fill.className = 'hp-fill';
    this.fill.style.background = ink;
    this.bar.append(this.fill);
    document.body.append(this.bar);
    this.sketch.setAttribute('class', 'sketch');
    this.sketch.setAttribute('viewBox', '0 0 40 40');
    this.sketch.style.color = ink;
    this.sketchPath.setAttribute('pathLength', '1');
    this.sketch.append(this.sketchPath);
    this.sketch.style.display = 'none';
    document.body.append(this.sketch);
  }

  /** Traces `shape` over the head in `seconds`; it lingers a moment once finished, then fades away. */
  /** Traces `shape` over the head; a kept sketch stays up (the symbol is still in hand) instead of fading. */
  drawSketch(shape: Sketch, seconds: number, keep = false) {
    if (this.down) return;
    this.sketch.classList.toggle('held', keep);
    this.sketchPath.setAttribute('d', SKETCH_PATH[shape]);
    this.sketch.style.setProperty('--draw', `${seconds}s`);
    this.sketch.style.display = '';
    this.sketch.classList.remove('drawing');
    void this.sketch.getBoundingClientRect(); // restart the trace
    this.sketch.classList.add('drawing');
  }

  hideSketch() {
    this.sketch.style.display = 'none';
    this.sketch.classList.remove('drawing');
  }

  get position() {
    return this.body.root.position;
  }

  protected disposeAura() {
    this.auraMaterial.dispose();
  }

  /** Fades the rune aura in or out. */
  empower(on: boolean, dt: number) {
    this.auraLevel = THREE.MathUtils.clamp(this.auraLevel + (on ? dt : -dt) * 5, 0, 1);
    this.auraTime += dt;
    this.aura.visible = this.auraLevel > 0;
    if (!this.aura.visible) return;
    const pulse = 1 + Math.sin(this.auraTime * 5) * 0.08;
    this.aura.scale.setScalar(pulse);
    this.auraMaterial.opacity = this.auraLevel * (0.75 + Math.sin(this.auraTime * 5) * 0.2);
  }

  /** At zero health: lying on the ground, out of the fight. */
  get down() {
    return this.body.isDown;
  }

  /** Full health and back on its feet. */
  reset() {
    this.hp = MAX_HP;
    this.body.rise();
    this.bar.classList.remove('ko');
  }

  hit(amount: number, element: Element, camera: THREE.Camera) {
    if (this.down) return;
    this.body.flash();
    this.hp = Math.max(0, this.hp - amount);
    if (this.hp === 0) {
      this.hideSketch();
      this.body.fall();
      this.bar.classList.add('ko');
    }
    this.bar.classList.remove('hurt');
    void this.bar.offsetWidth; // restart the shake
    this.bar.classList.add('hurt');
    this.popNumber(`-${amount}`, ELEMENT_COLOR[element], camera);
  }

  /** Back up by `amount`, capped at full; no effect once down. */
  heal(amount: number, camera: THREE.Camera, boosted = false) {
    if (this.down) return;
    this.hp = Math.min(MAX_HP, this.hp + amount);
    // A rune-boosted heal pops bigger and marked, so it reads apart from a plain one even near full health.
    this.popNumber(boosted ? `+${amount} ✦` : `+${amount}`, HEAL_COLOR, camera, boosted ? 1.4 : 1);
  }

  private popNumber(text: string, color: string, camera: THREE.Camera, size = 1) {
    if (!this.screen(camera)) return;
    const num = document.createElement('div');
    num.className = 'dmg';
    num.textContent = text;
    num.style.color = color;
    if (size !== 1) num.style.fontSize = `${18 * size}px`;
    num.style.left = `${projected.x + THREE.MathUtils.randFloatSpread(18)}px`;
    num.style.top = `${projected.y}px`;
    num.addEventListener('animationend', () => num.remove());
    document.body.append(num);
  }

  /** Keeps the bar over the head; a fallen fighter's bar goes away once the body is on the ground. */
  update(camera: THREE.Camera) {
    this.fill.style.transform = `scaleX(${this.hp / MAX_HP})`;
    const visible = this.screen(camera);
    this.bar.hidden = !visible;
    this.bar.classList.toggle('gone', this.down);
    if (visible) {
      this.bar.style.transform = `translate(${projected.x}px, ${projected.y}px)`;
      this.sketch.style.transform = `translate(${projected.x}px, ${projected.y}px)`;
    }
    this.sketch.classList.toggle('off', !visible);
  }

  /** Projects the head to screen pixels into `projected`; false when it is behind the camera. */
  private screen(camera: THREE.Camera) {
    projected.copy(this.position);
    projected.y += HEAD_HEIGHT;
    projected.project(camera);
    if (projected.z > 1) return false;
    projected.set(((projected.x + 1) / 2) * innerWidth, ((1 - projected.y) / 2) * innerHeight, 0);
    return true;
  }

  dispose() {
    this.bar.remove();
    this.sketch.remove();
  }
}

type Plan = { kind: 'heal' } | { kind: 'wall' } | { kind: 'charge'; element: Fluid } | { kind: 'strike'; element: Element };
const SKETCH_FOR: Record<Element | 'heal', Sketch> = {
  earth: 'square',
  columns: 'pentagram',
  fire: 'triangle',
  water: 'triangleDown',
  heal: 'rhombus',
};
const sketchFor = (plan: Plan): Sketch =>
  plan.kind === 'wall' ? 'circle' : SKETCH_FOR[plan.kind === 'heal' ? 'heal' : plan.element];

/** An opposing alchemist: picks someone to fight, circles them, strikes with warnings and steps out of incoming ones. */
class Rival extends Fighter {
  private attackTimer: number;
  private moveTimer = 0;
  private dodgeTimer = -1;
  private dodgeFrom = new THREE.Vector3();
  private foe: Fighter | null = null;
  /** Fire or water already drawn from a source, kept until the next attack. */
  private charged: Fluid | null = null;
  private retarget = 0;
  /** The spell being drawn (then held a moment once stored), and how long until it is cast. */
  private plan: Plan | null = null;
  private planTimer = 0;
  /** Seconds until it may raise another wall, and how long the one it stands in still protects it. */
  private wallTimer = 0;
  private walled = 0;

  constructor(
    obstacles: Obstacle[],
    look: { coat: string; coatDark: string; ink: string },
    private readonly tuning: Tuning,
  ) {
    super(new Character(obstacles, { ...look, speed: tuning.speed }), look.ink);
    this.attackTimer = THREE.MathUtils.randFloat(1.5, 2.5);
  }

  /** A strike is coming down near this rival; maybe raise a wall against it, or step out of it after a short reaction. */
  threatened(at: THREE.Vector3, from: THREE.Vector3, combat: Combat) {
    if (Math.hypot(at.x - this.position.x, at.z - this.position.z) > HIT_RADIUS + 0.1) return;
    // Fallen, or already inside its own wall where nothing reaches it.
    if (this.down || this.walled > 0) return;
    // Hands free (not halfway through drawing another spell): a quick circle stops it where it stands.
    if (!this.plan && this.wallTimer <= 0 && Math.random() < this.tuning.guard) {
      this.drawSketch('circle', WALL_SKETCH);
      this.raiseWall(from, combat);
      return;
    }
    if (Math.random() >= this.tuning.dodge) return;
    this.dodgeTimer = this.tuning.reaction;
    this.dodgeFrom.copy(at);
  }

  /** Mostly the closest fighter, sometimes another, re-chosen every few seconds. */
  private chooseFoe(others: Fighter[]) {
    const byDistance = [...others].sort(
      (a, b) => a.position.distanceToSquared(this.position) - b.position.distanceToSquared(this.position),
    );
    this.foe = byDistance.length > 1 && Math.random() < 0.45 ? byDistance[1] : byDistance[0];
    this.retarget = THREE.MathUtils.randFloat(4, 7);
  }

  think(dt: number, others: Fighter[], combat: Combat, onScreen: (p: THREE.Vector3) => boolean) {
    const pos = this.position;
    this.retarget -= dt;
    // A spell already booked against a foe keeps that foe until it is cast.
    if (!this.foe || !others.includes(this.foe) || (this.retarget <= 0 && !this.plan)) this.chooseFoe(others);
    const foe = this.foe!;
    const target = foe.position;

    this.wallTimer -= dt;
    this.walled -= dt;

    if (this.dodgeTimer >= 0 && (this.dodgeTimer -= dt) < 0 && this.walled <= 0) {
      // Step straight out of the warning, a little past its edge.
      let dx = pos.x - this.dodgeFrom.x;
      let dz = pos.z - this.dodgeFrom.z;
      const d = Math.hypot(dx, dz);
      if (d < 1e-3) {
        const a = Math.random() * Math.PI * 2;
        dx = Math.sin(a);
        dz = Math.cos(a);
      } else {
        dx /= d;
        dz /= d;
      }
      const spot = new THREE.Vector3(this.dodgeFrom.x + dx * (HIT_RADIUS + 0.2), 0, this.dodgeFrom.z + dz * (HIT_RADIUS + 0.2));
      if (onScreen(spot)) this.body.setTarget(spot);
      this.moveTimer = 1;
    }

    // Wander around its foe at mid range, re-picking a spot every few seconds.
    this.moveTimer -= dt;
    if (this.moveTimer <= 0 && !this.body.moving && this.walled <= 0) {
      this.moveTimer = THREE.MathUtils.randFloat(2.5, 4);
      for (let i = 0; i < 8; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = THREE.MathUtils.randFloat(1.3, 2.2);
        const spot = new THREE.Vector3(target.x + Math.sin(a) * r, 0, target.z + Math.cos(a) * r);
        if (onScreen(spot)) {
          this.body.setTarget(spot);
          break;
        }
      }
    }

    // A spell being drawn is stored when the shape is finished, then cast a moment later.
    if (this.plan) {
      if ((this.planTimer -= dt) > 0) return;
      const plan = this.plan;
      this.plan = null;
      this.act(plan, foe, combat, dt);
      return;
    }

    this.attackTimer -= dt;
    if (this.attackTimer > 0) return;
    this.attackTimer = THREE.MathUtils.randFloat(...this.tuning.cooldown);
    const plan = this.choose(combat, foe);
    // Fire or water fetched earlier is already stored: no new shape to draw before casting it.
    const drawn = !(plan.kind === 'strike' && this.charged);
    // A wall goes up the moment its circle is finished; every other symbol is held a moment first.
    const delay = drawn ? this.tuning.draw + (plan.kind === 'wall' ? 0 : RIVAL_HOLD) : 0;
    // Two rivals never bring their strikes down on the alchemist together: the later one waits a moment.
    if (plan.kind === 'strike' && !combat.book(foe, delay, plan.element === 'columns' ? STAR_STAGGER * 4 : 0, this.tuning.stagger)) {
      this.attackTimer = THREE.MathUtils.randFloat(0.4, 0.8);
      return;
    }
    if (delay <= 0) {
      this.act(plan, foe, combat, dt);
      return;
    }
    this.plan = plan;
    this.planTimer = delay;
    this.drawSketch(sketchFor(plan), this.tuning.draw);
  }

  /** What to do this turn: heal when hurt, sometimes open with a wall or fetch fire or water first, otherwise strike. */
  private choose(combat: Combat, foe: Fighter): Plan {
    // Hurt rivals sometimes spend the turn on a rhombus instead.
    if (this.hp <= 50 && Math.random() < this.tuning.heal) return { kind: 'heal' };
    const near = foe.position.distanceTo(this.position) < FORTRESS_RANGE;
    if (this.wallTimer <= 0 && this.walled <= 0 && near && Math.random() < this.tuning.fortress) return { kind: 'wall' };
    // Fire and water have to be drawn from a source on the map first, like the player does; that takes this turn.
    if (!this.charged && Math.random() < this.tuning.elemental) {
      const order: Fluid[] = Math.random() < 0.5 ? ['fire', 'water'] : ['water', 'fire'];
      const element = order.find((e) => combat.findSource(e, this.position));
      if (element) return { kind: 'charge', element };
    }
    return { kind: 'strike', element: this.charged ?? (Math.random() < this.tuning.columns ? 'columns' : 'earth') };
  }

  /** Raises a wall facing `toward` and stands still inside it; on harder levels it strikes out of it right away. */
  private raiseWall(toward: THREE.Vector3, combat: Combat) {
    this.body.setTarget(this.position);
    this.body.face(toward);
    this.body.cast();
    combat.wallFrom(this, toward);
    this.dodgeTimer = -1;
    this.walled = WALL_UP;
    this.moveTimer = WALL_UP;
    this.wallTimer = this.tuning.wallCooldown;
    if (this.tuning.counter) this.attackTimer = Math.min(this.attackTimer, 0.1);
  }

  private act(plan: Plan, foe: Fighter, combat: Combat, dt: number) {
    if (plan.kind === 'wall') {
      this.charged = null; // the circle, like any new symbol, replaces fire or water in hand
      this.raiseWall(foe.position, combat);
      return;
    }
    if (plan.kind === 'heal') {
      this.charged = null; // one symbol at a time: the rhombus replaces fire or water in hand
      this.body.cast();
      combat.healFrom(this);
      return;
    }
    if (plan.kind === 'charge') {
      const source = combat.findSource(plan.element, this.position);
      if (!source) return;
      this.charged = plan.element;
      this.body.face(source);
      this.body.cast();
      combat.channel(this, source, plan.element);
      this.attackTimer = THREE.MathUtils.randFloat(0.8, 1.4);
      return;
    }
    // Aimed now, when the shape is done, at where the foe is (and, on harder levels, a little where it is going).
    const target = foe.position;
    const aim = target.clone();
    if (this.tuning.lead > 0 && dt > 0) {
      // Where the foe will be when the warning ends, if it keeps walking.
      const k = this.tuning.warn / dt;
      aim.x += (target.x - foe.prev.x) * k * this.tuning.lead;
      aim.z += (target.z - foe.prev.z) * k * this.tuning.lead;
    }
    const a = Math.random() * Math.PI * 2;
    const e = Math.random() * this.tuning.aimError;
    aim.x += Math.sin(a) * e;
    aim.z += Math.cos(a) * e;
    aim.y = heightAt(aim.x, aim.z);
    this.charged = null;
    this.body.face(aim);
    this.body.cast();
    combat.strikeFrom(this, aim, plan.element, this.tuning.warn);
  }

  /** Drops a spell half drawn, as when the match ends or the tutorial freezes everyone. */
  cancel() {
    this.plan = null;
    this.hideSketch();
  }

  dispose() {
    super.dispose();
    this.body.dispose();
    this.disposeAura();
  }
}

export type Outcome = 'defeat' | 'victory';

/**
 * Sparring rivals: 0–2 opponents in a free-for-all with the alchemist. Whoever reaches zero falls and lies there;
 * the match is lost when the alchemist falls and won when every rival has. With no rivals it never ends.
 */
export class Combat {
  readonly root = new THREE.Group();
  private readonly hero: Fighter;
  private rivals: Rival[] = [];
  private count = 1;
  private level: Difficulty = 'normal';
  private outcome: Outcome | null = null;
  private endTimer = 0;
  /** Called once when the match is decided, after the falling body has landed. */
  onEnd: (outcome: Outcome) => void = () => {};
  /** Called whenever a strike hurts the alchemist. */
  onHeroHit: () => void = () => {};
  /** While set, rivals stand still and do not attack (the tutorial is showing a cast play out). */
  private held = false;
  /** Seconds since the match started, and when the last rival strike booked against the alchemist starts and stops landing. */
  private clock = 0;
  private heroStrikeFrom = -Infinity;
  private heroStrikeTo = -Infinity;

  constructor(
    heroBody: Character,
    private readonly obstacles: Obstacle[],
    private readonly spells: Spells,
    private readonly camera: THREE.Camera,
    private readonly onScreen: (p: THREE.Vector3) => boolean,
    readonly findSource: SourceFinder,
    private readonly onRunes: (p: THREE.Vector3) => boolean,
  ) {
    this.hero = new Fighter(heroBody, HERO_INK);
    spells.onStrike = (x, z, element, caster, area) => this.strike(x, z, element, caster, area);
  }

  get rivalCount() {
    return this.count;
  }

  get difficulty() {
    return this.level;
  }

  /** True from the moment the match is decided until the next one starts. */
  get over() {
    return this.outcome !== null;
  }

  setRivals(count: number) {
    this.count = THREE.MathUtils.clamp(Math.round(count), 0, MAX_RIVALS);
    this.respawn();
  }

  setDifficulty(level: Difficulty) {
    this.level = level;
    this.respawn();
  }

  /** The alchemist raises a wall; its protected zone shows in the alchemist's ink. */
  wall(toward: THREE.Vector3) {
    this.wallFrom(this.hero, toward);
  }

  /** A wall around `caster`, facing `toward`: nobody else's strikes break out inside its zone while it stands. */
  wallFrom(caster: Fighter, toward: THREE.Vector3) {
    this.spells.wall(caster.position, toward, caster.ink, caster);
  }

  /** The alchemist strikes a point. A sure strike gives rivals no chance to step out of it. */
  cast(at: THREE.Vector3, element: Element, sure = false) {
    this.strikeFrom(this.hero, at, element, undefined, sure);
  }

  /** The player finished a stroke and stored `shape`: it shows over the alchemist's head for everyone to read, and stays while held. */
  stored(shape: Sketch, held: boolean) {
    this.hero.drawSketch(shape, HERO_SKETCH, held);
  }

  /** The symbol in the alchemist's hand was cast or dropped. */
  dropped() {
    this.hero.hideSketch();
  }

  /** The first rival still standing, or null. */
  foe(): THREE.Vector3 | null {
    return this.rivals.find((r) => !r.down)?.position ?? null;
  }

  /** Freezes the rivals where they stand, or lets them fight again. */
  hold(on: boolean) {
    this.held = on;
    if (on) for (const r of this.rivals) r.body.setTarget(r.position);
  }

  /** The first standing rival strikes at the alchemist right now, aiming true. */
  provoke() {
    const rival = this.rivals.find((r) => !r.down);
    if (!rival || this.hero.down) return;
    const aim = this.hero.position.clone();
    rival.body.face(aim);
    rival.body.cast();
    this.strikeFrom(rival, aim, 'earth', TUNING[this.level].warn);
  }

  /** The alchemist heals itself with a rhombus. */
  heal() {
    this.healFrom(this.hero);
  }

  /** Heals the caster, 30% more from inside a rune circle, with rising lines of light on it. */
  healFrom(caster: Fighter) {
    const boosted = this.onRunes(caster.position);
    caster.heal(Math.round(HEAL * (boosted ? RUNE_HEAL_BOOST : 1)), this.camera, boosted);
    this.spells.heal(caster.position, caster.ink, boosted);
  }

  /**
   * Books a strike at `foe` landing from `delay` s for `span` s (the star's tips land one after another);
   * false when another one lands on the alchemist within `gap` s of it.
   */
  book(foe: Fighter, delay: number, span: number, gap: number) {
    if (foe !== this.hero || gap <= 0) return true;
    const from = this.clock + delay;
    const to = from + span;
    if (from < this.heroStrikeTo + gap && to > this.heroStrikeFrom - gap) return false;
    this.heroStrikeFrom = from;
    this.heroStrikeTo = to;
    return true;
  }

  /** Shows fire or water flying from its source into a rival. */
  channel(rival: Rival, source: THREE.Vector3, element: Fluid) {
    this.spells.channel(source, rival.position, element);
  }

  /** A strike in the caster's ink; rivals near the warning may try to step out of it. */
  strikeFrom(caster: Fighter, at: THREE.Vector3, element: Element, warn?: number, sure = false) {
    // Cast from inside a rune circle, the strike is 25% bigger.
    const scale = this.onRunes(caster.position) ? RUNE_BOOST : 1;
    if (element === 'columns') {
      // The pentagram: five separate strikes at the star's tips around the target, spread wider from the runes too.
      for (const tip of starTips(at, STAR_REACH * scale)) this.strikeOne(caster, tip.at, element, (warn ?? PILLAR_WARN) + tip.delay, scale);
      return;
    }
    this.strikeOne(caster, at, element, warn, scale, sure);
  }

  private strikeOne(caster: Fighter, at: THREE.Vector3, element: Element, warn: number | undefined, scale: number, sure = false) {
    // Aimed into someone else's standing wall zone, it never starts: only a cross where it would have broken out.
    if (this.spells.shielded(at.x, at.z, caster)) {
      this.spells.denied(at, caster.ink, scale);
      return;
    }
    this.spells.pillars(caster.position, at, element, caster, warn, caster.ink, scale);
    if (!sure) for (const r of this.rivals) if (r !== caster) r.threatened(at, caster.position, this);
  }

  /** Puts fresh rivals on screen around the alchemist, everyone at full health. */
  respawn() {
    for (const r of this.rivals) {
      this.root.remove(r.body.root);
      r.dispose();
    }
    this.rivals = [];
    this.held = false;
    this.hero.reset();
    this.outcome = null;
    this.endTimer = 0;
    const center = this.hero.position;
    for (let i = 0; i < this.count; i++) {
      const rival = new Rival(this.obstacles, RIVAL_LOOKS[i % RIVAL_LOOKS.length], TUNING[this.level]);
      // Opposite sides when there are two, so the three start apart.
      const base = Math.random() * Math.PI * 2;
      for (let tries = 0; tries < 12; tries++) {
        const a = base + i * Math.PI + THREE.MathUtils.randFloatSpread(0.8);
        const r = THREE.MathUtils.randFloat(1.5, 2.1);
        const spot = new THREE.Vector3(center.x + Math.sin(a) * r, 0, center.z + Math.cos(a) * r);
        const blocked = this.obstacles.some((o) => Math.hypot(o.x - spot.x, o.z - spot.z) < o.r + BODY_RADIUS + 0.05);
        if ((blocked || !this.onScreen(spot)) && tries < 11) continue;
        rival.body.root.position.set(spot.x, heightAt(spot.x, spot.z), spot.z);
        rival.body.setTarget(rival.body.root.position);
        break;
      }
      rival.body.face(center);
      rival.prev.copy(rival.position);
      this.rivals.push(rival);
      this.root.add(rival.body.root);
    }
  }

  private strike(x: number, z: number, element: Element, caster: unknown, area: number) {
    // Everyone against everyone: a strike hits anybody in it except whoever cast it.
    for (const f of [this.hero, ...this.rivals]) {
      if (f === caster || f.down || this.over) continue;
      if (Math.hypot(f.position.x - x, f.position.z - z) > area + BODY_RADIUS) continue;
      f.hit(DAMAGE[element], element, this.camera);
      if (f === this.hero) this.onHeroHit();
    }
  }

  update(dt: number) {
    this.clock += dt;
    // Decide the match before anyone acts, so nobody picks a fallen foe this frame.
    if (!this.outcome) {
      if (this.hero.down) this.outcome = 'defeat';
      else if (this.rivals.length > 0 && this.rivals.every((r) => r.down)) this.outcome = 'victory';
      if (this.outcome) this.endTimer = END_DELAY;
    } else if (this.endTimer > 0 && (this.endTimer -= dt) <= 0) {
      this.onEnd(this.outcome);
    }

    const all = [this.hero, ...this.rivals];
    const standing = all.filter((f) => !f.down);
    for (const r of this.rivals) {
      // Fallen rivals lie still; once the match is decided nobody attacks any more.
      if (!r.down && !this.over && !this.held) r.think(dt, standing.filter((f) => f !== r), this, this.onScreen);
      else r.cancel();
      r.body.update(dt);
      r.update(this.camera);
    }
    this.hero.update(this.camera);
    for (const f of all) {
      f.empower(!f.down && this.onRunes(f.position), dt);
      f.prev.copy(f.position);
    }

  }
}
