/**
 * API Client Functions for Uploads
 */

import { get, upload, del } from './client';

export interface UploadResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  storagePath?: string;
}

export interface Upload {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  storagePath?: string;
}

/**
 * Get uploads by task ID
 */
export async function getUploads(taskId: string): Promise<Upload[]> {
  const params = new URLSearchParams({ taskId });
  return get<Upload[]>(`/uploads?${params.toString()}`);
}

/**
 * Upload file
 */
export async function uploadFile(
  taskId: string,
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('taskId', taskId);

  return upload<UploadResponse>('/uploads', formData);
}

/**
 * Download file
 */
export async function downloadFile(id: string): Promise<Blob> {
  const response = await fetch(`/api/uploads/${id}/download`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to download file');
  }

  return response.blob();
}

/**
 * Delete upload
 */
export async function deleteUpload(id: string): Promise<void> {
  return del<void>(`/uploads/${id}`);
}

