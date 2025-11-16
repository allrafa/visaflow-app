import { prisma } from '@/lib/db/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

/**
 * Ensures a user exists in the public.users table
 * Creates the user if they don't exist
 */
export async function ensureUserExists(supabaseUser: SupabaseUser): Promise<void> {
  try {
    const existing = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name || supabaseUser.email!.split('@')[0],
          role: 'user',
        },
      });
      console.log(`✅ Created user in public.users: ${supabaseUser.email}`);
    }
  } catch (error) {
    console.error('❌ Error ensuring user exists:', error);
    // Don't throw - allow the request to continue
  }
}
