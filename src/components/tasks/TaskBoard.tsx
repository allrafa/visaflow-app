'use client';

import { useMemo, useEffect } from 'react';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { TaskListSkeleton, Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/lib/hooks/useToast';
import { useTasks, useDeleteTask } from '@/lib/hooks/useTasks';
import { PROCESS_PHASES } from '@/lib/constants/phases';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Task } from '@/types/database';

interface TaskBoardProps {
  processId: string;
  onTaskClick?: (task: Task) => void;
  onNewTask?: (phase: string) => void;
  refreshKey?: number; // Força reload quando muda
}

export function TaskBoard({ processId, onTaskClick, onNewTask, refreshKey }: TaskBoardProps) {
  const { data: allTasks, isLoading, error, refetch } = useTasks(processId);
  const deleteTaskMutation = useDeleteTask();
  const { addToast } = useToast();

  // Agrupar tasks por fase
  const tasks = useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    PROCESS_PHASES.forEach((phase) => {
      grouped[phase.id] = [];
    });
    
    if (allTasks) {
      allTasks.forEach((task: Task) => {
        if (grouped[task.phase]) {
          grouped[task.phase].push(task);
        }
      });
    }
    
    return grouped;
  }, [allTasks]);

  // Refetch quando refreshKey muda
  useEffect(() => {
    if (refreshKey !== undefined) {
      refetch();
    }
  }, [refreshKey, refetch]);

  const handleTaskEdit = (task: Task) => {
    if (onTaskClick) {
      onTaskClick(task);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) {
      return;
    }

    try {
      await deleteTaskMutation.mutateAsync(taskId);
      addToast({
        type: 'success',
        title: 'Tarefa deletada',
        description: 'A tarefa foi removida com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar tarefa',
        description: err instanceof Error ? err.message : 'Falha ao deletar tarefa',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {PROCESS_PHASES.map((phase) => (
          <div key={phase.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64 mt-2" />
              </div>
            </div>
            <TaskListSkeleton count={2} />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error instanceof Error ? error.message : 'Failed to load tasks'} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      {PROCESS_PHASES.map((phase) => {
        const phaseTasks = tasks[phase.id] || [];
        return (
          <div key={phase.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {phase.order}. {phase.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {phase.description}
                </p>
              </div>
              {onNewTask && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNewTask(phase.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Tarefa
                </Button>
              )}
            </div>
            {phaseTasks.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhuma tarefa nesta fase
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {phaseTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleTaskEdit}
                    onDelete={handleTaskDelete}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

