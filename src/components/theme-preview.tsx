"use client"

import React from 'react'
import { useTheme } from '@/lib/theme-context'

export function ThemePreview() {
  const { colorTheme, themeConfig } = useTheme()

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-background border rounded-lg shadow-lg max-w-xs theme-transition">
      <h4 className="font-semibold mb-2 text-sm">Active Theme</h4>
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-6 h-6 rounded-full border-2 border-border"
          style={{ backgroundColor: `hsl(${themeConfig.primary})` }}
        />
        <span className="text-sm font-medium">{themeConfig.name}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        <div>Primary: hsl({themeConfig.primary})</div>
        <div>Secondary: hsl({themeConfig.secondary})</div>
        <div>Accent: hsl({themeConfig.accent})</div>
      </div>
    </div>
  )
}