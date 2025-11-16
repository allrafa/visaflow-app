/**
 * Script de Validação de RLS Policies
 * Verifica se todas as RLS policies foram aplicadas corretamente
 */

import { config } from 'dotenv';
import { Client } from 'pg';

config();

interface TableRLSStatus {
  tablename: string;
  rowsecurity: boolean;
}

interface PolicyInfo {
  schemaname: string;
  tablename: string;
  policyname: string;
  permissive: string;
  roles: string[];
  cmd: string;
}

async function validateRLS() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada');
  }

  console.log('🔍 Validando RLS Policies...\n');

  // Converter Prisma Accelerate URL para connection string direta se necessário
  // Se estiver usando Accelerate, precisamos da connection string direta
  let connectionString = databaseUrl;
  
  // Se for Prisma Accelerate URL, tentar extrair connection string direta
  if (databaseUrl.includes('prisma.accelerate')) {
    console.log('⚠️  Detectado Prisma Accelerate URL');
    console.log('   Tentando usar connection string direta...\n');
    
    // Tentar usar SUPABASE_DIRECT_DATABASE_URL se disponível
    const directUrl = process.env.SUPABASE_DIRECT_DATABASE_URL;
    if (directUrl) {
      connectionString = directUrl;
    } else {
      console.log('❌ SUPABASE_DIRECT_DATABASE_URL não encontrada.');
      console.log('   Para validar RLS, você precisa:');
      console.log('   1. Obter connection string direta do Supabase Dashboard');
      console.log('   2. Adicionar SUPABASE_DIRECT_DATABASE_URL no .env');
      console.log('   OU');
      console.log('   3. Validar manualmente via Supabase Dashboard SQL Editor\n');
      process.exit(1);
    }
  }

  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // 1. Verificar RLS habilitado nas tabelas
    console.log('1️⃣ Verificando RLS habilitado nas tabelas...');
    const rlsCheck = await client.query<TableRLSStatus>(`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('users', 'processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
      ORDER BY tablename;
    `);

    const expectedTables = [
      'users',
      'processes',
      'tasks',
      'uploads',
      'criteria_evidences',
      'recommendation_letters',
      'audit_logs',
    ];

    let allRLSEnabled = true;
    const foundTables = rlsCheck.rows.map((r) => r.tablename);

    for (const table of expectedTables) {
      const status = rlsCheck.rows.find((r) => r.tablename === table);
      if (!status) {
        console.log(`   ❌ ${table}: Tabela não encontrada`);
        allRLSEnabled = false;
      } else if (!status.rowsecurity) {
        console.log(`   ❌ ${table}: RLS desabilitado`);
        allRLSEnabled = false;
      } else {
        console.log(`   ✅ ${table}: RLS habilitado`);
      }
    }

    if (!allRLSEnabled) {
      console.log('\n❌ Algumas tabelas não têm RLS habilitado!');
      console.log('   Execute o SQL em: supabase/migrations/001_enable_rls.sql\n');
      await client.end();
      process.exit(1);
    }

    // 2. Verificar policies criadas
    console.log('\n2️⃣ Verificando policies criadas...');
    const policiesCheck = await client.query<PolicyInfo>(`
      SELECT schemaname, tablename, policyname, permissive, roles, cmd
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname;
    `);

    const policiesByTable: Record<string, PolicyInfo[]> = {};
    for (const policy of policiesCheck.rows) {
      if (!policiesByTable[policy.tablename]) {
        policiesByTable[policy.tablename] = [];
      }
      policiesByTable[policy.tablename].push(policy);
    }

    // Contar policies esperadas por tabela
    const expectedPolicies: Record<string, number> = {
      processes: 4, // SELECT, INSERT, UPDATE, DELETE
      tasks: 4,
      uploads: 3, // SELECT, INSERT, DELETE (sem UPDATE)
      criteria_evidences: 4,
      recommendation_letters: 4,
      audit_logs: 2, // SELECT, INSERT (sem UPDATE/DELETE)
      users: 0, // Users geralmente não tem policies customizadas (gerenciado pelo Supabase Auth)
    };

    let allPoliciesOk = true;
    for (const [table, expectedCount] of Object.entries(expectedPolicies)) {
      const actualPolicies = policiesByTable[table] || [];
      if (actualPolicies.length < expectedCount) {
        console.log(`   ❌ ${table}: Esperado ${expectedCount} policies, encontrado ${actualPolicies.length}`);
        allPoliciesOk = false;
      } else {
        console.log(`   ✅ ${table}: ${actualPolicies.length} policies encontradas`);
        // Listar policies
        actualPolicies.forEach((p) => {
          console.log(`      - ${p.policyname} (${p.cmd})`);
        });
      }
    }

    const totalPolicies = policiesCheck.rows.length;
    console.log(`\n   📊 Total de policies: ${totalPolicies}`);

    if (!allPoliciesOk) {
      console.log('\n⚠️  Algumas policies estão faltando!');
      console.log('   Execute o SQL em: supabase/migrations/001_enable_rls.sql\n');
    }

    // 3. Verificar estrutura das policies (verificar se usam auth.uid())
    console.log('\n3️⃣ Verificando estrutura das policies...');
    const policyDefinitions = await client.query(`
      SELECT 
        tablename,
        policyname,
        pg_get_expr(polqual, 'pg_class'::regclass) as using_expression,
        pg_get_expr(polwithcheck, 'pg_class'::regclass) as with_check_expression
      FROM pg_policies p
      JOIN pg_policy pol ON pol.polrelid = (SELECT oid FROM pg_class WHERE relname = p.tablename)
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname;
    `);

    // Verificar se policies usam auth.uid()
    let authUidUsed = false;
    for (const policy of policyDefinitions.rows) {
      const usingExpr = policy.using_expression || '';
      const withCheckExpr = policy.with_check_expression || '';
      
      if (usingExpr.includes('auth.uid()') || withCheckExpr.includes('auth.uid()')) {
        authUidUsed = true;
        break;
      }
    }

    if (authUidUsed) {
      console.log('   ✅ Policies usam auth.uid() corretamente');
    } else {
      console.log('   ⚠️  Não foi possível verificar uso de auth.uid() nas policies');
      console.log('   (Isso é normal se usando Prisma Accelerate)');
    }

    // Resumo final
    console.log('\n' + '='.repeat(60));
    if (allRLSEnabled && allPoliciesOk) {
      console.log('✅ VALIDAÇÃO COMPLETA: RLS Policies aplicadas corretamente!');
      console.log('='.repeat(60));
      await client.end();
      process.exit(0);
    } else {
      console.log('❌ VALIDAÇÃO FALHOU: Algumas configurações estão faltando');
      console.log('='.repeat(60));
      await client.end();
      process.exit(1);
    }

  } catch (error: any) {
    console.error('\n❌ Erro ao validar RLS:', error.message);
    
    if (error.message.includes('auth') || error.message.includes('schema')) {
      console.error('\n💡 O schema "auth" pode não estar disponível via Prisma Accelerate.');
      console.error('   Para validar RLS completamente, use o Supabase Dashboard SQL Editor.');
      console.error('   Ou forneça SUPABASE_DIRECT_DATABASE_URL no .env\n');
    }
    
    await client.end();
    process.exit(1);
  }
}

validateRLS().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



