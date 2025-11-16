import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAuthUser, ensureOwnership } from '@/lib/auth/getAuthUser';
import { UnauthorizedError, ForbiddenError } from '@/lib/errors/AppError';

// Mock Next.js cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

// Mock Supabase SSR
const mockGetUser = vi.fn();
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

import { cookies } from 'next/headers';

describe('getAuthUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
  });

  it('should return user when authenticated', async () => {
    const mockUser = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'test@example.com',
    };

    const mockCookieStore = {
      get: vi.fn(() => ({ value: 'test-cookie' })),
      set: vi.fn(),
    };

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any);
    mockGetUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await getAuthUser();

    expect(result).toEqual(mockUser);
    expect(mockGetUser).toHaveBeenCalled();
  });

  it('should throw UnauthorizedError when user is not authenticated', async () => {
    const mockCookieStore = {
      get: vi.fn(() => ({ value: 'test-cookie' })),
      set: vi.fn(),
    };

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any);
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Not authenticated' },
    });

    await expect(getAuthUser()).rejects.toThrow(UnauthorizedError);
    await expect(getAuthUser()).rejects.toThrow('Not authenticated');
  });

  it('should throw UnauthorizedError when error occurs', async () => {
    const mockCookieStore = {
      get: vi.fn(() => ({ value: 'test-cookie' })),
      set: vi.fn(),
    };

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any);
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Network error' },
    });

    await expect(getAuthUser()).rejects.toThrow(UnauthorizedError);
  });

  it('should throw UnauthorizedError when user is null', async () => {
    const mockCookieStore = {
      get: vi.fn(() => ({ value: 'test-cookie' })),
      set: vi.fn(),
    };

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any);
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    await expect(getAuthUser()).rejects.toThrow(UnauthorizedError);
  });
});

describe('ensureOwnership', () => {
  it('should not throw when user owns resource', async () => {
    const userId = '550e8400-e29b-41d4-a716-446655440000';
    const resourceOwnerId = '550e8400-e29b-41d4-a716-446655440000';

    await expect(
      ensureOwnership(userId, resourceOwnerId, 'process')
    ).resolves.not.toThrow();
  });

  it('should throw ForbiddenError when user does not own resource', async () => {
    const userId = '550e8400-e29b-41d4-a716-446655440000';
    const resourceOwnerId = '550e8400-e29b-41d4-a716-446655440001';

    await expect(
      ensureOwnership(userId, resourceOwnerId, 'process')
    ).rejects.toThrow(ForbiddenError);

    await expect(
      ensureOwnership(userId, resourceOwnerId, 'process')
    ).rejects.toThrow('You don\'t have permission to access this process');
  });

  it('should include resource type in error message', async () => {
    const userId = '550e8400-e29b-41d4-a716-446655440000';
    const resourceOwnerId = '550e8400-e29b-41d4-a716-446655440001';

    await expect(
      ensureOwnership(userId, resourceOwnerId, 'task')
    ).rejects.toThrow('You don\'t have permission to access this task');

    await expect(
      ensureOwnership(userId, resourceOwnerId, 'criteria')
    ).rejects.toThrow('You don\'t have permission to access this criteria');
  });
});



