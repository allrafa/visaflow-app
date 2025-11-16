# Instalação Completa dos MCPs - VisaFlow

**Data:** Janeiro 2025  
**Status:** ✅ **CONFIGURADO**

---

## Servidores MCP Instalados

### 1. Filesystem VisaFlow ✅
- **Pacote:** `@modelcontextprotocol/server-filesystem`
- **Função:** Acesso ao sistema de arquivos do projeto
- **Path:** `/Users/rafaraio/.cursor/projects/visaflow-app`
- **Variáveis de ambiente:** Nenhuma

### 2. Memory ✅
- **Pacote:** `@modelcontextprotocol/server-memory`
- **Função:** Memória persistente compartilhada
- **Variáveis de ambiente:** Nenhuma

### 3. Supabase ✅
- **Pacote:** `@supabase/mcp-server-supabase`
- **Função:** Conexão direta ao banco Supabase do VisaFlow
- **Variáveis de ambiente (do .env):**
  - `SUPABASE_URL`: https://jsnvrhbeedkifqwmsumc.supabase.co
  - `SUPABASE_ANON_KEY`: Configurado do .env
  - `SUPABASE_ACCESS_TOKEN`: Configurado do .env

### 4. Playwright ✅
- **Pacote:** `@playwright/mcp@latest`
- **Função:** Automação de testes E2E com Playwright
- **Variáveis de ambiente:** Nenhuma
- **Status:** Instalado e configurado

### 5. TestSprite ⚠️
- **Pacote:** `@testsprite/mcp-server`
- **Função:** Agente de teste inteligente
- **Variáveis de ambiente:**
  - `TESTSPRITE_API_KEY`: ⚠️ **NÃO CONFIGURADA**

**Como obter API Key do TestSprite:**
1. Acesse: https://testsprite.com
2. Faça login ou crie uma conta gratuita
3. Navegue até Settings > API Keys
4. Clique em "New API Key"
5. Copie a chave gerada
6. Adicione ao `.env`:
   ```bash
   TESTSPRITE_API_KEY=sua_chave_aqui
   ```
7. Execute novamente: `npx tsx scripts/update-mcp-from-env.ts`

### 6. Context7 ✅
- **Pacote:** `@upstash/context7-mcp`
- **Função:** Busca em documentação
- **Variáveis de ambiente:**
  - `CONTEXT7_API_KEY`: Configurado

---

## Arquivo de Configuração

**Localização:** `/Users/rafaraio/.cursor/projects/visaflow-app/.mcp.json`

**Status:** ✅ Atualizado automaticamente com variáveis do .env

---

## Como Atualizar Variáveis de Ambiente

Se você atualizar variáveis no `.env`, execute:

```bash
cd /Users/rafaraio/.cursor/projects/visaflow-app
npx tsx scripts/update-mcp-from-env.ts
```

Isso atualizará automaticamente o `.mcp.json` com as variáveis do `.env`.

---

## Reiniciar Cursor

Após configurar os MCPs, **reinicie o Cursor** para que as mudanças sejam aplicadas:

1. Feche completamente o Cursor
2. Abra novamente
3. Os MCPs serão carregados automaticamente

---

## Verificação

Para verificar se os MCPs estão funcionando:

1. Abra uma nova conversa no Cursor
2. Tente usar ferramentas MCP:
   - `mcp_supabase_get_project_url` (Supabase)
   - `mcp_playwright_*` (Playwright)
   - `mcp_testsprite_*` (TestSprite - se API key configurada)

---

## Troubleshooting

### MCP não aparece na lista
- **Solução:** Reinicie o Cursor completamente

### Erro de autenticação (Supabase)
- **Solução:** Verifique se `SUPABASE_ACCESS_TOKEN` está correto no .env
- **Solução:** Execute `npx tsx scripts/update-mcp-from-env.ts` novamente

### TestSprite não funciona
- **Solução:** Adicione `TESTSPRITE_API_KEY` ao .env
- **Solução:** Execute `npx tsx scripts/update-mcp-from-env.ts` novamente

---

**Última atualização:** Janeiro 2025




