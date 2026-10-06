import { useRef, useState, type SubmitEvent } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "./ui/button"

// https://dev.to/kumareth/implementing-google-recaptcha-with-react-and-node-js-1jgf

export default function ReCaptcha() {
  // Strongly type the ref to access component methods (e.g. reset)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  // Triggered when the user completes the "I"m not a robot" checkbox
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  // Handle expiration of the verified token
  const handleCaptchaExpired = () => {
    setCaptchaToken(null)
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!captchaToken) {
      alert("Please complete the CAPTCHA verification.")
      return
    }

    // Submit token to backend server alongside your form data
    console.log("Submitting form with token:", captchaToken)
    alert("Form submitted successfully!")

    // Reset the widget after a successful submission if the user stays on the page
    recaptchaRef.current?.reset()
    setCaptchaToken(null)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
      
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="xx" // Replace with your real client site key
        onChange={handleCaptchaChange}
        onExpired={handleCaptchaExpired}
      />

      <Button type="submit" disabled={!captchaToken}>
        Submit Form
      </Button>
    </form>
  )
};

