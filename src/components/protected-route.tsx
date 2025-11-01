"use client"

import type React from "react"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isLoggedIn) {
    return null
  }

  return <>{children}</>
}
