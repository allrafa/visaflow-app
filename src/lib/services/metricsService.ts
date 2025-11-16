/**
 * Calculadora de Métricas de Impacto
 * Baseado em padrões identificados em casos aprovados (13 casos reais)
 * Expandido para todos os 10 critérios EB-1A
 */

import { calculateFromBenchmark } from '../constants/metricsBenchmarks';
import type { EB1CriteriaId } from '../constants/criteria';

export interface MetricsData {
  // ORIGINAL, CRITICAL
  downloads?: number;
  stars?: number;
  users?: number;
  companies?: number;
  countries?: number;
  
  // SCHOLARLY
  citations?: number;
  impactFactor?: number;
  articles?: number;
  hIndex?: number;
  
  // AWARDS
  awardCompetitiveness?: number; // 0-1, ratio of winners to applicants
  awardPrestige?: number; // 1-100, ranking of award
  
  // PRESS
  circulation?: number;
  audience?: number;
  shares?: number;
  
  // JUDGING
  worksEvaluated?: number;
  eventsJudged?: number;
  
  // HIGH_SALARY
  salary?: number;
  salaryPercentile?: number; // 0-100
  marketAverage?: number;
  
  // EXHIBITIONS
  galleryPrestige?: number; // 1-100
  exhibitionsCount?: number;
  visitors?: number;
  
  // COMMERCIAL_SUCCESS
  revenue?: number;
  sales?: number;
  collectors?: number;
  
  // Generic
  impact?: string;
}

export interface CalculatedMetrics {
  percentile: number; // Percentil (ex: 0.025 = top 0.025%)
  percentileLabel: string; // "Top 0.025%"
  impactScore: number; // 0-100
  comparison: string;
  breakdown?: Array<{
    metric: string;
    value: number;
    percentile: number;
    impactScore: number;
  }>;
}

/**
 * Calculate metrics for a criterion
 * Enhanced with benchmarks from real approved cases
 */
export function calculateMetrics(
  criteria: EB1CriteriaId | string,
  metricsData: MetricsData
): CalculatedMetrics {
  const breakdown: Array<{
    metric: string;
    value: number;
    percentile: number;
    impactScore: number;
  }> = [];

  let bestPercentile = 0;
  let bestImpactScore = 0;
  let bestComparison = '';
  let bestMetric = '';

  switch (criteria) {
    case 'ORIGINAL': {
      // Contribuições originais - múltiplas métricas
      if (metricsData.downloads) {
        const result = calculateFromBenchmark('ORIGINAL', 'Downloads', metricsData.downloads);
        if (result && result.percentile > bestPercentile) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.downloads.toLocaleString()} downloads`;
          bestMetric = 'Downloads';
        }
        breakdown.push({
          metric: 'Downloads',
          value: metricsData.downloads,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      if (metricsData.stars) {
        const result = calculateFromBenchmark('ORIGINAL', 'GitHub Stars', metricsData.stars);
        if (result && result.percentile > bestPercentile) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.stars.toLocaleString()} GitHub stars`;
          bestMetric = 'GitHub Stars';
        }
        breakdown.push({
          metric: 'GitHub Stars',
          value: metricsData.stars,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      if (metricsData.users) {
        const result = calculateFromBenchmark('ORIGINAL', 'Usuários Ativos', metricsData.users);
        if (result && result.percentile > bestPercentile) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.users.toLocaleString()} users`;
          bestMetric = 'Usuários';
        }
        breakdown.push({
          metric: 'Usuários',
          value: metricsData.users,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'SCHOLARLY': {
      // Artigos acadêmicos - citações e impact factor
      if (metricsData.citations) {
        const result = calculateFromBenchmark('SCHOLARLY', 'Citações', metricsData.citations);
        if (result && result.percentile > bestPercentile) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.citations} citations`;
          bestMetric = 'Citações';
        }
        breakdown.push({
          metric: 'Citações',
          value: metricsData.citations,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      if (metricsData.impactFactor) {
        const result = calculateFromBenchmark('SCHOLARLY', 'Impact Factor', metricsData.impactFactor);
        if (result && result.percentile > bestPercentile) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `Impact Factor ${metricsData.impactFactor}`;
          bestMetric = 'Impact Factor';
        } else if (result && result.impactScore > bestImpactScore) {
          bestImpactScore = result.impactScore;
          bestComparison = `Impact Factor ${metricsData.impactFactor}`;
          bestMetric = 'Impact Factor';
        }
        breakdown.push({
          metric: 'Impact Factor',
          value: metricsData.impactFactor,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'CRITICAL': {
      // Papel crítico - empresas e países
      if (metricsData.companies) {
        const result = calculateFromBenchmark('CRITICAL', 'Empresas Usando', metricsData.companies);
        if (result && result.percentile > bestPercentile) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.companies} companies`;
          bestMetric = 'Empresas';
        }
        breakdown.push({
          metric: 'Empresas',
          value: metricsData.companies,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      if (metricsData.countries) {
        const result = calculateFromBenchmark('CRITICAL', 'Países', metricsData.countries);
        if (result && result.percentile > bestPercentile) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.countries} countries`;
          bestMetric = 'Países';
        }
        breakdown.push({
          metric: 'Países',
          value: metricsData.countries,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'AWARDS': {
      // Prêmios - competitividade
      if (metricsData.awardCompetitiveness) {
        const result = calculateFromBenchmark('AWARDS', 'Competitividade', metricsData.awardCompetitiveness);
        if (result) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${(metricsData.awardCompetitiveness * 100).toFixed(3)}% selecionados`;
          bestMetric = 'Competitividade';
        }
        breakdown.push({
          metric: 'Competitividade',
          value: metricsData.awardCompetitiveness,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'PRESS': {
      // Cobertura de imprensa - circulação
      if (metricsData.circulation) {
        const result = calculateFromBenchmark('PRESS', 'Circulação', metricsData.circulation);
        if (result) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.circulation.toLocaleString()} circulation`;
          bestMetric = 'Circulação';
        }
        breakdown.push({
          metric: 'Circulação',
          value: metricsData.circulation,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'JUDGING': {
      // Judging work - trabalhos avaliados
      if (metricsData.worksEvaluated) {
        const result = calculateFromBenchmark('JUDGING', 'Trabalhos Avaliados', metricsData.worksEvaluated);
        if (result) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.worksEvaluated} works evaluated`;
          bestMetric = 'Trabalhos Avaliados';
        }
        breakdown.push({
          metric: 'Trabalhos Avaliados',
          value: metricsData.worksEvaluated,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'HIGH_SALARY': {
      // Salário alto - percentil
      if (metricsData.salaryPercentile) {
        const result = calculateFromBenchmark('HIGH_SALARY', 'Percentil Salarial', metricsData.salaryPercentile);
        if (result) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `${metricsData.salaryPercentile}th percentile`;
          bestMetric = 'Percentil Salarial';
        }
        breakdown.push({
          metric: 'Percentil Salarial',
          value: metricsData.salaryPercentile,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'EXHIBITIONS': {
      // Exibições - prestígio da galeria
      if (metricsData.galleryPrestige) {
        const result = calculateFromBenchmark('EXHIBITIONS', 'Prestígio da Galeria', metricsData.galleryPrestige);
        if (result) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `Gallery prestige: ${metricsData.galleryPrestige}/100`;
          bestMetric = 'Prestígio da Galeria';
        }
        breakdown.push({
          metric: 'Prestígio da Galeria',
          value: metricsData.galleryPrestige,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'COMMERCIAL_SUCCESS': {
      // Sucesso comercial - receita
      if (metricsData.revenue) {
        const result = calculateFromBenchmark('COMMERCIAL_SUCCESS', 'Receita (USD)', metricsData.revenue);
        if (result) {
          bestPercentile = result.percentile;
          bestImpactScore = result.impactScore;
          bestComparison = `$${metricsData.revenue.toLocaleString()} revenue`;
          bestMetric = 'Receita';
        }
        breakdown.push({
          metric: 'Receita',
          value: metricsData.revenue,
          percentile: result?.percentile || 0,
          impactScore: result?.impactScore || 0,
        });
      }
      break;
    }

    case 'MEMBERSHIP': {
      // Membership - não tem métricas quantificáveis diretas
      // Baseado em prestígio da associação e critérios
      if (metricsData.impact === 'high') {
        bestPercentile = 0.05;
        bestImpactScore = 85;
        bestComparison = 'High prestige membership';
      } else if (metricsData.impact === 'medium') {
        bestPercentile = 0.1;
        bestImpactScore = 75;
        bestComparison = 'Moderate prestige membership';
      }
      break;
    }

    default: {
      // Default calculation
      if (metricsData.impact === 'high') {
        bestPercentile = 0.05;
        bestImpactScore = 85;
        bestComparison = 'High impact';
      } else if (metricsData.impact === 'medium') {
        bestPercentile = 0.1;
        bestImpactScore = 75;
        bestComparison = 'Medium impact';
      }
    }
  }

  // Generate percentile label
  const percentileLabel = bestPercentile > 0
    ? `Top ${(bestPercentile * 100).toFixed(3)}%`
    : 'Not calculated';

  return {
    percentile: bestPercentile,
    percentileLabel,
    impactScore: bestImpactScore,
    comparison: bestComparison || 'No metrics provided',
    breakdown: breakdown.length > 0 ? breakdown : undefined,
  };
}

/**
 * Format metrics for display
 */
export function formatMetrics(metrics: CalculatedMetrics): string {
  if (metrics.percentile === 0) {
    return 'Métricas não calculadas';
  }

  return `${metrics.percentileLabel} - ${metrics.comparison} (Score: ${metrics.impactScore}/100)`;
}

