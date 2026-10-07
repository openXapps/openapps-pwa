import { useRef, useState, type Dispatch } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "./ui/button"
import typedFetch from "@/lib/typed-fetch"
import useTheme from "@/hooks/useTheme"

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
  setIsBot: Dispatch<React.SetStateAction<boolean>>
}

export default function ReCaptcha({ setIsBot }: TReCaptchaProps) {
  // Strongly type the ref to access component methods (e.g. reset)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const { theme } = useTheme()

  // Triggered when the user completes the "I"m not a robot" checkbox
  const handleCaptchaChange = (token: string | null) => {
    console.log({ token: token })
    setCaptchaToken(token)
  }

  // Handle expiration of the verified token
  const handleCaptchaExpired = () => {
    setCaptchaToken(null)
  }


  async function verifyRecaptcha(token: string) {
    // const response = await fetch("https://openapps.co.za/api/verify-recaptcha.php", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ token: token }),
    // })

    const response = await typedFetch<TReCaptchaResponse>("https://openapps.co.za/api/verify-recaptcha.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    })

    console.log("response", response)
    const data = (await response.fetchResponse).data

    if (response.fetchSuccess) {
      // alert(`Success at ${response.challenge_ts}`)
      if (data.success) {
        setIsBot(false)
      } else {
        console.log("data", data)
        setIsBot(true)
      }
    } else {
      throw new Error("Backend error!")
    }
  }

  async function handleSubmit() {
    if (!captchaToken) {
      alert("Please complete the CAPTCHA verification.")
      return
    }

    const result = await verifyRecaptcha(captchaToken)

    console.log(result)

    // Reset the widget after a successful submission if the user stays on the page
    recaptchaRef.current?.reset()
    setCaptchaToken(null)
  }

  return (
    <div className="max-w-90 flex flex-col gap-2">
      <ReCAPTCHA
        theme={theme === "dark" ? "dark" : "light"}
        ref={recaptchaRef}
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
        onExpired={handleCaptchaExpired}
      />
      <Button onClick={handleSubmit}>Send Token</Button>
    </div>
  )
};

