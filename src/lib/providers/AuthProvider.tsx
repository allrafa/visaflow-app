'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/db/supabase';
import type { User } from '@supabase/supabase-js';
import {  signOut as authSignOut } from '@/lib/auth/supabaseAuth';

// ============================================
// TYPES
// ============================================

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ============================================
// CONTEXT
// ============================================

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async (): Promise<void> => {
    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await authSignOut();
      setUser(null);
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    // Get initial session
    const initializeAuth = async (): Promise<void> => {
      try {
        const {
          data: { user: initialUser },
        } = await supabase.auth.getUser();
        setUser(initialUser);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// HOOK
// ============================================

/**
 * Hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
