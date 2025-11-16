import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/processes/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessesByUserId, createProcess } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/processService');

describe('API: /api/processes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/processes', () => {
    it('should return processes for authenticated user', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      const mockProcesses = [
        {
          id: 'process-123',
          userId: 'user-123',
          title: 'Test Process',
          _count: { tasks: 2, criteria: 1, letters: 0 },
        },
      ];

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessesByUserId).mockResolvedValue(mockProcesses as any);

      const request = new NextRequest('http://localhost:3000/api/processes');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockProcesses);
      expect(getProcessesByUserId).toHaveBeenCalledWith('user-123');
    });

    it('should return 401 when not authenticated', async () => {
      const { UnauthorizedError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockRejectedValue(new UnauthorizedError('Not authenticated'));

      const request = new NextRequest('http://localhost:3000/api/processes');
      const response = await GET(request);

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/processes', () => {
    it('should create process with valid input', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
        title: 'New Process',
        currentPhase: 'ELIGIBILITY',
        progress: 0,
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(createProcess).mockResolvedValue(mockProcess as any);

      const request = new NextRequest('http://localhost:3000/api/processes', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Process',
          description: 'Test description',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(mockProcess);
      expect(createProcess).toHaveBeenCalledWith({
        userId: 'user-123',
        title: 'New Process',
        description: 'Test description',
      });
    });

    it('should return 400 for invalid input', async () => {
      const mockUser = { id: 'user-123' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);

      const request = new NextRequest('http://localhost:3000/api/processes', {
        method: 'POST',
        body: JSON.stringify({
          // Missing required title
          description: 'Test description',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });
  });
});

