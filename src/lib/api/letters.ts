/**
 * API Client Functions for Recommendation Letters
 */

import { get, post, put } from './client';
import type { RecommendationLetter } from '@/types/database';

export interface CreateLetterInput {
  processId: string;
  recommenderName: string;
  recommenderTitle: string;
  recommenderOrg?: string;
  recommenderEmail?: string;
  content?: string;
}

export interface UpdateLetterInput {
  recommenderName?: string;
  recommenderTitle?: string;
  recommenderOrg?: string;
  recommenderEmail?: string;
  content?: string;
  status?: RecommendationLetter['status'];
}

/**
 * Get letters by process ID
 */
export async function getLetters(
  processId: string
): Promise<RecommendationLetter[]> {
  const params = new URLSearchParams({ processId });
  return get<RecommendationLetter[]>(`/letters?${params.toString()}`);
}

/**
 * Get letter by ID
 */
export async function getLetterById(id: string): Promise<RecommendationLetter> {
  return get<RecommendationLetter>(`/letters/${id}`);
}

/**
 * Create new letter
 */
export async function createLetter(
  input: CreateLetterInput
): Promise<RecommendationLetter> {
  return post<RecommendationLetter>('/letters', input);
}

/**
 * Update letter
 */
export async function updateLetter(
  id: string,
  input: UpdateLetterInput
): Promise<RecommendationLetter> {
  return put<RecommendationLetter>(`/letters/${id}`, input);
}




