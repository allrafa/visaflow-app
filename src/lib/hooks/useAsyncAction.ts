import { useState, useCallback } from 'react';

interface UseAsyncActionOptions {
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}

export function useAsyncAction<T = any>(options: UseAsyncActionOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (fn: () => Promise<T>) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fn();
        setData(result);

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (e) {
        const error = e instanceof Error ? e : new Error('An unexpected error occurred');
        setError(error);

        if (options.onError) {
          options.onError(error);
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    isLoading,
    error,
    data,
    reset,
  };
}
