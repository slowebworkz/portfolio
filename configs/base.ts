import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

import type { ESLintConfig } from './types.js';

const FILES = ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'];

const config = [
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/coverage/**'],
  },
  {
    ...js.configs.recommended,
    files: FILES,
  },
  {
    ...eslintConfigPrettier,
    files: FILES,
  },
] satisfies ESLintConfig;

export default config;
