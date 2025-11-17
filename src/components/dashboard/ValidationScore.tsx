'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface CriterionScore {
  criterion: string;
  score: number; // 0-100
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  issues?: string[];
}

interface ValidationScoreProps {
  overallScore: number; // 0-100
  criteria: CriterionScore[];
}

const STATUS_CONFIG = {
  excellent: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    badge: 'bg-green-500',
    label: 'Excelente',
  },
  good: {
    icon: CheckCircle2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    badge: 'bg-blue-500',
    label: 'Bom',
  },
  'needs-improvement': {
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    badge: 'bg-yellow-500',
    label: 'Precisa melhorar',
  },
  critical: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    badge: 'bg-red-500',
    label: 'Crítico',
  },
} as const;

function getScoreStatus(score: number): CriterionScore['status'] {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'needs-improvement';
  return 'critical';
}

export function ValidationScore({ overallScore, criteria }: ValidationScoreProps) {
  const overallStatus = getScoreStatus(overallScore);
  const overallConfig = STATUS_CONFIG[overallStatus];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Overall Quality Score: {overallScore}/100
          <Badge className={cn('text-white', overallConfig.badge)}>
            {overallConfig.label}
          </Badge>
        </CardTitle>
        <CardDescription>
          Validação de qualidade dos critérios EB-1A
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Score Geral</span>
            <span className="font-semibold">{overallScore}/100</span>
          </div>
          <Progress value={overallScore} className="h-3" />
        </div>

        {/* Criteria Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Critérios</h4>
          <div className="space-y-2">
            {criteria.map((criterion) => {
              const status = criterion.status || getScoreStatus(criterion.score);
              const config = STATUS_CONFIG[status];
              const Icon = config.icon;

              return (
                <div
                  key={criterion.criterion}
                  className={cn(
                    'rounded-lg border p-3',
                    config.bgColor,
                    config.borderColor
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={cn('h-4 w-4', config.color)} />
                      <span className="font-medium text-sm">
                        {criterion.criterion}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {criterion.score}/100
                      </span>
                      <Badge
                        className={cn('text-xs text-white', config.badge)}
                      >
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={criterion.score} className="h-2 mb-2" />
                  {criterion.issues && criterion.issues.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {criterion.issues.slice(0, 2).map((issue, idx) => (
                        <p
                          key={idx}
                          className="text-xs text-muted-foreground pl-6"
                        >
                          • {issue}
                        </p>
                      ))}
                      {criterion.issues.length > 2 && (
                        <p className="text-xs text-muted-foreground pl-6">
                          +{criterion.issues.length - 2} mais issues
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        {overallScore < 80 && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-900">
                  Recomendação
                </p>
                <p className="text-xs text-yellow-800 mt-1">
                  Seu score está abaixo de 80. Revise os critérios marcados como
                  "Precisa melhorar" ou "Crítico" antes de submeter a petição.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

