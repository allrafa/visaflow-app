/**
 * Script de Teste de API Routes
 * Testa GET e POST /api/processes com autenticação
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface TestResult {
  name: string;
  success: boolean;
  error?: string;
  data?: any;
}

async function testAPIRoutes() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis Supabase não encontradas');
  }

  console.log('🧪 Testando API Routes...\n');
  console.log(`📍 API Base URL: ${API_BASE_URL}\n`);

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const results: TestResult[] = [];

  // 1. Criar/fazer login de usuário de teste
  console.log('1️⃣ Preparando autenticação...');
  const testEmail = `test-api-${Date.now()}@visaflow.test`;
  const testPassword = 'TestPassword123!';

  let userId: string | null = null;
  let accessToken: string | null = null;

  try {
    // Tentar criar usuário
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (signUpError && !signUpError.message.includes('already registered')) {
      // Se não for erro de "já registrado", tentar login
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (signInError) {
        throw new Error(`Falha ao criar/login: ${signInError.message}`);
      }

      userId = signInData.user?.id || null;
      accessToken = signInData.session?.access_token || null;
    } else if (signUpData.user) {
      userId = signUpData.user.id;
      accessToken = signUpData.session?.access_token || null;
    }

    if (!userId || !accessToken) {
      throw new Error('Não foi possível obter userId ou accessToken');
    }

    console.log(`   ✅ Autenticação preparada`);
    console.log(`   🆔 User ID: ${userId}`);
  } catch (error: any) {
    console.error(`   ❌ Erro na autenticação: ${error.message}`);
    console.error('\n💡 Dica: Certifique-se de que:');
    console.error('   1. O servidor Next.js está rodando (npm run dev)');
    console.error('   2. As variáveis de ambiente estão configuradas');
    console.error('   3. O Supabase está acessível\n');
    process.exit(1);
  }

  // 2. Testar GET /api/processes (sem autenticação - deve falhar)
  console.log('\n2️⃣ Testando GET /api/processes (sem autenticação)...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'GET',
    });

    const data = await response.json();
    
    if (response.status === 401) {
      console.log('   ✅ Requisição rejeitada corretamente (401 Unauthorized)');
      results.push({ name: 'GET sem auth', success: true });
    } else {
      console.log(`   ❌ Esperado 401, recebido ${response.status}`);
      results.push({ 
        name: 'GET sem auth', 
        success: false, 
        error: `Status ${response.status}` 
      });
    }
  } catch (error: any) {
    console.error(`   ❌ Erro na requisição: ${error.message}`);
    results.push({ 
      name: 'GET sem auth', 
      success: false, 
      error: error.message 
    });
  }

  // 3. Testar GET /api/processes (com autenticação)
  console.log('\n3️⃣ Testando GET /api/processes (com autenticação)...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Status ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('   ✅ Requisição bem-sucedida');
    console.log(`   📊 Processos encontrados: ${Array.isArray(data) ? data.length : 0}`);
    results.push({ name: 'GET com auth', success: true, data });
  } catch (error: any) {
    console.error(`   ❌ Erro na requisição: ${error.message}`);
    results.push({ 
      name: 'GET com auth', 
      success: false, 
      error: error.message 
    });
  }

  // 4. Testar POST /api/processes (sem autenticação - deve falhar)
  console.log('\n4️⃣ Testando POST /api/processes (sem autenticação)...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Process',
        description: 'Test description',
      }),
    });

    const data = await response.json();
    
    if (response.status === 401) {
      console.log('   ✅ Requisição rejeitada corretamente (401 Unauthorized)');
      results.push({ name: 'POST sem auth', success: true });
    } else {
      console.log(`   ❌ Esperado 401, recebido ${response.status}`);
      results.push({ 
        name: 'POST sem auth', 
        success: false, 
        error: `Status ${response.status}` 
      });
    }
  } catch (error: any) {
    console.error(`   ❌ Erro na requisição: ${error.message}`);
    results.push({ 
      name: 'POST sem auth', 
      success: false, 
      error: error.message 
    });
  }

  // 5. Testar POST /api/processes (com autenticação)
  console.log('\n5️⃣ Testando POST /api/processes (com autenticação)...');
  let createdProcessId: string | null = null;

  try {
    const processData = {
      title: `Test Process ${Date.now()}`,
      description: 'Processo criado por script de teste',
      northStar: 'Testar funcionalidade de criação de processos',
    };

    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Status ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    createdProcessId = data.id;
    
    console.log('   ✅ Processo criado com sucesso');
    console.log(`   🆔 Process ID: ${data.id}`);
    console.log(`   📝 Title: ${data.title}`);
    console.log(`   📊 Phase: ${data.currentPhase}`);
    console.log(`   📈 Progress: ${data.progress}%`);
    results.push({ name: 'POST com auth', success: true, data });
  } catch (error: any) {
    console.error(`   ❌ Erro na requisição: ${error.message}`);
    results.push({ 
      name: 'POST com auth', 
      success: false, 
      error: error.message 
    });
  }

  // 6. Verificar que o processo criado aparece no GET
  if (createdProcessId) {
    console.log('\n6️⃣ Verificando processo criado no GET...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/processes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const processes = await response.json();
      const foundProcess = Array.isArray(processes) 
        ? processes.find((p: any) => p.id === createdProcessId)
        : null;

      if (foundProcess) {
        console.log('   ✅ Processo encontrado na listagem');
        results.push({ name: 'GET após POST', success: true });
      } else {
        console.log('   ⚠️  Processo não encontrado na listagem');
        results.push({ name: 'GET após POST', success: false, error: 'Processo não encontrado' });
      }
    } catch (error: any) {
      console.error(`   ❌ Erro na verificação: ${error.message}`);
      results.push({ 
        name: 'GET após POST', 
        success: false, 
        error: error.message 
      });
    }
  }

  // Resumo
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DOS TESTES');
  console.log('='.repeat(60));
  
  const successCount = results.filter((r) => r.success).length;
  const totalCount = results.length;

  results.forEach((result) => {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.name}`);
    if (!result.success && result.error) {
      console.log(`   Erro: ${result.error}`);
    }
  });

  console.log('\n' + '='.repeat(60));
  if (successCount === totalCount) {
    console.log(`✅ TODOS OS TESTES PASSARAM (${successCount}/${totalCount})`);
  } else {
    console.log(`⚠️  ALGUNS TESTES FALHARAM (${successCount}/${totalCount})`);
  }
  console.log('='.repeat(60));

  if (successCount < totalCount) {
    console.log('\n💡 Dicas para resolver problemas:');
    console.log('   1. Certifique-se de que o servidor Next.js está rodando (npm run dev)');
    console.log('   2. Verifique se as RLS policies foram aplicadas');
    console.log('   3. Verifique os logs do servidor para mais detalhes');
    console.log('   4. Execute validate-rls.ts para verificar RLS\n');
    process.exit(1);
  }
}

testAPIRoutes().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



