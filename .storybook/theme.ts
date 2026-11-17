import { create } from 'storybook/theming';

/** The grimoire's paper and ink on Storybook's own frame and its Docs pages, whatever the system theme. */
export const grimoire = create({
  base: 'light',
  brandTitle: 'Cirquimia · Componentes',
  brandUrl: 'https://cirquimia.pages.dev',
  colorPrimary: '#9a2f24',
  colorSecondary: '#9a2f24',
  appBg: '#f3e8cc',
  appContentBg: '#fbf3de',
  appPreviewBg: '#f5efe0',
  appBorderColor: 'rgba(90,60,25,.25)',
  appBorderRadius: 10,
  textColor: '#3a2b1d',
  textMutedColor: '#6b6258',
  barBg: '#fbf3de',
  barTextColor: '#6b6258',
  barSelectedColor: '#9a2f24',
  inputBg: '#fffaf0',
  inputBorder: 'rgba(90,60,25,.3)',
  fontBase: "system-ui, -apple-system, 'Segoe UI', sans-serif",
});
