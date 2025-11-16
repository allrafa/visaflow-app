-- ============================================
-- RLS POLICIES APENAS PARA TABELAS VISAFLOW
-- ============================================
-- Aplica RLS apenas nas tabelas específicas do VisaFlow
-- Não mexe com tabelas de outros projetos

-- Habilitar RLS nas tabelas do VisaFlow
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_letters ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES PARA PROCESSES
-- ============================================

DROP POLICY IF EXISTS "users_select_own_processes" ON processes;
DROP POLICY IF EXISTS "users_insert_own_processes" ON processes;
DROP POLICY IF EXISTS "users_update_own_processes" ON processes;
DROP POLICY IF EXISTS "users_delete_own_processes" ON processes;

CREATE POLICY "users_select_own_processes"
ON processes FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "users_insert_own_processes"
ON processes FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "users_update_own_processes"
ON processes FOR UPDATE
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "users_delete_own_processes"
ON processes FOR DELETE
USING (auth.uid()::text = user_id);

-- ============================================
-- POLICIES PARA UPLOADS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_uploads" ON uploads;
DROP POLICY IF EXISTS "users_insert_own_uploads" ON uploads;
DROP POLICY IF EXISTS "users_delete_own_uploads" ON uploads;

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

CREATE POLICY "users_select_own_criteria"
ON criteria_evidences FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = criteria_evidences.process_id
    AND processes.user_id = auth.uid()::text
  )
);

CREATE POLICY "users_insert_own_criteria"
ON criteria_evidences FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = criteria_evidences.process_id
    AND processes.user_id = auth.uid()::text
  )
);

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

CREATE POLICY "users_select_own_letters"
ON recommendation_letters FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = recommendation_letters.process_id
    AND processes.user_id = auth.uid()::text
  )
);

CREATE POLICY "users_insert_own_letters"
ON recommendation_letters FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = recommendation_letters.process_id
    AND processes.user_id = auth.uid()::text
  )
);

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



