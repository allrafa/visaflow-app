# FASE 0: FUNDAÇÃO E INFRAESTRUTURA - VisaFlow

**Versão:** 1.0  
**Data:** Janeiro 2025  
**Status:** 📋 **AGUARDANDO APROVAÇÃO**

---

## 📊 ANÁLISE DE COMPLEXIDADE

**Tipo:** MODERATE (5 etapas principais)  
**Etapas Identificadas:** 5 etapas principais + validações  
**Arquivos Envolvidos:**
- `/prisma/schema.prisma` (já existe)
- `/src/lib/db/client.ts` (já existe)
- `/supabase/migrations/001_enable_rls.sql` (já existe)
- `/scripts/validate-env.ts` (já existe)
- `/src/lib/auth/getAuthUser.ts` (já existe)

**Dependências:**
- ✅ Variáveis de ambiente configuradas no `.env`
- ✅ Prisma schema definido
- ✅ Supabase projeto criado
- ⚠️ Precisa: Aplicar migrations ao banco
- ⚠️ Precisa: Gerar Prisma Client
- ⚠️ Precisa: Configurar RLS policies
- ⚠️ Precisa: Testar conexão

---

## 🎯 PLANO DE EXECUÇÃO (Ultra-Think)

### ETAPA 0.1: Validação de Variáveis de Ambiente

**Objetivo:** Garantir que todas as variáveis necessárias estão configuradas corretamente

**Sub-etapas:**

1. **0.1.1** - Executar script de validação
   - Arquivo: `scripts/validate-env.ts`
   - Ação: Executar `npx tsx scripts/validate-env.ts`
   - Tempo estimado: 2min

2. **0.1.2** - Verificar variáveis obrigatórias
   - Verificar se todas estão presentes:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `DATABASE_URL`
     - `ANTHROPIC_API_KEY`
   - Tempo estimado: 2min

3. **0.1.3** - Validar formato das variáveis
   - URLs começam com `https://`
   - DATABASE_URL formato correto (postgresql:// ou prisma+postgresql://)
   - Chaves têm tamanho mínimo
   - Tempo estimado: 1min

**Arquivos a criar/modificar:**
- ✅ `scripts/validate-env.ts` (executar)

**Validação:**
- Script retorna sucesso (exit code 0)
- Todas as variáveis obrigatórias marcadas como ✅

**Tempo estimado:** 5 minutos

---

### ETAPA 0.2: Gerar Prisma Client

**Objetivo:** Gerar cliente Prisma baseado no schema para uso no código

**Sub-etapas:**

1. **0.2.1** - Gerar Prisma Client
   - Ação: Executar `npx prisma generate`
   - Verificar saída do comando
   - Tempo estimado: 1min

2. **0.2.2** - Validar geração
   - Verificar se cliente foi gerado em `node_modules/.prisma/client`
   - Verificar se tipos TypeScript foram gerados
   - Validar imports no código funcionam
   - Tempo estimado: 1min

**Arquivos a criar/modificar:**
- ✅ `prisma/schema.prisma` (validar)
- ✅ `node_modules/.prisma/client` (gerado)

**Validação:**
- Comando executa sem erros
- Tipos TypeScript disponíveis
- `src/lib/db/client.ts` pode importar `PrismaClient` sem erros

**Tempo estimado:** 2 minutos

---

### ETAPA 0.3: Aplicar Migrations ao Banco Supabase

**Objetivo:** Criar todas as tabelas no banco de dados Supabase

**Sub-etapas:**

1. **0.3.1** - Testar conexão com banco
   - Ação: Executar `npx prisma db pull` (teste de conexão)
   - Verificar se conexão funciona
   - Tempo estimado: 2min

2. **0.3.2** - Criar migration inicial
   - Ação: Executar `npx prisma migrate dev --name init`
   - Isso criará a migration baseada no schema.prisma
   - Aplicará as mudanças ao banco
   - Tempo estimado: 3min

3. **0.3.3** - Verificar tabelas criadas
   - Verificar via Prisma Studio: `npx prisma studio`
   - Ou via SQL direto no Supabase Dashboard
   - Tabelas esperadas:
     - `users`
     - `processes`
     - `tasks`
     - `uploads`
     - `criteria_evidences`
     - `recommendation_letters`
     - `audit_logs`
   - Tempo estimado: 3min

4. **0.3.4** - Validar enums e índices
   - Verificar enums criados:
     - `ProcessPhase`
     - `TaskStatus`
     - `EB1Criteria`
   - Verificar índices criados corretamente
   - Tempo estimado: 2min

**Arquivos a criar/modificar:**
- ✅ `prisma/schema.prisma` (fonte)
- ✅ `prisma/migrations/` (criar migration)
- ✅ Banco Supabase (aplicar mudanças)

**Validação:**
- Migration criada em `prisma/migrations/`
- Todas as tabelas existem no banco
- Sem erros de aplicação

**Tempo estimado:** 10 minutos

---

### ETAPA 0.4: Configurar Row Level Security (RLS)

**Objetivo:** Aplicar políticas de segurança RLS no Supabase para isolamento de dados

**Sub-etapas:**

1. **0.4.1** - Verificar arquivo de migration RLS
   - Arquivo: `supabase/migrations/001_enable_rls.sql`
   - Revisar conteúdo do arquivo
   - Verificar se está completo
   - Tempo estimado: 2min

2. **0.4.2** - Aplicar migration RLS ao banco
   - Opção A: Via Supabase Dashboard SQL Editor (recomendado)
   - Opção B: Via Supabase CLI (`supabase db push` se configurado)
   - Opção C: Executar SQL diretamente no banco via Prisma
   - Tempo estimado: 5min

3. **0.4.3** - Verificar RLS habilitado
   - Executar SQL: `SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public'`
   - Verificar que todas as tabelas têm `rowsecurity = true`
   - Tabelas a verificar:
     - `users`
     - `processes`
     - `tasks`
     - `uploads`
     - `criteria_evidences`
     - `recommendation_letters`
     - `audit_logs`
   - Tempo estimado: 3min

4. **0.4.4** - Validar policies criadas
   - Executar SQL: `SELECT * FROM pg_policies WHERE schemaname = 'public'`
   - Verificar contagem de policies (~20-25 policies esperadas)
   - Validar que policies cobrem:
     - SELECT, INSERT, UPDATE, DELETE para cada tabela
     - Verificação de `auth.uid() = user_id` ou relacionamento via processos
   - Tempo estimado: 5min

**Arquivos a criar/modificar:**
- ✅ `supabase/migrations/001_enable_rls.sql` (aplicar)
- ✅ Banco Supabase (aplicar policies)

**Validação:**
- RLS habilitado em todas as tabelas
- Policies criadas e funcionando
- Contagem de policies esperada: ~20-25 policies

**Tempo estimado:** 15 minutos

---

### ETAPA 0.5: Testar Conexão e Autenticação

**Objetivo:** Validar que o sistema básico funciona end-to-end

**Sub-etapas:**

1. **0.5.1** - Criar script de teste de conexão
   - Arquivo: `scripts/test-connection.ts` (criar)
   - Testar conexão Prisma com banco
   - Testar conexão Supabase Auth
   - Tempo estimado: 10min

2. **0.5.2** - Testar autenticação
   - Verificar que `getAuthUser()` funciona corretamente
   - Testar login via Supabase Auth (manualmente ou via script)
   - Validar que sessão é mantida
   - Tempo estimado: 5min

3. **0.5.3** - Testar operações básicas do banco
   - Criar processo de teste via Prisma
   - Ler processo via Prisma
   - Verificar que RLS funciona (usuário só vê seus próprios dados)
   - Tempo estimado: 5min

4. **0.5.4** - Testar API routes básicas
   - `GET /api/processes` (deve retornar lista vazia ou processos do usuário)
   - `POST /api/processes` (deve criar processo)
   - Validar autenticação nas rotas
   - Tempo estimado: 5min

**Arquivos a criar/modificar:**
- ✅ `scripts/test-connection.ts` (criar)
- ✅ `src/lib/db/client.ts` (testar)
- ✅ `src/lib/auth/getAuthUser.ts` (testar)
- ✅ `src/app/api/processes/route.ts` (testar)

**Validação:**
- Script de teste executa sem erros
- Conexão Prisma funciona
- Autenticação Supabase funciona
- API routes respondem corretamente
- RLS impede acesso a dados de outros usuários

**Tempo estimado:** 25 minutos

---

## ⚠️ RISCOS IDENTIFICADOS

- ❌ **DATABASE_URL incorreto** (formato Prisma pode ser diferente do formato padrão)
  - Mitigação: Validar formato antes de aplicar migrations
  - Verificar se precisa converter `prisma+postgresql://` para `postgresql://`
  - Prisma aceita ambos os formatos, mas validar conexão primeiro

- ❌ **RLS policies podem bloquear operações** (se policies estiverem incorretas)
  - Mitigação: Testar cada operação após aplicar policies
  - Criar usuário de teste e validar isolamento
  - Verificar logs do Supabase para erros de permissão

- ⚠️ **Supabase Auth pode não estar sincronizado com tabela users**
  - Mitigação: Verificar se precisa criar trigger para sincronizar auth.users com public.users
  - Considerar usar Supabase Auth metadata ou criar função de sincronização
  - Verificar se User model precisa ser criado manualmente ou via trigger

- ⚠️ **Migrations podem falhar se banco já tiver dados**
  - Mitigação: Verificar estado atual do banco antes de aplicar
  - Usar `prisma migrate dev` que detecta estado atual
  - Considerar `prisma db push` para desenvolvimento (não versionado)

- ⚠️ **Enums podem não ser criados corretamente**
  - Mitigação: Verificar criação de enums após migration
  - Se necessário, criar enums manualmente via SQL antes da migration

---

## ✅ PONTOS DE VALIDAÇÃO

- [ ] Após etapa 0.1: Todas as variáveis validadas e corretas
- [ ] Após etapa 0.2: Prisma Client gerado sem erros
- [ ] Após etapa 0.3: Todas as tabelas criadas no banco
- [ ] Após etapa 0.4: RLS habilitado e policies aplicadas
- [ ] Após etapa 0.5: Conexão e autenticação funcionando
- [ ] Final: Sistema básico funcional, pronto para desenvolvimento de features

---

## 📋 ESTIMATIVA TOTAL: ~57 minutos

**Breakdown:**
- ETAPA 0.1: ~5 minutos
- ETAPA 0.2: ~2 minutos
- ETAPA 0.3: ~10 minutos
- ETAPA 0.4: ~15 minutos
- ETAPA 0.5: ~25 minutos

---

## 🚦 STATUS: AGUARDANDO APROVAÇÃO DO USUÁRIO

**Próximos passos após aprovação:**
1. Executar etapas sequencialmente
2. Validar cada etapa antes de prosseguir
3. Documentar problemas encontrados
4. Criar script de teste de conexão
5. Validar sistema básico funcionando

---

## 📝 NOTAS ADICIONAIS

- Todas as etapas devem ser executadas sequencialmente
- Validar cada etapa antes de prosseguir
- Documentar qualquer problema encontrado
- Criar script de rollback se necessário (para desenvolvimento)
- Considerar criar seed data básico para testes (opcional, após etapa 0.5)

---

## 🔄 PRÓXIMOS PASSOS APÓS CONCLUSÃO

1. Sistema básico funcionando ✅
2. Pronto para continuar com FASE 5 (melhorias de critérios)
3. Pronto para desenvolvimento de novas features
4. Base sólida para testes E2E
5. Autenticação e autorização funcionando
6. Banco de dados configurado e seguro

---

**Última Atualização:** Janeiro 2025  
**Versão:** 1.0  
**Status:** 📋 **AGUARDANDO APROVAÇÃO**



