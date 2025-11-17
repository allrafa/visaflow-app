'use client';

import Link from 'next/link';
import { Process } from '@/types/database';
import { ArrowRight, Clock } from 'lucide-react';

interface ProcessOverviewProps {
  process: Process;
}

const PHASE_LABELS: Record<string, string> = {
  ELIGIBILITY: 'Eligibility',
  EVIDENCE: 'Evidence Collection',
  LETTERS: 'Letters',
  PETITION: 'Petition',
  FILING: 'Filing',
  preparation: 'Preparation',
  evidence: 'Evidence Collection',
  letters: 'Letters',
  review: 'Review',
  submission: 'Submission',
};

export function ProcessOverview({ process }: ProcessOverviewProps) {
  const processName = process.candidateName || process.title;
  const phaseLabel = PHASE_LABELS[process.currentPhase] || process.currentPhase;

  return (
    <div className="card-hover p-6 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-title truncate">
            {processName}
          </h3>
          <p className="text-body text-muted-foreground mt-1 line-clamp-1">
            {process.description || 'EB-1A Petition Process'}
          </p>
        </div>
        <span className="badge-default shrink-0">
          {phaseLabel}
        </span>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-body text-muted-foreground">Progress</span>
          <span className="text-body font-medium">{process.progress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-3 to-purple-1 transition-all duration-500"
            style={{ width: `${process.progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
        <div className="text-center">
          <p className="text-body text-muted-foreground">Tasks</p>
          <p className="text-title">{process._count?.tasks || 0}</p>
        </div>
        <div className="text-center border-l border-border">
          <p className="text-body text-muted-foreground">Criteria</p>
          <p className="text-title">{process._count?.criteria || 0}</p>
        </div>
        <div className="text-center border-l border-border">
          <p className="text-body text-muted-foreground">Letters</p>
          <p className="text-title">{process._count?.letters || 0}</p>
        </div>
      </div>

      {/* Next Step */}
      {process.northStar && (
        <div className="flex items-start gap-2 p-3 bg-info-muted border border-info/20 rounded-md">
          <Clock className="h-4 w-4 text-info mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-small font-medium text-info mb-1">Next Step:</p>
            <p className="text-body text-foreground">{process.northStar}</p>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Link href={`/dashboard/process/${process.id}`} className="block">
        <button className="btn-primary w-full gap-2">
          View Details
          <ArrowRight className="h-4 w-4" />
        </button>
      </Link>
    </div>
  );
}
