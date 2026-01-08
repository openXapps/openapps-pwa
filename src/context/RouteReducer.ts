import type { TRouteContextState, TRouteReducerActions } from "@/types/route-context-types"

/**
 * Reducer function to mutate Route state
 * @param {TRouteContextState} state Current state
 * @param {TRouteReducerActions} action Reducer action type and payload
 */
export default function RouteReducer(state: TRouteContextState, action: TRouteReducerActions): TRouteContextState {

  // console.log("Route reducer: state.......", state);
  // console.log("Route reducer: action......", action);

  switch (action.type) {
    case "SET_ROUTE_ID":
      return {
        ...state,
        routeId: action.payload,
      }
    default:
      return state
  };
}