"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem("rammys_wishlist")
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist))
    }
  }, [])

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      if (!prev.find((i) => i.id === item.id)) {
        const updated = [...prev, item]
        localStorage.setItem("rammys_wishlist", JSON.stringify(updated))
        return updated
      }
      return prev
    })
  }

  const removeFromWishlist = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      localStorage.setItem("rammys_wishlist", JSON.stringify(updated))
      return updated
    })
  }

  const isInWishlist = (id: string) => items.some((item) => item.id === id)

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
