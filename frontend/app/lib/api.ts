import type { SalesData } from '@lib/types'

const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const fullUrl = url.startsWith('/') ? `${baseURL}${url}` : url
  
  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
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

export const api = {
  sales: {
    getLastHours: async (hours: number = 24): Promise<SalesData> => {
      return request(`/sales?hours=${hours}&granularity=hourly`)
    },
    getDaily: async (): Promise<SalesData> => {
      return request('/sales?hours=24&granularity=daily')
    },
    getHourly: async (): Promise<SalesData> => {
      return request('/sales?hours=24&granularity=hourly')
    },
  },
  tariffs: {
    getAll: async () => {
      return request('/tarifas')
    },
  },
}
