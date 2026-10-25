import type { Obstacle } from './meadow';

// Grid A* over the round obstacles, then string-pulled into a few straight legs.
const CELL = 0.1; // world units per grid cell
const MARGINS = [2, 5]; // search box around start and goal; widened once if nothing is found
const MAX_CELLS = 40000;

export interface Waypoint {
  x: number;
  z: number;
}

/** True when a body of this radius can walk the straight segment without touching any obstacle. */
export function clearLine(ax: number, az: number, bx: number, bz: number, obstacles: Obstacle[], radius: number) {
  const dx = bx - ax;
  const dz = bz - az;
  const len2 = dx * dx + dz * dz;
  for (const o of obstacles) {
    const t = len2 > 0 ? Math.max(0, Math.min(1, ((o.x - ax) * dx + (o.z - az) * dz) / len2)) : 0;
    const px = ax + dx * t - o.x;
    const pz = az + dz * t - o.z;
    const min = o.r + radius;
    if (px * px + pz * pz < min * min) return false;
  }
  return true;
}

/**
 * Waypoints from start to goal that go around obstacles, ending at the goal.
 * Returns null when the goal cannot be reached inside the search box.
 */
export function findPath(sx: number, sz: number, gx: number, gz: number, obstacles: Obstacle[], radius: number): Waypoint[] | null {
  if (clearLine(sx, sz, gx, gz, obstacles, radius)) return [{ x: gx, z: gz }];
  for (const margin of MARGINS) {
    const path = search(sx, sz, gx, gz, obstacles, radius, margin);
    if (path) return path;
  }
  return null;
}

function search(sx: number, sz: number, gx: number, gz: number, all: Obstacle[], radius: number, margin: number): Waypoint[] | null {
  let x0 = Math.min(sx, gx) - margin;
  let z0 = Math.min(sz, gz) - margin;
  let cols = Math.ceil((Math.max(sx, gx) + margin - x0) / CELL) + 1;
  let rows = Math.ceil((Math.max(sz, gz) + margin - z0) / CELL) + 1;
  if (cols * rows > MAX_CELLS) {
    const k = Math.sqrt(MAX_CELLS / (cols * rows));
    const cx = (sx + gx) / 2;
    const cz = (sz + gz) / 2;
    cols = Math.floor(cols * k);
    rows = Math.floor(rows * k);
    x0 = cx - (cols * CELL) / 2;
    z0 = cz - (rows * CELL) / 2;
  }

  // Mark blocked cells, only looking at obstacles that reach into the box.
  const blocked = new Uint8Array(cols * rows);
  for (const o of all) {
    const reach = o.r + radius;
    const i0 = Math.max(0, Math.floor((o.x - reach - x0) / CELL));
    const i1 = Math.min(cols - 1, Math.ceil((o.x + reach - x0) / CELL));
    const j0 = Math.max(0, Math.floor((o.z - reach - z0) / CELL));
    const j1 = Math.min(rows - 1, Math.ceil((o.z + reach - z0) / CELL));
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const dx = x0 + i * CELL - o.x;
        const dz = z0 + j * CELL - o.z;
        if (dx * dx + dz * dz < reach * reach) blocked[j * cols + i] = 1;
      }
    }
  }

  const cellOf = (x: number, z: number) => {
    const i = Math.max(0, Math.min(cols - 1, Math.round((x - x0) / CELL)));
    const j = Math.max(0, Math.min(rows - 1, Math.round((z - z0) / CELL)));
    return j * cols + i;
  };
  const start = cellOf(sx, sz);
  let goal = cellOf(gx, gz);
  // Standing against something must not trap the alchemist where it is.
  blocked[start] = 0;
  if (blocked[goal]) {
    // A goal wedged between obstacles moves to the nearest free cell around it.
    const near = nearestFree(goal, blocked, cols, rows, 6);
    if (near < 0) return null;
    goal = near;
    const i = goal % cols;
    gx = x0 + i * CELL;
    gz = z0 + ((goal - i) / cols) * CELL;
  }
  // Already in the goal cell (e.g. spawned against a tree): one short leg, never an empty route.
  if (goal === start) return [{ x: gx, z: gz }];

  const gi = goal % cols;
  const gj = (goal - gi) / cols;
  const h = (c: number) => {
    const i = c % cols;
    const dx = Math.abs(i - gi);
    const dz = Math.abs((c - i) / cols - gj);
    return Math.max(dx, dz) + 0.4142 * Math.min(dx, dz);
  };

  const cost = new Float32Array(cols * rows).fill(Infinity);
  const from = new Int32Array(cols * rows).fill(-1);
  const closed = new Uint8Array(cols * rows);
  const heap = new Heap();
  cost[start] = 0;
  heap.push(start, h(start));
  const steps = [
    [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
    [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2],
  ];

  while (heap.size) {
    const c = heap.pop();
    if (c === goal) break;
    if (closed[c]) continue;
    closed[c] = 1;
    const i = c % cols;
    const j = (c - i) / cols;
    for (const [di, dj, w] of steps) {
      const ni = i + di;
      const nj = j + dj;
      if (ni < 0 || nj < 0 || ni >= cols || nj >= rows) continue;
      const n = nj * cols + ni;
      if (blocked[n] || closed[n]) continue;
      // No cutting corners between two blocked cells.
      if (di && dj && (blocked[j * cols + ni] || blocked[nj * cols + i])) continue;
      const g = cost[c] + w;
      if (g < cost[n]) {
        cost[n] = g;
        from[n] = c;
        heap.push(n, g + h(n));
      }
    }
  }
  if (from[goal] < 0) return null;

  const cells: Waypoint[] = [];
  for (let c = goal; c !== start && c >= 0; c = from[c]) {
    const i = c % cols;
    cells.push({ x: x0 + i * CELL, z: z0 + ((c - i) / cols) * CELL });
  }
  cells.reverse();
  cells[cells.length - 1] = { x: gx, z: gz };

  // String-pull: from each corner, jump to the furthest waypoint still in plain sight.
  const out: Waypoint[] = [];
  let ax = sx;
  let az = sz;
  let k = 0;
  while (k < cells.length) {
    let far = k;
    for (let m = cells.length - 1; m > k; m--) {
      if (clearLine(ax, az, cells[m].x, cells[m].z, all, radius * 0.95)) {
        far = m;
        break;
      }
    }
    out.push(cells[far]);
    ax = cells[far].x;
    az = cells[far].z;
    k = far + 1;
  }
  return out;
}

function nearestFree(c: number, blocked: Uint8Array, cols: number, rows: number, maxRing: number) {
  const ci = c % cols;
  const cj = (c - ci) / cols;
  for (let ring = 1; ring <= maxRing; ring++) {
    for (let dj = -ring; dj <= ring; dj++) {
      for (let di = -ring; di <= ring; di++) {
        if (Math.max(Math.abs(di), Math.abs(dj)) !== ring) continue;
        const i = ci + di;
        const j = cj + dj;
        if (i >= 0 && j >= 0 && i < cols && j < rows && !blocked[j * cols + i]) return j * cols + i;
      }
    }
  }
  return -1;
}

/** Minimal binary min-heap of cell indices keyed by priority. */
class Heap {
  private items: number[] = [];
  private keys: number[] = [];

  get size() {
    return this.items.length;
  }

  push(item: number, key: number) {
    const items = this.items;
    const keys = this.keys;
    let i = items.length;
    items.push(item);
    keys.push(key);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (keys[p] <= key) break;
      items[i] = items[p];
      keys[i] = keys[p];
      i = p;
    }
    items[i] = item;
    keys[i] = key;
  }

  pop(): number {
    const items = this.items;
    const keys = this.keys;
    const top = items[0];
    const lastItem = items.pop()!;
    const lastKey = keys.pop()!;
    const n = items.length;
    if (n > 0) {
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        if (l >= n) break;
        const r = l + 1;
        const c = r < n && keys[r] < keys[l] ? r : l;
        if (keys[c] >= lastKey) break;
        items[i] = items[c];
        keys[i] = keys[c];
        i = c;
      }
      items[i] = lastItem;
      keys[i] = lastKey;
    }
    return top;
  }
}
