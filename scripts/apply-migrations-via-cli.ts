/**
 * Script para aplicar migrations usando Supabase CLI
 * Verifica se CLI está instalado e aplica migrations automaticamente
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

const PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

/**
 * Verifica se Supabase CLI está instalado
 */
function checkSupabaseCLI(): boolean {
  try {
    execSync('supabase --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Verifica se projeto está linkado
 */
function checkProjectLinked(): boolean {
  try {
    const result = execSync('supabase status', { 
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return result.includes(PROJECT_REF) || result.includes('Linked');
  } catch {
    return false;
  }
}

/**
 * Aplica migration usando Supabase CLI
 */
async function applyMigrationViaCLI() {
  console.log('🚀 APLICANDO MIGRATION VIA SUPABASE CLI\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');

  // 1. Verificar se CLI está instalado
  console.log('1️⃣ Verificando Supabase CLI...');
  if (!checkSupabaseCLI()) {
    console.log('   ❌ Supabase CLI não está instalado\n');
    console.log('📋 INSTALAÇÃO:\n');
    console.log('   macOS:');
    console.log('     brew install supabase/tap/supabase\n');
    console.log('   npm (global):');
    console.log('     npm install -g supabase\n');
    console.log('   Outros métodos:');
    console.log('     https://supabase.com/docs/guides/cli/getting-started\n');
    process.exit(1);
  }
  
  const version = execSync('supabase --version', { encoding: 'utf-8' }).trim();
  console.log(`   ✅ Supabase CLI instalado: ${version}\n`);

  // 2. Verificar se está logado
  console.log('2️⃣ Verificando autenticação...');
  try {
    execSync('supabase projects list', { stdio: 'ignore' });
    console.log('   ✅ Autenticado\n');
  } catch {
    console.log('   ❌ Não autenticado\n');
    console.log('📋 FAZER LOGIN:\n');
    console.log('   supabase login\n');
    console.log('   Isso abrirá o navegador para autenticação\n');
    process.exit(1);
  }

  // 3. Verificar se projeto está linkado
  console.log('3️⃣ Verificando projeto linkado...');
  if (!checkProjectLinked()) {
    console.log('   ⚠️  Projeto não está linkado\n');
    console.log('📋 LINKAR PROJETO:\n');
    console.log(`   supabase link --project-ref ${PROJECT_REF}\n`);
    console.log('   Isso conectará o CLI ao projeto Supabase\n');
    process.exit(1);
  }
  console.log(`   ✅ Projeto ${PROJECT_REF} linkado\n`);

  // 4. Aplicar migration
  console.log('4️⃣ Aplicando migration...\n');
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  if (!fs.existsSync(migrationFile)) {
    console.error(`❌ Arquivo não encontrado: ${migrationFile}`);
    process.exit(1);
  }

  try {
    console.log(`📝 Executando: supabase db execute -f ${migrationFile}\n`);
    execSync(`supabase db execute -f "${migrationFile}"`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
    });
    
    console.log('\n✅ Migration aplicada com sucesso!\n');
    console.log('💡 Próximo passo:');
    console.log('   npx tsx scripts/verify-complete-status.ts\n');
  } catch (error: any) {
    console.error('\n❌ Erro ao aplicar migration:', error.message);
    console.error('\n💡 Verifique:');
    console.error('   1. Se está autenticado: supabase login');
    console.error('   2. Se projeto está linkado: supabase link --project-ref jsnvrhbeedkifqwmsumc');
    console.error('   3. Se tem permissões no projeto');
    process.exit(1);
  }
}

applyMigrationViaCLI().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



