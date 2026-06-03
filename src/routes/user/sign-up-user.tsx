// import { useNavigate } from "react-router"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

// import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

// import useAuth from "@/hooks/useAuth"

// https://ui.shadcn.com/docs/forms/react-hook-form
// https://uibakery.io/regex-library/password
const formSchema = z.object({
  username: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "Username must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})
// .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password is not strong enough")

export default function SignUpUser() {
  // const rrNavigate = useNavigate()
  // const { signUpUser, setIsAuthorized, getIsAuthorized } = useAuth()
  // const username = useRef<HTMLInputElement | null>(null)
  // const password = useRef<HTMLInputElement | null>(null)
  // const [isBusy, setIsBusy] = useState(false)
  const signUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)

  }

  // const handleSignUpUser = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
  //   e.preventDefault()
  //   if (username.current?.value && password.current?.value) {
  //     if (usernameRegex.test(username.current.value) && passwordRegex.test(password.current.value)) {
  //       setIsBusy(true)
  //       try {
  //         await signUpUser(username.current.value, password.current.value)
  //         setIsAuthorized(true)
  //         rrNavigate("/", { replace: true })
  //       } catch (error) {
  //         toast.error("Sign up error, try again", { position: "top-center" })
  //         setIsBusy(false)
  //         password.current.value = ""
  //       }
  //     } else {
  //       toast.warning("Username or password does not comply", { position: "top-center" })
  //     }
  //   } else {
  //     toast.warning("Please provide both username and password", { position: "top-center" })
  //   }
  // }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Welcome to OpenApps. Please provide an email and password to sign-up for a free account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-sign-up" onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-sign-up-username">Username</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="form-sign-up-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="name@domain.com"
                      // autoComplete="off"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-sign-up-password">Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="form-sign-up-password"
                      aria-invalid={fieldState.invalid}
                      // autoComplete="off"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <p className="mt-4 text-sm">Typical requirements for a "strong" password include:</p>
          <ul className="text-sm">
            <li>- A minimum length (commonly 8 characters or more).</li>
            <li>- At least one uppercase letter.</li>
            <li>- At least one lowercase letter.</li>
            <li>- At least one number (digit).</li>
            <li>- At least one special character (e.g. !  @  #  $  %).</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => signUpForm.reset()}>Reset</Button>
            <Button type="submit" form="form-sign-up">Submit</Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
