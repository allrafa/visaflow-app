import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai/generate-merits/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { generateFinalMerits } from '@/lib/services/aiService';
import { getProcessById } from '@/lib/services/processService';
import { getCriteriaByProcessId } from '@/lib/services/criteriaService';

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
vi.mock('@/lib/services/processService');
vi.mock('@/lib/services/criteriaService');

describe('API: /api/ai/generate-merits', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = 'test-key';
  });

  describe('POST /api/ai/generate-merits', () => {
    it('should generate Final Merits Statement', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        northStar: 'Test North Star Statement',
      };
      const mockCriteria = [
        {
          id: 'criteria-1',
          criteria: 'AWARDS',
          overview: 'Test overview',
          validationScore: 85,
        },
        {
          id: 'criteria-2',
          criteria: 'PRESS',
          overview: 'Test overview 2',
          validationScore: 75,
        },
      ];
      const mockResult = {
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
          totalCriteria: 2,
          averageScore: 80,
          strongCriteria: 1,
          moderateCriteria: 1,
          weakCriteria: 0,
        },
        recommendations: [],
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(getCriteriaByProcessId).mockResolvedValue(mockCriteria as any);
      vi.mocked(generateFinalMerits).mockResolvedValue(mockResult as any);

      const request = new NextRequest('http://localhost:3000/api/ai/generate-merits', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockResult);
      expect(getProcessById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000');
      expect(getCriteriaByProcessId).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440001');
      expect(generateFinalMerits).toHaveBeenCalledWith({
        processId: '550e8400-e29b-41d4-a716-446655440001',
        northStar: 'Test North Star Statement',
        criteria: [
          {
            id: 'criteria-1',
            criteria: 'AWARDS',
            overview: 'Test overview',
            validationScore: 85,
          },
          {
            id: 'criteria-2',
            criteria: 'PRESS',
            overview: 'Test overview 2',
            validationScore: 75,
          },
        ],
      });
    });

    it('should return 400 when no criteria found', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(getCriteriaByProcessId).mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/ai/generate-merits', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('No criteria found for this process');
      expect(data.code).toBe('NO_CRITERIA');
    });

    it('should return 401 when not authenticated', async () => {
      const { UnauthorizedError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockRejectedValue(new UnauthorizedError('Not authenticated'));

      const request = new NextRequest('http://localhost:3000/api/ai/generate-merits', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(401);
    });

    it('should return 400 for invalid process ID', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);

      const request = new NextRequest('http://localhost:3000/api/ai/generate-merits', {
        method: 'POST',
        body: JSON.stringify({
          processId: 'invalid-uuid',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('should return 404 when process not found', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const { NotFoundError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockRejectedValue(new NotFoundError('Process', '00000000-0000-0000-0000-000000000000'));

      const request = new NextRequest('http://localhost:3000/api/ai/generate-merits', {
        method: 'POST',
        body: JSON.stringify({
          processId: '00000000-0000-0000-0000-000000000000',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(404);
    });

    it('should handle process without northStar', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        northStar: null,
      };
      const mockCriteria = [
        {
          id: 'criteria-1',
          criteria: 'AWARDS',
          validationScore: 85,
        },
      ];
      const mockResult = {
        document: 'Full document',
        sections: [],
        crossReferences: [],
        metrics: {
          totalCriteria: 1,
          averageScore: 85,
        },
        recommendations: [],
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(getCriteriaByProcessId).mockResolvedValue(mockCriteria as any);
      vi.mocked(generateFinalMerits).mockResolvedValue(mockResult as any);

      const request = new NextRequest('http://localhost:3000/api/ai/generate-merits', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(generateFinalMerits).toHaveBeenCalledWith({
        processId: '550e8400-e29b-41d4-a716-446655440001',
        northStar: undefined,
        criteria: expect.arrayContaining([
          expect.objectContaining({
            id: 'criteria-1',
            criteria: 'AWARDS',
          }),
        ]),
      });
    });
  });
});

