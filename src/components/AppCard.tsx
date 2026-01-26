import { useState } from "react"
import { Link } from "react-router"
import { twMerge } from "tailwind-merge"

import type { SAppModule } from "@/schemas/app-schemas"
import { Button } from "@/components/ui/button"

export default function AppCard({ app, cookieAccepted }: { app: SAppModule, cookieAccepted: boolean }) {
  const [readMore, setReadMore] = useState(false)

  return (
    <Link
      className={twMerge(cookieAccepted
        ? "hover:bg-slate-400 dark:hover:bg-slate-700"
        : "pointer-events-none cursor-default text-gray-300 dark:text-muted",
        "mx-3 p-2 border"
      )}
      to={app.url}
    >
      <h1 className="text-xl font-bold font-mono">{app.moduleName}</h1>
      <p className={twMerge(readMore ? "" : "truncate", "font-mono")}>{app.moduleDesc}</p>
      {/* <p className="font-mono">Created: {app.updatedAt.toDateString()}</p>
      <p className="font-mono">Updated: {app.createdAt.toDateString()}</p>
      <p className="font-mono">ID: {app.id}</p> */}
      <Button className="float-end" variant="ghost" onClick={(e) => {
        e.preventDefault()
        setReadMore(prevState => !prevState)
      }}>{readMore ? "Read less" : "Read more"}</Button>
    </Link>
  )
}
