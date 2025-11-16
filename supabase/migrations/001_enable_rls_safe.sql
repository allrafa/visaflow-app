-- ============================================
-- ROW LEVEL SECURITY POLICIES (VERSÃO SEGURA)
-- ============================================
-- Esta versão verifica se as tabelas existem antes de aplicar RLS
-- Use esta versão se receber erro "relation does not exist"

-- Verificar e habilitar RLS em todas as tabelas
DO $$
BEGIN
    -- Users
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS habilitado em: users';
    ELSE
        RAISE WARNING 'Tabela users não encontrada!';
    END IF;

    -- Processes
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'processes') THEN
        ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS habilitado em: processes';
    ELSE
        RAISE WARNING 'Tabela processes não encontrada!';
    END IF;

    -- Tasks
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tasks') THEN
        ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS habilitado em: tasks';
    ELSE
        RAISE WARNING 'Tabela tasks não encontrada!';
    END IF;

    -- Uploads
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'uploads') THEN
        ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS habilitado em: uploads';
    ELSE
        RAISE WARNING 'Tabela uploads não encontrada!';
    END IF;

    -- Criteria Evidences
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'criteria_evidences') THEN
        ALTER TABLE criteria_evidences ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS habilitado em: criteria_evidences';
    ELSE
        RAISE WARNING 'Tabela criteria_evidences não encontrada!';
    END IF;

    -- Recommendation Letters
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'recommendation_letters') THEN
        ALTER TABLE recommendation_letters ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS habilitado em: recommendation_letters';
    ELSE
        RAISE WARNING 'Tabela recommendation_letters não encontrada!';
    END IF;

    -- Audit Logs
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'audit_logs') THEN
        ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS habilitado em: audit_logs';
    ELSE
        RAISE WARNING 'Tabela audit_logs não encontrada!';
    END IF;
END $$;

-- ============================================
-- POLICIES PARA PROCESSES
-- ============================================

-- Remover policies existentes se houver (para evitar erro de duplicação)
DROP POLICY IF EXISTS "users_select_own_processes" ON processes;
DROP POLICY IF EXISTS "users_insert_own_processes" ON processes;
DROP POLICY IF EXISTS "users_update_own_processes" ON processes;
DROP POLICY IF EXISTS "users_delete_own_processes" ON processes;

-- Users can only SELECT their own processes
CREATE POLICY "users_select_own_processes"
ON processes FOR SELECT
USING (auth.uid()::text = user_id);

-- Users can only INSERT processes for themselves
CREATE POLICY "users_insert_own_processes"
ON processes FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

-- Users can only UPDATE their own processes
CREATE POLICY "users_update_own_processes"
ON processes FOR UPDATE
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

-- Users can only DELETE their own processes
CREATE POLICY "users_delete_own_processes"
ON processes FOR DELETE
USING (auth.uid()::text = user_id);

-- ============================================
-- POLICIES PARA TASKS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_insert_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_update_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_delete_own_tasks" ON tasks;

-- Users can only SELECT tasks from their own processes
CREATE POLICY "users_select_own_tasks"
ON tasks FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = tasks.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only INSERT tasks in their own processes
CREATE POLICY "users_insert_own_tasks"
ON tasks FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = tasks.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only UPDATE tasks from their own processes
CREATE POLICY "users_update_own_tasks"
ON tasks FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = tasks.process_id
    AND processes.user_id = auth.uid()::text
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = tasks.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only DELETE tasks from their own processes
CREATE POLICY "users_delete_own_tasks"
ON tasks FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = tasks.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- ============================================
-- POLICIES PARA UPLOADS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_uploads" ON uploads;
DROP POLICY IF EXISTS "users_insert_own_uploads" ON uploads;
DROP POLICY IF EXISTS "users_delete_own_uploads" ON uploads;

-- Users can only SELECT uploads from their own tasks
CREATE POLICY "users_select_own_uploads"
ON uploads FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM tasks
    JOIN processes ON processes.id = tasks.process_id
    WHERE tasks.id = uploads.task_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only INSERT uploads in their own tasks
CREATE POLICY "users_insert_own_uploads"
ON uploads FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM tasks
    JOIN processes ON processes.id = tasks.process_id
    WHERE tasks.id = uploads.task_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only DELETE uploads from their own tasks
CREATE POLICY "users_delete_own_uploads"
ON uploads FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM tasks
    JOIN processes ON processes.id = tasks.process_id
    WHERE tasks.id = uploads.task_id
    AND processes.user_id = auth.uid()::text
  )
);

-- ============================================
-- POLICIES PARA CRITERIA_EVIDENCES
-- ============================================

DROP POLICY IF EXISTS "users_select_own_criteria" ON criteria_evidences;
DROP POLICY IF EXISTS "users_insert_own_criteria" ON criteria_evidences;
DROP POLICY IF EXISTS "users_update_own_criteria" ON criteria_evidences;

-- Users can only SELECT criteria from their own processes
CREATE POLICY "users_select_own_criteria"
ON criteria_evidences FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = criteria_evidences.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only INSERT criteria in their own processes
CREATE POLICY "users_insert_own_criteria"
ON criteria_evidences FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = criteria_evidences.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only UPDATE criteria from their own processes
CREATE POLICY "users_update_own_criteria"
ON criteria_evidences FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = criteria_evidences.process_id
    AND processes.user_id = auth.uid()::text
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = criteria_evidences.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- ============================================
-- POLICIES PARA RECOMMENDATION_LETTERS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_letters" ON recommendation_letters;
DROP POLICY IF EXISTS "users_insert_own_letters" ON recommendation_letters;
DROP POLICY IF EXISTS "users_update_own_letters" ON recommendation_letters;

-- Users can only SELECT letters from their own processes
CREATE POLICY "users_select_own_letters"
ON recommendation_letters FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = recommendation_letters.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only INSERT letters in their own processes
CREATE POLICY "users_insert_own_letters"
ON recommendation_letters FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = recommendation_letters.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- Users can only UPDATE letters from their own processes
CREATE POLICY "users_update_own_letters"
ON recommendation_letters FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = recommendation_letters.process_id
    AND processes.user_id = auth.uid()::text
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = recommendation_letters.process_id
    AND processes.user_id = auth.uid()::text
  )
);

-- ============================================
-- POLICIES PARA AUDIT_LOGS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_audit_logs" ON audit_logs;
DROP POLICY IF EXISTS "users_insert_own_audit_logs" ON audit_logs;

-- Users can only SELECT their own audit logs
CREATE POLICY "users_select_own_audit_logs"
ON audit_logs FOR SELECT
USING (auth.uid()::text = user_id);

-- Users can only INSERT their own audit logs
CREATE POLICY "users_insert_own_audit_logs"
ON audit_logs FOR INSERT
WITH CHECK (auth.uid()::text = user_id);



