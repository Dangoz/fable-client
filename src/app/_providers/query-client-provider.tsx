'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'

// const STALE_TIMES = {
//   FREQUENT: 30 * 1000, // 30 seconds - for data that changes often
//   STANDARD: 2 * 60 * 1000, // 2 minutes - default
//   RARE: 10 * 60 * 1000, // 10 minutes - for rarely changing data
//   NEVER: Number.POSITIVE_INFINITY, // Only refetch on explicit invalidation
// }

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: STALE_TIMES.STANDARD,
  //     // Default to no polling unless specifically configured
  //     refetchInterval: false,
  //     // Make queries retry 3 times with exponential backoff
  //     retry: 3,
  //     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  //     // Refetch query on window focus
  //     refetchOnWindowFocus: true,
  //     // Enable refetch on reconnect
  //     refetchOnReconnect: true,
  //     // Fail queries that take too long
  //   },
  //   mutations: {
  //     // Default to 3 retries for mutations too
  //     retry: 3,
  //     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  //     networkMode: 'always',
  //   },
  // },
})

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}

export default QueryClientProvider
