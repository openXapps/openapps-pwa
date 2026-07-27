import { createContext, useReducer } from "react"

import AppReducer from "@/context/AppReducer"
import type { TAppContextState, TAppContextType } from "@/types/app-context-types"

function getTcCookie(): boolean {
  const cookies = decodeURIComponent(document.cookie)
  let cookieAccepted = false
  if (cookies.indexOf("openapps_accept_t&c=Yes") > -1) cookieAccepted = true
  return cookieAccepted
}

const initAppContextState: TAppContextState = {
  cookieAccepted: getTcCookie(),
}

export const AppProviderContext = createContext<TAppContextType>({
  appState: initAppContextState,
  appDispatch: () => { },
})

/**
 * App provider
 * @param param0 Children to be rendered within app context provider
 * @returns React provider
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appState, appDispatch] = useReducer(AppReducer, initAppContextState)

  return (
    <AppProviderContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppProviderContext.Provider>
  )
}
