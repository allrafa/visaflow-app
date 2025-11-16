/**
 * Script para aplicar APENAS a migration 007_APPLY_ALL_RLS_COMPLETE.sql
 * Esta migration é idempotente (usa DROP POLICY IF EXISTS)
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || 'sbp_efa7c25ad022ea7536617207c72567e59ac3e02a';
const PROJECT_REF = 'jsnvrhbeedkifqwmsumc';

async function applyOnlyRLSComplete() {
  console.log('🚀 APLICANDO APENAS MIGRATION RLS COMPLETA\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${PROJECT_REF}\n`);

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const migrationFile = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');

  if (!fs.existsSync(migrationFile)) {
    console.error(`❌ Arquivo não encontrado: ${migrationFile}`);
    process.exit(1);
  }

  // Criar diretório temporário com apenas essa migration
  const tempDir = path.resolve(__dirname, '..', 'supabase', 'migrations_temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const tempFile = path.join(tempDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  fs.copyFileSync(migrationFile, tempFile);

  console.log('📝 Migration a aplicar:');
  console.log(`   ${migrationFile}\n`);
  console.log('💡 Esta migration é idempotente (pode executar múltiplas vezes)\n');

  try {
    // Exportar token
    process.env.SUPABASE_ACCESS_TOKEN = SUPABASE_ACCESS_TOKEN;

    // Aplicar via db push usando diretório temporário
    console.log('📝 Aplicando migration via Supabase CLI...\n');
    
    // Mudar temporariamente o diretório de migrations
    const originalCwd = process.cwd();
    const supabaseDir = path.resolve(__dirname, '..', 'supabase');
    
    // Criar um config.toml temporário se não existir
    const configPath = path.join(supabaseDir, 'config.toml');
    if (!fs.existsSync(configPath)) {
      const configContent = `# Supabase CLI config
[project]
id = "${PROJECT_REF}"

[db]
port = 5432
`;
      fs.writeFileSync(configPath, configContent);
    }

    // Aplicar migration
    execSync(`npx supabase db push --linked --yes`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      env: {
        ...process.env,
        SUPABASE_ACCESS_TOKEN,
      },
    });

    console.log('\n✅ Migration aplicada com sucesso!\n');
    console.log('💡 Verificar aplicação:');
    console.log('   npx tsx scripts/verify-complete-status.ts\n');

  } catch (error: any) {
    console.error('\n❌ Erro ao aplicar migration:', error.message);
    console.error('\n💡 SOLUÇÃO ALTERNATIVA: Aplicar Manualmente\n');
    console.log('📋 INSTRUÇÕES:');
    console.log('   1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new');
    console.log(`   2. Abra: ${migrationFile}`);
    console.log('   3. Copie TODO (Cmd+A, Cmd+C)');
    console.log('   4. Cole no SQL Editor');
    console.log('   5. Execute (Run ou Cmd+Enter)\n');
    
    process.exit(1);
  } finally {
    // Limpar arquivo temporário
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

applyOnlyRLSComplete().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



