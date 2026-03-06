'use client'

import { useState, useEffect } from 'react'
import type { ThemeType } from '@types/dashboard'

interface UseThemeReturn {
  theme: ThemeType | string
  toggle: () => void
  mounted: boolean
  setTheme: (theme: ThemeType) => void
}

export function useTheme(): UseThemeReturn {
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<ThemeType | string>('light')

  useEffect(() => {
    // Obter tema do localStorage ou do sistema
    const savedTheme = localStorage.getItem('theme') as ThemeType | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

    setThemeState(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [])

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme as ThemeType)
  }

  const applyTheme = (t: ThemeType | string) => {
    const root = document.documentElement
    if (t === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  return { theme, toggle, mounted, setTheme }
}
