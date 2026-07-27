import { useContext, useEffect, useState } from "react"
import { AppProviderContext } from "@/context/AppProvider"
import type { TAppContextType } from "@/types/app-context-types"

type TUseAppContextReturn = {
  appContext: TAppContextType
  createTcCookie: () => void
  // cookieName: string
  // cookieAccepted: boolean
  // getTcCookie: () => void
  // setTcCookie: (cookieAccepted: boolean) => void
}

export default function useAppContext(): TUseAppContextReturn {
  const appContext = useContext(AppProviderContext)
  // const [cookieAccepted, setCookiesAccepted] = useState(true)
  const cookieName = "openapps_accept_t&c"

  if (appContext === undefined) {
    throw new Error("useAppContext must be used within a AppProvider")
  }

  // function getTcCookie(): void {
  //   const cookies = decodeURIComponent(document.cookie)
  //   if (!cookieAccepted && cookies.indexOf(cookieName + "=Yes") > -1) setCookiesAccepted(true)
  //   if (cookieAccepted && cookies.indexOf(cookieName + "=Yes") === -1) setCookiesAccepted(false)
  // }

  // function setTcCookie(cookieAccepted: boolean): void {
  //   appContext.appDispatch({ type: "SET_COOKIE_ACCEPTED", payload: cookieAccepted })
  // }

  function createTcCookie(): void {
    let d = new Date()
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000))
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cookieName}=Yes;expires=${expires};`
    appContext.appDispatch({ type: "SET_COOKIE_ACCEPTED", payload: true })
  }

  // useEffect(() => {
  //   getTcCookie()
  // }, [])

  return {
    appContext: appContext,
    createTcCookie: createTcCookie,
    // cookieName: cookieName,
    // cookieAccepted: cookieAccepted,
    // getTcCookie: getTcCookie,
    // setTcCookie: setTcCookie,
  }
}