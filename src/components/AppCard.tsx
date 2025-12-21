import { Link } from "react-router"
import { twMerge } from "tailwind-merge"

import type { AppObject } from "@/data/app-data"

export default function AppCard({ app, enabled }: { app: AppObject, enabled: boolean }) {
  return (
    <Link
      className={twMerge(enabled
        ? "hover:bg-slate-400 dark:hover:bg-slate-700"
        : "pointer-events-none cursor-default text-gray-300 dark:text-muted",
        "p-4 text-center rounded-xl"
      )}
      to={app.url}
    >
      <h1 className="text-xl font-bold font-mono">{app.title}</h1>
      <p className="font-mono">{app.description}</p>
    </Link>
  )
}
