import { Outlet } from "react-router"
import AppBar from "@/components/AppBar"

export default function Layout() {
  return (
    <>
      <div className="">
        <AppBar />
      </div>
      {/* <div className="mx-auto sm:container max-w-5xl"> */}
      <div className="mx-auto max-w-5xl mt-20">
        <Outlet />
      </div>
    </>
  )
}
