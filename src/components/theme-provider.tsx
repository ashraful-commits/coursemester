"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { DynamicThemeProvider } from "@/lib/theme-context"

export function ThemeProvider({ 
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <DynamicThemeProvider>
        {children}
      </DynamicThemeProvider>
    </NextThemesProvider>
  )
}