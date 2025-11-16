/**
 * Verificação direta de RLS via Supabase Client (não Prisma)
 * Prisma Accelerate pode não mostrar RLS corretamente
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variáveis de ambiente não configuradas');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function verifyRLSDirect() {
  console.log('🔍 VERIFICAÇÃO DIRETA DE RLS VIA SUPABASE CLIENT\n');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`📍 Projeto: ${SUPABASE_URL}\n`);

  // Tentar executar SQL direto via Supabase
  // Nota: Supabase não expõe execução SQL direta, mas podemos tentar outras formas
  
  console.log('📊 Verificando acesso às tabelas...\n');
  
  const tables = ['processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs'];
  
  for (const table of tables) {
    try {
      // Tentar SELECT sem autenticação (deve falhar se RLS estiver habilitado)
      const { data, error } = await supabase.from(table).select('*').limit(1);
      
      if (error) {
        if (error.code === '42501' || error.message.includes('permission denied') || error.message.includes('RLS')) {
          console.log(`   ✅ ${table} - RLS provavelmente HABILITADO (erro de permissão esperado)`);
        } else {
          console.log(`   ⚠️  ${table} - Erro: ${error.message.substring(0, 80)}`);
        }
      } else {
        // Se conseguiu ler sem autenticação, RLS pode estar desabilitado
        console.log(`   ⚠️  ${table} - Conseguiu ler sem autenticação (RLS pode estar desabilitado)`);
      }
    } catch (error: any) {
      console.log(`   ⚠️  ${table} - Erro: ${error.message.substring(0, 80)}`);
    }
  }

  console.log('\n💡 NOTA: Esta verificação é indireta.');
  console.log('   Para verificação completa, use o Dashboard do Supabase:');
  console.log('   https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc/database/policies\n');
}

verifyRLSDirect().catch((error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});



