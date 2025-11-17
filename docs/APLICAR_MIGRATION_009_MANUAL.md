# INSTRUÇÕES: Aplicar Migration 009 Manualmente

**Data:** 16/11/2025
**Migration:** 009_create_activities.sql
**Objetivo:** Criar tabela `activities` para Activity Logs

---

## MÉTODO 1: Via Supabase Dashboard (RECOMENDADO)

### Passo 1: Acessar Supabase Dashboard

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto **VisaFlow**
3. Vá para **SQL Editor** no menu lateral

### Passo 2: Executar Migration

1. Clique em **New Query**
2. Cole o conteúdo do arquivo `supabase/migrations/009_create_activities.sql`
3. Clique em **Run** (ou Ctrl+Enter)
4. Aguarde confirmação de sucesso

### Passo 3: Verificar Criação

Execute esta query para verificar:

```sql
SELECT COUNT(*) FROM activities;
```

Se retornar `0`, a tabela foi criada com sucesso.

---

## MÉTODO 2: Via psql (Alternativo)

Se você tiver psql instalado:

```bash
# Conectar ao banco
psql "postgresql://postgres:[SUA_SENHA]@[SEU_HOST]:5432/postgres"

# Executar migration
\i supabase/migrations/009_create_activities.sql
```

---

## MÉTODO 3: Via Prisma (Automático)

Se preferir, pode usar Prisma Migrate (mas perde controle das RLS policies):

```bash
# Gerar migration a partir do schema
npx prisma migrate dev --name create_activities

# Aplicar migration
npx prisma migrate deploy
```

⚠️ **ATENÇÃO:** Este método pode não criar as RLS policies corretamente.

---

## APÓS APLICAR A MIGRATION

Execute este comando para gerar o Prisma Client atualizado:

```bash
npx prisma generate
```

---

## TROUBLESHOOTING

### Erro: "permission denied for schema public"

**Causa:** Usuario do DATABASE_URL não tem permissões suficientes

**Solução:**
1. Use o Supabase Dashboard (Método 1)
2. Ou use a connection string com usuário `postgres` (tem privilégios admin)

### Erro: "type activity_action already exists"

**Causa:** Migration já foi aplicada parcialmente

**Solução:**
1. Comente a seção de CREATE TYPE
2. Execute apenas as outras partes

### Erro: "table activities already exists"

**Causa:** Tabela já foi criada

**Solução:**
- Não precisa fazer nada, migration já aplicada
- Execute apenas: `npx prisma generate`

---

## CONTEÚDO DA MIGRATION

O arquivo cria:

1. ✅ Enum `activity_action` com 23 tipos de ação
2. ✅ Tabela `activities` com 10 campos
3. ✅ 5 indexes para performance
4. ✅ RLS habilitado
5. ✅ 2 policies de segurança
6. ✅ Função `cleanup_old_activities()` para manutenção

---

**Após aplicar, prosseguir para:**
- Implementar `activityService.ts`
- Criar página `/dashboard/activity`
- Criar componente `ActivityFeed.tsx`
