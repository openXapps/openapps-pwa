import { BrowserRouter, Routes, Route } from "react-router"

import Layout from "@/routes/landing/layout"
import Home from "@/routes/landing/home"
import ProtectedRoute from "@/routes/landing/protected-route"
import SignInUser from "@/routes/user/sign-in-user"
import SignUpUser from "@/routes/user/sign-up-user"
import UserProfile from "@/routes/user/user-profile"
// import DataModules from "@/routes/DataModules"
// import DataBookmarks from "@/routes/DataBookmarks"

import useAuth from "@/hooks/useAuth"

export default function Router() {
  const { isAuthorized } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute isAuthorized={!isAuthorized} redirectPath="/" />}>
            <Route path="signin" element={<SignInUser />} />
            <Route path="signup" element={<SignUpUser />} />
          </Route>
          <Route element={<ProtectedRoute isAuthorized={isAuthorized} redirectPath="/" />}>
            <Route path="user" element={<UserProfile />} />
            {/* <Route path="datamodules" element={<DataModules />} />
            <Route path="databookmarks" element={<DataBookmarks />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<p>Error</p>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
