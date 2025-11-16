'use client';

import { useState } from 'react';
import { Check, AlertCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getCriteriaById, type SimplifiedCriteria } from '@/lib/constants/criteria-simplified';
import { cn } from '@/lib/utils';

interface CriteriaCardProps {
  criteriaId: number;
  isSelected?: boolean;
  onToggle?: () => void;
  showDetails?: boolean;
}

export function CriteriaCard({
  criteriaId,
  isSelected = false,
  onToggle,
  showDetails = true,
}: CriteriaCardProps) {
  const [expanded, setExpanded] = useState(false);
  const criteria = getCriteriaById(criteriaId);

  if (!criteria) {
    return null;
  }

  return (
    <Card
      className={cn(
        'p-6 cursor-pointer transition-all hover:shadow-md',
        isSelected
          ? 'border-2 border-blue-600 bg-blue-50'
          : 'border border-gray-200 hover:border-blue-300'
      )}
      onClick={onToggle}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {criteria.title}
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="inline-flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                      }}
                    >
                      <Info className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clique para ver mais detalhes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-gray-600">{criteria.description}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {isSelected && (
              <Badge className="bg-blue-600">
                <Check className="h-3 w-3 mr-1" />
                Selecionado
              </Badge>
            )}
            <span className="text-xs text-gray-500">Critério {criteria.id}</span>
          </div>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between text-blue-600 hover:text-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              {expanded ? 'Ver menos detalhes' : 'Ver exemplos e dicas'}
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {expanded && (
              <div className="mt-4 space-y-4 border-t pt-4">
                {/* Examples */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Exemplos válidos:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {criteria.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to Include */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    O que incluir:
                  </h4>
                  <p className="text-sm text-blue-800">{criteria.whatToInclude}</p>
                </div>

                {/* Common Mistakes */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Erros comuns a evitar:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {criteria.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
