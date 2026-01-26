import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import useAuth from "@/hooks/useAuth"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"

const isErrorInit: { status: boolean, message: string } = { status: false, message: "" }

// For emulation testing
const testUser = "john@domain.com"
const testPass = "password"

export default function SignInUser() {
  const rrNavigate = useNavigate()
  const { signInUser, setIsAuthorized, getIsAuthorized, setIsAdmin } = useAuth()
  const username = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)
  const [isError, setIsError] = useState(isErrorInit)
  const [isBusy, setIsBusy] = useState(false)

  const handleSignInUser = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    if (username.current?.value && password.current?.value) {
      setIsBusy(true)
      try {
        await signInUser(username.current.value, password.current.value)
        isError && setIsError(isErrorInit)
        setIsAuthorized(true)
        setIsAdmin()
        rrNavigate("/", { replace: true })
      } catch (error) {
        setIsError({ status: true, message: "Sign in error, try again" })
        setIsBusy(false)
        password.current.value = ""
      }
    } else {
      setIsError({ status: true, message: "Provide both username and password" })
    }
  }

  // const handleClearFields = () => {
  //   if (username.current != undefined) username.current.value = ""
  //   if (password.current != undefined) password.current.value = ""
  //   setIsError(isErrorInit)
  //   username.current?.focus()
  // }

  return (
    <div className="max-w-md mx-auto space-y-3 px-3 sm:px-0">
      <p className="">Welcome to OpenApps. Please provide an email and password to sign-in.</p>
      <form action="" onSubmit={handleSignInUser}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
            <Input
              id="sign-up-email"
              defaultValue={testUser}
              type="email"
              placeholder="name@example.com"
              required
              ref={username}
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
              {/* <Link to="/" className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >Forgot your password?</Link> */}
            </div>
            <Input
              id="sign-up-password"
              defaultValue={testPass}
              type="password"
              required
              ref={password}
            />
            <FieldDescription>For now, if you forgot your password, it cannot be recovered</FieldDescription>
          </Field>
          <Field>
            <Button disabled={isBusy || getIsAuthorized()} type="submit">Sign In</Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
      {isError.status && <p className="text-red-400 mt-3">{isError.message}</p>}
      {getIsAuthorized() && <p className="text-green-400 mt-3">You authorized</p>}
    </div>
  )
}
