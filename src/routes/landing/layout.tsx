// import { Outlet, useLocation } from "react-router"
import { Outlet } from "react-router"

import AppBar from "@/components/AppBar"
import { Toaster } from "@/components/ui/sonner"

export default function Layout() {
  // const rrLocation = useLocation()

  /**
   * TODO
   * Need to catch an external redirect
   */
  // https://www.robinwieruch.de/react-router-redirect/
  // console.log(rrLocation.search);

  return (
    <>
      <Toaster />
      <div className="">
        <AppBar />
      </div>
      <div className="mt-15 mb-12 mx-2 sm:mx-0">
        <Outlet />
      </div>
    </>
  )
}
