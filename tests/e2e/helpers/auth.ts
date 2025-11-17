import { Page } from '@playwright/test';

/**
 * Credenciais de teste
 * IMPORTANTE: Preencha com as credenciais fornecidas pelo usuário
 */
export const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || 'your-test-email@example.com',
  password: process.env.TEST_USER_PASSWORD || 'your-test-password',
};

/**
 * Realiza login no sistema
 * @param page - Página do Playwright
 * @param email - Email do usuário (opcional, usa TEST_USER por padrão)
 * @param password - Senha do usuário (opcional, usa TEST_USER por padrão)
 */
export async function login(
  page: Page,
  email: string = TEST_USER.email,
  password: string = TEST_USER.password
) {
  // Navegar para página de login
  await page.goto('/auth/login', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Aguardar o formulário de login estar visível com timeout maior
  await page.waitForSelector('input[type="email"]', { timeout: 30000 });

  // Aguardar um pouco para garantir que os campos estão interativos
  await page.waitForTimeout(1000);

  // Preencher formulário
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);

  // Aguardar um pouco antes de submeter
  await page.waitForTimeout(500);

  // Clicar no botão de login
  await page.click('button[type="submit"]');

  // Aguardar navegação para o dashboard com timeout maior
  await page.waitForURL(/\/dashboard/, { timeout: 30000 });

  // Aguardar a página carregar completamente
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
}

/**
 * Realiza logout do sistema
 * @param page - Página do Playwright
 */
export async function logout(page: Page) {
  // Verificar se está logado (presença do botão de logout)
  const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sair")');

  if (await logoutButton.isVisible()) {
    await logoutButton.click();
    await page.waitForURL(/\/auth\/login/, { timeout: 10000 });
  }
}

/**
 * Verifica se o usuário está autenticado
 * @param page - Página do Playwright
 * @returns true se está autenticado, false caso contrário
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  const url = page.url();
  return url.includes('/dashboard') && !url.includes('/auth/login');
}

/**
 * Cria uma sessão autenticada reutilizável (para otimizar testes)
 * Usa storage state do Playwright para evitar login repetido
 */
export async function setupAuthenticatedSession(page: Page) {
  await login(page);

  // Salvar estado da sessão
  const cookies = await page.context().cookies();
  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage));

  return {
    cookies,
    localStorage,
  };
}
