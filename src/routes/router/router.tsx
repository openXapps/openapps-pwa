import { BrowserRouter, Routes, Route } from "react-router"

import Layout from "@/routes/landing/layout"
import Home from "@/routes/landing/home"
import ProtectedRoute from "@/routes/router/protected-route"

//  Routes
import SignInUser from "@/routes/user/sign-in-user"
import SignUpUser from "@/routes/user/sign-up-user"
import UserProfile from "@/routes/user/user-profile"
import AppModules from "@/routes/admin/app-modules"

// Apps
import Movies from "@/routes/apps/movies/placeholder"
import Bookmarker from "@/routes/apps/bookmarker/placeholder"
import CryptoPass from "@/routes/apps/cryptopass/placeholder"
import MyList from "@/routes/apps/mylist/placeholder"
import Notes from "@/routes/apps/notes/placeholder"

import useAuth from "@/hooks/useAuth"

export default function Router() {
  const { getIsAuthorized, getIsAdmin } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute isAuthorized={true} redirectPath="/" />}>
            <Route path="bookmarker" element={<Bookmarker />} />
            <Route path="movies" element={<Movies />} />
            <Route path="cryptopass" element={<CryptoPass />} />
            <Route path="mylist" element={<MyList />} />
            <Route path="notes" element={<Notes />} />
            <Route path="signin" element={<SignInUser />} />
            <Route path="signup" element={<SignUpUser />} />
          </Route>
          <Route element={<ProtectedRoute isAuthorized={getIsAuthorized()} redirectPath="/" />}>
            <Route path="user" element={<UserProfile />} />
          </Route>
          <Route element={<ProtectedRoute isAuthorized={getIsAuthorized() && getIsAdmin()} redirectPath="/" />}>
            <Route path="appmodules" element={<AppModules />} />
          </Route>
        </Route>
        <Route path="*" element={<p>Error</p>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
