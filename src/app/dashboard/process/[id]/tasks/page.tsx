import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessById } from '@/lib/services/processService';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TaskTableSection } from './TaskTableSection';

interface TasksPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ phase?: string }>;
}

const PHASE_LABELS: Record<string, string> = {
  ELIGIBILITY: '1. Elegibilidade e Estratégia',
  EVIDENCE: '2. Evidências',
  LETTERS: '3. Cartas de Recomendação',
  PETITION: '4. Dossiê Final (I-140)',
  FILING: '5. Protocolo e Acompanhamento',
};

export default async function TasksPage({ params, searchParams }: TasksPageProps) {
  const { id } = await params;
  const { phase } = await searchParams;

  // Get authenticated user
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Fetch process with tasks
  let process;
  try {
    process = await getProcessById(id, user.id);
  } catch {
    redirect('/dashboard');
  }

  // Filter tasks by phase if specified
  const filteredTasks = phase
    ? process.tasks.filter((task: any) => task.phase === phase)
    : process.tasks;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <Link href={`/dashboard/process/${id}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Processo
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {phase ? PHASE_LABELS[phase] : 'Todas as Tarefas'}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Processo: {process.title}
              </p>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          }
        >
          <TaskTableSection
            initialTasks={filteredTasks}
            processId={process.id}
            initialPhaseFilter={phase || 'ALL'}
          />
        </Suspense>
      </div>
    </div>
  );
}
