"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email")
      return
    }

    // Mock verification - in production, send reset email
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground">We'll send you instructions to reset your password</p>
          </div>

          {!submitted ? (
            <div className="bg-card border border-border rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Send Reset Link
                </Button>

                <Link href="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">
                  Back to login
                </Link>
              </form>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Check your email</h2>
              <p className="text-muted-foreground mb-6">We've sent password reset instructions to {email}</p>
              <Link href="/login" className="inline-block text-primary hover:underline font-medium">
                Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
