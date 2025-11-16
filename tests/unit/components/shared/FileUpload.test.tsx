import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from '@/components/shared/FileUpload';
import { renderWithProviders } from '@/../tests/helpers/test-utils';

// Mock fetch globalmente
global.fetch = vi.fn();

// Mock window.confirm
global.confirm = vi.fn();

describe('FileUpload', () => {
  const mockTaskId = '550e8400-e29b-41d4-a716-446655440001';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(global.fetch).mockClear();
    vi.mocked(global.confirm).mockReturnValue(true);
  });

  it('should render file upload component', () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    renderWithProviders(<FileUpload taskId={mockTaskId} />);

    expect(screen.getByText('Arquivos Anexados')).toBeInTheDocument();
    expect(screen.getByText('PDF, DOCX, PNG ou JPG (máx. 10MB)')).toBeInTheDocument();
    expect(screen.getByText('Enviar Arquivo')).toBeInTheDocument();
  });

  it('should load files on mount', async () => {
    const mockFiles = [
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        fileName: 'test.pdf',
        fileUrl: 'https://example.com/test.pdf',
        fileType: 'application/pdf',
      },
    ];

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFiles,
    } as Response);

    renderWithProviders(<FileUpload taskId={mockTaskId} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/uploads?taskId=${mockTaskId}`
      );
    });

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });
  });

  it('should show empty state when no files', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    renderWithProviders(<FileUpload taskId={mockTaskId} />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum arquivo anexado')).toBeInTheDocument();
    });
  });

  it('should handle file upload', async () => {
    const user = userEvent.setup();
    const onUploadSuccess = vi.fn();

    // Mock initial load
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    // Mock upload response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'upload-123' }),
    } as Response);

    // Mock reload after upload
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 'upload-123',
          fileName: 'test.pdf',
          fileUrl: 'https://example.com/test.pdf',
          fileType: 'application/pdf',
        },
      ],
    } as Response);

    const { container } = renderWithProviders(<FileUpload taskId={mockTaskId} onUploadSuccess={onUploadSuccess} />);

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    expect(input).toBeInTheDocument();

    await user.upload(input, file);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/uploads',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    await waitFor(() => {
      expect(onUploadSuccess).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('should show error message on upload failure', async () => {
    const user = userEvent.setup();

    // Mock initial load
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    // Mock upload error
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'File too large' }),
    } as Response);

    const { container } = renderWithProviders(<FileUpload taskId={mockTaskId} />);

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    expect(input).toBeInTheDocument();

    await user.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText('File too large')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should handle file deletion', async () => {
    const user = userEvent.setup();
    const mockFiles = [
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        fileName: 'test.pdf',
        fileUrl: 'https://example.com/test.pdf',
        fileType: 'application/pdf',
      },
    ];

    // Mock initial load
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFiles,
    } as Response);

    // Mock delete response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    // Mock reload after delete
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    renderWithProviders(<FileUpload taskId={mockTaskId} />);

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });

    // Find delete button by looking for button with destructive class
    const buttons = screen.getAllByRole('button');
    const deleteButton = buttons.find(btn => 
      btn.className.includes('destructive') || 
      btn.querySelector('svg')
    );

    expect(deleteButton).toBeDefined();

    if (deleteButton) {
      await user.click(deleteButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          `/api/uploads/${mockFiles[0].id}`,
          expect.objectContaining({ method: 'DELETE' })
        );
      }, { timeout: 3000 });
    }
  });

  it('should not delete file when user cancels confirmation', async () => {
    const user = userEvent.setup();
    vi.mocked(global.confirm).mockReturnValue(false);

    const mockFiles = [
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        fileName: 'test.pdf',
        fileUrl: 'https://example.com/test.pdf',
        fileType: 'application/pdf',
      },
    ];

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFiles,
    } as Response);

    renderWithProviders(<FileUpload taskId={mockTaskId} />);

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole('button');
    const deleteButton = buttons.find(btn => 
      btn.className.includes('destructive')
    );

    expect(deleteButton).toBeDefined();

    if (deleteButton) {
      await user.click(deleteButton);

      // Wait a bit to ensure no API call was made
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not call delete API
      const deleteCalls = vi.mocked(global.fetch).mock.calls.filter(call => 
        typeof call[0] === 'string' && call[0].includes('/api/uploads/') && 
        call[1] && typeof call[1] === 'object' && 'method' in call[1] && call[1].method === 'DELETE'
      );
      expect(deleteCalls).toHaveLength(0);
    }
  });

  it('should show loading state during upload', async () => {
    const user = userEvent.setup();

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    // Mock slow upload
    let resolveUpload: (value: Response) => void;
    const uploadPromise = new Promise<Response>(resolve => {
      resolveUpload = resolve;
    });

    vi.mocked(global.fetch).mockImplementationOnce(() => uploadPromise);

    // Mock reload after upload
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    const { container } = renderWithProviders(<FileUpload taskId={mockTaskId} />);

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    expect(input).toBeInTheDocument();

    await user.upload(input, file);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('Enviando...')).toBeInTheDocument();
    });

    // Resolve upload
    resolveUpload!({
      ok: true,
      json: async () => ({ id: 'upload-123' }),
    } as Response);
  });

  it('should handle load files error gracefully', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

    // Should not crash, just log error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(<FileUpload taskId={mockTaskId} />);

    // Wait for component to mount and attempt to load files
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }, { timeout: 2000 });

    // Give it a moment for error handling
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should apply custom className', () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    const { container } = renderWithProviders(
      <FileUpload taskId={mockTaskId} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});

