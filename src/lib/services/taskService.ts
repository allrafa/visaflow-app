import { prisma } from '../db/client';
import { NotFoundError, ValidationError } from '../errors/AppError';

export type ProcessPhase =
  | 'ELIGIBILITY'
  | 'EVIDENCE'
  | 'LETTERS'
  | 'PETITION'
  | 'FILING';

export type TaskStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'WITH_UPLOAD'
  | 'BLOCKED';

export interface CreateTaskInput {
  processId: string;
  phase: ProcessPhase;
  title: string;
  description?: string;
  status?: TaskStatus;
  order?: number;
  dependsOn?: string[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  order?: number;
  dependsOn?: string[];
  completedAt?: Date | null;
}

/**
 * Create a new task
 */
export async function createTask(input: CreateTaskInput) {
  // Validate dependencies exist
  if (input.dependsOn && input.dependsOn.length > 0) {
    const dependencies = await prisma.task.findMany({
      where: {
        id: { in: input.dependsOn },
        processId: input.processId,
      },
    });

    if (dependencies.length !== input.dependsOn.length) {
      throw new ValidationError('Some dependencies do not exist');
    }
  }

  return prisma.task.create({
    data: {
      processId: input.processId,
      phase: input.phase,
      title: input.title,
      description: input.description,
      status: input.status || 'PENDING',
      order: input.order || 0,
      dependsOn: input.dependsOn || [],
    },
  });
}

/**
 * Get task by ID
 * @throws {NotFoundError} If task not found
 */
export async function getTaskById(taskId: string) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      process: true,
      uploads: true,
    },
  });

  if (!task) {
    throw new NotFoundError('Task', taskId);
  }

  return task;
}

/**
 * Get tasks by process ID
 */
export async function getTasksByProcessId(
  processId: string,
  phase?: ProcessPhase
) {
  return prisma.task.findMany({
    where: {
      processId,
      ...(phase && { phase }),
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'asc' },
    ],
    include: {
      uploads: true,
    },
  });
}

/**
 * Update task
 * @throws {NotFoundError} If task not found
 */
export async function updateTask(taskId: string, input: UpdateTaskInput) {
  const existing = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!existing) {
    throw new NotFoundError('Task', taskId);
  }

  // Validate dependencies if updating
  if (input.dependsOn && input.dependsOn.length > 0) {
    const dependencies = await prisma.task.findMany({
      where: {
        id: { in: input.dependsOn },
        processId: existing.processId,
      },
    });

    if (dependencies.length !== input.dependsOn.length) {
      throw new ValidationError('Some dependencies do not exist');
    }
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...input,
      completedAt: input.status === 'COMPLETED' && !input.completedAt
        ? new Date()
        : input.completedAt,
    },
  });
}

/**
 * Delete task
 * @throws {NotFoundError} If task not found
 */
export async function deleteTask(taskId: string) {
  const existing = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!existing) {
    throw new NotFoundError('Task', taskId);
  }

  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
}

