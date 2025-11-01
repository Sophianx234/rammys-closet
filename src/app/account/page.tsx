"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { User, MapPin, Heart, LogOut, Settings } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "wishlist" | "settings">("overview")
  const [user, setUser] = useState({
    name: "Jessica Anderson",
    email: "jessica@example.com",
    phone: "+234 (123) 456-7890",
    joinDate: "January 2024",
  })

  // Mock data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-10-15",
      total: 8800,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-10-08",
      total: 5300,
      status: "In Transit",
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-09-28",
      total: 2500,
      status: "Delivered",
      items: 1,
    },
  ]

  const wishlist = [
    {
      id: 1,
      name: "Luxury Lipstick - Crimson",
      price: 2500,
      image: "/luxury-lipstick-crimson-red.jpg",
    },
    {
      id: 2,
      name: "Silk Eye Shadow Palette",
      price: 3500,
      image: "/eyeshadow-palette-luxury-cosmetics.jpg",
    },
  ]

  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Lekki Phase 1, Lagos",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Victoria Island, Lagos",
      isDefault: false,
    },
  ]

  return (
    <main>
      <Header />

      {/* Page Header */}
      <section className="bg-secondary border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">My Account</h1>
        </div>
      </section>

      {/* Account Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <Card className="bg-card border-border p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <User size={18} />
                  Account Overview
                </span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  My Orders
                </span>
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "wishlist" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Heart size={18} />
                  Wishlist
                </span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Settings size={18} />
                  Settings
                </span>
              </button>

              <hr className="border-border" />

              <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-transparent">
                <LogOut size={18} />
                Sign Out
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card className="bg-card border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-semibold">{user.joinDate}</p>
                    </div>
                  </div>
                  <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">Edit Profile</Button>
                </Card>

                <Card className="bg-card border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-sm">{addr.type}</p>
                          <p className="text-sm text-muted-foreground">{addr.address}</p>
                          {addr.isDefault && (
                            <span className="text-xs font-semibold text-primary mt-1 block">Default Address</span>
                          )}
                        </div>
                        <button className="text-primary hover:text-primary/80 text-sm font-semibold">Edit</button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full bg-transparent">
                    Add New Address
                  </Button>
                </Card>

                <Card className="bg-card border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Account Preferences</h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
                      <span className="text-sm">Receive marketing emails</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
                      <span className="text-sm">Order notifications</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                      <span className="text-sm">New product announcements</span>
                    </label>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Order History</h2>
                {orders.map((order) => (
                  <Card key={order.id} className="bg-card border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">₦{order.total.toLocaleString()}</p>
                        <span
                          className={`text-xs font-semibold ${
                            order.status === "Delivered" ? "text-green-500" : "text-blue-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">{order.items} items</span>
                      <Button variant="outline" size="sm">
                        View Order
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-card border-border overflow-hidden hover:border-primary transition-colors group"
                      >
                        <div className="relative overflow-hidden bg-secondary h-48">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 space-y-3">
                          <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <span className="text-primary font-semibold">₦{item.price.toLocaleString()}</span>
                            <Link href={`/product/${item.id}`}>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Add to Cart
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your wishlist is empty</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card className="bg-card border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Update Password</Button>
                  </div>
                </Card>

                <Card className="bg-card border-border p-6 border-red-500">
                  <h2 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deleting your account will permanently remove all your data. This action cannot be undone.
                  </p>
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent">
                    Delete Account
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
