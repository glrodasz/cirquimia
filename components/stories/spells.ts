import * as THREE from 'three';
import { Spells, blastStarTips, PILLAR_WARN, ROOT_TIME, STAR_REACH, starTips, type Element, type StarCage } from '../../src/spells';
import { Character } from '../../src/character';
import { t } from '../../src/i18n';
import { Reticle } from '../../src/aim';
import type { ShapeKind } from '../../src/gestures';
import { createViewer } from '../kit/viewer';
import type { StoryFn } from '../kit/story';

type Cast = 'wall' | Element | 'heal' | 'channelFire' | 'channelWater' | 'denied';

const HERO_INK = '#3d7fd6';
const r = t.help.roles;
const CASTS: Array<[Cast, string]> = [
  ['wall', `Círculo · ${r.circle}`],
  ['earth', `Cuadrado · ${r.square}`],
  ['columns', `Estrella · ${r.pentagram}`],
  ['fire', `Triángulo · ${r.triangle}`],
  ['water', `Triángulo invertido · ${r.triangleDown}`],
  ['blast', `Reloj de arena · ${r.hourglass}`],
  ['fireStar', r.fireStar],
  ['waterStar', r.waterStar],
  ['blastStar', r.blastStar],
  ['vine', `Espiral · ${r.spiral}`],
  ['heal', `Rombo · ${r.rhombus}`],
  ['channelFire', 'Cargar fuego de la fogata'],
  ['channelWater', 'Cargar agua de la laguna'],
  ['denied', 'Golpe parado por un muro (cruz)'],
];

const spells: StoryFn = (ctx) => {
  const v = createViewer({ title: 'Hechizos' });
  const obstacles: never[] = [];
  const book = new Spells(obstacles);
  v.scene.add(book.root);
  const hero = new Character([], {});
  hero.root.position.set(-0.9, 0, 0.9);
  const rival = new Character([], { coat: '#6b3a3a', coatDark: '#4f2a2b' });
  rival.root.position.set(0.7, 0, -0.5);
  hero.halt(); // a character walks to its target, the origin until told otherwise
  rival.halt();
  hero.face(rival.root.position);
  rival.face(hero.root.position);
  v.scene.add(hero.root, rival.root);
  // A vine roots whoever it catches; here the rival is always caught.
  book.onStrike = (_x, _z, element) => {
    if (element === 'vine') book.snare(rival.root.position, HERO_INK);
    rival.flash();
  };

  let current = (ctx.args.cast ?? 'earth') as Cast;
  if (!CASTS.some(([c]) => c === current)) current = 'earth';
  const at = () => rival.root.position.clone();
  const cast = () => {
    book.clear();
    hero.cast();
    const from = hero.root.position;
    switch (current) {
      case 'wall':
        return book.wall(from, at(), HERO_INK, hero);
      case 'heal':
        return book.heal(from, HERO_INK, false);
      case 'channelFire':
      case 'channelWater':
        return book.channel(new THREE.Vector3(-2.2, 0, -1.4), from, current === 'channelFire' ? 'fire' : 'water');
      case 'denied':
        return book.denied(at(), HERO_INK);
      case 'columns':
      case 'fireStar':
      case 'waterStar': {
        const cage: StarCage = { x: at().x, z: at().z, reach: STAR_REACH, caster: hero, element: current, standing: 0, tips: 0, erupted: 0, struck: new Set() };
        for (const tip of starTips(at())) {
          book.pillars(from, tip.at, current, hero, PILLAR_WARN + tip.delay, HERO_INK, 1, cage);
          cage.tips++;
        }
        return;
      }
      case 'blastStar':
        for (const tip of blastStarTips(at())) book.pillars(from, tip.at, current, hero, PILLAR_WARN + tip.delay, HERO_INK);
        return;
      default:
        return book.pillars(from, at(), current, hero, PILLAR_WARN, HERO_INK);
    }
  };

  // The desktop aim reticle of the symbol in hand, over the target.
  const SHAPE: Partial<Record<Cast, ShapeKind>> = { earth: 'square', columns: 'pentagram', fire: 'triangle', water: 'triangleDown', blast: 'hourglass', fireStar: 'fireStar', waterStar: 'waterStar', blastStar: 'blastStar', vine: 'spiral' };
  const reticle = new Reticle(HERO_INK);
  v.scene.add(reticle.root);
  let aim = false;

  let loop = true;
  let since = 0;
  v.onFrame((dt) => {
    book.update(dt);
    if (aim && SHAPE[current]) reticle.show(SHAPE[current]!, at(), false, dt);
    else reticle.hide();
    hero.update(dt);
    rival.update(dt);
    if (loop && (since += dt) > (current === 'vine' ? ROOT_TIME + 1.2 : current === 'blastStar' ? 3.2 : 2.6)) {
      since = 0;
      cast();
    }
  });
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.6, 3.4)));
  v.frame(group, 1.5);
  v.panel.row(CASTS.find(([c]) => c === current)![1]);
  v.panel.button('Lanzar', () => {
    since = 0;
    cast();
  });
  v.panel.toggle('Repetir', true, (on) => (loop = on));
  v.panel.toggle('Mira (escritorio)', false, (on) => (aim = on));
  cast();
};

export const stories: Record<string, StoryFn> = { spells };
