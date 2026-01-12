import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"

import useAuth from "@/hooks/useAuth"
import useTheme from "@/hooks/useTheme"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ArrowLeft, Sun, UserRound, } from "lucide-react"
import logo from "@/assets/logo.svg"
import useRouteContext from "@/hooks/useRouteContext"

export default function AppBar() {
  const rrNavigate = useNavigate()
  const rrLocation = useLocation()
  const { routeContext, getTitle } = useRouteContext()
  const { auth, signOutUser, getIsAuthorized, getIsAdmin, getInfo } = useAuth()
  const { setRouteId } = useRouteContext()
  const { theme, setTheme } = useTheme()
  const [isBusy, setIsBusy] = useState(false)

  useEffect(() => {
    console.log(rrLocation.pathname)
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

  const toggleTheme = () => {
    theme === "dark"
      ? setTheme("light")
      : setTheme("dark")
  }

  // console.log("Route Context:", routeContext.routeState)

  return (
    <div className="fixed left-0 top-0 w-full z-10 bg-muted">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img className="w-6" src={logo} alt="openapps logo" />
          </Link>
          <h1 className="text-xl font-bold tracking-wide">{getTitle(routeContext.routeState.routeId)}</h1>
        </div>
        {rrLocation.pathname === "/" ? (
          <div className="flex gap-1 items-center">
            {getIsAuthorized() && <p className="mr-1">{getInfo().displayName}</p>}
            <Button variant="outline" size="icon" onClick={toggleTheme}><Sun /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="data-[state=open]:text-muted-foreground"
                  size="icon"
                ><UserRound /><span className="sr-only">open menu</span></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem disabled={getIsAuthorized() || isBusy} onClick={() => rrNavigate("/signin")}
                >Sign In<span className="sr-only">menu sign in</span></DropdownMenuItem>
                <DropdownMenuItem disabled={getIsAuthorized() || isBusy} onClick={() => rrNavigate("/signup")}
                >Sign Up<span className="sr-only">menu sign up</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={!getIsAuthorized() || isBusy} onClick={() => rrNavigate("/user")}
                >View Profile<span className="sr-only">menu user profile</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={!getIsAuthorized() || !getIsAdmin() || isBusy} onClick={() => rrNavigate("/appmodules")}
                >Administration<span className="sr-only">menu user admin</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={!getIsAuthorized() || isBusy} onClick={handleSignUserOut}
                >Sign Out<span className="sr-only">menu sign out</span></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button variant="outline" size="icon" onClick={() => rrNavigate(-1)}><ArrowLeft /></Button>
        )}
      </div>
    </div>
  )
}
