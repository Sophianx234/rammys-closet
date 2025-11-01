"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"

export default function SidebarWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Sidebar />
}
