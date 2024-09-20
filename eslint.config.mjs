import globals, { es2021 } from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: ['jest'],
    ...pluginJs.configs.base,
    env: {
      jest: true,
      node: true,
      browser: true,
      es2021: true,
    },
  },
  pluginJs.configs.recommended,
];
