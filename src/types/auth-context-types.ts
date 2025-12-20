import type { Auth } from 'firebase/auth'

/**
 * Auth context state type.
 */
export type TAuthContextState = {
  auth: Auth
  isAuthorized: boolean
}

/**
 * Reducer action type for Firebase Auth.
 */
type TAuthReducerSetAuth = {
  type: 'SET_AUTH'
  payload: Auth
}

/**
 * Reducer action type for authorized or not.
 * This state is set in AuthProvider on initial launch.
 */
type TAuthReducerSetAuthorized = {
  type: 'SET_ISAUTHORIZED'
  payload: boolean
}

/**
 * Combined reducer actions for AuthReducer.
 */
export type TAuthReducerActions = TAuthReducerSetAuth | TAuthReducerSetAuthorized

/**
 * Context provider type for AuthProviderContext.
 */
export type TAuthContextType = {
  state: TAuthContextState
  dispatch: React.Dispatch<TAuthReducerActions>
}

