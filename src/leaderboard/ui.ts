/**
 * The ranking on screen: a trophy button beside the book, a board with today's and all-time scores,
 * and the score block on the victory card (points, initials, place, share).
 */
import { brushPath, type Pt } from '../ammo';
import { DIFFICULTY_LABEL, type Difficulty } from '../combat';
import { LANG, t } from '../i18n';
import { arc, random, segment, svg } from '../match';
import { failed, fetchBoard, myScores, savedInitials, saveInitials, submitScore, type Entry, type Period, type Runs } from './client';
import { renderShareCard, shareCard, type ShareData } from './share';
import { cleanInitials, formatTime, scoreFor, validInitials } from './score';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function stroke(line: Pt[], width: number, rand: () => number) {
  const b = brushPath(line, width, rand);
  return { ink: `<path class="glyph" d="${b.ink}"/>`, dry: b.dry };
}

/** A cup: the bowl, two handles, the stem and the foot. */
function trophyIcon() {
  const rand = random();
  const bowl = [[16, 14], [32, 14]] as Pt[];
  const cup = segment(bowl[0], bowl[1]).concat(arc(24, 14, 8, 0, Math.PI).slice(1));
  return svg(
    [
      stroke(cup, 3.4, rand),
      stroke(arc(15.5, 17.5, 3.2, Math.PI * 0.55, Math.PI * 1.55), 2.2, rand),
      stroke(arc(32.5, 17.5, 3.2, Math.PI * 1.45, Math.PI * 2.45), 2.2, rand),
      stroke(segment([24, 22.5], [24, 29]), 3, rand),
      stroke(segment([18.5, 32], [29.5, 32]), 3.4, rand),
    ],
    rand,
  );
}

const stop = (node: HTMLElement) => {
  for (const type of ['pointerdown', 'pointerup', 'pointermove']) node.addEventListener(type, (e) => e.stopPropagation());
};

/** The match in one line; the board's rows use the short form so the device still fits on a phone. */
function metaLine(e: { durationMs: number; damage: number; rivals: number; difficulty: Difficulty }, short = false) {
  const damage = short ? `⚔ ${e.damage}` : t.rank.damage(e.damage);
  return `⏱ ${formatTime(e.durationMs)} · ${damage} · ${t.rank.rivals(e.rivals)} · ${DIFFICULTY_LABEL[e.difficulty] ?? e.difficulty}`;
}

export interface Leaderboard {
  readonly open: boolean;
  show(period?: Period): void;
  /** Fills the victory card's score block for a won match; `runs` holds the server run if it counts. */
  fillEnd(slot: HTMLElement, runs: Runs, match: { rivals: number; difficulty: Difficulty; durationMs: number; damage: number }): void;
}

export function mountLeaderboard(): Leaderboard {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'rank-btn';
  button.setAttribute('aria-label', t.rank.button);
  button.innerHTML = trophyIcon();

  const overlay = document.createElement('div');
  overlay.id = 'rank';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'rank-title');
  overlay.innerHTML =
    `<div class="card" tabindex="-1">` +
    `<button type="button" class="x" aria-label="${t.rank.close}">×</button>` +
    `<h2 id="rank-title">${t.rank.title}</h2>` +
    `<div class="tabs" role="tablist">` +
    `<button type="button" role="tab" data-period="today">${t.rank.today}</button>` +
    `<button type="button" role="tab" data-period="all">${t.rank.all}</button></div>` +
    `<div class="list" role="tabpanel"></div>` +
    `<p class="rule">${t.rank.rule}</p></div>`;
  stop(button);
  stop(overlay);
  document.body.append(button, overlay);

  const list = overlay.querySelector<HTMLElement>('.list')!;
  const tabs = [...overlay.querySelectorAll<HTMLButtonElement>('[role=tab]')];
  let open = false;
  let period: Period = 'today';
  let highlight: number | null = null;
  let opener: HTMLElement | null = null;
  let request = 0;

  const render = (entries: Entry[]) => {
    if (!entries.length) {
      list.innerHTML = `<p class="empty">${t.rank.empty}</p>`;
      return;
    }
    const mine = myScores();
    list.innerHTML =
      `<ol>` +
      entries
        .map((e, i) => {
          const cls = [mine.has(e.id) ? 'mine' : '', e.id === highlight ? 'new' : ''].filter(Boolean).join(' ');
          const medal = i < 3 ? ` medal m${i + 1}` : '';
          return (
            `<li${cls ? ` class="${cls}"` : ''}>` +
            `<span class="pos${medal}">${i + 1}</span>` +
            `<span class="who">${esc(e.initials)}${mine.has(e.id) ? ` <i>${t.rank.mine}</i>` : ''}</span>` +
            `<span class="pts">${e.score.toLocaleString(LANG)}</span>` +
            `<span class="meta">${metaLine(e, true)} · ${t.rank.category[e.category] ?? ''}</span>` +
            `</li>`
          );
        })
        .join('') +
      `</ol>`;
    list.querySelector('.new')?.scrollIntoView({ block: 'center' });
  };

  const load = async (p: Period) => {
    period = p;
    for (const tab of tabs) tab.setAttribute('aria-selected', String(tab.dataset.period === p));
    list.innerHTML = `<p class="empty">${t.rank.loading}</p>`;
    const mine = ++request;
    const res = await fetchBoard(p);
    if (mine !== request) return;
    if (failed(res)) list.innerHTML = `<p class="empty">${t.rank.unavailable}</p>`;
    else render(res.entries);
  };

  const hide = () => {
    overlay.classList.remove('show');
    overlay.hidden = true;
    open = false;
    opener?.focus({ preventScroll: true });
  };

  const show = (p: Period = period, newId: number | null = null) => {
    opener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
    highlight = newId;
    overlay.hidden = false;
    open = true;
    void overlay.offsetWidth;
    overlay.classList.add('show');
    overlay.querySelector<HTMLElement>('.card')!.focus({ preventScroll: true });
    void load(p);
  };

  button.addEventListener('click', () => show());
  overlay.querySelector('.x')!.addEventListener('click', hide);
  overlay.addEventListener('click', (e) => e.target === overlay && hide());
  overlay.addEventListener('keydown', (e) => e.key === 'Escape' && hide());
  for (const tab of tabs) tab.addEventListener('click', () => load(tab.dataset.period as Period));

  const fillEnd: Leaderboard['fillEnd'] = (slot, runs, match) => {
    const data: ShareData = { ...match, score: scoreFor(match.damage, match.difficulty, match.durationMs) };
    slot.hidden = false;
    slot.innerHTML =
      `<div class="pts"><b>${data.score.toLocaleString(LANG)}</b> ${t.rank.points(data.score)}</div>` +
      `<div class="meta">${metaLine(match)}</div>` +
      `<form class="sign" novalidate><label><span>${t.rank.initials}</span>` +
      `<input name="initials" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" enterkeyhint="done" placeholder="ABCD" required></label>` +
      `<button type="submit" class="match-btn save"><span class="cap">${t.rank.save}</span></button></form>` +
      `<p class="note" role="status"></p>` +
      `<div class="acts"><button type="button" class="match-btn share"><span class="cap">${t.rank.share}</span></button>` +
      `<button type="button" class="match-btn view"><span class="cap">${t.rank.view}</span></button></div>`;
    const form = slot.querySelector<HTMLFormElement>('.sign')!;
    const input = form.querySelector<HTMLInputElement>('input')!;
    const save = form.querySelector<HTMLButtonElement>('.save')!;
    const note = slot.querySelector<HTMLElement>('.note')!;
    const shareBtn = slot.querySelector<HTMLButtonElement>('.share')!;
    let newId: number | null = null;
    input.value = savedInitials();
    input.addEventListener('input', () => {
      const clean = cleanInitials(input.value);
      if (clean !== input.value) input.value = clean;
    });

    // Rendered ahead, so the share sheet opens straight from the tap (iOS wants it inside the gesture).
    let card = renderShareCard(data);
    shareBtn.addEventListener('click', async () => {
      const result = await shareCard(await card, data);
      if (result === 'saved') note.textContent = t.rank.saved;
    });
    slot.querySelector('.view')!.addEventListener('click', () => show(newId ? 'today' : period, newId));

    const say = (text: string) => {
      note.innerHTML = text;
    };

    void runs.current().then((id) => {
      if (!id && slot.isConnected) {
        form.hidden = true;
        say(t.rank.unavailable);
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const initials = cleanInitials(input.value);
      if (!validInitials(initials)) {
        input.focus();
        input.classList.remove('shake');
        void input.offsetWidth;
        input.classList.add('shake');
        return;
      }
      saveInitials(initials);
      save.disabled = input.disabled = true;
      save.querySelector('.cap')!.textContent = t.rank.saving;
      const id = await runs.current();
      const res = id ? await submitScore(id, initials, match.durationMs, match.damage) : 'unavailable';
      if (failed(res)) {
        save.disabled = input.disabled = false;
        save.querySelector('.cap')!.textContent = t.rank.save;
        if (res !== 'too-many') form.hidden = true;
        say(res === 'too-many' ? t.rank.tooMany : res === 'rejected' ? t.rank.rejected : t.rank.unavailable);
        return;
      }
      newId = res.id;
      form.hidden = true;
      say(t.rank.placed(res.rank.today, res.rank.all));
      Object.assign(data, { score: res.score, initials, rank: res.rank });
      card = renderShareCard(data);
      shareBtn.focus({ preventScroll: true });
    });
  };

  return {
    get open() {
      return open;
    },
    show: (p) => show(p),
    fillEnd,
  };
}
