import { z } from 'zod';

export const createTaskSchema = z.object({
  processId: z.string().uuid('Invalid process ID'),
  phase: z.enum([
    'ELIGIBILITY',
    'EVIDENCE',
    'LETTERS',
    'PETITION',
    'FILING',
  ]),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title too long (max 200 characters)'),
  description: z
    .string()
    .max(5000, 'Description too long (max 5000 characters)')
    .optional(),
  status: z
    .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'WITH_UPLOAD', 'BLOCKED'])
    .default('PENDING')
    .optional(),
  order: z.number().int().min(0).default(0).optional(),
  dependsOn: z.array(z.string().uuid()).max(10, 'Maximum 10 dependencies').optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title too long (max 200 characters)')
    .optional(),
  description: z
    .string()
    .max(5000, 'Description too long (max 5000 characters)')
    .optional(),
  status: z
    .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'WITH_UPLOAD', 'BLOCKED'])
    .optional(),
  order: z.number().int().min(0).optional(),
  dependsOn: z.array(z.string().uuid()).max(10, 'Maximum 10 dependencies').optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;



