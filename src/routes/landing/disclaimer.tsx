import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const emojis = { grinningFaceWithBigEyes: "😃" }

type DisclaimerProps = {
  cookieAccepted: boolean
  handleAcceptCookies: () => void
}

export default function Disclaimer({ cookieAccepted, handleAcceptCookies }: DisclaimerProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
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
  const TsCs = () => {
    return (
      <Button
        variant="outline"
        onClick={() => setDialogOpen(true)}
      >Please read the Terms and Conditions</Button>
    )
  }

  return (
    <div className="fixed left-0 bottom-0 w-full z-10 bg-muted">
      <div className="flex flex-col items-center text-center p-3 mx-2 gap-3">
        {cookieAccepted ? (
          <p><span className="font-bold">No ads!</span> <span>{emojis.grinningFaceWithBigEyes}</span> Visit me on <Github /></p>
        ) : (
          <div className="opacity-60 space-y-2">
            {/* <p>This site makes use of <Cookie /> and <Storage /> to give you the best online experience. Please read the <TsCs />. Do you accept?</p> */}
            <p>This site makes use of <Cookie /> and <Storage /> to give you the best online experience.</p>
            <p><TsCs /></p>
            <p><Button variant="default" className="rounded-md" onClick={handleAcceptCookies} disabled={!tcClicked}>I Accept</Button></p>
            <p>This message will be removed for 30 days once accepted</p>
          </div>
        )}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <DialogContent className="max-w-120"> */}
        <DialogContent className="max-w-120">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              <div className="max-h-100 overflow-auto">
                <p>Welcome to the OpenApps.co.za website (the "Website").</p>
                <p>This Website provides this Website and Services (located at MyWebsite.com) to you subject to the notices, terms, and conditions set forth in these terms (the "Terms of Use"). In addition, when you use any of our Services, you will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they are incorporated into this Terms of Use by this reference.</p>
                <p>These Terms of Use are effective as of January 13, 2026.</p>
                <p>Your eligibility for use of the Website is contingent upon meeting the following conditions:</p>
                <ul>
                  <li>You are at least 18 years of age</li>
                  <li>You use the Website and Services according to these Terms of Use and all applicable laws and regulations determined by the state and country of residence</li>
                  <li>You provide complete and accurate registration information and maintain accurate registration information on the Webite</li>
                  <li>You agree and understand that My Website may, at any time, and without prior notice, revoke and/or cancel your access if you fail to meet these criteria or violate any portion of these Terms of Use</li>
                  <li>You agree and understand that My Website may, at any time, and without prior notice, revoke and/or cancel your access if you fail to meet these criteria or violate any portion of these Terms of Use</li>
                  <li>You agree and understand that My Website may, at any time, and without prior notice, revoke and/or cancel your access if you fail to meet these criteria or violate any portion of these Terms of Use</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setTcClicked(true)}>I've read these terms</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
