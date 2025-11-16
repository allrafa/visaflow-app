import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createProcess, getProcessById, updateProcess, deleteProcess } from '@/lib/services/processService';
import { NotFoundError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/db/client';

// Mock Prisma
vi.mock('@/lib/db/client', () => ({
  prisma: {
    process: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('processService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createProcess', () => {
    it('should create a process with default values', async () => {
      const input = {
        userId: 'user-123',
        title: 'Test Process',
        description: 'Test Description',
      };

      const mockProcess = {
        id: 'process-123',
        ...input,
        northStar: null,
        currentPhase: 'ELIGIBILITY',
        progress: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.process.create).mockResolvedValue(mockProcess as any);

      const result = await createProcess(input);

      expect(prisma.process.create).toHaveBeenCalledWith({
        data: {
          userId: input.userId,
          title: input.title,
          description: input.description,
          northStar: undefined,
          currentPhase: 'ELIGIBILITY',
          progress: 0,
        },
      });
      expect(result).toEqual(mockProcess);
    });

    it('should create a process with northStar', async () => {
      const input = {
        userId: 'user-123',
        title: 'Test Process',
        northStar: 'Test North Star',
      };

      const mockProcess = {
        id: 'process-123',
        ...input,
        description: null,
        currentPhase: 'ELIGIBILITY',
        progress: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.process.create).mockResolvedValue(mockProcess as any);

      await createProcess(input);

      expect(prisma.process.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          northStar: 'Test North Star',
        }),
      });
    });
  });

  describe('getProcessById', () => {
    it('should return process when found', async () => {
      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
        title: 'Test Process',
        tasks: [],
        criteria: [],
        letters: [],
      };

      vi.mocked(prisma.process.findFirst).mockResolvedValue(mockProcess as any);

      const result = await getProcessById('process-123', 'user-123');

      expect(prisma.process.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'process-123',
          userId: 'user-123',
        },
        include: {
          tasks: { orderBy: { order: 'asc' } },
          criteria: true,
          letters: true,
        },
      });
      expect(result).toEqual(mockProcess);
    });

    it('should throw NotFoundError when process not found', async () => {
      vi.mocked(prisma.process.findFirst).mockResolvedValue(null);

      await expect(getProcessById('process-123', 'user-123')).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when user does not own process', async () => {
      vi.mocked(prisma.process.findFirst).mockResolvedValue(null);

      await expect(getProcessById('process-123', 'user-456')).rejects.toThrow(NotFoundError);
    });
  });

  describe('updateProcess', () => {
    it('should update process when user owns it', async () => {
      const existingProcess = {
        id: 'process-123',
        userId: 'user-123',
        title: 'Old Title',
      };

      const updatedProcess = {
        ...existingProcess,
        title: 'New Title',
        description: 'New Description',
      };

      vi.mocked(prisma.process.findFirst).mockResolvedValue(existingProcess as any);
      vi.mocked(prisma.process.update).mockResolvedValue(updatedProcess as any);

      const result = await updateProcess('process-123', 'user-123', {
        title: 'New Title',
        description: 'New Description',
      });

      expect(prisma.process.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'process-123',
          userId: 'user-123',
        },
      });
      expect(prisma.process.update).toHaveBeenCalledWith({
        where: { id: 'process-123' },
        data: {
          title: 'New Title',
          description: 'New Description',
        },
      });
      expect(result).toEqual(updatedProcess);
    });

    it('should throw NotFoundError when process not found', async () => {
      vi.mocked(prisma.process.findFirst).mockResolvedValue(null);

      await expect(
        updateProcess('process-123', 'user-123', { title: 'New Title' })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteProcess', () => {
    it('should delete process when user owns it', async () => {
      const existingProcess = {
        id: 'process-123',
        userId: 'user-123',
      };

      vi.mocked(prisma.process.findFirst).mockResolvedValue(existingProcess as any);
      vi.mocked(prisma.process.delete).mockResolvedValue(existingProcess as any);

      await deleteProcess('process-123', 'user-123');

      expect(prisma.process.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'process-123',
          userId: 'user-123',
        },
      });
      expect(prisma.process.delete).toHaveBeenCalledWith({
        where: { id: 'process-123' },
      });
    });

    it('should throw NotFoundError when process not found', async () => {
      vi.mocked(prisma.process.findFirst).mockResolvedValue(null);

      await expect(deleteProcess('process-123', 'user-123')).rejects.toThrow(NotFoundError);
    });
  });
});



