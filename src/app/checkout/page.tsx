"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CheckCircle, ArrowLeft, AlertCircle } from "lucide-react"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "success">("shipping")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (items.length === 0 && currentStep === "shipping") {
      window.location.href = "/cart"
    }
  }, [items, currentStep])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.email && formData.address && formData.city) {
      setCurrentStep("payment")
      setError("")
    } else {
      setError("Please fill in all required fields")
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError("")

    try {
      const reference = `ORD-${Date.now()}`

      // Initialize Paystack payment
      const initResponse = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          amount: finalTotal,
          reference,
        }),
      })

      const initData = await initResponse.json()

      if (!initResponse.ok) {
        throw new Error(initData.error || "Failed to initialize payment")
      }

      // Redirect to Paystack payment page
      if (initData.authorization_url) {
        // Store order data in localStorage before redirecting
        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            reference,
            formData,
            items,
            total: finalTotal,
          }),
        )
        window.location.href = initData.authorization_url
      }
    } catch (err) {
      console.error("[v0] Payment error:", err)
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.")
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const reference = urlParams.get("reference")

      if (reference) {
        try {
          const verifyResponse = await fetch(`/api/paystack/verify?reference=${reference}`)
          const verifyData = await verifyResponse.json()

          if (verifyResponse.ok && verifyData.status === "success") {
            const pendingOrder = localStorage.getItem("pendingOrder")
            if (pendingOrder) {
              const orderData = JSON.parse(pendingOrder)
              setOrderNumber(orderData.reference)
              setFormData(orderData.formData)
              setCurrentStep("success")
              clearCart()
              localStorage.removeItem("pendingOrder")
            }
          } else {
            setError("Payment verification failed. Please contact support.")
          }
        } catch (err) {
          console.error("[v0] Verification error:", err)
          setError("Could not verify payment. Please check your email for confirmation.")
        }
      }
    }

    verifyPayment()
  }, [clearCart])

  const subtotal = total
  const shipping = items.length > 0 ? 500 : 0
  const tax = Math.round(subtotal * 0.1)
  const finalTotal = subtotal + shipping + tax

  if (currentStep === "success") {
    return (
      <main>
        <Header />
        <section className="bg-secondary border-b border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">Order Confirmed</h1>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-card border-border p-8 text-center space-y-6">
            <CheckCircle size={64} className="mx-auto text-primary" />
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground">Your payment has been received and your order is confirmed</p>
            </div>

            <div className="bg-secondary p-4 rounded-lg space-y-2 text-left">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-mono font-semibold text-lg">{orderNumber}</p>
            </div>

            <div className="space-y-2 text-left">
              <p className="text-sm font-semibold">Order Details</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Email: {formData.email}</p>
                <p>Items: {items.length}</p>
                <p>Total: ₦{finalTotal.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to <strong>{formData.email}</strong>. You will receive tracking
                information shortly.
              </p>
              <Link href="/shop">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Header />

      <section className="bg-secondary border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Checkout</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div
            className={`flex items-center gap-2 ${currentStep === "shipping" || currentStep === "payment" || currentStep === "success" ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "shipping" || currentStep === "payment" || currentStep === "success" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            >
              1
            </div>
            <span className="text-sm font-semibold">Shipping</span>
          </div>
          <div
            className={`h-0.5 w-12 ${currentStep === "payment" || currentStep === "success" ? "bg-primary" : "bg-border"}`}
          />
          <div
            className={`flex items-center gap-2 ${currentStep === "payment" || currentStep === "success" ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "payment" || currentStep === "success" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            >
              2
            </div>
            <span className="text-sm font-semibold">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {currentStep === "shipping" && (
              <Card className="bg-card border-border p-6 space-y-6">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                    Continue to Payment
                  </Button>
                </form>
              </Card>
            )}

            {currentStep === "payment" && (
              <Card className="bg-card border-border p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep("shipping")}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="bg-secondary p-4 rounded-lg border-2 border-primary">
                    <div className="flex items-center gap-3 mb-4">
                      <img src="/paystack-logo.png" alt="Paystack" className="w-12 h-8 object-contain" />
                      <span className="font-semibold">Secure payment powered by Paystack</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to Paystack to complete your payment securely. All major payment methods
                      are accepted.
                    </p>
                  </div>

                  <div className="bg-secondary p-4 rounded-lg text-sm space-y-2">
                    <p className="font-semibold">Order Summary</p>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>₦{shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>₦{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary">₦{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
                  >
                    {isProcessing ? "Processing..." : `Proceed to Pay ₦${finalTotal.toLocaleString()}`}
                  </Button>
                </form>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-secondary border-border p-6 sticky top-20 space-y-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>

              <div className="space-y-3 max-h-64 overflow-y-auto border-b border-border pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₦{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">₦{finalTotal.toLocaleString()}</span>
              </div>

              <Link href="/cart">
                <Button variant="outline" className="w-full bg-transparent">
                  Edit Cart
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
