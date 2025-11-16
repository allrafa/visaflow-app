-- ============================================
-- MIGRATION 007: APLICAR RLS COMPLETO
-- ============================================
-- Esta migration consolida tudo:
-- 1. Habilita RLS em todas as tabelas
-- 2. Cria todas as policies RLS
-- 3. Cria storage policies
-- 
-- Use esta migration se as migrations 005 e 006 não foram aplicadas corretamente

-- ============================================
-- PASSO 1: HABILITAR RLS EM TODAS AS TABELAS
-- ============================================

ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PASSO 2: POLICIES PARA PROCESSES
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
-- PASSO 3: POLICIES PARA TASKS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_insert_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_update_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_delete_own_tasks" ON tasks;

CREATE POLICY "users_select_own_tasks"
ON tasks FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = tasks.process_id
    AND processes.user_id = auth.uid()::text
  )
);

CREATE POLICY "users_insert_own_tasks"
ON tasks FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM processes
    WHERE processes.id = tasks.process_id
    AND processes.user_id = auth.uid()::text
  )
);

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
-- PASSO 4: POLICIES PARA UPLOADS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_uploads" ON uploads;
DROP POLICY IF EXISTS "users_insert_own_uploads" ON uploads;
DROP POLICY IF EXISTS "users_update_own_uploads" ON uploads;
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

CREATE POLICY "users_update_own_uploads"
ON uploads FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM tasks
    JOIN processes ON processes.id = tasks.process_id
    WHERE tasks.id = uploads.task_id
    AND processes.user_id = auth.uid()::text
  )
)
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
-- PASSO 5: POLICIES PARA CRITERIA_EVIDENCES
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
-- PASSO 6: POLICIES PARA RECOMMENDATION_LETTERS
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

-- ============================================
-- PASSO 7: POLICIES PARA AUDIT_LOGS
-- ============================================

DROP POLICY IF EXISTS "users_select_own_audit_logs" ON audit_logs;
DROP POLICY IF EXISTS "users_insert_own_audit_logs" ON audit_logs;

CREATE POLICY "users_select_own_audit_logs"
ON audit_logs FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "users_insert_own_audit_logs"
ON audit_logs FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

-- ============================================
-- PASSO 8: STORAGE POLICIES PARA UPLOADS BUCKET
-- ============================================

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "users_select_own_uploads_storage" ON storage.objects;
DROP POLICY IF EXISTS "users_insert_own_uploads_storage" ON storage.objects;
DROP POLICY IF EXISTS "users_delete_own_uploads_storage" ON storage.objects;
DROP POLICY IF EXISTS "users_update_own_uploads_storage" ON storage.objects;

-- Política para SELECT: Usuários podem ler arquivos de suas próprias tasks
CREATE POLICY "users_select_own_uploads_storage"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'uploads' AND
  EXISTS (
    SELECT 1 FROM uploads
    JOIN tasks ON tasks.id = uploads.task_id
    JOIN processes ON processes.id = tasks.process_id
    WHERE uploads.storage_path = name
    AND processes.user_id = auth.uid()::text
  )
);

-- Política para INSERT: Usuários podem fazer upload em pastas de suas próprias tasks
CREATE POLICY "users_insert_own_uploads_storage"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'uploads' AND
  auth.uid()::text = split_part(name, '/', 1)
);

-- Política para DELETE: Usuários podem deletar arquivos de suas próprias tasks
CREATE POLICY "users_delete_own_uploads_storage"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'uploads' AND
  EXISTS (
    SELECT 1 FROM uploads
    JOIN tasks ON tasks.id = uploads.task_id
    JOIN processes ON processes.id = tasks.process_id
    WHERE uploads.storage_path = name
    AND processes.user_id = auth.uid()::text
  )
);

-- Política para UPDATE: Usuários podem atualizar arquivos de suas próprias tasks
CREATE POLICY "users_update_own_uploads_storage"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'uploads' AND
  EXISTS (
    SELECT 1 FROM uploads
    JOIN tasks ON tasks.id = uploads.task_id
    JOIN processes ON processes.id = tasks.process_id
    WHERE uploads.storage_path = name
    AND processes.user_id = auth.uid()::text
  )
)
WITH CHECK (
  bucket_id = 'uploads' AND
  EXISTS (
    SELECT 1 FROM uploads
    JOIN tasks ON tasks.id = uploads.task_id
    JOIN processes ON processes.id = tasks.process_id
    WHERE uploads.storage_path = name
    AND processes.user_id = auth.uid()::text
  )
);

-- ============================================
-- CONCLUSÃO
-- ============================================
-- Esta migration deve:
-- ✅ Habilitar RLS em 6 tabelas
-- ✅ Criar 18 policies RLS
-- ✅ Criar 4 storage policies
-- 
-- Total: 22 policies criadas

