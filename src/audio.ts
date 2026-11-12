/**
 * Every sound in the game is synthesized with Web Audio at play time, except the earth, fire and water strikes,
 * healing, a strike a wall blocks and the twinkle when a symbol is recognized, which are short recorded clips Guillermo picked (src/assets/sfx, from Pixabay's free sound library); until they have
 * loaded, or if they fail to, the synthesized versions play instead.
 * Effects are short shaped noise and tones (marker, stone, flame, splash, chimes); underneath, a very quiet meadow:
 * wind in gusts and a bird now and then. Nothing plays until the first touch or key (browsers require a
 * gesture), and the on/off choice is kept between visits.
 */

import type { Element } from './spells';
import earthClip from './assets/sfx/earth.mp3';
import fireClip from './assets/sfx/fire.mp3';
import waterClip from './assets/sfx/water.mp3';
import healClip from './assets/sfx/heal.mp3';
import blockClip from './assets/sfx/block.mp3';
import chimeClip from './assets/sfx/chime.mp3';

const KEY = 'cirquimia.sound';
const SFX_LEVEL = 0.8;
const AMBIENCE_LEVEL = 0.5;
/** Levels of the recorded clips, matched in loudness to the synthesized strikes they replace. */
const EARTH_CLIP = 0.8;
const FIRE_CLIP = 1;
const WATER_CLIP = 0.5;
const HEAL_CLIP = 1;
const BLOCK_CLIP = 0.5;
/** The twinkle sits well under the old bell (about 7 dB): it plays on every symbol drawn. */
const CHIME_CLIP = 2.5;

type Where = { x: number; z: number };
/** Screen pan (-1 left … 1 right) and loudness (0 … 1) for a point in the meadow, set by the scene. */
type Locate = (at: Where) => { pan: number; near: number };


let ctx: AudioContext | null = null;
let master: GainNode;
let sfxBus: GainNode;
let ambienceBus: GainNode;
let noise: AudioBuffer;
let marker: AudioBuffer;
let cracks: AudioBuffer[] = [];
let rocks: AudioBuffer[] = [];
let roars: AudioBuffer[] = [];
let pops: AudioBuffer[] = [];
let splashes: AudioBuffer[] = [];
type Clip = 'earth' | 'fire' | 'water' | 'heal' | 'block' | 'chime';
const clips: Partial<Record<Clip, AudioBuffer>> = {};
let locate: Locate = () => ({ pan: 0, near: 1 });
let enabled = readEnabled();
let ambienceTimer = 0;
const last = new Map<string, number>();

/** Off until the player turns it on: a game that starts making noise in someone's pocket or office is unwelcome. */
function readEnabled() {
  return stored() === '1';
}

function stored() {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** Creates (or wakes) the audio graph; must run inside a user gesture the first time. */
function unlock() {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = enabled ? 1 : 0;
    // Several strikes at once (a star, three rivals) can pile up: a gentle limiter keeps them from clipping.
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -10;
    limiter.knee.value = 8;
    limiter.ratio.value = 6;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.2;
    master.connect(limiter).connect(ctx.destination);
    sfxBus = ctx.createGain();
    sfxBus.gain.value = SFX_LEVEL;
    sfxBus.connect(master);
    ambienceBus = ctx.createGain();
    ambienceBus.gain.value = AMBIENCE_LEVEL;
    ambienceBus.connect(master);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    marker = markerGlide(ctx);
    cracks = [0, 1, 2].map(() => groundCrack(ctx!));
    rocks = [0, 1, 2].map(() => rockfall(ctx!));
    roars = [0, 1, 2].map(() => flameRoar(ctx!));
    pops = [0, 1, 2].map(() => emberPops(ctx!));
    splashes = [0, 1, 2].map(() => waterSplash(ctx!));
    loadClips(ctx);
    startMeadow();
  }
  wake();
}

/** Fetches and decodes the recorded clips in the background; a clip that fails just leaves its synth in place. */
function loadClips(c: AudioContext) {
  const urls = { earth: earthClip, fire: fireClip, water: waterClip, heal: healClip, block: blockClip, chime: chimeClip };
  for (const [name, url] of Object.entries(urls) as [Clip, string][]) {
    fetch(url)
      .then((r) => r.arrayBuffer())
      .then((data) => c.decodeAudioData(data))
      .then((buffer) => (clips[name] = buffer))
      .catch(() => {});
  }
}

/** Plays a recorded clip at `t`, slightly varied in pitch so repeats don't sound identical; false if not loaded. */
function clip(name: Clip, dest: AudioNode, t: number, gain: number) {
  const buffer = clips[name];
  if (!buffer) return false;
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.value = 0.95 + Math.random() * 0.1;
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(g).connect(dest);
  src.start(t);
  return true;
}

/**
 * Resumes a context the browser is holding back. Browsers accept different events as the gesture that allows sound
 * (Safari and iOS only a tap's touchend, a click or a key, not pointerdown, and not the end of a drag), so this runs
 * on all of them until one works; on iOS a silent one-sample buffer played inside the gesture is what unlocks output.
 */
function wake() {
  if (!ctx || !enabled || document.hidden || ctx.state === 'running') return;
  void ctx.resume();
  const blank = ctx.createBufferSource();
  blank.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
  blank.connect(ctx.destination);
  blank.start();
}

const GESTURES = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'click', 'keydown'];

if (typeof window !== 'undefined') {
  // Respects the phone's silent switch and mixes with the player's own music instead of stopping it.
  const session = (navigator as unknown as { audioSession?: { type: string } }).audioSession;
  if (session) session.type = 'ambient';
  for (const type of GESTURES) addEventListener(type, unlock, { capture: true, passive: true });
  // A hidden tab goes quiet, the meadow included, and picks up again when it comes back.
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) void ctx.suspend();
    else if (enabled) void ctx.resume();
  });
}

export const sound = {
  /** True once the player has touched the speaker at least once, on any visit. */
  get chosen() {
    return stored() !== null;
  },
  get enabled() {
    return enabled;
  },
  set enabled(on: boolean) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? '1' : '0');
    } catch {
      // Private mode: the choice lasts this visit only.
    }
    if (!ctx) return;
    master.gain.setTargetAtTime(on ? 1 : 0, ctx.currentTime, 0.05);
    wake();
  },
  /** How loud and where on screen a point is; the scene supplies it from the camera and the alchemist. */
  set locator(fn: Locate) {
    locate = fn;
  },
};

/** The output for one sound: through a panner placed at `at` (if given), at `gain` scaled by how near it is. */
function out(gain: number, at?: Where) {
  const c = ctx!;
  const g = c.createGain();
  let level = gain;
  if (at) {
    const { pan, near } = locate(at);
    level *= near;
    if (c.createStereoPanner) {
      const p = c.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, pan * 0.7));
      g.connect(p).connect(sfxBus);
    } else g.connect(sfxBus);
  } else g.connect(sfxBus);
  g.gain.value = level;
  return g;
}

/** False while muted or before the first gesture, and for a repeat of the same sound within `gap` seconds. */
function ready(name: string, gap = 0.04) {
  if (!ctx || !enabled || ctx.state !== 'running') return false;
  const now = ctx.currentTime;
  if (now - (last.get(name) ?? -1) < gap) return false;
  last.set(name, now);
  return true;
}

/** Filtered noise with an envelope: the base of every rustle, crack, flame and splash. */
function hiss(
  dest: AudioNode,
  t: number,
  length: number,
  filter: { type: BiquadFilterType; from: number; to?: number; q?: number },
  env: { attack: number; peak: number },
) {
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = noise;
  src.loop = true;
  src.loopStart = Math.random() * 0.5;
  const f = c.createBiquadFilter();
  f.type = filter.type;
  f.Q.value = filter.q ?? 1;
  f.frequency.setValueAtTime(filter.from, t);
  if (filter.to) f.frequency.exponentialRampToValueAtTime(filter.to, t + length);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(env.peak, t + env.attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + length);
  src.connect(f).connect(g).connect(dest);
  src.start(t, Math.random() * 0.5);
  src.stop(t + length + 0.05);
}

/** A tone with a pitch slide and a quick-attack, exponential-decay envelope. */
function tone(dest: AudioNode, t: number, length: number, type: OscillatorType, from: number, to: number, peak: number, attack = 0.005) {
  const c = ctx!;
  const o = c.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(from, t);
  if (to !== from) o.frequency.exponentialRampToValueAtTime(to, t + length);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + length);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + length + 0.05);
}

/**
 * A body landing: a sine that drops in pitch, hits at once, holds for a moment and then dies away fast
 * (`decay` is the time constant, s), with nothing ringing after it.
 */
function thud(dest: AudioNode, t: number, from: number, to: number, peak: number, decay: number) {
  const c = ctx!;
  const o = c.createOscillator();
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(to, t + 0.25);
  const g = c.createGain();
  const hold = t + 0.004 + decay * 0.4;
  const end = hold + decay * 5;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
  g.gain.setValueAtTime(peak, hold);
  g.gain.setTargetAtTime(0, hold, decay);
  g.gain.setValueAtTime(peak * Math.exp(-5), end);
  g.gain.linearRampToValueAtTime(0, end + 0.03);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(end + 0.05);
}

// ---------------------------------------------------------------- the ink

/**
 * A felt marker gliding on paper: smooth noise with a slow, gentle wobble in it (the tip's pressure), no grains or
 * clicks, so it can run under every stroke without tiring the ear.
 */
function markerGlide(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const buffer = c.createBuffer(1, rate * 2, rate);
  const data = buffer.getChannelData(0);
  let soft = 0;
  for (let i = 0; i < data.length; i++) {
    soft += 0.35 * (Math.random() * 2 - 1 - soft);
    const t = i / rate;
    // Loops seamlessly: whole cycles over the 2 s buffer.
    data[i] = soft * (0.85 + 0.15 * Math.sin(2 * Math.PI * 3 * t) * Math.sin(2 * Math.PI * 0.5 * t));
  }
  return buffer;
}

let inkGain: GainNode | null = null;
let inkFilter: BiquadFilterNode | null = null;
let inkSource: AudioBufferSourceNode | null = null;

/** A soft marker on paper while drawing: barely there, a touch louder and brighter the faster the stroke moves. */
export const inkSound = {
  begin() {
    this.end();
    if (!ctx || !enabled || ctx.state !== 'running') return;
    const c = ctx;
    const t = c.currentTime;
    inkSource = c.createBufferSource();
    inkSource.buffer = marker;
    inkSource.loop = true;
    const low = c.createBiquadFilter();
    low.type = 'highpass';
    low.frequency.value = 350;
    // A gentle, wide band: the papery "fff" of a felt tip, nothing sharp above it.
    inkFilter = c.createBiquadFilter();
    inkFilter.type = 'lowpass';
    inkFilter.frequency.value = 1400;
    inkFilter.Q.value = 0.5;
    inkGain = c.createGain();
    inkGain.gain.setValueAtTime(0, t);
    inkSource.connect(low).connect(inkFilter).connect(inkGain).connect(sfxBus);
    inkSource.start(t, Math.random() * 1.5);
  },
  /** `speed` in px/s. */
  move(speed: number) {
    if (!ctx || !inkGain || !inkFilter) return;
    const k = Math.min(1, speed / 1400);
    const now = ctx.currentTime;
    inkGain.gain.setTargetAtTime(k < 0.03 ? 0 : 0.05 + k * 0.1, now, 0.08);
    inkFilter.frequency.setTargetAtTime(1200 + k * 900, now, 0.12);
  },
  end() {
    if (!ctx || !inkGain || !inkSource) return;
    inkGain.gain.setTargetAtTime(0, ctx.currentTime, 0.04);
    inkSource.stop(ctx.currentTime + 0.25);
    inkGain = inkFilter = inkSource = null;
  },
};

// ---------------------------------------------------------------- recorded-like textures
// Natural sounds are made of many small events, not one tone: these are rendered once (three takes each, picked at
// random) sample by sample, then shaped by filters when played.

const pick = (takes: AudioBuffer[]) => takes[Math.floor(Math.random() * takes.length)];

/** Adds one sharp grain at `at` (s): noise with an instant attack and a fast decay. */
function grain(data: Float32Array, rate: number, at: number, length: number, peak: number) {
  const start = Math.floor(at * rate);
  const n = Math.floor(length * rate);
  for (let k = 0; k < n && start + k < data.length; k++) data[start + k] += (Math.random() * 2 - 1) * peak * Math.exp((-5 * k) / n);
}

/**
 * Ground breaking open: a dense burst of cracks that thins out, a dull crunch underneath, then loose earth and
 * pebbles pattering down for half a second.
 */
function groundCrack(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const length = 1;
  const buffer = c.createBuffer(1, rate * length, rate);
  const data = buffer.getChannelData(0);
  // The crunch: low-passed noise (one-pole) with a quick swell and a short decay.
  let low = 0;
  for (let i = 0; i < data.length; i++) {
    const t = i / rate;
    low += 0.06 * (Math.random() * 2 - 1 - low);
    data[i] = low * 5 * Math.min(1, t / 0.006) * Math.exp(-t / 0.09);
  }
  // Cracks: hundreds per second at first, dying away; the louder ones come early.
  for (let t = 0; t < 0.35; ) {
    const density = 900 * Math.exp(-t / 0.05) + 60;
    t += -Math.log(1 - Math.random()) / density;
    grain(data, rate, t, 0.0008 + Math.random() * 0.004, (0.25 + Math.random() ** 2 * 0.9) * Math.exp(-t / 0.12));
  }
  // Debris: sparse little stones landing, each a tiny tick.
  for (let t = 0.12; t < length - 0.05; ) {
    t += -Math.log(1 - Math.random()) / (45 * Math.exp(-(t - 0.12) / 0.3) + 4);
    grain(data, rate, t, 0.0006 + Math.random() * 0.002, 0.12 + Math.random() * 0.18 * Math.exp(-(t - 0.12) / 0.3));
  }
  return buffer;
}

/**
 * Rocks crumbling: stones clattering against each other in dry clacks (no ringing, no rolling rumble), about
 * half a second of it.
 */
function rockfall(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const length = 0.8;
  const buffer = c.createBuffer(1, Math.floor(rate * length), rate);
  const data = buffer.getChannelData(0);
  // A stone hitting stone: a dry click a few milliseconds long, brighter for small ones, with a little body.
  const clack = (at: number, size: number, peak: number) => {
    const start = Math.floor(at * rate);
    const n = Math.floor((0.002 + size * 0.006) * rate);
    const smooth = 0.9 - size * 0.6;
    let v = 0;
    for (let k = 0; k < n && start + k < data.length; k++) {
      v += smooth * (Math.random() * 2 - 1 - v);
      data[start + k] += v * peak * Math.exp((-4 * k) / n);
    }
  };
  // One continuous clatter, never a gap: a second burst after a silence is exactly what an echo sounds like. It
  // surges unevenly (stones catching and letting go) and the stones get smaller as it settles.
  const end = 0.35 + Math.random() * 0.15;
  let surge = 1;
  let next = 0;
  for (let t = 0; t < end; ) {
    if (t >= next) {
      surge = 0.35 + Math.random() * 0.65;
      next = t + 0.03 + Math.random() * 0.05;
    }
    t += -Math.log(1 - Math.random()) / (60 + 200 * surge);
    const settle = 1 - t / end;
    const size = Math.random() ** 2 * (0.3 + 0.7 * settle);
    clack(t, size, (0.3 + size * 0.7) * (0.4 + 0.6 * settle) * surge);
  }
  return buffer;
}

/**
 * A burst of flame: a dark, turbulent whoosh that swells for half a second and is gone by 0.8 s. The flicker is
 * fast (new level every 5–25 ms), which is what makes noise sound like fire rather than wind.
 */
function flameRoar(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const length = 1;
  const buffer = c.createBuffer(1, Math.floor(rate * length), rate);
  const data = buffer.getChannelData(0);
  let flutter = 1;
  let target = 1;
  let next = 0;
  let dark = 0;
  for (let i = 0; i < data.length; i++) {
    const t = i / rate;
    if (t >= next) {
      target = 0.3 + Math.random() * 0.7;
      next = t + 0.005 + Math.random() * 0.02;
    }
    flutter += (target - flutter) * 0.01;
    const white = Math.random() * 2 - 1;
    dark += 0.08 * (white - dark);
    const env = Math.min(1, t / 0.1) * (0.75 + 0.25 * Math.min(1, t / 0.45)) * (t < 0.5 ? 1 : Math.exp(-(t - 0.5) / 0.12));
    data[i] = (dark * 3 + white * 0.35) * env * flutter;
  }
  return buffer;
}

/** Embers and sap popping in the fire: scattered dry snaps. */
function emberPops(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const buffer = c.createBuffer(1, Math.floor(rate * 1.1), rate);
  const data = buffer.getChannelData(0);
  for (let t = 0.02; t < 1; ) {
    t += -Math.log(1 - Math.random()) / (40 * Math.exp(-t / 0.5) + 6);
    grain(data, rate, t, 0.0005 + Math.random() * 0.0025, 0.3 + Math.random() * 0.7);
  }
  return buffer;
}

/**
 * Water hit hard: a slap on the surface, then the spray falling back for most of a second (hundreds of small
 * splashes, densest half a second in), then a thin trickle.
 */
function waterSplash(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const buffer = c.createBuffer(1, Math.floor(rate * 2), rate);
  const data = buffer.getChannelData(0);
  // Each splash is softened (two one-pole low-passes, about 4 kHz): water has no sizzle on top.
  const burst = (at: number, decay: number, peak: number) => {
    const start = Math.floor(at * rate);
    let a = 0;
    let b = 0;
    for (let k = 0; start + k < data.length && k < rate * decay * 5; k++) {
      const t = k / rate;
      a += 0.45 * (Math.random() * 2 - 1 - a);
      b += 0.45 * (a - b);
      data[start + k] += b * 2 * peak * Math.min(1, t / 0.004) * Math.exp(-t / decay);
    }
  };
  burst(0, 0.03, 0.8);
  for (let t = 0.3; t < 1.4; ) {
    const fade = Math.exp(-Math.max(0, t - 0.5) / 0.5);
    t += -Math.log(1 - Math.random()) / (140 * fade + 10);
    burst(t, 0.01 + Math.random() * 0.04, (0.12 + Math.random() * 0.3) * fade * Math.min(1, (t - 0.3) / 0.15));
  }
  for (let t = 1.1; t < 1.95; ) {
    t += -Math.log(1 - Math.random()) / 30;
    burst(t, 0.005 + Math.random() * 0.015, 0.05 + Math.random() * 0.08);
  }
  return buffer;
}

/** Plays a rendered texture through a filter, at a gain and an optional speed (pitch) change. */
function texture(
  dest: AudioNode,
  t: number,
  buffer: AudioBuffer,
  filter: { type: BiquadFilterType; from: number; to?: number; at?: number; q?: number },
  gain: number,
  speed = 1,
  until?: number,
) {
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.value = speed * (0.92 + Math.random() * 0.16);
  const f = c.createBiquadFilter();
  f.type = filter.type;
  f.Q.value = filter.q ?? 0.7;
  f.frequency.setValueAtTime(filter.from, t);
  if (filter.to) f.frequency.exponentialRampToValueAtTime(filter.to, t + (filter.at ?? buffer.duration));
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(f).connect(g).connect(dest);
  src.start(t);
  if (until) {
    g.gain.setValueAtTime(gain, t + until - 0.06);
    g.gain.linearRampToValueAtTime(0, t + until);
    src.stop(t + until + 0.01);
  }
  return f;
}

// ---------------------------------------------------------------- effects

// A major pentatonic on D: every chime and the fanfare share it, so nothing clashes.
const SCALE = [293.66, 329.63, 369.99, 440, 493.88];
const note = (i: number) => SCALE[((i % 5) + 5) % 5] * 2 ** Math.floor(i / 5);

/** A shape was recognized: a soft twinkle (a small bell pitched for each symbol until the clip loads). */
export function chime(kind: string) {
  if (!ready('chime')) return;
  const t = ctx!.currentTime;
  const o = out(0.32);
  if (clip('chime', o, t, CHIME_CLIP)) return;
  const base = { circle: 5, triangle: 7, invertedTriangle: 6, square: 4, rhombus: 8, pentagram: 9, spiral: 3 }[kind] ?? 6;
  tone(o, t, 0.9, 'sine', note(base), note(base), 0.5);
  tone(o, t + 0.07, 0.8, 'sine', note(base + 2), note(base + 2), 0.32);
  tone(o, t, 0.25, 'triangle', note(base + 5), note(base + 5), 0.08);
}

/** A stroke that made no shape: a dull breath out. */
export function fizzle() {
  if (!ready('fizzle')) return;
  const t = ctx!.currentTime;
  hiss(out(0.35), t, 0.32, { type: 'lowpass', from: 1400, to: 220, q: 0.7 }, { attack: 0.02, peak: 0.6 });
  tone(out(0.12), t, 0.22, 'sine', 220, 150, 0.4);
}

/** The ground trembles where a strike will break out, for as long as the warning lasts. */
export function rumble(at: Where, warn: number) {
  if (!ready('rumble', 0.02)) return;
  const t = ctx!.currentTime;
  const o = out(0.5, at);
  hiss(o, t, warn + 0.08, { type: 'lowpass', from: 120, to: 200, q: 1.5 }, { attack: warn * 0.8, peak: 0.8 });
  // Grit shifting in the ground as it starts to give.
  const g = ctx!.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(1, t + warn);
  g.connect(o);
  texture(g, t, pick(cracks), { type: 'lowpass', from: 900, q: 0.7 }, 0.35, 0.45, warn + 0.08);
}

/** A strike breaks out: the ground cracking open, a flare, a splash, a steam blast or a creaking vine. */
export function strike(element: Element, at: Where) {
  if (!ready(`strike-${element}`, 0.03)) return;
  const t = ctx!.currentTime;
  const o = out(0.75, at);
  const ground = (gain: number) => {
    if (gain >= 1 && clip('earth', o, t, EARTH_CLIP)) return;
    // Rocks crumbling: the ground gives way with a short, deep thud and stones clatter off it.
    // No rolling rumble and no ringing: both made it sound like thunder, or like an echo. Under fire or water
    // (gain < 1) the stones fall back faster than the thud, so they don't clutter the flame or the splash.
    texture(o, t, pick(rocks), { type: 'lowpass', from: 5000, q: 0.5 }, 2.6 * gain * gain);
    thud(o, t, 70, 38, 0.8 * gain, 0.06);
    thud(o, t, 140, 75, 0.3 * gain, 0.03);
  };
  const flare = (gain: number) => {
    if (clip('fire', o, t, FIRE_CLIP * gain)) return;
    // The flame bursting up: a dark, flickering whoosh with its weight low down, a little brighter at the start.
    texture(o, t, pick(roars), { type: 'lowpass', from: 1600, to: 600, at: 0.8, q: 0.5 }, 1.3 * gain);
    // The air it pulls in: a soft low gust underneath.
    hiss(o, t, 0.6, { type: 'lowpass', from: 200, to: 140, q: 0.7 }, { attack: 0.1, peak: 0.8 * gain });
    // The spark that lights it, and a few snaps inside the burst.
    texture(o, t, pick(pops), { type: 'highpass', from: 2000 }, 0.3 * gain, 1, 0.5);
  };
  const splash = (gain: number) => {
    if (clip('water', o, t, WATER_CLIP * gain)) return;
    // The slap and the spray falling back, kept in the middle of the range with nothing hissing on top.
    texture(o, t, pick(splashes), { type: 'bandpass', from: 1700, to: 1100, at: 1.5, q: 0.5 }, 2 * gain);
    // The plunge: a deep whomp as the water swallows the blow.
    thud(o, t + 0.1, 70, 40, 0.8 * gain, 0.12);
    hiss(o, t + 0.1, 0.4, { type: 'lowpass', from: 300, to: 120, q: 0.7 }, { attack: 0.03, peak: 0.45 * gain });
    // A couple of bubbles in the trickle.
    for (let i = 0; i < 2; i++) {
      const drop = t + 0.9 + Math.random() * 0.6;
      const f = 600 + Math.random() * 500;
      tone(o, drop, 0.04, 'sine', f, f * 1.6, 0.07 * gain);
    }
  };
  switch (element) {
    case 'earth':
    case 'columns':
      ground(1);
      break;
    case 'fire':
    case 'fireStar':
      // The recorded clips already have their impact in them; the synth ones get the ground under them.
      if (!clips.fire) ground(0.45);
      flare(1);
      break;
    case 'water':
    case 'waterStar':
      if (!clips.water) ground(0.3);
      splash(1);
      break;
    case 'blast':
      ground(1);
      flare(0.8);
      // Water on fire: a long hiss of steam.
      hiss(o, t + 0.06, 1.1, { type: 'highpass', from: 2500, to: 5000, q: 0.4 }, { attack: 0.1, peak: 0.35 });
      break;
    case 'vine':
      texture(o, t, pick(cracks), { type: 'bandpass', from: 900, q: 1.5 }, 0.5, 0.5, 0.6);
      for (let i = 0; i < 3; i++) tone(o, t + i * 0.09, 0.22, 'sawtooth', 90 + i * 14, 70, 0.08);
      break;
  }
}

/** A strike that a wall stops: a fast whoosh as it glances off (a dry clack on stone until the clip loads). */
export function clack(at: Where) {
  if (!ready('clack')) return;
  const t = ctx!.currentTime;
  const o = out(0.55, at);
  if (clip('block', o, t, BLOCK_CLIP)) return;
  hiss(o, t, 0.08, { type: 'bandpass', from: 2400, q: 3 }, { attack: 0.002, peak: 0.8 });
  tone(o, t, 0.12, 'triangle', 380, 260, 0.35);
}

/** A wall of earth grinds up out of the ground. */
export function wallRise(at: Where) {
  if (!ready('wall')) return;
  const t = ctx!.currentTime;
  const o = out(0.6, at);
  hiss(o, t, 0.5, { type: 'lowpass', from: 250, to: 1100, q: 1.2 }, { attack: 0.15, peak: 0.8 });
  tone(o, t, 0.5, 'sawtooth', 55, 80, 0.12, 0.15);
  tone(o, t + 0.42, 0.25, 'sine', 90, 50, 0.5);
}

/** Fire or water drawn from a source into the alchemist. */
export function charge(element: 'fire' | 'water', at: Where) {
  if (!ready('charge')) return;
  const t = ctx!.currentTime;
  const o = out(0.45, at);
  if (element === 'fire') hiss(o, t, 0.5, { type: 'bandpass', from: 400, to: 2400, q: 1 }, { attack: 0.25, peak: 0.7 });
  else hiss(o, t, 0.5, { type: 'bandpass', from: 2400, to: 600, q: 1.4 }, { attack: 0.2, peak: 0.6 });
  tone(o, t + 0.35, 0.5, 'sine', element === 'fire' ? note(7) : note(5), element === 'fire' ? note(7) : note(5), 0.25);
}

/** A vine coils round someone's legs and holds: a tight creak. */
export function vineCreak(at: Where) {
  if (!ready('snare', 0.2)) return;
  const t = ctx!.currentTime;
  const o = out(0.4, at);
  for (let i = 0; i < 4; i++) tone(o, t + i * 0.07, 0.12, 'sawtooth', 140 - i * 12, 110 - i * 10, 0.08);
}

/** Healing: a clear chord that blooms slowly. */
export function healChord(at: Where) {
  if (!ready('heal', 0.2)) return;
  const t = ctx!.currentTime;
  const o = out(0.35, at);
  if (clip('heal', o, t, HEAL_CLIP)) return;
  for (const [i, n] of [5, 7, 9].entries()) tone(o, t + i * 0.06, 1.2, 'sine', note(n), note(n), 0.35, 0.15);
}

/** The end of a match: a short rising fanfare, or a low falling pair. */
export function ending(won: boolean) {
  if (!ready('end', 1)) return;
  const t = ctx!.currentTime;
  const o = out(0.45);
  if (won) [5, 7, 9, 10].forEach((n, i) => tone(o, t + i * 0.12, i === 3 ? 1.4 : 0.5, 'triangle', note(n), note(n), 0.5));
  else
    [2, 0].forEach((n, i) => {
      tone(o, t + i * 0.32, 0.9, 'triangle', note(n - 5), note(n - 5) * 0.97, 0.5);
      tone(o, t + i * 0.32, 0.9, 'sine', note(n - 10), note(n - 10), 0.4);
    });
}

// ---------------------------------------------------------------- the meadow

// Barely there on purpose: a breeze that rises and falls in slow gusts, and a bird every several seconds,
// somewhere off to one side. It should be missed when muted more than noticed when playing.

/** A gust: the wind's loudness and brightness drift to a new level over a few seconds. */
function gust(level: GainNode, color: BiquadFilterNode, t: number) {
  const length = 3 + Math.random() * 5;
  const strength = Math.random();
  level.gain.setTargetAtTime(0.02 + strength * 0.07, t, length / 3);
  color.frequency.setTargetAtTime(250 + strength * 650, t, length / 3);
  return length;
}

/** One bird: a few quick whistled notes sliding up or down, at its own pitch, placed left or right. */
function bird(t: number) {
  const c = ctx!;
  const pan = c.createStereoPanner ? c.createStereoPanner() : null;
  const g = c.createGain();
  g.gain.value = 0.05 + Math.random() * 0.05;
  if (pan) {
    pan.pan.value = (Math.random() * 2 - 1) * 0.8;
    g.connect(pan).connect(ambienceBus);
  } else g.connect(ambienceBus);
  const base = 2400 + Math.random() * 2200;
  const notes = 2 + Math.floor(Math.random() * 4);
  const rising = Math.random() < 0.5;
  let at = t;
  for (let i = 0; i < notes; i++) {
    const length = 0.05 + Math.random() * 0.09;
    const from = base * (0.9 + Math.random() * 0.25);
    const to = from * (rising ? 1.25 + Math.random() * 0.3 : 0.7 + Math.random() * 0.15);
    tone(g, at, length, 'sine', from, to, 0.6, 0.01);
    at += length + 0.03 + Math.random() * 0.08;
  }
  return at;
}

/** Starts the breeze for good and schedules gusts and birds a few seconds ahead at a time. */
function startMeadow() {
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = noise;
  src.loop = true;
  const color = c.createBiquadFilter();
  color.type = 'lowpass';
  color.frequency.value = 400;
  color.Q.value = 0.5;
  // A second, gentler band gives the air a soft hollow whistle on top of the rumble.
  const air = c.createBiquadFilter();
  air.type = 'bandpass';
  air.frequency.value = 900;
  air.Q.value = 0.8;
  const level = c.createGain();
  level.gain.value = 0;
  src.connect(color).connect(level).connect(ambienceBus);
  const airLevel = c.createGain();
  airLevel.gain.value = 0.25;
  color.connect(air).connect(airLevel).connect(level);
  src.start();

  let nextGust = c.currentTime + 0.5;
  let nextBird = c.currentTime + 4 + Math.random() * 6;
  const schedule = () => {
    const horizon = c.currentTime + 3;
    while (nextGust < horizon) nextGust += gust(level, color, nextGust);
    while (nextBird < horizon) {
      let end = bird(nextBird);
      // Sometimes the same bird calls again a moment later.
      if (Math.random() < 0.35) end = bird(end + 0.25 + Math.random() * 0.4);
      nextBird = end + 5 + Math.random() * 12;
    }
  };
  schedule();
  clearInterval(ambienceTimer);
  ambienceTimer = window.setInterval(schedule, 1000);
}
