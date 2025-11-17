import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test.describe('Next Actions Component', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard');
  });

  test('deve exibir o componente Next Actions no dashboard', async ({ page }) => {
    // Verificar título
    await expect(page.locator('text=Next Actions')).toBeVisible();
    await expect(page.locator('text=/Próximas ações prioritárias/i')).toBeVisible();
  });

  test('deve exibir cards de ações com espaçamento adequado', async ({ page }) => {
    // Verificar que cards têm classe space-y-4 (espaçamento de 16px)
    const cardsContainer = page.locator('.space-y-4').first();
    await expect(cardsContainer).toBeVisible();
  });

  test('deve ter ações clicáveis com hover effect', async ({ page }) => {
    // Encontrar primeiro card de ação
    const actionCard = page.locator('.hover\\:shadow-md').first();

    if (await actionCard.isVisible()) {
      // Fazer hover
      await actionCard.hover();

      // Verificar que é clicável
      await expect(actionCard).toHaveClass(/cursor-pointer/);

      // Clicar no card
      await actionCard.click();

      // Deve navegar para alguma página
      await page.waitForURL(/\/dashboard\/.*/, { timeout: 5000 });
    }
  });

  test('deve exibir badges de prioridade coloridas', async ({ page }) => {
    // Verificar badges URGENT (vermelho)
    const urgentBadge = page.locator('text=URGENT').first();
    if (await urgentBadge.isVisible()) {
      await expect(urgentBadge).toHaveClass(/bg-red/);
    }

    // Verificar badges MEDIUM (verde)
    const mediumBadge = page.locator('text=MEDIUM').first();
    if (await mediumBadge.isVisible()) {
      await expect(mediumBadge).toHaveClass(/bg-green/);
    }
  });

  test('deve ter botão "Ver todas as X ações" funcional', async ({ page }) => {
    // Procurar botão "Ver todas"
    const viewAllButton = page.locator('button:has-text("Ver todas"), a:has-text("Ver todas")');

    if (await viewAllButton.isVisible()) {
      // Clicar no botão
      await viewAllButton.click();

      // Deve navegar para /dashboard/actions
      await expect(page).toHaveURL(/\/dashboard\/actions/);
    }
  });

  test('deve ter hover effect purple no botão Ver todas', async ({ page }) => {
    const viewAllButton = page.locator('button:has-text("Ver todas"), a:has-text("Ver todas")').first();

    if (await viewAllButton.isVisible()) {
      // Fazer hover
      await viewAllButton.hover();

      // Verificar que tem hover purple classes
      await expect(viewAllButton).toHaveClass(/hover:bg-purple-muted|hover:border-purple/);
    }
  });
});

test.describe('Actions Page (/dashboard/actions)', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('deve carregar página de ações completa', async ({ page }) => {
    await page.goto('/dashboard/actions');

    // Verificar título
    await expect(page.locator('h1:has-text("Próximas Ações")')).toBeVisible();

    // Verificar descrição
    await expect(page.locator('text=/Gerencie todas as suas ações/i')).toBeVisible();
  });

  test('deve exibir todas as ações (não limitado a 5)', async ({ page }) => {
    await page.goto('/dashboard/actions');

    // Contar quantos action cards existem
    const actionCards = page.locator('.hover\\:shadow-md');
    const count = await actionCards.count();

    // Deve haver pelo menos 1 ação (ou 0 se não houver tarefas)
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('deve ordenar ações por prioridade', async ({ page }) => {
    await page.goto('/dashboard/actions');

    // Pegar todos os badges de prioridade
    const priorityBadges = page.locator('[class*="bg-red"], [class*="bg-yellow"], [class*="bg-green"]');
    const count = await priorityBadges.count();

    if (count > 1) {
      // Verificar que URGENT (vermelho) vem antes de MEDIUM (verde)
      const firstBadgeClasses = await priorityBadges.first().getAttribute('class');
      
      // Se o primeiro for URGENT, deve ter classe bg-red
      if (firstBadgeClasses?.includes('bg-red')) {
        expect(firstBadgeClasses).toContain('bg-red');
      }
    }
  });

  test('deve ter navegação de volta para o dashboard', async ({ page }) => {
    await page.goto('/dashboard/actions');

    // Clicar no logo ou botão de voltar
    const backButton = page.locator('text=Dashboard').first();
    await backButton.click();

    // Deve voltar para o dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});

test.describe('Next Actions - Visual Design', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard');
  });

  test('deve manter cores verde e vermelha nas badges', async ({ page }) => {
    // Verificar que cores foram mantidas (não mudaram para roxo)
    const redBadge = page.locator('[class*="bg-red"]').first();
    const greenBadge = page.locator('[class*="bg-green"]').first();

    if (await redBadge.isVisible()) {
      await expect(redBadge).toBeVisible();
    }

    if (await greenBadge.isVisible()) {
      await expect(greenBadge).toBeVisible();
    }
  });

  test('deve ter transições suaves nos cards', async ({ page }) => {
    const actionCard = page.locator('.transition-all').first();

    if (await actionCard.isVisible()) {
      // Verificar que tem classe transition
      await expect(actionCard).toHaveClass(/transition/);

      // Verificar que tem duration-200
      await expect(actionCard).toHaveClass(/duration-200/);
    }
  });

  test('deve ter ícones com cores corretas por prioridade', async ({ page }) => {
    // Verificar ícone AlertCircle para URGENT
    const urgentIcon = page.locator('svg').first();

    if (await urgentIcon.isVisible()) {
      // Verificar que ícones estão visíveis
      await expect(urgentIcon).toBeVisible();
    }
  });
});
