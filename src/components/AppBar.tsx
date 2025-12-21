import { useNavigate } from "react-router"

import useAuth from "@/hooks/useAuth"
import useTheme from "@/hooks/useTheme"

import { Button } from "./ui/button"
import { Sun, UserRound, } from "lucide-react"
import logo from "@/assets/logo.svg"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function AppBar() {
  const { auth, isAuthorized, setAuthorized, signOutUser } = useAuth()
  const rrNavigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const handleSignUserOut = async () => {
    try {
      await signOutUser(auth)
      setAuthorized(false)
    } catch (error) {
      console.log("Sign out error")
    }
  }

  const toggleTheme = () => {
    theme === "dark"
      ? setTheme("light")
      : setTheme("dark")
  }

  return (
    <div className="fixed left-0 top-0 w-full z-10 bg-muted">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <img className="w-6" src={logo} alt="openapps logo" />
          <h1 className="text-xl font-bold tracking-wide">OpenApps</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}><Sun /></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex"
                size="icon"
              ><UserRound /><span className="sr-only">Open menu</span></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem disabled={isAuthorized} onClick={() => rrNavigate("/signin")}>Sign In</DropdownMenuItem>
              <DropdownMenuItem disabled={!isAuthorized} onClick={handleSignUserOut}>Sign Out</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={!isAuthorized} onClick={() => rrNavigate("/user")}>View Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
