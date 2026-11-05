import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { aimMarks, Reticle } from '../src/aim';
import { PILLAR_AREA, RUNE_BOOST, STAR_REACH, starTips } from '../src/spells';

describe('aimMarks', () => {
  it('is one strike-sized circle for the square, fire and water', () => {
    for (const kind of ['square', 'triangle', 'triangleDown'] as const) {
      expect(aimMarks(kind, false)).toEqual([{ x: 0, z: 0, r: PILLAR_AREA }]);
    }
  });

  it('grows 25% from inside a rune circle', () => {
    const [plain] = aimMarks('square', false);
    const [boosted] = aimMarks('square', true);
    expect(boosted.r).toBeCloseTo(PILLAR_AREA * RUNE_BOOST);
    expect(boosted.r / plain.r).toBeCloseTo(1.25);
  });

  it('puts the pentagram on the five star tips the strike uses, spread wider from the runes', () => {
    for (const boosted of [false, true]) {
      const reach = STAR_REACH * (boosted ? RUNE_BOOST : 1);
      const marks = aimMarks('pentagram', boosted);
      const tips = starTips(new THREE.Vector3(), reach);
      expect(marks).toHaveLength(5);
      marks.forEach((m, i) => {
        expect(m.x).toBeCloseTo(tips[i].at.x);
        expect(m.z).toBeCloseTo(tips[i].at.z);
        expect(Math.hypot(m.x, m.z)).toBeCloseTo(reach);
        expect(m.r).toBeCloseTo(PILLAR_AREA * (boosted ? RUNE_BOOST : 1));
      });
    }
    expect(Math.hypot(aimMarks('pentagram', true)[0].x, aimMarks('pentagram', true)[0].z)).toBeCloseTo(0.625);
  });

  it('has nothing for shapes that need no target', () => {
    expect(aimMarks('circle', false)).toEqual([]);
    expect(aimMarks('rhombus', true)).toEqual([]);
  });
});

describe('Reticle', () => {
  const at = new THREE.Vector3(0.3, 0, -0.2);
  const shown = (r: Reticle) => (r.root.children as THREE.Group[]).filter((c) => c.visible);

  it('hides with nothing in hand or no target', () => {
    const r = new Reticle('#3d7fd6');
    r.show(null, at, false);
    expect(r.root.visible).toBe(false);
    r.show('square', null, false);
    expect(r.root.visible).toBe(false);
    r.show('circle', at, false);
    expect(r.root.visible).toBe(false);
  });

  it('follows the aimed point at the strike size, and the star shows five marks', () => {
    const r = new Reticle('#3d7fd6');
    r.show('square', at, false);
    expect(r.root.visible).toBe(true);
    expect(shown(r)).toHaveLength(1);
    expect(shown(r)[0].position.x).toBeCloseTo(at.x);
    expect(shown(r)[0].scale.x).toBeCloseTo(PILLAR_AREA);
    r.show('square', at, true);
    expect(shown(r)[0].scale.x).toBeCloseTo(PILLAR_AREA * RUNE_BOOST);
    r.show('pentagram', at, false);
    expect(shown(r)).toHaveLength(5);
    r.hide();
    expect(r.root.visible).toBe(false);
  });
});
