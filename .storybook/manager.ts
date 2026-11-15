import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

/** The grimoire's colours on Storybook's own frame. */
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Cirquimia · Componentes',
    brandUrl: 'https://cirquimia.pages.dev',
    colorPrimary: '#9a2f24',
    colorSecondary: '#9a2f24',
    appBg: '#f3e8cc',
    appContentBg: '#fbf3de',
    appBorderColor: 'rgba(90,60,25,.25)',
    textColor: '#3a2b1d',
    barBg: '#fbf3de',
    fontBase: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  }),
  sidebar: { showRoots: true },
});
