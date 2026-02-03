import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "@/lib/primitive"

export const badgeStyles = tv({
  base: [
    "inline-flex items-center justify-center rounded-full font-medium",
    "px-2.5 py-0.5 text-xs",
  ],
  variants: {
    intent: {
      primary: "bg-primary text-primary-fg",
      secondary: "bg-secondary text-secondary-fg",
      success: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      warning: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
      danger: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      outline: "border border-border bg-transparent text-fg",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {}

export function Badge({ className, intent, ...props }: BadgeProps) {
  return (
    <span
      className={cx(badgeStyles({ intent }), className)}
      {...props}
    />
  )
}
