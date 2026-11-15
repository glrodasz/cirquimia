import { describe, expect, it } from 'vitest';
import { DEFAULT_PARAMS, generateLayout, PORTRAIT_AREA } from '../src/generator';

describe('training meadows', () => {
  it('always place a campfire and a lagoon when they are required', () => {
    for (let i = 0; i < 300; i++) {
      const kinds = generateLayout(`seed-${i}`, DEFAULT_PARAMS, ['fogata', 'estanque']).features.map((f) => f.kind);
      expect(kinds).toContain('fogata');
      expect(kinds).toContain('estanque');
    }
  });

  it('ask for them even when the parameters turn water and fire off', () => {
    const kinds = generateLayout('dry', { ...DEFAULT_PARAMS, agua: 0, fuego: 0 }, ['fogata', 'estanque']).features.map((f) => f.kind);
    expect(kinds).toEqual(expect.arrayContaining(['fogata', 'estanque']));
  });
});

describe('training sources', () => {
  it('spread out: off the scarecrow, apart, one nearer and one farther', () => {
    const area = { ...PORTRAIT_AREA, clearCorner: true };
    let spread = 0;
    const n = 300;
    for (let i = 0; i < n; i++) {
      const fs = generateLayout(`seed-${i}`, { ...DEFAULT_PARAMS, magia: 0 }, ['fogata', 'estanque'], area).features;
      const fire = fs.find((f) => f.kind === 'fogata');
      const pond = fs.find((f) => f.kind === 'estanque');
      expect(fire && pond).toBeTruthy();
      expect(fs.some((f) => f.kind === 'runas' || f.kind === 'cristales')).toBe(false);
      const dF = Math.hypot(fire!.x, fire!.z);
      const dP = Math.hypot(pond!.x, pond!.z);
      const apart = Math.hypot(fire!.x - pond!.x, fire!.z - pond!.z) - fire!.r - pond!.r;
      if (dF > fire!.r + 1.2 && dP > pond!.r + 1.2 && apart > 1 && Math.abs(dF - dP) > 1) spread++;
    }
    expect(spread / n).toBeGreaterThan(0.85);
  });
});
