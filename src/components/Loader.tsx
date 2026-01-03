import { twMerge } from "tailwind-merge"

type LoaderProps = {
  varient: "SCREEN" | "COMPONENT"
}

export default function Loader({ varient }: LoaderProps) {
  return (
    <div className={twMerge(varient === "SCREEN" && "h-60", "flex items-center justify-center")}>
      <div className="p-4 bg-muted rounded-full animate-pulse">LOADING ...</div>
    </div>
  )
}
