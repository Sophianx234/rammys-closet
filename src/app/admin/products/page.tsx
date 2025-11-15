"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
import { ProductCard } from "./product-card";
import Link from "next/link";

interface IProduct {
  _id: string | number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  sales: number;
  inStock: boolean;
  isFeatured: boolean;
  category: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  variants: { name: string; options: string[] }[];
}

export default function ProductsTab() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products"); // your API endpoint
        if (!res.ok) throw new Error("Failed to fetch products");
        if(res.ok){

          const data = await res.json();
          console.log("Fetched products:", data);
          setProducts(data);
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  fetchCategories();
}, []);


  // Filter and search
const filteredProducts = products
  .filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )
  .filter((p) => {
    if (selectedCategory === "all") return true;

    // p.category is an OBJECT because populate()
    return p.category?.name === selectedCategory;
  });

  // Sorting
 const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortBy) {
    case "price-asc":
      return a.price - b.price;

    case "price-desc":
      return b.price - a.price;

    case "best-selling":
      return b.sales - a.sales;

    case "top-rated":
      return b.rating - a.rating;

    case "latest":
    default:
      return 0; 
  }
});


  return (
    <div className="min-h-screen p-6 sm:p-10 dark:text-gray-50">
      <section className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div></div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="dark:bg-neutral-800 dark:hover:bg-neutral-700 text-primary flex items-center gap-2 border border-neutral-700"
            >
              <Plus className="w-4 h-4" /> New Category
            </Button>
            <Button className="bg-primary text-black flex items-center gap-2 ">
              <Plus className="w-4 h-4" /> Add New Product
            </Button>
          </div>
        </header>

        <hr className="border-neutral-800" />

        {/* Search & Filter Bar */}
        <Card className="bg-neutral-900 border border-neutral-800 shadow-xl p-4 lg:p-5">
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
            <div className="relative w-full lg:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by product name, SKU, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-800 border-neutral-700 text-gray-200 pl-10 h-10 placeholder-gray-500 "
              />
            </div>

            <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
              <SelectTrigger className="w-full lg:w-[200px] bg-neutral-800 border-neutral-700 text-gray-200 focus:ring-rose-500">
                <ListFilter className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-700 text-gray-200">
  <SelectItem value="all">All Categories</SelectItem>

  {categories.map((cat: any) => (
    <SelectItem key={cat._id} value={cat.name}>
      {cat.name}
    </SelectItem>
  ))}
</SelectContent>

            </Select>

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

        {/* Product Grid */}
        {loading ? (
          <div className="text-center p-16 text-gray-400">Loading products...</div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {sortedProducts.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center p-16 bg-neutral-900 border border-neutral-800 rounded-xl mt-8">
            <p className="text-gray-400">No products found matching your criteria.</p>
            <Link href='products/add' className="mt-4 inline-block text-black  px-3 py-1 bg-primary rounded-sm">Add First Product</Link>
          </div>
        )}
      </section>
    </div>
  );
}
