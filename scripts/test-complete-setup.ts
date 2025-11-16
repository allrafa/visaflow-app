/**
 * Script completo de teste de configuração seguindo VISAFLOW CONTEXT.md
 * Valida todas as configurações necessárias antes de iniciar o servidor
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log('🔍 TESTE COMPLETO DE CONFIGURAÇÃO - VISAFLOW\n');
console.log('='.repeat(60));

// 1. Validar Variáveis de Ambiente
console.log('\n1️⃣ Validando Variáveis de Ambiente...');
const requiredVars = {
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: SUPABASE_SERVICE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
};

let envValid = true;
for (const [key, value] of Object.entries(requiredVars)) {
  if (!value || value.includes('placeholder')) {
    console.log(`   ❌ ${key}: Não configurada`);
    envValid = false;
  } else {
    console.log(`   ✅ ${key}: Configurada`);
  }
}

if (!envValid) {
  console.log('\n❌ Variáveis de ambiente não estão todas configuradas!');
  process.exit(1);
}

// 2. Testar Conexão com Supabase
async function testSupabaseConnection() {
  console.log('\n2️⃣ Testando Conexão com Supabase...');
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Tentar uma query simples
    const { error } = await supabase.from('processes').select('id').limit(1);
    
    if (error && error.message.includes('permission denied')) {
      console.log('   ✅ Conexão OK - RLS está funcionando (esperado)');
    } else if (error && error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('   ⚠️  Conexão OK, mas tabela não encontrada');
      console.log('   💡 Execute as migrations primeiro');
    } else if (error) {
      console.log(`   ⚠️  Erro na conexão: ${error.message}`);
    } else {
      console.log('   ✅ Conexão OK - Tabelas existem');
    }
  } catch (err: any) {
    console.log(`   ❌ Erro ao conectar: ${err.message}`);
  }
}

// 3. Verificar Projeto Correto
console.log('\n3️⃣ Verificando Projeto Supabase...');
const expectedProjectRef = 'jsnvrhbeedkifqwmsumc';
if (SUPABASE_URL.includes(expectedProjectRef)) {
  console.log(`   ✅ Projeto correto: ${expectedProjectRef}`);
} else {
  console.log(`   ❌ Projeto incorreto! Esperado: ${expectedProjectRef}`);
  console.log(`   Encontrado: ${SUPABASE_URL}`);
}

// 4. Verificar Estrutura de Arquivos
console.log('\n4️⃣ Verificando Estrutura de Arquivos...');
const requiredFiles = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/lib/db/supabase.ts',
  '.env',
  'package.json',
  'tsconfig.json',
  'next.config.js',
];

const fs = require('fs');
const projectRoot = path.resolve(__dirname, '..');

for (const file of requiredFiles) {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} não encontrado`);
  }
}

// 5. Verificar Dependências
console.log('\n5️⃣ Verificando Dependências...');
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8')
  );
  
  const criticalDeps = [
    'next',
    'react',
    'react-dom',
    '@supabase/supabase-js',
    '@supabase/ssr',
    'typescript',
  ];
  
  for (const dep of criticalDeps) {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      console.log(`   ✅ ${dep}`);
    } else {
      console.log(`   ❌ ${dep} não encontrado`);
    }
  }
} catch (err) {
  console.log('   ⚠️  Erro ao verificar package.json');
}

async function main() {
  // Executar teste de conexão
  await testSupabaseConnection();
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ TESTE COMPLETO FINALIZADO');
  console.log('='.repeat(60));
  console.log('\n💡 Próximos passos:');
  console.log('   1. Execute: npm run dev');
  console.log('   2. Acesse: http://localhost:3000');
  console.log('   3. Verifique se a página carrega corretamente\n');
}

main().catch(console.error);

