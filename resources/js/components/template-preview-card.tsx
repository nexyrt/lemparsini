import { cx } from "@/lib/primitive"

interface TemplatePreviewCardProps {
  name: string
  category?: string
  colorScheme?: 'rose' | 'gold' | 'blue' | 'green' | 'purple' | 'neutral'
  className?: string
}

const colorSchemes = {
  rose: {
    primary: 'from-rose-100 to-rose-50',
    accent: 'bg-rose-300',
    text: 'text-rose-700',
    border: 'border-rose-200',
    ornament: 'text-rose-300',
  },
  gold: {
    primary: 'from-amber-100 to-amber-50',
    accent: 'bg-amber-300',
    text: 'text-amber-700',
    border: 'border-amber-200',
    ornament: 'text-amber-300',
  },
  blue: {
    primary: 'from-blue-100 to-blue-50',
    accent: 'bg-blue-300',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ornament: 'text-blue-300',
  },
  green: {
    primary: 'from-emerald-100 to-emerald-50',
    accent: 'bg-emerald-300',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    ornament: 'text-emerald-300',
  },
  purple: {
    primary: 'from-purple-100 to-purple-50',
    accent: 'bg-purple-300',
    text: 'text-purple-700',
    border: 'border-purple-200',
    ornament: 'text-purple-300',
  },
  neutral: {
    primary: 'from-stone-100 to-stone-50',
    accent: 'bg-stone-300',
    text: 'text-stone-700',
    border: 'border-stone-200',
    ornament: 'text-stone-300',
  },
}

function FloralCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cx("size-16", className)}
      fill="currentColor"
    >
      <path d="M10,50 Q10,10 50,10 Q30,30 30,50 Q30,30 10,50" opacity="0.6" />
      <path d="M50,10 Q90,10 90,50 Q70,30 50,30 Q70,30 50,10" opacity="0.6" />
      <circle cx="50" cy="35" r="8" opacity="0.8" />
      <circle cx="35" cy="35" r="4" opacity="0.5" />
      <circle cx="65" cy="35" r="4" opacity="0.5" />
      <path d="M45,40 Q50,60 55,40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cx("size-6", className)}
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function TemplatePreviewCard({
  name,
  category = 'Wedding',
  colorScheme = 'rose',
  className,
}: TemplatePreviewCardProps) {
  const colors = colorSchemes[colorScheme]

  return (
    <div
      className={cx(
        "relative aspect-[9/16] w-full overflow-hidden rounded-lg border-2 shadow-lg",
        `bg-gradient-to-b ${colors.primary} ${colors.border}`,
        className
      )}
    >
      {/* Corner Ornaments */}
      <FloralCorner className={cx("absolute -left-2 -top-2 rotate-0", colors.ornament)} />
      <FloralCorner className={cx("absolute -right-2 -top-2 rotate-90", colors.ornament)} />
      <FloralCorner className={cx("absolute -bottom-2 -left-2 -rotate-90", colors.ornament)} />
      <FloralCorner className={cx("absolute -bottom-2 -right-2 rotate-180", colors.ornament)} />

      {/* Content */}
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        {/* Category Badge */}
        <span
          className={cx(
            "mb-4 rounded-full px-3 py-1 text-xs font-medium",
            colors.accent,
            colors.text
          )}
        >
          {category}
        </span>

        {/* Decorative Line */}
        <div className={cx("mb-4 h-px w-16", colors.accent)} />

        {/* Heart Icon */}
        <HeartIcon className={cx("mb-3 opacity-60", colors.text)} />

        {/* Template Name */}
        <h3
          className={cx(
            "mb-2 font-serif text-xl font-semibold tracking-wide",
            colors.text
          )}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {name}
        </h3>

        {/* Subtitle */}
        <p className={cx("text-xs opacity-70", colors.text)}>
          Digital Invitation
        </p>

        {/* Decorative Line */}
        <div className={cx("mt-4 h-px w-16", colors.accent)} />

        {/* Preview Label */}
        <div className="mt-6">
          <span
            className={cx(
              "rounded border px-2 py-1 text-[10px] uppercase tracking-widest opacity-50",
              colors.border,
              colors.text
            )}
          >
            Preview
          </span>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div
        className={cx(
          "absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/30 to-transparent"
        )}
      />
    </div>
  )
}

// Helper function to determine color scheme from template name/category
export function getColorSchemeFromTemplate(
  templateName: string,
  category?: string
): TemplatePreviewCardProps['colorScheme'] {
  const name = templateName.toLowerCase()
  const cat = category?.toLowerCase() || ''

  // Match based on template name keywords
  if (name.includes('rose') || name.includes('floral') || name.includes('pink')) {
    return 'rose'
  }
  if (name.includes('gold') || name.includes('luxury') || name.includes('elegant')) {
    return 'gold'
  }
  if (name.includes('blue') || name.includes('ocean') || name.includes('sky')) {
    return 'blue'
  }
  if (name.includes('green') || name.includes('nature') || name.includes('garden')) {
    return 'green'
  }
  if (name.includes('purple') || name.includes('lavender') || name.includes('violet')) {
    return 'purple'
  }
  if (name.includes('rustic') || name.includes('simple') || name.includes('minimal')) {
    return 'neutral'
  }

  // Default based on category
  if (cat.includes('wedding')) return 'rose'
  if (cat.includes('birthday')) return 'purple'
  if (cat.includes('corporate')) return 'blue'

  return 'rose'
}
