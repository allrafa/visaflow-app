import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/uploads/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getUploadsByTaskId, createUpload } from '@/lib/services/uploadService';
import { getTaskById } from '@/lib/services/taskService';
import { getProcessById } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/uploadService');
vi.mock('@/lib/services/taskService');
vi.mock('@/lib/services/processService');
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({
          data: { path: 'test-path' },
          error: null,
        }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://storage.example.com/file.pdf' },
        }),
      })),
    },
  })),
}));

describe('API: /api/uploads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/uploads', () => {
    it('should return uploads for task owned by user', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockTask = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        process: {
          id: '550e8400-e29b-41d4-a716-446655440002',
          userId: '550e8400-e29b-41d4-a716-446655440000',
        },
      };
      const mockUploads = [
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          taskId: '550e8400-e29b-41d4-a716-446655440001',
          fileName: 'test.pdf',
        },
      ];

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getTaskById).mockResolvedValue(mockTask as any);
      vi.mocked(getProcessById).mockResolvedValue(mockTask.process as any);
      vi.mocked(getUploadsByTaskId).mockResolvedValue(mockUploads as any);

      const request = new NextRequest('http://localhost:3000/api/uploads?taskId=550e8400-e29b-41d4-a716-446655440001');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockUploads);
    });
  });

  describe('POST /api/uploads', () => {
    it('should create upload with valid file', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockTask = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        process: {
          id: '550e8400-e29b-41d4-a716-446655440002',
          userId: '550e8400-e29b-41d4-a716-446655440000',
        },
      };
      const mockUpload = {
        id: '550e8400-e29b-41d4-a716-446655440003',
        taskId: '550e8400-e29b-41d4-a716-446655440001',
        fileName: 'test.pdf',
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getTaskById).mockResolvedValue(mockTask as any);
      vi.mocked(getProcessById).mockResolvedValue(mockTask.process as any);
      vi.mocked(createUpload).mockResolvedValue(mockUpload as any);

      // Criar arquivo válido para teste
      const fileContent = new Array(1024).fill('a').join(''); // 1KB
      const file = new File([fileContent], 'test.pdf', { type: 'application/pdf' });
      
      const formData = new FormData();
      formData.append('taskId', '550e8400-e29b-41d4-a716-446655440001');
      formData.append('file', file);

      const request = new NextRequest('http://localhost:3000/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);

      expect(response.status).toBe(201);
    });
  });
});

