/**
 * Script para aplicar migrations RLS via Supabase Management API
 * Usa Supabase Client com Service Role Key para executar SQL
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variáveis de ambiente não configuradas');
  process.exit(1);
}

const EXPECTED_PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

if (!SUPABASE_URL.includes(EXPECTED_PROJECT_REF)) {
  console.error('❌ SUPABASE_URL não corresponde ao projeto VisaFlow!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Executa SQL usando Supabase REST API (Management API)
 * Nota: Isso requer que a função RPC exec_sql exista no Supabase
 * Ou podemos usar a Management API diretamente
 */
async function executeSQLViaRPC(sql: string, migrationName: string): Promise<boolean> {
  console.log(`\n📝 Aplicando: ${migrationName}...`);
  
  try {
    // Tentar executar via RPC se existir
    const { error } = await supabase.rpc('exec_sql', { query: sql });
    
    if (error) {
      // Se RPC não existir, vamos tentar outra abordagem
      if (error.message.includes('function') && error.message.includes('does not exist')) {
        console.log('   ⚠️  Função exec_sql não existe. Tentando abordagem alternativa...');
        return false;
      }
      
      // Outros erros
      if (error.message.includes('already exists') || 
          error.message.includes('duplicate')) {
        console.log(`   ⚠️  ${error.message.split('\n')[0]}`);
        return true; // Considera sucesso se já existe
      }
      
      throw error;
    }
    
    console.log(`   ✅ ${migrationName} aplicada com sucesso`);
    return true;
  } catch (error: any) {
    console.error(`   ❌ Erro ao aplicar ${migrationName}:`, error.message);
    return false;
  }
}

/**
 * Aplica migration completa usando Supabase Client
 * Divide SQL em comandos e executa via RPC ou prepara para aplicação manual
 */
async function applyMigrationComplete() {
  console.log('🚀 APLICANDO MIGRATION RLS COMPLETA VIA SUPABASE API\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${SUPABASE_URL}\n`);

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  if (!fs.existsSync(migrationFile)) {
    console.error(`❌ Arquivo não encontrado: ${migrationFile}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(migrationFile, 'utf-8');
  
  // Tentar executar via RPC
  const success = await executeSQLViaRPC(sql, '007_APPLY_ALL_RLS_COMPLETE.sql');
  
  if (!success) {
    console.log('\n⚠️  Não foi possível aplicar automaticamente via API.');
    console.log('\n💡 SOLUÇÃO: Aplicar manualmente no Supabase Dashboard\n');
    console.log('📋 INSTRUÇÕES:');
    console.log('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new');
    console.log('   2. Copie o conteúdo do arquivo: supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql');
    console.log('   3. Cole no SQL Editor');
    console.log('   4. Execute (Run ou Cmd+Enter)');
    console.log('\n📄 Arquivo SQL:');
    console.log(`   ${migrationFile}\n`);
    
    // Mostrar primeiras linhas do SQL para referência
    const lines = sql.split('\n').slice(0, 20);
    console.log('📝 Preview do SQL (primeiras 20 linhas):');
    console.log('─'.repeat(60));
    lines.forEach((line, i) => {
      console.log(`${String(i + 1).padStart(3, ' ')} | ${line}`);
    });
    console.log('─'.repeat(60));
    console.log(`   ... (${sql.split('\n').length - 20} linhas restantes)\n`);
    
    process.exit(1);
  }

  console.log('\n✅ Migration aplicada com sucesso!');
  console.log('\n💡 Próximo passo:');
  console.log('   npx tsx scripts/verify-complete-status.ts');
}

applyMigrationComplete().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});




