"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import ProductCard from "@/app/(homepage)/shop/product-card";

/* const featuredProducts = [
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
]; */


interface Product {
  _id: string;
  name: string;
  price: number;
  category: { name: string };
  images: string[];
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();
        console.log('featured products', data)
        const featured = data.filter((p: any) => p.isFeatured);
      setProducts(featured);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    getFeaturedProducts();
  }, []);

  const toggleFavorite = (id: string) => {
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
          {products.map((product) => (
            <ProductCard product={product}/>
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
