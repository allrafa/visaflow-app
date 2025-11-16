/**
 * Custom hook for Upload operations
 * Uses TanStack Query for caching and state management
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile, deleteUpload, downloadFile } from '@/lib/api/uploads';

/**
 * Upload file mutation
 */
export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, file }: { taskId: string; file: File }) =>
      uploadFile(taskId, file),
    onSuccess: (data) => {
      // Invalidate tasks to refresh upload list
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

/**
 * Delete upload mutation
 */
export function useDeleteUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

/**
 * Download file mutation
 */
export function useDownloadFile() {
  return useMutation({
    mutationFn: downloadFile,
  });
}



