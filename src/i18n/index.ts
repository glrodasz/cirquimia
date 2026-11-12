/**
 * Every player-facing string, in Spanish and English.
 * The URL decides the language: / is English, /es is Spanish. On the first visit to /, the edge
 * (functions/_middleware.ts) sends the player to their saved choice or their browser's language.
 */
import { LANGUAGE_NAMES, LOCALE_COOKIE, isLocale, localePrefix, negotiateLocale, pageLocale, readCookie, switchLocalePath, type Locale } from './locale';
import { persistLocale } from './persistLocale';
import { PORTAL } from '../platform';

export type Lang = Locale;

/** Portal builds (itch.io) have no /es page: the language is ?lang=, else the saved choice, else the browser's. */
const PORTAL_STORE = 'cirquimia.lang';
function portalLocale(): Locale {
  const fromQuery = new URLSearchParams(location.search).get('lang');
  if (isLocale(fromQuery)) return fromQuery;
  try {
    const saved = localStorage.getItem(PORTAL_STORE);
    if (isLocale(saved)) return saved;
  } catch {}
  return negotiateLocale(navigator.languages ?? [navigator.language]);
}

export const LANG: Lang = typeof location === 'undefined' ? 'en' : PORTAL ? portalLocale() : pageLocale(location.pathname);

/** The counterpart of this page in another language, keeping ?seed, ?look and the like. */
export function langHref(lang: Lang) {
  if (PORTAL) {
    const params = new URLSearchParams(location.search);
    params.set('lang', lang);
    return `?${params}${location.hash}`;
  }
  return switchLocalePath(location.pathname, lang) + location.search + location.hash;
}

function remember(lang: Lang) {
  if (!PORTAL) return persistLocale(lang);
  try {
    localStorage.setItem(PORTAL_STORE, lang);
  } catch {}
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
  link.addEventListener('click', () => remember(lang));
  return link;
}

// Before the URL path carried the language, the choice lived in ?lang= and localStorage; move it to the cookie once.
const LEGACY_STORE = 'cirquimia.lang';
if (!PORTAL) try {
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
  title: string;
  /** First, where there is one, the stick or the keys, then the tap (or click) on the mark: either one walks. */
  tap: string;
  click: string;
  orTap: string;
  orClick: string;
  pad: string;
  keys: string;
  done: string;
}

const es = {
  title: 'Cirquimia',
  switchLanguage: 'Cambiar a español',
  difficulty: { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil', experto: 'Muy difícil' },
  match: {
    toolbar: 'Partida',
    time: 'Tiempo de partida',
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
    saveShare: 'Guardar y compartir',
    nameToShare: 'Pon tus iniciales para compartir tu tarjeta.',
    readyToShare: 'Listo: ya puedes compartirla.',
    share: 'Compartir',
    more: 'Más',
    saveImage: 'Guardar imagen',
    dare: (score: string, points: string) => `¿Quién supera tus ${score} ${points}?`,
    postOnX: 'Publicar en', // + X
    sendDiscord: 'Enviar a', // + Discord
    preview: 'Tu tarjeta: toca para guardarla',
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
    title: 'Cómo jugar',
    slides: [
      ['Muévete', 'Toca el <b>suelo</b>|Tu alquimista camina hasta allí'],
      ['Dibuja un símbolo', 'Traza el símbolo para lanzar|Un símbolo nuevo reemplaza el anterior'],
      ['Lánzalo', 'Toca al <b>rival</b> para lanzarlo|Toca a tu alquimista para soltarlo'],
    ],
    // Pages 2 and 3 with a mouse.
    desk: ['Traza el símbolo para lanzar|Un símbolo nuevo reemplaza el anterior', 'Haz clic en el <b>rival</b> para lanzarlo|Haz clic en tu alquimista para soltarlo'],
    // The two ways to walk, one step each: pointing at the map, and the stick or the keys.
    moveWays: {
      tap: 'Toca el <b>mapa</b> para caminar hasta allí',
      click: 'Haz clic en el <b>mapa</b> para caminar hasta allí',
      stick: 'O usa el <b>joystick</b>: desliza el dedo en el aro',
      keys: 'O camina con <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> o las flechas',
    },
    slideOf: (n: number, total: number) => `Paso ${n} de ${total}`,
    pageOf: (n: number, total: number) => `Página ${n} de ${total}`,
    back: 'Atrás',
    next: 'Siguiente',
    close: 'Cerrar',
    bookButton: 'Libro: símbolos y cómo jugar',
    symbolsButton: 'Símbolos',
    language: 'Idioma',
    shapesTitle: 'Símbolos disponibles',
    roles: { circle: 'Muro de defensa', square: 'Ataque de tierra', triangle: 'Ataque de fuego', triangleDown: 'Ataque de agua', rhombus: 'Curación', pentagram: 'Ataque múltiple de tierra', spiral: 'Enredadera que atrapa', hourglass: 'Explosión', fireStar: 'Estrella de fuego', waterStar: 'Estrella de agua' },
    names: { circle: 'Muro', square: 'Tierra', triangle: 'Fuego', triangleDown: 'Agua', rhombus: 'Cura', pentagram: 'Estrella', hourglass: 'Explosión', fireStar: 'Estrella de fuego', waterStar: 'Estrella de agua', spiral: 'Enredadera' },
    fireNote: 'Fuego: dibuja el triángulo sobre una fogata',
    waterNote: 'Agua: dibuja el triángulo invertido sobre una laguna',
    sourcesTitle: 'Fuego y agua',
    runesNote: 'Dibujar desde una runa potencia los ataques y las curaciones',
    comboTitle: 'Combinaciones',
    comboNote: 'Con uno en la mano, dibuja el otro (en cualquier orden): se unen. Atrapado dentro de una estrella, quédate quieto: cruzar sus columnas también golpea.',
    howTo: 'Cómo jugar',
    ok: 'Entendido',
    go: '¡A jugar!',
  },
  tutorial: {
    move: {
      title: 'Muévete hasta la marca',
      tap: 'Toca el suelo donde brilla.',
      click: 'Haz clic en el suelo donde brilla.',
      orTap: 'O toca el suelo donde brilla.',
      orClick: 'O haz clic en el suelo donde brilla.',
      pad: 'Deja el dedo en el aro y deslízalo.',
      keys: 'Camina con WASD o las flechas.',
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
  sound: { mute: 'Silenciar sonido', unmute: 'Activar sonido' },
  practice: {
    hitMe: '¡Golpéame!',
    progress: (n: number, total: number) => `Entrenamiento · ${n} de ${total} ataques probados`,
    allDone: '¡Probaste todos los ataques!',
    got: (name: string) => `¡${name}!`,
    rune: 'Desde una runa',
    bookAria: 'Símbolos: mira aquí los ataques que ya probaste',
  },
  device: {
    touch: 'También en tu móvil: cirquimia.pages.dev',
    portrait: 'Cirquimia se juega mejor en vertical',
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
    heading: 'Herramientas',
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
    view: 'Vista',
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
    tabs: { meadow: 'Pradera', data: 'Datos', tests: 'Pruebas' },
    genControls: 'Controles de generación',
    thisMeadow: 'Esta pradera',
    performance: 'Rendimiento',
    testsNote: 'Lo que el juego recuerda en este navegador. Cada botón lo deja como al principio y recarga.',
    firstTime: 'Primera vez',
    prefs: 'Preferencias',
    ranking: 'Ranking',
    restart: 'Reiniciar',
    replay: 'Repetir',
    showNow: 'Mostrar ya',
    showAgain: 'Mostrar otra vez',
    onlyDesktop: 'solo con ratón',
    queued: 'en cola',
    flags: {
      tutorial: 'Tutorial (caminar, atacar, muro)',
      sources: 'Pistas de fuego y agua',
      hudspot: 'Aviso de rivales y nivel',
      keys: 'Teclas WASD',
      desktop: 'Nota «también en tu móvil»',
      sound: 'Sonido',
      gpu: 'Aviso de GPU sin aceleración',
      match: 'Partida (rivales y nivel)',
      look: 'Estética',
      lang: 'Idioma elegido',
      initials: 'Iniciales',
      myscores: 'Mis puntuaciones',
      mastodon: 'Servidor de Mastodon',
    },
    states: {
      none: 'sin guardar',
      moved: 'caminar hecho',
      square: 'ataque hecho',
      done: 'hecho',
      next: 'próxima partida',
      shown: 'visto',
      used: 'usadas',
      on: 'activado',
      off: 'apagado',
      software: 'jugar igual',
      pending: (n: number) => `faltan ${n}`,
      count: (n: number) => `${n} guardadas`,
      thisVisit: (told: boolean): string => (told ? 'vista en esta visita' : 'pendiente en esta visita'),
    },
    newPlayer: 'Empezar como jugador nuevo',
    newPlayerNote: 'Borra todo lo anterior menos estos ajustes de desarrollo.',
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
    time: 'Match time',
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
    saveShare: 'Save and share',
    nameToShare: 'Add your initials to share your card.',
    readyToShare: 'Done: you can share it now.',
    share: 'Share',
    more: 'More',
    saveImage: 'Save image',
    dare: (score, points) => `Who can beat your ${score} ${points}?`,
    postOnX: 'Post on',
    sendDiscord: 'Send to',
    preview: 'Your card: tap to save it',
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
    title: 'How to play',
    slides: [
      ['Move', 'Tap the <b>ground</b>|Your alchemist walks there'],
      ['Draw a symbol', 'Trace the symbol to cast|A new symbol replaces the last one'],
      ['Cast it', 'Tap the <b>rival</b> to cast it|Tap your alchemist to drop it'],
    ],
    desk: ['Trace the symbol to cast|A new symbol replaces the last one', 'Click the <b>rival</b> to cast it|Click your alchemist to drop it'],
    moveWays: {
      tap: 'Tap the <b>map</b> to walk there',
      click: 'Click the <b>map</b> to walk there',
      stick: 'Or use the <b>joystick</b>: slide your finger on the ring',
      keys: 'Or walk with <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or the arrow keys',
    },
    slideOf: (n: number, total: number) => `Step ${n} of ${total}`,
    pageOf: (n: number, total: number) => `Page ${n} of ${total}`,
    back: 'Back',
    next: 'Next',
    close: 'Close',
    bookButton: 'Book: symbols and how to play',
    symbolsButton: 'Symbols',
    language: 'Language',
    shapesTitle: 'Available symbols',
    roles: { circle: 'Defensive wall', square: 'Earth attack', triangle: 'Fire attack', triangleDown: 'Water attack', rhombus: 'Healing', pentagram: 'Multiple earth attack', spiral: 'Snaring vine', hourglass: 'Blast', fireStar: 'Fire star', waterStar: 'Water star' },
    names: { circle: 'Wall', square: 'Earth', triangle: 'Fire', triangleDown: 'Water', rhombus: 'Heal', pentagram: 'Star', hourglass: 'Blast', fireStar: 'Fire star', waterStar: 'Water star', spiral: 'Vine' },
    fireNote: 'Fire: draw the triangle over a campfire',
    waterNote: 'Water: draw the inverted triangle over a lagoon',
    sourcesTitle: 'Fire and water',
    runesNote: 'Drawing from a rune powers up attacks and healing',
    comboTitle: 'Combinations',
    comboNote: 'With one in hand, draw the other (in either order): they merge. Caught inside a star, stand still: crossing its columns hits too.',
    howTo: 'How to play',
    ok: 'Got it',
    go: "Let's play!",
  },
  tutorial: {
    move: {
      title: 'Walk to the mark',
      tap: 'Tap the ground where it glows.',
      click: 'Click the ground where it glows.',
      orTap: 'Or tap the ground where it glows.',
      orClick: 'Or click the ground where it glows.',
      pad: 'Rest your finger on the ring and slide it.',
      keys: 'Walk with WASD or the arrow keys.',
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
  sound: { mute: 'Mute sound', unmute: 'Turn sound on' },
  practice: {
    hitMe: 'Hit me!',
    progress: (n, total) => `Training · ${n} of ${total} attacks tried`,
    allDone: 'You tried every attack!',
    got: (name) => `${name}!`,
    rune: 'From a rune',
    bookAria: 'Symbols: see the attacks you have tried here',
  },
  device: {
    touch: 'Also on your phone: cirquimia.pages.dev',
    portrait: 'Cirquimia plays best in portrait mode',
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
    heading: 'Dev tools',
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
    view: 'View',
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
    tabs: { meadow: 'Meadow', data: 'Data', tests: 'Tests' },
    genControls: 'Generation controls',
    thisMeadow: 'This meadow',
    performance: 'Performance',
    testsNote: 'What the game remembers in this browser. Each button puts it back to the start and reloads.',
    firstTime: 'First time',
    prefs: 'Preferences',
    ranking: 'Leaderboard',
    restart: 'Reset',
    replay: 'Replay',
    showNow: 'Show now',
    showAgain: 'Show again',
    onlyDesktop: 'mouse only',
    queued: 'queued',
    flags: {
      tutorial: 'Tutorial (walk, attack, wall)',
      sources: 'Fire and water hints',
      hudspot: 'Rivals and level spotlight',
      keys: 'WASD keys',
      desktop: '“Also on your phone” note',
      sound: 'Sound',
      gpu: 'No-acceleration GPU notice',
      match: 'Match (rivals and level)',
      look: 'Look',
      lang: 'Chosen language',
      initials: 'Initials',
      myscores: 'My scores',
      mastodon: 'Mastodon server',
    },
    states: {
      none: 'not saved',
      moved: 'walk done',
      square: 'attack done',
      done: 'done',
      next: 'next match',
      shown: 'seen',
      used: 'used',
      on: 'on',
      off: 'off',
      software: 'play anyway',
      pending: (n: number) => `${n} left`,
      count: (n: number) => `${n} saved`,
      thisVisit: (told: boolean) => (told ? 'seen this visit' : 'pending this visit'),
    },
    newPlayer: 'Start as a new player',
    newPlayerNote: 'Clears everything except these developer settings.',
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
