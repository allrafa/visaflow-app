/**
 * Script para atualizar .mcp.json com variáveis de ambiente do .env
 */

import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

const MCP_CONFIG_PATH = path.resolve(__dirname, '..', '.mcp.json');
const ENV_PATH = path.resolve(__dirname, '..', '.env');

interface MCPServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
  continuousLoad?: boolean;
  watchLoad?: boolean;
  serverPersistent?: boolean;
}

interface MCPConfig {
  mcpServers: Record<string, MCPServerConfig>;
  continuousLoad?: boolean;
  watchLoad?: boolean;
  serverPersistent?: boolean;
}

function readEnvFile(): Record<string, string> {
  const env: Record<string, string> = {};
  
  if (!fs.existsSync(ENV_PATH)) {
    console.warn(`⚠️  Arquivo .env não encontrado em: ${ENV_PATH}`);
    return env;
  }

  const content = fs.readFileSync(ENV_PATH, 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        env[key.trim()] = value.trim();
      }
    }
  }

  return env;
}

function updateMCPConfig() {
  console.log('🔄 Atualizando .mcp.json com variáveis de ambiente...\n');

  // Ler .env
  const envVars = readEnvFile();
  console.log(`📋 Variáveis encontradas no .env: ${Object.keys(envVars).length}\n`);

  // Ler .mcp.json atual
  if (!fs.existsSync(MCP_CONFIG_PATH)) {
    console.error(`❌ Arquivo .mcp.json não encontrado em: ${MCP_CONFIG_PATH}`);
    process.exit(1);
  }

  const mcpConfig: MCPConfig = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf-8'));

  // Atualizar configurações dos servidores MCP
  if (mcpConfig.mcpServers) {
    // Atualizar Supabase
    if (mcpConfig.mcpServers.supabase) {
      mcpConfig.mcpServers.supabase.env = {
        SUPABASE_URL: envVars.NEXT_PUBLIC_SUPABASE_URL || mcpConfig.mcpServers.supabase.env?.SUPABASE_URL || '',
        SUPABASE_ANON_KEY: envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || mcpConfig.mcpServers.supabase.env?.SUPABASE_ANON_KEY || '',
        SUPABASE_ACCESS_TOKEN: envVars.SUPABASE_ACCESS_TOKEN || mcpConfig.mcpServers.supabase.env?.SUPABASE_ACCESS_TOKEN || '',
      };
      console.log('✅ Supabase MCP atualizado');
    }

    // Atualizar Playwright (não precisa de env vars)
    if (mcpConfig.mcpServers.playwright) {
      console.log('✅ Playwright MCP configurado');
    }

    // Atualizar TestSprite
    if (mcpConfig.mcpServers.testsprite) {
      const testSpriteApiKey = envVars.TESTSPRITE_API_KEY;
      if (testSpriteApiKey) {
        mcpConfig.mcpServers.testsprite.env = {
          TESTSPRITE_API_KEY: testSpriteApiKey,
        };
        console.log('✅ TestSprite MCP atualizado com API key do .env');
      } else {
        console.log('⚠️  TESTSPRITE_API_KEY não encontrada no .env');
        console.log('   TestSprite MCP será configurado sem API key (env vazio)');
        // Deixar env vazio se não houver API key - o MCP pode funcionar sem ela
        mcpConfig.mcpServers.testsprite.env = {};
      }
    }
  }

  // Salvar .mcp.json atualizado
  fs.writeFileSync(MCP_CONFIG_PATH, JSON.stringify(mcpConfig, null, 2), 'utf-8');
  console.log(`\n✅ Arquivo .mcp.json atualizado: ${MCP_CONFIG_PATH}\n`);

  console.log('📋 Servidores MCP configurados:');
  Object.keys(mcpConfig.mcpServers).forEach((serverName) => {
    const server = mcpConfig.mcpServers[serverName];
    const hasEnv = server.env && Object.keys(server.env).length > 0;
    console.log(`   - ${serverName}${hasEnv ? ' (com variáveis de ambiente)' : ''}`);
  });

  console.log('\n💡 Próximos passos:');
  console.log('   1. Reinicie o Cursor para carregar os novos MCPs');
  console.log('   2. Se TestSprite não tiver API key, adicione TESTSPRITE_API_KEY ao .env');
}

updateMCPConfig();

