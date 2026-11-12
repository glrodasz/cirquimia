/** The game version, stamped at build time from the latest git tag (see vite.config.ts). */
export const VERSION: string = __GAME_VERSION__;

/** Tiny version label over the top edge of the screen, for developers only (?dev). */
export function mountVersionBadge() {
  const badge = document.createElement('div');
  badge.id = 'version';
  badge.textContent = `v${VERSION}`;
  Object.assign(badge.style, {
    position: 'fixed',
    top: 'calc(env(safe-area-inset-top, 0px) + 2px)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '1000',
    font: '600 10px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace',
    color: '#fff',
    background: 'rgba(0, 0, 0, .45)',
    padding: '1px 6px',
    borderRadius: '4px',
    pointerEvents: 'none',
    userSelect: 'none',
  });
  document.body.append(badge);
}
