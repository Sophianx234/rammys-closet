"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, User } from "lucide-react"

interface AuthFormProps {
  type: "login" | "signup"
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  // const { login, signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (type === "login") {
        // await login(formData.email, formData.password)
        router.push("/account")
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          return
        }
        // await signup(formData.name, formData.email, formData.password)
        router.push("/account")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "signup" && (
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="pl-10"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="pl-10"
          />
        </div>
      </div>

      {type === "signup" && (
        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="pl-10"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
        {loading ? "Loading..." : type === "login" ? "Sign In" : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {type === "login" ? "Don't have an account? " : "Already have an account? "}
        <Link href={type === "login" ? "/signup" : "/login"} className="text-primary hover:underline font-medium">
          {type === "login" ? "Sign up" : "Sign in"}
        </Link>
      </p>

      {type === "login" && (
        <p className="text-center text-sm">
          <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">
            Forgot your password?
          </Link>
        </p>
      )}
    </form>
  )
}
