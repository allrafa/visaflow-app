import { NextResponse, type NextRequest } from 'next/server';
import { AppError } from './AppError';
import { z } from 'zod';

type Handler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

export function withErrorHandling(handler: Handler): Handler {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      // Log error (em produção, usar logger estruturado)
      console.error('API Error', {
        path: request.nextUrl.pathname,
        method: request.method,
        error: error instanceof Error ? error.message : String(error),
      });

      if (error instanceof AppError) {
        return NextResponse.json(
          {
            error: error.message,
            code: error.code,
            details: error.details,
          },
          { status: error.statusCode }
        );
      }

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: error.issues,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error: 'Internal server error',
          code: 'INTERNAL_ERROR',
        },
        { status: 500 }
      );
    }
  };
}

