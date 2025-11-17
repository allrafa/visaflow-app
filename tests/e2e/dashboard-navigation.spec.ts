import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await login(page);
  });

  test('deve carregar o dashboard com todos os elementos', async ({ page }) => {
    await page.goto('/dashboard');

    // Verificar sidebar
    await expect(page.locator('text=/Dashboard|My Processes|Criteria|Letters/i')).toBeVisible();

    // Verificar próximas ações
    await expect(page.locator('text=/Next Actions|Próximas/i')).toBeVisible();
  });

  test('deve navegar para diferentes seções via sidebar', async ({ page }) => {
    await page.goto('/dashboard');

    // Clicar em Criteria
    await page.click('text=Criteria');
    await expect(page).toHaveURL(/\/dashboard\/criteria/);

    // Voltar e clicar em Letters
    await page.goto('/dashboard');
    await page.click('text=Letters');
    await expect(page).toHaveURL(/\/dashboard\/letters/);

    // Voltar e clicar em Next Actions
    await page.goto('/dashboard');
    await page.click('text=/Next Actions/i');
    await expect(page).toHaveURL(/\/dashboard\/actions/);
  });

  test('deve aplicar purple gradient nos ícones do sidebar', async ({ page }) => {
    await page.goto('/dashboard');

    // Verificar que ícones têm classes purple
    const sidebarIcons = page.locator('.sidebar-icon');
    const count = await sidebarIcons.count();

    expect(count).toBeGreaterThan(0);

    // Verificar que pelo menos um ícone tem classe text-purple
    const purpleIcon = page.locator('[class*="text-purple"]').first();
    await expect(purpleIcon).toBeVisible();
  });

  test('deve ter animação hover nos ícones', async ({ page }) => {
    await page.goto('/dashboard');

    // Verificar que ícones têm classe icon-container
    const iconContainer = page.locator('.icon-container').first();
    await expect(iconContainer).toBeVisible();

    // Fazer hover e verificar que não causa erro
    await iconContainer.hover();
  });
});
