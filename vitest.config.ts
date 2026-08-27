import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // No test suites exist yet; keep `vitest run` green until packages add them.
    passWithNoTests: true,
    include: ['packages/*/src/**/*.{test,spec}.{ts,tsx}'],
  },
});
