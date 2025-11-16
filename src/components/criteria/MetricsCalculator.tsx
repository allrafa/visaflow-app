'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { calculateMetrics, type MetricsData, type CalculatedMetrics } from '@/lib/services/metricsService';
import { getBenchmarksForCriterion } from '@/lib/constants/metricsBenchmarks';
import { TrendingUp, Info } from 'lucide-react';
import type { EB1CriteriaId } from '@/lib/constants/criteria';

interface MetricsCalculatorProps {
  criteria: EB1CriteriaId | string;
  onMetricsCalculated?: (metrics: MetricsData, calculated: CalculatedMetrics) => void;
}

interface MetricField {
  key: keyof MetricsData;
  label: string;
  placeholder: string;
  description?: string;
  type?: 'number' | 'percent';
}

/**
 * Get metric fields for a specific criterion
 */
function getMetricFieldsForCriterion(criteria: string): MetricField[] {
  const benchmarks = getBenchmarksForCriterion(criteria);
  const fields: MetricField[] = [];

  // Map benchmark metric names to MetricsData keys
  const metricMap: Record<string, keyof MetricsData> = {
    'Downloads': 'downloads',
    'GitHub Stars': 'stars',
    'Usuários Ativos': 'users',
    'Citações': 'citations',
    'Impact Factor': 'impactFactor',
    'Empresas Usando': 'companies',
    'Países': 'countries',
    'Competitividade': 'awardCompetitiveness',
    'Circulação': 'circulation',
    'Trabalhos Avaliados': 'worksEvaluated',
    'Percentil Salarial': 'salaryPercentile',
    'Prestígio da Galeria': 'galleryPrestige',
    'Receita (USD)': 'revenue',
  };

  // Get unique metrics for this criterion
  const uniqueMetrics = new Set(benchmarks.map((b) => b.metricName));
  
  uniqueMetrics.forEach((metricName) => {
    const key = metricMap[metricName];
    if (key) {
      const benchmark = benchmarks.find((b) => b.metricName === metricName);
      const threshold = benchmark?.thresholds[benchmark.thresholds.length - 1];
      const exampleValue = threshold ? Math.round(threshold.value) : 0;
      
      fields.push({
        key,
        label: metricName,
        placeholder: `Ex: ${exampleValue.toLocaleString()}`,
        description: benchmark?.description,
        type: metricName === 'Competitividade' || metricName === 'Percentil Salarial' ? 'percent' : 'number',
      });
    }
  });

  // Special handling for MEMBERSHIP (qualitative)
  if (criteria === 'MEMBERSHIP' && fields.length === 0) {
    fields.push({
      key: 'impact',
      label: 'Nível de Prestígio',
      placeholder: 'high ou medium',
      description: 'Avalie o prestígio da associação (high = top 5%, medium = top 10%)',
      type: 'number',
    });
  }

  return fields;
}

export function MetricsCalculator({ criteria, onMetricsCalculated }: MetricsCalculatorProps) {
  const [metrics, setMetrics] = useState<MetricsData>({});
  const [calculated, setCalculated] = useState<CalculatedMetrics | null>(null);

  const metricFields = useMemo(() => getMetricFieldsForCriterion(criteria), [criteria]);

  const handleCalculate = () => {
    const result = calculateMetrics(criteria, metrics);
    setCalculated(result);
    onMetricsCalculated?.(metrics, result);
  };

  const handleFieldChange = (key: keyof MetricsData, value: string) => {
    if (key === 'impact') {
      setMetrics({ ...metrics, [key]: value });
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      const newMetrics = { ...metrics };
      delete newMetrics[key];
      setMetrics(newMetrics);
    } else {
      setMetrics({ ...metrics, [key]: numValue });
    }
  };

  const getFieldValue = (key: keyof MetricsData): string => {
    const value = metrics[key];
    if (value === undefined || value === null) return '';
    if (typeof value === 'string') return value;
    return value.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Métricas</CardTitle>
        <CardDescription>
          Calcule métricas de impacto para este critério baseado em benchmarks de casos aprovados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metricFields.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {metricFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">{field.label}</label>
                  {field.description && (
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-md border bg-popover p-2 text-xs text-popover-foreground shadow-md group-hover:block">
                        {field.description}
                      </div>
                    </div>
                  )}
                </div>
                <Input
                  type={field.type === 'percent' ? 'number' : 'number'}
                  step={field.type === 'percent' ? '0.001' : '1'}
                  min={field.type === 'percent' ? '0' : '0'}
                  max={field.type === 'percent' ? '1' : undefined}
                  placeholder={field.placeholder}
                  value={getFieldValue(field.key)}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                />
                {field.type === 'percent' && (
                  <p className="text-xs text-muted-foreground">
                    {field.key === 'awardCompetitiveness' && 'Taxa de seleção (ex: 0.01 = 1% selecionados)'}
                    {field.key === 'salaryPercentile' && 'Percentil salarial (0-100)'}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-muted/50 p-4 text-center text-sm text-muted-foreground">
            Este critério não possui métricas quantificáveis. Use a avaliação qualitativa no formulário principal.
          </div>
        )}

        {metricFields.length > 0 && (
          <Button onClick={handleCalculate} className="w-full" disabled={metricFields.every((f) => !metrics[f.key])}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Calcular Métricas
          </Button>
        )}

        {calculated && calculated.percentile > 0 && (
          <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Percentil</span>
                <Badge variant="default">{calculated.percentileLabel}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Score de Impacto</span>
                <Badge variant="secondary">{calculated.impactScore}/100</Badge>
              </div>
              <Progress value={calculated.impactScore} className="h-2" />
            </div>

            <div className="text-sm text-muted-foreground">
              <strong>Comparação:</strong> {calculated.comparison}
            </div>

            {calculated.breakdown && calculated.breakdown.length > 1 && (
              <div className="space-y-2 border-t pt-4">
                <h4 className="text-sm font-medium">Breakdown por Métrica</h4>
                <div className="space-y-2">
                  {calculated.breakdown.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{item.metric}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.percentile > 0 ? `Top ${(item.percentile * 100).toFixed(3)}%` : 'Abaixo do mínimo'}
                          </Badge>
                          <span className="text-xs font-medium">{item.impactScore}/100</span>
                        </div>
                      </div>
                      <Progress value={item.impactScore} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {calculated && calculated.percentile === 0 && (
          <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm text-yellow-900 dark:text-yellow-100">
            <strong>Atenção:</strong> As métricas fornecidas estão abaixo dos benchmarks mínimos para casos aprovados.
            Considere fortalecer suas evidências ou focar em outros critérios.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
