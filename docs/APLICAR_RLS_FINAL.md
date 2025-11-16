# 🔐 APLICAR RLS - INSTRUÇÕES FINAIS

**Status:** ✅ Tabelas criadas - Pronto para aplicar RLS

---

## ✅ O QUE JÁ FOI FEITO

- ✅ Enums criados: `ProcessPhase`, `TaskStatus`, `EB1Criteria`
- ✅ Tabelas criadas: `processes`, `uploads`, `criteria_evidences`, `recommendation_letters`

---

## ⚠️ PROBLEMA IDENTIFICADO

As policies de RLS para `uploads` fazem referência à tabela `tasks` com a estrutura do VisaFlow (`process_id`, `phase`). 

Mas a tabela `tasks` existente tem estrutura diferente (do projeto Laro: `org_id`, `assignee_contact_id`).

---

## ✅ SOLUÇÃO: CRIAR TABELA TASKS DO VISAFLOW

Precisamos criar uma tabela `tasks` específica do VisaFlow. Execute este SQL:

```sql
-- Criar tabela tasks do VisaFlow
CREATE TABLE IF NOT EXISTS "visaflow_tasks" (
    "id" TEXT NOT NULL,
    "process_id" TEXT NOT NULL,
    "phase" "ProcessPhase" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "order" INTEGER NOT NULL DEFAULT 0,
    "depends_on" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    CONSTRAINT "visaflow_tasks_pkey" PRIMARY KEY ("id")
);

-- Criar índice
CREATE INDEX IF NOT EXISTS "visaflow_tasks_process_id_phase_idx" ON "visaflow_tasks"("process_id", "phase");

-- Foreign key para processes
DO $$ BEGIN
    ALTER TABLE "visaflow_tasks" ADD CONSTRAINT "visaflow_tasks_process_id_fkey" 
    FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Atualizar foreign key de uploads para usar visaflow_tasks
DO $$ BEGIN
    ALTER TABLE "uploads" DROP CONSTRAINT IF EXISTS "uploads_task_id_fkey";
    ALTER TABLE "uploads" ADD CONSTRAINT "uploads_task_id_fkey" 
    FOREIGN KEY ("task_id") REFERENCES "visaflow_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
```

**OU**, se você preferir usar a tabela `tasks` existente, precisamos adaptar o código do VisaFlow para usar a estrutura existente.

---

## 📋 APLICAR RLS (APÓS CRIAR TABELA TASKS)

Execute o arquivo: `supabase/migrations/003_enable_rls_visaflow_only.sql`

Este arquivo aplica RLS apenas nas tabelas do VisaFlow e está adaptado para funcionar corretamente.

---

## 🔍 VERIFICAÇÃO FINAL

Após aplicar tudo, execute:

```sql
-- Verificar RLS habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'uploads', 'criteria_evidences', 'recommendation_letters', 'visaflow_tasks')
ORDER BY tablename;

-- Verificar policies criadas
SELECT COUNT(*) as total_policies 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'uploads', 'criteria_evidences', 'recommendation_letters');
```

**Resultado esperado:**
- Todas as tabelas com `rowsecurity = true`
- ~12-15 policies criadas

---

**Escolha uma opção e me informe para continuarmos!**



