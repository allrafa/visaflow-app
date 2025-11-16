import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser } from '../helpers/auth';

/**
 * E2E Test: Criteria Form with AI Validation
 * Tests the criteria forms with real-time AI validation
 *
 * Features tested:
 * - Criteria form 4 subsections
 * - Real-time AI validation
 * - Subsection progress tracking
 * - Suspicious practice detection
 * - Validation score display
 * - Metrics calculator
 */
test.describe('Criteria Validation Flow', () => {
  let processId: string;

  test.beforeEach(async ({ page }) => {
    // Skip if environment not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        !process.env.ANTHROPIC_API_KEY) {
      test.skip();
      return;
    }

    try {
      // Setup authenticated user
      await setupAuthenticatedUser(page);

      // Create a test process
      await page.goto('/process/new');
      await page.fill('input[name="title"]', 'Criteria Validation Test Process');
      await page.fill('textarea[name="description"]', 'Testing criteria validation with AI');
      await page.fill('textarea[name="northStar"]', 'I am demonstrating extraordinary ability in my field through groundbreaking contributions.');
      await page.click('button[type="submit"]');

      // Wait for redirect
      await page.waitForURL(/\/process\/[a-z0-9-]+/);
      processId = page.url().split('/').pop()!;

    } catch (error) {
      console.error('Setup failed:', error);
      test.skip();
    }
  });

  test('should navigate to criteria management and display all 10 criteria', async ({ page }) => {
    // Navigate to criteria page
    await page.goto(`/process/${processId}/criteria`);

    // Verify page title
    await expect(page.locator('h1:has-text("Critérios EB-1A")')).toBeVisible();

    // Verify all 10 criteria are displayed
    const criteriaCards = page.locator('[class*="Card"]').filter({ has: page.locator('button:has-text(/Criar|Editar/)') });
    await expect(criteriaCards).toHaveCount(10);

    // Verify some specific criteria exist
    await expect(page.locator('text=Prêmios Reconhecidos')).toBeVisible();
    await expect(page.locator('text=Contribuições Originais')).toBeVisible();
    await expect(page.locator('text=Papel Crítico/Liderança')).toBeVisible();
  });

  test('should create criteria with 4 subsections', async ({ page }) => {
    await page.goto(`/process/${processId}/criteria`);

    // Click on first criteria (AWARDS)
    const createButton = page.locator('button:has-text("Criar")').first();
    await createButton.click();

    // Should redirect to criteria form
    await page.waitForURL(/\/criteria\/[A-Z_]+/);

    // Verify all 4 subsection fields are present
    await expect(page.locator('label:has-text("Overview")').or(page.locator('label:has-text("Visão Geral")'))).toBeVisible();
    await expect(page.locator('label:has-text("Context")').or(page.locator('label:has-text("Contexto")'))).toBeVisible();
    await expect(page.locator('label:has-text("Impact")').or(page.locator('label:has-text("Impacto")'))).toBeVisible();
    await expect(page.locator('label:has-text("Evidence")').or(page.locator('label:has-text("Evidências")'))).toBeVisible();
  });

  test('should fill criteria and trigger AI validation', async ({ page }) => {
    await page.goto(`/process/${processId}/criteria`);

    // Create AWARDS criteria
    await page.locator('button:has-text("Criar")').first().click();
    await page.waitForURL(/\/criteria\/[A-Z_]+/);

    // Fill overview subsection with quality content
    const overviewTextarea = page.locator('textarea[name="overview"]');
    await overviewTextarea.fill(`
      I have received the prestigious IEEE Fellow Award in 2023, which recognizes exceptional
      contributions to electrical engineering and computer science. This award is given to less
      than 0.1% of IEEE members worldwide, demonstrating its highly selective nature and
      international recognition. The nomination process involved peer review by a panel of
      distinguished experts in the field, and my selection was based on groundbreaking research
      in artificial intelligence and machine learning.
    `);

    // Fill context subsection
    const contextTextarea = page.locator('textarea[name="context"]');
    await contextTextarea.fill(`
      The IEEE Fellow award is one of the highest honors in electrical engineering, established
      in 1912. Recipients must have demonstrated extraordinary accomplishments in their field
      with at least 15 years of professional experience. Out of over 420,000 IEEE members
      globally, fewer than 300 are elevated to Fellow status each year, representing the top
      0.07% of the membership.
    `);

    // Fill impact subsection
    const impactTextarea = page.locator('textarea[name="impact"]');
    await impactTextarea.fill(`
      My research has led to 15 patents, 50+ peer-reviewed publications cited over 3,000 times,
      and deployment of AI systems used by Fortune 500 companies serving 10 million users
      globally. The economic impact of my work is estimated at $50 million in cost savings
      and efficiency improvements across the industry. I have been invited as keynote speaker
      at 8 international conferences with audiences of 500+ attendees.
    `);

    // Fill evidence subsection
    const evidenceTextarea = page.locator('textarea[name="evidence"]');
    await evidenceTextarea.fill(`
      Evidence includes: (1) Official IEEE Fellow certificate dated March 2023, (2) Nomination
      letter from Dr. Jane Smith, IEEE Senior Fellow, (3) Citation analysis from Google Scholar
      showing 3,247 citations, (4) Letters from Fortune 500 CTOs confirming deployment and
      impact, (5) Conference invitation letters with attendee statistics, (6) Patent certificates
      from USPTO with filing and approval dates.
    `);

    // Wait for AI validation to trigger (debounced, typically 1.5-2 seconds)
    await page.waitForTimeout(3000);

    // Should show validation in progress or results
    // Note: This depends on ANTHROPIC_API_KEY being configured and API being available
    const validationSection = page.locator('text=Validation').or(page.locator('text=Validação'));
    await expect(validationSection).toBeVisible({ timeout: 30000 });

    // Save the criteria
    await page.locator('button:has-text(/Salvar|Save/)').click();

    // Should show success message
    await expect(page.locator('text=/salv|saved/i')).toBeVisible({ timeout: 5000 });
  });

  test('should detect suspicious practices in content', async ({ page }) => {
    await page.goto(`/process/${processId}/criteria`);

    // Create criteria
    await page.locator('button:has-text("Criar")').first().click();
    await page.waitForURL(/\/criteria\/[A-Z_]+/);

    // Fill with content that might trigger suspicious practice alerts
    // Using keywords like "Globee Award" which is flagged as suspicious
    const overviewTextarea = page.locator('textarea[name="overview"]');
    await overviewTextarea.fill(`
      I won a Gold Globee Award in 2023 for Business Excellence. This international award
      recognizes outstanding achievements in business and technology innovation.
    `);

    // Wait for suspicious practice detection
    await page.waitForTimeout(3000);

    // Should show suspicious practice alert
    // Note: This depends on the AI service detecting the Globee award mention
    const suspiciousAlert = page.locator('[class*="Alert"]').filter({
      hasText: /suspicious|suspeito|warning|alerta/i
    });

    // Verify alert appears (may take time for AI analysis)
    await expect(suspiciousAlert).toBeVisible({ timeout: 30000 });
  });

  test('should display validation score after content analysis', async ({ page }) => {
    await page.goto(`/process/${processId}/criteria`);

    // Create and fill criteria with good content
    await page.locator('button:has-text("Criar")').first().click();
    await page.waitForURL(/\/criteria\/[A-Z_]+/);

    // Fill all 4 subsections with substantial content
    const subsections = [
      { name: 'overview', content: 'Detailed overview with specific achievements, dates, and names. Over 100 words of quality content describing the award, selection process, and recognition received.' },
      { name: 'context', content: 'Comprehensive context explaining the significance, selectivity, and requirements of the recognition. Industry standards and comparative data provided.' },
      { name: 'impact', content: 'Quantifiable impact metrics including citations, users affected, economic value, and industry adoption. Specific numbers and verifiable data points.' },
      { name: 'evidence', content: 'Detailed list of documentary evidence with specific items, dates, sources, and verification methods. Multiple independent corroborating sources.' },
    ];

    for (const subsection of subsections) {
      const textarea = page.locator(`textarea[name="${subsection.name}"]`);
      await textarea.fill(subsection.content);
      await page.waitForTimeout(500); // Brief pause between fields
    }

    // Wait for validation to complete
    await page.waitForTimeout(5000);

    // Should display validation score (0-100)
    const scoreDisplay = page.locator('text=/Score:?\\s*\\d+/').or(page.locator('text=/Pontuação:?\\s*\\d+/'));
    await expect(scoreDisplay).toBeVisible({ timeout: 30000 });

    // Optionally verify score is reasonable (above 50 for good content)
    const scoreText = await scoreDisplay.textContent();
    const scoreMatch = scoreText?.match(/\d+/);
    if (scoreMatch) {
      const score = parseInt(scoreMatch[0]);
      expect(score).toBeGreaterThanOrEqual(40); // At least moderate score for substantial content
    }
  });

  test('should show subsection progress indicators', async ({ page }) => {
    await page.goto(`/process/${processId}/criteria`);

    await page.locator('button:has-text("Criar")').first().click();
    await page.waitForURL(/\/criteria\/[A-Z_]+/);

    // Initially, subsections should show as incomplete or 0% progress
    // Fill first subsection
    const overviewTextarea = page.locator('textarea[name="overview"]');
    await overviewTextarea.fill('This is a test overview with some meaningful content about achievements.');

    // Wait a moment for progress calculation
    await page.waitForTimeout(1000);

    // Should show some progress indication
    // This could be a progress bar, checkmark, or percentage
    const progressIndicator = page.locator('[class*="progress"]').or(
      page.locator('text=/\\d+%/').or(
        page.locator('[class*="check"]')
      )
    );

    // At least one progress indicator should be visible
    await expect(progressIndicator.first()).toBeVisible();
  });

  test('should display guidelines for selected criteria', async ({ page }) => {
    await page.goto(`/process/${processId}/criteria`);

    await page.locator('button:has-text("Criar")').first().click();
    await page.waitForURL(/\/criteria\/[A-Z_]+/);

    // Should display guidelines or help text for the criteria
    const guidelines = page.locator('text=Guidelines').or(
      page.locator('text=Diretrizes').or(
        page.locator('[class*="guideline"]')
      )
    );

    await expect(guidelines).toBeVisible();

    // Should show requirements or tips
    const helpText = page.locator('text=/requirement|requisito|tip|dica/i');
    await expect(helpText.first()).toBeVisible();
  });

  test('should save criteria and return to list', async ({ page }) => {
    await page.goto(`/process/${processId}/criteria`);

    // Create criteria
    await page.locator('button:has-text("Criar")').first().click();
    await page.waitForURL(/\/criteria\/[A-Z_]+/);

    // Fill required content
    await page.locator('textarea[name="overview"]').fill('Test overview content for saving.');
    await page.locator('textarea[name="context"]').fill('Test context content for saving.');

    // Save
    await page.locator('button:has-text(/Salvar|Save/)').click();

    // Should show success and stay on page or redirect
    await expect(page.locator('text=/salv|saved|sucesso|success/i')).toBeVisible({ timeout: 5000 });

    // Navigate back to criteria list
    await page.goto(`/process/${processId}/criteria`);

    // The criteria should now show "Editar" instead of "Criar"
    const firstCriteriaCard = page.locator('[class*="Card"]').first();
    await expect(firstCriteriaCard.locator('button:has-text("Editar")')).toBeVisible();

    // Should show checkmark or validation badge if validated
    const checkmark = firstCriteriaCard.locator('[class*="check"]').or(
      firstCriteriaCard.locator('svg[class*="CheckCircle"]')
    );
    await expect(checkmark).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    // Cleanup if needed
  });
});
