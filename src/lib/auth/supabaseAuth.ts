'use client';

import { createSupabaseBrowserClient } from '@/lib/db/supabase';
import type { User } from '@supabase/supabase-js';

// ============================================
// TYPES
// ============================================

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

// ============================================
// AUTH FUNCTIONS
// ============================================

/**
 * Sign in with email and password
 */
export async function signIn(
  credentials: SignInCredentials
): Promise<AuthResponse> {
  try {
    const supabase = createSupabaseBrowserClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return {
        user: null,
        error: {
          message: error.message,
          code: error.status?.toString(),
        },
      };
    }

    return {
      user: data.user,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Sign up with email and password
 */
export async function signUp(
  credentials: SignUpCredentials
): Promise<AuthResponse> {
  try {
    const supabase = createSupabaseBrowserClient();

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name || credentials.email.split('@')[0],
        },
      },
    });

    if (error) {
      return {
        user: null,
        error: {
          message: error.message,
          code: error.status?.toString(),
        },
      };
    }

    return {
      user: data.user,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        error: {
          message: error.message,
          code: error.status?.toString(),
        },
      };
    }

    return { error: null };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Reset password via email
 */
export async function resetPassword(
  email: string
): Promise<{ error: AuthError | null }> {
  try {
    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      return {
        error: {
          message: error.message,
          code: error.status?.toString(),
        },
      };
    }

    return { error: null };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createSupabaseBrowserClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}
