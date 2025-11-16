import { prisma } from '../db/client';
import { DEFAULT_TASKS } from '../constants/default-tasks';

/**
 * Seeds default tasks for a new process
 * Creates all 30 default tasks across 5 phases
 */
export async function seedDefaultTasks(processId: string): Promise<void> {
  const tasksToCreate = DEFAULT_TASKS.map((task, index) => ({
    processId,
    phase: task.phase,
    title: task.title,
    description: task.description,
    status: 'PENDING' as const,
    order: task.order,
    dependsOn: task.dependsOn || [],
  }));

  // Create all tasks in a single transaction
  await prisma.task.createMany({
    data: tasksToCreate,
    skipDuplicates: true,
  });
}

/**
 * Seeds tasks for a specific phase only
 * Useful when user advances to next phase
 */
export async function seedTasksForPhase(
  processId: string,
  phase: 'ELIGIBILITY' | 'EVIDENCE' | 'LETTERS' | 'PETITION' | 'FILING'
): Promise<void> {
  const phaseTasks = DEFAULT_TASKS.filter((task) => task.phase === phase);

  const tasksToCreate = phaseTasks.map((task) => ({
    processId,
    phase: task.phase,
    title: task.title,
    description: task.description,
    status: 'PENDING' as const,
    order: task.order,
    dependsOn: task.dependsOn || [],
  }));

  await prisma.task.createMany({
    data: tasksToCreate,
    skipDuplicates: true,
  });
}

/**
 * Check if process has tasks seeded
 */
export async function hasSeededTasks(processId: string): Promise<boolean> {
  const taskCount = await prisma.task.count({
    where: { processId },
  });

  return taskCount > 0;
}
