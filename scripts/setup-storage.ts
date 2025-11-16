/**
 * Script para configurar Supabase Storage bucket para uploads
 * Executa: npx tsx scripts/setup-storage.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erro: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar configuradas no .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function setupStorage() {
  console.log('🔧 Configurando Supabase Storage...\n');

  // Verificar se bucket já existe
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    console.error('❌ Erro ao listar buckets:', listError.message);
    return;
  }

  const uploadsBucket = buckets.find((b) => b.name === 'uploads');

  if (uploadsBucket) {
    console.log('✅ Bucket "uploads" já existe');
  } else {
    console.log('📦 Criando bucket "uploads"...');
    
    const { data, error } = await supabase.storage.createBucket('uploads', {
      public: false, // Bucket privado
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png',
        'image/jpeg',
      ],
    });

    if (error) {
      console.error('❌ Erro ao criar bucket:', error.message);
      console.log('\n💡 Solução: Crie o bucket manualmente no Supabase Dashboard:');
      console.log('   1. Acesse: https://supabase.com/dashboard/project/[seu-projeto]/storage/buckets');
      console.log('   2. Clique em "New bucket"');
      console.log('   3. Nome: uploads');
      console.log('   4. Public: false');
      console.log('   5. File size limit: 10485760 (10MB)');
      console.log('   6. Allowed MIME types: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg');
      return;
    }

    console.log('✅ Bucket "uploads" criado com sucesso');
  }

  // Verificar políticas RLS do Storage
  console.log('\n📋 Verificando políticas de acesso...');
  console.log('⚠️  Nota: Políticas RLS do Storage devem ser configuradas manualmente no Supabase Dashboard');
  console.log('\n💡 Políticas recomendadas:');
  console.log('   1. SELECT: Usuários podem ler seus próprios arquivos');
  console.log('   2. INSERT: Usuários podem fazer upload em suas próprias pastas');
  console.log('   3. DELETE: Usuários podem deletar seus próprios arquivos');
  console.log('\n   SQL para aplicar políticas:');
  console.log(`
-- Permitir SELECT de arquivos próprios
CREATE POLICY "Users can view own uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Permitir INSERT de arquivos próprios
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Permitir DELETE de arquivos próprios
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
  `);

  console.log('\n✅ Configuração do Storage concluída!');
}

setupStorage().catch((error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});



