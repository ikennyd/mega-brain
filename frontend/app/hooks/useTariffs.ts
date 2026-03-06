import { useApi } from './useApi'

export interface TariffData {
  category: string
  baseRate: number
  additionalRate: number
  minRate: number
  maxRate: number
  lastUpdated: string
}

interface UseTariffsResponse {
  tariffs: TariffData[]
  lastUpdated: string
}

export function useTariffs() {
  const { data, error, isLoading, mutate } = useApi<UseTariffsResponse>(
    '/api/tarifas',
    {
      refreshInterval: 60000, // 1 minuto para dados menos críticos
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  return {
    tariffs: data?.tariffs || [],
    isLoading,
    error,
    mutate,
    isEmpty: !data?.tariffs || data.tariffs.length === 0,
    lastUpdated: data?.lastUpdated,
  }
}
