import { useRef, type Dispatch } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import typedFetch from "@/lib/typed-fetch"
import useTheme from "@/hooks/useTheme"
import { cn } from "cn"

// https://dev.to/kumareth/implementing-google-recaptcha-with-react-and-node-js-1jgf

type TReCaptchaResponse = {
  success: boolean
  message: string
  data: {
    success: boolean
    challenge_ts?: string
    hostname?: string
    "error-codes"?: [string]
  }
}

type TReCaptchaProps = {
  className?: string
  setIsBot: Dispatch<React.SetStateAction<boolean>>
}

export default function ReCaptcha({ className, setIsBot }: TReCaptchaProps) {
  const { theme } = useTheme()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Triggered when the user completes the "I"m not a robot" checkbox
  async function handleCaptchaChange(token: string | null) {
    if (token) {
      setIsBot(false) // Remove me and enable below later
      // const response = await typedFetch<TReCaptchaResponse>("https://openapps.co.za/api/verify-recaptcha.php", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token: token }),
      // })

      // console.log("response", response)
      // const data = (await response.fetchResponse).data

      // if (response.fetchSuccess) {
      //   if (data.success) {
      //     setIsBot(false)
      //   } else {
      //     console.log("data", data)
      //     setIsBot(true)
      //   }
      // } else {
      //   throw new Error("Backend error!")
      // }

      // Reset the widget after a successful submission if the user stays on the page
      recaptchaRef.current?.reset()
    }
  }

  return (
    <div className={cn(className, "w-full flex justify-center")}>
      <ReCAPTCHA
        theme={theme === "dark" ? "dark" : "light"}
        ref={recaptchaRef}
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
        onExpired={() => setIsBot(true)}
      />
    </div>
  )
};

