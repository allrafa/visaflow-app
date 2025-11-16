# 🚀 VisaFlow Deployment Guide

**Complete guide for deploying VisaFlow to production on Vercel**

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Vercel Setup](#vercel-setup)
3. [Environment Variables](#environment-variables)
4. [Database Migration](#database-migration)
5. [Domain Configuration](#domain-configuration)
6. [Monitoring Setup](#monitoring-setup)
7. [Post-Deployment Validation](#post-deployment-validation)
8. [Rollback Procedure](#rollback-procedure)
9. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying to production, ensure all items below are complete:

### Code Quality
- [ ] All tests passing (`npm run test:all`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] E2E tests pass (`npm run test:e2e`)

### Database
- [ ] All migrations created and tested
- [ ] RLS policies verified (`npm run verify:rls`)
- [ ] Storage buckets configured (`npm run verify:storage`)
- [ ] Seed data ready (if needed)

### Configuration
- [ ] Environment variables documented
- [ ] API keys secured in vault
- [ ] SSL certificates ready
- [ ] Domain DNS configured

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured (Vercel Analytics)
- [ ] Performance monitoring enabled
- [ ] Logging infrastructure ready

---

## 🔧 Vercel Setup

### 1. Create Vercel Project

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link
```

**Select options:**
- Framework: Next.js
- Root Directory: ./
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 2. Configure Project Settings

In Vercel Dashboard:

1. **General Settings**
   - Project Name: `visaflow-app`
   - Framework Preset: Next.js
   - Node.js Version: 20.x
   - Root Directory: ./

2. **Build & Development Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Development Command: `npm run dev`

3. **Git Integration**
   - Enable automatic deployments from `main` branch
   - Enable preview deployments for pull requests
   - Set up deployment protection (optional)

### 3. Deployment Regions

**Recommended Primary Region:** `iad1` (Washington, D.C., USA)

**Why?**
- Low latency for US-based users
- Close to Supabase infrastructure
- Reliable connectivity to Claude API

**Configure in vercel.json:**
```json
{
  "regions": ["iad1"]
}
```

---

## 🔐 Environment Variables

### Setting Up Environment Variables in Vercel

#### Method 1: Vercel Dashboard

1. Go to Project Settings → Environment Variables
2. Add each variable below
3. Select environments: Production, Preview, Development

#### Method 2: Vercel CLI

```bash
# Set production variables
vercel env add DATABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add ANTHROPIC_API_KEY production
vercel env add RESEND_API_KEY production
```

### Required Environment Variables

#### Database Configuration

```bash
# Prisma Accelerate connection (with connection pooling)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_PRISMA_API_KEY"

# Direct database connection (for migrations)
DIRECT_DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
```

#### Supabase Configuration

```bash
# Public URL (safe to expose to client)
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT_REF.supabase.co"

# Anonymous key (safe to expose to client)
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Service role key (server-side only, KEEP SECRET)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### API Keys

```bash
# Claude AI API key (server-side only)
ANTHROPIC_API_KEY="sk-ant-api03-..."

# Email service API key (server-side only)
RESEND_API_KEY="re_..."
```

#### Monitoring (Optional but Recommended)

```bash
# Sentry error tracking
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
SENTRY_AUTH_TOKEN="..."
SENTRY_ENVIRONMENT="production"

# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="..."
```

### Environment Variable Security

**CRITICAL SECURITY RULES:**

1. ✅ **DO:**
   - Use Vercel's environment variable encryption
   - Rotate API keys regularly (every 90 days)
   - Use different keys for dev/staging/production
   - Store backups in secure vault (1Password, etc.)

2. ❌ **DON'T:**
   - Commit `.env` files to git (already in `.gitignore`)
   - Share service role keys via Slack/email
   - Use production keys in development
   - Hardcode secrets in code

---

## 🗄️ Database Migration

### Production Database Setup

#### 1. Create Production Database (if not exists)

If using a separate production Supabase project:

```bash
# Create new Supabase project via CLI
npx supabase projects create visaflow-production --region us-east-1

# Or use Supabase Dashboard: https://app.supabase.com
```

#### 2. Apply Migrations to Production

```bash
# Set production database URL
export DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Verify migration status
npx prisma migrate status
```

#### 3. Verify RLS Policies

```bash
# Run RLS verification script
npm run verify:rls

# Expected output:
# ✅ All RLS policies enabled
# ✅ User isolation working correctly
# ✅ Storage policies configured
```

#### 4. Configure Storage Bucket

```bash
# Verify storage bucket exists
npm run verify:storage

# If not exists, create via Supabase Dashboard:
# 1. Go to Storage section
# 2. Create bucket named "uploads"
# 3. Set to Private
# 4. Configure RLS policies (see supabase/storage-policies.sql)
```

---

## 🌐 Domain Configuration

### 1. Custom Domain Setup

#### Option A: Using Vercel Domain

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter: `visaflow.app`
4. Follow DNS configuration instructions

#### Option B: Using External Domain

**DNS Configuration (for domains purchased elsewhere):**

Add these records to your DNS provider:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**Verification:**
```bash
# Check DNS propagation
dig visaflow.app
dig www.visaflow.app

# Expected: Should resolve to Vercel IPs
```

### 2. SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt.

**Verification:**
- Certificate is auto-renewed every 60 days
- HTTPS redirect is automatic
- Check status in Vercel Dashboard → Domains

### 3. Redirect Configuration

**Ensure these redirects:**
- `http://` → `https://` (automatic)
- `www.visaflow.app` → `visaflow.app` (configure in Vercel)

**Configure in vercel.json:**
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.visaflow.app"
        }
      ],
      "destination": "https://visaflow.app/:path*",
      "permanent": true
    }
  ]
}
```

---

## 📊 Monitoring Setup

### 1. Sentry Error Tracking

#### Installation

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### Configuration

**sentry.client.config.ts:**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || 'production',
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**sentry.server.config.ts:**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || 'production',
  tracesSampleRate: 1.0,
});
```

#### Verify Sentry Integration

```bash
# Test error reporting
npm run build
npm start

# Trigger a test error in the app
# Check Sentry dashboard for the error
```

### 2. Vercel Analytics

**Enable in Vercel Dashboard:**
1. Go to Analytics tab
2. Enable "Vercel Analytics"
3. Install package:
```bash
npm install @vercel/analytics
```

**Add to app/layout.tsx:**
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 3. Performance Monitoring

**Vercel Speed Insights:**
```bash
npm install @vercel/speed-insights
```

**Add to app/layout.tsx:**
```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 4. Logging Setup

**Create logging utility (src/lib/logger.ts):**
```typescript
import * as Sentry from '@sentry/nextjs';

export const logger = {
  info: (message: string, data?: Record<string, unknown>) => {
    console.log(`[INFO] ${message}`, data);
  },

  error: (message: string, error?: Error, data?: Record<string, unknown>) => {
    console.error(`[ERROR] ${message}`, error, data);
    Sentry.captureException(error, {
      tags: { context: message },
      extra: data,
    });
  },

  warn: (message: string, data?: Record<string, unknown>) => {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

---

## ✅ Post-Deployment Validation

### 1. Smoke Tests

Run these tests immediately after deployment:

```bash
# 1. Check homepage loads
curl -I https://visaflow.app
# Expected: HTTP 200 OK

# 2. Check API routes
curl https://visaflow.app/api/health
# Expected: {"status":"ok"}

# 3. Check static assets
curl -I https://visaflow.app/_next/static/...
# Expected: HTTP 200 OK
```

### 2. Feature Validation Checklist

Test each feature in production:

- [ ] **Authentication**
  - [ ] Sign up works
  - [ ] Sign in works
  - [ ] Password reset works
  - [ ] Protected routes redirect to login

- [ ] **Dashboard**
  - [ ] Dashboard loads
  - [ ] Stats display correctly
  - [ ] Animations smooth
  - [ ] Keyboard shortcuts work

- [ ] **Processes**
  - [ ] Create new process
  - [ ] View process details
  - [ ] Edit process
  - [ ] Delete process

- [ ] **Tasks**
  - [ ] Create task
  - [ ] Mark task complete
  - [ ] Upload file to task
  - [ ] Download file from task

- [ ] **Criteria**
  - [ ] Create criteria
  - [ ] AI validation triggers
  - [ ] Validation scores display
  - [ ] Edit criteria

- [ ] **File Upload**
  - [ ] Drag-and-drop works
  - [ ] File upload succeeds
  - [ ] File download works
  - [ ] File delete works

### 3. Performance Checks

**Lighthouse Audit:**
```bash
npx lighthouse https://visaflow.app --view
```

**Target Scores:**
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

### 4. Security Audit

```bash
# Check security headers
curl -I https://visaflow.app | grep -E "(X-Frame|X-Content|Content-Security)"

# Expected headers:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
```

**Manual Security Checks:**
- [ ] HTTPS enforced (no HTTP access)
- [ ] API keys not exposed in client code
- [ ] RLS policies working (users can't see others' data)
- [ ] File upload restrictions enforced (file type, size)
- [ ] CORS configured correctly

---

## 🔄 Rollback Procedure

If issues occur after deployment:

### Quick Rollback (Vercel Dashboard)

1. Go to Deployments tab
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Confirm rollback

### CLI Rollback

```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Database Rollback

**CAUTION:** Database rollbacks are complex!

```bash
# Revert last migration (only if safe)
npx prisma migrate resolve --rolled-back [migration-name]

# Restore from backup (if available)
# Contact Supabase support for backup restoration
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails on Vercel

**Symptoms:** Build fails with TypeScript errors

**Solution:**
```bash
# Run locally first
npm run type-check
npm run build

# Fix all errors before deploying
```

#### 2. Environment Variables Not Working

**Symptoms:** 500 errors, missing API responses

**Solution:**
1. Check Vercel Dashboard → Environment Variables
2. Ensure variables are set for "Production"
3. Redeploy after adding variables

```bash
# Verify variables are set
vercel env ls
```

#### 3. Database Connection Fails

**Symptoms:** "Can't reach database server"

**Solution:**
1. Check DATABASE_URL is correct
2. Verify Supabase project is not paused
3. Check IP allowlist in Supabase (should allow all IPs)

```bash
# Test database connection
npx prisma db pull
```

#### 4. File Uploads Fail

**Symptoms:** Upload errors, 403 Forbidden

**Solution:**
1. Verify SUPABASE_SERVICE_ROLE_KEY is set
2. Check storage RLS policies
3. Verify bucket exists and is configured

```bash
npm run verify:storage
```

#### 5. Slow Page Loads

**Symptoms:** Pages take >3s to load

**Solution:**
1. Check Vercel Analytics for bottlenecks
2. Verify database queries are optimized
3. Check Prisma Accelerate is configured
4. Review Server Component data fetching

#### 6. Animations Janky/Slow

**Symptoms:** Animations stutter on production

**Solution:**
1. Check if Framer Motion is tree-shaken
2. Verify GPU acceleration (opacity, transform only)
3. Test on different devices
4. Check bundle size

```bash
# Analyze bundle
npm run build
npx @next/bundle-analyzer
```

### Getting Help

**Support Channels:**
- Vercel Support: https://vercel.com/support
- Supabase Discord: https://discord.supabase.com
- Next.js GitHub: https://github.com/vercel/next.js/discussions

**Monitoring Alerts:**
- Check Sentry for error reports
- Review Vercel deployment logs
- Check Supabase dashboard for issues

---

## 📈 Deployment Success Metrics

After deployment, monitor these KPIs:

**Performance:**
- Page load time: <2s (target)
- API response time: <500ms (target)
- Error rate: <0.1% (target)

**Availability:**
- Uptime: >99.9% (target)
- Zero-downtime deployments

**User Experience:**
- Lighthouse scores >90
- Core Web Vitals all "Good"
- Zero critical errors in Sentry

---

## 🎉 Deployment Complete!

Once all checks pass, your VisaFlow application is live in production!

**Next Steps:**
1. Announce to stakeholders
2. Monitor for first 24 hours
3. Gather user feedback
4. Plan next iteration

**Production URL:** https://visaflow.app

---

**Document Version:** 1.0
**Last Updated:** November 16, 2025
**Maintained By:** VisaFlow Team
