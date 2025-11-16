'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    variant: 'outline' as const,
    color: 'text-muted-foreground',
  },
  IN_PROGRESS: {
    label: 'Em Progresso',
    icon: Clock,
    variant: 'default' as const,
    color: 'text-blue-500',
  },
  COMPLETED: {
    label: 'Concluída',
    icon: CheckCircle2,
    variant: 'default' as const,
    color: 'text-green-500',
  },
  WITH_UPLOAD: {
    label: 'Com Upload',
    icon: Upload,
    variant: 'secondary' as const,
    color: 'text-purple-500',
  },
  BLOCKED: {
    label: 'Bloqueada',
    icon: Circle,
    variant: 'destructive' as const,
    color: 'text-red-500',
  },
};

export function TaskCard({ task, onEdit, onDelete, showUploads = false }: TaskCardProps) {
  const status = statusConfig[task.status as keyof typeof statusConfig] || statusConfig.PENDING;
  const StatusIcon = status.icon;
  const uploadCount = task.uploads?.length || 0;

  return (
    <Card className={cn('transition-shadow hover:shadow-md')}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="line-clamp-2 text-base">{task.title}</CardTitle>
            {task.description && (
              <CardDescription className="mt-1 line-clamp-2">
                {task.description}
              </CardDescription>
            )}
          </div>
          <Badge variant={status.variant} className="ml-2 flex-shrink-0">
            <StatusIcon className={cn('mr-1 h-3 w-3', status.color)} />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {showUploads && (
          <div className="border-t pt-3 mt-3">
            <FileUpload taskId={task.id} />
          </div>
        )}
        {!showUploads && uploadCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Upload className="h-3 w-3" />
            <span>{uploadCount} arquivo{uploadCount > 1 ? 's' : ''}</span>
          </div>
        )}
        {task.dependsOn && task.dependsOn.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Depende de {task.dependsOn.length} tarefa{task.dependsOn.length > 1 ? 's' : ''}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString('pt-BR')}
          </span>
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="h-7 w-7 p-0"
              >
                <Pencil className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

