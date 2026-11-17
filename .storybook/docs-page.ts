import { createElement as h, useContext, type ReactNode } from 'react';
import { DocsContext, Markdown, Primary, Title } from '@storybook/addon-docs/blocks';

/**
 * A group's Docs page: what it is, then one card per story with a link that opens it. Each story owns a whole game
 * page (and the 3D ones a WebGL canvas), so a page with every story in a frame was heavy and slow on a phone: only
 * the first story is drawn, and only on a wide screen.
 */
export function DocsPage(): ReactNode {
  const ctx = useContext(DocsContext);
  const stories = ctx.componentStories();
  const meta = stories[0]?.parameters?.docs?.description?.component as string | undefined;
  const wide = typeof window !== 'undefined' && window.matchMedia('(min-width: 760px)').matches;
  return h(
    'div',
    { className: 'kit-docs' },
    h(Title),
    meta ? h('p', { className: 'kit-docs-lead' }, meta) : null,
    wide ? h(Primary) : null,
    h(
      'ul',
      { className: 'kit-docs-list' },
      stories.map((s) =>
        h(
          'li',
          { key: s.id },
          h(
            'a',
            { href: `./?path=/story/${s.id}`, target: '_top' },
            h('b', null, s.name),
            h(Markdown, null, String(s.parameters?.docs?.description?.story ?? '')),
            h('span', { className: 'kit-docs-open' }, 'Abrir ›'),
          ),
        ),
      ),
    ),
  );
}
