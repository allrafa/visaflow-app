# 🔐 INSTRUÇÕES COMPLETAS PARA APLICAR RLS

**Status:** ✅ Tabelas criadas - Próximo passo: Criar tabela tasks e aplicar RLS

---

## ✅ O QUE JÁ FOI FEITO

- ✅ Enums criados: `ProcessPhase`, `TaskStatus`, `EB1Criteria`
- ✅ Tabelas criadas: `processes`, `uploads`, `criteria_evidences`, `recommendation_letters`

---

## ⚠️ PROBLEMA: TABELA TASKS

A tabela `tasks` existente tem estrutura diferente (do projeto Laro). Precisamos criar uma tabela `tasks` com a estrutura do VisaFlow.

---

## 📋 PASSOS PARA COMPLETAR

### Passo 1: Criar Tabela Tasks do VisaFlow

Execute este SQL no Supabase Dashboard:

```sql
-- Criar tabela tasks do VisaFlow
CREATE TABLE IF NOT EXISTS "tasks" (
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

-- Criar índice
CREATE INDEX IF NOT EXISTS "tasks_process_id_phase_idx" ON "tasks"("process_id", "phase");

-- Foreign key para processes
DO $$ BEGIN
    ALTER TABLE "tasks" ADD CONSTRAINT "tasks_process_id_fkey" 
    FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Atualizar foreign key de uploads
DO $$ BEGIN
    ALTER TABLE "uploads" DROP CONSTRAINT IF EXISTS "uploads_task_id_fkey";
    ALTER TABLE "uploads" ADD CONSTRAINT "uploads_task_id_fkey" 
    FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
```

**⚠️ NOTA:** Se der erro porque a tabela `tasks` já existe, você tem duas opções:

**Opção A:** Renomear a tabela existente e criar a nova:
```sql
ALTER TABLE tasks RENAME TO laro_tasks;
-- Depois executar o SQL acima
```

**Opção B:** Usar nome diferente para a tabela do VisaFlow (requer adaptar código):
```sql
-- Criar como visaflow_tasks
CREATE TABLE "visaflow_tasks" (...);
```

### Passo 2: Aplicar RLS

Execute o arquivo: `supabase/migrations/003_enable_rls_visaflow_only.sql`

Ou execute este SQL completo:

```sql
-- Habilitar RLS
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_letters ENABLE ROW LEVEL SECURITY;

-- Policies para processes
CREATE POLICY "users_select_own_processes" ON processes FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "users_insert_own_processes" ON processes FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "users_update_own_processes" ON processes FOR UPDATE USING (auth.uid()::text = user_id) WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "users_delete_own_processes" ON processes FOR DELETE USING (auth.uid()::text = user_id);

-- Policies para tasks
CREATE POLICY "users_select_own_tasks" ON tasks FOR SELECT USING (EXISTS (SELECT 1 FROM processes WHERE processes.id = tasks.process_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_insert_own_tasks" ON tasks FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM processes WHERE processes.id = tasks.process_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_update_own_tasks" ON tasks FOR UPDATE USING (EXISTS (SELECT 1 FROM processes WHERE processes.id = tasks.process_id AND processes.user_id = auth.uid()::text)) WITH CHECK (EXISTS (SELECT 1 FROM processes WHERE processes.id = tasks.process_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_delete_own_tasks" ON tasks FOR DELETE USING (EXISTS (SELECT 1 FROM processes WHERE processes.id = tasks.process_id AND processes.user_id = auth.uid()::text));

-- Policies para uploads
CREATE POLICY "users_select_own_uploads" ON uploads FOR SELECT USING (EXISTS (SELECT 1 FROM tasks JOIN processes ON processes.id = tasks.process_id WHERE tasks.id = uploads.task_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_insert_own_uploads" ON uploads FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM tasks JOIN processes ON processes.id = tasks.process_id WHERE tasks.id = uploads.task_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_delete_own_uploads" ON uploads FOR DELETE USING (EXISTS (SELECT 1 FROM tasks JOIN processes ON processes.id = tasks.process_id WHERE tasks.id = uploads.task_id AND processes.user_id = auth.uid()::text));

-- Policies para criteria_evidences
CREATE POLICY "users_select_own_criteria" ON criteria_evidences FOR SELECT USING (EXISTS (SELECT 1 FROM processes WHERE processes.id = criteria_evidences.process_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_insert_own_criteria" ON criteria_evidences FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM processes WHERE processes.id = criteria_evidences.process_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_update_own_criteria" ON criteria_evidences FOR UPDATE USING (EXISTS (SELECT 1 FROM processes WHERE processes.id = criteria_evidences.process_id AND processes.user_id = auth.uid()::text)) WITH CHECK (EXISTS (SELECT 1 FROM processes WHERE processes.id = criteria_evidences.process_id AND processes.user_id = auth.uid()::text));

-- Policies para recommendation_letters
CREATE POLICY "users_select_own_letters" ON recommendation_letters FOR SELECT USING (EXISTS (SELECT 1 FROM processes WHERE processes.id = recommendation_letters.process_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_insert_own_letters" ON recommendation_letters FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM processes WHERE processes.id = recommendation_letters.process_id AND processes.user_id = auth.uid()::text));
CREATE POLICY "users_update_own_letters" ON recommendation_letters FOR UPDATE USING (EXISTS (SELECT 1 FROM processes WHERE processes.id = recommendation_letters.process_id AND processes.user_id = auth.uid()::text)) WITH CHECK (EXISTS (SELECT 1 FROM processes WHERE processes.id = recommendation_letters.process_id AND processes.user_id = auth.uid()::text));
```

### Passo 3: Verificar Aplicação

Execute:

```sql
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
- 5 tabelas com `rowsecurity = true`
- ~15-20 policies criadas

---

## 📝 ARQUIVOS CRIADOS

- `002_create_visaflow_tables_only.sql` - Cria tabelas específicas
- `003_enable_rls_visaflow_only.sql` - Aplica RLS (precisa de tabela tasks)
- `004_create_visaflow_tasks.sql` - Cria tabela tasks do VisaFlow

---

**Execute o Passo 1 primeiro e me informe o resultado!**



