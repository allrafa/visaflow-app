/**
 * API Client Functions for Criteria
 */

import { get, post, put } from './client';
import type { CriteriaEvidence } from '@/types/database';

export interface CreateCriteriaInput {
  processId: string;
  criteria: CriteriaEvidence['criteria'];
  overview?: string;
  context?: string;
  impact?: string;
  evidence?: string;
}

export interface UpdateCriteriaInput {
  overview?: string;
  context?: string;
  impact?: string;
  evidence?: string;
}

/**
 * Get criteria by process ID
 */
export async function getCriteria(processId: string): Promise<CriteriaEvidence[]> {
  const params = new URLSearchParams({ processId });
  return get<CriteriaEvidence[]>(`/criteria?${params.toString()}`);
}

/**
 * Get criteria by ID
 */
export async function getCriteriaById(id: string): Promise<CriteriaEvidence> {
  return get<CriteriaEvidence>(`/criteria/${id}`);
}

/**
 * Create new criteria
 */
export async function createCriteria(
  input: CreateCriteriaInput
): Promise<CriteriaEvidence> {
  return post<CriteriaEvidence>('/criteria', input);
}

/**
 * Update criteria
 */
export async function updateCriteria(
  id: string,
  input: UpdateCriteriaInput
): Promise<CriteriaEvidence> {
  return put<CriteriaEvidence>(`/criteria/${id}`, input);
}



