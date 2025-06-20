'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
      retry: false,
      retryDelay: 1000,
      retryOnMount: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
  },
});
export default function ReactQueryProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
