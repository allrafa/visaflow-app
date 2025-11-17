import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Carregar variáveis de ambiente do arquivo .env.test se existir, caso contrário do .env
const envTestPath = path.resolve(__dirname, '.env.test');
const envPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envTestPath)) {
  dotenv.config({ path: envTestPath });
} else {
  dotenv.config({ path: envPath });
}

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3002',
    trace: 'on-first-retry',
    // Timeout para ações (aumentado para 30s)
    actionTimeout: 30000,
    // Timeout para navegação (aumentado para 60s)
    navigationTimeout: 60000,
    // Screenshot apenas em falhas
    screenshot: 'only-on-failure',
    // Video apenas em falhas
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3002',
    reuseExistingServer: true,
    timeout: 120000,
  },
  // Variáveis de ambiente disponíveis nos testes via process.env
  // Playwright automaticamente expõe process.env para os testes
  // Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão configuradas
});

