import * as THREE from 'three';
import { toScreenAligned, type PlayArea } from './generator';

// Camera framing: a raised three-quarter view, deliberately softer than true isometric.
export const FOV = 32;
export const ELEVATION = THREE.MathUtils.degToRad(54);
export const AZIMUTH = THREE.MathUtils.degToRad(24);
const VIEW_HEIGHT_LANDSCAPE = 6.5; // world units visible vertically on wide screens
const VIEW_WIDTH_PORTRAIT = 5.4; // world units visible horizontally on tall screens
// Taps are clamped to this fraction of the screen so the alchemist never walks off the edge.
export const INSET_X = 0.9;
export const INSET_Y = 0.82;
/** Walking (keys, stick, rivals) stops a little inside the tap limits. */
const WALK = 0.92;
/**
 * The widest walkable frame: 16:9, the shape of 1920×1080, the most common desktop screen. A wider screen
 * (ultrawide, a stretched window) still fills with meadow, but nobody walks past this frame, so a bigger
 * monitor never means a bigger arena. The view height is fixed on wide screens, so the frame is the same size
 * on every one of them, whatever its pixel count.
 */
export const WIDEST_ASPECT = 16 / 9;

/** Places the camera for a screen of this shape; returns its distance to the centre of the meadow. */
export function frameCamera(camera: THREE.PerspectiveCamera, aspect: number): number {
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
  return distance;
}

/** Horizontal tap limit in screen units (NDC): the screen's own edge, or the 16:9 frame on wider screens. */
export function tapLimitX(aspect: number): number {
  return INSET_X * Math.min(1, WIDEST_ASPECT / aspect);
}

/** True when a projected point (NDC) is where anyone may walk. */
export function walkable(q: THREE.Vector3, aspect: number): boolean {
  return Math.abs(q.x) < tapLimitX(aspect) * WALK && Math.abs(q.y) < INSET_Y * WALK;
}

/**
 * Where the meadow's pieces may go on this screen, in screen-aligned ground units: what its walkable frame
 * covers, so ponds, campfires and rune circles always sit where the alchemist and the rivals can reach and see them.
 */
export function playAreaFor(aspect: number): PlayArea {
  const camera = new THREE.PerspectiveCamera(FOV, aspect, 0.5, 200);
  frameCamera(camera, aspect);
  const x = tapLimitX(aspect) * WALK;
  const y = INSET_Y * WALK;
  const ray = new THREE.Raycaster();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  // Screen corner to ground, then to screen-aligned u (right) / v (away from the camera).
  const corner = (cx: number, cy: number) => {
    ray.setFromCamera(new THREE.Vector2(cx, cy), camera);
    ray.ray.intersectPlane(ground, hit);
    const [u, v] = toScreenAligned(hit.x, hit.z);
    return { u, v };
  };
  const near = corner(x, -y);
  const far = corner(x, y);
  return {
    vMin: near.v,
    vMax: far.v,
    halfWidthAt: (v) => THREE.MathUtils.lerp(near.u, far.u, (v - near.v) / (far.v - near.v)),
    // Phones in portrait: the sides are the screen's own edges, with no room for trees beyond them.
    forest: aspect >= 1,
  };
}
