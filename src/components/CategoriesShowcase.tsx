"use client";

import { Card } from "./ui/card";

const categories = [
  { name: "Lips", image: "/category-lips.jpg" },
  { name: "Eyes", image: "/category-eyes.jpg" },
  { name: "Face", image: "/category-face.jpg" },
];

export default function CategoriesShowcase() {
  return (
    <section className="py-16 md:py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Shop by Category
        </h2>
        <p className="text-muted-foreground mb-12">
          Discover products tailored for every beauty need
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className="overflow-hidden group cursor-pointer hover:border-primary transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold uppercase tracking-widest">
                    {cat.name}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
