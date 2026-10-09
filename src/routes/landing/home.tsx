import Disclaimer from "@/routes/landing/disclaimer"
import AppCard from "@/components/AppCard"
import useAppContext from "@/hooks/useAppContext"
import { appModules } from "@/data/modules"

export default function RootHome() {
  const { appContext, createTcCookie } = useAppContext()

  return (
    <>
      <div className="max-w-3xl flex flex-col gap-4 items-center mx-auto">
        {appModules.map((v) => {
          return v.isActive && (
            <AppCard
              key={v.id}
              app={v}
              cookieAccepted={appContext.appState.cookieAccepted}
            />)
        })}
      </div>
      <Disclaimer cookieAccepted={appContext.appState.cookieAccepted} createTcCookie={createTcCookie} />
    </>
  )
}

