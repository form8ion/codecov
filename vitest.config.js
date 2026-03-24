import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true,
    mockReset: true,

    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text-summary', 'html'],
      reportsDirectory: 'coverage/unit',
      include: ['src/**'],
      exclude: ['src/**/index.js']
    }
  }
});
