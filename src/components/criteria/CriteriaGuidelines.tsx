'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Info, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { CriteriaGuidelines } from '@/lib/templates/criteria';

interface CriteriaGuidelinesProps {
  guidelines: CriteriaGuidelines;
  className?: string;
}

export function CriteriaGuidelines({ guidelines, className }: CriteriaGuidelinesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn('border-blue-200 bg-blue-50/50', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">Guia de Preenchimento</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        <CardDescription className="text-sm">{guidelines.overview}</CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4 pt-0">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-semibold">Melhores Práticas</h4>
            </div>
            <ul className="space-y-1 text-sm">
              {guidelines.bestPractices.map((practice, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 text-green-600">•</span>
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <h4 className="text-sm font-semibold">Erros Comuns</h4>
            </div>
            <ul className="space-y-1 text-sm">
              {guidelines.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-600">⚠</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <h4 className="text-sm font-semibold">Dicas de Evidências</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {guidelines.evidenceTips.map((tip, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tip}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}



