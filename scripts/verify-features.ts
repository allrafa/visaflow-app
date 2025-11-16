/**
 * Script para verificar se todas as features principais estão funcionando
 * Executa: npx tsx scripts/verify-features.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

interface FeatureCheck {
  name: string;
  status: '✅' | '⚠️' | '❌';
  message: string;
  action?: string;
}

const checks: FeatureCheck[] = [];

async function checkSupabaseConnection() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    checks.push({
      name: 'Supabase Connection',
      status: '❌',
      message: 'Variáveis de ambiente não configuradas',
      action: 'Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env',
    });
    return;
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase.from('processes').select('count').limit(1);

    if (error && error.code !== 'PGRST116') {
      // PGRST116 é "no rows returned", que é OK
      throw error;
    }

    checks.push({
      name: 'Supabase Connection',
      status: '✅',
      message: 'Conexão estabelecida com sucesso',
    });
  } catch (error) {
    checks.push({
      name: 'Supabase Connection',
      status: '❌',
      message: `Erro: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function checkStorageBucket() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    checks.push({
      name: 'Storage Bucket',
      status: '⚠️',
      message: 'Variáveis de ambiente não configuradas',
      action: 'Configure SUPABASE_SERVICE_ROLE_KEY no .env',
    });
    return;
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      throw error;
    }

    const uploadsBucket = buckets?.find((b) => b.name === 'uploads');

    if (uploadsBucket) {
      checks.push({
        name: 'Storage Bucket',
        status: '✅',
        message: 'Bucket "uploads" existe',
      });
    } else {
      checks.push({
        name: 'Storage Bucket',
        status: '⚠️',
        message: 'Bucket "uploads" não encontrado',
        action: 'Execute: npx tsx scripts/setup-storage.ts',
      });
    }
  } catch (error) {
    checks.push({
      name: 'Storage Bucket',
      status: '❌',
      message: `Erro: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

function checkAnthropicAPI() {
  if (!ANTHROPIC_API_KEY) {
    checks.push({
      name: 'Anthropic API',
      status: '⚠️',
      message: 'Chave da API não configurada',
      action: 'Configure ANTHROPIC_API_KEY no .env',
    });
  } else {
    checks.push({
      name: 'Anthropic API',
      status: '✅',
      message: 'Chave da API configurada',
    });
  }
}

async function checkDatabaseTables() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return;
  }

  const requiredTables = [
    'users',
    'processes',
    'tasks',
    'uploads',
    'criteria_evidences',
    'recommendation_letters',
    'audit_logs',
  ];

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select('count').limit(1);
        if (error && error.code !== 'PGRST116') {
          checks.push({
            name: `Table: ${table}`,
            status: '❌',
            message: `Erro: ${error.message}`,
          });
        } else {
          checks.push({
            name: `Table: ${table}`,
            status: '✅',
            message: 'Tabela existe',
          });
        }
      } catch (error) {
        checks.push({
          name: `Table: ${table}`,
          status: '❌',
          message: `Erro ao verificar: ${error instanceof Error ? error.message : 'Unknown'}`,
        });
      }
    }
  } catch (error) {
    checks.push({
      name: 'Database Tables',
      status: '❌',
      message: `Erro geral: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function main() {
  console.log('🔍 Verificando features do VisaFlow...\n');

  await checkSupabaseConnection();
  await checkStorageBucket();
  checkAnthropicAPI();
  await checkDatabaseTables();

  console.log('\n📊 RESULTADOS:\n');

  const passed = checks.filter((c) => c.status === '✅').length;
  const warnings = checks.filter((c) => c.status === '⚠️').length;
  const failed = checks.filter((c) => c.status === '❌').length;

  checks.forEach((check) => {
    console.log(`${check.status} ${check.name}: ${check.message}`);
    if (check.action) {
      console.log(`   💡 ${check.action}`);
    }
  });

  console.log(`\n📈 Resumo: ${passed} ✅ | ${warnings} ⚠️ | ${failed} ❌`);

  if (failed > 0) {
    console.log('\n❌ Algumas verificações falharam. Corrija os problemas antes de continuar.');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n⚠️  Algumas verificações têm avisos. Revise as ações sugeridas.');
  } else {
    console.log('\n✅ Todas as verificações passaram!');
  }
}

main().catch((error) => {
  console.error('❌ Erro ao executar verificações:', error);
  process.exit(1);
});



