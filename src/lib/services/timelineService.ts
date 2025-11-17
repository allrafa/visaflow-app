/**
 * Timeline service for calculating progress and estimates
 * Based on 300-day target timeline
 */

import type { ProcessPhase } from '@/types/database';

export interface TimelineProgress {
  currentDay: number;
  totalDays: number;
  progressPercentage: number;
  currentPhase: ProcessPhase;
  phaseProgress: number;
  completedTasks: number;
  totalTasks: number;
  taskProgressPercentage: number;
  nextMilestone?: {
    day: number;
    label: string;
    daysRemaining: number;
  };
  estimatedCompletionDate?: Date;
}

const PHASE_DURATIONS: Record<ProcessPhase, number> = {
  ELIGIBILITY: 60,
  EVIDENCE: 90, // 60-150
  LETTERS: 30, // 150-180
  PETITION: 30, // 180-210
  FILING: 90, // 210-300
};

const PHASE_START_DAYS: Record<ProcessPhase, number> = {
  ELIGIBILITY: 0,
  EVIDENCE: 60,
  LETTERS: 150,
  PETITION: 180,
  FILING: 210,
};

/**
 * Calculate timeline progress based on process data
 */
export function calculateTimelineProgress(
  startDate: Date | null,
  currentPhase: ProcessPhase,
  phaseProgress: number, // 0-100
  completedTasks: number,
  totalTasks: number = 289
): TimelineProgress {
  const totalDays = 300;
  let currentDay = 0;

  if (startDate) {
    const daysSinceStart = Math.floor(
      (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    currentDay = Math.max(0, Math.min(totalDays, daysSinceStart));
  } else {
    // Estimate based on phase and progress
    const phaseStartDay = PHASE_START_DAYS[currentPhase];
    const phaseDuration = PHASE_DURATIONS[currentPhase];
    currentDay = phaseStartDay + Math.floor((phaseProgress / 100) * phaseDuration);
  }

  const progressPercentage = (currentDay / totalDays) * 100;
  const taskProgressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Calculate phase-specific progress
  const phaseStartDay = PHASE_START_DAYS[currentPhase];
  const phaseDuration = PHASE_DURATIONS[currentPhase];
  const daysInPhase = currentDay - phaseStartDay;
  const calculatedPhaseProgress = Math.max(0, Math.min(100, (daysInPhase / phaseDuration) * 100));

  // Find next milestone
  const milestones = [
    { day: 14, label: 'Auto-avaliação completa', phase: 'ELIGIBILITY' },
    { day: 30, label: 'Estratégia definida', phase: 'ELIGIBILITY' },
    { day: 60, label: 'Evidências inventariadas', phase: 'ELIGIBILITY' },
    { day: 75, label: 'Primeiro critério completo', phase: 'EVIDENCE' },
    { day: 105, label: '3 critérios validados', phase: 'EVIDENCE' },
    { day: 150, label: 'Todos critérios finalizados', phase: 'EVIDENCE' },
    { day: 155, label: 'Recomendadores confirmados', phase: 'LETTERS' },
    { day: 170, label: 'Todas cartas recebidas', phase: 'LETTERS' },
    { day: 180, label: 'Cartas assinadas', phase: 'LETTERS' },
    { day: 195, label: 'Final Merits escrito', phase: 'PETITION' },
    { day: 205, label: 'Petição completa', phase: 'PETITION' },
    { day: 210, label: 'Validação final', phase: 'PETITION' },
    { day: 215, label: 'Petição enviada', phase: 'FILING' },
    { day: 224, label: 'Aprovação USCIS', phase: 'FILING' },
    { day: 240, label: 'NVC documentos', phase: 'FILING' },
    { day: 280, label: 'Entrevista agendada', phase: 'FILING' },
    { day: 300, label: 'Green Card! 🎉', phase: 'FILING' },
  ];

  const nextMilestone = milestones.find(m => m.day > currentDay);
  const daysRemaining = nextMilestone ? nextMilestone.day - currentDay : 0;

  // Estimate completion date
  let estimatedCompletionDate: Date | undefined;
  if (startDate && taskProgressPercentage > 0) {
    const remainingTasks = totalTasks - completedTasks;
    const tasksPerDay = completedTasks / Math.max(1, currentDay);
    const daysToComplete = Math.ceil(remainingTasks / tasksPerDay);
    estimatedCompletionDate = new Date(
      startDate.getTime() + (currentDay + daysToComplete) * 24 * 60 * 60 * 1000
    );
  }

  return {
    currentDay,
    totalDays,
    progressPercentage,
    currentPhase,
    phaseProgress: calculatedPhaseProgress,
    completedTasks,
    totalTasks,
    taskProgressPercentage,
    nextMilestone: nextMilestone
      ? {
          day: nextMilestone.day,
          label: nextMilestone.label,
          daysRemaining,
        }
      : undefined,
    estimatedCompletionDate,
  };
}

/**
 * Get estimated days remaining for current phase
 */
export function getPhaseDaysRemaining(
  currentPhase: ProcessPhase,
  phaseProgress: number
): number {
  const phaseDuration = PHASE_DURATIONS[currentPhase];
  const remainingProgress = 100 - phaseProgress;
  return Math.ceil((remainingProgress / 100) * phaseDuration);
}

/**
 * Check if process is on track (ahead, on track, or behind)
 */
export function getTimelineStatus(
  currentDay: number,
  expectedDay: number
): 'ahead' | 'on-track' | 'behind' {
  const diff = currentDay - expectedDay;
  if (diff < -7) return 'behind';
  if (diff > 7) return 'ahead';
  return 'on-track';
}

