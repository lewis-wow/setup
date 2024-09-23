import { baseTsupConfig } from '@repo/tsup/base';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...baseTsupConfig,
  entry: [...baseTsupConfig.entry, 'src/**/*.json'],
});
