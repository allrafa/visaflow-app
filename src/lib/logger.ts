import * as Sentry from '@sentry/nextjs';

/**
 * Centralized logging utility for VisaFlow
 *
 * Usage:
 * - logger.info() - General information
 * - logger.warn() - Warnings that don't break functionality
 * - logger.error() - Errors that should be tracked in Sentry
 * - logger.debug() - Development debugging (not sent in production)
 */

type LogContext = Record<string, unknown>;

export const logger = {
  /**
   * Log general information
   * @param message - Human-readable message
   * @param context - Additional context data
   */
  info: (message: string, context?: LogContext) => {
    console.log(`[INFO] ${message}`, context || '');
  },

  /**
   * Log warnings (non-breaking issues)
   * @param message - Human-readable message
   * @param context - Additional context data
   */
  warn: (message: string, context?: LogContext) => {
    console.warn(`[WARN] ${message}`, context || '');

    // Send warning to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureMessage(message, {
        level: 'warning',
        extra: context,
      });
    }
  },

  /**
   * Log errors (should be tracked and alerted)
   * @param message - Human-readable message
   * @param error - Error object (if available)
   * @param context - Additional context data
   */
  error: (message: string, error?: Error | unknown, context?: LogContext) => {
    console.error(`[ERROR] ${message}`, error, context || '');

    // Send error to Sentry
    if (error instanceof Error) {
      Sentry.captureException(error, {
        tags: { context: message },
        extra: context,
      });
    } else {
      Sentry.captureMessage(message, {
        level: 'error',
        extra: { ...context, error },
      });
    }
  },

  /**
   * Log debug information (development only)
   * @param message - Human-readable message
   * @param context - Additional context data
   */
  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  },

  /**
   * Log API requests (for monitoring)
   * @param method - HTTP method
   * @param url - Request URL
   * @param statusCode - Response status code
   * @param duration - Request duration in ms
   */
  apiRequest: (
    method: string,
    url: string,
    statusCode: number,
    duration: number
  ) => {
    const level = statusCode >= 400 ? 'warn' : 'info';
    const message = `${method} ${url} - ${statusCode} (${duration}ms)`;

    if (level === 'warn') {
      console.warn(`[API] ${message}`);
    } else {
      console.log(`[API] ${message}`);
    }

    // Track slow API requests
    if (duration > 2000) {
      Sentry.captureMessage(`Slow API request: ${message}`, {
        level: 'warning',
        tags: {
          api_method: method,
          api_url: url,
          api_status: statusCode.toString(),
        },
        extra: {
          duration,
        },
      });
    }
  },
};

/**
 * Wrapper for async functions to catch and log errors
 * @param fn - Async function to wrap
 * @param context - Context for error logging
 * @returns Wrapped function
 */
export function withErrorLogging<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: string
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      logger.error(
        context || 'Async function error',
        error as Error,
        { args }
      );
      throw error;
    }
  }) as T;
}

/**
 * Set user context for error tracking
 * @param userId - User ID
 * @param email - User email (optional)
 */
export function setUserContext(userId: string, email?: string) {
  Sentry.setUser({
    id: userId,
    email,
  });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for tracking user actions
 * @param message - Breadcrumb message
 * @param category - Breadcrumb category
 * @param data - Additional data
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: LogContext
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
  });
}
