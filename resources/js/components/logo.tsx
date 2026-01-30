import type React from "react"

interface LogoProps extends React.ComponentProps<"img"> {
  size?: "sm" | "md" | "lg" | "xl"
}

export function Logo({ className, size = "md", ...props }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-auto",
    md: "h-8 w-auto",
    lg: "h-12 w-auto",
    xl: "h-16 w-auto"
  }

  return (
    <img
      src="/logo.png"
      alt="lemparsini.com"
      className={`${sizeClasses[size]} ${className || ''}`}
      {...props}
    />
  )
}
