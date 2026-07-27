import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"

import useAuth from "@/hooks/useAuth"
import useTheme from "@/hooks/useTheme"
import useRouteContext from "@/hooks/useRouteContext"
import useAppContext from "@/hooks/useAppContext"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ArrowLeft, Sun } from "lucide-react"
import logo from "@/assets/logo.svg"

export default function AppBar() {
  const rrNavigate = useNavigate()
  const rrLocation = useLocation()
  const { routeContext, getTitle } = useRouteContext()
  const { auth, signOutUser, getIsAuthorized, getIsAdmin, getInfo } = useAuth()
  const { setRouteId } = useRouteContext()
  const { theme, setTheme } = useTheme()
  const [isBusy, setIsBusy] = useState(false)
  const { appContext } = useAppContext()

  useEffect(() => {
    // console.log(rrLocation.pathname)
    setRouteId(rrLocation.pathname)

    return () => { }
  }, [rrLocation.pathname])

  const handleSignUserOut = async () => {
    setIsBusy(true)
    try {
      await signOutUser(auth)
      setIsBusy(false)
    } catch (error) {
      console.log("Sign out error")
      setIsBusy(false)
    }
  }

  const toggleTheme = (): void => {
    if (theme !== "system") {
      theme === "dark" ? setTheme("light") : setTheme("dark")
      return
    }
    if (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("light")
      return
    }
    if (theme === "system" && !window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      return
    }
  }

  return (
    <div className="fixed left-0 top-0 w-full z-10 bg-muted">
      <div className="max-w-3xl mx-auto flex justify-between items-center py-2 px-2 md:px-0">
        <div className="flex items-center gap-1 md:gap-3">
          <Link to="/">
            <img className="w-6" src={logo} alt="openapps logo" />
          </Link>
          <h1 className="sm:text-xl font-bold tracking-wide">{getTitle(routeContext.routeState.routeId)}</h1>
        </div>
        {rrLocation.pathname === "/" ? (
          <div className="flex gap-1 items-center">
            <Button variant="outline" size="icon" onClick={toggleTheme}><Sun /></Button>
            {getIsAuthorized() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"><span className="max-w-32 truncate">{getInfo().displayName}</span><span className="sr-only">open menu</span></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem disabled={isBusy} onClick={() => rrNavigate("/user")}
                  >View Profile<span className="sr-only">menu user profile</span></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={!getIsAdmin() || isBusy} onClick={() => rrNavigate("/appmodules")}
                  >Administration<span className="sr-only">menu user admin</span></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={isBusy} onClick={handleSignUserOut}
                  >Sign Out<span className="sr-only">menu sign out</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-1">
                <Button
                  variant="outline"
                  onClick={() => rrNavigate("/signin")}
                  disabled={!appContext.appState.cookieAccepted}
                >Sign In</Button>
                <Button
                  variant="outline"
                  onClick={() => rrNavigate("/signup")}
                  disabled={!appContext.appState.cookieAccepted}
                >Sign Up</Button>
              </div>
            )}
          </div>
        ) : (
          <Button variant="outline" size="icon" onClick={() => rrNavigate(-1)}><ArrowLeft /></Button>
        )}
      </div>
    </div>
  )
}
