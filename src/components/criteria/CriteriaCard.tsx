'use client';

import { useState } from 'react';
import { Check, AlertCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
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
    <div
      className={cn(
        'card-hover p-6 cursor-pointer',
        isSelected && 'ring-2 ring-purple-1 bg-purple-muted'
      )}
      onClick={onToggle}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-subtitle font-semibold">
                {criteria.title}
              </h3>
              <button
                className="icon-container h-6 w-6 p-0 rounded hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                title="Clique para ver mais detalhes"
              >
                <Info className="h-4 w-4 text-purple-2" />
              </button>
            </div>
            <p className="text-body text-muted-foreground">{criteria.description}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {isSelected && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-1 text-purple-foreground text-small font-medium">
                <Check className="h-3 w-3" />
                Selecionado
              </div>
            )}
            <span className="text-small text-muted-foreground">Critério {criteria.id}</span>
          </div>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div>
            <button
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-purple-1 hover:text-purple-3 text-body font-medium"
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
            </button>

            {expanded && (
              <div className="mt-4 space-y-4 border-t border-border pt-4">
                {/* Examples */}
                <div>
                  <h4 className="text-body font-semibold mb-2 flex items-center gap-2">
                    <div className="icon-container">
                      <Check className="h-4 w-4 text-purple-3" />
                    </div>
                    Exemplos válidos:
                  </h4>
                  <ul className="space-y-1 text-body text-muted-foreground">
                    {criteria.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-3 mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to Include */}
                <div className="bg-purple-muted rounded-lg p-4 border border-purple-1/10">
                  <h4 className="text-body font-semibold mb-2 flex items-center gap-2">
                    <div className="icon-container">
                      <Info className="h-4 w-4 text-purple-1" />
                    </div>
                    O que incluir:
                  </h4>
                  <p className="text-body text-muted-foreground">{criteria.whatToInclude}</p>
                </div>

                {/* Common Mistakes */}
                <div>
                  <h4 className="text-body font-semibold mb-2 flex items-center gap-2">
                    <div className="icon-container">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </div>
                    Erros comuns a evitar:
                  </h4>
                  <ul className="space-y-1 text-body text-muted-foreground">
                    {criteria.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-destructive mt-1">✗</span>
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
    </div>
  );
}
