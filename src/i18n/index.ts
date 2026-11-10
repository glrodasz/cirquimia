/**
 * Every player-facing string, in Spanish and English.
 * The URL decides the language: / is English, /es is Spanish. On the first visit to /, the edge
 * (functions/_middleware.ts) sends the player to their saved choice or their browser's language.
 */
import { LANGUAGE_NAMES, LOCALE_COOKIE, isLocale, localePrefix, pageLocale, readCookie, switchLocalePath, type Locale } from './locale';
import { persistLocale } from './persistLocale';

export type Lang = Locale;

export const LANG: Lang = typeof location === 'undefined' ? 'en' : pageLocale(location.pathname);

/** The counterpart of this page in another language, keeping ?seed, ?look and the like. */
export function langHref(lang: Lang) {
  return switchLocalePath(location.pathname, lang) + location.search + location.hash;
}

/** A real link to the other language: crawlable, and it remembers the choice when followed. */
export function langLink(lang: Lang, className: string, label = LANGUAGE_NAMES[lang]) {
  const link = document.createElement('a');
  link.className = className;
  link.href = langHref(lang);
  link.hreflang = lang;
  link.lang = lang;
  link.textContent = label;
  link.setAttribute('aria-label', strings[lang].switchLanguage);
  if (lang === LANG) link.setAttribute('aria-current', 'page');
  link.addEventListener('click', () => persistLocale(lang));
  return link;
}

// Before the URL path carried the language, the choice lived in ?lang= and localStorage; move it to the cookie once.
const LEGACY_STORE = 'cirquimia.lang';
try {
  const url = new URL(location.href);
  const fromQuery = url.searchParams.get('lang');
  if (isLocale(fromQuery)) {
    persistLocale(fromQuery);
    localStorage.removeItem(LEGACY_STORE);
    url.searchParams.delete('lang');
    url.pathname = switchLocalePath(url.pathname, fromQuery);
    location.replace(url);
  }
  const legacy = localStorage.getItem(LEGACY_STORE);
  if (isLocale(legacy)) {
    localStorage.removeItem(LEGACY_STORE);
    if (!readCookie(document.cookie, LOCALE_COOKIE)) {
      persistLocale(legacy);
      if (legacy !== LANG && !localePrefix(location.pathname)) location.replace(langHref(legacy));
    }
  }
} catch {
  // Blocked storage or no DOM: nothing to migrate.
}

type Line = [title: string, body: string];
interface Lesson {
  draw: Line;
  aim: Line;
  watch: string;
  done: string;
}

interface MoveLesson {
  walk: Line;
  pad: Line;
  keys: Line;
  done: string;
}

const es = {
  title: 'Cirquimia',
  switchLanguage: 'Cambiar a español',
  difficulty: { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil', experto: 'Muy difícil' },
  match: {
    toolbar: 'Partida',
    rivalsCap: (n: number) => (n === 0 ? 'Entrenamiento' : `<b>${n}</b> ${n === 1 ? 'rival' : 'rivales'}`),
    rivalsAria: (n: number) =>
      `${n === 0 ? 'Entrenamiento, sin rivales' : `Rivales: ${n}`}. Toca para cambiar y reiniciar la partida`,
    levelAria: (level: string) => `Dificultad: ${level}. Toca para cambiar y reiniciar la partida`,
    restarted: (n: number, level: string) => (n === 0 ? 'Entrenamiento' : `Nueva partida · ${n === 1 ? '1 rival' : `${n} rivales`} · ${level}`),
    again: 'Jugar de nuevo',
    victory: '¡Victoria!',
    victoryAria: 'Victoria',
    defeat: 'Game Over',
    won: (n: number, level: string) => `Venciste a ${n === 1 ? 'tu rival' : `tus ${n} rivales`} · ${level}`,
    lost: (level: string) => `Has caído en combate · ${level}`,
    spotTitle: '¿Quieres más reto?',
    spotBody: 'Toca aquí para cambiar el número de rivales y la dificultad.',
  },
  rank: {
    button: 'Ranking',
    title: 'Ranking global',
    today: 'Hoy',
    all: 'Siempre',
    points: (n: number): string => (n === 1 ? 'punto' : 'puntos'),
    rivals: (n: number) => (n === 1 ? '1 rival' : `${n} rivales`),
    damage: (n: number) => `${n} de daño`,
    placeToday: (n: number) => `#${n} hoy`,
    placed: (today: number, all: number) => `Puesto <b>#${today}</b> de hoy · <b>#${all}</b> global`,
    beatMe: '¿Me superas?',
    shareText: (score: string, time: string, rivals: number, level: string, url: string) =>
      `⚗️ ${score} puntos en Cirquimia: vencí a ${rivals === 1 ? '1 rival' : `${rivals} rivales`} en ${level} en ${time}. ¿Me superas? ${url}`,
    initials: 'Tus iniciales',
    save: 'Guardar',
    saving: 'Guardando…',
    share: 'Compartir',
    more: 'Más',
    saveImage: 'Guardar imagen',
    dare: (score: string, points: string) => `¿Quién supera tus ${score} ${points}?`,
    postOnX: 'Publicar en', // + X
    sendDiscord: 'Enviar a', // + Discord
    preview: 'Tu tarjeta: toca para guardarla',
    xCopied: 'Imagen copiada: pégala en tu post de X.',
    discordCopied: 'Imagen copiada: pégala en Discord.',
    discordSaved: 'Imagen guardada: súbela a Discord.',
    mastodonHost: 'Tu servidor (ej. mastodon.social)',
    go: 'Ir',
    view: 'Ver ranking',
    unavailable: 'El ranking no está disponible ahora.',
    tooMany: 'Demasiados envíos seguidos. Prueba en unos minutos.',
    rejected: 'Esta partida no puede entrar al ranking.',
    empty: 'Nadie ha puntuado todavía. ¡Sé el primero!',
    loading: 'Cargando…',
    close: 'Cerrar',
    category: { mobile: 'Móvil', tablet: 'Tablet', desktop: 'Escritorio' },
    columns: ['#', 'Iniciales', 'Puntos', 'Partida'] as [string, string, string, string],
    rule: 'Puntos: tu daño × dificultad × rapidez · «Hoy» se reinicia a medianoche UTC',
    mine: 'Tuyo',
  },
  help: {
    button: 'Cómo jugar',
    title: 'Cómo jugar',
    slides: [
      ['Muévete', 'Toca el suelo y el alquimista <b>camina</b> hasta allí.'],
      ['Dibuja un símbolo', 'Traza la forma con el dedo: queda <b>lista en tu mano</b>. Solo uno a la vez: uno nuevo reemplaza al anterior. El muro y la cura salen al instante.'],
      ['Lánzalo', 'Toca al <b>rival</b> y el ataque sale ahí. Toca al alquimista para soltarlo.'],
    ],
    pad: 'Toca el suelo y el alquimista <b>camina</b> hasta allí, o deja el dedo quieto en el <b>aro de abajo a la izquierda</b> y deslízalo.',
    slideOf: (n: number, total: number) => `Paso ${n} de ${total}`,
    pageOf: (n: number, total: number) => `Página ${n} de ${total}`,
    back: 'Atrás',
    next: 'Siguiente',
    close: 'Cerrar',
    symbolsButton: 'Símbolos',
    shapesTitle: 'Símbolos disponibles',
    damage: 'Daño',
    healing: 'Curación',
    rooting: 'Atrapa',
    defence: 'Defensa',
    names: { circle: 'Muro', square: 'Tierra', triangle: 'Fuego', triangleDown: 'Agua', rhombus: 'Cura', pentagram: 'Estrella', hourglass: 'Explosión', fireStar: 'Estrella de fuego', waterStar: 'Estrella de agua', spiral: 'Enredadera' },
    fireNote: 'Fuego: dibuja el triángulo sobre una fogata',
    waterNote: 'Agua: dibuja el triángulo invertido sobre una laguna',
    sourcesTitle: 'Fuego, agua y runas',
    runesNote: 'Desde una runa: +25% de área · curación 33 · sin muros',
    comboTitle: 'Combinaciones',
    comboNote: 'Con uno en la mano, dibuja el otro (en cualquier orden): se unen. La explosión pega más en menos área; la estrella de fuego o agua, 20 en cada punta.',
    howTo: 'Cómo jugar',
    ok: 'Entendido',
    go: '¡A jugar!',
  },
  tutorial: {
    move: {
      walk: ['Muévete hasta la marca', 'Toca el suelo donde brilla.'],
      pad: ['Muévete hasta la marca', 'Toca el suelo donde brilla, o deja el dedo en el aro y deslízalo.'],
      keys: ['Muévete hasta la marca', 'Usa WASD o las flechas, o haz clic donde brilla.'],
      done: '¡Bien! Ahora a pelear.',
    },
    square: {
      draw: ['Dibuja un cuadrado', 'Un cuadrado crea un ataque de tierra.'],
      aim: ['Toca al rival', 'El ataque de tierra sale justo donde toques.'],
      watch: '¡Golpe!',
      done: 'Dibuja más formas para seguir atacando.',
    },
    circle: {
      draw: ['¡Te golpearon! Dibuja un círculo', 'Un círculo levanta al instante un muro de tierra de cara al rival.'],
      aim: ['Toca hacia el rival', 'El muro se levanta a tu alrededor, de cara a donde toques.'],
      watch: 'Lo que cae dentro del muro no te daña.',
      done: '¡Listo! Ya sabes atacar y defenderte.',
    },
    wrong: {
      square: 'Eso no fue un cuadrado. Sigue la guía e inténtalo otra vez.',
      circle: 'Eso no fue un círculo. Sigue la guía e inténtalo otra vez.',
    },
  } as { move: MoveLesson; square: Lesson; circle: Lesson; wrong: Record<'square' | 'circle', string> },
  sources: {
    fire: ['¡Fuego cargado!', 'Toca al rival para lanzarlo.'],
    water: ['¡Agua cargada!', 'Toca al rival para lanzarla.'],
    both: 'Carga fuego y luego agua: se unen en una explosión.',
  },
  practice: {
    hitMe: '¡Golpéame!',
    progress: (n: number, total: number) => `Entrenamiento · ${n} de ${total} ataques probados`,
    allDone: '¡Probaste todos los ataques!',
    got: (name: string) => `¡${name}!`,
    rune: 'Desde una runa',
    bookAria: 'Símbolos: mira aquí los ataques que ya probaste',
  },
  device: {
    touch: 'Cirquimia se disfruta mucho más en un móvil o tableta táctil',
    portrait: 'Cirquimia se juega mejor en vertical',
  },
  keys: {
    hint: 'o flechas para moverte',
    move: 'Usa <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> o las flechas para <b>caminar</b>. También puedes hacer clic en el suelo.',
  },
  gpu: {
    none: {
      title: 'Activa la aceleración por hardware',
      body: 'Cirquimia necesita la tarjeta gráfica (WebGL 2) para dibujar la pradera, y tu navegador no la está usando.',
    },
    software: {
      title: 'Tu navegador no usa la tarjeta gráfica',
      body: 'El juego puede abrir, pero irá muy lento sin aceleración por hardware.',
    },
    how: (browser: string) => `Cómo activarla en ${browser}`,
    names: { chrome: 'Chrome', edge: 'Edge', brave: 'Brave', opera: 'Opera', firefox: 'Firefox', safari: 'Safari', other: 'tu navegador' },
    steps: {
      chrome: ['Abre `chrome://settings/system` en una pestaña nueva.', 'Activa «Usar la aceleración de gráficos cuando esté disponible».', 'Pulsa «Reiniciar» y vuelve a esta página.'],
      edge: ['Abre `edge://settings/system` en una pestaña nueva.', 'Activa «Usar la aceleración de gráficos cuando esté disponible».', 'Pulsa «Reiniciar» y vuelve a esta página.'],
      brave: ['Abre `brave://settings/system` en una pestaña nueva.', 'Activa «Usar la aceleración de gráficos cuando esté disponible».', 'Pulsa «Reiniciar» y vuelve a esta página.'],
      opera: ['Abre `opera://settings/system` en una pestaña nueva.', 'Activa «Usar aceleración por hardware cuando esté disponible».', 'Reinicia Opera y vuelve a esta página.'],
      firefox: ['Abre Ajustes → General → Rendimiento.', 'Desmarca «Usar la configuración de rendimiento recomendada».', 'Marca «Usar aceleración por hardware cuando esté disponible» y reinicia Firefox.'],
      safari: ['Actualiza el sistema (iOS, iPadOS o macOS) a la última versión.', 'Cierra otras pestañas o apps pesadas y vuelve a abrir Safari.', 'Si sigue sin cargar, prueba en Chrome o Firefox.'],
      other: ['Busca en los ajustes del navegador «aceleración por hardware» o «aceleración de gráficos» y actívala.', 'Reinicia el navegador y vuelve a esta página.', 'Si no aparece, prueba en Chrome, Edge, Firefox o Safari.'],
    } as Record<'chrome' | 'edge' | 'brave' | 'opera' | 'firefox' | 'safari' | 'other', string[]>,
    note: 'Si ya está activada, actualiza los controladores de la tarjeta gráfica o prueba con otro navegador.',
    retry: 'Reintentar',
    playAnyway: 'Jugar de todos modos',
  },
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
    quality: 'Calidad',
    qualityAuto: 'Auto',
    tiers: { high: 'Alta', medium: 'Media', low: 'Baja' },
    qualityNow: (tier: string, why: string) => `Ahora: ${tier}${why ? ` (${why})` : ''}`,
    qualityReasons: {
      none: 'hardware sin límites',
      gpu: 'GPU modesta',
      software: 'sin aceleración gráfica',
      cores: 'pocos núcleos',
      memory: 'poca memoria',
      fps: 'bajada por FPS',
      forced: 'forzada',
    },
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
  switchLanguage: 'Switch to English',
  difficulty: { facil: 'Easy', normal: 'Normal', dificil: 'Hard', experto: 'Very hard' },
  match: {
    toolbar: 'Match',
    rivalsCap: (n) => (n === 0 ? 'Training' : `<b>${n}</b> ${n === 1 ? 'rival' : 'rivals'}`),
    rivalsAria: (n) => `${n === 0 ? 'Training, no rivals' : `Rivals: ${n}`}. Tap to change and restart the match`,
    levelAria: (level) => `Difficulty: ${level}. Tap to change and restart the match`,
    restarted: (n, level) => (n === 0 ? 'Training' : `New match · ${n === 1 ? '1 rival' : `${n} rivals`} · ${level}`),
    again: 'Play again',
    victory: 'Victory!',
    victoryAria: 'Victory',
    defeat: 'Game Over',
    won: (n, level) => `You beat ${n === 1 ? 'your rival' : `all ${n} rivals`} · ${level}`,
    lost: (level) => `You fell in battle · ${level}`,
    spotTitle: 'Want more of a challenge?',
    spotBody: 'Tap here to change the number of rivals and the difficulty.',
  },
  rank: {
    button: 'Leaderboard',
    title: 'Global leaderboard',
    today: 'Today',
    all: 'All time',
    points: (n) => (n === 1 ? 'point' : 'points'),
    rivals: (n) => (n === 1 ? '1 rival' : `${n} rivals`),
    damage: (n) => `${n} damage`,
    placeToday: (n) => `#${n} today`,
    placed: (today, all) => `<b>#${today}</b> today · <b>#${all}</b> all time`,
    beatMe: 'Can you beat me?',
    shareText: (score, time, rivals, level, url) =>
      `⚗️ ${score} points in Cirquimia: beat ${rivals === 1 ? '1 rival' : `${rivals} rivals`} on ${level} in ${time}. Can you beat me? ${url}`,
    initials: 'Your initials',
    save: 'Save',
    saving: 'Saving…',
    share: 'Share',
    more: 'More',
    saveImage: 'Save image',
    dare: (score, points) => `Who can beat your ${score} ${points}?`,
    postOnX: 'Post on',
    sendDiscord: 'Send to',
    preview: 'Your card: tap to save it',
    xCopied: 'Image copied: paste it into your X post.',
    discordCopied: 'Image copied: paste it in Discord.',
    discordSaved: 'Image saved: upload it to Discord.',
    mastodonHost: 'Your server (e.g. mastodon.social)',
    go: 'Go',
    view: 'See leaderboard',
    unavailable: 'The leaderboard is unavailable right now.',
    tooMany: 'Too many submissions in a row. Try again in a few minutes.',
    rejected: 'This match cannot enter the leaderboard.',
    empty: 'No scores yet. Be the first!',
    loading: 'Loading…',
    close: 'Close',
    category: { mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop' },
    columns: ['#', 'Initials', 'Points', 'Match'],
    rule: 'Points: your damage × difficulty × speed · "Today" resets at midnight UTC',
    mine: 'Yours',
  },
  help: {
    button: 'How to play',
    title: 'How to play',
    slides: [
      ['Move', 'Tap the ground and the alchemist <b>walks</b> there.'],
      ['Draw a symbol', 'Trace the shape with your finger: it is <b>ready in your hand</b>. Only one at a time: a new one replaces the last. Walls and heals go off at once.'],
      ['Cast it', 'Tap the <b>rival</b> and the attack lands there. Tap the alchemist to drop it.'],
    ],
    pad: 'Tap the ground and the alchemist <b>walks</b> there, or rest your finger on the <b>ring at the bottom left</b> and slide it.',
    slideOf: (n: number, total: number) => `Step ${n} of ${total}`,
    pageOf: (n: number, total: number) => `Page ${n} of ${total}`,
    back: 'Back',
    next: 'Next',
    close: 'Close',
    symbolsButton: 'Symbols',
    shapesTitle: 'Available symbols',
    damage: 'Damage',
    healing: 'Healing',
    rooting: 'Roots',
    defence: 'Defense',
    names: { circle: 'Wall', square: 'Earth', triangle: 'Fire', triangleDown: 'Water', rhombus: 'Heal', pentagram: 'Star', hourglass: 'Blast', fireStar: 'Fire star', waterStar: 'Water star', spiral: 'Vine' },
    fireNote: 'Fire: draw the triangle over a campfire',
    waterNote: 'Water: draw the inverted triangle over a lagoon',
    sourcesTitle: 'Fire, water and runes',
    runesNote: 'From a rune: +25% area · healing 33 · no walls',
    comboTitle: 'Combinations',
    comboNote: 'With one in hand, draw the other (in either order): they merge. The blast hits harder over less ground; a fire or water star hits 20 at each tip.',
    howTo: 'How to play',
    ok: 'Got it',
    go: "Let's play!",
  },
  tutorial: {
    move: {
      walk: ['Walk to the mark', 'Tap the ground where it glows.'],
      pad: ['Walk to the mark', 'Tap the ground where it glows, or rest your finger on the ring and slide it.'],
      keys: ['Walk to the mark', 'Use WASD or the arrow keys, or click where it glows.'],
      done: 'Nice! Now, to battle.',
    },
    square: {
      draw: ['Draw a square', 'A square makes an earth attack.'],
      aim: ['Tap the rival', 'The earth attack bursts out right where you tap.'],
      watch: 'Hit!',
      done: 'Draw more shapes to keep attacking.',
    },
    circle: {
      draw: ['You got hit! Draw a circle', 'A circle instantly raises an earth wall facing the rival.'],
      aim: ['Tap towards the rival', 'The wall rises around you, facing where you tap.'],
      watch: 'Anything that lands inside the wall does not hurt you.',
      done: 'Done! Now you know how to attack and defend.',
    },
    wrong: {
      square: "That wasn't a square. Follow the guide and try again.",
      circle: "That wasn't a circle. Follow the guide and try again.",
    },
  },
  sources: {
    fire: ['Fire charged!', 'Tap the rival to cast it.'],
    water: ['Water charged!', 'Tap the rival to cast it.'],
    both: 'Charge fire, then water: they merge into a blast.',
  },
  practice: {
    hitMe: 'Hit me!',
    progress: (n, total) => `Training · ${n} of ${total} attacks tried`,
    allDone: 'You tried every attack!',
    got: (name) => `${name}!`,
    rune: 'From a rune',
    bookAria: 'Symbols: see the attacks you have tried here',
  },
  device: {
    touch: 'Cirquimia plays much better on a touch phone or tablet',
    portrait: 'Cirquimia plays best in portrait mode',
  },
  keys: {
    hint: 'or arrows to move',
    move: 'Use <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or the arrow keys to <b>walk</b>. You can also click the ground.',
  },
  gpu: {
    none: {
      title: 'Turn on hardware acceleration',
      body: 'Cirquimia needs your graphics card (WebGL 2) to draw the meadow, and your browser isn’t using it.',
    },
    software: {
      title: 'Your browser isn’t using the graphics card',
      body: 'The game can open, but it will run very slowly without hardware acceleration.',
    },
    how: (browser) => `How to turn it on in ${browser}`,
    names: { chrome: 'Chrome', edge: 'Edge', brave: 'Brave', opera: 'Opera', firefox: 'Firefox', safari: 'Safari', other: 'your browser' },
    steps: {
      chrome: ['Open `chrome://settings/system` in a new tab.', 'Turn on “Use graphics acceleration when available”.', 'Click “Relaunch” and come back to this page.'],
      edge: ['Open `edge://settings/system` in a new tab.', 'Turn on “Use graphics acceleration when available”.', 'Click “Restart” and come back to this page.'],
      brave: ['Open `brave://settings/system` in a new tab.', 'Turn on “Use graphics acceleration when available”.', 'Click “Relaunch” and come back to this page.'],
      opera: ['Open `opera://settings/system` in a new tab.', 'Turn on “Use hardware acceleration when available”.', 'Restart Opera and come back to this page.'],
      firefox: ['Open Settings → General → Performance.', 'Untick “Use recommended performance settings”.', 'Tick “Use hardware acceleration when available” and restart Firefox.'],
      safari: ['Update your system (iOS, iPadOS or macOS) to the latest version.', 'Close other heavy tabs or apps and reopen Safari.', 'If it still won’t load, try Chrome or Firefox.'],
      other: ['Look for “hardware acceleration” or “graphics acceleration” in your browser settings and turn it on.', 'Restart the browser and come back to this page.', 'If you can’t find it, try Chrome, Edge, Firefox or Safari.'],
    },
    note: 'If it’s already on, update your graphics drivers or try another browser.',
    retry: 'Try again',
    playAnyway: 'Play anyway',
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
    quality: 'Quality',
    qualityAuto: 'Auto',
    tiers: { high: 'High', medium: 'Medium', low: 'Low' },
    qualityNow: (tier: string, why: string) => `Now: ${tier}${why ? ` (${why})` : ''}`,
    qualityReasons: {
      none: 'no hardware limits',
      gpu: 'modest GPU',
      software: 'no graphics acceleration',
      cores: 'few CPU cores',
      memory: 'little memory',
      fps: 'stepped down for FPS',
      forced: 'forced',
    },
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

const strings: Record<Lang, Strings> = { es, en };
export const t: Strings = strings[LANG];

/** Numbers formatted for the current language. */
export const formatNumber = (n: number) => n.toLocaleString(LANG);

if (typeof document !== 'undefined') document.documentElement.lang = LANG;
