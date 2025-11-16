/**
 * Benchmarks de Métricas para EB-1A
 * Baseado em análise de 13 casos reais (9 aprovações + 4 RFEs/rejeições)
 * Percentis calculados com base em dados de mercado e casos aprovados
 */

export interface MetricBenchmark {
  criterion: string;
  metricName: string;
  thresholds: Array<{
    value: number;
    percentile: number; // 0.01 = top 1%
    impactScore: number; // 0-100
    label: string;
  }>;
  description: string;
  dataSource?: string;
}

export const METRICS_BENCHMARKS: MetricBenchmark[] = [
  {
    criterion: 'ORIGINAL',
    metricName: 'Downloads',
    thresholds: [
      { value: 10000000, percentile: 0.001, impactScore: 98, label: 'Top 0.1% - Extraordinário' },
      { value: 1000000, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 500000, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 100000, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 50000, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
    ],
    description: 'Downloads de projetos open source ou ferramentas',
    dataSource: 'GitHub, npm, PyPI statistics',
  },
  {
    criterion: 'ORIGINAL',
    metricName: 'GitHub Stars',
    thresholds: [
      { value: 50000, percentile: 0.001, impactScore: 98, label: 'Top 0.1% - Extraordinário' },
      { value: 10000, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 5000, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 1000, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 500, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
    ],
    description: 'GitHub stars indicam reconhecimento da comunidade',
    dataSource: 'GitHub statistics',
  },
  {
    criterion: 'ORIGINAL',
    metricName: 'Usuários Ativos',
    thresholds: [
      { value: 1000000, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 500000, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 100000, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 10000, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 1000, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Número de usuários ativos ou empresas usando',
    dataSource: 'Analytics, user registrations',
  },
  {
    criterion: 'SCHOLARLY',
    metricName: 'Citações',
    thresholds: [
      { value: 500, percentile: 0.001, impactScore: 98, label: 'Top 0.1% - Extraordinário' },
      { value: 100, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 50, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 20, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 10, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
    ],
    description: 'Citações em artigos acadêmicos',
    dataSource: 'Google Scholar, Web of Science, Scopus',
  },
  {
    criterion: 'SCHOLARLY',
    metricName: 'Impact Factor',
    thresholds: [
      { value: 20, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 10, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 5, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 3, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 1, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Impact Factor do journal (JCR)',
    dataSource: 'Journal Citation Reports',
  },
  {
    criterion: 'CRITICAL',
    metricName: 'Empresas Usando',
    thresholds: [
      { value: 500, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 100, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 50, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 20, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 10, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Número de empresas usando a solução',
    dataSource: 'Customer lists, case studies',
  },
  {
    criterion: 'CRITICAL',
    metricName: 'Países',
    thresholds: [
      { value: 100, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 50, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 30, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 15, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 5, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Número de países onde a solução é usada',
    dataSource: 'Analytics, distribution data',
  },
  {
    criterion: 'AWARDS',
    metricName: 'Competitividade',
    thresholds: [
      { value: 0.001, percentile: 0.001, impactScore: 98, label: 'Top 0.1% selecionados' },
      { value: 0.01, percentile: 0.01, impactScore: 95, label: 'Top 1% selecionados' },
      { value: 0.025, percentile: 0.025, impactScore: 90, label: 'Top 2.5% selecionados' },
      { value: 0.05, percentile: 0.05, impactScore: 85, label: 'Top 5% selecionados' },
      { value: 0.1, percentile: 0.1, impactScore: 75, label: 'Top 10% selecionados' },
    ],
    description: 'Taxa de seleção (premiados / candidatos)',
    dataSource: 'Award organization statistics',
  },
  {
    criterion: 'PRESS',
    metricName: 'Circulação',
    thresholds: [
      { value: 10000000, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 1000000, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 500000, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 100000, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 50000, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Circulação ou audiência da publicação',
    dataSource: 'Media circulation data',
  },
  {
    criterion: 'JUDGING',
    metricName: 'Trabalhos Avaliados',
    thresholds: [
      { value: 10000, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 5000, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 1000, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 500, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 100, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Número de trabalhos avaliados como juiz',
    dataSource: 'Event statistics',
  },
  {
    criterion: 'HIGH_SALARY',
    metricName: 'Percentil Salarial',
    thresholds: [
      { value: 99, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 95, percentile: 0.05, impactScore: 90, label: 'Top 5% - Muito Alto' },
      { value: 90, percentile: 0.1, impactScore: 85, label: 'Top 10% - Alto' },
      { value: 85, percentile: 0.15, impactScore: 75, label: 'Top 15% - Bom' },
      { value: 80, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Percentil salarial comparado ao campo (BLS data)',
    dataSource: 'Bureau of Labor Statistics',
  },
  {
    criterion: 'EXHIBITIONS',
    metricName: 'Prestígio da Galeria',
    thresholds: [
      { value: 100, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 50, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 20, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 10, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 5, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Ranking da galeria (1-100, onde 100 = mais prestigiosa)',
    dataSource: 'Art market rankings',
  },
  {
    criterion: 'COMMERCIAL_SUCCESS',
    metricName: 'Receita (USD)',
    thresholds: [
      { value: 1000000, percentile: 0.01, impactScore: 95, label: 'Top 1% - Excepcional' },
      { value: 500000, percentile: 0.025, impactScore: 90, label: 'Top 2.5% - Muito Alto' },
      { value: 100000, percentile: 0.05, impactScore: 85, label: 'Top 5% - Alto' },
      { value: 50000, percentile: 0.1, impactScore: 75, label: 'Top 10% - Bom' },
      { value: 10000, percentile: 0.2, impactScore: 65, label: 'Top 20% - Moderado' },
    ],
    description: 'Receita total de vendas artísticas',
    dataSource: 'Sales records, tax returns',
  },
];

/**
 * Get benchmarks for a specific criterion
 */
export function getBenchmarksForCriterion(criteriaId: string): MetricBenchmark[] {
  return METRICS_BENCHMARKS.filter((b) => b.criterion === criteriaId);
}

/**
 * Calculate percentile and impact score based on benchmark
 */
export function calculateFromBenchmark(
  criterion: string,
  metricName: string,
  value: number
): { percentile: number; impactScore: number; label: string } | null {
  const benchmarks = getBenchmarksForCriterion(criterion);
  const benchmark = benchmarks.find((b) => b.metricName === metricName);
  
  if (!benchmark) {
    return null;
  }

  // Find the threshold that matches the value
  for (let i = 0; i < benchmark.thresholds.length; i++) {
    const threshold = benchmark.thresholds[i];
    if (value >= threshold.value) {
      return {
        percentile: threshold.percentile,
        impactScore: threshold.impactScore,
        label: threshold.label,
      };
    }
  }

  // Value is below all thresholds
  return {
    percentile: 0,
    impactScore: 0,
    label: 'Abaixo do benchmark mínimo',
  };
}



