/**
 * Script para verificar se as tabelas existem no banco
 */

import { config } from 'dotenv';
import { prisma } from '../src/lib/db/client';

config();

async function checkTables() {
  try {
    console.log('🔍 Verificando tabelas no banco...\n');

    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename 
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

    console.log('📊 Tabelas encontradas no banco:');
    const foundTables = tables.map((t) => t.tablename);
    
    let allFound = true;
    for (const table of expectedTables) {
      if (foundTables.includes(table)) {
        console.log(`   ✅ ${table}`);
      } else {
        console.log(`   ❌ ${table} - NÃO ENCONTRADA`);
        allFound = false;
      }
    }

    if (!allFound) {
      console.log('\n⚠️  Algumas tabelas estão faltando!');
      console.log('   Execute: npx prisma db push');
      process.exit(1);
    }

    console.log('\n✅ Todas as tabelas existem!');
    console.log('\n💡 Agora você pode aplicar o RLS via Supabase Dashboard:');
    console.log('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new');
    console.log('   2. Cole o conteúdo de: supabase/migrations/001_enable_rls.sql');
    console.log('   3. Execute o SQL\n');

  } catch (error: any) {
    console.error('❌ Erro ao verificar tabelas:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables();



