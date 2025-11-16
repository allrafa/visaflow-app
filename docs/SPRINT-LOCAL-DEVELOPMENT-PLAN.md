# 🚀 Sprint de Desenvolvimento Local - VisaFlow

**Data:** 2025-01-16
**Objetivo:** Completar todas as páginas faltantes e corrigir 404s
**Status:** 📋 PLANEJAMENTO

---

## 🎯 Escopo do Sprint

### Problemas Identificados

#### ❌ Rotas com 404 - Sidebar
1. `/tasks` - ❌ NÃO EXISTE
2. `/criteria` - ❌ NÃO EXISTE
3. `/help` - ❌ NÃO EXISTE

#### ❌ Rotas com 404 - Header Menu
1. `/profile` - ❌ NÃO EXISTE
2. `/settings` - ❌ NÃO EXISTE
3. `/documentation` - ❌ NÃO EXISTE

#### ⚠️ Problemas no Dashboard Atual
1. **Cards desnecessários**: "My Processes", "Tarefas Concluídas", "Critérios Ativos" não devem aparecer
2. **Quick Actions desorganizado**: Precisa ser redesenhado
3. **Falta de clareza**: Layout não segue VISAFLOW CONTEXT.md

---

## 📊 Auditoria Completa de Rotas

### ✅ Rotas que JÁ EXISTEM
- `/dashboard` - ✅ Dashboard principal
- `/dashboard/process` - ✅ Lista de processos
- `/dashboard/process/[id]` - ✅ Detalhes do processo
- `/dashboard/process/new` - ✅ Criar novo processo
- `/dashboard/letters` - ✅ Cartas de recomendação
- `/dashboard/letters/[processId]` - ✅ Cartas por processo
- `/dashboard/final-merits` - ✅ Final Merits
- `/dashboard/final-merits/[processId]` - ✅ Final Merits por processo

### ❌ Rotas que PRECISAM SER CRIADAS

#### Alta Prioridade (Sidebar - principais features)
1. `/dashboard/tasks` - Central de tarefas de TODOS os processos
2. `/dashboard/criteria` - Visualização dos 10 critérios EB-1A
3. `/dashboard/help` - Centro de ajuda e documentação

#### Média Prioridade (Header menu - configurações)
4. `/dashboard/profile` - Perfil do usuário
5. `/dashboard/settings` - Configurações da conta
6. `/dashboard/documentation` - Documentação completa do sistema

---

## 🏗️ Arquitetura das Páginas

### 1. `/dashboard/tasks` - Central de Tarefas

**Objetivo:** Visualizar e gerenciar TODAS as tarefas de TODOS os processos em um só lugar

**Layout Proposto:**
```
┌─────────────────────────────────────────────────────────┐
│ Tasks Dashboard                                          │
│ Manage all your EB-1A tasks across all processes       │
├─────────────────────────────────────────────────────────┤
│ [Filter: All] [Filter: Process] [Filter: Status]       │
│ [Search tasks...]                                       │
├─────────────────────────────────────────────────────────┤
│ ┌───────────────┬───────────────┬───────────────┐      │
│ │ To Do (12)    │ In Progress(5)│ Done (23)     │      │
│ ├───────────────┼───────────────┼───────────────┤      │
│ │ 🔴 High       │ 🟡 Medium     │ ✅ Completed  │      │
│ │ Task 1        │ Task 6        │ Task 11       │      │
│ │ Process: A    │ Process: B    │ Process: A    │      │
│ │               │               │               │      │
│ │ 🟡 Medium     │ 🟢 Low        │ ✅ Completed  │      │
│ │ Task 2        │ Task 7        │ Task 12       │      │
│ └───────────────┴───────────────┴───────────────┘      │
└─────────────────────────────────────────────────────────┘
```

**Componentes Necessários:**
- `TasksBoard.tsx` - Board estilo Kanban
- `TaskFilter.tsx` - Filtros por processo, status, prioridade
- `TaskSearch.tsx` - Busca de tarefas
- `TaskCard.tsx` - Card individual da tarefa (já existe)
- `TaskModal.tsx` - Modal de criação/edição (já existe)

**Funcionalidades:**
- [x] Drag & Drop entre colunas (To Do → In Progress → Done)
- [x] Filtro por processo
- [x] Filtro por status
- [x] Filtro por prioridade
- [x] Busca por texto
- [x] Criar nova tarefa
- [x] Editar tarefa existente
- [x] Deletar tarefa
- [x] Marcar como concluída
- [x] Ver detalhes do processo relacionado

---

### 2. `/dashboard/criteria` - Central de Critérios EB-1A

**Objetivo:** Visualizar os 10 critérios EB-1A com explicações detalhadas e exemplos

**Layout Proposto:**
```
┌─────────────────────────────────────────────────────────┐
│ EB-1A Criteria Guide                                    │
│ Understanding the 10 criteria for extraordinary ability │
├─────────────────────────────────────────────────────────┤
│ Progress: 3/10 criteria selected ✅ Meets minimum!      │
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░ 30%                              │
├─────────────────────────────────────────────────────────┤
│ 🏆 Criterion 1: Awards & Prizes                         │
│ ┌───────────────────────────────────────────┐          │
│ │ ✅ SELECTED                                │          │
│ │ Description: National or international...  │          │
│ │ [View Examples] [See Your Evidence]        │          │
│ └───────────────────────────────────────────┘          │
│                                                          │
│ 👥 Criterion 2: Memberships                            │
│ ┌───────────────────────────────────────────┐          │
│ │ ⬜ Not Selected                            │          │
│ │ Description: Membership in associations... │          │
│ │ [View Examples] [Add Evidence]             │          │
│ └───────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

**Componentes:**
- `CriteriaSelector.tsx` - ✅ JÁ CRIADO (usability improvements)
- `CriteriaCard.tsx` - ✅ JÁ CRIADO (usability improvements)
- `CriteriaProgress.tsx` - Indicador de progresso (3/10)
- `CriteriaEvidence.tsx` - Lista de evidências por critério

**Funcionalidades:**
- [x] Listar os 10 critérios com descrições simplificadas (✅ já temos CRITERIA_SIMPLIFIED)
- [x] Marcar/desmarcar critérios aplicáveis
- [x] Ver exemplos práticos de cada critério
- [x] Ver erros comuns a evitar
- [x] Indicador de progresso (mínimo 3 critérios)
- [x] Link para adicionar evidências

---

### 3. `/dashboard/help` - Centro de Ajuda

**Objetivo:** Central de ajuda, tutoriais e FAQs

**Layout Proposto:**
```
┌─────────────────────────────────────────────────────────┐
│ Help Center                                              │
│ Find answers and learn how to use VisaFlow             │
├─────────────────────────────────────────────────────────┤
│ [Search for help...]                                    │
├─────────────────────────────────────────────────────────┤
│ 📚 Popular Topics                                       │
│ ┌──────────┬──────────┬──────────┬──────────┐         │
│ │ Getting  │ Creating │ EB-1A    │ Letters  │         │
│ │ Started  │ Process  │ Criteria │ Guide    │         │
│ └──────────┴──────────┴──────────┴──────────┘         │
│                                                          │
│ 🎥 Video Tutorials                                      │
│ • How to create your first process                      │
│ • Understanding EB-1A criteria                          │
│ • Uploading documents                                   │
│                                                          │
│ ❓ FAQs                                                 │
│ • What is EB-1A?                                        │
│ • How many criteria do I need?                          │
│ • Can I save my progress?                               │
└─────────────────────────────────────────────────────────┘
```

**Componentes:**
- `HelpSearch.tsx` - Busca de artigos
- `HelpTopics.tsx` - Grid de tópicos populares
- `HelpArticle.tsx` - Artigo individual
- `FAQAccordion.tsx` - FAQs em accordion

---

### 4. `/dashboard/profile` - Perfil do Usuário

**Objetivo:** Ver e editar informações do perfil

**Layout Proposto:**
```
┌─────────────────────────────────────────────────────────┐
│ Profile Settings                                         │
│ Manage your personal information                        │
├─────────────────────────────────────────────────────────┤
│ ┌───────────┐                                           │
│ │   Photo   │  John Doe                                 │
│ │   [📷]    │  john.doe@email.com                       │
│ └───────────┘  Member since: Jan 2025                   │
│                                                          │
│ Personal Information                                     │
│ ┌──────────────────────────────────────┐               │
│ │ Full Name:    [John Doe            ] │               │
│ │ Email:        [john.doe@email.com  ] │               │
│ │ Phone:        [+1 555 1234         ] │               │
│ │ Country:      [United States  ▼    ] │               │
│ │ Profession:   [Software Engineer   ] │               │
│ └──────────────────────────────────────┘               │
│                                                          │
│ [Save Changes] [Cancel]                                 │
└─────────────────────────────────────────────────────────┘
```

**Componentes:**
- `ProfileForm.tsx` - Formulário de edição
- `AvatarUpload.tsx` - Upload de foto de perfil
- `ProfileStats.tsx` - Estatísticas do usuário

---

### 5. `/dashboard/settings` - Configurações

**Objetivo:** Configurações da conta e preferências

**Layout Proposto:**
```
┌─────────────────────────────────────────────────────────┐
│ Settings                                                 │
│ ┌─────────┬───────────────────────────────────────┐    │
│ │ General │ Account Settings                       │    │
│ │ ────    │                                        │    │
│ │ Security│ Language:  [English ▼]                │    │
│ │ ────    │ Timezone:  [UTC-5   ▼]                │    │
│ │ Notif.  │ Theme:     [○ Light ● Dark]           │    │
│ │ ────    │                                        │    │
│ │ Privacy │ [Save Preferences]                     │    │
│ └─────────┴───────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Seções:**
- General - Preferências gerais
- Security - Senha, 2FA
- Notifications - Email, push notifications
- Privacy - Controle de dados

---

### 6. `/dashboard/documentation` - Documentação

**Objetivo:** Documentação completa do sistema

**Layout Proposto:**
```
┌─────────────────────────────────────────────────────────┐
│ Documentation                                            │
│ ┌─────────────┬───────────────────────────────────┐    │
│ │ Sidebar Nav │ Content Area                       │    │
│ │             │                                    │    │
│ │ Getting     │ # Getting Started                  │    │
│ │ Started     │                                    │    │
│ │             │ Welcome to VisaFlow! This guide... │    │
│ │ Features    │                                    │    │
│ │  • Process  │ ## Create Your First Process       │    │
│ │  • Tasks    │                                    │    │
│ │  • Letters  │ Step 1: Click "New Process"...     │    │
│ │             │                                    │    │
│ │ API Ref     │                                    │    │
│ │             │                                    │    │
│ │ Support     │                                    │    │
│ └─────────────┴───────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Redesign do Dashboard Principal

### Problemas Atuais
1. ❌ Cards "My Processes", "Tarefas Concluídas", "Critérios Ativos" são redundantes
2. ❌ Quick Actions está genérico
3. ❌ Falta overview claro do progresso

### Novo Design Proposto

```
┌──────────────────────────────────────────────────────────────┐
│ Welcome back, John! 👋                                       │
│ You have 2 active processes                                  │
├──────────────────────────────────────────────────────────────┤
│ Quick Access                                                  │
│ ┌──────────────┬──────────────┬──────────────┬─────────────┐│
│ │ 📁 Start New │ ✅ My Tasks  │ 📝 Letters   │ 📊 Reports  ││
│ │ Process      │ (12 pending) │ (3 drafts)   │ & Analytics ││
│ └──────────────┴──────────────┴──────────────┴─────────────┘│
├──────────────────────────────────────────────────────────────┤
│ Active Processes                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Dr. Maria Silva - EB1A Research                         │  │
│ │ Progress: ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 45%                     │  │
│ │ Phase: Evidence Collection                              │  │
│ │ Next: Upload recommendation letters                     │  │
│ │ [View Details]                                          │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ John Doe - EB1A Technology                              │  │
│ │ Progress: ▓▓▓▓░░░░░░░░░░░░░░░░ 20%                     │  │
│ │ Phase: Criteria Selection                               │  │
│ │ Next: Complete awards documentation                     │  │
│ │ [View Details]                                          │  │
│ └────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│ Recent Activity                                               │
│ • Today, 2:30 PM - Letter draft saved (Maria Silva)          │
│ • Today, 11:00 AM - Task completed: "Gather publications"    │
│ • Yesterday - New process created (John Doe)                 │
└──────────────────────────────────────────────────────────────┘
```

### Componentes do Novo Dashboard
- `QuickAccessGrid.tsx` - Grid de ações rápidas
- `ProcessOverview.tsx` - Card de overview de cada processo
- `RecentActivity.tsx` - Feed de atividades recentes
- `ProgressIndicator.tsx` - Barra de progresso visual

---

## 📦 Componentes Shadcn/UI Necessários

### Já Instalados
- Button
- Card
- Input
- Progress
- Tooltip
- Badge

### Precisam Ser Adicionados
- [ ] `Tabs` - Para Settings e Documentation
- [ ] `Accordion` - Para FAQs
- [ ] `Dialog` - Para modais
- [ ] `DropdownMenu` - Para filtros
- [ ] `Select` - Para dropdowns
- [ ] `Textarea` - Para forms
- [ ] `Switch` - Para toggle settings
- [ ] `Avatar` - Para profile

**Comando para instalar:**
```bash
npx shadcn-ui@latest add tabs accordion dialog dropdown-menu select textarea switch avatar
```

---

## 🗂️ Estrutura de Arquivos a Criar

```
src/app/dashboard/
├── tasks/
│   └── page.tsx                    # ⭐ CRIAR
├── criteria/
│   └── page.tsx                    # ⭐ CRIAR
├── help/
│   └── page.tsx                    # ⭐ CRIAR
├── profile/
│   └── page.tsx                    # ⭐ CRIAR
├── settings/
│   └── page.tsx                    # ⭐ CRIAR
└── documentation/
    └── page.tsx                    # ⭐ CRIAR

src/components/
├── tasks/
│   ├── TasksBoard.tsx              # ⭐ CRIAR
│   ├── TaskFilter.tsx              # ⭐ CRIAR
│   └── TaskSearch.tsx              # ⭐ CRIAR
├── criteria/
│   ├── CriteriaProgress.tsx        # ⭐ CRIAR
│   └── CriteriaEvidence.tsx        # ⭐ CRIAR
├── help/
│   ├── HelpSearch.tsx              # ⭐ CRIAR
│   ├── HelpTopics.tsx              # ⭐ CRIAR
│   ├── HelpArticle.tsx             # ⭐ CRIAR
│   └── FAQAccordion.tsx            # ⭐ CRIAR
├── profile/
│   ├── ProfileForm.tsx             # ⭐ CRIAR
│   ├── AvatarUpload.tsx            # ⭐ CRIAR
│   └── ProfileStats.tsx            # ⭐ CRIAR
├── settings/
│   ├── GeneralSettings.tsx         # ⭐ CRIAR
│   ├── SecuritySettings.tsx        # ⭐ CRIAR
│   └── NotificationSettings.tsx    # ⭐ CRIAR
├── dashboard/
│   ├── QuickAccessGrid.tsx         # ⭐ CRIAR (substituir QuickActions)
│   ├── ProcessOverview.tsx         # ⭐ CRIAR
│   ├── RecentActivity.tsx          # ⭐ CRIAR
│   └── ProgressIndicator.tsx       # ⭐ CRIAR
└── documentation/
    ├── DocsSidebar.tsx             # ⭐ CRIAR
    └── DocsContent.tsx             # ⭐ CRIAR
```

---

## 🎯 Plano de Execução

### Fase 1: Configuração (30 min)
- [ ] Instalar componentes Shadcn/UI faltantes
- [ ] Configurar MCP do Shadcn (se disponível)
- [ ] Criar estrutura de pastas

### Fase 2: Páginas Críticas (Sidebar - 3h)
- [ ] `/dashboard/tasks` - Central de tarefas (1.5h)
- [ ] `/dashboard/criteria` - Critérios EB-1A (1h)
- [ ] `/dashboard/help` - Centro de ajuda (30min)

### Fase 3: Páginas de Configuração (Header - 2h)
- [ ] `/dashboard/profile` - Perfil (45min)
- [ ] `/dashboard/settings` - Configurações (45min)
- [ ] `/dashboard/documentation` - Docs (30min)

### Fase 4: Redesign Dashboard (2h)
- [ ] Remover cards desnecessários
- [ ] Criar QuickAccessGrid
- [ ] Criar ProcessOverview
- [ ] Criar RecentActivity
- [ ] Integrar tudo no dashboard

### Fase 5: Testes (1h)
- [ ] Testar todas as rotas localmente
- [ ] Verificar links do sidebar
- [ ] Verificar links do header
- [ ] Testar navegação entre páginas
- [ ] Verificar responsividade

**TOTAL ESTIMADO: 8-9 horas**

---

## 🔗 Referências Shadcn/UI

### Componentes Prontos para Adaptar

1. **Dashboard Template**
   - https://ui.shadcn.com/examples/dashboard
   - Tem layout similar ao que precisamos

2. **Tasks Board**
   - https://ui.shadcn.com/examples/tasks
   - Kanban board pronto para adaptar

3. **Settings Page**
   - https://ui.shadcn.com/examples/forms
   - Forms e layouts de settings

4. **Documentation Layout**
   - https://ui.shadcn.com/docs
   - Layout com sidebar de navegação

---

## ✅ Checklist Final

### Antes de Fazer Deploy
- [ ] Todas as rotas retornam 200 (não 404)
- [ ] Sidebar navigation funciona 100%
- [ ] Header menu funciona 100%
- [ ] Dashboard redesenhado conforme VISAFLOW CONTEXT.md
- [ ] Type-check passa (`npm run type-check`)
- [ ] Build local funciona (`npm run build`)
- [ ] Todos os links internos funcionam
- [ ] Responsividade testada

### Critérios de Sucesso
- ✅ Zero 404s no sidebar
- ✅ Zero 404s no header menu
- ✅ Dashboard limpo e focado
- ✅ Quick Actions útil e acionável
- ✅ Navegação intuitiva entre seções

---

## 📝 Notas Importantes

1. **Desenvolvimento Local Apenas**
   - NÃO fazer deploy a cada mudança
   - Testar tudo localmente primeiro
   - Deploy apenas quando TUDO estiver funcionando

2. **Usar Componentes Shadcn/UI**
   - Copiar templates prontos
   - Adaptar para nossa estrutura
   - Manter consistência visual

3. **Seguir VISAFLOW CONTEXT.md**
   - Toda decisão deve alinhar com a visão do projeto
   - Usar nomenclatura consistente
   - Manter qualidade de código

4. **Prioridade**
   - Primeiro: Corrigir 404s (páginas básicas)
   - Segundo: Redesign dashboard
   - Terceiro: Refinamentos e polish

---

**Início do Sprint:** AGORA
**Próximo Passo:** Instalar componentes Shadcn/UI e criar estrutura de pastas
