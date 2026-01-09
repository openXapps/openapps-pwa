import { useRef, useState } from "react"
import { useNavigate } from "react-router"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import useAuth from "@/hooks/useAuth"

const isErrorInit: { status: boolean, message: string } = { status: false, message: "" }

export default function SignUpUser() {
  const rrNavigate = useNavigate()
  const { signUpUser, setIsAuthorized, getIsAuthorized } = useAuth()
  const username = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)
  const [isError, setIsError] = useState(isErrorInit)
  const [isBusy, setIsBusy] = useState(false)

  const handleSignUpUser = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    if (username.current?.value && password.current?.value) {
      setIsBusy(true)
      try {
        await signUpUser(username.current.value, password.current.value)
        isError && setIsError(isErrorInit)
        setIsAuthorized(true)
        rrNavigate("/", { replace: true })
      } catch (error) {
        setIsError({ status: true, message: "Sign up error, try again" })
        setIsBusy(false)
        password.current.value = ""
      }
    } else {
      setIsError({ status: true, message: "Provide both username and password" })
    }
  }

  const handleClearFields = () => {
    if (username.current != undefined) username.current.value = ""
    if (password.current != undefined) password.current.value = ""
    setIsError(isErrorInit)
    // username.current?.focus()
  }

  return (
    <div className="max-w-md mx-auto space-y-3 px-3 sm:px-0">
      <p className="">Welcome to OpenApps. Please provide an email and password to sign-up for an account.</p>
      <form action="" onSubmit={handleSignUpUser}>
        <div className="flex flex-col gap-3">
          <Input
            defaultValue=""
            ref={username}
            type="email"
            placeholder="email" />
          <Input
            defaultValue=""
            ref={password}
            type="password"
            placeholder="password" />
          <div className="flex gap-2">
            <Button disabled={isBusy || getIsAuthorized()} className="" onClick={handleSignUpUser} type="submit">Sign Up</Button>
            <Button disabled={isBusy || getIsAuthorized()} className="" onClick={handleClearFields} type="button">Clear</Button>
            <Button disabled={isBusy} className="" onClick={() => rrNavigate(-1)} type="button">Cancel</Button>
          </div>
        </div>
      </form>
      {isError.status && <p className="text-red-400 mt-3">{isError.message}</p>}
      {getIsAuthorized() && <p className="text-green-400 mt-3">You authorized</p>}
    </div>
  )
}
