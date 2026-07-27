import type { TAppContextState, TAppReducerActions } from "@/types/app-context-types"

/**
 * Reducer function to mutate App state
 * @param {TAppContextState} state Current state
 * @param {TAppReducerActions} action Reducer action type and payload
 */
export default function AppReducer(state: TAppContextState, action: TAppReducerActions): TAppContextState {

  // console.log("App reducer: state.......", state);
  // console.log("App reducer: action......", action);

  switch (action.type) {
    case "SET_COOKIE_ACCEPTED":
      return {
        ...state,
        cookieAccepted: action.payload,
      }
    default:
      return state
  };
}