/**
 * Script de Validação de Variáveis de Ambiente
 * Valida se todas as variáveis necessárias estão configuradas
 */

const requiredEnvVars = {
  // Supabase (obrigatórias)
  NEXT_PUBLIC_SUPABASE_URL: {
    description: 'URL do projeto Supabase',
    example: 'https://[PROJECT_REF].supabase.co',
    required: true,
  },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: {
    description: 'Chave pública anônima do Supabase',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  },
  SUPABASE_SERVICE_ROLE_KEY: {
    description: 'Chave de serviço do Supabase (para uploads e operações admin)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  },
  DATABASE_URL: {
    description: 'Connection string do PostgreSQL (para Prisma)',
    example: 'postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres',
    required: true,
  },
  // Anthropic Claude API (obrigatória para validação com IA)
  ANTHROPIC_API_KEY: {
    description: 'Chave da API Anthropic (Claude)',
    example: 'sk-ant-...',
    required: true,
  },
} as const;

const optionalEnvVars = {
  // Resend (opcional - para emails transacionais)
  RESEND_API_KEY: {
    description: 'Chave da API Resend (para emails)',
    example: 're_...',
    required: false,
  },
  // Vercel Analytics (opcional)
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: {
    description: 'ID do Vercel Analytics',
    example: 'prj_...',
    required: false,
  },
  // Direct Database Connection (opcional - para conexão direta ao Supabase)
  DIRECT_DATABASE_URL: {
    description: 'Connection string direta ao PostgreSQL (sem Prisma Accelerate)',
    example: 'postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres',
    required: false,
  },
  DATABASE_KEY: {
    description: 'Senha do banco de dados PostgreSQL',
    example: 'your-database-password',
    required: false,
  },
} as const;

function validateEnvVars(): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar variáveis obrigatórias
  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];
    
    if (!value || value.trim() === '') {
      errors.push(`❌ ${key}: ${config.description} - NÃO CONFIGURADA`);
    } else if (value.includes('placeholder') || value.includes('example')) {
      errors.push(`❌ ${key}: Valor parece ser um placeholder - ${value.substring(0, 20)}...`);
    } else {
      // Validações específicas
      if (key === 'NEXT_PUBLIC_SUPABASE_URL' && !value.startsWith('https://')) {
        errors.push(`❌ ${key}: URL deve começar com https://`);
      }
      if (key === 'DATABASE_URL') {
        const isValidFormat = 
          value.startsWith('postgresql://') || 
          value.startsWith('postgres://') || 
          value.startsWith('prisma+postgresql://') ||
          value.startsWith('prisma+postgres://') ||
          value.includes('accelerate.prisma-data.net'); // Prisma Accelerate
        if (!isValidFormat) {
          errors.push(`❌ ${key}: Connection string deve começar com postgresql://, postgres://, prisma+postgresql:// ou usar Prisma Accelerate`);
        }
      }
      if (key.includes('KEY') && value.length < 20) {
        warnings.push(`⚠️  ${key}: Chave parece muito curta (${value.length} caracteres)`);
      }
    }
  }

  // Validar variáveis opcionais
  for (const [key, config] of Object.entries(optionalEnvVars)) {
    const value = process.env[key];
    if (!value || value.trim() === '') {
      warnings.push(`⚠️  ${key}: ${config.description} - Não configurada (opcional)`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function main() {
  console.log('🔍 Validando variáveis de ambiente do VisaFlow...\n');

  // Carregar variáveis do .env
  // Nota: Em Node.js, precisamos usar dotenv para carregar .env
  try {
    require('dotenv').config({ path: '.env' });
  } catch (error) {
    console.log('⚠️  dotenv não encontrado, usando variáveis do sistema\n');
  }

  const result = validateEnvVars();

  console.log('📋 Variáveis Obrigatórias:\n');
  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];
    const status = value && !value.includes('placeholder') ? '✅' : '❌';
    console.log(`${status} ${key}`);
    console.log(`   ${config.description}`);
    if (value) {
      const masked = value.length > 20 
        ? `${value.substring(0, 10)}...${value.substring(value.length - 10)}`
        : '***';
      console.log(`   Valor: ${masked}`);
    }
    console.log('');
  }

  if (result.errors.length > 0) {
    console.log('\n❌ ERROS ENCONTRADOS:\n');
    result.errors.forEach((error) => console.log(error));
    console.log('\n');
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️  AVISOS:\n');
    result.warnings.forEach((warning) => console.log(warning));
    console.log('\n');
  }

  if (result.valid) {
    console.log('✅ Todas as variáveis obrigatórias estão configuradas!\n');
    console.log('💡 Próximos passos:');
    console.log('   1. Execute: npx prisma generate');
    console.log('   2. Execute: npx prisma db push (ou npx prisma migrate dev)');
    console.log('   3. Execute: npm run dev');
    process.exit(0);
  } else {
    console.log('❌ Corrija os erros acima antes de continuar.\n');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { validateEnvVars };

