'use client'

import { motion } from 'framer-motion'
import type { CardProps } from '@types/dashboard'

export function Card({
  title,
  value,
  subtitle,
  icon,
  badge,
  onClick,
  className = '',
  loading = false,
}: CardProps) {
  const badgeColors = {
    success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
    warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
    error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
    info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`
        rounded-lg border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 p-6 shadow-sm
        hover:shadow-md transition-shadow
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Header com icon e badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-2xl">{icon}</div>}
          <div>
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <span
            className={`
              px-2 py-1 text-xs font-medium rounded-full
              ${badgeColors[badge.color]}
            `}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Value */}
      {loading ? (
        <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-24 animate-pulse" />
      ) : (
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          {typeof value === 'number'
            ? value.toLocaleString('pt-BR', {
                maximumFractionDigits: 2,
              })
            : value}
        </p>
      )}
    </motion.div>
  )
}

export default Card
