import { BrowserRouter, Routes, Route } from "react-router"

import Layout from "@/routes/landing/layout"
import Home from "@/routes/landing/home"
import ProtectedRoute from "@/routes/router/protected-route"

import SignInUser from "@/routes/user/sign-in-user"
import SignUpUser from "@/routes/user/sign-up-user"
import UserProfile from "@/routes/user/user-profile"
import Movies from "@/routes/movies/placeholder"
import Bookmarker from "@/routes/bookmarker/placeholder"
import CryptoPass from "@/routes/cryptopass/placeholder"
import MyList from "@/routes/mylist/placeholder"
import Notes from "@/routes/notes/placeholder"
import AppModules from "../admin/app-modules"

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
            <Route path="bookmarker" element={<Bookmarker />} />
            <Route path="movies" element={<Movies />} />
            <Route path="cryptopass" element={<CryptoPass />} />
            <Route path="mylist" element={<MyList />} />
            <Route path="notes" element={<Notes />} />
            <Route path="appmodules" element={<AppModules />} />
          </Route>
        </Route>
        <Route path="*" element={<p>Error</p>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
