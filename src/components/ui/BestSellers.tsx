"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Card } from "./card";
import { Button } from "./button";

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

export default function Bestsellers() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl text-primary md:text-5xl font-serif font-bold mb-4">
          Bestsellers
        </h2>
        <p className="text-gray-400 mb-12">
          Discover our most loved beauty essentials, crafted for elegance.
        </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
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
                <p className="text-xs text-left text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="font-semibold text-left text-sm line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-primary font-semibold">
                    ₦{product.price.toLocaleString()}
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />
    </section>
  );
}
