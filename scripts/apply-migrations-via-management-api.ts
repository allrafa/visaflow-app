/**
 * Script para aplicar migrations SQL via Supabase Management API
 * Usa HTTP requests diretos para executar SQL no Supabase
 */

import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ACCESS_TOKEN) {
  console.error('❌ Variáveis de ambiente não configuradas');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✅' : '❌');
  console.error('SUPABASE_ACCESS_TOKEN:', SUPABASE_ACCESS_TOKEN ? '✅' : '❌');
  console.error('\n💡 Obter SUPABASE_ACCESS_TOKEN:');
  console.error('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc');
  console.error('   2. Settings > API > Access Tokens');
  console.error('   3. Criar novo token ou usar existente');
  process.exit(1);
}

const EXPECTED_PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

if (!SUPABASE_URL.includes(EXPECTED_PROJECT_REF)) {
  console.error('❌ SUPABASE_URL não corresponde ao projeto VisaFlow!');
  process.exit(1);
}

/**
 * Executa SQL via Management API do Supabase
 * Usa a API REST para executar queries SQL
 */
async function executeSQLViaManagementAPI(sql: string, migrationName: string): Promise<boolean> {
  console.log(`\n📝 Aplicando: ${migrationName}...`);
  
  try {
    // Tentar via Management API usando Access Token
    // A Management API permite executar SQL via endpoint /rest/v1/rpc/exec_sql
    // Mas primeiro precisamos criar a função RPC ou usar outro método
    
    // Alternativa: Usar Supabase REST API com Service Role Key
    // Podemos usar o endpoint de query direto se disponível
    
    // Por enquanto, vamos tentar criar uma função RPC temporária via SQL
    // ou usar o método de executar SQL diretamente
    
    // Nota: O Supabase não expõe execução SQL direta via REST API por segurança
    // Precisamos usar uma abordagem diferente
    
    console.log('   ⚠️  Management API não suporta execução SQL direta');
    console.log('   💡 Usando abordagem alternativa...');
    
    return false;
  } catch (error: any) {
    console.error(`   ❌ Erro: ${error.message}`);
    return false;
  }
}

/**
 * Cria função RPC temporária para executar SQL
 * Depois usa essa função para executar a migration
 */
async function createExecSQLFunction(): Promise<boolean> {
  console.log('\n🔧 Criando função RPC exec_sql...');
  
  const createFunctionSQL = `
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE query;
END;
$$;
  `;
  
  try {
    // Tentar criar via Supabase REST API usando Service Role Key
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: createFunctionSQL }),
    });
    
    if (!response.ok) {
      // Se não funcionar, tentar outra abordagem
      console.log('   ⚠️  Não foi possível criar função via REST API');
      return false;
    }
    
    console.log('   ✅ Função RPC criada');
    return true;
  } catch (error: any) {
    console.log(`   ⚠️  Erro ao criar função: ${error.message}`);
    return false;
  }
}

/**
 * Aplica migration usando Supabase CLI ou Management API
 * Como fallback, prepara instruções para aplicação manual
 */
async function applyMigrationViaAPI() {
  console.log('🚀 APLICANDO MIGRATION VIA MANAGEMENT API\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${SUPABASE_URL}\n`);

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  if (!fs.existsSync(migrationFile)) {
    console.error(`❌ Arquivo não encontrado: ${migrationFile}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(migrationFile, 'utf-8');
  
  // Tentar criar função RPC primeiro
  const functionCreated = await createExecSQLFunction();
  
  if (!functionCreated) {
    console.log('\n⚠️  Não foi possível criar função RPC automaticamente.');
    console.log('\n💡 SOLUÇÃO DEFINITIVA: Usar Supabase CLI\n');
    console.log('📋 INSTALAÇÃO E USO DO SUPABASE CLI:\n');
    console.log('1. Instalar Supabase CLI:');
    console.log('   brew install supabase/tap/supabase  # macOS');
    console.log('   # ou');
    console.log('   npm install -g supabase\n');
    console.log('2. Fazer login:');
    console.log('   supabase login\n');
    console.log('3. Linkar projeto:');
    console.log('   supabase link --project-ref jsnvrhbeedkifqwmsumc\n');
    console.log('4. Aplicar migration:');
    console.log('   supabase db push\n');
    console.log('   # ou aplicar SQL específico:');
    console.log('   supabase db execute -f supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql\n');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('📄 Arquivo SQL para aplicar manualmente:');
    console.log(`   ${migrationFile}\n`);
    
    process.exit(1);
  }
  
  // Se função foi criada, tentar executar SQL
  const success = await executeSQLViaManagementAPI(sql, '007_APPLY_ALL_RLS_COMPLETE.sql');
  
  if (success) {
    console.log('\n✅ Migration aplicada com sucesso!');
  } else {
    console.log('\n⚠️  Não foi possível aplicar automaticamente.');
    console.log('💡 Use Supabase CLI ou aplique manualmente no Dashboard.');
  }
}

applyMigrationViaAPI().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



