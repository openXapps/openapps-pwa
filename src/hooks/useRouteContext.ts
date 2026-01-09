import { useContext } from "react"
import { RouteProviderContext } from "@/context/RouteProvider"
import { routes } from "@/data/routes"

export default function useRouteContext() {
  const routeContext = useContext(RouteProviderContext)

  if (routeContext === undefined) {
    throw new Error("useRouteContext must be used within a RouteProvider")
  }

  /**
   * Function to set routerContext to specified route
   * @param routeId The router path value
   */
  function setRouteId(routeId: string): void {
    routeContext.routeDispatch({ type: "SET_ROUTE_ID", payload: routeId })
  }

  function getTitle(routeId: string): string {
    return routes.find(v => v.routeId === routeId)?.routeTitle || ""
  }

  return {
    routeContext: routeContext,
    setRouteId: setRouteId,
    getTitle: getTitle
  }
}