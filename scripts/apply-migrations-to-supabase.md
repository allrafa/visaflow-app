# Como Aplicar Migrations Diretamente no Supabase

## Problema Identificado

O Prisma está usando **Prisma Accelerate** (`accelerate.prisma-data.net`), que é um proxy/connection pooler. As tabelas podem existir via Accelerate, mas não estar visíveis no Supabase Dashboard quando você tenta aplicar RLS.

## Solução

Aplicar as migrations diretamente no Supabase Dashboard para garantir que as tabelas existam no banco principal.

### Passo 1: Aplicar Migration Inicial

1. **Acesse:** https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/sql/new
2. **Abra:** `prisma/migrations/20251113054832_init/migration.sql`
3. **Copie** todo o conteúdo
4. **Cole** no SQL Editor
5. **Execute** (Run ou Cmd+Enter)

Isso criará todas as tabelas, enums e índices.

### Passo 2: Verificar Tabelas Criadas

Execute no SQL Editor:
```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
ORDER BY tablename;
```

Deve retornar 7 tabelas.

### Passo 3: Aplicar RLS

1. **Abra:** `supabase/migrations/001_enable_rls_safe.sql`
2. **Copie** todo o conteúdo
3. **Cole** no SQL Editor
4. **Execute**

### Alternativa: Usar Connection String Direta

Se você tiver a connection string direta do Supabase (não Accelerate), pode aplicar via Prisma:

1. Adicione `SUPABASE_DIRECT_DATABASE_URL` no `.env`
2. Execute: `npx prisma migrate deploy --schema=prisma/schema.prisma --url=$SUPABASE_DIRECT_DATABASE_URL`



