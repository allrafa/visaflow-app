import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function applyMigration() {
  console.log('📦 Applying migration: 008_sync_auth_users.sql');

  // Read migration file
  const migrationPath = path.join(
    __dirname,
    '..',
    'supabase',
    'migrations',
    '008_sync_auth_users.sql'
  );

  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ Migration file not found: ${migrationPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(migrationPath, 'utf8');

  try {
    // Execute migration
    console.log('⚙️  Executing SQL...');
    const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql });

    if (error) {
      // Try direct execution if exec_sql doesn't exist
      console.log('⚙️  Trying direct execution...');
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sql }),
      });

      if (!response.ok) {
        console.error('❌ Migration failed:', await response.text());
        process.exit(1);
      }

      console.log('✅ Migration applied successfully (direct execution)');
    } else {
      console.log('✅ Migration applied successfully');
    }

    // Verify sync - list users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error('⚠️  Could not verify auth users:', authError.message);
    } else {
      console.log(`\n📊 Found ${authUsers.users.length} auth users`);

      // For each auth user, verify they exist in public.users
      for (const authUser of authUsers.users) {
        console.log(`\n👤 User: ${authUser.email} (${authUser.id})`);

        const { data: publicUser, error: publicError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (publicError) {
          console.log(`   ❌ NOT in public.users - ${publicError.message}`);
        } else {
          console.log(`   ✅ Exists in public.users`);
          console.log(`      Email: ${publicUser.email}`);
          console.log(`      Name: ${publicUser.name}`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error applying migration:', error);
    process.exit(1);
  }
}

applyMigration();
