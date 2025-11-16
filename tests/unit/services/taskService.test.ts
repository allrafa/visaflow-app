import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTask, getTaskById, updateTask, deleteTask, type CreateTaskInput } from '@/lib/services/taskService';
import { NotFoundError, ValidationError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/db/client';

vi.mock('@/lib/db/client', () => ({
  prisma: {
    task: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    process: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('taskService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task with valid input', async () => {
      const input: CreateTaskInput = {
        processId: 'process-123',
        phase: 'ELIGIBILITY' as const,
        title: 'Test Task',
        description: 'Test Description',
        status: 'PENDING' as const,
        order: 0,
        dependsOn: [],
      };

      const mockTask = {
        id: 'task-123',
        ...input,
        dependsOn: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: null,
      };

      // Mock dependencies check - não será chamado porque dependsOn não está definido
      vi.mocked(prisma.task.findMany).mockResolvedValue([]);
      vi.mocked(prisma.task.create).mockResolvedValue(mockTask as any);

      const result = await createTask(input);

      // findMany não deve ser chamado quando dependsOn não está definido ou está vazio
      expect(prisma.task.findMany).not.toHaveBeenCalled();
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          processId: input.processId,
          phase: input.phase,
          title: input.title,
          description: input.description,
          status: input.status || 'PENDING',
          order: input.order || 0,
          dependsOn: input.dependsOn || [],
        },
      });
      expect(result).toEqual(mockTask);
    });

    it('should validate dependencies exist', async () => {
      const input = {
        processId: 'process-123',
        phase: 'ELIGIBILITY' as const,
        title: 'Test Task',
        dependsOn: ['task-456'],
      };

      // Mock dependencies check - return empty array (dependencies don't exist)
      vi.mocked(prisma.task.findMany).mockResolvedValue([]);

      await expect(createTask(input)).rejects.toThrow(ValidationError);
      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: {
          id: { in: ['task-456'] },
          processId: 'process-123',
        },
      });
    });

    it('should validate partial dependencies (some exist, some do not)', async () => {
      const input = {
        processId: 'process-123',
        phase: 'ELIGIBILITY' as const,
        title: 'Test Task',
        dependsOn: ['task-456', 'task-789'],
      };

      // Mock dependencies check - return only one dependency (partial match)
      vi.mocked(prisma.task.findMany).mockResolvedValue([
        { id: 'task-456', processId: 'process-123' },
      ] as any);

      await expect(createTask(input)).rejects.toThrow(ValidationError);
      expect(prisma.task.findMany).toHaveBeenCalled();
    });

    it('should validate dependencies belong to same process', async () => {
      const input = {
        processId: 'process-123',
        phase: 'ELIGIBILITY' as const,
        title: 'Test Task',
        dependsOn: ['task-456'],
      };

      // Mock dependencies check - return empty array because processId doesn't match
      // The where clause filters by processId, so dependency from different process won't be found
      vi.mocked(prisma.task.findMany).mockResolvedValue([]);

      await expect(createTask(input)).rejects.toThrow(ValidationError);
      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: {
          id: { in: ['task-456'] },
          processId: 'process-123', // This filters out dependencies from other processes
        },
      });
    });

    it('should handle empty title', async () => {
      const input = {
        processId: 'process-123',
        phase: 'ELIGIBILITY' as const,
        title: '',
      };

      // Should still create (validation happens at schema level)
      const mockTask = {
        id: 'task-123',
        ...input,
        status: 'PENDING' as const,
        order: 0,
        dependsOn: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: null,
      };

      vi.mocked(prisma.task.findMany).mockResolvedValue([]);
      vi.mocked(prisma.task.create).mockResolvedValue(mockTask as any);

      const result = await createTask(input);
      expect(result).toEqual(mockTask);
    });

    it('should handle multiple dependencies', async () => {
      const input = {
        processId: 'process-123',
        phase: 'ELIGIBILITY' as const,
        title: 'Test Task',
        dependsOn: ['task-1', 'task-2', 'task-3'],
      };

      const mockDependencies = [
        { id: 'task-1', processId: 'process-123' },
        { id: 'task-2', processId: 'process-123' },
        { id: 'task-3', processId: 'process-123' },
      ];

      const mockTask = {
        id: 'task-123',
        ...input,
        status: 'PENDING' as const,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: null,
      };

      vi.mocked(prisma.task.findMany).mockResolvedValue(mockDependencies as any);
      vi.mocked(prisma.task.create).mockResolvedValue(mockTask as any);

      const result = await createTask(input);
      expect(result).toEqual(mockTask);
      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: {
          id: { in: ['task-1', 'task-2', 'task-3'] },
          processId: 'process-123',
        },
      });
    });
  });

  describe('getTaskById', () => {
    it('should return task when found', async () => {
      const mockTask = {
        id: 'task-123',
        processId: 'process-123',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
        uploads: [],
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(mockTask as any);

      const result = await getTaskById('task-123');

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: 'task-123' },
        include: {
          process: true,
          uploads: true,
        },
      });
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundError when task not found', async () => {
      vi.mocked(prisma.task.findUnique).mockResolvedValue(null);

      await expect(getTaskById('invalid-task')).rejects.toThrow(NotFoundError);
    });

    it('should handle task with uploads', async () => {
      const mockTask = {
        id: 'task-123',
        processId: 'process-123',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
        uploads: [
          {
            id: 'upload-1',
            fileName: 'test.pdf',
            fileUrl: 'https://example.com/test.pdf',
          },
        ],
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(mockTask as any);

      const result = await getTaskById('task-123');

      expect(result.uploads).toHaveLength(1);
      expect(result.uploads[0].fileName).toBe('test.pdf');
    });
  });

  describe('updateTask', () => {
    it('should update task when found', async () => {
      const existingTask = {
        id: 'task-123',
        processId: 'process-123',
        status: 'PENDING' as const,
      };

      const updatedTask = {
        ...existingTask,
        title: 'Updated Title',
        status: 'COMPLETED' as const,
        completedAt: new Date(),
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(existingTask as any);
      vi.mocked(prisma.task.findMany).mockResolvedValue([]);
      vi.mocked(prisma.task.update).mockResolvedValue(updatedTask as any);

      const result = await updateTask('task-123', {
        title: 'Updated Title',
        status: 'COMPLETED',
      });

      expect(prisma.task.update).toHaveBeenCalled();
      expect(result).toEqual(updatedTask);
    });

    it('should set completedAt when status is COMPLETED', async () => {
      const existingTask = {
        id: 'task-123',
        processId: 'process-123',
        status: 'PENDING' as const,
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(existingTask as any);
      vi.mocked(prisma.task.findMany).mockResolvedValue([]);
      vi.mocked(prisma.task.update).mockResolvedValue({} as any);

      await updateTask('task-123', {
        status: 'COMPLETED',
      });

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 'task-123' },
        data: expect.objectContaining({
          completedAt: expect.any(Date),
        }),
      });
    });

    it('should throw NotFoundError when task not found', async () => {
      vi.mocked(prisma.task.findUnique).mockResolvedValue(null);

      await expect(
        updateTask('invalid-task', {
          title: 'Updated Title',
        })
      ).rejects.toThrow(NotFoundError);
    });

    it('should validate dependencies when updating', async () => {
      const existingTask = {
        id: 'task-123',
        processId: 'process-123',
        status: 'PENDING' as const,
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(existingTask as any);
      vi.mocked(prisma.task.findMany).mockResolvedValue([]); // Dependencies don't exist

      await expect(
        updateTask('task-123', {
          dependsOn: ['task-456'],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should allow clearing completedAt explicitly when status changes', async () => {
      const existingTask = {
        id: 'task-123',
        processId: 'process-123',
        status: 'COMPLETED' as const,
        completedAt: new Date(),
      };

      const updatedTask = {
        ...existingTask,
        status: 'PENDING' as const,
        completedAt: null,
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(existingTask as any);
      vi.mocked(prisma.task.findMany).mockResolvedValue([]);
      vi.mocked(prisma.task.update).mockResolvedValue(updatedTask as any);

      // Must explicitly pass completedAt: null to clear it
      await updateTask('task-123', {
        status: 'PENDING',
        completedAt: null,
      });

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 'task-123' },
        data: expect.objectContaining({
          status: 'PENDING',
          completedAt: null,
        }),
      });
    });
  });

  describe('deleteTask', () => {
    it('should delete task when found', async () => {
      const existingTask = {
        id: 'task-123',
        processId: 'process-123',
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(existingTask as any);
      vi.mocked(prisma.task.delete).mockResolvedValue(existingTask as any);

      await deleteTask('task-123');

      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: 'task-123' },
      });
    });

    it('should throw NotFoundError when task not found', async () => {
      vi.mocked(prisma.task.findUnique).mockResolvedValue(null);

      await expect(deleteTask('invalid-task')).rejects.toThrow(NotFoundError);
      expect(prisma.task.delete).not.toHaveBeenCalled();
    });
  });
});

