import type { Auth } from 'firebase/auth'

/**
 * Auth context state type.
 */
export type TAuthContextState = {
  auth: Auth
  isAuthorized: boolean
  isAdmin: boolean
}

/**
 * Reducer action type for Firebase Auth.
 */
type TAuthReducerSetAuth = {
  type: 'SET_FIREBASE_AUTH'
  payload: Auth
}

/**
 * Authorization context payload
 */
export type TAuthorizationPayload = {
  isAuthorized: boolean
  isAdmin: boolean
}

/**
 * Reducer action type for authorized or not.
 * This state is set in AuthProvider on initial launch.
 */
type TAuthReducerSetAuthorized = {
  type: 'SET_AUTHORIZATION'
  payload: TAuthorizationPayload
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

