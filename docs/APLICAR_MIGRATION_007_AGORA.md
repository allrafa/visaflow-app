# 🚀 Aplicar Migration 007 - RLS Completo (AGORA)

**Data:** Janeiro 2025  
**Prioridade:** 🔴 **CRÍTICA** - Bloqueia funcionalidades completas  
**Tempo estimado:** 5-10 minutos

---

## 📋 RESUMO

A migration `007_APPLY_ALL_RLS_COMPLETE.sql` consolida **TUDO** de uma vez:
- ✅ Habilita RLS em 6 tabelas
- ✅ Cria 18 policies RLS
- ✅ Cria 4 storage policies

**Total:** 22 policies criadas automaticamente

---

## 🎯 MÉTODO: Aplicação Manual no Dashboard

### Passo 1: Acessar SQL Editor

1. **Acesse:** https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new
2. Você será redirecionado para o SQL Editor

### Passo 2: Abrir Arquivo da Migration

**Arquivo:** `/Users/rafaraio/.cursor/projects/visaflow-app/supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql`

**Ou copie o caminho completo:**
```
/Users/rafaraio/.cursor/projects/visaflow-app/supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql
```

### Passo 3: Copiar Todo o Conteúdo

1. Abra o arquivo no editor de texto
2. Selecione **TUDO** (Cmd+A ou Ctrl+A)
3. Copie (Cmd+C ou Ctrl+C)

### Passo 4: Colar no SQL Editor

1. No SQL Editor do Supabase Dashboard
2. Cole o conteúdo (Cmd+V ou Ctrl+V)
3. Verifique que todo o SQL foi colado (deve ter ~354 linhas)

### Passo 5: Executar

1. Clique no botão **Run** (ou pressione Cmd+Enter / Ctrl+Enter)
2. Aguarde a execução (pode levar alguns segundos)
3. Verifique se apareceu mensagem de sucesso

---

## ✅ VALIDAÇÃO APÓS APLICAÇÃO

Execute este script para verificar se tudo foi aplicado corretamente:

```bash
cd /Users/rafaraio/.cursor/projects/visaflow-app
npx tsx scripts/verify-complete-status.ts
```

**O que verificar:**
- ✅ Todas as 6 tabelas com RLS habilitado
- ✅ 18 policies RLS criadas
- ✅ 4 storage policies criadas

---

## 🛠️ TROUBLESHOOTING

### Erro: "policy already exists"

**✅ NORMAL** - Significa que a policy já existe. A migration usa `DROP POLICY IF EXISTS`, então pode executar novamente sem problemas.

### Erro: "table does not exist"

**❌ PROBLEMA** - Significa que as tabelas não foram criadas ainda. Execute primeiro:
- `000_initial_schema.sql` ou
- `002_create_visaflow_tables_only.sql`

### Erro: "permission denied"

**❌ PROBLEMA** - Verifique se está logado no Dashboard com conta que tem acesso ao projeto.

---

## 📊 O QUE A MIGRATION FAZ

### 1. Habilita RLS em 6 Tabelas:
- `processes`
- `tasks`
- `uploads`
- `criteria_evidences`
- `recommendation_letters`
- `audit_logs`

### 2. Cria Policies RLS (18 total):

**Processes (4 policies):**
- `users_select_own_processes`
- `users_insert_own_processes`
- `users_update_own_processes`
- `users_delete_own_processes`

**Tasks (4 policies):**
- `users_select_own_tasks`
- `users_insert_own_tasks`
- `users_update_own_tasks`
- `users_delete_own_tasks`

**Uploads (4 policies):**
- `users_select_own_uploads`
- `users_insert_own_uploads`
- `users_update_own_uploads`
- `users_delete_own_uploads`

**Criteria Evidences (3 policies):**
- `users_select_own_criteria`
- `users_insert_own_criteria`
- `users_update_own_criteria`

**Recommendation Letters (3 policies):**
- `users_select_own_letters`
- `users_insert_own_letters`
- `users_update_own_letters`

### 3. Cria Storage Policies (4 total):

**Bucket "uploads":**
- `users_select_own_uploads_storage`
- `users_insert_own_uploads_storage`
- `users_update_own_uploads_storage`
- `users_delete_own_uploads_storage`

---

## 🎯 PRÓXIMOS PASSOS APÓS APLICAÇÃO

1. ✅ **Validar aplicação:** `npx tsx scripts/verify-complete-status.ts`
2. ✅ **Executar testes:** `npm run test`
3. ✅ **Testar funcionalidades:** Login e criar processo
4. ✅ **Verificar uploads:** Testar upload de arquivos

---

## 📝 NOTAS IMPORTANTES

- ⚠️ **Esta migration é idempotente:** Pode executar múltiplas vezes sem problemas
- ⚠️ **Não deleta dados:** Apenas habilita RLS e cria policies
- ⚠️ **Seguro:** Usa `DROP POLICY IF EXISTS` para evitar erros

---

**Status:** ⏳ **AGUARDANDO APLICAÇÃO MANUAL**

**Última atualização:** Janeiro 2025




