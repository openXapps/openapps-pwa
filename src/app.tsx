import Router from "@/routes/router/router"

import { ThemeProvider } from "@/context/ThemeProvider"
import { AuthProvider } from "@/context/AuthProvider"
import { FirestoreProvider } from "./context/FirestoreProvider"
import { RouteProvider } from "./context/RouteProvider"
import { AppProvider } from "./context/AppProvider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="home-theme">
      <FirestoreProvider>
        <AuthProvider>
          <RouteProvider>
            <AppProvider>
              <Router />
            </AppProvider>
          </RouteProvider>
        </AuthProvider>
      </FirestoreProvider>
    </ThemeProvider>
  )
}

