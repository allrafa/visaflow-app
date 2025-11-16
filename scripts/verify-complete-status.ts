/**
 * Script completo para verificar status do Supabase VisaFlow
 * Verifica tabelas, RLS, policies e storage
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '../src/lib/db/client';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variáveis de ambiente não configuradas');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function verifyCompleteStatus() {
  console.log('🔍 VERIFICAÇÃO COMPLETA DO SUPABASE VISAFLOW\n');
  console.log(`📍 Projeto: ${SUPABASE_URL}\n`);
  console.log('════════════════════════════════════════════════════════════════════════════════\n');

  // 1. Verificar tabelas
  console.log('📊 1. VERIFICANDO TABELAS...\n');
  const expectedTables = [
    'users',
    'processes',
    'tasks',
    'uploads',
    'criteria_evidences',
    'recommendation_letters',
    'audit_logs',
  ];

  const tablesStatus: Record<string, boolean> = {};
  for (const table of expectedTables) {
    try {
      const { error } = await supabase.from(table).select('*').limit(0);
      if (error && (error.message.includes('does not exist') || error.code === '42P01')) {
        tablesStatus[table] = false;
        console.log(`   ❌ ${table} - NÃO EXISTE`);
      } else {
        tablesStatus[table] = true;
        console.log(`   ✅ ${table} - Existe e acessível`);
      }
    } catch (error: any) {
      tablesStatus[table] = false;
      console.log(`   ❌ ${table} - Erro: ${error.message}`);
    }
  }

  // 2. Verificar RLS via Prisma
  console.log('\n🔒 2. VERIFICANDO RLS (Row Level Security)...\n');
  try {
    const rlsStatus = await prisma.$queryRaw<Array<{ tablename: string; rowsecurity: boolean }>>`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `;

    const rlsMap: Record<string, boolean> = {};
    for (const row of rlsStatus) {
      rlsMap[row.tablename] = row.rowsecurity;
      console.log(`   ${row.rowsecurity ? '✅' : '❌'} ${row.tablename} - RLS ${row.rowsecurity ? 'HABILITADO' : 'DESABILITADO'}`);
    }

    // Verificar tabelas que não apareceram
    for (const table of expectedTables) {
      if (table !== 'users' && !rlsMap[table]) {
        console.log(`   ❌ ${table} - Não encontrada na verificação RLS`);
      }
    }
  } catch (error: any) {
    console.log(`   ⚠️  Erro ao verificar RLS: ${error.message}`);
  }

  // 3. Verificar Policies RLS
  console.log('\n🛡️  3. VERIFICANDO POLICIES RLS...\n');
  try {
    const policies = await prisma.$queryRaw<Array<{ tablename: string; policyname: string; cmd: string }>>`
      SELECT tablename, policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
      ORDER BY tablename, cmd;
    `;

    const expectedPolicies: Record<string, string[]> = {
      processes: ['users_select_own_processes', 'users_insert_own_processes', 'users_update_own_processes', 'users_delete_own_processes'],
      tasks: ['users_select_own_tasks', 'users_insert_own_tasks', 'users_update_own_tasks', 'users_delete_own_tasks'],
      uploads: ['users_select_own_uploads', 'users_insert_own_uploads', 'users_update_own_uploads', 'users_delete_own_uploads'],
      criteria_evidences: ['users_select_own_criteria', 'users_insert_own_criteria', 'users_update_own_criteria'],
      recommendation_letters: ['users_select_own_letters', 'users_insert_own_letters', 'users_update_own_letters'],
    };

    const foundPolicies: Record<string, Set<string>> = {};
    for (const policy of policies) {
      if (!foundPolicies[policy.tablename]) {
        foundPolicies[policy.tablename] = new Set();
      }
      foundPolicies[policy.tablename].add(policy.policyname);
    }

    for (const [table, expected] of Object.entries(expectedPolicies)) {
      const found = foundPolicies[table] || new Set();
      const missing = expected.filter(p => !found.has(p));
      
      if (missing.length === 0) {
        console.log(`   ✅ ${table} - Todas as policies criadas (${expected.length})`);
      } else {
        console.log(`   ⚠️  ${table} - Faltando ${missing.length} policies:`);
        missing.forEach(p => console.log(`      - ${p}`));
      }
    }
  } catch (error: any) {
    console.log(`   ⚠️  Erro ao verificar policies: ${error.message}`);
  }

  // 4. Verificar Storage Bucket
  console.log('\n📦 4. VERIFICANDO STORAGE BUCKET...\n');
  try {
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log(`   ⚠️  Erro ao listar buckets: ${bucketsError.message}`);
    } else {
      const uploadsBucket = buckets?.find(b => b.id === 'uploads');
      if (uploadsBucket) {
        console.log(`   ✅ Bucket "uploads" encontrado`);
        console.log(`      - Público: ${uploadsBucket.public ? 'Sim' : 'Não'} ${uploadsBucket.public ? '⚠️' : '✅'}`);
        console.log(`      - Criado em: ${uploadsBucket.created_at}`);
      } else {
        console.log(`   ❌ Bucket "uploads" NÃO encontrado`);
        console.log(`   💡 Criar manualmente no Supabase Dashboard`);
      }
    }
  } catch (error: any) {
    console.log(`   ⚠️  Erro ao verificar storage: ${error.message}`);
  }

  // 5. Verificar Storage Policies
  console.log('\n🔐 5. VERIFICANDO STORAGE POLICIES...\n');
  try {
    const storagePolicies = await prisma.$queryRaw<Array<{ policyname: string; cmd: string }>>`
      SELECT policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname LIKE '%uploads%'
      ORDER BY cmd;
    `;

    const expectedStoragePolicies = [
      'users_select_own_uploads_storage',
      'users_insert_own_uploads_storage',
      'users_update_own_uploads_storage',
      'users_delete_own_uploads_storage',
    ];

    const foundStoragePolicies = storagePolicies.map(p => p.policyname);
    const missing = expectedStoragePolicies.filter(p => !foundStoragePolicies.includes(p));

    if (missing.length === 0) {
      console.log(`   ✅ Todas as storage policies criadas (${expectedStoragePolicies.length})`);
      storagePolicies.forEach(p => {
        console.log(`      ✅ ${p.policyname} (${p.cmd})`);
      });
    } else {
      console.log(`   ⚠️  Faltando ${missing.length} storage policies:`);
      missing.forEach(p => console.log(`      - ${p}`));
    }
  } catch (error: any) {
    console.log(`   ⚠️  Erro ao verificar storage policies: ${error.message}`);
  }

  // 6. Resumo Final
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('\n📋 RESUMO:\n');

  const allTablesExist = Object.values(tablesStatus).every(v => v);
  console.log(`   Tabelas: ${allTablesExist ? '✅ Todas existem' : '❌ Algumas faltando'}`);
  console.log(`   RLS: Verificado acima`);
  console.log(`   Policies: Verificado acima`);
  console.log(`   Storage: Verificado acima`);

  console.log('\n💡 PRÓXIMOS PASSOS:\n');
  console.log('   1. Se faltam policies RLS: Aplicar migration 005');
  console.log('   2. Se faltam storage policies: Aplicar migration 006');
  console.log('   3. Se bucket não existe: Criar manualmente no Dashboard');
  console.log('   4. Após aplicar, executar novamente este script\n');

  await prisma.$disconnect();
}

verifyCompleteStatus().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



