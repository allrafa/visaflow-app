'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Process } from '@/types/database';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessOverviewProps {
  process: Process;
}

const PHASE_LABELS: Record<string, string> = {
  preparation: 'Preparation',
  evidence: 'Evidence Collection',
  letters: 'Letters',
  review: 'Review',
  submission: 'Submission',
};

const PHASE_COLORS: Record<string, string> = {
  preparation: 'bg-blue-100 text-blue-800',
  evidence: 'bg-purple-100 text-purple-800',
  letters: 'bg-amber-100 text-amber-800',
  review: 'bg-orange-100 text-orange-800',
  submission: 'bg-green-100 text-green-800',
};

export function ProcessOverview({ process }: ProcessOverviewProps) {
  const processName = process.candidateName || process.title;
  const phaseLabel = PHASE_LABELS[process.currentPhase] || process.currentPhase;
  const phaseColor = PHASE_COLORS[process.currentPhase] || 'bg-gray-100 text-gray-800';

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {processName}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              {process.description || 'EB-1A Petition Process'}
            </p>
          </div>

          <Badge className={cn('ml-4', phaseColor)}>
            {phaseLabel}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress
            </span>
            <span className="text-sm font-bold text-gray-900">
              {process.progress}%
            </span>
          </div>
          <Progress value={process.progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600">Tasks</p>
            <p className="text-lg font-semibold text-gray-900">
              {process._count?.tasks || 0}
            </p>
          </div>
          <div className="text-center border-l border-gray-200">
            <p className="text-sm text-gray-600">Criteria</p>
            <p className="text-lg font-semibold text-gray-900">
              {process._count?.criteria || 0}
            </p>
          </div>
          <div className="text-center border-l border-gray-200">
            <p className="text-sm text-gray-600">Letters</p>
            <p className="text-lg font-semibold text-gray-900">
              {process._count?.letters || 0}
            </p>
          </div>
        </div>

        {/* Next Step */}
        {process.northStar && (
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-medium text-blue-900 mb-1">Next Step:</p>
              <p className="text-sm text-blue-800">{process.northStar}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link href={`/dashboard/process/${process.id}`}>
          <Button className="w-full gap-2" variant="outline">
            View Details
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
