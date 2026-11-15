/**
 * Every story in the catalogue: where it sits in the sidebar and what it shows. Pure data, so the shell page loads
 * none of the game; the canvas page (frame.ts) imports the story's module only when it is opened.
 */
export type StoryModule = 'foundations' | 'hud' | 'book' | 'match' | 'ranking' | 'notices' | 'share' | 'characters' | 'meadow' | 'spells' | 'scenes';

export interface Story {
  id: string;
  group: string;
  title: string;
  module: StoryModule;
  /** One or two lines on what it is and when the player sees it. */
  doc: string;
  /** Where its code lives in src/. */
  source: string;
  /** Long pages (palettes, galleries) scroll instead of filling a fixed game screen. */
  doc_page?: boolean;
  /** The meadow photo behind it, so overlays read as they do in the game. */
  backdrop?: boolean;
}

export const GROUPS = ['Fundamentos', 'HUD', 'Libro', 'Partida', 'Ranking', 'Avisos', 'Compartir', '3D · Personajes', '3D · Prado', '3D · Hechizos', 'Escenas'];

export const STORIES: Story[] = [
  { id: 'palette', group: 'Fundamentos', title: 'Paleta y variables', module: 'foundations', doc_page: true, source: 'index.html (<style>)', doc: 'Los colores y variables CSS que usa la UI hoy, leídos del estilo real del juego: la base para los design tokens.' },
  { id: 'type', group: 'Fundamentos', title: 'Tipografía', module: 'foundations', doc_page: true, source: 'index.html, src/boot.ts', doc: 'Las familias en uso: EB Garamond (grimorio), system-ui (HUD) y monoespaciada (iniciales).' },
  { id: 'icons', group: 'Fundamentos', title: 'Iconos', module: 'foundations', doc_page: true, source: 'src/icons.ts', doc: 'Todos los iconos SVG del HUD, pestañas y redes.' },
  { id: 'symbols', group: 'Fundamentos', title: 'Símbolos', module: 'foundations', doc_page: true, source: 'src/ammo.ts (shapeIcon)', doc: 'Cada símbolo con trazo de pincel (mano) y de plumilla (libro, checklist).' },

  { id: 'hud-duel', group: 'HUD', title: 'Duelo', module: 'hud', backdrop: true, source: 'src/match.ts, help.ts, soundButton.ts, leaderboard/ui.ts, matchTimer.ts', doc: 'El HUD de una partida: Entrenar, Nuevo juego, sonido, ranking, libro y el tiempo. En móvil las píldoras pasan a solo iconos.' },
  { id: 'hud-training', group: 'HUD', title: 'Entrenamiento', module: 'hud', backdrop: true, source: 'src/match.ts', doc: 'Entrenando, Nuevo juego se oculta y aparece "Ir al combate" con la última batalla elegida.' },
  { id: 'hud-horde', group: 'HUD', title: 'Horda', module: 'hud', backdrop: true, source: 'src/match.ts, matchTimer.ts', doc: 'La horda: el aviso de oleada y el toast de inicio.' },
  { id: 'hud-spot', group: 'HUD', title: 'Píldoras destacadas', module: 'hud', backdrop: true, source: 'src/match.ts', doc: 'Tras la primera victoria, la siguiente partida señala las píldoras de rivales y dificultad durante 5 s.' },
  { id: 'hud-sound', group: 'HUD', title: 'Botón de sonido', module: 'hud', backdrop: true, source: 'src/soundButton.ts', doc: 'Apagado por defecto (late) y encendido.' },
  { id: 'hud-move', group: 'HUD', title: 'Teclas y stick', module: 'hud', backdrop: true, source: 'src/keysHint.ts, pad.ts', doc: 'Escritorio: teclas WASD/flechas abajo a la izquierda. Táctil: el stick (se ve con un viewport táctil).' },
  { id: 'hud-version', group: 'HUD', title: 'Versión (?dev)', module: 'hud', backdrop: true, source: 'src/version.ts', doc: 'La etiqueta de versión que solo se ve con ?dev.' },

  { id: 'book-symbols', group: 'Libro', title: 'Símbolos', module: 'book', backdrop: true, source: 'src/help.ts', doc: 'El grimorio abierto en el índice de símbolos y combinaciones.' },
  { id: 'book-guide', group: 'Libro', title: 'Cómo jugar', module: 'book', backdrop: true, source: 'src/help.ts', doc: 'La hoja de cómo jugar (cambia según teclado o táctil).' },

  { id: 'newgame', group: 'Partida', title: 'Nuevo juego', module: 'match', backdrop: true, source: 'src/match.ts', doc: 'La hoja de Nuevo juego: Duelo (rivales y dificultad) u Horda.' },
  { id: 'end-victory', group: 'Partida', title: 'Victoria con puntuación', module: 'match', backdrop: true, source: 'src/match.ts, leaderboard/ui.ts', doc: 'Tarjeta de victoria con puntos, iniciales, Ver ranking / Jugar de nuevo y Compartir (API simulada).' },
  { id: 'end-defeat', group: 'Partida', title: 'Derrota', module: 'match', backdrop: true, source: 'src/match.ts', doc: 'Game over de una partida normal.' },
  { id: 'end-defeat-train', group: 'Partida', title: 'Derrota (sugiere entrenar)', module: 'match', backdrop: true, source: 'src/match.ts', doc: 'La primera partida real perdida también ofrece entrenar.' },
  { id: 'end-horde', group: 'Partida', title: 'Fin de la horda', module: 'match', backdrop: true, source: 'src/match.ts, leaderboard/ui.ts', doc: 'Oleada alcanzada y tiempo, guardado en el ranking de la horda.' },

  { id: 'rank-duel', group: 'Ranking', title: 'Ranking de duelo', module: 'ranking', backdrop: true, source: 'src/leaderboard/ui.ts', doc: 'El ranking global con datos de ejemplo y tu puesto resaltado.' },
  { id: 'rank-horde', group: 'Ranking', title: 'Ranking de horda', module: 'ranking', backdrop: true, source: 'src/leaderboard/ui.ts', doc: 'La pestaña Horda.' },
  { id: 'rank-empty', group: 'Ranking', title: 'Vacío', module: 'ranking', backdrop: true, source: 'src/leaderboard/ui.ts', doc: 'Sin puntuaciones en el periodo.' },
  { id: 'rank-offline', group: 'Ranking', title: 'Sin conexión', module: 'ranking', backdrop: true, source: 'src/leaderboard/ui.ts', doc: 'El servidor no responde.' },

  { id: 'popover', group: 'Avisos', title: 'Popover', module: 'notices', backdrop: true, source: 'src/popover.ts', doc: 'La nota de grimorio con la que enseñan el tutorial y el entrenamiento, arriba o abajo de lo que señala.' },
  { id: 'missing', group: 'Avisos', title: 'Símbolo rechazado', module: 'notices', backdrop: true, source: 'src/missing.ts', doc: 'Fuego o agua sin fuente cerca, o un muro dentro de un círculo de runas.' },
  { id: 'hitme', group: 'Avisos', title: '¡Golpéame!', module: 'notices', backdrop: true, source: 'src/dummy.ts', doc: 'La etiqueta sobre el espantapájaros en el entrenamiento.' },
  { id: 'device', group: 'Avisos', title: 'También en tu móvil', module: 'notices', backdrop: true, source: 'src/deviceHint.ts', doc: 'Aviso de escritorio, una vez por visita.' },
  { id: 'gpu', group: 'Avisos', title: 'Aviso de GPU', module: 'notices', backdrop: true, source: 'src/gpu.ts', doc: 'Sin aceleración por hardware (software) o sin WebGL.' },

  { id: 'share-card', group: 'Compartir', title: 'Tarjeta para compartir', module: 'share', doc_page: true, source: 'src/leaderboard/share.ts', doc: 'La imagen que se comparte: cuadrada (1080) y ancha (1200×630, vista previa del enlace).' },

  { id: 'alchemist', group: '3D · Personajes', title: 'Alquimista', module: 'characters', source: 'src/character.ts', doc: 'El alquimista del jugador. Prueba caminar, lanzar, golpe, caer y enredado.' },
  { id: 'rivals', group: '3D · Personajes', title: 'Rivales', module: 'characters', source: 'src/character.ts, combat.ts', doc: 'Los tres rivales (rojo, verde, ciruela) junto al alquimista.' },
  { id: 'golem', group: '3D · Personajes', title: 'Golem', module: 'characters', source: 'src/character.ts', doc: 'El golem de la horda: geometría compartida, 5 draw calls.' },
  { id: 'scarecrow', group: '3D · Personajes', title: 'Espantapájaros', module: 'characters', source: 'src/dummy.ts', doc: 'El blanco del entrenamiento: se balancea al recibir golpes y cae a cero.' },

  { id: 'trees', group: '3D · Prado', title: 'Árboles', module: 'meadow', source: 'src/meadow.ts (Trees)', doc: 'Pino y árbol frondoso, como se instancian en el prado.' },
  { id: 'features', group: '3D · Prado', title: 'Elementos del prado', module: 'meadow', source: 'src/features.ts', doc: 'Fogata, laguna, menhires, muro, peñascos, cristales, runas, carreta… cada pieza sobre su propio suelo.' },
  { id: 'meadow', group: '3D · Prado', title: 'Pradera completa', module: 'meadow', source: 'src/world.ts', doc: 'Un prado generado por semilla, como en el juego.' },

  { id: 'spells', group: '3D · Hechizos', title: 'Hechizos', module: 'spells', source: 'src/spells.ts', doc: 'Cada hechizo en bucle: muro, pilares, fuego, agua, explosión, estrellas, enredadera, curación.' },

  { id: 'combat', group: 'Escenas', title: 'Combate (barras y daño)', module: 'scenes', source: 'src/combat.ts (Fighter)', doc: 'Barras de vida, boceto sobre la cabeza, números de daño y el triángulo "tú", con la cámara del juego.' },
  { id: 'training', group: 'Escenas', title: 'Entrenamiento guiado', module: 'scenes', source: 'src/guides.ts', doc: 'La guía de símbolos, burbujas Paso 1/2 y la hoja "Círculos disponibles".' },
  { id: 'tutorial', group: 'Escenas', title: 'Tutorial', module: 'scenes', source: 'src/tutorial.ts', doc: 'La primera partida guiada, con el rival dormido.' },
];
