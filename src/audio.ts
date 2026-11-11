/**
 * Every sound in the game, synthesized with Web Audio at play time: no files to load and no licences to track.
 * Effects are short shaped noise and tones (ink scratch, stone, flame, splash, chimes); the music is a soft
 * kalimba-like pentatonic loop over a low drone. Nothing plays until the first touch or key (browsers require a
 * gesture), and the on/off choice is kept between visits.
 */

import type { Element } from './spells';

const KEY = 'cirquimia.sound';
const SFX_LEVEL = 0.8;
const MUSIC_LEVEL = 0.16;

type Where = { x: number; z: number };
/** Screen pan (-1 left … 1 right) and loudness (0 … 1) for a point in the meadow, set by the scene. */
type Locate = (at: Where) => { pan: number; near: number };


let ctx: AudioContext | null = null;
let master: GainNode;
let sfxBus: GainNode;
let musicBus: GainNode;
let noise: AudioBuffer;
let chalk: AudioBuffer;
let locate: Locate = () => ({ pan: 0, near: 1 });
let enabled = readEnabled();
let musicTimer = 0;
const last = new Map<string, number>();

function readEnabled() {
  try {
    if (typeof localStorage === 'undefined') return true;
    return localStorage.getItem(KEY) !== '0';
  } catch {
    return true;
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
    master.connect(ctx.destination);
    sfxBus = ctx.createGain();
    sfxBus.gain.value = SFX_LEVEL;
    sfxBus.connect(master);
    musicBus = ctx.createGain();
    musicBus.gain.value = MUSIC_LEVEL;
    musicBus.connect(master);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    chalk = chalkGrain(ctx);
    startMusic();
  }
  if (ctx.state === 'suspended' && enabled && !document.hidden) void ctx.resume();
}

if (typeof window !== 'undefined') {
  for (const type of ['pointerdown', 'keydown', 'touchend']) addEventListener(type, unlock, { capture: true, passive: true });
  // A hidden tab goes quiet, music included, and picks up again when it comes back.
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) void ctx.suspend();
    else if (enabled) void ctx.resume();
  });
}

export const sound = {
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
    if (on) void ctx.resume();
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
 * Chalk on a slate: not a smooth hiss but a dense run of tiny dry grains, each a few milliseconds of bright noise
 * at its own loudness, over a thin rasp, with the odd skip where the chalk catches the grain of the board.
 */
function chalkGrain(c: BaseAudioContext) {
  const rate = c.sampleRate;
  const buffer = c.createBuffer(1, rate * 2, rate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.12;
  let at = 0;
  while (at < data.length) {
    const length = Math.floor(rate * (0.0015 + Math.random() * 0.005));
    const peak = 0.25 + Math.random() * 0.75;
    for (let k = 0; k < length && at + k < data.length; k++) {
      const env = Math.sin((Math.PI * k) / length);
      data[at + k] += (Math.random() * 2 - 1) * peak * env;
    }
    // Mostly packed tight, now and then a catch: a short gap, then a harder grain.
    at += Math.random() < 0.06 ? Math.floor(rate * (0.012 + Math.random() * 0.02)) : Math.floor(length * (0.4 + Math.random() * 0.8));
  }
  return buffer;
}

let inkGain: GainNode | null = null;
let inkFilter: BiquadFilterNode | null = null;
let inkSource: AudioBufferSourceNode | null = null;

/** Chalk scratching on a slate while drawing: louder, brighter and grittier the faster the stroke moves. */
export const inkSound = {
  begin() {
    this.end();
    if (!ctx || !enabled || ctx.state !== 'running') return;
    const c = ctx;
    const t = c.currentTime;
    inkSource = c.createBufferSource();
    inkSource.buffer = chalk;
    inkSource.loop = true;
    const low = c.createBiquadFilter();
    low.type = 'highpass';
    low.frequency.value = 900;
    inkFilter = c.createBiquadFilter();
    inkFilter.type = 'peaking';
    inkFilter.frequency.value = 3200;
    inkFilter.Q.value = 1.2;
    inkFilter.gain.value = 8;
    inkGain = c.createGain();
    inkGain.gain.value = 0;
    inkSource.connect(low).connect(inkFilter).connect(inkGain).connect(sfxBus);
    inkSource.start(t, Math.random() * 1.5);
    // The chalk touching the board: one dry tick.
    hiss(sfxBus, t, 0.03, { type: 'bandpass', from: 2600, q: 2 }, { attack: 0.002, peak: 0.12 });
  },
  /** `speed` in px/s. */
  move(speed: number) {
    if (!ctx || !inkGain || !inkFilter || !inkSource) return;
    const k = Math.min(1, speed / 1400);
    const now = ctx.currentTime;
    inkGain.gain.setTargetAtTime(k < 0.03 ? 0.01 : 0.05 + k * 0.22, now, 0.025);
    inkFilter.frequency.setTargetAtTime(2400 + k * 2200, now, 0.04);
    // Faster strokes run over more grain per second.
    inkSource.playbackRate.setTargetAtTime(0.75 + k * 0.6, now, 0.05);
  },
  end() {
    if (!ctx || !inkGain || !inkSource) return;
    inkGain.gain.setTargetAtTime(0, ctx.currentTime, 0.02);
    inkSource.stop(ctx.currentTime + 0.15);
    inkGain = inkFilter = inkSource = null;
  },
};

// ---------------------------------------------------------------- effects

// A major pentatonic on D: every chime and the music share it, so nothing clashes.
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
  hiss(o, t, warn + 0.08, { type: 'lowpass', from: 140, to: 220, q: 2 }, { attack: warn * 0.8, peak: 0.9 });
  tone(o, t, warn + 0.08, 'sine', 48, 62, 0.5, warn * 0.8);
}

/** A strike breaks out: stone, flame, water, steam or a creaking vine. */
export function strike(element: Element, at: Where) {
  if (!ready(`strike-${element}`, 0.03)) return;
  const t = ctx!.currentTime;
  const o = out(0.7, at);
  const stone = (gain: number) => {
    tone(o, t, 0.32, 'sine', 120, 42, 0.9 * gain);
    hiss(o, t, 0.18, { type: 'lowpass', from: 1800, to: 300, q: 0.8 }, { attack: 0.004, peak: 0.7 * gain });
    hiss(o, t + 0.02, 0.09, { type: 'bandpass', from: 3200, q: 1.5 }, { attack: 0.002, peak: 0.25 * gain });
  };
  const flame = (gain: number) => {
    hiss(o, t, 0.55, { type: 'bandpass', from: 500, to: 1600, q: 0.8 }, { attack: 0.03, peak: 0.8 * gain });
    for (let i = 0; i < 6; i++) hiss(o, t + 0.05 + Math.random() * 0.4, 0.03, { type: 'highpass', from: 2500 }, { attack: 0.002, peak: 0.25 * gain });
  };
  const splash = (gain: number) => {
    hiss(o, t, 0.45, { type: 'bandpass', from: 1400, to: 500, q: 0.9 }, { attack: 0.01, peak: 0.7 * gain });
    for (let i = 0; i < 5; i++) {
      const at0 = t + 0.03 + Math.random() * 0.3;
      const f = 300 + Math.random() * 400;
      tone(o, at0, 0.08, 'sine', f, f * 2.2, 0.3 * gain);
    }
  };
  switch (element) {
    case 'earth':
    case 'columns':
      stone(1);
      break;
    case 'fire':
    case 'fireStar':
      stone(0.5);
      flame(1);
      break;
    case 'water':
    case 'waterStar':
      stone(0.5);
      splash(1);
      break;
    case 'blast':
      stone(1.2);
      flame(0.8);
      hiss(o, t + 0.05, 1, { type: 'highpass', from: 1200, to: 3000, q: 0.5 }, { attack: 0.08, peak: 0.5 });
      break;
    case 'vine':
      for (let i = 0; i < 3; i++) tone(o, t + i * 0.09, 0.22, 'sawtooth', 90 + i * 14, 70, 0.12);
      hiss(o, t, 0.4, { type: 'bandpass', from: 700, to: 400, q: 2 }, { attack: 0.05, peak: 0.3 });
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

// ---------------------------------------------------------------- music

// Sixty-four steps of a slow pentatonic tune (scale steps, null = rest), looped over a soft drone: about 35 s.
const TUNE: (number | null)[] = [
  5, null, 7, null, 6, null, 4, null, 5, null, null, 2, 4, null, null, null,
  7, null, 9, null, 8, null, 7, 5, 6, null, null, null, 4, null, 5, null,
  5, null, 7, null, 10, null, 9, null, 7, null, 6, 5, 4, null, null, null,
  2, null, 4, null, 5, null, 4, 2, 0, null, null, null, null, null, null, null,
];
const BEAT = 0.55; // s per step
const ROOTS = [0, 0, -2, -1]; // drone root (scale step, two octaves down) per quarter of the tune

function pluck(t: number, freq: number, peak: number) {
  // Kalimba: a sine with a short bright overtone, a fast attack and a long ring.
  tone(musicBus, t, 2.2, 'sine', freq, freq, peak, 0.004);
  tone(musicBus, t, 0.18, 'sine', freq * 4.2, freq * 4.2, peak * 0.15, 0.002);
}

function drone(t: number, freq: number, length: number) {
  const c = ctx!;
  for (const detune of [-4, 4]) {
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    o.detune.value = detune;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 2);
    g.gain.setValueAtTime(0.12, t + length - 2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + length);
    o.connect(g).connect(musicBus);
    o.start(t);
    o.stop(t + length + 0.1);
  }
}

/** Schedules the loop a few seconds ahead at a time, so it keeps going without a long-lived timer per note. */
function startMusic() {
  const c = ctx!;
  // A little echo gives the plucks room, as if played in the open meadow.
  const echo = c.createDelay(1);
  echo.delayTime.value = BEAT * 1.5;
  const feedback = c.createGain();
  feedback.gain.value = 0.3;
  const wet = c.createGain();
  wet.gain.value = 0.35;
  musicBus.connect(echo).connect(feedback).connect(echo);
  echo.connect(wet).connect(master);

  let step = 0;
  let next = c.currentTime + 1;
  const quarter = (TUNE.length / ROOTS.length) * BEAT;
  const schedule = () => {
    while (next < c.currentTime + 3) {
      const i = step % TUNE.length;
      if (i % (TUNE.length / ROOTS.length) === 0) drone(next, note(ROOTS[i / (TUNE.length / ROOTS.length)] - 10), quarter + 1.5);
      const n = TUNE[i];
      if (n !== null) pluck(next, note(n), 0.28 + (i % 4 === 0 ? 0.08 : 0));
      step++;
      next += BEAT;
    }
  };
  schedule();
  clearInterval(musicTimer);
  musicTimer = window.setInterval(schedule, 1000);
}
