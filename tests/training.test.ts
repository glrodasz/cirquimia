import { describe, expect, it } from 'vitest';
import { DEFAULT_PARAMS, generateLayout } from '../src/generator';

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
