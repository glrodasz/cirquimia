/**
 * The ranking on screen: a trophy button beside the book, a board with today's and all-time scores,
 * and the score block on the victory card (points, initials, place, share).
 */
import { DIFFICULTY_LABEL, type Difficulty } from '../combat';
import { LANG, t } from '../i18n';
import { discordLogo, trophyIcon, xLogo } from '../icons';
import { failed, fetchBoard, myScores, savedInitials, saveInitials, submitScore, type Entry, type Period, type Runs } from './client';
import { copyImage, mastodonHost, openComposer, renderShareCard, saveImage, savedMastodon, shareDiscord, shareImage, type ShareData } from './share';
import { cleanInitials, formatTime, scoreFor, validInitials } from './score';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

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
  /**
   * Fills the victory card's score block for a won match; `runs` holds the server run if it counts and
   * `meadow` the frame of the match for the share card.
   */
  fillEnd(
    slot: HTMLElement,
    runs: Runs,
    match: { rivals: number; difficulty: Difficulty; durationMs: number; damage: number },
    meadow?: Promise<CanvasImageSource | null>,
  ): void;
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

  const fillEnd: Leaderboard['fillEnd'] = (slot, runs, match, meadow) => {
    const data: ShareData = { ...match, score: scoreFor(match.damage, match.difficulty, match.durationMs) };
    slot.hidden = false;
    slot.innerHTML =
      `<div class="pts"><b>${data.score.toLocaleString(LANG)}</b> ${t.rank.points(data.score)}</div>` +
      `<div class="meta">${metaLine(match)}</div>` +
      `<form class="sign" novalidate><label><span>${t.rank.initials}</span>` +
      `<input name="initials" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" enterkeyhint="done" placeholder="ABCD" required></label>` +
      `<button type="submit" class="match-btn save"><span class="cap">${t.rank.save}</span></button></form>` +
      `<p class="note" role="status"></p>` +
      `<div class="share">` +
      `<p class="dare"></p>` +
      `<div class="row">` +
      `<button type="button" class="preview" aria-label="${t.rank.preview}" title="${t.rank.preview}"><img alt=""></button>` +
      `<div class="acts" role="group" aria-label="${t.rank.share}">` +
      `<button type="button" class="match-btn net brand" data-to="x" aria-label="${t.rank.postOnX} X">${xLogo()}<span class="cap"><span class="verb">${t.rank.postOnX} </span>X</span></button>` +
      `<button type="button" class="match-btn net brand" data-to="discord">${discordLogo()}<span class="cap"><span class="verb">${t.rank.sendDiscord} </span>Discord</span></button>` +
      `<button type="button" class="match-btn more" aria-expanded="false"><span class="cap">${t.rank.more}</span></button></div></div></div>` +
      `<div class="more-menu" hidden>` +
      `<button type="button" class="match-btn net" data-to="bluesky"><span class="cap">Bluesky</span></button>` +
      `<button type="button" class="match-btn net" data-to="threads"><span class="cap">Threads</span></button>` +
      `<button type="button" class="match-btn net" data-to="mastodon"><span class="cap">Mastodon</span></button>` +
      `<button type="button" class="match-btn net" data-to="image"><span class="cap">${t.rank.saveImage}</span></button>` +
      `<form class="masto" hidden novalidate><input name="host" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="url" enterkeyhint="go" placeholder="${t.rank.mastodonHost}" aria-label="${t.rank.mastodonHost}">` +
      `<button type="submit" class="match-btn"><span class="cap">${t.rank.go}</span></button></form></div>` +
      `<button type="button" class="match-btn view"><span class="cap">${t.rank.view}</span></button>`;
    const form = slot.querySelector<HTMLFormElement>('.sign')!;
    const input = form.querySelector<HTMLInputElement>('input')!;
    const save = form.querySelector<HTMLButtonElement>('.save')!;
    const note = slot.querySelector<HTMLElement>('.note')!;
    const say = (text: string) => {
      note.innerHTML = text;
    };
    const moreBtn = slot.querySelector<HTMLButtonElement>('.more')!;
    const menu = slot.querySelector<HTMLElement>('.more-menu')!;
    const masto = slot.querySelector<HTMLFormElement>('.masto')!;
    const mastoInput = masto.querySelector<HTMLInputElement>('input')!;
    let newId: number | null = null;
    input.value = savedInitials();
    input.addEventListener('input', () => {
      const clean = cleanInitials(input.value);
      if (clean !== input.value) input.value = clean;
    });

    // Rendered ahead, so Discord's share sheet opens straight from the tap (iOS wants it inside the gesture).
    // The frame of the match comes from the next drawn frame; a hidden tab may never draw, so do not wait long.
    const scene = Promise.race([meadow ?? Promise.resolve(null), new Promise<null>((r) => setTimeout(() => r(null), 1200))]);
    const dare = slot.querySelector<HTMLElement>('.dare')!;
    const preview = slot.querySelector<HTMLButtonElement>('.preview')!;
    const img = preview.querySelector('img')!;
    let shown = '';
    const draw = () => {
      dare.textContent = t.rank.dare(data.score.toLocaleString(LANG), t.rank.points(data.score));
      const next = scene.then((m) => renderShareCard(data, m));
      void next.then((blob) => {
        if (!slot.isConnected) return;
        if (shown) URL.revokeObjectURL(shown);
        shown = img.src = URL.createObjectURL(blob);
        preview.classList.add('ready');
      });
      return next;
    };
    let card = draw();
    preview.addEventListener('click', () => void shareImage(card, data));
    moreBtn.addEventListener('click', () => {
      menu.hidden = !menu.hidden;
      moreBtn.setAttribute('aria-expanded', String(!menu.hidden));
    });
    const mastodon = (raw: string) => {
      const host = mastodonHost(raw);
      if (!host) {
        masto.hidden = false;
        mastoInput.focus();
        return;
      }
      masto.hidden = true;
      openComposer('mastodon', data, host);
    };
    masto.addEventListener('submit', (e) => {
      e.preventDefault();
      mastodon(mastoInput.value);
    });
    for (const btn of slot.querySelectorAll<HTMLButtonElement>('.net')) {
      btn.addEventListener('click', async () => {
        const to = btn.dataset.to;
        if (to === 'x' && !matchMedia('(pointer: coarse)').matches) {
          const copied = copyImage(card);
          openComposer('x', data);
          if (await copied) say(t.rank.xCopied);
        } else if (to === 'x' || to === 'bluesky' || to === 'threads') openComposer(to, data);
        else if (to === 'mastodon') mastodon(savedMastodon());
        else if (to === 'image') await saveImage(card, data);
        else if (to === 'discord') {
          const result = await shareDiscord(card, data);
          if (result === 'copied') say(t.rank.discordCopied);
          if (result === 'saved') say(t.rank.discordSaved);
        }
      });
    }
    slot.querySelector('.view')!.addEventListener('click', () => show(newId ? 'today' : period, newId));

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
      card = draw();
      slot.querySelector<HTMLElement>('.net')!.focus({ preventScroll: true });
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
