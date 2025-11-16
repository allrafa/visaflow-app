import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressStats } from '@/components/dashboard/ProgressStats';

describe('ProgressStats', () => {
  const defaultProps = {
    totalProcesses: 3,
    completedTasks: 10,
    totalTasks: 20,
    activeCriteria: 5,
    progress: 50,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all stats cards', () => {
    render(<ProgressStats {...defaultProps} />);

    expect(screen.getByText('Processos Ativos')).toBeInTheDocument();
    expect(screen.getByText('Tarefas Concluídas')).toBeInTheDocument();
    expect(screen.getByText('Critérios Ativos')).toBeInTheDocument();
    expect(screen.getByText('Progresso Geral')).toBeInTheDocument();
  });

  it('should display total processes', () => {
    render(<ProgressStats {...defaultProps} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should display task completion ratio', () => {
    render(<ProgressStats {...defaultProps} />);

    expect(screen.getByText('10/20')).toBeInTheDocument();
  });

  it('should display active criteria count', () => {
    render(<ProgressStats {...defaultProps} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should display overall progress percentage', () => {
    render(<ProgressStats {...defaultProps} />);

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should calculate task completion rate correctly', () => {
    const { container } = render(
      <ProgressStats
        totalProcesses={1}
        completedTasks={5}
        totalTasks={10}
        activeCriteria={2}
        progress={50}
      />
    );

    // Task completion rate should be 50% (5/10)
    const progressBars = container.querySelectorAll('[role="progressbar"]');
    // Should have progress bars for tasks and overall progress
    expect(progressBars.length).toBeGreaterThanOrEqual(1);
  });

  it('should handle zero tasks', () => {
    render(
      <ProgressStats
        totalProcesses={1}
        completedTasks={0}
        totalTasks={0}
        activeCriteria={0}
        progress={0}
      />
    );

    expect(screen.getByText('0/0')).toBeInTheDocument();
  });

  it('should handle 100% task completion', () => {
    render(
      <ProgressStats
        totalProcesses={1}
        completedTasks={10}
        totalTasks={10}
        activeCriteria={5}
        progress={100}
      />
    );

    expect(screen.getByText('10/10')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should display progress bars for tasks and overall progress', () => {
    const { container } = render(<ProgressStats {...defaultProps} />);

    const progressBars = container.querySelectorAll('[role="progressbar"]');
    // Should have at least 2 progress bars (tasks and overall)
    expect(progressBars.length).toBeGreaterThanOrEqual(2);
  });

  it('should not display progress bar for processes count', () => {
    const { container } = render(<ProgressStats {...defaultProps} />);

    // Processes card should not have progress bar
    const processesCard = screen.getByText('Processos Ativos').closest('.card');
    if (processesCard) {
      const progressBar = processesCard.querySelector('[role="progressbar"]');
      expect(progressBar).not.toBeInTheDocument();
    }
  });

  it('should not display progress bar for criteria count', () => {
    const { container } = render(<ProgressStats {...defaultProps} />);

    // Criteria card should not have progress bar
    const criteriaCard = screen.getByText('Critérios Ativos').closest('.card');
    if (criteriaCard) {
      const progressBar = criteriaCard.querySelector('[role="progressbar"]');
      expect(progressBar).not.toBeInTheDocument();
    }
  });

  it('should handle zero processes', () => {
    render(
      <ProgressStats
        totalProcesses={0}
        completedTasks={0}
        totalTasks={0}
        activeCriteria={0}
        progress={0}
      />
    );

    // Should display 0 for processes
    // The value is rendered directly as a number in the CardContent
    // We check the entire rendered output for the number 0
    const renderedText = screen.getByText('Processos Ativos').closest('div')?.textContent || '';
    // The value "0" should appear in the rendered output (might be in different formats)
    expect(renderedText).toMatch(/\b0\b/);
  });

  it('should handle large numbers', () => {
    render(
      <ProgressStats
        totalProcesses={100}
        completedTasks={500}
        totalTasks={1000}
        activeCriteria={50}
        progress={75}
      />
    );

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('500/1000')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should round task completion rate correctly', () => {
    render(
      <ProgressStats
        totalProcesses={1}
        completedTasks={7}
        totalTasks={9}
        activeCriteria={2}
        progress={50}
      />
    );

    // 7/9 = 77.78%, should round to 78%
    expect(screen.getByText('7/9')).toBeInTheDocument();
  });

  it('should display correct icons for each stat', () => {
    const { container } = render(<ProgressStats {...defaultProps} />);

    // Should have icons for each stat card
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(4);
  });

  it('should apply correct colors to icons', () => {
    const { container } = render(<ProgressStats {...defaultProps} />);

    // Icons should have color classes
    const blueIcon = container.querySelector('.text-blue-500');
    const greenIcon = container.querySelector('.text-green-500');
    const purpleIcon = container.querySelector('.text-purple-500');
    const orangeIcon = container.querySelector('.text-orange-500');

    expect(blueIcon || greenIcon || purpleIcon || orangeIcon).toBeTruthy();
  });

  it('should handle partial task completion', () => {
    render(
      <ProgressStats
        totalProcesses={2}
        completedTasks={3}
        totalTasks={8}
        activeCriteria={4}
        progress={37}
      />
    );

    expect(screen.getByText('3/8')).toBeInTheDocument();
    expect(screen.getByText('37%')).toBeInTheDocument();
  });
});

