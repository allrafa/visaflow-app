/**
 * Script master para validar todo o sistema antes de testes em ambiente real
 * Executa: npx tsx scripts/validate-all.ts
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

interface ValidationResult {
  name: string;
  passed: boolean;
  message: string;
  critical: boolean;
}

const results: ValidationResult[] = [];

function log(message: string, color: string = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function validate(name: string, fn: () => boolean | Promise<boolean>, critical: boolean = false): void {
  try {
    const result = fn();
    if (result instanceof Promise) {
      result.then((passed) => {
        results.push({ name, passed, message: passed ? 'OK' : 'FALHOU', critical });
        log(`  ${passed ? '✅' : '❌'} ${name}`, passed ? GREEN : RED);
      });
    } else {
      results.push({ name, passed: result, message: result ? 'OK' : 'FALHOU', critical });
      log(`  ${result ? '✅' : '❌'} ${name}`, result ? GREEN : RED);
    }
  } catch (error) {
    results.push({ name, passed: false, message: `Erro: ${error}`, critical });
    log(`  ❌ ${name}: ${error}`, RED);
  }
}

async function validateAll() {
  log('\n🔍 VALIDAÇÃO COMPLETA DO SISTEMA\n', BLUE);
  log('═'.repeat(80), BLUE);

  // 1. Validações de Build
  log('\n📦 Validações de Build:', YELLOW);
  
  validate('TypeScript compila sem erros', () => {
    try {
      execSync('npm run type-check', { stdio: 'pipe', cwd: process.cwd() });
      return true;
    } catch {
      return false;
    }
  }, true);

  validate('Build de produção compila', () => {
    try {
      execSync('npm run build', { stdio: 'pipe', cwd: process.cwd() });
      return true;
    } catch {
      return false;
    }
  }, true);

  // 2. Validações de Arquivos
  log('\n📁 Validações de Arquivos:', YELLOW);
  
  validate('Migration 005 existe', () => {
    return existsSync(path.join(process.cwd(), 'supabase/migrations/005_add_missing_rls_policies.sql'));
  }, true);

  validate('Migration 006 existe', () => {
    return existsSync(path.join(process.cwd(), 'supabase/migrations/006_setup_storage_bucket.sql'));
  }, true);

  validate('Script verify-storage.ts existe', () => {
    return existsSync(path.join(process.cwd(), 'scripts/verify-storage.ts'));
  });

  validate('Script verify-migrations.ts existe', () => {
    return existsSync(path.join(process.cwd(), 'scripts/verify-migrations.ts'));
  });

  // 3. Validações de Variáveis de Ambiente
  log('\n🔐 Validações de Variáveis de Ambiente:', YELLOW);
  
  validate('NEXT_PUBLIC_SUPABASE_URL configurada', () => {
    return !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  }, true);

  validate('NEXT_PUBLIC_SUPABASE_ANON_KEY configurada', () => {
    return !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }, true);

  validate('SUPABASE_SERVICE_ROLE_KEY configurada', () => {
    return !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  }, true);

  validate('ANTHROPIC_API_KEY configurada', () => {
    return !!process.env.ANTHROPIC_API_KEY;
  }, false); // Não crítico para testes básicos

  // 4. Validações de Testes
  log('\n🧪 Validações de Testes:', YELLOW);
  
  validate('Testes unitários executam', () => {
    try {
      execSync('npm run test:unit', { stdio: 'pipe', cwd: process.cwd(), timeout: 60000 });
      return true;
    } catch {
      return false;
    }
  }, false);

  // 5. Validações de Migrations (requer conexão)
  log('\n🗄️  Validações de Migrations (requer conexão):', YELLOW);
  log('  ⚠️  Execute manualmente após aplicar migrations:', YELLOW);
  log('     - npx tsx scripts/verify-all-rls-policies.ts', YELLOW);
  log('     - npx tsx scripts/verify-storage.ts', YELLOW);
  log('     - npx tsx scripts/verify-migrations.ts', YELLOW);

  // Aguardar promises
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Resumo
  log('\n' + '═'.repeat(80), BLUE);
  log('\n📊 RESUMO DA VALIDAÇÃO:\n', BLUE);

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const criticalFailed = results.filter(r => !r.passed && r.critical).length;

  log(`✅ Passou: ${passed}/${results.length}`, GREEN);
  log(`❌ Falhou: ${failed}/${results.length}`, failed > 0 ? RED : GREEN);
  
  if (criticalFailed > 0) {
    log(`\n🔴 CRÍTICO: ${criticalFailed} validação(ões) crítica(s) falharam:`, RED);
    results.filter(r => !r.passed && r.critical).forEach(r => {
      log(`   - ${r.name}`, RED);
    });
  }

  log('\n📝 PRÓXIMOS PASSOS:\n', YELLOW);
  
  if (criticalFailed === 0) {
    log('1. Aplicar Migration 005 no Supabase Dashboard SQL Editor', YELLOW);
    log('2. Criar bucket "uploads" no Supabase Storage', YELLOW);
    log('3. Aplicar Migration 006 no Supabase Dashboard SQL Editor', YELLOW);
    log('4. Executar: npx tsx scripts/verify-migrations.ts', YELLOW);
    log('5. Iniciar testes em ambiente real', YELLOW);
  } else {
    log('1. Corrigir validações críticas que falharam', RED);
    log('2. Executar novamente este script', YELLOW);
  }

  log('\n📚 Documentação:', BLUE);
  log('   - docs/APLICAR_MIGRATIONS.md - Guia para aplicar migrations', BLUE);
  log('   - docs/PROXIMOS_PASSOS_SEMANA_2.md - Próximos passos detalhados', BLUE);
  log('   - docs/STATUS_ATUAL.md - Status atual do projeto', BLUE);

  log('\n' + '═'.repeat(80) + '\n', BLUE);

  process.exit(criticalFailed > 0 ? 1 : 0);
}

validateAll().catch((error) => {
  log(`\n❌ Erro fatal: ${error}`, RED);
  process.exit(1);
});



