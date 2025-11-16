import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, PATCH, DELETE } from '@/app/api/letters/[id]/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getLetterById, updateLetter, deleteLetter } from '@/lib/services/letterService';
import { ensureOwnership } from '@/lib/auth/getAuthUser';

vi.mock('@/lib/auth/getAuthUser', () => ({
  getAuthUser: vi.fn(),
  ensureOwnership: vi.fn(),
}));

vi.mock('@/lib/services/letterService');

describe('API: /api/letters/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/letters/[id]', () => {
    it('should return letter when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockLetter = {
        id: 'letter-123',
        processId: 'process-123',
        recommenderName: 'Dr. John Smith',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getLetterById).mockResolvedValue(mockLetter as any);
      vi.mocked(ensureOwnership).mockResolvedValue(undefined as any);

      const request = new NextRequest('http://localhost:3000/api/letters/letter-123');
      const response = await GET(request, { params: Promise.resolve({ id: 'letter-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockLetter);
    });
  });

  describe('PATCH /api/letters/[id]', () => {
    it('should update letter when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockLetter = {
        id: 'letter-123',
        processId: 'process-123',
        recommenderName: 'Dr. John Smith',
        status: 'final',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getLetterById).mockResolvedValue(mockLetter as any);
      vi.mocked(ensureOwnership).mockResolvedValue(undefined as any);
      vi.mocked(updateLetter).mockResolvedValue(mockLetter as any);

      const request = new NextRequest('http://localhost:3000/api/letters/letter-123', {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'final',
        }),
      });

      const response = await PATCH(request, { params: Promise.resolve({ id: 'letter-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockLetter);
    });
  });

  describe('DELETE /api/letters/[id]', () => {
    it('should delete letter when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockLetter = {
        id: 'letter-123',
        processId: 'process-123',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getLetterById).mockResolvedValue(mockLetter as any);
      vi.mocked(ensureOwnership).mockResolvedValue(undefined as any);
      vi.mocked(deleteLetter).mockResolvedValue(undefined as any);

      const request = new NextRequest('http://localhost:3000/api/letters/letter-123', {
        method: 'DELETE',
      });

      const response = await DELETE(request, { params: Promise.resolve({ id: 'letter-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
    });
  });
});



