"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Filter,
  Star,
  Tag,
  Eye,
  Edit,
  Trash2,
  ListFilter,
  ChevronDown,
} from "lucide-react";

// --- MOCK DATA (KEPT FOR FUNCTIONALITY) ---
const mockProducts = [
  {
    id: 1,
    name: "Velvet Luxe Lipstick — Crimson Rose",
    slug: "velvet-luxe-lipstick-crimson-rose",
    price: 2500,
    stock: 15,
    rating: 4.6,
    reviewsCount: 128,
    sales: 234,
    inStock: true,
    isFeatured: true,
    category: "Lipsticks", // Capitalized for display
    image:
      "https://images.pexels.com/photos/1028436/pexels-photo-1028436.jpeg",
    images: [
      "https://images.pexels.com/photos/1028436/pexels-photo-1028436.jpeg",
    ],
    description:
      "A rich, velvety lipstick crafted for all-day confidence. The Crimson Rose shade delivers intense pigment with a smooth matte finish that stays comfortable and hydrating on the lips.",
    features: ["Long-lasting", "Matte finish", "Hydrating blend"],
    variants: [
      {
        name: "Shade",
        options: ["Crimson Rose", "Ruby Noir", "Scarlet Wine"],
      },
    ],
  },
  {
    id: 2,
    name: "Opulence Eyeshadow Palette — Silk Radiance",
    slug: "opulence-eyeshadow-palette-silk-radiance",
    price: 3500,
    stock: 20,
    rating: 4.9,
    reviewsCount: 201,
    sales: 312,
    inStock: true,
    isFeatured: true,
    category: "Eyeshadow",
    image:
      "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg",
    images: [
      "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg",
    ],
    description:
      "A luxurious 12-shade palette featuring silky pigments that glide effortlessly across the eyes. Perfect for both soft glam and bold evening looks, with shades that blend like second skin.",
    features: ["12-shade palette", "High pigment", "Smooth blend"],
    variants: [
      {
        name: "Palette",
        options: ["Silk Radiance", "Dawn Glow", "Amber Mocha"],
      },
    ],
  },
  {
    id: 3,
    name: "PerfectSkin Foundation — Porcelain Glow",
    slug: "perfectskin-foundation-porcelain-glow",
    price: 2800,
    stock: 2, // Low stock for example
    rating: 4.3,
    reviewsCount: 97,
    sales: 189,
    inStock: true,
    isFeatured: false,
    category: "Foundation",
    image:
      "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg",
    images: [
      "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg",
    ],
    description:
      "A breathable, full-coverage foundation designed to blur imperfections while maintaining a natural and flawless matte finish. The Porcelain Glow shade brightens the complexion without feeling heavy.",
    features: [
      "Full coverage",
      "Lightweight formula",
      "Natural matte finish",
    ],
    variants: [
      {
        name: "Shade",
        options: ["Porcelain Glow", "Warm Honey", "Caramel Beige"],
      },
    ],
  },
  {
    id: 4,
    name: "HydraGlow Lip Gloss — Peach Dream",
    slug: "hydraglow-lip-gloss-peach-dream",
    price: 1800,
    stock: 0,
    rating: 4.5,
    reviewsCount: 55,
    sales: 80,
    inStock: false,
    isFeatured: false,
    category: "Lip Gloss",
    image:
      "https://images.pexels.com/photos/6686111/pexels-photo-6686111.jpeg",
    images: [
      "https://images.pexels.com/photos/6686111/pexels-photo-6686111.jpeg",
    ],
    description:
      "A non-sticky, high-shine lip gloss infused with hydrating ingredients for a plump and dewy look. Peach Dream offers a subtle peachy hue with light shimmer.",
    features: ["High-shine", "Non-sticky", "Hydrating"],
    variants: [],
  },
];


function ProductCard({ product, index }) {
    const stockClass =
      product.stock > 10
        ? "text-emerald-400"
        : product.stock > 0
        ? "text-yellow-400"
        : "text-red-400";
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="h-full"
      >
        <div className="bg-card rounded-lg pb-5 border border-neutral-800 hover:border-rose-700/50 transition-all duration-300 shadow-xl overflow-hidden dark:bg-neutral-900/50 dark:text-gray-50 h-full flex flex-col">
          
          {/* IMAGE SECTION */}
          <div className="relative w-full h-56 bg-neutral-950">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
  
            {/* Action Buttons Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity justify-end flex pt-3 gap-3">
            <div></div>
            <div>

                <Button size="icon" variant="ghost" className="bg-black/40 hover:bg-black/60 border border-white/20 text-white hover:text-rose-400" title="View Details">
                    <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-black/40 hover:bg-black/60 border border-white/20 text-white hover:text-blue-400" title="Edit Product">
                    <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-black/40 hover:bg-black/60 border border-white/20 text-white hover:text-red-400" title="Delete Product">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
            </div>


            {product.isFeatured && (
              <Badge className="absolute top-3 left-3 bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1 shadow-md">
                <Star className="w-3 h-3 mr-1 fill-white" /> Featured
              </Badge>
            )}
          </div>
  
          {/* CONTENT */}
          <CardContent className="p-4 flex flex-col justify-between flex-grow">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs text-gray-400 bg-neutral-800/70 border-none">
                    <Tag className="w-3 h-3 mr-1" /> {product.category || "Uncategorized"}
                </Badge>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-200">{product.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({product.reviewsCount})</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-gray-50 tracking-tight leading-tight pt-1">
                {product.name}
              </h3>
  
              {/* Description */}
              <p className="text-xs text-gray-400 line-clamp-2 min-h-[30px] leading-relaxed">
                {product.description || "No description available."}
              </p>
  
              {/* Price */}
              <p className="text-2xl font-extrabold text-rose-500 mt-2">
                ₦{(product.price / 100).toFixed(2)}
              </p>
            </div>
            
            {/* Stock and Status Footer */}
            <div className="pt-4 mt-auto border-t border-neutral-800 flex items-center justify-between text-sm">
                <span className="text-gray-400">
                    Stock:
                    <span className={`ml-1 font-bold ${stockClass}`}>
                        {product.stock}
                    </span>
                </span>
                <Badge 
                    className={`text-xs ${product.inStock 
                        ? "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30" 
                        : "bg-red-600/20 text-red-400 hover:bg-red-600/30"}`}
                >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
            </div>
          </CardContent>
        </div>
      </motion.div>
    );
  }


/**
 * Main Products Dashboard Component
 */
export default function ProductsTab() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  return (
    <div className="min-h-screen  p-6 sm:p-10 dark:text-gray-50">
        <section className="space-y-8 max-w-7xl mx-auto">
        
        {/* ## 🚀 Catalog Overview Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
           
            </div>

            <div className="flex items-center gap-3">
            <Button variant="secondary" className="dark:bg-neutral-800 dark:hover:bg-neutral-700 text-rose-400 flex items-center gap-2 border border-neutral-700">
                <Plus className="w-4 h-4" /> New Category
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 shadow-lg shadow-rose-600/30">
                <Plus className="w-4 h-4" /> Add New Product
            </Button>
            </div>
        </header>

        <hr className="border-neutral-800" />

        {/* ## 🔍 Search & Filter Bar */}
        <Card className="bg-neutral-900 border border-neutral-800 shadow-xl p-4 lg:p-5">
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
            
            {/* Search Bar */}
            <div className="relative w-full lg:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                type="text"
                placeholder="Search by product name, SKU, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-800 border-neutral-700 text-gray-200 pl-10 h-10 placeholder-gray-500 focus-visible:ring-rose-500"
                />
            </div>

            {/* Category Filter */}
            <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
                <SelectTrigger className="w-full lg:w-[200px] bg-neutral-800 border-neutral-700 text-gray-200 focus:ring-rose-500">
                    <ListFilter className="w-4 h-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-700 text-gray-200">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Lipsticks">Lipsticks</SelectItem>
                    <SelectItem value="Eyeshadow">Eyeshadow</SelectItem>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Lip Gloss">Lip Gloss</SelectItem>
                    <SelectItem value="Sale">On Sale</SelectItem>
                </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select onValueChange={setSortBy} defaultValue={sortBy}>
                <SelectTrigger className="w-full lg:w-[180px] bg-neutral-800 border-neutral-700 text-gray-200 focus:ring-rose-500">
                    <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-700 text-gray-200">
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </Card>

        {/* ## 📦 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {mockProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>

        {/* Fallback for no products */}
        {mockProducts.length === 0 && (
            <div className="text-center p-16 bg-neutral-900 border border-neutral-800 rounded-xl mt-8">
                <p className="text-gray-400">No products found matching your criteria. Try adjusting your search or filters.</p>
                <Button className="mt-4 bg-rose-600 hover:bg-rose-700">Add First Product</Button>
            </div>
        )}
        </section>
    </div>
  );
}