import { useState, useEffect } from "react"

import Disclaimer from "@/components/Disclaimer"
import AppCard from "@/components/AppCard"

import { appList } from "@/data/app-data"

const cookieName = "openapps_accept_t&c"

export default function Home() {
  const [cookiesAccepted, setCookiesAccepted] = useState(true)

  useEffect(() => {
    const cookies = decodeURIComponent(document.cookie)
    if (!cookiesAccepted && cookies.indexOf(cookieName + "=Yes") > -1) setCookiesAccepted(true)
    if (cookiesAccepted && cookies.indexOf(cookieName + "=Yes") === -1) setCookiesAccepted(false)

    return () => { }
  }, [cookiesAccepted])

  const handleAcceptCookies = () => {
    let d = new Date()
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000))
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cookieName}=Yes;expires=${expires};`
    setCookiesAccepted(true)
  }

  return (
    <>
      <div className="mx-auto max-w-screen-sm flex flex-col gap-3 md:gap-6 mt-3 mb-15">
        {appList.map((v, i) => (
          <AppCard key={i} app={v} enabled={cookiesAccepted} />
        ))}
      </div>
      <Disclaimer cookiesAccepted={cookiesAccepted} handleAcceptCookies={handleAcceptCookies} />
    </>
  )
}

