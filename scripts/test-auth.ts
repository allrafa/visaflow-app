/**
 * Script de Teste de Autenticação
 * Testa criação de usuário, login e obtenção de sessão
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

async function testAuth() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis Supabase não encontradas');
  }

  console.log('🔐 Testando Autenticação...\n');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 1. Testar conexão básica
  console.log('1️⃣ Testando conexão com Supabase...');
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error && error.message !== 'Invalid Refresh Token: Refresh Token Not Found') {
      // Erro esperado se não houver sessão
      console.log(`   ⚠️  Sem sessão ativa (esperado): ${error.message}`);
    } else {
      console.log('   ✅ Conexão com Supabase estabelecida');
    }
  } catch (error: any) {
    console.error('   ❌ Erro ao conectar:', error.message);
    process.exit(1);
  }

  // 2. Criar usuário de teste (se não existir)
  console.log('\n2️⃣ Criando usuário de teste...');
  const testEmail = `test-${Date.now()}@visaflow.test`;
  const testPassword = 'TestPassword123!';

  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        emailRedirectTo: `${supabaseUrl}/auth/callback`,
      },
    });

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        console.log('   ⚠️  Usuário já existe, tentando fazer login...');
        
        // Tentar login
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword,
        });

        if (signInError) {
          console.error(`   ❌ Erro ao fazer login: ${signInError.message}`);
          process.exit(1);
        }

        console.log('   ✅ Login realizado com sucesso');
        console.log(`   📧 Email: ${testEmail}`);
        console.log(`   🆔 User ID: ${signInData.user?.id}`);
      } else {
        console.error(`   ❌ Erro ao criar usuário: ${signUpError.message}`);
        process.exit(1);
      }
    } else {
      console.log('   ✅ Usuário criado com sucesso');
      console.log(`   📧 Email: ${testEmail}`);
      console.log(`   🆔 User ID: ${signUpData.user?.id}`);
      
      if (!signUpData.session) {
        console.log('   ⚠️  Sessão não criada automaticamente (pode requerer confirmação de email)');
      }
    }
  } catch (error: any) {
    console.error('   ❌ Erro inesperado:', error.message);
    process.exit(1);
  }

  // 3. Verificar sessão atual
  console.log('\n3️⃣ Verificando sessão atual...');
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log(`   ⚠️  Sem sessão ativa: ${sessionError.message}`);
      console.log('   💡 Isso é normal se o email precisa ser confirmado');
    } else if (sessionData.session) {
      console.log('   ✅ Sessão ativa encontrada');
      console.log(`   🆔 User ID: ${sessionData.session.user.id}`);
      console.log(`   📧 Email: ${sessionData.session.user.email}`);
      console.log(`   ⏰ Expira em: ${new Date(sessionData.session.expires_at! * 1000).toLocaleString()}`);
    } else {
      console.log('   ⚠️  Nenhuma sessão ativa');
    }
  } catch (error: any) {
    console.error('   ❌ Erro ao verificar sessão:', error.message);
  }

  // 4. Testar obtenção de usuário atual
  console.log('\n4️⃣ Testando obtenção de usuário atual...');
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.log(`   ⚠️  Erro ao obter usuário: ${userError.message}`);
      console.log('   💡 Isso é normal se não houver sessão ativa');
    } else if (userData.user) {
      console.log('   ✅ Usuário obtido com sucesso');
      console.log(`   🆔 User ID: ${userData.user.id}`);
      console.log(`   📧 Email: ${userData.user.email}`);
      console.log(`   ✅ Email verificado: ${userData.user.email_confirmed_at ? 'Sim' : 'Não'}`);
    } else {
      console.log('   ⚠️  Nenhum usuário encontrado');
    }
  } catch (error: any) {
    console.error('   ❌ Erro inesperado:', error.message);
  }

  // Resumo
  console.log('\n' + '='.repeat(60));
  console.log('✅ TESTE DE AUTENTICAÇÃO CONCLUÍDO');
  console.log('='.repeat(60));
  console.log('\n📋 Próximos passos:');
  console.log('   1. Se o email precisa ser confirmado, verifique o email de confirmação');
  console.log('   2. Ou desabilite confirmação de email no Supabase Dashboard para testes');
  console.log('   3. Execute test-api-routes.ts para testar APIs com autenticação\n');
}

testAuth().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



