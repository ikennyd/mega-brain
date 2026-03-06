import useSWR, { SWRConfiguration } from 'swr'

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

interface UseApiOptions extends SWRConfiguration {
  skip?: boolean
}

export function useApi<T>(url: string, options?: UseApiOptions) {
  const shouldFetch = !options?.skip

  const { data, error, isLoading, mutate } = useSWR<T, Error>(
    shouldFetch ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      keepPreviousData: true,
      ...options,
    }
  )

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    mutate,
  }
}

export function useApiBatch<T extends Record<string, any>>(
  urls: Record<keyof T, string>,
  options?: UseApiOptions
): Record<keyof T, { data?: any; error?: Error; isLoading: boolean }> {
  const results: Record<keyof T, any> = {} as Record<keyof T, any>

  for (const key in urls) {
    const { data, error, isLoading } = useApi(urls[key], options)
    results[key] = { data, error, isLoading }
  }

  return results
}
