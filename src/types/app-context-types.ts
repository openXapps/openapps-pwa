/**
 * App context state type.
 */
export type TAppContextState = {
  cookieAccepted: boolean
}

/**
 * App context payload.
 */
export type TAppPayload = {
  cookieAccepted: boolean
}

/**
 * Reducer action type for App.
 */
type TAppReducerSetRoute = {
  type: "SET_COOKIE_ACCEPTED"
  payload: boolean
}

/**
 * Combined reducer actions for AppReducer.
 */
export type TAppReducerActions = TAppReducerSetRoute

/**
 * Context provider type for AppProviderContext.
 */
export type TAppContextType = {
  appState: TAppContextState
  appDispatch: React.Dispatch<TAppReducerActions>
}

