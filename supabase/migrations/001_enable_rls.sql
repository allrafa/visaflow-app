-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================
-- Habilitar RLS em todas as tabelas

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES PARA PROCESSES
-- ============================================

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

-- Users can only SELECT their own audit logs
CREATE POLICY "users_select_own_audit_logs"
ON audit_logs FOR SELECT
USING (auth.uid()::text = user_id);

-- Users can only INSERT their own audit logs
CREATE POLICY "users_insert_own_audit_logs"
ON audit_logs FOR INSERT
WITH CHECK (auth.uid()::text = user_id);



