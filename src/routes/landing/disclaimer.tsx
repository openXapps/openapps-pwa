import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import Terms from "./terms"

const emojis = { grinningFaceWithBigEyes: "😃" }

type DisclaimerProps = {
  cookieAccepted: boolean
  handleAcceptCookies: () => void
}

export default function Disclaimer({ cookieAccepted, handleAcceptCookies }: DisclaimerProps) {
  const [tcOpen, setTcOpen] = useState(false)
  const [tcClicked, setTcClicked] = useState(false)

  const Cookie = () => {
    return (
      <a
        className="underline"
        href="https://en.wikipedia.org/wiki/HTTP_cookie"
        target="_blank"
        rel="noopener noreferrer"
      >cookies</a>
    )
  }
  const Storage = () => {
    return (
      <a
        className="underline"
        href="https://en.wikipedia.org/wiki/Web_storage"
        target="_blank"
        rel="noopener noreferrer"
      >local storage</a>
    )
  }
  const Github = () => {
    return (
      <a
        className="underline"
        href="https://github.com/openXapps/openapps-pwa"
        target="_blank"
        rel="noopener noreferrer"
      >GitHub</a>
    )
  }

  return (
    <div className="fixed left-0 bottom-0 w-full z-10 bg-muted">
      <div className="flex flex-col items-center p-1 gap-3">
        {cookieAccepted ? (
          <p><span className="font-bold">No ads!</span> <span>{emojis.grinningFaceWithBigEyes}</span> Visit me on <Github /></p>
        ) : (
          <>
            {tcOpen && <Terms coolBeans={setTcClicked} setTcOpen={setTcOpen} />}
            {tcOpen && <Separator />}
            <p className="text-center">This site makes use of <Cookie /> and <Storage /> to give you the best online experience.</p>
            {!tcOpen && <Button variant="outline" onClick={() => {
              setTcClicked(false)
              setTcOpen(true)
            }}>Please read the Terms and Conditions</Button>}
            <Button variant="default" onClick={handleAcceptCookies} disabled={!tcClicked}>I Accept</Button>
            <p className="text-center">This message will be removed for 30 days once accepted</p>
          </>
        )}
      </div>
    </div>
  )
}
