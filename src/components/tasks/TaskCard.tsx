'use client';

import { Pencil, Trash2, CheckCircle2, Circle, Clock, Upload } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { FileUpload } from '@/components/shared/FileUpload';
import type { Task } from '@/types/database';

interface TaskCardProps {
  task: Task & {
    uploads?: Array<{ id: string; fileName: string }>;
  };
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  showUploads?: boolean;
}

const statusConfig = {
  PENDING: {
    label: 'Pendente',
    icon: Circle,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
  },
  IN_PROGRESS: {
    label: 'Em Progresso',
    icon: Clock,
    color: 'text-purple-2',
    bgColor: 'bg-purple-muted',
  },
  COMPLETED: {
    label: 'Concluída',
    icon: CheckCircle2,
    color: 'text-purple-3',
    bgColor: 'bg-purple-muted',
  },
  WITH_UPLOAD: {
    label: 'Com Upload',
    icon: Upload,
    color: 'text-purple-1',
    bgColor: 'bg-purple-muted',
  },
  BLOCKED: {
    label: 'Bloqueada',
    icon: Circle,
    color: 'text-destructive',
    bgColor: 'bg-destructive-muted',
  },
};

export function TaskCard({ task, onEdit, onDelete, showUploads = false }: TaskCardProps) {
  const status = statusConfig[task.status as keyof typeof statusConfig] || statusConfig.PENDING;
  const StatusIcon = status.icon;
  const uploadCount = task.uploads?.length || 0;

  return (
    <div className="card-hover p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-subtitle font-semibold line-clamp-2">{task.title}</h3>
          {task.description && (
            <p className="text-body text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        {/* Status Badge */}
        <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0', status.bgColor)}>
          <div className="icon-container">
            <StatusIcon className={cn('h-3.5 w-3.5', status.color)} />
          </div>
          <span className="text-small font-medium">{status.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {showUploads && (
          <div className="border-t border-border pt-3">
            <FileUpload taskId={task.id} />
          </div>
        )}
        {!showUploads && uploadCount > 0 && (
          <div className="flex items-center gap-1.5 text-small text-muted-foreground">
            <div className="icon-container">
              <Upload className="h-3.5 w-3.5 text-purple-2" />
            </div>
            <span>{uploadCount} arquivo{uploadCount > 1 ? 's' : ''}</span>
          </div>
        )}
        {task.dependsOn && task.dependsOn.length > 0 && (
          <div className="text-small text-muted-foreground">
            Depende de {task.dependsOn.length} tarefa{task.dependsOn.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-small text-muted-foreground">
          {new Date(task.createdAt).toLocaleDateString('pt-BR')}
        </span>
        <div className="flex gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="icon-container h-7 w-7 rounded hover:bg-muted transition-colors"
              title="Editar tarefa"
            >
              <Pencil className="h-3.5 w-3.5 text-purple-1" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="icon-container h-7 w-7 rounded hover:bg-destructive-muted transition-colors"
              title="Excluir tarefa"
            >
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

