import { z } from 'zod';

export const createLetterSchema = z.object({
  processId: z.string().uuid('Invalid process ID'),
  recommenderName: z.string().min(1, 'Recommender name is required'),
  recommenderTitle: z.string().min(1, 'Recommender title is required'),
  recommenderOrg: z.string().optional(),
  recommenderEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  content: z.string().optional(),
  status: z.enum(['draft', 'review', 'final', 'signed']).default('draft'),
});

export const updateLetterSchema = z.object({
  recommenderName: z.string().min(1).optional(),
  recommenderTitle: z.string().min(1).optional(),
  recommenderOrg: z.string().optional(),
  recommenderEmail: z.string().email().optional().or(z.literal('')),
  content: z.string().optional(),
  status: z.enum(['draft', 'review', 'final', 'signed']).optional(),
});

export type CreateLetterInput = z.infer<typeof createLetterSchema>;
export type UpdateLetterInput = z.infer<typeof updateLetterSchema>;



