/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // Relative base so the static build works under a subpath (e.g. GitHub Pages).
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    name: 'web',
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    passWithNoTests: true,
  },
});
