import { useEffect, useState } from "react"

export type Theme = "light" | "dark" | "system"

const prefersDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches

const applyTheme = (theme: Theme) => {
  const isDark = theme === "dark" || (theme === "system" && prefersDark())

  document.documentElement.classList.toggle("dark", isDark)
}

const mediaQuery =
  typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null

const handleSystemThemeChange = () => {
  const currentTheme = localStorage.getItem("theme") as Theme
  applyTheme(currentTheme || "light")
}

export function initializeTheme() {
  const savedTheme = (localStorage.getItem("theme") as Theme) || "light"

  applyTheme(savedTheme)

  // Add the event listener for system theme changes...
  if (mediaQuery) {
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
  }
  return () => {}
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")

  const updateTheme = (mode: Theme) => {
    setTheme(mode)
    localStorage.setItem("theme", mode)
    applyTheme(mode)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    updateTheme(savedTheme || "light")

    if (mediaQuery) {
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
    return () => {}
  }, [])

  return { theme, updateTheme }
}
