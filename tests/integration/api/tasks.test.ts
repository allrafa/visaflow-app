import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/tasks/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getTasksByProcessId, createTask } from '@/lib/services/taskService';
import { getProcessById } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/taskService');
vi.mock('@/lib/services/processService');

describe('API: /api/tasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('should return tasks for process owned by user', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
      };
      const mockTasks = [
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          processId: '550e8400-e29b-41d4-a716-446655440001',
          title: 'Test Task',
          uploads: [],
        },
      ];

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(getTasksByProcessId).mockResolvedValue(mockTasks as any);

      const request = new NextRequest('http://localhost:3000/api/tasks?processId=550e8400-e29b-41d4-a716-446655440001');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTasks);
    });

    it('should return 404 when process not found', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const { NotFoundError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockRejectedValue(new NotFoundError('Process', '00000000-0000-0000-0000-000000000000'));

      const request = new NextRequest('http://localhost:3000/api/tasks?processId=00000000-0000-0000-0000-000000000000');
      const response = await GET(request);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create task with valid input', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
      };
      const mockTask = {
        id: '550e8400-e29b-41d4-a716-446655440002',
        processId: '550e8400-e29b-41d4-a716-446655440001',
        title: 'New Task',
        phase: 'ELIGIBILITY',
        status: 'PENDING',
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(createTask).mockResolvedValue(mockTask as any);

      const request = new NextRequest('http://localhost:3000/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
          phase: 'ELIGIBILITY',
          title: 'New Task',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(mockTask);
    });
  });
});

