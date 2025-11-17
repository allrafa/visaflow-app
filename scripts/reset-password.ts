/**
 * Script para resetar senha de usuário via Supabase Admin API
 * 
 * Uso:
 * npx tsx scripts/reset-password.ts <email> <nova-senha>
 * 
 * Exemplo:
 * npx tsx scripts/reset-password.ts iamrafaelraio@gmail.com NovaSenha123
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env');
  process.exit(1);
}

// Admin client with service role key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function resetPassword(email: string, newPassword: string) {
  console.log(`\n🔄 Resetando senha para: ${email}\n`);

  try {
    // Update user password using Admin API
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      // First get user ID by email
      (await supabaseAdmin.auth.admin.listUsers()).data.users.find(u => u.email === email)?.id || '',
      { password: newPassword }
    );

    if (error) {
      console.error('❌ Erro ao resetar senha:', error.message);
      process.exit(1);
    }

    console.log('✅ Senha resetada com sucesso!');
    console.log('\nDetalhes do usuário:');
    console.log('- Email:', data.user.email);
    console.log('- ID:', data.user.id);
    console.log('- Última atualização:', new Date(data.user.updated_at!).toLocaleString('pt-BR'));
    console.log('\n🔐 Nova senha:', newPassword);
    console.log('\n✨ O usuário já pode fazer login com a nova senha!');

  } catch (error: any) {
    console.error('❌ Erro inesperado:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
📖 Uso: npx tsx scripts/reset-password.ts <email> <nova-senha>

Exemplo:
  npx tsx scripts/reset-password.ts iamrafaelraio@gmail.com NovaSenha123

Requisitos:
  - NEXT_PUBLIC_SUPABASE_URL definido em .env
  - SUPABASE_SERVICE_ROLE_KEY definido em .env (chave de admin)
  `);
  process.exit(1);
}

const [email, newPassword] = args;

// Validate password strength
if (newPassword.length < 6) {
  console.error('❌ Erro: A senha deve ter pelo menos 6 caracteres');
  process.exit(1);
}

resetPassword(email, newPassword);
