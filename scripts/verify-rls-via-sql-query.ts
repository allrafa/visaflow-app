/**
 * Script para gerar query SQL de verificação que pode ser executada no Dashboard
 * Como a connection string direta tem problemas de DNS, vamos gerar a query
 * para o usuário executar manualmente no SQL Editor do Supabase
 */

import * as fs from 'fs';
import * as path from 'path';

const verificationQuery = `
-- ============================================
-- VERIFICAÇÃO COMPLETA DE RLS E POLICIES
-- Execute esta query no SQL Editor do Supabase Dashboard
-- ============================================

-- 1. VERIFICAR RLS STATUS
SELECT 
  tablename,
  rowsecurity as "RLS Habilitado",
  CASE 
    WHEN rowsecurity THEN '✅ SIM'
    ELSE '❌ NÃO'
  END as "Status"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
ORDER BY tablename;

-- 2. VERIFICAR POLICIES RLS POR TABELA
SELECT 
  tablename as "Tabela",
  policyname as "Policy",
  cmd as "Comando",
  CASE 
    WHEN cmd = 'SELECT' THEN '🔍 Leitura'
    WHEN cmd = 'INSERT' THEN '➕ Inserção'
    WHEN cmd = 'UPDATE' THEN '✏️ Atualização'
    WHEN cmd = 'DELETE' THEN '🗑️ Deleção'
    ELSE cmd
  END as "Tipo"
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
ORDER BY tablename, cmd, policyname;

-- 3. RESUMO DE POLICIES POR TABELA
SELECT 
  tablename as "Tabela",
  COUNT(*) as "Total de Policies",
  COUNT(CASE WHEN cmd = 'SELECT' THEN 1 END) as "SELECT",
  COUNT(CASE WHEN cmd = 'INSERT' THEN 1 END) as "INSERT",
  COUNT(CASE WHEN cmd = 'UPDATE' THEN 1 END) as "UPDATE",
  COUNT(CASE WHEN cmd = 'DELETE' THEN 1 END) as "DELETE"
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
GROUP BY tablename
ORDER BY tablename;

-- 4. VERIFICAR STORAGE POLICIES
SELECT 
  policyname as "Policy",
  cmd as "Comando",
  CASE 
    WHEN cmd = 'SELECT' THEN '🔍 Leitura'
    WHEN cmd = 'INSERT' THEN '➕ Inserção'
    WHEN cmd = 'UPDATE' THEN '✏️ Atualização'
    WHEN cmd = 'DELETE' THEN '🗑️ Deleção'
    ELSE cmd
  END as "Tipo"
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%uploads%'
ORDER BY cmd, policyname;

-- 5. RESUMO FINAL
SELECT 
  'RLS Habilitado' as "Verificação",
  COUNT(*) FILTER (WHERE rowsecurity = true) as "Tabelas com RLS",
  COUNT(*) FILTER (WHERE rowsecurity = false) as "Tabelas sem RLS",
  COUNT(*) as "Total de Tabelas"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')

UNION ALL

SELECT 
  'Policies RLS' as "Verificação",
  COUNT(*) as "Total de Policies",
  0 as "Tabelas sem RLS",
  0 as "Total de Tabelas"
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')

UNION ALL

SELECT 
  'Storage Policies' as "Verificação",
  COUNT(*) as "Total de Policies",
  0 as "Tabelas sem RLS",
  0 as "Total de Tabelas"
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%uploads%';
`;

async function main() {
  console.log('📝 GERANDO QUERY SQL DE VERIFICAÇÃO\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const outputPath = path.resolve(__dirname, '..', 'supabase', 'verification_query.sql');
  
  fs.writeFileSync(outputPath, verificationQuery, 'utf-8');
  
  console.log('✅ Query SQL gerada com sucesso!\n');
  console.log(`📄 Arquivo: ${outputPath}\n`);
  console.log('📋 INSTRUÇÕES:\n');
  console.log('1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new');
  console.log('2. Abra o arquivo acima ou copie o conteúdo');
  console.log('3. Cole no SQL Editor');
  console.log('4. Execute (Run ou Cmd+Enter)');
  console.log('5. Analise os resultados:\n');
  console.log('   ✅ ESPERADO:');
  console.log('   - 6 tabelas com RLS habilitado');
  console.log('   - 18 policies RLS (4 para processes, 4 para tasks, 4 para uploads, 3 para criteria, 3 para letters)');
  console.log('   - 4 storage policies para bucket "uploads"\n');
}

main().catch((error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});



