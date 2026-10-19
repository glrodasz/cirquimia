import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { buildMeadow } from './meadow';
import { Character } from './character';
import { TapMarker } from './marker';
import { heightAt } from './noise';
import { tiltShiftShader } from './tiltShift';
import { recognize, type Point } from './gestures';
import { Ink } from './ink';
import { AmmoBar } from './ammo';
import { LOOK, LOOKS, applyToon, stylizeShader, switchLook, type LookName } from './looks';

// Camera framing: a raised three-quarter view, deliberately softer than true isometric.
const FOV = 32;
const ELEVATION = THREE.MathUtils.degToRad(54);
const AZIMUTH = THREE.MathUtils.degToRad(24);
const VIEW_HEIGHT_LANDSCAPE = LOOK.viewHeight; // world units visible vertically on wide screens
const VIEW_WIDTH_PORTRAIT = LOOK.viewHeight * (7.5 / 9); // world units visible horizontally on tall screens
// Taps are clamped to this fraction of the screen so the alchemist never walks off the edge.
const INSET_X = 0.9;
const INSET_Y = 0.82;

const SKY = new THREE.Color(LOOK.sky);
const isTouch = matchMedia('(pointer: coarse)').matches;

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
// Pixel looks render at a fraction of CSS resolution and let the browser upscale with nearest filtering.
renderer.setPixelRatio(LOOK.pixelSize > 1 ? 1 / LOOK.pixelSize : Math.min(devicePixelRatio, 2));
if (LOOK.pixelSize > 1) renderer.domElement.style.imageRendering = 'pixelated';
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = LOOK.exposure;
document.documentElement.style.setProperty('--sky', LOOK.sky);
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = SKY;
scene.fog = new THREE.Fog(SKY, 30, 70);

const camera = new THREE.PerspectiveCamera(FOV, 1, 0.5, 200);

scene.add(new THREE.HemisphereLight(...LOOK.hemi));
const sun = new THREE.DirectionalLight(LOOK.sun[0], LOOK.sun[1]);
sun.position.set(...LOOK.sun[2]);
sun.castShadow = true;
sun.shadow.mapSize.setScalar(isTouch ? 1024 : 2048);
sun.shadow.camera.left = sun.shadow.camera.bottom = -24;
sun.shadow.camera.right = sun.shadow.camera.top = 24;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 60;
sun.shadow.bias = -0.0005;
sun.shadow.normalBias = 0.03;
scene.add(sun, sun.target);

const { group: meadow, obstacles } = buildMeadow();
scene.add(meadow);
const hero = new Character(obstacles);
scene.add(hero.root);
const marker = new TapMarker();
const impact = new TapMarker('#ffb35c', 3.5);
scene.add(marker.mesh, impact.mesh);
if (LOOK.toon) applyToon(scene);
const ink = new Ink();
const ammo = new AmmoBar();

// Miniature look: the classic two-pass tilt-shift blur, focused on the alchemist's row.
const composer = new EffectComposer(
  renderer,
  new THREE.WebGLRenderTarget(1, 1, { samples: LOOK.pixelSize > 1 ? 0 : 4, type: THREE.HalfFloatType }),
);
composer.addPass(new RenderPass(scene, camera));
const hBlur = new ShaderPass(tiltShiftShader('horizontal'));
const vBlur = new ShaderPass(tiltShiftShader('vertical'));
composer.addPass(hBlur);
composer.addPass(vBlur);
composer.addPass(new OutputPass());
// Stylized looks read view-space normals and depth from a second, flat render of the scene.
const normalTarget = new THREE.WebGLRenderTarget(1, 1, { depthTexture: new THREE.DepthTexture(1, 1) });
const normalMaterial = new THREE.MeshNormalMaterial();
const stylize = LOOK.stylize === 'none' ? null : new ShaderPass(stylizeShader(LOOK.stylize));
if (stylize) {
  stylize.uniforms.tNormal.value = normalTarget.texture;
  stylize.uniforms.tDepth.value = normalTarget.depthTexture;
  stylize.uniforms.cameraNear.value = camera.near;
  stylize.uniforms.cameraFar.value = camera.far;
  composer.addPass(stylize); // after OutputPass, so it works on display-ready sRGB colour
}
const clearColor = new THREE.Color();
function renderNormals() {
  const background = scene.background;
  renderer.getClearColor(clearColor);
  scene.background = null;
  scene.overrideMaterial = normalMaterial;
  renderer.setClearColor(0x8080ff);
  renderer.setRenderTarget(normalTarget);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  scene.overrideMaterial = null;
  scene.background = background;
  renderer.setClearColor(clearColor);
}
let tiltShift = LOOK.tiltShift;
let focusY = 0.5;

const tiltButton = document.getElementById('tilt') as HTMLButtonElement;
tiltButton.addEventListener('click', (e) => {
  e.stopPropagation();
  tiltShift = !tiltShift;
  tiltButton.textContent = `Miniatura: ${tiltShift ? 'on' : 'off'}`;
});
tiltButton.addEventListener('pointerdown', (e) => e.stopPropagation());
tiltButton.textContent = `Miniatura: ${tiltShift ? 'on' : 'off'}`;

const lookSelect = document.getElementById('look') as HTMLSelectElement;
for (const l of Object.values(LOOKS)) lookSelect.add(new Option(l.label, l.name, false, l === LOOK));
lookSelect.addEventListener('change', () => switchLook(lookSelect.value as LookName));
lookSelect.addEventListener('pointerdown', (e) => e.stopPropagation());

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
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.setSize(w, h);
  const bufferW = w * renderer.getPixelRatio();
  const bufferH = h * renderer.getPixelRatio();
  hBlur.uniforms.texel.value.set(1 / bufferW, 0);
  vBlur.uniforms.texel.value.set(0, 1 / bufferH);
  normalTarget.setSize(bufferW, bufferH);
  stylize?.uniforms.texel.value.set(1 / bufferW, 1 / bufferH);

  keepHeroOnScreen();
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

/** A quick tap walks there, or fires the selected circle at that spot. */
function tapAt(clientX: number, clientY: number) {
  const x = (clientX / innerWidth) * 2 - 1;
  const y = -(clientY / innerHeight) * 2 + 1;
  if (!groundFromNdc(x, y, hit)) return;
  if (ammo.aiming) {
    ammo.spend();
    impact.show(hit.x, hit.z);
    return;
  }
  hero.setTarget(hit);
  marker.show(hero.target.x, hero.target.z);
}

// One finger at a time: a short press is a tap, anything that travels further is a drawing.
const DRAW_THRESHOLD = 12; // px
let activePointer: number | null = null;
let drawing = false;
let stroke: Point[] = [];
const canvas = renderer.domElement;

canvas.addEventListener('pointerdown', (e) => {
  if (activePointer !== null) return;
  activePointer = e.pointerId;
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
  if (!drawing && Math.hypot(e.clientX - stroke[0].x, e.clientY - stroke[0].y) > DRAW_THRESHOLD) {
    drawing = true;
    ink.begin(stroke);
  }
});
canvas.addEventListener('pointerup', (e) => {
  if (e.pointerId !== activePointer) return;
  activePointer = null;
  if (!drawing) {
    tapAt(e.clientX, e.clientY);
    return;
  }
  drawing = false;
  const shape = recognize(stroke);
  if (shape && !ammo.full) {
    ink.end(shape);
    ammo.add(shape.kind, shape.cx, shape.cy);
  } else {
    ink.end(null);
  }
});
canvas.addEventListener('pointercancel', (e) => {
  if (e.pointerId !== activePointer) return;
  activePointer = null;
  if (drawing) ink.end(null);
  drawing = false;
});
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

addEventListener('resize', fitCamera);
fitCamera();

const fpsLabel = document.getElementById('fps')!;
let frames = 0;
let fpsTime = 0;
const clock = new THREE.Timer();
const projected = new THREE.Vector3();

renderer.setAnimationLoop((time) => {
  clock.update(time);
  const dt = Math.min(clock.getDelta(), 1 / 20);
  hero.update(dt);
  marker.update(dt);
  impact.update(dt);
  ink.update(dt);

  if (tiltShift || stylize) {
    hBlur.enabled = vBlur.enabled = tiltShift;
    projected.copy(hero.root.position).project(camera);
    focusY += ((projected.y + 1) / 2 - focusY) * Math.min(1, dt * 4);
    hBlur.uniforms.focus.value = vBlur.uniforms.focus.value = focusY;
    if (stylize) renderNormals();
    composer.render(dt);
  } else {
    renderer.render(scene, camera);
  }

  frames++;
  fpsTime += dt;
  if (fpsTime >= 0.5) {
    fpsLabel.textContent = `${Math.round(frames / fpsTime)} fps`;
    frames = 0;
    fpsTime = 0;
  }
});
