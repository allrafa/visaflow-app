/**
 * Script de Teste de Conexão e Validação
 * Testa Prisma, Supabase Auth e operações básicas
 */

import { config } from 'dotenv';
import { prisma } from '../src/lib/db/client';
import { createClient } from '@supabase/supabase-js';

config();

async function testConnection() {
  console.log('🔍 Testando conexões e validações...\n');

  // 1. Testar Prisma Client
  console.log('1️⃣ Testando Prisma Client...');
  try {
    await prisma.$connect();
    console.log('   ✅ Prisma Client conectado');
    
    // Testar query simples
    const userCount = await prisma.user.count();
    console.log(`   ✅ Query executada: ${userCount} usuários no banco`);
    
    await prisma.$disconnect();
  } catch (error: any) {
    console.error('   ❌ Erro no Prisma:', error.message);
    process.exit(1);
  }

  // 2. Testar Supabase Client
  console.log('\n2️⃣ Testando Supabase Client...');
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Variáveis Supabase não encontradas');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Testar conexão básica (sem query em tabela)
    console.log('   ✅ Supabase Client inicializado');
    console.log(`   📍 URL: ${supabaseUrl.substring(0, 40)}...`);
    console.log('   ⚠️  Nota: Queries em tabelas requerem RLS policies aplicadas');
  } catch (error: any) {
    console.error('   ❌ Erro no Supabase:', error.message);
    process.exit(1);
  }

  // 3. Verificar estrutura do banco
  console.log('\n3️⃣ Verificando estrutura do banco...');
  try {
    await prisma.$connect();
    
    const tables = [
      'users',
      'processes',
      'tasks',
      'uploads',
      'criteria_evidences',
      'recommendation_letters',
      'audit_logs',
    ];
    
    console.log('   📊 Tabelas encontradas:');
    for (const table of tables) {
      try {
        const model = (prisma as any)[table];
        if (model) {
          const count = await model.count();
          console.log(`      ✅ ${table}: ${count} registros`);
        }
      } catch (error: any) {
        console.log(`      ❌ ${table}: Erro - ${error.message}`);
      }
    }
    
    await prisma.$disconnect();
  } catch (error: any) {
    console.error('   ❌ Erro ao verificar estrutura:', error.message);
  }

  // 4. Verificar RLS (se possível)
  console.log('\n4️⃣ Verificando RLS...');
  console.log('   ⚠️  RLS deve ser verificado diretamente no Supabase Dashboard');
  console.log('   💡 Execute: SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = \'public\';');

  console.log('\n✅ Testes básicos concluídos!');
  console.log('\n📋 Próximos passos:');
  console.log('   1. Aplicar RLS policies via Supabase Dashboard (ver docs/APLICAR_RLS_POLICIES.md)');
  console.log('   2. Testar autenticação com usuário real');
  console.log('   3. Testar criação de processo via API');
}

testConnection().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});

