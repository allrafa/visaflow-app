# 📊 VisaFlow Monitoring Setup Guide

**Complete guide for setting up production monitoring and observability**

---

## 🎯 Monitoring Stack Overview

VisaFlow uses a comprehensive monitoring stack:

1. **Sentry** - Error tracking and performance monitoring
2. **Vercel Analytics** - User analytics and traffic insights
3. **Vercel Speed Insights** - Core Web Vitals and performance metrics
4. **Custom Logging** - Application-level logging with context

---

## 🚨 Sentry Error Tracking

### 1. Setup Sentry Account

1. Go to [sentry.io](https://sentry.io/)
2. Sign up / Sign in
3. Create a new project:
   - Platform: Next.js
   - Project name: `visaflow-app`
   - Team: Your team name

### 2. Get Sentry Credentials

After project creation, you'll receive:

```bash
NEXT_PUBLIC_SENTRY_DSN="https://YOUR_KEY@oYOUR_ORG_ID.ingest.sentry.io/YOUR_PROJECT_ID"
SENTRY_AUTH_TOKEN="YOUR_AUTH_TOKEN"
SENTRY_ORG="your-org-slug"
SENTRY_PROJECT="visaflow-app"
```

### 3. Configure Environment Variables

**In Vercel Dashboard:**

Add these variables for Production, Preview, and Development:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=YOUR_AUTH_TOKEN
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=visaflow-app
SENTRY_ENVIRONMENT=production
```

**In Local `.env`:**

```bash
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_ENVIRONMENT=development
```

### 4. Verify Sentry Integration

**Test Error Capture:**

Create a test page: `src/app/sentry-test/page.tsx`

```typescript
'use client';

export default function SentryTestPage() {
  return (
    <button
      onClick={() => {
        throw new Error('Test Sentry Error!');
      }}
    >
      Throw Test Error
    </button>
  );
}
```

**Steps:**
1. Deploy to production or preview
2. Visit `/sentry-test`
3. Click button
4. Check Sentry dashboard for the error
5. Delete test page after verification

### 5. Configure Sentry Alerts

**In Sentry Dashboard:**

1. Go to Alerts → Create Alert
2. **Critical Errors Alert:**
   - When: `event.level equals error`
   - Then: Send notification to Slack/Email
   - Frequency: Immediately

3. **Performance Degradation Alert:**
   - When: `p95(transaction.duration) > 2000ms`
   - Then: Send notification
   - Frequency: Every 30 minutes

4. **Error Rate Alert:**
   - When: `error rate > 5%`
   - Then: Send notification
   - Frequency: Every 15 minutes

### 6. Sentry Features Enabled

✅ **Error Tracking**
- Client-side errors
- Server-side errors
- API errors
- Edge function errors

✅ **Performance Monitoring**
- Transaction traces
- API response times
- Page load times
- Database query performance

✅ **Session Replay**
- 10% of sessions recorded
- 100% of error sessions recorded
- Sensitive data masked (PII protection)

✅ **Breadcrumbs**
- User actions tracked
- Navigation events
- API calls logged
- State changes recorded

---

## 📈 Vercel Analytics

### 1. Enable Vercel Analytics

**In Vercel Dashboard:**

1. Go to your project → Analytics tab
2. Click "Enable Analytics"
3. Analytics will start tracking immediately

**No code changes needed!** Analytics component already added to `app/layout.tsx`.

### 2. Analytics Features

✅ **Page Views**
- Real-time page view tracking
- Top pages report
- User sessions

✅ **Traffic Sources**
- Referrers
- UTM parameters
- Geographical distribution

✅ **Audience Insights**
- Device types (desktop, mobile, tablet)
- Browsers
- Operating systems
- Countries/cities

✅ **Custom Events (Optional)**

Add custom event tracking:

```typescript
import { track } from '@vercel/analytics';

// Track custom events
track('process_created', {
  processType: 'eb1a',
  criteriaCount: 5,
});

track('file_uploaded', {
  fileType: 'pdf',
  fileSize: 1024000,
});
```

### 3. Analytics Dashboard

Access at: `https://vercel.com/[your-team]/visaflow-app/analytics`

**Key Metrics:**
- Page views
- Unique visitors
- Top pages
- Top referrers
- User retention

---

## ⚡ Vercel Speed Insights

### 1. Enable Speed Insights

**In Vercel Dashboard:**

1. Go to your project → Speed Insights tab
2. Click "Enable Speed Insights"
3. Metrics will start collecting on next deployment

**Already configured!** SpeedInsights component in `app/layout.tsx`.

### 2. Core Web Vitals Monitored

✅ **LCP (Largest Contentful Paint)**
- Target: <2.5s
- Measures: Main content load time

✅ **FID (First Input Delay)**
- Target: <100ms
- Measures: Interactivity responsiveness

✅ **CLS (Cumulative Layout Shift)**
- Target: <0.1
- Measures: Visual stability

✅ **TTFB (Time to First Byte)**
- Target: <800ms
- Measures: Server response time

✅ **INP (Interaction to Next Paint)**
- Target: <200ms
- Measures: Overall responsiveness

### 3. Performance Budget (Optional)

Create `speed-insights.json`:

```json
{
  "budgets": [
    {
      "path": "/*",
      "lcp": 2500,
      "fid": 100,
      "cls": 0.1,
      "ttfb": 800
    },
    {
      "path": "/dashboard",
      "lcp": 2000,
      "fid": 50,
      "cls": 0.05
    }
  ]
}
```

---

## 📝 Custom Application Logging

### 1. Using the Logger Utility

**Import the logger:**

```typescript
import { logger } from '@/lib/logger';
```

**Log levels:**

```typescript
// Info - General information
logger.info('User logged in', { userId: user.id });

// Warning - Non-breaking issues
logger.warn('API rate limit approaching', {
  current: 95,
  limit: 100
});

// Error - Critical issues (sent to Sentry)
logger.error('Database connection failed', error, {
  connectionString: 'redacted',
  retryCount: 3,
});

// Debug - Development only
logger.debug('Request payload', { data });

// API requests
logger.apiRequest('POST', '/api/processes', 200, 150);
```

### 2. User Context Tracking

**Set user context after login:**

```typescript
import { setUserContext } from '@/lib/logger';

// After successful authentication
setUserContext(user.id, user.email);
```

**Clear on logout:**

```typescript
import { clearUserContext } from '@/lib/logger';

// On logout
clearUserContext();
```

### 3. Breadcrumbs for User Actions

```typescript
import { addBreadcrumb } from '@/lib/logger';

// Track important actions
addBreadcrumb('Process created', 'user_action', {
  processId: process.id,
  processType: 'eb1a',
});

addBreadcrumb('File uploaded', 'user_action', {
  fileType: 'pdf',
  taskId: task.id,
});
```

---

## 🔍 Monitoring Dashboard Overview

### Recommended Dashboard Layout

**1. Error Monitoring (Sentry)**
- Real-time error stream
- Error rate graph (last 24h)
- Top errors by frequency
- Performance issues

**2. User Analytics (Vercel Analytics)**
- Real-time visitors
- Page views (last 7 days)
- Top pages
- Traffic sources

**3. Performance (Speed Insights)**
- Core Web Vitals scores
- Performance trends
- Slow pages report
- Device performance breakdown

**4. Infrastructure (Vercel Dashboard)**
- Deployment status
- Function invocations
- Edge network usage
- Bandwidth usage

---

## 🚀 Production Monitoring Checklist

### Daily Monitoring
- [ ] Check Sentry for new critical errors
- [ ] Review error rate trends
- [ ] Check performance alerts
- [ ] Monitor deployment status

### Weekly Monitoring
- [ ] Review Vercel Analytics reports
- [ ] Analyze Core Web Vitals trends
- [ ] Check slow API endpoints
- [ ] Review user feedback

### Monthly Monitoring
- [ ] Full performance audit
- [ ] Cost analysis (Vercel usage)
- [ ] Security audit
- [ ] Capacity planning

---

## 📊 Key Performance Indicators (KPIs)

### Error Rate
- **Target:** <0.1% of requests
- **Alert:** >0.5% error rate
- **Critical:** >1% error rate

### Performance
- **Target:** All Core Web Vitals "Good"
- **Alert:** Any metric in "Needs Improvement"
- **Critical:** Any metric "Poor"

### Availability
- **Target:** >99.9% uptime
- **Alert:** <99.5% uptime in 24h
- **Critical:** <99% uptime in 24h

### Response Time
- **Target:** API <500ms p95
- **Alert:** API >1000ms p95
- **Critical:** API >2000ms p95

---

## 🔔 Alert Channels

### Sentry Alerts

**Email Notifications:**
- Critical errors (immediate)
- Performance degradation (30min delay)
- Error spike detection (15min delay)

**Slack Integration (Recommended):**

1. In Sentry: Settings → Integrations → Slack
2. Connect workspace
3. Configure alert routing:
   - `#alerts-critical` - Critical errors
   - `#alerts-performance` - Performance issues
   - `#alerts-general` - All other alerts

### Vercel Notifications

**Deploy Alerts:**
- Deployment failed
- Deployment succeeded
- Build warnings

**Usage Alerts:**
- Approaching bandwidth limit
- Function execution limit
- Database connection limit

---

## 🐛 Debugging Production Issues

### 1. Error Investigation

**Steps:**
1. Check Sentry for error details
2. Review stack trace
3. Check breadcrumbs for user actions
4. Review session replay (if available)
5. Check related errors
6. Reproduce in staging/local

### 2. Performance Investigation

**Steps:**
1. Check Speed Insights for affected pages
2. Review transaction traces in Sentry
3. Analyze database queries
4. Check network waterfall
5. Profile slow components
6. Test on target device/network

### 3. User Issue Investigation

**Steps:**
1. Check Vercel Analytics for user path
2. Review Sentry session replay
3. Check user context in errors
4. Review API logs
5. Test user's specific scenario

---

## 📈 Monitoring Costs

### Sentry (Free Tier)
- **Errors:** 5,000 events/month
- **Performance:** 10,000 transactions/month
- **Session Replay:** 500 sessions/month
- **Upgrade:** ~$26/month for more volume

### Vercel Analytics (Free on Pro)
- Included with Vercel Pro plan
- No additional cost
- Unlimited page views

### Vercel Speed Insights (Free on Pro)
- Included with Vercel Pro plan
- No additional cost
- Unlimited metrics

**Total Estimated Cost:** $20-26/month (Vercel Pro + Sentry)

---

## ✅ Monitoring Setup Verification

### Checklist

- [ ] Sentry project created
- [ ] Sentry environment variables set
- [ ] Test error captured in Sentry
- [ ] Sentry alerts configured
- [ ] Vercel Analytics enabled
- [ ] Speed Insights enabled
- [ ] Custom logger working
- [ ] User context tracking works
- [ ] Alert channels configured
- [ ] Team has access to dashboards

---

## 🎯 Next Steps

After monitoring is set up:

1. **Baseline Metrics:** Collect 1 week of data
2. **Set Thresholds:** Adjust alerts based on baselines
3. **Incident Response:** Define SLA and escalation
4. **Regular Reviews:** Weekly/monthly performance reviews
5. **Continuous Improvement:** Iterate based on insights

---

**Document Version:** 1.0
**Last Updated:** November 16, 2025
**Maintained By:** VisaFlow Team
