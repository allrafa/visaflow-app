'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { PROCESS_PHASES } from '@/lib/constants/phases';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import type { ProcessPhase } from '@/lib/services/processService';

interface TimelinePhasesProps {
  currentPhase: ProcessPhase;
  processId?: string;
  progress: number;
}

export function TimelinePhases({
  currentPhase,
  processId,
  progress,
}: TimelinePhasesProps) {
  const pathname = usePathname();
  const currentPhaseIndex = PROCESS_PHASES.findIndex((p) => p.id === currentPhase);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Fases do Processo</h3>
      <div className="space-y-2">
        {PROCESS_PHASES.map((phase, index) => {
          const isCompleted = index < currentPhaseIndex;
          const isCurrent = phase.id === currentPhase;
          const isLocked = index > currentPhaseIndex;
          const phaseProgress = isCompleted
            ? 100
            : isCurrent
            ? progress
            : 0;

          const content = (
            <div
              className={cn(
                'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                isCurrent && 'border-primary bg-primary/5',
                isCompleted && 'border-green-500/50 bg-green-500/5',
                isLocked && 'opacity-50',
                !isLocked && !isCurrent && 'hover:bg-muted'
              )}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : isLocked ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Circle
                    className={cn(
                      'h-5 w-5',
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent && 'text-primary',
                      isCompleted && 'text-green-600'
                    )}
                  >
                    {phase.order}. {phase.label}
                  </p>
                  {!isLocked && (
                    <span className="text-xs text-muted-foreground">
                      {phaseProgress}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {phase.description}
                </p>
                {isCurrent && phaseProgress > 0 && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${phaseProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );

          if (processId && !isLocked) {
            return (
              <Link
                key={phase.id}
                href={`/dashboard/process/${processId}/phase/${phase.id.toLowerCase()}`}
              >
                {content}
              </Link>
            );
          }

          return <div key={phase.id}>{content}</div>;
        })}
      </div>
    </div>
  );
}



