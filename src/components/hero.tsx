import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-secondary to-background py-24 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest">
                Luxury Collection
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-balance">
                Elevate Your Beauty
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-md">
              Discover curated cosmetics that celebrate your unique beauty.
              Premium quality, ethically sourced, and artfully crafted.
            </p>

            <div className="flex gap-4 pt-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative h-96 md:h-full bg-gradient-to-br from-primary/10 to-transparent rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/luxury-cosmetics-beauty-products.jpg"
              alt="Luxury cosmetics collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
