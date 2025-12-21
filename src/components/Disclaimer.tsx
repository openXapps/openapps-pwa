import { Button } from "./ui/button"

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
      href="https://github.com/openXapps/web-apps-home"
      target="_blank"
      rel="noopener noreferrer"
    >GitHub</a>
  )
}

const emojis = { grinningFaceWithBigEyes: "😃" }

type DisclaimerProps = {
  cookiesAccepted: boolean
  handleAcceptCookies: () => void
}

export default function Disclaimer({ cookiesAccepted, handleAcceptCookies }: DisclaimerProps) {
  // export default function Disclaimer() {
  return (
    <div className="fixed left-0 bottom-0 w-full z-10 bg-muted">
      <div className="flex flex-col items-center text-center p-3 mx-2 gap-3">
        {cookiesAccepted ? (
          <p><span className="font-bold">No ads!</span> <span>{emojis.grinningFaceWithBigEyes}</span> Visit me on <Github /></p>
        ) : (
          <div className="opacity-60 space-y-2">
            <p>This site makes use of <Cookie /> and <Storage /> to give you the best online experience. Do you accept?</p>
            <Button variant="default" className="rounded-md" onClick={handleAcceptCookies}>Yes I do</Button>
            <p>This message will be removed for 30 days once accepted</p>
          </div>
        )}
      </div>
    </div>
  )
}
