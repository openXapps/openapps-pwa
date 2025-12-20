import Router from "@/routes/landing/router"

import { ThemeProvider } from "@/context/ThemeProvider"
import { AuthProvider } from "@/context/AuthProvider"
import { FirestoreProvider } from "./context/FirestoreProvider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="home-theme">
      <FirestoreProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </FirestoreProvider>
    </ThemeProvider>
  )
}

