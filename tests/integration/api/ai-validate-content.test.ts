import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai/validate-content/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { validateCriteriaContent } from '@/lib/services/aiService';

// Mock Anthropic SDK para evitar erro de browser environment
vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: class MockAnthropic {
      messages = {
        create: vi.fn(),
      };
      constructor() {}
    },
  };
});

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/aiService');

describe('API: /api/ai/validate-content', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = 'test-key';
  });

  describe('POST /api/ai/validate-content', () => {
    it('should validate criteria content with valid input', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockValidationResult = {
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
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(validateCriteriaContent).mockResolvedValue(mockValidationResult as any);

      const request = new NextRequest('http://localhost:3000/api/ai/validate-content', {
        method: 'POST',
        body: JSON.stringify({
          criteria: 'AWARDS',
          overview: 'Test overview',
          context: 'Test context',
          impact: 'Test impact',
          evidence: 'Test evidence',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockValidationResult);
      expect(validateCriteriaContent).toHaveBeenCalledWith('AWARDS', {
        overview: 'Test overview',
        context: 'Test context',
        impact: 'Test impact',
        evidence: 'Test evidence',
      });
    });

    it('should return 401 when not authenticated', async () => {
      const { UnauthorizedError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockRejectedValue(new UnauthorizedError('Not authenticated'));

      const request = new NextRequest('http://localhost:3000/api/ai/validate-content', {
        method: 'POST',
        body: JSON.stringify({
          criteria: 'AWARDS',
          overview: 'Test overview',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(401);
    });

    it('should return 400 for invalid input', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);

      const request = new NextRequest('http://localhost:3000/api/ai/validate-content', {
        method: 'POST',
        body: JSON.stringify({
          // Missing required criteria
          overview: 'Test overview',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('should handle optional fields', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockValidationResult = {
        isValid: true,
        score: 75,
        issues: [],
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(validateCriteriaContent).mockResolvedValue(mockValidationResult as any);

      const request = new NextRequest('http://localhost:3000/api/ai/validate-content', {
        method: 'POST',
        body: JSON.stringify({
          criteria: 'AWARDS',
          overview: 'Test overview',
          // Other fields optional
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockValidationResult);
    });
  });
});