'use client'

import { useApi } from '@hooks/useApi'
import { motion } from 'framer-motion'
import type { Marketplace, ApiResponse } from '@types/dashboard'

export function TarifasGrid() {
  const { data, isLoading } = useApi<ApiResponse<Marketplace[]>>('/api/tarifas')

  const marketplaces = data?.data || []

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Marketplaces</h2>
        <p className="text-slate-600 dark:text-slate-400">Estatísticas por plataforma de vendas</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {marketplaces.map((marketplace) => (
            <motion.div
              key={marketplace.id}
              variants={item}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Logo e Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  {marketplace.logo ? (
                    <img src={marketplace.logo} alt={marketplace.name} className="w-8 h-8" />
                  ) : (
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                      {marketplace.name.substring(0, 2)}
                    </span>
                  )}
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    marketplace.status === 'active'
                      ? 'bg-green-500'
                      : marketplace.status === 'syncing'
                        ? 'bg-yellow-500 animate-pulse'
                        : 'bg-red-500'
                  }`}
                />
              </div>

              {/* Nome */}
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{marketplace.name}</h3>

              {/* Métricas */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Vendas</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {marketplace.sales.toLocaleString('pt-BR')}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Receita</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    R$ {marketplace.revenue.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Comissão */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Comissão</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {marketplace.commissionPercent}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    R$ {marketplace.commission.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Last Sync */}
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Última sync: {new Date(marketplace.lastSync).toLocaleTimeString('pt-BR')}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}

export default TarifasGrid
