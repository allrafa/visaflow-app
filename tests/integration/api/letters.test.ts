import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/letters/route';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getLettersByProcessId, createLetter } from '@/lib/services/letterService';
import { getProcessById } from '@/lib/services/processService';

vi.mock('@/lib/auth/getAuthUser');
vi.mock('@/lib/services/letterService');
vi.mock('@/lib/services/processService');

describe('API: /api/letters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/letters', () => {
    it('should return letters for process owned by user', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
      };
      const mockLetters = [
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          processId: '550e8400-e29b-41d4-a716-446655440001',
          recommenderName: 'Dr. John Smith',
          status: 'draft',
        },
      ];

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(getLettersByProcessId).mockResolvedValue(mockLetters as any);

      const request = new NextRequest('http://localhost:3000/api/letters?processId=550e8400-e29b-41d4-a716-446655440001');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockLetters);
    });
  });

  describe('POST /api/letters', () => {
    it('should create letter with valid input', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      const mockProcess = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
      };
      const mockLetter = {
        id: '550e8400-e29b-41d4-a716-446655440002',
        processId: '550e8400-e29b-41d4-a716-446655440001',
        recommenderName: 'Dr. John Smith',
        recommenderTitle: 'Professor',
        status: 'draft',
      };

      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);
      vi.mocked(getProcessById).mockResolvedValue(mockProcess as any);
      vi.mocked(createLetter).mockResolvedValue(mockLetter as any);

      const request = new NextRequest('http://localhost:3000/api/letters', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
          recommenderName: 'Dr. John Smith',
          recommenderTitle: 'Professor',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(mockLetter);
    });

    it('should return 400 for invalid input', async () => {
      const mockUser = { id: '550e8400-e29b-41d4-a716-446655440000' };
      vi.mocked(getAuthUser).mockResolvedValue(mockUser as any);

      const request = new NextRequest('http://localhost:3000/api/letters', {
        method: 'POST',
        body: JSON.stringify({
          processId: '550e8400-e29b-41d4-a716-446655440001',
          // Missing required recommenderName
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });
  });
});

