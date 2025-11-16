# 📋 Status das Variáveis de Ambiente - VisaFlow

**Data:** Janeiro 2025  
**Última validação:** Executada via `scripts/validate-env.ts`

---

## ✅ Variáveis Configuradas

- ✅ **DATABASE_URL** - Connection string do PostgreSQL (formato Prisma aceito)

---

## ❌ Variáveis Faltando (Obrigatórias)

### Supabase (3 variáveis)

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Onde encontrar: Supabase Dashboard > Settings > API > Project URL
   - Formato: `https://[PROJECT_REF].supabase.co`
   - Exemplo: `https://abcdefghijklmnop.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Onde encontrar: Supabase Dashboard > Settings > API > anon public key
   - Formato: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ⚠️ Esta chave é pública e pode ser exposta no cliente

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Onde encontrar: Supabase Dashboard > Settings > API > service_role key
   - Formato: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ⚠️ **NUNCA commite esta chave no Git!** Use apenas no servidor.

### Anthropic Claude API (1 variável)

4. **ANTHROPIC_API_KEY**
   - Onde encontrar: https://console.anthropic.com/
   - Formato: `sk-ant-...`
   - Necessária para validação de conteúdo com IA

---

## ⚠️ Variáveis Opcionais (Não Críticas)

- **RESEND_API_KEY** - Para emails transacionais (opcional)
- **NEXT_PUBLIC_VERCEL_ANALYTICS_ID** - Para analytics (opcional)

---

## 🔧 Como Adicionar as Variáveis

1. Abra o arquivo `.env` na raiz do projeto
2. Adicione as variáveis faltando seguindo o formato:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ANTHROPIC_API_KEY=sua-chave-anthropic
```

3. Execute a validação novamente:

```bash
npx tsx scripts/validate-env.ts
```

---

## ✅ Próximos Passos Após Configurar

1. **Gerar Prisma Client:**
   ```bash
   npx prisma generate
   ```

2. **Aplicar Migrations:**
   ```bash
   npx prisma db push
   # ou
   npx prisma migrate dev
   ```

3. **Iniciar Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 📝 Notas

- O arquivo `.env` está no `.gitignore` e não será commitado
- Use `.env.example` como referência (não contém valores reais)
- Em produção, configure as variáveis no Vercel Dashboard > Settings > Environment Variables



