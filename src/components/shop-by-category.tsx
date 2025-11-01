"use client"

import { ShoppingBag, Palette, Eye, Sparkles } from "lucide-react"

export default function ShopByCategory() {
  const categories = [
    {
      icon: Sparkles,
      name: "Lips",
      description: "Bold colors and glossy finishes",
      image: "/luxury-lipstick-collection.jpg",
    },
    {
      icon: Eye,
      name: "Eyes",
      description: "Shadows, liners, and mascaras",
      image: "/eyeshadow-palette-luxury.jpg",
    },
    {
      icon: Palette,
      name: "Face",
      description: "Foundation and contouring",
      image: "/foundation-makeup-luxury.jpg",
    },
    {
      icon: ShoppingBag,
      name: "Sets",
      description: "Curated beauty collections",
      image: "/beauty-set-collection.jpg",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground">Explore our curated collections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-card hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <Icon className="w-12 h-12 text-accent mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
