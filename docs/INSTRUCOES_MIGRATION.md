# 📋 INSTRUÇÕES PARA APLICAR MIGRATIONS DO VISAFLOW

**Status:** ⚠️ **AÇÃO MANUAL NECESSÁRIA**

---

## ⚠️ PROBLEMA IDENTIFICADO

O banco de dados atual contém tabelas de **outro projeto (Laro)** que conflitam com as tabelas do VisaFlow:
- Tabela `tasks` já existe mas com estrutura diferente
- Tabela `users` já existe mas com estrutura diferente

---

## ✅ SOLUÇÃO: APLICAR MANUALMENTE NO SUPABASE DASHBOARD

### Passo 1: Acessar Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. **IMPORTANTE:** Confirme que está no projeto correto do VisaFlow
3. Vá em **SQL Editor** → **New Query**

### Passo 2: Aplicar Migration Inicial

1. Abra o arquivo: `supabase/migrations/000_initial_schema.sql`
2. **MODIFIQUE** o SQL antes de executar:

**OPÇÃO A: Se você tem um projeto Supabase DEDICADO para VisaFlow**
- Execute o SQL completo como está

**OPÇÃO B: Se está compartilhando banco com outro projeto**
- Comente ou remova a criação da tabela `users` (linhas 27-35)
- Comente ou remova a criação da tabela `tasks` (linhas 50-63) se já existir
- Execute apenas as tabelas específicas do VisaFlow

### Passo 3: Verificar Criação

Execute este SQL para verificar:

```sql
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename;
```

**Resultado esperado:** 4 tabelas criadas

### Passo 4: Aplicar RLS (se ainda não aplicou)

1. Abra o arquivo: `supabase/migrations/001_enable_rls_safe.sql`
2. Execute TODO o conteúdo
3. Verifique com:

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename;
```

**Resultado esperado:** Todas com `rowsecurity = true`

---

## 🔍 VERIFICAÇÃO FINAL

Execute este SQL completo para verificar tudo:

```sql
-- Verificar tabelas criadas
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
ORDER BY tablename;

-- Verificar RLS habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename;

-- Verificar policies criadas
SELECT COUNT(*) as total_policies 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'uploads', 'criteria_evidences', 'recommendation_letters');
```

---

## 📝 NOTAS IMPORTANTES

1. **Projeto Supabase:** Certifique-se de estar no projeto correto
2. **Conflitos:** Se houver conflitos com tabelas existentes, adapte o SQL
3. **Ordem:** Migration inicial PRIMEIRO, depois RLS
4. **Backup:** Considere fazer backup antes de aplicar migrations

---

**Após aplicar com sucesso, me avise para validarmos tudo!**



