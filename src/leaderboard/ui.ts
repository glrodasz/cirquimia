/**
 * The ranking on screen: a trophy button beside the book, a board with today's, this week's, this month's and all-time scores,
 * and the score block on the victory card (points, initials, place, share).
 */
import { DIFFICULTY_LABEL, type Difficulty } from '../combat';
import { LANG, t } from '../i18n';
import { blueskyLogo, discordLogo, mastodonLogo, saveIcon, telegramLogo, threadsLogo, trophyIcon, whatsappLogo, xLogo } from '../icons';
import { failed, fetchBoard, myScores, renameScore, savedInitials, saveInitials, submitScore, uploadCard, type Entry, type Period, type Runs } from './client';
import { mastodonHost, openComposer, renderShareCard, saveImage, savedMastodon, shareDiscord, shareImage, type ShareData, type ShareLink } from './share';
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

/** The victory card's parts the ranking fills: the score on top, the button row under it, and sharing at the foot. */
export interface EndSlots {
  score: HTMLElement;
  actions: HTMLElement;
  share: HTMLElement;
}

export interface Leaderboard {
  readonly open: boolean;
  show(period?: Period): void;
  /**
   * Fills the victory card's score block for a won match; `runs` holds the server run if it counts and
   * `meadow` the frame of the match for the share card.
   */
  fillEnd(
    slots: EndSlots,
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
    (['today', 'week', 'month', 'all'] as const).map((p) => `<button type="button" role="tab" data-period="${p}">${t.rank[p]}</button>`).join('') +
    `</div>` +
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

  const row = (e: Entry, place: number, mine: Set<number>) => {
    const cls = [mine.has(e.id) ? 'mine' : '', e.id === highlight ? 'new' : ''].filter(Boolean).join(' ');
    const medal = place <= 3 ? ` medal m${place}` : '';
    return (
      `<li${cls ? ` class="${cls}"` : ''}>` +
      `<span class="pos${medal}">${place}</span>` +
      `<span class="who">${esc(e.initials)}${mine.has(e.id) ? ` <i>${t.rank.mine}</i>` : ''}</span>` +
      `<span class="pts">${e.score.toLocaleString(LANG)}</span>` +
      `<span class="meta">${metaLine(e, true)} · ${t.rank.category[e.category] ?? ''}</span>` +
      `</li>`
    );
  };

  /** The top of the board, then the player's own best with its real place when it is lower down (after a gap row). */
  const render = (entries: Entry[], me?: { rank: number; entry: Entry } | null) => {
    if (!entries.length) {
      list.innerHTML = `<p class="empty">${t.rank.empty}</p>`;
      return;
    }
    const mine = myScores();
    const own = me && me.rank > entries.length ? `<li class="gap" aria-hidden="true">⋯</li>${row(me.entry, me.rank, mine)}` : '';
    list.innerHTML = `<ol>${entries.map((e, i) => row(e, i + 1, mine)).join('')}${own}</ol>`;
    list.querySelector('.new')?.scrollIntoView({ block: 'center' });
  };

  const load = async (p: Period) => {
    period = p;
    for (const tab of tabs) tab.setAttribute('aria-selected', String(tab.dataset.period === p));
    list.innerHTML = `<p class="empty">${t.rank.loading}</p>`;
    const mine = ++request;
    // Right after saving, the place shown is the new score's; otherwise the player's best.
    const res = await fetchBoard(p, highlight ? [highlight] : myScores());
    if (mine !== request) return;
    if (failed(res)) list.innerHTML = `<p class="empty">${t.rank.unavailable}</p>`;
    else render(res.entries, res.me);
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

  const fillEnd: Leaderboard['fillEnd'] = ({ score: slot, actions, share: shared }, runs, match, meadow) => {
    const data: ShareData = { ...match, score: scoreFor(match.damage, match.difficulty, match.durationMs) };
    slot.hidden = shared.hidden = false;
    slot.innerHTML =
      `<div class="pts"><b>${data.score.toLocaleString(LANG)}</b> ${t.rank.points(data.score)}</div>` +
      `<div class="meta">${metaLine(match)}</div>` +
      `<form class="sign" novalidate><label><span>${t.rank.initials}</span>` +
      `<input name="initials" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" enterkeyhint="done" placeholder="ABCD" required></label>` +
      `</form>` +
      `<p class="note" role="status"></p>`;
    // Secondary on the left of "Play again", as one row of the two ways on.
    actions.insertAdjacentHTML('afterbegin', `<button type="button" class="match-btn view">${trophyIcon()}<span class="cap">${t.rank.view}</span></button>`);
    shared.setAttribute('aria-label', t.rank.share);
    shared.innerHTML =
      `<h3>${t.rank.share}</h3>` +
      `<div class="share">` +
      `<p class="dare"></p>` +
      `<div class="row">` +
      `<button type="button" class="preview" aria-label="${t.rank.preview}" title="${t.rank.preview}"><img alt=""></button>` +
      `<div class="acts" role="group" aria-label="${t.rank.share}">` +
      `<button type="button" class="match-btn net brand" data-to="x" aria-label="${t.rank.postOnX} X">${xLogo()}<span class="cap">${t.rank.post}</span></button>` +
      `<button type="button" class="match-btn net brand" data-to="discord">${discordLogo()}<span class="cap"><span class="verb">${t.rank.sendDiscord} </span>Discord</span></button>` +
      `<div class="trio">` +
      `<button type="button" class="match-btn net brand chat" data-to="whatsapp" aria-label="WhatsApp" title="WhatsApp">${whatsappLogo()}</button>` +
      `<button type="button" class="match-btn net brand chat" data-to="telegram" aria-label="Telegram" title="Telegram">${telegramLogo()}</button>` +
      `<button type="button" class="match-btn more" aria-expanded="false"><span class="cap">${t.rank.more}</span></button></div></div></div></div>` +
      `<div class="more-menu" hidden>` +
      `<div class="nets">` +
      `<button type="button" class="match-btn net brand" data-to="bluesky" aria-label="Bluesky">${blueskyLogo()}<span class="cap">Bluesky</span></button>` +
      `<button type="button" class="match-btn net brand" data-to="threads" aria-label="Threads">${threadsLogo()}<span class="cap">Threads</span></button>` +
      `<button type="button" class="match-btn net brand" data-to="mastodon" aria-label="Mastodon">${mastodonLogo()}<span class="cap">Mastodon</span></button>` +
      `<button type="button" class="match-btn net save-img" data-to="image" aria-label="${t.rank.saveImage}" title="${t.rank.saveImage}">${saveIcon()}</button></div>` +
      `<form class="masto" hidden novalidate><input name="host" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="url" enterkeyhint="go" placeholder="${t.rank.mastodonHost}" aria-label="${t.rank.mastodonHost}">` +
      `<button type="submit" class="match-btn"><span class="cap">${t.rank.go}</span></button></form></div>`;
    const form = slot.querySelector<HTMLFormElement>('.sign')!;
    const input = form.querySelector<HTMLInputElement>('input')!;
    const note = slot.querySelector<HTMLElement>('.note')!;
    const say = (text: string) => {
      note.innerHTML = text;
    };
    const moreBtn = shared.querySelector<HTMLButtonElement>('.more')!;
    const menu = shared.querySelector<HTMLElement>('.more-menu')!;
    const masto = shared.querySelector<HTMLFormElement>('.masto')!;
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
    const dare = shared.querySelector<HTMLElement>('.dare')!;
    const preview = shared.querySelector<HTMLButtonElement>('.preview')!;
    const img = preview.querySelector('img')!;
    let shown = '';
    const draw = () => {
      dare.textContent = t.rank.dare(data.score.toLocaleString(LANG), t.rank.points(data.score));
      const next = scene.then((m) => renderShareCard(data, m));
      void next.then((blob) => {
        if (!img.isConnected) return;
        if (shown) URL.revokeObjectURL(shown);
        shown = img.src = URL.createObjectURL(blob);
        preview.classList.add('ready');
      });
      return next;
    };
    let card = draw();

    // Every won match is saved as soon as it ends, under the player's initials or, when they never gave any, as
    // anonymous (ANON): nobody loses a score for skipping the name. "Change" renames that score while this card is
    // open, and the new initials stay for the next matches. The share link belongs to the saved score; its card
    // (the link's preview) is uploaded only when the player shares, and again after a rename, to spare writes.
    let settle: (url: string | null) => void = () => {};
    const saved = new Promise<string | null>((r) => (settle = r));
    let runId: string | null = null;
    /** The initials the score is saved under; '' while anonymous. */
    let named = '';
    let placed = '';
    let shareLink: string | null = null;
    /** Whose name is on the uploaded card (null: none uploaded yet), and the link once that card is up to date. */
    let cardFor: string | null = null;
    let ready: string | null = null;
    let upload: Promise<unknown> = Promise.resolve();
    const ensureCard = () => {
      const id = runId;
      const url = shareLink;
      const who = named;
      if (!id || !url || cardFor === who) return upload;
      cardFor = who;
      const snapshot = { ...data };
      // In a row, so an older card never lands after a newer one. Always the bundled meadow: the link's card
      // stands for the game, not for this match's frame.
      upload = upload
        .then(() => renderShareCard(snapshot, null, true))
        .then((wide) => Promise.race([uploadCard(id, wide), new Promise((r) => setTimeout(r, 8000))]))
        .then(() => {
          if (cardFor === who) ready = url;
        });
      return upload;
    };
    const link: ShareLink = {
      peek: () => {
        void saved.then(ensureCard);
        return ready;
      },
      get: () =>
        Promise.race([
          saved.then(async (url) => {
            await ensureCard();
            return url;
          }),
          new Promise<null>((r) => setTimeout(() => r(null), 10_000)),
        ]),
    };
    // A finger or the keyboard heading for the share buttons: get the card up before the tap lands.
    for (const type of ['pointerdown', 'focusin']) shared.addEventListener(type, () => void saved.then(ensureCard));

    say(t.rank.saving);
    const saving = runs.current().then(async (id) => {
      if (!id) {
        form.hidden = true;
        say(t.rank.unavailable);
        settle(null);
        return false;
      }
      const res = await submitScore(id, savedInitials(), match.durationMs, match.damage);
      if (failed(res)) {
        form.hidden = true;
        say(res === 'too-many' ? t.rank.tooMany : res === 'rejected' ? t.rank.rejected : t.rank.unavailable);
        settle(null);
        return false;
      }
      runId = id;
      newId = res.id;
      named = res.anonymous ? '' : res.initials;
      placed = t.rank.placed(res.rank.today, res.rank.all);
      shareLink = res.share ?? null;
      // A name typed while the score was on its way goes in with "Change"; otherwise show what it was saved as.
      if (document.activeElement !== input) input.value = named;
      Object.assign(data, { score: res.score, initials: named || undefined, rank: res.rank });
      card = draw();
      say(named ? placed : `${placed}<br>${t.rank.anonymous}`);
      settle(shareLink);
      return true;
    });

    const mastodon = (raw: string) => {
      const host = mastodonHost(raw);
      if (!host) {
        masto.hidden = false;
        mastoInput.focus();
        return;
      }
      masto.hidden = true;
      openComposer('mastodon', data, link, host);
    };
    const share = async (to: string) => {
      if (to === 'x' || to === 'bluesky' || to === 'threads' || to === 'whatsapp' || to === 'telegram') openComposer(to, data, link);
      else if (to === 'mastodon') mastodon(savedMastodon());
      else if (to === 'image') await saveImage(card, data);
      else if (to === 'preview') await shareImage(card, data, link);
      else if (to === 'discord') {
        const result = await shareDiscord(card, data, link);
        if (result === 'copied') say(t.rank.discordCopied);
        if (result === 'saved') say(t.rank.discordSaved);
      }
    };
    preview.addEventListener('click', () => void share('preview'));
    moreBtn.addEventListener('click', () => {
      menu.hidden = !menu.hidden;
      moreBtn.setAttribute('aria-expanded', String(!menu.hidden));
    });
    masto.addEventListener('submit', (e) => {
      e.preventDefault();
      mastodon(mastoInput.value);
    });
    for (const btn of shared.querySelectorAll<HTMLButtonElement>('.net')) btn.addEventListener('click', () => void share(btn.dataset.to ?? ''));
    actions.querySelector('.view')!.addEventListener('click', () => show(newId ? 'today' : period, newId));

    // No button: the initials line is the name. Leaving it (or Enter) renames the score just saved, and the
    // initials become the handle for the next matches. A blank or invalid line goes back to the saved name.
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      input.blur();
    });
    let renaming = 0;
    input.addEventListener('change', async () => {
      const initials = cleanInitials(input.value);
      if (!validInitials(initials)) {
        input.value = named;
        return;
      }
      saveInitials(initials);
      const turn = ++renaming;
      const ok = await saving;
      if (!ok || !runId || initials === named) return;
      say(`${placed}<br>${t.rank.saving}`);
      const res = await renameScore(runId, initials);
      if (turn !== renaming) return; // a newer name is on its way
      if (failed(res)) {
        say(`${placed}<br>${res === 'too-many' ? t.rank.tooMany : t.rank.changeFailed}`);
        return;
      }
      named = initials;
      data.initials = initials;
      ready = null; // the uploaded card still shows the old name
      card = draw();
      say(`${placed}<br>${t.rank.changed(esc(initials))}`);
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
