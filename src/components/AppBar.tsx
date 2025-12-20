import { useNavigate } from "react-router"
import { twMerge } from "tailwind-merge"

import useAuth from "@/hooks/useAuth"

import { Button } from "./ui/button"
import { LogOut, UserRound, } from "lucide-react"
import logo from "@/assets/logo.svg"

export default function AppBar() {
  const { auth, isAuthorized, setAuthorized, signOutUser } = useAuth()
  const rrNavigate = useNavigate()

  const handleSignUserOut = async () => {
    try {
      await signOutUser(auth)
      setAuthorized(false)
    } catch (error) {
      console.log("Sign out error")
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <img className="w-6" src={logo} alt="openapps logo" />
          <h1 className="text-xl font-bold font-mono">OpenApps</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={!isAuthorized}
            className={twMerge(isAuthorized ? "text-green-800 dark:text-green-400" : "")}
            onClick={() => rrNavigate("/user")}
          ><UserRound />
          </Button>
          {isAuthorized && (
            <Button variant="ghost" size="icon" onClick={handleSignUserOut}>
              <LogOut />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
