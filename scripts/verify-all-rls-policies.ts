/**
 * Script para verificar todas as políticas RLS aplicadas no banco
 * Valida se todas as tabelas têm RLS habilitado e políticas criadas
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variáveis de ambiente não configuradas');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✅' : '❌');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_KEY ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface TablePolicy {
  tablename: string;
  policyname: string;
  cmd: string; // SELECT, INSERT, UPDATE, DELETE
}

interface TableRLSStatus {
  tablename: string;
  rowsecurity: boolean;
  policies: TablePolicy[];
}

const EXPECTED_TABLES = [
  'processes',
  'tasks',
  'uploads',
  'criteria_evidences',
  'recommendation_letters',
] as const;

const EXPECTED_POLICIES: Record<string, string[]> = {
  processes: ['users_select_own_processes', 'users_insert_own_processes', 'users_update_own_processes', 'users_delete_own_processes'],
  tasks: ['users_select_own_tasks', 'users_insert_own_tasks', 'users_update_own_tasks', 'users_delete_own_tasks'],
  uploads: ['users_select_own_uploads', 'users_insert_own_uploads', 'users_update_own_uploads', 'users_delete_own_uploads'],
  criteria_evidences: ['users_select_own_criteria', 'users_insert_own_criteria', 'users_update_own_criteria'],
  recommendation_letters: ['users_select_own_letters', 'users_insert_own_letters', 'users_update_own_letters'],
};

async function verifyRLS() {
  console.log('🔍 Verificando políticas RLS...\n');

  try {
    // Verificar RLS habilitado nas tabelas
    const { data: tables, error: tablesError } = await supabase.rpc('exec_sql', {
      query: `
        SELECT tablename, rowsecurity 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = ANY($1::text[])
        ORDER BY tablename;
      `,
      params: [EXPECTED_TABLES],
    });

    if (tablesError) {
      // Tentar método alternativo via query direta
      const { data: altTables, error: altError } = await supabase
        .from('pg_tables')
        .select('tablename, rowsecurity')
        .in('tablename', EXPECTED_TABLES);

      if (altError) {
        console.error('❌ Erro ao verificar tabelas:', altError.message);
        console.log('\n💡 Tentando método alternativo...\n');
        
        // Método alternativo: verificar via SQL direto
        await verifyViaDirectSQL();
        return;
      }
    }

    // Verificar políticas criadas
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('tablename, policyname, cmd')
      .in('tablename', EXPECTED_TABLES)
      .order('tablename, policyname');

    if (policiesError) {
      console.error('❌ Erro ao verificar políticas:', policiesError.message);
      console.log('\n💡 Tentando método alternativo via SQL direto...\n');
      await verifyViaDirectSQL();
      return;
    }

    // Processar resultados
    const tableStatus: Record<string, TableRLSStatus> = {};

    EXPECTED_TABLES.forEach(table => {
      tableStatus[table] = {
        tablename: table,
        rowsecurity: false,
        policies: [],
      };
    });

    // Processar tabelas
    if (tables && Array.isArray(tables)) {
      tables.forEach((row: any) => {
        if (tableStatus[row.tablename]) {
          tableStatus[row.tablename].rowsecurity = row.rowsecurity === true;
        }
      });
    }

    // Processar políticas
    if (policies && Array.isArray(policies)) {
      policies.forEach((policy: TablePolicy) => {
        if (tableStatus[policy.tablename]) {
          tableStatus[policy.tablename].policies.push(policy);
        }
      });
    }

    // Exibir resultados
    console.log('📊 RESULTADO DA VALIDAÇÃO:\n');
    console.log('═'.repeat(80));

    let allValid = true;

    EXPECTED_TABLES.forEach(table => {
      const status = tableStatus[table];
      const expectedPolicies = EXPECTED_POLICIES[table] || [];
      const foundPolicies = status.policies.map(p => p.policyname);
      const missingPolicies = expectedPolicies.filter(p => !foundPolicies.includes(p));

      console.log(`\n📋 Tabela: ${table}`);
      console.log(`   RLS Habilitado: ${status.rowsecurity ? '✅' : '❌'}`);
      console.log(`   Políticas encontradas: ${status.policies.length}/${expectedPolicies.length}`);

      if (status.policies.length > 0) {
        status.policies.forEach(policy => {
          const icon = expectedPolicies.includes(policy.policyname) ? '✅' : '⚠️';
          console.log(`   ${icon} ${policy.policyname} (${policy.cmd})`);
        });
      }

      if (missingPolicies.length > 0) {
        console.log(`   ❌ Políticas faltando:`);
        missingPolicies.forEach(p => console.log(`      - ${p}`));
        allValid = false;
      }

      if (!status.rowsecurity) {
        allValid = false;
      }
    });

    console.log('\n' + '═'.repeat(80));

    if (allValid) {
      console.log('\n✅ TODAS AS POLÍTICAS RLS ESTÃO CORRETAS!');
    } else {
      console.log('\n⚠️ ALGUMAS POLÍTICAS ESTÃO FALTANDO OU RLS NÃO ESTÁ HABILITADO');
      console.log('\n💡 Execute a migration 005_add_missing_rls_policies.sql no Supabase Dashboard');
    }

  } catch (error) {
    console.error('❌ Erro ao verificar RLS:', error);
    console.log('\n💡 Tentando método alternativo...\n');
    await verifyViaDirectSQL();
  }
}

async function verifyViaDirectSQL() {
  console.log('📝 Instruções para validação manual:\n');
  console.log('1. Acesse o Supabase Dashboard SQL Editor');
  console.log('2. Execute a seguinte query:\n');
  console.log(`
-- Verificar RLS habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename;

-- Verificar políticas criadas
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename, policyname;
  `);
  console.log('\n3. Compare os resultados com as políticas esperadas listadas acima\n');
}

verifyRLS().catch(console.error);



