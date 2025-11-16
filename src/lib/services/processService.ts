import { prisma } from '../db/client';
import { NotFoundError } from '../errors/AppError';
import { seedDefaultTasks } from './taskSeedService';

export type ProcessPhase =
  | 'ELIGIBILITY'
  | 'EVIDENCE'
  | 'LETTERS'
  | 'PETITION'
  | 'FILING';

export interface CreateProcessInput {
  userId: string;
  title: string;
  description?: string;
  northStar?: string;
}

export interface UpdateProcessInput {
  title?: string;
  description?: string;
  northStar?: string;
  currentPhase?: ProcessPhase;
  progress?: number;
}

/**
 * Create a new process with default tasks
 */
export async function createProcess(input: CreateProcessInput) {
  const process = await prisma.process.create({
    data: {
      userId: input.userId,
      title: input.title,
      description: input.description,
      northStar: input.northStar,
      currentPhase: 'ELIGIBILITY',
      progress: 0,
    },
  });

  // Seed default tasks for all phases
  await seedDefaultTasks(process.id);

  return process;
}

/**
 * Get process by ID
 * @throws {NotFoundError} If process not found
 */
export async function getProcessById(processId: string, userId: string) {
  const process = await prisma.process.findFirst({
    where: {
      id: processId,
      userId,
    },
    include: {
      tasks: {
        orderBy: { order: 'asc' },
      },
      criteria: true,
      letters: true,
    },
  });

  if (!process) {
    throw new NotFoundError('Process', processId);
  }

  return process;
}

/**
 * Get all processes for a user
 */
export async function getProcessesByUserId(userId: string) {
  return prisma.process.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      _count: {
        select: {
          tasks: true,
          criteria: true,
          letters: true,
        },
      },
    },
  });
}

/**
 * Update process
 * @throws {NotFoundError} If process not found
 */
export async function updateProcess(
  processId: string,
  userId: string,
  input: UpdateProcessInput
) {
  // Verify ownership
  const existing = await prisma.process.findFirst({
    where: {
      id: processId,
      userId,
    },
  });

  if (!existing) {
    throw new NotFoundError('Process', processId);
  }

  return prisma.process.update({
    where: {
      id: processId,
    },
    data: input,
  });
}

/**
 * Delete process
 * @throws {NotFoundError} If process not found
 */
export async function deleteProcess(processId: string, userId: string) {
  // Verify ownership
  const existing = await prisma.process.findFirst({
    where: {
      id: processId,
      userId,
    },
  });

  if (!existing) {
    throw new NotFoundError('Process', processId);
  }

  return prisma.process.delete({
    where: {
      id: processId,
    },
  });
}

