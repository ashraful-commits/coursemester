// Theme constants for consistent styling across the application

export const buttonThemes = {
  // Primary actions
  primary: 'brand',
  primaryOutline: 'brand-outline',
  primaryGhost: 'brand-ghost',
  
  // Secondary actions
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  
  // Special actions
  accent: 'accent',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  
  // Hero section specific
  hero: 'hero',
  heroOutline: 'hero-outline',
  
  // Default fallback
  default: 'default',
} as const

export const buttonSizes = {
  small: 'sm',
  medium: 'default',
  large: 'lg',
  extraLarge: 'xl',
  icon: 'icon',
  iconSmall: 'icon-sm',
  iconLarge: 'icon-lg',
} as const

export const themeColors = {
  // Blue palette
  blue: {
    50: 'brand-blue-50',
    100: 'brand-blue-100', 
    500: 'brand-blue-500',
    600: 'brand-blue-600',
    700: 'brand-blue-700',
    900: 'brand-blue-900',
  },
  // Purple palette
  purple: {
    50: 'brand-purple-50',
    100: 'brand-purple-100',
    500: 'brand-purple-500',
    600: 'brand-purple-600',
    700: 'brand-purple-700',
  },
  // Yellow palette
  yellow: {
    400: 'brand-yellow-400',
    500: 'brand-yellow-500',
  },
  // Semantic colors
  semantic: {
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent',
    muted: 'muted',
    destructive: 'destructive',
  },
} as const

export type ButtonTheme = typeof buttonThemes[keyof typeof buttonThemes]
export type ButtonSize = typeof buttonSizes[keyof typeof buttonSizes]