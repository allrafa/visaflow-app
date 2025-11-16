/**
 * Script para verificar se RLS foi aplicado corretamente
 */

import { config } from 'dotenv';
import { prisma } from '../src/lib/db/client';

config();

async function verifyRLSApplied() {
  try {
    console.log('🔍 Verificando RLS aplicado...\n');

    const rlsStatus = await prisma.$queryRaw<Array<{ tablename: string; rowsecurity: boolean }>>`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('users', 'processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `;

    const expectedTables = [
      'users',
      'processes',
      'tasks',
      'uploads',
      'criteria_evidences',
      'recommendation_letters',
      'audit_logs',
    ];

    let allRLSEnabled = true;
    const foundTables = rlsStatus.map((r) => r.tablename);

    console.log('📊 Status RLS:\n');
    for (const table of expectedTables) {
      const status = rlsStatus.find((r) => r.tablename === table);
      if (!status) {
        console.log(`   ❌ ${table}: Tabela não encontrada`);
        allRLSEnabled = false;
      } else if (!status.rowsecurity) {
        console.log(`   ❌ ${table}: RLS desabilitado`);
        allRLSEnabled = false;
      } else {
        console.log(`   ✅ ${table}: RLS habilitado`);
      }
    }

    // Verificar policies
    console.log('\n📋 Verificando policies criadas...\n');
    const policies = await prisma.$queryRaw<Array<{ tablename: string; policyname: string }>>`
      SELECT tablename, policyname
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname;
    `;

    const policiesByTable: Record<string, number> = {};
    for (const policy of policies) {
      policiesByTable[policy.tablename] = (policiesByTable[policy.tablename] || 0) + 1;
    }

    for (const table of expectedTables) {
      const count = policiesByTable[table] || 0;
      if (count > 0) {
        console.log(`   ✅ ${table}: ${count} policies`);
      } else {
        console.log(`   ⚠️  ${table}: Nenhuma policy encontrada`);
      }
    }

    console.log(`\n📊 Total de policies: ${policies.length}`);

    if (allRLSEnabled && policies.length > 0) {
      console.log('\n✅ RLS APLICADO COM SUCESSO!');
      console.log('='.repeat(60));
      process.exit(0);
    } else {
      console.log('\n⚠️  RLS não está completamente configurado');
      console.log('='.repeat(60));
      process.exit(1);
    }

  } catch (error: any) {
    console.error('❌ Erro ao verificar RLS:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyRLSApplied();



