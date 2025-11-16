import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createLetter, getLetterById, updateLetter, deleteLetter } from '@/lib/services/letterService';
import { NotFoundError, ValidationError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/db/client';

vi.mock('@/lib/db/client', () => ({
  prisma: {
    recommendationLetter: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    process: {
      findUnique: vi.fn(),
    },
  },
}));

describe('letterService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createLetter', () => {
    it('should create letter with valid input', async () => {
      const input = {
        processId: 'process-123',
        recommenderName: 'Dr. John Smith',
        recommenderTitle: 'Professor',
        recommenderOrg: 'Stanford University',
        recommenderEmail: 'john@stanford.edu',
        content: 'Test letter content',
        status: 'draft',
      };

      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
      };

      const mockLetter = {
        id: 'letter-123',
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.process.findUnique).mockResolvedValue(mockProcess as any);
      vi.mocked(prisma.recommendationLetter.create).mockResolvedValue(mockLetter as any);

      const result = await createLetter(input);

      expect(prisma.process.findUnique).toHaveBeenCalledWith({
        where: { id: 'process-123' },
      });
      expect(prisma.recommendationLetter.create).toHaveBeenCalledWith({
        data: {
          ...input,
          status: 'draft',
        },
      });
      expect(result).toEqual(mockLetter);
    });

    it('should default to draft status when not provided', async () => {
      const input = {
        processId: 'process-123',
        recommenderName: 'Dr. John Smith',
        recommenderTitle: 'Professor',
      };

      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
      };

      vi.mocked(prisma.process.findUnique).mockResolvedValue(mockProcess as any);
      vi.mocked(prisma.recommendationLetter.create).mockResolvedValue({} as any);

      await createLetter(input);

      expect(prisma.recommendationLetter.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          status: 'draft',
        }),
      });
    });

    it('should throw NotFoundError when process does not exist', async () => {
      vi.mocked(prisma.process.findUnique).mockResolvedValue(null);

      await expect(
        createLetter({
          processId: 'invalid-process',
          recommenderName: 'Dr. John Smith',
          recommenderTitle: 'Professor',
        })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('getLetterById', () => {
    it('should return letter when found', async () => {
      const mockLetter = {
        id: 'letter-123',
        processId: 'process-123',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(prisma.recommendationLetter.findUnique).mockResolvedValue(mockLetter as any);

      const result = await getLetterById('letter-123');

      expect(prisma.recommendationLetter.findUnique).toHaveBeenCalledWith({
        where: { id: 'letter-123' },
        include: { process: true },
      });
      expect(result).toEqual(mockLetter);
    });

    it('should throw NotFoundError when letter not found', async () => {
      vi.mocked(prisma.recommendationLetter.findUnique).mockResolvedValue(null);

      await expect(getLetterById('invalid-letter')).rejects.toThrow(NotFoundError);
    });
  });

  describe('updateLetter', () => {
    it('should update letter when found', async () => {
      const existingLetter = {
        id: 'letter-123',
        status: 'draft',
      };

      const updatedLetter = {
        ...existingLetter,
        status: 'final',
        content: 'Updated content',
      };

      vi.mocked(prisma.recommendationLetter.findUnique).mockResolvedValue(existingLetter as any);
      vi.mocked(prisma.recommendationLetter.update).mockResolvedValue(updatedLetter as any);

      const result = await updateLetter('letter-123', {
        status: 'final',
        content: 'Updated content',
      });

      expect(prisma.recommendationLetter.update).toHaveBeenCalledWith({
        where: { id: 'letter-123' },
        data: {
          status: 'final',
          content: 'Updated content',
        },
      });
      expect(result).toEqual(updatedLetter);
    });

    it('should throw ValidationError when trying to sign without final status', async () => {
      const existingLetter = {
        id: 'letter-123',
        status: 'draft',
      };

      vi.mocked(prisma.recommendationLetter.findUnique).mockResolvedValue(existingLetter as any);

      await expect(
        updateLetter('letter-123', {
          status: 'signed',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should allow signing when status is final', async () => {
      const existingLetter = {
        id: 'letter-123',
        status: 'final',
      };

      const updatedLetter = {
        ...existingLetter,
        status: 'signed',
      };

      vi.mocked(prisma.recommendationLetter.findUnique).mockResolvedValue(existingLetter as any);
      vi.mocked(prisma.recommendationLetter.update).mockResolvedValue(updatedLetter as any);

      const result = await updateLetter('letter-123', {
        status: 'signed',
      });

      expect(result.status).toBe('signed');
    });

    it('should throw ValidationError for invalid status', async () => {
      const existingLetter = {
        id: 'letter-123',
        status: 'draft',
      };

      vi.mocked(prisma.recommendationLetter.findUnique).mockResolvedValue(existingLetter as any);

      await expect(
        updateLetter('letter-123', {
          status: 'invalid-status' as any,
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('deleteLetter', () => {
    it('should delete letter when found', async () => {
      const existingLetter = {
        id: 'letter-123',
        processId: 'process-123',
      };

      vi.mocked(prisma.recommendationLetter.findUnique).mockResolvedValue(existingLetter as any);
      vi.mocked(prisma.recommendationLetter.delete).mockResolvedValue(existingLetter as any);

      await deleteLetter('letter-123');

      expect(prisma.recommendationLetter.delete).toHaveBeenCalledWith({
        where: { id: 'letter-123' },
      });
    });
  });
});



