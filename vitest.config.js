import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true,
    mockReset: true,

    reporters: process.env.CODECOV_TOKEN
      ? ['default', ['junit', {outputFile: 'unit.junit.xml'}]]
      : ['default'],

    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text-summary', 'html'],
      reportsDirectory: 'coverage/unit',
      include: ['src/**'],
      exclude: ['src/**/index.js']
    }
  }
});
