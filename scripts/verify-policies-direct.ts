/**
 * Script para verificar policies diretamente via Prisma/SQL
 * Usa conexão direta ao banco para verificar o que realmente existe
 */

import { config } from 'dotenv';
import { prisma } from '../src/lib/db/client';

config();

interface PolicyInfo {
  tablename: string;
  policyname: string;
  cmd: string;
  qual: string | null;
  with_check: string | null;
}

interface RLSStatus {
  tablename: string;
  rowsecurity: boolean;
}

async function verifyPoliciesDirect() {
  console.log('🔍 VERIFICAÇÃO DIRETA DE POLICIES NO BANCO\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');

  try {
    // 1. Verificar RLS Status
    console.log('1️⃣ VERIFICANDO RLS STATUS...\n');
    const rlsStatus = await prisma.$queryRaw<RLSStatus[]>`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `;

    console.log('📊 Status RLS por tabela:\n');
    for (const row of rlsStatus) {
      const status = row.rowsecurity ? '✅ HABILITADO' : '❌ DESABILITADO';
      console.log(`   ${row.tablename}: ${status}`);
    }

    // 2. Verificar todas as policies RLS
    console.log('\n2️⃣ VERIFICANDO POLICIES RLS...\n');
    const policies = await prisma.$queryRaw<PolicyInfo[]>`
      SELECT tablename, policyname, cmd, qual, with_check
      FROM pg_policies
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename, cmd, policyname;
    `;

    console.log(`📋 Total de policies encontradas: ${policies.length}\n`);

    const policiesByTable: Record<string, PolicyInfo[]> = {};
    for (const policy of policies) {
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
      }

      if (extra.length > 0) {
        console.log(`      ⚠️  Policies extras encontradas:`);
        extra.forEach(name => console.log(`         - ${name}`));
      }

      console.log('');
    }

    // 3. Verificar Storage Policies
    console.log('3️⃣ VERIFICANDO STORAGE POLICIES...\n');
    const storagePolicies = await prisma.$queryRaw<PolicyInfo[]>`
      SELECT policyname, cmd, qual, with_check
      FROM pg_policies
      WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND (policyname LIKE '%uploads%' OR policyname LIKE '%storage%')
      ORDER BY cmd, policyname;
    `;

    const expectedStoragePolicies = [
      'users_select_own_uploads_storage',
      'users_insert_own_uploads_storage',
      'users_update_own_uploads_storage',
      'users_delete_own_uploads_storage',
    ];

    console.log(`📋 Total de storage policies encontradas: ${storagePolicies.length}\n`);

    if (storagePolicies.length > 0) {
      console.log('   Policies encontradas:\n');
      storagePolicies.forEach(p => {
        const isExpected = expectedStoragePolicies.includes(p.policyname);
        console.log(`      ${isExpected ? '✅' : '⚠️ '} ${p.policyname} (${p.cmd})`);
      });
    }

    const foundStorageNames = storagePolicies.map(p => p.policyname);
    const missingStorage = expectedStoragePolicies.filter(name => !foundStorageNames.includes(name));

    if (missingStorage.length > 0) {
      console.log(`\n   ❌ Faltando:`);
      missingStorage.forEach(name => console.log(`      - ${name}`));
    }

    // 4. Resumo Final
    console.log('\n════════════════════════════════════════════════════════════════════════════════');
    console.log('\n📊 RESUMO FINAL:\n');

    const totalRLSEnabled = rlsStatus.filter(r => r.rowsecurity).length;
    const totalPoliciesExpected = Object.values(expectedPolicies).reduce((sum, e) => sum + e.count, 0);
    const totalPoliciesFound = policies.length;
    const totalStoragePoliciesFound = storagePolicies.length;

    console.log(`   RLS Habilitado: ${totalRLSEnabled}/6 tabelas`);
    console.log(`   Policies RLS: ${totalPoliciesFound}/${totalPoliciesExpected} esperadas`);
    console.log(`   Storage Policies: ${totalStoragePoliciesFound}/4 esperadas`);

    if (totalRLSEnabled === 6 && totalPoliciesFound === totalPoliciesExpected && totalStoragePoliciesFound === 4) {
      console.log('\n✅ TUDO CONFIGURADO CORRETAMENTE!\n');
    } else {
      console.log('\n⚠️  ALGUMAS CONFIGURAÇÕES ESTÃO FALTANDO\n');
    }

  } catch (error: any) {
    console.error('❌ Erro ao verificar policies:', error.message);
    console.error('\nStack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

verifyPoliciesDirect().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});




