/**
 * Script para verificar status das migrations críticas
 * Executa: npx tsx scripts/verify-migrations.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface MigrationStatus {
  name: string;
  description: string;
  critical: boolean;
  applied: boolean;
  instructions: string;
}

const MIGRATIONS: MigrationStatus[] = [
  {
    name: '005_add_missing_rls_policies.sql',
    description: 'RLS Policies faltantes (UPDATE para uploads, políticas para tasks)',
    critical: true,
    applied: false,
    instructions: 'Aplicar no SQL Editor: supabase/migrations/005_add_missing_rls_policies.sql',
  },
  {
    name: '006_setup_storage_bucket.sql',
    description: 'Configurar Storage bucket e políticas RLS',
    critical: true,
    applied: false,
    instructions: 'Aplicar no SQL Editor: supabase/migrations/006_setup_storage_bucket.sql (após criar bucket manualmente)',
  },
];

async function verifyMigrations() {
  console.log('🔍 Verificando status das migrations críticas...\n');
  console.log('═'.repeat(80));

  try {
    // Verificar políticas RLS para tasks
    console.log('\n📋 Verificando Migration 005 (RLS Policies)...');
    
    const { data: taskPolicies, error: taskError } = await supabase
      .from('pg_policies')
      .select('policyname')
      .eq('schemaname', 'public')
      .eq('tablename', 'tasks')
      .in('policyname', [
        'users_select_own_tasks',
        'users_insert_own_tasks',
        'users_update_own_tasks',
        'users_delete_own_tasks',
      ]);

    const taskPoliciesFound = taskPolicies?.length || 0;
    const migration005Applied = taskPoliciesFound >= 4;

    if (migration005Applied) {
      console.log('✅ Migration 005 aplicada');
      console.log(`   Políticas encontradas: ${taskPoliciesFound}/4`);
    } else {
      console.log('❌ Migration 005 NÃO aplicada');
      console.log(`   Políticas encontradas: ${taskPoliciesFound}/4`);
      console.log(`\n💡 ${MIGRATIONS[0].instructions}\n`);
    }

    // Verificar Storage policies
    console.log('\n📋 Verificando Migration 006 (Storage Policies)...');
    
    const { data: storagePolicies, error: storageError } = await supabase
      .from('pg_policies')
      .select('policyname')
      .eq('schemaname', 'storage')
      .eq('tablename', 'objects')
      .in('policyname', [
        'users_select_own_uploads_storage',
        'users_insert_own_uploads_storage',
        'users_delete_own_uploads_storage',
        'users_update_own_uploads_storage',
      ]);

    const storagePoliciesFound = storagePolicies?.length || 0;
    const migration006Applied = storagePoliciesFound >= 4;

    // Verificar bucket também
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === 'uploads') || false;

    if (migration006Applied && bucketExists) {
      console.log('✅ Migration 006 aplicada');
      console.log(`   Bucket "uploads": ✅`);
      console.log(`   Políticas encontradas: ${storagePoliciesFound}/4`);
    } else {
      console.log('❌ Migration 006 NÃO aplicada ou bucket não existe');
      console.log(`   Bucket "uploads": ${bucketExists ? '✅' : '❌'}`);
      console.log(`   Políticas encontradas: ${storagePoliciesFound}/4`);
      console.log(`\n💡 ${MIGRATIONS[1].instructions}\n`);
    }

    console.log('\n' + '═'.repeat(80));

    const allApplied = migration005Applied && migration006Applied && bucketExists;

    if (allApplied) {
      console.log('\n✅ TODAS AS MIGRATIONS CRÍTICAS ESTÃO APLICADAS!');
      console.log('\n🎉 Sistema pronto para testes em ambiente real\n');
    } else {
      console.log('\n⚠️ ALGUMAS MIGRATIONS CRÍTICAS ESTÃO PENDENTES');
      console.log('\n📝 Ações necessárias:');
      
      if (!migration005Applied) {
        console.log(`\n1. Aplicar Migration 005:`);
        console.log(`   ${MIGRATIONS[0].instructions}`);
      }
      
      if (!migration006Applied || !bucketExists) {
        console.log(`\n2. Aplicar Migration 006:`);
        console.log(`   ${MIGRATIONS[1].instructions}`);
      }
      
      console.log('\n3. Após aplicar, execute novamente este script para validar\n');
    }

  } catch (error) {
    console.error('❌ Erro ao verificar migrations:', error);
    console.log('\n💡 Verificação manual recomendada via SQL Editor\n');
  }
}

verifyMigrations().catch(console.error);



