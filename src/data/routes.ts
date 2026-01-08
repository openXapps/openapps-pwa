export type TRoutes = {
  routeId: string
  routePath: string
  routeTitle: string
}

export const routes: TRoutes[] = [
  {
    routeId: "home",
    routePath: "/",
    routeTitle: "OpenApps",
  },
  {
    routeId: "admin-modules",
    routePath: "appmodules",
    routeTitle: "Admin: Modules",
  },
]