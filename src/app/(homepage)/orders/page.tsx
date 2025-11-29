"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import OrderCard from "@/components/order-card"
import { ProtectedRoute } from "@/components/protected-route"
import { useEffect, useState } from "react"
import { GridLoader } from "react-spinners"

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/orders/user");
        const data = await res.json();
        console.log("Fetched orders:", data);
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex justify-center items-center">
      <GridLoader size={24} color="#ffaf9f" />
      </main>
    );
  }

  return (
      <main className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

          {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
              
  <OrderCard
    key={order._id}
    id={order._id}
    orderNumber={order.paymentReference} // or generate your own
    date={order.createdAt}
    total={order.totalAmount}
    status={order.orderStatus} // status matches union type? if not, fix below
    items={order.items.length}
  />


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
  )
}
