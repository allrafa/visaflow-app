import { describe, it, expect } from 'vitest';
import { calculateMetrics, formatMetrics, type MetricsData } from '@/lib/services/metricsService';

describe('calculateMetrics', () => {
  describe('ORIGINAL criterion', () => {
    it('should calculate metrics for high downloads', () => {
      const metrics: MetricsData = {
        downloads: 2000000,
      };

      const result = calculateMetrics('ORIGINAL', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('downloads');
      expect(result.breakdown).toBeDefined();
      expect(result.breakdown?.length).toBeGreaterThan(0);
    });

    it('should calculate metrics for GitHub stars', () => {
      const metrics: MetricsData = {
        stars: 15000,
      };

      const result = calculateMetrics('ORIGINAL', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('stars');
    });

    it('should select best metric when multiple are provided', () => {
      const metrics: MetricsData = {
        downloads: 100000,
        stars: 10000,
        users: 50000,
      };

      const result = calculateMetrics('ORIGINAL', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.breakdown?.length).toBe(3);
      // Should select the best percentile
      expect(result.percentile).toBeGreaterThan(0);
    });

    it('should return zero percentile for low values', () => {
      const metrics: MetricsData = {
        downloads: 100,
      };

      const result = calculateMetrics('ORIGINAL', metrics);

      expect(result.percentile).toBe(0);
      expect(result.impactScore).toBe(0);
    });
  });

  describe('SCHOLARLY criterion', () => {
    it('should calculate metrics for high citations', () => {
      const metrics: MetricsData = {
        citations: 150,
      };

      const result = calculateMetrics('SCHOLARLY', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('citations');
    });

    it('should calculate metrics for impact factor', () => {
      const metrics: MetricsData = {
        impactFactor: 25, // Above threshold for top 1%
      };

      const result = calculateMetrics('SCHOLARLY', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('Impact Factor');
    });

    it('should handle both citations and impact factor', () => {
      const metrics: MetricsData = {
        citations: 50,
        impactFactor: 8,
      };

      const result = calculateMetrics('SCHOLARLY', metrics);

      expect(result.breakdown?.length).toBe(2);
      expect(result.percentile).toBeGreaterThan(0);
    });
  });

  describe('CRITICAL criterion', () => {
    it('should calculate metrics for companies', () => {
      const metrics: MetricsData = {
        companies: 150,
      };

      const result = calculateMetrics('CRITICAL', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('companies');
    });

    it('should calculate metrics for countries', () => {
      const metrics: MetricsData = {
        countries: 60,
      };

      const result = calculateMetrics('CRITICAL', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('countries');
    });
  });

  describe('AWARDS criterion', () => {
    it('should calculate metrics for competitive award', () => {
      const metrics: MetricsData = {
        awardCompetitiveness: 0.01, // Top 1%
      };

      const result = calculateMetrics('AWARDS', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('selecionados');
    });
  });

  describe('PRESS criterion', () => {
    it('should calculate metrics for high circulation', () => {
      const metrics: MetricsData = {
        circulation: 2000000,
      };

      const result = calculateMetrics('PRESS', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('circulation');
    });
  });

  describe('JUDGING criterion', () => {
    it('should calculate metrics for works evaluated', () => {
      const metrics: MetricsData = {
        worksEvaluated: 6000, // Above threshold for top 2.5%
      };

      const result = calculateMetrics('JUDGING', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('works evaluated');
    });
  });

  describe('HIGH_SALARY criterion', () => {
    it('should calculate metrics for high salary percentile', () => {
      const metrics: MetricsData = {
        salaryPercentile: 95,
      };

      const result = calculateMetrics('HIGH_SALARY', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('percentile');
    });
  });

  describe('EXHIBITIONS criterion', () => {
    it('should calculate metrics for gallery prestige', () => {
      const metrics: MetricsData = {
        galleryPrestige: 80,
      };

      const result = calculateMetrics('EXHIBITIONS', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('prestige');
    });
  });

  describe('COMMERCIAL_SUCCESS criterion', () => {
    it('should calculate metrics for revenue', () => {
      const metrics: MetricsData = {
        revenue: 600000, // Above threshold for top 2.5%
      };

      const result = calculateMetrics('COMMERCIAL_SUCCESS', metrics);

      expect(result.percentile).toBeGreaterThan(0);
      expect(result.impactScore).toBeGreaterThan(85);
      expect(result.comparison).toContain('revenue');
    });
  });

  describe('MEMBERSHIP criterion', () => {
    it('should calculate metrics for high impact membership', () => {
      const metrics: MetricsData = {
        impact: 'high',
      };

      const result = calculateMetrics('MEMBERSHIP', metrics);

      expect(result.percentile).toBe(0.05);
      expect(result.impactScore).toBe(85);
      expect(result.comparison).toContain('High prestige');
    });

    it('should calculate metrics for medium impact membership', () => {
      const metrics: MetricsData = {
        impact: 'medium',
      };

      const result = calculateMetrics('MEMBERSHIP', metrics);

      expect(result.percentile).toBe(0.1);
      expect(result.impactScore).toBe(75);
      expect(result.comparison).toContain('Moderate prestige');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty metrics', () => {
      const metrics: MetricsData = {};

      const result = calculateMetrics('ORIGINAL', metrics);

      expect(result.percentile).toBe(0);
      expect(result.impactScore).toBe(0);
      expect(result.comparison).toBe('No metrics provided');
    });

    it('should handle unknown criterion with impact', () => {
      const metrics: MetricsData = {
        impact: 'high',
      };

      const result = calculateMetrics('UNKNOWN', metrics);

      expect(result.percentile).toBe(0.05);
      expect(result.impactScore).toBe(85);
    });

    it('should generate correct percentile label', () => {
      const metrics: MetricsData = {
        downloads: 1000000,
      };

      const result = calculateMetrics('ORIGINAL', metrics);

      expect(result.percentileLabel).toMatch(/^Top \d+\.\d{3}%$/);
    });

    it('should include breakdown when multiple metrics exist', () => {
      const metrics: MetricsData = {
        downloads: 100000,
        stars: 5000,
      };

      const result = calculateMetrics('ORIGINAL', metrics);

      expect(result.breakdown).toBeDefined();
      expect(result.breakdown?.length).toBe(2);
      expect(result.breakdown?.every((item) => item.metric && item.value > 0)).toBe(true);
    });
  });
});

describe('formatMetrics', () => {
  it('should format metrics with percentile and score', () => {
    const metrics = {
      percentile: 0.01,
      percentileLabel: 'Top 1.000%',
      impactScore: 95,
      comparison: 'Over 1,000,000 downloads',
    };

    const formatted = formatMetrics(metrics);

    expect(formatted).toContain('Top 1.000%');
    expect(formatted).toContain('95/100');
    expect(formatted).toContain('downloads');
  });

  it('should handle zero percentile', () => {
    const metrics = {
      percentile: 0,
      percentileLabel: 'Not calculated',
      impactScore: 0,
      comparison: 'No metrics provided',
    };

    const formatted = formatMetrics(metrics);

    expect(formatted).toBe('Métricas não calculadas');
  });
});

