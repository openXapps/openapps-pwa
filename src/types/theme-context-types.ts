export type TTheme = "dark" | "light" | "system"

export type TThemeProviderProps = {
  children: React.ReactNode
  defaultTheme: TTheme
  storageKey: string
}

/**
 * Theme context state type.
 */
export type TThemeContextState = {
  theme: TTheme
  setTheme: (theme: TTheme) => void
}


