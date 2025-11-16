import { z } from 'zod';

export const createCriteriaSchema = z.object({
  processId: z.string().uuid('Invalid process ID'),
  criteria: z.enum([
    'AWARDS',
    'MEMBERSHIP',
    'PRESS',
    'JUDGING',
    'ORIGINAL',
    'SCHOLARLY',
    'CRITICAL',
    'HIGH_SALARY',
    'EXHIBITIONS',
    'COMMERCIAL_SUCCESS',
  ]),
  overview: z
    .string()
    .max(10000, 'Overview too long (max 10000 characters)')
    .optional(),
  context: z
    .string()
    .max(10000, 'Context too long (max 10000 characters)')
    .optional(),
  impact: z
    .string()
    .max(10000, 'Impact too long (max 10000 characters)')
    .optional(),
  evidence: z
    .string()
    .max(10000, 'Evidence too long (max 10000 characters)')
    .optional(),
  metricsData: z.unknown().optional(),
});

export const updateCriteriaSchema = z.object({
  overview: z
    .string()
    .max(10000, 'Overview too long (max 10000 characters)')
    .optional(),
  context: z
    .string()
    .max(10000, 'Context too long (max 10000 characters)')
    .optional(),
  impact: z
    .string()
    .max(10000, 'Impact too long (max 10000 characters)')
    .optional(),
  evidence: z
    .string()
    .max(10000, 'Evidence too long (max 10000 characters)')
    .optional(),
  metricsData: z.unknown().optional(),
  isValidated: z.boolean().optional(),
  validationScore: z.number().min(0).max(100).optional(),
  validationIssues: z.unknown().optional(),
});

export type CreateCriteriaInput = z.infer<typeof createCriteriaSchema>;
export type UpdateCriteriaInput = z.infer<typeof updateCriteriaSchema>;



