"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";

const featuredProducts = [
  {
    id: 1,
    name: "Luxury Lipstick - Crimson",
    price: 2500,
    category: "Lips",
    image: "/luxury-lipstick-crimson-red.jpg",
  },
  {
    id: 2,
    name: "Silk Eye Shadow Palette",
    price: 3500,
    category: "Eyes",
    image: "/eyeshadow-palette-luxury-cosmetics.jpg",
  },
  {
    id: 3,
    name: "Foundation - Porcelain",
    price: 2800,
    category: "Face",
    image: "/luxury-foundation-porcelain-makeup.jpg",
  },
  {
    id: 4,
    name: "Shimmer Setting Powder",
    price: 1800,
    category: "Face",
    image: "/luxury-setting-powder-shimmer.jpg",
  },
];

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">
            This Month
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Hand-picked selections from our premium beauty collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-border overflow-hidden hover:border-primary transition-colors group"
            >
              <div className="relative overflow-hidden bg-secondary h-64">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors"
                >
                  <Heart
                    size={18}
                    className={
                      favorites.includes(product.id)
                        ? "fill-primary text-primary"
                        : ""
                    }
                  />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="font-semibold text-sm line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-primary font-semibold">
                    ₵{product.price.toLocaleString()}
                  </span>
                  <Link href={`/product/${product.id}`}>
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

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" variant="outline">
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
