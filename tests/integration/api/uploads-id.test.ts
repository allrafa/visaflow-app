import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { DELETE } from '@/app/api/uploads/[id]/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { deleteUpload } from '@/lib/services/uploadService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/uploadService');

describe('API: /api/uploads/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('DELETE /api/uploads/[id]', () => {
    it('should delete upload when user owns process', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(deleteUpload).mockResolvedValue(undefined as any);

      const request = new NextRequest('http://localhost:3000/api/uploads/550e8400-e29b-41d4-a716-446655440001', {
        method: 'DELETE',
      });

      const response = await DELETE(request, { params: Promise.resolve({ id: '550e8400-e29b-41d4-a716-446655440001' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(deleteUpload).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000');
    });

    it('should return 404 when upload not found', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const { NotFoundError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(deleteUpload).mockRejectedValue(new NotFoundError('Upload', '00000000-0000-0000-0000-000000000000'));

      const request = new NextRequest('http://localhost:3000/api/uploads/00000000-0000-0000-0000-000000000000', {
        method: 'DELETE',
      });

      const response = await DELETE(request, { params: Promise.resolve({ id: '00000000-0000-0000-0000-000000000000' }) });

      expect(response.status).toBe(404);
    });
  });
});

