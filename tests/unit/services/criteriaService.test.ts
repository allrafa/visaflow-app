import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createCriteria, getCriteriaById, updateCriteria, deleteCriteria } from '@/lib/services/criteriaService';
import { NotFoundError, ValidationError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/db/client';

vi.mock('@/lib/db/client', () => ({
  prisma: {
    criteriaEvidence: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    process: {
      findUnique: vi.fn(),
    },
  },
}));

describe('criteriaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createCriteria', () => {
    it('should create criteria with valid input', async () => {
      const input = {
        processId: 'process-123',
        criteria: 'AWARDS' as const,
        overview: 'Test Overview',
        context: 'Test Context',
        impact: 'Test Impact',
        evidence: 'Test Evidence',
      };

      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
      };

      const mockCriteria = {
        id: 'criteria-123',
        ...input,
        metricsData: null,
        isValidated: false,
        validationScore: null,
        validationIssues: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.process.findUnique).mockResolvedValue(mockProcess as any);
      vi.mocked(prisma.criteriaEvidence.findFirst).mockResolvedValue(null);
      vi.mocked(prisma.criteriaEvidence.create).mockResolvedValue(mockCriteria as any);

      const result = await createCriteria(input);

      expect(prisma.process.findUnique).toHaveBeenCalledWith({
        where: { id: 'process-123' },
      });
      expect(prisma.criteriaEvidence.create).toHaveBeenCalledWith({
        data: {
          processId: input.processId,
          criteria: input.criteria,
          overview: input.overview,
          context: input.context,
          impact: input.impact,
          evidence: input.evidence,
          metricsData: undefined,
        },
      });
      expect(result).toEqual(mockCriteria);
    });

    it('should throw NotFoundError when process does not exist', async () => {
      vi.mocked(prisma.process.findUnique).mockResolvedValue(null);

      await expect(
        createCriteria({
          processId: 'invalid-process',
          criteria: 'AWARDS',
        })
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw ValidationError when criteria already exists', async () => {
      const input = {
        processId: 'process-123',
        criteria: 'AWARDS' as const,
      };

      const mockProcess = {
        id: 'process-123',
        userId: 'user-123',
      };

      const existingCriteria = {
        id: 'criteria-123',
        processId: 'process-123',
        criteria: 'AWARDS',
      };

      vi.mocked(prisma.process.findUnique).mockResolvedValue(mockProcess as any);
      vi.mocked(prisma.criteriaEvidence.findFirst).mockResolvedValue(existingCriteria as any);

      await expect(createCriteria(input)).rejects.toThrow(ValidationError);
    });
  });

  describe('getCriteriaById', () => {
    it('should return criteria when found', async () => {
      const mockCriteria = {
        id: 'criteria-123',
        processId: 'process-123',
        criteria: 'AWARDS',
        process: {
          id: 'process-123',
          userId: 'user-123',
        },
      };

      vi.mocked(prisma.criteriaEvidence.findUnique).mockResolvedValue(mockCriteria as any);

      const result = await getCriteriaById('criteria-123');

      expect(prisma.criteriaEvidence.findUnique).toHaveBeenCalledWith({
        where: { id: 'criteria-123' },
        include: { process: true },
      });
      expect(result).toEqual(mockCriteria);
    });

    it('should throw NotFoundError when criteria not found', async () => {
      vi.mocked(prisma.criteriaEvidence.findUnique).mockResolvedValue(null);

      await expect(getCriteriaById('invalid-criteria')).rejects.toThrow(NotFoundError);
    });
  });

  describe('updateCriteria', () => {
    it('should update criteria when found', async () => {
      const existingCriteria = {
        id: 'criteria-123',
        processId: 'process-123',
      };

      const updatedCriteria = {
        ...existingCriteria,
        overview: 'Updated Overview',
        validationScore: 85,
      };

      vi.mocked(prisma.criteriaEvidence.findUnique).mockResolvedValue(existingCriteria as any);
      vi.mocked(prisma.criteriaEvidence.update).mockResolvedValue(updatedCriteria as any);

      const result = await updateCriteria('criteria-123', {
        overview: 'Updated Overview',
        validationScore: 85,
      });

      expect(prisma.criteriaEvidence.update).toHaveBeenCalledWith({
        where: { id: 'criteria-123' },
        data: expect.objectContaining({
          overview: 'Updated Overview',
          validationScore: 85,
        }),
      });
      expect(result).toEqual(updatedCriteria);
    });
  });

  describe('deleteCriteria', () => {
    it('should delete criteria when found', async () => {
      const existingCriteria = {
        id: 'criteria-123',
        processId: 'process-123',
      };

      vi.mocked(prisma.criteriaEvidence.findUnique).mockResolvedValue(existingCriteria as any);
      vi.mocked(prisma.criteriaEvidence.delete).mockResolvedValue(existingCriteria as any);

      await deleteCriteria('criteria-123');

      expect(prisma.criteriaEvidence.delete).toHaveBeenCalledWith({
        where: { id: 'criteria-123' },
      });
    });
  });
});



