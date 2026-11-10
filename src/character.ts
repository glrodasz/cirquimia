import * as THREE from 'three';
import { heightAt } from './noise';
import type { Obstacle } from './meadow';
import { findPath, type Waypoint } from './path';

/** The model is built at roughly 1.8 units tall (7.5 heads) and scaled down to fit the meadow. */
const MODEL_SCALE = 0.3;
const SPEED = 1.6;
const STRIDE = 1.75 * MODEL_SCALE; // world units covered per full walk cycle
const ARRIVE_RADIUS = 0.03;
const TURN_RATE = 12;
export const BODY_RADIUS = 0.12;
const WAYPOINT_RADIUS = 0.06;
/** How far ahead a held key aims each frame: more than one frame's walk, so the stride never stutters. */
const STEER_AHEAD = 0.3;
// If the alchemist covers less than this share of its expected distance over STUCK_TIME, it re-plans
// (something new, like an earth wall, may have risen in the way).
const STUCK_TIME = 0.3;
const STUCK_RATIO = 0.3;

const LEG_UPPER = 0.46;
const LEG_LOWER = 0.44;
const HIP_Y = 0.95;
const ARM_UPPER = 0.3;
const ARM_LOWER = 0.27;
const SHOULDER_Y = 1.46;

// Uniform colours: a muted slate-blue greatcoat with brass trim, dark trousers, tall black boots, white gloves.
const COAT = '#3a4c63';
const COAT_DARK = '#2c3a4d';
const BRASS = '#b9a064';
const TROUSERS = '#2b313b';
const BOOTS = '#202227';
const GLOVES = '#eceee8';
const SKIN = '#ecc6a6';
const HAIR = '#4a3a30';
const LEATHER = '#2e2925';
const SILVER = '#c8cfd4';

const materials = new Map<string, THREE.MeshLambertMaterial>();
function mat(hex: string, emissive = '#000000', side: THREE.Side = THREE.FrontSide) {
  const key = hex + emissive + side;
  let m = materials.get(key);
  if (!m) materials.set(key, (m = new THREE.MeshLambertMaterial({ color: hex, emissive, flatShading: true, side })));
  return m;
}

function part(geo: THREE.BufferGeometry, hex: string, emissive?: string, side?: THREE.Side) {
  const mesh = new THREE.Mesh(geo, mat(hex, emissive, side));
  mesh.castShadow = true;
  return mesh;
}

/** A limb segment hanging down from its pivot. */
function segment(length: number, rTop: number, rBottom: number, hex: string) {
  return part(new THREE.CylinderGeometry(rTop, rBottom, length, 6).translate(0, -length / 2, 0), hex);
}

interface Limb {
  upper: THREE.Group;
  lower: THREE.Group;
}

function buildLeg(side: number): Limb {
  const upper = new THREE.Group();
  upper.position.set(side * 0.09, HIP_Y, 0);
  upper.add(segment(LEG_UPPER, 0.075, 0.06, TROUSERS));
  const lower = new THREE.Group();
  lower.position.y = -LEG_UPPER;
  // Knee-high riding boots: the whole shin is boot, with a slightly flared top.
  lower.add(segment(LEG_LOWER, 0.066, 0.05, BOOTS));
  const foot = part(new THREE.BoxGeometry(0.1, 0.07, 0.21), BOOTS);
  foot.position.set(0, -LEG_LOWER - 0.02, 0.045);
  lower.add(foot);
  upper.add(lower);
  return { upper, lower };
}

function buildArm(side: number, coat: string, coatDark: string): Limb {
  const upper = new THREE.Group();
  upper.position.set(side * 0.21, SHOULDER_Y, 0);
  upper.rotation.z = side * 0.08;
  upper.add(segment(ARM_UPPER, 0.055, 0.045, coat));
  const lower = new THREE.Group();
  lower.position.y = -ARM_UPPER;
  lower.add(segment(ARM_LOWER, 0.044, 0.04, coat));
  const cuff = part(new THREE.CylinderGeometry(0.047, 0.047, 0.05, 6), coatDark);
  cuff.position.y = -ARM_LOWER + 0.03;
  lower.add(cuff);
  // White gloves: the alchemist's working tool.
  const hand = part(new THREE.IcosahedronGeometry(0.045, 0), GLOVES);
  hand.scale.set(0.9, 1.15, 0.8);
  hand.position.y = -ARM_LOWER - 0.035;
  lower.add(hand);
  upper.add(lower);
  return { upper, lower };
}

export interface CharacterLook {
  coat?: string;
  coatDark?: string;
  speed?: number;
}

// A hit turns the whole figure white for a moment.
const FLASH = new THREE.MeshBasicMaterial({ color: '#fff4e8' });
const FLASH_TIME = 0.12;
const CAST_TIME = 0.4;
// Knocked down: the body tips over backwards and lies on its back.
const FALL_TIME = 0.55;

/** A small low-poly state alchemist in uniform, with human proportions, that walks to a target point on the meadow. */
export class Character {
  readonly root = new THREE.Group();
  readonly target = new THREE.Vector3();
  private readonly model = new THREE.Group();
  private readonly torso = new THREE.Group();
  private readonly coatTail: THREE.Mesh;
  private readonly legL = buildLeg(-1);
  private readonly legR = buildLeg(1);
  private readonly armL: Limb;
  private readonly armR: Limb;
  private readonly speed: number;
  private flashTimer = 0;
  private castTimer = 0;
  private heading = 0;
  /** Corners to walk through on the way to the target, last one being the target itself. */
  private path: Waypoint[] = [];
  /** Walking on the keys: it keeps going the same way for as long as they are held. */
  private steering = false;
  private stuckTimer = 0;
  private stuckCount = 0;
  private stuckFrom = new THREE.Vector3();
  private walkPhase = 0;
  private walkBlend = 0;
  private time = 0;
  /** 0 standing, 1 lying on the ground. */
  private fallen = 0;
  private down = false;
  /** Seconds left rooted to the spot by a vine: no walking until then. */
  private rootedFor = 0;
  /** A short burst of speed (a rival's sidestep out of a strike): multiplier and seconds left. */
  private dashBoost = 1;
  private dashFor = 0;

  constructor(private readonly obstacles: Obstacle[], look: CharacterLook = {}) {
    const coat = look.coat ?? COAT;
    const coatDark = look.coatDark ?? COAT_DARK;
    this.speed = look.speed ?? SPEED;
    this.armL = buildArm(-1, coat, coatDark);
    this.armR = buildArm(1, coat, coatDark);
    // Greatcoat: fitted chest, then long tails down to the knee, open at the front so the legs can stride.
    const chest = part(new THREE.CylinderGeometry(0.2, 0.155, 0.52, 7), coat);
    chest.position.y = 1.26;
    const tailLength = 0.52;
    this.coatTail = part(
      new THREE.CylinderGeometry(0.16, 0.25, tailLength, 8, 1, true, 0.42, Math.PI * 2 - 0.84).translate(0, -tailLength / 2, 0),
      coat,
      undefined,
      THREE.DoubleSide,
    );
    this.coatTail.position.y = 1.03;
    const belt = part(new THREE.CylinderGeometry(0.162, 0.162, 0.05, 7), LEATHER);
    belt.position.y = 1.02;
    const buckle = part(new THREE.BoxGeometry(0.05, 0.04, 0.02), BRASS);
    buckle.position.set(0, 1.02, 0.16);
    // Pocket-watch chain looping from the belt.
    const chain = part(new THREE.TorusGeometry(0.035, 0.006, 3, 8, Math.PI), SILVER);
    chain.rotation.set(0.25, 0, Math.PI);
    chain.position.set(0.1, 0.99, 0.13);

    // Double-breasted front: two rows of brass buttons.
    const buttons: THREE.Mesh[] = [];
    for (const y of [1.12, 1.24, 1.36]) {
      const r = 0.155 + ((y - 1.0) / 0.52) * 0.045;
      for (const x of [-0.055, 0.055]) {
        const b = part(new THREE.OctahedronGeometry(0.014, 0), BRASS);
        b.position.set(x, y, r - 0.012);
        buttons.push(b);
      }
    }
    // Shoulder boards and a high stand collar.
    const epauletL = part(new THREE.BoxGeometry(0.11, 0.025, 0.1), BRASS);
    epauletL.position.set(-0.17, 1.525, 0);
    epauletL.rotation.z = 0.12;
    const epauletR = epauletL.clone();
    epauletR.position.x = 0.17;
    epauletR.rotation.z = -0.12;
    const collar = part(new THREE.CylinderGeometry(0.075, 0.085, 0.07, 7), coatDark);
    collar.position.y = 1.55;

    const head = part(new THREE.IcosahedronGeometry(0.115, 1), SKIN);
    head.scale.set(0.92, 1.05, 0.98);
    head.position.y = 1.68;
    // Short, swept-back hair: a cap over the crown and the back of the head.
    const hair = part(new THREE.IcosahedronGeometry(0.122, 1), HAIR);
    hair.scale.set(0.95, 0.75, 1.02);
    hair.position.set(0, 1.73, -0.02);

    this.torso.add(
      chest, this.coatTail, belt, buckle, chain, ...buttons, epauletL, epauletR, collar, head, hair,
      this.armL.upper, this.armR.upper,
    );
    this.model.add(this.torso, this.legL.upper, this.legR.upper);
    this.model.scale.setScalar(MODEL_SCALE);
    this.root.add(this.model);
    this.root.position.set(0, heightAt(0, 0), 0);
    this.target.copy(this.root.position);
    this.model.traverse((o) => {
      if (o instanceof THREE.Mesh) o.userData.material = o.material;
    });
  }

  /** True while walking somewhere. */
  get moving() {
    return this.path.length > 1 || Math.hypot(this.target.x - this.root.position.x, this.target.z - this.root.position.z) > ARRIVE_RADIUS;
  }

  /** Flashes white for a moment: the visual side of taking a hit. */
  flash() {
    this.flashTimer = FLASH_TIME;
    this.model.traverse((o) => {
      if (o instanceof THREE.Mesh) o.material = FLASH;
    });
  }

  /** Frees the model's geometries (materials are shared between characters and stay). */
  dispose() {
    this.model.traverse((o) => {
      if (o instanceof THREE.Mesh) o.geometry.dispose();
    });
  }

  /** True once knocked down; it stays on the ground until `rise`. */
  get isDown() {
    return this.down;
  }

  /** Falls on its back where it stands and stays there. */
  fall() {
    if (this.down) return;
    this.down = true;
    this.castTimer = 0;
    this.stop();
  }

  /** Back on its feet at once, as at the start of a match. */
  rise() {
    this.down = false;
    this.fallen = 0;
    this.stop();
  }

  /** Throws the right hand forward, as when releasing a circle. */
  cast() {
    this.castTimer = CAST_TIME;
  }

  /** Held by a vine for `seconds`: it stops where it stands and cannot walk until it lets go (casting still works). */
  entangle(seconds: number) {
    if (this.down) return;
    this.rootedFor = Math.max(this.rootedFor, seconds);
    this.stop();
  }

  /** True while a vine holds it in place. */
  get rooted() {
    return this.rootedFor > 0 && !this.down;
  }

  setTarget(point: THREE.Vector3) {
    if (this.down || this.rooted) return;
    this.target.set(point.x, 0, point.z);
    // Never aim inside a tree or a big rock; push the goal to its edge.
    for (const o of this.obstacles) {
      const dx = this.target.x - o.x;
      const dz = this.target.z - o.z;
      const min = o.r + BODY_RADIUS + 0.05;
      const d = Math.hypot(dx, dz);
      if (d < min) {
        if (d < 1e-4) {
          this.target.x = o.x + min;
        } else {
          this.target.x = o.x + (dx / d) * min;
          this.target.z = o.z + (dz / d) * min;
        }
      }
    }
    this.plan();
  }

  /**
   * Walks straight along a ground direction (keyboard), sliding along whatever it bumps into; no route planning.
   * Call it every frame while the keys are held, then halt().
   */
  steer(dx: number, dz: number) {
    if (this.down || this.rooted) return;
    const pos = this.root.position;
    this.target.set(pos.x + dx * STEER_AHEAD, 0, pos.z + dz * STEER_AHEAD);
    this.path = [{ x: this.target.x, z: this.target.z }];
    this.steering = true;
    this.stuckCount = 0;
    this.stuckTimer = 0;
    this.stuckFrom.copy(pos);
  }

  /**
   * Where it will be in `seconds` if it keeps doing what it is doing: along its route to the target,
   * or straight on while the keys are held.
   */
  /** Walks `boost` times faster for the next `seconds`. */
  dash(boost: number, seconds: number) {
    this.dashBoost = boost;
    this.dashFor = seconds;
  }

  ahead(seconds: number, out = new THREE.Vector3()) {
    const pos = this.root.position;
    out.set(pos.x, 0, pos.z);
    if (this.down || this.rooted) return out;
    let left = this.speed * seconds;
    let dx = 0;
    let dz = 0;
    for (const p of this.path) {
      const ex = p.x - out.x;
      const ez = p.z - out.z;
      const d = Math.hypot(ex, ez);
      if (d < 1e-6) continue;
      dx = ex / d;
      dz = ez / d;
      const step = Math.min(d, left);
      out.x += dx * step;
      out.z += dz * step;
      if ((left -= step) <= 0) return out;
    }
    if (this.steering) {
      out.x += dx * left;
      out.z += dz * left;
    }
    return out;
  }

  /** Stops where it stands. */
  halt() {
    if (!this.down) this.stop();
  }

  private stop() {
    this.target.set(this.root.position.x, 0, this.root.position.z);
    this.path = [];
    this.steering = false;
    this.stuckCount = 0;
  }

  private replan() {
    const count = this.stuckCount;
    this.plan();
    this.stuckCount = count;
  }

  /** Routes around trees, rocks and walls instead of pushing straight into them. */
  private plan() {
    this.steering = false;
    this.stuckCount = 0;
    const pos = this.root.position;
    const path = findPath(pos.x, pos.z, this.target.x, this.target.z, this.obstacles, BODY_RADIUS + 0.02);
    if (path?.length) {
      this.path = path;
      const last = path[path.length - 1];
      this.target.x = last.x;
      this.target.z = last.z;
    } else {
      // Unreachable: walk as far as the straight line allows, as before.
      this.path = [{ x: this.target.x, z: this.target.z }];
    }
    this.stuckTimer = 0;
    this.stuckFrom.copy(pos);
  }

  /** Turns to face a point, e.g. where a circle is being cast. */
  face(point: THREE.Vector3) {
    if (this.down) return;
    const dx = point.x - this.root.position.x;
    const dz = point.z - this.root.position.z;
    if (dx * dx + dz * dz > 1e-6) this.heading = Math.atan2(dx, dz);
  }

  update(dt: number) {
    this.time += dt;
    this.rootedFor = Math.max(0, this.rootedFor - dt);
    if (this.dashFor > 0 && (this.dashFor -= dt) <= 0) this.dashBoost = 1;
    const speed = this.speed * this.dashBoost;
    const pos = this.root.position;
    // Drop corners already reached; the last waypoint is the target.
    while (this.path.length > 1 && Math.hypot(this.path[0].x - pos.x, this.path[0].z - pos.z) < WAYPOINT_RADIUS) this.path.shift();
    const goal = this.path[0] ?? this.target;
    const dx = goal.x - pos.x;
    const dz = goal.z - pos.z;
    const dist = Math.hypot(dx, dz);
    const walking = dist > ARRIVE_RADIUS || this.path.length > 1;

    if (walking && dist > 1e-6) {
      const step = Math.min(dist, speed * dt);
      pos.x += (dx / dist) * step;
      pos.z += (dz / dist) * step;
      this.resolveCollisions();
      this.stuckTimer += dt;
      if (this.stuckTimer >= STUCK_TIME) {
        const moved = Math.hypot(pos.x - this.stuckFrom.x, pos.z - this.stuckFrom.z);
        if (moved < this.speed * STUCK_TIME * STUCK_RATIO) {
          // A fresh route usually frees it; if it still cannot move, stop instead of pushing forever.
          if (++this.stuckCount > 2) this.stop();
          else this.replan();
        } else {
          this.stuckCount = 0;
        }
        this.stuckTimer = 0;
        this.stuckFrom.copy(pos);
      }
      const desired = Math.atan2(dx, dz);
      let delta = desired - this.heading;
      delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      this.heading += delta * Math.min(1, TURN_RATE * dt);
    }
    pos.y = heightAt(pos.x, pos.z);
    this.root.rotation.y = this.heading;

    this.walkBlend += ((walking ? 1 : 0) - this.walkBlend) * Math.min(1, dt * 10);
    this.walkPhase += ((speed / STRIDE) * Math.PI * 2 * dt) * this.walkBlend;
    if (this.flashTimer > 0 && (this.flashTimer -= dt) <= 0) {
      this.model.traverse((o) => {
        if (o instanceof THREE.Mesh) o.material = o.userData.material;
      });
    }
    this.castTimer = Math.max(0, this.castTimer - dt);
    if (this.down) this.fallen = Math.min(1, this.fallen + dt / FALL_TIME);
    this.animate();
  }

  private animate() {
    const s = Math.sin(this.walkPhase);
    const c = Math.cos(this.walkPhase);
    const w = this.walkBlend;
    const idle = 1 - w;

    // Legs swing from the hip; the knee bends only while the foot is travelling forward.
    this.legL.upper.rotation.x = s * 0.5 * w;
    this.legR.upper.rotation.x = -s * 0.5 * w;
    this.legL.lower.rotation.x = Math.max(0, -c) * 0.9 * w;
    this.legR.lower.rotation.x = Math.max(0, c) * 0.9 * w;

    // Arms counter-swing with a measured, soldierly gait.
    this.armL.upper.rotation.x = -s * 0.4 * w;
    this.armR.upper.rotation.x = s * 0.4 * w;
    this.armL.lower.rotation.x = -0.12 - Math.max(0, -s) * 0.3 * w;
    this.armR.lower.rotation.x = -0.12 - Math.max(0, s) * 0.3 * w;
    if (this.castTimer > 0) {
      // Up fast, down slow: the casting arm points at the target and settles back.
      const k = Math.sin(Math.PI * Math.min(1, (1 - this.castTimer / CAST_TIME) * 1.6) ** 0.6);
      this.armR.upper.rotation.x = THREE.MathUtils.lerp(this.armR.upper.rotation.x, -1.5, k);
      this.armR.lower.rotation.x = THREE.MathUtils.lerp(this.armR.lower.rotation.x, -0.2, k);
    }

    // The coat tails swing open a little behind the striding legs.
    this.coatTail.rotation.x = Math.abs(s) * 0.12 * w;
    this.coatTail.scale.x = 1 + Math.abs(s) * 0.08 * w;

    // Small vertical bounce twice per cycle, a slight forward lean, and breathing when idle.
    const bounce = Math.abs(Math.cos(this.walkPhase)) * 0.035 * w;
    this.model.position.y = bounce * MODEL_SCALE;
    this.torso.rotation.x = 0.06 * w;
    this.torso.rotation.y = s * 0.08 * w;
    this.torso.scale.y = 1 + Math.sin(this.time * 2.2) * 0.006 * idle;

    // Tipping over: accelerates like a real fall, with a small bounce as it lands, then lies flat with limbs splayed.
    const t = this.fallen;
    if (t <= 0) {
      this.model.rotation.x = 0;
      this.armL.upper.rotation.z = -0.08;
      this.armR.upper.rotation.z = 0.08;
      this.legL.upper.rotation.z = this.legR.upper.rotation.z = 0;
      return;
    }
    const drop = t < 0.8 ? (t / 0.8) ** 2 : 1 - Math.sin(((t - 0.8) / 0.2) * Math.PI) * 0.06;
    this.model.rotation.x = -Math.PI / 2 * drop;
    this.model.position.y = 0.05 * drop;
    const splay = Math.min(1, t * 1.4);
    this.armL.upper.rotation.z = THREE.MathUtils.lerp(-0.08, -0.9, splay);
    this.armR.upper.rotation.z = THREE.MathUtils.lerp(0.08, 0.9, splay);
    this.armL.lower.rotation.x = this.armR.lower.rotation.x = -0.35 * splay;
    this.legL.upper.rotation.z = -0.18 * splay;
    this.legR.upper.rotation.z = 0.12 * splay;
    this.legR.lower.rotation.x = 0.5 * splay;
    this.torso.scale.y = 1;
  }

  private resolveCollisions() {
    const pos = this.root.position;
    for (const o of this.obstacles) {
      const dx = pos.x - o.x;
      const dz = pos.z - o.z;
      const min = o.r + BODY_RADIUS;
      const d2 = dx * dx + dz * dz;
      if (d2 < min * min && d2 > 1e-8) {
        const d = Math.sqrt(d2);
        pos.x = o.x + (dx / d) * min;
        pos.z = o.z + (dz / d) * min;
      }
    }
  }
}
