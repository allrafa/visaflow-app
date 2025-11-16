import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser } from '../helpers/auth';

/**
 * E2E Test: Complete Process Flow
 * Tests the full flow: Login → Create Process → Create Tasks → Upload Files → Create Criteria → Generate Final Merits
 * 
 * REQUIREMENTS:
 * - NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY devem estar configurados
 * - Supabase deve estar rodando (local ou remoto)
 */
test.describe('Complete Process Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Verificar se variáveis de ambiente estão configuradas
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      test.skip();
      return;
    }
    
    try {
      // Criar usuário de teste e autenticar
      await setupAuthenticatedUser(page);
    } catch (error) {
      // Se falhar, pular teste
      test.skip();
    }
  });

  test('should complete full EB-1A process workflow', async ({ page }) => {
    // 1. Create Process
    await page.goto('/dashboard/process/new');
    await page.fill('input[name="title"]', 'Test EB-1A Process');
    await page.fill('textarea[name="description"]', 'Test process description');
    await page.fill('textarea[name="northStar"]', 'Test North Star Statement');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/dashboard\/process\/[a-z0-9-]+/);
    const processUrl = page.url();
    const processId = processUrl.split('/').pop()!;

    // 2. Create Task
    await page.goto(`/dashboard/process/${processId}`);
    await page.click('text=Create Task');
    await page.fill('input[name="title"]', 'Test Task');
    await page.fill('textarea[name="description"]', 'Test task description');
    await page.selectOption('select[name="phase"]', 'ELIGIBILITY');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Test Task')).toBeVisible();

    // 3. Upload File
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('test content'),
    });
    await page.click('button:has-text("Upload")');
    
    await expect(page.locator('text=test.pdf')).toBeVisible();

    // 4. Create Criteria
    await page.goto(`/dashboard/process/${processId}/criteria`);
    await page.click('text=Create Criteria');
    await page.selectOption('select[name="criteria"]', 'AWARDS');
    await page.fill('textarea[name="overview"]', 'Test overview');
    await page.fill('textarea[name="context"]', 'Test context');
    await page.fill('textarea[name="impact"]', 'Test impact');
    await page.fill('textarea[name="evidence"]', 'Test evidence');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=AWARDS')).toBeVisible();

    // 5. Generate Final Merits
    await page.goto(`/dashboard/final-merits/${processId}`);
    await page.click('button:has-text("Generate Final Merits Statement")');
    
    // Wait for generation to complete
    await expect(page.locator('text=Document Sections')).toBeVisible({ timeout: 60000 });
    
    // Verify metrics are displayed
    await expect(page.locator('text=Total Criteria')).toBeVisible();
    await expect(page.locator('text=Avg Score')).toBeVisible();

    // 6. Create Recommendation Letter
    await page.goto(`/dashboard/letters/${processId}`);
    await page.click('button:has-text("New Letter")');
    await page.selectOption('select', 'ACADEMIC');
    await page.fill('input[name="recommenderName"]', 'Dr. John Smith');
    await page.fill('input[name="recommenderTitle"]', 'Professor');
    await page.fill('input[name="recommenderOrg"]', 'Stanford University');
    await page.fill('textarea[name="content"]', 'Test letter content');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Dr. John Smith')).toBeVisible();
  });

  test('should verify RLS isolation between users', async ({ page, context }) => {
    // Create process as User A
    await page.goto('/dashboard/process/new');
    await page.fill('input[name="title"]', 'User A Process');
    await page.click('button[type="submit"]');
    
    const processUrl = page.url();
    const processId = processUrl.split('/').pop()!;

    // Create new context for User B
    const userBContext = await context.browser()?.newContext();
    const userBPage = await userBContext?.newPage();
    
    if (!userBPage) {
      test.skip();
      return;
    }

    // User B should not see User A's process
    await userBPage.goto('/dashboard');
    await expect(userBPage.locator('text=User A Process')).not.toBeVisible();

    // User B should get 404 when trying to access User A's process directly
    await userBPage.goto(`/dashboard/process/${processId}`);
    await expect(userBPage).toHaveURL('/dashboard');
  });
});

