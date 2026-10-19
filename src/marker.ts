import * as THREE from 'three';
import { heightAt } from './noise';

const LIFE = 0.7;

/** Expanding ring shown where the player tapped. */
export class TapMarker {
  readonly mesh: THREE.Mesh;
  private readonly material: THREE.MeshBasicMaterial;
  private age = LIFE;

  constructor(color = '#fff6c9', private readonly size = 1) {
    this.material = new THREE.MeshBasicMaterial({ color, transparent: true, depthWrite: false });
    this.mesh = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.14, 24).rotateX(-Math.PI / 2), this.material);
    this.mesh.visible = false;
    this.mesh.renderOrder = 1;
  }

  show(x: number, z: number) {
    this.mesh.position.set(x, heightAt(x, z) + 0.04, z);
    this.age = 0;
    this.mesh.visible = true;
  }

  update(dt: number) {
    if (this.age >= LIFE) return;
    this.age += dt;
    const t = Math.min(1, this.age / LIFE);
    this.mesh.scale.setScalar((0.6 + t * 1.2) * this.size);
    this.material.opacity = 1 - t;
    if (t >= 1) this.mesh.visible = false;
  }
}
