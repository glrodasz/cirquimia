import * as THREE from 'three';

/**
 * Separable 9-tap blur whose radius grows with distance from a horizontal focus band,
 * which is what sells the "miniature diorama" look. Use one pass per direction; the last one, drawn to
 * the canvas, also applies the renderer's tone mapping and output colour space.
 * With GRADE defined, that last pass also colour-grades in linear light before tone mapping:
 * a little more saturation, warm shadows, and a soft vignette (the Glade look).
 */
export function tiltShiftShader(direction: 'horizontal' | 'vertical') {
  return {
    name: `TiltShift_${direction}`,
    uniforms: {
      tDiffuse: { value: null as THREE.Texture | null },
      texel: { value: new THREE.Vector2(direction === 'horizontal' ? 1 / 512 : 0, direction === 'vertical' ? 1 / 512 : 0) },
      focus: { value: 0.5 },
      band: { value: 0.1 },
      strength: { value: 2.2 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D tDiffuse;
      uniform vec2 texel;
      uniform float focus;
      uniform float band;
      uniform float strength;
      varying vec2 vUv;
      void main() {
        float amount = smoothstep(band, band + 0.4, abs(vUv.y - focus)) * strength;
        if (amount == 0.0) {
          // Inside the focus band all nine taps land on the same texel: one fetch gives the same result.
          gl_FragColor = texture2D(tDiffuse, vUv);
        } else {
          vec2 step = texel * amount;
          vec4 sum = texture2D(tDiffuse, vUv) * 0.1633;
          sum += (texture2D(tDiffuse, vUv - step) + texture2D(tDiffuse, vUv + step)) * 0.1531;
          sum += (texture2D(tDiffuse, vUv - 2.0 * step) + texture2D(tDiffuse, vUv + 2.0 * step)) * 0.12245;
          sum += (texture2D(tDiffuse, vUv - 3.0 * step) + texture2D(tDiffuse, vUv + 3.0 * step)) * 0.0918;
          sum += (texture2D(tDiffuse, vUv - 4.0 * step) + texture2D(tDiffuse, vUv + 4.0 * step)) * 0.051;
          gl_FragColor = sum;
        }
        #ifdef GRADE
          vec3 c = gl_FragColor.rgb;
          float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(luma), c, 1.06);
          // Shadows lean warm amber, highlights stay golden-neutral.
          c += vec3(0.022, 0.012, -0.004) * (1.0 - smoothstep(0.0, 0.35, luma));
          vec2 v = vUv - 0.5;
          c *= 1.0 - dot(v, v) * 0.55;
          gl_FragColor.rgb = max(c, 0.0);
        #endif
        // Only active when drawing to the canvas (the last pass): tone mapping and sRGB output.
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  };
}
