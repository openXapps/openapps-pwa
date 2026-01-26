import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import Disclaimer from "@/routes/landing/disclaimer"
import AppCard from "@/components/AppCard"

import type { SAppModule } from "@/schemas/app-schemas"
import type { TGetAllDocumentsProps } from "@/types/firestore-types"
import useFirestore from "@/hooks/useFirestore"
import { appModuleConverter } from "@/lib/converter"

const cookieName = "openapps_accept_t&c"

export default function Home() {
  const { isLoading, getAllDocuments } = useFirestore()
  const [appModules, setAppModules] = useState<SAppModule[]>([])
  const [cookieAccepted, setCookiesAccepted] = useState(true)
  const [isError, setIsError] = useState({ ok: true, message: "" })

  async function fetchData() {
    const data: TGetAllDocumentsProps<SAppModule> = await getAllDocuments("/appModules/", appModuleConverter)
    if (data.ok) {
      setAppModules(data.payload.sort((a, b) => (a.order || 100) - (b.order || 100)))
    } else {
      setIsError({ ok: false, message: `Oops! Looks like we cannot reach the cloud. ${data.message}` })
    }
  }

  useEffect(() => {
    fetchData()
    return () => { }
  }, [])

  useEffect(() => {
    const cookies = decodeURIComponent(document.cookie)
    if (!cookieAccepted && cookies.indexOf(cookieName + "=Yes") > -1) setCookiesAccepted(true)
    if (cookieAccepted && cookies.indexOf(cookieName + "=Yes") === -1) setCookiesAccepted(false)

    return () => { }
  }, [cookieAccepted])

  const handleAcceptCookies = () => {
    let d = new Date()
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000))
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cookieName}=Yes;expires=${expires};`
    setCookiesAccepted(true)
  }

  return (
    <>
      {/* <div className="mx-auto max-w-screen-sm flex flex-col md:gap-6 mb-15"> */}
      <div className="flex flex-col md:gap-6">
        {isLoading
          ? (
            <div className="flex justify-center">
              <Spinner className="size-15" />
            </div>
          )
          : (
            !isError.ok
              ? (
                <div className="flex flex-col gap-6 mt-3 mx-auto items-center">
                  <p className="text-center">{isError.message}</p>
                  <Button variant="outline" onClick={() => window.location.reload()}>Lets reload the page</Button>
                </div>
              )
              : (appModules.map(v => (
                v.isActive && <AppCard key={v.id} app={v} cookieAccepted={cookieAccepted} />
              )))
          )
        }
      </div>
      <Disclaimer cookieAccepted={cookieAccepted} handleAcceptCookies={handleAcceptCookies} />
    </>
  )
}

