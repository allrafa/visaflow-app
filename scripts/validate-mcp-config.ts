/**
 * Script para validar configuração MCP do projeto VisaFlow
 * Verifica se o projeto Supabase conectado está correto
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MCP_CONFIG_PATH = path.join(PROJECT_ROOT, '.mcp.json');
const ENV_PATH = path.join(PROJECT_ROOT, '.env');

// Projeto esperado
const EXPECTED_PROJECT_URL = 'https://jsnvrhbeedkifqwmsumc.supabase.co';
const EXPECTED_PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

console.log('🔍 Validando configuração MCP do VisaFlow...\n');

// 1. Verificar se .mcp.json existe
if (!fs.existsSync(MCP_CONFIG_PATH)) {
  console.error('❌ Arquivo .mcp.json não encontrado!');
  console.log(`   Esperado em: ${MCP_CONFIG_PATH}`);
  process.exit(1);
}

console.log('✅ Arquivo .mcp.json encontrado');

// 2. Ler e validar .mcp.json
const mcpConfig = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf-8'));

if (!mcpConfig.mcpServers?.supabase) {
  console.error('❌ Servidor Supabase não configurado no .mcp.json');
  process.exit(1);
}

const supabaseConfig = mcpConfig.mcpServers.supabase.env;

if (!supabaseConfig.SUPABASE_URL) {
  console.error('❌ SUPABASE_URL não encontrado no .mcp.json');
  process.exit(1);
}

if (supabaseConfig.SUPABASE_URL !== EXPECTED_PROJECT_URL) {
  console.error('❌ SUPABASE_URL incorreto!');
  console.error(`   Esperado: ${EXPECTED_PROJECT_URL}`);
  console.error(`   Encontrado: ${supabaseConfig.SUPABASE_URL}`);
  process.exit(1);
}

console.log(`✅ SUPABASE_URL correto: ${supabaseConfig.SUPABASE_URL}`);

if (!supabaseConfig.SUPABASE_ANON_KEY) {
  console.error('❌ SUPABASE_ANON_KEY não encontrado no .mcp.json');
  process.exit(1);
}

console.log('✅ SUPABASE_ANON_KEY configurado');

if (!supabaseConfig.SUPABASE_ACCESS_TOKEN || supabaseConfig.SUPABASE_ACCESS_TOKEN === 'SUBSTITUIR_PELO_TOKEN_DO_ENV') {
  console.warn('⚠️  SUPABASE_ACCESS_TOKEN não configurado ou ainda com placeholder');
  console.log('   Por favor, atualize o token no .mcp.json');
} else {
  console.log('✅ SUPABASE_ACCESS_TOKEN configurado');
}

// 3. Verificar .env
if (fs.existsSync(ENV_PATH)) {
  const envContent = fs.readFileSync(ENV_PATH, 'utf-8');
  const envUrlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
  
  if (envUrlMatch && envUrlMatch[1] === EXPECTED_PROJECT_URL) {
    console.log('✅ NEXT_PUBLIC_SUPABASE_URL no .env está correto');
  } else {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL no .env não corresponde ao esperado');
  }
} else {
  console.warn('⚠️  Arquivo .env não encontrado');
}

// 4. Tentar conectar ao Supabase (se token estiver configurado)
async function testConnection() {
  if (supabaseConfig.SUPABASE_ACCESS_TOKEN && supabaseConfig.SUPABASE_ACCESS_TOKEN !== 'SUBSTITUIR_PELO_TOKEN_DO_ENV') {
    console.log('\n🔌 Testando conexão com Supabase...');
    
    try {
      const supabase = createClient(
        supabaseConfig.SUPABASE_URL,
        supabaseConfig.SUPABASE_ANON_KEY
      );
      
      // Tentar uma query simples
      const { data, error } = await supabase.from('_prisma_migrations').select('id').limit(1);
      
      if (error) {
        console.warn(`⚠️  Erro ao conectar: ${error.message}`);
      } else {
        console.log('✅ Conexão com Supabase estabelecida com sucesso!');
      }
    } catch (err) {
      console.warn(`⚠️  Erro ao testar conexão: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    }
  }
}

testConnection().catch(console.error);

console.log('\n📋 Resumo:');
console.log(`   Projeto esperado: ${EXPECTED_PROJECT_REF}`);
console.log(`   URL configurada: ${supabaseConfig.SUPABASE_URL}`);
console.log(`   Status: ${supabaseConfig.SUPABASE_URL === EXPECTED_PROJECT_URL ? '✅ CORRETO' : '❌ INCORRETO'}`);

if (supabaseConfig.SUPABASE_ACCESS_TOKEN && supabaseConfig.SUPABASE_ACCESS_TOKEN !== 'SUBSTITUIR_PELO_TOKEN_DO_ENV') {
  console.log('\n✅ Configuração MCP completa!');
  console.log('   Você pode agora usar o MCP Supabase nesta conversa.');
} else {
  console.log('\n⚠️  Configuração incompleta!');
  console.log('   Por favor, atualize SUPABASE_ACCESS_TOKEN no .mcp.json');
  console.log('   Token pode ser obtido em: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/settings/api');
}

