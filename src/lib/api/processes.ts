/**
 * API Client Functions for Processes
 */

import { get, post, put, del } from './client';
import type { Process } from '@/types/database';

export interface CreateProcessInput {
  title: string;
  description?: string;
  northStar?: string;
}

export interface UpdateProcessInput {
  title?: string;
  description?: string;
  northStar?: string;
  currentPhase?: Process['currentPhase'];
  progress?: number;
}

/**
 * Get all processes for current user
 */
export async function getProcesses(): Promise<Process[]> {
  return get<Process[]>('/processes');
}

/**
 * Get process by ID
 */
export async function getProcessById(id: string): Promise<Process> {
  return get<Process>(`/processes/${id}`);
}

/**
 * Create new process
 */
export async function createProcess(
  input: CreateProcessInput
): Promise<Process> {
  return post<Process>('/processes', input);
}

/**
 * Update process
 */
export async function updateProcess(
  id: string,
  input: UpdateProcessInput
): Promise<Process> {
  return put<Process>(`/processes/${id}`, input);
}

/**
 * Delete process
 */
export async function deleteProcess(id: string): Promise<void> {
  return del<void>(`/processes/${id}`);
}



