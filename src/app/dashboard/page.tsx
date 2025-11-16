import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessesByUserId } from '@/lib/services/processService';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import type { Process } from '@/types/database';

export default async function DashboardPage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/login');
  }

  // Buscar processos do usuário
  const processes = await getProcessesByUserId(user.id);

  // Calcular estatísticas
  const totalProcesses = processes.length;
  const completedTasks = processes.reduce(
    (acc: number, p: Process) => acc + (p._count?.tasks || 0),
    0
  );
  const totalTasks = completedTasks; // Simplificado por enquanto
  const activeCriteria = processes.reduce(
    (acc: number, p: Process) => acc + (p._count?.criteria || 0),
    0
  );
  const averageProgress =
    totalProcesses > 0
      ? Math.round(
          processes.reduce((acc: number, p: Process) => acc + p.progress, 0) / totalProcesses
        )
      : 0;

  return (
    <DashboardClient
      userName={user.user_metadata?.name || 'there'}
      totalProcesses={totalProcesses}
      completedTasks={completedTasks}
      totalTasks={totalTasks}
      activeCriteria={activeCriteria}
      averageProgress={averageProgress}
      processes={processes}
    />
  );
}
