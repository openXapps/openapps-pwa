import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import Disclaimer from "@/routes/landing/disclaimer"
// import AppCard from "@/components/AppCard"
import AppCard from "@/components/AppCard-New"

import type { SAppModule } from "@/schemas/app-schemas"
import type { TGetAllDocumentsProps } from "@/types/firestore-types"
import { appModuleConverter } from "@/lib/converter"
import useFirestore from "@/hooks/useFirestore"
import useAppContext from "@/hooks/useAppContext"

// const cookieName = "openapps_accept_t&c"

export default function Home() {
  const { isLoading, getAllDocuments } = useFirestore()
  const { appContext, createTcCookie } = useAppContext()
  const [appModules, setAppModules] = useState<SAppModule[]>([])
  const [isError, setIsError] = useState({ ok: true, message: "" })
  const [retry, setRetry] = useState(0)

  async function fetchData() {
    const data: TGetAllDocumentsProps<SAppModule> = await getAllDocuments("/appModules/", appModuleConverter)
    if (data.ok) {
      setAppModules(data.payload.sort((a, b) => (a.order || 100) - (b.order || 100)))
    } else {
      setIsError({ ok: false, message: `Oops! Looks like we cannot reach the cloud. ${data.message}.` })
    }
  }

  useEffect(() => {
    fetchData()
    return () => { }
  }, [retry])

  function handleRetry() {
    setRetry(prevState => prevState + 1)
    setIsError({ ok: true, message: "" })
  }

  return (
    <>
      <div className="">
        {isLoading
          ? (
            <div className="flex justify-center mt-30">
              <Spinner className="size-15" />
            </div>
          )
          : (
            !isError.ok
              ? (
                <div className="flex flex-col gap-6 items-center mx-auto mt-30">
                  <p className="text-center">{isError.message}</p>
                  <Button variant="outline" onClick={handleRetry}>Lets reload the page - Attempt {retry}</Button>
                </div>
              )
              : (<div className="max-w-3xl flex flex-col gap-6 items-center mx-auto">
                {appModules.map((v, i) => {
                  let isEven: boolean = i % 2 == 0
                  return v.isActive && <AppCard
                    key={v.id}
                    app={v}
                    cookieAccepted={appContext.appState.cookieAccepted}
                    isEven={isEven} />
                })}
              </div>)
          )
        }
      </div>
      <Disclaimer cookieAccepted={appContext.appState.cookieAccepted} createTcCookie={createTcCookie} />
    </>
  )
}

