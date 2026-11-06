import { describe, expect, it } from 'vitest';
import { FpsGuard, classify } from '../src/quality';

const desk = { cores: 8, memory: 8 };

describe('classify', () => {
  it.each([
    ['ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)', 'high'],
    ['Apple M2', 'high'],
    ['ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)', 'high'],
    ['ANGLE (Intel, Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)', 'high'],
    ['ANGLE (Intel, Intel(R) HD Graphics 4000 Direct3D11 vs_5_0 ps_5_0, D3D11)', 'medium'],
    ['Intel(R) HD Graphics', 'medium'],
    ['Mali-T860', 'medium'],
    ['Adreno (TM) 640', 'high'],
    ['Adreno (TM) 306', 'low'],
    ['V3D 4.2', 'low'],
    ['VideoCore IV HW', 'low'],
    ['ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)', 'low'],
    ['llvmpipe (LLVM 15.0.6, 128 bits)', 'low'],
  ])('%s -> %s', (renderer, tier) => {
    expect(classify({ renderer, ...desk }).tier).toBe(tier);
  });

  it('few cores or little memory lower the tier', () => {
    expect(classify({ renderer: 'Apple GPU', cores: 4, memory: 8 })).toEqual({ tier: 'medium', reason: 'cores' });
    expect(classify({ renderer: 'Apple GPU', cores: 8, memory: 2 })).toEqual({ tier: 'low', reason: 'memory' });
    expect(classify({ renderer: 'Apple GPU', cores: 2 })).toEqual({ tier: 'low', reason: 'cores' });
    expect(classify({ renderer: 'Apple GPU' })).toEqual({ tier: 'high', reason: 'none' });
  });
});

describe('FpsGuard', () => {
  const run = (guard: FpsGuard, fps: number, seconds: number) => {
    let fired = 0;
    for (let t = 0; t < seconds; t += 1 / fps) if (guard.tick(1 / fps)) fired++;
    return fired;
  };
  it('stays quiet at 60 fps', () => expect(run(new FpsGuard(), 60, 30)).toBe(0));
  it('steps down once per settled window at 30 fps', () => expect(run(new FpsGuard(), 30, 8)).toBe(1));
  it('ignores stalls', () => {
    const g = new FpsGuard();
    run(g, 60, 4);
    for (let i = 0; i < 20; i++) expect(g.tick(2)).toBe(false);
  });
});

describe('FpsGuard on a very slow device', () => {
  it('still steps down at 4 fps', () => {
    const g = new FpsGuard();
    let fired = false;
    for (let i = 0; i < 40 && !fired; i++) fired = g.tick(0.25);
    expect(fired).toBe(true);
  });
});
