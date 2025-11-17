import { test, expect } from '@playwright/test';
import { login, logout, TEST_USER } from './helpers/auth';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Garantir que não está logado antes de cada teste
    await page.goto('/');
  });

  test('deve realizar login com sucesso', async ({ page }) => {
    await login(page);

    // Verificar que está no dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Verificar elementos do dashboard
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('deve redirecionar para login quando não autenticado', async ({ page }) => {
    // Tentar acessar dashboard sem login
    await page.goto('/dashboard');

    // Deve redirecionar para login
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    await page.goto('/auth/login');

    // Preencher com credenciais inválidas
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Aguardar mensagem de erro
    await expect(page.locator('text=/invalid|erro|error/i')).toBeVisible({ timeout: 5000 });
  });

  test('deve realizar logout com sucesso', async ({ page }) => {
    // Fazer login primeiro
    await login(page);

    // Fazer logout
    await logout(page);

    // Verificar que voltou para login
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('deve manter sessão ao recarregar página', async ({ page }) => {
    // Fazer login
    await login(page);

    // Recarregar página
    await page.reload();

    // Deve continuar no dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
