import { useContext } from "react"
import { RouteProviderContext } from "@/context/RouteProvider"
import { routes } from "@/data/routes"

export default function useRouteContext() {
  const routeContext = useContext(RouteProviderContext)

  if (routeContext === undefined) {
    throw new Error("useRouteContext must be used within a RouteProvider")
  }

  function setRouteId(routeId: string): void {
    routeContext.routeDispatch({ type: "SET_ROUTE_ID", payload: routeId })
  }

  function getPath(routeId: string): string {
    return routes.find(v => v.routeId === routeId)?.routePath || ""
  }

  function getTitle(routeId: string): string {
    return routes.find(v => v.routeId === routeId)?.routeTitle || ""
  }

  return {
    routeContext: routeContext,
    setRouteId: setRouteId,
    getPath: getPath,
    getTitle: getTitle
  }
}