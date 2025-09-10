import {
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  // Use the default infinite stale time for all queries
  defaultOptions: {
    queries: {
      staleTime:
        import.meta.env.VITE_APP_ENV === 'production' ? 60000 * 10 : Infinity,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  },
})

export const pageQuery =
  <TPageQueryVariables>(
    cacheName: string,
    request: QueryFunction<Record<string, unknown>, QueryKey>,
    key?: string
  ) =>
  (args: TPageQueryVariables & QueryFunctionContext) => ({
    queryKey: [cacheName, args],
    queryFn: async () => {
      const result: Record<string, unknown> = await request({ ...args })

      // If a key is provided, return the value of that key
      if (key) return result[key]

      // Otherwise, return the first value
      return Object.values(result)[0]
    },
  })
