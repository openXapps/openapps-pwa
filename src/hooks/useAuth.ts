import { useContext } from "react"
import {
  type UserCredential,
  type Auth,
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  type ParsedToken,
} from "firebase/auth"

import { auth, AuthProviderContext } from "@/context/AuthProvider"
import type { TUserInfoType } from "@/types/firestore-types"

/**
 * Auth context hook
 * @returns AuthProviderContext and helper functions
 */
export default function useAuth() {
  const context = useContext(AuthProviderContext)

  function signUpUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function signInUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signOutUser(auth: Auth): Promise<void> {
    return signOut(auth)
  }

  function getUID(): string | undefined {
    return context.state.auth.currentUser?.uid
  }

  function getIsAuthorized(): boolean {
    return context.state.isAuthorized
  }

  function getIsAdmin(): boolean {
    return context.state.isAdmin
  }

  function setIsAuthorized(isAuthorized: boolean): void {
    context.dispatch({ type: "SET_AUTHORIZATION", payload: { isAuthorized: isAuthorized } })
  }

  function setIsAdmin(): void {
    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult(false)
        .then(data => {
          const claims: ParsedToken = data.claims
          // console.log("claimes:", claims)
          if ("admin" in claims) if (claims["admin"]) {
            context.dispatch({ type: "SET_IS_ADMIN", payload: { isAdmin: true } })
          }
        })
    }
  }

  function getInfo(): TUserInfoType {
    if (context.state.auth.currentUser) {
      const user: User = context.state.auth.currentUser
      return {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        emailVerified: user.emailVerified,
      }
    }
    return {
      displayName: null,
      photoURL: null,
      email: null,
      emailVerified: false
    }
  }

  function setInfo(info: TUserInfoType): Promise<void> {
    if (context.state.auth.currentUser !== null) {
      const user: User = {
        ...context.state.auth.currentUser,
        displayName: info.displayName,
        photoURL: info.photoURL,
        email: info.email,
      }
      return updateProfile(context.state.auth.currentUser, user)
    }
    return Promise.resolve()
  }

  function setEmail(newEmail: string): Promise<void> {
    if (context.state.auth.currentUser !== null)
      return updateEmail(context.state.auth.currentUser, newEmail)
    return Promise.resolve()
  }

  function setPassword(newPassword: string): Promise<void> {
    if (context.state.auth.currentUser !== null)
      return updatePassword(context.state.auth.currentUser, newPassword)
    return Promise.resolve()
  }

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider")

  return {
    auth: context.state.auth,
    signUpUser: signUpUser,
    signInUser: signInUser,
    signOutUser: signOutUser,
    getIsAuthorized: getIsAuthorized,
    setIsAuthorized: setIsAuthorized,
    getIsAdmin: getIsAdmin,
    setIsAdmin: setIsAdmin,
    getUID: getUID,
    getInfo: getInfo,
    setInfo: setInfo,
    setEmail: setEmail,
    setPassword: setPassword,
  }
}