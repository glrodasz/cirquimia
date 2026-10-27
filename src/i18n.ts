/**
 * Every player-facing string, in Spanish and English.
 * The language comes from ?lang=es|en, then the last choice, then the browser: Spanish if the
 * browser prefers it, English otherwise. Switching reloads the page, like the look does.
 */
export type Lang = 'es' | 'en';

const STORE = 'cirquimia.lang';
const isLang = (v: unknown): v is Lang => v === 'es' || v === 'en';

function pick(): Lang {
  try {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;
  } catch {
    // ignore
  }
  try {
    const stored = localStorage.getItem(STORE);
    if (isLang(stored)) return stored;
  } catch {
    // Blocked storage: fall back to the browser.
  }
  const preferred = typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return 'en';
}

export const LANG: Lang = pick();

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(STORE, lang);
  } catch {
    // Storage may be blocked; the URL below still carries the choice.
  }
  const url = new URL(location.href);
  url.searchParams.set('lang', lang);
  location.replace(url);
}

type Line = [title: string, body: string];
interface Lesson {
  draw: Line;
  pick: Line;
  aim: Line;
  watch: string;
  done: string;
}

const es = {
  title: 'Cirquimia',
  difficulty: { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil' },
  shapes: {
    circle: 'Círculo',
    triangle: 'Triángulo',
    triangleDown: 'Triángulo invertido',
    square: 'Cuadrado',
    rhombus: 'Rombo',
    pentagram: 'Pentagrama',
  },
  ammoBar: 'Círculos de transmutación',
  match: {
    toolbar: 'Partida',
    rivalsCap: (n: number) => `<b>${n}</b> ${n === 1 ? 'rival' : 'rivales'}`,
    rivalsAria: (n: number) => `Rivales: ${n}. Toca para cambiar y reiniciar la partida`,
    levelAria: (level: string) => `Dificultad: ${level}. Toca para cambiar y reiniciar la partida`,
    restarted: (n: number, level: string) => `Nueva partida · ${n === 0 ? 'sin rivales' : n === 1 ? '1 rival' : `${n} rivales`} · ${level}`,
    again: 'Jugar de nuevo',
    victory: '¡Victoria!',
    victoryAria: 'Victoria',
    defeat: 'Game Over',
    won: (n: number, level: string) => `Venciste a ${n === 1 ? 'tu rival' : `tus ${n} rivales`} · ${level}`,
    lost: (level: string) => `Has caído en combate · ${level}`,
  },
  help: {
    button: 'Cómo jugar',
    title: 'Cómo jugar',
    move: 'Toca el suelo para <b>moverte</b>',
    draw: 'Dibuja un símbolo: se <b>guarda</b> arriba',
    use: 'Toca el símbolo y luego el objetivo para <b>usarlo</b>',
    shapesTitle: 'Símbolos disponibles',
    damage: 'Daño',
    healing: 'Curación',
    defence: 'Defensa',
    names: { circle: 'Muro', square: 'Tierra', triangle: 'Fuego', triangleDown: 'Agua', rhombus: 'Cura', pentagram: 'Estrella' },
    fireFlow: 'Fuego: toca el triángulo, luego la fogata; vuelve a tocarlo y lanza',
    fireNote: 'Fuego: cárgalo en una fogata',
    waterFlow: 'Agua: toca el triángulo invertido, luego la laguna; vuelve a tocarlo y lanza',
    waterNote: 'Agua: cárgala en una laguna',
    runesTitle: 'Runas',
    runes: 'Lanza desde una <b>runa</b> y tu poder <b>aumenta</b>',
    runesBonus: '+25% de área',
    runesHeal: 'curación 33',
    go: '¡A jugar!',
  },
  tutorial: {
    square: {
      draw: ['Dibuja un cuadrado', 'Un cuadrado crea una munición de ataque de tierra para usarla luego.'],
      pick: ['Quedó guardado aquí', 'Toca el cuadrado para prepararlo.'],
      aim: ['Toca al rival', 'El ataque de tierra sale justo donde toques.'],
      watch: '¡Golpe!',
      done: 'Dibuja más formas para seguir atacando.',
    },
    circle: {
      draw: ['¡Te golpearon! Dibuja un círculo', 'Un círculo crea un muro de tierra que te protege de los ataques.'],
      pick: ['Quedó guardado aquí', 'Toca el círculo para prepararlo.'],
      aim: ['Toca hacia el rival', 'El muro se levanta a tu alrededor, de cara a donde toques.'],
      watch: 'Lo que cae dentro del muro no te daña.',
      done: '¡Listo! Ya sabes atacar y defenderte.',
    },
    wrong: {
      square: 'Eso no fue un cuadrado. Sigue la guía e inténtalo otra vez.',
      circle: 'Eso no fue un círculo. Sigue la guía e inténtalo otra vez.',
    },
  } as { square: Lesson; circle: Lesson; wrong: Record<'square' | 'circle', string> },
  tilt: (on: boolean) => `Miniatura: ${on ? 'on' : 'off'}`,
  dev: {
    title: 'Herramientas de desarrollo',
    close: 'Cerrar',
    meadow: 'Pradera',
    regenerate: 'Generar nueva pradera',
    seed: 'Semilla',
    useSeed: 'Usar semilla',
    params: 'Parámetros del generador',
    groups: { Materiales: 'Materiales', Densidad: 'Densidad', Límites: 'Límites' },
    paramLabels: {
      roca: 'Roca',
      tierra: 'Tierra',
      agua: 'Agua',
      fuego: 'Fuego',
      magia: 'Magia',
      restos: 'Restos (madera, ruinas)',
      sendero: 'Sendero',
      arboles: 'Árboles',
      rocas: 'Rocas sueltas',
      hierba: 'Hierba',
      flores: 'Flores y setas',
      relieve: 'Relieve',
      caminableMin: 'Caminable mínimo',
      animadosMax: 'Elementos animados máx.',
    },
    yes: 'sí',
    no: 'no',
    reset: 'Restablecer valores',
    view: 'Vista y rendimiento',
    showFps: 'Mostrar FPS',
    showDebug: 'Mostrar obstáculos y zonas bloqueadas',
    look: 'Estética',
    language: 'Idioma',
    walkable: 'Caminable',
    blocked: 'Bloqueado',
    obstacles: 'Obstáculos',
    generatedIn: 'Generada en',
    trail: 'Sendero',
    skipped: 'Descartado',
    animatedNote: '✦ animado',
    meshes: 'Mallas (draw calls)',
    instances: 'Instancias',
    triangles: 'Triángulos',
    animated: 'Animados',
    noRoomPortrait: 'no cabe en vertical',
    noRoom: 'sin espacio',
    blockedPath: 'bloqueaba el paso',
  },
  materials: { roca: 'Roca', tierra: 'Tierra', agua: 'Agua', fuego: 'Fuego', magia: 'Magia', restos: 'Restos' },
  kinds: {
    menhires: 'Anillo de menhires',
    muro: 'Muro roto',
    penascos: 'Peñascos',
    monticulo: 'Montículo',
    tierraSuelta: 'Tierra removida',
    estanque: 'Estanque',
    fogata: 'Fogata',
    crater: 'Cráter quemado',
    cristales: 'Cristales',
    runas: 'Círculo rúnico',
    empalizada: 'Empalizada',
    carreta: 'Carreta abandonada',
    troncos: 'Troncos caídos',
    estandarte: 'Estandarte',
  },
};

export type Strings = typeof es;

const en: Strings = {
  title: 'Cirquimia',
  difficulty: { facil: 'Easy', normal: 'Normal', dificil: 'Hard' },
  shapes: {
    circle: 'Circle',
    triangle: 'Triangle',
    triangleDown: 'Inverted triangle',
    square: 'Square',
    rhombus: 'Rhombus',
    pentagram: 'Pentagram',
  },
  ammoBar: 'Transmutation circles',
  match: {
    toolbar: 'Match',
    rivalsCap: (n) => `<b>${n}</b> ${n === 1 ? 'rival' : 'rivals'}`,
    rivalsAria: (n) => `Rivals: ${n}. Tap to change and restart the match`,
    levelAria: (level) => `Difficulty: ${level}. Tap to change and restart the match`,
    restarted: (n, level) => `New match · ${n === 0 ? 'no rivals' : n === 1 ? '1 rival' : `${n} rivals`} · ${level}`,
    again: 'Play again',
    victory: 'Victory!',
    victoryAria: 'Victory',
    defeat: 'Game Over',
    won: (n, level) => `You beat ${n === 1 ? 'your rival' : `all ${n} rivals`} · ${level}`,
    lost: (level) => `You fell in battle · ${level}`,
  },
  help: {
    button: 'How to play',
    title: 'How to play',
    move: 'Tap the ground to <b>move</b>',
    draw: 'Draw a symbol: it is <b>stored</b> at the top',
    use: 'Tap the symbol, then the target, to <b>use it</b>',
    shapesTitle: 'Available symbols',
    damage: 'Damage',
    healing: 'Healing',
    defence: 'Defense',
    names: { circle: 'Wall', square: 'Earth', triangle: 'Fire', triangleDown: 'Water', rhombus: 'Heal', pentagram: 'Star' },
    fireFlow: 'Fire: tap the triangle, then the campfire; tap it again and cast',
    fireNote: 'Fire: charge it at a campfire',
    waterFlow: 'Water: tap the inverted triangle, then the lagoon; tap it again and cast',
    waterNote: 'Water: charge it at a lagoon',
    runesTitle: 'Runes',
    runes: 'Cast from a <b>rune</b> and your power <b>grows</b>',
    runesBonus: '+25% area',
    runesHeal: 'healing 33',
    go: "Let's play!",
  },
  tutorial: {
    square: {
      draw: ['Draw a square', 'A square makes an earth attack you can use later.'],
      pick: ['It was stored here', 'Tap the square to get it ready.'],
      aim: ['Tap the rival', 'The earth attack bursts out right where you tap.'],
      watch: 'Hit!',
      done: 'Draw more shapes to keep attacking.',
    },
    circle: {
      draw: ['You got hit! Draw a circle', 'A circle makes an earth wall that shields you from attacks.'],
      pick: ['It was stored here', 'Tap the circle to get it ready.'],
      aim: ['Tap towards the rival', 'The wall rises around you, facing where you tap.'],
      watch: 'Anything that lands inside the wall does not hurt you.',
      done: 'Done! Now you know how to attack and defend.',
    },
    wrong: {
      square: "That wasn't a square. Follow the guide and try again.",
      circle: "That wasn't a circle. Follow the guide and try again.",
    },
  },
  tilt: (on) => `Miniature: ${on ? 'on' : 'off'}`,
  dev: {
    title: 'Developer tools',
    close: 'Close',
    meadow: 'Meadow',
    regenerate: 'Generate new meadow',
    seed: 'Seed',
    useSeed: 'Use seed',
    params: 'Generator parameters',
    groups: { Materiales: 'Materials', Densidad: 'Density', Límites: 'Limits' },
    paramLabels: {
      roca: 'Rock',
      tierra: 'Earth',
      agua: 'Water',
      fuego: 'Fire',
      magia: 'Magic',
      restos: 'Remains (wood, ruins)',
      sendero: 'Trail',
      arboles: 'Trees',
      rocas: 'Loose rocks',
      hierba: 'Grass',
      flores: 'Flowers and mushrooms',
      relieve: 'Relief',
      caminableMin: 'Minimum walkable',
      animadosMax: 'Max animated features',
    },
    yes: 'yes',
    no: 'no',
    reset: 'Reset values',
    view: 'View and performance',
    showFps: 'Show FPS',
    showDebug: 'Show obstacles and blocked areas',
    look: 'Look',
    language: 'Language',
    walkable: 'Walkable',
    blocked: 'Blocked',
    obstacles: 'Obstacles',
    generatedIn: 'Generated in',
    trail: 'Trail',
    skipped: 'Skipped',
    animatedNote: '✦ animated',
    meshes: 'Meshes (draw calls)',
    instances: 'Instances',
    triangles: 'Triangles',
    animated: 'Animated',
    noRoomPortrait: "doesn't fit in portrait",
    noRoom: 'no room',
    blockedPath: 'blocked the way',
  },
  materials: { roca: 'Rock', tierra: 'Earth', agua: 'Water', fuego: 'Fire', magia: 'Magic', restos: 'Remains' },
  kinds: {
    menhires: 'Standing stone ring',
    muro: 'Broken wall',
    penascos: 'Boulders',
    monticulo: 'Mound',
    tierraSuelta: 'Turned earth',
    estanque: 'Lagoon',
    fogata: 'Campfire',
    crater: 'Burnt crater',
    cristales: 'Crystals',
    runas: 'Rune circle',
    empalizada: 'Palisade',
    carreta: 'Abandoned cart',
    troncos: 'Fallen logs',
    estandarte: 'Banner',
  },
};

export const t: Strings = LANG === 'es' ? es : en;

/** Numbers formatted for the current language. */
export const formatNumber = (n: number) => n.toLocaleString(LANG);

if (typeof document !== 'undefined') document.documentElement.lang = LANG;
