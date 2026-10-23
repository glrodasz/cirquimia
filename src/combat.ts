import * as THREE from 'three';
import { BODY_RADIUS, Character } from './character';
import type { Obstacle } from './meadow';
import { heightAt } from './noise';
import { PILLAR_AREA, type Element, type Spells } from './spells';

// Damage per strike: square (earth pillars) 20, fire and water triangles 35.
export const DAMAGE: Record<Element, number> = { earth: 20, fire: 35, water: 35 };
const MAX_HP = 100;
// No dying yet: at zero the bar sits empty for a moment, then refills.
const KO_TIME = 1.4;
// A strike hits anyone whose body overlaps the eruption.
const HIT_RADIUS = PILLAR_AREA + BODY_RADIUS;
const HEAD_HEIGHT = 0.72; // world units above the feet for the health bar
export const MAX_RIVALS = 2;
const RUNE_BOOST = 1.25;
const auraGeo = new THREE.RingGeometry(0.18, 0.24, 32).rotateX(-Math.PI / 2);

export type Fluid = 'fire' | 'water';
/** The nearest fire or water source the fighter at `from` could draw from, or null if there is none in play. */
export type SourceFinder = (element: Fluid, from: THREE.Vector3) => THREE.Vector3 | null;

export type Difficulty = 'facil' | 'normal' | 'dificil';
export const DIFFICULTY_LABEL: Record<Difficulty, string> = { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil' };

interface Tuning {
  speed: number;
  /** Seconds between attacks, min and max. */
  cooldown: [number, number];
  /** Seconds the ground warns before the rival's strike erupts: time for the player to step out or raise a wall. */
  warn: number;
  /** World units of random aim error. */
  aimError: number;
  /** Aims where the alchemist is heading instead of where it stands. */
  leads: boolean;
  /** Chance of stepping out of an incoming strike, and how fast it reacts. */
  dodge: number;
  reaction: number;
  /** Chance of drawing fire or water (35) from a source before attacking, instead of using pillars (20). */
  elemental: number;
}

const TUNING: Record<Difficulty, Tuning> = {
  facil: { speed: 0.9, cooldown: [4, 5.5], warn: 0.9, aimError: 0.35, leads: false, dodge: 0.1, reaction: 0.25, elemental: 0 },
  normal: { speed: 1.15, cooldown: [2.8, 3.8], warn: 0.6, aimError: 0.15, leads: false, dodge: 0.4, reaction: 0.12, elemental: 0.3 },
  dificil: { speed: 1.4, cooldown: [1.8, 2.6], warn: 0.42, aimError: 0.05, leads: true, dodge: 0.75, reaction: 0.04, elemental: 0.5 },
};

// Each fighter has an ink colour: its health bar and the ink ring under its strikes, so you can tell who cast what.
const HERO_INK = '#3d7fd6';
// Rivals wear red and green coats so they read apart from the slate-blue alchemist.
const RIVAL_LOOKS = [
  { coat: '#6b3a3a', coatDark: '#4f2a2b', ink: '#d9483b' },
  { coat: '#3f5e3c', coatDark: '#2e452c', ink: '#3fae5a' },
];
const ELEMENT_COLOR: Record<Element, string> = { earth: '#e9e2cf', fire: '#ffb35c', water: '#9fd6e3' };

const projected = new THREE.Vector3();

/** Health bar floating over a character's head, and the damage numbers that pop out of it. */
class Fighter {
  hp = MAX_HP;
  private koTimer = 0;
  private readonly bar = document.createElement('div');
  private readonly fill = document.createElement('div');
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

  /** Full health and out of any KO. */
  reset() {
    this.hp = MAX_HP;
    this.koTimer = 0;
    this.bar.classList.remove('ko');
  }

  hit(amount: number, element: Element, camera: THREE.Camera) {
    this.body.flash();
    if (this.koTimer <= 0) {
      this.hp = Math.max(0, this.hp - amount);
      if (this.hp === 0) this.koTimer = KO_TIME;
    }
    this.bar.classList.remove('hurt');
    void this.bar.offsetWidth; // restart the shake
    this.bar.classList.add('hurt');
    if (!this.screen(camera)) return;
    const num = document.createElement('div');
    num.className = 'dmg';
    num.textContent = `-${amount}`;
    num.style.color = ELEMENT_COLOR[element];
    num.style.left = `${projected.x + THREE.MathUtils.randFloatSpread(18)}px`;
    num.style.top = `${projected.y}px`;
    num.addEventListener('animationend', () => num.remove());
    document.body.append(num);
  }

  update(dt: number, camera: THREE.Camera) {
    if (this.koTimer > 0) {
      this.koTimer -= dt;
      this.bar.classList.add('ko');
      if (this.koTimer <= 0) {
        this.hp = MAX_HP;
        this.bar.classList.remove('ko');
      }
    }
    this.fill.style.transform = `scaleX(${this.hp / MAX_HP})`;
    const visible = this.screen(camera);
    this.bar.hidden = !visible;
    if (visible) this.bar.style.transform = `translate(${projected.x}px, ${projected.y}px)`;
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
  }
}

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

  constructor(
    obstacles: Obstacle[],
    look: { coat: string; coatDark: string; ink: string },
    private readonly tuning: Tuning,
  ) {
    super(new Character(obstacles, { ...look, speed: tuning.speed }), look.ink);
    this.attackTimer = THREE.MathUtils.randFloat(1.5, 2.5);
  }

  /** A strike is coming down near this rival; maybe step out of it after a short reaction. */
  threatened(at: THREE.Vector3) {
    if (Math.hypot(at.x - this.position.x, at.z - this.position.z) > HIT_RADIUS + 0.1) return;
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
    if (!this.foe || !others.includes(this.foe) || this.retarget <= 0) this.chooseFoe(others);
    const foe = this.foe!;
    const target = foe.position;

    if (this.dodgeTimer >= 0 && (this.dodgeTimer -= dt) < 0) {
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
    if (this.moveTimer <= 0 && !this.body.moving) {
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

    this.attackTimer -= dt;
    if (this.attackTimer <= 0) {
      this.attackTimer = THREE.MathUtils.randFloat(...this.tuning.cooldown);
      // Fire and water have to be drawn from a source on the map first, like the player does; that takes this turn.
      if (!this.charged && Math.random() < this.tuning.elemental) {
        const order: Fluid[] = Math.random() < 0.5 ? ['fire', 'water'] : ['water', 'fire'];
        for (const element of order) {
          const source = combat.findSource(element, pos);
          if (!source) continue;
          this.charged = element;
          this.body.face(source);
          this.body.cast();
          combat.channel(this, source, element);
          this.attackTimer = THREE.MathUtils.randFloat(0.8, 1.4);
          return;
        }
      }
      const aim = target.clone();
      if (this.tuning.leads && dt > 0) {
        // Where the foe will be when the warning ends, if it keeps walking.
        const k = this.tuning.warn / dt;
        aim.x += (target.x - foe.prev.x) * k * 0.7;
        aim.z += (target.z - foe.prev.z) * k * 0.7;
      }
      const a = Math.random() * Math.PI * 2;
      const e = Math.random() * this.tuning.aimError;
      aim.x += Math.sin(a) * e;
      aim.z += Math.cos(a) * e;
      aim.y = heightAt(aim.x, aim.z);
      const element: Element = this.charged ?? 'earth';
      this.charged = null;
      this.body.face(aim);
      this.body.cast();
      combat.strikeFrom(this, aim, element, this.tuning.warn);
    }
  }

  dispose() {
    super.dispose();
    this.body.dispose();
    this.disposeAura();
  }
}

/**
 * Sparring rivals: 0–2 opponents in a free-for-all with the alchemist. Damage is only shown
 * (flash, numbers, health bars); nobody dies and there is no game over yet.
 */
export class Combat {
  readonly root = new THREE.Group();
  private readonly hero: Fighter;
  private rivals: Rival[] = [];
  private count = 1;
  private level: Difficulty = 'normal';

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
    this.spells.wall(this.hero.position, toward, this.hero.ink);
  }

  /** The alchemist strikes a point. */
  cast(at: THREE.Vector3, element: Element) {
    this.strikeFrom(this.hero, at, element);
  }

  /** Shows fire or water flying from its source into a rival. */
  channel(rival: Rival, source: THREE.Vector3, element: Fluid) {
    this.spells.channel(source, rival.position, element);
  }

  /** A strike in the caster's ink; rivals near the warning may try to step out of it. */
  strikeFrom(caster: Fighter, at: THREE.Vector3, element: Element, warn?: number) {
    // Cast from inside a rune circle, the strike is 25% bigger.
    const scale = this.onRunes(caster.position) ? RUNE_BOOST : 1;
    // Aimed into a standing wall's zone, it never starts: only a cross where it would have broken out.
    if (this.spells.shielded(at.x, at.z)) {
      this.spells.denied(at, caster.ink, scale);
      return;
    }
    this.spells.pillars(caster.position, at, element, caster, warn, caster.ink, scale);
    for (const r of this.rivals) if (r !== caster) r.threatened(at);
  }

  /** Puts fresh rivals on screen around the alchemist, everyone at full health. */
  respawn() {
    for (const r of this.rivals) {
      this.root.remove(r.body.root);
      r.dispose();
    }
    this.rivals = [];
    this.hero.reset();
    const center = this.hero.position;
    for (let i = 0; i < this.count; i++) {
      const rival = new Rival(this.obstacles, RIVAL_LOOKS[i % RIVAL_LOOKS.length], TUNING[this.level]);
      // Opposite sides when there are two, so the three start apart.
      const base = Math.random() * Math.PI * 2;
      for (let tries = 0; tries < 12; tries++) {
        const a = base + i * Math.PI + THREE.MathUtils.randFloatSpread(0.8);
        const r = THREE.MathUtils.randFloat(1.5, 2.1);
        const spot = new THREE.Vector3(center.x + Math.sin(a) * r, 0, center.z + Math.cos(a) * r);
        if (!this.onScreen(spot) && tries < 11) continue;
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
      if (f === caster) continue;
      if (Math.hypot(f.position.x - x, f.position.z - z) <= area + BODY_RADIUS) f.hit(DAMAGE[element], element, this.camera);
    }
  }

  update(dt: number) {
    const all = [this.hero, ...this.rivals];
    for (const r of this.rivals) {
      r.think(dt, all.filter((f) => f !== r), this, this.onScreen);
      r.body.update(dt);
      r.update(dt, this.camera);
    }
    this.hero.update(dt, this.camera);
    for (const f of all) {
      f.empower(this.onRunes(f.position), dt);
      f.prev.copy(f.position);
    }
  }
}
