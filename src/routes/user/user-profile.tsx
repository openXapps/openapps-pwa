import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"

import useAuth from '@/hooks/useAuth'
import type { TUserInfoType } from "@/types/firestore-types"

// https://picsum.photos/

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
    .optional().or(z.literal(""))
})

export default function UserProfile() {
  const rrNavigate = useNavigate()
  const { getInfo, setInfo, setEmail, setPassword, getUID, getIsAdmin } = useAuth()
  const [isBusy, setIsBusy] = useState(false)
  const currentValues: TUserInfoType = getInfo()
  const [showPassword, setShowPassword] = useState(false)
  const profileForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knownAs: currentValues.displayName || "",
      username: currentValues.email || "",
      password: "",
    },
  })

  async function handleUpdateProfile(data: z.infer<typeof formSchema>) {
    setIsBusy(true)

    if (
      currentValues.displayName !== data.knownAs ||
      currentValues.email !== data.username
    ) {
      try {
        await setInfo({
          displayName: data.knownAs,
          email: data.username,
          photoURL: ""
        })
      } catch (error) {
        return null
      }
    }

    if (
      currentValues.email !== data.username &&
      currentValues.displayName === data.knownAs
    ) {
      try {
        await setEmail(data.username)
      } catch (error) {
        console.log(error)
      }
    }

    if (data.password !== null) {
      try {
        await setPassword(data.password || "")
      } catch (error) {
        console.log(error)
      }
    }

    setIsBusy(false)
    rrNavigate(-1)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update your user details</CardTitle>
          <CardDescription>
            Your details can be updated and saved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-profile" onSubmit={profileForm.handleSubmit(handleUpdateProfile)}>
            <FieldGroup>
              <Controller
                name="knownAs"
                control={profileForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-profile-knownas">Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="form-profile-knownas"
                      aria-invalid={fieldState.invalid}
                      placeholder="First name, nickname or known as"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
              <Controller
                name="username"
                control={profileForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-profile-username">Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="form-profile-username"
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
                control={profileForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-profile-password">Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id="form-profile-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="leave blank if unchanged"
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
          <Separator className="my-3" />
          <p>Email validated: {currentValues.emailVerified ? 'YES' : 'NO'}</p>
          <p>Administrator: {getIsAdmin() ? 'YES' : 'NO'}</p>
          <p>User ID: {getUID()}</p>
        </CardContent>
        <CardFooter className="mt-5">
          <Field orientation="horizontal">
            <Button type="submit" className="grow" disabled={isBusy} form="form-profile">Submit</Button>
            <Button type="button" variant="outline" disabled={isBusy} onClick={() => rrNavigate(-1)}>Back</Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
