/**
 * Custom hook for Task operations
 * Uses TanStack Query for caching and state management
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  type CreateTaskInput,
  type UpdateTaskInput,
} from '@/lib/api/tasks';
import type { Task } from '@/types/database';

const QUERY_KEYS = {
  tasks: (processId: string, phase?: Task['phase']) =>
    ['tasks', processId, phase] as const,
  task: (id: string) => ['tasks', id] as const,
};

/**
 * Get tasks by process ID
 */
export function useTasks(processId: string, phase?: Task['phase']) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks(processId, phase),
    queryFn: () => getTasks(processId, phase),
    enabled: !!processId,
  });
}

/**
 * Get task by ID
 */
export function useTask(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.task(id),
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
}

/**
 * Create task mutation
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', data.processId],
      });
    },
  });
}

/**
 * Update task mutation
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      updateTask(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', data.processId],
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.task(data.id) });
    },
  });
}

/**
 * Delete task mutation
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}



