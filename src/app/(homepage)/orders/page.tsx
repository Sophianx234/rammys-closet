"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import OrderCard from "@/components/order-card"
import { ProtectedRoute } from "@/components/protected-route"

const mockOrders = [
  {
    id: "1",
    orderNumber: "RM-001",
    date: "2025-10-15",
    total: 45000,
    status: "delivered" as const,
    items: 3,
  },
  {
    id: "2",
    orderNumber: "RM-002",
    date: "2025-10-20",
    total: 28500,
    status: "shipped" as const,
    items: 2,
  },
  {
    id: "3",
    orderNumber: "RM-003",
    date: "2025-10-25",
    total: 62000,
    status: "processing" as const,
    items: 4,
  },
]

export default function OrdersPage() {
  return (
    // <ProtectedRoute>
      <main className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

          {mockOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockOrders.map((order) => (
                <OrderCard key={order.id} {...order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <a href="/shop" className="text-primary hover:underline">
                Start shopping
              </a>
            </div>
          )}
        </div>
      </main>
    // </ProtectedRoute>
  )
}
