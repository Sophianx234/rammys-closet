"use client";

import { Card } from "./ui/card";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Lips",
    image: "/imgs/l-5.jpg",
  },
  {
    name: "Eyes",
    image: "/imgs/e-1.jpg",
  },
  {
    name: "Face",
    image: "/imgs/f-2.jpg",
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      {/* subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">
          Shop by Category
        </h2>
        <p className="text-muted-foreground mb-16 max-w-lg mx-auto">
          Explore timeless collections crafted to enhance your natural beauty.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Card className="relative h-80 overflow-hidden rounded-2xl shadow-md border-none group bg-background/30 backdrop-blur-md">
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-2xl" />

                {/* Text */}
                <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                  <h3 className="text-2xl font-semibold text-white tracking-wide drop-shadow-md uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-200 mt-1 opacity-80">
                    Discover {cat.name.toLowerCase()} products
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
