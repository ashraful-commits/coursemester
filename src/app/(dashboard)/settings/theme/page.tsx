"use client"

import React, { useState, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThemeSelector, CustomThemeEditor } from '@/components/theme-selector'
import { useTheme } from '@/lib/theme-context'
import {
  Palette,
  Download,
  Upload,
  RotateCcw,
  Box,
  Layers,
  Settings2,
  Zap,
  Layout,
  FileJson,
  MoveRight
} from 'lucide-react'

function ThemeSettingsContent() {
  const { colorTheme, themeConfig, availableThemes, setColorTheme } = useTheme()
  const [showCustomEditor, setShowCustomEditor] = useState(false)

  const exportTheme = () => {
    const themeData = {
      colorTheme,
      customConfig: colorTheme === 'custom' ? themeConfig : null
    }
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'elite-theme-manifest.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const themeData = JSON.parse(e.target?.result as string)
          if (themeData.colorTheme && availableThemes[themeData.colorTheme as keyof typeof availableThemes]) {
            setColorTheme(themeData.colorTheme)
          }
        } catch (error) {
          console.error('Invalid manifest:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  const resetTheme = () => {
    setColorTheme('blue')
    setShowCustomEditor(false)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-violet-600/5 rounded-full blur-[100px] animate-float" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-32 pb-12 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Palette className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">Visual Identity Lab</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-2">
                Theme <span className="text-gradient">Synthesis</span>
              </h1>
              <p className="text-muted-foreground font-medium text-lg max-w-xl">
                Reconfigure the visual parameters of your learning environment. Precision styling for elite performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-5xl">
        <div className="grid gap-10">
          {/* Active Config */}
          <Card className="glass-card rounded-[3rem] border-primary/20 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50" />
            <div className="p-10 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex items-center gap-6">
                  <div
                    className="w-24 h-24 rounded-[2rem] shadow-2xl ring-4 ring-white/10 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `hsl(${themeConfig.primary})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <Box className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Active Manifest</p>
                    <h3 className="text-3xl font-black tracking-tighter">{themeConfig.name}</h3>
                    <p className="text-muted-foreground font-medium text-sm mt-1">System-wide visual synchronization enabled.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="glass border-white/5 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest px-6" onClick={exportTheme}>
                    <Download className="w-3.5 h-3.5 mr-2" /> Export
                  </Button>
                  <Button variant="outline" className="glass border-white/5 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest px-6" onClick={() => document.getElementById('theme-import')?.click()}>
                    <Upload className="w-3.5 h-3.5 mr-2" /> Import
                  </Button>
                  <input id="theme-import" type="file" accept=".json" className="hidden" onChange={importTheme} />
                  <Button variant="outline" className="glass border-white/5 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest px-6 hover:text-primary" onClick={resetTheme}>
                    <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Selector Card */}
          <div className="grid lg:grid-cols-2 gap-10">
            <Card className="glass-card rounded-[3rem] border-white/5 p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">Core Templates</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Pre-compiled configurations</p>
                </div>
              </div>

              <div className="space-y-8">
                <ThemeSelector />
                <Button
                  size="xl"
                  variant={showCustomEditor ? "default" : "outline"}
                  className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] glass border-white/5"
                  onClick={() => setShowCustomEditor(!showCustomEditor)}
                >
                  <Settings2 className="w-4 h-4 mr-2" /> {showCustomEditor ? "Deactivate" : "Initialize"} Custom Lab
                </Button>
              </div>
            </Card>

            <Card className="glass-card rounded-[3rem] border-white/5 p-10 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary">
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">Live Simulation</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Real-time component rendering</p>
                </div>
              </div>

              <div className="space-y-6 flex-grow flex flex-col justify-center">
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" className="rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-5">Primary</Button>
                  <Button variant="outline" className="rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-5 glass border-white/10">Outline</Button>
                  <Button variant="brand" className="rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-5">Brand</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="h-4 w-24 bg-primary/20 rounded-full animate-pulse" />
                  <div className="h-4 w-32 bg-white/5 rounded-full" />
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-foreground/60 rounded-full" />
                      <div className="h-2 w-12 bg-foreground/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {showCustomEditor && (
            <div className="animate-fadeInUp">
              <Card className="glass-card rounded-[3rem] border-primary/30 p-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Settings2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Atomic Parameter Control</h3>
                    <p className="text-muted-foreground font-medium">Fine-tune individual HSL channels for ultimate precision.</p>
                  </div>
                </div>
                <CustomThemeEditor />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ThemeSettingsLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Loading Laboratory Modules...</p>
      </div>
    </div>
  )
}

export default function ThemeSettings() {
  return (
    <Suspense fallback={<ThemeSettingsLoading />}>
      <ThemeSettingsContent />
    </Suspense>
  )
}
