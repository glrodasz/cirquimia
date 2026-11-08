import * as THREE from 'three';
import type { ShapeKind } from './gestures';
import { heightAt } from './noise';
import { AREA_OF, PILLAR_AREA, RUNE_BOOST, STAR_REACH, starOffsets } from './spells';

/** One circle of the reticle: its centre's offset from the aimed point on the ground, and its radius. */
export type AimMark = { x: number; z: number; r: number };

/**
 * The ground a held strike would cover if cast at the aimed point, mark by mark, matching what Combat.strikeFrom
 * casts: square, fire and water hit one area (the hourglass's blast a smaller one); the pentagram (plain, fire or water) five areas at the star's tips. Cast from inside a rune
 * circle (`boosted`) every area and the star's spread are RUNE_BOOST bigger. Shapes that need no target (circle,
 * rhombus) have no reticle.
 */
export function aimMarks(kind: ShapeKind, boosted: boolean): AimMark[] {
  const scale = boosted ? RUNE_BOOST : 1;
  const r = PILLAR_AREA * scale;
  if (kind === 'square' || kind === 'triangle' || kind === 'triangleDown') return [{ x: 0, z: 0, r }];
  if (kind === 'hourglass') return [{ x: 0, z: 0, r: r * AREA_OF.blast }];
  if (kind === 'spiral') return [{ x: 0, z: 0, r: r * AREA_OF.vine }];
  if (kind === 'pentagram' || kind === 'fireStar' || kind === 'waterStar') return starOffsets(STAR_REACH * scale).map((o) => ({ ...o, r }));
  return [];
}

const MAX_MARKS = 5;
const FILL = 0.14;
const EDGE = 0.55;
const LIFT = 0.025; // above the ground, under the alchemist's feet
const E = 0.05;
const UP = new THREE.Vector3(0, 1, 0);
const normal = new THREE.Vector3();
const fillGeo = new THREE.CircleGeometry(1, 32).rotateX(-Math.PI / 2);
const edgeGeo = new THREE.RingGeometry(0.9, 1, 40).rotateX(-Math.PI / 2);
// Rune-boosted: a dashed outer ring like the one a boosted strike's warning wears.
const BOOST_DASHES = 12;
const dashGeo = new THREE.RingGeometry(1.14, 1.24, 4, 1, 0, ((Math.PI * 2) / BOOST_DASHES) * 0.55).rotateX(-Math.PI / 2);

/**
 * Desktop aim: a faint circle in the caster's ink that follows the mouse on the ground while a strike is in hand,
 * the size of the ground it would actually hit there (and bigger, with a dashed ring, from inside a rune circle).
 */
export class Reticle {
  readonly root = new THREE.Group();
  private readonly marks: THREE.Group[] = [];
  private readonly dashes: THREE.Group[] = [];

  constructor(ink: string) {
    // Drawn over the ground whatever its facets do (the low-poly terrain can sit just above heightAt): a faint aid
    // that must never vanish into a slope, so it skips the depth test.
    const look = { color: ink, transparent: true, depthWrite: false, depthTest: false };
    const fill = new THREE.MeshBasicMaterial({ ...look, opacity: FILL });
    const edge = new THREE.MeshBasicMaterial({ ...look, opacity: EDGE });
    for (let i = 0; i < MAX_MARKS; i++) {
      const mark = new THREE.Group();
      const disc = new THREE.Mesh(fillGeo, fill);
      const ring = new THREE.Mesh(edgeGeo, edge);
      disc.renderOrder = ring.renderOrder = 3;
      ring.position.y = 0.002;
      const dash = new THREE.Group();
      for (let d = 0; d < BOOST_DASHES; d++) {
        const piece = new THREE.Mesh(dashGeo, edge);
        piece.rotation.y = (d / BOOST_DASHES) * Math.PI * 2;
        piece.position.y = 0.002;
        piece.renderOrder = 3;
        dash.add(piece);
      }
      mark.add(disc, ring, dash);
      this.marks.push(mark);
      this.dashes.push(dash);
      this.root.add(mark);
    }
    this.root.visible = false;
  }

  /** Shows the marks for `kind` around `at` (or hides the reticle when `kind` is null or needs no target). */
  show(kind: ShapeKind | null, at: THREE.Vector3 | null, boosted: boolean, dt = 0) {
    const marks = kind && at ? aimMarks(kind, boosted) : [];
    this.root.visible = marks.length > 0;
    if (!this.root.visible || !at) return;
    for (let i = 0; i < MAX_MARKS; i++) {
      const mark = this.marks[i];
      const m = marks[i];
      mark.visible = !!m;
      if (!m) continue;
      const x = at.x + m.x;
      const z = at.z + m.z;
      mark.position.set(x, heightAt(x, z) + LIFT, z);
      // Lie on the slope instead of cutting into it.
      normal.set(heightAt(x - E, z) - heightAt(x + E, z), 2 * E, heightAt(x, z - E) - heightAt(x, z + E)).normalize();
      mark.quaternion.setFromUnitVectors(UP, normal);
      mark.scale.setScalar(m.r);
      this.dashes[i].visible = boosted;
      this.dashes[i].rotation.y += dt * 0.8;
    }
  }

  hide() {
    this.root.visible = false;
  }
}
