import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessesByUserId } from '@/lib/services/processService';
import { QuickAccessGrid } from '@/components/dashboard/QuickAccessGrid';
import { ProcessOverview } from '@/components/dashboard/ProcessOverview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
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
    <div className="min-h-screen bg-background">
      <div className="container-wide py-8 space-y-section">
        {/* Header Section - Minimal */}
        <div className="animate-fade-in">
          <h1 className="text-headline">
            My Processes
          </h1>
          <p className="text-body text-muted-foreground mt-1">
            Manage your EB-1A immigration processes
          </p>
        </div>

        {/* Quick Access Grid */}
        <QuickAccessGrid pendingTasks={pendingTasks} draftLetters={draftLetters} />

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Active Processes */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-title">Active Processes</h2>

            {processes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  📁
                </div>
                <h3 className="empty-state-title">
                  No processes yet
                </h3>
                <p className="empty-state-description">
                  Get started by creating your first EB-1A process.
                  We'll guide you through every step!
                </p>
                <Link href="/dashboard/process/new">
                  <button className="btn-primary gap-2">
                    <Plus className="h-4 w-4" />
                    Create First Process
                  </button>
                </Link>
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

