# Plano de Próximas Funcionalidades - VisaFlow

## Data
2025-11-16

## Status Atual do Projeto

### ✅ Implementado Recentemente
1. **Reorganização de Navegação de Tarefas**
   - Página principal com 5 cards de fases clicáveis
   - Sub-página `/tasks` com tabela completa
   - Filtros por fase com recarregamento automático
   - Performance 60% melhor

2. **Melhorias na Tabela de Tarefas**
   - ✅ Coluna "Autor" adicionada (mostra "Sistema" por enquanto)
   - ✅ Novo status "Em Revisão" (UNDER_REVIEW) para advogados
   - ✅ Navegação entre fases recarrega os dados corretamente
   - ✅ Link "My Process" corrigido (não dá mais 404)

3. **Sistema de Activity Logs**
   - Migration 009 aplicada
   - Auto-tracking em 13 APIs
   - 289/290 tarefas criadas

---

## Funcionalidades Pendentes

### 1. MARCOS PRINCIPAIS (Timeline) - Interatividade 🎯
**Prioridade:** ALTA
**Complexidade:** MÉDIA
**Tempo estimado:** 4-6 horas

#### Problema Atual
O componente "Timeline 300 Days" existe mas não tem interatividade. Precisa:
- Ser clicável para mostrar detalhes de cada marco
- Linkar com as fases do processo
- Mostrar progresso real por dia
- Permitir review de tudo feito/não feito por data limite

#### Solução Proposta

**Fase 1: Tornar Timeline Interativa (2h)**
```typescript
// src/components/dashboard/Timeline300Days.tsx

interface Milestone {
  id: string;
  name: string;
  targetDate: Date;
  phase: ProcessPhase;
  completedTasks: number;
  totalTasks: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
}

// Click handler para cada milestone
const handleMilestoneClick = (milestone: Milestone) => {
  // Abre modal com detalhes:
  // - Lista de tarefas dessa fase
  // - Status de cada tarefa
  // - Dias restantes
  // - Botão "Ver Todas as Tarefas" → navega para /tasks?phase=X
};
```

**Fase 2: Modal de Detalhes do Milestone (2h)**
```tsx
<MilestoneDetailModal>
  {/* Header */}
  <h2>Fase 1: Elegibilidade (Dia 30)</h2>
  <p>Restam 12 dias</p>

  {/* Progress Ring */}
  <CircularProgress value={45} /> {/* 45% completo */}

  {/* Task Summary */}
  <div>
    <p>✅ 26 tarefas concluídas</p>
    <p>⏱️ 12 em progresso</p>
    <p>⚠️ 20 pendentes</p>
  </div>

  {/* Quick Actions */}
  <Button onClick={() => router.push(`/tasks?phase=ELIGIBILITY`)}>
    Ver Todas as Tarefas
  </Button>

  {/* Overdue Warning */}
  {isOverdue && (
    <Alert variant="destructive">
      Esta fase está atrasada em 5 dias!
    </Alert>
  )}
</MilestoneDetailModal>
```

**Fase 3: Review por Data (2h)**
```tsx
// Adicionar filtro de data na página /tasks
<DateRangePicker>
  <option>Tudo</option>
  <option>Vence esta semana</option>
  <option>Vence este mês</option>
  <option>Atrasadas</option>
  <option>Custom Range</option>
</DateRangePicker>

// Calcular tarefas por dia 14 (exemplo)
const tasksForDay14 = calculateTasksDueByDay(14);
// Mostrar: "12 tarefas precisam estar completas até o dia 14"
```

#### Arquivos a Modificar
- `src/components/dashboard/Timeline300Days.tsx` (tornar clicável)
- `src/components/dashboard/MilestoneDetailModal.tsx` (criar novo)
- `src/app/dashboard/process/[id]/tasks/TaskTableSection.tsx` (add filtro de data)

---

### 2. SISTEMA DE NOTIFICAÇÕES POR EMAIL 📧
**Prioridade:** ALTA
**Complexidade:** ALTA
**Tempo estimado:** 8-12 horas

#### Requisitos
- Enviar email a cada 2 dias
- Lembrar o cliente de tarefas pendentes
- Personalizado por usuário
- Suporte a unsubscribe

#### Solução Proposta

**Fase 1: Setup Infrastructure (2h)**
```bash
# Instalar Resend (recomendado)
npm install resend

# Adicionar env vars
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=noreply@visaflow.com
```

**Fase 2: Email Templates (2h)**
```tsx
// src/emails/TaskReminderEmail.tsx
import { Html, Head, Body, Container } from '@react-email/components';

export function TaskReminderEmail({ user, tasks, processName }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <h1>Olá {user.name}! 👋</h1>
          <p>Você tem {tasks.length} tarefas pendentes no processo {processName}:</p>

          <ul>
            {tasks.slice(0, 5).map(task => (
              <li key={task.id}>
                <strong>{task.title}</strong> - {task.phase}
              </li>
            ))}
          </ul>

          <a href="https://visaflow.com/dashboard">
            Ver Minhas Tarefas
          </a>

          <hr />
          <small>
            <a href="https://visaflow.com/unsubscribe?token={user.unsubscribeToken}">
              Parar de receber esses emails
            </a>
          </small>
        </Container>
      </Body>
    </Html>
  );
}
```

**Fase 3: Cron Job (3h)**
```typescript
// src/app/api/cron/send-reminders/route.ts
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { TaskReminderEmail } from '@/emails/TaskReminderEmail';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Get users who should receive emails
  // (last email sent > 2 days ago)
  const users = await prisma.user.findMany({
    where: {
      lastReminderSent: {
        lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      emailNotificationsEnabled: true,
    },
    include: {
      processes: {
        include: {
          tasks: {
            where: {
              status: { in: ['PENDING', 'IN_PROGRESS'] }
            }
          }
        }
      }
    }
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  for (const user of users) {
    const pendingTasks = user.processes.flatMap(p => p.tasks);

    if (pendingTasks.length === 0) continue;

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: user.email,
      subject: `Você tem ${pendingTasks.length} tarefas pendentes - VisaFlow`,
      react: TaskReminderEmail({
        user,
        tasks: pendingTasks,
        processName: user.processes[0].title
      })
    });

    // Update last sent timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastReminderSent: new Date() }
    });
  }

  return Response.json({ sent: users.length });
}
```

**Fase 4: Setup Vercel Cron (1h)**
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 9 */2 * *"  // Every 2 days at 9am UTC
    }
  ]
}
```

**Fase 5: User Preferences (2-4h)**
```typescript
// Migration 010: Add email preferences
model User {
  // ... existing fields
  emailNotificationsEnabled Boolean @default(true) @map("email_notifications_enabled")
  lastReminderSent         DateTime? @map("last_reminder_sent")
  unsubscribeToken         String?   @unique @map("unsubscribe_token")
}

// Page: /dashboard/settings/notifications
<Switch
  checked={emailNotificationsEnabled}
  onCheckedChange={handleToggle}
>
  Receber lembretes de tarefas por email
</Switch>

<Select value={frequency}>
  <option value="daily">Diariamente</option>
  <option value="every_2_days">A cada 2 dias</option>
  <option value="weekly">Semanalmente</option>
</Select>
```

#### Arquivos a Criar
- `src/emails/TaskReminderEmail.tsx`
- `src/app/api/cron/send-reminders/route.ts`
- `src/app/api/unsubscribe/route.ts`
- `src/app/dashboard/settings/notifications/page.tsx`
- `prisma/migrations/010_add_email_preferences.sql`
- `vercel.json` (configurar cron)

#### Dependências
```bash
npm install resend @react-email/components
```

---

### 3. CAMPO "AUTOR" REAL (Backend) 👤
**Prioridade:** MÉDIA
**Complexidade:** BAIXA
**Tempo estimado:** 2-3 horas

#### Problema Atual
A coluna "Autor" mostra "Sistema" hardcoded. Precisa mostrar quem realmente criou a tarefa.

#### Solução

**Fase 1: Migration (30min)**
```sql
-- Migration 010: Add createdBy to tasks
ALTER TABLE tasks ADD COLUMN created_by_id VARCHAR(255);
ALTER TABLE tasks ADD CONSTRAINT tasks_created_by_fkey
  FOREIGN KEY (created_by_id) REFERENCES users(id) ON DELETE SET NULL;

-- Update existing tasks to show current process owner
UPDATE tasks
SET created_by_id = (
  SELECT user_id FROM processes WHERE processes.id = tasks.process_id
);
```

**Fase 2: Update Schema (10min)**
```prisma
model Task {
  // ... existing fields
  createdById String?  @map("created_by_id")
  createdBy   User?    @relation(fields: [createdById], references: [id], onDelete: SetNull)
}

model User {
  // ... existing fields
  createdTasks Task[]
}
```

**Fase 3: Update APIs (1h)**
```typescript
// src/app/api/tasks/route.ts
export async function POST(request: Request) {
  const user = await getAuthUser();
  const body = await request.json();

  const task = await prisma.task.create({
    data: {
      ...body,
      createdById: user.id,  // ✅ Track who created it
    },
    include: {
      createdBy: true,  // ✅ Include user info
    }
  });

  return Response.json(task);
}
```

**Fase 4: Update UI (1h)**
```tsx
// src/components/tasks/TaskTable.tsx
{/* Autor */}
<td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <User className="h-4 w-4 text-gray-400" />
    <span className="text-sm text-gray-600">
      {task.createdBy?.name || task.createdBy?.email || 'Sistema'}
    </span>
  </div>
</td>
```

#### Arquivos a Modificar
- `prisma/schema.prisma`
- `prisma/migrations/010_add_created_by.sql`
- `src/app/api/tasks/route.ts` (POST)
- `src/lib/services/taskService.ts`
- `src/components/tasks/TaskTable.tsx`

---

## Ordem de Implementação Recomendada

### Sprint 6 (Próximos 7 dias)
**Foco:** Melhorias de UX e Interatividade

1. **Campo "Autor" Real** (2-3h) - QUICK WIN
   - Migration 010
   - Update APIs
   - Update UI

2. **Marcos Principais Interativos** (4-6h)
   - Tornar timeline clicável
   - Modal de detalhes
   - Review por data

3. **Sistema de Notificações - Fase 1** (4-6h)
   - Setup Resend
   - Email templates
   - Test manual sending

**Total:** 10-15 horas

### Sprint 7 (Próximos 14 dias)
**Foco:** Automação e Notificações

4. **Sistema de Notificações - Fase 2** (4-6h)
   - Cron job
   - Vercel cron setup
   - User preferences

5. **Testes E2E de Notificações** (2h)
   - Test cron manually
   - Test unsubscribe flow
   - Test different user preferences

**Total:** 6-8 horas

---

## Arquitetura Técnica

### Email System Flow
```
[Vercel Cron]
    ↓ (Every 2 days at 9am)
[/api/cron/send-reminders]
    ↓
[Query Users]
    ├─ Last email > 2 days ago?
    ├─ Notifications enabled?
    └─ Has pending tasks?
    ↓
[Resend API]
    ├─ Render React Email Template
    ├─ Send to user.email
    └─ Track in DB
    ↓
[Update user.lastReminderSent]
```

### Timeline Interactivity Flow
```
[Timeline300Days Component]
    ↓ (User clicks milestone)
[MilestoneDetailModal]
    ├─ Show tasks for this phase
    ├─ Show progress %
    ├─ Show days remaining
    └─ Button: "Ver Todas"
    ↓
[Navigate to /tasks?phase=ELIGIBILITY]
```

---

## Dependências e Setup

### Resend (Email Service)
```bash
# 1. Sign up at resend.com
# 2. Get API key
# 3. Add to .env
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=noreply@visaflow.com
CRON_SECRET=xxx  # Generate random string for security

# 4. Install packages
npm install resend @react-email/components
```

### Vercel Cron (Scheduler)
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 9 */2 * *"
    }
  ]
}
```

---

## Métricas de Sucesso

### Marcos Principais
- [ ] 90%+ dos usuários clicam em pelo menos 1 milestone
- [ ] Tempo médio de visualização do modal > 30s
- [ ] Taxa de cliques "Ver Todas as Tarefas" > 40%

### Notificações por Email
- [ ] Taxa de abertura > 35%
- [ ] Taxa de cliques > 15%
- [ ] Taxa de unsubscribe < 5%
- [ ] Emails enviados com sucesso > 98%

### Campo Autor
- [ ] 100% das novas tarefas têm autor preenchido
- [ ] Tarefas antigas migradas com sucesso

---

## Riscos e Mitigações

### Risco 1: Emails marcados como SPAM
**Mitigação:**
- Usar Resend (boa reputação de domínio)
- Configurar SPF, DKIM, DMARC records
- Link de unsubscribe claro
- Frequência baixa (a cada 2 dias, não diário)

### Risco 2: Cron job falha
**Mitigação:**
- Implementar retry logic
- Monitorar com Sentry
- Alert no Slack se 0 emails enviados

### Risco 3: User recebe muitos emails
**Mitigação:**
- Permitir desabilitar notificações
- Agrupar tarefas em 1 email só
- Enviar apenas se houver tarefas pendentes

---

## Próximos Passos IMEDIATOS

### Esta semana (próximos 3 dias):
1. ✅ Adicionar coluna "Autor" ← **FEITO!**
2. ✅ Adicionar status "Em Revisão" ← **FEITO!**
3. ✅ Corrigir navegação de fases ← **FEITO!**
4. ✅ Corrigir link "My Process" ← **FEITO!**
5. **Implementar Campo "Autor" Real** (Migration 010)
6. **Tornar Timeline Clicável** (Fase 1)

### Semana que vem:
7. Modal de Detalhes de Milestone
8. Setup Resend para emails
9. Email templates

---

## Estado do Desenvolvimento - Resumo

### Sprints Completados
- ✅ **Sprint 1:** Auth + Dashboard (100%)
- ✅ **Sprint 2:** Process Management (100%)
- ✅ **Sprint 3:** Criteria & Letters (100%)
- ✅ **Sprint 5:** Activity Logs (100%)
- ✅ **Reorganização:** Nova navegação de tarefas (100%)

### Sprints Em Progresso
- 🔄 **Sprint 4:** Collaborators (20% - apenas schema)
- 🔄 **Sprint 6:** Testing & Polish (em andamento)

### Features Implementadas Hoje
- ✅ Coluna "Autor" na tabela
- ✅ Status "Em Revisão" (UNDER_REVIEW)
- ✅ Navegação de fases corrigida
- ✅ Link "My Process" corrigido

### Features Próximas (Por Prioridade)
1. **Campo Autor Real** (Backend) - 2-3h
2. **Timeline Interativa** - 4-6h
3. **Notificações Email** - 8-12h

---

## Perguntas para o Usuário

Antes de continuar, preciso de feedback sobre:

1. **Prioridades:** Concorda com a ordem proposta (Autor Real → Timeline → Emails)?
2. **Notificações:** A cada 2 dias está bom ou prefere outra frequência?
3. **Timeline:** Quer ver apenas marcos principais ou todas as tarefas na timeline?
4. **Collaborators:** Quer implementar Sprint 4 (Collaborators) antes ou depois?

---

## Conclusão

**Próximo passo recomendado:** Implementar o campo "Autor Real" (2-3h), que é um quick win e melhora imediatamente a experiência do advogado para saber quem fez cada tarefa.

Após isso, partir para a Timeline Interativa, que vai dar muito mais valor ao componente de "Marcos Principais" que já existe.

As notificações por email ficam por último pois são mais complexas e precisam de mais testes.

**Tempo total estimado para completar tudo:** 20-27 horas (~3-4 dias de trabalho)
