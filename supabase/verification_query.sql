
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
