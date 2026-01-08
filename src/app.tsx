import Router from "@/routes/router/router"

import { ThemeProvider } from "@/context/ThemeProvider"
import { AuthProvider } from "@/context/AuthProvider"
import { FirestoreProvider } from "./context/FirestoreProvider"
import { RouteProvider } from "./context/RouteProvider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="home-theme">
      <FirestoreProvider>
        <AuthProvider>
          <RouteProvider>
            <Router />
          </RouteProvider>
        </AuthProvider>
      </FirestoreProvider>
    </ThemeProvider>
  )
}

