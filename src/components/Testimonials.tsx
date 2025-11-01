"use client";

import { Card } from "./ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amina D.",
    text: "Rammys Closet transformed my skincare routine. The foundation is magic!",
  },
  {
    name: "Chloe M.",
    text: "I’ve never felt more confident. Their lipstick shades are divine!",
  },
  {
    name: "Zara A.",
    text: "Fast delivery and luxurious packaging. I’m obsessed!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="p-6 border-border bg-card hover:shadow-md transition-shadow"
            >
              <Quote className="w-6 h-6 text-primary mb-4 mx-auto" />
              <p className="text-muted-foreground mb-4 italic">“{t.text}”</p>
              <h3 className="font-semibold text-foreground">{t.name}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
