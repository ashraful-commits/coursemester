"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"
import { DynamicThemeProvider } from "@/lib/theme-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DynamicThemeProvider>
      <NextAuthSessionProvider>
        {children}
        <Toaster />
      </NextAuthSessionProvider>
    </DynamicThemeProvider>
  )
}