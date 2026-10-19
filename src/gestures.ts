// Single-stroke shape recognition with plain geometry: no templates, no training.

export type Point = { x: number; y: number };
export type ShapeKind = 'circle' | 'triangle' | 'triangleDown' | 'square' | 'rhombus' | 'pentagram';

export interface Recognized {
  kind: ShapeKind;
  /** Centre and size of the ideal shape, in screen pixels, for the confirmation flash. */
  cx: number;
  cy: number;
  r: number;
  /** Corners in drawing order (screen pixels); star tips for a pentagram; empty for a circle. */
  corners: Point[];
}

const MIN_SIZE = 70; // px: bounding-box diagonal below this is a scribble, not a shape
const MAX_CLOSE_GAP = 0.38; // gap between start and end, as a fraction of the diagonal
const CIRCLE_MAX_DEVIATION = 0.22; // radius spread / mean radius
const CIRCLE_MIN_SWEEP = Math.PI * 1.7; // ~306° of turning around the centre
const TRIANGLE_MIN_ANGLE = 20; // degrees, smallest allowed corner
const SQUARE_MAX_ANGLE_ERROR = 30; // degrees a corner may stray from 90°
const SQUARE_MIN_SIDE_RATIO = 0.55; // shortest side / longest side (also for the rhombus)
const SQUARE_MAX_TILT = 22; // degrees; a square turned further than this reads as a rhombus
const RHOMBUS_MIN_ANGLE = 35; // degrees, smallest allowed corner
const RHOMBUS_MAX_OPPOSITE_DIFF = 30; // degrees between opposite corners
const STAR_MAX_TIP_ANGLE = 75; // degrees; a pentagram tip is ~36°
const STAR_MAX_TIP_SPREAD = 0.25; // tip distance spread / mean tip distance

/** Resample to evenly spaced points so speed doesn't skew the measurements. */
function resample(points: Point[], n: number): Point[] {
  let length = 0;
  for (let i = 1; i < points.length; i++) length += dist(points[i - 1], points[i]);
  const step = length / (n - 1);
  const out: Point[] = [points[0]];
  let acc = 0;
  let prev = points[0];
  for (let i = 1; i < points.length; i++) {
    let cur = points[i];
    let d = dist(prev, cur);
    while (acc + d >= step && out.length < n) {
      const t = (step - acc) / d;
      const q = { x: prev.x + (cur.x - prev.x) * t, y: prev.y + (cur.y - prev.y) * t };
      out.push(q);
      prev = q;
      d = dist(prev, cur);
      acc = 0;
    }
    acc += d;
    prev = cur;
  }
  while (out.length < n) out.push(points[points.length - 1]);
  return out;
}

function dist(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Ramer-Douglas-Peucker on an open polyline. */
function simplify(points: Point[], epsilon: number): Point[] {
  if (points.length < 3) return points.slice();
  const a = points[0];
  const b = points[points.length - 1];
  let maxD = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = distToSegment(points[i], a, b);
    if (d > maxD) {
      maxD = d;
      index = i;
    }
  }
  if (maxD <= epsilon) return [a, b];
  const left = simplify(points.slice(0, index + 1), epsilon);
  const right = simplify(points.slice(index), epsilon);
  return left.slice(0, -1).concat(right);
}

function distToSegment(p: Point, a: Point, b: Point) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function angleAt(prev: Point, p: Point, next: Point) {
  const a = Math.atan2(prev.y - p.y, prev.x - p.x);
  const b = Math.atan2(next.y - p.y, next.x - p.x);
  let d = Math.abs(a - b);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return (d * 180) / Math.PI;
}

/** People often run past the starting point to close a shape: cut the stroke where it comes back. */
function trimOvershoot(points: Point[]): Point[] {
  const along = [0];
  for (let i = 1; i < points.length; i++) along.push(along[i - 1] + dist(points[i - 1], points[i]));
  const total = along[along.length - 1];
  let best = points.length - 1;
  let bestD = Infinity;
  for (let i = points.length - 1; i > 0 && along[i] > total * 0.65; i--) {
    const d = dist(points[i], points[0]);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  // Only trim a real overshoot: the stroke came much closer to its start than where it ended.
  if (bestD > dist(points[points.length - 1], points[0]) * 0.5) return points;
  return points.slice(0, best + 1);
}

/** Total angle the stroke turns around a centre point (2π per lap). */
function sweepAround(points: Point[], cx: number, cy: number) {
  let sweep = 0;
  for (let i = 1; i < points.length; i++) {
    let d = Math.atan2(points[i].y - cy, points[i].x - cx) - Math.atan2(points[i - 1].y - cy, points[i - 1].x - cx);
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    sweep += d;
  }
  return sweep;
}

export function recognize(raw: Point[]): Recognized | null {
  if (raw.length < 8) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of raw) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  const diag = Math.hypot(maxX - minX, maxY - minY);
  if (diag < MIN_SIZE) return null;
  raw = trimOvershoot(raw);
  if (dist(raw[0], raw[raw.length - 1]) > diag * MAX_CLOSE_GAP) return null;

  const pts = resample(raw, 64);
  let cx = 0, cy = 0;
  for (const p of pts) {
    cx += p.x;
    cy += p.y;
  }
  cx /= pts.length;
  cy /= pts.length;

  // Triangle: the closed stroke simplifies to exactly three corners with sensible angles.
  const closed = pts.concat([pts[0]]);
  let poly = simplify(closed, diag * 0.09);
  poly = poly.slice(0, -1); // first and last are the same point once closed
  // The start point is usually on an edge, not a corner: drop it if it is nearly straight.
  while (poly.length > 3) {
    const n = poly.length;
    let flattest = -1;
    let flattestAngle = 0;
    for (let i = 0; i < n; i++) {
      const ang = angleAt(poly[(i - 1 + n) % n], poly[i], poly[(i + 1) % n]);
      if (ang > flattestAngle) {
        flattestAngle = ang;
        flattest = i;
      }
    }
    if (flattestAngle < 150) break;
    poly.splice(flattest, 1);
  }
  const angles = poly.map((p, i) => angleAt(poly[(i - 1 + poly.length) % poly.length], p, poly[(i + 1) % poly.length]));
  const centre = (ps: Point[]) => ({
    x: ps.reduce((a, p) => a + p.x, 0) / ps.length,
    y: ps.reduce((a, p) => a + p.y, 0) / ps.length,
  });

  // Triangle: three corners with sensible angles. The lone corner on top or bottom sets which way it points.
  if (poly.length === 3 && Math.min(...angles) >= TRIANGLE_MIN_ANGLE) {
    const c = centre(poly);
    const r = Math.max(...poly.map((p) => Math.hypot(p.x - c.x, p.y - c.y)));
    const ys = poly.map((p) => p.y).sort((a, b) => a - b);
    const kind = ys[1] - ys[0] > ys[2] - ys[1] ? 'triangle' : 'triangleDown';
    return { kind, cx: c.x, cy: c.y, r, corners: poly };
  }

  if (poly.length === 4) {
    const sides = poly.map((p, i) => dist(p, poly[(i + 1) % 4]));
    const evenSides = Math.min(...sides) / Math.max(...sides) >= SQUARE_MIN_SIDE_RATIO;
    const c = centre(poly);
    // Average edge direction modulo 90°: how far the shape is turned from sitting flat.
    let ec = 0, es = 0;
    poly.forEach((p, i) => {
      const q = poly[(i + 1) % 4];
      const a = Math.atan2(q.y - p.y, q.x - p.x) * 4;
      ec += Math.cos(a);
      es += Math.sin(a);
    });
    const theta = Math.atan2(es, ec) / 4;
    const tilt = Math.abs((theta * 180) / Math.PI);

    // Square: corners near 90°, sitting roughly flat; snapped to a true square.
    if (evenSides && tilt <= SQUARE_MAX_TILT && Math.max(...angles.map((a) => Math.abs(a - 90))) <= SQUARE_MAX_ANGLE_ERROR) {
      const half = sides.reduce((a, b) => a + b, 0) / 8;
      const ideal = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => ({
        x: c.x + (u * Math.cos(theta) - v * Math.sin(theta)) * half,
        y: c.y + (u * Math.sin(theta) + v * Math.cos(theta)) * half,
      }));
      return { kind: 'square', cx: c.x, cy: c.y, r: half * Math.SQRT2, corners: ideal };
    }

    // Rhombus: even sides, opposite corners alike; a diamond or a slanted square. Snapped so the
    // diagonals cross at right angles through the centre.
    if (
      evenSides &&
      Math.min(...angles) >= RHOMBUS_MIN_ANGLE &&
      Math.abs(angles[0] - angles[2]) <= RHOMBUS_MAX_OPPOSITE_DIFF &&
      Math.abs(angles[1] - angles[3]) <= RHOMBUS_MAX_OPPOSITE_DIFF
    ) {
      const d1 = { x: (poly[2].x - poly[0].x) / 2, y: (poly[2].y - poly[0].y) / 2 };
      const d2 = { x: (poly[3].x - poly[1].x) / 2, y: (poly[3].y - poly[1].y) / 2 };
      const l1 = Math.hypot(d1.x, d1.y);
      const l2 = Math.hypot(d2.x, d2.y);
      const u = { x: d1.x / l1, y: d1.y / l1 };
      const side = Math.sign(u.x * d2.y - u.y * d2.x) || 1;
      const v = { x: -u.y * side, y: u.x * side };
      const ideal = [
        { x: c.x - u.x * l1, y: c.y - u.y * l1 },
        { x: c.x - v.x * l2, y: c.y - v.y * l2 },
        { x: c.x + u.x * l1, y: c.y + u.y * l1 },
        { x: c.x + v.x * l2, y: c.y + v.y * l2 },
      ];
      return { kind: 'rhombus', cx: c.x, cy: c.y, r: Math.max(l1, l2), corners: ideal };
    }
  }

  // Pentagram: five sharp tips on a ring, each stroke jumping two tips ahead (so the lines cross),
  // which winds twice around the centre. Snapped to a regular star.
  if (poly.length === 5 && Math.max(...angles) <= STAR_MAX_TIP_ANGLE) {
    const c = centre(poly);
    const radii = poly.map((p) => Math.hypot(p.x - c.x, p.y - c.y));
    const mean = radii.reduce((a, b) => a + b, 0) / 5;
    const spread = Math.sqrt(radii.reduce((a, r) => a + (r - mean) ** 2, 0) / 5) / mean;
    if (spread <= STAR_MAX_TIP_SPREAD && Math.abs(sweepAround(pts, c.x, c.y)) > Math.PI * 3.2) {
      // Five-fold circular mean gives the star's rotation; each tip snaps to its nearest ideal tip.
      const tipAngles = poly.map((p) => Math.atan2(p.y - c.y, p.x - c.x));
      const phi = Math.atan2(
        tipAngles.reduce((a, t) => a + Math.sin(5 * t), 0),
        tipAngles.reduce((a, t) => a + Math.cos(5 * t), 0),
      ) / 5;
      const step = (Math.PI * 2) / 5;
      const ideal = tipAngles.map((t) => {
        const a = phi + Math.round((t - phi) / step) * step;
        return { x: c.x + Math.cos(a) * mean, y: c.y + Math.sin(a) * mean };
      });
      return { kind: 'pentagram', cx: c.x, cy: c.y, r: mean, corners: ideal };
    }
  }

  // Circle (checked second, since a rough triangle can look round): every point roughly the same
  // distance from the centre, and the stroke goes all the way round.
  let mean = 0;
  for (const p of pts) mean += Math.hypot(p.x - cx, p.y - cy);
  mean /= pts.length;
  let variance = 0;
  for (const p of pts) variance += (Math.hypot(p.x - cx, p.y - cy) - mean) ** 2;
  const deviation = Math.sqrt(variance / pts.length) / mean;
  const sweep = sweepAround(pts, cx, cy);
  // A square is fairly round too; a real circle never simplifies to four corners or fewer.
  if (poly.length > 4 && deviation < CIRCLE_MAX_DEVIATION && Math.abs(sweep) > CIRCLE_MIN_SWEEP) {
    return { kind: 'circle', cx, cy, r: mean, corners: [] };
  }
  return null;
}

/** Closed outline of the ideal shape, as a polygon in screen pixels. */
function outline(s: Recognized): Point[] {
  if (s.kind !== 'circle') return s.corners;
  const out: Point[] = [];
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    out.push({ x: s.cx + Math.cos(a) * s.r, y: s.cy + Math.sin(a) * s.r });
  }
  return out;
}

function signedArea(points: Point[]) {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const q = points[(i + 1) % points.length];
    a += p.x * q.y - q.x * p.y;
  }
  return a / 2;
}

/**
 * Where each stroke point lands on the ideal shape: same start, same direction, and spread by
 * arc length over exactly one lap, so a stroke that falls short or overshoots still closes cleanly.
 */
export function idealPath(s: Recognized, stroke: Point[]): Point[] {
  let poly = outline(s);
  if (Math.sign(signedArea(poly)) !== Math.sign(signedArea(stroke))) poly = poly.slice().reverse();
  const n = poly.length;
  const lengths = [0];
  for (let i = 0; i < n; i++) lengths.push(lengths[i] + dist(poly[i], poly[(i + 1) % n]));
  const perimeter = lengths[n];

  // Start where the stroke started, projected onto the outline.
  let start = 0;
  let best = Infinity;
  for (let i = 0; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    const d = distToSegment(stroke[0], a, b);
    if (d < best) {
      best = d;
      const len = lengths[i + 1] - lengths[i];
      const t = len === 0 ? 0 : ((stroke[0].x - a.x) * (b.x - a.x) + (stroke[0].y - a.y) * (b.y - a.y)) / (len * len);
      start = lengths[i] + Math.max(0, Math.min(1, t)) * len;
    }
  }

  const along = [0];
  for (let i = 1; i < stroke.length; i++) along.push(along[i - 1] + dist(stroke[i - 1], stroke[i]));
  const total = along[along.length - 1] || 1;
  let seg = 0;
  return along.map((l) => {
    const target = (start + (l / total) * perimeter) % perimeter;
    while (seg > 0 && lengths[seg] > target) seg--;
    while (lengths[seg + 1] < target) seg++;
    const a = poly[seg];
    const b = poly[(seg + 1) % n];
    const len = lengths[seg + 1] - lengths[seg];
    const t = len === 0 ? 0 : (target - lengths[seg]) / len;
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  });
}
