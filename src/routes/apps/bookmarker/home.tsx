import { Link } from "react-router"

export default function BookmarkerHome() {
  return (
    <>
      <div>Bookmarker Home Page</div>
      <Link to="/bookmarker/settings">Settings</Link>
      <Link to="/bookmarker/about">About</Link>
    </>
  )
}
