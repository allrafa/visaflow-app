import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateUploadedFile, sanitizeFileName, createUpload, getUploadsByTaskId, deleteUpload } from '@/lib/services/uploadService';
import { NotFoundError, ValidationError } from '@/lib/errors/AppError';
import { prisma } from '@/lib/db/client';

vi.mock('@/lib/db/client', () => ({
  prisma: {
    upload: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
    },
    task: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: vi.fn(() => ({
        remove: vi.fn(),
      })),
    },
  })),
}));

describe('uploadService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validateUploadedFile', () => {
    it('should accept valid PDF file', () => {
      const content = new Array(1024 * 1024).fill('a').join(''); // 1MB
      const file = new File([content], 'test.pdf', { type: 'application/pdf' });

      expect(() => validateUploadedFile(file)).not.toThrow();
    });

    it('should accept valid DOCX file', () => {
      const content = new Array(1024 * 1024).fill('a').join(''); // 1MB
      const file = new File([content], 'test.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      expect(() => validateUploadedFile(file)).not.toThrow();
    });

    it('should accept valid PNG file', () => {
      const content = new Array(1024 * 1024).fill('a').join(''); // 1MB
      const file = new File([content], 'test.png', { type: 'image/png' });

      expect(() => validateUploadedFile(file)).not.toThrow();
    });

    it('should accept valid JPEG file', () => {
      const content = new Array(1024 * 1024).fill('a').join(''); // 1MB
      const file = new File([content], 'test.jpg', { type: 'image/jpeg' });

      expect(() => validateUploadedFile(file)).not.toThrow();
    });

    it('should reject invalid file type', () => {
      const file = new File(['content'], 'test.exe', { type: 'application/x-msdownload' });

      expect(() => validateUploadedFile(file)).toThrow(ValidationError);
      expect(() => validateUploadedFile(file)).toThrow('File type not allowed');
    });

    it('should reject file larger than 10MB', () => {
      const content = new Array(11 * 1024 * 1024).fill('a').join(''); // 11MB
      const file = new File([content], 'test.pdf', { type: 'application/pdf' });

      expect(() => validateUploadedFile(file)).toThrow(ValidationError);
      expect(() => validateUploadedFile(file)).toThrow('File too large');
    });
  });

  describe('sanitizeFileName', () => {
    it('should sanitize file name with special characters', () => {
      const fileName = 'test file (1).pdf';
      const sanitized = sanitizeFileName(fileName);

      expect(sanitized).toBe('test_file__1_.pdf');
      expect(sanitized).not.toContain(' ');
      expect(sanitized).not.toContain('(');
      expect(sanitized).not.toContain(')');
    });

    it('should truncate long file names', () => {
      const longName = 'a'.repeat(150) + '.pdf';
      const sanitized = sanitizeFileName(longName);

      expect(sanitized.length).toBeLessThanOrEqual(100);
    });

    it('should preserve valid characters', () => {
      const fileName = 'test-file_123.pdf';
      const sanitized = sanitizeFileName(fileName);

      expect(sanitized).toBe('test-file_123.pdf');
    });
  });

  describe('createUpload', () => {
    it('should create upload with valid input', async () => {
      const input = {
        taskId: 'task-123',
        fileName: 'test.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024,
        fileUrl: 'https://storage.example.com/file.pdf',
        storagePath: 'uploads/task-123/file.pdf',
      };

      const mockTask = {
        id: 'task-123',
        processId: 'process-123',
      };

      const mockUpload = {
        id: 'upload-123',
        ...input,
        fileSize: BigInt(input.fileSize),
        uploadedAt: new Date(),
      };

      vi.mocked(prisma.task.findUnique).mockResolvedValue(mockTask as any);
      vi.mocked(prisma.upload.create).mockResolvedValue(mockUpload as any);

      const result = await createUpload(input);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: 'task-123' },
      });
      expect(prisma.upload.create).toHaveBeenCalledWith({
        data: {
          ...input,
          fileSize: BigInt(input.fileSize),
        },
      });
      expect(result).toEqual(mockUpload);
    });

    it('should throw NotFoundError when task does not exist', async () => {
      vi.mocked(prisma.task.findUnique).mockResolvedValue(null);

      await expect(
        createUpload({
          taskId: 'invalid-task',
          fileName: 'test.pdf',
          fileType: 'application/pdf',
          fileSize: 1024,
          fileUrl: 'https://example.com/file.pdf',
          storagePath: 'uploads/file.pdf',
        })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('getUploadsByTaskId', () => {
    it('should return uploads for task', async () => {
      const mockUploads = [
        {
          id: 'upload-1',
          taskId: 'task-123',
          fileName: 'file1.pdf',
          uploadedAt: new Date('2024-01-01'),
        },
        {
          id: 'upload-2',
          taskId: 'task-123',
          fileName: 'file2.pdf',
          uploadedAt: new Date('2024-01-02'),
        },
      ];

      vi.mocked(prisma.upload.findMany).mockResolvedValue(mockUploads as any);

      const result = await getUploadsByTaskId('task-123');

      expect(prisma.upload.findMany).toHaveBeenCalledWith({
        where: { taskId: 'task-123' },
        orderBy: { uploadedAt: 'desc' },
      });
      expect(result).toEqual(mockUploads);
    });

    it('should return empty array when no uploads exist', async () => {
      vi.mocked(prisma.upload.findMany).mockResolvedValue([]);

      const result = await getUploadsByTaskId('task-123');

      expect(result).toEqual([]);
    });
  });

  describe('deleteUpload', () => {
    it('should delete upload when user owns process', async () => {
      const mockUpload = {
        id: 'upload-123',
        taskId: 'task-123',
        storagePath: 'uploads/file.pdf',
        task: {
          id: 'task-123',
          processId: 'process-123',
          process: {
            id: 'process-123',
            userId: 'user-123',
          },
        },
      };

      vi.mocked(prisma.upload.findUnique).mockResolvedValue(mockUpload as any);
      vi.mocked(prisma.upload.delete).mockResolvedValue(mockUpload as any);

      await deleteUpload('upload-123', 'user-123');

      expect(prisma.upload.delete).toHaveBeenCalledWith({
        where: { id: 'upload-123' },
      });
    });

    it('should throw NotFoundError when upload not found', async () => {
      vi.mocked(prisma.upload.findUnique).mockResolvedValue(null);

      await expect(deleteUpload('invalid-upload', 'user-123')).rejects.toThrow(NotFoundError);
    });

    it('should throw ValidationError when user does not own process', async () => {
      const mockUpload = {
        id: 'upload-123',
        task: {
          process: {
            userId: 'user-456',
          },
        },
      };

      vi.mocked(prisma.upload.findUnique).mockResolvedValue(mockUpload as any);

      await expect(deleteUpload('upload-123', 'user-123')).rejects.toThrow(ValidationError);
    });
  });
});

