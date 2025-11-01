import { GalleryVerticalEnd } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh relative bg-gradient-to-b from-secondary to-background overflow-hidden lg:grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="text-primary">Rammys Closet</span>
          </a>
        </div>

        {/* Form Section */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6">
              <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Sign in to continue shopping with us
                  </p>
                </div>

                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email" className="text-foreground">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="bg-secondary text-foreground border border-border placeholder-muted-foreground focus:ring-primary"
                  />
                </Field>

                {/* Password */}
                <Field>
                  <FieldLabel htmlFor="password" className="text-foreground">
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    className="bg-secondary text-foreground border border-border placeholder-muted-foreground focus:ring-primary"
                  />
                  <div className="flex justify-end mt-1">
                    <a href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </Field>

                {/* Submit */}
                <Field>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                  >
                    Sign In
                  </Button>
                </Field>

                <FieldSeparator className="text-muted-foreground">
                  Or continue with
                </FieldSeparator>

                {/* GitHub Login */}
                <Field>
                  <Button
                    variant="outline"
                    type="button"
                    className="flex items-center justify-center gap-2 border-border hover:bg-secondary/50 w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12..."
                        fill="currentColor"
                      />
                    </svg>
                    Sign in with GitHub
                  </Button>

                  <FieldDescription className="px-6 text-center text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-primary hover:underline">
                      Create one
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/imgs/c-1.jpg"
          alt="Fashion display"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
