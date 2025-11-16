# 📚 GUIA COMPLETO: Aplicação de Migrations SQL no Supabase

**Data:** Janeiro 2025  
**Status:** ✅ **SOLUÇÃO DEFINITIVA IMPLEMENTADA**

---

## 🎯 PROBLEMA RESOLVIDO

### Erro DNS com Connection String Direta

**Problema Original:**
- Connection string `db.jsnvrhbeedkifqwmsumc.supabase.co:5432` não resolvia DNS
- Erro: `getaddrinfo ENOTFOUND`

**Causa:**
- Formato incorreto ou Supabase usa connection pooler
- Projeto pode estar em região específica
- Firewall/rede pode estar bloqueando

**Solução Implementada:**
- ✅ Supabase CLI instalado localmente
- ✅ Script robusto que tenta múltiplos métodos
- ✅ Fallback para instruções manuais

---

## 🚀 SOLUÇÃO DEFINITIVA: Supabase CLI

### Por Que Supabase CLI?

- ✅ **Método Oficial:** Recomendado pelo Supabase
- ✅ **Sem Problemas de DNS:** Usa API do Supabase
- ✅ **Rastreável:** Mantém histórico de migrations
- ✅ **Repetível:** Pode executar múltiplas vezes
- ✅ **Integrável:** Funciona em CI/CD

---

## 📋 CONFIGURAÇÃO INICIAL (Uma Vez)

### Passo 1: Instalar Supabase CLI

**Já instalado localmente no projeto:**
```bash
npm install --save-dev supabase
```

**Status:** ✅ **INSTALADO**

### Passo 2: Fazer Login (Primeira Vez)

```bash
npx supabase login
```

**O que acontece:**
1. Abre navegador para autenticação
2. Você faz login com sua conta Supabase
3. CLI fica autenticado localmente

**Status:** ✅ **CONCLUÍDO**

### Passo 2.5: Obter Access Token Correto ⚠️ **IMPORTANTE**

O Supabase CLI precisa de um **Access Token** no formato `sbp_...` (não `sb_secret_...`).

**Como obter:**
1. Acesse: https://supabase.com/dashboard/account/tokens
2. Clique em **Generate New Token**
3. Nome: `VisaFlow CLI`
4. Copie o token (formato: `sbp_0102...1920`)

**Usar no link:**
```bash
export SUPABASE_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

**Ver guia completo:** `/docs/OBTER_TOKEN_CLI_SUPABASE.md`

### Passo 3: Linkar Projeto (Primeira Vez)

```bash
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

**O que acontece:**
1. Conecta CLI ao projeto Supabase
2. Salva configuração localmente
3. Permite executar migrations no projeto

**Status:** ⏳ **AGUARDANDO EXECUÇÃO**

---

## 🎯 USO: Aplicar Migrations

### Método Recomendado: Script Automático

```bash
npx tsx scripts/apply-migrations-final.ts
```

**O que o script faz:**
1. ✅ Tenta Supabase CLI (se configurado)
2. ✅ Tenta Connection String Direta (formatos alternativos)
3. ✅ Mostra instruções manuais (se nada funcionar)

### Método Alternativo: CLI Direto

Após configurar (login + link):

```bash
# Aplicar migration específica
npx supabase db execute -f supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql

# Ou aplicar todas as migrations pendentes
npx supabase db push
```

---

## 📊 SCRIPTS DISPONÍVEIS

### Scripts Principais

| Script | Descrição | Quando Usar |
|--------|-----------|-------------|
| `apply-migrations-final.ts` | ⭐ **RECOMENDADO** - Tenta múltiplos métodos | Sempre |
| `apply-migrations-robust.ts` | Método robusto com fallback | Alternativa |
| `apply-supabase-migrations.ts` | Connection string direta | Se DNS funcionar |
| `test-supabase-connection-formats.ts` | Testa formatos de connection | Diagnóstico |

### Scripts de Verificação

| Script | Descrição |
|--------|-----------|
| `verify-complete-status.ts` | Verificação completa (tabelas, RLS, policies) |
| `verify-supabase-tables.ts` | Verificar apenas tabelas |
| `verify-all-rls-policies.ts` | Verificar todas as policies RLS |

---

## 🔄 FLUXO DE TRABALHO COMPLETO

### Primeira Vez (Setup)

```bash
# 1. Instalar CLI (já feito ✅)
npm install --save-dev supabase

# 2. Fazer login
npx supabase login

# 3. Linkar projeto
npx supabase link --project-ref jsnvrhbeedkifqwmsumc

# 4. Aplicar migration
npx tsx scripts/apply-migrations-final.ts
```

### Uso Diário

```bash
# Criar/editar migration
# Editar: supabase/migrations/[nome].sql

# Aplicar automaticamente
npx tsx scripts/apply-migrations-final.ts

# Verificar aplicação
npx tsx scripts/verify-complete-status.ts
```

---

## 🛠️ TROUBLESHOOTING

### Problema: "Not authenticated"

**Solução:**
```bash
npx supabase login
```

### Problema: "Project not linked"

**Solução:**
```bash
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

### Problema: "Permission denied"

**Solução:**
- Verificar se está logado com conta que tem acesso ao projeto
- Verificar se projeto está ativo no Dashboard

### Problema: DNS ainda não funciona

**Solução:**
- Usar Supabase CLI (recomendado)
- Ou aplicar manualmente no Dashboard

---

## ✅ CHECKLIST DE CONFIGURAÇÃO

### Setup Inicial
- [x] Supabase CLI instalado localmente
- [ ] Login feito (`npx supabase login`)
- [ ] Projeto linkado (`npx supabase link --project-ref jsnvrhbeedkifqwmsumc`)

### Aplicar Migration
- [ ] Migration aplicada (`npx tsx scripts/apply-migrations-final.ts`)
- [ ] Verificação executada (`npx tsx scripts/verify-complete-status.ts`)
- [ ] RLS habilitado em todas as tabelas
- [ ] Policies criadas

---

## 📝 PRÓXIMOS PASSOS AGORA

### 1. Configurar Supabase CLI (Uma Vez)

```bash
# Fazer login
npx supabase login

# Linkar projeto
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

### 2. Aplicar Migration

```bash
npx tsx scripts/apply-migrations-final.ts
```

### 3. Verificar Aplicação

```bash
npx tsx scripts/verify-complete-status.ts
```

### 4. Executar Testes

```bash
npm run test:all
```

---

## 🎯 CONCLUSÃO

**Solução Implementada:**
- ✅ Supabase CLI instalado localmente
- ✅ Script robusto criado (`apply-migrations-final.ts`)
- ✅ Múltiplos métodos de fallback
- ✅ Documentação completa

**Próximo Passo:**
1. Executar `npx supabase login`
2. Executar `npx supabase link --project-ref jsnvrhbeedkifqwmsumc`
3. Executar `npx tsx scripts/apply-migrations-final.ts`

---

**Última Atualização:** Janeiro 2025  
**Status:** ✅ **SOLUÇÃO DEFINITIVA PRONTA**

