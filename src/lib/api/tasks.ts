/**
 * API Client Functions for Tasks
 */

import { get, post, put, del } from './client';
import type { Task } from '@/types/database';

export interface CreateTaskInput {
  processId: string;
  phase: Task['phase'];
  title: string;
  description?: string;
  status?: Task['status'];
  order?: number;
  dependsOn?: string[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: Task['status'];
  phase?: Task['phase'];
  order?: number;
  dependsOn?: string[];
}

/**
 * Get tasks by process ID
 */
export async function getTasks(
  processId: string,
  phase?: Task['phase']
): Promise<Task[]> {
  const params = new URLSearchParams({ processId });
  if (phase) {
    params.append('phase', phase);
  }
  return get<Task[]>(`/tasks?${params.toString()}`);
}

/**
 * Get task by ID
 */
export async function getTaskById(id: string): Promise<Task> {
  return get<Task>(`/tasks/${id}`);
}

/**
 * Create new task
 */
export async function createTask(input: CreateTaskInput): Promise<Task> {
  return post<Task>('/tasks', input);
}

/**
 * Update task
 */
export async function updateTask(
  id: string,
  input: UpdateTaskInput
): Promise<Task> {
  return put<Task>(`/tasks/${id}`, input);
}

/**
 * Delete task
 */
export async function deleteTask(id: string): Promise<void> {
  return del<void>(`/tasks/${id}`);
}




