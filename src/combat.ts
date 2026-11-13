import * as THREE from 'three';
import { BODY_RADIUS, Character } from './character';
import { HitMeLabel, Scarecrow } from './dummy';
import type { Obstacle } from './meadow';
import { heightAt } from './noise';
import { AREA_OF, PILLAR_AREA, PILLAR_WARN, ROOT_TIME, RUNE_BOOST, STAR_REACH, STAR_STAGGER, WALL_UP, isStar, starTips, type Element, type Spells, type StarCage } from './spells';
import { t } from './i18n';
import { RivalMind, TUNING, type Difficulty, type Fluid, type MindView, type Plan, type Tuning } from './rivalMind';

// Damage per strike: square (earth pillars) 20, each of the pentagram's five columns 10, fire and water triangles 35,
// the blast (fire and water merged into an hourglass) 45 over a smaller area, each tip of a fire or water star
// (the star merged with fire or water) 20, the vine (spiral) 5: its point is rooting the target for ROOT_TIME.
export const DAMAGE: Record<Element, number> = { earth: 20, columns: 10, fire: 35, water: 35, blast: 45, fireStar: 20, waterStar: 20, vine: 5 };
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
export const MAX_RIVALS = 3;
// The tutorial's sparring rival lands its first strike as soon as it can, played at the top level, so the defence
// lesson comes early: this long after the attack lesson, then drawn and held at 'experto' pace, aimed where the
// alchemist is heading and warned only briefly, so it really lands. If the alchemist still gets out, it tries again soon.
const AMBUSH_WARN = 0.25;
// Until that strike lands, the rival cannot be knocked out: it holds on at this much health.
const AMBUSH_FLOOR = 20;
// In the wall lesson the rival's strike breaks on the ground this far to the alchemist's side, so the cross is not hidden under its feet.
const PROVOKE_SIDE = 0.3;
const auraGeo = new THREE.RingGeometry(0.18, 0.24, 32).rotateX(-Math.PI / 2);

/** The nearest fire or water source the fighter at `from` could draw from, or null if there is none in play. */
export type SourceFinder = (element: Fluid, from: THREE.Vector3) => THREE.Vector3 | null;

export type { Difficulty, Fluid } from './rivalMind';
export const DIFFICULTY_LABEL: Record<Difficulty, string> = t.difficulty;

// Each fighter has an ink colour: its health bar and the ink ring under its strikes, so you can tell who cast what.
export const HERO_INK = '#3d7fd6';
// Rivals wear red, green and plum coats so they read apart from the slate-blue alchemist.
const RIVAL_LOOKS = [
  { coat: '#6b3a3a', coatDark: '#4f2a2b', ink: '#d9483b' },
  { coat: '#3f5e3c', coatDark: '#2e452c', ink: '#3fae5a' },
  { coat: '#55406b', coatDark: '#3e2f50', ink: '#9b6fd8' },
];
const ELEMENT_COLOR: Record<Element, string> = {
  earth: '#e9e2cf', columns: '#e9e2cf', fire: '#ffb35c', water: '#9fd6e3', blast: '#ff8a5c', fireStar: '#ffb35c', waterStar: '#9fd6e3', vine: '#8cc46a',
};

const projected = new THREE.Vector3();

// The alchemist's stored symbol is traced quickly over its head, as an echo of what the player just drew.
const HERO_SKETCH = 0.35;
// A rival's wall goes up as soon as its circle is drawn, as the player's does, so a planned one only needs drawing.
// One raised against a strike already on its way is drawn in a hurry and only echoed over its head, like the player's.
const WALL_SKETCH = 0.35;
// The shapes drawn over a fighter's head when it stores a symbol, in a 40×40 box; every path starts where a hand would.
export type Sketch = 'circle' | 'square' | 'pentagram' | 'triangle' | 'triangleDown' | 'rhombus' | 'hourglass' | 'fireStar' | 'waterStar' | 'spiral';
const SKETCH_PATH: Record<Sketch, string> = {
  circle: 'M20 5 A15 15 0 1 1 19.9 5',
  square: 'M9 9 H31 V31 H9 Z',
  pentagram: 'M20 4 L29.4 32.9 L4.8 15.1 H35.2 L10.6 32.9 Z',
  triangle: 'M20 6 L34 32 H6 Z',
  triangleDown: 'M20 34 L6 8 H34 Z',
  rhombus: 'M20 4 L34 20 L20 36 L6 20 Z',
  hourglass: 'M7 5 H33 L7 35 H33 Z',
  spiral: 'M20 20 C22 18 24 21 22 23 C19 26 14 22 15 18 C16 12 25 11 28 17 C31 24 25 31 18 31 C9 31 5 23 7 15 C9 7 19 3 27 6 C33 8 36 13 36 19',
  // The star drawn inside fire's triangle, or inside water's upside-down one.
  fireStar: 'M20 2 L38 35 H2 Z M20 15 L25.3 31.3 L11.4 21.2 H28.6 L14.7 31.3 Z',
  waterStar: 'M20 38 L2 5 H38 Z M20 7 L25.3 23.3 L11.4 13.2 H28.6 L14.7 23.3 Z',
};
const SVG_NS = 'http://www.w3.org/2000/svg';

/** What a fighter's body has to do: a character, or the training scarecrow. */
interface Body {
  readonly root: THREE.Object3D;
  readonly isDown: boolean;
  flash(): void;
  fall(): void;
  rise(): void;
  /** Rooted to the spot for `seconds` (the vine): it cannot walk, but can still draw and cast. */
  entangle?(seconds: number): void;
}

/** Health bar floating over a character's head, and the damage numbers that pop out of it. */
class Fighter<B extends Body = Body> {
  hp = MAX_HP;
  /** World units above the feet where the health bar floats. */
  protected head = HEAD_HEIGHT;
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

  constructor(readonly body: B, readonly ink: string) {
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

  /** The least health a strike can leave it with. */
  protected get floor() {
    return 0;
  }

  /** Takes a strike; a rune-boosted one pops its number marked with ✦. */
  hit(amount: number, element: Element, camera: THREE.Camera, boosted = false) {
    if (this.down) return;
    this.body.flash();
    this.hp = Math.max(this.floor, this.hp - amount);
    if (this.hp === 0) {
      this.hideSketch();
      this.body.fall();
      this.bar.classList.add('ko');
    }
    this.bar.classList.remove('hurt');
    void this.bar.offsetWidth; // restart the shake
    this.bar.classList.add('hurt');
    this.popNumber(boosted ? `-${amount} ✦` : `-${amount}`, ELEMENT_COLOR[element], camera);
  }

  /** Back up by `amount`, capped at full; no effect once down. */
  heal(amount: number, camera: THREE.Camera, boosted = false) {
    if (this.down) return;
    this.hp = Math.min(MAX_HP, this.hp + amount);
    // A rune-boosted heal pops bigger and marked, so it reads apart from a plain one even near full health.
    this.popNumber(boosted ? `+${amount} ✦` : `+${amount}`, HEAL_COLOR, camera, boosted ? 1.4 : 1);
  }

  protected popNumber(text: string, color: string, camera: THREE.Camera, size = 1) {
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
  protected screen(camera: THREE.Camera, head = this.head) {
    projected.copy(this.position);
    projected.y += head;
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

const SKETCH_FOR: Record<Element | 'heal', Sketch> = {
  earth: 'square',
  columns: 'pentagram',
  fire: 'triangle',
  water: 'triangleDown',
  blast: 'hourglass',
  fireStar: 'fireStar',
  waterStar: 'waterStar',
  vine: 'spiral',
  heal: 'rhombus',
};
const sketchFor = (plan: Plan): Sketch =>
  plan.kind === 'wall' ? 'circle' : SKETCH_FOR[plan.kind === 'heal' ? 'heal' : plan.element];

/** An opposing alchemist: picks someone to fight, circles them, strikes with warnings and steps out of incoming ones. */
class Rival extends Fighter<Character> {
  /** What it plans and when it casts; this class carries it out in the meadow. */
  private readonly mind: RivalMind;
  private moveTimer = 0;
  private dodgeTimer = -1;
  private dodgeFrom = new THREE.Vector3();
  /** The last star it found itself inside, and whether it chose to hold still there. */
  private cageSeen: StarCage | null = null;
  private cageHold = false;
  private dodgeAhead = new THREE.Vector3();
  private foe: Fighter | null = null;
  /** Seconds its foe has not moved at all. */
  private foeStill = 0;
  private retarget = 0;
  /** Seconds until it may raise another wall, and how long the one it stands in still protects it. */
  private wallTimer = 0;
  private walled = 0;

  constructor(
    obstacles: Obstacle[],
    look: { coat: string; coatDark: string; ink: string },
    private readonly tuning: Tuning,
  ) {
    super(new Character(obstacles, { ...look, speed: tuning.speed }), look.ink);
    this.mind = new RivalMind(tuning);
  }

  /** Set by the tutorial: the next strikes go at the alchemist, quick and true, until one of them lands. */
  get ambush() {
    return this.mind.ambush;
  }

  set ambush(on: boolean) {
    this.mind.ambush = on;
  }

  /** A wall could go up where it stands right now. */
  private canWall(combat: Combat) {
    return this.wallTimer <= 0 && this.walled <= 0 && !combat.onRunes(this.position);
  }

  /** A strike is coming down near this rival; maybe raise a wall against it, or step out of it after a short reaction. */
  threatened(at: THREE.Vector3, from: THREE.Vector3, combat: Combat) {
    // Near where it stands or where it is walking to: a strike aimed ahead along its route counts too.
    const next = this.body.ahead(PILLAR_WARN, this.dodgeAhead);
    const near = Math.min(Math.hypot(at.x - this.position.x, at.z - this.position.z), Math.hypot(at.x - next.x, at.z - next.z));
    if (near > HIT_RADIUS + 0.1) return;
    // Fallen, or already inside its own wall where nothing reaches it.
    if (this.down || this.walled > 0) return;
    const answer = this.mind.threatened(this.canWall(combat));
    // Hands free (not drawing, nothing held): a quick circle stops it where it stands.
    if (answer === 'wall') {
      this.drawSketch('circle', WALL_SKETCH);
      this.raiseWall(from, combat);
      return;
    }
    if (answer !== 'dodge') return;
    // A human-like beat before it moves, never the same twice, so it reads as seeing the ground tremble, not the click.
    this.dodgeTimer = this.tuning.reaction * THREE.MathUtils.randFloat(1, 1.5);
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
    // An attack under way keeps its foe until it is cast.
    if (this.ambush && others.includes(combat.heroFighter)) this.foe = combat.heroFighter;
    else if (!this.foe || !others.includes(this.foe) || (this.retarget <= 0 && !this.mind.busy)) this.chooseFoe(others);
    const foe = this.foe!;
    const target = foe.position;
    const moved = Math.hypot(target.x - foe.prev.x, target.z - foe.prev.z) > 1e-4;
    this.foeStill = moved || foe.down ? 0 : this.foeStill + dt;

    this.wallTimer -= dt;
    this.walled -= dt;

    // Caught inside someone's star: stand still in the middle until it sinks, as stepping out through it hurts.
    // Only a sharp rival reads it (as likely as it dodges a strike); the others may blunder out through the columns.
    const cage = combat.caged(this);
    if (cage && cage !== this.cageSeen) {
      this.cageSeen = cage;
      this.cageHold = Math.random() < this.tuning.dodge;
    }
    const caged = cage !== null && this.cageHold;
    if (caged) {
      this.dodgeTimer = -1;
      if (this.body.moving) this.body.halt();
    }

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
      const spot = new THREE.Vector3(this.dodgeFrom.x + dx * (HIT_RADIUS + 0.3), 0, this.dodgeFrom.z + dz * (HIT_RADIUS + 0.3));
      if (onScreen(spot)) this.body.setTarget(spot);
      this.moveTimer = 1;
    }

    // Wander around its foe at mid range, re-picking a spot every few seconds. With the alchemist holding an attack,
    // a wary rival jinks instead: short sidesteps across the alchemist's line of fire, each one a fresh direction,
    // so a strike aimed ahead along its route goes stale, as a player reading the threat would move.
    this.moveTimer -= dt;
    const evading = this.tuning.evade > 0 && (combat.heroArmed || this.tuning.restless) && !this.ambush && foe === combat.heroFighter;
    if (!caged && this.moveTimer <= 0 && (!this.body.moving || evading) && this.walled <= 0) {
      this.moveTimer = evading ? THREE.MathUtils.randFloat(0.4, 0.85) / this.tuning.evade : THREE.MathUtils.randFloat(2.5, 4);
      for (let i = 0; i < 8; i++) {
        let spot: THREE.Vector3;
        if (evading) {
          const away = Math.atan2(pos.x - target.x, pos.z - target.z);
          const side = (Math.random() < 0.5 ? -1 : 1) * Math.PI * THREE.MathUtils.randFloat(0.3, 0.55);
          const step = THREE.MathUtils.randFloat(0.6, 1.2);
          spot = new THREE.Vector3(pos.x + Math.sin(away + side) * step, 0, pos.z + Math.cos(away + side) * step);
          // Keep to mid range: too close or too far, the sidestep bends back toward it.
          const r = Math.hypot(spot.x - target.x, spot.z - target.z);
          const want = THREE.MathUtils.clamp(r, 1.3, 2.4);
          spot.set(target.x + ((spot.x - target.x) * want) / r, 0, target.z + ((spot.z - target.z) * want) / r);
        } else {
          const a = Math.random() * Math.PI * 2;
          const r = THREE.MathUtils.randFloat(1.3, 2.2);
          spot = new THREE.Vector3(target.x + Math.sin(a) * r, 0, target.z + Math.cos(a) * r);
        }
        if (onScreen(spot)) {
          this.body.setTarget(spot);
          break;
        }
      }
    }

    const view: MindView = {
      hp: this.hp,
      foeDistance: target.distanceTo(pos),
      foeStill: this.foeStill,
      canWall: this.canWall(combat),
      hasSource: (e: Fluid) => combat.findSource(e, pos) !== null,
      book: (plan: Plan, delay: number) =>
        plan.kind !== 'strike' || combat.book(foe, delay, isStar(plan.element) ? STAR_STAGGER * 4 : 0, this.tuning.stagger),
    };
    const action = this.mind.tick(dt, view);
    if (action?.kind === 'draw') this.drawSketch(sketchFor(action.plan), action.seconds);
    else if (action?.kind === 'act') this.act(action.plan, foe, combat, dt);
  }

  /** During the tutorial's ambush it cannot fall before its strike has landed on the alchemist. */
  protected override get floor() {
    return this.ambush ? AMBUSH_FLOOR : 0;
  }

  /** Strikes the alchemist as soon as possible, at the top level and without missing, until a strike lands. */
  startAmbush() {
    this.mind.startAmbush();
    this.hideSketch();
    this.dodgeTimer = -1;
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
  }

  private act(plan: Plan, foe: Fighter, combat: Combat, dt: number) {
    // The mind never plans a wall or a heal with a symbol in hand, so neither ever replaces one.
    if (plan.kind === 'wall') {
      this.raiseWall(foe.position, combat);
      return;
    }
    if (plan.kind === 'heal') {
      this.body.cast();
      combat.healFrom(this);
      return;
    }
    if (plan.kind === 'charge') {
      const source = combat.findSource(plan.element, this.position);
      if (!source) return;
      this.body.face(source);
      this.body.cast();
      combat.channel(this, source, plan.element);
      if (this.mind.charged === 'blast') this.drawSketch('hourglass', HERO_SKETCH);
      return;
    }
    // Aimed now, when the shape is done, at where the foe is (and, on harder levels, a little where it is going).
    const tuning = this.mind.pace;
    const target = foe.position;
    const aim = target.clone();
    if (tuning.lead > 0 && dt > 0) {
      // Where the foe will be when the warning ends, if it keeps walking.
      const k = tuning.warn / dt;
      aim.x += (target.x - foe.prev.x) * k * tuning.lead;
      aim.z += (target.z - foe.prev.z) * k * tuning.lead;
    }
    const a = Math.random() * Math.PI * 2;
    const e = Math.random() * tuning.aimError;
    // The tutorial's ambush is a square where the alchemist will be when the ground breaks, walking or not.
    if (this.ambush && foe === combat.heroFighter && plan.element === 'earth') {
      combat.heroAhead(AMBUSH_WARN, aim);
      aim.y = heightAt(aim.x, aim.z);
      this.body.face(aim);
      this.body.cast();
      combat.strikeFrom(this, aim, 'earth', AMBUSH_WARN);
      return;
    }
    aim.x += Math.sin(a) * e;
    aim.z += Math.cos(a) * e;
    aim.y = heightAt(aim.x, aim.z);
    this.body.face(aim);
    this.body.cast();
    combat.strikeFrom(this, aim, plan.element, tuning.warn);
  }

  /** Drops a spell half drawn, as when the match ends or the tutorial freezes everyone. */
  cancel() {
    this.mind.cancel();
    this.hideSketch();
  }

  dispose() {
    super.dispose();
    this.body.dispose();
    this.disposeAura();
  }
}

/** The training scarecrow's ink: its health bar, in the colour of its wood. */
const DUMMY_INK = '#c9a36a';
const DUMMY_RADIUS = 0.13;
/** Seconds after a scarecrow falls before a new one springs up, and after that before the fallen one fades away. */
const DUMMY_RESPAWN = 1.4;
const DUMMY_LINGER = 2.5;
/** Head height of the scarecrow for its bar, and how far above that the "Hit me!" arrow points. */
const DUMMY_HEAD = 0.7;
const ARROW_GAP = 6;

/** A training scarecrow: never moves or strikes back, shows the damage of every hit, and tips over at zero. */
class Dummy extends Fighter<Scarecrow> {
  private readonly label = new HitMeLabel(t.practice.hitMe);
  readonly obstacle: Obstacle;
  /** Seconds since it fell; -1 while standing. */
  downFor = -1;

  constructor(at: THREE.Vector3) {
    super(new Scarecrow(), DUMMY_INK);
    this.head = DUMMY_HEAD;
    this.body.root.position.copy(at);
    this.prev.copy(at);
    this.obstacle = { x: at.x, z: at.z, r: DUMMY_RADIUS };
  }

  strike(amount: number, element: Element, camera: THREE.Camera, boosted: boolean, from: THREE.Vector3 | undefined) {
    if (this.down) return;
    this.body.flash(from);
    this.hit(amount, element, camera, boosted);
    this.label.dim();
  }

  tick(dt: number, camera: THREE.Camera) {
    this.body.update(dt);
    if (this.down) this.downFor += dt;
    this.update(camera);
    const visible = !this.down && this.screen(camera, DUMMY_HEAD);
    this.label.place(projected.x, projected.y - ARROW_GAP, visible);
  }

  dispose() {
    super.dispose();
    this.label.dispose();
    this.body.dispose();
    this.disposeAura();
  }
}

export type Outcome = 'defeat' | 'victory';

/**
 * Sparring rivals: 0–3 opponents in a free-for-all with the alchemist. Whoever reaches zero falls and lies there;
 * the match is lost when the alchemist falls and won when every rival has. With no rivals it never ends.
 */
export class Combat {
  readonly root = new THREE.Group();
  private readonly hero: Fighter<Character>;
  private rivals: Rival[] = [];
  /** Training (no rivals): the standing scarecrow last in the list, fallen ones before it until they fade. */
  private dummies: Dummy[] = [];
  /** The alchemist holds a symbol to cast: the rivals can read it over its head. */
  heroArmed = false;
  private count = 1;
  private level: Difficulty = 'normal';
  private outcome: Outcome | null = null;
  private endTimer = 0;
  /** Where everyone on the meadow stands: the alchemist, the rivals and the training scarecrows. */
  positions(): THREE.Vector3[] {
    return [this.hero.position, ...this.rivals.map((r) => r.position), ...this.dummies.map((d) => d.position)];
  }
  /** Called once when the match is decided, after the falling body has landed. */
  onEnd: (outcome: Outcome) => void = () => {};
  /** Called whenever a fresh match is set up (new rivals, everyone at full health). */
  onStart: () => void = () => {};
  /** Called whenever a strike hurts the alchemist. */
  onHeroHit: () => void = () => {};
  /** Called whenever the alchemist's strike hits the training scarecrow, and whether it came from a rune circle. */
  onDummyHit: (element: Element, boosted: boolean) => void = () => {};
  /** Called when a training scarecrow is knocked down (a new one springs up a moment later). */
  onDummyDown: () => void = () => {};
  /** While set, rivals stand still and do not attack (the tutorial is showing a cast play out). */
  private held = false;
  /** Seconds since the match started, and when the last rival strike booked against the alchemist starts and stops landing. */
  private clock = 0;
  /** Stars whose columns are up or about to be: crossing their ring strikes once more. */
  private cages: Array<StarCage & { inside: Map<Fighter, boolean>; born: number }> = [];
  /** Seconds of play in this match until it was decided (the game holds still while a card is open). */
  private played = 0;
  /** Health the alchemist's own strikes took off the rivals this match (what the ranking scores). */
  private dealt = 0;
  private heroStrikeFrom = -Infinity;
  private heroStrikeTo = -Infinity;

  constructor(
    heroBody: Character,
    private readonly obstacles: Obstacle[],
    private readonly spells: Spells,
    private readonly camera: THREE.Camera,
    private readonly onScreen: (p: THREE.Vector3) => boolean,
    readonly findSource: SourceFinder,
    readonly onRunes: (p: THREE.Vector3) => boolean,
  ) {
    this.hero = new Fighter(heroBody, HERO_INK);
    spells.onStrike = (x, z, element, caster, area, cage) => this.strike(x, z, element, caster, area, cage);
  }

  /** The alchemist, as a fighter the rivals can pick. */
  get heroFighter(): Fighter {
    return this.hero;
  }

  /** Where the alchemist will be in `seconds` if it keeps walking the way it is. */
  heroAhead(seconds: number, out?: THREE.Vector3) {
    return this.hero.body.ahead(seconds, out);
  }

  /** The first standing rival goes for the alchemist at once, at the top level, until one of its strikes lands. */
  ambush() {
    this.rivals.find((r) => !r.down)?.startAmbush();
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

  /** Milliseconds of play from the start of the match until it was decided (or until now). */
  get elapsedMs() {
    return Math.round(this.played * 1000);
  }

  /** Damage the alchemist dealt to rivals this match; rivals hurting each other does not count. */
  get heroDamage() {
    return Math.round(this.dealt);
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
    this.heroArmed = held;
  }

  /** The symbol in the alchemist's hand was cast or dropped. */
  dropped() {
    this.hero.hideSketch();
    this.heroArmed = false;
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
    // Inside the wall but beside the alchemist, on the side away from the rival (the arc's open side), where the cross shows.
    const hero = this.hero.position;
    const side = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0).setY(0).normalize();
    const toRival = rival.position.clone().sub(hero);
    if (side.dot(toRival) > 0) side.negate();
    const aim = hero.clone().addScaledVector(side, PROVOKE_SIDE);
    aim.y = heightAt(aim.x, aim.z);
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
    if (isStar(element)) {
      // The pentagram (plain, fire or water): five separate strikes at the star's tips around the target, spread wider from the runes too.
      const cage = { x: at.x, z: at.z, reach: STAR_REACH * scale, caster, element, standing: 0, tips: 0, erupted: 0, struck: new Set<unknown>() };
      for (const tip of starTips(at, STAR_REACH * scale)) {
        if (this.strikeOne(caster, tip.at, element, (warn ?? PILLAR_WARN) + tip.delay, scale, false, cage)) cage.tips++;
      }
      if (cage.tips) this.cages.push({ ...cage, inside: new Map(), born: this.clock });
      return;
    }
    this.strikeOne(caster, at, element, warn, scale, sure);
  }

  /** False when a standing wall stops it before it starts. */
  private strikeOne(
    caster: Fighter,
    at: THREE.Vector3,
    element: Element,
    warn: number | undefined,
    scale: number,
    sure = false,
    cage: StarCage | null = null,
  ) {
    // Aimed into someone else's standing wall zone, it never starts: only a cross where it would have broken out.
    if (this.spells.shielded(at.x, at.z, caster)) {
      this.spells.denied(at, caster.ink, scale);
      return false;
    }
    this.spells.pillars(caster.position, at, element, caster, warn, caster.ink, scale, cage);
    if (!sure) for (const r of this.rivals) if (r !== caster) r.threatened(at, caster.position, this);
    return true;
  }

  /**
   * Inside a star whose columns stand (someone else's): the place to stay, since stepping out through the ring hurts.
   * Rivals hold still there instead of wandering or dodging out.
   */
  caged(f: Fighter): StarCage | null {
    // From the warning on: walking out just as the columns break out is the worst moment to be on the ring.
    return this.cages.find((c) => (c.standing > 0 || c.erupted < c.tips) && c.caster !== f && c.inside.get(f) === true && !c.struck.has(f)) ?? null;
  }

  /** Whoever crosses a standing star's ring, in or out, is struck once more by it (unless that star already hit them). */
  private updateCages() {
    const fighters = [this.hero, ...this.rivals];
    for (let i = this.cages.length - 1; i >= 0; i--) {
      const c = this.cages[i];
      // Over once every tip has erupted and sunk; a safety age too, e.g. when a new meadow drops every effect.
      if ((c.erupted >= c.tips && c.standing <= 0) || this.clock - c.born > 4) {
        this.cages.splice(i, 1);
        continue;
      }
      for (const f of fighters) {
        if (f === c.caster || f.down) continue;
        const inside = Math.hypot(f.position.x - c.x, f.position.z - c.z) < c.reach;
        const was = c.inside.get(f);
        c.inside.set(f, inside);
        if (c.standing <= 0 || was === undefined || was === inside || c.struck.has(f) || this.over) continue;
        this.hurt(f, c.element, c.caster);
        c.struck.add(f);
      }
    }
  }

  /** Puts fresh rivals on screen around the alchemist, everyone at full health. */
  respawn() {
    for (const r of this.rivals) {
      this.root.remove(r.body.root);
      r.dispose();
    }
    this.rivals = [];
    this.cages = [];
    this.clearDummies();
    this.held = false;
    this.hero.reset();
    this.outcome = null;
    this.endTimer = 0;
    this.played = 0;
    this.dealt = 0;
    const center = this.hero.position;
    for (let i = 0; i < this.count; i++) {
      const rival = new Rival(this.obstacles, RIVAL_LOOKS[i % RIVAL_LOOKS.length], TUNING[this.level]);
      rival.body.bounds = this.onScreen;
      // Evenly spread around the alchemist (opposite sides for two, a triangle for three), so everyone starts apart.
      const base = Math.random() * Math.PI * 2;
      for (let tries = 0; tries < 12; tries++) {
        const a = base + (i * Math.PI * 2) / this.count + THREE.MathUtils.randFloatSpread(0.8);
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
    if (this.count === 0) this.spawnDummy();
    this.onStart();
  }

  /** Everyone the alchemist can strike, standing: each rival (with where it will be in `seconds`) and the scarecrow. */
  targets(): Array<{ at: THREE.Vector3; ahead(seconds: number, out: THREE.Vector3): THREE.Vector3 }> {
    const still = (p: THREE.Vector3) => (_: number, out: THREE.Vector3) => out.copy(p);
    return [
      ...this.rivals.filter((r) => !r.down).map((r) => ({ at: r.position, ahead: (s: number, out: THREE.Vector3) => r.body.ahead(s, out) })),
      ...this.dummies.filter((d) => !d.down).map((d) => ({ at: d.position, ahead: still(d.position) })),
    ];
  }

  /** Training: the scarecrow standing now, if any. */
  dummy(): THREE.Vector3 | null {
    const d = this.dummies[this.dummies.length - 1];
    return d && !d.down ? d.position : null;
  }

  private clearDummies() {
    for (const d of this.dummies) this.removeDummy(d);
    this.dummies = [];
  }

  private removeDummy(d: Dummy) {
    const i = this.obstacles.indexOf(d.obstacle);
    if (i >= 0) this.obstacles.splice(i, 1);
    this.root.remove(d.body.root);
    d.dispose();
  }

  /** A new scarecrow in the middle of the meadow, or as near it as there is room, facing the alchemist. */
  private spawnDummy() {
    const hero = this.hero.position;
    // Up the screen from the centre first: away from the camera, so it stands in plain view above the alchemist.
    const away = Math.atan2(-this.camera.position.x, -this.camera.position.z);
    const free = (x: number, z: number) =>
      Math.hypot(x - hero.x, z - hero.z) > 0.8 &&
      this.dummies.every((d) => Math.hypot(x - d.position.x, z - d.position.z) > 0.6) &&
      this.obstacles.every((o) => Math.hypot(o.x - x, o.z - z) > o.r + DUMMY_RADIUS + 0.15) &&
      this.onScreen(new THREE.Vector3(x, 0, z));
    let spot: [number, number] | null = free(0, 0) ? [0, 0] : null;
    for (const r of [1.3, 1.7, 2.1]) {
      for (let i = 0; i < 12 && !spot; i++) {
        const a = away + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * (Math.PI / 6);
        const x = Math.sin(a) * r;
        const z = Math.cos(a) * r;
        if (free(x, z)) spot = [x, z];
      }
    }
    const [x, z] = spot ?? [Math.sin(away) * 1.3, Math.cos(away) * 1.3];
    const dummy = new Dummy(new THREE.Vector3(x, heightAt(x, z), z));
    dummy.body.face(hero);
    this.obstacles.push(dummy.obstacle);
    this.dummies.push(dummy);
    this.root.add(dummy.body.root);
  }

  private updateDummies(dt: number) {
    const last = this.dummies[this.dummies.length - 1];
    if (last?.down && last.downFor >= DUMMY_RESPAWN) this.spawnDummy();
    for (const d of [...this.dummies]) {
      d.tick(dt, this.camera);
      if (!d.down) continue;
      const i = this.obstacles.indexOf(d.obstacle);
      if (i >= 0) this.obstacles.splice(i, 1); // lying down, it no longer blocks the way
      if (d.downFor >= DUMMY_RESPAWN + DUMMY_LINGER) d.body.vanish();
      if (d.body.gone) {
        this.removeDummy(d);
        this.dummies.splice(this.dummies.indexOf(d), 1);
      }
    }
  }

  private strike(x: number, z: number, element: Element, caster: unknown, area: number, cage: StarCage | null = null) {
    // Everyone against everyone: a strike hits anybody in it except whoever cast it.
    for (const f of [this.hero, ...this.rivals]) {
      if (f === caster || f.down || this.over) continue;
      if (Math.hypot(f.position.x - x, f.position.z - z) > area + BODY_RADIUS) continue;
      this.hurt(f, element, caster);
      // Hit by a tip, it walks off that column freely: crossing the ring will not strike it again.
      cage?.struck.add(f);
    }
    const boosted = area > PILLAR_AREA * AREA_OF[element] * 1.01;
    for (const d of this.dummies) {
      if (d.down || Math.hypot(d.position.x - x, d.position.z - z) > area + DUMMY_RADIUS) continue;
      d.strike(DAMAGE[element], element, this.camera, boosted, (caster as Fighter | null)?.position);
      if (element === 'vine' && !d.down) this.snare(d, caster);
      if (caster === this.hero) this.onDummyHit(element, boosted);
      if (d.down) this.onDummyDown();
    }
  }

  private hurt(f: Fighter, element: Element, caster: unknown) {
    const before = f.hp;
    f.hit(DAMAGE[element], element, this.camera);
    if (caster === this.hero) this.dealt += before - f.hp;
    if (element === 'vine') this.snare(f, caster);
    if (f === this.hero) {
      for (const r of this.rivals) r.ambush = false;
      this.onHeroHit();
    }
  }

  /** Caught by the vine: rooted to the spot (a scarecrow never walks anyway) with coils round the legs. */
  private snare(f: Fighter, caster: unknown) {
    if (f.down) return;
    f.body.entangle?.(ROOT_TIME);
    this.spells.snare(f.position, (caster as Fighter | null)?.ink ?? null);
  }

  update(dt: number) {
    this.clock += dt;
    // Decide the match before anyone acts, so nobody picks a fallen foe this frame.
    if (!this.outcome) {
      this.played += dt;
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
    this.updateDummies(dt);
    this.updateCages();
    this.hero.update(this.camera);
    for (const f of all) {
      f.empower(!f.down && this.onRunes(f.position), dt);
      f.prev.copy(f.position);
    }

  }
}
