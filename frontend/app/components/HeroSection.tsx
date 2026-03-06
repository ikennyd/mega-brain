'use client'

import { useSales } from '@hooks/useSales'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const { data, isLoading, error } = useSales()
  const [animatedGMV, setAnimatedGMV] = useState(0)

  // Animar o número GMV quando mudar
  useEffect(() => {
    if (data?.gmv) {
      let currentValue = animatedGMV
      const targetValue = data.gmv
      const increment = (targetValue - currentValue) / 20

      const interval = setInterval(() => {
        currentValue += increment
        if (currentValue >= targetValue) {
          setAnimatedGMV(targetValue)
          clearInterval(interval)
        } else {
          setAnimatedGMV(currentValue)
        }
      }, 50)

      return () => clearInterval(interval)
    }
  }, [data?.gmv])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GMV Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              GMV
            </h3>
            {isLoading && (
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            )}
          </div>

          {error ? (
            <div className="text-red-500 text-sm">Erro ao carregar dados</div>
          ) : (
            <>
              <motion.div
                key={animatedGMV}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-bold text-blue-900 dark:text-white mb-2"
              >
                {formatCurrency(animatedGMV)}
              </motion.div>

              {data?.trend !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <svg
                      className={`w-5 h-5 ${
                        data.trend >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {data.trend >= 0 ? (
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1V9a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L8.414 13H12z"
                          clipRule="evenodd"
                        />
                      )}
                    </svg>
                    <span
                      className={`text-sm font-semibold ${
                        data.trend >= 0 ? 'text-green-600' : 'text-red-600'
                      } dark:text-inherit`}
                    >
                      {Math.abs(data.trend).toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    vs. semana anterior
                  </span>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Orders Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-8 border border-purple-200 dark:border-purple-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
              Pedidos
            </h3>
            {isLoading && (
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            )}
          </div>

          {error ? (
            <div className="text-red-500 text-sm">Erro ao carregar dados</div>
          ) : (
            <>
              <motion.div
                key={data?.orders}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-bold text-purple-900 dark:text-white mb-2"
              >
                {data?.orders || 0}
              </motion.div>

              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total em 24 horas
              </div>
            </>
          )}
        </motion.div>

        {/* Average Ticket Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Ticket Médio
            </h3>
            {isLoading && (
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            )}
          </div>

          {error ? (
            <div className="text-red-500 text-sm">Erro ao carregar dados</div>
          ) : (
            <>
              <motion.div
                key={data?.avgTicket}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-bold text-emerald-900 dark:text-white mb-2"
              >
                {formatCurrency(data?.avgTicket || 0)}
              </motion.div>

              <div className="text-sm text-slate-600 dark:text-slate-400">
                Valor médio por pedido
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Last Updated */}
      {data?.lastUpdated && (
        <motion.div
          variants={itemVariants}
          className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-right"
        >
          Atualizado em: {new Date(data.lastUpdated).toLocaleTimeString('pt-BR')}
        </motion.div>
      )}
    </motion.section>
  )
}
