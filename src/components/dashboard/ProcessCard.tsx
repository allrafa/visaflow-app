'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Calendar, CheckCircle2 } from 'lucide-react';
import { PROCESS_PHASES } from '@/lib/constants/phases';
import type { Process } from '@/types/database';

interface ProcessCardProps {
  process: Process & {
    _count?: {
      tasks: number;
      criteria: number;
      letters: number;
    };
  };
}

export function ProcessCard({ process }: ProcessCardProps) {
  const currentPhase = PROCESS_PHASES.find((p) => p.id === process.currentPhase);
  const completedTasks = process._count?.tasks || 0;
  const totalTasks = completedTasks; // Simplificado por enquanto

  const getPhaseColor = (phase: string): string => {
    const colors: Record<string, string> = {
      ELIGIBILITY: 'bg-blue-100 text-blue-700 border-blue-200',
      EVIDENCE: 'bg-purple-100 text-purple-700 border-purple-200',
      LETTERS: 'bg-amber-100 text-amber-700 border-amber-200',
      PETITION: 'bg-green-100 text-green-700 border-green-200',
      FILING: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    };
    return colors[phase] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-gray-300';
  };

  return (
    <Link href={`/process/${process.id}`} className="block">
      <Card className="group h-full transition-all hover:shadow-xl hover:scale-[1.02] border-2 hover:border-blue-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl line-clamp-1 group-hover:text-blue-600 transition-colors">
                {process.title}
              </CardTitle>
              {process.description && (
                <CardDescription className="mt-2 line-clamp-2 text-sm">
                  {process.description}
                </CardDescription>
              )}
            </div>
            <Badge
              className={`${getPhaseColor(process.currentPhase)} border font-semibold shrink-0`}
            >
              {currentPhase?.label || process.currentPhase}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">Overall Progress</span>
              <span className="font-bold text-gray-900">{process.progress}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getProgressColor(process.progress)}`}
                style={{ width: `${process.progress}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                {process._count?.criteria || 0}
              </span>
              <span className="text-xs text-gray-500">Criteria</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                {completedTasks}
              </span>
              <span className="text-xs text-gray-500">Tasks</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 mb-2">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                {new Date(process.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span className="text-xs text-gray-500">Updated</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

