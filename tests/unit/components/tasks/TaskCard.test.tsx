import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCard } from '@/components/tasks/TaskCard';
import type { Task } from '@/types/database';

// Mock FileUpload component
vi.mock('@/components/shared/FileUpload', () => ({
  FileUpload: ({ taskId }: { taskId: string }) => (
    <div data-testid="file-upload">FileUpload for {taskId}</div>
  ),
}));

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    processId: '550e8400-e29b-41d4-a716-446655440000',
    phase: 'ELIGIBILITY',
    title: 'Test Task',
    description: 'Test task description',
    status: 'PENDING',
    order: 0,
    dependsOn: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    completedAt: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render task card with basic information', () => {
    render(<TaskCard task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test task description')).toBeInTheDocument();
    expect(screen.getByText('Pendente')).toBeInTheDocument();
  });

  it('should display correct status badge for PENDING', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Pendente')).toBeInTheDocument();
  });

  it('should display correct status badge for IN_PROGRESS', () => {
    const task = { ...mockTask, status: 'IN_PROGRESS' };
    render(<TaskCard task={task} />);
    expect(screen.getByText('Em Progresso')).toBeInTheDocument();
  });

  it('should display correct status badge for COMPLETED', () => {
    const task = { ...mockTask, status: 'COMPLETED' };
    render(<TaskCard task={task} />);
    expect(screen.getByText('Concluída')).toBeInTheDocument();
  });

  it('should display correct status badge for WITH_UPLOAD', () => {
    const task = { ...mockTask, status: 'WITH_UPLOAD' };
    render(<TaskCard task={task} />);
    expect(screen.getByText('Com Upload')).toBeInTheDocument();
  });

  it('should display correct status badge for BLOCKED', () => {
    const task = { ...mockTask, status: 'BLOCKED' };
    render(<TaskCard task={task} />);
    expect(screen.getByText('Bloqueada')).toBeInTheDocument();
  });

  it('should display formatted creation date', () => {
    render(<TaskCard task={mockTask} />);
    const dateElement = screen.getByText(/01\/01\/2024/);
    expect(dateElement).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(<TaskCard task={mockTask} onEdit={onEdit} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(<TaskCard task={mockTask} onDelete={onDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('should not show edit button when onEdit is not provided', () => {
    render(<TaskCard task={mockTask} />);
    const editButtons = screen.queryAllByRole('button', { name: /edit/i });
    expect(editButtons).toHaveLength(0);
  });

  it('should not show delete button when onDelete is not provided', () => {
    render(<TaskCard task={mockTask} />);
    const deleteButtons = screen.queryAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(0);
  });

  it('should display upload count when uploads are present', () => {
    const taskWithUploads = {
      ...mockTask,
      uploads: [
        { id: '1', fileName: 'file1.pdf' },
        { id: '2', fileName: 'file2.pdf' },
      ],
    };

    render(<TaskCard task={taskWithUploads} />);
    expect(screen.getByText('2 arquivos')).toBeInTheDocument();
  });

  it('should display singular form for single upload', () => {
    const taskWithUploads = {
      ...mockTask,
      uploads: [{ id: '1', fileName: 'file1.pdf' }],
    };

    render(<TaskCard task={taskWithUploads} />);
    expect(screen.getByText('1 arquivo')).toBeInTheDocument();
  });

  it('should display FileUpload component when showUploads is true', () => {
    render(<TaskCard task={mockTask} showUploads={true} />);
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
  });

  it('should not display FileUpload component when showUploads is false', () => {
    render(<TaskCard task={mockTask} showUploads={false} />);
    expect(screen.queryByTestId('file-upload')).not.toBeInTheDocument();
  });

  it('should display dependency count when dependsOn has items', () => {
    const taskWithDeps = {
      ...mockTask,
      dependsOn: ['task1', 'task2'],
    };

    render(<TaskCard task={taskWithDeps} />);
    expect(screen.getByText('Depende de 2 tarefas')).toBeInTheDocument();
  });

  it('should display singular form for single dependency', () => {
    const taskWithDeps = {
      ...mockTask,
      dependsOn: ['task1'],
    };

    render(<TaskCard task={taskWithDeps} />);
    expect(screen.getByText('Depende de 1 tarefa')).toBeInTheDocument();
  });

  it('should handle task without description', () => {
    const taskWithoutDesc = { ...mockTask, description: null };
    render(<TaskCard task={taskWithoutDesc} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByText('Test task description')).not.toBeInTheDocument();
  });

  it('should handle task with long description (truncated)', () => {
    const longDescription = 'A'.repeat(200);
    const taskWithLongDesc = { ...mockTask, description: longDescription };
    render(<TaskCard task={taskWithLongDesc} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should handle unknown status gracefully', () => {
    const taskWithUnknownStatus = { ...mockTask, status: 'UNKNOWN_STATUS' };
    render(<TaskCard task={taskWithUnknownStatus} />);
    // Should default to PENDING status
    expect(screen.getByText('Pendente')).toBeInTheDocument();
  });
});



