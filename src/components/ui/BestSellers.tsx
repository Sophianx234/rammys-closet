"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "./card";
import { Button } from "./button";
import ProductCard from "@/app/(homepage)/shop/product-card";
import { GridLoader } from "react-spinners";

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
  const [products,setProducts ] = useState<number[]>([]);
  const [loading,setLoading ] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async()=>{
      try{

        const res = await fetch('/api/products/best-sellers');
        const data = await res.json();
        console.log('Best Sellers:', data);
        // Assuming the API returns an array of product IDs
        // setProducts(json.map((product:any)=>product._id));
      }catch(error){
        console.error('Error fetching best sellers:', error);
      }finally{
        setLoading(false);
      }

    };
    fetchBestSellers();
  }, []);
if (loading) {
  return (
    <section className="relative  text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-12 w-1/3 mx-auto bg-zinc-900 rounded animate-pulse" />
          <div className="h-6 w-2/3 mx-auto bg-zinc-900 rounded animate-pulse" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-3xl p-4 flex flex-col gap-4 animate-pulse"
            >
              <div className="h-52 bg-zinc-700/40 rounded-lg" />
              <div className="h-6 w-3/4 bg-zinc-700/40 rounded" />
              <div className="h-6 w-1/2 bg-zinc-700/40 rounded" />
              <div className="h-10 w-full bg-zinc-700/40 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />
    </section>
  );
}

if(products.length>0)
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
          {products.map((product, i) => (
           <ProductCard product={product} key={product._id}/>
          ))}
        </div>
      </div>

      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />
    </section>
  );
}
