/**
 * Script para aplicar RLS Policies diretamente no Supabase
 * Necessário porque Prisma Accelerate não tem acesso ao schema auth
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';

config();

async function applyRLSPolicies() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada');
  }

  // Converter Prisma Accelerate URL para connection string direta
  // Se estiver usando Accelerate, precisamos da connection string direta do Supabase
  // Por enquanto, vamos tentar usar a URL diretamente ou pedir ao usuário para fornecer
  
  console.log('⚠️  ATENÇÃO: Este script precisa de uma connection string direta do Supabase');
  console.log('   (não Prisma Accelerate) para aplicar RLS policies.');
  console.log('');
  console.log('📋 Opções:');
  console.log('   1. Aplicar manualmente via Supabase Dashboard SQL Editor');
  console.log('   2. Fornecer SUPABASE_DIRECT_DATABASE_URL no .env');
  console.log('');
  
  // Tentar ler SUPABASE_DIRECT_DATABASE_URL se existir
  const directUrl = process.env.SUPABASE_DIRECT_DATABASE_URL;
  
  if (!directUrl) {
    console.log('❌ SUPABASE_DIRECT_DATABASE_URL não encontrada.');
    console.log('');
    console.log('💡 Para aplicar RLS policies:');
    console.log('   1. Acesse: https://supabase.com/dashboard/project/[PROJECT_REF]/sql/new');
    console.log('   2. Cole o conteúdo de: supabase/migrations/001_enable_rls.sql');
    console.log('   3. Execute o SQL');
    console.log('');
    console.log('📄 Arquivo SQL: supabase/migrations/001_enable_rls.sql');
    process.exit(0);
  }

  console.log('🔗 Conectando ao banco Supabase...');
  
  const client = new Client({
    connectionString: directUrl,
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco');

    // Ler arquivo SQL
    const sqlFile = join(process.cwd(), 'supabase/migrations/001_enable_rls.sql');
    const sql = readFileSync(sqlFile, 'utf-8');

    console.log('📝 Aplicando RLS policies...');
    await client.query(sql);
    
    console.log('✅ RLS policies aplicadas com sucesso!');
    
    // Verificar RLS habilitado
    const rlsCheck = await client.query(`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('users', 'processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `);
    
    console.log('');
    console.log('📊 Status RLS:');
    rlsCheck.rows.forEach((row) => {
      const status = row.rowsecurity ? '✅' : '❌';
      console.log(`   ${status} ${row.tablename}: RLS ${row.rowsecurity ? 'habilitado' : 'desabilitado'}`);
    });
    
    // Contar policies
    const policiesCheck = await client.query(`
      SELECT COUNT(*) as count 
      FROM pg_policies 
      WHERE schemaname = 'public';
    `);
    
    console.log('');
    console.log(`📋 Total de policies criadas: ${policiesCheck.rows[0].count}`);
    
  } catch (error: any) {
    console.error('❌ Erro ao aplicar RLS policies:', error.message);
    if (error.message.includes('auth')) {
      console.error('');
      console.error('💡 O schema "auth" não está disponível.');
      console.error('   Isso é normal - as policies precisam ser aplicadas diretamente no Supabase.');
      console.error('   Use o Supabase Dashboard SQL Editor para aplicar manualmente.');
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

applyRLSPolicies().catch(console.error);



