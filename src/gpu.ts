import { t } from './i18n';

export type GpuStatus = 'ok' | 'software' | 'none';
type Browser = 'chrome' | 'edge' | 'brave' | 'opera' | 'firefox' | 'safari' | 'other';

// Renderers a browser falls back to when it cannot (or may not) use the graphics card.
const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic|mesa offscreen/i;
const STORE = 'cirquimia.gpu';

/**
 * Probes WebGL 2 before the game loads. 'none' = no context at all (hardware acceleration off in
 * recent Chrome/Edge, or WebGL disabled); 'software' = a CPU renderer that would run at a crawl.
 */
export function gpuStatus(): GpuStatus {
  const forced = new URLSearchParams(location.search).get('gpu');
  if (forced === 'none' || forced === 'software') return forced;
  const probe = (opts: WebGLContextAttributes) => document.createElement('canvas').getContext('webgl2', opts);
  const gl = probe({ failIfMajorPerformanceCaveat: true }) ?? null;
  const any = gl ?? probe({});
  if (!any) return 'none';
  let software = !gl;
  const info = any.getExtension('WEBGL_debug_renderer_info');
  if (info && SOFTWARE.test(String(any.getParameter(info.UNMASKED_RENDERER_WEBGL)))) software = true;
  any.getExtension('WEBGL_lose_context')?.loseContext();
  return software ? 'software' : 'ok';
}

function browser(): Browser {
  const ua = navigator.userAgent;
  if ((navigator as { brave?: unknown }).brave) return 'brave';
  if (/Edg\//.test(ua)) return 'edge';
  if (/OPR\//.test(ua)) return 'opera';
  if (/Firefox\//.test(ua)) return 'firefox';
  if (/Chrome\//.test(ua)) return 'chrome';
  if (/Safari\//.test(ua)) return 'safari';
  return 'other';
}

/** The player already chose to play on a software renderer; don't ask every visit. */
export function softwareAccepted() {
  try { return localStorage.getItem(STORE) === 'software'; } catch { return false; }
}

/**
 * A card in place of the game. 'none' can only retry; 'software' can also play anyway, slowly.
 * Resolves when the player picks "play anyway".
 */
export function showGpuNotice(status: Exclude<GpuStatus, 'ok'>): Promise<void> {
  const s = t.gpu;
  const b = browser();
  const card = document.createElement('div');
  card.id = 'gpu-notice';
  card.setAttribute('role', 'alertdialog');
  card.setAttribute('aria-labelledby', 'gpu-title');
  const steps = s.steps[b];
  card.innerHTML = `
    <div class="gpu-card">
      <svg class="gpu-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="19"/><path d="M24 7 39 33H9Z"/><circle cx="24" cy="24" r="6"/></svg>
      <h2 id="gpu-title"></h2>
      <p class="gpu-lead"></p>
      <h3></h3>
      <ol></ol>
      <p class="gpu-note"></p>
      <div class="gpu-actions"><button type="button" class="gpu-retry"></button></div>
    </div>`;
  card.querySelector('h2')!.textContent = s[status].title;
  card.querySelector('.gpu-lead')!.textContent = s[status].body;
  card.querySelector('h3')!.textContent = s.how(s.names[b]);
  const list = card.querySelector('ol')!;
  for (const step of steps) {
    const li = document.createElement('li');
    // `chrome://…` addresses can't be linked from a page; show them as text to copy.
    for (const [i, part] of step.split('`').entries()) {
      if (i % 2) { const code = document.createElement('code'); code.textContent = part; li.append(code); }
      else li.append(part);
    }
    list.append(li);
  }
  card.querySelector('.gpu-note')!.textContent = s.note;
  const retry = card.querySelector<HTMLButtonElement>('.gpu-retry')!;
  retry.textContent = s.retry;
  retry.addEventListener('click', () => location.reload());
  document.body.append(card);

  return new Promise((resolve) => {
    if (status !== 'software') return;
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'gpu-play';
    play.textContent = s.playAnyway;
    play.addEventListener('click', () => {
      try { localStorage.setItem(STORE, 'software'); } catch { /* private mode: ask again next time */ }
      card.remove();
      resolve();
    });
    card.querySelector('.gpu-actions')!.append(play);
  });
}
