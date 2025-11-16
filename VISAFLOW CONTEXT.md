#  - Architecture Blueprint & Agentic Workflow Protocol

**Versão:** 1.0 - Projeto Novo (Clean Slate)  
**Data:** Janeiro de 2025  
**Status:** 🚀 **READY TO BUILD**

---

## 🚨 REGRA FUNDAMENTAL - LEIA PRIMEIRO

### Localização do Projeto

**TUDO relacionado a este projeto DEVE estar em:**

```
/Users/rafaraio/.cursor/projects/visaflow-app/
```

### Regras Absolutas para Agentes

```typescript
const PROJECT_RULES = {
  // ✅ SEMPRE FAZER
  ALWAYS: [
    "Criar TODOS os arquivos dentro de /visaflow-app/",
    "Referenciar APENAS arquivos desta pasta",
    "Usar caminhos relativos dentro do projeto",
    "Verificar localização antes de criar arquivo",
    "Usar @ alias (@/ para src/) em imports"
  ],
  
  // ❌ NUNCA FAZER
  NEVER: [
    "Usar caminhos de outros projetos (immi-app, laro, recebe-imoveis, andera)",
    "Referenciar arquivos fora de /visaflow-app/",
    "Copiar código de outros projetos sem adaptar path",
    "Criar arquivos em diretórios temporários",
    "Usar imports absolutos sem @ alias"
  ],
  
  // 🔍 SEMPRE VALIDAR ANTES DE CRIAR ARQUIVO
  VALIDATE: [
    "Path começa com /Users/rafaraio/.cursor/projects/visaflow-app/",
    "Imports internos usam @/ alias",
    "Imports externos usam package name correto",
    "Nenhuma referência a immi-app ou outros projetos"
  ]
}
```

### Como Usar Este Documento

```markdown
## Para carregar contexto completo:
@VisaflowContext

## O agente terá acesso instantâneo a:
✅ Arquitetura completa do sistema
✅ Protocolos agênticos (Ultra-Think)
✅ Clean Code Commandments
✅ Security Guidelines
✅ Stack técnica definida
✅ Estrutura de pastas
✅ Convenções de código
✅ Fluxo de trabalho Git
✅ Checklist de qualidade
```

---

## 🎯 Visão Geral do Projeto

### Nome do Projeto

**VisaFlow** - Sistema Inteligente de Gestão EB-1A

### Tagline

"Your pathway to extraordinary ability recognition"

### Missão

Democratizar o acesso ao processo EB-1A através de tecnologia inteligente, permitindo que imigrantes qualificados construam casos sólidos sem custos proibitivos de advocacia, enquanto oferecemos ferramentas profissionais para escritórios que precisam de eficiência operacional.

### Objetivo Principal

Criar plataforma web de excelência para organização e execução estratégica do processo EB-1A, servindo tanto imigrantes DIY (Do It Yourself - economia de US$ 5k-15k) quanto escritórios de advocacia (gestão de múltiplos casos), com validação automática baseada em conhecimento advocatício real comprovado.

### Diferenciais Competitivos

#### 1. Validação Inteligente com IA (Claude API)

- ✅ Algoritmos baseados em **13 casos reais documentados** (9 aprovações + 4 RFEs/rejeições)
- ✅ **7 estratégias de profissionais experientes** implementadas no código
- ✅ Detecção automática de padrões de aprovação vs. rejeição
- ✅ Análise de qualidade de escrita (detecta texto gerado por IA)
- ✅ Score de qualidade (0-100) com feedback acionável

#### 2. Proteção Contra RFEs 2025

- 🛡️ **Alerta automático de práticas suspeitas** (Globee, Stevie, matérias pagas, etc)
- 🛡️ Base de conhecimento atualizada com endurecimento do USCIS em 2025
- 🛡️ Guia de construção ética de perfil integrado
- 🛡️ Verificação de evidências contra lista de práticas de alto risco

#### 3. Dashboard Advocatício ("War Room")

- 📊 Visão completa do processo estilo gestão de projetos
- 📊 Timeline interativa clicável (cada fase redireciona para detalhes)
- 📊 Progress tracking em tempo real por fase
- 📊 Substituição completa de planilhas Excel
- 📊 Histórico de ações e auditoria

#### 4. Sistema de Templates Profissionais

- 📝 Template de 4 subseções para cada critério (baseado em petição aprovada de 557 páginas)
- 📝 Gerador de Final Merits Statement (20-30 páginas estruturadas)
- 📝 Sistema de referências cruzadas automático
- 📝 Calculadora de métricas de impacto
- 📝 Templates de cartas de recomendação

#### 5. Base de Conhecimento Proprietária

- 📚 13 casos estudados detalhadamente
- 📚 Análise de petição aprovada completa (Alexey Inkin - 557 páginas)
- 📚 200+ arquivos LaTeX analisados
- 📚 Padrões estruturais identificados
- 📚 Estratégias de 7 profissionais experientes

### Público-Alvo

#### Persona 1: Imigrante DIY (Primário - 70%)

**Perfil:**

- Empreendedor ou profissional qualificado
- Não tem US$ 5k-15k para advogado
- Precisa resolver status de imigração urgentemente
- Tem algumas evidências mas não sabe organizar
- Medo de RFE por falta de conhecimento

**Necessidades:**

- ✅ Orientação passo a passo clara
- ✅ Validação automática de qualidade
- ✅ Templates profissionais
- ✅ Alertas de práticas suspeitas
- ✅ Economia massiva (80-95% vs. advogado)

**Exemplo:** Rafael Raio (caso piloto)

#### Persona 2: Escritório de Advocacia (Secundário - 30%)

**Perfil:**

- Advogado de imigração ou paralegal
- Gerencia 5-20 casos EB-1A simultaneamente
- Usa Excel e documentos soltos atualmente
- Precisa de eficiência operacional
- Quer padronização de qualidade

**Necessidades:**

- ✅ Dashboard consolidado de múltiplos casos
- ✅ Visão completa de cada processo
- ✅ Templates que economizam 60-75% do tempo
- ✅ Sistema de revisão automático
- ✅ Histórico e auditoria de ações

---

## 🏗️ Arquitetura Técnica

### Stack Escolhida (Baseada em Aprendizados)

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND                                               │
├─────────────────────────────────────────────────────────┤
│  Framework: Next.js 15 (App Router)                    │
│  Language: TypeScript 5.3+ (STRICT MODE)               │
│  Styling: TailwindCSS v4 (beta) + CSS Variables        │
│  UI Components: shadcn/ui (Radix UI primitives)        │
│  Forms: React Hook Form + Zod validation               │
│  State: TanStack Query v5 (React Query)                │
│  Icons: Lucide React                                    │
├─────────────────────────────────────────────────────────┤
│  BACKEND                                                │
├─────────────────────────────────────────────────────────┤
│  API: Next.js App Router API Routes                    │
│  Database: Supabase PostgreSQL                          │
│  ORM: Prisma 5.23+ (type-safety)                       │
│  Storage: Supabase Storage                              │
│  Auth: Supabase Auth (Email + Google OAuth)            │
│  Validation: Zod (shared schemas)                       │
├─────────────────────────────────────────────────────────┤
│  INTEGRAÇÕES                                            │
├─────────────────────────────────────────────────────────┤
│  IA: Anthropic Claude API (Sonnet 4)                   │
│  Email: Resend (transacional)                           │
│  Analytics: Vercel Analytics                            │
│  Monitoring: Sentry (errors) + Vercel Logs             │
├─────────────────────────────────────────────────────────┤
│  TESTES & QUALIDADE                                     │
├─────────────────────────────────────────────────────────┤
│  Unit Tests: Vitest                                     │
│  E2E Tests: Playwright                                  │
│  Type Check: TypeScript (strict)                        │
│  Linting: ESLint + Prettier                             │
│  CI/CD: GitHub Actions                                  │
├─────────────────────────────────────────────────────────┤
│  DEPLOY & INFRA                                         │
├─────────────────────────────────────────────────────────┤
│  Hosting: Vercel (Edge Functions)                      │
│  Database: Supabase (managed PostgreSQL)               │
│  CDN: Vercel Edge Network                              │
│  Domain: visaflow.app (a definir)                      │
└─────────────────────────────────────────────────────────┘
```

### Por Que Esta Stack?

**Next.js 15 (mantido):**

- ✅ App Router estável e performático
- ✅ Server Components para performance
- ✅ API Routes para backend simples
- ✅ Vercel deploy otimizado
- ❌ Aprendizado: evitar caching agressivo (use `revalidatePath` consciente)

**TypeScript Strict (novo!):**

- ✅ Zero `any` types permitidos
- ✅ Todos os erros catchados em build time
- ✅ Autocomplete perfeito em IDE
- ✅ Refatoração segura

**Prisma + Supabase (combinação nova!):**

- ✅ Type-safety total em queries (Prisma)
- ✅ Managed database (Supabase)
- ✅ Auth e Storage prontos (Supabase)
- ✅ Melhor dos dois mundos

**TanStack Query (novo!):**

- ✅ Cache automático e inteligente
- ✅ Sincronização de estado simplificada
- ✅ Menos bugs de stale data
- ✅ Melhor que useState chaos

**Vitest (novo!):**

- ✅ Testes unitários rápidos
- ✅ Compatível com Vite
- ✅ Coverage built-in
- ✅ Watch mode excelente

---

## 🗄️ Estrutura de Banco de Dados

### Schema Prisma Completo

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ============================================
// ENUMS
// ============================================

enum ProcessPhase {
  ELIGIBILITY    // Fase 1: Elegibilidade e Estratégia
  EVIDENCE       // Fase 2: Evidências
  LETTERS        // Fase 3: Cartas de Recomendação
  PETITION       // Fase 4: Dossiê Final (I-140)
  FILING         // Fase 5: Protocolo e Acompanhamento
}

enum TaskStatus {
  PENDING        // Pendente
  IN_PROGRESS    // Em progresso
  COMPLETED      // Concluída
  WITH_UPLOAD    // Com upload anexado
  BLOCKED        // Bloqueada (dependência)
}

enum EB1Criteria {
  AWARDS              // Prêmios reconhecidos
  MEMBERSHIP          // Membership em associações
  PRESS               // Cobertura de imprensa
  JUDGING             // Judging work de outros
  ORIGINAL            // Contribuições originais
  SCHOLARLY           // Artigos acadêmicos
  CRITICAL            // Papel crítico/liderança
  HIGH_SALARY         // Salário alto
  EXHIBITIONS         // Exibições artísticas
  COMMERCIAL_SUCCESS  // Sucesso comercial
}

// ============================================
// MODELS
// ============================================

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      String   @default("user") // "user" | "admin"
  
  // Relações
  processes Process[]
  
  // Timestamps
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}

model Process {
  id          String       @id @default(uuid())
  userId      String       @map("user_id")
  title       String       // "Rafael Raio - EB-1A Process"
  description String?
  
  // North Star Statement (tese principal)
  northStar   String?      @map("north_star") @db.Text
  
  // Status geral
  currentPhase ProcessPhase @default(ELIGIBILITY) @map("current_phase")
  progress     Int         @default(0) // 0-100%
  
  // Relações
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks        Task[]
  criteria     CriteriaEvidence[]
  letters      RecommendationLetter[]
  
  // Timestamps
  createdAt    DateTime     @default(now()) @map("created_at")
  updatedAt    DateTime     @updatedAt @map("updated_at")

  @@index([userId])
  @@map("processes")
}

model Task {
  id          String      @id @default(uuid())
  processId   String      @map("process_id")
  phase       ProcessPhase
  title       String
  description String?     @db.Text
  status      TaskStatus  @default(PENDING)
  order       Int         @default(0) // Para ordenação customizada
  
  // Dependências (IDs de outras tasks)
  dependsOn   String[]    @map("depends_on")
  
  // Relações
  process     Process     @relation(fields: [processId], references: [id], onDelete: Cascade)
  uploads     Upload[]
  
  // Timestamps
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")
  completedAt DateTime?   @map("completed_at")

  @@index([processId, phase])
  @@map("tasks")
}

model Upload {
  id          String   @id @default(uuid())
  taskId      String   @map("task_id")
  
  // File info
  fileName    String   @map("file_name")
  fileType    String   @map("file_type") // mime type
  fileSize    BigInt   @map("file_size") // bytes
  fileUrl     String   @map("file_url")  // Supabase Storage URL
  
  // Storage path (para deletar)
  storagePath String   @map("storage_path")
  
  // Relações
  task        Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  
  // Timestamps
  uploadedAt  DateTime @default(now()) @map("uploaded_at")

  @@index([taskId])
  @@map("uploads")
}

model CriteriaEvidence {
  id          String      @id @default(uuid())
  processId   String      @map("process_id")
  criteria    EB1Criteria
  
  // Conteúdo estruturado (4 subseções)
  overview    String?     @db.Text // Visão geral
  context     String?     @db.Text // Contexto e background
  impact      String?     @db.Text // Impacto e resultados
  evidence    String?     @db.Text // Evidências específicas
  
  // Métricas
  metricsData Json?       @map("metrics_data") // Armazena métricas calculadas
  
  // Validação
  isValidated Boolean     @default(false) @map("is_validated")
  validationScore Int?    @map("validation_score") // 0-100
  validationIssues Json?  @map("validation_issues") // Array de issues
  
  // Relações
  process     Process     @relation(fields: [processId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  @@index([processId, criteria])
  @@map("criteria_evidences")
}

model RecommendationLetter {
  id              String   @id @default(uuid())
  processId       String   @map("process_id")
  
  // Informações do recomendador
  recommenderName String   @map("recommender_name")
  recommenderTitle String  @map("recommender_title")
  recommenderOrg  String?  @map("recommender_org")
  recommenderEmail String? @map("recommender_email")
  
  // Conteúdo
  content         String?  @db.Text
  status          String   @default("draft") // draft | review | final | signed
  
  // Relações
  process         Process  @relation(fields: [processId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  @@index([processId])
  @@map("recommendation_letters")
}

// ============================================
// AUDIT LOG (Rastreamento de ações)
// ============================================

model AuditLog {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  action      String   // "task.created", "upload.deleted", etc
  entityType  String   @map("entity_type") // "task", "upload", "criteria"
  entityId    String   @map("entity_id")
  
  // Dados antes/depois (para rollback se necessário)
  before      Json?
  after       Json?
  
  // Metadata
  ipAddress   String?  @map("ip_address")
  userAgent   String?  @map("user_agent")
  
  // Timestamp
  createdAt   DateTime @default(now()) @map("created_at")

  @@index([userId, createdAt])
  @@index([entityType, entityId])
  @@map("audit_logs")
}
```

---

## 📁 Estrutura de Diretórios

```
visaflow-app/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI/CD pipeline
│       └── test.yml                  # Testes automatizados
│
├── prisma/
│   ├── schema.prisma                 # Schema do banco
│   ├── migrations/                   # Migrations
│   └── seed.ts                       # Seed data para dev
│
├── public/
│   ├── images/                       # Imagens estáticas
│   ├── icons/                        # Ícones
│   └── favicon.ico
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                  # Grupo de rotas de auth
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/             # Grupo de rotas protegidas
│   │   │   ├── layout.tsx           # Layout do dashboard
│   │   │   ├── page.tsx             # Dashboard principal
│   │   │   │
│   │   │   ├── process/             # Gestão de processos
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── phase/
│   │   │   │   │   │   └── [phase]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── criteria/
│   │   │   │   │       └── [criteria]/
│   │   │   │   │           └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── letters/             # Cartas de recomendação
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── final-merits/        # Final Merits Generator
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                     # API Routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── processes/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── tasks/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── uploads/
│   │   │   │   └── route.ts
│   │   │   ├── validate/
│   │   │   │   └── route.ts
│   │   │   └── ai/
│   │   │       ├── validate-content/
│   │   │       │   └── route.ts
│   │   │       └── generate-merits/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css              # Global styles
│   │   └── error.tsx                # Error page
│   │
│   ├── components/                  # React Components
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   ├── dashboard/               # Dashboard components
│   │   │   ├── ProcessCard.tsx
│   │   │   ├── TimelinePhases.tsx
│   │   │   ├── ProgressStats.tsx
│   │   │   └── QuickActions.tsx
│   │   │
│   │   ├── tasks/                   # Task components
│   │   │   ├── TaskBoard.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskModal.tsx
│   │   │
│   │   ├── criteria/                # Criteria components
│   │   │   ├── CriteriaTemplate.tsx
│   │   │   ├── CriteriaForm.tsx
│   │   │   ├── CriteriaValidator.tsx
│   │   │   └── MetricsCalculator.tsx
│   │   │
│   │   ├── validation/              # Validation components
│   │   │   ├── ContentValidator.tsx
│   │   │   ├── ReviewChecklist.tsx
│   │   │   └── SuspiciousAlerts.tsx
│   │   │
│   │   └── shared/                  # Shared components
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── FileUpload.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── lib/                         # Utilities & Configs
│   │   ├── db/
│   │   │   ├── client.ts            # Prisma client
│   │   │   └── supabase.ts          # Supabase client
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── processService.ts
│   │   │   ├── taskService.ts
│   │   │   ├── uploadService.ts
│   │   │   ├── criteriaService.ts
│   │   │   └── aiService.ts
│   │   │
│   │   ├── validators/              # Zod schemas
│   │   │   ├── process.schema.ts
│   │   │   ├── task.schema.ts
│   │   │   ├── criteria.schema.ts
│   │   │   └── user.schema.ts
│   │   │
│   │   ├── errors/                  # Error handling
│   │   │   ├── AppError.ts
│   │   │   ├── errors.ts
│   │   │   └── errorHandler.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── cn.ts                # className utils
│   │   │   ├── dates.ts
│   │   │   ├── formatters.ts
│   │   │   └── validators.ts
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useProcess.ts
│   │   │   ├── useTasks.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useUpload.ts
│   │   │
│   │   ├── constants/               # Constants
│   │   │   ├── phases.ts
│   │   │   ├── criteria.ts
│   │   │   └── routes.ts
│   │   │
│   │   └── api/                     # API client functions
│   │       ├── client.ts
│   │       ├── processes.ts
│   │       ├── tasks.ts
│   │       └── uploads.ts
│   │
│   └── types/                       # TypeScript types
│       ├── index.ts
│       ├── database.ts
│       ├── api.ts
│       └── ui.ts
│
├── tests/                           # Tests
│   ├── unit/                        # Vitest unit tests
│   │   ├── services/
│   │   ├── validators/
│   │   └── utils/
│   │
│   └── e2e/                         # Playwright E2E tests
│       ├── auth.spec.ts
│       ├── dashboard.spec.ts
│       ├── tasks.spec.ts
│       └── criteria.spec.ts
│
├── docs/                            # Documentação adicional
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── scripts/                         # Scripts úteis
│   ├── seed-dev.ts
│   ├── migrate-data.ts
│   └── generate-types.ts
│
├── .env                             # Environment variables (gitignored)
│                                     # Localização: /Users/rafaraio/.cursor/projects/visaflow-app/.env
├── .env.example                     # Example env vars (template)
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── README.md
├── CHANGELOG.md
└── VISAFLOW-CONTEXT.md             # Este arquivo!
```

---

## 🤖 PROTOCOLO AGÊNTICO (ULTRA-THINK)

### Regra Fundamental

**TODA tarefa com >3 etapas DEVE seguir o protocolo Ultra-Think:**

1. **ANÁLISE** (obrigatória)
2. **PLANEJAMENTO** (obrigatória para >3 etapas)
3. **APROVAÇÃO DO USUÁRIO** (obrigatória antes de executar)
4. **EXECUÇÃO** (uma etapa por vez)
5. **VALIDAÇÃO** (testes + documentação)

### Classificação de Complexidade

```typescript
enum TaskComplexity {
  SIMPLE = "1-2 steps",      // Execução direta sem planejamento
  MODERATE = "3-5 steps",    // Plano resumido obrigatório
  COMPLEX = "6+ steps"       // Ultra-Think completo obrigatório
}
```

### Template de Ultra-Think

```markdown
## 📊 ANÁLISE DE COMPLEXIDADE

**Tipo:** [SIMPLE | MODERATE | COMPLEX]
**Etapas Identificadas:** X etapas
**Arquivos Envolvidos:** 
- /src/components/...
- /src/lib/...

**Dependências:**
- Package X (já instalado / precisa instalar)
- Componente Y (já existe / precisa criar)

---

## 🎯 PLANO DE EXECUÇÃO (Ultra-Think)

### ETAPAS:

1. **[Etapa 1]** - Descrição clara
   - Arquivo: `src/...`
   - Ação: Criar/Modificar/Deletar
   - Tempo estimado: Xmin

2. **[Etapa 2]** - Descrição clara
   - Arquivo: `src/...`
   - Ação: ...
   - Tempo estimado: Xmin

[... continuar para todas as etapas ...]

---

## ⚠️ RISCOS IDENTIFICADOS:

- ❌ **Breaking change em ComponenteX** (afeta 3 páginas)
- ❌ **Validação mais rigorosa** (pode rejeitar dados existentes)
- ⚠️ **Performance** (query pode ficar lenta)

**Mitigação:**
- Criar testes para ComponenteX antes de modificar
- Adicionar migration para dados existentes
- Adicionar índice no banco

---

## ✅ PONTOS DE VALIDAÇÃO:

- [ ] Após etapa 3: Testes unitários passando
- [ ] Após etapa 5: Zero TypeScript errors
- [ ] Após etapa 7: Testes E2E passando
- [ ] Final: Lighthouse score >90

---

## 📋 ESTIMATIVA TOTAL: X horas

---

## 🚦 STATUS: AGUARDANDO APROVAÇÃO DO USUÁRIO

[Após aprovação, iniciar execução etapa por etapa]
```

---

## 💎 CLEAN CODE COMMANDMENTS

### Regras Inquebráveis

```typescript
const CLEAN_CODE_RULES = {
  // 1. FUNÇÕES
  functions: {
    max_lines: 50,              // Máximo 50 linhas por função
    max_params: 4,              // Máximo 4 parâmetros
    single_responsibility: true, // Uma função = uma responsabilidade
    pure_when_possible: true,   // Preferir funções puras (sem side effects)
    descriptive_names: true     // Nomes que explicam o que fazem
  },
  
  // 2. NESTING (Aninhamento)
  nesting: {
    max_depth: 3,               // Máximo 3 níveis de profundidade
    prefer_early_return: true,  // Usar guard clauses
    avoid_else: true,           // Evitar else (usar guard clauses)
    extract_nested_logic: true  // Extrair lógica aninhada para funções
  },
  
  // 3. DRY (Don't Repeat Yourself)
  dry: {
    no_copy_paste: true,        // ZERO copiar e colar código
    extract_at_3: true,         // Se repetir 3x, extrair para função/componente
    use_utils: true,            // Criar utils/ para lógica compartilhada
    shared_components: true     // Reusar componentes quando possível
  },
  
  // 4. NAMING (Nomenclatura)
  naming: {
    descriptive: true,          // Nomes descritivos completos
    no_abbreviations: true,     // Não usar abreviações (exc: i, j em loops)
    no_magic_numbers: true,     // Usar constantes nomeadas
    boolean_prefix: ["is", "has", "should", "can", "will"],
    intent_revealing: true      // Nome deve revelar intenção
  },
  
  // 5. COMMENTS (Comentários)
  comments: {
    why_not_what: true,         // Comentar "por quê", não "o quê"
    jsdoc_complex: true,        // JSDoc para funções complexas (>20 linhas)
    no_commented_code: true,    // Deletar código comentado (usar git)
    todo_with_issue: true       // TODO apenas com issue do GitHub
  },
  
  // 6. ERROR HANDLING
  errorHandling: {
    fail_fast: true,            // Validar no início da função
    specific_errors: true,      // Criar erros específicos (ValidationError, etc)
    never_silent: true,         // NUNCA catch vazio
    always_log: true            // SEMPRE logar erro antes de throw
  }
}
```

### Exemplo Prático: Código Ruim vs Código Bom

#### ❌ CÓDIGO RUIM

```typescript
// Função de 120 linhas, 8 parâmetros, 5 níveis de nesting
async function processTaskData(uid, tid, t, d, s, p, u, tgs) {
  if (uid) {
    if (tid) {
      if (t) {
        try {
          const db = supabase;
          if (s === 'completed') {
            if (u && u.length > 0) {
              for (let i = 0; i < u.length; i++) {
                if (u[i].size > 10485760) { // magic number!
                  console.log('file too big'); // vago
                  return null;
                } else {
                  // ... 50+ linhas de lógica aninhada ...
                }
              }
            }
          }
          // ... mais 60 linhas ...
        } catch (e) {
          console.log(e); // catch vazio
        }
      }
    }
  }
}
```

#### ✅ CÓDIGO BOM

```typescript
// ============================================
// CONSTANTS (Named magic numbers)
// ============================================
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_UPLOADS_PER_TASK = 10;

// ============================================
// TYPE-SAFE INTERFACES
// ============================================
interface TaskInput {
  userId: string;
  taskId: string;
  title: string;
  description: string;
  status: TaskStatus;
  phase: ProcessPhase;
  uploads: Upload[];
  tags: string[];
}

// ============================================
// SMALL, FOCUSED FUNCTIONS (<50 lines each)
// ============================================

/**
 * Validates task input data
 * @throws {ValidationError} If data is invalid
 */
function validateTaskInput(input: TaskInput): ValidatedTask {
  // Guard clauses (early returns, max nesting = 1)
  if (!input.userId) {
    throw new ValidationError('userId is required');
  }
  
  if (!input.taskId) {
    throw new ValidationError('taskId is required');
  }
  
  if (!input.title?.trim()) {
    throw new ValidationError('title is required and cannot be empty');
  }
  
  // Zod validation for type safety
  return taskInputSchema.parse(input);
}

/**
 * Validates uploads size and count
 * @throws {ValidationError} If uploads are invalid
 */
function validateUploads(uploads: Upload[]): void {
  // Early return (guard clause)
  if (!uploads || uploads.length === 0) {
    return; // No uploads to validate
  }
  
  if (uploads.length > MAX_UPLOADS_PER_TASK) {
    throw new ValidationError(
      `Maximum ${MAX_UPLOADS_PER_TASK} uploads allowed, got ${uploads.length}`
    );
  }
  
  // Use array methods instead of nested loops
  const oversizedFiles = uploads.filter(
    upload => upload.size > MAX_FILE_SIZE_BYTES
  );
  
  if (oversizedFiles.length > 0) {
    const fileNames = oversizedFiles.map(f => f.name).join(', ');
    throw new ValidationError(
      `Files exceed maximum size of 10MB: ${fileNames}`
    );
  }
}

/**
 * Main orchestrator function
 * Single responsibility: orchestrate task processing
 * Max 30 lines, delegates to other functions
 */
export async function processTask(input: TaskInput): Promise<Task> {
  try {
    // Step 1: Validate input (fail fast)
    const validatedInput = validateTaskInput(input);
    
    // Step 2: Create task in database
    const task = await createTaskInDatabase(validatedInput);
    
    // Step 3: Process uploads if task is completed
    if (task.status === 'COMPLETED' && task.uploads.length > 0) {
      const processedUploads = await processCompletedTaskUploads(
        task.id,
        task.uploads
      );
      
      await saveUploadsToDatabase(task.id, processedUploads);
    }
    
    // Step 4: Log success
    logger.info('Task processed successfully', {
      taskId: task.id,
      userId: task.userId,
      status: task.status
    });
    
    return task;
    
  } catch (error) {
    // Always log error with context before re-throwing
    logger.error('Failed to process task', error, {
      input: {
        userId: input.userId,
        taskId: input.taskId,
        title: input.title
      }
    });
    
    // Re-throw specific error (never silent catch)
    if (error instanceof ValidationError) {
      throw error;
    }
    
    throw new AppError('Failed to process task');
  }
}
```

### Checklist de Code Review

```typescript
const CODE_REVIEW_CHECKLIST = {
  structure: [
    "[ ] Todas as funções têm <50 linhas?",
    "[ ] Todas as funções têm ≤4 parâmetros?",
    "[ ] Nesting máximo de 3 níveis?",
    "[ ] Zero código duplicado (DRY)?",
    "[ ] Funções têm responsabilidade única?"
  ],
  
  naming: [
    "[ ] Nomes descritivos (não abreviações)?",
    "[ ] Booleans têm prefixo is/has/can/should?",
    "[ ] Constantes em SCREAMING_SNAKE_CASE?",
    "[ ] Zero magic numbers (usar constantes)?",
    "[ ] Nomes revelam intenção?"
  ],
  
  typescript: [
    "[ ] Zero 'any' types?",
    "[ ] Todas as funções têm tipo de retorno explícito?",
    "[ ] Props de componentes tipadas com interface?",
    "[ ] Zero TypeScript errors (npm run type-check)?",
    "[ ] Enums usados para valores fixos?"
  ],
  
  errorHandling: [
    "[ ] Validações no início (fail fast)?",
    "[ ] Erros específicos (ValidationError, etc)?",
    "[ ] Zero catch vazios?",
    "[ ] Logs antes de throw?",
    "[ ] Try-catch apenas onde necessário?"
  ],
  
  testing: [
    "[ ] Testes unitários criados?",
    "[ ] Edge cases cobertos?",
    "[ ] Testes E2E passando?",
    "[ ] Cobertura >80%?"
  ],
  
  comments: [
    "[ ] JSDoc em funções complexas (>20 linhas)?",
    "[ ] Comentários explicam 'por quê', não 'o quê'?",
    "[ ] Zero código comentado?",
    "[ ] TODOs têm issue do GitHub?"
  ]
}
```

---

## 🛡️ SECURITY GUIDELINES

### Input Validation (Layer 1 - Frontend + Layer 2 - Backend)

```typescript
// ============================================
// SHARED ZOD SCHEMAS (lib/validators/)
// ============================================

import { z } from 'zod';

// Task input schema (compartilhado frontend + backend)
export const taskInputSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title too long (max 200 characters)'),
  
  description: z.string()
    .max(5000, 'Description too long (max 5000 characters)')
    .optional(),
  
  phase: z.enum([
    'ELIGIBILITY',
    'EVIDENCE',
    'LETTERS',
    'PETITION',
    'FILING'
  ]),
  
  status: z.enum([
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'WITH_UPLOAD',
    'BLOCKED'
  ]).default('PENDING'),
  
  tags: z.array(z.string())
    .max(10, 'Maximum 10 tags allowed')
    .optional(),
});

export type TaskInput = z.infer<typeof taskInputSchema>;

// ============================================
// FRONTEND VALIDATION
// ============================================

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function TaskForm() {
  const form = useForm<TaskInput>({
    resolver: zodResolver(taskInputSchema),
    defaultValues: {
      title: '',
      description: '',
      phase: 'ELIGIBILITY',
      status: 'PENDING',
    }
  });
  
  const onSubmit = async (data: TaskInput) => {
    // Data já validado pelo Zod
    await createTask(data);
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... inputs ... */}
    </form>
  );
}

// ============================================
// BACKEND VALIDATION (API Route)
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // RE-VALIDAR no backend (NEVER trust client)
    const validated = taskInputSchema.parse(body);
    
    // Verificar autenticação
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Criar task
    const task = await createTask({
      ...validated,
      userId: user.id, // SEMPRE usar user da sessão
    });
    
    return NextResponse.json(task);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    logger.error('Failed to create task', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Authentication & Authorization

```typescript
// ============================================
// AUTH UTILITIES
// ============================================

/**
 * Get authenticated user from request
 * @throws {UnauthorizedError} If no valid session
 */
export async function getAuthUser(request: NextRequest) {
  const supabase = createClient(cookies());
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new UnauthorizedError('Not authenticated');
  }
  
  return user;
}

/**
 * Check if user owns a resource
 * @throws {ForbiddenError} If user doesn't own resource
 */
export async function ensureOwnership(
  userId: string,
  resourceOwnerId: string,
  resourceType: string
) {
  if (userId !== resourceOwnerId) {
    throw new ForbiddenError(
      `You don't have permission to access this ${resourceType}`
    );
  }
}
```

### Row Level Security (RLS) - Supabase

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- Users can only SELECT their own processes
CREATE POLICY "users_select_own_processes"
ON processes FOR SELECT
USING (auth.uid() = user_id);

-- Users can only INSERT processes for themselves
CREATE POLICY "users_insert_own_processes"
ON processes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only UPDATE their own processes
CREATE POLICY "users_update_own_processes"
ON processes FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can only DELETE their own processes
CREATE POLICY "users_delete_own_processes"
ON processes FOR DELETE
USING (auth.uid() = user_id);
```

### File Upload Security

```typescript
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateUploadedFile(file: File): void {
  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    throw new ValidationError(
      `File type not allowed. Allowed types: PDF, DOCX, PNG, JPG`
    );
  }
  
  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError(
      `File too large. Maximum size is 10MB`
    );
  }
  
  const safeName = file.name
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .substring(0, 100);
  
  return safeName;
}
```

---

## 🚨 ERROR HANDLING SYSTEM

### Hierarquia de Erros

```typescript
// ============================================
// lib/errors/errors.ts
// ============================================

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Not authenticated') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Permission denied') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with id '${id}' not found`
      : `${resource} not found`;
    super(message, 404, 'NOT_FOUND');
  }
}
```

### Error Handler para API Routes

```typescript
type Handler = (request: NextRequest, context?: any) => Promise<NextResponse>;

export function withErrorHandling(handler: Handler): Handler {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
      
    } catch (error) {
      logger.error('API Error', error, {
        path: request.nextUrl.pathname,
        method: request.method,
      });
      
      if (error instanceof AppError) {
        return NextResponse.json(
          {
            error: error.message,
            code: error.code,
            details: error.details,
          },
          { status: error.statusCode }
        );
      }
      
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: error.errors,
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        {
          error: 'Internal server error',
          code: 'INTERNAL_ERROR',
        },
        { status: 500 }
      );
    }
  };
}
```

### Logger Estruturado

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ) {
    this.log('error', message, error, context);
  }
}

export const logger = new Logger();
```

---

## 📝 PROTOCOLO GIT & PR

### Conventional Commits

```bash
# FORMATO
<type>(<scope>): <subject>

# TYPES
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação
refactor: Refatoração
perf:     Performance
test:     Testes
chore:    Build/config

# EXEMPLOS ✅
feat(auth): implement Google OAuth login
fix(upload): correct file size validation
docs(readme): update installation instructions
refactor(tasks): extract TaskForm component
test(validation): add unit tests for Zod schemas

# EXEMPLOS ❌
update code
fixed bug in tasks
Add new feature
```

### PR Checklist

```markdown
## Checklist

### Code Quality
- [ ] Zero TypeScript errors
- [ ] ESLint passed
- [ ] Functions <50 lines
- [ ] No code duplication

### Testing
- [ ] Unit tests added
- [ ] E2E tests passed
- [ ] Coverage ≥80%

### Security
- [ ] Inputs validated with Zod
- [ ] RLS policies verified
- [ ] No secrets exposed

### Documentation
- [ ] CHANGELOG.md updated
- [ ] JSDoc added to complex functions
- [ ] Comments explain "why"
```

---

## 💻 COMMAND CENTER

```bash
# ====================
# DEVELOPMENT
# ====================
npm run dev               # Dev server
npm run build             # Production build
npm run lint              # ESLint
npm run type-check        # TypeScript check

# ====================
# ENVIRONMENT
# ====================
npx tsx scripts/validate-env.ts  # Validar variáveis de ambiente
# Arquivo .env: /Users/rafaraio/.cursor/projects/visaflow-app/.env

# ====================
# DATABASE (Prisma)
# ====================
npx prisma generate       # Generate Client
npx prisma db push        # Push schema
npx prisma migrate dev    # Create migration
npx prisma studio         # Open Studio GUI

# ====================
# SUPABASE MIGRATIONS (SQL)
# ====================
npx tsx scripts/apply-migrations-final.ts                 # ⭐ SOLUÇÃO DEFINITIVA - Tenta múltiplos métodos
npx tsx scripts/apply-migrations-robust.ts                 # Método robusto com fallback
npx tsx scripts/apply-supabase-migrations.ts              # Connection string direta (pode falhar DNS)
npx tsx scripts/verify-complete-status.ts                 # Verificar status completo (tabelas, RLS, policies)
npx tsx scripts/verify-supabase-tables.ts                 # Verificar apenas tabelas

# Supabase CLI (após configurar)
npx supabase login                                        # Fazer login (primeira vez) ✅ FEITO
# Obter Access Token: https://supabase.com/dashboard/account/tokens (formato: sbp_...)
export SUPABASE_ACCESS_TOKEN=sbp_SEU_TOKEN_AQUI           # Definir token antes de linkar
npx supabase link --project-ref jsnvrhbeedkifqwmsumc      # Linkar projeto (precisa token sbp_...)
# Ou usar script helper:
./scripts/link-supabase-project.sh sbp_SEU_TOKEN_AQUI     # Script helper para linkar
npx supabase db execute -f supabase/migrations/[arquivo.sql] # Aplicar migration específica

# ====================
# TESTING
# ====================
npm run test:unit         # Vitest
npm test                  # Playwright E2E
npm run test:ui           # Playwright UI

# ====================
# GIT
# ====================
git add .
git commit -m "feat(scope): message"
git push
```

---

## 🔐 VARIÁVEIS DE AMBIENTE

### Localização do Arquivo .env

**Arquivo de configuração:**
```
/Users/rafaraio/.cursor/projects/visaflow-app/.env
```

### Variáveis Obrigatórias Configuradas

✅ **Supabase:**
- `NEXT_PUBLIC_SUPABASE_URL` - URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave pública anônima
- `SUPABASE_SERVICE_ROLE_KEY` - Chave de serviço (uploads/admin)
- `DATABASE_URL` - Connection string PostgreSQL (Prisma Accelerate)
- `DIRECT_DATABASE_URL` - Connection string direta PostgreSQL (para migrations SQL) ⭐ **NOVO**
- `DATABASE_KEY` - Senha do banco de dados PostgreSQL ⭐ **NOVO**

✅ **Anthropic Claude API:**
- `ANTHROPIC_API_KEY` - Chave da API Claude (validação com IA)

### Variáveis Opcionais

- `RESEND_API_KEY` - Para emails transacionais (opcional)
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Para analytics (opcional)

### Validação

Execute o script de validação para verificar se todas as variáveis estão configuradas:

```bash
npx tsx scripts/validate-env.ts
```

---

## 🎯 PRÓXIMOS PASSOS

### Setup Inicial do Projeto

```bash
# 1. Criar projeto Next.js 15
cd /Users/rafaraio/.cursor/projects/visaflow-app/
npx create-next-app@latest . --typescript --tailwind --app --use-npm

# 2. Instalar dependências essenciais
npm install @supabase/supabase-js @supabase/ssr
npm install @prisma/client prisma
npm install zod react-hook-form @hookform/resolvers/zod
npm install @tanstack/react-query
npm install @anthropic-ai/sdk

# 3. Instalar dependências de UI
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react class-variance-authority clsx tailwind-merge

# 4. Instalar dependências de dev
npm install -D vitest @vitest/ui @testing-library/react
npm install -D @playwright/test
npm install -D prettier eslint-config-prettier

# 5. Configurar variáveis de ambiente
# Editar arquivo: /Users/rafaraio/.cursor/projects/visaflow-app/.env
# Adicionar todas as variáveis obrigatórias (ver seção VARIÁVEIS DE AMBIENTE acima)

# 6. Validar variáveis de ambiente
npx tsx scripts/validate-env.ts

# 7. Inicializar Prisma e gerar client
npx prisma generate
npx prisma db push  # ou npx prisma migrate dev

# 8. Git
git init
git add .
git commit -m "chore: initial project setup"
```

### Cronograma (3 Semanas)

#### Semana 1: Fundação

- Day 1: Setup completo
- Day 2: Prisma schema + migrations
- Day 3: Auth (Supabase)
- Day 4: Layout base + Error Boundaries
- Day 5: Services layer + validações

#### Semana 2: Core Features

- Day 1: Dashboard
- Day 2: Tasks CRUD
- Day 3: Upload system
- Day 4: Criteria forms
- Day 5: Validation com IA

#### Semana 3: Advanced + Polish

- Day 1: Final Merits Generator
- Day 2: Letters templates
- Day 3: Testes completos
- Day 4: Polish UI/UX
- Day 5: Deploy + monitoring

---

## 🧠 LEMBRETE FINAL

**Este documento é o cérebro persistente do VisaFlow.**

✅ **Sempre carregar via:** `@VisaflowContext`  
✅ **Sempre validar path:** `/Users/rafaraio/.cursor/projects/visaflow-app/`  
✅ **Sempre seguir:** Protocolo Ultra-Think para tarefas >3 etapas  
✅ **Sempre aplicar:** Clean Code Commandments  
✅ **Sempre garantir:** Security Guidelines

---

## 📋 REGRA DE COMUNICAÇÃO COM USUÁRIO

**SEMPRE ao final de cada resposta, incluir seção resumida:**

```markdown
---

## ⚡ AÇÃO NECESSÁRIA DO USUÁRIO

[Se houver algo que o usuário precisa fazer manualmente, listar de forma resumida e clara]

- [ ] Ação 1: Descrição breve
- [ ] Ação 2: Descrição breve

**Se não houver ações necessárias, omitir esta seção.**
```

**Exemplo:**
- ✅ Se criar código que funciona automaticamente → Não precisa incluir
- ✅ Se aplicar RLS via script → Não precisa incluir  
- ⚠️ Se precisar aplicar RLS manualmente no Supabase Dashboard → Incluir instruções resumidas
- ⚠️ Se precisar configurar variável de ambiente → Incluir instruções resumidas

---

**Última Atualização:** Janeiro 2025  
**Versão:** 1.4  
**Status:** 🚀 **PRONTO PARA COMEÇAR**

**Novidades v1.4:**
- ✅ Script de aplicação automática de migrations SQL (`apply-supabase-migrations.ts`)
- ✅ Documentação completa de aplicação automática de migrations
- ✅ Variáveis `DIRECT_DATABASE_URL` e `DATABASE_KEY` adicionadas
- ✅ Comandos atualizados no Command Center

**Nota sobre Variáveis de Ambiente:**
- Arquivo `.env` localizado em: `/Users/rafaraio/.cursor/projects/visaflow-app/.env`
- Todas as secret keys foram configuradas pelo usuário
- Execute `npx tsx scripts/validate-env.ts` para validar configuração

---

## 🔌 ESTRATÉGIA MCP - MÚLTIPLOS PROJETOS SUPABASE

### Configuração

O projeto VisaFlow usa arquivo `.mcp.json` local para conectar ao seu próprio projeto Supabase, permitindo trabalhar simultaneamente com múltiplos projetos em conversas diferentes.

**Arquivo:** `/Users/rafaraio/.cursor/projects/visaflow-app/.mcp.json`

**Projeto Supabase:**
- URL: `https://jsnvrhbeedkifqwmsumc.supabase.co`
- Project Ref: `jsnvrhbeedkifqwmsumc`

### Servidores MCP Configurados

- `filesystem-visaflow`: Acesso ao sistema de arquivos do projeto VisaFlow
- `memory`: Memória persistente compartilhada entre projetos
- `supabase`: Conexão direta ao banco Supabase do VisaFlow
- `context7`: Busca em documentação (opcional, compartilhado)

### Como Funciona

1. **Detecção Automática:** Cursor detecta automaticamente o `.mcp.json` no diretório do projeto
2. **Contexto por Projeto:** Cada conversa usa o contexto do projeto onde está aberta
3. **Isolamento Total:** Projetos isolados - VisaFlow e Laro não interferem entre si
4. **Múltiplas Conversas:** Você pode trabalhar com VisaFlow em uma janela e Laro em outra simultaneamente

### Verificação de Projeto Conectado

**SEMPRE verificar projeto conectado antes de aplicar migrations:**

1. **Via MCP:**
   ```typescript
   mcp_supabase_get_project_url()
   // Deve retornar: https://jsnvrhbeedkifqwmsumc.supabase.co
   ```

2. **Via Código:**
   ```bash
   grep NEXT_PUBLIC_SUPABASE_URL .env
   # Deve mostrar: https://jsnvrhbeedkifqwmsumc.supabase.co
   ```

3. **Comparar:** URLs devem coincidir antes de aplicar qualquer migration

### ⚠️ IMPORTANTE - Prevenção de Mistura de Projetos

**Checklist ANTES de aplicar migrations:**

- [ ] Executar `mcp_supabase_get_project_url` para confirmar projeto conectado
- [ ] Comparar com `NEXT_PUBLIC_SUPABASE_URL` do `.env`
- [ ] Verificar que project_ref corresponde: `jsnvrhbeedkifqwmsumc`
- [ ] Só aplicar migrations se projetos coincidirem
- [ ] Se projetos não coincidirem, criar/atualizar `.mcp.json` local primeiro

### Estrutura de Arquivos MCP

```
/Users/rafaraio/.cursor/
├── mcp.json (configuração global - servidores compartilhados)
└── projects/
    ├── laro/
    │   └── .mcp.json (Supabase Laro: izrvmoyppwexwqisicxe)
    └── visaflow-app/
        └── .mcp.json (Supabase VisaFlow: jsnvrhbeedkifqwmsumc) ← ESTE ARQUIVO
```

### Credenciais Necessárias

**No arquivo `.mcp.json`:**
- `SUPABASE_URL`: URL do projeto Supabase
- `SUPABASE_ANON_KEY`: Chave pública anônima
- `SUPABASE_ACCESS_TOKEN`: Token de acesso (obter do Dashboard)

**Como obter SUPABASE_ACCESS_TOKEN:**
1. Acessar: `https://supabase.com/dashboard/project/jsnvrhbeedkifqwmsumc`
2. Settings > API > Access Tokens
3. Criar novo token ou usar existente
4. Adicionar ao `.mcp.json` na seção `env.SUPABASE_ACCESS_TOKEN`

### Troubleshooting

**Problema:** MCP não conecta ao projeto correto
- **Solução:** Verificar se `.mcp.json` está no diretório correto do projeto
- **Solução:** Reiniciar Cursor após criar/atualizar `.mcp.json`

**Problema:** Erro de autenticação
- **Solução:** Verificar se `SUPABASE_ACCESS_TOKEN` está correto
- **Solução:** Gerar novo token no Dashboard se necessário

**Problema:** Tabelas criadas no projeto errado
- **Solução:** Verificar projeto conectado ANTES de aplicar migrations
- **Solução:** Reverter tabelas criadas incorretamente via SQL

---

## 🚀 APLICAÇÃO AUTOMÁTICA DE MIGRATIONS SQL

### Visão Geral

O projeto VisaFlow possui migrations SQL em `/supabase/migrations/` que precisam ser aplicadas diretamente no banco Supabase. O script `apply-supabase-migrations.ts` automatiza esse processo usando a connection string direta (`DIRECT_DATABASE_URL`).

### Como Funciona

O script conecta diretamente ao PostgreSQL do Supabase usando `DIRECT_DATABASE_URL` e executa os comandos SQL das migrations em ordem, tratando erros esperados (como "already exists") e reportando o resultado.

### Uso

#### Aplicar Todas as Migrations (Recomendado)

```bash
npx tsx scripts/apply-supabase-migrations.ts
```

Isso aplica automaticamente:
- `007_APPLY_ALL_RLS_COMPLETE.sql` - Migration completa consolidada (RLS + Policies + Storage)

#### Aplicar Migration Específica

```bash
npx tsx scripts/apply-supabase-migrations.ts 006_setup_storage_bucket.sql
```

### Pré-requisitos

1. **Variável de Ambiente Configurada:**
   ```bash
   DIRECT_DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
   ```

2. **Verificar Projeto Correto:**
   O script valida automaticamente que está conectando ao projeto correto (`jsnvrhbeedkifqwmsumc`).

### Verificação Pós-Aplicação

Após aplicar migrations, sempre verifique:

```bash
# Verificação completa (tabelas, RLS, policies, storage)
npx tsx scripts/verify-complete-status.ts

# Verificação apenas de tabelas
npx tsx scripts/verify-supabase-tables.ts
```

### Migrations Disponíveis

| Arquivo | Descrição | Quando Usar |
|---------|-----------|-------------|
| `007_APPLY_ALL_RLS_COMPLETE.sql` | Migration completa consolidada | ⭐ **Recomendado** - Aplica tudo de uma vez |
| `006_setup_storage_bucket.sql` | Cria bucket e storage policies | Se precisar apenas do storage |
| `005_add_missing_rls_policies.sql` | Adiciona policies RLS faltantes | Se policies específicas faltarem |
| `000_initial_schema.sql` | Schema inicial completo | Setup inicial do projeto |

### Fluxo de Trabalho Recomendado

1. **Criar/Editar Migration SQL:**
   ```bash
   # Editar migration em: supabase/migrations/[nome].sql
   ```

2. **Aplicar Automaticamente:**
   ```bash
   npx tsx scripts/apply-supabase-migrations.ts [nome].sql
   ```

3. **Verificar Aplicação:**
   ```bash
   npx tsx scripts/verify-complete-status.ts
   ```

4. **Se tudo OK, commit:**
   ```bash
   git add supabase/migrations/[nome].sql
   git commit -m "feat(db): add [descrição] migration"
   ```

### Tratamento de Erros

O script trata automaticamente erros esperados:
- ✅ "already exists" - Ignora (já aplicado)
- ✅ "does not exist" - Ignora (dependência não criada ainda)
- ❌ Outros erros - Reporta e para execução

### Vantagens da Aplicação Automática

- ✅ **Rápido:** Aplica múltiplas migrations em segundos
- ✅ **Seguro:** Valida projeto antes de aplicar
- ✅ **Confiável:** Trata erros esperados automaticamente
- ✅ **Rastreável:** Mostra exatamente o que foi aplicado
- ✅ **Repetível:** Pode executar múltiplas vezes sem problemas

### Quando Usar Aplicação Manual

Use o Supabase Dashboard manualmente apenas quando:
- ⚠️ Script falhar com erro inesperado
- ⚠️ Precisar debugar SQL específico
- ⚠️ Migration muito complexa que precisa revisão passo a passo

### Troubleshooting

**Erro: "DIRECT_DATABASE_URL não configurada"**
- **Solução:** Adicione `DIRECT_DATABASE_URL` ao `.env` com a connection string direta do Supabase

**Erro: "getaddrinfo ENOTFOUND"**
- **Solução:** Use Supabase CLI (recomendado) - `npx tsx scripts/apply-migrations-final.ts`
- **Solução Alternativa:** Verifique formato da URL no Dashboard do Supabase
- **Nota:** Connection string direta pode ter problemas de DNS - CLI resolve isso

**Erro: "SUPABASE_URL não corresponde ao projeto VisaFlow"**
- **Solução:** Verifique se `NEXT_PUBLIC_SUPABASE_URL` aponta para `jsnvrhbeedkifqwmsumc`

**Migration aplicada mas RLS ainda desabilitado**
- **Solução:** Execute verificação: `npx tsx scripts/verify-complete-status.ts`
- **Solução:** Se necessário, reaplique: `npx tsx scripts/apply-supabase-migrations.ts 007_APPLY_ALL_RLS_COMPLETE.sql`