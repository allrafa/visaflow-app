/**
 * Script para testar conexão direta ao Supabase e verificar SQLs implementados
 */

import { config } from 'dotenv';
import { Client } from 'pg';

config();

const DIRECT_DATABASE_URL = process.env.DIRECT_DATABASE_URL;

if (!DIRECT_DATABASE_URL) {
  console.error('❌ DIRECT_DATABASE_URL não configurada');
  process.exit(1);
}

async function checkDirectConnection() {
  console.log('🔍 TESTANDO CONEXÃO DIRETA AO SUPABASE\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (!DIRECT_DATABASE_URL) {
    console.error('❌ DIRECT_DATABASE_URL não configurada');
    process.exit(1);
  }

  console.log(`📍 Connection String: ${DIRECT_DATABASE_URL.replace(/:[^:@]+@/, ':****@')}\n`);

  const client = new Client({
    connectionString: DIRECT_DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco PostgreSQL com sucesso!\n');

    // 1. Verificar tabelas existentes
    console.log('1️⃣ VERIFICANDO TABELAS EXISTENTES...\n');
    const tablesResult = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('users', 'processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `);

    console.log(`📊 Tabelas encontradas: ${tablesResult.rows.length}\n`);
    tablesResult.rows.forEach(row => {
      console.log(`   ✅ ${row.tablename}`);
    });

    // 2. Verificar RLS Status
    console.log('\n2️⃣ VERIFICANDO STATUS RLS...\n');
    const rlsResult = await client.query(`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `);

    console.log('📊 Status RLS por tabela:\n');
    rlsResult.rows.forEach(row => {
      const status = row.rowsecurity ? '✅ HABILITADO' : '❌ DESABILITADO';
      console.log(`   ${row.tablename}: ${status}`);
    });

    // 3. Verificar Policies RLS
    console.log('\n3️⃣ VERIFICANDO POLICIES RLS...\n');
    const policiesResult = await client.query(`
      SELECT tablename, policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'public'
      AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename, cmd, policyname;
    `);

    console.log(`📋 Total de policies encontradas: ${policiesResult.rows.length}\n`);
    
    if (policiesResult.rows.length > 0) {
      const policiesByTable: Record<string, typeof policiesResult.rows> = {};
      policiesResult.rows.forEach(p => {
        if (!policiesByTable[p.tablename]) {
          policiesByTable[p.tablename] = [];
        }
        policiesByTable[p.tablename].push(p);
      });

      Object.entries(policiesByTable).forEach(([table, policies]) => {
        console.log(`   ${table}:`);
        policies.forEach(p => {
          console.log(`      ✅ ${p.policyname} (${p.cmd})`);
        });
        console.log('');
      });
    } else {
      console.log('   ⚠️  Nenhuma policy encontrada\n');
    }

    // 4. Verificar Enums
    console.log('4️⃣ VERIFICANDO ENUMS CRIADOS...\n');
    const enumsResult = await client.query(`
      SELECT typname 
      FROM pg_type 
      WHERE typname IN ('ProcessPhase', 'TaskStatus', 'EB1Criteria')
      ORDER BY typname;
    `);

    console.log(`📊 Enums encontrados: ${enumsResult.rows.length}\n`);
    enumsResult.rows.forEach(row => {
      console.log(`   ✅ ${row.typname}`);
    });

    // 5. Verificar Storage Bucket
    console.log('\n5️⃣ VERIFICANDO STORAGE BUCKET...\n');
    const bucketResult = await client.query(`
      SELECT name, public, created_at
      FROM storage.buckets
      WHERE name = 'uploads';
    `);

    if (bucketResult.rows.length > 0) {
      const bucket = bucketResult.rows[0];
      console.log(`   ✅ Bucket "uploads" encontrado`);
      console.log(`      Público: ${bucket.public ? 'Sim' : 'Não'}`);
      console.log(`      Criado em: ${bucket.created_at}\n`);
    } else {
      console.log('   ⚠️  Bucket "uploads" não encontrado\n');
    }

    // 6. Verificar Storage Policies
    console.log('6️⃣ VERIFICANDO STORAGE POLICIES...\n');
    const storagePoliciesResult = await client.query(`
      SELECT policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'storage'
      AND tablename = 'objects'
      ORDER BY cmd, policyname;
    `);

    console.log(`📋 Total de storage policies encontradas: ${storagePoliciesResult.rows.length}\n`);
    if (storagePoliciesResult.rows.length > 0) {
      storagePoliciesResult.rows.forEach(p => {
        console.log(`   ✅ ${p.policyname} (${p.cmd})`);
      });
    } else {
      console.log('   ⚠️  Nenhuma storage policy encontrada\n');
    }

    // Resumo Final
    console.log('\n════════════════════════════════════════════════════════════════════════════════');
    console.log('\n📊 RESUMO FINAL:\n');
    console.log(`   Tabelas: ${tablesResult.rows.length}/7`);
    console.log(`   RLS Habilitado: ${rlsResult.rows.filter(r => r.rowsecurity).length}/6`);
    console.log(`   Policies RLS: ${policiesResult.rows.length}`);
    console.log(`   Enums: ${enumsResult.rows.length}/3`);
    console.log(`   Storage Bucket: ${bucketResult.rows.length > 0 ? 'Sim' : 'Não'}`);
    console.log(`   Storage Policies: ${storagePoliciesResult.rows.length}\n`);

  } catch (error: any) {
    console.error('❌ Erro ao verificar:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  } finally {
    await client.end();
  }
}

checkDirectConnection().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});

