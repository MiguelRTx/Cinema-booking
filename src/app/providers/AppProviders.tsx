import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { isTokenExpired } from '../../utils/jwt.utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 2, // 2 minutes default
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

function AuthGuard({ children }: { children: ReactNode }) {
  const { token, logout } = useAuthStore();

  useEffect(() => {
    // On app boot: clear expired tokens
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token, logout]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>{children}</AuthGuard>
    </QueryClientProvider>
  );
}
