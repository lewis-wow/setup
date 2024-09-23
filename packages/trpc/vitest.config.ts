import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    name: '@repo/graphql',
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
});
