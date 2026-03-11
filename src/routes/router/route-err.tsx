import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

export default function RouteErr() {
  const rrNavigate = useNavigate()
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <Button onClick={() => rrNavigate(-1)}>Back</Button>
    </div>
  )
}
