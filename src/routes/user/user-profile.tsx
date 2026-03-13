import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import useAuth from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import type { TUserInfoType } from "@/types/firestore-types"

// https://picsum.photos/

export default function UserProfile() {
  const rrNavigate = useNavigate()
  const { getInfo, setInfo, setEmail, setPassword, getUID, getIsAdmin } = useAuth()
  const [isBusy, setIsBusy] = useState(false)
  const currentValues: TUserInfoType = getInfo()
  const nameRef = useRef<HTMLInputElement | null>(null)
  const photoRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    setIsBusy(true)

    if (nameRef.current !== null && emailRef.current !== null && photoRef.current !== null) {
      const isValid = true // Fixed value for now. Need implementation
      if (
        currentValues.displayName !== nameRef.current.value ||
        currentValues.photoURL !== photoRef.current.value
      ) {
        if (isValid) {
          try {
            await setInfo({
              displayName: nameRef.current.value,
              photoURL: photoRef.current.value,
              email: emailRef.current.value,
            })
          } catch (error) {
            console.log(error)
          }
        }
      }
    }

    if (emailRef.current !== null && currentValues.email !== emailRef.current.value) {
      const isEmailValid = true // Fixed value for now. Need implementation
      if (isEmailValid && emailRef.current.value !== getInfo().email) {
        try {
          await setEmail(emailRef.current.value)
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (passwordRef.current !== null) {
      const isPasswordValid = true // Fixed value for now. Need implementation
      if (isPasswordValid) {
        try {
          await setPassword(passwordRef.current.value)
        } catch (error) {
          console.log(error)
        }
      }
    }

    setIsBusy(false)
    rrNavigate(-1)
  }

  return (
    <div className="max-w-md mx-auto space-y-3 px-3 sm:px-0">
      <p className="">View or amend your user profile data.</p>
      <form className="space-y-2" onSubmit={handleUpdateUser}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="user-details-name">Name</FieldLabel>
            <Input
              id="user-details-name"
              ref={nameRef}
              type="text"
              placeholder="Display name"
              // defaultValue={getInfo().displayName || undefined} />
              defaultValue={currentValues.displayName || undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="user-details-photo">Photo URL</FieldLabel>
            <Input
              id="user-details-photo"
              ref={photoRef}
              type="url"
              placeholder="Photo URL"
              defaultValue={currentValues.photoURL || undefined} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="user-details-email">Email</FieldLabel>
              <Input
                id="user-details-email"
                ref={emailRef}
                type="email"
                placeholder="Email"
                defaultValue={currentValues.email || undefined} />
            </Field>
            <Field>
              <FieldLabel htmlFor="user-details-password">Password</FieldLabel>
              <Input
                id="user-details-password"
                ref={passwordRef}
                type="password"
                placeholder="Leave blank if unchanged" />
            </Field>
          </div>
        </FieldGroup>
      </form>
      <Separator />
      <div className="space-x-2">
        <Button onClick={handleUpdateUser} type="submit" disabled={isBusy}>Save</Button>
        {/* <Button onClick={() => { }} disabled={isBusy}>Reset Password</Button> */}
        <Button onClick={() => rrNavigate(-1)} disabled={isBusy}>Back</Button>
      </div>
      <Separator />
      <p>Email validated: {currentValues.emailVerified ? 'YES' : 'NO'}</p>
      <p>Administrator: {getIsAdmin() ? 'YES' : 'NO'}</p>
      <p>{getUID()}</p>
      <Avatar>
        <AvatarImage src={currentValues.photoURL || undefined} alt={currentValues.email || undefined} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
