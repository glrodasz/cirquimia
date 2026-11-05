// Synthetic finger strokes for the recognizer tests: seeded, so every run draws the same shapes.

import type { Point } from '../src/gestures';

export function rng(seed: number) {
  return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}

export interface Sloppy {
  /** px of white jitter per sample. */
  jitter?: number;
  /** Fraction of a lap drawn past the start. */
  over?: number;
  /** Where along the outline the finger lands, 0–1. */
  start?: number;
  /** px hook where the finger lands, and px tail where it lifts. */
  lead?: number;
  tail?: number;
  clockwise?: boolean;
}

/** Walks a closed polygon as a finger would: from `start`, `1 + over` laps, with jitter, a lead-in and a tail. */
export function trace(corners: Point[], o: Sloppy, r: () => number, samples = 80): Point[] {
  const cs = o.clockwise === false ? corners.slice().reverse() : corners;
  const n = cs.length;
  const pts: Point[] = [];
  const jitter = o.jitter ?? 0;
  for (let i = 0; i <= samples * (1 + (o.over ?? 0)); i++) {
    const u = (((o.start ?? 0) + i / samples) % 1) * n;
    const k = Math.floor(u);
    const f = u - k;
    const a = cs[k % n];
    const b = cs[(k + 1) % n];
    pts.push({ x: a.x + (b.x - a.x) * f + (r() - 0.5) * jitter, y: a.y + (b.y - a.y) * f + (r() - 0.5) * jitter });
  }
  const hook = (from: Point, length: number, steps = 5) => {
    const a = r() * Math.PI * 2;
    return Array.from({ length: steps }, (_, j) => ({
      x: from.x + Math.cos(a) * length * ((j + 1) / steps),
      y: from.y + Math.sin(a) * length * ((j + 1) / steps),
    }));
  };
  const lead = o.lead ? hook(pts[0], o.lead).reverse() : [];
  const tail = o.tail ? hook(pts[pts.length - 1], o.tail) : [];
  return [...lead, ...pts, ...tail];
}

/** Square corners, side `size`, centred at (cx, cy), turned `tilt` radians, corners rounded off by `round` px. */
export function squareCorners(size: number, tilt = 0, round = 0, cx = 200, cy = 300): Point[] {
  const h = size / 2;
  const base = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  const pts: Point[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = base[i];
    const [nx, ny] = base[(i + 1) % 4];
    const [px, py] = base[(i + 3) % 4];
    if (round > 0) {
      // Cut the corner with a short chamfer, the way a hurried finger does.
      const t = round / size;
      pts.push({ x: h * (x + (px - x) * t), y: h * (y + (py - y) * t) });
      pts.push({ x: h * (x + (nx - x) * t), y: h * (y + (ny - y) * t) });
    } else pts.push({ x: h * x, y: h * y });
  }
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  return pts.map((p) => ({ x: cx + p.x * c - p.y * s, y: cy + p.x * s + p.y * c }));
}

export function regular(n: number, radius: number, rot = -Math.PI / 2, cx = 200, cy = 300): Point[] {
  return Array.from({ length: n }, (_, i) => {
    const a = rot + (i * Math.PI * 2) / n;
    return { x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius };
  });
}

export function circle(radius: number, o: Sloppy, r: () => number, cx = 200, cy = 300): Point[] {
  const pts: Point[] = [];
  const start = (o.start ?? 0) * Math.PI * 2;
  const dir = o.clockwise === false ? -1 : 1;
  const samples = 80;
  for (let i = 0; i <= samples * (1 + (o.over ?? 0)); i++) {
    const a = start + dir * (i / samples) * Math.PI * 2;
    pts.push({
      x: cx + Math.cos(a) * radius + (r() - 0.5) * (o.jitter ?? 0),
      y: cy + Math.sin(a) * radius + (r() - 0.5) * (o.jitter ?? 0),
    });
  }
  return pts;
}
