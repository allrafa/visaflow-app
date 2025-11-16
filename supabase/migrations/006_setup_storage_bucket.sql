-- ============================================
-- MIGRATION 006: CONFIGURAR SUPABASE STORAGE BUCKET
-- ============================================
-- Esta migration configura o bucket 'uploads' no Supabase Storage
-- e cria as políticas RLS necessárias para acesso seguro

-- ============================================
-- NOTA IMPORTANTE
-- ============================================
-- O bucket precisa ser criado manualmente no Supabase Dashboard:
-- 1. Acesse: https://supabase.com/dashboard/project/[seu-projeto]/storage/buckets
-- 2. Clique em "New bucket"
-- 3. Nome: uploads
-- 4. Public: false (bucket privado)
-- 5. File size limit: 10485760 (10MB)
-- 6. Allowed MIME types: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg

-- ============================================
-- POLÍTICAS RLS PARA STORAGE
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
-- O storage_path é formatado como: userId/taskId/timestamp_filename
-- Verificamos que o primeiro componente do caminho é o userId do usuário autenticado
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

