import { Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * Helper para autenticação em testes E2E
 * Usa Supabase Auth para criar sessão real
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Cria um usuário de teste no Supabase
 * @returns Credenciais do usuário criado
 * 
 * NOTA: Para testes E2E funcionarem corretamente, você precisa:
 * 1. Desabilitar confirmação de email no Supabase Dashboard (Settings > Auth > Email Auth)
 * 2. Ou usar um usuário pré-criado manualmente
 */
export async function createTestUser() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  const testEmail = `test-${Date.now()}@visaflow.test`;
  const testPassword = 'TestPassword123!';
  
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      // Desabilitar confirmação de email para testes
      emailRedirectTo: undefined,
    },
  });
  
  if (error) {
    // Se o erro for de email já confirmado ou usuário já existe, tentar fazer login
    if (error.message.includes('already registered') || error.message.includes('already confirmed')) {
      // Tentar fazer login com as credenciais
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
      
      if (loginError || !loginData.user) {
        throw new Error(`Failed to create/login test user: ${error.message}`);
      }
      
      return {
        email: testEmail,
        password: testPassword,
        user: loginData.user,
      };
    }
    
    throw new Error(`Failed to create test user: ${error.message}`);
  }
  
  // Se o usuário foi criado mas precisa de confirmação, tentar fazer login mesmo assim
  // (isso funciona se a confirmação de email estiver desabilitada)
  if (data.user && !data.session) {
    // Aguardar um pouco e tentar fazer login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });
    
    if (loginError || !loginData.user) {
      throw new Error(`User created but cannot login: ${loginError?.message || 'No session'}`);
    }
    
    return {
      email: testEmail,
      password: testPassword,
      user: loginData.user,
    };
  }
  
  return {
    email: testEmail,
    password: testPassword,
    user: data.user,
  };
}

/**
 * Faz login e configura cookies na página
 */
export async function loginAsTestUser(
  page: Page,
  email: string,
  password: string
) {
  // Ir para página de login
  await page.goto('/login');
  
  // Preencher formulário
  await page.fill('input[name="email"], input[type="email"]', email);
  await page.fill('input[name="password"], input[type="password"]', password);
  
  // Clicar em submit
  await page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');
  
  // Aguardar redirecionamento para dashboard
  await page.waitForURL(/\/dashboard/, { timeout: 10000 });
}

/**
 * Autentica usando Supabase diretamente e injeta cookies na página
 * Método mais confiável para testes E2E
 * Usa o formato de cookies do Supabase SSR (@supabase/ssr)
 */
export async function authenticateWithSupabase(
  page: Page,
  email: string,
  password: string
) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Fazer login via API
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error || !data.session) {
    throw new Error(`Failed to authenticate: ${error?.message || 'No session'}`);
  }
  
  // Extrair o project ref da URL do Supabase
  // Formato: https://xxxxx.supabase.co
  const projectRef = SUPABASE_URL.split('//')[1]?.split('.')[0] || 'default';
  
  // Obter tokens da sessão
  const accessToken = data.session.access_token;
  const refreshToken = data.session.refresh_token;
  
  // Criar cookies no formato usado pelo @supabase/ssr
  // O formato é: sb-{project-ref}-auth-token
  const cookieName = `sb-${projectRef}-auth-token`;
  const cookieValue = JSON.stringify({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: data.session.expires_at,
    expires_in: data.session.expires_in,
    token_type: 'bearer',
    user: data.user,
  });
  
  // Configurar cookies na página
  // Usar o domínio correto baseado no baseURL do Playwright
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
  const url = new URL(baseURL);
  
  await page.context().addCookies([
    {
      name: cookieName,
      value: cookieValue,
      domain: url.hostname === 'localhost' ? 'localhost' : `.${url.hostname}`,
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
      expires: data.session.expires_at ? Math.floor(data.session.expires_at) : undefined,
    },
  ]);
  
  // Recarregar página para aplicar cookies
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
}

/**
 * Helper completo: cria usuário de teste e autentica
 */
export async function setupAuthenticatedUser(page: Page) {
  const credentials = await createTestUser();
  await authenticateWithSupabase(page, credentials.email, credentials.password);
  return credentials;
}

