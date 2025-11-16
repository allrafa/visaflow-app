import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/../tests/helpers/test-utils';
import { TaskModal } from '@/components/tasks/TaskModal';
import type { Task } from '@/types/database';
import * as tasksAPI from '@/lib/api/tasks';

// Mock fetch globalmente
global.fetch = vi.fn();

// Mock window.alert
global.alert = vi.fn();

// Mock LoadingSpinner
vi.mock('@/components/shared/LoadingSpinner', () => ({
  LoadingSpinner: ({ size }: { size?: string }) => (
    <div>Loading {size}</div>
  ),
}));

// Mock API client
vi.mock('@/lib/api/tasks', () => ({
  getTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
}));

describe('TaskModal', () => {
  const mockProcessId = '550e8400-e29b-41d4-a716-446655440000';
  const mockTask: Task = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    processId: mockProcessId,
    phase: 'ELIGIBILITY',
    title: 'Existing Task',
    description: 'Existing description',
    status: 'PENDING',
    order: 0,
    dependsOn: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    completedAt: null,
  };

  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    processId: mockProcessId,
    onSuccess: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(global.fetch).mockClear();
    // Mock getTasks para retornar array vazio por padrão
    vi.mocked(tasksAPI.getTasks).mockResolvedValue([]);
  });

  it('should render create task modal when task is not provided', () => {
    renderWithProviders(<TaskModal {...defaultProps} />);

    expect(screen.getByText('Nova Tarefa')).toBeInTheDocument();
    expect(screen.getByText('Preencha os dados da nova tarefa')).toBeInTheDocument();
  });

  it('should render edit task modal when task is provided', () => {
    renderWithProviders(<TaskModal {...defaultProps} task={mockTask} />);

    expect(screen.getByText('Editar Tarefa')).toBeInTheDocument();
    expect(screen.getByText('Atualize as informações da tarefa')).toBeInTheDocument();
  });

  it('should prefill form when editing task', () => {
    renderWithProviders(<TaskModal {...defaultProps} task={mockTask} />);

    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/descrição/i) as HTMLTextAreaElement;

    expect(titleInput.value).toBe('Existing Task');
    expect(descriptionInput.value).toBe('Existing description');
  });

  it('should not show modal when open is false', () => {
    renderWithProviders(<TaskModal {...defaultProps} open={false} />);

    expect(screen.queryByText('Nova Tarefa')).not.toBeInTheDocument();
    expect(screen.queryByText('Editar Tarefa')).not.toBeInTheDocument();
  });

  it('should create new task successfully', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    const newTask: Task = {
      ...mockTask,
      id: 'new-task-id',
      title: 'New Task',
    };

    vi.mocked(tasksAPI.createTask).mockResolvedValueOnce(newTask);

    renderWithProviders(
      <TaskModal {...defaultProps} onSuccess={onSuccess} onClose={onClose} />
    );

    const titleInput = screen.getByLabelText(/título/i);
    const submitButton = screen.getByRole('button', { name: /criar/i });

    await user.type(titleInput, 'New Task');
    await user.click(submitButton);

    await waitFor(() => {
      expect(tasksAPI.createTask).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('should update existing task successfully', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    const updatedTask: Task = {
      ...mockTask,
      title: 'Updated Task',
    };

    vi.mocked(tasksAPI.updateTask).mockResolvedValueOnce(updatedTask);

    renderWithProviders(
      <TaskModal
        {...defaultProps}
        task={mockTask}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    );

    const titleInput = screen.getByLabelText(/título/i);
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Task');
    await user.click(submitButton);

    await waitFor(() => {
      expect(tasksAPI.updateTask).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('should handle API error', async () => {
    const user = userEvent.setup();

    vi.mocked(tasksAPI.createTask).mockRejectedValueOnce(
      new Error('Failed to create task')
    );

    renderWithProviders(<TaskModal {...defaultProps} phase="ELIGIBILITY" />);

    const titleInput = screen.getByLabelText(/título/i);
    const submitButton = screen.getByRole('button', { name: /criar/i });

    await user.type(titleInput, 'New Task');
    await user.click(submitButton);

    await waitFor(() => {
      expect(tasksAPI.createTask).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('should call onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderWithProviders(<TaskModal {...defaultProps} onClose={onClose} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('should disable submit button during submission', async () => {
    const user = userEvent.setup();

    // Criar uma promise que não resolve imediatamente
    let resolveCreate: (value: Task) => void;
    const createPromise = new Promise<Task>((resolve) => {
      resolveCreate = resolve;
    });

    vi.mocked(tasksAPI.createTask).mockImplementationOnce(() => createPromise);

    renderWithProviders(<TaskModal {...defaultProps} phase="ELIGIBILITY" />);

    const titleInput = screen.getByLabelText(/título/i);
    const submitButton = screen.getByRole('button', { name: /criar/i });

    await user.type(titleInput, 'New Task');
    await user.click(submitButton);

    // Aguardar um pouco para o estado de loading ser atualizado
    await waitFor(() => {
      // Verificar se o botão está desabilitado ou mostra loading
      const isDisabled = submitButton.hasAttribute('disabled') || 
                        submitButton.getAttribute('aria-disabled') === 'true' ||
                        submitButton.textContent?.includes('Criando');
      expect(isDisabled).toBe(true);
    }, { timeout: 1000 });

    // Resolver a promise para limpar
    resolveCreate!({
      ...mockTask,
      id: 'new-task-id',
      title: 'New Task',
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();

    let resolveCreate: (value: Task) => void;
    const createPromise = new Promise<Task>((resolve) => {
      resolveCreate = resolve;
    });

    vi.mocked(tasksAPI.createTask).mockImplementationOnce(() => createPromise);

    renderWithProviders(<TaskModal {...defaultProps} phase="ELIGIBILITY" />);

    const titleInput = screen.getByLabelText(/título/i);
    const submitButton = screen.getByRole('button', { name: /criar/i });

    await user.type(titleInput, 'New Task');
    await user.click(submitButton);

    // Aguardar para o estado de loading aparecer
    await waitFor(() => {
      const buttonText = submitButton.textContent || '';
      expect(buttonText.includes('Criando') || buttonText.includes('Loading')).toBe(true);
    }, { timeout: 1000 });

    // Resolver a promise
    resolveCreate!({
      ...mockTask,
      id: 'new-task-id',
      title: 'New Task',
    });
  });

  it('should use provided phase when creating', async () => {
    const user = userEvent.setup();

    const newTask: Task = {
      ...mockTask,
      id: 'new-task-id',
      phase: 'EVIDENCE',
      title: 'New Task',
    };

    vi.mocked(tasksAPI.createTask).mockResolvedValueOnce(newTask);

    renderWithProviders(<TaskModal {...defaultProps} phase="EVIDENCE" />);

    const titleInput = screen.getByLabelText(/título/i);
    const submitButton = screen.getByRole('button', { name: /criar/i });

    await user.type(titleInput, 'New Task');
    await user.click(submitButton);

    await waitFor(() => {
      expect(tasksAPI.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          phase: 'EVIDENCE',
        })
      );
    });
  });

  it('should reset form when task changes', () => {
    const { rerender } = renderWithProviders(<TaskModal {...defaultProps} task={mockTask} />);

    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
    expect(titleInput.value).toBe('Existing Task');

    // Mudar para outra task
    const newTask: Task = {
      ...mockTask,
      id: 'another-task-id',
      title: 'Another Task',
    };

    rerender(
      <TaskModal {...defaultProps} task={newTask} />
    );

    const updatedTitleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
    expect(updatedTitleInput.value).toBe('Another Task');
  });

  it('should handle order input', async () => {
    const user = userEvent.setup();

    const newTask: Task = {
      ...mockTask,
      id: 'new-task-id',
      order: 5,
    };

    vi.mocked(tasksAPI.createTask).mockResolvedValueOnce(newTask);

    renderWithProviders(<TaskModal {...defaultProps} />);

    const orderInput = screen.getByLabelText(/ordem/i) as HTMLInputElement;
    await user.clear(orderInput);
    await user.type(orderInput, '5');

    const submitButton = screen.getByRole('button', { name: /criar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(tasksAPI.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          order: 5,
        })
      );
    });
  });
});
