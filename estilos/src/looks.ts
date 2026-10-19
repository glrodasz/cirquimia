import * as THREE from 'three';

export type LookName = 'actual' | 'musgo' | 'otono' | 'bruma' | 'diorama' | 'pixel' | 'grabado';

export interface Palette {
  groundLight: string;
  groundDark: string;
  groundDry: string;
  grassDark: string;
  grassLight: string;
  pine: string;
  broadleaf: string;
  trunk: string;
  rock: string;
  flowers?: string[];
  stem?: string;
  caps?: [string, string];
}

export interface Look {
  name: LookName;
  label: string;
  sky: string;
  hemi: [string, string, number];
  sun: [string, number, [number, number, number]];
  exposure: number;
  palette: Palette;
  /** Swap Lambert for banded toon shading. */
  toon: boolean;
  tiltShift: boolean;
  /** Render resolution divisor; > 1 gives chunky pixels upscaled with nearest filtering. */
  pixelSize: number;
  stylize: 'none' | 'diorama' | 'pixel' | 'grabado';
  /** World units visible vertically on wide screens (smaller = closer camera). */
  viewHeight: number;
  smoothGround?: boolean;
}

const MEADOW: Palette = {
  groundLight: '#9fd16b',
  groundDark: '#5f9e45',
  groundDry: '#c4cf6a',
  grassDark: '#4f8f3a',
  grassLight: '#a6d46a',
  pine: '#3f7d4a',
  broadleaf: '#6aa84f',
  trunk: '#7a5434',
  rock: '#9a9c94',
};

const WARM: Palette = {
  groundLight: '#a9d465',
  groundDark: '#4f9150',
  groundDry: '#e3cf78',
  grassDark: '#3f8044',
  grassLight: '#b8dc6c',
  pine: '#2d6a55',
  broadleaf: '#86b84a',
  trunk: '#8a5a3a',
  rock: '#b9ae9c',
};

/** Muted low-poly palettes: same faceted Lambert look, lower saturation and value range. */
const MOSS: Palette = {
  groundLight: '#a3ad7c',
  groundDark: '#6b7a52',
  groundDry: '#b9a979',
  grassDark: '#5f6e48',
  grassLight: '#a9b07f',
  pine: '#4a5f4a',
  broadleaf: '#7d8c5a',
  trunk: '#6b5444',
  rock: '#8f8b80',
  flowers: ['#e8e0cc', '#d9b85c', '#c98f8f', '#9d93b0', '#c78a63'],
  stem: '#5f6e48',
  caps: ['#a8513f', '#a87f4f'],
};

const AUTUMN: Palette = {
  groundLight: '#b5a76f',
  groundDark: '#68774f',
  groundDry: '#c49a5e',
  grassDark: '#6c6a40',
  grassLight: '#bfae70',
  pine: '#41584a',
  broadleaf: '#b07a3e',
  trunk: '#5e4535',
  rock: '#9a8f80',
  flowers: ['#ece2cc', '#d6a84c', '#b8644a', '#8f7a9a'],
  stem: '#6c6a40',
  caps: ['#9c3f2e', '#b0864e'],
};

const MIST: Palette = {
  groundLight: '#93ab90',
  groundDark: '#5b7468',
  groundDry: '#aaad8c',
  grassDark: '#557062',
  grassLight: '#a2b89c',
  pine: '#3f5a57',
  broadleaf: '#6f8c73',
  trunk: '#5c4f48',
  rock: '#8c9496',
  flowers: ['#eef0ea', '#d8c97a', '#c9a3b4', '#a3a9c9'],
  stem: '#557062',
  caps: ['#a65a4c', '#a8906a'],
};

function lowPoly(name: LookName, label: string, sky: string, palette: Palette, hemi: Look['hemi'], sun: Look['sun'], exposure = 1): Look {
  return { name, label, sky, hemi, sun, exposure, palette, toon: false, tiltShift: true, pixelSize: 1, stylize: 'none', viewHeight: 6.5 };
}

export const LOOKS: Record<LookName, Look> = {
  actual: {
    name: 'actual',
    label: 'Actual',
    sky: '#cfe8d6',
    hemi: ['#e9f6ff', '#5b7a3a', 1.6],
    sun: ['#fff1d6', 2.4, [9, 16, 7]],
    exposure: 1.05,
    palette: MEADOW,
    toon: false,
    tiltShift: true,
    pixelSize: 1,
    stylize: 'none',
    viewHeight: 9,
  },
  musgo: lowPoly('musgo', 'Low poly · Musgo', '#d9dccb', MOSS, ['#eef0e4', '#5f664e', 1.45], ['#fff0d8', 2.3, [10, 13, 5]], 1.1),
  otono: lowPoly('otono', 'Low poly · Otoño', '#e3d6c0', AUTUMN, ['#f6ead6', '#5e5a44', 1.4], ['#ffd9a8', 2.4, [12, 10, 4]], 1.05),
  bruma: lowPoly('bruma', 'Low poly · Bruma', '#c9d3d1', MIST, ['#e4eef0', '#4f5f5a', 1.5], ['#f2f4f0', 1.9, [8, 15, 6]], 1.05),
  diorama: {
    name: 'diorama',
    label: 'Diorama toon',
    sky: '#f3dfbf',
    hemi: ['#fff1dc', '#4d6b3a', 1.25],
    // Lower, warmer sun: long shadows read as late afternoon and give the ground shape.
    sun: ['#ffd7a1', 3.0, [12, 9, 4]],
    exposure: 1.0,
    palette: WARM,
    toon: true,
    tiltShift: true,
    pixelSize: 1,
    stylize: 'diorama',
    smoothGround: true,
    viewHeight: 6.5,
  },
  pixel: {
    name: 'pixel',
    label: 'Pixel art 3D',
    sky: '#e9e2c0',
    hemi: ['#f2f6ff', '#4a6a3c', 1.3],
    sun: ['#fff0d0', 3.0, [10, 12, 5]],
    exposure: 1.0,
    palette: WARM,
    toon: true,
    tiltShift: false,
    pixelSize: 3,
    stylize: 'pixel',
    viewHeight: 6.5,
  },
  grabado: {
    name: 'grabado',
    label: 'Grabado alquímico',
    sky: '#efe3c6',
    hemi: ['#ffffff', '#606060', 1.2],
    sun: ['#ffffff', 3.2, [10, 13, 4]],
    exposure: 1.0,
    palette: MEADOW,
    toon: true,
    tiltShift: false,
    pixelSize: 1,
    stylize: 'grabado',
    viewHeight: 6.5,
  },
};

const STORAGE_KEY = 'cirquimia-look';

function chosenLook(): string | null {
  const fromUrl = new URLSearchParams(location.search).get('look');
  if (fromUrl) return fromUrl;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export const LOOK: Look = LOOKS[chosenLook() as LookName] ?? LOOKS.actual;

/** Looks rebuild materials and geometry, so switching remembers the choice and reloads. */
export function switchLook(name: LookName) {
  const url = new URL(location.href);
  try {
    localStorage.setItem(STORAGE_KEY, name);
    // A look in the URL would override the stored choice, so drop it.
    if (!url.searchParams.has('look')) return location.reload();
    url.searchParams.delete('look');
  } catch {
    url.searchParams.set('look', name);
  }
  location.replace(url);
}

/** Replaces every Lambert material under root with a 3-band toon material of the same colour. */
export function applyToon(root: THREE.Object3D) {
  const ramp = new THREE.DataTexture(new Uint8Array([90, 170, 255]), 3, 1, THREE.RedFormat);
  ramp.minFilter = ramp.magFilter = THREE.NearestFilter;
  ramp.needsUpdate = true;
  const swapped = new Map<THREE.Material, THREE.Material>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    const m = mesh.material as THREE.MeshLambertMaterial | undefined;
    if (!mesh.isMesh || !m || !(m as THREE.MeshLambertMaterial).isMeshLambertMaterial) return;
    let toon = swapped.get(m);
    if (!toon) {
      toon = new THREE.MeshToonMaterial({
        color: m.color,
        emissive: m.emissive,
        vertexColors: m.vertexColors,
        gradientMap: ramp,
      });
      swapped.set(m, toon);
    }
    mesh.material = toon;
  });
}

const EDGES = /* glsl */ `
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform vec2 texel;
  uniform float cameraNear;
  uniform float cameraFar;
  float linearDepth(vec2 uv) {
    float z = texture2D(tDepth, uv).x * 2.0 - 1.0;
    return 2.0 * cameraNear * cameraFar / (cameraFar + cameraNear - z * (cameraFar - cameraNear));
  }
  vec3 normalAt(vec2 uv) { return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
  // x: silhouette edge (depth jump), y: crease edge (normal change).
  vec2 edges(vec2 uv, float px, float depthLo, float depthHi) {
    vec2 o = texel * px;
    float d = linearDepth(uv);
    vec3 n = normalAt(uv);
    float dd = 0.0;
    float nd = 0.0;
    vec2 offs[4];
    offs[0] = vec2(o.x, 0.0); offs[1] = vec2(-o.x, 0.0); offs[2] = vec2(0.0, o.y); offs[3] = vec2(0.0, -o.y);
    for (int i = 0; i < 4; i++) {
      float di = linearDepth(uv + offs[i]);
      // Only the nearer pixel draws the line, so outlines sit on the object in front.
      dd += max(0.0, di - d);
      nd += 1.0 - dot(n, normalAt(uv + offs[i]));
    }
    return vec2(smoothstep(depthLo, depthHi, dd / d), smoothstep(0.35, 0.8, nd));
  }
`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const FRAGMENTS: Record<Exclude<Look['stylize'], 'none'>, string> = {
  diorama: /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    ${EDGES}
    void main() {
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      vec2 e = edges(vUv, 1.0, 0.05, 0.12);
      // Ink lines are a darker, warmer version of the surface colour, not pure black.
      vec3 ink = c * vec3(0.32, 0.26, 0.24);
      c = mix(c, ink, max(e.x, e.y * 0.3));
      float v = smoothstep(1.1, 0.35, length(vUv - 0.5) * 1.4);
      c *= mix(0.82, 1.0, v);
      gl_FragColor = vec4(c, 1.0);
    }`,
  pixel: /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    ${EDGES}
    float bayer(vec2 p) {
      vec2 q = mod(floor(p), 4.0);
      int i = int(q.x + q.y * 4.0);
      float m[16];
      m[0]=0.;m[1]=8.;m[2]=2.;m[3]=10.;m[4]=12.;m[5]=4.;m[6]=14.;m[7]=6.;
      m[8]=3.;m[9]=11.;m[10]=1.;m[11]=9.;m[12]=15.;m[13]=7.;m[14]=13.;m[15]=5.;
      for (int k = 0; k < 16; k++) if (k == i) return m[k] / 16.0 - 0.5;
      return 0.0;
    }
    void main() {
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      vec2 e = edges(vUv, 1.0, 0.04, 0.1);
      c = mix(c, c * 1.2 + 0.03, e.y * 0.5); // light rim on creases
      c = mix(c, c * 0.4, e.x);              // dark outline on silhouettes
      float levels = 12.0;
      c = floor(c * levels + 0.5 + bayer(gl_FragCoord.xy) * 0.3) / levels;
      gl_FragColor = vec4(c, 1.0);
    }`,
  grabado: /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    ${EDGES}
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
    }
    // 1 on the line, 0 between lines; width grows as the tone darkens.
    float hatch(vec2 p, float spacing, float darkness) {
      float wobble = noise(p * 0.05) * 2.0;
      float d = abs(fract((p.x + wobble) / spacing) - 0.5) * 2.0;
      return 1.0 - smoothstep(darkness * 0.6, darkness, d);
    }
    void main() {
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = clamp(dot(c, vec3(0.3, 0.55, 0.15)) * 1.6 - 0.1, 0.0, 1.0);
      vec2 p = gl_FragCoord.xy;
      vec2 d1 = vec2(p.x + p.y, p.y - p.x) * 0.7071;
      float h = 0.0;
      h = max(h, hatch(d1, 7.0, 0.45 * smoothstep(0.85, 0.5, l)));
      h = max(h, hatch(d1.yx, 7.0, 0.4 * smoothstep(0.45, 0.25, l)));
      h = max(h, hatch(p.yx, 5.0, 0.45 * smoothstep(0.25, 0.05, l)));
      vec2 e = edges(vUv, 1.3, 0.04, 0.1);
      float ink = max(h * 0.8, max(e.x, e.y * 0.6));
      vec3 paper = vec3(0.94, 0.89, 0.77) * (0.93 + 0.07 * noise(p * 0.02) + 0.04 * noise(p * 0.4));
      // A faint wash of the original hue keeps the meadow readable without breaking the print.
      vec3 wash = mix(vec3(dot(c, vec3(0.33))), c, 0.6);
      paper = mix(paper, paper * (0.55 + 0.6 * wash), 0.35);
      vec3 inkColor = vec3(0.22, 0.15, 0.10);
      vec3 col = mix(paper, inkColor, ink);
      float v = smoothstep(1.0, 0.3, length(vUv - 0.5) * 1.3);
      col *= mix(0.78, 1.0, v);
      gl_FragColor = vec4(col, 1.0);
    }`,
};

export function stylizeShader(mode: Exclude<Look['stylize'], 'none'>) {
  return {
    name: `Stylize_${mode}`,
    uniforms: {
      tDiffuse: { value: null as THREE.Texture | null },
      tNormal: { value: null as THREE.Texture | null },
      tDepth: { value: null as THREE.Texture | null },
      texel: { value: new THREE.Vector2(1 / 512, 1 / 512) },
      cameraNear: { value: 0.5 },
      cameraFar: { value: 200 },
    },
    vertexShader: VERT,
    fragmentShader: FRAGMENTS[mode],
  };
}
