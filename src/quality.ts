/**
 * Graphics quality that adapts to the hardware. At start the game reads what it can about the device (graphics
 * renderer, CPU cores, memory) and picks a tier; while playing it watches the frame rate and steps down a tier when
 * the device can't keep up. A Raspberry Pi or an old laptop ends up on "low" without the player touching anything.
 * ?quality=high|medium|low forces a tier (and turns the automatic step-down off); so does the dev panel.
 */
export type Tier = 'high' | 'medium' | 'low';
export const TIERS: readonly Tier[] = ['high', 'medium', 'low'];

export interface TierSettings {
  /** Cap on the device pixel ratio the scene is rendered at. */
  pixelRatio: number;
  /** MSAA samples of the scene target (0 = none). */
  samples: number;
  shadows: boolean;
  /** Multiplies the world units per shadow texel: bigger = smaller, blurrier shadow map. */
  shadowTexel: number;
  /** Miniature (tilt-shift) blur: two fullscreen passes. */
  tiltShift: boolean;
  /** Multiplies the grass and flower counts. */
  cover: number;
}

export const SETTINGS: Record<Tier, TierSettings> = {
  high: { pixelRatio: 2, samples: 4, shadows: true, shadowTexel: 1, tiltShift: true, cover: 1 },
  medium: { pixelRatio: 1.5, samples: 2, shadows: true, shadowTexel: 1.5, tiltShift: true, cover: 0.65 },
  low: { pixelRatio: 1, samples: 0, shadows: false, shadowTexel: 2, tiltShift: false, cover: 0.35 },
};

/** Why a tier was chosen, for the dev panel. */
export type Reason = 'gpu' | 'software' | 'cores' | 'memory' | 'fps' | 'forced' | 'none';

export interface Signals {
  renderer: string;
  cores?: number;
  memory?: number;
}

// CPU renderers: everything is drawn by the processor.
export const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic|mesa offscreen/i;
// Graphics chips that can run the game, but not at full quality. Very weak: Raspberry Pi (VideoCore / V3D), the
// oldest phone GPUs, Intel GMA. Weak: Intel HD Graphics up to Broadwell (2000–6000, or unnumbered), older Mali,
// Adreno 4xx, PowerVR, Tegra. Renderer strings often come wrapped by ANGLE, so nothing here is anchored.
const VERY_WEAK_GPU = /videocore|\bv3d\b|broadcom|mali-4\d\d|adreno[^\d]*[23]\d\d\b|sgx|intel.*\bgma\b/i;
const WEAK_GPU = /intel.*\bhd graphics( \d{4}\b|(?! \d))|mali-t\d+|adreno[^\d]*4\d\d\b|powervr|tegra/i;

const worse = (a: Tier, b: Tier): Tier => (TIERS.indexOf(a) > TIERS.indexOf(b) ? a : b);

/** The tier the hardware alone suggests, and the signal that decided it. Pure, so it can be tested. */
export function classify({ renderer, cores, memory }: Signals): { tier: Tier; reason: Reason } {
  if (SOFTWARE.test(renderer)) return { tier: 'low', reason: 'software' };
  let tier: Tier = 'high';
  let reason: Reason = 'none';
  const lower = (to: Tier, why: Reason) => {
    if (worse(to, tier) !== tier) {
      tier = to;
      reason = why;
    }
  };
  if (VERY_WEAK_GPU.test(renderer)) lower('low', 'gpu');
  else if (WEAK_GPU.test(renderer)) lower('medium', 'gpu');
  if (cores !== undefined) lower(cores <= 2 ? 'low' : cores <= 4 ? 'medium' : 'high', 'cores');
  if (memory !== undefined) lower(memory <= 2 ? 'low' : memory <= 4 ? 'medium' : 'high', 'memory');
  return { tier, reason };
}

/** The GPU's name as WebGL reports it ('' when the browser hides it). */
export function rendererName(gl: WebGLRenderingContext | WebGL2RenderingContext): string {
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  return String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
}

export function readSignals(gl: WebGLRenderingContext | WebGL2RenderingContext): Signals {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return { renderer: rendererName(gl), cores: nav.hardwareConcurrency || undefined, memory: nav.deviceMemory };
}

export function parseTier(value: string | null | undefined): Tier | null {
  return value === 'high' || value === 'medium' || value === 'low' ? value : null;
}

// Step down when a whole window averages below this; a device that can't hold 60 snaps to 30 with vsync anyway.
const MIN_FPS = 45;
const WINDOW = 4; // seconds of frames per verdict
const WARMUP = 3; // seconds ignored at start and after each change (shader compiles, a new meadow)
const GAP = 1; // a frame this long is a stall (tab switch, a new meadow being built), not the device's pace

/**
 * Frame-rate watcher: feed it every frame's duration; it answers true once when the device is too slow for
 * the current tier. Stalls (a hidden tab, a long hitch) are skipped, not counted.
 */
export class FpsGuard {
  private elapsed = 0;
  private frames = 0;
  private settle = WARMUP;

  reset() {
    this.elapsed = 0;
    this.frames = 0;
    this.settle = WARMUP;
  }

  /** `seconds` is the real time since the previous frame. */
  tick(seconds: number): boolean {
    if (seconds > GAP) return false;
    if (this.settle > 0) {
      this.settle -= seconds;
      return false;
    }
    this.elapsed += seconds;
    this.frames++;
    if (this.elapsed < WINDOW) return false;
    const fps = this.frames / this.elapsed;
    this.elapsed = 0;
    this.frames = 0;
    if (fps >= MIN_FPS) return false;
    this.settle = WARMUP;
    return true;
  }
}
