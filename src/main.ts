import * as THREE from 'three';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { World } from './world';
import { DEV, mountDevTools, savedQuality } from './devtools';
import { mountMatchControls, savedRivals } from './match';
import { mountMatchTimer } from './matchTimer';
import { mountVersionBadge } from './version';
import { mountHudFade } from './hudFade';
import { mountHelp } from './help';
import { Tutorial } from './tutorial';
import { Character } from './character';
import { TapMarker } from './marker';
import { heightAt } from './noise';
import { tiltShiftShader } from './tiltShift';
import { mergedInHand, recognize, type Point, type ShapeKind } from './gestures';
import { PointerRouter, type GestureEvent } from './pointer';
import { Ink } from './ink';
import { Spells } from './spells';
import { Combat, HERO_INK, type Difficulty } from './combat';
import { Reticle } from './aim';
import type { Kind } from './generator';
import { GLADE } from './look';
import { Bloom } from './glade';
import { t } from './i18n';
import { showMissingSource } from './missing';
import { mountDeviceHint } from './deviceHint';
import { KeyboardMove, groundDir } from './keys';
import { mountKeysHint } from './keysHint';
import { FpsGuard, SETTINGS, TIERS, classify, parseTier, readSignals, type Reason, type Tier } from './quality';
import { mountPad } from './pad';
import { Practice } from './practice';
import { SourceHints } from './sourceHints';
import { mountLeaderboard } from './leaderboard/ui';
import { Runs } from './leaderboard/client';
import { chime, fizzle, inkSound, sound } from './audio';
import { mountSoundButton } from './soundButton';
import { AZIMUTH, FOV, INSET_Y, frameCamera, playAreaFor, tapLimitX, walkable } from './playArea';

// "Bruma" palette: muted, cool blue-green morning light. Glade: warm late-afternoon haze.
const SKY = new THREE.Color(GLADE ? '#e3d6b4' : '#c9d3d1');
const isTouch = matchMedia('(pointer: coarse)').matches;

// No canvas MSAA: the scene is drawn into a multisampled target and only a fullscreen quad reaches the canvas.
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
// Graphics quality follows the hardware (src/quality.ts): ?quality= or the dev panel can force a tier, otherwise the
// device's GPU, cores and memory pick one and a slow frame rate steps it down while playing.
const signals = readSignals(renderer.getContext());
const detected = classify(signals);
const forcedTier = parseTier(new URLSearchParams(location.search).get('quality')) ?? savedQuality();
const quality: { tier: Tier; reason: Reason; auto: boolean; renderer: string; detected: Tier } = {
  tier: forcedTier ?? detected.tier,
  reason: forcedTier ? 'forced' : detected.reason,
  auto: !forcedTier,
  renderer: signals.renderer,
  detected: detected.tier,
};
const initial = SETTINGS[quality.tier];
renderer.setPixelRatio(Math.min(devicePixelRatio, initial.pixelRatio));
renderer.shadowMap.enabled = initial.shadows;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = GLADE ? THREE.ACESFilmicToneMapping : THREE.NeutralToneMapping;
renderer.toneMappingExposure = GLADE ? 0.95 : 1.05;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = SKY;
scene.fog = new THREE.Fog(SKY, 30, 70);

scene.add(GLADE ? new THREE.HemisphereLight('#d9e4f2', '#5a4a2a', 0.85) : new THREE.HemisphereLight('#e4eef0', '#4f5f5a', 1.5));
// Glade's sun is low and golden: longer, softer shadows that model every tuft and stone.
const sun = new THREE.DirectionalLight(GLADE ? '#ffdaa8' : '#f2f4f0', GLADE ? 3.2 : 1.9);
if (GLADE) sun.position.set(11, 9, 3);
else sun.position.set(8, 15, 6);
sun.castShadow = initial.shadows;
// Shadow sharpness is set as world units per shadow texel; fitCamera() sizes the shadow box to what
// the screen shows and the map to match, so a smaller screen footprint means a smaller map, same look.
const SHADOW_TEXEL = 48 / (isTouch ? 1024 : 2048);
let shadowTexel = SHADOW_TEXEL * initial.shadowTexel;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 60;
sun.shadow.bias = -0.0005;
sun.shadow.normalBias = 0.03;
// Same five shadow taps either way; Glade spreads them wider for a soft penumbra.
if (GLADE) sun.shadow.radius = 3.5;
scene.add(sun, sun.target);

const world = new World(scene);
// Pieces go where this screen lets anyone walk; on screens wider than 16:9, inside that frame.
world.area = () => playAreaFor(innerWidth / innerHeight);
world.cover = initial.cover;
const hero = new Character(world.obstacles);
scene.add(hero.root);
const marker = new TapMarker();
const impact = new TapMarker('#ffb35c', 3.5);
scene.add(marker.mesh, impact.mesh);
const ink = new Ink();
const spells = new Spells(world.obstacles);
scene.add(spells.root);

const camera = new THREE.PerspectiveCamera(FOV, 1, 0.5, 200);
/** True when a ground point falls inside the playable part of the screen (the 16:9 frame on wider ones). Rivals obey it too. */
const onScreen = (p: THREE.Vector3) => walkable(new THREE.Vector3(p.x, heightAt(p.x, p.z), p.z).project(camera), camera.aspect);
// Rivals draw fire and water like the player: only from a source on screen, the nearest one.
const findSource = (element: 'fire' | 'water', from: THREE.Vector3) => {
  let best: THREE.Vector3 | null = null;
  for (const f of world.layout.features) {
    if (!SOURCES[element].includes(f.kind)) continue;
    const at = new THREE.Vector3(f.x, heightAt(f.x, f.z), f.z);
    if (!onScreen(at)) continue;
    if (!best || at.distanceToSquared(from) < best.distanceToSquared(from)) best = at;
  }
  return best;
};
/** True when standing inside one of the meadow's rune circles: the plain runes or the circle ringing the crystals. */
const onRunes = (p: THREE.Vector3) =>
  world.layout.features.some(
    (f) => (f.kind === 'runas' || f.kind === 'cristales') && Math.hypot(p.x - f.x, p.z - f.z) <= f.r * 0.85,
  );
const combat = new Combat(hero, world.obstacles, spells, camera, onScreen, findSource, onRunes);
scene.add(combat.root);

/** The one symbol in hand, cast by the next tap. There is no store: a new drawing replaces it. */
let held: ShapeKind | null = null;
function hold(kind: ShapeKind | null) {
  held = kind;
  document.body.classList.toggle('aiming', kind !== null);
  if (!kind) combat.dropped();
}

// How to play: full screen on the first visit, then behind the "?" next to the gear. The match waits while it is open.
const help = mountHelp();
mountSoundButton();
/** Screen pixels of a world point, `lift` world units above it. */
function toScreen(p: THREE.Vector3, lift: number) {
  const q = new THREE.Vector3(p.x, p.y + lift, p.z).project(camera);
  return { x: ((q.x + 1) / 2) * innerWidth, y: ((1 - q.y) / 2) * innerHeight };
}
// The first match walks through the square (attack) and, after the first hit taken, the circle (wall).
const tutorial = new Tutorial({
  covered: () => help.open || dev.open || combat.over,
  foe: () => combat.foe(),
  toScreen: (p, lift) => toScreen(p, lift),
  selected: () => held,
  deselect: () => hold(null),
  hold: (on) => combat.hold(on),
  provoke: () => combat.provoke(),
  ambush: () => combat.ambush(),
  hero: () => hero.root.position,
  walkGoal: () => walkGoal(),
  finished: () => sourceHints.start(),
});
combat.onHeroHit = () => tutorial.hurt();
// The tutorial's meadows have no rune circles: a wall drawn in one would be refused mid-lesson.
world.noRunes = () => !tutorial.done;

/** A clear spot a short walk from the alchemist, on screen and away from props and water, for the walking lesson. */
function walkGoal(): THREE.Vector3 | null {
  const from = hero.root.position;
  const clear = (x: number, z: number) =>
    world.obstacles.every((o) => Math.hypot(x - o.x, z - o.z) > o.r + 0.3) &&
    world.layout.features.every((f) => Math.hypot(x - f.x, z - f.z) > f.r + 0.3);
  // Sideways and towards the camera first: the walk reads best across the screen.
  for (const reach of [1.3, 1, 1.6, 0.8]) {
    // Angles on screen: 0 = right, π/2 = towards the camera (down the screen).
    for (const a of [0.4, Math.PI - 0.4, 0, Math.PI, 0.9, Math.PI - 0.9, -0.5, Math.PI + 0.5]) {
      const right = Math.cos(a) * reach;
      const down = Math.sin(a) * reach;
      const p = new THREE.Vector3(
        from.x + Math.cos(AZIMUTH) * right + Math.sin(AZIMUTH) * down,
        0,
        from.z - Math.sin(AZIMUTH) * right + Math.cos(AZIMUTH) * down,
      );
      p.y = heightAt(p.x, p.z);
      if (onScreen(p) && clear(p.x, p.z)) return p;
    }
  }
  return null;
}

// Fire, then water: the triangle traced over its source after the first match's wall lesson, until each is charged once.
const sourceHints = new SourceHints({
  find: (element) => findSource(element, hero.root.position),
  toScreen,
  // Waits for the tutorial's card to fade, so the demo is never under it and comes one thing at a time.
  covered: () => help.open || dev.open || board.open || combat.over || !tutorial.done || tutorial.showing,
});

// Training meadows always have a campfire and a lagoon, so fire and water can be practised on the scarecrow; so do
// the first matches, for the fire and water hints that follow the tutorial.
// The first meadow is built before the HUD restores the match, so it reads the saved setting.
let hudReady = false;
world.requiredBy = () =>
  (hudReady ? combat.rivalCount : savedRivals()) === 0 ? 'training' : !tutorial.done || sourceHints.active ? 'onboarding' : null;
world.required = () => (world.requiredBy() ? ['fogata', 'estanque'] : []);

// A new meadow puts the alchemist back at the spawn point, which every layout keeps clear.
const dev = mountDevTools(
  world,
  () => {
    hold(null);
    spells.clear();
    hero.root.position.set(0, heightAt(0, 0), 0);
    hero.setTarget(hero.root.position);
    combat.respawn();
    tutorial.reset();
  },
  {
    get state() {
      return quality;
    },
    // null = back to automatic: the detected tier, with the frame-rate step-down on again.
    set: (tier: Tier | null) => {
      quality.auto = tier === null;
      setQuality(tier ?? quality.detected, tier ? 'forced' : detected.reason);
    },
  },
);
if (DEV) mountVersionBadge();

// Rivals and difficulty live in the HUD, bottom left; any change restarts the match, and every new match is a new meadow.
const matchHud = mountMatchControls({
  get rivals() {
    return combat.rivalCount;
  },
  get difficulty() {
    return combat.difficulty;
  },
  setRivals: (n: number) => {
    spells.clear();
    combat.setRivals(n);
  },
  setDifficulty: (d: Difficulty) => {
    spells.clear();
    combat.setDifficulty(d);
  },
  restart: () => dev.newMeadow(),
});
hudReady = true;
// The running time of a real match (not training, not the tutorial's match), stopped when it is decided. The tutorial's
// whole match stays untimed, even after its last lesson: its notes take the timer's spot on phones.
let tutorialMatch = !tutorial.done;
const matchTimer = mountMatchTimer({
  get elapsedMs() {
    return combat.elapsedMs;
  },
  get timed() {
    return combat.rivalCount > 0 && tutorial.done && !tutorialMatch;
  },
  get over() {
    return combat.over;
  },
});
// Global ranking: a won match against rivals counts, once the tutorial is behind and outside dev mode.
const board = mountLeaderboard();
const runs = new Runs();
// The HUD steps back while the player is busy in the meadow (src/hudFade.ts).
const hudFade = mountHudFade({
  get playing() {
    return tutorial.done && !combat.over && !help.open && !dev.open && !board.open;
  },
});
// Decided when the match starts: the tutorial finishes during its own match, and that match never counts.
let rankedMatch = false;
combat.onStart = () => {
  hudFade.reset();
  tutorialMatch = !tutorial.done;
  rankedMatch = combat.rivalCount > 0 && tutorial.done && !DEV;
  runs.start(combat.rivalCount, combat.difficulty, world.layout.seed, rankedMatch);
};
combat.onEnd = (outcome) => {
  const match = { rivals: combat.rivalCount, difficulty: combat.difficulty, durationMs: combat.elapsedMs, damage: combat.heroDamage };
  matchHud.showEnd(outcome);
  // Score, initials and sharing only where the score can be saved.
  if (outcome === 'victory' && rankedMatch) board.fillEnd(matchHud.scoreSlot, runs, match, snapshotMeadow());
};
// Training (no rivals): a scarecrow to hit in the middle, and a card of the attacks to try on it.
const practice = new Practice();
combat.onDummyHit = (element, boosted) => practice.hit(element, boosted);

// Miniature look: the classic two-pass tilt-shift blur, focused on the alchemist's row.
// Scene (MSAA, linear HDR) -> horizontal blur -> vertical blur straight to the canvas, which also tone maps.
const sceneTarget = new THREE.WebGLRenderTarget(1, 1, { samples: initial.samples, type: THREE.HalfFloatType });
const blurTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
const hBlur = new THREE.ShaderMaterial(tiltShiftShader('horizontal'));
const vBlur = new THREE.ShaderMaterial(tiltShiftShader('vertical'));
// Glade grades the final pass and adds a soft bloom of the sunlit highlights.
const bloom = GLADE ? new Bloom(FullScreenQuad) : null;
if (bloom) {
  vBlur.defines.GRADE = '';
  vBlur.defines.BLOOM = '';
  vBlur.uniforms.tBloom = { value: bloom.texture };
}
const hQuad = new FullScreenQuad(hBlur);
const vQuad = new FullScreenQuad(vBlur);
const BLUR_STRENGTH = vBlur.uniforms.strength.value;

// The share card shows the meadow the match was won in: a square around the alchemist, copied from the
// canvas right after a frame is drawn (the drawing buffer is not kept, so it must be read in that same task).
let snapWanted: ((shot: HTMLCanvasElement | null) => void) | null = null;
function snapshotMeadow(): Promise<HTMLCanvasElement | null> {
  return new Promise((resolve) => (snapWanted = resolve));
}
function takeSnapshot() {
  const src = renderer.domElement;
  const side = Math.round(Math.min(src.width, src.height) * 0.75); // a little closer than the screen, so the figures read
  if (!side) return null;
  const at = hero.root.position.clone().project(camera);
  const cx = THREE.MathUtils.clamp(((at.x + 1) / 2) * src.width, side / 2, src.width - side / 2);
  const cy = THREE.MathUtils.clamp(((1 - at.y) / 2) * src.height, side / 2, src.height - side / 2);
  const out = document.createElement('canvas');
  out.width = out.height = Math.min(side, 900);
  try {
    out.getContext('2d')!.drawImage(src, cx - side / 2, cy - side / 2, side, side, 0, 0, out.width, out.height);
    return out;
  } catch {
    return null;
  }
}
// The toggle says what the player wants; the low tier turns the blur off regardless.
let tiltWanted = true;
let tiltShift = initial.tiltShift;
let focusY = 0.5;

const tiltButton = document.getElementById('tilt') as HTMLButtonElement;
tiltButton.textContent = t.tilt(tiltShift);
tiltButton.addEventListener('click', (e) => {
  e.stopPropagation();
  tiltWanted = !tiltShift;
  tiltShift = tiltWanted;
  tiltButton.textContent = t.tilt(tiltShift);
});
tiltButton.addEventListener('pointerdown', (e) => e.stopPropagation());

// The size the drawing buffers were last fitted to. iOS (Safari, Brave) can fire 'resize' while the page is half
// hidden (tab overview, share sheet, app switch) with a shrunken viewport, and sometimes never fires the one that
// restores it: the canvas then stays stretched from a half-size buffer, so the next match looks blurry and low-res.
// The frame loop compares against the canvas's real size every frame and refits when they drift apart.
let fitted = { w: 0, h: 0, ratio: 0 };
const screenSize = () => ({
  w: renderer.domElement.clientWidth || innerWidth,
  h: renderer.domElement.clientHeight || innerHeight,
});

function fitCamera() {
  const { w, h } = screenSize();
  fitted = { w, h, ratio: renderer.getPixelRatio() };
  const distance = frameCamera(camera, w / h);
  const fog = scene.fog as THREE.Fog;
  fog.near = distance * 1.2;
  fog.far = distance * 2.8;

  renderer.setSize(w, h, false);
  const bufferW = Math.floor(w * renderer.getPixelRatio());
  const bufferH = Math.floor(h * renderer.getPixelRatio());
  sceneTarget.setSize(bufferW, bufferH);
  blurTarget.setSize(bufferW, bufferH);
  bloom?.setSize(bufferW, bufferH);
  hBlur.uniforms.texel.value.set(1 / bufferW, 0);
  vBlur.uniforms.texel.value.set(0, 1 / bufferH);

  fitShadow();
  keepHeroOnScreen();
}

/** Shadow box just big enough for the ground the screen shows (plus terrain relief), at a fixed texel size. */
function fitShadow() {
  let reach = 0;
  for (let i = 0; i <= 8; i++) {
    const t = i / 4 - 1;
    for (const [x, y] of [[t, -1], [t, 1], [-1, t], [1, t]]) {
      ndc.set(x, y);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(groundPlane.set(groundPlane.normal, 0), hit)) reach = Math.max(reach, Math.hypot(hit.x, hit.z));
    }
  }
  const half = Math.min(reach + 2, 24);
  const shadowCam = sun.shadow.camera;
  shadowCam.left = shadowCam.bottom = -half;
  shadowCam.right = shadowCam.top = half;
  shadowCam.updateProjectionMatrix();
  const size = Math.ceil((2 * half) / shadowTexel);
  if (size !== sun.shadow.mapSize.x) {
    sun.shadow.mapSize.setScalar(size);
    sun.shadow.map?.dispose();
    sun.shadow.map = null;
  }
}

const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const hit = new THREE.Vector3();

/** Screen point (NDC) to a point on the terrain, refining against the height field. */
function groundFromNdc(x: number, y: number, out: THREE.Vector3): boolean {
  const limitX = tapLimitX(camera.aspect);
  ndc.set(THREE.MathUtils.clamp(x, -limitX, limitX), THREE.MathUtils.clamp(y, -INSET_Y, INSET_Y));
  raycaster.setFromCamera(ndc, camera);
  groundPlane.constant = 0;
  for (let i = 0; i < 3; i++) {
    if (!raycaster.ray.intersectPlane(groundPlane, out)) return false;
    groundPlane.constant = -heightAt(out.x, out.z);
  }
  return true;
}

function keepHeroOnScreen() {
  const p = hero.root.position.clone().project(camera);
  if (Math.abs(p.x) > tapLimitX(camera.aspect) || Math.abs(p.y) > INSET_Y) {
    if (groundFromNdc(p.x, p.y, hit)) {
      hero.root.position.copy(hit);
      hero.setTarget(hit);
    }
  }
}

// Where fire and water can be drawn from: campfires burn, ponds hold water.
const SOURCES: Record<'fire' | 'water', Kind[]> = { fire: ['fogata'], water: ['estanque'] };
const SOURCE_MARGIN = 0.3; // taps this close to a source's edge still count

/** The centre of the fire or water source under a tapped point, or null if there is none. */
function sourceAt(point: THREE.Vector3, element: 'fire' | 'water'): THREE.Vector3 | null {
  for (const f of world.layout.features) {
    if (!SOURCES[element].includes(f.kind)) continue;
    if (Math.hypot(point.x - f.x, point.z - f.z) <= f.r + SOURCE_MARGIN) return new THREE.Vector3(f.x, heightAt(f.x, f.z), f.z);
  }
  return null;
}

/** Screen pixels to the ground point under them. */
function groundAt(clientX: number, clientY: number, out: THREE.Vector3) {
  return groundFromNdc((clientX / innerWidth) * 2 - 1, -(clientY / innerHeight) * 2 + 1, out);
}

const elementOf = (kind: ShapeKind) => (kind === 'triangle' ? 'fire' : kind === 'triangleDown' ? 'water' : null);

/**
 * Casts a shape at a ground point: circle = earth wall around the alchemist, square = pillars at that spot,
 * pentagram = five short earth columns around that spot, rhombus = heal the alchemist, triangles = fire / water,
 * hourglass (both triangles merged) = blast, fire / water star (the star merged with a triangle) = five flame bursts /
 * water spouts around that spot, spiral = vine that roots whoever it catches there for 2 s.
 */
function castShape(kind: ShapeKind, at: THREE.Vector3, sure = false) {
  const element = elementOf(kind);
  hero.face(at);
  hero.cast();
  if (kind === 'circle') combat.wall(at);
  else if (kind === 'square') combat.cast(at, 'earth', sure);
  else if (kind === 'pentagram') combat.cast(at, 'columns');
  else if (kind === 'rhombus') combat.heal();
  else if (kind === 'hourglass') combat.cast(at, 'blast');
  else if (kind === 'fireStar' || kind === 'waterStar') combat.cast(at, kind);
  else if (kind === 'spiral') combat.cast(at, 'vine');
  else if (element) combat.cast(at, element);
  else impact.show(at.x, at.z);
}

const HERO_TAP = 30; // px: a tap this close to the alchemist (and nearer it than any rival) drops the shape in hand
// A tap on a fighter's body means that fighter: the strike goes to its feet, a little ahead if it is walking, rather
// than to the ground the tap happens to cover (behind its feet, since the body stands up out of the ground).
const BODY_TOP = 0.75; // world units: head height of a fighter, for its silhouette on screen
const BODY_SLACK = 16; // px of forgiveness around the silhouette
const LEAD = 0.25; // s: about the ground's warning before a strike erupts
// A mouse is precise, so on desktop the help is a quiet pull instead of a lock: only over the body itself, and only
// part of the way from the pointed ground to the feet ahead, so the reticle drifts a little rather than jumping.
const MOUSE_SLACK = 6; // px
const MOUSE_PULL = 0.65; // share of the way to the snapped point, inside the silhouette
let usingMouse = false;
const snapAhead = new THREE.Vector3();
const pointed = new THREE.Vector3();

/** px from (x, y) to a fighter's silhouette on screen (0 inside it): a thick segment from its feet to its head. */
function toBody(p: THREE.Vector3, x: number, y: number) {
  const feet = toScreen(p, 0);
  const head = toScreen(p, BODY_TOP);
  const half = Math.max(14, (feet.y - head.y) * 0.3);
  const t = THREE.MathUtils.clamp((y - head.y) / Math.max(1, feet.y - head.y), 0, 1);
  const cx = head.x + (feet.x - head.x) * t;
  const cy = head.y + (feet.y - head.y) * t;
  return Math.max(0, Math.hypot(x - cx, y - cy) - half);
}

/** The ground point to strike when the tap lands on a rival (or the scarecrow): where it will stand by the eruption. */
function snapToTarget(x: number, y: number, out: THREE.Vector3): boolean {
  let best = usingMouse ? MOUSE_SLACK : BODY_SLACK;
  let found = false;
  for (const target of combat.targets()) {
    const d = toBody(target.at, x, y);
    if (d > best) continue;
    best = d;
    target.ahead(LEAD, out);
    out.y = heightAt(out.x, out.z);
    found = true;
  }
  if (found && usingMouse && groundAt(x, y, pointed)) {
    const pull = MOUSE_PULL * (1 - best / MOUSE_SLACK);
    out.lerp(pointed, 1 - pull);
    out.y = heightAt(out.x, out.z);
  }
  return found;
}

/** Walks there and nothing else, whatever is in hand (a tap made with a second finger while drawing). */
function walkTo(clientX: number, clientY: number) {
  if (combat.over || tutorial.aim() || !groundAt(clientX, clientY, hit)) return;
  hero.setTarget(hit);
  if (!hero.rooted) marker.show(hero.target.x, hero.target.z); // held by a vine, it goes nowhere
}

/** A quick tap walks there, or casts the shape in hand there. */
function tapAt(clientX: number, clientY: number) {
  if (combat.over) return;
  if (!groundAt(clientX, clientY, hit)) return;
  // During the tutorial the tap snaps onto the rival, so the first strike (and the wall's facing) cannot go wrong.
  const lesson = tutorial.aim();
  if (lesson) {
    hit.copy(lesson);
    hero.setTarget(hero.root.position); // and the alchemist stays put inside its wall
  }
  if (held) {
    if (!lesson) {
      if (snapToTarget(clientX, clientY, snapAhead)) hit.copy(snapAhead);
      else {
        const self = toScreen(hero.root.position, 0.3);
        if (Math.hypot(clientX - self.x, clientY - self.y) < HERO_TAP) {
          hold(null);
          return;
        }
      }
    }
    const kind = held;
    hold(null);
    castShape(kind, hit, lesson !== null);
    tutorial.cast();
    return;
  }
  hero.setTarget(hit);
  if (!hero.rooted) marker.show(hero.target.x, hero.target.z); // held by a vine, it goes nowhere
}

/**
 * A recognized stroke. Only one symbol at a time: whatever was in hand is dropped. Circles and rhombi need no
 * target, so they go off at once (the wall faces the nearest rival). Everything else is held in hand for the next
 * tap. A triangle must be drawn over its source and comes charged; drawn anywhere else it is refused (false), the
 * missing source is flashed there, and the shape already in hand stays. A circle drawn inside a rune circle is refused
 * the same way. A charged triangle drawn while the other one is in hand (fire then water, or water then fire) does not
 * replace it: the two merge into an hourglass, the blast. The star and a charged triangle merge the same way, in
 * either order, into a fire or water star.
 */
function useDrawn(kind: ShapeKind, cx: number, cy: number) {
  const drawnAt = new THREE.Vector3();
  if (!groundAt(cx, cy, drawnAt)) drawnAt.copy(hero.root.position);
  // No walls inside a rune circle: hiding behind one there while casting boosted strikes would be too strong.
  if (kind === 'circle' && !tutorial.aim() && onRunes(hero.root.position)) {
    showMissingSource('wall', cx, cy);
    return false;
  }
  if (kind === 'circle' || kind === 'rhombus') {
    hold(null);
    if (tutorial.aim()) hero.setTarget(hero.root.position); // the lesson's wall must keep the alchemist inside
    castShape(kind, combat.foe() ?? combat.dummy() ?? drawnAt);
    tutorial.cast();
    return true;
  }
  const element = elementOf(kind);
  if (element && !sourceAt(drawnAt, element)) {
    showMissingSource(element, cx, cy);
    return false;
  }
  hold(mergedInHand(held, kind));
  const source = element && sourceAt(drawnAt, element);
  if (source) {
    hero.face(source);
    spells.channel(source, hero.root.position, element);
    if (sourceHints.charged(element)) {
      // The last one also tells what the two make together.
      tutorial.note(t.sources[element][0], sourceHints.active ? t.sources[element][1] : t.sources.both);
    }
  }
  return true;
}

// A short press is a tap, anything that travels further is a drawing; a second finger can tap to walk while the
// first one draws (src/pointer.ts).
const canvas = renderer.domElement;
const router = new PointerRouter(() => tutorial.canDraw);
// Phones and tablets: a faint stick at the bottom left. A finger resting there walks; quick taps and strokes on it
// still go to the router, so it never blocks casting or drawing (src/pad.ts).
const pad = mountPad();
const sample = (e: PointerEvent) => ({ id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, primary: e.isPrimary });

let penAt = { x: 0, y: 0, t: 0 };

function onGesture(g: GestureEvent) {
  if (g.type === 'tap') {
    if (!tutorial.canTap) return;
    if (g.second) walkTo(g.x, g.y);
    else tapAt(g.x, g.y);
  } else if (g.type === 'drawStart') {
    ink.begin(g.points);
    inkSound.begin();
    for (const p of g.points) hudFade.stroke(p.x, p.y);
    penAt = { ...g.points[g.points.length - 1], t: performance.now() };
  } else if (g.type === 'drawPoint') {
    ink.add(g.point);
    hudFade.stroke(g.point.x, g.point.y);
    const now = performance.now();
    const dt = Math.max(1, now - penAt.t) / 1000;
    inkSound.move(Math.hypot(g.point.x - penAt.x, g.point.y - penAt.y) / dt);
    penAt = { ...g.point, t: now };
  } else if (g.type === 'drawCancel') {
    ink.end(null);
    inkSound.end();
  } else {
    inkSound.end();
    finishStroke(g.stroke, g.tapLike);
  }
}

function finishStroke(stroke: Point[], tapLike: boolean) {
  const shape = recognize(stroke);
  if (!tutorial.drawn(shape?.kind ?? null)) {
    ink.end(null);
    return;
  }
  if (shape) {
    if (useDrawn(shape.kind, shape.cx, shape.cy)) {
      chime(shape.kind);
      ink.end(shape);
      // What ends up in hand can differ from what was drawn: a merge (hourglass, fire or water star).
      combat.stored(held ?? shape.kind, held !== null);
    } else {
      ink.end(null);
      fizzle();
    }
    return;
  }
  ink.end(null);
  if (!tapLike) fizzle();
  // A fingertip that rolled a little past the draw threshold made no shape: it was a tap, so walk (or cast) there.
  if (tapLike && tutorial.canTap) tapAt(stroke[0].x, stroke[0].y);
}

canvas.addEventListener('pointerdown', (e) => {
  // Once the match is decided (or the alchemist lies fallen) there is nothing left to draw or walk to.
  if (combat.over) return;
  // Stops the browser from starting a text selection or drag that would follow the stroke across the HUD.
  e.preventDefault();
  usingMouse = e.pointerType === 'mouse';
  hudFade.played();
  const onPad = e.pointerType !== 'mouse' && pad.down(e.pointerId, e.clientX, e.clientY, performance.now());
  if (router.down(sample(e), onGesture) || onPad) canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (pad.move(e.pointerId, e.clientX, e.clientY)) return;
  // Coalesced events keep the line smooth when the browser batches touch input per frame.
  const events = e.getCoalescedEvents?.() ?? [];
  router.move((events.length ? events : [e]).map(sample), onGesture);
});
canvas.addEventListener('pointerup', (e) => {
  if (!pad.up(e.pointerId)) router.up(sample(e), onGesture);
});

// Desktop aim: while a strike is in hand, a faint circle under the mouse shows the ground it would hit there.
const reticle = new Reticle(HERO_INK);
scene.add(reticle.root);
const mouse = { x: 0, y: 0, over: false };
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse') return;
  usingMouse = true;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.over = true;
});
canvas.addEventListener('pointerleave', (e) => {
  if (e.pointerType === 'mouse') mouse.over = false;
});
const aimAt = new THREE.Vector3();
const aimShown = new THREE.Vector3();
let aimVisible = false;

/** Each frame: the reticle follows the mouse (or the tutorial's rival, where the tap snaps) and the alchemist's runes. */
function aimReticle(dt: number) {
  const free = held && mouse.over && !combat.over && !router.isDrawing && !help.open && !dev.open;
  const lesson = free ? tutorial.aim() : null;
  if (!free || !(lesson ? aimAt.copy(lesson) : snapToTarget(mouse.x, mouse.y, aimAt) || groundAt(mouse.x, mouse.y, aimAt))) {
    reticle.hide();
    aimVisible = false;
    return;
  }
  // Glides to where it points instead of hopping, so the pull onto a rival reads as the hand's own aim.
  if (aimVisible) aimShown.lerp(aimAt, 1 - Math.exp(-dt * 22));
  else aimShown.copy(aimAt);
  aimVisible = true;
  reticle.show(held, aimShown, onRunes(hero.root.position), dt);
}
const dropPointer = (e: PointerEvent) => {
  pad.up(e.pointerId);
  router.cancel(e.pointerId, onGesture);
};
canvas.addEventListener('pointercancel', dropPointer);
// iOS can drop a touch without pointerup or pointercancel; losing the capture still tells us it ended.
canvas.addEventListener('lostpointercapture', dropPointer);
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

// Native gestures (selection, long-press menu, image drag, iOS pinch) are never wanted outside text fields.
const isTextField = (t: EventTarget | null) => t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement;
for (const type of ['selectstart', 'dragstart', 'contextmenu']) {
  document.addEventListener(type, (e) => {
    if (!isTextField(e.target)) e.preventDefault();
  });
}
document.addEventListener('gesturestart', (e) => e.preventDefault());
// iOS ignores touch-action inside in-app browser sheets and hands an unclaimed drag to the sheet (dismiss/move) or
// the page scroller. Claiming every touch on the canvas, and any drag outside a scrollable panel, keeps strokes ours.
const claimTouch = (e: TouchEvent) => e.cancelable && e.preventDefault();
canvas.addEventListener('touchstart', claimTouch, { passive: false });
canvas.addEventListener('touchmove', claimTouch, { passive: false });
const canScroll = (t: EventTarget | null) => {
  for (let el = t instanceof Element ? t : null; el; el = el.parentElement) {
    const style = getComputedStyle(el);
    if (el.scrollHeight > el.clientHeight && /auto|scroll/.test(style.overflowY)) return true;
    if (el.scrollWidth > el.clientWidth && /auto|scroll/.test(style.overflowX)) return true;
  }
  return false;
};
document.addEventListener('touchmove', (e) => !canScroll(e.target) && claimTouch(e), { passive: false });

// Desktop: WASD or the arrows walk the alchemist relative to the screen; the mouse stays free to draw and aim.
// Clicking the ground still walks too, so both work and a held key simply takes over from a click.
const keys = new KeyboardMove();
const keysHint = mountKeysHint();
keys.onChange = (key, down, code) => keysHint.press(key, down, code);
// Mouse-only screens hear once that the game is on phones too, queued after the tutorial and the WASD keycaps so
// notes come one at a time; sideways phones get a quiet note to turn upright.
mountDeviceHint(
  () =>
    tutorial.done &&
    !tutorial.showing &&
    keysHint.settled() &&
    !help.open &&
    !dev.open &&
    !board.open &&
    !combat.over &&
    document.getElementById('match-spot')?.hidden !== false,
);
keys.listen(window, () => help.open || dev.open);
const lookAlong = new THREE.Vector3();
const ahead = new THREE.Vector3();
let steering = false;

/** Each frame: walk along the held keys, sliding along the screen's edge instead of leaving it. */
function steerHero() {
  // A press that turns into the stick stops being a tap or a drawing: its ink (a short flick) is dropped.
  pad.update(performance.now(), (id) => router.cancel(id, onGesture));
  const k = keys.axes();
  const a = k.x || k.y ? k : pad.axes();
  const free = !combat.over && tutorial.canTap && !tutorial.aim();
  if ((!a.x && !a.y) || !free) {
    if (steering) hero.halt();
    steering = false;
    return;
  }
  camera.getWorldDirection(lookAlong);
  const pos = hero.root.position;
  const inside = onScreen(pos);
  // Try the full direction, then each of its screen axes alone, so a diagonal into an edge slides along it.
  for (const c of [a, { x: a.x, y: 0 }, { x: 0, y: a.y }]) {
    if (!c.x && !c.y) continue;
    const d = groundDir(c, lookAlong.x, lookAlong.z);
    ahead.set(pos.x + d.x * 0.15, 0, pos.z + d.z * 0.15);
    if (inside && !onScreen(ahead)) continue;
    hero.steer(d.x, d.z);
    steering = true;
    hudFade.played();
    return;
  }
  if (steering) hero.halt();
  steering = false;
}

/** Switches the graphics tier mid-game: resolution, antialiasing, shadows, miniature blur and grass density. */
function setQuality(tier: Tier, reason: Reason) {
  const s = SETTINGS[tier];
  quality.tier = tier;
  quality.reason = reason;
  renderer.setPixelRatio(Math.min(devicePixelRatio, s.pixelRatio));
  if (sceneTarget.samples !== s.samples) {
    sceneTarget.samples = s.samples;
    sceneTarget.dispose(); // rebuilt with the new sample count on the next render
  }
  // Toggling the light's shadow recompiles the materials once; the disabled map stops the shadow pass entirely.
  renderer.shadowMap.enabled = sun.castShadow = s.shadows;
  if (!s.shadows) {
    sun.shadow.map?.dispose();
    sun.shadow.map = null;
  }
  shadowTexel = SHADOW_TEXEL * s.shadowTexel;
  tiltShift = s.tiltShift && tiltWanted;
  tiltButton.textContent = t.tilt(tiltShift);
  world.setCover(s.cover);
  fitCamera();
  fpsGuard.reset();
  dev.qualityChanged();
}
const fpsGuard = new FpsGuard();

addEventListener('resize', fitCamera);
visualViewport?.addEventListener('resize', fitCamera);
addEventListener('pageshow', fitCamera);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) fitCamera();
});
fitCamera();
function refitIfStale() {
  const { w, h } = screenSize();
  if (w !== fitted.w || h !== fitted.h || renderer.getPixelRatio() !== fitted.ratio) fitCamera();
}
// Rivals need the real framing to land on screen.
combat.respawn();

const fpsLabel = document.getElementById('fps')!;
let frames = 0;
let fpsTime = 0;
const clock = new THREE.Timer();
const projected = new THREE.Vector3();

let lastFrame = 0;

// Sounds sit where they happen: panned by their place on screen, quieter the farther they are from the alchemist.
const heard = new THREE.Vector3();
sound.locator = (at) => {
  heard.set(at.x, heightAt(at.x, at.z), at.z).project(camera);
  const d = Math.hypot(at.x - hero.root.position.x, at.z - hero.root.position.z);
  return { pan: heard.x, near: 1 / (1 + d * 0.18) };
};

renderer.setAnimationLoop((time) => {
  clock.update(time);
  refitIfStale();
  // Too slow for this tier on this device: one step down, then a few seconds to settle before judging again.
  const real = lastFrame ? (time - lastFrame) / 1000 : 0;
  lastFrame = time;
  const idx = TIERS.indexOf(quality.tier);
  if (quality.auto && !document.hidden && idx < TIERS.length - 1 && fpsGuard.tick(real)) setQuality(TIERS[idx + 1], 'fps');
  const dt = Math.min(clock.getDelta(), 1 / 20);
  if (!dev.open) world.update(dt);
  world.fadeTrees(dt, combat.positions());
  tutorial.update(dt);
  if (!help.open && !dev.open && !board.open && !tutorial.paused) {
    steerHero();
    hero.update(dt);
    marker.update(dt);
    impact.update(dt);
    spells.update(dt);
    combat.update(dt);
  }
  practice.set(combat.rivalCount === 0);
  matchTimer.update();
  hudFade.update();
  sourceHints.update(dt);
  aimReticle(dt);
  ink.update(dt);

  renderer.setRenderTarget(sceneTarget);
  renderer.render(scene, camera);
  bloom?.render(renderer, sceneTarget.texture);
  if (tiltShift) {
    projected.copy(hero.root.position).project(camera);
    focusY += ((projected.y + 1) / 2 - focusY) * Math.min(1, dt * 4);
    hBlur.uniforms.focus.value = vBlur.uniforms.focus.value = focusY;
    hBlur.uniforms.tDiffuse.value = sceneTarget.texture;
    renderer.setRenderTarget(blurTarget);
    hQuad.render(renderer);
  }
  // With the miniature off the vertical pass still runs at strength 0: a plain copy that tone maps.
  vBlur.uniforms.strength.value = tiltShift ? BLUR_STRENGTH : 0;
  vBlur.uniforms.tDiffuse.value = tiltShift ? blurTarget.texture : sceneTarget.texture;
  renderer.setRenderTarget(null);
  vQuad.render(renderer);
  if (snapWanted) {
    snapWanted(takeSnapshot());
    snapWanted = null;
  }

  frames++;
  fpsTime += dt;
  if (fpsTime >= 0.5) {
    fpsLabel.textContent = `${Math.round(frames / fpsTime)} fps`;
    frames = 0;
    fpsTime = 0;
  }
});
