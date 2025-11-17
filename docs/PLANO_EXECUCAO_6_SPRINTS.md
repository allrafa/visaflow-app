# 📊 PLANO DE EXECUÇÃO - 6 SPRINTS (289 TAREFAS)

**Data:** 16 de Novembro de 2025  
**Status:** 🚦 **AGUARDANDO APROVAÇÃO DO USUÁRIO**  
**Baseado em:** PLANO_MELHORIAS_COMPLETO.md + RESUMO_EXECUTIVO_MELHORIAS.md + VISAFLOW CONTEXT.md

---

## 📊 ANÁLISE DE COMPLEXIDADE

**Tipo:** **COMPLEX** (6+ sprints, 289 tarefas)  
**Etapas Identificadas:** 6 sprints principais + múltiplas sub-etapas  
**Arquivos Envolvidos:**
- `/src/lib/constants/default-tasks.ts` - Expandir de 30 para 289 tarefas
- `/src/lib/services/taskSeedService.ts` - Atualizar lógica de seed
- `/src/components/layout/Sidebar.tsx` - Remover Tasks, adicionar Recent Activity
- `/src/components/dashboard/` - Timeline, Stats, Next Actions
- `/prisma/schema.prisma` - Adicionar Collaborator e Activity models
- `/supabase/migrations/` - Migrations para novos schemas

**Dependências:**
- Prisma Client (já instalado)
- Supabase (já configurado)
- React Query (já instalado)
- shadcn/ui (já instalado)

---

## 🎯 PLANO DE EXECUÇÃO (Ultra-Think)

### SPRINT 1: TAREFAS EXPANDIDAS (Semana 1-2)
**Objetivo:** Expandir de 30 para 289 tarefas detalhadas

#### ETAPAS:

1. **Criar estrutura de tarefas detalhadas por fase**
   - Arquivo: `src/lib/constants/default-tasks.ts`
   - Ação: Expandir array DEFAULT_TASKS
   - Estrutura: 20 ELIGIBILITY + 150 EVIDENCE + 41 LETTERS + 45 PETITION + 33 FILING
   - Tempo estimado: 4-6 horas

2. **Organizar tarefas por critério (EVIDENCE)**
   - Criar template de 15 tarefas por critério
   - 10 critérios × 15 tarefas = 150 tarefas
   - Cada critério: Identificação (2-3) + Coleta (3-5) + Preparação (2-3) + Escrita (4) + Validação (2-3)
   - Tempo estimado: 6-8 horas

3. **Adicionar dependências entre tarefas**
   - Mapear relações de dependência
   - Atualizar campo `dependsOn` com índices corretos
   - Tempo estimado: 2 horas

4. **Atualizar taskSeedService**
   - Arquivo: `src/lib/services/taskSeedService.ts`
   - Ação: Garantir compatibilidade com 289 tarefas
   - Tempo estimado: 1 hora

5. **Testar criação de processo com 289 tarefas**
   - Criar processo de teste
   - Verificar todas as tarefas são criadas
   - Validar dependências funcionam
   - Tempo estimado: 1 hora

**Total Sprint 1:** ~14-18 horas

---

### SPRINT 2: NAVEGAÇÃO SIMPLIFICADA (Semana 3)
**Objetivo:** Simplificar sidebar e melhorar UX

#### ETAPAS:

1. **Remover "Tasks" do Sidebar**
   - Arquivo: `src/components/layout/Sidebar.tsx`
   - Ação: Remover item "Tasks" do menu
   - Tempo estimado: 15 minutos

2. **Melhorar "My Processes"**
   - Garantir que ao clicar mostra todas as tarefas
   - Arquivo: `src/app/dashboard/process/[id]/page.tsx`
   - Tempo estimado: 1 hora

3. **Adicionar tooltips explicativos**
   - Tooltips para Criteria, Letters, Final Merits
   - Explicar importância de cada área
   - Tempo estimado: 2 horas

4. **Atualizar documentação de navegação**
   - Documentar novo fluxo
   - Tempo estimado: 30 minutos

**Total Sprint 2:** ~4 horas

---

### SPRINT 3: TIMELINE DE 300 DIAS (Semana 3)
**Objetivo:** Timeline visual interativa com marcos

#### ETAPAS:

1. **Criar componente Timeline300Days**
   - Arquivo: `src/components/dashboard/Timeline300Days.tsx`
   - Barra de progresso visual
   - 17 marcos principais
   - Tempo estimado: 4 horas

2. **Implementar cálculo de progresso**
   - Baseado em tarefas completadas
   - Estimativas dinâmicas
   - Arquivo: `src/lib/services/timelineService.ts` (novo)
   - Tempo estimado: 3 horas

3. **Adicionar marcos clicáveis**
   - Cada marco mostra tarefas associadas
   - Redireciona para fase correspondente
   - Tempo estimado: 2 horas

4. **Integrar no Dashboard**
   - Arquivo: `src/app/dashboard/page.tsx`
   - Adicionar componente Timeline
   - Tempo estimado: 1 hora

5. **Adicionar alertas de atrasos**
   - Comparar progresso real vs. estimado
   - Alertas visuais
   - Tempo estimado: 2 horas

**Total Sprint 3:** ~12 horas

---

### SPRINT 4: COLABORADORES (Semana 4)
**Objetivo:** Sistema completo de colaboração

#### ETAPAS:

1. **Criar schema de Collaborator**
   - Arquivo: `prisma/schema.prisma`
   - Model: Collaborator com campos (id, processId, userId, email, role, etc.)
   - Tempo estimado: 1 hora

2. **Criar migration**
   - Arquivo: `supabase/migrations/008_create_collaborators.sql`
   - Tabela + RLS policies
   - Tempo estimado: 2 horas

3. **Implementar sistema de convites**
   - Service: `src/lib/services/collaboratorService.ts`
   - API: `src/app/api/collaborators/route.ts`
   - Tempo estimado: 4 horas

4. **Criar UI de gerenciamento**
   - Componente: `src/components/collaborators/CollaboratorManager.tsx`
   - Lista colaboradores
   - Botão "Invite Collaborator"
   - Tempo estimado: 4 horas

5. **Implementar permissões por role**
   - 5 roles: Owner, Attorney, Assistant, Reviewer, Viewer
   - Middleware de verificação
   - Tempo estimado: 3 horas

6. **Testar fluxo completo**
   - Criar convite
   - Aceitar convite
   - Verificar permissões
   - Tempo estimado: 2 horas

**Total Sprint 4:** ~16 horas

---

### SPRINT 5: ACTIVITY LOGS (Semana 5)
**Objetivo:** Rastreabilidade completa de ações

#### ETAPAS:

1. **Criar schema de Activity**
   - Arquivo: `prisma/schema.prisma`
   - Model: Activity com campos (id, processId, userId, action, entityType, etc.)
   - Tempo estimado: 1 hora

2. **Criar migration**
   - Arquivo: `supabase/migrations/009_create_activity_logs.sql`
   - Tabela + índices
   - Tempo estimado: 1 hora

3. **Implementar tracking automático**
   - Service: `src/lib/services/activityService.ts`
   - Hooks para rastrear ações (create, update, delete, etc.)
   - Tempo estimado: 4 horas

4. **Criar página Recent Activity**
   - Arquivo: `src/app/dashboard/activity/page.tsx`
   - Componente: `src/components/dashboard/RecentActivity.tsx`
   - Timeline de atividades
   - Tempo estimado: 4 horas

5. **Adicionar filtros**
   - Por colaborador
   - Por tipo de ação
   - Por data
   - Tempo estimado: 3 horas

6. **Implementar exportação**
   - CSV
   - PDF (futuro)
   - Tempo estimado: 2 horas

7. **Adicionar ao Sidebar**
   - Item "Recent Activity"
   - Tempo estimado: 30 minutos

**Total Sprint 5:** ~15-16 horas

---

### SPRINT 6: VALIDAÇÃO E POLIMENTO (Semana 6)
**Objetivo:** Garantir qualidade e performance

#### ETAPAS:

1. **Testes unitários**
   - Testar todas as novas funcionalidades
   - Cobertura >80%
   - Tempo estimado: 6 horas

2. **Testes E2E**
   - Playwright tests para fluxos principais
   - Tempo estimado: 4 horas

3. **Correção de bugs**
   - Identificar e corrigir issues
   - Tempo estimado: 4 horas

4. **Otimização de performance**
   - Lazy loading de componentes
   - Otimização de queries
   - Tempo estimado: 3 horas

5. **Documentação**
   - Atualizar CHANGELOG.md
   - Documentar novas features
   - Tempo estimado: 2 horas

**Total Sprint 6:** ~19 horas

---

## ⚠️ RISCOS IDENTIFICADOS:

- ❌ **Complexidade alta:** 289 tarefas pode ser overwhelming para usuário
  - **Mitigação:** Mostrar apenas fase atual, colapsar fases não iniciadas, progress bar visual

- ❌ **Performance:** Muitas tarefas podem impactar performance
  - **Mitigação:** Paginação, lazy loading, virtual scrolling

- ❌ **Tempo de desenvolvimento:** 6 sprints = ~80 horas
  - **Mitigação:** Priorização MVP primeiro, sprints podem rodar em paralelo parcialmente

- ⚠️ **Breaking changes:** Mudanças no schema podem afetar dados existentes
  - **Mitigação:** Migrations cuidadosas, backup antes de aplicar

---

## ✅ PONTOS DE VALIDAÇÃO:

- [ ] Após Sprint 1: Todas as 289 tarefas criadas corretamente
- [ ] Após Sprint 2: Sidebar simplificado, navegação funciona
- [ ] Após Sprint 3: Timeline mostra progresso correto
- [ ] Após Sprint 4: Colaboradores podem ser convidados e trabalhar
- [ ] Após Sprint 5: Activity logs rastreiam todas as ações
- [ ] Após Sprint 6: Zero TypeScript errors, testes passando, performance OK

---

## 📋 ESTIMATIVA TOTAL: ~80 horas (6 semanas)

---

## 🚦 STATUS: AGUARDANDO APROVAÇÃO DO USUÁRIO

**Próximos passos após aprovação:**
1. Iniciar Sprint 1: Expandir tarefas
2. Executar etapa por etapa
3. Validar após cada sprint
4. Documentar progresso

---

**Última atualização:** 16/11/2025  
**Preparado seguindo:** Protocolo Ultra-Think do VISAFLOW CONTEXT.md

