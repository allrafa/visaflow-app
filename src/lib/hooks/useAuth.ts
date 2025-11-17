/**
 * Custom hook for Authentication
 * Provides auth state and user information
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/db/supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Get current authenticated user
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      setState({
        user,
        loading: false,
        error: error || null,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        loading: false,
        error: null,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return state;
}

/**
 * Sign out hook
 */
export function useSignOut() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading };
}




