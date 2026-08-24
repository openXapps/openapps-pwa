import { createContext, useEffect, useReducer, useState } from "react"
import { getAuth, connectAuthEmulator, type ParsedToken } from "firebase/auth"

import { app } from "@/lib/firebase"
import AuthReducer from "@/context/AuthReducer"
import type { TAuthContextState, TAuthContextType } from "@/types/auth-context-types"

// PRODUCTION
export const auth = getAuth(app)
// DEVELOPMENT
connectAuthEmulator(auth, "http://127.0.0.1:9099")
// connectAuthEmulator(auth, "http://192.168.1.156:9099")

const initAppContextState: TAuthContextState = {
  auth: auth,
  isAuthorized: false,
  isAdmin: false,
}

export const AuthProviderContext = createContext<TAuthContextType>({
  state: initAppContextState,
  dispatch: () => { },
})

/**
 * Auth provider
 * @param param0 Children to be rendered within auth context provider
 * @returns React provider
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, initAppContextState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function checkIfAdmin(): void {
      if (auth.currentUser) {
        auth.currentUser.getIdTokenResult(false)
          .then(data => {
            const claims: ParsedToken = data.claims
            // console.log("claimes:", claims)
            if ("admin" in claims) if (claims["admin"]) {
              dispatch({ type: "SET_IS_ADMIN", payload: { isAdmin: true } })
            }
          })
      } else {
        dispatch({ type: "SET_IS_ADMIN", payload: { isAdmin: false } })
      }
    }

    const unsubscribe = state.auth.onAuthStateChanged(user => {
      // console.log("onAuthStateChanged triggered (auth): ", state.auth);
      // console.log("onAuthStateChanged triggered (user): ", user);
      setLoading(false)
      dispatch({ type: "SET_AUTHORIZATION", payload: { isAuthorized: user != null } })
      checkIfAdmin()
    })
    return unsubscribe
  }, [])

  return (
    <AuthProviderContext.Provider value={{ state, dispatch }}>
      {!loading && children}
    </AuthProviderContext.Provider>
  )
}
