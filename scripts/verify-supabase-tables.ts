/**
 * Script para verificar tabelas via Supabase Client
 * Isso verifica o mesmo banco que o Supabase Dashboard acessa
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

async function verifySupabaseTables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Variáveis Supabase não encontradas');
  }

  console.log('🔍 Verificando tabelas via Supabase Client...\n');
  console.log(`📍 URL: ${supabaseUrl}\n`);

  // Usar Service Role Key para ter acesso total
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const expectedTables = [
    'users',
    'processes',
    'tasks',
    'uploads',
    'criteria_evidences',
    'recommendation_letters',
    'audit_logs',
  ];

  console.log('📊 Verificando tabelas:\n');

  for (const table of expectedTables) {
    try {
      // Tentar fazer uma query simples para verificar se a tabela existe
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(0);

      if (error) {
        if (error.message.includes('does not exist') || error.code === '42P01') {
          console.log(`   ❌ ${table} - NÃO EXISTE no banco do Supabase`);
        } else {
          console.log(`   ⚠️  ${table} - Erro: ${error.message}`);
        }
      } else {
        console.log(`   ✅ ${table} - Existe e está acessível`);
      }
    } catch (error: any) {
      console.log(`   ❌ ${table} - Erro: ${error.message}`);
    }
  }

  // Verificar via query SQL direta
  console.log('\n📋 Verificando via SQL direto...\n');
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      query: `
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN ('users', 'processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
        ORDER BY tablename;
      `
    });

    if (error) {
      console.log('⚠️  Não foi possível executar SQL direto (normal se RPC não existir)');
      console.log(`   Erro: ${error.message}\n`);
    } else {
      console.log('Tabelas encontradas via SQL:');
      console.log(data);
    }
  } catch (error: any) {
    console.log('⚠️  RPC exec_sql não disponível (normal)\n');
  }

  console.log('\n💡 DIAGNÓSTICO:');
  console.log('   Se todas as tabelas mostraram erro "does not exist":');
  console.log('   1. Verifique se está no projeto correto do Supabase');
  console.log('   2. Verifique se as migrations do Prisma foram aplicadas');
  console.log('   3. Execute: npx prisma db push');
  console.log('   4. Verifique a URL do projeto no .env\n');
}

verifySupabaseTables().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



