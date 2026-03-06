'use client'

import { useSales } from '@hooks/useSales'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export function TopProducts() {
  const { data, isLoading, error } = useSales({
    granularity: 'daily',
  })

  // Gerar dados de produtos simulados (em produção viriam da API)
  const mockProducts = [
    {
      name: 'Smartphone Premium',
      sales: data?.orders ? Math.floor(data.orders * 0.25) : 0,
      revenue: data?.gmv ? Math.floor(data.gmv * 0.35) : 0,
    },
    {
      name: 'Laptop/Notebook',
      sales: data?.orders ? Math.floor(data.orders * 0.2) : 0,
      revenue: data?.gmv ? Math.floor(data.gmv * 0.32) : 0,
    },
    {
      name: 'Acessórios',
      sales: data?.orders ? Math.floor(data.orders * 0.3) : 0,
      revenue: data?.gmv ? Math.floor(data.gmv * 0.2) : 0,
    },
    {
      name: 'Smart Watch',
      sales: data?.orders ? Math.floor(data.orders * 0.15) : 0,
      revenue: data?.gmv ? Math.floor(data.gmv * 0.13) : 0,
    },
    {
      name: 'Fone Wireless',
      sales: data?.orders ? Math.floor(data.orders * 0.1) : 0,
      revenue: data?.gmv ? Math.floor(data.gmv * 0.05) : 0,
    },
  ]

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-300"
      >
        Erro ao carregar produtos
      </motion.div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Produtos Mais Vendidos
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top 5 produtos por volume de vendas
            </p>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Carregando...
              </span>
            </div>
          )}
        </div>

        {mockProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockProducts}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(100, 116, 139, 0.2)"
              />
              <XAxis
                dataKey="name"
                stroke="currentColor"
                className="text-slate-500"
                style={{ fontSize: '12px' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="currentColor"
                className="text-slate-500"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
                formatter={(value) => {
                  const numValue = value as number
                  if (numValue > 10000) {
                    return `R$ ${(numValue / 1000).toFixed(0)}k`
                  }
                  return `${numValue}`
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Vendas" />
              <Bar dataKey="revenue" fill="#10b981" name="Receita (R$)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <div className="text-slate-400 dark:text-slate-500">
              {isLoading ? 'Carregando dados...' : 'Nenhum dado disponível'}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}
