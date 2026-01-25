import { createContext, useEffect, useState } from "react"

import type { TThemeProviderProps, TThemeContextState, TTheme } from "@/types/theme-types"

const initialState: TThemeContextState = {
  theme: "system",
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<TThemeContextState>(initialState)

export function ThemeProvider({ children, defaultTheme, storageKey, ...props }: TThemeProviderProps) {
  const [theme, setTheme] = useState<TTheme>(
    () => (localStorage.getItem(storageKey) as TTheme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: TTheme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}


