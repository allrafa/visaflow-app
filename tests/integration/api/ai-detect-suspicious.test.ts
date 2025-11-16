import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai/detect-suspicious/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { detectSuspiciousPractices } from '@/lib/services/aiService';

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

describe('API: /api/ai/detect-suspicious', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = 'test-key';
  });

  describe('POST /api/ai/detect-suspicious', () => {
    it('should detect suspicious practices', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockIssues = [
        {
          type: 'paid_coverage',
          message: 'Paid coverage detected',
          severity: 'high',
        },
        {
          type: 'ai_generated',
          message: 'AI-generated content detected',
          severity: 'medium',
        },
      ];

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(detectSuspiciousPractices).mockResolvedValue(mockIssues as any);

      const request = new NextRequest('http://localhost:3000/api/ai/detect-suspicious', {
        method: 'POST',
        body: JSON.stringify({
          content: 'Test content mentioning Globee Awards',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ issues: mockIssues });
      expect(detectSuspiciousPractices).toHaveBeenCalledWith('Test content mentioning Globee Awards');
    });

    it('should return empty array when no issues found', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(detectSuspiciousPractices).mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/ai/detect-suspicious', {
        method: 'POST',
        body: JSON.stringify({
          content: 'Clean content without issues',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ issues: [] });
    });

    it('should return 401 when not authenticated', async () => {
      const { UnauthorizedError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockRejectedValue(new UnauthorizedError('Not authenticated'));

      const request = new NextRequest('http://localhost:3000/api/ai/detect-suspicious', {
        method: 'POST',
        body: JSON.stringify({
          content: 'Test content',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(401);
    });

    it('should return 400 for invalid input', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);

      const request = new NextRequest('http://localhost:3000/api/ai/detect-suspicious', {
        method: 'POST',
        body: JSON.stringify({
          // Missing required content field
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });
  });
});