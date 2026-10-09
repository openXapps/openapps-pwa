import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router"

// Root Layout
import RootLayout from "@/routes/landing/layout"
import RootHome from "@/routes/landing/home"
import ProtectedRoute from "@/routes/router/protected-route"

// Root Routes
import SignInUser from "@/routes/user/sign-in-user"
import SignUpUser from "@/routes/user/sign-up-user"
import UserProfile from "@/routes/user/user-profile"

// Apps
import BookmarkerLayout from "../apps/bookmarker/layout"
import BookmarkerHome from "@/routes/apps/bookmarker/home"
import BookmarkerSettings from "@/routes/apps/bookmarker/settings"
import BookmarkerAbout from "@/routes/apps/bookmarker/about"

// import Movies from "@/routes/apps/movies/placeholder"
// import CryptoPass from "@/routes/apps/cryptopass/placeholder"
// import MyList from "@/routes/apps/mylist/placeholder"
// import Notes from "@/routes/apps/notes/placeholder"

import useAuth from "@/hooks/useAuth"

export default function Router() {
  const { getIsAuthorized, getIsAdmin } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<RootHome />} />
          <Route element={<ProtectedRoute isAuthorized={true} redirectPath="/" />}>
            <Route path="bookmarker" element={<BookmarkerLayout />}>
              <Route index element={<BookmarkerHome />} />
              <Route path="settings" element={<BookmarkerSettings />} />
              <Route path="about" element={<BookmarkerAbout />} />
            </Route>
            {/* <Route path="movies" element={<Movies />} />
            <Route path="cryptopass" element={<CryptoPass />} />
            <Route path="mylist" element={<MyList />} />
            <Route path="notes" element={<Notes />} /> */}
            <Route path="signin" element={<SignInUser />} />
            <Route path="signup" element={<SignUpUser />} />
          </Route>
          <Route element={<ProtectedRoute isAuthorized={getIsAuthorized()} redirectPath="/" />}>
            <Route path="user" element={<UserProfile />} />
          </Route>
          <Route element={<ProtectedRoute isAuthorized={getIsAuthorized() && getIsAdmin()} redirectPath="/" />}>
            {/* here goes protected routes */}
          </Route>
        </Route>
        <Route path="*" element={<p>Error</p>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
