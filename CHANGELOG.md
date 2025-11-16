# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [0.4.0] - 2025-01-13

### ✅ Fase 4: Gestão de Processos e Tasks - COMPLETA

#### Adicionado
- API Routes completas para CRUD de processos (`/api/processes`)
- API Routes completas para CRUD de tasks (`/api/tasks`)
- API Routes para uploads (`/api/uploads`)
- Página de criação de processos (`/dashboard/process/new`)
- Página de detalhes do processo (`/dashboard/process/[id]`)
- Componente TaskBoard com visualização por fases
- Componente TaskCard para exibição de tasks
- Componente TaskModal para criação/edição de tasks
- Componente FileUpload para upload de arquivos
- Service de uploads com validação de arquivos
- Sistema de dependências entre tasks (já implementado no service)

#### Implementado
- CRUD completo de processos (Create, Read, Update, Delete)
- CRUD completo de tasks
- Task Board organizado por fases do processo
- Upload de arquivos para Supabase Storage
- Validação de tipos de arquivo (PDF, DOCX, PNG, JPG)
- Validação de tamanho máximo (10MB)
- Verificação de ownership em todas as operações
- Sistema de dependências entre tasks
- Integração completa entre componentes

#### Componentes Criados
- `TaskBoard.tsx` - Board de tasks por fase
- `TaskCard.tsx` - Card de task individual
- `TaskModal.tsx` - Modal de criação/edição
- `FileUpload.tsx` - Componente de upload
- `TaskBoardSection.tsx` - Seção integrada na página de processo

#### Services Criados
- `uploadService.ts` - Service para gerenciar uploads

#### Próximos Passos
- Fase 5: Critérios e Validação
- Implementar templates de critérios
- Criar formulário de critérios com 4 subseções
- Implementar validação com Claude API
- Criar sistema de detecção de práticas suspeitas

---

## [0.3.0] - 2025-01-13

### ✅ Fase 3: Dashboard e Layout - COMPLETA

#### Adicionado
- Layout completo do dashboard (Header, Sidebar, Footer)
- Componente ErrorBoundary para tratamento de erros na UI
- Dashboard principal com visualização de processos
- Componente ProcessCard para exibição de processos
- Componente TimelinePhases interativo com 5 fases clicáveis
- Componente ProgressStats com estatísticas visuais
- Componente QuickActions para acesso rápido
- Componentes shared (LoadingSpinner, ErrorMessage)
- Tipos TypeScript temporários para database (até Prisma Client ser gerado)

#### Implementado
- Layout responsivo com sidebar colapsável
- Navegação entre fases do processo
- Visualização de progresso por processo
- Estatísticas agregadas do dashboard
- Tratamento de erros com ErrorBoundary
- Proteção de rotas do dashboard

#### Componentes Criados
- `Header.tsx` - Cabeçalho com logout e perfil
- `Sidebar.tsx` - Navegação lateral
- `Footer.tsx` - Rodapé
- `ErrorBoundary.tsx` - Boundary para erros React
- `ProcessCard.tsx` - Card de processo
- `TimelinePhases.tsx` - Timeline interativa
- `ProgressStats.tsx` - Estatísticas de progresso
- `QuickActions.tsx` - Ações rápidas
- `LoadingSpinner.tsx` - Spinner de loading
- `ErrorMessage.tsx` - Mensagem de erro

#### Próximos Passos
- Fase 4: Gestão de Processos e Tasks
- Implementar CRUD completo de processos
- Criar Task Board
- Implementar sistema de uploads

---

## [0.2.0] - 2025-01-13

### ✅ Fase 2: Autenticação e Banco de Dados - COMPLETA

#### Adicionado
- Middleware de autenticação para proteção de rotas
- Páginas de login e signup com Supabase Auth
- Sistema de erros estruturado (AppError, ValidationError, etc.)
- Error handler para API routes
- Services layer base (processService, taskService)
- Validators Zod (process.schema, task.schema)
- Funções de autenticação (getAuthUser, ensureOwnership)
- Migrations SQL para RLS no Supabase
- Constantes para fases e critérios EB-1A

#### Implementado
- Proteção de rotas do dashboard via middleware
- Validação de ownership em services
- Estrutura de error handling seguindo Clean Code
- Policies de RLS para todas as tabelas

#### Próximos Passos
- Fase 3: Dashboard e Layout
- Implementar layout do dashboard
- Criar componentes de timeline
- Implementar visualização de processos

---

## [0.1.0] - 2025-01-13

### ✅ Fase 1: Fundação - COMPLETA

#### Adicionado
- Setup inicial do projeto Next.js 15 com TypeScript strict mode
- Configuração completa do Prisma com schema do banco de dados
- Configuração do Supabase (client e estrutura)
- Configuração do shadcn/ui com componentes base
- Estrutura completa de pastas conforme arquitetura
- Configuração de ESLint e Prettier
- Configuração de testes (Vitest e Playwright)
- TailwindCSS v4 configurado
- README.md com documentação inicial

#### Configurado
- TypeScript strict mode (zero `any` permitido)
- Path aliases (`@/` para `src/`)
- Estrutura de pastas completa
- Componentes shadcn/ui: button, card, input, dialog, dropdown-menu

#### Próximos Passos
- Fase 2: Autenticação e Banco de Dados
- Configurar Supabase localmente ou em produção
- Aplicar migrations do Prisma
- Implementar autenticação

