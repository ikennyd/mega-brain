import useSWR from 'swr'
import { useApi } from './useApi'
import type { SalesData } from '@lib/types'

interface UseSalesOptions {
  granularity?: 'hourly' | 'daily' | 'weekly'
  hours?: number
  refreshInterval?: number
}

export function useSales(options?: UseSalesOptions) {
  const {
    granularity = 'hourly',
    hours = 24,
    refreshInterval = 5000, // 5 segundos para dados em tempo real
  } = options || {}

  const queryParams = new URLSearchParams({
    granularity,
    hours: hours.toString(),
  })

  const { data, error, isLoading, mutate } = useApi<SalesData>(
    `/api/sales?${queryParams}`,
    {
      refreshInterval,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 0, // Desabilitar deduping para garantir atualizações em tempo real
    }
  )

  return {
    data,
    error,
    isLoading,
    mutate,
    isEmpty: !data,
  }
}
