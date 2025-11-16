import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ValidationError } from '@/lib/errors/AppError';

// Mock Anthropic SDK - criar função mock dentro do factory para evitar hoisting
// Usar objeto global para compartilhar a referência
vi.mock('@anthropic-ai/sdk', () => {
  const createFn = vi.fn();
  // Armazenar no objeto global para acesso nos testes
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).__anthropicMockCreate = createFn;
  }
  
  return {
    default: class MockAnthropic {
      messages = {
        create: createFn,
      };
      
      constructor(config?: any) {
        // Constructor vazio
      }
    },
  };
});

// Importar após mock
import { validateCriteriaContent, detectSuspiciousPractices, generateFinalMerits } from '@/lib/services/aiService';

describe('aiService', () => {
  let mockMessagesCreate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = 'test-key';
    
    // Obter referência ao mock do objeto global
    mockMessagesCreate = (globalThis as any).__anthropicMockCreate || vi.fn();
  });

  describe('validateCriteriaContent', () => {
    it('should throw ValidationError when API key is not configured', async () => {
      delete process.env.ANTHROPIC_API_KEY;

      await expect(
        validateCriteriaContent('AWARDS', {
          overview: 'Test overview',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should return validation result with score', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              isValid: true,
              score: 85,
              subsectionScores: {
                overview: 80,
                context: 85,
                impact: 90,
                evidence: 85,
              },
              issues: [],
              feedback: 'Good content',
              approvalPatterns: ['pattern1'],
              rejectionPatterns: [],
              aiGeneratedLikelihood: 20,
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await validateCriteriaContent('AWARDS', {
        overview: 'Test overview',
        context: 'Test context',
        impact: 'Test impact',
        evidence: 'Test evidence',
      });

      expect(result.isValid).toBe(true);
      expect(result.score).toBe(85);
      expect(result.subsectionScores).toBeDefined();
      expect(result.issues).toEqual([]);
    });

    it('should handle JSON parsing errors', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: 'Invalid JSON response',
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      await expect(
        validateCriteriaContent('AWARDS', {
          overview: 'Test',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle API errors', async () => {
      mockMessagesCreate.mockRejectedValue(new Error('API Error: Rate limit exceeded'));

      await expect(
        validateCriteriaContent('AWARDS', {
          overview: 'Test',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle empty content array', async () => {
      const mockResponse = {
        content: [],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      await expect(
        validateCriteriaContent('AWARDS', {
          overview: 'Test',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle non-text content type', async () => {
      const mockResponse = {
        content: [
          {
            type: 'image',
            source: { type: 'url', url: 'https://example.com/image.png' },
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      await expect(
        validateCriteriaContent('AWARDS', {
          overview: 'Test',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle empty text content', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: '',
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      await expect(
        validateCriteriaContent('AWARDS', {
          overview: 'Test',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle partial content (missing optional fields)', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              isValid: true,
              score: 75,
              issues: [],
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await validateCriteriaContent('AWARDS', {
        overview: 'Test overview',
      });

      expect(result.isValid).toBe(true);
      expect(result.score).toBe(75);
      expect(result.issues).toEqual([]);
    });
  });

  describe('detectSuspiciousPractices', () => {
    it('should return empty array when API key is not configured', async () => {
      delete process.env.ANTHROPIC_API_KEY;

      const result = await detectSuspiciousPractices('Test content');

      expect(result).toEqual([]);
    });

    it('should detect suspicious practices', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              issues: [
                {
                  type: 'paid_coverage',
                  message: 'Paid coverage detected',
                  severity: 'high',
                },
              ],
              aiGeneratedLikelihood: 75,
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await detectSuspiciousPractices('Test content mentioning Globee Awards');

      expect(result.length).toBeGreaterThan(0);
      expect(result.some((issue) => issue.type === 'paid_coverage')).toBe(true);
    });

    it('should handle API errors gracefully', async () => {
      mockMessagesCreate.mockRejectedValue(new Error('API Error'));

      const result = await detectSuspiciousPractices('Test content');

      // Should return empty array on error (graceful degradation)
      expect(result).toEqual([]);
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              issues: [],
              aiGeneratedLikelihood: 0,
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await detectSuspiciousPractices('Clean content');

      expect(result).toEqual([]);
    });

    it('should handle invalid JSON response', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: 'Invalid JSON',
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      // Should return empty array on JSON parse error (graceful degradation)
      const result = await detectSuspiciousPractices('Test content');
      expect(result).toEqual([]);
    });
  });

  describe('generateFinalMerits', () => {
    it('should throw ValidationError when API key is not configured', async () => {
      delete process.env.ANTHROPIC_API_KEY;

      await expect(
        generateFinalMerits({
          processId: 'process-123',
          criteria: [],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should generate Final Merits document', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              document: 'Full document content...',
              sections: [
                {
                  title: 'Executive Summary',
                  content: 'Summary content',
                  order: 1,
                },
              ],
              crossReferences: [],
              metrics: {
                totalCriteria: 3,
                averageScore: 80,
                strongCriteria: 2,
                moderateCriteria: 1,
                weakCriteria: 0,
              },
              recommendations: [],
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await generateFinalMerits({
        processId: 'process-123',
        northStar: 'Test north star',
        criteria: [
          {
            id: 'criteria-1',
            criteria: 'AWARDS',
            overview: 'Test overview',
            validationScore: 85,
          },
        ],
      });

      expect(result.document).toBeDefined();
      expect(result.sections).toBeDefined();
      expect(result.metrics.totalCriteria).toBe(3);
    });

    it('should calculate metrics when not provided by AI', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              document: 'Full document',
              sections: [],
              crossReferences: [],
              recommendations: [],
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await generateFinalMerits({
        processId: 'process-123',
        criteria: [
          {
            id: 'criteria-1',
            criteria: 'AWARDS',
            validationScore: 85,
          },
          {
            id: 'criteria-2',
            criteria: 'PRESS',
            validationScore: 75,
          },
        ],
      });

      expect(result.metrics.totalCriteria).toBe(2);
      expect(result.metrics.averageScore).toBe(80);
      expect(result.metrics.strongCriteria).toBe(1);
      expect(result.metrics.moderateCriteria).toBe(1);
    });

    it('should handle API errors', async () => {
      mockMessagesCreate.mockRejectedValue(new Error('API Error'));

      await expect(
        generateFinalMerits({
          processId: 'process-123',
          criteria: [
            {
              id: 'criteria-1',
              criteria: 'AWARDS',
            },
          ],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle empty criteria array', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              document: 'Full document',
              sections: [],
              crossReferences: [],
              metrics: {
                totalCriteria: 0,
                averageScore: 0,
              },
              recommendations: [],
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await generateFinalMerits({
        processId: 'process-123',
        criteria: [],
      });

      expect(result.metrics.totalCriteria).toBe(0);
    });

    it('should handle invalid JSON response', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: 'Invalid JSON response',
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      await expect(
        generateFinalMerits({
          processId: 'process-123',
          criteria: [
            {
              id: 'criteria-1',
              criteria: 'AWARDS',
            },
          ],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle missing metrics in AI response', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              document: 'Full document',
              sections: [],
              crossReferences: [],
              recommendations: [],
              // metrics missing
            }),
          },
        ],
      };

      mockMessagesCreate.mockResolvedValue(mockResponse as any);

      const result = await generateFinalMerits({
        processId: 'process-123',
        criteria: [
          {
            id: 'criteria-1',
            criteria: 'AWARDS',
            validationScore: 85,
          },
        ],
      });

      // Should calculate metrics from criteria
      expect(result.metrics.totalCriteria).toBe(1);
      expect(result.metrics.averageScore).toBe(85);
    });
  });
});

