# Guia de Aplicação de Migrations - VisaFlow

**Última atualização:** Janeiro 2025

## 🎯 Método Recomendado: Via Supabase Dashboard

Como o MCP pode não estar disponível ainda, vamos aplicar as migrations diretamente no Dashboard do Supabase.

### Passo 1: Acessar SQL Editor

1. Acesse: `https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc`
2. No menu lateral, clique em **SQL Editor**
3. Clique em **New Query**

### Passo 2: Aplicar Migrations na Ordem

#### Migration 1: Criar Enums (se necessário)

```sql
-- Criar Enums
DO $$ BEGIN
    CREATE TYPE "ProcessPhase" AS ENUM ('ELIGIBILITY', 'EVIDENCE', 'LETTERS', 'PETITION', 'FILING');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'WITH_UPLOAD', 'BLOCKED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "EB1Criteria" AS ENUM ('AWARDS', 'MEMBERSHIP', 'PRESS', 'JUDGING', 'ORIGINAL', 'SCHOLARLY', 'CRITICAL', 'HIGH_SALARY', 'EXHIBITIONS', 'COMMERCIAL_SUCCESS');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
```

**Arquivo:** `supabase/migrations/000_initial_schema.sql` (primeira parte)

#### Migration 2: Criar Tabelas VisaFlow

Copie e cole o conteúdo completo de:
- `supabase/migrations/002_create_visaflow_tables_only.sql`

Execute no SQL Editor.

#### Migration 3: Habilitar RLS e Criar Policies

Copie e cole o conteúdo completo de:
- `supabase/migrations/003_enable_rls_visaflow_only.sql`

Execute no SQL Editor.

#### Migration 4: Criar Tabela Tasks do VisaFlow

Copie e cole o conteúdo completo de:
- `supabase/migrations/004_create_visaflow_tasks.sql`

Execute no SQL Editor.

#### Migration 5: Adicionar RLS Policies Faltantes

Copie e cole o conteúdo completo de:
- `supabase/migrations/005_add_missing_rls_policies.sql`

Execute no SQL Editor.

### Passo 3: Criar Bucket "uploads" no Storage

1. No menu lateral, clique em **Storage**
2. Clique em **New bucket**
3. Nome: `uploads`
4. **Public**: ❌ (deixar desmarcado - bucket privado)
5. **File size limit**: 10 MB
6. **Allowed MIME types**: `application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg`
7. Clique em **Create bucket**

### Passo 4: Aplicar Storage Policies

Copie e cole o conteúdo completo de:
- `supabase/migrations/006_setup_storage_bucket.sql`

Execute no SQL Editor.

## ✅ Validação

Execute no SQL Editor para verificar se tudo foi criado:

```sql
-- Verificar tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY table_name;

-- Verificar RLS habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters');

-- Verificar policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename, policyname;
```

**Esperado:**
- 5 tabelas criadas
- Todas com RLS habilitado (`rowsecurity = true`)
- Múltiplas policies criadas

## 🔄 Alternativa: Via Supabase CLI

Se preferir usar CLI:

```bash
cd /Users/rafaraio/.cursor/projects/visaflow-app

# Instalar Supabase CLI (se não tiver)
npm install -g supabase

# Login
supabase login

# Link ao projeto
supabase link --project-ref jsnvrhbeedkifqwmsumc

# Aplicar migrations
supabase db push
```

## 📋 Checklist Final

- [ ] Enums criados (ProcessPhase, TaskStatus, EB1Criteria)
- [ ] Tabelas criadas (processes, tasks, uploads, criteria_evidences, recommendation_letters)
- [ ] RLS habilitado em todas as tabelas
- [ ] Policies RLS criadas
- [ ] Bucket "uploads" criado no Storage
- [ ] Storage policies aplicadas
- [ ] Validação executada com sucesso

## 🆘 Troubleshooting

**Erro: "relation already exists"**
- ✅ Normal - significa que a tabela já existe, pode continuar

**Erro: "type already exists"**
- ✅ Normal - significa que o enum já existe, pode continuar

**Erro: "permission denied"**
- Verifique se está usando Service Role Key no Dashboard
- Ou execute como usuário postgres

**Erro: "foreign key constraint"**
- Verifique se as tabelas foram criadas na ordem correta
- Verifique se a tabela `tasks` foi criada antes de aplicar foreign keys
