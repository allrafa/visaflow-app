import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { UnauthorizedError } from '../errors/AppError';

/**
 * Get authenticated user from request
 * @throws {UnauthorizedError} If no valid session
 */
export async function getAuthUser() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', options);
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new UnauthorizedError('Not authenticated');
  }

  return user;
}

/**
 * Check if user owns a resource
 * @throws {ForbiddenError} If user doesn't own resource
 */
export async function ensureOwnership(
  userId: string,
  resourceOwnerId: string,
  resourceType: string
) {
  if (userId !== resourceOwnerId) {
    const { ForbiddenError } = await import('../errors/AppError');
    throw new ForbiddenError(
      `You don't have permission to access this ${resourceType}`
    );
  }
}



