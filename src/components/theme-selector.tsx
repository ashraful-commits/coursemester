"use client"

import React from 'react'
import { useTheme } from '@/lib/theme-context'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Palette, Check, Sun, Moon } from 'lucide-react'

export function ThemeSelector() {
  const { colorTheme, setColorTheme, availableThemes, themeMode, toggleThemeMode } = useTheme()

  const themeColors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    custom: 'bg-gradient-to-r from-purple-500 to-pink-500'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-white/10 h-10 px-4 rounded-xl font-black uppercase tracking-widest text-[10px]">
          <Palette className="w-4 h-4 mr-2" />
          Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Appearance</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleThemeMode}
            className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>
        <div className="px-2 py-1 mb-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Color Palette</span>
        </div>
        {Object.entries(availableThemes).map(([key, theme]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setColorTheme(key as any)}
            className="flex items-center justify-between cursor-pointer rounded-xl h-10 px-3 mb-1 last:mb-0"
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${themeColors[key as keyof typeof themeColors]}`} />
              <span className="text-xs font-semibold">{theme.name}</span>
            </div>
            {colorTheme === key && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CustomThemeEditor() {
  const { themeConfig, updateCustomTheme, setColorTheme } = useTheme()

  const handleColorChange = (property: keyof typeof themeConfig, value: string) => {
    updateCustomTheme({ [property]: value })
  }

  const handleBrandColorChange = (shade: keyof typeof themeConfig.brand, value: string) => {
    updateCustomTheme({
      brand: {
        ...themeConfig.brand,
        [shade]: value
      }
    })
  }

  const applyCustomTheme = () => {
    setColorTheme('custom')
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Custom Theme Editor</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Primary Color</label>
          <input
            type="color"
            value={`hsl(${themeConfig.primary})`}
            onChange={(e) => {
              const match = e.target.value.match(/hsl\(([^)]+)\)/)
              if (match) handleColorChange('primary', match[1])
            }}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Secondary Color</label>
          <input
            type="color"
            value={`hsl(${themeConfig.secondary})`}
            onChange={(e) => {
              const match = e.target.value.match(/hsl\(([^)]+)\)/)
              if (match) handleColorChange('secondary', match[1])
            }}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Brand Colors</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(themeConfig.brand).map(([shade, color]) => (
            <div key={shade}>
              <label className="block text-xs text-muted-foreground mb-1">{shade}</label>
              <input
                type="color"
                value={`hsl(${color})`}
                onChange={(e) => {
                  const match = e.target.value.match(/hsl\(([^)]+)\)/)
                  if (match) handleBrandColorChange(shade as unknown as keyof typeof themeConfig.brand, match[1])
                }}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <Button onClick={applyCustomTheme} className="w-full">
        Apply Custom Theme
      </Button>
    </div>
  )
}