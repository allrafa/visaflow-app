import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessesByUserId } from '@/lib/services/processService';
import { QuickAccessGrid } from '@/components/dashboard/QuickAccessGrid';
import { ProcessOverview } from '@/components/dashboard/ProcessOverview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { Process } from '@/types/database';

export default async function DashboardPage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Buscar processos do usuário
  const processes = await getProcessesByUserId(user.id);

  // Calcular estatísticas simples
  const pendingTasks = 12; // TODO: Calculate from actual tasks
  const draftLetters = 3; // TODO: Calculate from actual letters

  // Mock recent activity (TODO: Get from database)
  const recentActivities = [
    {
      id: '1',
      type: 'task_completed' as const,
      title: 'Task completed',
      description: 'Gather publications documentation',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    },
    {
      id: '2',
      type: 'letter_saved' as const,
      title: 'Letter draft saved',
      description: 'Recommendation letter from Dr. Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '3',
      type: 'process_created' as const,
      title: 'New process created',
      description: 'John Doe EB-1A petition',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header Section */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {user.user_metadata?.name || 'there'}! 👋
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            You have {processes.length} active {processes.length === 1 ? 'process' : 'processes'}
          </p>
        </div>

        {/* Quick Access Grid */}
        <QuickAccessGrid pendingTasks={pendingTasks} draftLetters={draftLetters} />

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Active Processes */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Processes</h2>

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
                  <Link href="/dashboard/process/new">
                    <Button size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Create First Process
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {processes.map((process) => (
                  <ProcessOverview key={process.id} process={process} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Sidebar */}
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
}

