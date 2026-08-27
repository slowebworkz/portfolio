import type { ESLintConfig } from './configs/types.js';
import base from './configs/base.js';
import ts from './configs/typescript.js';
import boundaries from './configs/boundaries.js';

const config = [...base, ...ts, ...boundaries] satisfies ESLintConfig;

export default config;
