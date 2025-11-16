import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set environment
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out non-error events
  beforeSend(event, hint) {
    // Don't send events in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    // Sanitize sensitive data
    if (event.request) {
      // Remove sensitive headers
      if (event.request.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
      }

      // Remove sensitive query params
      if (event.request.query_string && typeof event.request.query_string === 'string') {
        event.request.query_string = event.request.query_string.replace(
          /api_key=[^&]*/g,
          'api_key=REDACTED'
        );
      }
    }

    // Filter out certain errors
    if (event.exception) {
      const error = hint.originalException;

      // Ignore database connection timeouts in dev
      if (error instanceof Error && error.message.includes('ETIMEDOUT')) {
        return null;
      }
    }

    return event;
  },
});
