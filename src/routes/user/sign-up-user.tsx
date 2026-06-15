import { useState } from "react"
import { useNavigate } from "react-router"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"

import useAuth from "@/hooks/useAuth"

// https://ui.shadcn.com/docs/forms/react-hook-form
// https://uibakery.io/regex-library/password
const formSchema = z.object({
  knownAs: z.string().min(2, "Not a valid name").max(30, "Name is too long"),
  username: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "Username must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})
// .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password is not strong enough")

export default function SignUpUser() {
  const rrNavigate = useNavigate()
  const { signUpUser, setIsAuthorized, getIsAuthorized, setInfo } = useAuth()
  const [isBusy, setIsBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const signUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knownAs: "",
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data)
    setIsBusy(true)
    try {
      await signUpUser(data.username, data.password)
      setIsAuthorized(true)
      try {
        await setInfo({
          displayName: data.knownAs,
          photoURL: "",
          email: data.username,
        })
      } catch (error) {
        toast.error("Could not update profile, please try again", { position: "top-center" })
        setIsBusy(false)
      }
      rrNavigate("/", { replace: true })
    } catch (error) {
      toast.error("Could not create an account, please try again", { position: "top-center" })
      setIsBusy(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Welcome to OpenApps. Please provide an email and password to sign-up for a free account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-sign-up" onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="knownAs"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-sign-up-knownas">Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="form-sign-up-knownas"
                      aria-invalid={fieldState.invalid}
                      placeholder="First name, nickname or known as"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
              <Controller
                name="username"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-sign-up-username">Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="form-sign-up-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="name@domain.com"
                    // autoComplete="off"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-sign-up-password">Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id="form-sign-up-password"
                        aria-invalid={fieldState.invalid}
                      // autoComplete="off"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="secondary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "hide" : "show"}</InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <p className="mt-4 text-sm">Typical requirements for a "strong" password include:</p>
          <ul className="text-sm">
            <li>- A minimum length (commonly 8 characters or more).</li>
            <li>- At least one uppercase letter.</li>
            <li>- At least one lowercase letter.</li>
            <li>- At least one number (digit).</li>
            <li>- At least one special character (e.g. !  @  #  $  %).</li>
          </ul>
        </CardContent>
        <CardFooter className="mt-5">
          <Field orientation="horizontal">
            <Button type="button" variant="outline" disabled={isBusy} onClick={() => signUpForm.reset()}>Reset</Button>
            <Button type="submit" className="grow" disabled={isBusy || getIsAuthorized()} form="form-sign-up">Submit</Button>
            <Button type="button" variant="outline" disabled={isBusy} onClick={() => rrNavigate(-1)}>Back</Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
