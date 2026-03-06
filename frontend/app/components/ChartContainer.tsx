'use client'

import { useApi } from '@hooks/useApi'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { HourlyData, ApiResponse } from '@types/dashboard'

interface ChartContainerProps {
  title?: string
  type?: 'line' | 'bar'
  loading?: boolean
}

export function ChartContainer({ title = 'Vendas por Hora', type = 'line', loading = false }: ChartContainerProps) {
  const { data, isLoading } = useApi<ApiResponse<HourlyData[]>>('/api/sales/hourly')

  const chartData = data?.data || []

  if (isLoading || loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
      >
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">{title}</h3>
        <div className="h-80 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
    >
      <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">{title}</h3>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          {type === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis dataKey="hour" stroke="#64748b" className="dark:stroke-slate-500" />
              <YAxis stroke="#64748b" className="dark:stroke-slate-500" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Vendas (R$)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
                name="Pedidos"
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis dataKey="hour" stroke="#64748b" className="dark:stroke-slate-500" />
              <YAxis stroke="#64748b" className="dark:stroke-slate-500" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Vendas (R$)" />
              <Bar dataKey="orders" fill="#8b5cf6" name="Pedidos" />
            </BarChart>
          )}
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center text-slate-500">
          <p>Nenhum dado disponível</p>
        </div>
      )}
    </motion.div>
  )
}

export default ChartContainer
