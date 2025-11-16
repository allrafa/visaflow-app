import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render spinner with default size', () => {
    const { container } = render(<LoadingSpinner />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-6', 'w-6'); // default md size
  });

  it('should render spinner with small size', () => {
    const { container } = render(<LoadingSpinner size="sm" />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('h-4', 'w-4'); // sm size
  });

  it('should render spinner with medium size', () => {
    const { container } = render(<LoadingSpinner size="md" />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('h-6', 'w-6'); // md size
  });

  it('should render spinner with large size', () => {
    const { container } = render(<LoadingSpinner size="lg" />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('h-8', 'w-8'); // lg size
  });

  it('should apply custom className', () => {
    const { container } = render(
      <LoadingSpinner className="custom-class" />
    );
    
    const spinner = container.querySelector('.custom-class');
    expect(spinner).toBeInTheDocument();
  });
});



