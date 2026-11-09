import * as THREE from 'three';
import { downArrow } from './icons';

/** Built at the alchemist's 1.8 units and scaled a touch bigger, so the target reads well on a phone. */
const MODEL_SCALE = 0.34;
const WOOD = '#8a6a44';
const WOOD_DARK = '#6e5234';
const BURLAP = '#c9ad78';
const STRAW = '#d8c06c';
const CLOTH = '#8a4f43';
const ROPE = '#5e4a30';
const TARGET_LIGHT = '#ece4cf';
const TARGET_RED = '#b8432f';
const FLASH = new THREE.MeshBasicMaterial({ color: '#fff4e8' });
const FLASH_TIME = 0.12;
const FALL_TIME = 0.6;
const FADE_TIME = 0.8;
const RISE_TIME = 0.45;
/** How far it rocks back on its stake when hit, and how quickly the sway dies out. */
const SWAY = 0.32;
const SWAY_DAMP = 4;
const SWAY_FREQ = 14;

/**
 * A training scarecrow: a wooden stake with a crossbar, a stuffed burlap head and a straw hat, a patched shirt with a
 * target painted on it. It takes hits like a fighter (flashes and sways), tips over at zero health and can fade away.
 */
export class Scarecrow {
  readonly root = new THREE.Group();
  private readonly pivot = new THREE.Group();
  private readonly model = new THREE.Group();
  private readonly materials = new Map<string, THREE.MeshLambertMaterial>();
  private flashTimer = 0;
  private swayTime = Infinity;
  private swayDir = 1;
  private down = false;
  private fallen = 0;
  private rising = 0;
  private fade = -1;

  constructor() {
    const part = (geo: THREE.BufferGeometry, hex: string) => {
      let m = this.materials.get(hex);
      if (!m) this.materials.set(hex, (m = new THREE.MeshLambertMaterial({ color: hex, flatShading: true, transparent: true })));
      const mesh = new THREE.Mesh(geo, m);
      mesh.castShadow = true;
      return mesh;
    };

    const post = part(new THREE.CylinderGeometry(0.045, 0.06, 1.75, 6), WOOD);
    post.position.y = 0.78;
    const bar = part(new THREE.BoxGeometry(1.0, 0.065, 0.065), WOOD_DARK);
    bar.position.y = 1.36;
    // Shirt hung on the cross, with sleeves along the bar and straw poking out of the cuffs and the hem.
    const shirt = part(new THREE.CylinderGeometry(0.17, 0.22, 0.52, 7), CLOTH);
    shirt.position.y = 1.14;
    const sleeves = part(new THREE.CylinderGeometry(0.075, 0.085, 0.74, 6).rotateZ(Math.PI / 2), CLOTH);
    sleeves.position.y = 1.36;
    const straw: THREE.Mesh[] = [];
    for (const side of [-1, 1]) {
      for (const [dy, dz] of [[0.03, 0], [-0.03, 0.03], [-0.02, -0.035]]) {
        const tuft = part(new THREE.ConeGeometry(0.03, 0.16, 4).rotateZ(-side * Math.PI / 2), STRAW);
        tuft.position.set(side * 0.43, 1.36 + dy, dz);
        straw.push(tuft);
      }
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.3;
      const tuft = part(new THREE.ConeGeometry(0.03, 0.14, 4).rotateX(Math.PI), STRAW);
      tuft.position.set(Math.sin(a) * 0.17, 0.83, Math.cos(a) * 0.17);
      straw.push(tuft);
    }
    // A painted target on the chest: what the arrow points at.
    const ring = part(new THREE.CylinderGeometry(0.11, 0.11, 0.02, 10).rotateX(Math.PI / 2), TARGET_LIGHT);
    ring.position.set(0, 1.16, 0.196);
    const eye = part(new THREE.CylinderGeometry(0.055, 0.055, 0.025, 10).rotateX(Math.PI / 2), TARGET_RED);
    eye.position.set(0, 1.16, 0.2);
    // Stuffed sack head tied off with rope, a straw hat on top.
    const neck = part(new THREE.CylinderGeometry(0.05, 0.06, 0.06, 6), ROPE);
    neck.position.y = 1.47;
    const head = part(new THREE.IcosahedronGeometry(0.16, 0), BURLAP);
    head.scale.set(1, 1.1, 0.95);
    head.position.y = 1.62;
    const eyes = [-0.055, 0.055].map((x) => {
      const e = part(new THREE.BoxGeometry(0.035, 0.035, 0.02), ROPE);
      e.position.set(x, 1.65, 0.145);
      return e;
    });
    const brim = part(new THREE.CylinderGeometry(0.28, 0.28, 0.02, 10), STRAW);
    brim.position.y = 1.75;
    brim.rotation.z = 0.08;
    const crown = part(new THREE.ConeGeometry(0.15, 0.2, 7), STRAW);
    crown.position.y = 1.85;
    crown.rotation.z = 0.08;

    this.model.add(post, bar, shirt, sleeves, ...straw, ring, eye, neck, head, ...eyes, brim, crown);
    this.model.scale.setScalar(MODEL_SCALE);
    this.model.traverse((o) => {
      if (o instanceof THREE.Mesh) o.userData.material = o.material;
    });
    this.pivot.add(this.model);
    this.root.add(this.pivot);
    this.pivot.scale.setScalar(0.001); // pops up out of the ground once placed
  }

  /** Turns its painted front toward a point. */
  face(point: THREE.Vector3) {
    this.root.rotation.y = Math.atan2(point.x - this.root.position.x, point.z - this.root.position.z);
  }

  get isDown() {
    return this.down;
  }

  /** Whether it has finished fading away and can be removed. */
  get gone() {
    return this.fade >= FADE_TIME;
  }

  /** Flashes white and rocks back on its stake, away from `from` when given. */
  flash(from?: THREE.Vector3) {
    this.flashTimer = FLASH_TIME;
    this.swayTime = 0;
    if (from) {
      // Rocks away from whoever struck: back when hit from the front, forward from behind.
      const ahead = (from.x - this.root.position.x) * Math.sin(this.root.rotation.y) + (from.z - this.root.position.z) * Math.cos(this.root.rotation.y);
      this.swayDir = ahead > 0 ? 1 : -1;
    }
    this.model.traverse((o) => {
      if (o instanceof THREE.Mesh) o.material = FLASH;
    });
  }

  fall() {
    this.down = true;
  }

  rise() {
    this.down = false;
    this.fallen = 0;
  }

  /** Starts sinking and fading out of the meadow. */
  vanish() {
    if (this.fade < 0) this.fade = 0;
  }

  update(dt: number) {
    if (this.flashTimer > 0 && (this.flashTimer -= dt) <= 0) {
      this.model.traverse((o) => {
        if (o instanceof THREE.Mesh) o.material = o.userData.material;
      });
    }
    this.rising = Math.min(1, this.rising + dt / RISE_TIME);
    // A little overshoot as it springs up out of the ground.
    const r = this.rising;
    this.pivot.scale.setScalar(Math.max(0.001, 1 + Math.sin(r * Math.PI) * 0.12 * (1 - r) - (1 - r) ** 3));

    this.swayTime += dt;
    const sway = Number.isFinite(this.swayTime)
      ? SWAY * Math.exp(-this.swayTime * SWAY_DAMP) * Math.sin(this.swayTime * SWAY_FREQ) * this.swayDir
      : 0;
    if (this.down) this.fallen = Math.min(1, this.fallen + dt / FALL_TIME);
    // Rocks back and forth when hit; at zero it tips over sideways (it faces the alchemist, so the fall reads on screen).
    const f = this.fallen;
    this.pivot.rotation.x = this.down ? 0 : sway;
    this.pivot.rotation.z = f * f * 1.45 * this.swayDir;

    if (this.fade >= 0) {
      this.fade += dt;
      const k = Math.min(1, this.fade / FADE_TIME);
      for (const m of this.materials.values()) m.opacity = 1 - k;
      this.pivot.position.y = -k * 0.12;
    }
  }

  dispose() {
    this.model.traverse((o) => {
      if (o instanceof THREE.Mesh) o.geometry.dispose();
    });
    for (const m of this.materials.values()) m.dispose();
  }
}



/** "Hit me!" over the scarecrow's head: a label and a bobbing brush arrow pointing down at it. */
export class HitMeLabel {
  private readonly el = document.createElement('div');

  constructor(text: string) {
    this.el.className = 'hitme';
    this.el.innerHTML = `<span>${text}</span>${downArrow()}`;
    this.el.hidden = true;
    document.body.append(this.el);
  }

  /** Steps aside for a moment while the damage number pops where the arrow points. */
  dim() {
    this.el.classList.remove('dim');
    void this.el.offsetWidth;
    this.el.classList.add('dim');
  }

  /** Puts the arrow's tip at (x, y) on screen, or hides it. */
  place(x: number, y: number, visible: boolean) {
    this.el.hidden = !visible;
    if (visible) this.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }

  dispose() {
    this.el.remove();
  }
}
