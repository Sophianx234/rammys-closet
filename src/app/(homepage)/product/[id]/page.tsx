"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Product database (in real app, fetch from backend)
const products: Record<string, any> = {
  "1": {
    id: 1,
    name: "Luxury Lipstick - Crimson",
    price: 2500,
    category: "Lips",
    rating: 4.8,
    reviews: 24,
    image: "/luxury-lipstick-crimson-red.jpg",
    description:
      "Elevate your lip game with our signature Crimson Luxury Lipstick. Crafted with premium pigments and a silky smooth texture that glides effortlessly. Long-lasting formula ensures your color stays vibrant throughout the day.",
    features: [
      "Long-lasting formula (up to 12 hours)",
      "Creamy texture with rich pigmentation",
      "Ethically sourced ingredients",
      "Available in 5 complementary shades",
      "Cruelty-free and vegan-friendly",
      "Made with natural waxes and oils",
    ],
    inStock: true,
    quantity: 15,
  },
  "2": {
    id: 2,
    name: "Silk Eye Shadow Palette",
    price: 3500,
    category: "Eyes",
    rating: 4.9,
    reviews: 31,
    image: "/eyeshadow-palette-luxury-cosmetics.jpg",
    description:
      "Transform your eye makeup with our exclusive Silk Eye Shadow Palette. Featuring 12 carefully curated shades ranging from subtle neutrals to bold jewel tones. Each shadow has a silky-smooth texture that blends effortlessly.",
    features: [
      "12 blendable shades in one palette",
      "Highly pigmented and fade-resistant",
      "Professional-grade quality",
      "Includes dual-sided brush",
      "Perfect for beginners and professionals",
      "Compact mirror included",
    ],
    inStock: true,
    quantity: 20,
  },
  "3": {
    id: 3,
    name: "Foundation - Porcelain",
    price: 2800,
    category: "Face",
    rating: 4.7,
    reviews: 19,
    image: "/luxury-foundation-porcelain-makeup.jpg",
    description:
      "Achieve a flawless, radiant complexion with our premium Porcelain Foundation. Designed for all skin types, this lightweight formula provides buildable coverage without feeling heavy.",
    features: [
      "Buildable medium to full coverage",
      "Lightweight, breathable formula",
      "Waterproof and long-wearing",
      "Available in 20 shades",
      "SPF 25 sun protection",
      "Suitable for all skin types",
    ],
    inStock: true,
    quantity: 25,
  },
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) return null;

  const product = products[id];

  if (!product) {
    return (
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <Link href="/shop">
            <Button className="mt-4">Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleAddToCart = () => {
    // Store cart data (would normally use context or server action)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main>
      <Header />

      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.category}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="bg-secondary rounded-lg overflow-hidden h-96 md:h-full flex items-center justify-center">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold text-lg">
                    {product.rating}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-muted-foreground text-sm">
                  {product.reviews} reviews
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
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 text-primary flex-shrink-0"
                    />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
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
                  <span className="px-4 py-2 border-l border-r border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.quantity} available
                </span>
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
                  <Heart
                    size={18}
                    className={isFavorite ? "fill-primary text-primary" : ""}
                  />
                  Wishlist
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex-1 bg-transparent"
                >
                  <Share2 size={18} />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="bg-secondary border-border p-4">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">SKU:</span> RC-
                  {product.id.toString().padStart(3, "0")}
                </p>
                <p>
                  <span className="font-semibold">Availability:</span> Ships
                  within 2-3 business days
                </p>
                <p>
                  <span className="font-semibold">Returns:</span> 30-day
                  money-back guarantee
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-secondary border-y border-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(products)
              .filter((p: any) => p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct: any) => (
                <Card
                  key={relatedProduct.id}
                  className="bg-card border-border overflow-hidden hover:border-primary transition-colors group"
                >
                  <div className="relative overflow-hidden bg-background h-64">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-primary font-semibold">
                        ₵{relatedProduct.price.toLocaleString()}
                      </span>
                      <Link href={`/product/${relatedProduct.id}`}>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

    </main>
  );
}
