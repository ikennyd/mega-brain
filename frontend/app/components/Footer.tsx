'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SyncStatus {
  status: 'idle' | 'syncing' | 'error' | 'success'
  lastSync: Date
  itemsSync: number
}

export function Footer() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    status: 'idle',
    lastSync: new Date(),
    itemsSync: 0,
  })

  const [time, setTime] = useState<string>('')

  useEffect(() => {
    // Atualizar hora a cada segundo
    const interval = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString('pt-BR'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (syncStatus.status) {
      case 'success':
        return 'text-green-600 dark:text-green-400'
      case 'syncing':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  const getStatusBg = () => {
    switch (syncStatus.status) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30'
      case 'syncing':
        return 'bg-yellow-100 dark:bg-yellow-900/30'
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30'
      default:
        return 'bg-slate-100 dark:bg-slate-800'
    }
  }

  const statusLabel = {
    success: '✓ Sincronizado',
    syncing: '↻ Sincronizando...',
    error: '✗ Erro na sincronização',
    idle: '— Aguardando',
  }

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Branding */}
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold">Mega Brain Dashboard</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              Inteligência em tempo real para suas vendas
            </p>
          </div>

          {/* Center - Sync Status */}
          <motion.div
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg
              ${getStatusBg()}
            `}
          >
            <div className="relative">
              <div className={`w-2 h-2 rounded-full ${syncStatus.status === 'syncing' ? 'animate-pulse' : 'bg-green-500'}`} />
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${getStatusColor()}`}>{statusLabel[syncStatus.status]}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {syncStatus.itemsSync} itens · {syncStatus.lastSync.toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </motion.div>

          {/* Right - Time and Version */}
          <div className="text-center md:text-right">
            <p className="text-sm font-mono text-slate-600 dark:text-slate-400">{time || '--:--:--'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">v1.0.0 • Dashboard</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Mega Brain. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Status
            </a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Suporte
            </a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
