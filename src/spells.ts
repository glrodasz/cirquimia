import * as THREE from 'three';
import { heightAt } from './noise';
import type { Obstacle } from './meadow';

// Circle = defence: a temporary arc of earth and rock that shields the alchemist.
const WALL_MIN_REACH = 0.45; // arc radius around the alchemist, world units
const WALL_MAX_REACH = 1.0;
const WALL_RISE = 0.35; // s, whole arc (rocks rise staggered from the middle out)
const WALL_HOLD = 1.4; // about two seconds up in total
const WALL_SINK = 0.5;

// Square = ranged attack: a cluster of slanted square pillars after a short warning in the ground.
const PILLAR_WARN = 0.2; // s the ground trembles before the pillars break out
const PILLAR_RISE = 0.12;
const PILLAR_HOLD = 0.55; // about a second from eruption to buried again
const PILLAR_SINK = 0.3;
export const PILLAR_AREA = 0.17; // radius of the cluster, about one alchemist wide

// Triangles = fire (apex up) and water (apex down): drawn from a source first, then cast like the square.
export type Element = 'earth' | 'fire' | 'water';
const CHANNEL_TIME = 0.5; // s for the drawn fire or water to fly from its source to the alchemist

// Bruma earth tones: grey rock, dry dirt, dark soil.
const ROCK = ['#8c9496', '#7d8584', '#9a9d95'];
const EARTH = ['#a39c86', '#8f8672', '#7a7262'];
const SOIL = '#4a4038';

const material = new THREE.MeshLambertMaterial({ flatShading: true });
const rockGeo = new THREE.DodecahedronGeometry(0.5, 0).translate(0, 0.5, 0);
// Four-sided prism with a slightly narrower top, base at y = 0, side 1 and height 1.
const pillarGeo = new THREE.CylinderGeometry(Math.SQRT1_2 * 0.82, Math.SQRT1_2, 1, 4, 1).rotateY(Math.PI / 4).translate(0, 0.5, 0);
const crackGeo = new THREE.CircleGeometry(1, 7).rotateX(-Math.PI / 2);
const inkRingGeo = new THREE.RingGeometry(0.9, 1.08, 28).rotateX(-Math.PI / 2);
// Faceted flame tongues and water spouts, base at y = 0, width 1 and height 1.
const flameGeo = new THREE.ConeGeometry(0.5, 1, 5, 1).translate(0, 0.5, 0);
const spoutGeo = new THREE.CylinderGeometry(0.3, 0.5, 1, 6, 1).translate(0, 0.5, 0);
const orbGeo = new THREE.IcosahedronGeometry(1, 0);

// Muted to sit in the Bruma palette, but lit from within so they still read as fire and water.
const FIRE = ['#f08a3a', '#f4a94c', '#e0663a'];
const FIRE_CORE = '#ffd67a';
const WATER = ['#7fb3c2', '#93c4cf', '#6a9fb1'];
const WATER_FOAM = '#d9ecef';
const WARNING: Record<Element, string> = { earth: SOIL, fire: '#c4552c', water: '#2f5866' };

const tmpColor = new THREE.Color();
const easeOutBack = (t: number) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
const easeIn = (t: number) => t * t;

interface Piece {
  mesh: THREE.Mesh;
  ground: number; // y of the terrain under the piece
  height: number; // full height above ground once risen
  delay: number; // s after the effect starts rising
  geo?: THREE.BufferGeometry; // owned geometry, disposed with the effect
}

abstract class Effect {
  readonly group = new THREE.Group();
  protected readonly pieces: Piece[] = [];
  protected age = 0;
  done = false;
  /** Only solid between breaking out and starting to sink, so a warning never blocks anyone. */
  solid = false;

  protected constructor(
    protected readonly warn: number,
    protected readonly rise: number,
    protected readonly hold: number,
    protected readonly sink: number,
  ) {}

  protected addPiece(geo: THREE.BufferGeometry, color: THREE.ColorRepresentation, x: number, z: number, height: number, delay: number) {
    const mesh = new THREE.Mesh(geo, material.clone());
    (mesh.material as THREE.MeshLambertMaterial).color.set(color);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const ground = heightAt(x, z);
    mesh.position.set(x, ground - height, z);
    mesh.visible = false;
    this.group.add(mesh);
    this.pieces.push({ mesh, ground, height, delay });
    return mesh;
  }

  update(dt: number) {
    this.age += dt;
    const t = this.age - this.warn;
    const sinkAt = this.rise + this.hold;
    for (const p of this.pieces) {
      const local = t - p.delay;
      let up: number;
      if (local < 0) up = 0;
      else if (local < this.rise) up = easeOutBack(local / this.rise);
      else if (t < sinkAt) up = 1;
      else up = 1 - easeIn(Math.min(1, (t - sinkAt - p.delay * 0.5) / this.sink));
      p.mesh.visible = up > 0.01;
      // Sink a little past full depth so the base never floats above a slope.
      p.mesh.position.y = p.ground - (1 - up) * p.height * 1.15;
    }
    this.solid = t >= 0 && t < sinkAt;
    this.onUpdate(t);
    if (t > sinkAt + this.sink + 0.4) this.done = true;
  }

  protected onUpdate(_t: number) {}

  dispose() {
    for (const p of this.pieces) {
      (p.mesh.material as THREE.Material).dispose();
      p.geo?.dispose();
    }
  }
}

/** An arc of rock and packed earth around the alchemist: low at the ends, tallest in the middle. */
class EarthWall extends Effect {
  readonly obstacles: Obstacle[] = [];
  /** Protected disk inside the arc: no pillar can break out here while the wall stands. */
  readonly zone: { x: number; z: number; r: number };

  constructor(cx: number, cz: number, toward: THREE.Vector3) {
    super(0, WALL_RISE, WALL_HOLD, WALL_SINK);
    const dx = toward.x - cx;
    const dz = toward.z - cz;
    const facing = Math.atan2(dx, dz);
    const reach = THREE.MathUtils.clamp(Math.hypot(dx, dz), WALL_MIN_REACH, WALL_MAX_REACH);
    this.zone = { x: cx, z: cz, r: reach };
    // Every cast is a little different: span, peak, lean of the hump and how rocky it is.
    const span = THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(130, 175));
    const peak = THREE.MathUtils.randFloat(0.38, 0.5);
    const skew = THREE.MathUtils.randFloat(-0.12, 0.12);
    const rockiness = Math.random();
    const base = THREE.MathUtils.randFloat(0.2, 0.26); // thickness at the foot; the crest is much thinner
    const count = Math.max(8, Math.round((span * reach) / 0.09));
    const soil = EARTH[Math.floor(Math.random() * EARTH.length)];

    // Cross-sections along the arc, shared by neighbouring segments so the risen wall is one continuous berm.
    const sections: { angle: number; height: number; inner: number; outer: number; crest: number; lean: number }[] = [];
    for (let j = 0; j <= count; j++) {
      const u = j / count;
      // Bell-shaped profile shifted by the skew: low at both ends, tallest in the middle.
      const k = THREE.MathUtils.clamp(u + skew * Math.sin(Math.PI * u), 0, 1);
      const profile = Math.sin(Math.PI * k) ** 1.2;
      const edge = j === 0 || j === count;
      sections.push({
        angle: facing + (u - 0.5) * span + (edge ? 0 : THREE.MathUtils.randFloatSpread(0.03)),
        height: edge ? 0.02 : Math.max(0.05, peak * profile * THREE.MathUtils.randFloat(0.85, 1.1)),
        inner: reach - base * THREE.MathUtils.randFloat(0.4, 0.6),
        outer: reach + base * THREE.MathUtils.randFloat(0.4, 0.6),
        crest: reach + THREE.MathUtils.randFloatSpread(0.04),
        lean: THREE.MathUtils.randFloat(0.02, 0.05),
      });
    }

    for (let j = 0; j < count; j++) {
      const a = sections[j];
      const b = sections[j + 1];
      const u = (j + 0.5) / count;
      // One earth tone per cast with gentle banding; the occasional slab of bare rock.
      const isRock = Math.random() < 0.08 + rockiness * 0.2;
      tmpColor.set(isRock ? ROCK[j % ROCK.length] : soil).offsetHSL(0, 0, THREE.MathUtils.randFloatSpread(0.03));
      const height = Math.max(a.height, b.height);
      this.addSegment(wallSegment(cx, cz, a, b, j === 0, j === count - 1), tmpColor, cx, cz, height, Math.abs(u - 0.5) * 2 * WALL_RISE * 0.7);
      // Blockers along the arc so the alchemist walks around the wall, not through it.
      const mid = (a.angle + b.angle) / 2;
      if (j % 2 === 0) this.obstacles.push({ x: cx + Math.sin(mid) * reach, z: cz + Math.cos(mid) * reach, r: base * 0.6 });
    }

    // Chunks of rock bedded into the flanks, more of them on rockier casts.
    const rocks = Math.round(count * (0.15 + rockiness * 0.35));
    for (let i = 0; i < rocks; i++) {
      const j = THREE.MathUtils.randInt(1, count - 1);
      const sec = sections[j];
      const side = Math.random() < 0.5 ? sec.inner : sec.outer;
      const r = THREE.MathUtils.lerp(sec.crest, side, THREE.MathUtils.randFloat(0.3, 0.8));
      const size = THREE.MathUtils.randFloat(0.07, 0.12) * (0.6 + sec.height * 1.2);
      const x = cx + Math.sin(sec.angle) * r;
      const z = cz + Math.cos(sec.angle) * r;
      tmpColor.set(ROCK[Math.floor(Math.random() * ROCK.length)]).offsetHSL(0, 0, THREE.MathUtils.randFloatSpread(0.06));
      const rock = this.addPiece(rockGeo, tmpColor, x, z, size, Math.abs(j / count - 0.5) * 2 * WALL_RISE * 0.7 + 0.05);
      rock.scale.set(size * THREE.MathUtils.randFloat(1, 1.6), size, size * THREE.MathUtils.randFloat(0.9, 1.3));
      rock.rotation.set(THREE.MathUtils.randFloatSpread(0.6), Math.random() * Math.PI, THREE.MathUtils.randFloatSpread(0.6));
    }
  }

  private addSegment(geo: THREE.BufferGeometry, color: THREE.ColorRepresentation, cx: number, cz: number, height: number, delay: number) {
    const mesh = new THREE.Mesh(geo, material.clone());
    (mesh.material as THREE.MeshLambertMaterial).color.set(color);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(cx, -height, cz);
    mesh.visible = false;
    this.group.add(mesh);
    // The geometry already follows the terrain, so its "ground" is 0.
    this.pieces.push({ mesh, ground: 0, height, delay, geo });
    return mesh;
  }
}

interface Section {
  angle: number;
  height: number;
  inner: number;
  outer: number;
  crest: number;
  lean: number;
}

/** One slice of the berm between two cross-sections: a sloped prism whose foot follows the terrain. */
function wallSegment(cx: number, cz: number, a: Section, b: Section, capStart: boolean, capEnd: boolean) {
  // Per section: inner foot, inner shoulder, crest, outer shoulder, outer foot (local to cx, cz, absolute y).
  const ring = (s: Section) => {
    const at = (r: number, h: number, sink: number) => {
      const x = Math.sin(s.angle) * r;
      const z = Math.cos(s.angle) * r;
      return new THREE.Vector3(x, heightAt(cx + x, cz + z) + h - sink, z);
    };
    const shoulder = s.height * 0.62;
    return [
      at(s.inner, 0, 0.12),
      at(THREE.MathUtils.lerp(s.inner, s.crest, 0.55), shoulder, 0),
      at(s.crest - s.lean, s.height, 0),
      at(THREE.MathUtils.lerp(s.outer, s.crest, 0.5), shoulder * 0.95, 0),
      at(s.outer, 0, 0.12),
    ];
  };
  const pa = ring(a);
  const pb = ring(b);
  const pos: number[] = [];
  const tri = (p: THREE.Vector3, q: THREE.Vector3, r: THREE.Vector3) => pos.push(p.x, p.y, p.z, r.x, r.y, r.z, q.x, q.y, q.z);
  for (let i = 0; i < 4; i++) {
    tri(pa[i], pb[i], pb[i + 1]);
    tri(pa[i], pb[i + 1], pa[i + 1]);
  }
  const cap = (p: THREE.Vector3[], flip: boolean) => {
    for (let i = 1; i < 4; i++) (flip ? tri(p[0], p[i + 1], p[i]) : tri(p[0], p[i], p[i + 1]));
  };
  if (capStart) cap(pa, true);
  if (capEnd) cap(pb, false);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  return geo;
}

/**
 * A tremor on the ground, then the strike breaks out: slanted square pillars of rock (square),
 * a burst of flame tongues (fire triangle) or a spout of water (water triangle).
 */
class PillarStrike extends Effect {
  readonly obstacles: Obstacle[] = [];
  private readonly crack: THREE.Mesh;
  private readonly crackMaterial: THREE.MeshBasicMaterial;
  private readonly inkMaterial: THREE.MeshBasicMaterial | null = null;
  /** Set when the strike lands inside a standing wall's zone: the warning shows but nothing erupts. */
  blocked = false;

  constructor(
    readonly x: number,
    readonly z: number,
    from: THREE.Vector3,
    readonly element: Element = 'earth',
    readonly caster: unknown = null,
    warn = PILLAR_WARN,
    ink: string | null = null,
  ) {
    super(warn, PILLAR_RISE, PILLAR_HOLD, PILLAR_SINK);
    if (element === 'earth') this.buildPillars(from);
    else this.buildFluid(element === 'fire');
    if (ink) {
      // A hint of the caster's ink in the rock, flame or water.
      tmpColor.set(ink);
      for (const p of this.pieces) (p.mesh.material as THREE.MeshLambertMaterial).emissive.lerp(tmpColor, 0.3);
    }

    // Warning: a patch of dark, trembling soil (or glowing embers, or seeping water) the size of the strike.
    this.crackMaterial = new THREE.MeshBasicMaterial({ color: WARNING[element], transparent: true, opacity: 0, depthWrite: false });
    this.crack = new THREE.Mesh(crackGeo, this.crackMaterial);
    this.crack.position.set(x, heightAt(x, z) + 0.03, z);
    // Lie flat on the slope instead of floating half out of it.
    const e = 0.05;
    const normal = new THREE.Vector3(heightAt(x - e, z) - heightAt(x + e, z), 2 * e, heightAt(x, z - e) - heightAt(x, z + e)).normalize();
    this.crack.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    this.crack.scale.setScalar(PILLAR_AREA * 1.5);
    this.crack.renderOrder = 1;
    this.group.add(this.crack);
    if (ink) {
      // Ink ring drawn round the warning in the caster's colour, so you can see who cast it.
      this.inkMaterial = new THREE.MeshBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
      const ring = new THREE.Mesh(inkRingGeo, this.inkMaterial);
      ring.position.y = 0.002;
      ring.renderOrder = 2;
      this.crack.add(ring);
    }
  }

  private buildPillars(from: THREE.Vector3) {
    const { x, z } = this;
    // The pillars lean away from the caster, as if driven up from underneath at an angle.
    const away = Math.atan2(x - from.x, z - from.z);
    const lean = THREE.MathUtils.randFloat(0.3, 0.45);

    const main = this.addPiece(pillarGeo, ROCK[Math.floor(Math.random() * ROCK.length)], x, z, 0.46, 0);
    main.scale.set(0.17, 0.46, 0.17);
    main.rotation.set(lean, away + THREE.MathUtils.randFloatSpread(0.3), 0, 'YXZ');
    this.obstacles.push({ x, z, r: 0.1 });

    const small = THREE.MathUtils.randInt(4, 6);
    for (let i = 0; i < small; i++) {
      const a = (i / small) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.6);
      const d = PILLAR_AREA * THREE.MathUtils.randFloat(0.55, 1);
      const h = THREE.MathUtils.randFloat(0.12, 0.26);
      const w = THREE.MathUtils.randFloat(0.05, 0.085);
      tmpColor.set((Math.random() < 0.6 ? ROCK : EARTH)[Math.floor(Math.random() * 3)]);
      const mesh = this.addPiece(pillarGeo, tmpColor, x + Math.sin(a) * d, z + Math.cos(a) * d, h, THREE.MathUtils.randFloat(0.02, 0.07));
      mesh.scale.set(w, h, w);
      // Small pillars splay outward from the main one.
      mesh.rotation.set(THREE.MathUtils.randFloat(0.25, 0.55), a + THREE.MathUtils.randFloatSpread(0.4), 0, 'YXZ');
    }
  }

  /** Flame tongues or water spouts: a tall core with shorter ones around it, all swaying while up. */
  private buildFluid(fire: boolean) {
    const { x, z } = this;
    const palette = fire ? FIRE : WATER;
    const add = (px: number, pz: number, w: number, h: number, color: string, delay: number, tilt: number, toward: number) => {
      const mesh = this.addPiece(fire ? flameGeo : spoutGeo, color, px, pz, h, delay);
      const m = mesh.material as THREE.MeshLambertMaterial;
      // Lit from within so it glows against the muted meadow.
      m.emissive.set(color).multiplyScalar(fire ? 0.75 : 0.35);
      if (!fire) {
        m.transparent = true;
        m.opacity = 0.82;
      }
      mesh.castShadow = fire ? false : true;
      mesh.scale.set(w, h, w);
      mesh.rotation.set(tilt, toward, 0, 'YXZ');
      mesh.userData.base = mesh.scale.clone();
      mesh.userData.phase = Math.random() * 10;
    };
    add(x, z, fire ? 0.2 : 0.16, fire ? 0.5 : 0.55, palette[0], 0, THREE.MathUtils.randFloatSpread(0.1), 0);
    add(x, z, fire ? 0.11 : 0.08, fire ? 0.36 : 0.62, fire ? FIRE_CORE : WATER_FOAM, 0.02, 0, 0);
    const small = THREE.MathUtils.randInt(5, 7);
    for (let i = 0; i < small; i++) {
      const a = (i / small) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.6);
      const d = PILLAR_AREA * THREE.MathUtils.randFloat(0.45, 0.95);
      const h = THREE.MathUtils.randFloat(0.14, 0.3);
      const w = THREE.MathUtils.randFloat(0.06, 0.1);
      add(x + Math.sin(a) * d, z + Math.cos(a) * d, w, h, palette[i % palette.length], THREE.MathUtils.randFloat(0.02, 0.08), THREE.MathUtils.randFloat(0.15, 0.4), a);
    }
  }

  /** True on the frame the warning ends. */
  erupting(dt: number) {
    return this.age < this.warn && this.age + dt >= this.warn;
  }

  protected onUpdate(t: number) {
    if (this.blocked) {
      for (const p of this.pieces) p.mesh.visible = false;
      this.solid = false;
    }
    if (this.element !== 'earth') {
      // Flames lick and water churns: each tongue breathes in height and width on its own beat.
      const fast = this.element === 'fire' ? 22 : 14;
      for (const p of this.pieces) {
        const base = p.mesh.userData.base as THREE.Vector3;
        const k = this.age * fast + (p.mesh.userData.phase as number);
        const w = 1 + Math.sin(k * 1.3) * 0.12;
        p.mesh.scale.set(base.x * w, base.y * (1 + Math.sin(k) * 0.15), base.z * w);
      }
    }
    if (t < 0) {
      // Grows and shudders during the warning so a target can still step out.
      const w = 1 + t / this.warn;
      this.crackMaterial.opacity = 0.45 + w * 0.35;
      this.crack.scale.setScalar(PILLAR_AREA * (0.9 + w * 0.6) * (1 + Math.sin(this.age * 90) * 0.05));
      this.crack.rotateY(Math.sin(this.age * 70) * 0.02);
    } else {
      const holdEnd = PILLAR_RISE + PILLAR_HOLD + PILLAR_SINK;
      // A blocked strike just settles; otherwise the scar fades as the pillars sink back.
      const fade = this.blocked ? t / 0.25 : (t - PILLAR_RISE - PILLAR_HOLD) / (holdEnd - PILLAR_RISE - PILLAR_HOLD);
      this.crackMaterial.opacity = 0.65 * (1 - THREE.MathUtils.clamp(fade, 0, 1));
    }
    if (this.inkMaterial) this.inkMaterial.opacity = Math.min(0.9, this.crackMaterial.opacity * 1.4);
  }

  dispose() {
    super.dispose();
    this.crackMaterial.dispose();
    this.inkMaterial?.dispose();
  }
}

/** Fire or water drawn out of its source: a few glowing beads arc over to the alchemist. */
class Channel {
  readonly group = new THREE.Group();
  readonly obstacles: Obstacle[] = [];
  readonly solid = false;
  done = false;
  private age = 0;
  private readonly beads: { mesh: THREE.Mesh; delay: number; lift: number }[] = [];
  private readonly material: THREE.MeshLambertMaterial;
  private readonly from: THREE.Vector3;

  constructor(from: THREE.Vector3, private readonly to: THREE.Vector3, fire: boolean) {
    this.from = from.clone();
    const color = fire ? FIRE[0] : WATER[0];
    this.material = new THREE.MeshLambertMaterial({ color, emissive: new THREE.Color(color).multiplyScalar(0.8), flatShading: true });
    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(orbGeo, this.material);
      mesh.scale.setScalar(THREE.MathUtils.randFloat(0.03, 0.05));
      mesh.visible = false;
      this.group.add(mesh);
      this.beads.push({ mesh, delay: i * 0.05, lift: THREE.MathUtils.randFloat(0.5, 0.8) });
    }
  }

  update(dt: number) {
    this.age += dt;
    const target = this.to;
    for (const b of this.beads) {
      const t = (this.age - b.delay) / CHANNEL_TIME;
      b.mesh.visible = t > 0 && t < 1;
      if (!b.mesh.visible) continue;
      const e = t * t * (3 - 2 * t);
      b.mesh.position.lerpVectors(this.from, target, e);
      b.mesh.position.y += 0.3 + Math.sin(Math.PI * e) * b.lift;
    }
    if (this.age > CHANNEL_TIME + 0.4) this.done = true;
  }

  dispose() {
    this.material.dispose();
  }
}

type Active = EarthWall | PillarStrike | Channel;

/** What each transmutation circle does once it is spent on the map. */
export class Spells {
  readonly root = new THREE.Group();
  private readonly active: Active[] = [];

  /** Called when a strike breaks out (not when a wall stops it), with whoever cast it. */
  onStrike: (x: number, z: number, element: Element, caster: unknown) => void = () => {};

  constructor(private readonly obstacles: Obstacle[]) {}

  /** Raises a defensive arc around the caster, facing the tapped point (clamped to close range). */
  wall(caster: THREE.Vector3, toward: THREE.Vector3) {
    this.start(new EarthWall(caster.x, caster.z, toward));
  }

  /** Strikes the tapped point after a short ground warning: rock pillars, or fire or water drawn earlier. */
  pillars(caster: THREE.Vector3, at: THREE.Vector3, element: Element = 'earth', owner: unknown = null, warn = PILLAR_WARN, ink: string | null = null) {
    this.start(new PillarStrike(at.x, at.z, caster, element, owner, warn, ink));
  }

  /** Shows fire or water being drawn from a source into the alchemist (who is followed while it flies). */
  channel(source: THREE.Vector3, caster: THREE.Vector3, element: 'fire' | 'water') {
    this.start(new Channel(source, caster, element === 'fire'));
  }

  /** Drops every effect at once, e.g. when a new meadow replaces the terrain they were built on. */
  clear() {
    for (const effect of this.active) {
      this.setBlocking(effect, false);
      this.root.remove(effect.group);
      effect.dispose();
    }
    this.active.length = 0;
  }

  private start(effect: Active) {
    this.active.push(effect);
    this.root.add(effect.group);
  }

  private setBlocking(effect: Active, on: boolean) {
    for (const o of effect.obstacles) {
      const k = this.obstacles.indexOf(o);
      if (on && k < 0) this.obstacles.push(o);
      else if (!on && k >= 0) this.obstacles.splice(k, 1);
    }
  }

  /** True while a standing earth wall protects this spot. */
  private shielded(x: number, z: number) {
    return this.active.some((e) => e instanceof EarthWall && e.solid && Math.hypot(x - e.zone.x, z - e.zone.z) < e.zone.r);
  }

  update(dt: number) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const effect = this.active[i];
      // Pillars check for a wall at the moment they would break out, so raising one during the warning still saves you.
      if (effect instanceof PillarStrike && !effect.solid && !effect.blocked && effect.erupting(dt)) {
        effect.blocked = this.shielded(effect.x, effect.z);
        if (!effect.blocked) this.onStrike(effect.x, effect.z, effect.element, effect.caster);
      }
      const wasSolid = effect.solid;
      effect.update(dt);
      if (effect.solid !== wasSolid) this.setBlocking(effect, effect.solid);
      if (!effect.done) continue;
      this.active.splice(i, 1);
      this.root.remove(effect.group);
      effect.dispose();
    }
  }
}
