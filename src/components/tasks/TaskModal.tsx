'use client';

import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTasks, useCreateTask, useUpdateTask } from '@/lib/hooks/useTasks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { createTaskSchema, updateTaskSchema, type CreateTaskInput, type UpdateTaskInput } from '@/lib/validators/task.schema';
import { PROCESS_PHASES } from '@/lib/constants/phases';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useToast } from '@/lib/hooks/useToast';
import { FileUpload } from '@/components/shared/FileUpload';
import type { Task } from '@/types/database';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  processId: string;
  task?: Task | null;
  phase?: string;
  onSuccess?: () => void;
}

export function TaskModal({
  open,
  onClose,
  processId,
  task,
  phase,
  onSuccess,
}: TaskModalProps) {
  const isEdit = !!task;
  const { addToast } = useToast();
  const { data: availableTasksData, isLoading: loadingTasks } = useTasks(processId);
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  
  // Filtrar a task atual se estiver editando
  const availableTasks = useMemo(() => {
    if (!availableTasksData) return [];
    return isEdit && task
      ? availableTasksData.filter((t: Task) => t.id !== task.id)
      : availableTasksData;
  }, [availableTasksData, isEdit, task]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateTaskInput | UpdateTaskInput>({
    resolver: zodResolver(isEdit ? updateTaskSchema : createTaskSchema),
    defaultValues: {
      processId,
      phase: phase as any,
      status: 'PENDING',
      order: 0,
      dependsOn: [],
    },
  });

  const selectedDependsOn = watch('dependsOn') || [];

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || undefined,
        status: task.status as any,
        order: task.order,
        dependsOn: task.dependsOn || [],
      });
    } else {
      reset({
        processId,
        phase: phase as any,
        status: 'PENDING',
        order: 0,
      });
    }
  }, [task, processId, phase, reset]);

  const onSubmit = async (data: CreateTaskInput | UpdateTaskInput) => {
    try {
      const taskData = {
        ...data,
        processId,
        phase: phase || (task?.phase as any),
      };

      if (isEdit && task) {
        await updateTaskMutation.mutateAsync({
          id: task.id,
          input: taskData as UpdateTaskInput,
        });
      } else {
        await createTaskMutation.mutateAsync(taskData as CreateTaskInput);
      }

      addToast({
        type: 'success',
        title: isEdit ? 'Tarefa atualizada' : 'Tarefa criada',
        description: isEdit 
          ? 'A tarefa foi atualizada com sucesso.'
          : 'A tarefa foi criada com sucesso.',
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao salvar tarefa',
        description: err instanceof Error ? err.message : 'Ocorreu um erro ao salvar a tarefa',
      });
    }
  };

  const submitting = createTaskMutation.isPending || updateTaskMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Atualize as informações da tarefa'
              : 'Preencha os dados da nova tarefa'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título *
            </label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Ex: Coletar evidências de prêmios"
              disabled={isEdit}
            />
            {errors.title && (
              <p className="text-sm text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descrição
            </label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descrição detalhada da tarefa"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {!isEdit && (
            <div className="space-y-2">
              <label htmlFor="phase" className="text-sm font-medium">
                Fase *
              </label>
              <Select
                value={watch('phase') || phase}
                onValueChange={(value) => setValue('phase', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a fase" />
                </SelectTrigger>
                <SelectContent>
                  {PROCESS_PHASES.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.order}. {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select
              value={watch('status') || 'PENDING'}
              onValueChange={(value) => setValue('status', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                <SelectItem value="COMPLETED">Concluída</SelectItem>
                <SelectItem value="WITH_UPLOAD">Com Upload</SelectItem>
                <SelectItem value="BLOCKED">Bloqueada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="order" className="text-sm font-medium">
              Ordem
            </label>
            <Input
              id="order"
              type="number"
              {...register('order', { valueAsNumber: true })}
              min={0}
            />
            {errors.order && (
              <p className="text-sm text-destructive">
                {errors.order.message}
              </p>
            )}
          </div>

          {availableTasks.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Dependências (opcional)
              </label>
              <p className="text-xs text-muted-foreground">
                Selecione as tarefas que devem ser concluídas antes desta
              </p>
              <div className="max-h-48 overflow-y-auto rounded-lg border p-3 space-y-2">
                {loadingTasks ? (
                  <div className="flex items-center justify-center py-4">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  availableTasks.map((availableTask) => {
                    const isSelected = selectedDependsOn.includes(availableTask.id);
                    return (
                      <div
                        key={availableTask.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`depends-${availableTask.id}`}
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            const current = selectedDependsOn || [];
                            if (checked) {
                              setValue('dependsOn', [...current, availableTask.id]);
                            } else {
                              setValue(
                                'dependsOn',
                                current.filter((id) => id !== availableTask.id)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`depends-${availableTask.id}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          <span className="font-medium">{availableTask.title}</span>
                          <span className="text-muted-foreground ml-2">
                            ({PROCESS_PHASES.find((p) => p.id === availableTask.phase)?.label || availableTask.phase})
                          </span>
                        </label>
                      </div>
                    );
                  })
                )}
              </div>
              {errors.dependsOn && (
                <p className="text-sm text-destructive">
                  {errors.dependsOn.message}
                </p>
              )}
            </div>
          )}

          {isEdit && task && (
            <div className="space-y-2 border-t pt-4">
              <FileUpload
                taskId={task.id}
                onUploadSuccess={() => {
                  // Refresh task data if needed
                  addToast({
                    type: 'info',
                    title: 'Upload concluído',
                    description: 'Arquivo anexado à tarefa com sucesso.',
                  });
                }}
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  {isEdit ? 'Salvando...' : 'Criando...'}
                </>
              ) : (
                isEdit ? 'Salvar' : 'Criar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

