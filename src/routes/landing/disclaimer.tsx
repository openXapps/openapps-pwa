import { Button } from "@/components/ui/button"
import { Link } from "react-router"

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
const TsCs = () => {
  return (
    <Link
      className="underline"
      to="/ts-and-cs"
      // target="_blank"
      // rel="noopener noreferrer"
    >Terms and Conditions</Link>
  )
}

const emojis = { grinningFaceWithBigEyes: "😃" }

type DisclaimerProps = {
  cookieAccepted: boolean
  handleAcceptCookies: () => void
}

export default function Disclaimer({ cookieAccepted, handleAcceptCookies }: DisclaimerProps) {
  // export default function Disclaimer() {
  return (
    <div className="fixed left-0 bottom-0 w-full z-10 bg-muted">
      <div className="flex flex-col items-center text-center p-3 mx-2 gap-3">
        {cookieAccepted ? (
          <p><span className="font-bold">No ads!</span> <span>{emojis.grinningFaceWithBigEyes}</span> Visit me on <Github /></p>
        ) : (
          <div className="opacity-60 space-y-2">
            <p>This site makes use of <Cookie /> and <Storage /> to give you the best online experience. Please read the <TsCs />. Do you accept?</p>
            <Button variant="default" className="rounded-md" onClick={handleAcceptCookies}>Yes I do</Button>
            <p>This message will be removed for 30 days once accepted</p>
          </div>
        )}
      </div>
    </div>
  )
}
