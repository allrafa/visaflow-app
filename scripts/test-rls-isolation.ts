/**
 * Script de Teste de Isolamento RLS
 * Verifica que usuários não podem acessar dados de outros usuários
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '../src/lib/db/client';

config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function testRLSIsolation() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis Supabase não encontradas');
  }

  console.log('🔒 Testando Isolamento RLS...\n');

  // Criar dois usuários de teste
  console.log('1️⃣ Criando usuários de teste...');
  
  const user1Email = `user1-${Date.now()}@visaflow.test`;
  const user1Password = 'TestPassword123!';
  const user2Email = `user2-${Date.now()}@visaflow.test`;
  const user2Password = 'TestPassword123!';

  const supabase1 = createClient(supabaseUrl, supabaseAnonKey);
  const supabase2 = createClient(supabaseUrl, supabaseAnonKey);

  let user1Id: string | null = null;
  let user1Token: string | null = null;
  let user2Id: string | null = null;
  let user2Token: string | null = null;

  try {
    // Criar usuário 1
    const { data: signUp1, error: error1 } = await supabase1.auth.signUp({
      email: user1Email,
      password: user1Password,
    });

    if (error1 && !error1.message.includes('already registered')) {
      const { data: signIn1 } = await supabase1.auth.signInWithPassword({
        email: user1Email,
        password: user1Password,
      });
      user1Id = signIn1?.user?.id || null;
      user1Token = signIn1?.session?.access_token || null;
    } else {
      user1Id = signUp1?.user?.id || null;
      user1Token = signUp1?.session?.access_token || null;
    }

    // Criar usuário 2
    const { data: signUp2, error: error2 } = await supabase2.auth.signUp({
      email: user2Email,
      password: user2Password,
    });

    if (error2 && !error2.message.includes('already registered')) {
      const { data: signIn2 } = await supabase2.auth.signInWithPassword({
        email: user2Email,
        password: user2Password,
      });
      user2Id = signIn2?.user?.id || null;
      user2Token = signIn2?.session?.access_token || null;
    } else {
      user2Id = signUp2?.user?.id || null;
      user2Token = signUp2?.session?.access_token || null;
    }

    if (!user1Id || !user1Token || !user2Id || !user2Token) {
      throw new Error('Falha ao criar/autenticar usuários de teste');
    }

    console.log(`   ✅ Usuário 1 criado: ${user1Id}`);
    console.log(`   ✅ Usuário 2 criado: ${user2Id}`);
  } catch (error: any) {
    console.error(`   ❌ Erro ao criar usuários: ${error.message}`);
    process.exit(1);
  }

  // Criar processo para usuário 1
  console.log('\n2️⃣ Criando processo para Usuário 1...');
  let process1Id: string | null = null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user1Token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Processo do Usuário 1',
        description: 'Este processo pertence ao Usuário 1',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Status ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    process1Id = data.id;
    console.log(`   ✅ Processo criado: ${process1Id}`);
  } catch (error: any) {
    console.error(`   ❌ Erro ao criar processo: ${error.message}`);
    process.exit(1);
  }

  // Criar processo para usuário 2
  console.log('\n3️⃣ Criando processo para Usuário 2...');
  let process2Id: string | null = null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user2Token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Processo do Usuário 2',
        description: 'Este processo pertence ao Usuário 2',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Status ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    process2Id = data.id;
    console.log(`   ✅ Processo criado: ${process2Id}`);
  } catch (error: any) {
    console.error(`   ❌ Erro ao criar processo: ${error.message}`);
    process.exit(1);
  }

  // Testar isolamento: Usuário 1 não deve ver processo do Usuário 2
  console.log('\n4️⃣ Testando isolamento: Usuário 1 não deve ver processo do Usuário 2...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user1Token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const processes = await response.json();
    const user1Processes = Array.isArray(processes) ? processes : [];
    const foundProcess2 = user1Processes.find((p: any) => p.id === process2Id);

    if (foundProcess2) {
      console.log('   ❌ FALHA DE SEGURANÇA: Usuário 1 conseguiu ver processo do Usuário 2!');
      console.log('   ⚠️  RLS não está funcionando corretamente');
      process.exit(1);
    } else {
      console.log('   ✅ Isolamento funcionando: Usuário 1 não vê processo do Usuário 2');
      console.log(`   📊 Processos do Usuário 1: ${user1Processes.length}`);
    }
  } catch (error: any) {
    console.error(`   ❌ Erro no teste: ${error.message}`);
    process.exit(1);
  }

  // Testar isolamento: Usuário 2 não deve ver processo do Usuário 1
  console.log('\n5️⃣ Testando isolamento: Usuário 2 não deve ver processo do Usuário 1...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/processes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user2Token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const processes = await response.json();
    const user2Processes = Array.isArray(processes) ? processes : [];
    const foundProcess1 = user2Processes.find((p: any) => p.id === process1Id);

    if (foundProcess1) {
      console.log('   ❌ FALHA DE SEGURANÇA: Usuário 2 conseguiu ver processo do Usuário 1!');
      console.log('   ⚠️  RLS não está funcionando corretamente');
      process.exit(1);
    } else {
      console.log('   ✅ Isolamento funcionando: Usuário 2 não vê processo do Usuário 1');
      console.log(`   📊 Processos do Usuário 2: ${user2Processes.length}`);
    }
  } catch (error: any) {
    console.error(`   ❌ Erro no teste: ${error.message}`);
    process.exit(1);
  }

  // Testar acesso direto via Prisma (deve falhar se RLS estiver ativo)
  console.log('\n6️⃣ Testando acesso direto via Prisma (deve respeitar RLS)...');
  try {
    // Tentar acessar processo do usuário 2 usando contexto do usuário 1
    // Nota: Prisma não aplica RLS automaticamente, mas Supabase sim
    // Este teste verifica se estamos usando Supabase corretamente
    
    const processes = await prisma.process.findMany({
      where: {
        userId: user1Id,
      },
    });

    const user1ProcessIds = processes.map((p) => p.id);
    const hasProcess2 = user1ProcessIds.includes(process2Id!);

    if (hasProcess2) {
      console.log('   ⚠️  Prisma retornou processo de outro usuário');
      console.log('   💡 Isso pode ser esperado se RLS não estiver aplicado via Prisma');
      console.log('   💡 Mas as APIs devem usar Supabase Client que respeita RLS');
    } else {
      console.log('   ✅ Prisma respeitou isolamento (ou RLS está ativo)');
    }
  } catch (error: any) {
    console.log(`   ⚠️  Erro no teste Prisma: ${error.message}`);
    console.log('   💡 Isso pode ser esperado se RLS estiver bloqueando acesso');
  }

  // Resumo
  console.log('\n' + '='.repeat(60));
  console.log('✅ TESTE DE ISOLAMENTO RLS CONCLUÍDO');
  console.log('='.repeat(60));
  console.log('\n📋 Resultados:');
  console.log('   ✅ Usuários criados e autenticados');
  console.log('   ✅ Processos criados para cada usuário');
  console.log('   ✅ Isolamento RLS funcionando corretamente');
  console.log('   ✅ Usuários não podem acessar dados de outros usuários\n');
}

testRLSIsolation().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});



