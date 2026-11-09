import { idealPath, recognize, type Point, type Recognized } from './gestures';

const FADE_FAIL = 0.35;
const MORPH = 0.16; // s: the stroke slides onto the ideal shape before it flashes
const FLASH = 0.7;
const INK = '#ffe9a8';
const GLOW = 'rgba(255, 196, 92, 0.9)';
const FAIL = 'rgba(80, 60, 50, 0.6)';

// Stabilizer, like the "streamline" brushes in iPad drawing apps.
const STRING = 7; // px: the pen tip trails the finger on a string this long, so jitter never reaches it
const SMOOTH = 0.45; // 0..1: extra easing of the tip toward the string's end
const MIN_STEP = 1.5; // px between stored points
const HINT_EVERY = 4; // frames between live recognition checks

// Ink brush: slow strokes pool thick, fast strokes run thin, and both ends taper like a nib.
const WIDTH_MAX = 11; // px, at rest
const WIDTH_MIN = 4; // px, at full speed
const FAST = 2.2; // px/ms counted as full speed
const WIDTH_EASE = 0.2; // how quickly the width follows the speed
const TAPER_IN = 14; // px of stroke to swell in from a point
const TAPER_OUT = 26; // px of stroke to thin out to a point

interface Fading {
  points: Point[];
  widths: number[];
  ideal: Point[] | null;
  shape: Recognized | null;
  age: number;
}

/** 2D overlay that draws the player's stroke, a hint of the shape it is becoming, and the snap. */
export class Ink {
  readonly canvas = document.createElement('canvas');
  private readonly ctx: CanvasRenderingContext2D;
  private points: Point[] = [];
  private widths: number[] = [];
  private width = WIDTH_MAX;
  private lastTime = 0;
  private tip: Point = { x: 0, y: 0 };
  private hint: Recognized | null = null;
  private hintFrame = 0;
  private hintAlpha = 0;
  private drawing = false;
  private fading: Fading[] = [];
  private dpr = 1;
  private dirty = false;

  constructor() {
    this.canvas.id = 'ink';
    this.ctx = this.canvas.getContext('2d')!;
    document.body.append(this.canvas);
    this.resize();
    addEventListener('resize', () => this.resize());
  }

  get active() {
    return this.drawing || this.fading.length > 0 || this.dirty;
  }

  begin(points: Point[]) {
    this.tip = { ...points[0] };
    this.points = [{ ...points[0] }];
    this.width = WIDTH_MAX * 0.8;
    this.widths = [this.width];
    this.lastTime = performance.now();
    this.hint = null;
    this.hintAlpha = 0;
    this.drawing = true;
    for (let i = 1; i < points.length; i++) this.add(points[i]);
  }

  /** Moves the pen tip toward the finger only once the string is taut, then eases it the rest. */
  add(p: Point) {
    const d = Math.hypot(p.x - this.tip.x, p.y - this.tip.y);
    if (d <= STRING) return;
    const pull = ((d - STRING) / d) * (1 - SMOOTH * 0.5);
    this.tip = { x: this.tip.x + (p.x - this.tip.x) * pull, y: this.tip.y + (p.y - this.tip.y) * pull };
    const last = this.points[this.points.length - 1];
    const step = Math.hypot(this.tip.x - last.x, this.tip.y - last.y);
    if (step < MIN_STEP) return;
    const now = performance.now();
    const speed = step / Math.max(1, now - this.lastTime);
    this.lastTime = now;
    const target = WIDTH_MAX + (WIDTH_MIN - WIDTH_MAX) * Math.min(1, speed / FAST);
    this.width += (target - this.width) * WIDTH_EASE;
    this.points.push(this.tip);
    this.widths.push(this.width);
  }

  end(shape: Recognized | null) {
    const ideal = shape && this.points.length > 1 ? idealPath(shape, this.points) : null;
    this.fading.push({ points: this.points, widths: this.widths, ideal, shape, age: 0 });
    this.points = [];
    this.widths = [];
    this.hint = null;
    this.drawing = false;
  }

  private resize() {
    this.dpr = Math.min(devicePixelRatio, 2);
    this.canvas.width = innerWidth * this.dpr;
    this.canvas.height = innerHeight * this.dpr;
    this.dirty = true;
  }

  /** Redraws only while something is on screen, so the overlay costs nothing when idle. */
  update(dt: number) {
    if (!this.active) return;
    const { ctx } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.lineCap = ctx.lineJoin = 'round';
    this.dirty = false;

    for (const f of this.fading) {
      f.age += dt;
      if (f.shape && f.ideal) {
        const ideal = f.ideal;
        const k = 1 - (1 - Math.min(1, f.age / MORPH)) ** 3;
        const pts = f.points.map((p, i) => ({ x: p.x + (ideal[i].x - p.x) * k, y: p.y + (ideal[i].y - p.y) * k }));
        const flash = Math.max(0, f.age - MORPH) / FLASH;
        this.stroke(pts, f.widths, 1 - flash * 2.5, INK, GLOW);
        if (f.age > MORPH) drawShape(ctx, f.shape, Math.min(1, flash));
      } else {
        this.stroke(f.points, f.widths, 1 - f.age / FADE_FAIL, FAIL, null);
      }
    }
    this.fading = this.fading.filter((f) => f.age < (f.shape ? MORPH + FLASH : FADE_FAIL));

    if (this.drawing) {
      // Ghost of the shape the stroke would become, so the player can see it is on track.
      if (++this.hintFrame % HINT_EVERY === 0) this.hint = recognize(this.points);
      this.hintAlpha += ((this.hint ? 1 : 0) - this.hintAlpha) * Math.min(1, dt * 10);
      if (this.hint && this.hintAlpha > 0.02) drawGhost(ctx, this.hint, this.hintAlpha);
      this.stroke(this.points, this.widths, 1, INK, GLOW);
    }
    if (!this.active) this.dirty = true; // one more frame to clear the last fade
  }

  private stroke(points: Point[], widths: number[], alpha: number, color: string, glow: string | null) {
    if (alpha <= 0 || points.length < 2) return;
    const { ctx } = this;
    const w = brushWidths(points, widths);
    ctx.save();
    if (glow) {
      ctx.shadowColor = glow;
      ctx.shadowBlur = 12;
    }
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    fillRibbon(ctx, points, w, 1);
    ctx.restore();
  }
}

/** Per-point width: speed-based width, a slight wobble so it never looks machine-made, and tapered ends. */
function brushWidths(points: Point[], widths: number[]): number[] {
  const along = [0];
  for (let i = 1; i < points.length; i++) {
    along.push(along[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y));
  }
  const total = along[along.length - 1];
  return widths.map((w, i) => {
    const l = along[i];
    const wobble = 1 + 0.08 * Math.sin(l * 0.09) + 0.05 * Math.sin(l * 0.23 + 1.3);
    const taperIn = Math.min(1, 0.25 + (0.75 * l) / TAPER_IN);
    const out = Math.min(1, (total - l) / TAPER_OUT);
    const taperOut = 0.15 + 0.85 * Math.sqrt(Math.max(0, out));
    return w * wobble * taperIn * taperOut;
  });
}

/** Fills the stroke as one ribbon whose edges sit half a width either side of the centre line. */
function fillRibbon(ctx: CanvasRenderingContext2D, points: Point[], widths: number[], scale: number) {
  const n = points.length;
  const left: Point[] = [];
  const right: Point[] = [];
  for (let i = 0; i < n; i++) {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(n - 1, i + 1)];
    let nx = a.y - b.y;
    let ny = b.x - a.x;
    const len = Math.hypot(nx, ny) || 1;
    const h = (widths[i] * scale) / 2;
    nx = (nx / len) * h;
    ny = (ny / len) * h;
    left.push({ x: points[i].x + nx, y: points[i].y + ny });
    right.push({ x: points[i].x - nx, y: points[i].y - ny });
  }
  ctx.beginPath();
  traceEdge(ctx, left, true);
  traceEdge(ctx, right.reverse(), false);
  ctx.closePath();
  ctx.fill();
  // Round the nib at both ends.
  for (const i of [0, n - 1]) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, (widths[i] * scale) / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Curves through the midpoints, so the edge never shows a kink. */
function traceEdge(ctx: CanvasRenderingContext2D, points: Point[], move: boolean) {
  if (move) ctx.moveTo(points[0].x, points[0].y);
  else ctx.lineTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const q = points[i + 1];
    ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
}

function shapePath(ctx: CanvasRenderingContext2D, s: Recognized, scale: number) {
  ctx.beginPath();
  if (s.kind !== 'circle') {
    for (const p of s.corners) ctx.lineTo((p.x - s.cx) * scale, (p.y - s.cy) * scale);
    if (s.kind !== 'spiral') ctx.closePath(); // the spiral is the one open shape
  } else {
    ctx.arc(0, 0, s.r * scale, 0, Math.PI * 2);
  }
}

/** Faint dashed outline under the stroke while it is being drawn. */
function drawGhost(ctx: CanvasRenderingContext2D, s: Recognized, alpha: number) {
  ctx.save();
  ctx.translate(s.cx, s.cy);
  ctx.globalAlpha = alpha * 0.4;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 8]);
  shapePath(ctx, s, 1);
  ctx.stroke();
  ctx.restore();
}

/** The clean shape the stroke snaps to: it flares, grows a little and fades. */
function drawShape(ctx: CanvasRenderingContext2D, s: Recognized, t: number) {
  const ease = 1 - (1 - t) ** 3;
  const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
  ctx.save();
  ctx.translate(s.cx, s.cy);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = INK;
  ctx.shadowColor = GLOW;
  ctx.shadowBlur = 14;
  ctx.lineWidth = 4;
  shapePath(ctx, s, 1 + ease * 0.12);
  ctx.stroke();
  ctx.restore();
}
