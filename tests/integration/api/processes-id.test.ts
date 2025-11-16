import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, PATCH, DELETE } from '@/app/api/processes/[id]/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessById, updateProcess, deleteProcess } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/processService');

describe('API: /api/processes/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/processes/[id]', () => {
    it('should return process when user owns it', async () => {
      const mockUser = { id: 'user-123' };
      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
        title: 'Test Process',
        tasks: [],
        criteria: [],
        letters: [],
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);

      const request = new NextRequest('http://localhost:3000/api/processes/process-123');
      const response = await GET(request, { params: Promise.resolve({ id: 'process-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockProcess);
      expect(getProcessById).toHaveBeenCalledWith('process-123', 'user-123');
    });

    it('should return 404 when process not found', async () => {
      const mockUser = { id: 'user-123' };
      const { NotFoundError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockRejectedValue(new NotFoundError('Process', 'invalid'));

      const request = new NextRequest('http://localhost:3000/api/processes/invalid');
      const response = await GET(request, { params: Promise.resolve({ id: 'invalid' }) });

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/processes/[id]', () => {
    it('should update process when user owns it', async () => {
      const mockUser = { id: 'user-123' };
      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
        title: 'Updated Process',
        currentPhase: 'EVIDENCE',
        progress: 25,
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(updateProcess).mockResolvedValue(mockProcess as any);

      const request = new NextRequest('http://localhost:3000/api/processes/process-123', {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated Process',
          currentPhase: 'EVIDENCE',
          progress: 25,
        }),
      });

      const response = await PATCH(request, { params: Promise.resolve({ id: 'process-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockProcess);
      expect(updateProcess).toHaveBeenCalledWith(
        'process-123',
        'user-123',
        expect.objectContaining({
          title: 'Updated Process',
          currentPhase: 'EVIDENCE',
          progress: 25,
        })
      );
    });

    it('should return 400 for invalid input', async () => {
      const mockUser = { id: 'user-123' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);

      const request = new NextRequest('http://localhost:3000/api/processes/process-123', {
        method: 'PATCH',
        body: JSON.stringify({
          progress: 150, // Invalid: > 100
        }),
      });

      const response = await PATCH(request, { params: Promise.resolve({ id: 'process-123' }) });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/processes/[id]', () => {
    it('should delete process when user owns it', async () => {
      const mockUser = { id: 'user-123' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(deleteProcess).mockResolvedValue(undefined as any);

      const request = new NextRequest('http://localhost:3000/api/processes/process-123', {
        method: 'DELETE',
      });

      const response = await DELETE(request, { params: Promise.resolve({ id: 'process-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(deleteProcess).toHaveBeenCalledWith('process-123', 'user-123');
    });

    it('should return 404 when process not found', async () => {
      const mockUser = { id: 'user-123' };
      const { NotFoundError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(deleteProcess).mockRejectedValue(new NotFoundError('Process', 'invalid'));

      const request = new NextRequest('http://localhost:3000/api/processes/invalid', {
        method: 'DELETE',
      });

      const response = await DELETE(request, { params: Promise.resolve({ id: 'invalid' }) });

      expect(response.status).toBe(404);
    });
  });
});

