import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';
import { queryClient } from '@/config/queryClient';
import { env } from '@/config/env';
import { ThemeProvider } from '@/context/ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * All app providers in one place.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
        {env.IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
