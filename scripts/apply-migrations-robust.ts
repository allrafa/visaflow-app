/**
 * Script Robusto para Aplicar Migrations SQL no Supabase
 * Tenta múltiplas abordagens automaticamente
 */

import { execSync } from 'child_process';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

interface MigrationMethod {
  name: string;
  execute: () => Promise<boolean>;
  description: string;
}

/**
 * Método 1: Supabase CLI (Mais Confiável)
 */
async function method1_SupabaseCLI(): Promise<boolean> {
  console.log('\n📋 MÉTODO 1: Supabase CLI\n');
  
  // Verificar se CLI está instalado
  try {
    execSync('supabase --version', { stdio: 'ignore' });
  } catch {
    console.log('   ⚠️  Supabase CLI não está instalado');
    console.log('   💡 Instalar: brew install supabase/tap/supabase');
    return false;
  }

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  try {
    console.log('   📝 Executando migration via CLI...');
    execSync(`supabase db execute -f "${migrationFile}"`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
    });
    console.log('   ✅ Migration aplicada via CLI!');
    return true;
  } catch (error: any) {
    console.log(`   ❌ Erro: ${error.message.substring(0, 100)}`);
    return false;
  }
}

/**
 * Método 2: Management API via HTTP (Criar função RPC primeiro)
 */
async function method2_ManagementAPI(): Promise<boolean> {
  console.log('\n📋 MÉTODO 2: Management API\n');
  
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('   ⚠️  SUPABASE_SERVICE_ROLE_KEY não configurada');
    return false;
  }

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  const sql = fs.readFileSync(migrationFile, 'utf-8');

  try {
    // Tentar executar via REST API usando função RPC se existir
    // Nota: Isso requer que a função exec_sql exista no Supabase
    console.log('   📝 Tentando executar via Management API...');
    
    // Dividir SQL em comandos e executar via RPC (se função existir)
    // Por enquanto, retornar false pois função não existe por padrão
    console.log('   ⚠️  Management API não suporta execução SQL direta');
    return false;
  } catch (error: any) {
    console.log(`   ❌ Erro: ${error.message.substring(0, 100)}`);
    return false;
  }
}

/**
 * Método 3: Connection String Direta (PostgreSQL Client)
 */
async function method3_DirectConnection(): Promise<boolean> {
  console.log('\n📋 MÉTODO 3: Connection String Direta\n');
  
  const { Client } = await import('pg');
  const DIRECT_DATABASE_URL = process.env.DIRECT_DATABASE_URL;

  if (!DIRECT_DATABASE_URL) {
    console.log('   ⚠️  DIRECT_DATABASE_URL não configurada');
    return false;
  }

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  const sql = fs.readFileSync(migrationFile, 'utf-8');

  const client = new Client({
    connectionString: DIRECT_DATABASE_URL,
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log('   📝 Tentando conectar...');
    await client.connect();
    console.log('   ✅ Conectado!');
    
    console.log('   📝 Executando SQL...');
    await client.query(sql);
    console.log('   ✅ Migration aplicada!');
    
    await client.end();
    return true;
  } catch (error: any) {
    console.log(`   ❌ Erro: ${error.message.substring(0, 150)}`);
    try {
      await client.end();
    } catch {
      // Ignorar
    }
    return false;
  }
}

/**
 * Método 4: Preparar para Aplicação Manual (Fallback)
 */
async function method4_ManualInstructions(): Promise<boolean> {
  console.log('\n📋 MÉTODO 4: Instruções para Aplicação Manual\n');
  
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  console.log('   📄 Arquivo SQL:');
  console.log(`      ${migrationFile}\n`);
  console.log('   📋 INSTRUÇÕES:\n');
  console.log('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new');
  console.log('   2. Abra o arquivo SQL acima');
  console.log('   3. Copie TODO o conteúdo (Cmd+A, Cmd+C)');
  console.log('   4. Cole no SQL Editor');
  console.log('   5. Execute (Run ou Cmd+Enter)\n');
  
  // Mostrar preview do SQL
  const sql = fs.readFileSync(migrationFile, 'utf-8');
  const lines = sql.split('\n');
  console.log('   📝 Preview (primeiras 10 linhas):');
  console.log('   ' + '─'.repeat(50));
  lines.slice(0, 10).forEach((line, i) => {
    console.log(`   ${String(i + 1).padStart(3, ' ')} | ${line}`);
  });
  console.log('   ' + '─'.repeat(50));
  console.log(`   ... (${lines.length - 10} linhas restantes)\n`);
  
  return false; // Sempre retorna false pois é manual
}

/**
 * Executa todos os métodos em ordem até um funcionar
 */
async function applyMigrationRobust() {
  console.log('🚀 APLICANDO MIGRATION RLS - MÉTODO ROBUSTO\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${SUPABASE_URL}\n`);

  const methods: MigrationMethod[] = [
    {
      name: 'Supabase CLI',
      execute: method1_SupabaseCLI,
      description: 'Mais confiável - requer CLI instalado',
    },
    {
      name: 'Connection String Direta',
      execute: method3_DirectConnection,
      description: 'PostgreSQL direto - pode ter problemas de DNS',
    },
    {
      name: 'Management API',
      execute: method2_ManagementAPI,
      description: 'Via HTTP - requer função RPC customizada',
    },
  ];

  // Tentar cada método
  for (const method of methods) {
    console.log(`\n🔄 Tentando: ${method.name}`);
    console.log(`   ${method.description}`);
    
    try {
      const success = await method.execute();
      if (success) {
        console.log(`\n✅ SUCESSO usando método: ${method.name}\n`);
        console.log('💡 Próximo passo:');
        console.log('   npx tsx scripts/verify-complete-status.ts\n');
        return;
      }
    } catch (error: any) {
      console.log(`   ❌ Erro: ${error.message.substring(0, 100)}`);
    }
  }

  // Se nenhum método funcionou, mostrar instruções manuais
  console.log('\n' + '='.repeat(60));
  console.log('⚠️  NENHUM MÉTODO AUTOMÁTICO FUNCIONOU\n');
  console.log('💡 SOLUÇÃO: Aplicar Manualmente ou Instalar Supabase CLI\n');
  console.log('='.repeat(60));
  
  await method4_ManualInstructions();
  
  console.log('\n📋 ALTERNATIVA: Instalar Supabase CLI\n');
  console.log('   macOS:');
  console.log('     brew install supabase/tap/supabase\n');
  console.log('   Depois:');
  console.log('     supabase login');
  console.log(`     supabase link --project-ref ${PROJECT_REF}`);
  console.log('     supabase db execute -f supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql\n');
  
  process.exit(1);
}

applyMigrationRobust().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



