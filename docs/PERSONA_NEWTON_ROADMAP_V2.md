# Persona "Newton" + Roadmap de Funcionalidades v1.5 e v2.0

**Data:** 17 de Novembro de 2025
**Versão:** 1.0
**Status:** 📋 Análise e Planejamento

---

## 🎯 Resumo Executivo

Este documento apresenta:
1. **Persona "Newton"** - Dono de escritório de imigração gerenciando 100+ clientes
2. **Análise de Necessidades** - Pain points e oportunidades identificadas
3. **Roadmap v1.5** - Funcionalidades de gestão multi-cliente (3-4 meses)
4. **Roadmap v2.0** - Plataforma enterprise completa (6-8 meses)

---

## 👤 PERSONA: Newton - Advogado de Imigração

### Informações Demográficas

```yaml
Nome: Newton Carvalho
Idade: 39 anos
Localização: Miami, FL
Cargo: Fundador & Managing Partner
Empresa: Newton Carvalho Immigration Law
Equipe: 8 pessoas (2 advogados, 4 paralegais, 2 administrativos)
Faturamento Anual: $800k - $1.2M
```

### Background Profissional

- **15 anos** de experiência em direito de imigração
- **120+ clientes ativos** (70 EB-1A, 30 EB-2 NIW, 20 outros)
- **$8k-15k** preço médio por caso EB-1A
- **85%** taxa de aprovação em casos EB-1A
- Membro da AILA (American Immigration Lawyers Association)
- Formado em Direito no Brasil, revalidado nos EUA

### Contexto de Uso do VisaFlow

**Cenário Atual:**
- Usa planilhas Excel desorganizadas
- Emails perdidos em threads intermináveis
- Arquivos espalhados em Google Drive sem estrutura
- Dificuldade de delegar tarefas para a equipe
- Perde tempo buscando documentos de clientes
- Não consegue visualizar progresso geral dos casos

**Objetivo com VisaFlow:**
- Sistema centralizado para todos os clientes
- Delegar tarefas claras para paralegais
- Acompanhar prazos críticos (deadline USCIS, RFEs)
- Gerar relatórios de produtividade da equipe
- Escalar operação sem contratar mais gente

---

## 💔 Pain Points Identificados

### 1. Gestão de Múltiplos Clientes (Crítico)

**Problema:**
- Newton não consegue ver todos os 120 clientes em uma só tela
- Não sabe quais clientes estão atrasados sem abrir caso por caso
- Filtros limitados (só por fase, sem prioridade/deadline)

**Impacto:**
- Casos atrasam sem ele perceber
- Clientes insatisfeitos enviam emails cobrando status
- Time perde tempo em stand-ups diários para sincronizar

**Quote:**
> "Eu preciso de uma visão de helicóptero. Se eu tenho 70 casos EB-1A, eu preciso ver numa única tela quais estão verdes, quais estão amarelos (prazos apertados), e quais estão vermelhos (atrasados). Hoje eu não tenho isso."

### 2. Calendário e Deadlines (Crítico)

**Problema:**
- Deadlines da USCIS são críticos (RFE de 30 dias)
- Newton usa Google Calendar manualmente
- Sem alertas automáticos para a equipe
- Não visualiza conflitos de prazos

**Impacto:**
- Risco de perder deadline da USCIS (consequência: caso negado)
- Equipe não sabe priorizar trabalho
- Newton vira gargalo de priorização

**Quote:**
> "Semana passada quase perdemos um RFE de 30 dias porque o paralegal estava de férias e ninguém sabia. Isso não pode acontecer. Um sistema precisa me avisar com 7, 3 e 1 dia de antecedência."

### 3. Colaboração em Equipe (Alto)

**Problema:**
- Paralegais não sabem o que fazer sem perguntar
- Múltiplas pessoas editando documentos (conflitos)
- Sem histórico de quem fez o quê
- Comunicação via WhatsApp/Email dispersa

**Impacto:**
- Newton interrompido 20+ vezes por dia
- Retrabalho (duas pessoas fazem a mesma tarefa)
- Falta de accountability

**Quote:**
> "Meu dia é: 'Newton, o que eu faço agora?' 'Newton, onde está o documento X?' 'Newton, o cliente Y enviou email, você viu?'. Eu não consigo focar 2 horas seguidas."

### 4. Relatórios e Métricas (Médio)

**Problema:**
- Não sabe quantos casos fechou no mês
- Não consegue medir produtividade da equipe
- Sem dados para precificar serviços
- Dificuldade de mostrar valor para clientes

**Impacto:**
- Decisões de negócio baseadas em "feeling"
- Não sabe se deve contratar mais gente
- Clientes questionam o preço sem métricas para justificar

**Quote:**
> "Quanto tempo em média minha equipe gasta na fase de evidências? Eu não sei. Será que eu poderia cobrar mais dos casos complexos? Não tenho dados."

### 5. Comunicação com Clientes (Médio)

**Problema:**
- Clientes enviam docs por email/WhatsApp
- Perguntas repetitivas sobre status
- Newton tem que responder manualmente

**Impacto:**
- 2-3 horas/dia respondendo emails de status
- Documentos perdidos ou organizados manualmente
- Clientes frustrados com falta de transparência

**Quote:**
> "Clientes querem saber: 'Qual o status do meu caso?' Todo dia. Eu queria que eles tivessem um portal onde eles mesmos vejam o progresso, upload de docs, e mensagens."

---

## 🎯 Jobs to Be Done (JTBD)

Quando **Newton abre o VisaFlow de manhã**, ele quer **ver imediatamente quais casos exigem sua atenção urgente**, para que **possa priorizar o dia da equipe e evitar surpresas desagradáveis**.

### Sub-Jobs:

1. **Ver todos os casos com deadlines próximos** (7 dias ou menos)
2. **Identificar casos atrasados** (ultrapassaram a data esperada de conclusão)
3. **Ver quem da equipe está trabalhando em quê** (alocação de recursos)
4. **Checar tarefas pendentes** que estão bloqueando progresso
5. **Receber notificações de eventos importantes** (cliente enviou doc, USCIS respondeu)
6. **Gerar relatório semanal automaticamente** para enviar aos clientes

---

## 📊 Roadmap de Funcionalidades

### Versão Atual: v1.0 (Baseline - Usuário Individual)

**Status:** ✅ Implementado

**Funcionalidades:**
- Processo único por usuário
- 289 tarefas organizadas por fase
- Timeline de 300 dias
- Sistema de uploads
- Status "Em Revisão" (novo)
- Navegação entre fases corrigida

**Limitações para Newton:**
- ❌ Não suporta múltiplos clientes
- ❌ Sem calendário de deadlines
- ❌ Sem colaboração em equipe
- ❌ Sem métricas/relatórios
- ❌ Sem notificações automatizadas

---

## 🚀 Roadmap v1.5: "Multi-Client Manager"

**Objetivo:** Transformar VisaFlow em ferramenta para escritórios pequenos (1-3 advogados, 10-50 clientes)

**Prazo Estimado:** 3-4 meses
**Esforço:** ~320-400 horas de desenvolvimento

---

### Sprint 1: Dashboard Multi-Cliente (8-10 semanas)

#### 1.1 Vista Geral de Processos

**Problema Resolvido:** Newton não consegue ver todos os clientes em uma única tela

**Funcionalidades:**

```typescript
interface ClientDashboard {
  view: 'list' | 'kanban' | 'calendar';
  filters: {
    status: 'all' | 'active' | 'on-hold' | 'completed';
    phase: ProcessPhase | 'all';
    assignedTo: User['id'] | 'all';
    deadline: 'urgent' | 'this-week' | 'this-month' | 'all';
    search: string;
  };
  sorting: {
    field: 'client-name' | 'deadline' | 'progress' | 'last-updated';
    order: 'asc' | 'desc';
  };
}
```

**Telas:**

1. **List View (Tabela)**
   ```
   ┌──────────────────────────────────────────────────────────────────────────┐
   │ Cliente    │ Fase         │ Progresso │ Deadline   │ Responsável │ Ações │
   ├──────────────────────────────────────────────────────────────────────────┤
   │ 🟢 João S  │ Evidências   │ ███░░ 60% │ 12 Jan 25  │ Maria       │ [→]   │
   │ 🟡 Ana M   │ Cartas       │ ████░ 80% │ 18 Jan 25  │ Pedro       │ [→]   │
   │ 🔴 Carlos  │ Elegibilidade│ █░░░░ 20% │ ⚠️ Atrasado│ Newton      │ [→]   │
   └──────────────────────────────────────────────────────────────────────────┘
   ```

2. **Kanban View**
   ```
   ┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
   │ Eligibility │ Evidence    │ Letters     │ Petition    │ Filing      │
   ├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
   │ [Card 1]    │ [Card 5]    │ [Card 12]   │ [Card 18]   │ [Card 20]   │
   │ [Card 2]    │ [Card 6]    │ [Card 13]   │             │             │
   │ [Card 3]    │ [Card 7]    │             │             │             │
   │ [Card 4]    │ ...         │             │             │             │
   └─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
   ```

3. **Calendar View**
   - Visualização mensal com deadlines destacados
   - Cores por prioridade (verde/amarelo/vermelho)
   - Clique no dia para ver tarefas

**Tecnologias:**
- Tanstack Table para list view (performance com 100+ clientes)
- React DnD para Kanban
- React Big Calendar para calendar view

**Estimativa:** 40-50 horas

---

#### 1.2 Sistema de Prioridades e Status Health

**Problema Resolvido:** Newton não sabe quais casos exigem atenção urgente

**Funcionalidades:**

```typescript
interface ProcessHealth {
  status: 'healthy' | 'at-risk' | 'critical';
  score: number; // 0-100
  factors: {
    deadlineProximity: {
      value: number; // dias restantes
      weight: 0.4;
    };
    tasksOverdue: {
      count: number;
      weight: 0.3;
    };
    stagnation: {
      daysSinceLastUpdate: number;
      weight: 0.2;
    };
    clientEngagement: {
      lastClientAction: Date;
      weight: 0.1;
    };
  };
  recommendations: string[]; // ações sugeridas
}
```

**Algoritmo de Health Score:**

```typescript
function calculateHealthScore(process: Process): ProcessHealth {
  const now = new Date();
  const deadline = process.targetDeadline;
  const daysUntilDeadline = differenceInDays(deadline, now);

  // Fator 1: Proximidade do deadline (40%)
  let deadlineScore = 100;
  if (daysUntilDeadline < 0) deadlineScore = 0; // Atrasado
  else if (daysUntilDeadline < 7) deadlineScore = 20; // Urgente
  else if (daysUntilDeadline < 14) deadlineScore = 50; // Em risco
  else if (daysUntilDeadline < 30) deadlineScore = 75; // Atenção

  // Fator 2: Tarefas atrasadas (30%)
  const overdueTasks = process.tasks.filter(t =>
    t.dueDate && isPast(t.dueDate) && t.status !== 'COMPLETED'
  );
  const overdueScore = Math.max(0, 100 - (overdueTasks.length * 20));

  // Fator 3: Estagnação (20%)
  const daysSinceUpdate = differenceInDays(now, process.updatedAt);
  let stagnationScore = 100;
  if (daysSinceUpdate > 14) stagnationScore = 30;
  else if (daysSinceUpdate > 7) stagnationScore = 60;
  else if (daysSinceUpdate > 3) stagnationScore = 80;

  // Fator 4: Engajamento do cliente (10%)
  const lastClientAction = getLastClientAction(process);
  const daysSinceClient = differenceInDays(now, lastClientAction);
  let clientScore = 100;
  if (daysSinceClient > 21) clientScore = 40;
  else if (daysSinceClient > 14) clientScore = 70;

  // Score final ponderado
  const finalScore =
    (deadlineScore * 0.4) +
    (overdueScore * 0.3) +
    (stagnationScore * 0.2) +
    (clientScore * 0.1);

  // Determinar status
  let status: 'healthy' | 'at-risk' | 'critical';
  if (finalScore >= 70) status = 'healthy';
  else if (finalScore >= 40) status = 'at-risk';
  else status = 'critical';

  // Gerar recomendações
  const recommendations = [];
  if (daysUntilDeadline < 7) {
    recommendations.push('⚠️ Deadline em menos de 7 dias - priorize este caso');
  }
  if (overdueTasks.length > 0) {
    recommendations.push(`${overdueTasks.length} tarefas atrasadas - revisar com a equipe`);
  }
  if (daysSinceUpdate > 7) {
    recommendations.push('Caso parado há mais de 7 dias - verificar bloqueios');
  }
  if (daysSinceClient > 14) {
    recommendations.push('Cliente sem interação há 14+ dias - enviar atualização');
  }

  return {
    status,
    score: Math.round(finalScore),
    factors: {
      deadlineProximity: { value: daysUntilDeadline, weight: 0.4 },
      tasksOverdue: { count: overdueTasks.length, weight: 0.3 },
      stagnation: { daysSinceLastUpdate: daysSinceUpdate, weight: 0.2 },
      clientEngagement: { lastClientAction, weight: 0.1 },
    },
    recommendations,
  };
}
```

**UI Indicators:**

```tsx
function ProcessHealthBadge({ process }: { process: Process }) {
  const health = calculateHealthScore(process);

  const colors = {
    healthy: 'bg-green-100 text-green-800 border-green-300',
    'at-risk': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    critical: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge className={colors[health.status]}>
          {health.status === 'healthy' && '✓'}
          {health.status === 'at-risk' && '⚠'}
          {health.status === 'critical' && '⚠⚠'}
          {health.score}
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="w-80">
        <div className="space-y-2">
          <p className="font-semibold">Health Score: {health.score}/100</p>
          <div className="space-y-1">
            {health.recommendations.map((rec, i) => (
              <p key={i} className="text-xs">• {rec}</p>
            ))}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
```

**Estimativa:** 20-25 horas

---

#### 1.3 Calendário Integrado com Deadlines

**Problema Resolvido:** Newton não visualiza prazos críticos e conflitos de agenda

**Funcionalidades:**

```typescript
interface CalendarEvent {
  id: string;
  type: 'deadline' | 'task-due' | 'meeting' | 'client-milestone';
  title: string;
  description?: string;
  date: Date;
  processId: string;
  clientName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: User['id'];
  completed: boolean;
  reminderSettings: {
    enabled: boolean;
    intervals: number[]; // [7, 3, 1] = 7 dias, 3 dias, 1 dia antes
  };
}
```

**Tipos de Eventos:**

1. **USCIS Deadlines** (Mais Crítico)
   - RFE Response (30 dias)
   - NOID Response (30 dias)
   - Interview Date
   - Biometrics Appointment

2. **Internal Deadlines**
   - Fase target date
   - Tarefa due date
   - Document collection deadline

3. **Client Milestones**
   - Onboarding call
   - Evidence review meeting
   - Final petition review
   - Filing celebration

**Sistema de Alertas:**

```typescript
interface DeadlineAlert {
  eventId: string;
  type: 'email' | 'in-app' | 'sms';
  recipients: User['id'][];
  daysBeforeDeadline: number;
  sent: boolean;
  sentAt?: Date;
}

// Cron job (daily at 9am)
async function sendDeadlineReminders() {
  const upcomingEvents = await prisma.calendarEvent.findMany({
    where: {
      date: {
        gte: new Date(),
        lte: addDays(new Date(), 7), // próximos 7 dias
      },
      completed: false,
      reminderSettings: { enabled: true },
    },
    include: { process: true, assignedUser: true },
  });

  for (const event of upcomingEvents) {
    const daysUntil = differenceInDays(event.date, new Date());

    // Checar se deve enviar alerta para este intervalo
    if (event.reminderSettings.intervals.includes(daysUntil)) {
      // Enviar email
      await sendEmail({
        to: event.assignedUser?.email || event.process.user.email,
        subject: `⚠️ Lembrete: ${event.title} em ${daysUntil} dias`,
        template: 'deadline-reminder',
        data: {
          eventTitle: event.title,
          clientName: event.clientName,
          daysUntil,
          processLink: `${APP_URL}/dashboard/process/${event.processId}`,
        },
      });

      // Criar notificação in-app
      await prisma.notification.create({
        data: {
          userId: event.assignedUser?.id || event.process.userId,
          type: 'DEADLINE_REMINDER',
          title: `${event.title} - ${daysUntil} dias restantes`,
          message: `Cliente: ${event.clientName}`,
          link: `/dashboard/process/${event.processId}`,
          priority: daysUntil <= 3 ? 'high' : 'medium',
        },
      });
    }
  }
}
```

**UI do Calendário:**

```tsx
<Calendar
  events={calendarEvents}
  views={['month', 'week', 'day', 'agenda']}
  defaultView="month"
  eventStyleGetter={(event) => {
    const style = {
      backgroundColor:
        event.priority === 'urgent' ? '#ef4444' :
        event.priority === 'high' ? '#f59e0b' :
        event.priority === 'medium' ? '#3b82f6' :
        '#6b7280',
      borderRadius: '4px',
      opacity: event.completed ? 0.5 : 1,
      textDecoration: event.completed ? 'line-through' : 'none',
    };
    return { style };
  }}
  onSelectEvent={(event) => {
    // Abrir modal com detalhes do evento
    openEventModal(event);
  }}
  components={{
    event: CustomEventComponent, // Badge com ícone por tipo
    toolbar: CustomToolbar, // Filtros e views
  }}
/>
```

**Estimativa:** 30-35 horas

---

### Sprint 2: Colaboração em Equipe (6-8 semanas)

#### 2.1 Sistema de Usuários e Permissões

**Problema Resolvido:** Newton precisa delegar com segurança

**Funcionalidades:**

```typescript
enum UserRole {
  OWNER = 'owner',           // Newton - acesso total
  ATTORNEY = 'attorney',     // Outros advogados - acesso total aos casos atribuídos
  PARALEGAL = 'paralegal',   // Paralegais - executam tarefas, sem editar estratégia
  ADMIN = 'admin',           // Administrativos - apenas visualização e reports
  CLIENT = 'client',         // Cliente - acesso ao próprio processo apenas
}

interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  assignedProcesses: string[]; // IDs dos processos
  permissions: {
    canCreateProcess: boolean;
    canDeleteProcess: boolean;
    canEditStrategy: boolean; // Critérios EB-1A
    canAssignTasks: boolean;
    canViewAllProcesses: boolean;
    canGenerateReports: boolean;
    canManageTeam: boolean;
  };
  createdAt: Date;
  lastActiveAt: Date;
  inviteStatus: 'pending' | 'active' | 'deactivated';
}

// Matriz de Permissões
const ROLE_PERMISSIONS: Record<UserRole, TeamMember['permissions']> = {
  owner: {
    canCreateProcess: true,
    canDeleteProcess: true,
    canEditStrategy: true,
    canAssignTasks: true,
    canViewAllProcesses: true,
    canGenerateReports: true,
    canManageTeam: true,
  },
  attorney: {
    canCreateProcess: true,
    canDeleteProcess: false,
    canEditStrategy: true,
    canAssignTasks: true,
    canViewAllProcesses: true,
    canGenerateReports: true,
    canManageTeam: false,
  },
  paralegal: {
    canCreateProcess: false,
    canDeleteProcess: false,
    canEditStrategy: false,
    canAssignTasks: false,
    canViewAllProcesses: false, // Só vê processos atribuídos
    canGenerateReports: false,
    canManageTeam: false,
  },
  admin: {
    canCreateProcess: false,
    canDeleteProcess: false,
    canEditStrategy: false,
    canAssignTasks: false,
    canViewAllProcesses: true,
    canGenerateReports: true,
    canManageTeam: false,
  },
  client: {
    canCreateProcess: false,
    canDeleteProcess: false,
    canEditStrategy: false,
    canAssignTasks: false,
    canViewAllProcesses: false,
    canGenerateReports: false,
    canManageTeam: false,
  },
};
```

**Fluxo de Convite:**

```typescript
// Newton convida Maria (paralegal)
async function inviteTeamMember(
  organizationId: string,
  email: string,
  role: UserRole,
  assignedProcesses: string[]
) {
  // 1. Criar convite
  const invite = await prisma.teamInvite.create({
    data: {
      organizationId,
      email,
      role,
      assignedProcesses,
      token: generateSecureToken(),
      expiresAt: addDays(new Date(), 7), // Expira em 7 dias
    },
  });

  // 2. Enviar email
  await sendEmail({
    to: email,
    subject: 'Convite para VisaFlow - Newton Carvalho Immigration',
    template: 'team-invite',
    data: {
      inviterName: 'Newton Carvalho',
      role: ROLE_LABELS[role],
      acceptLink: `${APP_URL}/invite/${invite.token}`,
      expiresIn: '7 dias',
    },
  });

  return invite;
}

// Maria aceita o convite
async function acceptInvite(token: string, userData: { name: string; password: string }) {
  const invite = await prisma.teamInvite.findUnique({
    where: { token },
    include: { organization: true },
  });

  if (!invite || isPast(invite.expiresAt)) {
    throw new Error('Convite inválido ou expirado');
  }

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      email: invite.email,
      name: userData.name,
      passwordHash: await hashPassword(userData.password),
      role: invite.role,
      organizationId: invite.organizationId,
    },
  });

  // Atribuir processos
  await prisma.processAssignment.createMany({
    data: invite.assignedProcesses.map(processId => ({
      userId: user.id,
      processId,
    })),
  });

  // Marcar convite como aceito
  await prisma.teamInvite.update({
    where: { id: invite.id },
    data: { acceptedAt: new Date() },
  });

  return user;
}
```

**Estimativa:** 25-30 horas

---

#### 2.2 Atribuição de Tarefas e Processos

**Problema Resolvido:** Paralegais não sabem o que fazer sem perguntar

**Funcionalidades:**

```typescript
interface TaskAssignment {
  taskId: string;
  assignedTo: User['id'];
  assignedBy: User['id'];
  assignedAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  instructions?: string; // Instruções específicas do Newton
  status: 'assigned' | 'in-progress' | 'under-review' | 'completed';
  completedAt?: Date;
  timeSpent?: number; // minutos
}

interface ProcessAssignment {
  processId: string;
  leadAttorney: User['id']; // Responsável principal
  teamMembers: {
    userId: User['id'];
    role: 'attorney' | 'paralegal' | 'admin';
    permissions: string[]; // Permissões específicas para este processo
  }[];
  assignedAt: Date;
}
```

**Workflow de Atribuição:**

```tsx
// Newton atribui tarefa para Maria
function AssignTaskModal({ task, onAssign }: { task: Task; onAssign: Function }) {
  const { teamMembers } = useOrganization();
  const [assignee, setAssignee] = useState<User>();
  const [dueDate, setDueDate] = useState<Date>();
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [instructions, setInstructions] = useState('');

  const handleAssign = async () => {
    await assignTask({
      taskId: task.id,
      assignedTo: assignee.id,
      dueDate,
      priority,
      instructions,
    });

    // Enviar notificação para Maria
    await sendNotification({
      userId: assignee.id,
      type: 'TASK_ASSIGNED',
      title: `Nova tarefa: ${task.title}`,
      message: `Atribuída por Newton • Cliente: ${task.process.clientName}`,
      link: `/dashboard/process/${task.processId}/tasks#${task.id}`,
      priority,
    });

    onAssign();
  };

  return (
    <Dialog>
      <DialogContent>
        <h2>Atribuir Tarefa</h2>
        <div className="space-y-4">
          <Select
            label="Atribuir para"
            options={teamMembers.map(m => ({ value: m.id, label: m.name }))}
            value={assignee?.id}
            onChange={setAssignee}
          />
          <DatePicker
            label="Data limite"
            value={dueDate}
            onChange={setDueDate}
            minDate={new Date()}
          />
          <Select
            label="Prioridade"
            options={[
              { value: 'low', label: '🟢 Baixa' },
              { value: 'medium', label: '🟡 Média' },
              { value: 'high', label: '🟠 Alta' },
              { value: 'urgent', label: '🔴 Urgente' },
            ]}
            value={priority}
            onChange={setPriority}
          />
          <Textarea
            label="Instruções (opcional)"
            placeholder="Adicione contexto ou instruções específicas para esta tarefa..."
            value={instructions}
            onChange={setInstructions}
          />
          <Button onClick={handleAssign}>Atribuir Tarefa</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

**My Tasks View (para Maria):**

```tsx
function MyTasksPage() {
  const { user } = useAuth();
  const { tasks } = useTasks({ assignedTo: user.id });

  // Agrupar por prioridade e deadline
  const urgentTasks = tasks.filter(t =>
    t.priority === 'urgent' || (t.dueDate && differenceInDays(t.dueDate, new Date()) <= 2)
  );
  const todayTasks = tasks.filter(t =>
    t.dueDate && isToday(t.dueDate)
  );
  const thisWeekTasks = tasks.filter(t =>
    t.dueDate && isThisWeek(t.dueDate) && !isToday(t.dueDate)
  );
  const laterTasks = tasks.filter(t =>
    !urgentTasks.includes(t) && !todayTasks.includes(t) && !thisWeekTasks.includes(t)
  );

  return (
    <div>
      <h1>Minhas Tarefas</h1>

      {urgentTasks.length > 0 && (
        <TaskSection title="🔴 Urgente" tasks={urgentTasks} color="red" />
      )}

      {todayTasks.length > 0 && (
        <TaskSection title="📅 Hoje" tasks={todayTasks} color="orange" />
      )}

      {thisWeekTasks.length > 0 && (
        <TaskSection title="📆 Esta Semana" tasks={thisWeekTasks} color="blue" />
      )}

      {laterTasks.length > 0 && (
        <TaskSection title="⏳ Depois" tasks={laterTasks} color="gray" />
      )}
    </div>
  );
}
```

**Estimativa:** 20-25 horas

---

#### 2.3 Activity Log e Auditoria

**Problema Resolvido:** Newton não sabe quem fez o quê

**Funcionalidades:**

```typescript
enum ActivityType {
  TASK_CREATED = 'task_created',
  TASK_UPDATED = 'task_updated',
  TASK_COMPLETED = 'task_completed',
  TASK_ASSIGNED = 'task_assigned',
  DOCUMENT_UPLOADED = 'document_uploaded',
  DOCUMENT_DELETED = 'document_deleted',
  COMMENT_ADDED = 'comment_added',
  STATUS_CHANGED = 'status_changed',
  PHASE_CHANGED = 'phase_changed',
  TEAM_MEMBER_ADDED = 'team_member_added',
  CLIENT_MESSAGE = 'client_message',
}

interface Activity {
  id: string;
  type: ActivityType;
  processId: string;
  userId: string; // Quem fez
  user: {
    name: string;
    email: string;
    role: UserRole;
  };
  metadata: {
    taskId?: string;
    taskTitle?: string;
    documentId?: string;
    documentName?: string;
    fromStatus?: string;
    toStatus?: string;
    assignedTo?: User;
    comment?: string;
    // ... outros campos dependendo do tipo
  };
  createdAt: Date;
}
```

**Activity Feed (no processo):**

```tsx
function ProcessActivityFeed({ processId }: { processId: string }) {
  const { activities, isLoading } = useActivities({ processId, limit: 50 });

  if (isLoading) return <Skeleton />;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Atividades Recentes</h3>

      <div className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="flex gap-3 text-sm">
            <Avatar user={activity.user} size="sm" />

            <div className="flex-1">
              <p className="text-gray-900">
                <span className="font-medium">{activity.user.name}</span>
                {' '}
                {getActivityMessage(activity)}
              </p>

              <p className="text-gray-500 text-xs">
                {formatDistanceToNow(activity.createdAt, { addSuffix: true, locale: ptBR })}
              </p>

              {activity.metadata.comment && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                  {activity.metadata.comment}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getActivityMessage(activity: Activity): string {
  switch (activity.type) {
    case 'TASK_COMPLETED':
      return `completou a tarefa "${activity.metadata.taskTitle}"`;
    case 'TASK_ASSIGNED':
      return `atribuiu "${activity.metadata.taskTitle}" para ${activity.metadata.assignedTo?.name}`;
    case 'DOCUMENT_UPLOADED':
      return `fez upload de "${activity.metadata.documentName}"`;
    case 'STATUS_CHANGED':
      return `mudou status de "${activity.metadata.fromStatus}" para "${activity.metadata.toStatus}"`;
    case 'COMMENT_ADDED':
      return `adicionou um comentário`;
    case 'PHASE_CHANGED':
      return `avançou para a fase "${PHASE_LABELS[activity.metadata.toPhase]}"`;
    default:
      return 'fez uma atualização';
  }
}
```

**Auditoria para Compliance:**

```tsx
// Exportar log de atividades para compliance
async function exportAuditLog(processId: string, dateRange: { start: Date; end: Date }) {
  const activities = await prisma.activity.findMany({
    where: {
      processId,
      createdAt: { gte: dateRange.start, lte: dateRange.end },
    },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  // Gerar PDF ou CSV
  const pdf = await generatePDF({
    template: 'audit-log',
    data: {
      processId,
      clientName: process.clientName,
      dateRange,
      activities: activities.map(a => ({
        timestamp: format(a.createdAt, 'dd/MM/yyyy HH:mm:ss'),
        user: `${a.user.name} (${a.user.email})`,
        action: getActivityMessage(a),
        ipAddress: a.metadata.ipAddress,
      })),
    },
  });

  return pdf;
}
```

**Estimativa:** 15-20 horas

---

### Sprint 3: Relatórios e Analytics (4-6 semanas)

#### 3.1 Dashboard de Métricas (Newton's Control Panel)

**Problema Resolvido:** Newton não tem dados para tomar decisões

**Funcionalidades:**

**KPIs Principais:**

```typescript
interface OrganizationMetrics {
  overview: {
    totalClients: number;
    activeClients: number;
    completedThisMonth: number;
    revenue: {
      thisMonth: number;
      lastMonth: number;
      growth: number; // %
    };
  };

  processHealth: {
    healthy: number;
    atRisk: number;
    critical: number;
  };

  teamPerformance: {
    members: {
      userId: string;
      name: string;
      tasksCompleted: number;
      avgTimePerTask: number; // minutos
      clientSatisfaction?: number; // 1-5 stars
    }[];
  };

  phaseDistribution: {
    ELIGIBILITY: number;
    EVIDENCE: number;
    LETTERS: number;
    PETITION: number;
    FILING: number;
  };

  timeline: {
    avgDaysPerPhase: Record<ProcessPhase, number>;
    avgTotalDays: number;
    fastestCase: { id: string; days: number };
    slowestCase: { id: string; days: number };
  };

  bottlenecks: {
    phase: ProcessPhase;
    avgStuckDays: number;
    casesAffected: number;
  }[];
}
```

**Dashboard UI:**

```tsx
function AnalyticsDashboard() {
  const { metrics, isLoading } = useOrganizationMetrics();

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      {/* KPIs Row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          title="Clientes Ativos"
          value={metrics.overview.activeClients}
          change={`+${metrics.overview.completedThisMonth} este mês`}
          trend="up"
        />
        <KPICard
          title="Revenue (Mês)"
          value={formatCurrency(metrics.overview.revenue.thisMonth)}
          change={`${metrics.overview.revenue.growth > 0 ? '+' : ''}${metrics.overview.revenue.growth}%`}
          trend={metrics.overview.revenue.growth > 0 ? 'up' : 'down'}
        />
        <KPICard
          title="Cases em Risco"
          value={metrics.processHealth.atRisk}
          trend={metrics.processHealth.atRisk > 5 ? 'warning' : 'neutral'}
        />
        <KPICard
          title="Cases Críticos"
          value={metrics.processHealth.critical}
          trend={metrics.processHealth.critical > 0 ? 'alert' : 'success'}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Phase Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Fase</CardTitle>
          </CardHeader>
          <CardContent>
            <DoughnutChart
              data={Object.entries(metrics.phaseDistribution).map(([phase, count]) => ({
                label: PHASE_LABELS[phase],
                value: count,
              }))}
            />
          </CardContent>
        </Card>

        {/* Avg Days per Phase */}
        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio por Fase</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={Object.entries(metrics.timeline.avgDaysPerPhase).map(([phase, days]) => ({
                label: PHASE_LABELS[phase],
                value: days,
              }))}
              yAxisLabel="Dias"
            />
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membro</TableHead>
                <TableHead>Tarefas Concluídas</TableHead>
                <TableHead>Tempo Médio/Tarefa</TableHead>
                <TableHead>Satisfação do Cliente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.teamPerformance.members.map(member => (
                <TableRow key={member.userId}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.tasksCompleted}</TableCell>
                  <TableCell>{formatDuration(member.avgTimePerTask)}</TableCell>
                  <TableCell>
                    {member.clientSatisfaction
                      ? '⭐'.repeat(member.clientSatisfaction)
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottlenecks */}
      {metrics.bottlenecks.length > 0 && (
        <Card className="border-orange-300 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900">⚠️ Gargalos Identificados</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {metrics.bottlenecks.map(bottleneck => (
                <li key={bottleneck.phase} className="text-sm text-orange-800">
                  <strong>{PHASE_LABELS[bottleneck.phase]}</strong>:
                  {bottleneck.casesAffected} casos estagnados por média de {bottleneck.avgStuckDays} dias
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

**Estimativa:** 35-40 horas

---

#### 3.2 Relatórios Customizados e Exportação

**Problema Resolvido:** Newton precisa gerar relatórios para clientes e sócios

**Funcionalidades:**

```typescript
interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'client-progress' | 'team-productivity' | 'financial' | 'custom';
  filters: {
    dateRange?: { start: Date; end: Date };
    processes?: string[];
    phases?: ProcessPhase[];
    teamMembers?: string[];
  };
  sections: ReportSection[];
  format: 'pdf' | 'excel' | 'csv';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[]; // emails
    nextRun: Date;
  };
}

interface ReportSection {
  type: 'chart' | 'table' | 'text' | 'kpi';
  title: string;
  data: any;
  config?: {
    chartType?: 'bar' | 'line' | 'pie' | 'doughnut';
    columns?: string[];
    aggregation?: 'sum' | 'avg' | 'count';
  };
}
```

**Report Builder UI:**

```tsx
function ReportBuilderPage() {
  const [template, setTemplate] = useState<ReportTemplate>({
    name: '',
    type: 'custom',
    sections: [],
    format: 'pdf',
  });

  const addSection = (type: ReportSection['type']) => {
    setTemplate(prev => ({
      ...prev,
      sections: [...prev.sections, { type, title: '', data: null }],
    }));
  };

  const generateReport = async () => {
    const report = await generateCustomReport(template);
    downloadFile(report, `report-${format(new Date(), 'yyyy-MM-dd')}.${template.format}`);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left: Builder */}
      <div className="col-span-2 space-y-4">
        <Input
          label="Nome do Relatório"
          value={template.name}
          onChange={(name) => setTemplate(prev => ({ ...prev, name }))}
        />

        <Select
          label="Tipo"
          options={[
            { value: 'client-progress', label: 'Progresso do Cliente' },
            { value: 'team-productivity', label: 'Produtividade da Equipe' },
            { value: 'financial', label: 'Financeiro' },
            { value: 'custom', label: 'Customizado' },
          ]}
          value={template.type}
          onChange={(type) => setTemplate(prev => ({ ...prev, type }))}
        />

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Seções do Relatório</h3>

          <div className="space-y-4">
            {template.sections.map((section, index) => (
              <SectionEditor
                key={index}
                section={section}
                onChange={(updated) => {
                  const newSections = [...template.sections];
                  newSections[index] = updated;
                  setTemplate(prev => ({ ...prev, sections: newSections }));
                }}
                onRemove={() => {
                  setTemplate(prev => ({
                    ...prev,
                    sections: prev.sections.filter((_, i) => i !== index),
                  }));
                }}
              />
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => addSection('kpi')}>
              + KPI
            </Button>
            <Button variant="outline" onClick={() => addSection('chart')}>
              + Gráfico
            </Button>
            <Button variant="outline" onClick={() => addSection('table')}>
              + Tabela
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateReport}>Gerar Relatório</Button>
          <Button variant="outline">Salvar Template</Button>
          <Button variant="outline">Agendar Envio</Button>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Preview</h3>
        <ReportPreview template={template} />
      </div>
    </div>
  );
}
```

**Templates Pré-Configurados:**

**1. Client Progress Report**
```typescript
const CLIENT_PROGRESS_TEMPLATE: ReportTemplate = {
  name: 'Relatório de Progresso do Cliente',
  type: 'client-progress',
  sections: [
    {
      type: 'text',
      title: 'Resumo Executivo',
      data: '{{summary}}', // Auto-gerado
    },
    {
      type: 'kpi',
      title: 'Status Geral',
      data: {
        progress: '{{process.progress}}',
        phase: '{{process.currentPhase}}',
        tasksCompleted: '{{tasks.completed}}',
        tasksTotal: '{{tasks.total}}',
      },
    },
    {
      type: 'chart',
      title: 'Progresso nas Últimas 4 Semanas',
      data: '{{weeklyProgress}}',
      config: { chartType: 'line' },
    },
    {
      type: 'table',
      title: 'Próximas Tarefas',
      data: '{{upcomingTasks}}',
      config: {
        columns: ['Tarefa', 'Status', 'Data Limite', 'Responsável'],
      },
    },
  ],
  format: 'pdf',
};
```

**2. Team Productivity Report**
```typescript
const TEAM_PRODUCTIVITY_TEMPLATE: ReportTemplate = {
  name: 'Produtividade da Equipe',
  type: 'team-productivity',
  sections: [
    {
      type: 'kpi',
      title: 'Overview',
      data: {
        tasksCompleted: '{{team.tasksCompleted}}',
        avgTimePerTask: '{{team.avgTime}}',
        casesHandled: '{{team.casesHandled}}',
      },
    },
    {
      type: 'chart',
      title: 'Tarefas Concluídas por Membro',
      data: '{{teamMemberStats}}',
      config: { chartType: 'bar' },
    },
    {
      type: 'table',
      title: 'Top Performers',
      data: '{{topPerformers}}',
      config: {
        columns: ['Nome', 'Tarefas', 'Tempo Médio', 'Rating'],
      },
    },
  ],
  format: 'excel',
};
```

**Estimativa:** 30-35 horas

---

### Sprint 4: Comunicação com Clientes (4-6 semanas)

#### 4.1 Portal do Cliente

**Problema Resolvido:** Clientes perguntam status repetidamente

**Funcionalidades:**

```typescript
interface ClientPortal {
  clientId: string;
  processId: string;
  features: {
    viewProgress: boolean;
    uploadDocuments: boolean;
    messaging: boolean;
    viewTimeline: boolean;
    downloadReports: boolean;
  };
  branding: {
    logo?: string;
    primaryColor?: string;
    firmName: string;
  };
}
```

**Client Dashboard:**

```tsx
function ClientDashboard() {
  const { process, isLoading } = useClientProcess();

  if (isLoading) return <Skeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header com branding do escritório */}
      <div className="flex items-center justify-between">
        <div>
          <img src={process.organization.logo} alt="Logo" className="h-12" />
          <h1 className="text-2xl font-bold mt-2">Meu Processo EB-1A</h1>
        </div>
        <Badge className="text-lg">
          {PHASE_LABELS[process.currentPhase]}
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Conclusão</span>
                <span className="text-sm font-medium">{process.progress}%</span>
              </div>
              <Progress value={process.progress} />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-green-600">{process.tasksCompleted}</p>
                <p className="text-sm text-gray-500">Tarefas Concluídas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{process.tasksPending}</p>
                <p className="text-sm text-gray-500">Pendentes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-600">
                  {differenceInDays(process.targetDeadline, new Date())}
                </p>
                <p className="text-sm text-gray-500">Dias Restantes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Linha do Tempo</CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline300Days
            process={process}
            interactive={false}
            showMilestonesOnly={true}
          />
        </CardContent>
      </Card>

      {/* My Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Pendentes</CardTitle>
          <CardDescription>
            Tarefas que dependem de você para avançar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {process.clientPendingTasks.map(task => (
              <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    {task.dueDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Prazo: {format(task.dueDate, "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                    )}
                  </div>
                  <Button size="sm" onClick={() => openTaskModal(task)}>
                    {task.requiresUpload ? 'Upload' : 'Completar'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <FileManager
            processId={process.id}
            userRole="client"
            canUpload={true}
            canDelete={false}
          />
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Mensagens</CardTitle>
        </CardHeader>
        <CardContent>
          <MessagingThread
            processId={process.id}
            participants={[process.user, process.leadAttorney]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

**Client Invite Flow:**

```typescript
// Newton convida cliente para acessar o portal
async function inviteClient(processId: string, clientEmail: string, clientName: string) {
  const invite = await prisma.clientInvite.create({
    data: {
      processId,
      email: clientEmail,
      name: clientName,
      token: generateSecureToken(),
      expiresAt: addDays(new Date(), 30),
    },
  });

  await sendEmail({
    to: clientEmail,
    subject: 'Acesso ao Portal VisaFlow - Acompanhe seu Processo EB-1A',
    template: 'client-invite',
    data: {
      clientName,
      lawyerName: 'Newton Carvalho',
      firmName: 'Newton Carvalho Immigration Law',
      accessLink: `${APP_URL}/client/invite/${invite.token}`,
      features: [
        'Acompanhe o progresso do seu caso em tempo real',
        'Faça upload de documentos com segurança',
        'Comunique-se diretamente com nossa equipe',
        'Visualize a linha do tempo do processo',
      ],
    },
  });

  return invite;
}
```

**Estimativa:** 35-40 horas

---

#### 4.2 Sistema de Mensagens Interno

**Problema Resolvido:** Comunicação dispersa em WhatsApp/Email

**Funcionalidades:**

```typescript
interface Message {
  id: string;
  processId: string;
  threadId?: string; // Para replies
  senderId: string;
  sender: {
    name: string;
    role: UserRole;
    avatar?: string;
  };
  content: string;
  attachments?: {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
  }[];
  readBy: {
    userId: string;
    readAt: Date;
  }[];
  createdAt: Date;
  isInternal: boolean; // Apenas equipe (não mostra para cliente)
}

interface MessageThread {
  id: string;
  processId: string;
  subject: string;
  participants: User[];
  messages: Message[];
  isArchived: boolean;
  createdAt: Date;
  lastMessageAt: Date;
}
```

**Messaging UI:**

```tsx
function MessagingPanel({ processId }: { processId: string }) {
  const { threads, isLoading } = useMessageThreads({ processId });
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const sendMessage = async () => {
    await createMessage({
      processId,
      threadId: selectedThread?.id,
      content: newMessage,
      isInternal,
    });

    // Notificar participantes
    selectedThread?.participants.forEach(participant => {
      if (participant.id !== currentUser.id) {
        sendNotification({
          userId: participant.id,
          type: 'NEW_MESSAGE',
          title: 'Nova mensagem',
          message: `${currentUser.name} enviou uma mensagem`,
          link: `/dashboard/process/${processId}/messages`,
        });
      }
    });

    setNewMessage('');
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-[600px]">
      {/* Thread List */}
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <Button onClick={() => createNewThread()}>Nova Conversa</Button>
        </div>

        <div className="overflow-y-auto h-full">
          {threads.map(thread => (
            <div
              key={thread.id}
              onClick={() => setSelectedThread(thread)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedThread?.id === thread.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{thread.subject}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {thread.messages[thread.messages.length - 1]?.content}
                  </p>
                </div>

                {thread.hasUnread && (
                  <Badge variant="destructive" className="h-5 w-5 p-0 justify-center">
                    {thread.unreadCount}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {formatDistanceToNow(thread.lastMessageAt, { addSuffix: true, locale: ptBR })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="col-span-2 border rounded-lg flex flex-col">
        {selectedThread ? (
          <>
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold">{selectedThread.subject}</h3>
              <p className="text-sm text-gray-500">
                {selectedThread.participants.map(p => p.name).join(', ')}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedThread.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.senderId === currentUser.id ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar user={message.sender} size="sm" />

                  <div className={`flex-1 max-w-md ${
                    message.senderId === currentUser.id ? 'text-right' : ''
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.sender.name}</span>
                      {message.isInternal && (
                        <Badge variant="secondary" className="text-xs">
                          🔒 Interno
                        </Badge>
                      )}
                    </div>

                    <div className={`inline-block p-3 rounded-lg ${
                      message.senderId === currentUser.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map(file => (
                          <a
                            key={file.id}
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-blue-600 hover:underline"
                          >
                            <Paperclip className="h-3 w-3" />
                            {file.fileName}
                          </a>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-1">
                      {format(message.createdAt, "dd/MM HH:mm")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Composer */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="internal"
                  checked={isInternal}
                  onCheckedChange={setIsInternal}
                />
                <label htmlFor="internal" className="text-sm text-gray-600">
                  Mensagem interna (não visível para o cliente)
                </label>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>Enviar</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Selecione uma conversa
          </div>
        )}
      </div>
    </div>
  );
}
```

**Estimativa:** 25-30 horas

---

### Estimativa Total v1.5

**Desenvolvimento:** 320-400 horas (3-4 meses com 1-2 desenvolvedores)

**Breakdown:**
- Dashboard Multi-Cliente: 90-110 horas
- Colaboração em Equipe: 60-75 horas
- Relatórios e Analytics: 65-75 horas
- Comunicação com Clientes: 60-70 horas
- Testes e Polimento: 45-70 horas

**Investimento Estimado:** $25k-40k (dev + design + QA)

**ROI para Newton:**
- Economiza 10-15 horas/semana (menos emails, menos busca de arquivos)
- Pode gerenciar 50% mais clientes sem contratar
- Reduz churn de clientes (melhor experiência)
- **Break-even:** 3-5 novos clientes EB-1A

---

## 🚀 Roadmap v2.0: "Enterprise Immigration Platform"

**Objetivo:** Transformar VisaFlow em plataforma enterprise para escritórios grandes (5+ advogados, 200+ clientes)

**Prazo Estimado:** 6-8 meses adicionais
**Esforço:** ~600-800 horas de desenvolvimento

---

### Funcionalidades v2.0

#### 1. Multi-Tenancy e White-Label

**Problema:** Escritórios grandes querem branding próprio

```typescript
interface Organization {
  id: string;
  slug: string; // newton-immigration.visaflow.com
  name: string;
  logo: string;
  primaryColor: string;
  customDomain?: string; // cases.newtonimmigration.com
  plan: 'startup' | 'growth' | 'enterprise';
  features: {
    maxUsers: number;
    maxProcesses: number;
    whiteLabel: boolean;
    customReports: boolean;
    apiAccess: boolean;
    sso: boolean;
  };
}
```

**Estimativa:** 80-100 horas

---

#### 2. Integrações USCIS e Automações

**Problema:** Verificação manual de case status no USCIS

```typescript
interface USCISIntegration {
  receiptNumber: string; // Ex: EAC1234567890
  caseType: 'I-140' | 'I-485' | 'I-765';
  currentStatus: string;
  lastChecked: Date;
  autoCheckEnabled: boolean;
  statusHistory: {
    status: string;
    date: Date;
    description: string;
  }[];
}

// Cron job para checar status
async function checkUSCISStatus(receiptNumber: string) {
  // Web scraping do egov.uscis.gov ou API oficial (se disponível)
  const status = await fetchUSCISStatus(receiptNumber);

  if (status.changed) {
    // Notificar Newton e cliente
    await sendNotification({
      title: `Atualização USCIS: ${status.newStatus}`,
      message: `Caso ${receiptNumber} - ${status.description}`,
      priority: 'high',
    });
  }
}
```

**Estimativa:** 60-80 horas

---

#### 3. AI-Powered Document Review

**Problema:** Revisar petições de 50-100 páginas manualmente é lento

```typescript
interface AIDocumentReview {
  documentId: string;
  analysisResults: {
    qualityScore: number; // 0-100
    issues: {
      type: 'grammar' | 'clarity' | 'evidence' | 'legal';
      severity: 'low' | 'medium' | 'high';
      location: { page: number; line: number };
      suggestion: string;
    }[];
    strengths: string[];
    weaknesses: string[];
    comparison: {
      similarApprovedCases: number;
      matchScore: number; // 0-100
    };
  };
}

// Usa Claude API para análise profunda
async function reviewPetitionDocument(documentContent: string) {
  const response = await claude.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `
        Você é um advogado experiente em imigração EB-1A.
        Analise esta petição e identifique:
        1. Problemas de qualidade (gramática, clareza, estrutura)
        2. Fraquezas argumentativas
        3. Evidências ausentes ou fracas
        4. Sugestões específicas para melhorar

        Petição:
        ${documentContent}
      `,
    }],
  });

  return parseAIReviewResponse(response);
}
```

**Estimativa:** 40-50 horas

---

#### 4. Financial Management

**Problema:** Newton não controla receita, despesas e billing

```typescript
interface FinancialModule {
  invoicing: {
    templates: InvoiceTemplate[];
    autoGenerate: boolean;
    paymentIntegrations: ('stripe' | 'paypal' | 'wise')[];
  };

  expenses: {
    categories: string[];
    tracking: Expense[];
    billableToClient: boolean;
  };

  revenue: {
    byClient: Record<string, number>;
    byPhase: Record<ProcessPhase, number>;
    byMonth: Record<string, number>;
    projections: RevenueProjection[];
  };
}

interface Invoice {
  id: string;
  processId: string;
  clientName: string;
  amount: number;
  items: {
    description: string;
    quantity: number;
    rate: number;
    total: number;
  }[];
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: Date;
  paidAt?: Date;
}
```

**Estimativa:** 70-90 horas

---

#### 5. Advanced Reporting e BI

**Problema:** Newton quer insights preditivos

```typescript
interface PredictiveAnalytics {
  approvalProbability: {
    processId: string;
    probability: number; // 0-1
    factors: {
      criteriaStrength: number;
      evidenceQuality: number;
      letterQuality: number;
      timelineAdherence: number;
    };
    recommendations: string[];
  };

  caseComparison: {
    similarApprovedCases: Case[];
    similarRejectedCases: Case[];
    keyDifferences: string[];
  };

  resourceAllocation: {
    bottlenecks: {
      phase: ProcessPhase;
      avgDelay: number;
      suggestedAction: string;
    }[];
    teamOptimization: {
      member: User;
      currentLoad: number;
      optimalLoad: number;
      suggestion: string;
    }[];
  };
}

// Machine Learning para prever aprovações
async function predictApprovalProbability(process: Process) {
  // Treinar modelo baseado em casos históricos
  const model = await loadMLModel('eb1a-approval-predictor');

  const features = extractFeatures(process);
  const prediction = await model.predict(features);

  return {
    probability: prediction.score,
    factors: prediction.featureImportance,
    recommendations: generateRecommendations(prediction),
  };
}
```

**Estimativa:** 90-120 horas

---

#### 6. Mobile App

**Problema:** Newton e clientes querem acesso mobile

**Funcionalidades:**
- Notificações push
- Upload de fotos/documentos via câmera
- Quick actions (aprovar tarefa, responder mensagem)
- Offline mode com sync

**Stack:**
- React Native (compartilha código com web)
- Expo para build e deploy
- Push notifications (Firebase Cloud Messaging)

**Estimativa:** 150-200 horas

---

#### 7. API Pública e Marketplace

**Problema:** Escritórios querem integrar com seus sistemas

```typescript
interface PublicAPI {
  authentication: 'oauth2' | 'api-key';

  endpoints: {
    '/api/v1/processes': {
      GET: 'List processes';
      POST: 'Create process';
    };
    '/api/v1/processes/:id': {
      GET: 'Get process details';
      PATCH: 'Update process';
      DELETE: 'Delete process';
    };
    '/api/v1/tasks': {
      GET: 'List tasks';
      POST: 'Create task';
    };
    // ... mais endpoints
  };

  webhooks: {
    'process.created': WebhookEvent;
    'process.updated': WebhookEvent;
    'task.completed': WebhookEvent;
    'deadline.approaching': WebhookEvent;
  };
}

interface Marketplace {
  plugins: {
    id: string;
    name: string;
    description: string;
    category: 'integration' | 'automation' | 'reporting' | 'ai';
    developer: string;
    pricing: 'free' | 'paid';
    installCount: number;
  }[];
}
```

**Exemplos de Plugins:**
- QuickBooks integration
- DocuSign for signatures
- Google Drive sync
- Calendly for client meetings
- Zapier connector

**Estimativa:** 80-100 horas

---

### Estimativa Total v2.0

**Desenvolvimento:** 600-800 horas (6-8 meses adicionais)

**Breakdown:**
- Multi-Tenancy: 80-100 horas
- USCIS Integration: 60-80 horas
- AI Document Review: 40-50 horas
- Financial Module: 70-90 horas
- Advanced BI: 90-120 horas
- Mobile App: 150-200 horas
- API + Marketplace: 80-100 horas
- Testes e Infraestrutura: 30-60 horas

**Investimento Estimado:** $50k-80k

**Pricing Model para v2.0:**

```typescript
interface PricingPlan {
  name: string;
  price: number; // /month
  features: {
    maxUsers: number;
    maxProcesses: number;
    whiteLabel: boolean;
    customDomain: boolean;
    apiAccess: boolean;
    prioritySupport: boolean;
  };
}

const PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: 99,
    features: {
      maxUsers: 3,
      maxProcesses: 25,
      whiteLabel: false,
      customDomain: false,
      apiAccess: false,
      prioritySupport: false,
    },
  },
  {
    name: 'Growth',
    price: 299,
    features: {
      maxUsers: 10,
      maxProcesses: 100,
      whiteLabel: true,
      customDomain: true,
      apiAccess: true,
      prioritySupport: false,
    },
  },
  {
    name: 'Enterprise',
    price: 999,
    features: {
      maxUsers: -1, // Unlimited
      maxProcesses: -1,
      whiteLabel: true,
      customDomain: true,
      apiAccess: true,
      prioritySupport: true,
    },
  },
];
```

---

## 📊 Resumo de Priorização

### Must-Have (v1.5 - 3-4 meses)

1. ✅ **Dashboard Multi-Cliente** - Newton não pode gerenciar 100+ clientes sem isso
2. ✅ **Calendário com Deadlines** - Crítico para compliance USCIS
3. ✅ **Sistema de Equipe** - Delegar trabalho é essencial para escalar
4. ✅ **Relatórios Básicos** - Newton precisa de métricas para decisões

### Should-Have (v1.5 - Opcional)

5. ⚠️ **Portal do Cliente** - Reduz emails, mas não bloqueia operação
6. ⚠️ **Mensagens Internas** - Nice to have, mas WhatsApp funciona

### Nice-to-Have (v2.0 - 6-8 meses depois)

7. 🔮 **USCIS Integration** - Automação valiosa mas não urgente
8. 🔮 **AI Document Review** - Diferencial competitivo
9. 🔮 **Financial Module** - QuickBooks resolve temporariamente
10. 🔮 **Mobile App** - Conveniência mas não essencial
11. 🔮 **API Pública** - Para empresas grandes apenas

---

## 🎯 Go-to-Market Strategy

### Fase 1: Beta com Newton (3 meses)

- Newton testa v1.5 com 10 clientes reais
- Feedback semanal
- Iterações rápidas
- Case study documentado

### Fase 2: Early Adopters (6 meses)

- 5-10 escritórios pequenos (1-3 advogados)
- Preço: $149/mês (50% desconto)
- Suporte prioritário
- Testemunhos e referrals

### Fase 3: Escala (12 meses)

- Marketing: SEO, Google Ads, LinkedIn
- Parcerias com AILA
- Webinars e demos
- Target: 50 escritórios pagantes

---

## 💰 Modelo de Receita

```typescript
interface RevenueProjection {
  year1: {
    customers: 20; // 10 Starter + 8 Growth + 2 Enterprise
    mrr: (10 * 99) + (8 * 299) + (2 * 999); // $5,380/mês
    arr: 64_560; // $64k/ano
    costs: 30_000; // Dev + hosting + suporte
    profit: 34_560;
  };

  year2: {
    customers: 60;
    mrr: 16_140;
    arr: 193_680;
    costs: 60_000;
    profit: 133_680;
  };

  year3: {
    customers: 150;
    mrr: 40_350;
    arr: 484_200;
    costs: 120_000;
    profit: 364_200;
  };
}
```

---

## 🚀 Conclusão

A persona Newton revela que **VisaFlow tem potencial de ser muito maior que uma ferramenta DIY**.

Escritórios de imigração enfrentam problemas críticos de:
- Gestão de múltiplos clientes
- Colaboração em equipe
- Deadlines USCIS (alto risco)
- Comunicação com clientes
- Métricas de negócio

**v1.5 resolve os pain points mais urgentes** (3-4 meses de dev)
**v2.0 cria plataforma enterprise líder de mercado** (6-8 meses adicionais)

**Próximo passo sugerido:**
Validar roadmap v1.5 com 3-5 advogados como Newton para confirmar prioridades antes de começar desenvolvimento.

---

**Fim do Documento**
