import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessesByUserId } from '@/lib/services/processService';
import { TasksPageClient } from '@/components/tasks/TasksPageClient';

export default async function TasksPage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Fetch all processes for the user
  const processes = await getProcessesByUserId(user.id);

  // Gather all tasks from all processes
  const allTasks = processes.flatMap((process) => {
    return (process.tasks || []).map((task: any) => ({
      ...task,
      processName: process.candidateName || process.title,
    }));
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Tasks Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage all your EB-1A tasks across all processes
          </p>
        </div>

        {/* Client Component with Tasks */}
        <TasksPageClient initialTasks={allTasks} processes={processes} />
      </div>
    </div>
  );
}
