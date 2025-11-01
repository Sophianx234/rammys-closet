"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Share2, Check } from "lucide-react"
import { useState } from "react"

export function ProductClient({ product }: { product: any }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">{product.category}</p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-primary font-semibold text-lg">{product.rating}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-primary" : "text-muted-foreground"}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <span className="text-muted-foreground text-sm">{product.reviews} reviews</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 pt-4 border-t border-border">
          <span className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
          <span className={`text-sm font-semibold ${product.inStock ? "text-green-500" : "text-red-500"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Features */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <Check size={18} className="mt-0.5 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quantity and Actions */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-secondary transition-colors"
            >
              −
            </button>
            <span className="px-4 py-2 border-l border-r border-border">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-muted-foreground">{product.quantity} available</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
        >
          {addedToCart ? (
            <span className="flex items-center gap-2">
              <Check size={20} />
              Added to Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </Button>

        {/* Wishlist and Share */}
        <div className="flex gap-3">
          <Button
            onClick={() => setIsFavorite(!isFavorite)}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Heart size={18} className={isFavorite ? "fill-primary text-primary" : ""} />
            Wishlist
          </Button>
          <Button variant="outline" size="icon" className="flex-1 bg-transparent">
            <Share2 size={18} />
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <Card className="bg-secondary border-border p-4">
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">SKU:</span> RC-{product.id.toString().padStart(3, "0")}
          </p>
          <p>
            <span className="font-semibold">Availability:</span> Ships within 2-3 business days
          </p>
          <p>
            <span className="font-semibold">Returns:</span> 30-day money-back guarantee
          </p>
        </div>
      </Card>
    </div>
  )
}
