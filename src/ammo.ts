import type { ShapeKind } from './gestures';

export type Pt = [number, number];

// Each icon is one brush stroke in a 48×48 box, redrawn with fresh jitter every time so no two look stamped.
const OUTLINES: Record<Exclude<ShapeKind, 'circle'>, Pt[]> = {
  triangle: [[24, 9], [38, 35], [10, 35]],
  triangleDown: [[24, 39], [38, 13], [10, 13]],
  square: [[12, 12], [36, 12], [36, 36], [12, 36]],
  rhombus: [[24, 7], [38, 24], [24, 41], [10, 24]],
  pentagram: [[24, 9], [32.8, 36.1], [9.7, 19.4], [38.3, 19.4], [15.2, 36.1]],
  // Fire's triangle on top of water's, tips meeting in the middle: one stroke across the top, down, across, back up.
  hourglass: [[11, 9], [37, 9], [11, 39], [37, 39]],
};
const RING_R = 22.2; // the enso around an icon
const STEP = 0.7; // px between brush samples
const OVERSHOOT = 0.06; // fraction of the outline drawn past the start, like a hand closing a shape
const DRY_FROM = 0.72; // past this fraction of the stroke the brush starts running dry

let iconId = 0;

/** Same nib as the stroke on the map (src/ink.ts): swells in, pools at corners, thins out and frays at the tail. */
export function brushPath(line: Pt[], width: number, rand: () => number, corners: number[] = []): { ink: string; dry: string } {
  const along = [0];
  for (let i = 1; i < line.length; i++) along.push(along[i - 1] + Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]));
  const total = along[along.length - 1];
  const phase = rand() * 10;
  const widths = along.map((l) => {
    const pool = corners.reduce((m, c) => Math.max(m, 1 - Math.abs(l - c) / 4), 0);
    const wobble = 1 + 0.12 * Math.sin(l * 0.35 + phase) + 0.07 * Math.sin(l * 0.9 + phase * 2);
    const taperIn = Math.min(1, 0.3 + (0.7 * l) / 3);
    const taperOut = 0.1 + 0.9 * Math.sqrt(Math.max(0, Math.min(1, (total - l) / 9)));
    return width * (1 + 0.35 * pool) * wobble * taperIn * taperOut;
  });
  const ink = ribbon(line, widths, 0, 0.5);
  // Streaks of bare paper inside the tail, where the bristles part.
  const tail = along.findIndex((l) => l > total * DRY_FROM);
  const dry: string[] = [];
  for (const [off, w] of [[0.16, 0.13], [-0.2, 0.1]]) {
    const seg = line.slice(tail);
    const gap = rand() * 6;
    // Broken streaks that widen toward the end, never a clean double line.
    const ws = widths.slice(tail).map((wi, i) => wi * w * Math.min(1, i / 10) * Math.max(0, Math.sin(i * 0.22 + gap) + 0.35) * (1 + i / seg.length));
    dry.push(ribbon(seg, ws, off, 0.5, widths.slice(tail)));
  }
  return { ink, dry: dry.join('') };
}

/** Outline of a ribbon of the given widths, optionally shifted sideways by a fraction of the full stroke width. */
function ribbon(line: Pt[], widths: number[], shift: number, half: number, base = widths): string {
  const n = line.length;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = line[Math.max(0, i - 1)];
    const b = line[Math.min(n - 1, i + 1)];
    let nx = a[1] - b[1];
    let ny = b[0] - a[0];
    const len = Math.hypot(nx, ny) || 1;
    nx /= len;
    ny /= len;
    const c = shift * base[i];
    const h = widths[i] * half;
    left.push([line[i][0] + nx * (c + h), line[i][1] + ny * (c + h)]);
    right.push([line[i][0] + nx * (c - h), line[i][1] + ny * (c - h)]);
  }
  const edge = left.concat(right.reverse());
  const f = (v: number) => v.toFixed(2);
  let d = `M${f(edge[0][0])} ${f(edge[0][1])}`;
  for (let i = 1; i < edge.length - 1; i++) {
    const [px, py] = edge[i];
    const [qx, qy] = edge[i + 1];
    d += `Q${f(px)} ${f(py)} ${f((px + qx) / 2)} ${f((py + qy) / 2)}`;
  }
  return d + 'Z';
}

/** Samples a closed outline from a random-ish corner, past the start by a little, with a slight hand tremor. */
function strokeLine(kind: ShapeKind, rand: () => number): { line: Pt[]; corners: number[] } {
  const line: Pt[] = [];
  const corners: number[] = [];
  const tremor = (l: number, k: number) => 0.45 * Math.sin(l * 0.21 + k) + 0.25 * Math.sin(l * 0.53 + k * 3);
  const k = rand() * 6;
  if (kind === 'circle') {
    const a0 = -2.2 + rand() * 0.6;
    const r = 13.5;
    const sweep = Math.PI * 2 * (1 + OVERSHOOT * 1.3);
    const n = Math.ceil((r * sweep) / STEP);
    for (let i = 0; i <= n; i++) {
      const a = a0 + (sweep * i) / n;
      const rr = r + tremor(i * STEP, k) - 0.8 * (i / n); // the hand drifts inward as it closes the loop
      line.push([24 + Math.cos(a) * rr, 24 + Math.sin(a) * rr]);
    }
    return { line, corners };
  }
  const poly = OUTLINES[kind];
  const sides = poly.length;
  const first = kind === 'pentagram' || kind === 'hourglass' ? 0 : Math.floor(rand() * sides);
  const pts = Array.from({ length: sides + 1 }, (_, i) => poly[(first + i) % sides]);
  let l = 0;
  for (let s = 0; s < sides; s++) {
    const [ax, ay] = pts[s];
    const [bx, by] = pts[s + 1];
    const len = Math.hypot(bx - ax, by - ay);
    const nx = (ay - by) / len;
    const ny = (bx - ax) / len;
    corners.push(l);
    const n = Math.ceil(len / STEP);
    for (let i = s === 0 ? 0 : 1; i <= n; i++) {
      const t = i / n;
      const bow = Math.sin(t * Math.PI) * tremor(l + t * len, k); // sides bow a hair, corners stay put
      line.push([ax + (bx - ax) * t + nx * bow, ay + (by - ay) * t + ny * bow]);
    }
    l += len;
  }
  corners.push(l);
  // Carry on a little along the first side, so the stroke closes with an overlap instead of a seam.
  const [ax, ay] = pts[0];
  const [bx, by] = pts[1];
  const len = Math.hypot(bx - ax, by - ay);
  const extra = Math.min(len * 0.5, l * OVERSHOOT);
  for (let d = STEP; d <= extra; d += STEP) line.push([ax + ((bx - ax) * d) / len, ay + ((by - ay) * d) / len]);
  return { line: roundCorners(line), corners };
}

/** A soft pass over the samples so the brush turns corners like a wrist, not a ruler. */
function roundCorners(line: Pt[]): Pt[] {
  return line.map((p, i) => {
    const a = line[Math.max(0, i - 2)];
    const b = line[Math.min(line.length - 1, i + 2)];
    return [(a[0] + p[0] * 2 + b[0]) / 4, (a[1] + p[1] * 2 + b[1]) / 4];
  });
}

/** The open enso drawn around a slot, starting at a random angle. */
export function ensoLine(rand: () => number): Pt[] {
  const line: Pt[] = [];
  const a0 = rand() * Math.PI * 2;
  const sweep = Math.PI * 2 * 0.86; // the enso stays open
  for (let i = 0, n = Math.ceil((RING_R * sweep) / STEP); i <= n; i++) {
    const a = a0 + (sweep * i) / n;
    line.push([24 + Math.cos(a) * RING_R, 24 + Math.sin(a) * RING_R]);
  }
  return line;
}

export function shapeIcon(kind: ShapeKind): string {
  let seed = (Math.random() * 2 ** 31) | 0;
  const rand = () => ((seed = (seed * 16807) % 2147483647) & 0xffff) / 0xffff;
  const id = `brush${++iconId}`;
  const { line, corners } = strokeLine(kind, rand);
  const glyph = brushPath(line, kind === 'pentagram' || kind === 'hourglass' ? 3.2 : 3.9, rand, corners);

  const ring = brushPath(ensoLine(rand), 2.2, rand);
  return (
    `<svg viewBox="0 0 48 48" aria-hidden="true">` +
    `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">` +
    `<rect width="48" height="48" fill="#fff"/><path d="${glyph.dry}${ring.dry}" fill="#000"/></mask>` +
    `<g mask="url(#${id})"><path class="ring" d="${ring.ink}"/><path class="glyph" d="${glyph.ink}"/></g></svg>`
  );
}
