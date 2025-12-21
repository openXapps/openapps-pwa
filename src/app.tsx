import Router from "@/routes/router/router"

import { ThemeProvider } from "@/context/ThemeProvider"
import { AuthProvider } from "@/context/AuthProvider"
import { FirestoreProvider } from "./context/FirestoreProvider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="home-theme">
      <FirestoreProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </FirestoreProvider>
    </ThemeProvider>
  )
}

