import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { prisma } from '@/lib/db/client';
import { NextActions, NextAction } from '@/components/dashboard/NextActions';

export const metadata: Metadata = {
  title: 'Próximas Ações | VisaFlow',
  description: 'Gerencie todas as suas próximas ações prioritárias',
};

async function getNextActions(): Promise<NextAction[]> {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Get user's processes
  const processes = await prisma.process.findMany({
    where: { userId: user.id },
    select: { id: true, title: true },
    orderBy: { updatedAt: 'desc' },
  });

  if (processes.length === 0) {
    return [];
  }

  // Get all pending tasks across all processes
  const tasks = await prisma.task.findMany({
    where: {
      processId: { in: processes.map((p) => p.id) },
      status: { in: ['PENDING', 'IN_PROGRESS', 'BLOCKED'] },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (tasks.length === 0) {
    return [];
  }

  // Map tasks to NextAction format with priority logic
  const actions: NextAction[] = tasks.map((task) => {
    let priority: NextAction['priority'] = 'MEDIUM';

    if (task.status === 'BLOCKED') {
      priority = 'BLOCKED';
    } else if (task.phase === 'ELIGIBILITY') {
      priority = 'URGENT';
    } else if (task.status === 'IN_PROGRESS') {
      priority = 'HIGH';
    }

    return {
      id: task.id,
      priority,
      title: task.title,
      description: task.description || undefined,
      href: `/dashboard/process/${task.processId}/tasks?taskId=${task.id}`,
      phase: task.phase,
    };
  });

  // Sort by priority
  const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3, BLOCKED: 4 };
  actions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return actions;
}

export default async function ActionsPage() {
  const actions = await getNextActions();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-display font-bold mb-2">Próximas Ações</h1>
        <p className="text-body text-muted-foreground">
          Gerencie todas as suas ações prioritárias em um só lugar
        </p>
      </div>

      <NextActions actions={actions} maxItems={100} />
    </div>
  );
}
