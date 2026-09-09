import { useEffect, useState } from "react"
import { Link } from "react-router"

import type { SAppModule } from "@/schemas/app-schemas"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

type AppCardProps = {
  app: SAppModule
  cookieAccepted: boolean
}

export default function AppCard({ app, cookieAccepted }: AppCardProps) {
  const [readMore, setReadMore] = useState(false)
  const [desc, setDesc] = useState(app.moduleDesc)

  useEffect(() => {
    if (app.moduleDesc) {
      readMore && setDesc(app.moduleDesc)
      !readMore && setDesc(app.moduleDesc.substring(0, 100) + "...")
    }
  }, [readMore])

  return (
    <div className="min-h-25 w-full bg-card text-card-foreground rounded-lg p-2">
      <div className="flex gap-3 max-w-3xl mx-auto">
        {cookieAccepted ? (
          <>
            <Link className="grow" to={app.url}>
              <p className="text-xl font-bold font-mono">{app.moduleName}</p>
              <p className="">{desc}</p>
            </Link>
            <Button variant="ghost" size="icon" onClick={(e) => {
              e.preventDefault()
              setReadMore(prevState => !prevState)
            }}>{readMore ? <ChevronUp /> : <ChevronDown />}</Button>
          </>
        ) : (
          <div>
            <p className="text-xl font-bold font-mono text-muted">{app.moduleName}</p>
            <p className="text-muted">{desc}</p>
          </div>
        )}
      </div>
    </div>
  )
}
