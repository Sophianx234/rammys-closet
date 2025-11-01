"use client";

const brands = [
  "/brand-dior.svg",
  "/brand-fenty.svg",
  "/brand-rarebeauty.svg",
  "/brand-mac.svg",
  "/brand-nars.svg",
];

export default function BrandShowcase() {
  return (
    <section className="py-12 md:py-20 bg-secondary border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="uppercase text-xs text-muted-foreground tracking-wider mb-6">
          Trusted by top beauty brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
          {brands.map((brand, i) => (
            <img
              key={i}
              src={brand}
              alt="brand logo"
              className="h-10 object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
