import { createContext, useReducer } from "react"

import RouteReducer from "@/context/RouteReducer"
import type { TRouteContextState, TRouteContextType } from "@/types/route-context-types"

const initRouteContextState: TRouteContextState = {
  routeId: "home",
}

export const RouteProviderContext = createContext<TRouteContextType>({
  routeState: initRouteContextState,
  routeDispatch: () => { },
})

/**
 * Route provider
 * @param param0 Children to be rendered within route context provider
 * @returns React provider
 */
export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [routeState, routeDispatch] = useReducer(RouteReducer, initRouteContextState)

  return (
    <RouteProviderContext.Provider value={{ routeState, routeDispatch }}>
      {children}
    </RouteProviderContext.Provider>
  )
}
