"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ChevronDown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const allProducts = [
  {
    id: 1,
    name: "Luxury Lipstick - Crimson",
    price: 2500,
    category: "Lips",
    rating: 4.8,
    reviews: 24,
    image: "/luxury-lipstick-crimson-red.jpg",
  },
  {
    id: 2,
    name: "Silk Eye Shadow Palette",
    price: 3500,
    category: "Eyes",
    rating: 4.9,
    reviews: 31,
    image: "/eyeshadow-palette-luxury-cosmetics.jpg",
  },
  {
    id: 3,
    name: "Foundation - Porcelain",
    price: 2800,
    category: "Face",
    rating: 4.7,
    reviews: 19,
    image: "/luxury-foundation-porcelain-makeup.jpg",
  },
  {
    id: 4,
    name: "Shimmer Setting Powder",
    price: 1800,
    category: "Face",
    rating: 4.6,
    reviews: 15,
    image: "/luxury-setting-powder-shimmer.jpg",
  },
  {
    id: 5,
    name: "Velvet Matte Lipstick - Nude",
    price: 2400,
    category: "Lips",
    rating: 4.8,
    reviews: 22,
    image: "/luxury-lipstick-crimson-red.jpg",
  },
  {
    id: 6,
    name: "Hydrating Face Primer",
    price: 2100,
    category: "Face",
    rating: 4.7,
    reviews: 18,
    image: "/luxury-cosmetics-beauty-products.jpg",
  },
  {
    id: 7,
    name: "Liquid Eyeliner - Black",
    price: 1500,
    category: "Eyes",
    rating: 4.9,
    reviews: 28,
    image: "/eyeshadow-palette-luxury-cosmetics.jpg",
  },
  {
    id: 8,
    name: "Glow Highlighter Stick",
    price: 2200,
    category: "Face",
    rating: 4.8,
    reviews: 20,
    image: "/luxury-cosmetics-beauty-products.jpg",
  },
]

export default function ShopPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")

  const categories = ["Face", "Eyes", "Lips"]

  const filteredProducts = selectedCategory ? allProducts.filter((p) => p.category === selectedCategory) : allProducts

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <main>
      <Header />

      {/* Page Header */}
      <section className="bg-secondary border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Shop Our Collection</h1>
          <p className="text-muted-foreground mt-2">Discover our curated selection of premium cosmetics</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between items-center p-2 hover:bg-secondary rounded cursor-pointer">
                    <span>Under ₦2,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-secondary rounded cursor-pointer">
                    <span>₦2,000 - ₦3,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-secondary rounded cursor-pointer">
                    <span>₦3,000+</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {selectedCategory && (
                <Button onClick={() => setSelectedCategory(null)} variant="outline" className="w-full">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} products</p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                />
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
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
                      <Heart size={18} className={favorites.includes(product.id) ? "fill-primary text-primary" : ""} />
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-primary font-semibold">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-primary font-semibold">₦{product.price.toLocaleString()}</span>
                      <Link href={`/product/${product.id}`}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
