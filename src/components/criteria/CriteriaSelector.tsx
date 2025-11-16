'use client';

import { useState } from 'react';
import { CriteriaCard } from './CriteriaCard';
import { getAllCriteria, hasMinimumCriteria } from '@/lib/constants/criteria-simplified';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CriteriaSelectorProps {
  selectedCriteria?: number[];
  onSelectionChange?: (criteriaIds: number[]) => void;
  readOnly?: boolean;
}

export function CriteriaSelector({
  selectedCriteria = [],
  onSelectionChange,
  readOnly = false,
}: CriteriaSelectorProps) {
  const [selected, setSelected] = useState<number[]>(selectedCriteria);
  const allCriteria = getAllCriteria();
  const meetsMinimum = hasMinimumCriteria(selected);
  const progress = (selected.length / 3) * 100;

  const handleToggle = (criteriaId: number) => {
    if (readOnly) return;

    const newSelected = selected.includes(criteriaId)
      ? selected.filter((id) => id !== criteriaId)
      : [...selected, criteriaId];

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Progresso dos Critérios EB-1A
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Você precisa atender pelo menos 3 dos 10 critérios
              </p>
            </div>
            <div className="flex items-center gap-2">
              {meetsMinimum ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-amber-600" />
              )}
              <span className="text-2xl font-bold text-gray-900">
                {selected.length} / 10
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={Math.min(progress, 100)} className="h-2" />
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                {meetsMinimum ? (
                  <span className="text-green-700 font-medium">
                    ✓ Você atingiu o mínimo de 3 critérios! Quanto mais critérios você
                    demonstrar, mais forte será sua petição.
                  </span>
                ) : (
                  <span>
                    Selecione pelo menos{' '}
                    <span className="font-semibold">{3 - selected.length} critério(s)</span>{' '}
                    adicional(is) para qualificar-se.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Criteria Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {allCriteria.map((criteria) => (
          <CriteriaCard
            key={criteria.id}
            criteriaId={criteria.id}
            isSelected={selected.includes(criteria.id)}
            onToggle={() => handleToggle(criteria.id)}
            showDetails={true}
          />
        ))}
      </div>

      {/* Help Text */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Dica importante:</p>
            <p>
              Não basta apenas "se encaixar" nos critérios. Você precisa demonstrar que é
              um dos melhores na sua área. A documentação forte é essencial - cartas de
              recomendação, publicações, prêmios, e evidências objetivas de impacto.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
