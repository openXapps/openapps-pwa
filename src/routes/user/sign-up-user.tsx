import { useRef, useState } from "react"
import { useNavigate } from "react-router"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"

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

  // const handleClearFields = () => {
  //   if (username.current != undefined) username.current.value = ""
  //   if (password.current != undefined) password.current.value = ""
  //   setIsError(isErrorInit)
  // }

  return (
    <div className="max-w-md mx-auto space-y-3 px-3 sm:px-0">
      <p className="">Welcome to OpenApps. Please provide an email and password to sign-up for an account.</p>
      <form action="" onSubmit={handleSignUpUser}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
            <Input
              id="sign-up-email"
              type="email"
              placeholder="name@example.com"
              required
              ref={username}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
            <Input
              id="sign-up-password"
              type="password"
              required
              ref={password}
            />
            <p className="text-sm">Typical requirements for a "strong" password include:</p>
            <ol className="text-sm">
              <li>A minimum length (commonly 8 characters or more).</li>
              <li>At least one uppercase letter.</li>
              <li>At least one lowercase letter.</li>
              <li>At least one number (digit).</li>
              <li>At least one special character (e.g. !  @  #  $  %).</li>
            </ol>
          </Field>
          <Field>
            <Button disabled={isBusy || getIsAuthorized()} type="submit">Create a free account</Button>
            <FieldDescription className="text-center">
              By registering, you will automatically sign-in
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
      {isError.status && <p className="text-red-400 mt-3">{isError.message}</p>}
    </div>
  )
}
