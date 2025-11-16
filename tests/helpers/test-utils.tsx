/**
 * Test Utilities
 * Helpers para facilitar testes de componentes React
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ToastProvider } from '@/components/ui/toast';
import { QueryProvider } from '@/lib/providers/QueryProvider';

/**
 * Wrapper com todos os providers necessários
 */
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </QueryProvider>
  );
}

/**
 * Render customizado com providers
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

/**
 * Re-export tudo do @testing-library/react
 */
export * from '@testing-library/react';




