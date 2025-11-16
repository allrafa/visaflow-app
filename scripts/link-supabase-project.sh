#!/bin/bash

# Script para linkar projeto Supabase com token correto
# Uso: ./scripts/link-supabase-project.sh [TOKEN_SBP]

set -e

PROJECT_REF="jsnvrhbeedkifqwmsumc"
TOKEN="${1:-}"

echo "🔗 LINKANDO PROJETO SUPABASE"
echo "════════════════════════════════════════════════════════════════════════════════"
echo ""

# Verificar se token foi fornecido
if [ -z "$TOKEN" ]; then
  echo "⚠️  Token não fornecido como argumento"
  echo ""
  echo "📋 COMO OBTER TOKEN:"
  echo "   1. Acesse: https://supabase.com/dashboard/account/tokens"
  echo "   2. Clique em 'Generate New Token'"
  echo "   3. Nome: 'VisaFlow CLI'"
  echo "   4. Copie o token (formato: sbp_0102...1920)"
  echo ""
  echo "💡 USO:"
  echo "   ./scripts/link-supabase-project.sh sbp_SEU_TOKEN_AQUI"
  echo ""
  echo "Ou defina a variável:"
  echo "   export SUPABASE_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI"
  echo "   npx supabase link --project-ref $PROJECT_REF"
  echo ""
  exit 1
fi

# Verificar formato do token
if [[ ! "$TOKEN" =~ ^sbp_ ]]; then
  echo "❌ Token inválido! Deve começar com 'sbp_'"
  echo ""
  echo "Formato esperado: sbp_0102030405060708091011121314151617181920"
  echo "Token fornecido: $TOKEN"
  echo ""
  echo "💡 Obter token correto em: https://supabase.com/dashboard/account/tokens"
  exit 1
fi

echo "✅ Token no formato correto: ${TOKEN:0:20}..."
echo ""

# Exportar token
export SUPABASE_ACCESS_TOKEN="$TOKEN"

# Verificar se CLI está instalado
if ! command -v npx &> /dev/null; then
  echo "❌ npx não encontrado"
  exit 1
fi

# Verificar se supabase está disponível
if ! npx supabase --version &> /dev/null; then
  echo "❌ Supabase CLI não encontrado"
  echo "💡 Instalar: npm install --save-dev supabase"
  exit 1
fi

echo "📋 Linkando projeto $PROJECT_REF..."
echo ""

# Linkar projeto
npx supabase link --project-ref "$PROJECT_REF"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Projeto linkado com sucesso!"
  echo ""
  echo "💡 Próximos passos:"
  echo "   npx tsx scripts/apply-migrations-final.ts"
else
  echo ""
  echo "❌ Erro ao linkar projeto"
  echo ""
  echo "💡 Verificar:"
  echo "   1. Token está correto (formato sbp_...)"
  echo "   2. Token não expirou"
  echo "   3. Você tem acesso ao projeto $PROJECT_REF"
  exit 1
fi



