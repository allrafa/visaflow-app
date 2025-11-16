import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { prisma } from '@/lib/db/client';
import { TasksPageClient } from '@/components/tasks/TasksPageClient';

export default async function TasksPage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Fetch all processes with their tasks
  const processes = await prisma.process.findMany({
    where: { userId: user.id },
    include: {
      tasks: {
        orderBy: { order: 'asc' },
      },
    },
  });

  // Gather all tasks from all processes
  const allTasks = processes.flatMap((process) => {
    return (process.tasks || []).map((task) => ({
      ...task,
      processName: process.title,
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
