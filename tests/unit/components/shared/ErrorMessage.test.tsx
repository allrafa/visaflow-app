import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message', () => {
    render(<ErrorMessage message="Something went wrong" />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should render custom title', () => {
    render(<ErrorMessage title="Custom Error" message="Error message" />);
    
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ErrorMessage 
        message="Error message" 
        onRetry={onRetry}
      />
    );
    
    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();
    
    await user.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error message" />);
    
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ErrorMessage message="Error message" className="custom-class" />
    );
    
    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });
});



