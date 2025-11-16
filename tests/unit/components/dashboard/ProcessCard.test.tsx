import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProcessCard } from '@/components/dashboard/ProcessCard';
import { PROCESS_PHASES } from '@/lib/constants/phases';
import type { Process } from '@/types/database';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ProcessCard', () => {
  const mockProcess: Process & { _count?: { tasks: number; criteria: number; letters: number } } = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    userId: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Test Process',
    description: 'Test process description',
    northStar: null,
    currentPhase: 'ELIGIBILITY',
    progress: 25,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
    _count: {
      tasks: 5,
      criteria: 3,
      letters: 2,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render process card with basic information', () => {
    render(<ProcessCard process={mockProcess} />);

    expect(screen.getByText('Test Process')).toBeInTheDocument();
    expect(screen.getByText('Test process description')).toBeInTheDocument();
  });

  it('should display current phase badge', () => {
    render(<ProcessCard process={mockProcess} />);

    const phaseLabel = PROCESS_PHASES.find(p => p.id === 'ELIGIBILITY')?.label;
    expect(screen.getByText(phaseLabel!)).toBeInTheDocument();
  });

  it('should display progress percentage', () => {
    render(<ProcessCard process={mockProcess} />);

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('should display progress bar', () => {
    const { container } = render(<ProcessCard process={mockProcess} />);

    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('should display criteria count', () => {
    render(<ProcessCard process={mockProcess} />);

    expect(screen.getByText('3 critérios')).toBeInTheDocument();
  });

  it('should display tasks count', () => {
    render(<ProcessCard process={mockProcess} />);

    expect(screen.getByText('5 tarefas')).toBeInTheDocument();
  });

  it('should display formatted update date', () => {
    render(<ProcessCard process={mockProcess} />);

    const dateText = new Date(mockProcess.updatedAt).toLocaleDateString('pt-BR');
    expect(screen.getByText(dateText)).toBeInTheDocument();
  });

  it('should link to process detail page', () => {
    const { container } = render(<ProcessCard process={mockProcess} />);

    const link = container.querySelector(`a[href="/dashboard/process/${mockProcess.id}"]`);
    expect(link).toBeInTheDocument();
  });

  it('should handle process without description', () => {
    const processWithoutDesc = { ...mockProcess, description: null };
    render(<ProcessCard process={processWithoutDesc} />);

    expect(screen.getByText('Test Process')).toBeInTheDocument();
    expect(screen.queryByText('Test process description')).not.toBeInTheDocument();
  });

  it('should handle process without _count', () => {
    const processWithoutCount = { ...mockProcess, _count: undefined };
    render(<ProcessCard process={processWithoutCount} />);

    expect(screen.getByText('0 critérios')).toBeInTheDocument();
    expect(screen.getByText('0 tarefas')).toBeInTheDocument();
  });

  it('should handle different phases', () => {
    const processInEvidence = { ...mockProcess, currentPhase: 'EVIDENCE' };
    render(<ProcessCard process={processInEvidence} />);

    const phaseLabel = PROCESS_PHASES.find(p => p.id === 'EVIDENCE')?.label;
    expect(screen.getByText(phaseLabel!)).toBeInTheDocument();
  });

  it('should handle zero progress', () => {
    const processZeroProgress = { ...mockProcess, progress: 0 };
    render(<ProcessCard process={processZeroProgress} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should handle 100% progress', () => {
    const processComplete = { ...mockProcess, progress: 100 };
    render(<ProcessCard process={processComplete} />);

    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should truncate long title', () => {
    const longTitle = 'A'.repeat(200);
    const processLongTitle = { ...mockProcess, title: longTitle };
    render(<ProcessCard process={processLongTitle} />);

    // Title should be rendered (truncation is CSS-based)
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('should truncate long description', () => {
    const longDescription = 'A'.repeat(500);
    const processLongDesc = { ...mockProcess, description: longDescription };
    render(<ProcessCard process={processLongDesc} />);

    // Description should be rendered (truncation is CSS-based)
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });
});

