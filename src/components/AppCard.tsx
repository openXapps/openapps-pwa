import { useEffect, useState } from "react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

import type { TAppModulesRecord } from "@/data/modules"

type AppCardProps = {
  app: TAppModulesRecord
  cookieAccepted: boolean
}

export default function AppCard({ app, cookieAccepted }: AppCardProps) {
  const [readMore, setReadMore] = useState(false)
  const [desc, setDesc] = useState(app.moduleDesc)
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    if (app.moduleDesc) {
      readMore && setDesc(app.moduleDesc)
      !readMore && setDesc(app.moduleDesc.substring(0, 100) + "...")
    }
  }, [readMore])

  function getImageUrl(image: string): string {
    return new URL(`../assets/apps/${image}.png`, import.meta.url).href
  }

  useEffect(() => {
    setImageUrl(getImageUrl(app.url))
  }, [])

  return (
    <div className="min-h-25 w-full bg-card text-card-foreground rounded-lg p-2 shadow">
      <div className="flex gap-3">
        {cookieAccepted ? (
          <>
            <img className="max-h-19 rounded-bl-sm rounded-tl-sm" src={imageUrl} alt={app.moduleName} />
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
