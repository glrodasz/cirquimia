import * as THREE from 'three';
import { toScreenAligned } from './generator';

/** How see-through a tree gets with someone behind it: 0 is gone, 1 solid. */
const SEE_THROUGH = 0.3;
/** Seconds to fade fully in or out. */
const FADE_TIME = 0.25;
/**
 * The screen footprint of a tree's crown, in screen-aligned ground units relative to its trunk: crowns are about
 * 2.6 units tall, and with the camera 54° up, height shows as ground further back (h / tan 54° ≈ 0.73 h).
 */
const REACH_BACK = 2.4;
const REACH_FRONT = 0.5;
const REACH_SIDE = 1.1;

/**
 * Patches a tree material so each instance can be thinned out with a screen-door dither (an ordered 4×4 pattern
 * of discarded pixels): it reads as see-through, needs no sorting and leaves depth and shadows as they were.
 */
export function fadeable<M extends THREE.Material>(mat: M): M {
  const before = mat.onBeforeCompile.bind(mat);
  const key = mat.customProgramCacheKey.bind(mat);
  mat.onBeforeCompile = (shader, renderer) => {
    before(shader, renderer);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float treeFade;\nvarying float vTreeFade;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvTreeFade = treeFade;');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        varying float vTreeFade;
        const float TREE_BAYER[16] = float[16](0., 8., 2., 10., 12., 4., 14., 6., 3., 11., 1., 9., 15., 7., 13., 5.);`,
      )
      .replace(
        '#include <clipping_planes_fragment>',
        /* glsl */ `#include <clipping_planes_fragment>
        if ( vTreeFade < 0.999 ) {
          vec2 cell = mod( floor( gl_FragCoord.xy ), 4.0 );
          if ( ( TREE_BAYER[ int( cell.y * 4.0 + cell.x ) ] + 0.5 ) / 16.0 > vTreeFade ) discard;
        }`,
      );
  };
  mat.customProgramCacheKey = () => `${key()}|treeFade`;
  return mat;
}

/** Gives an instanced tree mesh its per-instance fade, all solid. */
export function withFade(mesh: THREE.InstancedMesh): THREE.InstancedMesh {
  const fade = new THREE.InstancedBufferAttribute(new Float32Array(mesh.instanceMatrix.count).fill(1), 1);
  fade.setUsage(THREE.DynamicDrawUsage);
  mesh.geometry.setAttribute('treeFade', fade);
  fadeable(mesh.material as THREE.Material);
  mesh.userData.treeFade = true;
  return mesh;
}

/**
 * Thins out the trees standing between the camera and anyone in the match, so nobody is hidden under a crown.
 * Each instance is judged from its own position, so trunks and crowns fade together without any bookkeeping,
 * and instances culled or moved by the world stay right.
 */
export class TreeFade {
  private meshes: THREE.InstancedMesh[] = [];
  private readonly people: Array<[number, number]> = [];

  /** Picks up the fadeable meshes of a freshly built meadow. */
  track(root: THREE.Object3D) {
    this.meshes = [];
    root.traverse((o) => {
      if ((o as THREE.InstancedMesh).isInstancedMesh && o.userData.treeFade) this.meshes.push(o as THREE.InstancedMesh);
    });
  }

  update(dt: number, positions: THREE.Vector3[]) {
    this.people.length = 0;
    for (const p of positions) this.people.push(toScreenAligned(p.x, p.z));
    const step = dt / FADE_TIME;
    for (const mesh of this.meshes) {
      const attr = mesh.geometry.getAttribute('treeFade') as THREE.InstancedBufferAttribute;
      const fade = attr.array as Float32Array;
      const m = mesh.instanceMatrix.array;
      let changed = false;
      for (let i = 0; i < mesh.count; i++) {
        const [u, v] = toScreenAligned(m[i * 16 + 12], m[i * 16 + 14]);
        let hides = false;
        for (const [pu, pv] of this.people) {
          const back = pv - v;
          if (back > -REACH_FRONT && back < REACH_BACK && Math.abs(pu - u) < REACH_SIDE) {
            hides = true;
            break;
          }
        }
        const target = hides ? SEE_THROUGH : 1;
        const now = fade[i];
        if (now === target) continue;
        fade[i] = now < target ? Math.min(target, now + step) : Math.max(target, now - step);
        changed = true;
      }
      if (changed) attr.needsUpdate = true;
    }
  }
}
