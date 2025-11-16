# 🚀 APLICAR MIGRATION RLS - INSTRUÇÕES RÁPIDAS

**Data:** Janeiro 2025  
**Status:** 🔴 **AÇÃO NECESSÁRIA**

---

## ⚡ AÇÃO NECESSÁRIA

A migration RLS precisa ser aplicada manualmente no Supabase Dashboard porque a connection string direta não está funcionando (problema de DNS).

---

## 📋 PASSOS PARA APLICAR

### 1. Acessar SQL Editor do Supabase

**URL:** https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new

### 2. Copiar o SQL da Migration

**Arquivo:** `supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql`

**Localização completa:**
```
/Users/rafaraio/.cursor/projects/visaflow-app/supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql
```

### 3. Colar e Executar

1. Abra o arquivo SQL acima
2. Selecione TODO o conteúdo (Cmd+A)
3. Copie (Cmd+C)
4. Cole no SQL Editor do Supabase
5. Clique em **Run** ou pressione **Cmd+Enter**

### 4. Verificar Aplicação

Após executar, execute este comando para verificar:

```bash
npx tsx scripts/verify-complete-status.ts
```

**O que deve aparecer:**
- ✅ RLS habilitado em todas as 6 tabelas
- ✅ 18 policies RLS criadas
- ✅ 4 storage policies criadas

---

## 📊 O QUE A MIGRATION FAZ

A migration `007_APPLY_ALL_RLS_COMPLETE.sql`:

1. **Habilita RLS** em 6 tabelas:
   - `processes`
   - `tasks`
   - `uploads`
   - `criteria_evidences`
   - `recommendation_letters`
   - `audit_logs`

2. **Cria 18 Policies RLS:**
   - 4 policies para `processes` (SELECT, INSERT, UPDATE, DELETE)
   - 4 policies para `tasks` (SELECT, INSERT, UPDATE, DELETE)
   - 4 policies para `uploads` (SELECT, INSERT, UPDATE, DELETE)
   - 3 policies para `criteria_evidences` (SELECT, INSERT, UPDATE)
   - 3 policies para `recommendation_letters` (SELECT, INSERT, UPDATE)

3. **Cria 4 Storage Policies:**
   - SELECT, INSERT, UPDATE, DELETE para bucket `uploads`

**Total:** 22 policies criadas

---

## ✅ APÓS APLICAR

Depois de aplicar a migration, execute os testes:

```bash
# 1. Verificar status
npx tsx scripts/verify-complete-status.ts

# 2. Executar testes unitários
npm run test:unit

# 3. Executar testes de integração
npm run test:integration

# 4. Executar scripts de teste
npm run test:all
```

---

## 🚨 TROUBLESHOOTING

### Erro: "relation does not exist"
- **Causa:** Tabelas não foram criadas ainda
- **Solução:** Aplicar primeiro `000_initial_schema.sql` ou `002_create_visaflow_tables_only.sql`

### Erro: "policy already exists"
- **Causa:** Policies já foram criadas anteriormente
- **Solução:** A migration usa `DROP POLICY IF EXISTS`, então pode executar novamente sem problemas

### Erro: "permission denied"
- **Causa:** Não tem permissão para executar SQL
- **Solução:** Verificar se está logado no Supabase Dashboard com permissões de admin

---

**Última Atualização:** Janeiro 2025  
**Próximo Passo:** Aplicar migration no Dashboard e executar testes



