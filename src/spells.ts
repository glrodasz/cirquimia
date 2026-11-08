import * as THREE from 'three';
import { heightAt } from './noise';
import type { Obstacle } from './meadow';

// Circle = defence: a temporary arc of earth and rock that shields the alchemist.
// Arc radius around the alchemist, world units: the same for every wall, wherever its circle was drawn,
// so it shields about the ground a strike would cover around its caster (40% under the old farthest reach of 1.0).
const WALL_REACH = 0.6;
const WALL_RISE = 0.35; // s, whole arc (rocks rise staggered from the middle out)
const WALL_HOLD = 1.4; // about two seconds up in total
/** Seconds a wall protects its zone once raised (it rises, then holds before sinking). */
export const WALL_UP = WALL_RISE + WALL_HOLD;
const WALL_SINK = 0.5;

// Square = ranged attack: a cluster of slanted square pillars after a short warning in the ground.
export const PILLAR_WARN = 0.2; // s the ground trembles before the pillars break out
const PILLAR_RISE = 0.12;
const PILLAR_HOLD = 0.55; // about a second from eruption to buried again
const PILLAR_SINK = 0.3;
export const PILLAR_AREA = 0.17; // radius of the cluster, about one alchemist wide

// Pentagram = earth columns: five separate, lower square strikes at the tips of a star around the target.
const COLUMN_SCALE = 0.6; // pillar height against the square's: each one only hits for half
const STAR_FLUID_SCALE = 0.75; // a fire or water star's flames and spouts against a triangle's
export const STAR_REACH = 0.5; // from the target to each tip, world units: the target itself sits between them
export const STAR_STAGGER = 0.06; // s between tips, in the order the star is drawn

/** Strikes cast from inside a rune circle are this much bigger: area, and the star's spread. */
export const RUNE_BOOST = 1.25;

/** Where the star's five tips sit from its centre on the ground (x, z), one pointing straight up the screen, in drawing order. */
export function starOffsets(reach = STAR_REACH) {
  // Straight up the screen is away from the camera, which sits 24° around from +z.
  const up = Math.PI + CAMERA_YAW;
  return [0, 2, 4, 1, 3].map((k) => {
    const a = up + (k / 5) * Math.PI * 2;
    return { x: Math.sin(a) * reach, z: Math.cos(a) * reach };
  });
}

/** The five tips of a star around a point, one pointing straight up the screen, in drawing order. */
export function starTips(at: THREE.Vector3, reach = STAR_REACH) {
  return starOffsets(reach).map((o, i) => {
    const x = at.x + o.x;
    const z = at.z + o.z;
    return { at: new THREE.Vector3(x, heightAt(x, z), z), delay: i * STAR_STAGGER };
  });
}

// Triangles = fire (apex up) and water (apex down): drawn from a source first, then cast like the square.
// Fire and water merged in hand (the hourglass) = blast: a tighter burst of flame and steam that hits harder.
// The star merged in hand with fire or water = fire star / water star: the pentagram's five tips, each one a flame
// burst or a water spout instead of an earth column.
// Spiral = vine: curling tendrils break out of the ground and whoever they catch is rooted to the spot for a while.
export type Element = 'earth' | 'columns' | 'fire' | 'water' | 'blast' | 'fireStar' | 'waterStar' | 'vine';
/** Radius of each element's strike against the square's: the blast packs its punch into a smaller area. */
export const AREA_OF: Record<Element, number> = { earth: 1, columns: 1, fire: 1, water: 1, blast: 0.6, fireStar: 1, waterStar: 1, vine: 1 };
/** The strikes that land as five separate hits at the tips of a star around the target. */
export const isStar = (element: Element) => element === 'columns' || element === 'fireStar' || element === 'waterStar';
/** Fire or water in a strike (a triangle's, or a star's merged with one), or null for earth and the blast. */
export const fluidOf = (element: Element): 'fire' | 'water' | null =>
  element === 'fire' || element === 'fireStar' ? 'fire' : element === 'water' || element === 'waterStar' ? 'water' : null;
/** Seconds someone caught by the vine stays rooted: no walking (they can still draw and cast). */
export const ROOT_TIME = 3;
const SNARE_GROW = 0.25; // s for the coils to climb the legs
const SNARE_WITHER = 0.4; // s for them to shrink back into the ground once it lets go
const CHANNEL_TIME = 0.5; // s for the drawn fire or water to fly from its source to the alchemist

// Rhombus = healing on the caster: thin lines of light rising up through the body.
const HEAL_TIME = 1.3;
const HEAL_LINE_LIFE = 0.7; // s one line takes to rise from the feet past the head
const HEAL = ['#a8e6a1', '#d8f2c4', '#8fd6a0'];

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
// Outer ring of a rune-boosted strike: dashed, so it reads as a different mark from the plain ring.
const BOOST_DASHES = 10;
const boostDashGeo = new THREE.RingGeometry(1.22, 1.36, 4, 1, 0, (Math.PI * 2) / BOOST_DASHES * 0.55).rotateX(-Math.PI / 2);
// One arm of the "denied" cross, 1 unit long, lying flat.
const crossBarGeo = new THREE.PlaneGeometry(1, 0.2).rotateX(-Math.PI / 2);
const DENIED_TIME = 1.1; // s the cross stays on the ground
const CAMERA_YAW = THREE.MathUtils.degToRad(24); // matches the camera azimuth in main.ts
// Faceted flame tongues and water spouts, base at y = 0, width 1 and height 1.
const flameGeo = new THREE.ConeGeometry(0.5, 1, 5, 1).translate(0, 0.5, 0);
const spoutGeo = new THREE.CylinderGeometry(0.3, 0.5, 1, 6, 1).translate(0, 0.5, 0);
const orbGeo = new THREE.IcosahedronGeometry(1, 0);
const healLineGeo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
const healRingGeo = new THREE.RingGeometry(0.16, 0.22, 32).rotateX(-Math.PI / 2);

// Muted to sit in the Bruma palette, but lit from within so they still read as fire and water.
const FIRE = ['#f08a3a', '#f4a94c', '#e0663a'];
const FIRE_CORE = '#ffd67a';
const WATER = ['#7fb3c2', '#93c4cf', '#6a9fb1'];
const WATER_FOAM = '#d9ecef';
const STEAM = ['#e8eeec', '#d3dedd', '#f4efe2'];
// Muted meadow greens, a touch brighter than the grass so the vines read on it.
const VINE = ['#5f9a40', '#72aa4c', '#4f8236'];
const LEAF = '#8cb35e';
const leafGeo = new THREE.OctahedronGeometry(1, 0);
const leafMaterial = new THREE.MeshLambertMaterial({ color: LEAF, flatShading: true });
const WARNING: Record<Element, string> = {
  earth: SOIL, columns: SOIL, fire: '#c4552c', water: '#2f5866', blast: '#8a2f1c', fireStar: '#c4552c', waterStar: '#2f5866', vine: '#2f4a26',
};

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

  private readonly zoneMaterials: THREE.MeshBasicMaterial[] = [];
  private readonly zoneGeos: THREE.BufferGeometry[] = [];

  constructor(cx: number, cz: number, toward: THREE.Vector3, ink: string | null = null, readonly owner: unknown = null) {
    super(0, WALL_RISE, WALL_HOLD, WALL_SINK);
    const dx = toward.x - cx;
    const dz = toward.z - cz;
    const facing = Math.atan2(dx, dz);
    const reach = WALL_REACH;
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

    if (ink) {
      // The protected zone, washed in the caster's ink with a firmer rim, lying on the terrain.
      for (const [geo, opacity] of [
        [groundRing(cx, cz, 0, reach, 6), 0.16],
        [groundRing(cx, cz, reach - 0.035, reach, 1), 0.7],
      ] as const) {
        const mat = new THREE.MeshBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
        mat.userData.full = opacity;
        const mesh = new THREE.Mesh(geo, mat);
        mesh.renderOrder = 1;
        this.group.add(mesh);
        this.zoneMaterials.push(mat);
        this.zoneGeos.push(geo);
      }
    }
  }

  protected onUpdate(t: number) {
    // Shown for exactly as long as the zone protects: fades in while rising, out while sinking.
    const sinkAt = this.rise + this.hold;
    const k = t < 0 ? 0 : t < this.rise ? t / this.rise : t < sinkAt ? 1 : Math.max(0, 1 - (t - sinkAt) / (this.sink * 0.5));
    for (const m of this.zoneMaterials) m.opacity = (m.userData.full as number) * k;
  }

  dispose() {
    super.dispose();
    for (const m of this.zoneMaterials) m.dispose();
    for (const g of this.zoneGeos) g.dispose();
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

/** A flat ring (or disk, with inner 0) around a point whose vertices follow the terrain. */
function groundRing(cx: number, cz: number, inner: number, outer: number, rings: number) {
  const geo = new THREE.RingGeometry(Math.max(inner, 0.001), outer, 48, rings).rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + cx;
    const z = pos.getZ(i) + cz;
    pos.setXYZ(i, x, heightAt(x, z) + 0.035, z);
  }
  geo.computeBoundingSphere();
  return geo;
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
 * five short columns at the tips of a star (pentagram), a burst of flame tongues (fire triangle)
 * a spout of water (water triangle), a tight burst of flame and steam (hourglass: fire and water merged)
 * or, at each tip of a fire or water star, a lower burst of flame or spout of water.
 */
class PillarStrike extends Effect {
  readonly obstacles: Obstacle[] = [];
  private readonly crack: THREE.Mesh;
  private readonly crackMaterial: THREE.MeshBasicMaterial;
  private readonly inkMaterial: THREE.MeshBasicMaterial | null = null;
  private readonly boostRing: THREE.Group | null = null;
  /** Set when the strike lands inside a standing wall's zone: the warning shows but nothing erupts. */
  blocked = false;

  /** Radius of the cluster. */
  get area() {
    return PILLAR_AREA * AREA_OF[this.element] * this.scale;
  }

  constructor(
    readonly x: number,
    readonly z: number,
    from: THREE.Vector3,
    readonly element: Element = 'earth',
    readonly caster: unknown = null,
    warn = PILLAR_WARN,
    readonly ink: string | null = null,
    /** Size multiplier for the whole strike, e.g. 1.1 when cast from a rune circle. */
    readonly scale = 1,
  ) {
    super(warn, PILLAR_RISE, PILLAR_HOLD, PILLAR_SINK);
    if (element === 'earth' || element === 'columns') this.buildPillars(from, element === 'columns' ? COLUMN_SCALE : 1);
    else if (element === 'blast') this.buildBlast();
    else if (element === 'vine') this.buildVines();
    else this.buildFluid(fluidOf(element) === 'fire', isStar(element) ? STAR_FLUID_SCALE : 1);
    if (scale !== 1) {
      // Grow the cluster about its centre: spread, width and height alike.
      for (const p of this.pieces) {
        const m = p.mesh;
        m.position.x = x + (m.position.x - x) * scale;
        m.position.z = z + (m.position.z - z) * scale;
        m.scale.multiplyScalar(scale);
        (m.userData.base as THREE.Vector3 | undefined)?.multiplyScalar(scale);
        p.ground = heightAt(m.position.x, m.position.z);
        p.height *= scale;
      }
    }
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
    this.crack.scale.setScalar(this.area * 1.5);
    this.crack.renderOrder = 1;
    this.group.add(this.crack);
    if (ink) {
      // Ink ring drawn round the warning in the caster's colour, so you can see who cast it.
      this.inkMaterial = new THREE.MeshBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
      const ring = new THREE.Mesh(inkRingGeo, this.inkMaterial);
      ring.position.y = 0.002;
      ring.renderOrder = 2;
      this.crack.add(ring);
      if (scale > 1) {
        // Boosted from a rune circle: a second, outer ink ring that slowly turns.
        this.boostRing = new THREE.Group();
        for (let i = 0; i < BOOST_DASHES; i++) {
          const dash = new THREE.Mesh(boostDashGeo, this.inkMaterial);
          dash.rotation.y = (i / BOOST_DASHES) * Math.PI * 2;
          dash.renderOrder = 2;
          this.boostRing.add(dash);
        }
        this.boostRing.position.y = 0.003;
        this.crack.add(this.boostRing);
      }
    }
  }

  /** `tall` shortens the whole cluster, e.g. for the pentagram's lighter strikes. */
  private buildPillars(from: THREE.Vector3, tall = 1) {
    const { x, z } = this;
    // The pillars lean away from the caster, as if driven up from underneath at an angle.
    const away = Math.atan2(x - from.x, z - from.z);
    const lean = THREE.MathUtils.randFloat(0.3, 0.45);

    const main = this.addPiece(pillarGeo, ROCK[Math.floor(Math.random() * ROCK.length)], x, z, 0.46 * tall, 0);
    main.scale.set(0.17, 0.46 * tall, 0.17);
    main.rotation.set(lean, away + THREE.MathUtils.randFloatSpread(0.3), 0, 'YXZ');
    this.obstacles.push({ x, z, r: 0.1 });

    const small = THREE.MathUtils.randInt(4, 6);
    for (let i = 0; i < small; i++) {
      const a = (i / small) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.6);
      const d = PILLAR_AREA * THREE.MathUtils.randFloat(0.55, 1);
      const h = THREE.MathUtils.randFloat(0.12, 0.26) * tall;
      const w = THREE.MathUtils.randFloat(0.05, 0.085);
      tmpColor.set((Math.random() < 0.6 ? ROCK : EARTH)[Math.floor(Math.random() * 3)]);
      const mesh = this.addPiece(pillarGeo, tmpColor, x + Math.sin(a) * d, z + Math.cos(a) * d, h, THREE.MathUtils.randFloat(0.02, 0.07));
      mesh.scale.set(w, h, w);
      // Small pillars splay outward from the main one.
      mesh.rotation.set(THREE.MathUtils.randFloat(0.25, 0.55), a + THREE.MathUtils.randFloatSpread(0.4), 0, 'YXZ');
    }
  }

  /** Flame tongues or water spouts: a tall core with shorter ones around it, all swaying while up; `tall` shortens them. */
  private buildFluid(fire: boolean, tall = 1) {
    const { x, z } = this;
    const palette = fire ? FIRE : WATER;
    const add = (px: number, pz: number, w: number, h: number, color: string, delay: number, tilt: number, toward: number) => {
      const mesh = this.addPiece(fire ? flameGeo : spoutGeo, color, px, pz, h * tall, delay);
      const m = mesh.material as THREE.MeshLambertMaterial;
      // Lit from within so it glows against the muted meadow.
      m.emissive.set(color).multiplyScalar(fire ? 0.75 : 0.35);
      if (!fire) {
        m.transparent = true;
        m.opacity = 0.82;
      }
      mesh.castShadow = fire ? false : true;
      mesh.scale.set(w, h * tall, w);
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

  /** The vine: curling green tendrils that whip up out of the ground, a leaf here and there, swaying while up. */
  private buildVines() {
    const { x, z } = this;
    const count = THREE.MathUtils.randInt(6, 8);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.6);
      const d = i === 0 ? 0 : PILLAR_AREA * THREE.MathUtils.randFloat(0.35, 0.95);
      const h = i === 0 ? 0.42 : THREE.MathUtils.randFloat(0.2, 0.34);
      const geo = tendrilGeo(h, THREE.MathUtils.randFloat(0.035, 0.06), Math.random() < 0.5 ? 1 : -1, i === 0 ? 0.016 : 0.011);
      const mesh = this.addPiece(geo, VINE[i % VINE.length], x + Math.sin(a) * d, z + Math.cos(a) * d, h, THREE.MathUtils.randFloat(0, 0.08));
      this.pieces[this.pieces.length - 1].geo = geo;
      mesh.rotation.set(THREE.MathUtils.randFloat(0.1, 0.3), a, 0, 'YXZ'); // leaning out, away from the middle
      mesh.userData.base = mesh.scale.clone();
      mesh.userData.phase = Math.random() * 10;
      for (let k = 0; k < 2; k++) {
        const leaf = new THREE.Mesh(leafGeo, leafMaterial);
        leaf.scale.set(0.028, 0.008, 0.05);
        leaf.position.set(THREE.MathUtils.randFloatSpread(0.04), h * THREE.MathUtils.randFloat(0.35, 0.75), THREE.MathUtils.randFloatSpread(0.04));
        leaf.rotation.set(THREE.MathUtils.randFloatSpread(0.8), Math.random() * Math.PI * 2, 0.5);
        mesh.add(leaf);
      }
    }
  }

  /** The blast: a white-hot core, short flame tongues thrown outward and puffs of steam that swell and drift up. */
  private buildBlast() {
    const { x, z } = this;
    const reach = PILLAR_AREA * AREA_OF.blast;
    const glow = (mesh: THREE.Mesh, color: string, k: number, opacity = 1) => {
      const m = mesh.material as THREE.MeshLambertMaterial;
      m.emissive.set(color).multiplyScalar(k);
      if (opacity < 1) {
        m.transparent = true;
        m.opacity = opacity;
        m.depthWrite = false;
      }
      mesh.castShadow = false;
      mesh.userData.base = mesh.scale.clone();
      mesh.userData.phase = Math.random() * 10;
    };
    const core = this.addPiece(orbGeo, FIRE_CORE, x, z, 0.2, 0);
    core.scale.set(0.13, 0.11, 0.13);
    core.userData.blast = 'core';
    glow(core, FIRE_CORE, 0.9);
    const tongues = THREE.MathUtils.randInt(5, 6);
    for (let i = 0; i < tongues; i++) {
      const a = (i / tongues) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.5);
      const d = reach * THREE.MathUtils.randFloat(0.25, 0.6);
      const h = THREE.MathUtils.randFloat(0.18, 0.3);
      const color = FIRE[i % FIRE.length];
      const mesh = this.addPiece(flameGeo, color, x + Math.sin(a) * d, z + Math.cos(a) * d, h, THREE.MathUtils.randFloat(0, 0.03));
      mesh.scale.set(THREE.MathUtils.randFloat(0.06, 0.09), h, THREE.MathUtils.randFloat(0.06, 0.09));
      // Thrown outward from the centre, much harder than a fire triangle's lean.
      mesh.rotation.set(THREE.MathUtils.randFloat(0.55, 0.85), a, 0, 'YXZ');
      mesh.userData.blast = 'tongue';
      glow(mesh, color, 0.8);
    }
    const puffs = THREE.MathUtils.randInt(5, 7);
    for (let i = 0; i < puffs; i++) {
      const a = (i / puffs) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.7);
      const d = reach * THREE.MathUtils.randFloat(0.4, 1);
      const h = THREE.MathUtils.randFloat(0.1, 0.22);
      const color = STEAM[i % STEAM.length];
      const mesh = this.addPiece(orbGeo, color, x + Math.sin(a) * d, z + Math.cos(a) * d, h, THREE.MathUtils.randFloat(0.03, 0.09));
      mesh.scale.setScalar(THREE.MathUtils.randFloat(0.05, 0.08));
      mesh.userData.blast = 'puff';
      mesh.userData.rise = THREE.MathUtils.randFloat(0.25, 0.45);
      glow(mesh, color, 0.25, 0.8);
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
    const fluid = fluidOf(this.element);
    if (fluid) {
      // Flames lick and water churns: each tongue breathes in height and width on its own beat.
      const fast = fluid === 'fire' ? 22 : 14;
      for (const p of this.pieces) {
        const base = p.mesh.userData.base as THREE.Vector3;
        const k = this.age * fast + (p.mesh.userData.phase as number);
        const w = 1 + Math.sin(k * 1.3) * 0.12;
        p.mesh.scale.set(base.x * w, base.y * (1 + Math.sin(k) * 0.15), base.z * w);
      }
    }
    if (this.element === 'blast' && t >= 0) this.animateBlast(t);
    if (this.element === 'vine') {
      // The tendrils sway like something alive feeling for a leg to grab.
      for (const p of this.pieces) p.mesh.rotation.z = Math.sin(this.age * 7 + (p.mesh.userData.phase as number)) * 0.18;
    }
    if (t < 0) {
      // Grows and shudders during the warning so a target can still step out.
      const w = 1 + t / this.warn;
      this.crackMaterial.opacity = 0.45 + w * 0.35;
      this.crack.scale.setScalar(this.area * (0.9 + w * 0.6) * (1 + Math.sin(this.age * 90) * 0.05));
      this.crack.rotateY(Math.sin(this.age * 70) * 0.02);
    } else {
      const holdEnd = PILLAR_RISE + PILLAR_HOLD + PILLAR_SINK;
      // A blocked strike just settles; otherwise the scar fades as the pillars sink back.
      const fade = this.blocked ? t / 0.25 : (t - PILLAR_RISE - PILLAR_HOLD) / (holdEnd - PILLAR_RISE - PILLAR_HOLD);
      this.crackMaterial.opacity = 0.65 * (1 - THREE.MathUtils.clamp(fade, 0, 1));
    }
    this.boostRing?.rotateY(0.04);
    if (this.inkMaterial) this.inkMaterial.opacity = Math.min(0.9, this.crackMaterial.opacity * 1.4);
  }

  /** The core flashes and dims, the tongues flicker, the steam swells, climbs and thins out. */
  private animateBlast(t: number) {
    const life = PILLAR_RISE + PILLAR_HOLD + PILLAR_SINK;
    const u = Math.min(1, t / life);
    for (const p of this.pieces) {
      const mesh = p.mesh;
      const base = mesh.userData.base as THREE.Vector3;
      const m = mesh.material as THREE.MeshLambertMaterial;
      const kind = mesh.userData.blast as 'core' | 'tongue' | 'puff';
      if (kind === 'core') {
        // A quick flash: swells to twice its size in the first instants, then shrinks into the smoke.
        const flash = t < 0.12 ? 1 + t / 0.12 : Math.max(0.2, 2 - (t - 0.12) * 2.2);
        mesh.scale.copy(base).multiplyScalar(flash);
      } else if (kind === 'tongue') {
        const k = this.age * 26 + (mesh.userData.phase as number);
        mesh.scale.set(base.x * (1 + Math.sin(k * 1.3) * 0.15), base.y * (1 + Math.sin(k) * 0.2), base.z);
      } else {
        mesh.scale.copy(base).multiplyScalar(1 + u * 1.8);
        mesh.position.y += u * (mesh.userData.rise as number);
        m.opacity = 0.8 * (1 - u * u);
      }
    }
  }

  dispose() {
    super.dispose();
    this.crackMaterial.dispose();
    this.inkMaterial?.dispose();
  }
}

/**
 * One vine tendril, base at y = 0 and `height` tall: it climbs with a slight sway, then curls over at the tip into
 * a hook of `curl` radius, turning one way or the other (`hand`). Low-poly tube, four sides.
 */
function tendrilGeo(height: number, curl: number, hand: number, thick: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const a = t * Math.PI * 2.2 * hand;
    const r = curl * t * t;
    pts.push(new THREE.Vector3(Math.sin(a) * r + Math.sin(t * 3) * 0.01, height * (t - 0.25 * t * t * t), (Math.cos(a) - 1) * r));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 18, thick, 4, false);
}

/**
 * The vine that caught someone: coils wound round their legs that climb up, hold them for ROOT_TIME and then
 * wither back into the ground. It follows the target, which cannot walk anyway, in case it falls.
 */
class Snare {
  readonly group = new THREE.Group();
  readonly obstacles: Obstacle[] = [];
  readonly solid = false;
  done = false;
  private age = 0;
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly material: THREE.MeshLambertMaterial;

  constructor(private readonly target: THREE.Vector3, ink: string | null) {
    this.material = new THREE.MeshLambertMaterial({ color: VINE[0], flatShading: true });
    if (ink) this.material.emissive.set(ink).multiplyScalar(0.18);
    const add = (pts: THREE.Vector3[], thick: number, leafAt: THREE.Vector3 | null, turn: number) => {
      const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 36, thick, 4, false);
      this.geos.push(geo);
      const mesh = new THREE.Mesh(geo, this.material);
      mesh.castShadow = true;
      this.group.add(mesh);
      if (!leafAt) return;
      const leaf = new THREE.Mesh(leafGeo, leafMaterial);
      leaf.scale.set(0.035, 0.01, 0.065);
      leaf.position.copy(leafAt);
      leaf.rotation.set(0.4, turn, 0.6);
      mesh.add(leaf);
    };
    for (let k = 0; k < 3; k++) {
      // A loose helix round the shins, each coil starting from its own side and winding up to the knees.
      const phase = (k / 3) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        const a = phase + t * Math.PI * 2 * 1.6 * (k % 2 ? -1 : 1);
        const r = 0.11 - t * 0.03;
        pts.push(new THREE.Vector3(Math.sin(a) * r, t * 0.34, Math.cos(a) * r));
      }
      const top = pts[pts.length - 1];
      add(pts, 0.017, new THREE.Vector3(top.x * 1.4, top.y, top.z * 1.4), phase);
    }
    for (let k = 0; k < 6; k++) {
      // Roots splayed out over the ground, so the snare reads from above too.
      const a = (k / 6) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.5);
      const len = THREE.MathUtils.randFloat(0.16, 0.26);
      const bend = THREE.MathUtils.randFloatSpread(0.6);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 6; i++) {
        const t = i / 6;
        const b = a + bend * t;
        const r = 0.08 + len * t;
        pts.push(new THREE.Vector3(Math.sin(b) * r, 0.03 + Math.sin(t * Math.PI) * 0.03, Math.cos(b) * r));
      }
      add(pts, 0.013, k % 2 ? pts[4].clone().setY(0.05) : null, a);
    }
    this.group.scale.set(1, 0.01, 1);
    this.group.position.copy(target);
  }

  update(dt: number) {
    this.age += dt;
    this.group.position.copy(this.target);
    const grow = Math.min(1, this.age / SNARE_GROW);
    const wither = THREE.MathUtils.clamp((this.age - ROOT_TIME) / SNARE_WITHER, 0, 1);
    const up = easeOutBack(grow) * (1 - easeIn(wither));
    this.group.scale.set(1 + (1 - up) * 0.3, Math.max(0.01, up), 1 + (1 - up) * 0.3);
    this.group.rotation.y = Math.sin(this.age * 3) * 0.05;
    if (wither >= 1) this.done = true;
  }

  dispose() {
    for (const g of this.geos) g.dispose();
    this.material.dispose();
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

/** Healing on the caster: thin lines of light rise up through the body, over a ring at the feet. */
class HealGlow {
  readonly group = new THREE.Group();
  readonly obstacles: Obstacle[] = [];
  readonly solid = false;
  done = false;
  private age = 0;
  private readonly lines: { mesh: THREE.Mesh; material: THREE.MeshBasicMaterial; delay: number; length: number }[] = [];
  private readonly ringMaterial: THREE.MeshBasicMaterial;
  private readonly boostRing: THREE.Group | null = null;

  /** `target` is followed while the glow lasts, so it stays on someone who keeps walking. */
  constructor(private readonly target: THREE.Vector3, ink: string | null, boosted: boolean) {
    const count = boosted ? 18 : 13;
    for (let i = 0; i < count; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: HEAL[i % HEAL.length],
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(healLineGeo, material);
      const a = (i / count) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.4);
      const r = THREE.MathUtils.randFloat(0.07, 0.2);
      const w = THREE.MathUtils.randFloat(0.012, 0.022);
      mesh.position.set(Math.sin(a) * r, 0, Math.cos(a) * r);
      mesh.scale.set(w, 1, w);
      mesh.visible = false;
      mesh.renderOrder = 5;
      this.group.add(mesh);
      this.lines.push({ mesh, material, delay: THREE.MathUtils.randFloat(0, HEAL_TIME - HEAL_LINE_LIFE), length: THREE.MathUtils.randFloat(0.16, 0.32) });
    }
    this.ringMaterial = new THREE.MeshBasicMaterial({ color: ink ?? HEAL[0], transparent: true, opacity: 0, depthWrite: false });
    const ring = new THREE.Mesh(healRingGeo, this.ringMaterial);
    ring.position.y = 0.035;
    ring.renderOrder = 1;
    this.group.add(ring);
    if (boosted) {
      // Healed from a rune circle: the same dashed outer ring as a boosted strike, sized to the feet.
      this.boostRing = new THREE.Group();
      for (let i = 0; i < BOOST_DASHES; i++) {
        const dash = new THREE.Mesh(boostDashGeo, this.ringMaterial);
        dash.rotation.y = (i / BOOST_DASHES) * Math.PI * 2;
        dash.renderOrder = 1;
        this.boostRing.add(dash);
      }
      this.boostRing.scale.setScalar(0.22);
      this.boostRing.position.y = 0.036;
      this.group.add(this.boostRing);
    }
    this.group.position.copy(target);
  }

  update(dt: number) {
    this.age += dt;
    this.group.position.copy(this.target);
    for (const l of this.lines) {
      const u = (this.age - l.delay) / HEAL_LINE_LIFE;
      l.mesh.visible = u > 0 && u < 1;
      if (!l.mesh.visible) continue;
      // Rises from the feet to just above the head, stretching out on the way and fading at both ends.
      l.mesh.position.y = u * 0.85;
      l.mesh.scale.y = l.length * (0.4 + Math.sin(Math.PI * u) * 0.6);
      l.material.opacity = Math.sin(Math.PI * u) * 0.9;
    }
    const t = this.age / HEAL_TIME;
    this.ringMaterial.opacity = 0.8 * Math.min(1, t * 6) * (t < 0.7 ? 1 : Math.max(0, 1 - (t - 0.7) / 0.3));
    this.boostRing?.rotateY(0.04);
    if (t >= 1) this.done = true;
  }

  dispose() {
    for (const l of this.lines) l.material.dispose();
    this.ringMaterial.dispose();
  }
}

/** A cross on the ground in the caster's ink: a strike aimed into a protected zone that never breaks out. */
class DeniedMark {
  readonly group = new THREE.Group();
  readonly obstacles: Obstacle[] = [];
  readonly solid = false;
  done = false;
  private age = 0;
  private readonly material: THREE.MeshBasicMaterial;
  private readonly outline: THREE.MeshBasicMaterial;

  constructor(x: number, z: number, ink: string | null, size: number) {
    this.material = new THREE.MeshBasicMaterial({ color: ink ?? '#c0562f', transparent: true, opacity: 0, depthWrite: false });
    // A pale outline underneath keeps the cross readable on top of the caster's own protected zone.
    this.outline = new THREE.MeshBasicMaterial({ color: '#f4f1e8', transparent: true, opacity: 0, depthWrite: false });
    // Arms at ±45° to the screen, not to the world: the camera looks down from 24° around.
    for (const a of [Math.PI / 4 + CAMERA_YAW, -Math.PI / 4 + CAMERA_YAW]) {
      const back = new THREE.Mesh(crossBarGeo, this.outline);
      back.rotation.y = a;
      back.scale.set(1.12, 1, 1.7);
      back.renderOrder = 3;
      const bar = new THREE.Mesh(crossBarGeo, this.material);
      bar.rotation.y = a;
      bar.position.y = 0.002;
      bar.renderOrder = 4;
      this.group.add(back, bar);
    }
    this.group.position.set(x, heightAt(x, z) + 0.04, z);
    const e = 0.05;
    const normal = new THREE.Vector3(heightAt(x - e, z) - heightAt(x + e, z), 2 * e, heightAt(x, z - e) - heightAt(x, z + e)).normalize();
    this.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    this.group.userData.size = size;
  }

  update(dt: number) {
    this.age += dt;
    // Pops in, holds, fades.
    const t = this.age / DENIED_TIME;
    const pop = t < 0.15 ? easeOutBack(t / 0.15) : 1;
    this.group.scale.setScalar((this.group.userData.size as number) * Math.max(0.01, pop));
    this.material.opacity = 0.95 * (t < 0.6 ? 1 : Math.max(0, 1 - (t - 0.6) / 0.4));
    this.outline.opacity = this.material.opacity * 0.85;
    if (t >= 1) this.done = true;
  }

  dispose() {
    this.material.dispose();
    this.outline.dispose();
  }
}

type Active = EarthWall | PillarStrike | Channel | DeniedMark | HealGlow | Snare;

/** What each transmutation circle does once it is spent on the map. */
export class Spells {
  readonly root = new THREE.Group();
  private readonly active: Active[] = [];

  /** Called when a strike breaks out (not when a wall stops it), with whoever cast it. */
  onStrike: (x: number, z: number, element: Element, caster: unknown, area: number) => void = () => {};

  constructor(private readonly obstacles: Obstacle[]) {}

  /** Raises a defensive arc around the caster, facing the tapped point (clamped to close range); `owner` can strike through it. */
  wall(caster: THREE.Vector3, toward: THREE.Vector3, ink: string | null = null, owner: unknown = null) {
    this.start(new EarthWall(caster.x, caster.z, toward, ink, owner));
  }

  /** Strikes the tapped point after a short ground warning: rock pillars, or fire or water drawn earlier. */
  pillars(
    caster: THREE.Vector3,
    at: THREE.Vector3,
    element: Element = 'earth',
    owner: unknown = null,
    warn = PILLAR_WARN,
    ink: string | null = null,
    scale = 1,
  ) {
    this.start(new PillarStrike(at.x, at.z, caster, element, owner, warn, ink, scale));
  }

  /** Marks a strike that a standing wall stops before it starts: just a cross where it would have broken out. */
  denied(at: THREE.Vector3, ink: string | null = null, scale = 1) {
    this.start(new DeniedMark(at.x, at.z, ink, PILLAR_AREA * 2.2 * scale));
  }

  /** Shows fire or water being drawn from a source into the alchemist (who is followed while it flies). */
  channel(source: THREE.Vector3, caster: THREE.Vector3, element: 'fire' | 'water') {
    this.start(new Channel(source, caster, element === 'fire'));
  }

  /** Rising lines of light on someone being healed (followed while it lasts); a dashed ring when boosted by runes. */
  heal(target: THREE.Vector3, ink: string | null = null, boosted = false) {
    this.start(new HealGlow(target, ink, boosted));
  }

  /** Vine coiled round someone's legs (followed while it lasts), holding them for ROOT_TIME. */
  snare(target: THREE.Vector3, ink: string | null = null) {
    this.start(new Snare(target, ink));
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
  shielded(x: number, z: number, by: unknown = null) {
    // A wall only stops other people's strikes: its owner can still strike out of (or into) its own zone.
    return this.active.some(
      (e) => e instanceof EarthWall && e.solid && (by === null || e.owner !== by) && Math.hypot(x - e.zone.x, z - e.zone.z) < e.zone.r,
    );
  }

  update(dt: number) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const effect = this.active[i];
      // Pillars check for a wall at the moment they would break out, so raising one during the warning still saves you.
      if (effect instanceof PillarStrike && !effect.solid && !effect.blocked && effect.erupting(dt)) {
        effect.blocked = this.shielded(effect.x, effect.z, effect.caster);
        if (effect.blocked) this.start(new DeniedMark(effect.x, effect.z, effect.ink, effect.area * 2.2));
        else this.onStrike(effect.x, effect.z, effect.element, effect.caster, effect.area);
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
