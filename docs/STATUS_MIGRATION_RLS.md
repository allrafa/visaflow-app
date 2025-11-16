# 📊 STATUS: Migration RLS - Aplicação Necessária

**Data:** Janeiro 2025  
**Status:** 🔴 **AGUARDANDO APLICAÇÃO MANUAL**

---

## ⚠️ SITUAÇÃO ATUAL

### Problema Identificado

A aplicação automática de migrations não está funcionando porque:

1. **Connection String Direta:** Erro DNS (`getaddrinfo ENOTFOUND`)
   - A URL `db.jsnvrhbeedkifqwmsumc.supabase.co` não está resolvendo
   - Pode ser problema de rede ou formato da URL

2. **Supabase API:** Não permite executar SQL arbitrário
   - Por questões de segurança, o Supabase não expõe função RPC padrão para executar SQL
   - A função `exec_sql` não existe no projeto

### Solução Necessária

**Aplicar manualmente no Supabase Dashboard** é a única forma viável no momento.

---

## 📋 INSTRUÇÕES PARA APLICAR

### Passo 1: Acessar SQL Editor

**URL:** https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new

### Passo 2: Copiar Migration SQL

**Arquivo:** `supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql`

**Caminho completo:**
```
/Users/rafaraio/.cursor/projects/visaflow-app/supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql
```

**Tamanho:** 354 linhas

### Passo 3: Executar

1. Abra o arquivo SQL
2. Selecione TODO o conteúdo (Cmd+A)
3. Copie (Cmd+C)
4. Cole no SQL Editor do Supabase
5. Clique em **Run** ou pressione **Cmd+Enter**

### Passo 4: Verificar

Após executar, execute:

```bash
npx tsx scripts/verify-complete-status.ts
```

**Resultado esperado:**
- ✅ RLS habilitado em 6 tabelas
- ✅ 18 policies RLS criadas
- ✅ 4 storage policies criadas

---

## ✅ APÓS APLICAR - EXECUTAR TESTES

Depois de aplicar a migration, execute os testes na ordem:

```bash
# 1. Verificar status RLS
npx tsx scripts/verify-complete-status.ts

# 2. Executar testes unitários
npm run test:unit

# 3. Executar testes de integração
npm run test:integration

# 4. Executar scripts de teste
npm run test:all

# 5. Executar testes E2E (se servidor estiver rodando)
npm run test:e2e
```

---

## 📊 O QUE A MIGRATION FAZ

A migration `007_APPLY_ALL_RLS_COMPLETE.sql` aplica:

1. **RLS Habilitado** em 6 tabelas
2. **18 Policies RLS** criadas
3. **4 Storage Policies** criadas

**Total:** 22 policies de segurança

---

## 🔧 ALTERNATIVAS FUTURAS

Para aplicar automaticamente no futuro, podemos:

1. **Corrigir Connection String:**
   - Verificar formato correto da URL do Supabase
   - Testar conexão direta ao PostgreSQL

2. **Criar Função RPC Customizada:**
   - Criar função `exec_sql` no Supabase
   - Permitir execução de SQL via RPC (com segurança)

3. **Usar Supabase CLI:**
   - Configurar Supabase CLI localmente
   - Aplicar migrations via CLI

---

**Última Atualização:** Janeiro 2025  
**Próximo Passo:** Aplicar migration manualmente e executar testes



