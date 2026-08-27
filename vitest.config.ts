import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'packages',
          environment: 'node',
          include: ['packages/*/src/**/*.{test,spec}.{ts,tsx}'],
          passWithNoTests: true,
        },
      },
      './apps/web/vite.config.ts',
    ],
  },
});
