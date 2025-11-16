# 🔧 CORRIGIR: Access Token do Supabase CLI

**Data:** Janeiro 2025  
**Problema:** Erro "Invalid access token format. Must be like `sbp_0102...1920`"

---

## ⚠️ PROBLEMA IDENTIFICADO

O Supabase CLI requer um **Access Token** no formato `sbp_...`, mas você pode estar usando um token diferente (como `sb_secret_...`).

---

## ✅ SOLUÇÃO: Obter Token Correto

### Passo 1: Acessar Configurações do Supabase

1. **Acesse:** https://supabase.com/dashboard/account/tokens
2. Ou: https://supabase.com/dashboard → Clique no seu avatar → **Account** → **Access Tokens**

### Passo 2: Criar Novo Access Token

1. Clique em **Generate New Token**
2. Dê um nome (ex: "VisaFlow CLI")
3. Copie o token gerado (formato: `sbp_0102...1920`)

**⚠️ IMPORTANTE:** O token começa com `sbp_` (não `sb_secret_`)

### Passo 3: Usar Token no CLI

**Opção A: Via Variável de Ambiente**

```bash
export SUPABASE_ACCESS_TOKEN=sbp_0102...1920
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

**Opção B: CLI pedirá o token**

Se não definir a variável, o CLI pedirá o token interativamente.

---

## 🔍 VERIFICAR TOKEN ATUAL

### Verificar Token no .env

```bash
grep SUPABASE_ACCESS_TOKEN .env
```

### Verificar Token no .mcp.json

```bash
cat .mcp.json | grep -A 2 SUPABASE_ACCESS_TOKEN
```

**Nota:** O token no `.mcp.json` pode ser diferente do necessário para o CLI.

---

## 📋 INSTRUÇÕES COMPLETAS

### 1. Obter Token Correto

1. Acesse: https://supabase.com/dashboard/account/tokens
2. Clique em **Generate New Token**
3. Nome: "VisaFlow CLI"
4. Copie o token (formato `sbp_...`)

### 2. Configurar Token

**Opção A: Variável de Ambiente Temporária**

```bash
export SUPABASE_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

**Opção B: Adicionar ao .env (Opcional)**

```bash
# Adicionar ao .env
echo "SUPABASE_CLI_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI" >> .env
```

### 3. Linkar Projeto

```bash
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

O CLI pode pedir:
- Access Token (se não estiver na variável)
- Database Password (use `DATABASE_KEY` do .env)

### 4. Verificar Link

```bash
npx supabase status
```

Deve mostrar informações do projeto linkado.

---

## 🚨 TROUBLESHOOTING

### Erro: "Invalid access token format"

**Causa:** Token não está no formato `sbp_...`

**Solução:**
1. Obter novo token em: https://supabase.com/dashboard/account/tokens
2. Certificar-se de que começa com `sbp_`
3. Usar no comando de link

### Erro: "Token expired"

**Solução:** Gerar novo token no Dashboard

### Erro: "Project not found"

**Solução:** Verificar se `project-ref` está correto: `jsnvrhbeedkifqwmsumc`

---

## ✅ APÓS CONFIGURAR

Depois de linkar com sucesso:

```bash
# Aplicar migration
npx tsx scripts/apply-migrations-final.ts

# Verificar aplicação
npx tsx scripts/verify-complete-status.ts
```

---

**Última Atualização:** Janeiro 2025




