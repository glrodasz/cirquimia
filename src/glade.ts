import * as THREE from 'three';

/**
 * Shader touch for the Glade look, patched into the stock Lambert material so lighting and shadows stay three's:
 * low-frequency world-space blotches that break flat colour into a painted, leafy texture.
 */
interface Stylize {
  /** World-space blotch frequency and how much it darkens/lightens. */
  paint: { scale: number; amount: number };
}

const f = (n: number) => n.toFixed(4);

export function stylize<M extends THREE.Material>(mat: M, opts: Stylize): M {
  const defines = { PAINT_SCALE: f(opts.paint.scale), PAINT_AMOUNT: f(opts.paint.amount) };
  mat.defines = { ...mat.defines, ...defines };
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPaintPos;')
      .replace(
        '#include <project_vertex>',
        /* glsl */ `#include <project_vertex>
        vec4 paintP = vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
          paintP = instanceMatrix * paintP;
        #endif
        vPaintPos = ( modelMatrix * paintP ).xyz;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        varying vec3 vPaintPos;
        float paintHash( vec3 p ) {
          p = fract( p * 0.3183099 + 0.1 );
          p *= 17.0;
          return fract( p.x * p.y * p.z * ( p.x + p.y + p.z ) );
        }
        float paintNoise( vec3 x ) {
          vec3 i = floor( x );
          vec3 t = fract( x );
          t = t * t * ( 3.0 - 2.0 * t );
          return mix(
            mix( mix( paintHash( i ), paintHash( i + vec3( 1, 0, 0 ) ), t.x ), mix( paintHash( i + vec3( 0, 1, 0 ) ), paintHash( i + vec3( 1, 1, 0 ) ), t.x ), t.y ),
            mix( mix( paintHash( i + vec3( 0, 0, 1 ) ), paintHash( i + vec3( 1, 0, 1 ) ), t.x ), mix( paintHash( i + vec3( 0, 1, 1 ) ), paintHash( i + vec3( 1, 1, 1 ) ), t.x ), t.y ),
            t.z );
        }`,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `#include <color_fragment>
        {
          float blotch = paintNoise( vPaintPos * PAINT_SCALE ) * 0.65 + paintNoise( vPaintPos * PAINT_SCALE * 2.7 ) * 0.35;
          // Contrast-stretched so the blotches read as brush dabs rather than a faint haze.
          diffuseColor.rgb *= 1.0 + ( smoothstep( 0.3, 0.7, blotch ) - 0.5 ) * PAINT_AMOUNT;
        }`,
      );
  };
  mat.customProgramCacheKey = () => JSON.stringify(defines);
  return mat;
}

/**
 * Cheap bloom for the warm highlights: bright parts of the scene, downsampled to a quarter and blurred there,
 * then added back by the final pass. Three quarter-resolution passes, about 1/16 of the pixels each.
 */
export class Bloom {
  readonly texture: THREE.Texture;
  private readonly a = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
  private readonly b = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
  private readonly bright = new THREE.ShaderMaterial({
    uniforms: { tDiffuse: { value: null as THREE.Texture | null }, texel: { value: new THREE.Vector2() }, threshold: { value: 0.75 } },
    vertexShader: VERTEX,
    fragmentShader: /* glsl */ `
      uniform sampler2D tDiffuse;
      uniform vec2 texel;
      uniform float threshold;
      varying vec2 vUv;
      void main() {
        // Four bilinear taps cover the 4x4 source block this pixel stands for.
        vec3 c = texture2D( tDiffuse, vUv + texel * vec2( -1.0, -1.0 ) ).rgb + texture2D( tDiffuse, vUv + texel * vec2( 1.0, -1.0 ) ).rgb
               + texture2D( tDiffuse, vUv + texel * vec2( -1.0, 1.0 ) ).rgb + texture2D( tDiffuse, vUv + texel * vec2( 1.0, 1.0 ) ).rgb;
        c *= 0.25;
        float luma = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
        gl_FragColor = vec4( c * smoothstep( threshold, threshold + 0.5, luma ), 1.0 );
      }`,
  });
  private readonly blur = new THREE.ShaderMaterial({
    uniforms: { tDiffuse: { value: null as THREE.Texture | null }, dir: { value: new THREE.Vector2() } },
    vertexShader: VERTEX,
    fragmentShader: /* glsl */ `
      uniform sampler2D tDiffuse;
      uniform vec2 dir;
      varying vec2 vUv;
      void main() {
        vec3 s = texture2D( tDiffuse, vUv ).rgb * 0.227;
        s += ( texture2D( tDiffuse, vUv + dir * 1.385 ).rgb + texture2D( tDiffuse, vUv - dir * 1.385 ).rgb ) * 0.316;
        s += ( texture2D( tDiffuse, vUv + dir * 3.231 ).rgb + texture2D( tDiffuse, vUv - dir * 3.231 ).rgb ) * 0.070;
        gl_FragColor = vec4( s, 1.0 );
      }`,
  });
  private readonly quad: { render(r: THREE.WebGLRenderer): void; material: THREE.Material };
  private w = 1;
  private h = 1;

  constructor(FullScreenQuad: new (m: THREE.Material) => { render(r: THREE.WebGLRenderer): void; material: THREE.Material }) {
    this.quad = new FullScreenQuad(this.bright);
    this.texture = this.a.texture;
  }

  setSize(width: number, height: number) {
    this.w = Math.max(1, Math.floor(width / 4));
    this.h = Math.max(1, Math.floor(height / 4));
    this.a.setSize(this.w, this.h);
    this.b.setSize(this.w, this.h);
    this.bright.uniforms.texel.value.set(1 / width, 1 / height);
  }

  render(renderer: THREE.WebGLRenderer, source: THREE.Texture) {
    this.bright.uniforms.tDiffuse.value = source;
    this.quad.material = this.bright;
    renderer.setRenderTarget(this.a);
    this.quad.render(renderer);
    this.quad.material = this.blur;
    this.blur.uniforms.tDiffuse.value = this.a.texture;
    this.blur.uniforms.dir.value.set(1 / this.w, 0);
    renderer.setRenderTarget(this.b);
    this.quad.render(renderer);
    this.blur.uniforms.tDiffuse.value = this.b.texture;
    this.blur.uniforms.dir.value.set(0, 1 / this.h);
    renderer.setRenderTarget(this.a);
    this.quad.render(renderer);
  }
}

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`;
