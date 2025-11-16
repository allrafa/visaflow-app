# 📋 VisaFlow Production Deployment Checklist

**Use this checklist to ensure a smooth production deployment**

---

## Phase 1: Pre-Deployment Preparation

### Code Quality & Testing
- [ ] All unit tests passing (`npm run test:unit`)
- [ ] All integration tests passing (`npm run test:integration`)
- [ ] All E2E tests passing (`npm run test:e2e`)
- [ ] Type checking passes with zero errors (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Production build succeeds locally (`npm run build`)
- [ ] No console errors in build output
- [ ] No `any` types in TypeScript code
- [ ] All TODOs resolved or documented

### Database
- [ ] All migrations created and tested locally
- [ ] Migration scripts run successfully
- [ ] RLS policies verified (`npm run verify:rls`)
- [ ] Storage bucket configured (`npm run verify:storage`)
- [ ] Backup strategy documented
- [ ] Rollback procedure tested
- [ ] Production database created (if using separate instance)
- [ ] Database connection tested with production credentials

### Environment Variables
- [ ] All required environment variables documented in `.env.example`
- [ ] Production environment variables prepared (DO NOT commit to git)
- [ ] API keys secured in password manager
- [ ] Separate keys for production vs. development
- [ ] Environment variables validated (no missing keys)
- [ ] Service role keys kept secret (never exposed to client)

### Security
- [ ] Security headers configured in `vercel.json`
- [ ] CORS settings reviewed
- [ ] API rate limiting implemented (if needed)
- [ ] File upload restrictions tested (type, size)
- [ ] RLS policies prevent unauthorized access
- [ ] No hardcoded secrets in code
- [ ] `.env` in `.gitignore`
- [ ] Sensitive routes protected with auth checks

### Documentation
- [ ] README.md up to date
- [ ] API documentation complete (if applicable)
- [ ] Deployment guide reviewed
- [ ] Environment setup documented
- [ ] Troubleshooting guide created
- [ ] Rollback procedure documented

---

## Phase 2: Vercel Configuration

### Project Setup
- [ ] Vercel account created/verified
- [ ] New project created in Vercel
- [ ] Git repository connected
- [ ] Framework preset: Next.js selected
- [ ] Node.js version: 20.x configured
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Install command: `npm install`

### Environment Variables in Vercel
- [ ] `DATABASE_URL` added (Production)
- [ ] `DIRECT_DATABASE_URL` added (Production)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added (Production)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added (Production)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added (Production)
- [ ] `ANTHROPIC_API_KEY` added (Production)
- [ ] `RESEND_API_KEY` added (Production)
- [ ] `NEXT_PUBLIC_SENTRY_DSN` added (optional, Production)
- [ ] `SENTRY_AUTH_TOKEN` added (optional, Production)
- [ ] All variables tested in Preview deployment first

### Build Configuration
- [ ] Build command verified: `npm run build`
- [ ] Development command verified: `npm run dev`
- [ ] Root directory: `./`
- [ ] Output directory: `.next`
- [ ] Functions region: `iad1` (or preferred)
- [ ] Automatic deployments enabled for `main` branch
- [ ] Preview deployments enabled for pull requests

### Domain Configuration (Optional)
- [ ] Custom domain purchased (e.g., `visaflow.app`)
- [ ] Domain added to Vercel project
- [ ] DNS records configured (A, CNAME)
- [ ] SSL certificate provisioned (automatic)
- [ ] HTTPS redirect enabled
- [ ] www redirect configured (if applicable)
- [ ] Domain verified and active

---

## Phase 3: Database Migration to Production

### Backup Current State
- [ ] Local database backed up (if needed)
- [ ] Migration scripts reviewed
- [ ] Rollback plan documented

### Apply Migrations
- [ ] Production `DATABASE_URL` set in environment
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Migrations applied (`npx prisma migrate deploy`)
- [ ] Migration status verified (`npx prisma migrate status`)
- [ ] Database seeded (if applicable)

### Verify Database
- [ ] Tables created successfully
- [ ] Indexes created
- [ ] RLS policies active
- [ ] Sample data inserted (if applicable)
- [ ] Query performance acceptable
- [ ] Connection pooling working (Prisma Accelerate)

### Storage Configuration
- [ ] Supabase Storage bucket "uploads" created
- [ ] Bucket privacy set to "Private"
- [ ] RLS policies applied to storage
- [ ] File upload tested
- [ ] File download tested
- [ ] File deletion tested

---

## Phase 4: First Deployment

### Initial Deploy
- [ ] Code pushed to `main` branch
- [ ] Vercel deployment triggered automatically
- [ ] Build logs reviewed (no errors)
- [ ] Deployment completed successfully
- [ ] Deployment URL received
- [ ] Preview deployment tested first (if using branches)

### Smoke Tests
- [ ] Homepage loads (`https://[deployment-url]`)
- [ ] Login page accessible
- [ ] Sign up flow works
- [ ] Dashboard loads after login
- [ ] API routes responding (`/api/health`)
- [ ] Static assets loading correctly
- [ ] Images rendering properly
- [ ] Fonts loading correctly

### Feature Validation
- [ ] **Authentication**
  - [ ] Sign up creates new user
  - [ ] Sign in works with credentials
  - [ ] Password reset email received
  - [ ] Protected routes redirect to login
  - [ ] Logout works correctly

- [ ] **Dashboard**
  - [ ] Dashboard stats display
  - [ ] Process cards render
  - [ ] Animations smooth
  - [ ] Keyboard shortcuts work (`⌘+K`, `⌘+N`, etc.)
  - [ ] Responsive on mobile

- [ ] **Process Management**
  - [ ] Create new process
  - [ ] View process details
  - [ ] Edit process information
  - [ ] Delete process
  - [ ] Progress tracking works

- [ ] **Tasks**
  - [ ] Create task
  - [ ] Mark task complete
  - [ ] Edit task
  - [ ] Delete task
  - [ ] Task list updates

- [ ] **File Upload**
  - [ ] Drag-and-drop works
  - [ ] File upload succeeds
  - [ ] File download works
  - [ ] File preview works (images, PDFs)
  - [ ] File delete works
  - [ ] File size limit enforced
  - [ ] File type validation works

- [ ] **Criteria & AI Validation**
  - [ ] Create criteria
  - [ ] AI validation triggers
  - [ ] Validation scores display
  - [ ] Suspicious practices detected
  - [ ] Edit criteria
  - [ ] Delete criteria

---

## Phase 5: Monitoring Setup

### Sentry (Error Tracking)
- [ ] Sentry account created
- [ ] Sentry project created
- [ ] `@sentry/nextjs` installed
- [ ] Sentry wizard run (`npx @sentry/wizard@latest -i nextjs`)
- [ ] `sentry.client.config.ts` configured
- [ ] `sentry.server.config.ts` configured
- [ ] `NEXT_PUBLIC_SENTRY_DSN` environment variable set
- [ ] Test error triggered and captured in Sentry
- [ ] Source maps uploaded (automatic with Sentry Vercel integration)
- [ ] Error alerts configured (email, Slack)

### Vercel Analytics
- [ ] Vercel Analytics enabled in dashboard
- [ ] `@vercel/analytics` package installed
- [ ] Analytics component added to `app/layout.tsx`
- [ ] Page views tracking
- [ ] User interactions tracking

### Performance Monitoring
- [ ] Vercel Speed Insights enabled
- [ ] `@vercel/speed-insights` installed
- [ ] Speed Insights component added to `app/layout.tsx`
- [ ] Core Web Vitals tracking
- [ ] Performance budget set (if applicable)

### Logging
- [ ] Logging utility created (`src/lib/logger.ts`)
- [ ] Critical errors logged to Sentry
- [ ] Info/warn logs to console (visible in Vercel logs)
- [ ] Sensitive data excluded from logs (passwords, tokens)

---

## Phase 6: Performance Validation

### Lighthouse Audit
- [ ] Lighthouse audit run on production URL
- [ ] Performance score: >90
- [ ] Accessibility score: >95
- [ ] Best Practices score: >90
- [ ] SEO score: >90
- [ ] No critical issues in report

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] FID (First Input Delay): <100ms
- [ ] CLS (Cumulative Layout Shift): <0.1
- [ ] INP (Interaction to Next Paint): <200ms
- [ ] TTFB (Time to First Byte): <800ms

### Bundle Size
- [ ] Total JS: <300KB (gzipped)
- [ ] First Load JS: <200KB
- [ ] CSS: <50KB
- [ ] No duplicate dependencies
- [ ] Tree-shaking working (Framer Motion, etc.)

### Database Performance
- [ ] Query response time: <500ms
- [ ] Connection pooling working
- [ ] No N+1 queries
- [ ] Indexes used effectively
- [ ] Database not overloaded

---

## Phase 7: Security Audit

### HTTP Headers
- [ ] `X-Frame-Options: DENY`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy` configured
- [ ] HTTPS enforced (HTTP redirects to HTTPS)

### API Security
- [ ] API keys not exposed in client code
- [ ] Service role key only used server-side
- [ ] CORS configured correctly
- [ ] Rate limiting considered (if high traffic expected)
- [ ] Input validation on all API routes

### Database Security
- [ ] RLS policies enabled on all tables
- [ ] Users can only see their own data
- [ ] Service role bypasses RLS (expected)
- [ ] No SQL injection vulnerabilities
- [ ] Prepared statements used (Prisma)

### File Upload Security
- [ ] File type validation (whitelist only)
- [ ] File size limit enforced (10MB max)
- [ ] Virus scanning considered (for production at scale)
- [ ] Files stored in private bucket
- [ ] Signed URLs for downloads (expiring)

---

## Phase 8: Post-Deployment

### User Communication
- [ ] Stakeholders notified of deployment
- [ ] Support team briefed (if applicable)
- [ ] User documentation updated
- [ ] Known issues documented

### Monitoring
- [ ] Monitor Sentry for errors (first 24 hours)
- [ ] Monitor Vercel Analytics for traffic
- [ ] Check performance metrics
- [ ] Review server logs for issues
- [ ] Database performance monitored

### Backup Validation
- [ ] Database backup created
- [ ] Backup restoration tested (on dev environment)
- [ ] Backup schedule configured (Supabase automatic)
- [ ] Backup retention policy understood (7 days point-in-time)

### Documentation
- [ ] Deployment date recorded
- [ ] Production URL documented
- [ ] Environment variables backed up (in password manager)
- [ ] Rollback procedure tested
- [ ] On-call rotation defined (if applicable)

---

## Phase 9: Load Testing (Optional but Recommended)

### Load Test Preparation
- [ ] Load testing tool chosen (Artillery, k6, etc.)
- [ ] Test scenarios defined
- [ ] Baseline metrics recorded
- [ ] Test environment prepared (staging)

### Execute Load Tests
- [ ] Simulate 100 concurrent users
- [ ] Simulate 1000 concurrent users (if expected)
- [ ] API endpoints tested under load
- [ ] Database performance under load
- [ ] File upload under load
- [ ] Results analyzed
- [ ] Bottlenecks identified and addressed

---

## Phase 10: Go-Live Decision

### Final Checks
- [ ] All acceptance criteria met
- [ ] No critical bugs reported
- [ ] Performance within acceptable range
- [ ] Security audit passed
- [ ] Monitoring active
- [ ] Rollback procedure ready
- [ ] Team ready for support

### Go/No-Go Decision
- [ ] **GO:** All critical items checked → Promote to production
- [ ] **NO-GO:** Critical issues found → Fix and retest

### Production Promotion
- [ ] Custom domain pointed to production deployment
- [ ] DNS propagation verified (can take up to 48 hours)
- [ ] SSL certificate active on custom domain
- [ ] Production URL accessible to all users
- [ ] Old deployment deactivated (if applicable)

---

## Post-Launch Monitoring

### First 24 Hours
- [ ] Monitor error rate in Sentry
- [ ] Check Vercel Analytics for traffic patterns
- [ ] Review server logs for anomalies
- [ ] Test critical user flows
- [ ] Respond to user feedback

### First Week
- [ ] Review performance metrics
- [ ] Analyze user behavior (Analytics)
- [ ] Address any reported issues
- [ ] Collect user feedback
- [ ] Plan iteration 2

---

## Rollback Procedure (Emergency)

If critical issues arise:

1. **Immediate Rollback**
   - [ ] Open Vercel Dashboard → Deployments
   - [ ] Find last working deployment
   - [ ] Click "..." → "Promote to Production"
   - [ ] Verify rollback successful

2. **Database Rollback (if needed)**
   - [ ] Contact Supabase support
   - [ ] Restore from point-in-time backup
   - [ ] Test database after restoration

3. **Communication**
   - [ ] Notify stakeholders of rollback
   - [ ] Document issue that caused rollback
   - [ ] Create fix plan
   - [ ] Schedule re-deployment

---

## Success Criteria

**Deployment is successful when:**

✅ All checklist items completed
✅ Zero critical errors in first 24 hours
✅ Performance metrics within targets
✅ User feedback positive
✅ Monitoring active and alerting
✅ Team confident in production stability

---

**Checklist Version:** 1.0
**Last Updated:** November 16, 2025
**Next Review:** Before each major deployment
