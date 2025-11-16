import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessesByUserId } from '@/lib/services/processService';
import { ProcessCard } from '@/components/dashboard/ProcessCard';
import { ProgressStats } from '@/components/dashboard/ProgressStats';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {user.user_metadata?.name || 'there'}! 👋
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your EB-1A processes and track your progress
            </p>
          </div>
          <Link href="/process/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Process
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <ProgressStats
          totalProcesses={totalProcesses}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          activeCriteria={activeCriteria}
          progress={averageProgress}
        />

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Processes Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  My Processes
                </h2>
                {processes.length > 0 && (
                  <p className="text-sm text-gray-500">
                    {processes.length} {processes.length === 1 ? 'process' : 'processes'}
                  </p>
                )}
              </div>

              {/* Empty State */}
              {processes.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
                  <div className="mx-auto max-w-md">
                    <div className="mb-4 text-6xl">📁</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      No processes yet
                    </h3>
                    <p className="mb-6 text-gray-600">
                      Get started by creating your first EB-1A process.
                      We'll guide you through every step!
                    </p>
                    <Link href="/process/new">
                      <Button size="lg" className="gap-2">
                        <Plus className="h-5 w-5" />
                        Create First Process
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Process Cards Grid */
                <div className="grid gap-6 md:grid-cols-2">
                  {processes.map((process) => (
                    <ProcessCard key={process.id} process={process} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}

