import * as THREE from 'three';
import { Character } from '../../src/character';
import { Scarecrow } from '../../src/dummy';
import { Fighter, HERO_INK, showHitMe, type Sketch } from '../../src/combat';
import { World } from '../../src/world';
import { Guides } from '../../src/guides';
import { Tutorial } from '../../src/tutorial';
import { mergedInHand, type ShapeKind } from '../../src/gestures';
import { heightAt } from '../../src/noise';
import { mountHelp } from '../../src/help';
import type { Element } from '../../src/spells';
import { createViewer, type Viewer } from '../kit/viewer';
import { settle, type StoryFn } from '../kit/story';

const RIVALS = [
  { coat: '#6b3a3a', coatDark: '#4f2a2b', ink: '#d9483b' },
  { coat: '#3f5e3c', coatDark: '#2e452c', ink: '#3fae5a' },
  { coat: '#55406b', coatDark: '#3e2f50', ink: '#9b6fd8' },
];

/** A meadow on screen the way the game frames it, with the game's own camera. */
function meadowScene(title: string, training: boolean, seed: string) {
  const v = createViewer({ ground: false, title });
  const world = new World(v.scene);
  if (training) {
    world.required = () => ['fogata', 'estanque'];
    world.requiredBy = () => 'training';
  }
  world.generate(seed);
  v.gameCamera(true);
  v.onFrame((dt) => world.update(dt));
  v.panel.toggle('Cámara libre', false, (on) => v.gameCamera(!on));
  return { v, world };
}

function source(world: World, element: 'fire' | 'water', from: THREE.Vector3) {
  const kind = element === 'fire' ? 'fogata' : 'estanque';
  let best: THREE.Vector3 | null = null;
  for (const f of world.layout.features) {
    if (f.kind !== kind) continue;
    const at = new THREE.Vector3(f.x, heightAt(f.x, f.z), f.z);
    if (!best || at.distanceToSquared(from) < best.distanceToSquared(from)) best = at;
  }
  return best;
}

const combat: StoryFn = () => {
  const { v } = meadowScene('Combate', false, 'combate');
  const hero = new Fighter(new Character([], {}), HERO_INK);
  v.scene.add(hero.body.root);
  hero.markAsYou();
  const rivals = RIVALS.map((look, i) => {
    const f = new Fighter(new Character([], look), look.ink);
    f.body.root.position.set(-1.3 + i * 1.3, 0, -1.6 + (i % 2) * 0.4);
    f.body.halt(); // a character walks to its target, the origin until told otherwise
    v.scene.add(f.body.root);
    return f;
  });
  const golem = new Fighter(new Character([], { golem: true }), '#9a917f');
  golem.maxHp = golem.hp = 200;
  golem.body.root.position.set(1.4, 0, 1.2);
  golem.body.halt();
  v.scene.add(golem.body.root);
  const all = [hero, ...rivals, golem];
  for (const f of all) f.body.face(hero.position.clone().add(new THREE.Vector3(0.01, 0, 0.01)));
  hero.body.face(new THREE.Vector3(0, 0, -2));
  rivals[1].hp = 55;
  rivals[2].hp = 20;
  v.onFrame((dt) => {
    for (const f of all) {
      f.body.update(dt);
      f.fade(dt);
      f.update(v.camera);
    }
    hero.updateMark(v.camera);
  });
  const pick = () => rivals[Math.floor(Math.random() * rivals.length)];
  const elements: Element[] = ['earth', 'fire', 'water', 'blast', 'vine'];
  v.panel.button('Golpear a un rival', () => pick().hit(20, elements[Math.floor(Math.random() * elements.length)], v.camera, Math.random() < 0.3));
  v.panel.button('Curar al alquimista', () => {
    hero.hp = Math.max(30, hero.hp - 40);
    hero.heal(25, v.camera, Math.random() < 0.5);
  });
  v.panel.button('Golpear al golem', () => golem.hit(45, 'blast', v.camera));
  const sketches: Sketch[] = ['circle', 'square', 'pentagram', 'triangle', 'triangleDown', 'rhombus', 'hourglass', 'fireStar', 'waterStar', 'blastStar', 'spiral'];
  v.panel.button('Bocetos sobre la cabeza', () => all.forEach((f, i) => f.drawSketch(sketches[(i + Math.floor(Math.random() * 11)) % 11], 0.5, i === 0)));
  let aura = false;
  v.onFrame((dt) => hero.empower(aura, dt));
  v.panel.toggle('Aura de runas', false, (on) => (aura = on));
  v.panel.toggle('Rivales tenues (tutorial)', false, (on) => rivals.forEach((r) => r.faint(on)));
  v.panel.button('Todos en pie', () => all.forEach((f) => f.reset()));
};

/** Hands a symbol over the way the game does: drawn (merged with what is held), then cast. */
function hand(v: Viewer, onDraw: (kind: ShapeKind, held: ShapeKind | null) => void, onCast: (kind: ShapeKind) => void) {
  let held: ShapeKind | null = null;
  const row = v.panel.row('Dibujar');
  const SHAPES: Array<[ShapeKind, string]> = [['circle', '○'], ['square', '□'], ['triangle', '△'], ['triangleDown', '▽'], ['rhombus', '◇'], ['pentagram', '☆'], ['spiral', '@']];
  for (const [kind, label] of SHAPES) {
    v.panel.button(label, () => {
      held = mergedInHand(held, kind);
      onDraw(kind, held);
      if (kind === 'circle' || kind === 'rhombus') held = null; // cast at once, as in the game
    }, row);
  }
  v.panel.button('Lanzar lo que hay en mano', () => {
    if (held) onCast(held);
    held = null;
  });
  return () => held;
}

const training: StoryFn = async () => {
  const { v, world } = meadowScene('Entrenamiento', true, 'entreno');
  mountHelp();
  const hero = new Character([], {});
  v.scene.add(hero.root);
  const dummy = new Scarecrow();
  dummy.root.position.set(0, 0, -1.4);
  dummy.face(hero.root.position);
  v.scene.add(dummy.root);
  showHitMe(false);
  let selected: () => ShapeKind | null = () => null;
  const guides = new Guides({
    training: () => true,
    covered: () => false,
    toScreen: (p, lift) => v.toScreen(p, lift),
    hero: () => hero.root.position,
    dummy: () => dummy.root.position,
    hitMe: () => {},
    source: (element) => source(world, element, hero.root.position),
    selected: () => selected(),
    drawing: () => false,
  });
  selected = hand(
    v,
    (kind, held) => guides.drawn(kind, held),
    (kind) => {
      hero.cast();
      dummy.flash(hero.root.position);
      guides.cast(kind);
    },
  );
  v.onFrame((dt) => {
    hero.update(dt);
    dummy.update(dt);
    guides.update(dt);
  });
  await settle();
};

const tutorial: StoryFn = async () => {
  const { v } = meadowScene('Tutorial', true, 'tutorial');
  mountHelp();
  const hero = new Character([], {});
  const rival = new Character([], RIVALS[0]);
  rival.root.position.set(0.4, 0, -1.6);
  rival.halt();
  rival.face(hero.root.position);
  v.scene.add(hero.root, rival.root);
  let held: ShapeKind | null = null;
  const tut = new Tutorial({
    covered: () => false,
    foe: () => rival.root.position,
    toScreen: (p, lift) => v.toScreen(p, lift),
    selected: () => held,
    deselect: () => (held = null),
    hold: () => {},
    provoke: () => {},
    hero: () => hero.root.position,
    walkGoal: () => new THREE.Vector3(0.9, 0, 0.5),
    source: () => null,
    faintRivals: (on) => rival.ghost(on ? 0.35 : 1),
    duel: () => {},
  });
  v.onFrame((dt) => {
    hero.update(dt);
    rival.update(dt);
    tut.update(dt);
  });
  v.panel.button('Caminar a la marca', () => hero.setTarget(new THREE.Vector3(0.9, 0, 0.5)));
  const row = v.panel.row('Dibujar');
  for (const [kind, label] of [['square', '□'], ['circle', '○'], ['triangle', '△'], ['triangleDown', '▽']] as Array<[ShapeKind, string]>) {
    v.panel.button(label, () => {
      held = kind;
      tut.drawn(kind);
    }, row);
  }
  v.panel.button('Lanzar', () => {
    hero.cast();
    tut.cast();
    held = null;
  });
  v.panel.button('Volver a empezar', () => location.reload());
};

export const stories: Record<string, StoryFn> = { combat, training, tutorial };
