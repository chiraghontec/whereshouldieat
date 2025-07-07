import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const baseClasses =
    "font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    primary: "bg-primary-orange text-white hover:bg-orange-600 focus:ring-primary-orange",
    secondary: "bg-secondary-green text-white hover:bg-green-700 focus:ring-secondary-green",
    outline:
      "border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white focus:ring-primary-orange",
    ghost: "text-primary-orange hover:bg-orange-50 focus:ring-primary-orange",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button className={cn(baseClasses, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
