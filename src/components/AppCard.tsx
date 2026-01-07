import { Link } from "react-router"
import { twMerge } from "tailwind-merge"

import type { SAppModule } from "@/schemas/app-schemas"

export default function AppCard({ app, cookieAccepted }: { app: SAppModule, cookieAccepted: boolean }) {
  return (
    <Link
      className={twMerge(cookieAccepted
        ? "hover:bg-slate-400 dark:hover:bg-slate-700"
        : "pointer-events-none cursor-default text-gray-300 dark:text-muted",
        "mx-3 p-2 text-center rounded-xl border"
      )}
      to={app.url}
    >
      <h1 className="text-xl font-bold font-mono">{app.moduleName}</h1>
      <p className="font-mono">{app.moduleDesc}</p>
      {/* <p className="font-mono">Created: {app.updatedAt.toDateString()}</p>
      <p className="font-mono">Updated: {app.createdAt.toDateString()}</p>
      <p className="font-mono">ID: {app.id}</p> */}
    </Link>
  )
}
