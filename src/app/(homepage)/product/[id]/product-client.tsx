"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { IProduct } from "@/models/Product";
import { useDashStore } from "@/lib/store";

export default function ProductClient({ product }: { product: IProduct }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { setCart } = useDashStore();

  // ⭐ Rating States
  const [userRating, setUserRating] = useState(product.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const finalRating = hoverRating || userRating;

  // ⭐ SEND RATING
  const handleRate = async (value: number) => {
    setUserRating(value);

    try {
      await fetch(`/api/users/products/${product._id}/rate`, {
        method: "POST",
        body: JSON.stringify({ rating: value }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Rating failed:", err);
    }
  };

  // ⭐ HANDLE ADD TO CART — CONNECTED TO BACKEND
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/users/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      });

      if (!res.ok) {
        console.error("Cart update failed");
        return;
      }

      // Update local store as well
      setCart(product, quantity);

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error("Cart request failed:", err);
    }
  };

  // ⭐ HANDLE WISHLIST — CONNECTED TO BACKEND
  const handleWishlist = async () => {
    try {
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) {
        console.error("Wishlist update failed");
        return;
      }

      const data = await res.json();
      setIsFavorite(data.isFavorite); // backend returns true/false
    } catch (err) {
      console.error("Wishlist failed:", err);
    }
  };

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{product.category.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <div className="bg-secondary rounded-lg overflow-hidden h-full flex items-center justify-center">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                {product.category.name}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{product.name}</h1>

              {/* ⭐ RATING */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold text-lg">{userRating.toFixed(1)}</span>

                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        onClick={() => handleRate(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`cursor-pointer text-xl ${
                          value <= finalRating ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <span className="text-muted-foreground text-sm">
                  {product.reviewsCount} reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-4 border-t border-border">
                <span className="text-3xl font-bold text-primary">
                  ₵{product.price.toLocaleString()}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    product.inStock ? "text-green-500" : "text-red-500"
                  }`}
                >
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
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Actions */}
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
                <span className="text-sm text-muted-foreground">{product.stock} available</span>
              </div>

              {/* ADD TO CART */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
              >
                {addedToCart ? (
                  <span className="flex items-center gap-2">
                    <Check size={20} />
                    Added To Cart
                  </span>
                ) : (
                  "Add To Cart"
                )}
              </Button>

              <div className="flex gap-3">
                {/* WISHLIST */}
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Heart
                    size={18}
                    className={isFavorite ? "fill-primary text-primary" : ""}
                  />
                  Wishlist
                </Button>

                <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>

            <Card className="bg-secondary border-border p-4">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">SKU:</span> RC-{product._id
                    .toString()
                    .slice(-3)}
                </p>
                <p>
                  <span className="font-semibold">Availability:</span> Ships within 2–3 business days
                </p>
                <p>
                  <span className="font-semibold">Returns:</span> 30-day money-back guarantee
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
