# 🚀 Plano de Implementação - VisaFlow

**Versão:** 1.0  
**Data:** Janeiro 2025  
**Status:** 📋 **PRONTO PARA EXECUÇÃO**  
**Baseado em:** VISAFLOW CONTEXT.md + PLANO_TAREFAS_REFERENCIAS.md

---

## 📊 ANÁLISE DE COMPLEXIDADE

**Tipo:** COMPLEX (6+ etapas)  
**Etapas Identificadas:** 5 fases principais, ~25 tarefas  
**Arquivos Envolvidos:**
- `/src/app/` - Next.js App Router
- `/src/components/` - Componentes React
- `/src/lib/` - Utilities e services
- `/prisma/` - Schema e migrations
- `/tests/` - Testes unitários e E2E

**Dependências:**
- Next.js 15 (instalar)
- Prisma 5.23+ (instalar)
- Supabase (configurar)
- shadcn/ui (instalar)
- Claude API (configurar)

---

## 🎯 PLANO DE EXECUÇÃO (Ultra-Think)

### FASE 1: FUNDAÇÃO (Semana 1)

#### ETAPA 1.1: Setup Inicial do Projeto
- **Arquivo:** `package.json`, `tsconfig.json`, `next.config.js`
- **Ação:** Criar projeto Next.js 15 com TypeScript strict
- **Tempo estimado:** 30min
- **Comandos:**
```bash
cd /Users/rafaraio/.cursor/projects/visaflow-app
npx create-next-app@latest . --typescript --tailwind --app --use-npm
```

#### ETAPA 1.2: Instalar Dependências Essenciais
- **Arquivo:** `package.json`
- **Ação:** Instalar todas as dependências do stack
- **Tempo estimado:** 15min
- **Comandos:**
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install @prisma/client prisma
npm install zod react-hook-form @hookform/resolvers/zod
npm install @tanstack/react-query
npm install @anthropic-ai/sdk
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install -D vitest @vitest/ui @testing-library/react
npm install -D @playwright/test prettier eslint-config-prettier
```

#### ETAPA 1.3: Configurar Prisma Schema
- **Arquivo:** `prisma/schema.prisma`
- **Ação:** Criar schema completo baseado em VISAFLOW CONTEXT.md
- **Tempo estimado:** 2h
- **Validação:** Schema deve incluir todos os models (User, Process, Task, Upload, CriteriaEvidence, RecommendationLetter, AuditLog)

#### ETAPA 1.4: Configurar Supabase
- **Arquivo:** `.env.local`, `src/lib/db/supabase.ts`
- **Ação:** Criar projeto Supabase e configurar client
- **Tempo estimado:** 1h
- **Validação:** Testar conexão e auth básico

#### ETAPA 1.5: Configurar shadcn/ui
- **Arquivo:** `components.json`, `src/components/ui/`
- **Ação:** Inicializar shadcn/ui e instalar componentes base
- **Tempo estimado:** 1h
- **Componentes iniciais:** button, input, card, dialog, dropdown-menu

#### ETAPA 1.6: Criar Estrutura de Pastas
- **Arquivo:** Estrutura completa conforme VISAFLOW CONTEXT.md
- **Ação:** Criar todas as pastas e arquivos base
- **Tempo estimado:** 1h
- **Validação:** Estrutura deve seguir exatamente o documento

#### ETAPA 1.7: Configurar ESLint + Prettier
- **Arquivo:** `.eslintrc.json`, `.prettierrc`
- **Ação:** Configurar linting seguindo Clean Code Commandments
- **Tempo estimado:** 30min
- **Validação:** `npm run lint` deve passar sem erros

**Total Fase 1:** ~6.5 horas

---

### FASE 2: AUTENTICAÇÃO E BANCO DE DADOS (Semana 1-2)

#### ETAPA 2.1: Migrations Prisma
- **Arquivo:** `prisma/migrations/`
- **Ação:** Criar e aplicar migrations iniciais
- **Tempo estimado:** 1h
- **Comandos:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### ETAPA 2.2: Configurar RLS no Supabase
- **Arquivo:** SQL migrations no Supabase
- **Ação:** Criar policies de Row Level Security
- **Tempo estimado:** 2h
- **Validação:** Testar acesso restrito por usuário

#### ETAPA 2.3: Implementar Auth (Supabase)
- **Arquivo:** `src/app/(auth)/login/page.tsx`, `src/app/(auth)/signup/page.tsx`
- **Ação:** Criar páginas de login/signup
- **Tempo estimado:** 3h
- **Validação:** Login e signup funcionando

#### ETAPA 2.4: Criar Middleware de Auth
- **Arquivo:** `src/middleware.ts`
- **Ação:** Proteger rotas do dashboard
- **Tempo estimado:** 1h
- **Validação:** Rotas protegidas redirecionam para login

#### ETAPA 2.5: Criar Services Layer Base
- **Arquivo:** `src/lib/services/processService.ts`, `src/lib/services/taskService.ts`
- **Ação:** Implementar funções CRUD básicas
- **Tempo estimado:** 4h
- **Validação:** Testes unitários passando

**Total Fase 2:** ~11 horas

---

### FASE 3: DASHBOARD E LAYOUT (Semana 2)

#### ETAPA 3.1: Layout do Dashboard
- **Arquivo:** `src/app/(dashboard)/layout.tsx`
- **Ação:** Criar layout com Header, Sidebar, Footer
- **Tempo estimado:** 3h
- **Componentes:** Header.tsx, Sidebar.tsx, Footer.tsx

#### ETAPA 3.2: Dashboard Principal
- **Arquivo:** `src/app/(dashboard)/page.tsx`
- **Ação:** Criar dashboard com ProcessCard, TimelinePhases, ProgressStats
- **Tempo estimado:** 4h
- **Validação:** Dashboard mostra processos do usuário

#### ETAPA 3.3: Timeline Interativa
- **Arquivo:** `src/components/dashboard/TimelinePhases.tsx`
- **Ação:** Implementar timeline clicável com 5 fases
- **Tempo estimado:** 4h
- **Validação:** Timeline mostra progresso e permite navegação

#### ETAPA 3.4: Error Boundaries
- **Arquivo:** `src/components/layout/ErrorBoundary.tsx`
- **Ação:** Implementar error boundaries
- **Tempo estimado:** 1h
- **Validação:** Erros são capturados e exibidos graciosamente

**Total Fase 3:** ~12 horas

---

### FASE 4: GESTÃO DE PROCESSOS E TASKS (Semana 2-3)

#### ETAPA 4.1: CRUD de Processos
- **Arquivo:** `src/app/(dashboard)/process/[id]/page.tsx`, `src/app/api/processes/route.ts`
- **Ação:** Implementar criar, ler, atualizar processos
- **Tempo estimado:** 4h
- **Validação:** CRUD completo funcionando

#### ETAPA 4.2: Task Board
- **Arquivo:** `src/components/tasks/TaskBoard.tsx`
- **Ação:** Implementar board de tasks por fase
- **Tempo estimado:** 5h
- **Validação:** Tasks organizadas por fase e status

#### ETAPA 4.3: Task Form e Modal
- **Arquivo:** `src/components/tasks/TaskForm.tsx`, `src/components/tasks/TaskModal.tsx`
- **Ação:** Criar formulário de criação/edição de tasks
- **Tempo estimado:** 3h
- **Validação:** Form com validação Zod funcionando

#### ETAPA 4.4: Sistema de Upload
- **Arquivo:** `src/components/shared/FileUpload.tsx`, `src/app/api/uploads/route.ts`
- **Ação:** Implementar upload para Supabase Storage
- **Tempo estimado:** 4h
- **Validação:** Upload, listagem e deleção funcionando

#### ETAPA 4.5: Dependências entre Tasks
- **Arquivo:** `src/lib/services/taskService.ts`
- **Ação:** Implementar sistema de dependências
- **Tempo estimado:** 2h
- **Validação:** Tasks bloqueadas por dependências

**Total Fase 4:** ~18 horas

---

### FASE 5: CRITÉRIOS E VALIDAÇÃO (Semana 3)

#### ETAPA 5.1: Templates de Critérios
- **Arquivo:** `src/lib/templates/criteria.ts`
- **Ação:** Criar templates para 10 critérios EB-1A com 4 subseções
- **Tempo estimado:** 6h
- **Validação:** Templates estruturados conforme referências

#### ETAPA 5.2: Formulário de Critérios
- **Arquivo:** `src/components/criteria/CriteriaForm.tsx`
- **Ação:** Criar formulário com 4 subseções editáveis
- **Tempo estimado:** 4h
- **Validação:** Form salva e carrega dados corretamente

#### ETAPA 5.3: Validação com Claude API
- **Arquivo:** `src/lib/services/aiService.ts`, `src/app/api/ai/validate-content/route.ts`
- **Ação:** Implementar validação inteligente
- **Tempo estimado:** 6h
- **Validação:** Score de qualidade e feedback funcionando

#### ETAPA 5.4: Detecção de Práticas Suspeitas
- **Arquivo:** `src/components/validation/SuspiciousAlerts.tsx`
- **Ação:** Implementar alertas automáticos
- **Tempo estimado:** 4h
- **Validação:** Alertas aparecem para práticas de risco

#### ETAPA 5.5: Calculadora de Métricas
- **Arquivo:** `src/components/criteria/MetricsCalculator.tsx`
- **Ação:** Implementar cálculo de métricas de impacto
- **Tempo estimado:** 3h
- **Validação:** Métricas calculadas corretamente

**Total Fase 5:** ~23 horas

---

### FASE 6: FEATURES AVANÇADAS (Semana 3-4)

#### ETAPA 6.1: Gerador de Final Merits Statement
- **Arquivo:** `src/lib/services/finalMeritsService.ts`, `src/app/(dashboard)/final-merits/page.tsx`
- **Ação:** Implementar gerador automático
- **Tempo estimado:** 6h
- **Validação:** Gera documento estruturado de 20-30 páginas

#### ETAPA 6.2: Sistema de Cartas de Recomendação
- **Arquivo:** `src/app/(dashboard)/letters/page.tsx`
- **Ação:** Implementar gestão de cartas
- **Tempo estimado:** 4h
- **Validação:** CRUD de cartas funcionando

#### ETAPA 6.3: Sistema de Referências Automáticas
- **Arquivo:** `src/lib/services/referenceService.ts`
- **Ação:** Implementar referências cruzadas
- **Tempo estimado:** 4h
- **Validação:** Referências atualizadas automaticamente

#### ETAPA 6.4: Audit Log
- **Arquivo:** `src/lib/services/auditService.ts`
- **Ação:** Implementar logging de ações
- **Tempo estimado:** 2h
- **Validação:** Ações são logadas corretamente

**Total Fase 6:** ~16 horas

---

### FASE 7: TESTES E QUALIDADE (Semana 4)

#### ETAPA 7.1: Testes Unitários (Vitest)
- **Arquivo:** `tests/unit/services/`, `tests/unit/validators/`
- **Ação:** Criar testes para services e validators
- **Tempo estimado:** 8h
- **Validação:** Cobertura >80%

#### ETAPA 7.2: Testes E2E (Playwright)
- **Arquivo:** `tests/e2e/auth.spec.ts`, `tests/e2e/dashboard.spec.ts`
- **Ação:** Criar testes E2E principais
- **Tempo estimado:** 6h
- **Validação:** Todos os testes passando

#### ETAPA 7.3: Type Check e Lint
- **Ação:** Corrigir todos os erros TypeScript e ESLint
- **Tempo estimado:** 4h
- **Validação:** Zero erros

#### ETAPA 7.4: Performance e Otimização
- **Ação:** Otimizar queries, adicionar índices, lazy loading
- **Tempo estimado:** 4h
- **Validação:** Lighthouse score >90

**Total Fase 7:** ~22 horas

---

## ⚠️ RISCOS IDENTIFICADOS

- ❌ **Complexidade do Schema Prisma** (muitos relacionamentos)
  - **Mitigação:** Criar migrations incrementais, testar cada model isoladamente

- ❌ **Integração Claude API** (custos e rate limits)
  - **Mitigação:** Implementar cache, rate limiting, fallbacks

- ⚠️ **Performance com muitos uploads** (Supabase Storage)
  - **Mitigação:** Implementar paginação, lazy loading, compressão

- ⚠️ **Validação complexa de critérios** (muitas regras)
  - **Mitigação:** Criar testes extensivos, documentar todas as regras

---

## ✅ PONTOS DE VALIDAÇÃO

- [ ] Após Fase 1: Projeto compila sem erros
- [ ] Após Fase 2: Auth funcionando, banco configurado
- [ ] Após Fase 3: Dashboard visível e navegável
- [ ] Após Fase 4: CRUD completo funcionando
- [ ] Após Fase 5: Validação com IA retornando scores
- [ ] Após Fase 6: Features avançadas funcionando
- [ ] Após Fase 7: Testes passando, zero erros TypeScript

---

## 📋 ESTIMATIVA TOTAL: ~108 horas (3 semanas)

---

## 🚦 STATUS: AGUARDANDO APROVAÇÃO DO USUÁRIO

**Próximos Passos após Aprovação:**
1. Iniciar Fase 1 - Setup Inicial
2. Executar etapa por etapa
3. Validar cada fase antes de prosseguir
4. Documentar progresso em CHANGELOG.md

---

## 📝 NOTAS DE IMPLEMENTAÇÃO

### Seguir Rigorosamente:
- ✅ Clean Code Commandments (funções <50 linhas, max 4 params, etc.)
- ✅ Security Guidelines (validação Zod frontend + backend, RLS)
- ✅ Error Handling System (erros específicos, logs estruturados)
- ✅ Protocolo Git (Conventional Commits)
- ✅ TypeScript Strict Mode (zero `any`)

### Estrutura de Arquivos:
- Todos os arquivos em `/Users/rafaraio/.cursor/projects/visaflow-app/`
- Imports usando `@/` alias
- Componentes em PascalCase
- Utils em camelCase

### Validações Obrigatórias:
- Antes de cada commit: `npm run lint && npm run type-check`
- Antes de cada PR: `npm run build && npm test`
- Cobertura de testes: mínimo 80%

---

**Última Atualização:** Janeiro 2025  
**Versão:** 1.0  
**Status:** 📋 **PRONTO PARA EXECUÇÃO**



