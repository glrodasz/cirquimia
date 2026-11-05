import { describe, expect, it } from 'vitest';
import { axes, groundDir, KeyboardMove, moveKey } from '../src/keys';

describe('moveKey', () => {
  it('maps WASD and the arrows by physical position', () => {
    expect(['KeyW', 'KeyA', 'KeyS', 'KeyD'].map(moveKey)).toEqual(['up', 'left', 'down', 'right']);
    expect(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].map(moveKey)).toEqual(['up', 'left', 'down', 'right']);
    expect(moveKey('KeyQ')).toBeNull();
    expect(moveKey('Space')).toBeNull();
  });
});

describe('axes', () => {
  it('is zero with nothing held or with opposite keys', () => {
    expect(axes([])).toEqual({ x: 0, y: 0 });
    expect(axes(['up', 'down'])).toEqual({ x: 0, y: 0 });
    expect(axes(['left', 'right'])).toEqual({ x: 0, y: 0 });
  });
  it('normalizes diagonals so they are not faster', () => {
    const a = axes(['up', 'right']);
    expect(Math.hypot(a.x, a.y)).toBeCloseTo(1);
    expect(a.x).toBeCloseTo(Math.SQRT1_2);
    expect(a.y).toBeCloseTo(Math.SQRT1_2);
  });
  it('counts W and ↑ together once', () => {
    expect(axes(['up', 'up'])).toEqual({ x: 0, y: 1 });
  });
});

describe('groundDir', () => {
  // A camera looking straight along -z (the three.js default): up the screen is -z, right is +x.
  it('maps screen up/right onto the camera forward/right', () => {
    const up = groundDir({ x: 0, y: 1 }, 0, -1);
    expect(up.x).toBeCloseTo(0);
    expect(up.z).toBeCloseTo(-1);
    const right = groundDir({ x: 1, y: 0 }, 0, -1);
    expect(right.x).toBeCloseTo(1);
    expect(right.z).toBeCloseTo(0);
  });
  it('follows a turned camera and keeps unit length', () => {
    const yaw = 0.42;
    const d = groundDir({ x: 0, y: 1 }, -Math.sin(yaw) * 3, -Math.cos(yaw) * 3);
    expect(Math.hypot(d.x, d.z)).toBeCloseTo(1);
    expect(d.x).toBeCloseTo(-Math.sin(yaw));
  });
});

describe('KeyboardMove', () => {
  it('ignores typing and shortcuts', () => {
    const k = new KeyboardMove();
    expect(k.press('KeyW', { typing: true })).toBe(false);
    expect(k.press('KeyS', { modifier: true })).toBe(false); // Ctrl+S / ⌘S stay browser shortcuts
    expect(k.axes()).toEqual({ x: 0, y: 0 });
  });
  it('tracks presses, keeps a direction while W or ↑ is still down, and clears on blur', () => {
    const k = new KeyboardMove();
    const seen: string[] = [];
    k.onChange = (key, down) => seen.push(`${key}:${down}`);
    k.press('KeyW');
    k.press('ArrowUp');
    k.press('KeyW'); // auto-repeat
    expect(k.axes()).toEqual({ x: 0, y: 1 });
    k.release('KeyW');
    expect(k.axes()).toEqual({ x: 0, y: 1 });
    k.press('KeyD');
    k.clear();
    expect(k.axes()).toEqual({ x: 0, y: 0 });
    expect(seen).toEqual(['up:true', 'right:true', 'up:false', 'right:false']);
  });
});
