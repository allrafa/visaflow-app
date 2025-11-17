'use client';

import { useState } from 'react';
import { Task } from '@/types/database';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CheckCircle2,
  Circle,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
  FileText,
  Calendar,
  User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TaskDetailModal } from './TaskDetailModal';

interface TaskTableProps {
  tasks: Task[];
  onTaskUpdate?: (taskId: string, data: Partial<Task>) => Promise<void>;
  onTaskDelete?: (taskId: string) => Promise<void>;
}

const PHASE_LABELS: Record<string, string> = {
  ELIGIBILITY: '1. Elegibilidade',
  EVIDENCE: '2. Evidências',
  LETTERS: '3. Cartas',
  PETITION: '4. Dossiê Final',
  FILING: '5. Protocolo',
};

const STATUS_CONFIG = {
  PENDING: {
    label: 'Pendente',
    icon: Circle,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted text-muted-foreground',
  },
  IN_PROGRESS: {
    label: 'Em Progresso',
    icon: Clock,
    color: 'text-primary',
    bgColor: 'bg-primary-light text-primary',
  },
  UNDER_REVIEW: {
    label: 'Em Revisão',
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning-bg text-warning border border-warning-border',
  },
  COMPLETED: {
    label: 'Concluída',
    icon: CheckCircle2,
    color: 'text-success',
    bgColor: 'bg-success-bg text-success border border-success-border',
  },
  WITH_UPLOAD: {
    label: 'Com Anexo',
    icon: FileText,
    color: 'text-info',
    bgColor: 'bg-info-bg text-info border border-info-border',
  },
  BLOCKED: {
    label: 'Bloqueada',
    icon: Circle,
    color: 'text-destructive',
    bgColor: 'bg-destructive-bg text-destructive border border-destructive-border',
  },
};

export function TaskTable({ tasks, onTaskUpdate, onTaskDelete }: TaskTableProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleSaveTask = async (taskId: string, data: Partial<Task>) => {
    await onTaskUpdate?.(taskId, data);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Tarefa
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Fase
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </th>
                {/* TODO: Uncomment when created_by_id migration is applied */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Autor
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Criado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Atualizado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-border">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <FileText className="h-12 w-12 opacity-20" />
                      <p className="text-sm font-medium">Nenhuma tarefa encontrada</p>
                      <p className="text-xs">As tarefas aparecerão aqui</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => {
                  const statusConfig = STATUS_CONFIG[task.status as keyof typeof STATUS_CONFIG];
                  const StatusIcon = statusConfig.icon;
                  const isHovered = hoveredRow === task.id;

                  return (
                    <tr
                      key={task.id}
                      onMouseEnter={() => setHoveredRow(task.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => handleTaskClick(task)}
                      className={`
                        cursor-pointer transition-all duration-200
                        ${isHovered ? 'bg-primary-light/30 shadow-sm' : 'bg-card hover:bg-muted/30'}
                      `}
                    >
                      {/* Título */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <StatusIcon
                            className={`mt-0.5 h-5 w-5 flex-shrink-0 ${statusConfig.color}`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground line-clamp-2">
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                                {task.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Fase */}
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="font-normal">
                          {PHASE_LABELS[task.phase]}
                        </Badge>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <Badge className={statusConfig.bgColor}>
                          {statusConfig.label}
                        </Badge>
                      </td>

                      {/* TODO: Uncomment when created_by_id migration is applied */}
                      {/* Autor */}
                      {/* <td className="px-6 py-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 cursor-help">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {(task as any).createdBy?.name || (task as any).createdBy?.email || 'Sistema'}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <div className="space-y-1">
                                <p className="font-semibold">
                                  {(task as any).createdBy?.name || (task as any).createdBy?.email || 'Sistema Automático'}
                                </p>
                                {(task as any).createdBy?.email && (task as any).createdBy?.name && (
                                  <p className="text-xs text-gray-400">{(task as any).createdBy.email}</p>
                                )}
                                <p className="text-xs text-gray-400">
                                  Criado em: {format(new Date(task.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td> */}

                      {/* Criado */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDistanceToNow(new Date(task.createdAt), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Atualizado */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(task.updatedAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </div>
                      </td>

                      {/* Ações */}
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleTaskClick(task);
                            }}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                onTaskDelete?.(task.id);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Deletar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </>
  );
}
