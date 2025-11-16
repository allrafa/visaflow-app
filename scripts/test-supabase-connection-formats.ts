/**
 * Script para testar diferentes formatos de connection string do Supabase
 * Identifica o formato correto que funciona
 */

import { Client } from 'pg';
import { config } from 'dotenv';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DATABASE_KEY = process.env.DATABASE_KEY;
const PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

if (!DATABASE_KEY) {
  console.error('❌ DATABASE_KEY não configurada');
  process.exit(1);
}

// Diferentes formatos de connection string para testar
const connectionFormats = [
  {
    name: 'Formato 1: db.[PROJECT_REF].supabase.co:5432',
    url: `postgresql://postgres:${DATABASE_KEY}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
  },
  {
    name: 'Formato 2: [PROJECT_REF].supabase.co:5432 (sem db.)',
    url: `postgresql://postgres:${DATABASE_KEY}@${PROJECT_REF}.supabase.co:5432/postgres`,
  },
  {
    name: 'Formato 3: aws-0-[REGION].pooler.supabase.com:5432',
    url: `postgresql://postgres.${PROJECT_REF}:${DATABASE_KEY}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`,
  },
  {
    name: 'Formato 4: [PROJECT_REF].pooler.supabase.com:5432',
    url: `postgresql://postgres.${PROJECT_REF}:${DATABASE_KEY}@${PROJECT_REF}.pooler.supabase.com:5432/postgres`,
  },
  {
    name: 'Formato 5: Connection Pooler porta 6543',
    url: `postgresql://postgres.${PROJECT_REF}:${DATABASE_KEY}@${PROJECT_REF}.pooler.supabase.com:6543/postgres`,
  },
  {
    name: 'Formato 6: aws-0-us-east-1.pooler (porta 6543)',
    url: `postgresql://postgres.${PROJECT_REF}:${DATABASE_KEY}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
  },
];

async function testConnection(format: { name: string; url: string }): Promise<boolean> {
  console.log(`\n🔍 Testando: ${format.name}`);
  console.log(`   URL: ${format.url.replace(/:[^:@]+@/, ':****@')}`);
  
  const client = new Client({
    connectionString: format.url,
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();
    console.log('   ✅ CONEXÃO BEM-SUCEDIDA!');
    
    // Testar uma query simples
    const result = await client.query('SELECT version()');
    console.log(`   ✅ Query executada: PostgreSQL ${result.rows[0].version.split(' ')[1]}`);
    
    await client.end();
    return true;
  } catch (error: any) {
    console.log(`   ❌ Falhou: ${error.message.substring(0, 100)}`);
    try {
      await client.end();
    } catch {
      // Ignorar erro ao fechar
    }
    return false;
  }
}

async function main() {
  console.log('🔍 TESTANDO FORMATOS DE CONNECTION STRING DO SUPABASE\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${PROJECT_REF}`);
  console.log(`🔑 Database Key: ${DATABASE_KEY ? 'Configurada' : 'Não configurada'}\n`);

  const results: Array<{ name: string; success: boolean; url: string }> = [];

  for (const format of connectionFormats) {
    const success = await testConnection(format);
    results.push({
      name: format.name,
      success,
      url: format.url,
    });
    
    // Se encontrou um que funciona, podemos parar
    if (success) {
      console.log('\n🎉 FORMATO FUNCIONANDO ENCONTRADO!\n');
      console.log('📋 Connection String que funciona:');
      console.log(`   ${format.url}\n`);
      console.log('💡 Adicione ao .env como:');
      console.log(`   DIRECT_DATABASE_URL="${format.url}"\n`);
      break;
    }
    
    // Pequeno delay entre tentativas
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Resumo
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DOS TESTES\n');
  
  const workingFormats = results.filter(r => r.success);
  const failedFormats = results.filter(r => !r.success);

  if (workingFormats.length > 0) {
    console.log('✅ Formatos que funcionam:');
    workingFormats.forEach(r => {
      console.log(`   ✅ ${r.name}`);
    });
  }

  if (failedFormats.length > 0) {
    console.log('\n❌ Formatos que não funcionam:');
    failedFormats.forEach(r => {
      console.log(`   ❌ ${r.name}`);
    });
  }

  if (workingFormats.length === 0) {
    console.log('\n⚠️  NENHUM FORMATO FUNCIONOU');
    console.log('\n💡 Possíveis causas:');
    console.log('   1. Problema de rede/firewall');
    console.log('   2. Credenciais incorretas');
    console.log('   3. Projeto Supabase pausado ou inativo');
    console.log('   4. Formato específico do projeto');
    console.log('\n📝 Próximos passos:');
    console.log('   1. Verificar no Dashboard do Supabase:');
    console.log('      https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/settings/database');
    console.log('   2. Copiar a "Connection string" exata do Dashboard');
    console.log('   3. Verificar se o projeto está ativo');
  }

  console.log('\n' + '='.repeat(60));
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});




