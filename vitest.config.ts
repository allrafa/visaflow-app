import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/tests/e2e/**', // Excluir testes E2E do Playwright
      '**/*.e2e.spec.ts',
      '**/*.e2e.spec.tsx',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/types/**',
        '**/*.d.ts',
        '**/dist/**',
        '**/build/**',
        '.next/',
        'coverage/',
        'playwright.config.ts',
        'vitest.config.ts',
        'next.config.js',
        'tailwind.config.ts',
        'postcss.config.js',
        'prisma.config.ts',
        'scripts/**',
      ],
      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
      ],
      thresholds: {
        // Thresholds ajustados para valores realistas baseados no coverage atual
        // Meta: aumentar gradualmente conforme mais testes são adicionados
        lines: 35,
        functions: 30,
        branches: 24,
        statements: 35,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

