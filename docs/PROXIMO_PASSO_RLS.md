# 🎯 PRÓXIMO PASSO: CRIAR TABELA TASKS E APLICAR RLS

**Status:** ✅ Tabelas principais criadas - Falta apenas `tasks` e RLS

---

## ⚠️ PROBLEMA

A tabela `tasks` já existe mas tem estrutura diferente (do projeto Laro). O VisaFlow precisa de uma tabela `tasks` com:
- `process_id` (referência a processes)
- `phase` (enum ProcessPhase)
- `status` (enum TaskStatus do VisaFlow)

---

## ✅ SOLUÇÃO: EXECUTAR 2 SQLs

### SQL 1: Criar Tabela Tasks do VisaFlow

**IMPORTANTE:** Se der erro "relation already exists", primeiro renomeie a tabela existente:

```sql
-- Se necessário, renomear tabela existente
ALTER TABLE tasks RENAME TO laro_tasks;
```

Depois execute:

```sql
-- Criar tabela tasks do VisaFlow
CREATE TABLE "tasks" (
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
    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "tasks_process_id_phase_idx" ON "tasks"("process_id", "phase");

ALTER TABLE "tasks" ADD CONSTRAINT "tasks_process_id_fkey" 
FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "uploads" DROP CONSTRAINT IF EXISTS "uploads_task_id_fkey";
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_task_id_fkey" 
FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### SQL 2: Aplicar RLS

Execute o arquivo completo: `supabase/migrations/003_enable_rls_visaflow_only.sql`

Ou copie e execute o conteúdo completo do arquivo no Supabase Dashboard.

---

## 🔍 VERIFICAÇÃO FINAL

Após executar ambos os SQLs, execute:

```sql
-- Verificar tabelas criadas
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename;

-- Verificar RLS habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters')
ORDER BY tablename;

-- Verificar policies
SELECT COUNT(*) as total_policies 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters');
```

**Resultado esperado:**
- 5 tabelas criadas
- Todas com `rowsecurity = true`
- ~15-20 policies criadas

---

**Execute os 2 SQLs e me informe o resultado!**



