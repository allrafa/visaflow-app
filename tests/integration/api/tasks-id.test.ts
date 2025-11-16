import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, PATCH, DELETE } from '@/app/api/tasks/[id]/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getTaskById, updateTask, deleteTask } from '@/lib/services/taskService';
import { getProcessById } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/taskService');
vi.mock('@/lib/services/processService');

describe('API: /api/tasks/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/tasks/[id]', () => {
    it('should return task when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockTask = {
        id: 'task-123',
        processId: 'process-123',
        title: 'Test Task',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
        uploads: [],
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getTaskById).mockResolvedValue(mockTask as any);
      vi.mocked(getProcessById).mockResolvedValue(mockTask.process as any);

      const request = new NextRequest('http://localhost:3000/api/tasks/task-123');
      const response = await GET(request, { params: Promise.resolve({ id: 'task-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTask);
    });

    it('should return 404 when task not found', async () => {
      const mockUser = { id: 'user-123' };
      const { NotFoundError } = await import('@/lib/errors/AppError');
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getTaskById).mockRejectedValue(new NotFoundError('Task', 'invalid'));

      const request = new NextRequest('http://localhost:3000/api/tasks/invalid');
      const response = await GET(request, { params: Promise.resolve({ id: 'invalid' }) });

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/[id]', () => {
    it('should update task when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockTask = {
        id: 'task-123',
        processId: 'process-123',
        title: 'Updated Task',
        status: 'COMPLETED',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getTaskById).mockResolvedValue(mockTask as any);
      vi.mocked(getProcessById).mockResolvedValue(mockTask.process as any);
      vi.mocked(updateTask).mockResolvedValue(mockTask as any);

      const request = new NextRequest('http://localhost:3000/api/tasks/task-123', {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated Task',
          status: 'COMPLETED',
        }),
      });

      const response = await PATCH(request, { params: Promise.resolve({ id: 'task-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTask);
    });
  });

  describe('DELETE /api/tasks/[id]', () => {
    it('should delete task when user owns process', async () => {
      const mockUser = { id: 'user-123' };
      const mockTask = {
        id: 'task-123',
        processId: 'process-123',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getTaskById).mockResolvedValue(mockTask as any);
      vi.mocked(getProcessById).mockResolvedValue(mockTask.process as any);
      vi.mocked(deleteTask).mockResolvedValue(undefined as any);

      const request = new NextRequest('http://localhost:3000/api/tasks/task-123', {
        method: 'DELETE',
      });

      const response = await DELETE(request, { params: Promise.resolve({ id: 'task-123' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
    });
  });
});

