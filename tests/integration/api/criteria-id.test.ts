import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, PATCH, DELETE } from '@/app/api/criteria/[id]/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getCriteriaById, updateCriteria, deleteCriteria } from '@/lib/services/criteriaService';
import { getProcessById } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/criteriaService');
vi.mock('@/lib/services/processService');

describe('API: /api/criteria/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/criteria/[id]', () => {
    it('should return criteria when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockCriteria = {
        id: 'criteria-123',
        processId: 'process-123',
        criteria: 'AWARDS',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getCriteriaById).mockResolvedValue(mockCriteria as any);
      vi.mocked(getProcessById).mockResolvedValue(mockCriteria.process as any);

      const request = new NextRequest('http://localhost:3000/api/criteria/criteria-123');
      const response = await GET(request, { params: Promise.resolve({ id: 'criteria-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockCriteria);
    });
  });

  describe('PATCH /api/criteria/[id]', () => {
    it('should update criteria when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockCriteria = {
        id: 'criteria-123',
        processId: 'process-123',
        criteria: 'AWARDS',
        overview: 'Updated Overview',
        validationScore: 85,
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getCriteriaById).mockResolvedValue(mockCriteria as any);
      vi.mocked(getProcessById).mockResolvedValue(mockCriteria.process as any);
      vi.mocked(updateCriteria).mockResolvedValue(mockCriteria as any);

      const request = new NextRequest('http://localhost:3000/api/criteria/criteria-123', {
        method: 'PATCH',
        body: JSON.stringify({
          overview: 'Updated Overview',
          validationScore: 85,
        }),
      });

      const response = await PATCH(request, { params: Promise.resolve({ id: 'criteria-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockCriteria);
    });
  });

  describe('DELETE /api/criteria/[id]', () => {
    it('should delete criteria when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockCriteria = {
        id: 'criteria-123',
        processId: 'process-123',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getCriteriaById).mockResolvedValue(mockCriteria as any);
      vi.mocked(getProcessById).mockResolvedValue(mockCriteria.process as any);
      vi.mocked(deleteCriteria).mockResolvedValue(undefined as any);

      const request = new NextRequest('http://localhost:3000/api/criteria/criteria-123', {
        method: 'DELETE',
      });

      const response = await DELETE(request, { params: Promise.resolve({ id: 'criteria-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
    });
  });
});



