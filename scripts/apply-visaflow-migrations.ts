/**
 * Script para aplicar todas as migrations do VisaFlow no projeto Supabase correto
 * Usa credenciais do .env para conectar diretamente
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variáveis de ambiente não configuradas');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✅' : '❌');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_KEY ? '✅' : '❌');
  process.exit(1);
}

const EXPECTED_PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

if (!SUPABASE_URL.includes(EXPECTED_PROJECT_REF)) {
  console.error('❌ SUPABASE_URL não corresponde ao projeto VisaFlow!');
  console.error(`   Esperado: ${EXPECTED_PROJECT_REF}`);
  console.error(`   Encontrado: ${SUPABASE_URL}`);
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function executeSQL(sql: string, migrationName: string) {
  console.log(`\n📝 Aplicando: ${migrationName}...`);
  
  try {
    // Dividir SQL em comandos individuais
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    for (const command of commands) {
      if (command.length === 0) continue;
      
      const { error } = await supabase.rpc('exec_sql', { query: command });
      
      if (error) {
        // Alguns erros são esperados (ex: "already exists")
        if (error.message.includes('already exists') || 
            error.message.includes('duplicate') ||
            error.message.includes('does not exist')) {
          console.log(`   ⚠️  ${error.message.split('\n')[0]}`);
        } else {
          throw error;
        }
      }
    }
    
    console.log(`   ✅ ${migrationName} aplicada com sucesso`);
    return true;
  } catch (error: any) {
    console.error(`   ❌ Erro ao aplicar ${migrationName}:`, error.message);
    return false;
  }
}

async function applyMigrations() {
  console.log('🚀 Aplicando migrations do VisaFlow...\n');
  console.log(`📌 Projeto: ${SUPABASE_URL}\n`);

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  
  // Ordem das migrations
  const migrationFiles = [
    '002_create_visaflow_tables_only.sql',
    '003_enable_rls_visaflow_only.sql',
    '004_create_visaflow_tasks.sql',
    '005_add_missing_rls_policies.sql',
  ];

  let successCount = 0;
  let failCount = 0;

  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Arquivo não encontrado: ${file}`);
      continue;
    }

    const sql = fs.readFileSync(filePath, 'utf-8');
    const success = await executeSQL(sql, file);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO:');
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ❌ Falhas: ${failCount}`);
  console.log('='.repeat(60));

  if (failCount === 0) {
    console.log('\n✅ Todas as migrations foram aplicadas com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Criar bucket "uploads" no Supabase Storage (manual)');
    console.log('   2. Aplicar migration 006_setup_storage_bucket.sql');
    console.log('   3. Validar RLS policies: npx tsx scripts/verify-all-rls-policies.ts');
  } else {
    console.log('\n⚠️  Algumas migrations falharam. Verifique os erros acima.');
  }
}

applyMigrations().catch(console.error);


