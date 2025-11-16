import { z } from 'zod';

export const createProcessSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title too long (max 200 characters)'),
  description: z
    .string()
    .max(5000, 'Description too long (max 5000 characters)')
    .optional(),
  northStar: z
    .string()
    .max(10000, 'North Star statement too long (max 10000 characters)')
    .optional(),
});

export const updateProcessSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title too long (max 200 characters)')
    .optional(),
  description: z
    .string()
    .max(5000, 'Description too long (max 5000 characters)')
    .optional(),
  northStar: z
    .string()
    .max(10000, 'North Star statement too long (max 10000 characters)')
    .optional(),
  currentPhase: z
    .enum([
      'ELIGIBILITY',
      'EVIDENCE',
      'LETTERS',
      'PETITION',
      'FILING',
    ])
    .optional(),
  progress: z.number().min(0).max(100).optional(),
});

export type CreateProcessInput = z.infer<typeof createProcessSchema>;
export type UpdateProcessInput = z.infer<typeof updateProcessSchema>;



