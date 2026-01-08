/**
 * Route context state type.
 */
export type TRouteContextState = {
  routeId: string
}

/**
 * Route context payload.
 */
export type TRoutePayload = {
  routeId: string
}

/**
 * Reducer action type for router.
 */
type TRouteReducerSetRoute = {
  type: "SET_ROUTE_ID"
  payload: string
}

/**
 * Combined reducer actions for RouteReducer.
 */
export type TRouteReducerActions = TRouteReducerSetRoute

/**
 * Context provider type for RouteProviderContext.
 */
export type TRouteContextType = {
  routeState: TRouteContextState
  routeDispatch: React.Dispatch<TRouteReducerActions>
}

