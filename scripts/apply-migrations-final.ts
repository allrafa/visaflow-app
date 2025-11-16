/**
 * SOLUÇÃO FINAL: Aplicar Migrations SQL no Supabase
 * 
 * Este script tenta múltiplas abordagens:
 * 1. Supabase CLI (local ou global)
 * 2. Connection String Direta (com diferentes formatos)
 * 3. Instruções para aplicação manual
 * 
 * Uso: npx tsx scripts/apply-migrations-final.ts
 */

import { execSync } from 'child_process';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

/**
 * Verifica se Supabase CLI está disponível (local ou global)
 */
function checkSupabaseCLI(): { available: boolean; path: string; type: 'local' | 'global' | 'none' } {
  // Tentar local primeiro (node_modules/.bin)
  const localPath = path.resolve(__dirname, '..', 'node_modules', '.bin', 'supabase');
  if (fs.existsSync(localPath)) {
    return { available: true, path: localPath, type: 'local' };
  }

  // Tentar global
  try {
    execSync('supabase --version', { stdio: 'ignore' });
    return { available: true, path: 'supabase', type: 'global' };
  } catch {
    return { available: false, path: '', type: 'none' };
  }
}

/**
 * Método 1: Supabase CLI
 */
async function applyViaCLI(): Promise<boolean> {
  console.log('\n📋 MÉTODO 1: Supabase CLI\n');
  
  const cli = checkSupabaseCLI();
  
  if (!cli.available) {
    console.log('   ⚠️  Supabase CLI não encontrado');
    console.log('   💡 Instalando localmente...\n');
    
    try {
      // Instalar localmente
      execSync('npm install --save-dev supabase', {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..'),
      });
      console.log('   ✅ Supabase CLI instalado localmente\n');
    } catch (error: any) {
      console.log('   ❌ Erro ao instalar: ' + error.message.substring(0, 100));
      console.log('\n   💡 Instalar manualmente:');
      console.log('      npm install --save-dev supabase\n');
      return false;
    }
  }

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  if (!fs.existsSync(migrationFile)) {
    console.error(`   ❌ Arquivo não encontrado: ${migrationFile}`);
    return false;
  }

  try {
    console.log('   📝 Verificando autenticação...');
    try {
      execSync('npx supabase projects list', { stdio: 'ignore' });
      console.log('   ✅ Autenticado\n');
    } catch {
      console.log('   ⚠️  Não autenticado');
      console.log('   💡 Execute: npx supabase login\n');
      return false;
    }

    console.log('   📝 Aplicando migration...');
    execSync(`npx supabase db execute -f "${migrationFile}"`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
    });
    
    console.log('\n   ✅ Migration aplicada com sucesso via CLI!\n');
    return true;
  } catch (error: any) {
    const errorMsg = error.message || String(error);
    if (errorMsg.includes('not linked')) {
      console.log('   ⚠️  Projeto não está linkado');
      console.log(`   💡 Execute: npx supabase link --project-ref ${PROJECT_REF}\n`);
    } else {
      console.log(`   ❌ Erro: ${errorMsg.substring(0, 150)}\n`);
    }
    return false;
  }
}

/**
 * Método 2: Connection String Direta (tentar formatos alternativos)
 */
async function applyViaDirectConnection(): Promise<boolean> {
  console.log('\n📋 MÉTODO 2: Connection String Direta\n');
  
  const { Client } = await import('pg');
  const DATABASE_KEY = process.env.DATABASE_KEY;

  if (!DATABASE_KEY) {
    console.log('   ⚠️  DATABASE_KEY não configurada');
    return false;
  }

  // Tentar diferentes formatos baseados em pesquisa
  // O Supabase pode usar pooler ou formato específico da região
  const formats = [
    // Formato pooler (mais comum)
    `postgresql://postgres.${PROJECT_REF}:${DATABASE_KEY}@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`,
    // Formato direto alternativo
    `postgresql://postgres:${DATABASE_KEY}@${PROJECT_REF}.supabase.co:5432/postgres`,
  ];

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  const sql = fs.readFileSync(migrationFile, 'utf-8');

  for (const connectionString of formats) {
    console.log(`   🔍 Testando formato: ${connectionString.split('@')[1]?.split('/')[0] || 'unknown'}`);
    
    const client = new Client({
      connectionString,
      connectionTimeoutMillis: 10000,
    });

    try {
      await client.connect();
      console.log('   ✅ Conectado!');
      
      console.log('   📝 Executando SQL...');
      await client.query(sql);
      console.log('   ✅ Migration aplicada!\n');
      
      await client.end();
      return true;
    } catch (error: any) {
      const errorMsg = error.message || String(error);
      if (!errorMsg.includes('ENOTFOUND') && !errorMsg.includes('timeout')) {
        console.log(`   ⚠️  Erro: ${errorMsg.substring(0, 100)}`);
      }
      try {
        await client.end();
      } catch {
        // Ignorar
      }
    }
  }

  console.log('   ❌ Nenhum formato funcionou\n');
  return false;
}

/**
 * Método 3: Instruções Manuais
 */
function showManualInstructions() {
  console.log('\n📋 MÉTODO 3: Aplicação Manual\n');
  
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  console.log('   📄 Arquivo SQL:');
  console.log(`      ${migrationFile}\n`);
  console.log('   📋 INSTRUÇÕES RÁPIDAS:\n');
  console.log('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new');
  console.log('   2. Abra o arquivo acima');
  console.log('   3. Copie TODO (Cmd+A, Cmd+C)');
  console.log('   4. Cole no SQL Editor');
  console.log('   5. Execute (Run ou Cmd+Enter)\n');
}

/**
 * Main: Tenta todos os métodos
 */
async function main() {
  console.log('🚀 APLICAÇÃO DE MIGRATION RLS - SOLUÇÃO FINAL\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${SUPABASE_URL}\n`);

  // Tentar Método 1: CLI
  const cliSuccess = await applyViaCLI();
  if (cliSuccess) {
    console.log('✅ SUCESSO! Migration aplicada via Supabase CLI\n');
    console.log('💡 Verificar aplicação:');
    console.log('   npx tsx scripts/verify-complete-status.ts\n');
    return;
  }

  // Tentar Método 2: Connection Direta
  const directSuccess = await applyViaDirectConnection();
  if (directSuccess) {
    console.log('✅ SUCESSO! Migration aplicada via Connection String\n');
    console.log('💡 Verificar aplicação:');
    console.log('   npx tsx scripts/verify-complete-status.ts\n');
    return;
  }

  // Método 3: Instruções Manuais
  console.log('\n' + '='.repeat(60));
  console.log('⚠️  MÉTODOS AUTOMÁTICOS NÃO FUNCIONARAM\n');
  console.log('💡 SOLUÇÃO: Aplicar Manualmente ou Configurar Supabase CLI\n');
  console.log('='.repeat(60));
  
  showManualInstructions();
  
  console.log('📋 CONFIGURAR SUPABASE CLI (Para Próxima Vez):\n');
  console.log('   1. Instalar localmente:');
  console.log('      npm install --save-dev supabase\n');
  console.log('   2. Fazer login:');
  console.log('      npx supabase login\n');
  console.log('   3. Linkar projeto:');
  console.log(`      npx supabase link --project-ref ${PROJECT_REF}\n`);
  console.log('   4. Aplicar migration:');
  console.log('      npx supabase db execute -f supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql\n');
  
  process.exit(1);
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



