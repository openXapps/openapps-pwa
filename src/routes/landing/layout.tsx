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
      {/* <div className="mx-auto sm:container max-w-5xl"> */}
      {/* <div className="mx-auto max-w-5xl mt-18"> */}
      {/* <div className="mt-14 md:mt-16 mb-12"> */}
      <div className="mt-14 mb-12">
        <Outlet />
      </div>
    </>
  )
}
