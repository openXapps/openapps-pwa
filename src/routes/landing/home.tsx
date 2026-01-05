import { useState, useEffect } from "react"

import Disclaimer from "@/components/Disclaimer"
import AppCard from "@/components/AppCard"

import type { SAppModule } from "@/schemas/app-schemas"
import type { TGetAllDocumentsProps } from "@/types/firestore-types"
import useFirestore from "@/hooks/useFirestore"
import { appModuleConverter } from "@/lib/converter"
import Loader from "@/components/Loader"

const cookieName = "openapps_accept_t&c"

export default function Home() {
  const { isLoading, getAllDocuments } = useFirestore()
  const [appModules, setAppModules] = useState<SAppModule[]>([])
  const [cookiesAccepted, setCookiesAccepted] = useState(true)
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
      <div className="mx-auto max-w-screen-sm flex flex-col gap-3 md:gap-6 mb-15">
        {isLoading
          ? (<Loader varient="SCREEN" />)
          : (
            !isError.ok
              ? (<p className="w-full text-center p-3">{isError.message}</p>)
              : (appModules.map(v => (
                v.isActive && <AppCard key={v.id} app={v} enabled={cookiesAccepted} />
              )))
          )
        }
      </div>
      <Disclaimer cookiesAccepted={cookiesAccepted} handleAcceptCookies={handleAcceptCookies} />
    </>
  )
}

