#!/bin/bash

# Script para atualizar SUPABASE_ACCESS_TOKEN no .mcp.json a partir do .env

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MCP_CONFIG="$PROJECT_ROOT/.mcp.json"
ENV_FILE="$PROJECT_ROOT/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Arquivo .env não encontrado em $ENV_FILE"
  exit 1
fi

# Tentar encontrar o token no .env (pode estar com diferentes nomes)
TOKEN=$(grep -E "SUPABASE.*ACCESS.*TOKEN|SUPABASE_ACCESS_TOKEN" "$ENV_FILE" | head -1 | cut -d'=' -f2 | tr -d ' ' | tr -d '"')

if [ -z "$TOKEN" ]; then
  echo "⚠️  Token não encontrado no .env"
  echo "   Por favor, adicione SUPABASE_ACCESS_TOKEN=seu_token no .env"
  exit 1
fi

if [ ! -f "$MCP_CONFIG" ]; then
  echo "❌ Arquivo .mcp.json não encontrado em $MCP_CONFIG"
  exit 1
fi

# Atualizar o token no .mcp.json (macOS/Linux)
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s/\"SUBSTITUIR_PELO_TOKEN_DO_ENV\"/\"$TOKEN\"/" "$MCP_CONFIG"
else
  # Linux
  sed -i "s/\"SUBSTITUIR_PELO_TOKEN_DO_ENV\"/\"$TOKEN\"/" "$MCP_CONFIG"
fi

echo "✅ Token atualizado no .mcp.json"
echo "   Token: ${TOKEN:0:20}..."



