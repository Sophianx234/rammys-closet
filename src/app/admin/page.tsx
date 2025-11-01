"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/components/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Package, ShoppingBag, Users, TrendingUp, Plus, Edit, Trash2, Eye } from "lucide-react"

const mockStats = [
  { label: "Total Sales", value: "₦2.5M", icon: TrendingUp, change: "+12%" },
  { label: "Orders", value: "156", icon: ShoppingBag, change: "+8%" },
  { label: "Products", value: "42", icon: Package, change: "+3%" },
  { label: "Customers", value: "892", icon: Users, change: "+15%" },
]

const mockProducts = [
  {
    id: 1,
    name: "Luxury Lipstick - Crimson",
    price: 2500,
    stock: 15,
    sales: 234,
  },
  { id: 2, name: "Silk Eye Shadow Palette", price: 3500, stock: 20, sales: 312 },
  { id: 3, name: "Foundation - Porcelain", price: 2800, stock: 25, sales: 189 },
]

const mockOrders = [
  {
    id: "RM-001",
    customer: "Sarah M.",
    amount: 45000,
    status: "delivered",
    date: "2025-10-18",
  },
  {
    id: "RM-002",
    customer: "Jennifer K.",
    amount: 28500,
    status: "shipped",
    date: "2025-10-20",
  },
  {
    id: "RM-003",
    customer: "Amanda T.",
    amount: 62000,
    status: "processing",
    date: "2025-10-25",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    // <ProtectedRoute>
      <main className="min-h-screen bg-background">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            {/* <p className="text-muted-foreground">Welcome back, {user?.name}. Manage your store here.</p> */}
            <p className="text-muted-foreground">Welcome back, Damian X. Manage your store here.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border">
            {["overview", "products", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {mockStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <Card key={index} className="bg-card border-border p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold mb-2">{stat.value}</p>
                      <p className="text-xs text-green-600">{stat.change}</p>
                    </Card>
                  )
                })}
              </div>

              {/* Recent Orders */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-semibold">Order ID</th>
                        <th className="text-left py-3 font-semibold">Customer</th>
                        <th className="text-left py-3 font-semibold">Amount</th>
                        <th className="text-left py-3 font-semibold">Status</th>
                        <th className="text-left py-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                          <td className="py-3 font-medium">{order.id}</td>
                          <td className="py-3">{order.customer}</td>
                          <td className="py-3">₦{order.amount.toLocaleString()}</td>
                          <td className="py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                order.status === "delivered"
                                  ? "bg-green-500/10 text-green-700"
                                  : order.status === "shipped"
                                    ? "bg-blue-500/10 text-blue-700"
                                    : "bg-yellow-500/10 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3">{new Date(order.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-end mb-6">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <Card className="bg-card border-border p-6">
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-semibold">Name</th>
                        <th className="text-left py-3 font-semibold">Price</th>
                        <th className="text-left py-3 font-semibold">Stock</th>
                        <th className="text-left py-3 font-semibold">Sales</th>
                        <th className="text-left py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map((product) => (
                        <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                          <td className="py-3 font-medium">{product.name}</td>
                          <td className="py-3">₦{product.price.toLocaleString()}</td>
                          <td className="py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.stock > 10
                                  ? "bg-green-500/10 text-green-700"
                                  : "bg-yellow-500/10 text-yellow-700"
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="py-3">{product.sales}</td>
                          <td className="py-3 flex gap-2">
                            <button className="p-1 hover:bg-secondary rounded transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-secondary rounded transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-destructive/10 rounded transition-colors text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <Card className="bg-card border-border p-6">
                <h2 className="text-xl font-semibold mb-4">All Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-semibold">Order ID</th>
                        <th className="text-left py-3 font-semibold">Customer</th>
                        <th className="text-left py-3 font-semibold">Amount</th>
                        <th className="text-left py-3 font-semibold">Status</th>
                        <th className="text-left py-3 font-semibold">Date</th>
                        <th className="text-left py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                          <td className="py-3 font-medium">{order.id}</td>
                          <td className="py-3">{order.customer}</td>
                          <td className="py-3">₦{order.amount.toLocaleString()}</td>
                          <td className="py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                order.status === "delivered"
                                  ? "bg-green-500/10 text-green-700"
                                  : order.status === "shipped"
                                    ? "bg-blue-500/10 text-blue-700"
                                    : "bg-yellow-500/10 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="py-3">
                            <button className="text-primary hover:underline text-xs font-medium">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </div>

        <Footer />
      </main>
    // </ProtectedRoute>
  )
}
