# 🔑 Como Obter Access Token Correto para Supabase CLI

**Data:** Janeiro 2025  
**Problema:** Token `sb_secret_...` não funciona - CLI precisa de `sbp_...`

---

## ⚠️ DIFERENÇA ENTRE TOKENS

### Tokens Diferentes para Diferentes Propósitos

| Token | Formato | Uso |
|-------|---------|-----|
| **MCP/API Token** | `sb_secret_...` | Para MCP Server e APIs |
| **CLI Access Token** | `sbp_...` | Para Supabase CLI |

**Você tem:** `sb_secret_l_xDjPHDTJ9H3ncgpogWFQ_7UfKoh6B` (MCP Token)  
**Você precisa:** `sbp_0102...1920` (CLI Access Token)

---

## ✅ SOLUÇÃO: Obter Token CLI Correto

### Passo 1: Acessar Página de Tokens

**URL:** https://supabase.com/dashboard/account/tokens

Ou:
1. Acesse: https://supabase.com/dashboard
2. Clique no seu **avatar** (canto superior direito)
3. Clique em **Account**
4. No menu lateral, clique em **Access Tokens**

### Passo 2: Criar Novo Access Token

1. Clique no botão **Generate New Token**
2. Dê um nome descritivo: `VisaFlow CLI` ou `VisaFlow Project`
3. Clique em **Generate**
4. **COPIE O TOKEN** imediatamente (ele só aparece uma vez!)

**Formato do Token:** `sbp_0102030405060708091011121314151617181920`

### Passo 3: Usar Token no CLI

**Opção A: Via Variável de Ambiente (Recomendado)**

```bash
export SUPABASE_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

**Opção B: CLI pedirá interativamente**

Se não definir a variável, o CLI perguntará:
```
? Enter your Supabase access token: 
```

Cole o token `sbp_...` aqui.

---

## 🔍 VERIFICAÇÃO

### Verificar se Token Está Correto

O token deve:
- ✅ Começar com `sbp_`
- ✅ Ter aproximadamente 20+ caracteres após `sbp_`
- ✅ Ser gerado em: https://supabase.com/dashboard/account/tokens

### Exemplo de Token Correto

```
sbp_0102030405060708091011121314151617181920
```

### Exemplo de Token Incorreto (o que você tem agora)

```
sb_secret_l_xDjPHDTJ9H3ncgpogWFQ_7UfKoh6B  ❌ (Este é para MCP, não CLI)
```

---

## 📋 COMANDOS COMPLETOS

### 1. Obter Token (no navegador)

1. Acesse: https://supabase.com/dashboard/account/tokens
2. Clique em **Generate New Token**
3. Nome: `VisaFlow CLI`
4. Copie o token gerado

### 2. Linkar Projeto (no terminal)

```bash
# Definir token (substitua pelo token real)
export SUPABASE_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI

# Linkar projeto
npx supabase link --project-ref jsnvrhbeedkifqwmsumc
```

**O que vai acontecer:**
- CLI pode pedir Database Password → Use `DATABASE_KEY` do .env: `ZTZxUPvoLHOIVk0m`
- CLI vai conectar ao projeto
- Vai salvar configuração localmente

### 3. Verificar Link

```bash
npx supabase status
```

Deve mostrar informações do projeto linkado.

---

## 🚨 TROUBLESHOOTING

### Erro: "Invalid access token format"

**Causa:** Token não está no formato `sbp_...`

**Solução:**
1. Verificar se token começa com `sbp_`
2. Obter novo token em: https://supabase.com/dashboard/account/tokens
3. Certificar-se de copiar o token completo

### Erro: "Token expired"

**Solução:** Gerar novo token no Dashboard

### Erro: "Project not found"

**Solução:** Verificar se `project-ref` está correto: `jsnvrhbeedkifqwmsumc`

### Erro: "Database password required"

**Solução:** Usar `DATABASE_KEY` do .env: `ZTZxUPvoLHOIVk0m`

---

## 💡 DICA: Salvar Token (Opcional)

Se quiser salvar o token para não precisar digitar sempre:

```bash
# Adicionar ao .env (opcional, não obrigatório)
echo "SUPABASE_CLI_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI" >> .env
```

Mas o CLI geralmente salva o token após o primeiro login.

---

## ✅ APÓS LINKAR COM SUCESSO

Depois de linkar, você poderá:

```bash
# Aplicar migration automaticamente
npx tsx scripts/apply-migrations-final.ts

# Ou via CLI direto
npx supabase db execute -f supabase/migrations/007_APPLY_ALL_RLS_COMPLETE.sql

# Verificar aplicação
npx tsx scripts/verify-complete-status.ts
```

---

**Última Atualização:** Janeiro 2025  
**Próximo Passo:** Obter token `sbp_...` e linkar projeto



