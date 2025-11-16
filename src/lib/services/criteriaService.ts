import { prisma } from '../db/client';
import { NotFoundError, ValidationError } from '../errors/AppError';

export interface CreateCriteriaInput {
  processId: string;
  criteria: string;
  overview?: string;
  context?: string;
  impact?: string;
  evidence?: string;
  metricsData?: unknown;
}

export interface UpdateCriteriaInput {
  overview?: string | null;
  context?: string | null;
  impact?: string | null;
  evidence?: string | null;
  metricsData?: unknown;
  isValidated?: boolean;
  validationScore?: number | null;
  validationIssues?: unknown;
}

/**
 * Create criteria evidence
 */
export async function createCriteria(input: CreateCriteriaInput) {
  // Verificar se processo existe
  const process = await prisma.process.findUnique({
    where: { id: input.processId },
  });

  if (!process) {
    throw new NotFoundError('Process', input.processId);
  }

  // Verificar se já existe critério para este processo
  const existing = await prisma.criteriaEvidence.findFirst({
    where: {
      processId: input.processId,
      criteria: input.criteria as any,
    },
  });

  if (existing) {
    throw new ValidationError(
      `Criteria ${input.criteria} already exists for this process`
    );
  }

  return prisma.criteriaEvidence.create({
    data: {
      processId: input.processId,
      criteria: input.criteria as any,
      overview: input.overview ?? null,
      context: input.context ?? null,
      impact: input.impact ?? null,
      evidence: input.evidence ?? null,
      metricsData: input.metricsData as any,
    },
  });
}

/**
 * Get criteria by ID
 */
export async function getCriteriaById(criteriaId: string) {
  const criteria = await prisma.criteriaEvidence.findUnique({
    where: { id: criteriaId },
    include: {
      process: true,
    },
  });

  if (!criteria) {
    throw new NotFoundError('Criteria', criteriaId);
  }

  return criteria;
}

/**
 * Get criteria by process ID
 */
export async function getCriteriaByProcessId(processId: string) {
  return prisma.criteriaEvidence.findMany({
    where: { processId },
    orderBy: { createdAt: 'asc' },
  });
}

/**
 * Update criteria
 */
export async function updateCriteria(
  criteriaId: string,
  input: UpdateCriteriaInput
) {
  const existing = await prisma.criteriaEvidence.findUnique({
    where: { id: criteriaId },
  });

  if (!existing) {
    throw new NotFoundError('Criteria', criteriaId);
  }

  return prisma.criteriaEvidence.update({
    where: { id: criteriaId },
    data: {
      ...input,
      metricsData: input.metricsData as any,
      validationScore: input.validationScore ?? null,
      validationIssues: input.validationIssues as any ?? null,
    },
  });
}

/**
 * Delete criteria
 */
export async function deleteCriteria(criteriaId: string) {
  const existing = await prisma.criteriaEvidence.findUnique({
    where: { id: criteriaId },
  });

  if (!existing) {
    throw new NotFoundError('Criteria', criteriaId);
  }

  return prisma.criteriaEvidence.delete({
    where: { id: criteriaId },
  });
}

