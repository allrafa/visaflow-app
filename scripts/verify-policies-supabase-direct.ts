/**
 * Script para verificar policies diretamente via conexão PostgreSQL do Supabase
 * Usa DATABASE_URL direto (não Prisma Accelerate) para acessar views do sistema
 */

import { config } from 'dotenv';
import { Client } from 'pg';

config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não configurada');
  process.exit(1);
}

// Extrair connection string direta do Supabase (não Prisma Accelerate)
// Se DATABASE_URL usar Prisma Accelerate, precisamos da connection string direta
let directConnectionString = DATABASE_URL;

// Se usar Prisma Accelerate, precisamos da connection string direta do Supabase
if (DATABASE_URL.includes('accelerate.prisma-data.net')) {
  console.log('⚠️  DATABASE_URL usa Prisma Accelerate');
  console.log('💡 Para verificação completa, precisamos da connection string direta do Supabase\n');
  console.log('📝 Como obter:');
  console.log('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/settings/database');
  console.log('   2. Copie a "Connection string" (URI)');
  console.log('   3. Adicione ao .env como: DIRECT_DATABASE_URL=postgresql://...\n');
  
  // Tentar usar variável alternativa se existir
  directConnectionString = process.env.DIRECT_DATABASE_URL || DATABASE_URL;
  
  if (!process.env.DIRECT_DATABASE_URL) {
    console.log('⚠️  Usando Prisma Accelerate (pode não ter acesso a views do sistema)');
    console.log('💡 Adicione DIRECT_DATABASE_URL ao .env para verificação completa\n');
  }
}

interface PolicyInfo {
  tablename: string;
  policyname: string;
  cmd: string;
}

interface RLSStatus {
  tablename: string;
  rowsecurity: boolean;
}

async function verifyPoliciesDirect() {
  console.log('🔍 VERIFICAÇÃO DIRETA DE POLICIES VIA POSTGRESQL\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');

  const client = new Client({
    connectionString: directConnectionString,
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco PostgreSQL\n');

    // 1. Verificar RLS Status
    console.log('1️⃣ VERIFICANDO RLS STATUS...\n');
    const rlsResult = await client.query<RLSStatus>(`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `);

    console.log('📊 Status RLS por tabela:\n');
    const rlsMap: Record<string, boolean> = {};
    for (const row of rlsResult.rows) {
      rlsMap[row.tablename] = row.rowsecurity;
      const status = row.rowsecurity ? '✅ HABILITADO' : '❌ DESABILITADO';
      console.log(`   ${row.tablename}: ${status}`);
    }

    // 2. Verificar todas as policies RLS
    console.log('\n2️⃣ VERIFICANDO POLICIES RLS...\n');
    const policiesResult = await client.query<PolicyInfo>(`
      SELECT tablename, policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename, cmd, policyname;
    `);

    console.log(`📋 Total de policies encontradas: ${policiesResult.rows.length}\n`);

    const policiesByTable: Record<string, PolicyInfo[]> = {};
    for (const policy of policiesResult.rows) {
      if (!policiesByTable[policy.tablename]) {
        policiesByTable[policy.tablename] = [];
      }
      policiesByTable[policy.tablename].push(policy);
    }

    const expectedPolicies: Record<string, { count: number; names: string[] }> = {
      processes: {
        count: 4,
        names: ['users_select_own_processes', 'users_insert_own_processes', 'users_update_own_processes', 'users_delete_own_processes'],
      },
      tasks: {
        count: 4,
        names: ['users_select_own_tasks', 'users_insert_own_tasks', 'users_update_own_tasks', 'users_delete_own_tasks'],
      },
      uploads: {
        count: 4,
        names: ['users_select_own_uploads', 'users_insert_own_uploads', 'users_update_own_uploads', 'users_delete_own_uploads'],
      },
      criteria_evidences: {
        count: 3,
        names: ['users_select_own_criteria', 'users_insert_own_criteria', 'users_update_own_criteria'],
      },
      recommendation_letters: {
        count: 3,
        names: ['users_select_own_letters', 'users_insert_own_letters', 'users_update_own_letters'],
      },
    };

    console.log('📊 Policies por tabela:\n');
    let allPoliciesOk = true;
    for (const [table, expected] of Object.entries(expectedPolicies)) {
      const found = policiesByTable[table] || [];
      const foundNames = found.map(p => p.policyname);
      const missing = expected.names.filter(name => !foundNames.includes(name));
      const extra = foundNames.filter(name => !expected.names.includes(name));

      console.log(`   ${table}:`);
      console.log(`      Esperadas: ${expected.count} | Encontradas: ${found.length}`);

      if (found.length > 0) {
        found.forEach(p => {
          const isExpected = expected.names.includes(p.policyname);
          console.log(`      ${isExpected ? '✅' : '⚠️ '} ${p.policyname} (${p.cmd})`);
        });
      }

      if (missing.length > 0) {
        console.log(`      ❌ Faltando:`);
        missing.forEach(name => console.log(`         - ${name}`));
        allPoliciesOk = false;
      }

      if (extra.length > 0) {
        console.log(`      ⚠️  Policies extras encontradas:`);
        extra.forEach(name => console.log(`         - ${name}`));
      }

      console.log('');
    }

    // 3. Verificar Storage Policies
    console.log('3️⃣ VERIFICANDO STORAGE POLICIES...\n');
    const storageResult = await client.query<PolicyInfo>(`
      SELECT policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND (policyname LIKE '%uploads%' OR policyname LIKE '%storage%')
      ORDER BY cmd, policyname;
    `);

    const expectedStoragePolicies = [
      'users_select_own_uploads_storage',
      'users_insert_own_uploads_storage',
      'users_update_own_uploads_storage',
      'users_delete_own_uploads_storage',
    ];

    console.log(`📋 Total de storage policies encontradas: ${storageResult.rows.length}\n`);

    if (storageResult.rows.length > 0) {
      console.log('   Policies encontradas:\n');
      storageResult.rows.forEach(p => {
        const isExpected = expectedStoragePolicies.includes(p.policyname);
        console.log(`      ${isExpected ? '✅' : '⚠️ '} ${p.policyname} (${p.cmd})`);
      });
    }

    const foundStorageNames = storageResult.rows.map(p => p.policyname);
    const missingStorage = expectedStoragePolicies.filter(name => !foundStorageNames.includes(name));

    if (missingStorage.length > 0) {
      console.log(`\n   ❌ Faltando:`);
      missingStorage.forEach(name => console.log(`      - ${name}`));
      allPoliciesOk = false;
    }

    // 4. Resumo Final
    console.log('\n════════════════════════════════════════════════════════════════════════════════');
    console.log('\n📊 RESUMO FINAL:\n');

    const totalRLSEnabled = Object.values(rlsMap).filter(v => v).length;
    const totalPoliciesExpected = Object.values(expectedPolicies).reduce((sum, e) => sum + e.count, 0);
    const totalPoliciesFound = policiesResult.rows.length;
    const totalStoragePoliciesFound = storageResult.rows.length;

    console.log(`   RLS Habilitado: ${totalRLSEnabled}/6 tabelas ${totalRLSEnabled === 6 ? '✅' : '❌'}`);
    console.log(`   Policies RLS: ${totalPoliciesFound}/${totalPoliciesExpected} esperadas ${totalPoliciesFound === totalPoliciesExpected ? '✅' : '❌'}`);
    console.log(`   Storage Policies: ${totalStoragePoliciesFound}/4 esperadas ${totalStoragePoliciesFound === 4 ? '✅' : '❌'}`);

    if (totalRLSEnabled === 6 && totalPoliciesFound === totalPoliciesExpected && totalStoragePoliciesFound === 4) {
      console.log('\n✅ TUDO CONFIGURADO CORRETAMENTE!\n');
      console.log('🎉 Todas as migrations foram aplicadas com sucesso!\n');
    } else {
      console.log('\n⚠️  ALGUMAS CONFIGURAÇÕES ESTÃO FALTANDO\n');
      
      if (totalRLSEnabled < 6) {
        console.log('💡 RLS não está habilitado em todas as tabelas');
        console.log('   Execute: ALTER TABLE [tabela] ENABLE ROW LEVEL SECURITY;\n');
      }
      
      if (totalPoliciesFound < totalPoliciesExpected) {
        console.log('💡 Policies RLS faltando');
        console.log('   Execute: supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql\n');
      }
      
      if (totalStoragePoliciesFound < 4) {
        console.log('💡 Storage policies faltando');
        console.log('   Execute: supabase/migrations/006_setup_storage_bucket.sql\n');
      }
    }

  } catch (error: any) {
    console.error('❌ Erro ao verificar policies:', error.message);
    
    if (error.message.includes('accelerate')) {
      console.error('\n💡 PROBLEMA IDENTIFICADO:');
      console.error('   DATABASE_URL está usando Prisma Accelerate');
      console.error('   Prisma Accelerate não tem acesso a views do sistema (pg_policies, pg_tables)');
      console.error('\n📝 SOLUÇÃO:');
      console.error('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/settings/database');
      console.error('   2. Copie a "Connection string" (URI) - formato: postgresql://...');
      console.error('   3. Adicione ao .env como: DIRECT_DATABASE_URL=postgresql://...');
      console.error('   4. Execute novamente este script\n');
    } else {
      console.error('\nStack trace:', error.stack);
    }
  } finally {
    await client.end();
  }
}

verifyPoliciesDirect().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});




