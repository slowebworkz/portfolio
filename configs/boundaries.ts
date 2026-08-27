import type { ESLintConfig } from './types.js';

/**
 * Package dependency direction — see docs/architecture.md.
 *
 * Allowed internal edges:
 *   content  -> data
 *   archive  -> data
 *   ui       -> (nothing internal)
 *   data     -> (nothing internal)
 *
 * Enforced by forbidding the disallowed `@portfolio/*` import specifiers in
 * each package's source. Specifier-based rather than `import-x/no-restricted-paths`
 * because that needs package `exports` resolution the packages don't have yet.
 */

const SCOPE = '@portfolio';

function boundary(dir: string, forbidden: string[]) {
  return {
    files: [`packages/${dir}/**/*.{ts,tsx,mts,cts}`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: forbidden.map((name) => ({
            group: [`${SCOPE}/${name}`, `${SCOPE}/${name}/*`],
            message: `packages/${dir} must not depend on ${SCOPE}/${name} (see docs/architecture.md)`,
          })),
        },
      ],
    },
  };
}

const config = [
  boundary('data', ['content', 'ui', 'archive']),
  boundary('content', ['ui', 'archive']),
  boundary('archive', ['content', 'ui']),
  boundary('ui', ['data', 'content', 'archive']),
] satisfies ESLintConfig;

export default config;
