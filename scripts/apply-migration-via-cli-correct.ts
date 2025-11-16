/**
 * Script para aplicar migration SQL via Supabase CLI usando método correto
 * O Supabase CLI não tem 'db execute', então usamos outra abordagem
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

const PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

/**
 * Método 1: Usar psql via Supabase CLI (se disponível)
 */
async function applyViaPsql() {
  console.log('\n📋 MÉTODO 1: Via psql (Connection String)\n');
  
  const DIRECT_DATABASE_URL = process.env.DIRECT_DATABASE_URL;
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  if (!DIRECT_DATABASE_URL) {
    console.log('   ⚠️  DIRECT_DATABASE_URL não configurada');
    return false;
  }

  // Tentar usar psql se disponível
  try {
    execSync('which psql', { stdio: 'ignore' });
    console.log('   📝 Executando via psql...');
    
    const sql = fs.readFileSync(migrationFile, 'utf-8');
    execSync(`psql "${DIRECT_DATABASE_URL}" -c "${sql.replace(/"/g, '\\"')}"`, {
      stdio: 'inherit',
    });
    
    console.log('   ✅ Migration aplicada via psql!\n');
    return true;
  } catch (error: any) {
    if (error.message.includes('ENOTFOUND')) {
      console.log('   ⚠️  Erro DNS - connection string não resolve\n');
    } else {
      console.log(`   ⚠️  psql não disponível ou erro: ${error.message.substring(0, 100)}\n`);
    }
    return false;
  }
}

/**
 * Método 2: Usar Supabase Management API via HTTP
 * Criar função RPC temporária e executar SQL
 */
async function applyViaManagementAPI() {
  console.log('\n📋 MÉTODO 2: Via Management API\n');
  
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  const sql = fs.readFileSync(migrationFile, 'utf-8');

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('   ⚠️  SUPABASE_SERVICE_ROLE_KEY não configurada');
    return false;
  }

  try {
    // Dividir SQL em comandos individuais
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    console.log(`   📝 Executando ${commands.length} comandos SQL...`);
    
    // Nota: O Supabase não expõe execução SQL direta via REST API
    // Precisamos usar outra abordagem
    console.log('   ⚠️  Management API não suporta execução SQL direta');
    console.log('   💡 Usando método alternativo...\n');
    
    return false;
  } catch (error: any) {
    console.log(`   ❌ Erro: ${error.message.substring(0, 100)}\n`);
    return false;
  }
}

/**
 * Método 3: Usar Supabase CLI db push (requer estrutura de migrations)
 */
async function applyViaDbPush() {
  console.log('\n📋 MÉTODO 3: Via Supabase CLI db push\n');
  
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  try {
    // Verificar se existe estrutura supabase/config.toml
    const configPath = path.resolve(__dirname, '..', 'supabase', 'config.toml');
    if (!fs.existsSync(configPath)) {
      console.log('   ⚠️  Estrutura Supabase não inicializada');
      console.log('   💡 Executar: npx supabase init\n');
      return false;
    }

    console.log('   📝 Aplicando migrations via db push...');
    execSync('npx supabase db push', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
    });
    
    console.log('   ✅ Migrations aplicadas via db push!\n');
    return true;
  } catch (error: any) {
    const errorMsg = error.message || String(error);
    if (errorMsg.includes('no migrations')) {
      console.log('   ⚠️  Nenhuma migration pendente\n');
    } else {
      console.log(`   ⚠️  Erro: ${errorMsg.substring(0, 150)}\n`);
    }
    return false;
  }
}

/**
 * Método 4: Executar SQL diretamente via Supabase CLI usando link
 * Usar o fato de que o projeto está linkado
 */
async function applyViaLinkedProject() {
  console.log('\n📋 MÉTODO 4: Via Projeto Linkado\n');
  
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  const sql = fs.readFileSync(migrationFile, 'utf-8');

  try {
    // Verificar se projeto está linkado
    execSync('npx supabase status', { stdio: 'ignore' });
    console.log('   ✅ Projeto linkado detectado');
    
    // Infelizmente, o Supabase CLI não tem comando direto para executar SQL
    // A melhor opção é usar o Dashboard ou criar uma função RPC
    console.log('   ⚠️  Supabase CLI não tem comando para executar SQL diretamente');
    console.log('   💡 Use o Dashboard ou aplique manualmente\n');
    
    return false;
  } catch (error: any) {
    console.log('   ⚠️  Projeto não está linkado ou erro\n');
    return false;
  }
}

/**
 * Main: Tenta todos os métodos
 */
async function main() {
  console.log('🚀 APLICAR MIGRATION RLS - MÉTODO CORRETO\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${PROJECT_REF}\n`);

  // Tentar métodos em ordem
  const methods = [
    applyViaDbPush,
    applyViaPsql,
    applyViaLinkedProject,
    applyViaManagementAPI,
  ];

  for (const method of methods) {
    try {
      const success = await method();
      if (success) {
        console.log('✅ SUCESSO! Migration aplicada\n');
        console.log('💡 Verificar aplicação:');
        console.log('   npx tsx scripts/verify-complete-status.ts\n');
        return;
      }
    } catch (error: any) {
      console.log(`   ❌ Erro: ${error.message.substring(0, 100)}\n`);
    }
  }

  // Se nenhum método funcionou
  console.log('\n' + '='.repeat(60));
  console.log('⚠️  MÉTODOS AUTOMÁTICOS NÃO DISPONÍVEIS\n');
  console.log('💡 SOLUÇÃO: Aplicar Manualmente no Dashboard\n');
  console.log('='.repeat(60));
  
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  
  console.log('\n📄 Arquivo SQL:');
  console.log(`   ${migrationFile}\n`);
  console.log('📋 INSTRUÇÕES:\n');
  console.log('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new');
  console.log('   2. Abra o arquivo acima');
  console.log('   3. Copie TODO (Cmd+A, Cmd+C)');
  console.log('   4. Cole no SQL Editor');
  console.log('   5. Execute (Run ou Cmd+Enter)\n');
  
  process.exit(1);
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});




