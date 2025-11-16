// Carregar variáveis de ambiente do .env
import { config } from 'dotenv';
config();

import { defineConfig, env } from "prisma/config";

// Obter DATABASE_URL do ambiente (já carregado pelo dotenv)
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
});
