/**
 * Service for calculating process statistics
 * Used for dashboard and progress tracking
 */

import { getTasksByProcessId } from './taskService';
import { getCriteriaByProcessId } from './criteriaService';
import { getLettersByProcessId } from './letterService';
import { calculateTimelineProgress } from './timelineService';
import type { Process } from '@/types/database';

export interface ProcessStats {
  // Task statistics
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  taskProgress: number; // 0-100

  // Timeline statistics
  daysElapsed: number;
  totalDays: number;
  timelineProgress: number; // 0-100
  nextMilestone?: {
    day: number;
    label: string;
    daysRemaining: number;
  };

  // Criteria statistics
  totalCriteria: number;
  validatedCriteria: number;
  criteriaProgress: number; // 0-100

  // Letters statistics
  totalLetters: number;
  completedLetters: number;
  lettersProgress: number; // 0-100

  // Overall progress
  overallProgress: number; // 0-100
}

/**
 * Calculate comprehensive statistics for a process
 */
export async function calculateProcessStats(
  process: Process,
  startDate?: Date | null
): Promise<ProcessStats> {
  // Get all tasks
  const tasks = await getTasksByProcessId(process.id);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === 'COMPLETED' || t.status === 'WITH_UPLOAD'
  ).length;
  const pendingTasks = tasks.filter((t) => t.status === 'PENDING').length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === 'IN_PROGRESS'
  ).length;
  const taskProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get criteria
  const criteria = await getCriteriaByProcessId(process.id);
  const totalCriteria = criteria.length;
  const validatedCriteria = criteria.filter((c) => c.isValidated).length;
  const criteriaProgress =
    totalCriteria > 0
      ? Math.round((validatedCriteria / totalCriteria) * 100)
      : 0;

  // Get letters
  const letters = await getLettersByProcessId(process.id);
  const totalLetters = letters.length;
  const completedLetters = letters.filter(
    (l) => l.status === 'final' || l.status === 'signed'
  ).length;
  const lettersProgress =
    totalLetters > 0
      ? Math.round((completedLetters / totalLetters) * 100)
      : 0;

  // Calculate timeline progress
  const timelineData = calculateTimelineProgress(
    startDate || process.createdAt,
    process.currentPhase,
    process.progress,
    completedTasks,
    totalTasks
  );

  // Calculate overall progress (weighted average)
  // Tasks: 40%, Criteria: 40%, Letters: 20%
  const overallProgress = Math.round(
    taskProgress * 0.4 + criteriaProgress * 0.4 + lettersProgress * 0.2
  );

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    taskProgress,
    daysElapsed: timelineData.currentDay,
    totalDays: timelineData.totalDays,
    timelineProgress: timelineData.progressPercentage,
    nextMilestone: timelineData.nextMilestone,
    totalCriteria,
    validatedCriteria,
    criteriaProgress,
    totalLetters,
    completedLetters,
    lettersProgress,
    overallProgress,
  };
}

/**
 * Get next actions for a process (prioritized tasks)
 */
export async function getNextActions(processId: string) {
  const tasks = await getTasksByProcessId(processId);

  // Filter pending and in-progress tasks
  const actionableTasks = tasks.filter(
    (t) => t.status === 'PENDING' || t.status === 'IN_PROGRESS'
  );

  // Sort by priority (based on phase and order)
  const phasePriority: Record<string, number> = {
    ELIGIBILITY: 5,
    EVIDENCE: 4,
    LETTERS: 3,
    PETITION: 2,
    FILING: 1,
  };

  const sortedTasks = actionableTasks.sort((a, b) => {
    const phaseDiff = phasePriority[b.phase] - phasePriority[a.phase];
    if (phaseDiff !== 0) return phaseDiff;
    return a.order - b.order;
  });

  // Map to NextAction format
  return sortedTasks.slice(0, 10).map((task, idx) => {
    let priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
    if (task.status === 'IN_PROGRESS') priority = 'HIGH';
    if (task.phase === 'FILING' || task.phase === 'PETITION') priority = 'HIGH';
    if (idx < 2) priority = 'URGENT';

    return {
      id: task.id,
      priority,
      title: task.title,
      description: task.description || undefined,
      href: `/dashboard/process/${processId}?task=${task.id}`,
      phase: task.phase,
    };
  });
}

