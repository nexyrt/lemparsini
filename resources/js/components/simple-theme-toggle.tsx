import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export function SimpleThemeToggle() {
  const { theme, updateTheme } = useTheme()

  // If system theme, determine actual theme
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleTheme = () => {
    updateTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      size="sq-md"
      intent="plain"
      onPress={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative"
    >
      <SunIcon className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
