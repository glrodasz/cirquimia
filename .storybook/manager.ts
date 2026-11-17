import { addons } from 'storybook/manager-api';
import { grimoire } from './theme';

addons.setConfig({ theme: grimoire, sidebar: { showRoots: false } });
