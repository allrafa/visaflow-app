# 🔍 Verificar se Migration 007 foi Aplicada Corretamente

**Data:** Janeiro 2025  
**Status:** ⏳ **AGUARDANDO VERIFICAÇÃO**

---

## 📊 SITUAÇÃO ATUAL

Você aplicou a migration `007_APPLY_ALL_RLS_COMPLETE.sql` manualmente no Supabase Dashboard. Agora precisamos verificar se foi aplicada corretamente.

**Problema:** Os scripts automáticos de verificação não funcionam porque:
- ❌ Prisma Accelerate não tem acesso a views do sistema (`pg_tables`, `pg_policies`)
- ❌ Connection string direta tem problemas de DNS (`getaddrinfo ENOTFOUND`)

**Solução:** Verificar diretamente no Supabase Dashboard usando SQL

---

## ✅ MÉTODO: Verificação via SQL Editor

### Passo 1: Acessar SQL Editor

1. **Acesse:** https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new
2. Você será redirecionado para o SQL Editor

### Passo 2: Executar Query de Verificação

**Opção A: Usar arquivo gerado automaticamente**

1. Abra o arquivo: `/Users/rafaraio/.cursor/projects/visaflow-app/supabase/verification_query.sql`
2. Copie TODO o conteúdo (Cmd+A, Cmd+C)
3. Cole no SQL Editor
4. Execute (Run ou Cmd+Enter)

**Opção B: Executar query abaixo diretamente**

```sql
-- ============================================
-- VERIFICAÇÃO COMPLETA DE RLS E POLICIES
-- ============================================

-- 1. VERIFICAR RLS STATUS (deve mostrar 6 tabelas com RLS = true)
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

-- 2. VERIFICAR POLICIES RLS (deve mostrar 18 policies)
SELECT 
  tablename as "Tabela",
  policyname as "Policy",
  cmd as "Comando"
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

-- 4. VERIFICAR STORAGE POLICIES (deve mostrar 4 policies)
SELECT 
  policyname as "Policy",
  cmd as "Comando"
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%uploads%'
ORDER BY cmd, policyname;

-- 5. RESUMO FINAL
SELECT 
  'RLS Habilitado' as "Verificação",
  COUNT(*) FILTER (WHERE rowsecurity = true) as "Tabelas com RLS",
  COUNT(*) FILTER (WHERE rowsecurity = false) as "Tabelas sem RLS"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')

UNION ALL

SELECT 
  'Policies RLS' as "Verificação",
  COUNT(*) as "Total de Policies",
  0 as "Tabelas sem RLS"
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')

UNION ALL

SELECT 
  'Storage Policies' as "Verificação",
  COUNT(*) as "Total de Policies",
  0 as "Tabelas sem RLS"
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%uploads%';
```

### Passo 3: Analisar Resultados

**✅ RESULTADO ESPERADO (Migration aplicada corretamente):**

#### Query 1 - RLS Status:
- ✅ `processes` - RLS Habilitado: **true** ✅ SIM
- ✅ `tasks` - RLS Habilitado: **true** ✅ SIM
- ✅ `uploads` - RLS Habilitado: **true** ✅ SIM
- ✅ `criteria_evidences` - RLS Habilitado: **true** ✅ SIM
- ✅ `recommendation_letters` - RLS Habilitado: **true** ✅ SIM
- ✅ `audit_logs` - RLS Habilitado: **true** ✅ SIM

**Total:** 6 tabelas com RLS habilitado

#### Query 2 - Policies RLS:
- ✅ `processes`: 4 policies (SELECT, INSERT, UPDATE, DELETE)
- ✅ `tasks`: 4 policies (SELECT, INSERT, UPDATE, DELETE)
- ✅ `uploads`: 4 policies (SELECT, INSERT, UPDATE, DELETE)
- ✅ `criteria_evidences`: 3 policies (SELECT, INSERT, UPDATE)
- ✅ `recommendation_letters`: 3 policies (SELECT, INSERT, UPDATE)

**Total:** 18 policies RLS

#### Query 3 - Storage Policies:
- ✅ `users_select_own_uploads_storage` (SELECT)
- ✅ `users_insert_own_uploads_storage` (INSERT)
- ✅ `users_update_own_uploads_storage` (UPDATE)
- ✅ `users_delete_own_uploads_storage` (DELETE)

**Total:** 4 storage policies

#### Query 4 - Resumo Final:
- ✅ RLS Habilitado: **6 tabelas com RLS**, 0 sem RLS
- ✅ Policies RLS: **18 policies**
- ✅ Storage Policies: **4 policies**

---

## ❌ SE ALGO ESTIVER FALTANDO

### Se RLS não está habilitado em alguma tabela:

Execute no SQL Editor:

```sql
ALTER TABLE [nome_da_tabela] ENABLE ROW LEVEL SECURITY;
```

Substitua `[nome_da_tabela]` por: `processes`, `tasks`, `uploads`, `criteria_evidences`, `recommendation_letters`, ou `audit_logs`

### Se Policies RLS estão faltando:

Reaplique a migration `007_APPLY_ALL_RLS_COMPLETE.sql`:
1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new
2. Abra: `/Users/rafaraio/.cursor/projects/visaflow-app/supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql`
3. Copie e cole TODO o conteúdo
4. Execute

**Nota:** A migration usa `DROP POLICY IF EXISTS`, então pode executar múltiplas vezes sem problemas.

### Se Storage Policies estão faltando:

Execute a parte de Storage Policies da migration 007:

```sql
-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "users_select_own_uploads_storage" ON storage.objects;
DROP POLICY IF EXISTS "users_insert_own_uploads_storage" ON storage.objects;
DROP POLICY IF EXISTS "users_delete_own_uploads_storage" ON storage.objects;
DROP POLICY IF EXISTS "users_update_own_uploads_storage" ON storage.objects;

-- Criar políticas (copie da migration 007, linhas 280-342)
```

---

## 📋 CHECKLIST DE VERIFICAÇÃO

Após executar a query SQL, verifique:

- [ ] **6 tabelas** com RLS habilitado (processes, tasks, uploads, criteria_evidences, recommendation_letters, audit_logs)
- [ ] **18 policies RLS** criadas (4+4+4+3+3)
- [ ] **4 storage policies** criadas para bucket "uploads"
- [ ] Todas as policies têm os nomes corretos (conforme migration 007)

---

## 🎯 PRÓXIMOS PASSOS APÓS VERIFICAÇÃO

Se tudo estiver ✅:

1. ✅ **Testar funcionalidades:**
   - Login no sistema
   - Criar processo
   - Criar task
   - Fazer upload de arquivo

2. ✅ **Executar testes:**
   ```bash
   npm run test
   ```

3. ✅ **Verificar build:**
   ```bash
   npm run build
   ```

---

## 📝 NOTAS IMPORTANTES

- ⚠️ **A migration é idempotente:** Pode executar múltiplas vezes sem problemas
- ⚠️ **Não deleta dados:** Apenas habilita RLS e cria policies
- ⚠️ **Seguro:** Usa `DROP POLICY IF EXISTS` para evitar erros

---

**Status:** ⏳ **AGUARDANDO VERIFICAÇÃO VIA SQL EDITOR**

**Última atualização:** Janeiro 2025




