// Types for dashboard components

export type ThemeType = 'light' | 'dark'

export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
  lastUpdated?: string
}

export interface CardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode | string
  badge?: {
    label: string
    color: 'success' | 'warning' | 'error' | 'info'
  }
  onClick?: () => void
  className?: string
  loading?: boolean
}

export interface HourlyData {
  hour: string
  sales: number
  orders: number
}

export interface Marketplace {
  id: string
  name: string
  logo?: string
  status: 'active' | 'syncing' | 'inactive'
  sales: number
  revenue: number
  commissionPercent: number
  commission: number
  lastSync: string
}

export interface SalesData {
  gmv: number
  orders: number
  avgTicket: number
  trend: number
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
