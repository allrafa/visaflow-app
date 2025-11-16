# Configuração MCP para VisaFlow

## Como Obter SUPABASE_ACCESS_TOKEN

O `SUPABASE_ACCESS_TOKEN` é diferente do `SUPABASE_SERVICE_ROLE_KEY` e é necessário para o MCP do Supabase funcionar.

### Passos:

1. **Acesse o Dashboard do Supabase:**
   ```
   https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc
   ```

2. **Navegue até Settings > API**

3. **Role para baixo até "Access Tokens"**

4. **Crie um novo token ou copie um existente**

5. **Adicione ao `.env`:**
   ```bash
   SUPABASE_ACCESS_TOKEN=seu_token_aqui
   ```

6. **Atualize o `.mcp.json` automaticamente:**
   ```bash
   ./scripts/update-mcp-token.sh
   ```

   Ou manualmente edite `/Users/rafaraio/.cursor/projects/visaflow-app/.mcp.json` e substitua `SUBSTITUIR_PELO_TOKEN_DO_ENV` pelo token.

## Validação

Após configurar o token:

1. **Reinicie o Cursor** (importante para detectar o novo `.mcp.json`)

2. **Valide a configuração:**
   ```bash
   npx tsx scripts/validate-mcp-config.ts
   ```

3. **Teste a conexão MCP:**
   - Em uma nova conversa no Cursor, execute: `mcp_supabase_get_project_url`
   - Deve retornar: `https://jsnvrhbeedkifqwmsumc.supabase.co`

## Diferença entre Tokens

- **SUPABASE_SERVICE_ROLE_KEY**: Usado para operações administrativas no código (já configurado ✅)
- **SUPABASE_ACCESS_TOKEN**: Usado pelo MCP server para autenticação (precisa configurar ⚠️)



