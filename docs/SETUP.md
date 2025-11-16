# Setup Guide - VisaFlow

## Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Conta no Supabase
- Conta na Anthropic (Claude API)

## Passos de Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/visaflow?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Anthropic Claude API
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

### 3. Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Obtenha as credenciais (URL, anon key, service role key)
3. Crie um bucket chamado `uploads` no Storage
4. Configure as políticas de acesso do bucket

### 4. Aplicar Migrations do Prisma

```bash
# Gerar Prisma Client
npx prisma generate

# Aplicar migrations (quando DATABASE_URL estiver configurado)
npx prisma migrate dev --name init
```

### 5. Aplicar RLS Policies no Supabase

Execute o arquivo `supabase/migrations/001_enable_rls.sql` no SQL Editor do Supabase.

### 6. Executar o Projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

## Notas Importantes

- O Prisma Client só será gerado quando `DATABASE_URL` estiver configurado
- As migrations SQL devem ser aplicadas manualmente no Supabase Dashboard
- O bucket `uploads` deve ser criado no Supabase Storage antes de usar uploads



