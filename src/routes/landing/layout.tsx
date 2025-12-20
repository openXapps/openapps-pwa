import { Outlet } from "react-router"
import AppBar from "@/components/AppBar"

export default function Layout() {
  return (
    <>
      <div className="bg-slate-400 dark:bg-slate-700">
        <AppBar />
      </div>
      <div className="mx-auto sm:container max-w-5xl">
        <Outlet />
      </div>
    </>
  )
}
