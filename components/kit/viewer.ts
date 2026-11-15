import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AZIMUTH, ELEVATION, FOV, frameCamera } from '../../src/playArea';
import { setTerrain } from '../../src/noise';
import { Panel } from './panel';

/**
 * A turntable for the game's 3D pieces: the game's Bruma light (sky, hemisphere and sun from src/main.ts), its tone
 * mapping and shadows, an orbit camera, and the numbers that matter for performance (draw calls, triangles).
 * The game's tilt-shift pass is left out on purpose: here the point is to see each piece sharp and up close.
 */
export interface Viewer {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;
  readonly controls: OrbitControls;
  readonly panel: Panel;
  /** Called every frame with the seconds since the last one. */
  onFrame(fn: (dt: number, time: number) => void): void;
  /** Points the camera at `object`, from the game's angle, close enough to fill the view. */
  frame(object: THREE.Object3D, zoom?: number): void;
  /** The game's own camera angle and field of view, from further away. */
  gameView(target: THREE.Vector3, distance: number): void;
  /** The game's exact framing for this screen (src/playArea.ts), held there: orbiting is off until `false`. */
  gameCamera(on: boolean): void;
  /** Screen pixels of a world point, `lift` units above it (as the game's toScreen). */
  toScreen(p: THREE.Vector3, lift: number): { x: number; y: number };
}

const SKY = '#c9d3d1';

export function createViewer(opts: { ground?: boolean; title?: string } = {}): Viewer {
  setTerrain(1, [], 0); // flat ground unless a story builds its own meadow
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  document.body.prepend(renderer.domElement);
  Object.assign(renderer.domElement.style, { position: 'fixed', inset: '0', touchAction: 'none' });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SKY);
  scene.fog = new THREE.Fog(SKY, 30, 70);
  scene.add(new THREE.HemisphereLight('#e4eef0', '#4f5f5a', 1.5));
  const sun = new THREE.DirectionalLight('#f2f4f0', 1.9);
  sun.position.set(8, 15, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 60 });
  sun.shadow.bias = -0.0005;
  scene.add(sun, sun.target);

  if (opts.ground !== false) {
    const ground = new THREE.Mesh(new THREE.CircleGeometry(6, 48).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: '#93ab90' }));
    ground.receiveShadow = true;
    scene.add(ground);
  }

  const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 200);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotateSpeed = 1.2;

  let locked = false;
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight, false);
    renderer.domElement.style.width = `${innerWidth}px`;
    renderer.domElement.style.height = `${innerHeight}px`;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    if (locked) frameCamera(camera, camera.aspect);
  };
  addEventListener('resize', resize);
  resize();

  const direction = (elevation: number, azimuth: number) =>
    new THREE.Vector3(Math.sin(azimuth) * Math.cos(elevation), Math.sin(elevation), Math.cos(azimuth) * Math.cos(elevation));

  const panel = new Panel(opts.title ?? 'Visor 3D');
  const viewer: Viewer = {
    scene,
    camera,
    renderer,
    controls,
    panel,
    onFrame: (fn) => void frames.push(fn),
    frame(object, zoom = 1) {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const radius = Math.max(size.x, size.y, size.z) * 0.6 || 1;
      const fit = radius / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / Math.min(1, camera.aspect);
      camera.fov = 32;
      camera.position.copy(center).addScaledVector(direction(THREE.MathUtils.degToRad(22), AZIMUTH), (fit * 1.15) / zoom);
      controls.target.copy(center);
      camera.updateProjectionMatrix();
      controls.update();
    },
    gameView(target, distance) {
      camera.fov = FOV;
      camera.updateProjectionMatrix();
      camera.position.copy(target).addScaledVector(direction(ELEVATION, AZIMUTH), distance);
      controls.target.copy(target);
      controls.update();
    },
    gameCamera(on) {
      locked = on;
      controls.enabled = !on;
      if (!on) return;
      camera.fov = FOV;
      frameCamera(camera, camera.aspect);
      controls.target.set(0, 0, 0);
    },
    toScreen(p, lift) {
      const q = new THREE.Vector3(p.x, p.y + lift, p.z).project(camera);
      return { x: ((q.x + 1) / 2) * innerWidth, y: ((1 - q.y) / 2) * innerHeight };
    },
  };

  const frames: Array<(dt: number, time: number) => void> = [];
  const stats = panel.stats();
  panel.toggle('Girar', false, (on) => (controls.autoRotate = on));
  panel.toggle('Alambre', false, (on) =>
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      for (const mat of m ? (Array.isArray(m) ? m : [m]) : []) if ('wireframe' in mat) (mat as THREE.MeshLambertMaterial).wireframe = on;
    }),
  );
  panel.toggle('Sombras', true, (on) => {
    sun.castShadow = on;
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      for (const mat of m ? (Array.isArray(m) ? m : [m]) : []) mat.needsUpdate = true;
    });
  });

  const clock = new THREE.Clock();
  let shown = 0;
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.1);
    const time = clock.elapsedTime;
    for (const fn of frames) fn(dt, time);
    if (!locked) controls.update();
    renderer.render(scene, camera);
    if (time - shown > 0.5) {
      shown = time;
      const { calls, triangles } = renderer.info.render;
      const { geometries, textures } = renderer.info.memory;
      stats.textContent = `draw calls ${calls} · triángulos ${triangles.toLocaleString('es')}\ngeometrías ${geometries} · texturas ${textures}`;
    }
  });
  return viewer;
}
