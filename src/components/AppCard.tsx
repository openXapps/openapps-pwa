import { twMerge } from "tailwind-merge"
import type { AppObject } from "@/lib/app-data"

export default function AppCard({ app, enabled }: { app: AppObject, enabled: boolean }) {
  return (
    <a
      className={twMerge(enabled
        ? "hover:bg-slate-400 dark:hover:bg-slate-700 transition"
        : "pointer-events-none cursor-default text-slate-300 dark:text-slate-600", "p-4 text-center rounded-xl"
      )}
      href={app.url}
    >
      <h1 className="text-xl font-bold font-mono">{app.title}</h1>
      <p className="font-mono">{app.description}</p>
    </a>
  )
}
// bg-slate-400 dark:bg-slate-700
