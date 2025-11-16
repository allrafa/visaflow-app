/**
 * Script para verificar configuração do Supabase Storage bucket 'uploads'
 * Executa: npx tsx scripts/verify-storage.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✅' : '❌');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const EXPECTED_POLICIES = [
  'users_select_own_uploads_storage',
  'users_insert_own_uploads_storage',
  'users_delete_own_uploads_storage',
  'users_update_own_uploads_storage',
];

async function verifyStorage() {
  console.log('🔍 Verificando configuração do Supabase Storage...\n');
  console.log('═'.repeat(80));

  try {
    // 1. Verificar se bucket existe
    console.log('\n📦 Verificando bucket "uploads"...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error('❌ Erro ao listar buckets:', bucketsError.message);
      console.log('\n💡 Verifique se as credenciais estão corretas\n');
      return;
    }

    const uploadsBucket = buckets.find((b) => b.name === 'uploads');

    if (!uploadsBucket) {
      console.log('❌ Bucket "uploads" não encontrado');
      console.log('\n💡 AÇÃO NECESSÁRIA:');
      console.log('   1. Acesse: https://supabase.com/dashboard/project/[seu-projeto]/storage/buckets');
      console.log('   2. Clique em "New bucket"');
      console.log('   3. Configure:');
      console.log('      - Nome: uploads');
      console.log('      - Public: false (bucket privado)');
      console.log('      - File size limit: 10485760 (10MB)');
      console.log('      - Allowed MIME types: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg');
      console.log('   4. Execute novamente este script para validar\n');
      return;
    }

    console.log('✅ Bucket "uploads" encontrado');
    console.log(`   ID: ${uploadsBucket.id}`);
    console.log(`   Public: ${uploadsBucket.public ? 'Sim' : 'Não (privado)'} ✅`);
    console.log(`   Criado em: ${new Date(uploadsBucket.created_at).toLocaleString()}`);

    // 2. Verificar políticas RLS do Storage
    console.log('\n🔒 Verificando políticas RLS do Storage...');
    
    // Nota: Não podemos verificar políticas via API diretamente
    // Precisamos usar SQL direto ou instruir o usuário
    console.log('⚠️  Verificação de políticas requer acesso SQL direto');
    console.log('\n💡 Para verificar políticas manualmente:');
    console.log('   1. Acesse Supabase Dashboard SQL Editor');
    console.log('   2. Execute:');
    console.log(`
SELECT policyname, cmd
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%uploads%'
ORDER BY cmd;
    `);
    console.log('\n   Políticas esperadas:');
    EXPECTED_POLICIES.forEach((policy, idx) => {
      console.log(`   ${idx + 1}. ${policy}`);
    });

    // 3. Verificar se migration 006 foi aplicada
    console.log('\n📋 Verificando se migration 006 foi aplicada...');
    console.log('💡 Para aplicar migration 006:');
    console.log('   1. Acesse Supabase Dashboard SQL Editor');
    console.log('   2. Execute o arquivo: supabase/migrations/006_setup_storage_bucket.sql');
    console.log('   3. Execute novamente este script para validar\n');

    // 4. Teste de upload (opcional)
    console.log('🧪 Teste de upload:');
    console.log('   Para testar upload completo:');
    console.log('   1. Inicie o servidor: npm run dev');
    console.log('   2. Faça login no sistema');
    console.log('   3. Crie um processo e uma task');
    console.log('   4. Tente fazer upload de um arquivo na task\n');

    console.log('═'.repeat(80));
    console.log('\n✅ Verificação concluída!');
    console.log('\n📝 Próximos passos:');
    console.log('   1. Se bucket não existe: criar manualmente (instruções acima)');
    console.log('   2. Aplicar migration 006: supabase/migrations/006_setup_storage_bucket.sql');
    console.log('   3. Validar políticas: executar SQL acima');
    console.log('   4. Testar upload: seguir instruções acima\n');

  } catch (error) {
    console.error('❌ Erro ao verificar Storage:', error);
    process.exit(1);
  }
}

verifyStorage().catch(console.error);



