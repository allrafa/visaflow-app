/**
 * Script Master: Executa todos os testes da Fase 0
 * Executa em sequência: validação RLS, autenticação, API routes e isolamento
 */

import { execSync } from 'child_process';
import { config } from 'dotenv';

config();

interface TestResult {
  name: string;
  success: boolean;
  error?: string;
}

const tests = [
  {
    name: 'Validação de RLS Policies',
    script: 'validate-rls.ts',
    required: true,
  },
  {
    name: 'Teste de Autenticação',
    script: 'test-auth.ts',
    required: true,
  },
  {
    name: 'Teste de API Routes',
    script: 'test-api-routes.ts',
    required: true,
  },
  {
    name: 'Teste de Isolamento RLS',
    script: 'test-rls-isolation.ts',
    required: true,
  },
];

async function runAllTests() {
  console.log('🚀 Executando Todos os Testes da Fase 0\n');
  console.log('='.repeat(60));
  console.log('');

  const results: TestResult[] = [];

  for (const test of tests) {
    console.log(`\n📋 Executando: ${test.name}`);
    console.log(`   Script: ${test.script}`);
    console.log('-'.repeat(60));

    try {
      execSync(`npx tsx scripts/${test.script}`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
      
      results.push({ name: test.name, success: true });
      console.log(`\n✅ ${test.name}: PASSOU\n`);
    } catch (error: any) {
      const errorMessage = error.message || 'Erro desconhecido';
      results.push({ 
        name: test.name, 
        success: false, 
        error: errorMessage 
      });
      
      console.log(`\n❌ ${test.name}: FALHOU`);
      console.log(`   Erro: ${errorMessage}\n`);

      if (test.required) {
        console.log('⚠️  Este teste é obrigatório. Continuando com próximos testes...\n');
      }
    }
  }

  // Resumo final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO FINAL DOS TESTES');
  console.log('='.repeat(60));
  console.log('');

  const successCount = results.filter((r) => r.success).length;
  const totalCount = results.length;

  results.forEach((result) => {
    const icon = result.success ? '✅' : '❌';
    const status = result.success ? 'PASSOU' : 'FALHOU';
    console.log(`${icon} ${result.name}: ${status}`);
    if (!result.success && result.error) {
      console.log(`   └─ Erro: ${result.error.substring(0, 100)}...`);
    }
  });

  console.log('\n' + '='.repeat(60));
  if (successCount === totalCount) {
    console.log(`✅ TODOS OS TESTES PASSARAM (${successCount}/${totalCount})`);
    console.log('='.repeat(60));
    console.log('\n🎉 FASE 0 COMPLETA E VALIDADA!\n');
    process.exit(0);
  } else {
    console.log(`⚠️  ALGUNS TESTES FALHARAM (${successCount}/${totalCount})`);
    console.log('='.repeat(60));
    console.log('\n💡 Verifique os erros acima e corrija antes de continuar.\n');
    process.exit(1);
  }
}

runAllTests().catch((error) => {
  console.error('\n❌ Erro fatal ao executar testes:', error);
  process.exit(1);
});



