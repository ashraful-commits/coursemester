import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[13px] font-black uppercase tracking-widest ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_20px_rgba(124,58,237,0.2)] hover:shadow-[0_15px_30px_rgba(124,58,237,0.3)]",

        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_10px_20px_rgba(239,68,68,0.2)]",

        outline: "border-2 border-white/10 bg-transparent text-foreground hover:bg-white/5 hover:border-white/20",

        secondary: "bg-white/5 text-foreground hover:bg-white/10 backdrop-blur-sm",

        ghost: "hover:bg-white/5 hover:text-primary",

        link: "text-primary underline-offset-4 hover:underline",

        success: "bg-green-600 text-white hover:bg-green-700 shadow-[0_10px_20px_rgba(22,163,74,0.2)]",

        warning: "bg-yellow-500 text-white hover:bg-yellow-600 shadow-[0_10px_20px_rgba(234,179,8,0.2)]",

        brand: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_20px_rgba(124,58,237,0.2)]",

        "brand-outline": "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",

        "brand-secondary": "bg-primary/10 text-primary hover:bg-primary/20",

        "brand-ghost": "text-primary hover:bg-primary/10",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-3",
        default: "h-10 px-4",
        lg: "h-11 px-8",
        xl: "h-12 px-10 text-base",
        "2xl": "h-14 px-12 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Loading...
          </>
        )
      }

      if (icon) {
        if (iconPosition === 'right') {
          return (
            <>
              {children}
              <span className="ml-2">{icon}</span>
            </>
          )
        }
        return (
          <>
            <span className="mr-2">{icon}</span>
            {children}
          </>
        )
      }

      return children
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "cursor-not-allowed",
          icon && !children && "p-0"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {renderContent()}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }