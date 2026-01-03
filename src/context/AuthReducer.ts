import type { TAuthContextState, TAuthReducerActions } from "@/types/auth-context-types"

/**
 * Reducer function to mutate Auth state
 * @param {TAuthContextState} state Current state
 * @param {TAuthReducerActions} action Reducer action type and payload
 */
export default function AuthReducer(state: TAuthContextState, action: TAuthReducerActions): TAuthContextState {

  // console.log("auth reducer: state.......", state);
  // console.log("auth reducer: action......", action);

  switch (action.type) {
    case "SET_FIREBASE_AUTH":
      return {
        ...state,
        auth: action.payload,
      }
    case "SET_AUTHORIZATION":
      return {
        ...state,
        isAuthorized: action.payload.isAuthorized,
      }
    case "SET_IS_ADMIN":
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
      }
    default:
      return state
  };
}