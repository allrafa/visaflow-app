/**
 * Script para aplicar migration 009 - Activities Table
 * Uso: npx tsx scripts/apply-migration-009.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function applyMigration() {
  console.log('🚀 Aplicando Migration 009: Activities Table\n');

  // Read migration file
  const migrationPath = path.join(
    process.cwd(),
    'supabase',
    'migrations',
    '009_create_activities.sql'
  );

  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    process.exit(1);
  }

  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

  console.log('📄 Migration file loaded:', migrationPath);
  console.log('📏 SQL size:', migrationSQL.length, 'characters\n');

  try {
    // Execute migration via Supabase REST API
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: migrationSQL,
    });

    if (error) {
      // Se a função exec_sql não existir, vamos executar via raw query
      console.log('⚠️  exec_sql function not available, trying direct execution...\n');

      // Split SQL into individual statements and execute
      const statements = migrationSQL
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith('--'));

      console.log(`📊 Executing ${statements.length} SQL statements...\n`);

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        if (!statement) continue;

        console.log(`${i + 1}/${statements.length}: Executing...`);

        // Use Supabase's SQL endpoint (via REST API)
        const response = await fetch(
          `${supabaseUrl}/rest/v1/rpc/exec_sql`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: supabaseServiceKey,
              Authorization: `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({ sql_query: statement + ';' }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Error executing statement ${i + 1}:`, errorText);

          // Se exec_sql não existir, vamos criar direto via Database Connection
          console.log('\n⚠️  Tentando método alternativo via Prisma...\n');

          // Import Prisma Client
          const { PrismaClient } = await import('@prisma/client');
          const prisma = new PrismaClient();

          try {
            // Execute raw SQL via Prisma
            await prisma.$executeRawUnsafe(migrationSQL);
            console.log('✅ Migration aplicada com sucesso via Prisma!');
            await prisma.$disconnect();
            return;
          } catch (prismaError: any) {
            console.error('❌ Erro ao aplicar via Prisma:', prismaError.message);
            await prisma.$disconnect();
            throw prismaError;
          }
        }

        console.log(`✅ Statement ${i + 1} executed successfully`);
      }

      console.log('\n✅ Migration 009 aplicada com sucesso!');
    } else {
      console.log('✅ Migration 009 aplicada com sucesso!');
      console.log('📊 Result:', data);
    }

    console.log('\n📋 Verificando tabela activities...');

    // Verify table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('activities')
      .select('count')
      .limit(0);

    if (tableError) {
      console.error('⚠️  Tabela activities não encontrada:', tableError.message);
      console.log('⚠️  Mas a migration pode ter sido aplicada. Verifique manualmente.');
    } else {
      console.log('✅ Tabela activities criada com sucesso!');
    }

    console.log('\n🎉 Migration completa!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Gerar Prisma Client: npx prisma generate');
    console.log('2. Implementar activityService.ts');
    console.log('3. Criar página /dashboard/activity');
  } catch (error: any) {
    console.error('\n❌ Erro ao aplicar migration:', error.message);
    console.error(error);
    process.exit(1);
  }
}

applyMigration();
