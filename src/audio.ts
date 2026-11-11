/**
 * Every sound in the game, synthesized with Web Audio at play time: no files to load and no licences to track.
 * Effects are short shaped noise and tones (marker, stone, flame, splash, chimes); underneath, a very quiet meadow:
 * wind in gusts and a bird now and then. Nothing plays until the first touch or key (browsers require a
 * gesture), and the on/off choice is kept between visits.
 */

import type { Element } from './spells';

const KEY = 'cirquimia.sound';
const SFX_LEVEL = 0.8;
const AMBIENCE_LEVEL = 0.5;

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
let roars: AudioBuffer[] = [];
let pops: AudioBuffer[] = [];
let tears: AudioBuffer[] = [];
let splashes: AudioBuffer[] = [];
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
    roars = [0, 1, 2].map(() => flameRoar(ctx!));
    pops = [0, 1, 2].map(() => emberPops(ctx!));
    tears = [0, 1, 2].map(() => groundTear(ctx!));
    splashes = [0, 1, 2].map(() => waterSplash(ctx!));
    startMeadow();
  }
  wake();
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
 * The ground tearing open: a low, grinding groan made of slow, uneven swells of dark noise, with clods breaking
 * off inside it. Played slow and low-passed it is felt more than heard.
 */
function groundTear(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const length = 1.3;
  const buffer = c.createBuffer(1, Math.floor(rate * length), rate);
  const data = buffer.getChannelData(0);
  let low = 0;
  let swell = 1;
  let target = 1;
  let next = 0;
  for (let i = 0; i < data.length; i++) {
    const t = i / rate;
    if (t >= next) {
      target = 0.3 + Math.random() * 0.7;
      next = t + 0.04 + Math.random() * 0.12;
    }
    swell += (target - swell) * 0.001;
    low += 0.08 * (Math.random() * 2 - 1 - low);
    const env = Math.min(1, t / 0.05) * Math.exp(-Math.max(0, t - 0.15) / 0.45);
    data[i] = low * 4 * env * swell;
  }
  // Clods breaking off: soft, dull knocks (long, low grains) through the tear.
  for (let t = 0.02; t < 0.9; ) {
    t += -Math.log(1 - Math.random()) / (30 * Math.exp(-t / 0.3) + 5);
    grain(data, rate, t, 0.008 + Math.random() * 0.015, 0.2 + Math.random() * 0.25);
  }
  return buffer;
}

/** A flare: a roar that bursts in, flutters as the flame licks and dies down, with no tone in it at all. */
function flameRoar(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const length = 1.7;
  const buffer = c.createBuffer(1, Math.floor(rate * length), rate);
  const data = buffer.getChannelData(0);
  let flutter = 1;
  let target = 1;
  let next = 0;
  for (let i = 0; i < data.length; i++) {
    const t = i / rate;
    // The flame licks: deep, uneven swells 8–20 times a second.
    if (t >= next) {
      target = 0.15 + Math.random() * 0.85;
      next = t + 0.05 + Math.random() * 0.08;
    }
    flutter += (target - flutter) * 0.0015;
    const env = Math.min(1, t / 0.12) ** 2 * Math.exp(-Math.max(0, t - 0.2) / 0.55);
    data[i] = (Math.random() * 2 - 1) * env * flutter;
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

/** Water thrown hard: a wet burst, then smaller splashes as it falls back, then drips. */
function waterSplash(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const buffer = c.createBuffer(1, Math.floor(rate * 1), rate);
  const data = buffer.getChannelData(0);
  const burst = (at: number, decay: number, peak: number) => {
    const start = Math.floor(at * rate);
    for (let k = 0; start + k < data.length && k < rate * decay * 5; k++) {
      const t = k / rate;
      data[start + k] += (Math.random() * 2 - 1) * peak * Math.min(1, t / 0.004) * Math.exp(-t / decay);
    }
  };
  burst(0, 0.11, 1);
  for (let i = 0; i < 6; i++) burst(0.08 + Math.random() * 0.4, 0.02 + Math.random() * 0.03, 0.15 + Math.random() * 0.3);
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

/** A shape was recognized: a small bell, pitched a little differently for each symbol. */
export function chime(kind: string) {
  if (!ready('chime')) return;
  const t = ctx!.currentTime;
  const o = out(0.32);
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
    // The earth opening: a deep grinding groan that swells in, the crack muffled inside it, then soil falling.
    texture(o, t, pick(tears), { type: 'lowpass', from: 700, to: 260, at: 0.9, q: 0.8 }, 1.1 * gain, 0.7);
    texture(o, t + 0.02, pick(cracks), { type: 'lowpass', from: 1800, to: 500, at: 0.5 }, 0.55 * gain, 0.7);
    tone(o, t, 0.7, 'sine', 62, 38, 0.35 * gain, 0.04);
    hiss(o, t, 0.5, { type: 'lowpass', from: 220, to: 90, q: 0.7 }, { attack: 0.04, peak: 0.55 * gain });
    texture(o, t + 0.25, pick(cracks), { type: 'bandpass', from: 1400, q: 0.6 }, 0.12 * gain, 1.1);
  };
  const flare = (gain: number) => {
    // Fwoomp: the flame catching, a soft low gust of air.
    hiss(o, t, 0.4, { type: 'lowpass', from: 180, to: 600, q: 0.8 }, { attack: 0.06, peak: 0.7 * gain });
    // The whoosh sweeping up as the flame leaps, then the roar licking and settling, darker as it dies.
    const f = texture(o, t, pick(roars), { type: 'bandpass', from: 300, q: 0.9 }, 1.2 * gain);
    f.frequency.exponentialRampToValueAtTime(2400, t + 0.22);
    f.frequency.exponentialRampToValueAtTime(700, t + 1.5);
    texture(o, t, pick(roars), { type: 'lowpass', from: 260, q: 0.5 }, 0.8 * gain, 0.55);
    // Crackling all through it.
    texture(o, t + 0.08, pick(pops), { type: 'highpass', from: 1500 }, 0.45 * gain);
    texture(o, t + 0.5, pick(pops), { type: 'highpass', from: 2200 }, 0.25 * gain, 1.2);
  };
  const splash = (gain: number) => {
    texture(o, t, pick(splashes), { type: 'bandpass', from: 2600, to: 1100, at: 0.5, q: 0.6 }, 1.1 * gain);
    for (let i = 0; i < 4; i++) {
      const drop = t + 0.15 + Math.random() * 0.45;
      const f = 500 + Math.random() * 700;
      tone(o, drop, 0.05, 'sine', f, f * 2.4, 0.18 * gain);
    }
  };
  switch (element) {
    case 'earth':
    case 'columns':
      ground(1);
      break;
    case 'fire':
    case 'fireStar':
      ground(0.45);
      flare(1);
      break;
    case 'water':
    case 'waterStar':
      ground(0.45);
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

/** A strike that a wall stops: a dry clack on stone. */
export function clack(at: Where) {
  if (!ready('clack')) return;
  const t = ctx!.currentTime;
  const o = out(0.55, at);
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
