/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// `/` for a custom domain or user site; set SITE_BASE=/portfolio/ for a project page.
const base = process.env.SITE_BASE ?? '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Workspace packages export .ts source — bundle them into the SSR output so
  // the prerender script can import it with plain Node.
  ssr: {
    noExternal: ['@portfolio/content', '@portfolio/data'],
  },
  test: {
    name: 'web',
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    passWithNoTests: true,
  },
});
