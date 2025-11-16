/**
 * Script para Aplicar Migrations SQL Automaticamente no Supabase
 * 
 * Este script aplica migrations SQL diretamente no banco Supabase usando
 * a connection string direta (DIRECT_DATABASE_URL).
 * 
 * Uso:
 *   npx tsx scripts/apply-supabase-migrations.ts [nome-do-arquivo.sql]
 * 
 * Se nenhum arquivo for especificado, aplica todas as migrations na ordem.
 */

import { config } from 'dotenv';
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

config();

const DIRECT_DATABASE_URL = process.env.DIRECT_DATABASE_URL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!DIRECT_DATABASE_URL) {
  console.error('❌ DIRECT_DATABASE_URL não configurada no .env');
  console.error('\n💡 Adicione ao .env:');
  console.error('   DIRECT_DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres');
  process.exit(1);
}

if (!SUPABASE_URL) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL não configurada');
  process.exit(1);
}

// Verificar projeto correto
const EXPECTED_PROJECT_REF = 'jsnvrhbeedkifqwmsumc';
if (!SUPABASE_URL.includes(EXPECTED_PROJECT_REF)) {
  console.error('❌ SUPABASE_URL não corresponde ao projeto VisaFlow!');
  console.error(`   Esperado: ${EXPECTED_PROJECT_REF}`);
  console.error(`   Encontrado: ${SUPABASE_URL}`);
  process.exit(1);
}

interface MigrationResult {
  file: string;
  success: boolean;
  error?: string;
  commandsExecuted: number;
}

/**
 * Executa SQL dividindo em comandos individuais
 */
async function executeSQL(client: Client, sql: string, migrationName: string): Promise<MigrationResult> {
  console.log(`\n📝 Aplicando: ${migrationName}...`);
  
  // Remover comentários de linha única e dividir por ponto-e-vírgula
  const cleanedSQL = sql
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Manter linhas que não são apenas comentários
      return trimmed.length > 0 && !trimmed.startsWith('--');
    })
    .join('\n');

  // Dividir em comandos (considerando DO $$ blocks)
  const commands: string[] = [];
  let currentCommand = '';
  let inDoBlock = false;
  let doBlockDepth = 0;

  for (const line of cleanedSQL.split('\n')) {
    const trimmed = line.trim();
    
    // Detectar início de DO $$ block
    if (trimmed.toUpperCase().startsWith('DO $$')) {
      inDoBlock = true;
      doBlockDepth = 1;
      currentCommand = line;
      continue;
    }
    
    // Detectar fim de DO $$ block
    if (inDoBlock) {
      currentCommand += '\n' + line;
      if (trimmed.includes('$$')) {
        doBlockDepth--;
        if (doBlockDepth === 0) {
          inDoBlock = false;
          if (trimmed.endsWith(';')) {
            commands.push(currentCommand.trim());
            currentCommand = '';
          }
        }
      }
      continue;
    }
    
    // Comandos normais
    currentCommand += (currentCommand ? '\n' : '') + line;
    
    if (trimmed.endsWith(';')) {
      const cmd = currentCommand.trim();
      if (cmd.length > 0) {
        commands.push(cmd);
      }
      currentCommand = '';
    }
  }
  
  // Adicionar último comando se não terminou com ponto-e-vírgula
  if (currentCommand.trim().length > 0) {
    commands.push(currentCommand.trim());
  }

  let commandsExecuted = 0;
  const errors: string[] = [];

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i].trim();
    
    // Pular comandos vazios ou apenas comentários
    if (command.length === 0 || command.startsWith('--')) {
      continue;
    }

    try {
      await client.query(command);
      commandsExecuted++;
    } catch (error: any) {
      const errorMessage = error.message || String(error);
      
      // Erros esperados (já existe, não existe, etc)
      if (
        errorMessage.includes('already exists') ||
        errorMessage.includes('duplicate') ||
        errorMessage.includes('does not exist') ||
        errorMessage.includes('relation') && errorMessage.includes('does not exist')
      ) {
        // Logar mas não falhar
        console.log(`   ⚠️  Comando ${i + 1}: ${errorMessage.split('\n')[0].substring(0, 80)}`);
        commandsExecuted++;
      } else {
        errors.push(`Comando ${i + 1}: ${errorMessage}`);
        console.error(`   ❌ Erro no comando ${i + 1}:`, errorMessage.substring(0, 200));
      }
    }
  }

  if (errors.length > 0) {
    return {
      file: migrationName,
      success: false,
      error: errors.join('; '),
      commandsExecuted,
    };
  }

  console.log(`   ✅ ${migrationName} aplicada com sucesso (${commandsExecuted} comandos executados)`);
  return {
    file: migrationName,
    success: true,
    commandsExecuted,
  };
}

/**
 * Aplica uma migration específica
 */
async function applyMigration(fileName: string): Promise<MigrationResult> {
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  const filePath = path.join(migrationsDir, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
  }

  const sql = fs.readFileSync(filePath, 'utf-8');
  const client = new Client({
    connectionString: DIRECT_DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco PostgreSQL\n');
    
    const result = await executeSQL(client, sql, fileName);
    return result;
  } catch (error: any) {
    return {
      file: fileName,
      success: false,
      error: error.message,
      commandsExecuted: 0,
    };
  } finally {
    await client.end();
  }
}

/**
 * Aplica todas as migrations na ordem
 */
async function applyAllMigrations() {
  if (!DIRECT_DATABASE_URL) {
    console.error('❌ DIRECT_DATABASE_URL não configurada');
    process.exit(1);
  }

  console.log('🚀 APLICANDO MIGRATIONS DO VISAFLOW AUTOMATICAMENTE\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${SUPABASE_URL}`);
  console.log(`🔗 Connection: ${DIRECT_DATABASE_URL.replace(/:[^:@]+@/, ':****@')}\n`);

  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  
  // Ordem das migrations (apenas as principais)
  const migrationFiles = [
    '007_APPLY_ALL_RLS_COMPLETE.sql', // Migration completa consolidada
  ];

  // Se a migration completa não existir, usar migrations individuais
  const completeMigrationPath = path.join(migrationsDir, '007_APPLY_ALL_RLS_COMPLETE.sql');
  if (!fs.existsSync(completeMigrationPath)) {
    console.log('⚠️  Migration completa não encontrada, usando migrations individuais...\n');
    migrationFiles.length = 0;
    migrationFiles.push(
      '006_setup_storage_bucket.sql',
      '005_add_missing_rls_policies.sql',
    );
  }

  const results: MigrationResult[] = [];
  
  if (!DIRECT_DATABASE_URL) {
    console.error('❌ DIRECT_DATABASE_URL não configurada');
    process.exit(1);
  }
  
  const client = new Client({
    connectionString: DIRECT_DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco PostgreSQL\n');

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Arquivo não encontrado: ${file}`);
        results.push({
          file,
          success: false,
          error: 'Arquivo não encontrado',
          commandsExecuted: 0,
        });
        continue;
      }

      const sql = fs.readFileSync(filePath, 'utf-8');
      const result = await executeSQL(client, sql, file);
      results.push(result);
    }
  } catch (error: any) {
    console.error('❌ Erro fatal:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }

  // Resumo
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO:\n');
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  const totalCommands = results.reduce((sum, r) => sum + r.commandsExecuted, 0);

  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.file}`);
    if (result.error) {
      console.log(`   Erro: ${result.error.substring(0, 100)}`);
    }
  });

  console.log(`\n   ✅ Sucesso: ${successCount}/${results.length}`);
  console.log(`   ❌ Falhas: ${failCount}/${results.length}`);
  console.log(`   📝 Total de comandos executados: ${totalCommands}`);
  console.log('='.repeat(60));

  if (failCount === 0) {
    console.log('\n✅ Todas as migrations foram aplicadas com sucesso!');
    console.log('\n💡 Próximo passo:');
    console.log('   npx tsx scripts/verify-complete-status.ts');
  } else {
    console.log('\n⚠️  Algumas migrations falharam. Verifique os erros acima.');
    process.exit(1);
  }
}

// Main
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Aplicar migration específica
    const fileName = args[0];
    const result = await applyMigration(fileName);
    
    if (result.success) {
      console.log('\n✅ Migration aplicada com sucesso!');
      process.exit(0);
    } else {
      console.error('\n❌ Falha ao aplicar migration');
      process.exit(1);
    }
  } else {
    // Aplicar todas as migrations
    await applyAllMigrations();
  }
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});

