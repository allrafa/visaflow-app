import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/criteria/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getCriteriaByProcessId, createCriteria } from '@/lib/services/criteriaService';
import { getProcessById } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/criteriaService');
vi.mock('@/lib/services/processService');

describe('API: /api/criteria', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/criteria', () => {
    it('should return criteria for process owned by user', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
      };
      const mockCriteria = [
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          processId: '550e8400-e29b-41d4-a716-446655440001',
          criteria: 'AWARDS',
        },
      ];

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(getCriteriaByProcessId).mockResolvedValue(mockCriteria as any);

      const request = new NextRequest('http://localhost:3000/api/criteria?processId=550e8400-e29b-41d4-a716-446655440001');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockCriteria);
    });
  });

  describe('POST /api/criteria', () => {
    it('should create criteria with valid input', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
      };
      const mockCriteria = {
        id: '550e8400-e29b-41d4-a716-446655440002',
        processId: '550e8400-e29b-41d4-a716-446655440001',
        criteria: 'AWARDS',
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(createCriteria).mockResolvedValue(mockCriteria as any);

      const request = new NextRequest('http://localhost:3000/api/criteria', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
          criteria: 'AWARDS',
          overview: 'Test overview',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(mockCriteria);
    });
  });
});

