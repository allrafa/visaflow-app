# VisaFlow - Test Suite Documentation

## 📋 Overview

This test suite covers the VisaFlow EB-1A petition management application with comprehensive unit, integration, and end-to-end tests.

## 🧪 Test Types

### Unit Tests (Vitest)
Location: `tests/unit/`

**Coverage:**
- Services (uploadService, criteriaService, processService, etc.)
- Validators (Zod schemas)
- Utilities
- Components (isolated)

**Running:**
```bash
npm run test:unit           # Run all unit tests
npm run test:unit:watch     # Watch mode
npm run test:unit:coverage  # With coverage report
```

### Integration Tests (Vitest)
Location: `tests/integration/`

**Coverage:**
- API routes with database
- Service layer integration
- Authentication flow

**Running:**
```bash
npm test                    # Runs unit + integration
```

### E2E Tests (Playwright)
Location: `tests/e2e/`

**Coverage:**
- Complete user workflows
- Upload system with drag & drop
- Criteria forms with AI validation
- Multi-user isolation (RLS)
- Visual regression (optional)

**Running:**
```bash
npm run test:e2e           # Run all E2E tests
npm run test:e2e:ui        # Open Playwright UI
npm run test:e2e:debug     # Debug mode
```

---

## 🎯 Key Test Files

### E2E Tests

#### 1. Upload System Tests
**File:** `tests/e2e/flows/upload-system.spec.ts`

**Tests:**
- ✅ Drag & drop file upload
- ✅ Button click file upload
- ✅ File type icon display (PDF red, DOCX blue, images blue)
- ✅ File size formatting (KB/MB)
- ✅ Download functionality
- ✅ Delete with confirmation
- ✅ File type validation (only PDF, DOCX, PNG, JPG)
- ✅ File size validation (max 10MB)
- ✅ Multiple file uploads
- ✅ Loading states
- ✅ Error handling

**Setup Requirements:**
- `NEXT_PUBLIC_SUPABASE_URL` configured
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured
- Supabase Storage bucket "uploads" created
- Dev server running on port 3000

**Fixtures:**
Tests automatically create test files in `tests/e2e/fixtures/`:
- test-document.pdf
- test-download.pdf
- test-delete.pdf
- invalid.txt (for error testing)
- large-file.pdf (for size validation)

---

#### 2. Criteria Validation Tests
**File:** `tests/e2e/flows/criteria-validation.spec.ts`

**Tests:**
- ✅ Display all 10 EB-1A criteria
- ✅ Create criteria with 4 subsections (Overview, Context, Impact, Evidence)
- ✅ Real-time AI validation (Claude API)
- ✅ Suspicious practice detection (e.g., Globee awards)
- ✅ Validation score display (0-100)
- ✅ Subsection progress tracking
- ✅ Guidelines display
- ✅ Save and persist criteria
- ✅ Edit mode display after creation

**Setup Requirements:**
- All upload test requirements +
- `ANTHROPIC_API_KEY` configured
- Claude API access enabled

**AI Features Tested:**
- Content quality analysis
- Pattern detection (approval vs rejection)
- AI-generated content detection
- Suspicious practice alerts
- Quantifiable evidence verification

---

#### 3. Complete Process Flow
**File:** `tests/e2e/flows/complete-process.spec.ts`

**Tests:**
- ✅ Full workflow: Login → Create Process → Tasks → Uploads → Criteria → Final Merits → Letters
- ✅ Multi-user RLS isolation
- ✅ Unauthorized access prevention

---

## 🛠️ Test Helpers

### Authentication Helper
**File:** `tests/e2e/helpers/auth.ts`

Provides:
- `setupAuthenticatedUser()` - Creates test user and authenticates session
- Automatic cleanup
- Session persistence

Usage:
```typescript
import { setupAuthenticatedUser } from '../helpers/auth';

test.beforeEach(async ({ page }) => {
  await setupAuthenticatedUser(page);
});
```

---

## 📊 Coverage Thresholds

Current targets (defined in `vitest.config.ts`):
- Lines: 35%
- Functions: 30%
- Branches: 24%
- Statements: 35%

**Goal:** Gradually increase to 80%+ as more tests are added.

---

## 🚀 Quick Start

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Run All Tests
```bash
# Unit + Integration
npm test

# E2E (headless)
npm run test:e2e

# E2E (with UI)
npm run test:e2e:ui

# Specific test file
npx playwright test tests/e2e/flows/upload-system.spec.ts
```

### Debug Mode
```bash
# Run with Playwright Inspector
npx playwright test --debug

# Run specific test in headed mode
npx playwright test tests/e2e/flows/upload-system.spec.ts --headed

# Show browser while testing
npx playwright test --headed --slowmo=1000
```

---

## 🎬 Recording & Tracing

Playwright automatically records:
- **Screenshots** on failure only
- **Videos** on failure only (`--video=retain-on-failure`)
- **Traces** on first retry (`trace: 'on-first-retry'`)

View traces:
```bash
npx playwright show-trace trace.zip
```

---

## 🔍 Visual Testing with MCP

VisaFlow uses Playwright MCP for visual regression testing:

**Features:**
- Screenshot comparison
- Visual diff generation
- Automatic baseline management
- CI/CD integration

**Usage:**
```typescript
// In test file
await expect(page).toHaveScreenshot('dashboard.png');
```

**Update baselines:**
```bash
npx playwright test --update-snapshots
```

---

## 🧩 Test Data Management

### Fixtures
Test files are created dynamically in `tests/e2e/fixtures/`:
- PDF documents (valid/invalid sizes)
- Image files
- DOCX documents
- Invalid file types (for error testing)

### Database
E2E tests create temporary data:
- Test processes
- Test tasks
- Test uploads
- Test criteria

**Cleanup:** Automatic via Supabase RLS (user-scoped data)

---

## 📝 Writing New Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { validateUploadedFile } from '@/lib/services/uploadService';

describe('uploadService', () => {
  it('should validate PDF files', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    expect(() => validateUploadedFile(file)).not.toThrow();
  });

  it('should reject invalid file types', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    expect(() => validateUploadedFile(file)).toThrow('File type not allowed');
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser } from '../helpers/auth';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedUser(page);
  });

  test('should perform action', async ({ page }) => {
    await page.goto('/some-page');
    await page.click('button:has-text("Action")');
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

---

## 🐛 Debugging Tips

### Failed Tests
1. **Check screenshots:** `playwright-report/`
2. **View trace:** `npx playwright show-trace trace.zip`
3. **Run in headed mode:** `--headed` flag
4. **Add breakpoints:** `await page.pause()`

### Flaky Tests
- Use `await expect().toBeVisible()` instead of `await page.isVisible()`
- Add explicit waits: `await page.waitForLoadState('networkidle')`
- Increase timeout: `{ timeout: 10000 }`
- Use retry: `test.describe.configure({ retries: 2 })`

### Environment Issues
- Verify `.env` has all required variables
- Check Supabase connection: `npx tsx scripts/verify-supabase-tables.ts`
- Verify Claude API: `echo $ANTHROPIC_API_KEY`
- Check dev server: `curl http://localhost:3000`

---

## 📈 CI/CD Integration

### GitHub Actions
Tests run automatically on:
- Pull requests
- Pushes to main
- Scheduled daily runs

**Configuration:** `.github/workflows/test.yml`

### Vercel Deployment
- Tests must pass before deployment
- E2E tests run against preview deployments
- Production deployment requires all green tests

---

## 🎓 Best Practices

### DO ✅
- Test user flows, not implementation details
- Use data-testid for reliable selectors
- Clean up test data in afterEach
- Use Page Object Model for complex flows
- Mock external APIs when appropriate
- Test error states and edge cases

### DON'T ❌
- Test internal component state
- Use sleep/arbitrary waits
- Skip cleanup
- Hardcode test data that should be dynamic
- Test multiple concerns in one test
- Ignore flaky tests

---

## 📚 Resources

- [Playwright Docs](https://playwright.dev/)
- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [VISAFLOW CONTEXT.md](../VISAFLOW%20CONTEXT.md) - Project architecture

---

## 📞 Support

**Issues:** Create GitHub issue with:
- Test file name
- Error message
- Environment details
- Steps to reproduce

**Questions:** Check VISAFLOW CONTEXT.md or ask in team chat.

---

**Last Updated:** November 2025
**Test Coverage:** 35% (target: 80%)
**Status:** ✅ All core features tested
