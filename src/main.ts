import * as THREE from 'three';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { World } from './world';
import { mountDevTools } from './devtools';
import { mountMatchControls } from './match';
import { mountHelp } from './help';
import { Tutorial } from './tutorial';
import { Character } from './character';
import { TapMarker } from './marker';
import { heightAt } from './noise';
import { tiltShiftShader } from './tiltShift';
import { recognize, type Point, type ShapeKind } from './gestures';
import { Ink } from './ink';
import { AmmoBar } from './ammo';
import { Spells } from './spells';
import { Combat, type Difficulty } from './combat';
import type { Kind } from './generator';
import { GLADE } from './look';
import { Bloom } from './glade';
import { t } from './i18n';
import { showMissingSource } from './missing';

// Camera framing: a raised three-quarter view, deliberately softer than true isometric.
const FOV = 32;
const ELEVATION = THREE.MathUtils.degToRad(54);
const AZIMUTH = THREE.MathUtils.degToRad(24);
const VIEW_HEIGHT_LANDSCAPE = 6.5; // world units visible vertically on wide screens
const VIEW_WIDTH_PORTRAIT = 5.4; // world units visible horizontally on tall screens
// Taps are clamped to this fraction of the screen so the alchemist never walks off the edge.
const INSET_X = 0.9;
const INSET_Y = 0.82;

// "Bruma" palette: muted, cool blue-green morning light. Glade: warm late-afternoon haze.
const SKY = new THREE.Color(GLADE ? '#e3d6b4' : '#c9d3d1');
const isTouch = matchMedia('(pointer: coarse)').matches;

// No canvas MSAA: the scene is drawn into a multisampled target and only a fullscreen quad reaches the canvas.
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
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
sun.castShadow = true;
// Shadow sharpness is set as world units per shadow texel; fitCamera() sizes the shadow box to what
// the screen shows and the map to match, so a smaller screen footprint means a smaller map, same look.
const SHADOW_TEXEL = 48 / (isTouch ? 1024 : 2048);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 60;
sun.shadow.bias = -0.0005;
sun.shadow.normalBias = 0.03;
// Same five shadow taps either way; Glade spreads them wider for a soft penumbra.
if (GLADE) sun.shadow.radius = 3.5;
scene.add(sun, sun.target);

const world = new World(scene);
const hero = new Character(world.obstacles);
scene.add(hero.root);
const marker = new TapMarker();
const impact = new TapMarker('#ffb35c', 3.5);
scene.add(marker.mesh, impact.mesh);
const ink = new Ink();
const ammo = new AmmoBar();
const spells = new Spells(world.obstacles);
scene.add(spells.root);

const camera = new THREE.PerspectiveCamera(FOV, 1, 0.5, 200);
/** True when a ground point falls inside the playable part of the screen. */
const onScreen = (p: THREE.Vector3) => {
  const q = new THREE.Vector3(p.x, heightAt(p.x, p.z), p.z).project(camera);
  return Math.abs(q.x) < INSET_X * 0.92 && Math.abs(q.y) < INSET_Y * 0.92;
};
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

// How to play: full screen on the first visit, then behind the "?" next to the gear. The match waits while it is open.
const help = mountHelp();
// The first match walks through the square (attack) and, after the first hit taken, the circle (wall).
const tutorial = new Tutorial({
  covered: () => help.open || dev.open || combat.over,
  foe: () => combat.foe(),
  toScreen: (p, lift) => {
    const q = new THREE.Vector3(p.x, p.y + lift, p.z).project(camera);
    return { x: ((q.x + 1) / 2) * innerWidth, y: ((1 - q.y) / 2) * innerHeight };
  },
  slot: (kind) => ammo.slotOf(kind),
  selected: () => ammo.selection()?.kind ?? null,
  deselect: () => ammo.select(null),
  hold: (on) => combat.hold(on),
  provoke: () => combat.provoke(),
});
combat.onHeroHit = () => tutorial.hurt();

// A new meadow puts the alchemist back at the spawn point, which every layout keeps clear.
const dev = mountDevTools(
  world,
  () => {
    spells.clear();
    hero.root.position.set(0, heightAt(0, 0), 0);
    hero.setTarget(hero.root.position);
    combat.respawn();
    tutorial.reset();
  },
);

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
  restart: () => {
    ammo.clear();
    dev.newMeadow();
  },
});
combat.onEnd = (outcome) => matchHud.showEnd(outcome);

// Miniature look: the classic two-pass tilt-shift blur, focused on the alchemist's row.
// Scene (MSAA, linear HDR) -> horizontal blur -> vertical blur straight to the canvas, which also tone maps.
const sceneTarget = new THREE.WebGLRenderTarget(1, 1, { samples: 4, type: THREE.HalfFloatType });
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
let tiltShift = true;
let focusY = 0.5;

const tiltButton = document.getElementById('tilt') as HTMLButtonElement;
tiltButton.textContent = t.tilt(tiltShift);
tiltButton.addEventListener('click', (e) => {
  e.stopPropagation();
  tiltShift = !tiltShift;
  tiltButton.textContent = t.tilt(tiltShift);
});
tiltButton.addEventListener('pointerdown', (e) => e.stopPropagation());

function fitCamera() {
  const w = innerWidth;
  const h = innerHeight;
  const aspect = w / h;
  camera.aspect = aspect;
  const viewHeight = Math.max(VIEW_HEIGHT_LANDSCAPE, VIEW_WIDTH_PORTRAIT / aspect);
  const distance = viewHeight / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
  camera.position.set(
    Math.sin(AZIMUTH) * Math.cos(ELEVATION) * distance,
    Math.sin(ELEVATION) * distance,
    Math.cos(AZIMUTH) * Math.cos(ELEVATION) * distance,
  );
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
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
  const size = Math.ceil((2 * half) / SHADOW_TEXEL);
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
  ndc.set(THREE.MathUtils.clamp(x, -INSET_X, INSET_X), THREE.MathUtils.clamp(y, -INSET_Y, INSET_Y));
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
  if (Math.abs(p.x) > INSET_X || Math.abs(p.y) > INSET_Y) {
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
 * pentagram = five short earth columns around that spot, rhombus = heal the alchemist, triangles = fire / water.
 */
function castShape(kind: ShapeKind, at: THREE.Vector3, sure = false) {
  const element = elementOf(kind);
  hero.face(at);
  hero.cast();
  if (kind === 'circle') combat.wall(at);
  else if (kind === 'square') combat.cast(at, 'earth', sure);
  else if (kind === 'pentagram') combat.cast(at, 'columns');
  else if (kind === 'rhombus') combat.heal();
  else if (element) combat.cast(at, element);
  else impact.show(at.x, at.z);
}

/** Draws fire or water into the selected triangle from the source under a ground point. False if there is none. */
function chargeAt(at: THREE.Vector3, element: 'fire' | 'water') {
  const source = sourceAt(at, element);
  if (!source) return false;
  ammo.charge();
  hero.face(source);
  spells.channel(source, hero.root.position, element);
  return true;
}

const HERO_TAP = 48; // px: a tap this close to the alchemist puts the shape in hand back in the bar

/** A quick tap walks there, or uses the selected shape: triangles are first charged from a source, then cast. */
function tapAt(clientX: number, clientY: number) {
  if (combat.over) return;
  if (!groundAt(clientX, clientY, hit)) return;
  // During the tutorial the tap snaps onto the rival, so the first strike (and the wall's facing) cannot go wrong.
  const lesson = tutorial.aim();
  if (lesson) {
    hit.copy(lesson);
    hero.setTarget(hero.root.position); // and the alchemist stays put inside its wall
  }
  const selected = ammo.selection();
  if (selected) {
    if (!lesson) {
      const self = hero.root.position.clone().setY(hero.root.position.y + 0.3).project(camera);
      const sx = ((self.x + 1) / 2) * innerWidth;
      const sy = ((1 - self.y) / 2) * innerHeight;
      if (Math.hypot(clientX - sx, clientY - sy) < HERO_TAP) {
        ammo.select(null);
        return;
      }
    }
    const element = elementOf(selected.kind);
    if (element && !selected.charged) {
      if (!chargeAt(hit, element)) ammo.reject();
      return;
    }
    ammo.spend();
    castShape(selected.kind, hit, lesson !== null);
    tutorial.cast();
    return;
  }
  hero.setTarget(hit);
  marker.show(hero.target.x, hero.target.z);
}

/**
 * A recognized stroke. Circles and rhombi need no target, so they go off at once (the wall faces the nearest rival).
 * Everything else is held in hand (its new slot, picked) for the next tap. A triangle must be drawn over its
 * source and comes charged; drawn anywhere else it is refused (false) and the missing source is flashed there.
 */
function useDrawn(kind: ShapeKind, cx: number, cy: number) {
  const drawnAt = new THREE.Vector3();
  if (!groundAt(cx, cy, drawnAt)) drawnAt.copy(hero.root.position);
  if (kind === 'circle' || kind === 'rhombus') {
    if (tutorial.aim()) hero.setTarget(hero.root.position); // the lesson's wall must keep the alchemist inside
    castShape(kind, combat.foe() ?? drawnAt);
    tutorial.cast();
    return true;
  }
  const element = elementOf(kind);
  if (element && !sourceAt(drawnAt, element)) {
    showMissingSource(element, cx, cy);
    return false;
  }
  ammo.add(kind, cx, cy);
  ammo.select(ammo.slotOf(kind));
  if (element) chargeAt(drawnAt, element);
  return true;
}

// One finger at a time: a short press is a tap, anything that travels further is a drawing.
const DRAW_THRESHOLD = 12; // px
const AIM_SLOP = 40; // px a tap may wander while a circle is selected
let activePointer: number | null = null;
let drawing = false;
let stroke: Point[] = [];
const canvas = renderer.domElement;

canvas.addEventListener('pointerdown', (e) => {
  // Once the match is decided (or the alchemist lies fallen) there is nothing left to draw or walk to.
  if (activePointer !== null || combat.over) return;
  activePointer = e.pointerId;
  // Stops the browser from starting a text selection or drag that would follow the stroke across the HUD.
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);
  drawing = false;
  stroke = [{ x: e.clientX, y: e.clientY }];
});
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerId !== activePointer) return;
  // Coalesced events keep the line smooth when the browser batches touch input per frame.
  const events = e.getCoalescedEvents?.() ?? [e];
  for (const ev of events.length ? events : [e]) {
    const p = { x: ev.clientX, y: ev.clientY };
    stroke.push(p);
    if (drawing) ink.add(p);
  }
  if (!drawing && tutorial.canDraw && Math.hypot(e.clientX - stroke[0].x, e.clientY - stroke[0].y) > DRAW_THRESHOLD) {
    drawing = true;
    ink.begin(stroke);
  }
});
canvas.addEventListener('pointerup', (e) => {
  if (e.pointerId !== activePointer) return;
  activePointer = null;
  if (!drawing) {
    if (tutorial.canTap) tapAt(e.clientX, e.clientY);
    return;
  }
  drawing = false;
  const shape = recognize(stroke);
  if (!tutorial.drawn(shape?.kind ?? null)) {
    ink.end(null);
    return;
  }
  if (shape) {
    if (useDrawn(shape.kind, shape.cx, shape.cy)) {
      ink.end(shape);
      combat.stored(shape.kind);
    } else ink.end(null);
  } else {
    ink.end(null);
    // With a circle selected, a shaky tap that slid past the threshold is still meant as a tap, not a drawing.
    const start = stroke[0];
    if (ammo.aiming && stroke.every((p) => Math.hypot(p.x - start.x, p.y - start.y) < AIM_SLOP)) tapAt(start.x, start.y);
  }
});
canvas.addEventListener('pointercancel', (e) => {
  if (e.pointerId !== activePointer) return;
  activePointer = null;
  if (drawing) ink.end(null);
  drawing = false;
});
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

addEventListener('resize', fitCamera);
fitCamera();
// Rivals need the real framing to land on screen.
combat.respawn();

const fpsLabel = document.getElementById('fps')!;
let frames = 0;
let fpsTime = 0;
const clock = new THREE.Timer();
const projected = new THREE.Vector3();

renderer.setAnimationLoop((time) => {
  clock.update(time);
  const dt = Math.min(clock.getDelta(), 1 / 20);
  if (!dev.open) world.update(dt);
  tutorial.update(dt);
  if (!help.open && !dev.open && !tutorial.paused) {
    hero.update(dt);
    marker.update(dt);
    impact.update(dt);
    spells.update(dt);
    combat.update(dt);
  }
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

  frames++;
  fpsTime += dt;
  if (fpsTime >= 0.5) {
    fpsLabel.textContent = `${Math.round(frames / fpsTime)} fps`;
    frames = 0;
    fpsTime = 0;
  }
});
