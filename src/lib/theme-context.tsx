"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export type ColorTheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'custom'

export interface ThemeConfig {
  name: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  brand: {
    50: string
    100: string
    500: string
    600: string
    700: string
    900?: string
  }
}

const defaultThemes: Record<ColorTheme, ThemeConfig> = {
  blue: {
    name: 'Ocean Blue',
    primary: '217 91% 60%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '210 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    brand: {
      50: '219 91% 97%',
      100: '219 91% 94%',
      500: '217 91% 60%',
      600: '217 91% 54%',
      700: '217 91% 48%',
      900: '217 91% 28%',
    }
  },
  purple: {
    name: 'Royal Purple',
    primary: '258 91% 67%',
    primaryForeground: '210 40% 98%',
    secondary: '270 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '270 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    brand: {
      50: '258 91% 97%',
      100: '258 91% 94%',
      500: '258 91% 67%',
      600: '258 91% 61%',
      700: '258 91% 55%',
      900: '258 91% 35%',
    }
  },
  green: {
    name: 'Forest Green',
    primary: '142 76% 36%',
    primaryForeground: '210 40% 98%',
    secondary: '138 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '138 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    brand: {
      50: '142 76% 97%',
      100: '142 76% 94%',
      500: '142 76% 36%',
      600: '142 76% 30%',
      700: '142 76% 24%',
      900: '142 76% 14%',
    }
  },
  orange: {
    name: 'Sunset Orange',
    primary: '25 95% 53%',
    primaryForeground: '210 40% 98%',
    secondary: '33 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '33 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    brand: {
      50: '25 95% 97%',
      100: '25 95% 94%',
      500: '25 95% 53%',
      600: '25 95% 47%',
      700: '25 95% 41%',
      900: '25 95% 21%',
    }
  },
  pink: {
    name: 'Cherry Pink',
    primary: '330 81% 60%',
    primaryForeground: '210 40% 98%',
    secondary: '327 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '327 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    brand: {
      50: '330 81% 97%',
      100: '330 81% 94%',
      500: '330 81% 60%',
      600: '330 81% 54%',
      700: '330 81% 48%',
      900: '330 81% 28%',
    }
  },
  custom: {
    name: 'Custom Theme',
    primary: '217 91% 60%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '210 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    brand: {
      50: '219 91% 97%',
      100: '219 91% 94%',
      500: '217 91% 60%',
      600: '217 91% 54%',
      700: '217 91% 48%',
      900: '217 91% 28%',
    }
  }
}

interface ThemeContextType {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  themeMode: 'light' | 'dark'
  setThemeMode: (mode: 'light' | 'dark') => void
  toggleThemeMode: () => void
  themeConfig: ThemeConfig
  updateCustomTheme: (config: Partial<ThemeConfig>) => void
  availableThemes: Record<ColorTheme, ThemeConfig>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ColorTheme
  defaultMode?: 'light' | 'dark'
}

export function DynamicThemeProvider({
  children,
  defaultTheme = 'blue',
  defaultMode = 'dark'
}: ThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(defaultTheme)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(defaultMode)
  const [customThemeConfig, setCustomThemeConfig] = useState<ThemeConfig>(defaultThemes.blue)

  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme') as ColorTheme
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark'
    const savedCustomConfig = localStorage.getItem('custom-theme-config')

    if (savedTheme && defaultThemes[savedTheme]) {
      setColorTheme(savedTheme)
    }

    if (savedMode) {
      setThemeMode(savedMode)
    }

    if (savedCustomConfig) {
      try {
        setCustomThemeConfig(JSON.parse(savedCustomConfig))
      } catch (error) {
        console.error('Failed to parse custom theme config:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('color-theme', colorTheme)
    localStorage.setItem('theme-mode', themeMode)
    if (colorTheme === 'custom') {
      localStorage.setItem('custom-theme-config', JSON.stringify(customThemeConfig))
    }

    const root = document.documentElement
    const config = colorTheme === 'custom' ? customThemeConfig : defaultThemes[colorTheme]

    // Disable transitions temporarily to prevent flashing
    root.classList.add('no-transition')

    // Handle Mode
    if (themeMode === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }

    // Update CSS variables
    root.style.setProperty('--primary', config.primary)
    root.style.setProperty('--primary-foreground', config.primaryForeground)
    root.style.setProperty('--secondary', config.secondary)
    root.style.setProperty('--secondary-foreground', config.secondaryForeground)
    root.style.setProperty('--accent', config.accent)
    root.style.setProperty('--accent-foreground', config.accentForeground)

    root.style.setProperty('--brand-blue-50', config.brand['50'])
    root.style.setProperty('--brand-blue-100', config.brand['100'])
    root.style.setProperty('--brand-blue-500', config.brand['500'])
    root.style.setProperty('--brand-blue-600', config.brand['600'])
    root.style.setProperty('--brand-blue-700', config.brand['700'])
    if (config.brand['900']) {
      root.style.setProperty('--brand-blue-900', config.brand['900'])
    }

    // Re-enable transitions after theme is applied
    setTimeout(() => {
      root.classList.remove('no-transition')
    }, 50)
  }, [colorTheme, customThemeConfig, themeMode])

  const toggleThemeMode = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const updateCustomTheme = (config: Partial<ThemeConfig>) => {
    setCustomThemeConfig(prev => ({ ...prev, ...config }))
  }

  const themeConfig = colorTheme === 'custom' ? customThemeConfig : defaultThemes[colorTheme]

  return (
    <ThemeContext.Provider value={{
      colorTheme,
      setColorTheme,
      themeMode,
      setThemeMode,
      toggleThemeMode,
      themeConfig,
      updateCustomTheme,
      availableThemes: defaultThemes
    }}>
      {children}
    </ThemeContext.Provider>
  )
}