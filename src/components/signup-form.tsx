"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if(res.ok) router.push('/signup/profile')

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      form.reset();
    } catch (err) {
      console.error(err);
      setError("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Full Name */}
        <Field>
          <FieldLabel htmlFor="name" className="text-foreground">
            Full Name
          </FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-secondary text-foreground border border-border placeholder-muted-foreground focus:ring-primary"
          />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email" className="text-foreground">
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-secondary text-foreground border border-border placeholder-muted-foreground focus:ring-primary"
          />
          <FieldDescription className="text-muted-foreground">
            We'll use this to contact you. We will not share your email.
          </FieldDescription>
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password" className="text-foreground">
            Password
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-secondary text-foreground border border-border placeholder-muted-foreground focus:ring-primary"
          />
          <FieldDescription className="text-muted-foreground">
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel htmlFor="confirm-password" className="text-foreground">
            Confirm Password
          </FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            className="bg-secondary text-foreground border border-border placeholder-muted-foreground focus:ring-primary"
          />
          <FieldDescription className="text-muted-foreground">
            Please confirm your password.
          </FieldDescription>
        </Field>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <Field>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator className="text-muted-foreground">
          Or continue with
        </FieldSeparator>

        {/* GitHub Signup */}
        <Field>
          <Button
            variant="outline"
            type="button"
            className="flex items-center hover:bg-black hover:border-primary hover:text-white gap-2"
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
            Sign up with GitHub
          </Button>
          <FieldDescription className="px-6 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
