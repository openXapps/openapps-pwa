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

// const isErrorInit: { status: boolean, message: string } = { status: false, message: "" }

const formSchema = z.object({
  username: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "Username must be a valid email address"),
  password: z
    .string()
    // .min(8, "Password must be at least 8 characters long")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number")
    // .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

export default function SignInUser() {
  const rrNavigate = useNavigate()
  const { signInUser, setIsAuthorized, getIsAuthorized, setIsAdmin } = useAuth()
  const [isBusy, setIsBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const signInForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "john@domain.com",
      password: "password",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsBusy(true)
    try {
      await signInUser(data.username, data.password)
      setIsAuthorized(true)
      setIsAdmin()
      rrNavigate("/", { replace: true })
    } catch (error) {
      toast.error("Sign in error, try again", { position: "bottom-center" })
      setIsBusy(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sign-in with your existing account</CardTitle>
          <CardDescription>
            Welcome back to OpenApps. Please provide an email and password to sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-sign-up" onSubmit={signInForm.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={signInForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-sign-in-username">Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="form-sign-in-username"
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
                control={signInForm.control}
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
        </CardContent>
        <CardFooter className="mt-2">
          <Field orientation="horizontal">
            <Button type="button" variant="outline" disabled={isBusy} onClick={() => signInForm.reset()}>Reset</Button>
            <Button type="submit" className="grow" disabled={isBusy || getIsAuthorized()} form="form-sign-up">Submit</Button>
            <Button type="button" variant="outline" disabled={isBusy} onClick={() => rrNavigate(-1)}>Back</Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
