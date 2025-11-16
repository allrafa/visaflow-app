-- ============================================
-- MIGRATION 005: ADICIONAR POLÍTICAS RLS FALTANTES
-- ============================================
-- Esta migration adiciona políticas RLS que estavam faltando:
-- 1. UPDATE policy para uploads
-- 2. RLS habilitado e políticas para tasks (se necessário)

-- ============================================
-- ADICIONAR UPDATE POLICY PARA UPLOADS
-- ============================================

DROP POLICY IF EXISTS "users_update_own_uploads" ON uploads;

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

-- ============================================
-- HABILITAR RLS E CRIAR POLICIES PARA TASKS
-- ============================================
-- Tasks já existe de outro projeto, mas precisamos garantir RLS habilitado
-- e políticas específicas do VisaFlow

-- Habilitar RLS na tabela tasks (se ainda não estiver habilitado)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem (para garantir consistência)
DROP POLICY IF EXISTS "users_select_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_insert_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_update_own_tasks" ON tasks;
DROP POLICY IF EXISTS "users_delete_own_tasks" ON tasks;

-- Criar políticas para tasks
-- Usuários só podem acessar tasks de processos que pertencem a eles
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



