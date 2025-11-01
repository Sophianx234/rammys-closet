"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  password?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("rammys_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock user check - in production, verify against backend
    const allUsers = JSON.parse(localStorage.getItem("rammys_users") || "[]")
    const foundUser = allUsers.find((u: User) => u.email === email && u.password === password)

    if (!foundUser) {
      setIsLoading(false)
      throw new Error("Invalid email or password")
    }

    const userWithoutPassword = { ...foundUser }
    delete userWithoutPassword.password

    setUser(userWithoutPassword)
    localStorage.setItem("rammys_user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const allUsers = JSON.parse(localStorage.getItem("rammys_users") || "[]")

    if (allUsers.some((u: User) => u.email === email)) {
      setIsLoading(false)
      throw new Error("Email already exists")
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    allUsers.push(newUser)
    localStorage.setItem("rammys_users", JSON.stringify(allUsers))

    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password

    setUser(userWithoutPassword)
    localStorage.setItem("rammys_user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rammys_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
