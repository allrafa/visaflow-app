# 🚀 Aplicar Migration 007 - RLS Completo

**Data:** Janeiro 2025  
**Status:** ⚠️ **NECESSÁRIA APLICAÇÃO**

---

## 📋 SITUAÇÃO ATUAL

### ✅ O que está funcionando:
- ✅ Todas as 7 tabelas existem e estão acessíveis
- ✅ Bucket `uploads` criado no Supabase Dashboard
- ✅ Conexão com Supabase funcionando perfeitamente

### ❌ O que precisa ser corrigido:
- ❌ RLS está **DESABILITADO** em todas as tabelas
- ❌ **Nenhuma policy RLS** foi criada (migration 005 não aplicada corretamente)
- ❌ **Nenhuma storage policy** foi criada (migration 006 não aplicada corretamente)

---

## 🔧 SOLUÇÃO: Migration 007 Consolidada

Criei uma migration consolidada (`007_APPLY_ALL_RLS_COMPLETE.sql`) que:
1. ✅ Habilita RLS em todas as tabelas
2. ✅ Cria todas as 18 policies RLS
3. ✅ Cria todas as 4 storage policies

**Total:** 22 policies serão criadas

---

## 📝 PASSO A PASSO PARA APLICAR

### Passo 1: Acessar SQL Editor do Supabase

1. Acesse: https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new
2. Certifique-se de estar no projeto correto: `jsnvrhbeedkifqwmsumc`

---

### Passo 2: Copiar Migration 007

1. Abra o arquivo: `supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql`
2. **Copie TODO o conteúdo** (todo o arquivo)
3. Cole no SQL Editor do Supabase

---

### Passo 3: Executar Migration

1. Clique em **"Run"** ou pressione `Ctrl+Enter` (Mac: `Cmd+Enter`)
2. **Aguarde a execução completa**
3. **Verifique mensagens de sucesso/erro**

**O que deve acontecer:**
- ✅ 6 mensagens de RLS habilitado
- ✅ 18 mensagens de policies criadas
- ✅ 4 mensagens de storage policies criadas
- ✅ Total: 22 policies criadas

---

### Passo 4: Validar Aplicação

Após executar, execute este comando no terminal:

```bash
npx tsx scripts/verify-complete-status.ts
```

**Resultado esperado:**
- ✅ RLS habilitado em todas as 6 tabelas
- ✅ 18 policies RLS criadas
- ✅ 4 storage policies criadas
- ✅ Sistema pronto para uso

---

## 🔍 VERIFICAÇÃO MANUAL (Opcional)

### Verificar RLS Habilitado

Execute no SQL Editor:

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
ORDER BY tablename;
```

**Resultado esperado:** Todas com `rowsecurity = true`

---

### Verificar Policies RLS

Execute no SQL Editor:

```sql
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
GROUP BY tablename
ORDER BY tablename;
```

**Resultado esperado:**
- `processes`: 4 policies
- `tasks`: 4 policies
- `uploads`: 4 policies
- `criteria_evidences`: 3 policies
- `recommendation_letters`: 3 policies
- **Total:** 18 policies

---

### Verificar Storage Policies

Execute no SQL Editor:

```sql
SELECT policyname, cmd
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%uploads%'
ORDER BY cmd;
```

**Resultado esperado:** 4 policies listadas

---

## ⚠️ POSSÍVEIS ERROS E SOLUÇÕES

### Erro: "relation does not exist"
**Causa:** Tabela não existe  
**Solução:** Verificar se todas as tabelas foram criadas primeiro

### Erro: "policy already exists"
**Causa:** Policy já existe com nome diferente  
**Solução:** A migration usa `DROP POLICY IF EXISTS`, então deve funcionar. Se persistir, verificar nomes das policies existentes.

### Erro: "permission denied"
**Causa:** Permissões insuficientes  
**Solução:** Certifique-se de estar usando o SQL Editor do Supabase Dashboard (não precisa de permissões especiais)

---

## ✅ CHECKLIST DE APLICAÇÃO

- [ ] Passo 1: Acessar SQL Editor do Supabase
- [ ] Passo 2: Copiar migration 007 completa
- [ ] Passo 3: Executar migration
- [ ] Passo 4: Verificar mensagens de sucesso
- [ ] Passo 5: Validar com script de verificação
- [ ] Passo 6: Verificar manualmente (opcional)

---

## 📊 RESULTADO ESPERADO

Após aplicar corretamente:

```
✅ RLS habilitado em 6 tabelas
✅ 18 policies RLS criadas
✅ 4 storage policies criadas
✅ Sistema 100% funcional
```

---

## 🎯 PRÓXIMOS PASSOS APÓS APLICAR

1. ✅ Validar com script de verificação
2. ✅ Testar criação de processo
3. ✅ Testar criação de task
4. ✅ Testar upload de arquivo
5. ✅ Testar isolamento entre usuários (RLS funcionando)

---

**Última atualização:** Janeiro 2025  
**Status:** ⚠️ **AGUARDANDO APLICAÇÃO DA MIGRATION 007**




