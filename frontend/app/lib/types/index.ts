export interface SalesData {
  gmv: number // Gross Merchandise Value
  orders: number
  avgTicket: number
  trend: number // Percentual de crescimento
  lastUpdated: string
  history: Array<{
    timestamp: string
    value: number
    currency: string
  }>
}

export interface Product {
  id: string
  title: string
  quantity: number
  revenue: number
  trend: number
  imageUrl?: string
}

export interface TariffData {
  category: string
  baseRate: number
  additionalRate: number
  minRate: number
  maxRate: number
  lastUpdated: string
}
