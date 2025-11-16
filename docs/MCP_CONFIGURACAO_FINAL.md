# Configuração Final dos MCPs - VisaFlow

**Data:** Janeiro 2025  
**Status:** ✅ **INSTALADO E CONFIGURADO**

---

## Resumo da Instalação

### MCPs Instalados

1. ✅ **Playwright MCP** - `@playwright/mcp@latest`
2. ✅ **Supabase MCP** - `@supabase/mcp-server-supabase` (já existia, atualizado)
3. ✅ **TestSprite MCP** - `@testsprite/mcp-server` (instalado, aguardando API key)

### MCPs Existentes Mantidos

- ✅ **filesystem-visaflow** - Sistema de arquivos do projeto
- ✅ **memory** - Memória persistente
- ✅ **context7** - Busca em documentação

---

## Configuração Atual

**Arquivo:** `/Users/rafaraio/.cursor/projects/visaflow-app/.mcp.json`

### Playwright MCP
```json
{
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp@latest"]
  }
}
```
**Status:** ✅ Configurado (não precisa de variáveis de ambiente)

### Supabase MCP
```json
{
  "supabase": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server-supabase"],
    "env": {
      "SUPABASE_URL": "https://jsnvrhbeedkifqwmsumc.supabase.co",
      "SUPABASE_ANON_KEY": "[do .env]",
      "SUPABASE_ACCESS_TOKEN": "[do .env]"
    }
  }
}
```
**Status:** ✅ Configurado com variáveis do .env

### TestSprite MCP
```json
{
  "testsprite": {
    "command": "npx",
    "args": ["-y", "@testsprite/mcp-server"],
    "env": {}
  }
}
```
**Status:** ⚠️ Instalado, mas precisa de API key

**Para ativar TestSprite:**
1. Obtenha API key em: https://testsprite.com
2. Adicione ao `.env`:
   ```bash
   TESTSPRITE_API_KEY=sua_chave_aqui
   ```
3. Execute: `npx tsx scripts/update-mcp-from-env.ts`

---

## Script de Atualização Automática

**Arquivo:** `scripts/update-mcp-from-env.ts`

Este script lê as variáveis do `.env` e atualiza automaticamente o `.mcp.json`.

**Uso:**
```bash
npx tsx scripts/update-mcp-from-env.ts
```

**O que faz:**
- Lê variáveis do `.env`
- Atualiza Supabase MCP com variáveis do .env
- Atualiza TestSprite MCP se `TESTSPRITE_API_KEY` estiver no .env
- Mantém outras configurações intactas

---

## Próximos Passos

### 1. Reiniciar Cursor (OBRIGATÓRIO)

Após instalar os MCPs, você **DEVE** reiniciar o Cursor:

1. Feche completamente o Cursor (Cmd+Q no Mac)
2. Abra novamente
3. Os novos MCPs serão carregados automaticamente

### 2. Verificar MCPs Funcionando

Após reiniciar, teste os MCPs em uma nova conversa:

**Playwright:**
- Tente usar ferramentas `mcp_playwright_*`

**Supabase:**
- Tente usar: `mcp_supabase_get_project_url`
- Deve retornar: `https://jsnvrhbeedkifqwmsumc.supabase.co`

**TestSprite:**
- Se API key configurada, tente usar ferramentas `mcp_testsprite_*`

### 3. Configurar TestSprite (Opcional)

Se quiser usar TestSprite:

1. Acesse: https://testsprite.com
2. Crie conta gratuita
3. Obtenha API key em Settings > API Keys
4. Adicione ao `.env`:
   ```bash
   TESTSPRITE_API_KEY=sua_chave_aqui
   ```
5. Execute: `npx tsx scripts/update-mcp-from-env.ts`
6. Reinicie o Cursor

---

## Troubleshooting

### MCP não aparece após reiniciar
- **Solução:** Verifique se o arquivo `.mcp.json` está no diretório correto
- **Solução:** Verifique se há erros de sintaxe JSON no arquivo
- **Solução:** Tente executar `npx tsx scripts/update-mcp-from-env.ts` novamente

### Erro ao carregar MCP
- **Solução:** Verifique se o pacote npm existe (ex: `npm view @playwright/mcp`)
- **Solução:** Tente executar manualmente: `npx @playwright/mcp@latest`

### Supabase MCP não conecta
- **Solução:** Verifique se `SUPABASE_ACCESS_TOKEN` está correto no .env
- **Solução:** Execute `npx tsx scripts/update-mcp-from-env.ts` para atualizar

---

## Arquivos Criados/Modificados

1. ✅ `.mcp.json` - Atualizado com Playwright e TestSprite
2. ✅ `scripts/update-mcp-from-env.ts` - Script de atualização automática
3. ✅ `docs/MCP_INSTALACAO_COMPLETA.md` - Documentação completa
4. ✅ `docs/MCP_CONFIGURACAO_FINAL.md` - Este arquivo

---

**Última atualização:** Janeiro 2025  
**Status:** ✅ **MCPs INSTALADOS E CONFIGURADOS**



