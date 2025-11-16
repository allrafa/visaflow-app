/**
 * Custom hook for Process operations
 * Uses TanStack Query for caching and state management
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProcesses,
  getProcessById,
  createProcess,
  updateProcess,
  deleteProcess,
  type CreateProcessInput,
  type UpdateProcessInput,
} from '@/lib/api/processes';
import type { Process } from '@/types/database';

const QUERY_KEYS = {
  processes: ['processes'] as const,
  process: (id: string) => ['processes', id] as const,
};

/**
 * Get all processes
 */
export function useProcesses() {
  return useQuery({
    queryKey: QUERY_KEYS.processes,
    queryFn: getProcesses,
  });
}

/**
 * Get process by ID
 */
export function useProcess(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.process(id),
    queryFn: () => getProcessById(id),
    enabled: !!id,
  });
}

/**
 * Create process mutation
 */
export function useCreateProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.processes });
    },
  });
}

/**
 * Update process mutation
 */
export function useUpdateProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateProcessInput }) =>
      updateProcess(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.processes });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.process(data.id) });
    },
  });
}

/**
 * Delete process mutation
 */
export function useDeleteProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.processes });
    },
  });
}



